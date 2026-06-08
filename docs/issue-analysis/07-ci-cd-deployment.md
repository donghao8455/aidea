# Issue #07: GitHub Actions CI/CD 部署流程存在缺陷

> **严重级别**: 🟡 中等
> **影响范围**: 自动化部署、CI/CD 可靠性
> **发现日期**: 2026-06-07
> **涉及文件**:

| 文件 | 路径 |
|------|------|
| deploy.yml | `.github/workflows/deploy.yml` |
| Dockerfile | `docker/Dockerfile` |
| docker-compose.yml | `docker/docker-compose.yml` |

---

## 1. 问题详细描述

### 1.1 部署流程概览

当前 CI/CD 流程（`deploy.yml`）：

```
push main → Checkout → Setup Node → npm ci → npm run build
  → docker build → docker save (tar.gz) → SSH 部署到服务器
```

### 1.2 逐项分析

#### 问题 1：`docker save` + SSH 传输镜像的方式不正确

```yaml
# deploy.yml:37-44
- name: Build Docker image
  run: |
    docker build -t aides:${{ github.sha }} -f docker/Dockerfile .
    docker tag aides:${{ github.sha }} aides:latest

- name: Save Docker image
  run: |
    docker save aides:latest | gzip > aides-image.tar.gz
```

但在 SSH 部署步骤中：

```yaml
# deploy.yml:51-56
- name: Deploy to server
  uses: appleboy/ssh-action@v1.0.3
  with:
    script: |
      # Stop existing container
      docker stop aides || true
      docker rm aides || true

      # Copy image ← ❌ 问题在这里
      echo "${{ secrets.DOCKER_IMAGE }}" | base64 -d > aides-image.tar.gz
      docker load < aides-image.tar.gz
```

**问题**：
- 镜像是在 GitHub Actions runner 上构建和 `docker save` 的，但 **没有传送到服务器**
- SSH 步骤中尝试从 `secrets.DOCKER_IMAGE` 解码镜像，但这个 secret **从未被设置**（`docker save` 的输出保存在 runner 本地，不会自动变成 secret）
- `appleboy/ssh-action` 只执行远程命令，不会自动传输本地文件

**结果**：部署步骤**必然失败**。`docker load` 会因为 `aides-image.tar.gz` 为空或损坏而报错。

#### 问题 2：lint 和 build-and-deploy 两个 Job 独立运行

```yaml
# deploy.yml:13
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

# deploy.yml:73
  lint:
    runs-on: ubuntu-latest
```

两个 Job **并行运行**（没有 `needs` 依赖），这意味着：
- lint 可能通过但 build 失败，仍然会尝试部署
- lint 失败但 build 成功，也会部署
- 浪费 runner 资源（lint 不需要 Docker）

#### 问题 3：npm cache 配置有误

```yaml
# deploy.yml:24-25
cache: 'npm'
cache-dependency-path: aides/package-lock.json
```

但 lint Job 也有相同的 cache 配置，导致两个 Job 重复缓存。

#### 问题 4：Dockerfile 中的额外 COPY

```dockerfile
# Dockerfile:28
COPY aides/static/x6.min.js /usr/share/nginx/html/x6.min.js
```

这行是多余的，因为 `COPY --from=builder /app/build /usr/share/nginx/html` 已经包含了 `x6.min.js`（它在 `static/` 目录中，Docusaurus 构建时会将其复制到 `build/` 目录）。

#### 问题 5：docker-compose.yml 的 healthcheck 路径

```yaml
# docker-compose.yml:9
healthcheck:
  test: ["CMD", "curl", "-f", "http://localhost/health"]
```

`nginx:alpine` 镜像**不包含 `curl` 命令**，healthcheck 会持续失败。应改为：

```yaml
test: ["CMD", "wget", "--spider", "-q", "http://localhost/health"]
```

或安装 curl：

```dockerfile
RUN apk add --no-cache curl
```

---

## 2. 根因分析

1. **镜像传输方案设计错误**：SSH 部署和 Docker 镜像传输需要分开处理。正确的方式是推送到 Docker Hub 或使用 `scp` 传输 tar 文件。
2. **缺少实际服务器测试**：CI/CD 流程可能从未真正成功运行过（Phase 3 标记为"配置完成，待部署"），所以这些问题未被发现。
3. **Docker 基础知识不足**：`nginx:alpine` 无 curl、Dockerfile 重复 COPY 等属于基础问题。

---

## 3. 推荐解决方案

### 方案 A：使用 Docker Hub 中转（推荐 ✅）

```yaml
jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
        working-directory: ./aides
      - run: npx tsc --noEmit
        working-directory: ./aides

  build-and-deploy:
    needs: lint                    # ← lint 通过后才构建
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Login to Docker Hub
        uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}

      - name: Build and push
        uses: docker/build-push-action@v5
        with:
          context: .
          file: docker/Dockerfile
          push: true
          tags: |
            ${{ secrets.DOCKERHUB_USERNAME }}/aides:latest
            ${{ secrets.DOCKERHUB_USERNAME }}/aides:${{ github.sha }}

      - name: Deploy to server
        uses: appleboy/ssh-action@v1.0.3
        with:
          host: ${{ secrets.SERVER_HOST }}
          script: |
            docker pull ${{ secrets.DOCKERHUB_USERNAME }}/aides:latest
            docker stop aides || true
            docker rm aides || true
            docker run -d --name aides --restart unless-stopped -p 80:80 \
              ${{ secrets.DOCKERHUB_USERNAME }}/aides:latest
            docker image prune -f
```

**需要配置的 GitHub Secrets**：
- `DOCKERHUB_USERNAME`
- `DOCKERHUB_TOKEN`
- `SERVER_HOST`
- `SERVER_USER`
- `SERVER_PASSWORD`（或使用 SSH Key）

### 方案 B：使用 `appleboy/scp-action` 传输 tar 文件

如果不想使用 Docker Hub，可以用 SCP 传输构建产物或 Docker tar：

```yaml
- name: Copy build artifacts to server
  uses: appleboy/scp-action@v0.1.7
  with:
    host: ${{ secrets.SERVER_HOST }}
    source: "aides/build"
    target: "/var/www/aides"

- name: Deploy
  uses: appleboy/ssh-action@v1.0.3
  with:
    script: |
      # 直接在服务器上用 Nginx 提供静态文件
      # 无需 Docker
```

---

## 4. 其他修复项

| 项 | 修复内容 | 预估工时 |
|----|---------|---------|
| docker-compose.yml | healthcheck 改用 `wget` | 5min |
| Dockerfile | 删除多余的 `COPY x6.min.js` 行 | 2min |
| deploy.yml | 添加 `needs: lint` 依赖 | 2min |
| deploy.yml | 合并 lint 步骤到 build Job 或正确配置依赖 | 15min |

---

## 5. 实施步骤

| 步骤 | 任务 | 预估工时 |
|------|------|---------|
| 1 | 注册 Docker Hub 账号（如无） | 15min |
| 2 | 配置 GitHub Secrets | 15min |
| 3 | 重写 `deploy.yml` | 1h |
| 4 | 修复 `docker-compose.yml` healthcheck | 5min |
| 5 | 清理 `Dockerfile` 冗余 COPY | 2min |
| 6 | 测试 CI/CD 流程（push 到 main 触发） | 1h |

**总预估工时**: ~2.5h

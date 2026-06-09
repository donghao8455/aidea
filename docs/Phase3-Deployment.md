# Phase 3 - 部署上线文档

> 文档版本：v1.0
> 创建日期：2026-04-21
> 状态：**配置完成，待服务器部署**

---

## 1. 部署架构

### 1.1 技术栈

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   GitHub   │───▶│  GitHub     │───▶│   Server    │
│   main     │    │  Actions    │    │   Docker    │
│   branch   │    │  CI/CD      │    │   Nginx     │
└─────────────┘    └─────────────┘    └─────────────┘
                                           │
                                           ▼
                                    ┌─────────────┐
                                    │  aides      │
                                    │  .thend.cn  │
                                    └─────────────┘
```

### 1.2 部署流程

```
代码提交 → GitHub Actions 自动构建 → Docker 镜像推送 → 服务器拉取 → Nginx 服务
```

---

## 2. 已创建的配置文件

### 2.1 Docker 配置

| 文件 | 路径 | 说明 |
|------|------|------|
| Dockerfile | `docker/Dockerfile` | 多阶段构建（Node.js → Nginx） |
| nginx.conf | `docker/nginx.conf` | Nginx 配置（Gzip、缓存、安全头） |
| docker-compose.yml | `docker/docker-compose.yml` | 本地开发和生产配置 |
| .dockerignore | `.dockerignore` | Docker 构建排除文件 |

### 2.2 CI/CD 配置

| 文件 | 路径 | 说明 |
|------|------|------|
| deploy.yml | `.github/workflows/deploy.yml` | GitHub Actions 工作流 |

---

## 3. 本地测试

### 3.1 构建 Docker 镜像（本地）

```bash
# 在项目根目录执行
cd aides
npm run build

# 构建镜像
docker build -t aides:latest -f docker/Dockerfile .

# 运行容器
docker run -d --name aides -p 8080:80 aides:latest

# 访问测试
open http://localhost:8080
```

### 3.2 使用 docker-compose（本地）

```bash
# 在项目根目录执行
docker-compose -f docker/docker-compose.yml up -d

# 查看日志
docker-compose -f docker/docker-compose.yml logs -f

# 停止服务
docker-compose -f docker/docker-compose.yml down
```

---

## 4. 服务器部署（手动）

### 4.1 服务器要求

| 要求 | 配置 |
|------|------|
| 操作系统 | Ubuntu 20.04+ / CentOS 8+ |
| Docker | 20.10+ |
| 内存 | 1GB+ |
| 端口 | 80/443 |

### 4.2 手动部署步骤

```bash
# 1. 安装 Docker（如未安装）
curl -fsSL https://get.docker.com | sh
sudo systemctl enable docker

# 2. 创建工作目录
sudo mkdir -p /opt/aides
cd /opt/aides

# 3. 上传文件或克隆仓库
git clone https://github.com/donghao8455/aidea.git .
cd aides

# 4. 构建并运行
docker build -t aides:latest -f docker/Dockerfile .
docker run -d \
  --name aides \
  --restart unless-stopped \
  -p 80:80 \
  aides:latest

# 5. 验证部署
curl http://localhost/health
```

### 4.3 HTTPS 配置（可选）

```bash
# 使用 Let's Encrypt 免费证书
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d aides.thend.cn
```

---

## 5. GitHub Actions CI/CD 配置

### 5.1 需要的 Secrets

在 GitHub 仓库 Settings → Secrets and variables → Actions 中添加：

| Secret 名称 | 说明 | 示例 |
|-------------|------|------|
| SERVER_HOST | 服务器 IP 地址 | 192.168.1.100 |
| SERVER_USER | SSH 用户名 | root |
| SERVER_PASSWORD | SSH 密码 | ********** |
| SERVER_PORT | SSH 端口 | 22（默认） |
| DOCKER_IMAGE | Base64 编码的 Docker 镜像 | （CI 自动生成） |

### 5.2 启用 Actions

1. 推送代码到 GitHub 仓库
2. 访问 Actions 页面：`https://github.com/donghao8455/aidea/actions`
3. 启用 GitHub Actions（如果需要）
4. 手动触发：点击 "Run workflow"

### 5.3 CI/CD 流程

```yaml
触发条件:
  - push 到 main 分支
  - 手动触发 (workflow_dispatch)

Jobs:
  1. lint: 类型检查 + ESLint
  2. build-and-deploy:
     - Checkout code
     - Setup Node.js
     - npm ci
     - npm run build
     - docker build
     - SSH 部署到服务器
```

---

## 6. 部署验证清单

### 6.1 部署后必检项

| 检查项 | 验证方式 | 预期结果 |
|--------|----------|----------|
| 首页访问 | 浏览器打开 | 图谱正常显示 |
| 详情页访问 | 点击节点 | 跳转详情页正常 |
| 搜索功能 | 搜索关键词 | 高亮匹配节点 |
| 分类筛选 | 点击分类按钮 | 仅显示选中分类 |
| HTTPS | 访问 https:// | 证书有效（可选） |
| 健康检查 | curl http://localhost/health | 返回 "healthy" |

### 6.2 性能检查

```bash
# Lighthouse 测试（生产环境）
npx lighthouse https://aides.thend.cn --output=html --output-path=./lighthouse.html

# 目标：Performance ≥ 90
```

---

## 7. 故障排查

### 7.1 常见问题

| 问题 | 可能原因 | 解决方案 |
|------|----------|----------|
| 页面 404 | Nginx 配置问题 | 检查 try_files 配置 |
| 图谱不显示 | x6.min.js 未加载 | 检查文件路径 |
| 构建失败 | Node 版本 | 使用 Node 20 |
| SSH 部署失败 | 凭证错误 | 检查 Secrets 配置 |

### 7.2 日志查看

```bash
# 查看容器日志
docker logs aides

# 查看 Nginx 访问日志
docker exec aides tail -f /var/log/nginx/access.log

# 查看 Nginx 错误日志
docker exec aides tail -f /var/log/nginx/error.log
```

---

## 8. 相关文件

| 文件路径 | 说明 |
|----------|------|
| `docker/Dockerfile` | Docker 镜像构建配置 |
| `docker/nginx.conf` | Nginx 服务器配置 |
| `docker/docker-compose.yml` | Docker Compose 配置 |
| `.dockerignore` | Docker 构建排除文件 |
| `.github/workflows/deploy.yml` | GitHub Actions CI/CD 配置 |

---

## 9. 后续任务

### 9.1 部署前准备

- [ ] 配置服务器 SSH 访问
- [ ] 添加 GitHub Secrets
- [ ] 域名解析配置（aides.thend.cn → 服务器 IP）
- [ ] SSL 证书申请（可选，推荐配置）

### 9.2 部署后验证

- [ ] 首页功能正常
- [ ] 详情页跳转正常
- [ ] 搜索筛选正常
- [ ] Lighthouse 评分 ≥ 90
- [ ] Google Search Console 连接

---

## 10. 联系人和权限

| 角色 | 联系方式 | 权限 |
|------|----------|------|
| 服务器管理员 | （待填写） | SSH root 访问 |
| GitHub 仓库管理员 | donghao8455 | 仓库管理 + Secrets |
| 域名管理员 | （待填写） | DNS 解析配置 |

---

> **部署完成日期**: 待填写
> **部署人**: 待填写
> **验证人**: 待填写

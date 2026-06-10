# 代码库关注点

**分析日期：** 2026-06-10

## 技术债务

**CI/CD 流水线不可用（Issue #07）：**
- 问题：Docker 镜像传输机制损坏 — docker save 的输出留在 GitHub Actions 运行器上，但 SSH 部署步骤从 secrets.DOCKER_IMAGE 读取，而该密钥从未被填充。部署总是会失败。
- 涉及文件：`.github/workflows/deploy.yml`、`docker/docker-compose.yml`、`docker/Dockerfile`
- 影响：无法部署到生产环境。整个 CI/CD 流水线是死代码。
- 修复方案：重写 deploy.yml，改用 Docker Hub push/pull 或 scp-action 进行产物传输。添加 needs: lint 的作业依赖。修复 docker-compose 健康检查，将 curl 改为 wget（nginx:alpine 不含 curl）。
- 预估工作量：约2.5小时

**详情页使用查询参数而非 RESTful 路径（Issue #04）：**
- 问题：概念详情页使用 /concept?id=rag 而非 PRD 规定的 /concepts/rag。这导致 Docusaurus SSG 无法为每个概念生成独立的静态 HTML，损害 SEO，也无法实现每页独立的 meta 标签。
- 涉及文件：`aides/src/pages/concept.tsx`（第46-52行）、`aides/src/pages/index.tsx`（第25行）
- 影响：SEO 差；所有概念共享一个 JS 执行前为空的 HTML 外壳。搜索引擎看到的是空白页面。
- 修复方案：使用 Docusaurus createRoutes() 在构建时为每个概念生成静态页面，或使用 Docusaurus 插件进行动态路由注册。
- 预估工作量：约6.5小时（完整方案）或约2小时（最小方案：SPA 路由修复 + meta 标签）

**路由导入来源和不必要的状态（Issue #05）：**
- 问题：concept.tsx 从 react-router-dom 导入 useLocation 而非 @docusaurus/router，可能在 Docusaurus React Router 升级时出问题。同时使用 useState + useEffect 而实际上同步的 useMemo 计算就够了。
- 涉及文件：`aides/src/pages/concept.tsx`（第2行、第46-52行）
- 影响：与 Docusaurus 内部实现的脆弱耦合；异步状态更新导致不必要的重渲染。
- 修复方案：将导入改为 @docusaurus/router；将 useState + useEffect 替换为 useMemo 计算。
- 预估工作量：约0.5小时

**遗留数据文件仍存在于仓库中：**
- 问题：aides/data/concepts/*.json（22个文件）和 aides/data/relations.json 是数据统一前的废弃数据。没有源文件导入它们。已被 aides/src/data/allConcepts.ts 取代但从未删除。
- 修复方案：删除 aides/data/concepts/ 目录和 aides/data/relations.json。
- 预估工作量：约5分钟

**Docusaurus 教程文件未自定义：**
- 问题：aides/docs/ 仍包含默认的 Docusaurus 教程内容。导航栏链接指向这些通用文档。
- 修复方案：替换为项目特定文档，或从导航栏移除文档侧边栏。
- 预估工作量：约1-2小时

**HomepageFeatures 组件是默认 Docusaurus 样板：**
- 问题：包含默认特性列表和占位 SVG。未被任何页面导入，属于死代码。
- 修复方案：删除或替换为项目特定内容。
- 预估工作量：约5分钟

**AINewsSidebar 组件未接入：**
- 问题：组件和数据存在但未被任何页面导入。新闻数据是硬编码模拟数据，链接都是 href="#" 无实际功能。
- 修复方案：集成到首页并连接真实 API，或直接删除。
- 预估工作量：约4小时（集成）或约5分钟（删除）

**GraphCanvas 悬浮提示使用 innerHTML（XSS 风险）：**
- 问题：悬浮提示通过字符串插值构建后赋值给 innerHTML。数据目前可控，但模式脆弱。
- 涉及文件：`aides/src/components/Graph/GraphCanvas.tsx`（第215-228行）
- 修复方案：创建基于 React Portal 的 JSX 悬浮提示组件。
- 预估工作量：约1小时

**AntV X6 通过全局脚本加载（Issue #02）：**
- 问题：572KB 全局脚本绕过 Webpack 优化，失去类型安全。
- 修复方案：受限于上游 ESM 兼容性修复。关注后续版本。
- 预估工作量：约4小时（上游修复可用后）

## 已知 Bug

**图谱画布固定尺寸导致移动端溢出（Issue #10）：**
- 症状：图谱画布硬编码为 1400x1000 像素，小屏设备水平溢出。
- 修复方案：动态获取容器宽度，添加 resize 监听，小屏调整布局算法。

**Docker Compose 健康检查始终失败：**
- 症状：使用 curl 但 nginx:alpine 不包含 curl。
- 修复方案：改为 wget 或安装 curl。

## 安全考虑

- **innerHTML XSS 风险：** 当前数据可控，但建议迁移到 React JSX 渲染。
- **CI/CD 密钥处理：** 将大型二进制数据存为 GitHub 密钥不安全，建议改用 Docker Hub 或 SSH 密钥。
- **Nginx 安全头配置良好：** 包含完整的安全头，无需操作。

## 性能瓶颈

- **allConcepts.ts 包体积：** 953行内联数据被整体打包，每页都加载。建议拆分为图谱数据和详情数据，按概念懒加载。
- **X6 全局脚本：** 572KB 绕过 Webpack 优化。受限于上游修复。

## 脆弱区域

- **图谱初始化时序：** X6 脚本加载逻辑复杂，清理逻辑有两个返回路径可能导致竞态条件。无测试。
- **单一数据文件：** allConcepts.ts 混合类型、数据和导出，一个错误可能破坏整站。无数据完整性测试。
- **悬浮提示 DOM 操作：** 绕过 React 渲染生命周期。无测试。

## 扩展性限制

- **概念数量：** 每个分类超过约10个概念后节点会溢出重叠。需切换到正规图布局算法。
- **包体积增长：** 50+ 概念时可能超过 100KB 未使用数据。需拆分为独立文件动态导入。
- **静态站点生成：** 只生成一个 HTML 文件，搜索引擎无法索引单个概念。需实现 createRoutes() 生成静态页面。

## 风险依赖

- **@antv/x6 v3 ESM 不兼容：** 全局脚本需手动管理版本。关注上游修复。
- **未配置测试框架：** 零测试文件。建议添加 Vitest，从数据完整性测试开始。

## 缺失的关键功能

- **图谱移动端适配（Issue #10）：** 画布 1400px 宽无响应式，移动端无法使用。
- **无自动化测试：** 零测试覆盖率，无法安全重构。
- **无概念页面站点地图：** 搜索引擎无法发现单个概念内容。

## 测试覆盖缺口

**整个应用零测试：**
- 未测试：所有组件、所有数据、所有配置。
- 具体未测试区域：allConcepts.ts 数据完整性、GraphCanvas 初始化、concept.tsx 路由、layoutConcepts() 布局算法。
- 优先级：高

---

*关注点审计：2026-06-10*

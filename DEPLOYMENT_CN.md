# 国内访问优化部署方案

## 方案一：Cloudflare 加速（推荐）

### 步骤：
1. 注册 Cloudflare 账号（免费）：https://dash.cloudflare.com/sign-up
2. 添加自定义域名（如果有）
3. 将域名 DNS 指向 Cloudflare
4. 在 Cloudflare 中创建 CNAME 记录指向 `youagent-frontend.vercel.app`
5. 开启 Cloudflare 的缓存和加速功能

### 优点：
- 免费
- 国内有节点，访问速度快
- 不需要备案
- 自动 HTTPS

## 方案二：GitHub Pages + Cloudflare

### 自动部署配置已添加到仓库
查看 `.github/workflows/deploy.yml` 文件

### 访问地址：
- GitHub Pages: https://cswanghan.github.io/youagent-frontend/
- 可通过 Cloudflare 加速此地址

## 方案三：Netlify 部署

### 步骤：
1. 访问 https://app.netlify.com
2. 连接 GitHub 仓库
3. 自动部署

### 配置文件已添加：
- `netlify.toml` - Netlify 配置

## 方案四：国内云服务（需要备案）

### 阿里云 OSS + CDN
```bash
# 1. 构建项目
npm run build

# 2. 上传到 OSS
ossutil cp -r ./dist oss://your-bucket/

# 3. 配置 CDN 加速
```

### 腾讯云 COS + CDN
```bash
# 1. 构建项目  
npm run build

# 2. 上传到 COS
coscmd upload -r ./dist /

# 3. 配置 CDN 加速
```

## 快速开始

### 使用 Cloudflare（最简单）
1. 如果没有自定义域名，可以使用 Cloudflare Pages：
   - Fork 仓库到你的 GitHub
   - 登录 Cloudflare Dashboard
   - 选择 Pages → Create a project
   - 连接 GitHub 仓库
   - 构建设置：
     - Build command: `npm run build`
     - Build output directory: `dist`
   - 部署后会得到 `*.pages.dev` 域名，国内访问速度不错

### 使用 GitHub Pages（备选）
项目已配置自动部署到 GitHub Pages，每次推送到 main 分支会自动构建部署。

访问地址：https://cswanghan.github.io/youagent-frontend/

## 性能优化建议

1. **启用 Gzip 压缩**（已在 Vite 中配置）
2. **图片优化**：使用 WebP 格式
3. **代码分割**：已配置动态导入
4. **缓存策略**：配置长期缓存

## 监控和分析

推荐使用以下工具监控访问速度：
- https://www.17ce.com/ - 国内多地测速
- https://gtmetrix.com/ - 性能分析
- Chrome DevTools - Lighthouse 性能测试
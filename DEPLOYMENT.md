# Vercel 部署指南

## 快速部署

### 1. 准备工作

确保你的代码已经推送到 GitHub：
```bash
git add .
git commit -m "Add email notification feature"
git push origin main
```

### 2. 连接 Vercel

#### 方法一：通过 Vercel 网站（推荐）
1. 访问 https://vercel.com
2. 登录并点击 "New Project"
3. 导入你的 GitHub 仓库
4. 选择 `frontend` 目录作为根目录
5. Vercel 会自动检测 Vite 项目

#### 方法二：使用 Vercel CLI
```bash
# 安装 Vercel CLI
npm i -g vercel

# 在 frontend 目录下运行
vercel

# 按提示操作
```

### 3. 配置环境变量 ⚠️ 重要

在 Vercel 项目设置中添加以下环境变量：

| 变量名 | 值 | 说明 |
|--------|-----|------|
| `EMAIL_USER` | `noswanghan@163.com` | 发件人邮箱 |
| `EMAIL_PASS` | `BChHf6qvRtqVSgZ2` | 163邮箱授权码（16位） |

**设置步骤：**
1. 进入 Vercel 项目控制台
2. 点击 "Settings" → "Environment Variables"
3. 添加上述变量
4. 选择环境：Production, Preview, Development
5. 点击 "Save"

### 4. 部署设置

Vercel 会自动使用以下配置：
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`
- **Framework Preset**: Vite

### 5. 自动部署

配置完成后，每次推送到 GitHub 都会自动触发部署：
- `main` 分支 → 生产环境
- 其他分支 → 预览环境

## 项目结构

```
frontend/
├── api/
│   └── send-email.js       # Vercel Function (自动部署为 API)
├── src/
│   ├── api/
│   │   └── emailService.ts # 前端 API 调用（自动适配环境）
│   └── components/
│       └── SignupModal.tsx  # 注册弹窗
├── vercel.json             # Vercel 配置
└── package.json
```

## 环境差异

### 开发环境
- 前端：http://localhost:3000
- 邮件 API：http://localhost:3001/api/send-email
- 使用本地 `api/email-config.cjs`

### 生产环境（Vercel）
- 前端：https://your-app.vercel.app
- 邮件 API：https://your-app.vercel.app/api/send-email
- 使用环境变量

## 邮件功能工作原理

1. **用户提交邮箱** → SignupModal 组件
2. **调用 EmailService** → 自动检测环境
3. **请求 API**：
   - 开发：localhost:3001
   - 生产：/api/send-email (Vercel Function)
4. **发送邮件** → 通知到 noswanghan@163.com

## 验证部署

### 1. 检查函数部署
访问：https://your-app.vercel.app/api/send-email
应返回：`{"error":"Method not allowed"}` (正常，因为需要 POST)

### 2. 测试邮件功能
1. 访问生产环境网站
2. 点击 "Start Free Trial"
3. 提交邮箱
4. 检查 noswanghan@163.com 收件箱

### 3. 查看日志
在 Vercel 控制台：
- Functions → send-email → Logs
- 可以看到实时的函数调用日志

## 故障排查

### 邮件发送失败
1. **检查环境变量**
   - 确保 EMAIL_USER 和 EMAIL_PASS 已设置
   - 重新部署：Settings → Deployments → Redeploy

2. **检查授权码**
   - 确保是16位授权码，不是邮箱密码
   - 授权码中间没有空格

3. **查看函数日志**
   - Vercel Dashboard → Functions → Logs
   - 查看具体错误信息

### CORS 错误
已在 `api/send-email.js` 中配置 CORS 头：
```javascript
res.setHeader('Access-Control-Allow-Origin', '*');
```

### 函数超时
默认超时时间为 10 秒，可在 `vercel.json` 中调整：
```json
{
  "functions": {
    "api/send-email.js": {
      "maxDuration": 30
    }
  }
}
```

## 安全建议

1. **生产环境检查清单**
   - [ ] 环境变量已设置
   - [ ] 授权码未提交到代码库
   - [ ] api/email-config.cjs 在 .gitignore 中
   - [ ] 邮件发送有频率限制

2. **建议的改进**
   - 添加速率限制（防止滥用）
   - 添加 reCAPTCHA 验证
   - 记录所有邮件发送请求
   - 使用数据库存储申请记录

## 监控和分析

### Vercel Analytics
1. 启用 Analytics：Settings → Analytics → Enable
2. 查看：
   - 页面访问量
   - API 调用次数
   - 性能指标

### 邮件发送统计
通过管理面板查看（Ctrl+Shift+A）：
- 总申请数
- 发送成功/失败
- 导出数据分析

## 常用命令

```bash
# 本地开发
npm run dev

# 构建测试
npm run build
npm run preview

# 部署到 Vercel
vercel --prod

# 查看部署状态
vercel ls

# 查看日志
vercel logs
```

## 支持的邮箱服务

当前配置为 163 邮箱，也可以使用：
- QQ 邮箱：smtp.qq.com
- Gmail：smtp.gmail.com
- Outlook：smtp-mail.outlook.com

修改 `api/send-email.js` 中的 SMTP 配置即可。

## 联系支持

如遇到问题：
1. 查看 Vercel 函数日志
2. 检查浏览器控制台
3. 查看本文档故障排查部分

---

**最后更新**: 2024-01-14
**维护者**: AutoFlow Team
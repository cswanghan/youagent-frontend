# 邮件通知设置指南

## 快速开始

当用户提交试用申请时，系统会自动发送邮件通知到 `noswanghan@163.com`。

## 163邮箱授权码获取步骤

### 1. 登录163邮箱
- 访问 https://mail.163.com
- 登录您的邮箱账号

### 2. 进入设置
- 点击页面顶部的【设置】
- 或点击右上角齿轮图标 ⚙️ → 选择【POP3/SMTP/IMAP】

### 3. 开启SMTP服务
- 找到【POP3/SMTP/IMAP】服务设置
- 开启 **SMTP** 服务（用于发送邮件）
- 如果已开启，可以跳过此步

### 4. 获取授权码
- 点击【新增授权码】
- 按提示进行安全验证：
  - 发送短信：按格式发送短信到指定号码
  - 扫码验证：使用网易邮箱大师App扫码
- 验证成功后，会显示16位授权码
- **⚠️ 重要**：立即复制保存！授权码只显示一次

### 5. 配置邮件服务

#### 方法1：本地开发配置
```bash
# 1. 复制配置模板
cp api/email-config.example.js api/email-config.js

# 2. 编辑 api/email-config.js
# 填入您的邮箱和授权码
EMAIL_USER: 'your-email@163.com'  # 您的163邮箱
EMAIL_PASS: 'ABCD1234EFGH5678'    # 16位授权码

# 3. 测试邮件发送
npm install nodemailer
node test-email.js

# 4. 启动邮件服务
node api/send-email.js
```

#### 方法2：环境变量配置（生产环境）
```bash
# 设置环境变量
export EMAIL_USER="your-email@163.com"
export EMAIL_PASS="YOUR_16_CHAR_AUTH_CODE"

# 或在 .env 文件中
EMAIL_USER=your-email@163.com
EMAIL_PASS=YOUR_16_CHAR_AUTH_CODE
```

## 测试邮件功能

### 1. 安装依赖
```bash
npm install nodemailer express cors
```

### 2. 运行测试脚本
```bash
node test-email.js
```
如果配置正确，您会在 `noswanghan@163.com` 收到测试邮件。

### 3. 启动邮件服务
```bash
# 开发环境
node api/send-email.js

# 服务将在 http://localhost:3001 运行
```

### 4. 测试完整流程
1. 访问 http://localhost:3000
2. 点击 "Start Free Trial"
3. 输入邮箱并提交
4. 检查 `noswanghan@163.com` 是否收到通知邮件

## 管理功能

### 查看所有试用申请
按 `Ctrl+Shift+A` 打开管理面板，可以：
- 查看所有提交的试用申请
- 导出数据为JSON文件
- 清空记录

## 常见问题

### 1. 授权码错误
- 确保使用的是16位授权码，不是邮箱密码
- 授权码中没有空格
- 如果授权码失效，需要重新生成

### 2. SMTP服务未开启
- 在163邮箱设置中确认SMTP服务已开启
- 服务开启后可能需要等待几分钟生效

### 3. 发送失败
- 检查网络连接
- 确认发件人邮箱（EMAIL_USER）和授权码匹配
- 163邮箱可能有发送频率限制

### 4. 收不到邮件
- 检查垃圾邮件文件夹
- 确认收件人邮箱地址正确
- 等待1-2分钟，邮件可能有延迟

## 生产环境部署

### Vercel部署
1. 将 `api/send-email.js` 放在 `api/` 目录
2. 在Vercel设置环境变量
3. 部署后API端点为：`https://your-domain.vercel.app/api/send-email`

### 自建服务器
1. 使用PM2管理Node.js进程
2. 配置Nginx反向代理
3. 使用环境变量管理敏感信息

## 安全建议

1. **不要将授权码提交到代码仓库**
   - 将 `api/email-config.js` 添加到 `.gitignore`
   - 使用环境变量管理敏感信息

2. **限制发送频率**
   - 添加速率限制防止滥用
   - 记录所有发送请求

3. **验证邮箱格式**
   - 前端和后端都要验证
   - 防止恶意输入

## 技术支持

如有问题，请检查：
- 控制台错误信息
- `localStorage` 中的 `trialSignups` 数据
- 邮件服务日志输出
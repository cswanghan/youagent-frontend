// 163邮箱配置示例
// 1. 复制此文件为 email-config.js
// 2. 填入您的实际邮箱和授权码
// 3. 不要将 email-config.js 提交到代码仓库

module.exports = {
  // 163邮箱配置
  EMAIL_SERVICE: '163',
  EMAIL_USER: 'your-email@163.com',  // 您的163邮箱地址
  EMAIL_PASS: 'YOUR_AUTH_CODE_HERE',  // 16位授权码（不是邮箱密码！）
  
  // 收件人配置
  ADMIN_EMAIL: 'noswanghan@163.com',  // 接收通知的邮箱
  
  // SMTP配置（163邮箱）
  SMTP_HOST: 'smtp.163.com',
  SMTP_PORT: 465,  // SSL端口
  SMTP_SECURE: true, // 使用SSL
  
  // 其他常用邮箱配置参考：
  // QQ邮箱: 
  //   SMTP_HOST: 'smtp.qq.com'
  //   SMTP_PORT: 465 或 587
  //
  // Gmail:
  //   SMTP_HOST: 'smtp.gmail.com'
  //   SMTP_PORT: 465 或 587
  //
  // Outlook:
  //   SMTP_HOST: 'smtp-mail.outlook.com'
  //   SMTP_PORT: 587
};
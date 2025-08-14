// 测试163邮箱发送功能
// 使用方法：
// 1. 创建 api/email-config.js 文件，填入您的邮箱和授权码
// 2. 运行: node test-email.js

const nodemailer = require('nodemailer');

// 加载配置
let config;
try {
  config = require('./api/email-config.cjs');
  console.log('✅ 配置文件加载成功');
} catch (e) {
  console.error('❌ 请先创建 api/email-config.js 文件');
  console.log('可以复制 api/email-config.example.js 作为模板');
  process.exit(1);
}

// 创建发送器
const transporter = nodemailer.createTransport({
  host: config.SMTP_HOST,
  port: config.SMTP_PORT,
  secure: config.SMTP_SECURE,
  auth: {
    user: config.EMAIL_USER,
    pass: config.EMAIL_PASS
  }
});

// 测试邮件
const testEmail = {
  from: config.EMAIL_USER,
  to: config.ADMIN_EMAIL,
  subject: '测试邮件 - AutoFlow 试用申请通知',
  html: `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h2 style="color: #333;">测试邮件发送成功！</h2>
      <p>这是一封测试邮件，用于验证163邮箱配置是否正确。</p>
      <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <p><strong>发送时间：</strong> ${new Date().toLocaleString('zh-CN')}</p>
        <p><strong>发送邮箱：</strong> ${config.EMAIL_USER}</p>
        <p><strong>接收邮箱：</strong> ${config.ADMIN_EMAIL}</p>
      </div>
      <p style="color: #666;">如果您收到这封邮件，说明邮件服务配置成功！</p>
    </div>
  `
};

console.log('📧 正在发送测试邮件...');
console.log(`   从: ${config.EMAIL_USER}`);
console.log(`   到: ${config.ADMIN_EMAIL}`);

// 发送邮件
transporter.sendMail(testEmail, (error, info) => {
  if (error) {
    console.error('❌ 邮件发送失败:', error.message);
    console.log('\n可能的原因：');
    console.log('1. 授权码不正确（需要使用16位授权码，不是邮箱密码）');
    console.log('2. SMTP服务未开启（需要在163邮箱设置中开启）');
    console.log('3. 网络连接问题');
  } else {
    console.log('✅ 邮件发送成功！');
    console.log('   Message ID:', info.messageId);
    console.log('\n请检查 ' + config.ADMIN_EMAIL + ' 的收件箱');
  }
});
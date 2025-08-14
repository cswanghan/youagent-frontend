// Simple email API endpoint using Node.js
// This can be deployed as a serverless function (Vercel, Netlify Functions, etc.)
// Or run as a simple Express server

const nodemailer = require('nodemailer');

// Try to load local config, fallback to environment variables
let emailConfig;
try {
  emailConfig = require('./email-config.cjs');
} catch (e) {
  console.log('Using environment variables for email configuration');
  emailConfig = {
    EMAIL_SERVICE: '163',
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS: process.env.EMAIL_PASS,
    ADMIN_EMAIL: 'noswanghan@163.com',
    SMTP_HOST: 'smtp.163.com',
    SMTP_PORT: 465,
    SMTP_SECURE: true
  };
}

// Email configuration for 163
const EMAIL_CONFIG = {
  host: emailConfig.SMTP_HOST,
  port: emailConfig.SMTP_PORT,
  secure: emailConfig.SMTP_SECURE, // true for 465, false for other ports
  auth: {
    user: emailConfig.EMAIL_USER,
    pass: emailConfig.EMAIL_PASS  // 16位授权码
  }
};

// Create transporter
const transporter = nodemailer.createTransport(EMAIL_CONFIG);

// Handler function for serverless deployment
module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const { userEmail, adminEmail, subject, message } = req.body;
    
    // Send email
    const mailOptions = {
      from: emailConfig.EMAIL_USER,
      to: adminEmail || emailConfig.ADMIN_EMAIL || 'noswanghan@163.com',
      subject: subject || `新的试用申请 - ${userEmail}`,
      text: message || `有邮箱地址是 ${userEmail} 的用户提交了试用申请。\n\n提交时间: ${new Date().toLocaleString('zh-CN')}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #333;">新的试用申请通知</h2>
          <p style="font-size: 16px; color: #666;">
            有用户提交了试用申请，详细信息如下：
          </p>
          <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p><strong>用户邮箱：</strong> ${userEmail}</p>
            <p><strong>提交时间：</strong> ${new Date().toLocaleString('zh-CN')}</p>
          </div>
          <p style="color: #999; font-size: 14px;">
            此邮件由 AutoFlow 系统自动发送
          </p>
        </div>
      `
    };
    
    await transporter.sendMail(mailOptions);
    
    console.log('Email sent successfully to:', adminEmail);
    res.status(200).json({ success: true, message: 'Email sent successfully' });
    
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to send email',
      details: error.message 
    });
  }
};

// For local testing as Express server
if (require.main === module) {
  const express = require('express');
  const cors = require('cors');
  const app = express();
  
  app.use(cors());
  app.use(express.json());
  
  app.post('/api/send-email', module.exports);
  
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Email service running on port ${PORT}`);
  });
}
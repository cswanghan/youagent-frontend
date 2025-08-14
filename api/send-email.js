// Vercel Serverless Function for sending emails
// This file will be automatically deployed as an API endpoint

// Use CommonJS require for better compatibility with Vercel Functions
const nodemailer = require('nodemailer');

module.exports = async function handler(req, res) {
  console.log('Email API called:', {
    method: req.method,
    hasBody: !!req.body,
    environment: process.env.NODE_ENV,
    hasEmailUser: !!process.env.EMAIL_USER,
    hasEmailPass: !!process.env.EMAIL_PASS,
    userLength: process.env.EMAIL_USER?.length,
    passLength: process.env.EMAIL_PASS?.length
  });

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
  
  // Check if environment variables are set
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error('Missing email configuration:', {
      hasUser: !!process.env.EMAIL_USER,
      hasPass: !!process.env.EMAIL_PASS
    });
    return res.status(500).json({ 
      success: false, 
      error: 'Email service not configured. Please check environment variables.',
      debug: {
        hasEmailUser: !!process.env.EMAIL_USER,
        hasEmailPass: !!process.env.EMAIL_PASS
      }
    });
  }
  
  try {
    // Email configuration from environment variables
    const emailConfig = {
      host: 'smtp.163.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      tls: {
        // Do not fail on invalid certs
        rejectUnauthorized: false
      }
    };
    
    // Create transporter using nodemailer
    const transporter = nodemailer.createTransporter(emailConfig);
    
    const { userEmail, adminEmail, subject, message } = req.body;
    
    // Verify connection first
    console.log('Verifying SMTP connection...');
    await transporter.verify();
    console.log('SMTP connection verified');
    
    // Send email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: adminEmail || 'noswanghan@163.com',
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
            <p><strong>来源：</strong> ${req.headers.origin || 'AutoFlow Platform'}</p>
          </div>
          <p style="color: #999; font-size: 14px;">
            此邮件由 AutoFlow 系统自动发送
          </p>
        </div>
      `
    };
    
    // Send email
    const info = await transporter.sendMail(mailOptions);
    
    console.log('Email sent successfully:', {
      messageId: info.messageId,
      to: adminEmail || 'noswanghan@163.com',
      accepted: info.accepted
    });
    
    res.status(200).json({ 
      success: true, 
      message: 'Email sent successfully',
      messageId: info.messageId,
      accepted: info.accepted,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Detailed error sending email:', {
      message: error.message,
      code: error.code,
      command: error.command,
      response: error.response,
      responseCode: error.responseCode
    });
    
    // Return detailed error for debugging
    res.status(500).json({ 
      success: false, 
      error: 'Failed to send email',
      details: {
        message: error.message,
        code: error.code,
        command: error.command,
        responseCode: error.responseCode,
        response: error.response
      }
    });
  }
};
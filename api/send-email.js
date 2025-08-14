// Vercel Serverless Function for sending emails
// This file will be automatically deployed as an API endpoint

export default async function handler(req, res) {
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
    // Dynamic import for nodemailer (required for Vercel)
    const nodemailer = await import('nodemailer');
    
    // Email configuration from environment variables
    const emailConfig = {
      host: 'smtp.163.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER || 'noswanghan@163.com',
        pass: process.env.EMAIL_PASS // 从环境变量获取授权码
      }
    };
    
    // Create transporter
    const transporter = nodemailer.default.createTransporter(emailConfig);
    
    const { userEmail, adminEmail, subject, message } = req.body;
    
    // Send email
    const mailOptions = {
      from: emailConfig.auth.user,
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
    
    await transporter.sendMail(mailOptions);
    
    console.log('Email sent successfully to:', adminEmail || 'noswanghan@163.com');
    res.status(200).json({ 
      success: true, 
      message: 'Email sent successfully',
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error sending email:', error);
    
    // 在生产环境中，不要暴露详细错误信息
    const errorMessage = process.env.NODE_ENV === 'development' 
      ? error.message 
      : 'Failed to send email';
    
    res.status(500).json({ 
      success: false, 
      error: errorMessage
    });
  }
}
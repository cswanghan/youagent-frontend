// Local development server with email API endpoint
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(express.json());

// Email configuration
const emailConfig = {
  host: 'smtp.163.com',
  port: 465,
  secure: true,
  auth: {
    user: 'noswanghan@163.com',
    pass: 'BChHf6qvRtqVSgZ2'
  },
  tls: {
    rejectUnauthorized: false
  }
};

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ status: 'ok', message: 'Email API is running' });
});

// Email sending endpoint
app.post('/api/send-email', async (req, res) => {
  console.log('Email API called:', {
    method: req.method,
    hasBody: !!req.body,
    body: req.body
  });

  try {
    const transporter = nodemailer.createTransporter(emailConfig);
    
    // Verify connection
    console.log('Verifying SMTP connection...');
    await transporter.verify();
    console.log('SMTP connection verified');
    
    const { userEmail, adminEmail, subject, message } = req.body;
    
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
            <p><strong>来源：</strong> AutoFlow Platform</p>
          </div>
          <p style="color: #999; font-size: 14px;">
            此邮件由 AutoFlow 系统自动发送
          </p>
        </div>
      `
    };
    
    const info = await transporter.sendMail(mailOptions);
    
    console.log('Email sent successfully:', {
      messageId: info.messageId,
      accepted: info.accepted
    });
    
    res.json({ 
      success: true, 
      message: 'Email sent successfully',
      messageId: info.messageId,
      accepted: info.accepted,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error sending email:', {
      message: error.message,
      code: error.code,
      response: error.response
    });
    
    res.status(500).json({ 
      success: false, 
      error: 'Failed to send email',
      details: {
        message: error.message,
        code: error.code,
        response: error.response
      }
    });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Email server running on http://localhost:${PORT}`);
  console.log(`Test the API at http://localhost:${PORT}/api/test`);
});
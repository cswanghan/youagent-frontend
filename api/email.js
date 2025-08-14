import * as nodemailer from 'nodemailer';

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
  
  // Check if environment variables are set
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    return res.status(500).json({ 
      success: false, 
      error: 'Email service not configured'
    });
  }
  
  try {
    // Create transporter
    const transporter = nodemailer.createTransporter({
      host: 'smtp.163.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
    
    const { userEmail } = req.body;
    
    // Send email
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'noswanghan@163.com',
      subject: `新的试用申请 - ${userEmail}`,
      text: `有邮箱地址是 ${userEmail} 的用户提交了试用申请。\n\n提交时间: ${new Date().toLocaleString('zh-CN')}`
    });
    
    res.status(200).json({ 
      success: true, 
      message: 'Email sent successfully'
    });
    
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Failed to send email',
      details: error.message
    });
  }
}
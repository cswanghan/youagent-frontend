// Email service for trial signup notifications
export interface SignupData {
  email: string;
  timestamp?: number;
  language?: string;
}

export class EmailService {
  // For development, we'll use a simple backend endpoint
  // In production, this should be replaced with your actual backend API
  
  static async sendTrialNotification(userEmail: string, language: string = 'en'): Promise<boolean> {
    try {
      // For development/demo purposes, we'll simulate the API call
      // In production, replace this with your actual backend endpoint
      
      const notificationData = {
        userEmail,
        adminEmail: 'noswanghan@163.com',
        subject: language === 'zh' 
          ? `新的试用申请 - ${userEmail}`
          : `New Trial Request - ${userEmail}`,
        message: language === 'zh'
          ? `有邮箱地址是 ${userEmail} 的用户提交了试用申请。\n\n提交时间: ${new Date().toLocaleString('zh-CN')}`
          : `A user with email ${userEmail} has submitted a trial request.\n\nSubmission time: ${new Date().toLocaleString('en-US')}`,
        timestamp: Date.now()
      };

      // Log the notification data for development
      console.log('Trial notification:', notificationData);
      
      // Call the real email API
      // 自动检测环境：开发环境使用 localhost，生产环境使用相对路径
      const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      const apiUrl = isDevelopment
        ? 'http://localhost:3001/api/send-email' // 开发环境
        : '/api/email';  // 生产环境：使用相对路径（Vercel Functions）
      
      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(notificationData)
        });
        
        const result = await response.json();
        
        if (!response.ok || !result.success) {
          console.warn('Email API returned error:', result.error);
          // Don't throw - we still want to record the signup
        } else {
          console.log('Email sent successfully!');
        }
      } catch (fetchError) {
        console.warn('Could not connect to email service:', fetchError);
        // Don't throw - email is not critical for signup
      }
      
      // For demo purposes, we'll also try to use a serverless function or email API
      // You can integrate with services like SendGrid, Mailgun, or AWS SES
      
      // Store the signup data locally for now
      const signups = JSON.parse(localStorage.getItem('trialSignups') || '[]');
      signups.push({
        email: userEmail,
        timestamp: Date.now(),
        notificationSent: true
      });
      localStorage.setItem('trialSignups', JSON.stringify(signups));
      
      // Simulate success
      return true;
    } catch (error) {
      console.error('Failed to send trial notification:', error);
      
      // Still store the signup even if notification fails
      const signups = JSON.parse(localStorage.getItem('trialSignups') || '[]');
      signups.push({
        email: userEmail,
        timestamp: Date.now(),
        notificationSent: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      localStorage.setItem('trialSignups', JSON.stringify(signups));
      
      return false;
    }
  }
  
  // Helper method to get all stored signups (for debugging/admin panel)
  static getStoredSignups(): SignupData[] {
    try {
      return JSON.parse(localStorage.getItem('trialSignups') || '[]');
    } catch {
      return [];
    }
  }
}
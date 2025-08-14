import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { EmailService } from '../api/emailService';

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignupModal: React.FC<SignupModalProps> = ({ isOpen, onClose }) => {
  const { t, language } = useLanguage();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!validateEmail(email)) {
      setError(language === 'zh' ? '请输入有效的邮箱地址' : 'Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Send notification email to admin
      const notificationSent = await EmailService.sendTrialNotification(email, language);
      
      if (notificationSent) {
        console.log('Trial notification sent successfully');
      } else {
        console.warn('Trial signup recorded but notification email may not have been sent');
      }
      
      // Show success regardless (email notification is not critical for user experience)
      setIsSuccess(true);
      
      // Log the successful signup
      console.log('Trial signup successful:', {
        email,
        timestamp: new Date().toISOString(),
        notificationSent
      });
      
      setTimeout(() => {
        onClose();
        setIsSuccess(false);
        setEmail('');
      }, 2500);
    } catch (err) {
      console.error('Error during signup:', err);
      setError(language === 'zh' ? '提交失败，请稍后重试' : 'Submission failed, please try again');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-neutral-900 rounded-2xl p-8 max-w-md w-full mx-4 border border-neutral-800 shadow-2xl animate-fade-in">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-white transition-colors"
          aria-label="Close"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {!isSuccess ? (
          <>
            {/* Title */}
            <h3 className="text-2xl font-bold text-white mb-2">
              {language === 'zh' ? '开始免费试用' : 'Start Your Free Trial'}
            </h3>
            <p className="text-neutral-400 mb-6">
              {language === 'zh' 
                ? '输入您的邮箱，我们将发送试用链接给您' 
                : 'Enter your email and we\'ll send you a trial link'}
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-300 mb-2">
                  {language === 'zh' ? '工作邮箱' : 'Work Email'}
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={language === 'zh' ? 'you@company.com' : 'you@company.com'}
                  className="w-full px-4 py-3 bg-black/50 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-purple-500 transition-colors"
                  required
                  disabled={isSubmitting}
                />
                {error && (
                  <p className="mt-2 text-sm text-red-400">{error}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {language === 'zh' ? '提交中...' : 'Submitting...'}
                  </span>
                ) : (
                  language === 'zh' ? '获取试用链接' : 'Get Trial Access'
                )}
              </button>

              <p className="text-xs text-neutral-500 text-center">
                {language === 'zh' 
                  ? '提交即表示您同意我们的服务条款和隐私政策' 
                  : 'By submitting, you agree to our Terms of Service and Privacy Policy'}
              </p>
            </form>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              {language === 'zh' ? '提交成功！' : 'Success!'}
            </h3>
            <p className="text-neutral-400">
              {language === 'zh' 
                ? '我们已收到您的申请，试用链接将发送到您的邮箱' 
                : 'We\'ve received your request. Check your email for the trial link'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignupModal;
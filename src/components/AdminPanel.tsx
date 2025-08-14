import React, { useState, useEffect } from 'react';
import { EmailService } from '../api/emailService';
import { useLanguage } from '../contexts/LanguageContext';

const AdminPanel: React.FC = () => {
  const { language } = useLanguage();
  const [signups, setSignups] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check for admin access (ctrl+shift+a)
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        setIsOpen(true);
        loadSignups();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const loadSignups = () => {
    const storedSignups = EmailService.getStoredSignups();
    setSignups(storedSignups.reverse()); // Show newest first
  };

  const clearSignups = () => {
    if (window.confirm(language === 'zh' ? '确定要清空所有记录吗？' : 'Are you sure you want to clear all records?')) {
      localStorage.removeItem('trialSignups');
      setSignups([]);
    }
  };

  const exportSignups = () => {
    const dataStr = JSON.stringify(signups, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `trial-signups-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-neutral-900 rounded-xl max-w-4xl w-full max-h-[80vh] overflow-hidden border border-neutral-700">
        {/* Header */}
        <div className="p-6 border-b border-neutral-700 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">
              {language === 'zh' ? '试用申请管理' : 'Trial Signups Admin'}
            </h2>
            <p className="text-sm text-neutral-400 mt-1">
              {language === 'zh' ? `共 ${signups.length} 条记录` : `Total ${signups.length} records`}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={exportSignups}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors"
              disabled={signups.length === 0}
            >
              {language === 'zh' ? '导出数据' : 'Export Data'}
            </button>
            <button
              onClick={clearSignups}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm transition-colors"
              disabled={signups.length === 0}
            >
              {language === 'zh' ? '清空记录' : 'Clear All'}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="text-neutral-400 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {signups.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-neutral-400">
                {language === 'zh' ? '暂无试用申请记录' : 'No trial signup records yet'}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {signups.map((signup, index) => (
                <div key={index} className="bg-black/50 border border-neutral-700 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-white font-medium">{signup.email}</p>
                      <p className="text-sm text-neutral-400 mt-1">
                        {new Date(signup.timestamp).toLocaleString(language === 'zh' ? 'zh-CN' : 'en-US')}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {signup.notificationSent ? (
                        <span className="text-xs px-2 py-1 bg-green-900/30 text-green-400 rounded">
                          {language === 'zh' ? '已通知' : 'Notified'}
                        </span>
                      ) : (
                        <span className="text-xs px-2 py-1 bg-yellow-900/30 text-yellow-400 rounded">
                          {language === 'zh' ? '未发送通知' : 'Not Notified'}
                        </span>
                      )}
                    </div>
                  </div>
                  {signup.error && (
                    <p className="text-xs text-red-400 mt-2">Error: {signup.error}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-neutral-700 bg-neutral-800/50">
          <p className="text-xs text-neutral-500 text-center">
            {language === 'zh' 
              ? '提示：邮件通知功能需要配置后端邮件服务。当前数据保存在本地存储中。'
              : 'Note: Email notifications require backend email service configuration. Data is currently stored locally.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
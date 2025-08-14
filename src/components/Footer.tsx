
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Footer: React.FC = () => {
  const { t, language } = useLanguage();
  
  const handleLinkClick = (link: string) => {
    // 这里可以添加具体的链接跳转逻辑
    const prefix = language === 'zh' ? '跳转到: ' : 'Navigating to: ';
    window.alert(`${prefix}${link}`);
  };

  return (
    <footer className="bg-neutral-950 border-t border-neutral-800">
      <div className="container mx-auto px-6 py-8 text-center text-neutral-500">
        <p>&copy; {t.footer.copyright}</p>
        <div className="mt-4 flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-6">
          <button
            onClick={() => handleLinkClick(t.footer.aboutUs)}
            className="hover:text-white transition-colors"
          >
            {t.footer.aboutUs}
          </button>
          <button
            onClick={() => handleLinkClick(t.footer.terms)}
            className="hover:text-white transition-colors"
          >
            {t.footer.terms}
          </button>
          <button
            onClick={() => handleLinkClick(t.footer.privacy)}
            className="hover:text-white transition-colors"
          >
            {t.footer.privacy}
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
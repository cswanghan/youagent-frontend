import React, { useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface ShowcaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ShowcaseModal: React.FC<ShowcaseModalProps> = ({ isOpen, onClose }) => {
  const { language } = useLanguage();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // ESC key handler
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-7xl h-[90vh] bg-neutral-900 rounded-2xl shadow-2xl overflow-hidden animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-neutral-900 to-transparent z-10 p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">
            {language === 'zh' ? '产品演示' : 'Product Demo'}
          </h2>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10"
            aria-label="Close"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Iframe Container */}
        <div className="w-full h-full pt-16">
          <iframe
            src="/product-showcase.html"
            className="w-full h-full border-0"
            title="Product Showcase"
            allow="autoplay; fullscreen"
            allowFullScreen
          />
        </div>

        {/* Footer Hint */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-neutral-900 to-transparent p-4 text-center">
          <p className="text-white/60 text-sm">
            {language === 'zh' 
              ? '按 ESC 键或点击外部区域关闭' 
              : 'Press ESC or click outside to close'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShowcaseModal;
import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">
          {t.header.brand}
        </h1>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <button
            onClick={() => scrollToSection('why-now')}
            className="text-neutral-300 hover:text-white transition-colors"
          >
            {t.header.whyNow}
          </button>
          <button
            onClick={() => scrollToSection('how-it-works')}
            className="text-neutral-300 hover:text-white transition-colors"
          >
            {t.header.howItWorks}
          </button>
          <button
            onClick={() => scrollToSection('use-cases')}
            className="text-neutral-300 hover:text-white transition-colors"
          >
            {t.header.useCases}
          </button>
        </nav>
        
        {/* Right side buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Language Switcher */}
          <button
            onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}
            className="flex items-center gap-2 px-3 py-2 text-neutral-300 hover:text-white transition-colors border border-neutral-700 rounded-lg hover:border-neutral-500"
            aria-label="Switch language"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
            </svg>
            <span className="text-sm font-medium">{language === 'zh' ? 'EN' : '中文'}</span>
          </button>
          
          {/* CTA Button */}
          <button
            onClick={() => scrollToSection('cta')}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-5 py-2 rounded-lg transition-colors"
          >
            {t.header.cta}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-sm border-t border-neutral-800">
          <nav className="container mx-auto px-6 py-4 flex flex-col space-y-4">
            <button
              onClick={() => scrollToSection('why-now')}
              className="text-neutral-300 hover:text-white transition-colors text-left"
            >
              {t.header.whyNow}
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="text-neutral-300 hover:text-white transition-colors text-left"
            >
              {t.header.howItWorks}
            </button>
            <button
              onClick={() => scrollToSection('use-cases')}
              className="text-neutral-300 hover:text-white transition-colors text-left"
            >
              {t.header.useCases}
            </button>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}
                className="flex items-center gap-2 px-3 py-2 text-neutral-300 hover:text-white transition-colors border border-neutral-700 rounded-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
                <span className="text-sm font-medium">{language === 'zh' ? 'EN' : '中文'}</span>
              </button>
              <button
                onClick={() => scrollToSection('cta')}
                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-5 py-2 rounded-lg transition-colors"
              >
                {t.header.cta}
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
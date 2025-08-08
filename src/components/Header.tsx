import { useState } from 'react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
          Auto<span className="gradient-text">Flow</span>
        </h1>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <button
            onClick={() => scrollToSection('why-now')}
            className="text-neutral-300 hover:text-white transition-colors"
          >
            核心优势
          </button>
          <button
            onClick={() => scrollToSection('how-it-works')}
            className="text-neutral-300 hover:text-white transition-colors"
          >
            实现方法
          </button>
          <button
            onClick={() => scrollToSection('use-cases')}
            className="text-neutral-300 hover:text-white transition-colors"
          >
            应用场景
          </button>
        </nav>
        
        {/* CTA Button */}
        <button
          onClick={() => scrollToSection('cta')}
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-5 py-2 rounded-lg transition-colors hidden md:block"
        >
          立即体验
        </button>

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
              核心优势
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="text-neutral-300 hover:text-white transition-colors text-left"
            >
              实现方法
            </button>
            <button
              onClick={() => scrollToSection('use-cases')}
              className="text-neutral-300 hover:text-white transition-colors text-left"
            >
              应用场景
            </button>
            <button
              onClick={() => scrollToSection('cta')}
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-5 py-2 rounded-lg transition-colors w-fit"
            >
              立即体验
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
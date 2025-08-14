
import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import SignupModal from './SignupModal';

const Hero: React.FC = () => {
  const { t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="relative pt-48 pb-32 dot-grid-background">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-0"></div>
      <div className="container mx-auto px-6 text-center relative z-10">
        <h2 className="text-4xl md:text-6xl font-extrabold text-white leading-tight animate-fade-in">
          {t.hero.title}<span className="gradient-text">{t.hero.titleHighlight}</span>
        </h2>
        <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-neutral-300 animate-slide-up" 
           dangerouslySetInnerHTML={{ __html: t.hero.subtitle }} />
        <div className="mt-10 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 animate-slide-up">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-white text-black font-bold px-8 py-3 rounded-lg hover:bg-neutral-200 transition-transform hover:scale-105 w-full sm:w-auto"
          >
            {t.hero.tryButton}
          </button>
          <button
            className="border border-neutral-600 text-white font-bold px-8 py-3 rounded-lg hover:bg-neutral-800 transition-all hover:scale-105 w-full sm:w-auto"
            onClick={() => window.open('#', '_blank')}
          >
            {t.hero.demoButton}
          </button>
        </div>
      </div>
      
      {/* Signup Modal */}
      <SignupModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </section>
  );
};

export default Hero;
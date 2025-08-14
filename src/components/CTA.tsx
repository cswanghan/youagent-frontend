
import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import SignupModal from './SignupModal';

const CTA: React.FC = () => {
  const { t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleGetStarted = () => {
    setIsModalOpen(true);
  };

  return (
    <section id="cta" className="py-24 bg-black">
      <div className="container mx-auto px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-4xl md:text-5xl font-extrabold text-white">{t.cta.title}</h3>
          <p className="mt-6 text-lg text-neutral-400">
            {t.cta.subtitle}
          </p>
          <div className="mt-10">
            <button
              onClick={handleGetStarted}
              className="bg-purple-600 text-white font-bold text-lg px-10 py-4 rounded-lg hover:bg-purple-700 transition-transform hover:scale-105 inline-block"
            >
              {t.cta.button}
            </button>
          </div>
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

export default CTA;
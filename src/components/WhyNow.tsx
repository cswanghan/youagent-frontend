
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface AdvantageCardProps {
  title: string;
  description: string;
}

const AdvantageCard: React.FC<AdvantageCardProps> = ({ title, description }) => (
  <div className="bg-neutral-900 p-8 rounded-2xl border border-neutral-800 card-glow">
    <h4 className="text-xl font-bold text-white">{title}</h4>
    <p className="mt-3 text-neutral-400">{description}</p>
  </div>
);

const WhyNow: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="why-now" className="py-24 bg-black">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h3 className="text-3xl md:text-4xl font-bold text-white">{t.whyNow.title}</h3>
          <p className="mt-4 text-lg text-neutral-400">{t.whyNow.subtitle}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {t.whyNow.advantages.map((advantage, index) => (
            <AdvantageCard
              key={index}
              title={advantage.title}
              description={advantage.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyNow;
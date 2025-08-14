
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface UseCaseCardProps {
  title: string;
  features: string[];
}

const UseCaseCard: React.FC<UseCaseCardProps> = ({ title, features }) => (
  <div className="bg-neutral-900 p-8 rounded-2xl border border-neutral-800 card-glow">
    <h4 className="text-xl font-bold text-white">{title}</h4>
    <ul className="mt-4 space-y-2 text-neutral-400 list-disc list-inside">
      {features.map((feature, index) => (
        <li key={index}>{feature}</li>
      ))}
    </ul>
  </div>
);

const UseCases: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="use-cases" className="py-24 bg-black">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h3 className="text-3xl md:text-4xl font-bold text-white">{t.useCases.title}</h3>
          <p className="mt-4 text-lg text-neutral-400">{t.useCases.subtitle}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.useCases.cases.map((useCase, index) => (
            <UseCaseCard
              key={index}
              title={useCase.title}
              features={useCase.features}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases;
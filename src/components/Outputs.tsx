
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface OutputCardProps {
  title: string;
  description: string;
}

const OutputCard: React.FC<OutputCardProps> = ({ title, description }) => (
  <div className="text-center p-8">
    <h4 className="text-2xl font-bold gradient-text">{title}</h4>
    <p className="mt-3 text-neutral-300">{description}</p>
  </div>
);

const Outputs: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-neutral-950">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h3 className="text-3xl md:text-4xl font-bold text-white">{t.outputs.title}</h3>
          <p className="mt-4 text-lg text-neutral-400">{t.outputs.subtitle}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {t.outputs.items.map((output, index) => (
            <OutputCard
              key={index}
              title={output.title}
              description={output.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Outputs;
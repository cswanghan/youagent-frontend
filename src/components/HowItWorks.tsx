
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface StepProps {
  stepNumber: number;
  title: string;
  description: string;
  color: string;
  bgColor: string;
  borderColor: string;
  isLast?: boolean;
}

const Step: React.FC<StepProps> = ({ 
  stepNumber, 
  title, 
  description, 
  color, 
  bgColor, 
  borderColor, 
  isLast = false 
}) => (
  <div className="relative flex flex-col items-center text-center">
    {/* Mobile connector line */}
    {!isLast && (
      <div className="block lg:hidden absolute top-full left-1/2 -translate-x-1/2 w-0.5 h-20 bg-neutral-800"></div>
    )}
    <div className={`w-16 h-16 rounded-full ${bgColor} border-2 ${borderColor} flex items-center justify-center text-2xl font-bold ${color} bg-neutral-950 z-10`}>
      {stepNumber}
    </div>
    <h4 className="mt-4 text-xl font-semibold text-white">{title}</h4>
    <p className="mt-2 text-neutral-400">{description}</p>
  </div>
);

const HowItWorks: React.FC = () => {
  const { t } = useLanguage();

  const stepColors = [
    {
      color: "text-purple-400",
      bgColor: "bg-purple-900/50",
      borderColor: "border-purple-500"
    },
    {
      color: "text-indigo-400",
      bgColor: "bg-indigo-900/50",
      borderColor: "border-indigo-500"
    },
    {
      color: "text-pink-400",
      bgColor: "bg-pink-900/50",
      borderColor: "border-pink-500"
    },
    {
      color: "text-emerald-400",
      bgColor: "bg-emerald-900/50",
      borderColor: "border-emerald-500"
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-neutral-950">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h3 className="text-3xl md:text-4xl font-bold text-white">{t.howItWorks.title}</h3>
          <p className="mt-4 text-lg text-neutral-400">{t.howItWorks.subtitle}</p>
        </div>
        <div className="relative max-w-6xl mx-auto">
          {/* Desktop connector line (behind the steps) */}
          <div className="hidden lg:block absolute top-8 left-0 w-full h-0.5 bg-neutral-800"></div>
          
          {/* Grid for steps */}
          <div className="relative grid grid-cols-1 lg:grid-cols-4 gap-y-20 lg:gap-y-0 lg:gap-x-8">
            {t.howItWorks.steps.map((step, index) => (
              <Step
                key={index}
                stepNumber={index + 1}
                title={step.title}
                description={step.description}
                color={stepColors[index].color}
                bgColor={stepColors[index].bgColor}
                borderColor={stepColors[index].borderColor}
                isLast={index === t.howItWorks.steps.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
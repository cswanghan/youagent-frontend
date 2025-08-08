
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
  const advantages = [
    {
      title: "告别概念混乱",
      description: "我们提供清晰的方法论与强大的工具链，让 Agent 落地不再是难题。"
    },
    {
      title: "超越传统 RPA",
      description: "LLM 赋能的语义理解与自愈能力，告别脆弱、昂贵的旧方案。"
    },
    {
      title: "原生于浏览器",
      description: "基于现代浏览器技术，无侵入式对接任何 SaaS，云端执行更灵活。"
    },
    {
      title: "价值清晰可见",
      description: "将数小时的工作压缩至数秒，流程成功率实时监控，ROI 精准量化。"
    }
  ];

  return (
    <section id="why-now" className="py-24 bg-black">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h3 className="text-3xl md:text-4xl font-bold text-white">为什么是现在？</h3>
          <p className="mt-4 text-lg text-neutral-400">Agent 时代已来，我们为您提供最佳实践</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {advantages.map((advantage, index) => (
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
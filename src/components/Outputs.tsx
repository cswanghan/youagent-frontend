
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
  const outputs = [
    {
      title: "可复用任务模板",
      description: "沉淀团队智慧，将最佳实践固化为模板，新人也能快速上手。"
    },
    {
      title: "可执行 Playbook",
      description: "带监控与自愈能力，稳定可靠，7x24小时为您省心省力。"
    },
    {
      title: "模板市场",
      description: "分享您的创造，发现更多可能，甚至通过模板交易创造收益。"
    }
  ];

  return (
    <section className="py-24 bg-neutral-950">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h3 className="text-3xl md:text-4xl font-bold text-white">您的产出，远不止于自动化</h3>
          <p className="mt-4 text-lg text-neutral-400">沉淀团队智慧，构建资产，创造价值</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {outputs.map((output, index) => (
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
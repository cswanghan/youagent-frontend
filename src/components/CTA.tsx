
const CTA: React.FC = () => {
  const handleGetStarted = () => {
    // 这里可以添加注册或试用逻辑
    window.alert('正在跳转到试用页面...');
  };

  return (
    <section id="cta" className="py-24 bg-black">
      <div className="container mx-auto px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-4xl md:text-5xl font-extrabold text-white">准备好告别重复劳动了吗？</h3>
          <p className="mt-6 text-lg text-neutral-400">
            立即注册，仅需几分钟即可创建您的第一个自动化工作流。加入我们，共同塑造未来的工作方式。
          </p>
          <div className="mt-10">
            <button
              onClick={handleGetStarted}
              className="bg-purple-600 text-white font-bold text-lg px-10 py-4 rounded-lg hover:bg-purple-700 transition-transform hover:scale-105 inline-block"
            >
              免费试用，即刻开始
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
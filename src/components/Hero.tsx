
const Hero: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-48 pb-32 dot-grid-background">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-0"></div>
      <div className="container mx-auto px-6 text-center relative z-10">
        <h2 className="text-4xl md:text-6xl font-extrabold text-white leading-tight animate-fade-in">
          人人可用的<span className="gradient-text">可视化 Agent 构建平台</span>
        </h2>
        <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-neutral-300 animate-slide-up">
          通过<b className="text-white">可视化录制</b>、<b className="text-white">LLM 意图理解</b>与<b className="text-white">自愈执行引擎</b>，将繁琐的浏览器操作，一键封装成可复用的任务模板与工作流。
        </p>
        <div className="mt-10 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 animate-slide-up">
          <button
            onClick={() => scrollToSection('cta')}
            className="bg-white text-black font-bold px-8 py-3 rounded-lg hover:bg-neutral-200 transition-transform hover:scale-105 w-full sm:w-auto"
          >
            开启免费试用
          </button>
          <button
            className="border border-neutral-600 text-white font-bold px-8 py-3 rounded-lg hover:bg-neutral-800 transition-all hover:scale-105 w-full sm:w-auto"
            onClick={() => window.open('#', '_blank')}
          >
            观看演示
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
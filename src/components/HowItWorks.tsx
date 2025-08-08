
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
  const steps = [
    {
      stepNumber: 1,
      title: "记录",
      description: "在浏览器中\"示范\"一次，我们自动捕捉您的每一步操作。",
      color: "text-purple-400",
      bgColor: "bg-purple-900/50",
      borderColor: "border-purple-500"
    },
    {
      stepNumber: 2,
      title: "语义化",
      description: "LLM 将操作序列智能转化为结构化的任务图，理解真实意图。",
      color: "text-indigo-400",
      bgColor: "bg-indigo-900/50",
      borderColor: "border-indigo-500"
    },
    {
      stepNumber: 3,
      title: "参数化",
      description: "轻松标注变量，一键生成可复用的任务表单或 API 接口。",
      color: "text-pink-400",
      bgColor: "bg-pink-900/50",
      borderColor: "border-pink-500"
    },
    {
      stepNumber: 4,
      title: "编排执行",
      description: "将任务串联成工作流，无缝对接 Coze 生态，触达背后 3 万开发者社区，或通过定时、Webhook 等方式自动触发。",
      color: "text-emerald-400",
      bgColor: "bg-emerald-900/50",
      borderColor: "border-emerald-500"
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-neutral-950">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h3 className="text-3xl md:text-4xl font-bold text-white">四步构建您的专属 Agent</h3>
          <p className="mt-4 text-lg text-neutral-400">从录制到执行，从未如此简单</p>
        </div>
        <div className="relative max-w-6xl mx-auto">
          {/* Desktop connector line (behind the steps) */}
          <div className="hidden lg:block absolute top-8 left-0 w-full h-0.5 bg-neutral-800"></div>
          
          {/* Grid for steps */}
          <div className="relative grid grid-cols-1 lg:grid-cols-4 gap-y-20 lg:gap-y-0 lg:gap-x-8">
            {steps.map((step, index) => (
              <Step
                key={index}
                stepNumber={step.stepNumber}
                title={step.title}
                description={step.description}
                color={step.color}
                bgColor={step.bgColor}
                borderColor={step.borderColor}
                isLast={index === steps.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
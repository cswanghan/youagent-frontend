
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
  const useCases = [
    {
      title: "电商 / 内容平台",
      features: [
        "商品批量上架与更新",
        "跨平台素材同步",
        "每日运营报表导出"
      ]
    },
    {
      title: "销售 / 客服",
      features: [
        "销售线索自动录入 CRM",
        "批量处理客服工单",
        "常见问答一键回复"
      ]
    },
    {
      title: "财务 / HR",
      features: [
        "发票批量下载与对账",
        "社保、招聘网站数据搬运",
        "候选人信息同步"
      ]
    }
  ];

  return (
    <section id="use-cases" className="py-24 bg-black">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h3 className="text-3xl md:text-4xl font-bold text-white">为高频重复场景而生</h3>
          <p className="mt-4 text-lg text-neutral-400">覆盖运营、销售、财务、人事的日常工作</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => (
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
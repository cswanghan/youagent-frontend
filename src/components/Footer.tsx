
const Footer: React.FC = () => {
  const handleLinkClick = (link: string) => {
    // 这里可以添加具体的链接跳转逻辑
    window.alert(`跳转到: ${link}`);
  };

  return (
    <footer className="bg-neutral-950 border-t border-neutral-800">
      <div className="container mx-auto px-6 py-8 text-center text-neutral-500">
        <p>&copy; 2025 AutoFlow. All Rights Reserved.</p>
        <div className="mt-4 flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-6">
          <button
            onClick={() => handleLinkClick('关于我们')}
            className="hover:text-white transition-colors"
          >
            关于我们
          </button>
          <button
            onClick={() => handleLinkClick('服务条款')}
            className="hover:text-white transition-colors"
          >
            服务条款
          </button>
          <button
            onClick={() => handleLinkClick('隐私政策')}
            className="hover:text-white transition-colors"
          >
            隐私政策
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
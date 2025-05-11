
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const CtaSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 px-4 bg-gradient-to-r from-artflow-blue to-artflow-pink text-white">
      <div className="container mx-auto max-w-3xl text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">加入我们的低碳艺术社区</h2>
        <p className="text-lg mb-8 opacity-90">
          成为LowCarbon Art的一员，展示您的作品，结识志同道合的伙伴，探索无限可能。
        </p>
        <Link to="/register" className="btn-accent inline-flex items-center">
          <span>立即注册</span>
          <ArrowRight size={18} className="ml-2" />
        </Link>
      </div>
    </section>
  );
};

export default CtaSection;

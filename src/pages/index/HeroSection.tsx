import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import HeroCarousel from "./HeroCarousel";
import { useIsMobile } from "@/hooks/use-mobile";

interface HeroSectionProps {
  onUploadClick: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onUploadClick }) => {
  const isMobile = useIsMobile();
  
  return (
    <section className="pt-20 md:pt-16 pb-6 md:pb-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="relative order-1 text-center md:text-left">
            <h1 className="hero-text mb-4 text-4xl md:text-5xl">
              <span className="block text-LowCarbon Art-blue">LowCarbon Art</span>
              <span className="block">创意无限</span>
              <span className="block">低碳生活</span>
            </h1>
            
            <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto md:mx-0">
              专为闲置艺术爱好者打造的社交平台，旨在循环闲置价值，重塑绿色生活。
            </p>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <button 
                onClick={onUploadClick}
                className="btn-primary flex items-center"
              >
                <span>上传作品</span>
                <ArrowRight size={18} className="ml-2" />
              </button>
              
              <Link to="/categories" className="btn-secondary">
                浏览闲置
              </Link>
            </div>
          </div>
          
          {/* For desktop: Show carousel in the second column */}
          {!isMobile && (
            <div className="relative order-2">
              <HeroCarousel />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

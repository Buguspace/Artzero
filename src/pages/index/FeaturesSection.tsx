
import React from "react";
import { Upload, Heart, Image } from "lucide-react";

const FeaturesSection: React.FC = () => {
  return (
    <section className="py-12 md:py-16 bg-gray-50 px-4">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">特色功能</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="card-stylish">
            <div className="text-LowCarbon Art-blue mb-4">
              <Upload size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">视觉化发布系统</h3>
            <p className="text-gray-600">
              内置艺术滤镜、九宫格创作板和手绘批注功能，让您尽情展示艺术创意。
            </p>
          </div>
          
          <div className="card-stylish">
            <div className="text-artflow-pink mb-4">
              <Heart size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">咖啡豆系统</h3>
            <p className="text-gray-600">
              通过日常活动获取咖啡豆，解锁更多功能与特权，提升您的艺术展示。
            </p>
          </div>
          
          <div className="card-stylish">
            <div className="text-artflow-yellow mb-4">
              <Image size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">创意互动机制</h3>
            <p className="text-gray-600">
              漂流本功能、以物换展和工具图书馆，促进艺术家之间的互动与交流。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

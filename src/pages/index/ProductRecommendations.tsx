import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ProductCard from "../../components/ProductCard";

const ProductRecommendations: React.FC = () => {
  // Mock recommended products data
  const recommendedProducts = [
    {
      id: "1",
      image: "/public/lovable-uploads/0f9d1c94-3adf-4464-8970-e47dc42ac26d.png",
      title: "手工编织环保手提袋",
      price: "¥99",
      seller: "绿色工坊",
      likes: 32
    },
    {
      id: "2",
      image: "/public/lovable-uploads/adb68495-4038-4b42-82e8-5a95aba273d4.png",
      title: "再生材料制作的艺术摆件",
      price: "¥158",
      seller: "创意星球",
      likes: 45
    },
    {
      id: "3",
      image: "/public/lovable-uploads/e513ef7e-981b-40f2-ac5a-d741573bbbd3.png",
      title: "可降解植物纤维艺术画",
      price: "¥288",
      seller: "自然之美",
      likes: 67
    },
    {
      id: "4",
      image: "/public/lovable-uploads/6a7bdcbb-54c8-47e8-a391-83496ce93a1e.png",
      title: "低碳环保主题装饰画",
      price: "¥199",
      seller: "生态艺术家",
      likes: 28
    }
  ];

  return (
    <section className="py-12 md:py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">优品浏览</h2>
          <Link to="/categories" className="text-lowcarbonart-blue hover:underline flex items-center">
            查看更多
            <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendedProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              image={product.image}
              title={product.title}
              price={product.price}
              seller={product.seller}
              likes={product.likes}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductRecommendations;

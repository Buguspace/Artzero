import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ProductCard from "../../components/ProductCard";
import { useIsMobile } from "../../hooks/use-mobile";
import { toast } from "sonner";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const ProductRecommendations: React.FC = () => {
  const isMobile = useIsMobile();
  const [isLoading, setIsLoading] = useState(false);
  
  // Mock recommended products data
  const [recommendedProducts, setRecommendedProducts] = useState([
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
  ]);

  const handleRefresh = useCallback(async () => {
    setIsLoading(true);
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 模拟获取新数据
      const newProducts = [
        {
          id: "5",
          image: "/public/lovable-uploads/new-product-1.png",
          title: "环保创意新品1",
          price: "¥299",
          seller: "创新工坊",
          likes: 89
        },
        {
          id: "6",
          image: "/public/lovable-uploads/new-product-2.png",
          title: "环保创意新品2",
          price: "¥399",
          seller: "绿色设计",
          likes: 76
        }
      ];
      
      setRecommendedProducts(prev => [...newProducts, ...prev]);
      toast.success("刷新成功");
    } catch (error) {
      toast.error("刷新失败，请重试");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <section className="py-12 md:py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold">优品浏览</h2>
          <Link to="/categories" className="text-lowcarbonart-blue hover:underline flex items-center">
            查看更多
            <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
        
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {recommendedProducts.map((product) => (
              <CarouselItem key={product.id} className="md:basis-1/4 lg:basis-1/4">
                <div className="p-1">
                  <ProductCard
                    id={product.id}
                    image={product.image}
                    title={product.title}
                    price={product.price}
                    seller={product.seller}
                    likes={product.likes}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export default React.memo(ProductRecommendations);

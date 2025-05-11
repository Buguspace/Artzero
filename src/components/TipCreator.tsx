import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Coins, Heart } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

// 自定义咖啡杯SVG图标
const CoffeeIcon = ({
  className
}: {
  className?: string;
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor" stroke="none" className={className}>
    <path d="M8.5,12.8c-0.7-0.4-1.8-0.8-1.8-1.8c0-0.5,0.6-0.9,1.6-0.9s1.8,0.5,2.4,0.9l0.9-1.6C10.7,8.6,9.9,8,8.4,8C6.1,8,5,9.5,5,10.9 c0,1.7,1.3,2.3,2.5,2.9c0.9,0.4,1.6,0.8,1.6,1.7c0,0.7-0.6,1-1.6,1c-1,0-2.2-0.5-2.8-1.1L4,17.1c0.9,0.7,2.1,1.3,3.5,1.3 c2.3,0,3.6-1.3,3.6-3C11.1,14,10,13.4,8.5,12.8z M19.4,8.2h-4.1v10h2.2v-3.4h1.8c2.3,0,4-1.6,4-3.4C23.3,9.5,21.6,8.2,19.4,8.2z M19.2,12.8h-1.7v-2.6h1.7c0.8,0,1.5,0.5,1.5,1.3C20.7,12.3,20.1,12.8,19.2,12.8z M16.5,1C16.5,1,16.5,1,16.5,1 c0,0,0.1,0.1,0.2,0.2c0.2,0.2,0.5,0.5,0.7,0.8c0.3,0.3,0.6,0.7,0.8,1c0.2,0.3,0.3,0.6,0.3,0.8c0,0.2-0.1,0.4-0.2,0.5 c-0.1,0.1-0.3,0.2-0.5,0.2c-0.2,0-0.4,0-0.5-0.1c-0.2-0.1-0.3-0.3-0.5-0.5c-0.2-0.3-0.3-0.6-0.5-0.9c-0.1-0.4-0.2-0.7-0.2-1.1 c0-0.3,0-0.6,0.1-0.8C16.2,1.1,16.3,1,16.5,1z M12.5,1C12.5,1,12.5,1,12.5,1c0,0,0.1,0.1,0.2,0.2c0.2,0.2,0.5,0.5,0.7,0.8 c0.3,0.3,0.6,0.7,0.8,1c0.2,0.3,0.3,0.6,0.3,0.8c0,0.2-0.1,0.4-0.2,0.5c-0.1,0.1-0.3,0.2-0.5,0.2c-0.2,0-0.4,0-0.5-0.1 c-0.2-0.1-0.3-0.3-0.5-0.5c-0.2-0.3-0.3-0.6-0.5-0.9c-0.1-0.4-0.2-0.7-0.2-1.1c0-0.3,0-0.6,0.1-0.8C12.2,1.1,12.3,1,12.5,1z" />
    <path d="M5,8h14c1.1,0,2,0.9,2,2v1c0,3-3.6,5-3.6,5H6.6C6.6,16,3,14,3,11v-1C3,8.9,3.9,8,5,8z" />
    <ellipse cx="12" cy="19" rx="9" ry="1.5" />
  </svg>;

interface TipCreatorProps {
  productId: string | number;
  sellerName: string;
  initialBeans?: number;
}

const TipCreator: React.FC<TipCreatorProps> = ({
  productId,
  sellerName,
  initialBeans = 0
}) => {
  const [beansCount, setBeansCount] = useState(initialBeans);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const tipAmounts = [5, 10, 20, 50];

  const handleSendTip = () => {
    if (!selectedAmount) {
      toast("请选择打赏数量", {
        description: "选择一个咖啡豆数量来支持创作者"
      });
      return;
    }

    // 获取当前用户的咖啡豆数量
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{"coffeeBean": 0}');
    
    // 检查用户是否有足够的咖啡豆
    if (currentUser.coffeeBean < selectedAmount) {
      toast.error("咖啡豆不足", {
        description: "您的咖啡豆数量不足以完成打赏"
      });
      return;
    }

    // 更新创作者的咖啡豆数量
    setBeansCount(beansCount + selectedAmount);
    
    // 更新当前用户的咖啡豆数量
    currentUser.coffeeBean -= selectedAmount;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    // 更新作品数据中的咖啡豆数量
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    const updatedProducts = products.map((product: any) => {
      if (product.id === productId) {
        return { ...product, beansCount: product.beansCount + selectedAmount };
      }
      return product;
    });
    localStorage.setItem('products', JSON.stringify(updatedProducts));

    // 触发自定义事件，通知其他组件更新咖啡豆显示
    window.dispatchEvent(new CustomEvent('beansUpdated', {
      detail: {
        productId,
        newBeansCount: beansCount + selectedAmount
      }
    }));

    toast.success("打赏成功", {
      description: `感谢您送出 ${selectedAmount} 个咖啡豆！`
    });
    setSelectedAmount(null);
  };

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="flex flex-col items-center">
          <div className="bg-white px-4 py-2 rounded-full border border-gray-200 mb-2">
            <span className="flex items-center text-[rgb(255_0_199)]">
              <Coins className="h-4 w-4 mr-1" />
              <span className="ml-1 text-sm">赏一个</span>
            </span>
          </div>
          <Button variant="outline" size="icon" className="rounded-full hover:bg-[rgb(255_0_199_/_0.1)] hover:text-[rgb(255_0_199)]">
            <CoffeeIcon className="h-5 w-5 text-[rgb(255_0_199)]" />
          </Button>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 bg-white shadow-lg border-gray-100 p-4">
        <div className="text-center mb-4">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[rgb(255_0_199_/_0.2)] mb-2">
            <CoffeeIcon className="h-7 w-7 text-[rgb(255_0_199)]" />
          </div>
          <h3 className="text-lg font-medium">支持创作者</h3>
          <p className="text-gray-600 text-sm mt-1">
            送上咖啡豆，鼓励 {sellerName} 分享更多好物
          </p>
        </div>
        
        <div className="grid grid-cols-4 gap-2 mb-4">
          {tipAmounts.map(amount => (
            <Button 
              key={amount} 
              variant={selectedAmount === amount ? "default" : "outline"} 
              className={`h-12 ${selectedAmount === amount ? 'bg-[rgb(255_0_199)] border-[rgb(255_0_199)] hover:bg-[rgb(255_0_199_/_0.9)]' : ''}`} 
              onClick={() => setSelectedAmount(amount)}
            >
              <div className="flex flex-col items-center">
                <span className="text-base font-bold">{amount}</span>
                <span className="text-xs">咖啡豆</span>
              </div>
            </Button>
          ))}
        </div>
        
        <Button 
          className="w-full bg-[rgb(255_0_199)] hover:bg-[rgb(255_0_199_/_0.9)]" 
          disabled={!selectedAmount} 
          onClick={handleSendTip}
        >
          <Heart className="mr-2 h-4 w-4" /> 
          打赏创作者
        </Button>
      </HoverCardContent>
    </HoverCard>
  );
};

export default TipCreator;
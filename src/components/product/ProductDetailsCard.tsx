import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PriceDisplay from "./PriceDisplay";
import ProductMetadata from "./ProductMetadata";
import SharePopover from "./SharePopover";
import FavoriteButton from "./FavoriteButton";
import { toast } from "sonner";

interface ProductDetailsCardProps {
  product: {
    id: number;
    title: string;
    author: string;
    authorAvatar: string;
    price: number;
    originalPrice: number;
    beansCount: number;
    condition: string;
    location: string;
    publishDate: string;
    imageUrl?: string;
    images?: string[];
    category?: string;
  };
}

const ProductDetailsCard: React.FC<ProductDetailsCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const isRental = product.category === 'rental';
  
  const handleContact = () => {
    // 跳转到消息页面，并传递卖家信息
    navigate(`/messages?chat=${product.author}`);
  };
  
  return (
    <Card className="mb-4">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl text-left">{product.title}</CardTitle>
            {isRental && (
              <div className="mt-1 inline-block bg-green-500 bg-opacity-90 px-2 py-0.5 rounded text-xs font-medium text-white">
                出租
              </div>
            )}
          </div>
        </div>
        <CardDescription className="text-left flex items-center justify-between">
          <Link 
            to={`/profile?author=${product.author}`} 
            className="flex items-center hover:text-artflow-blue transition-colors"
          >
            <div className="w-6 h-6 rounded-full bg-gray-200 overflow-hidden mr-2">
              <img
                src={product.authorAvatar}
                alt={product.author}
                className="w-full h-full object-cover"
              />
            </div>
            <span>{product.author}</span>
          </Link>
          <div className="flex items-center text-sm">
            <span className="inline-block w-3 h-3 bg-artflow-blue rounded-full mr-1"></span>
            <span>{product.beansCount} 咖啡豆</span>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <PriceDisplay 
          price={product.price} 
          originalPrice={product.originalPrice}
          isRental={isRental} 
        />

        <ProductMetadata 
          condition={product.condition} 
          location={product.location} 
          publishDate={product.publishDate}
          category={product.category}
        />

        <div className="flex space-x-2">
          <Button className="flex-1" size="lg" onClick={handleContact}>
            {isRental ? "联系房东" : "联系卖家"}
          </Button>
          <FavoriteButton product={product} />
          <SharePopover product={product} />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductDetailsCard;

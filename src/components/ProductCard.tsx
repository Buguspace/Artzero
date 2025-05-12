import React from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "../hooks/use-mobile";
import LazyImage from "./LazyImage";

interface ProductCardProps {
  id: string;
  image: string;
  title: string;
  price: string;
  seller: string;
  likes: number;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  image,
  title,
  price,
  seller,
  likes,
  className,
}) => {
  const isMobile = useIsMobile();
  
  return (
    <Card className={cn("overflow-hidden transition-all hover:shadow-md", className)}>
      <Link to={`/product/${id}`}>
        <CardHeader className="p-0">
          <AspectRatio ratio={4/3}>
            <LazyImage
              src={image}
              alt={title}
              className="w-full h-full object-cover"
            />
          </AspectRatio>
        </CardHeader>
      </Link>
      <CardContent className={cn("p-4", isMobile ? "p-2" : "")}>
        <Link to={`/product/${id}`}>
          <h3 className={cn("font-medium line-clamp-2 hover:text-lowcarbonart-blue transition-colors", 
            isMobile ? "text-sm" : "text-lg")}>
            {title}
          </h3>
        </Link>
        <div className="flex justify-between items-center mt-2">
          <p className={cn("font-bold text-lowcarbonart-pink", isMobile ? "text-sm" : "text-lg")}>{price}</p>
          <Link 
            to={`/profile?user=${seller}`} 
            className={cn("text-gray-600 hover:text-lowcarbonart-blue truncate", 
              isMobile ? "text-xs max-w-[35%]" : "text-sm max-w-[40%]")}
          >
            {seller}
          </Link>
        </div>
      </CardContent>
      <CardFooter className={cn("pt-0 flex justify-end", isMobile ? "p-2" : "p-4")}>
        <Button variant="ghost" size="sm" className={cn("gap-1", isMobile ? "h-6 px-2" : "")}>
          <Heart size={isMobile ? 12 : 16} />
          <span className={isMobile ? "text-xs" : ""}>{likes}</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default React.memo(ProductCard);

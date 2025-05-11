
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface ProductDescriptionCardProps {
  description: string;
}

const ProductDescriptionCard: React.FC<ProductDescriptionCardProps> = ({ description }) => {
  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <CardTitle className="text-left text-lg">商品详情</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

export default ProductDescriptionCard;

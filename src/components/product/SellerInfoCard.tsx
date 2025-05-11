
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface SellerInfoCardProps {
  author: string;
  authorAvatar: string;
}

const SellerInfoCard: React.FC<SellerInfoCardProps> = ({ author, authorAvatar }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-left text-lg">卖家信息</CardTitle>
      </CardHeader>
      <CardContent>
        <Link 
          to={`/profile?author=${author}`} 
          className="flex items-center space-x-2 hover:text-artflow-blue transition-colors"
        >
          <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
            <img
              src={authorAvatar}
              alt={author}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="font-medium">{author}</p>
            <p className="text-sm text-gray-500">已认证卖家</p>
          </div>
        </Link>
      </CardContent>
    </Card>
  );
};

export default SellerInfoCard;

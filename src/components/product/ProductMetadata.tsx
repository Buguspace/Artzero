
import React from "react";
import { Tag, MapPin, Clock, Home } from "lucide-react";

interface ProductMetadataProps {
  condition: string;
  location: string;
  publishDate: string;
  category?: string;
}

const ProductMetadata: React.FC<ProductMetadataProps> = ({ 
  condition, 
  location, 
  publishDate,
  category
}) => {
  // Format date string
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };
  
  const isRental = category === 'rental';
  
  return (
    <div className="space-y-2">
      {isRental ? (
        <div className="flex items-center text-gray-600">
          <Home size={16} className="mr-2" />
          <span>出租类型：{condition}</span>
        </div>
      ) : (
        <div className="flex items-center text-gray-600">
          <Tag size={16} className="mr-2" />
          <span>成色：{condition}</span>
        </div>
      )}
      
      <div className="flex items-center text-gray-600">
        <MapPin size={16} className="mr-2" />
        <span>位置：{location}</span>
      </div>
      
      <div className="flex items-center text-gray-600">
        <Clock size={16} className="mr-2" />
        <span>发布时间：{formatDate(publishDate)}</span>
      </div>
    </div>
  );
};

export default ProductMetadata;

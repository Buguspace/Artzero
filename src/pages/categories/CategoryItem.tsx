
import React from "react";
import { Link } from "react-router-dom";
import { useFavorites } from "@/hooks/use-favorites";
import FavoriteButton from "./FavoriteButton";

export interface CategoryItemType {
  id: number;
  title: string;
  author: string;
  imageUrl: string;
  category: string;
  beansCount: number;
  price: number;
  publishDate: string;
  location?: string;
  condition?: string;
}

interface CategoryItemProps {
  item: CategoryItemType;
  isFavorited?: boolean;
  onToggleFavorite?: (item: CategoryItemType) => void;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ 
  item, 
  isFavorited = false, 
  onToggleFavorite 
}) => {
  // Use the custom hook for favorites management
  const { isFavorite, toggleFavorite: handleLocalToggle } = useFavorites(item, isFavorited);
  
  // Use parent-provided toggle function or local implementation
  const toggleFavorite = (e: React.MouseEvent) => {
    if (onToggleFavorite) {
      onToggleFavorite(item);
    } else {
      handleLocalToggle(e);
    }
  };

  // Determine if this is a rental item
  const isRental = item.category === 'rental';

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="aspect-video bg-gray-200 relative">
        <Link to={`/product/${item.id}`}>
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-cover cursor-pointer"
          />
        </Link>
        
        <FavoriteButton 
          isFavorite={isFavorite} 
          onClick={toggleFavorite} 
        />
        
        {/* Show "My Work" badge for user's own artworks */}
        {item.author === "Me" && (
          <div className="absolute bottom-2 left-2 bg-blue-500 bg-opacity-90 px-2 py-1 rounded text-xs font-medium text-white">
            我的作品
          </div>
        )}
        
        {/* Show rental badge if it's a rental item */}
        {isRental && (
          <div className="absolute bottom-2 left-2 bg-green-500 bg-opacity-90 px-2 py-1 rounded text-xs font-medium text-white">
            出租
          </div>
        )}
      </div>
      <div className="p-3">
        <h3 className="text-base font-bold truncate">{item.title}</h3>
        
        {/* Show location for rental items */}
        {isRental && item.location && (
          <div className="text-xs text-gray-500 mt-1 truncate">
            位置: {item.location}
          </div>
        )}
        
        <div className="flex justify-between items-center mt-3">
          <div className="flex items-center text-sm text-gray-600">
            <span className="inline-block w-3 h-3 bg-artflow-blue rounded-full mr-1"></span>
            <span>¥{item.price}{isRental ? '/月' : ''}</span>
          </div>
          <Link 
            to={`/product/${item.id}`} 
            className="text-artflow-blue text-xs font-medium hover:underline"
          >
            查看详情
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CategoryItem;


import React from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import EmptyState from "./EmptyState";

interface FavoriteItem {
  id: number;
  title: string;
  author: string;
  imageUrl: string;
  category: string;
  beansCount: number;
  price: number;
  publishDate: string;
}

interface UserFavoritesProps {
  favorites: FavoriteItem[];
  removeFavorite: (itemId: number) => void;
}

const UserFavorites: React.FC<UserFavoritesProps> = ({ favorites, removeFavorite }) => {
  // Get category name for display
  const getCategoryName = (category: string) => {
    switch (category) {
      case "books":
        return "书籍";
      case "art":
        return "艺术";
      case "music":
        return "音乐";
      case "video":
        return "视频";
      default:
        return category;
    }
  };

  if (favorites.length === 0) {
    return (
      <EmptyState
        icon={Heart}
        title="暂无收藏内容"
        description="浏览作品并点击心形图标将它们添加到您的收藏"
        buttonText="浏览作品"
        buttonAction={() => window.location.href = '/categories'}
        buttonVariant="outline"
      />
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {favorites.map((item) => (
        <div key={item.id} className="bg-gray-50 rounded-md overflow-hidden border">
          <Link to={`/product/${item.id}`} className="block">
            <div className="aspect-video relative">
              <img 
                src={item.imageUrl} 
                alt={item.title} 
                className="w-full h-full object-cover"
              />
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  removeFavorite(item.id);
                }}
                className="absolute top-2 right-2 p-1.5 rounded-full bg-red-100 text-red-500"
              >
                <Heart size={16} fill="currentColor" />
              </button>
            </div>
          </Link>
          <div className="p-3">
            <h3 className="font-medium text-sm truncate">{item.title}</h3>
            <div className="flex justify-between items-center mt-2">
              <div className="text-xs text-gray-500">
                {getCategoryName(item.category)}
              </div>
              <div className="text-sm font-medium">
                ¥{item.price}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserFavorites;

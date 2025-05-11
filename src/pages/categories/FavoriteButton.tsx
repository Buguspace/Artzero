
import React from "react";
import { Heart } from "lucide-react";

interface FavoriteButtonProps {
  isFavorite: boolean;
  onClick: (e: React.MouseEvent) => void;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ isFavorite, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className={`absolute top-2 right-2 p-1.5 rounded-full ${
        isFavorite 
          ? 'bg-red-100 text-red-500'
          : 'bg-white bg-opacity-90 text-gray-500 hover:text-red-500'
      }`}
      aria-label={isFavorite ? "从收藏中移除" : "添加到收藏"}
    >
      <Heart size={16} fill={isFavorite ? "currentColor" : "none"} />
    </button>
  );
};

export default FavoriteButton;

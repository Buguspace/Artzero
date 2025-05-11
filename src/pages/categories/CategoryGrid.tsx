
import React from "react";
import CategoryItem, { CategoryItemType } from "./CategoryItem";
import { useIsMobile } from "@/hooks/use-mobile";

interface CategoryGridProps {
  items: CategoryItemType[];
  favorites?: number[];
  onToggleFavorite?: (item: CategoryItemType) => void;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ items, favorites = [], onToggleFavorite }) => {
  const isMobile = useIsMobile();
  
  return (
    <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'} gap-3`}>
      {items.map((item) => (
        <CategoryItem 
          key={item.id}
          item={item}
          isFavorited={favorites.includes(item.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
};

export default CategoryGrid;

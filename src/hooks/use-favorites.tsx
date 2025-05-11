
import { useState, useEffect } from "react";
import { toast } from "@/components/ui/sonner";
import { CategoryItemType } from "@/pages/categories/CategoryItem";

export function useFavorites(item: CategoryItemType, initialFavorited: boolean = false) {
  const [isFavorite, setIsFavorite] = useState(initialFavorited);
  
  // Update local state when initialFavorited prop changes
  useEffect(() => {
    setIsFavorite(initialFavorited);
  }, [initialFavorited]);

  // Check if the item is in favorites on component mount
  useEffect(() => {
    const checkFavoriteStatus = () => {
      const savedFavorites = localStorage.getItem('userFavoriteItems');
      if (savedFavorites) {
        const favorites = JSON.parse(savedFavorites);
        const isInFavorites = favorites.some((favItem: CategoryItemType) => favItem.id === item.id);
        setIsFavorite(isInFavorites);
      }
    };
    
    checkFavoriteStatus();
    
    // Listen for storage changes (in case favorites are updated in another tab)
    const handleStorageChange = () => checkFavoriteStatus();
    
    // Listen for custom event when favorites are updated
    const handleFavoritesUpdate = () => checkFavoriteStatus();
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('favoritesUpdated', handleFavoritesUpdate);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('favoritesUpdated', handleFavoritesUpdate);
    };
  }, [item.id]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation to product detail
    
    const savedFavorites = localStorage.getItem('userFavoriteItems');
    let favorites = savedFavorites ? JSON.parse(savedFavorites) : [];
    
    if (isFavorite) {
      // Remove from favorites
      favorites = favorites.filter((favItem: CategoryItemType) => favItem.id !== item.id);
      toast.success("已从收藏中移除");
    } else {
      // Add to favorites
      favorites.push(item);
      toast.success("已添加到收藏");
    }
    
    localStorage.setItem('userFavoriteItems', JSON.stringify(favorites));
    setIsFavorite(!isFavorite);
    
    // Dispatch a custom event to notify other components
    window.dispatchEvent(new Event('favoritesUpdated'));
  };

  return { isFavorite, toggleFavorite };
}

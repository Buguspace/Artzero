
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { CategoryItemType } from "@/pages/categories/CategoryItem";

interface FavoriteButtonProps {
  product: {
    id: number;
    title: string;
    author: string;
    imageUrl?: string;
    images?: string[];
    beansCount: number;
    price: number;
    publishDate: string;
    category?: string;
  };
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ product }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  
  useEffect(() => {
    const checkFavoriteStatus = () => {
      const savedFavorites = localStorage.getItem('userFavoriteItems');
      if (savedFavorites) {
        const favorites = JSON.parse(savedFavorites);
        const isInFavorites = favorites.some((item: any) => item.id === product.id);
        setIsFavorite(isInFavorites);
      }
    };
    
    checkFavoriteStatus();
    
    // Listen for storage changes and custom favoritesUpdated event
    const handleStorageChange = () => checkFavoriteStatus();
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('favoritesUpdated', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('favoritesUpdated', handleStorageChange);
    };
  }, [product.id]);
  
  const toggleFavorite = () => {
    const savedFavorites = localStorage.getItem('userFavoriteItems');
    let favorites = savedFavorites ? JSON.parse(savedFavorites) : [];
    
    // Check if product is already in favorites
    const existingIndex = favorites.findIndex((item: any) => item.id === product.id);
    
    if (existingIndex >= 0) {
      // Remove from favorites
      favorites = favorites.filter((item: any) => item.id !== product.id);
      toast.success("已从收藏中移除");
    } else {
      // Add to favorites
      const favoriteItem: CategoryItemType = {
        id: product.id,
        title: product.title,
        author: product.author,
        imageUrl: product.imageUrl || (product.images && product.images.length > 0 ? product.images[0] : ''),
        category: product.category || "rental", // Default category for rentals if not specified
        beansCount: product.beansCount,
        price: product.price,
        publishDate: product.publishDate
      };
      favorites.push(favoriteItem);
      toast.success("已添加到收藏");
    }
    
    // Save updated favorites to localStorage
    localStorage.setItem('userFavoriteItems', JSON.stringify(favorites));
    setIsFavorite(!isFavorite);
    
    // Dispatch a custom event to notify other components
    window.dispatchEvent(new Event('favoritesUpdated'));
  };

  return (
    <Button 
      variant="outline" 
      size="icon" 
      className={`rounded-full ${isFavorite ? "text-red-500" : ""}`}
      onClick={toggleFavorite}
    >
      <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
    </Button>
  );
};

export default FavoriteButton;

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { FavoriteItem } from '@/types/favorite';
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface FavoriteButtonProps {
  item: {
    id: number;
    title: string;
    author: string;
    imageUrl: string;
    category: string;
    beansCount: number;
    price: number;
    publishDate: string;
  };
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ item }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });
    return () => listener?.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    // 检查商品是否已被收藏
    const favorites = JSON.parse(localStorage.getItem('userFavoriteItems') || '[]');
    setIsFavorite(favorites.some((fav: FavoriteItem) => fav.id === item.id));
  }, [item.id]);

  const toggleFavorite = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    const favorites = JSON.parse(localStorage.getItem('userFavoriteItems') || '[]');
    
    if (isFavorite) {
      // 取消收藏
      const updatedFavorites = favorites.filter((fav: FavoriteItem) => fav.id !== item.id);
      localStorage.setItem('userFavoriteItems', JSON.stringify(updatedFavorites));
      setIsFavorite(false);
      toast.success('已取消收藏');
    } else {
      // 添加收藏
      const newFavorite: FavoriteItem = {
        id: item.id,
        title: item.title,
        author: item.author,
        imageUrl: item.imageUrl,
        category: item.category,
        beansCount: item.beansCount,
        price: item.price,
        publishDate: item.publishDate
      };
      
      favorites.push(newFavorite);
      localStorage.setItem('userFavoriteItems', JSON.stringify(favorites));
      setIsFavorite(true);
      toast.success('收藏成功');
    }

    // 触发收藏更新事件
    window.dispatchEvent(new Event('favoritesUpdated'));
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleFavorite}
      className={isFavorite ? 'text-red-500 hover:text-red-600' : ''}
    >
      <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
    </Button>
  );
};

export default FavoriteButton; 
 
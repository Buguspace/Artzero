import React from 'react';
import { FavoriteItem } from '@/types/favorite';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import EmptyState from '@/pages/profile/EmptyState';

interface FavoriteGridProps {
  favorites: FavoriteItem[];
  onRemove: (id: number) => void;
}

const FavoriteGrid: React.FC<FavoriteGridProps> = ({ favorites, onRemove }) => {
  if (!favorites || favorites.length === 0) {
    return <EmptyState title="暂无收藏" description="快去发现并收藏你喜欢的作品吧！" />;
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {favorites.map((item) => (
        <Card key={item.id} className="overflow-hidden">
          <Link to={`/product/${item.id}`}>
            <div className="aspect-square relative">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="object-cover w-full h-full"
              />
            </div>
          </Link>
          <CardContent className="p-4">
            <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">
                  {item.beansCount} 咖啡豆
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <MessageCircle className="h-5 w-5" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => onRemove(item.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">¥{item.price}</span>
              <span className="text-sm text-gray-500">{item.category}</span>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default FavoriteGrid; 
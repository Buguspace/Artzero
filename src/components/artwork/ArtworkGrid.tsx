import React from 'react';
import { Artwork } from '@/types/artwork';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import FavoriteButton from '@/components/FavoriteButton';

interface ArtworkGridProps {
  artworks: Artwork[];
}

const ArtworkGrid: React.FC<ArtworkGridProps> = ({ artworks }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {artworks.map((artwork) => (
        <Card key={artwork.id} className="overflow-hidden">
          <Link to={`/product/${artwork.id}`}>
            <div className="aspect-square relative">
              <img
                src={artwork.imageUrl}
                alt={artwork.title}
                className="object-cover w-full h-full"
              />
            </div>
          </Link>
          <CardContent className="p-4">
            <h3 className="font-semibold text-lg mb-2">{artwork.title}</h3>
            <p className="text-gray-600 text-sm mb-4">{artwork.description}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">
                  {artwork.beansCount} 咖啡豆
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <FavoriteButton
                  item={{
                    id: artwork.id,
                    title: artwork.title,
                    author: "当前用户",
                    imageUrl: artwork.imageUrl,
                    category: artwork.category,
                    beansCount: artwork.beansCount,
                    price: artwork.price,
                    publishDate: artwork.publishDate
                  }}
                />
                <Button variant="ghost" size="icon">
                  <MessageCircle className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">¥{artwork.price}</span>
              <span className="text-sm text-gray-500">{artwork.category}</span>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default ArtworkGrid; 
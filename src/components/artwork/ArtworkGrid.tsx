import React, { useState } from 'react';
import { Artwork } from '@/types/artwork';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import FavoriteButton from '@/components/FavoriteButton';
import EmptyState from '@/pages/profile/EmptyState';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';

interface ArtworkGridProps {
  artworks: Artwork[];
  onDeleteArtwork: (id: number) => void;
}

const ArtworkGrid: React.FC<ArtworkGridProps> = ({ artworks, onDeleteArtwork }) => {
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

  if (!artworks || artworks.length === 0) {
    return <EmptyState title="暂无创作" description="快去发布你的第一件作品吧！" />;
  }

  return (
    <>
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
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => setConfirmDeleteId(artwork.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 className="h-5 w-5" />
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
      {/* 二次确认弹窗 */}
      <Dialog open={confirmDeleteId !== null} onOpenChange={() => setConfirmDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>确认删除作品？</DialogTitle>
          </DialogHeader>
          <div className="py-2 text-gray-600">此操作不可撤销，确定要删除该作品吗？</div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmDeleteId(null)}>取消</Button>
            <Button color="destructive" onClick={() => { if (confirmDeleteId !== null) { onDeleteArtwork(confirmDeleteId); setConfirmDeleteId(null); } }}>确认删除</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ArtworkGrid; 
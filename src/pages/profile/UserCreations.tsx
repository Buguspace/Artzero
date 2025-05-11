
import React from "react";
import { Link } from "react-router-dom";
import { ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import EmptyState from "./EmptyState";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Artwork } from "@/types/artwork";

interface UserCreationsProps {
  artworks: Artwork[];
  onUploadClick: () => void;
}

const UserCreations: React.FC<UserCreationsProps> = ({ artworks, onUploadClick }) => {
  if (artworks.length === 0) {
    return (
      <EmptyState
        icon={ImageIcon}
        title="暂无创作内容"
        description="开始上传您的艺术作品，与社区分享您的创意"
        buttonText="上传作品"
        buttonAction={onUploadClick}
      />
    );
  }

  return (
    <ScrollArea className="max-h-[70vh]">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {artworks.map((artwork) => (
          <div key={artwork.id} className="bg-gray-50 rounded-md overflow-hidden border">
            <Link to={`/product/${artwork.id}`} className="aspect-video relative block">
              <img 
                src={artwork.imageUrl || (artwork.imageUrls && artwork.imageUrls.length > 0 ? artwork.imageUrls[0] : "/placeholder.svg")} 
                alt={artwork.title} 
                className="w-full h-full object-cover"
              />
              {artwork.imageUrls && artwork.imageUrls.length > 1 && (
                <div className="absolute bottom-1 right-1 bg-black bg-opacity-70 text-white text-xs px-1.5 py-0.5 rounded">
                  +{artwork.imageUrls.length - 1}
                </div>
              )}
            </Link>
            <div className="p-3">
              <Link to={`/product/${artwork.id}`}>
                <h3 className="font-medium text-sm truncate hover:text-artflow-blue transition-colors">{artwork.title}</h3>
              </Link>
              <div className="flex justify-between items-center mt-2">
                <div className="text-xs text-gray-500">
                  {artwork.category}
                </div>
                <div className="text-sm font-medium">
                  ¥{artwork.price}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 text-center">
        <Button onClick={onUploadClick} variant="outline">
          上传更多作品
        </Button>
      </div>
    </ScrollArea>
  );
};

export default UserCreations;

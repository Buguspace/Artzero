
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserCreations from "./UserCreations";
import UserFavorites from "./UserFavorites";
import { Artwork } from "@/types/artwork";

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

interface ProfileContentProps {
  userArtworks: Artwork[];
  favorites: FavoriteItem[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  onUploadClick: () => void;
  removeFavorite: (itemId: number) => void;
}

const ProfileContent: React.FC<ProfileContentProps> = ({
  userArtworks,
  favorites,
  activeTab,
  onTabChange,
  onUploadClick,
  removeFavorite
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Tabs defaultValue={activeTab} value={activeTab} onValueChange={onTabChange}>
        <div className="px-6 py-4 border-b">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="creations">我的创作</TabsTrigger>
            <TabsTrigger value="favorites">我的收藏</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="creations" className="p-6">
          <UserCreations artworks={userArtworks} onUploadClick={onUploadClick} />
        </TabsContent>
        
        <TabsContent value="favorites" className="p-6">
          <UserFavorites favorites={favorites} removeFavorite={removeFavorite} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfileContent;

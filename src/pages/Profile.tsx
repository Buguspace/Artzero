import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import UploadArtwork from "../components/UploadArtwork";
import ProfileHeader from "./profile/ProfileHeader";
import ProfileContent from "./profile/ProfileContent";
import MobileNavFooter from "../components/MobileNavFooter";
import { Artwork } from "@/types/artwork";
import { FavoriteItem } from "@/types/favorite";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus, ArrowRight } from "lucide-react";
import ArtworkGrid from "@/components/artwork/ArtworkGrid";
import FavoriteGrid from "@/components/favorite/FavoriteGrid";
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  User,
  Lock,
  Mail,
  MapPin,
  Coffee,
  Bell,
  Shield,
  HelpCircle,
  Settings,
  Trash2,
  LogOut,
} from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import SkeletonProfile from "./profile/SkeletonProfile";
import { useContext } from "react";
import { LoadingContext } from "@/App";
import { useLoadingService } from "@/hooks/useLoadingService";

const Profile: React.FC = () => {
  const { loading, showLoading, hideLoading } = useLoadingService();
  const location = useLocation();
  const navigate = useNavigate();
  const { setLoading } = useContext(LoadingContext);
  const [user, setUser] = useState<any>(() => {
    const cached = localStorage.getItem('currentUser');
    return cached ? JSON.parse(cached) : null;
  });

  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [userArtworks, setUserArtworks] = useState<Artwork[]>([]);
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [activeTab, setActiveTab] = useState<string>("creations");

  useEffect(() => {
    showLoading();
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        navigate("/login");
        setUser(null);
        localStorage.removeItem('currentUser');
      } else {
        setUser(data.user);
        localStorage.setItem('currentUser', JSON.stringify(data.user));
      }
      hideLoading();
    });
    // 路由切换时关闭 loading
    return () => hideLoading();
  }, [location]);

  // Listen for coffee bean updates
  useEffect(() => {
    const handleBeansUpdate = (event: CustomEvent) => {
      const { productId, newBeansCount } = event.detail;
      
      // Update the beans count in the user's artworks
      setUserArtworks(prevArtworks => 
        prevArtworks.map(artwork => 
          artwork.id === productId 
            ? { ...artwork, beansCount: newBeansCount }
            : artwork
        )
      );
    };

    window.addEventListener('beansUpdated', handleBeansUpdate as EventListener);

    return () => {
      window.removeEventListener('beansUpdated', handleBeansUpdate as EventListener);
    };
  }, []);

  const handleUpdateUser = (updatedUser: {
    username: string;
    bio: string;
    gender?: string;
    birthday?: Date;
    school?: string;
    email?: string;
  }) => {
    setUser((prev) => ({
      ...prev,
      ...updatedUser,
    }));
  };
  
  const openUploadModal = async () => {
    setLoading(true);
    try {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        navigate("/login");
        return;
      }
      setIsUploadModalOpen(true);
    } catch (e) {
      console.error('openUploadModal error:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadSuccess = (artwork: Artwork) => {
    // Add the new artwork to the user's artworks
    setUserArtworks((prev) => [artwork, ...prev]);
    
    // Store in localStorage for persistence between page reloads
    const existingArtworks = JSON.parse(localStorage.getItem('userArtworks') || '[]');
    localStorage.setItem('userArtworks', JSON.stringify([artwork, ...existingArtworks]));
  };

  // Remove a favorite item
  const removeFavorite = (itemId: number) => {
    const savedFavorites = localStorage.getItem('userFavoriteItems');
    if (savedFavorites) {
      const favorites = JSON.parse(savedFavorites);
      const updatedFavorites = favorites.filter((item: FavoriteItem) => item.id !== itemId);
      localStorage.setItem('userFavoriteItems', JSON.stringify(updatedFavorites));
      setFavorites(updatedFavorites);
    }
  };

  // Load user artworks and favorites from localStorage on component mount
  useEffect(() => {
    const savedArtworks = localStorage.getItem('userArtworks');
    if (savedArtworks) {
      setUserArtworks(JSON.parse(savedArtworks));
    }
    
    const loadFavorites = () => {
      const savedFavorites = localStorage.getItem('userFavoriteItems');
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    };
    
    loadFavorites();
    
    // Listen for favorites updates
    const handleFavoritesUpdated = () => {
      loadFavorites();
    };
    
    window.addEventListener('favoritesUpdated', handleFavoritesUpdated);
    window.addEventListener('storage', handleFavoritesUpdated);
    
    return () => {
      window.removeEventListener('favoritesUpdated', handleFavoritesUpdated);
      window.removeEventListener('storage', handleFavoritesUpdated);
    };
  }, []);

  // 在 Profile 组件中增加删除作品的处理函数
  const handleDeleteArtwork = (id: number) => {
    const existingArtworks = JSON.parse(localStorage.getItem('userArtworks') || '[]');
    const updatedArtworks = existingArtworks.filter((artwork: Artwork) => artwork.id !== id);
    localStorage.setItem('userArtworks', JSON.stringify(updatedArtworks));
    setUserArtworks(updatedArtworks);
  };

  const sections = [
    {
      title: "个人资料",
      icon: <User className="h-5 w-5 text-primary" />,
      items: [
        {
          title: "个人资料",
          description: "编辑您的个人基本信息",
          path: "/settings/profile/bio",
        },
        {
          title: "头像设置",
          description: "上传或更换您的个人头像",
          path: "/settings/profile/avatar",
        },
        {
          title: "性别设置",
          description: "选择您的性别（男/女/保密）",
          path: "/settings/profile/gender",
        },
        {
          title: "生日设置",
          description: "设置您的出生年月日",
          path: "/settings/profile/birthday",
        },
        {
          title: "学校设置",
          description: "填写您的学校或教育机构",
          path: "/settings/profile/school",
        },
      ],
    },
  ];

  if (!user) { navigate('/login'); return null; }

  return (
    <div className="min-h-screen bg-gray-50 pb-14 md:pb-0">
      <Navbar />
      <div className="container mx-auto pt-24 pb-12 px-4 relative">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/60 z-10">
            <span className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></span>
          </div>
        )}
        <div className="max-w-3xl mx-auto">
          {/* Profile Header */}
          <ProfileHeader user={user} onUpdateUser={handleUpdateUser} />

          {/* User Content Tabs */}
          <div className="mt-8">
            <Tabs defaultValue="creations" value={activeTab} onValueChange={setActiveTab}>
              <div className="flex justify-between items-center mb-6">
                <TabsList>
                  <TabsTrigger value="creations">我的创作</TabsTrigger>
                  <TabsTrigger value="favorites">我的收藏</TabsTrigger>
                </TabsList>
                
                {activeTab === "creations" && (
                  <button 
                    onClick={() => window.location.href = 'https://cc.artzero.ip-ddns.com/publish'}
                    className="btn-primary flex items-center"
                  >
                    <span>发布新作品</span>
                    <ArrowRight size={18} className="ml-2" />
                  </button>
                )}
              </div>
              
              <TabsContent value="creations">
                <ArtworkGrid artworks={userArtworks} onDeleteArtwork={handleDeleteArtwork} />
              </TabsContent>
              
              <TabsContent value="favorites">
                <FavoriteGrid favorites={favorites} onRemove={removeFavorite} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      
      {/* Upload Artwork Modal */}
      <UploadArtwork 
        isOpen={isUploadModalOpen} 
        onClose={() => setIsUploadModalOpen(false)}
        onSuccess={handleUploadSuccess}
      />

      {/* Add mobile navigation footer */}
      <MobileNavFooter />
    </div>
  );
};

export default Profile;

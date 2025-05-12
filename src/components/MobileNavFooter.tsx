import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, List, MessageSquare, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "../hooks/use-mobile";
import UploadArtwork from "./UploadArtwork";
import { supabase } from "@/integrations/supabase/client";

const MobileNavFooter: React.FC = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const navigate = useNavigate();
  
  if (!isMobile) return null;

  const navItems = [
    { 
      icon: Home, 
      label: "主页", 
      path: "/",
      active: location.pathname === "/"
    },
    { 
      icon: List, 
      label: "分类", 
      path: "/categories",
      active: location.pathname.startsWith("/categories")
    },
    { 
      label: "发布", 
      path: "/publish",
      active: location.pathname === "/publish",
      special: true
    },
    { 
      icon: MessageSquare, 
      label: "消息", 
      path: "/messages",
      active: location.pathname === "/messages"
    },
    { 
      icon: User, 
      label: "我", 
      path: "/profile",
      active: location.pathname === "/profile"
    }
  ];

  const handleOpenUploadModal = async () => {
    const { data } = await supabase.auth.getUser();
    if (!data.user) {
      navigate("/login");
      return;
    }
    setIsUploadModalOpen(true);
  };

  // Handle uploading artwork
  const handleUploadSuccess = (artwork: any) => {
    // Add the new artwork to the user's artworks in localStorage
    const existingArtworks = JSON.parse(localStorage.getItem('userArtworks') || '[]');
    localStorage.setItem('userArtworks', JSON.stringify([artwork, ...existingArtworks]));
    
    // Close the modal
    setIsUploadModalOpen(false);
  };

  const handleNavClick = async (item: any) => {
    if ((item.path === "/messages" || item.path === "/profile") && !(await supabase.auth.getUser()).data.user) {
      navigate("/login");
      return;
    }
    navigate(item.path);
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="flex justify-around items-center h-14">
          {navItems.map((item, index) => (
            <React.Fragment key={index}>
              {item.special ? (
                <Link 
                  to={item.path}
                  className={cn(
                    "flex flex-col items-center justify-center w-full py-1", 
                    item.active ? "text-lowcarbonart-blue" : "text-gray-500"
                  )}
                >
                  <div className="relative">
                    <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-blue-500 w-12 h-12 flex items-center justify-center rounded-b-full">
                      <span className="text-white text-sm font-medium">{item.label}</span>
                    </div>
                  </div>
                </Link>
              ) : (
                <button
                  className={cn(
                    "flex flex-col items-center flex-1 py-2",
                    item.active ? "text-artflow-blue" : "text-gray-500"
                  )}
                  onClick={() => handleNavClick(item)}
                >
                  <item.icon size={20} />
                  <span className="text-xs mt-1">{item.label}</span>
                </button>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
      
      {/* Upload Artwork Modal */}
      <UploadArtwork 
        isOpen={isUploadModalOpen} 
        onClose={() => setIsUploadModalOpen(false)}
        onSuccess={handleUploadSuccess}
      />
    </>
  );
};

export default MobileNavFooter;

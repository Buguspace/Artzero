import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import MobileNavFooter from "../components/MobileNavFooter";
import HeroSection from "./index/HeroSection";
import HeroCarousel from "./index/HeroCarousel";
import ProductRecommendations from "./index/ProductRecommendations";
import FeaturesSection from "./index/FeaturesSection";
import CtaSection from "./index/CtaSection";
import FooterSection from "./index/FooterSection";
import UploadArtwork from "../components/UploadArtwork";
import { useIsMobile } from "../hooks/use-mobile";
import { toast } from "sonner";

const Index: React.FC = () => {
  const isMobile = useIsMobile();
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  
  const handleUploadSuccess = (artwork: any) => {
    // Add the new artwork to localStorage for persistence
    const existingArtworks = JSON.parse(localStorage.getItem('userArtworks') || '[]');
    localStorage.setItem('userArtworks', JSON.stringify([artwork, ...existingArtworks]));
    
    toast.success("作品上传成功", {
      description: "您的作品已成功上传",
    });
  };
  
  return (
    <div className="min-h-screen pb-14 md:pb-0">
      <Navbar />
      
      {/* Hero Section */}
      <div className="pt-16 md:pt-24">
        <HeroSection onUploadClick={() => setIsUploadModalOpen(true)} />
      </div>
      
      {/* Carousel Section - On mobile: between hero and products, On desktop: part of hero */}
      {isMobile && (
        <div className="px-4 pb-6">
          <div className="container mx-auto">
            <HeroCarousel />
          </div>
        </div>
      )}
      
      {/* Product Recommendation Section */}
      <ProductRecommendations />
      
      {/* Features Section */}
      <FeaturesSection />
      
      {/* CTA Section */}
      <CtaSection />
      
      {/* Footer */}
      <FooterSection />
      
      {/* Mobile Navigation Footer - will only render on mobile */}
      <MobileNavFooter />
      
      {/* Upload Artwork Modal */}
      <UploadArtwork 
        isOpen={isUploadModalOpen} 
        onClose={() => setIsUploadModalOpen(false)}
        onSuccess={handleUploadSuccess}
      />
    </div>
  );
};

export default Index;

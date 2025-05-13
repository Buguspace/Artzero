import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "../components/Navbar";
import TipCreator from "@/components/TipCreator";
import MobileNavFooter from "../components/MobileNavFooter";
import ProductImagesCarousel from "@/components/product/ProductImagesCarousel";
import ProductDetailsCard from "@/components/product/ProductDetailsCard";
import SellerInfoCard from "@/components/product/SellerInfoCard";
import ProductDescriptionCard from "@/components/product/ProductDescriptionCard";
import CommentsCard from "@/components/product/CommentsCard";
import { productsData, mockComments } from "@/data/productsData";
import { Artwork } from "@/types/artwork";
import { LoadingContext } from "@/App";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { setLoading } = useContext(LoadingContext);
  const [product, setProduct] = useState<any>(null);
  
  useEffect(() => {
    setLoading(true);
    if (id) {
      // First check if it's one of the mock products
      const mockProduct = productsData[id as keyof typeof productsData];
      
      if (mockProduct) {
        setProduct(mockProduct);
        setLoading(false);
        return;
      }
      
      // If not found in mock data, check localStorage for user uploaded products
      const savedArtworks = localStorage.getItem('userArtworks');
      if (savedArtworks) {
        const userArtworks: Artwork[] = JSON.parse(savedArtworks);
        const userProduct = userArtworks.find(artwork => artwork.id.toString() === id);
        
        if (userProduct) {
          // Convert user uploaded artwork to match the format expected by the component
          const formattedProduct = {
            ...userProduct,
            author: "Me", // Since these are user's own artworks
            authorAvatar: "/public/lovable-uploads/e513ef7e-981b-40f2-ac5a-d741573bbbd3.png", // Default avatar
            originalPrice: Math.round(userProduct.price * 1.5), // Create a mock original price
            location: "我的位置", // Default location
            condition: "全新",
            views: Math.floor(Math.random() * 100) + 50, // Random views count
            // Ensure images array is populated from imageUrls or imageUrl
            images: userProduct.imageUrls || (userProduct.imageUrl ? [userProduct.imageUrl] : []),
            imageUrl: userProduct.imageUrl || (userProduct.imageUrls && userProduct.imageUrls.length > 0 ? userProduct.imageUrls[0] : "/placeholder.svg")
          };
          
          setProduct(formattedProduct);
        }
      }
      
      setLoading(false);
    }
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto pt-24 pb-12 px-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold">商品不存在</h1>
            <p className="mt-4">
              <Link to="/categories" className="text-artflow-blue hover:underline">
                返回浏览页面
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Make sure we have a proper images array
  const displayImages = product.images && product.images.length > 0 
    ? product.images 
    : (product.imageUrls && product.imageUrls.length > 0 
      ? product.imageUrls 
      : [product.imageUrl || "/placeholder.svg"]);

  return (
    <div className="min-h-screen pb-14 md:pb-0">
      <Navbar />

      <div className="container mx-auto pt-24 pb-12 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Back Navigation */}
          <Link
            to="/categories"
            className="inline-flex items-center mb-6 text-gray-600 hover:text-artflow-blue transition-colors"
          >
            <ArrowLeft size={16} className="mr-1" />
            <span>返回浏览页面</span>
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Product Images */}
            <div className="md:col-span-2">
              <ProductImagesCarousel 
                images={displayImages}
                title={product.title} 
              />
            </div>

            {/* Product Details */}
            <div className="md:col-span-1">
              <ProductDetailsCard product={product} />
              
              {/* Seller Information */}
              <SellerInfoCard 
                author={product.author} 
                authorAvatar={product.authorAvatar} 
              />

              {/* Tipping Component */}
              <div className="mt-4">
                <TipCreator 
                  productId={product.id}
                  sellerName={product.author}
                  initialBeans={product.beansCount}
                />
              </div>
            </div>

            {/* Product Description */}
            <div className="md:col-span-3">
              <ProductDescriptionCard description={product.description} />
              
              {/* Comments Section */}
              <CommentsCard 
                productId={product.id} 
                initialComments={mockComments} 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Footer */}
      <MobileNavFooter />
    </div>
  );
};

export default ProductDetail;

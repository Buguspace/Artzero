import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import MobileNavFooter from "../components/MobileNavFooter";
import { toast } from "sonner";
import { ImageFile } from "@/components/ImageUploader";
import { ScrollArea } from "@/components/ui/scroll-area";
import ArtworkForm, { ArtworkFormValues } from "@/components/artwork/ArtworkForm";
import { supabase } from "@/integrations/supabase/client";
import { useContext } from "react";
import { LoadingContext } from "@/App";
import { useLoadingService } from "@/hooks/useLoadingService";

const Publish: React.FC = () => {
  const [imageFiles, setImageFiles] = useState<ImageFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const { loading, showLoading, hideLoading } = useLoadingService();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    showLoading();
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        navigate("/login");
      }
      hideLoading();
    });
    return () => hideLoading();
  }, [location, navigate]);

  const handleSubmit = (values: ArtworkFormValues, images: ImageFile[]) => {
    setIsUploading(true);

    // Simulate upload process
    setTimeout(() => {
      try {
        // Extract image previews
        const imagePreviews = images.map(img => img.preview);
        
        // Create the artwork object
        const newArtwork = {
          id: Date.now(),
          title: values.title,
          description: values.description,
          price: Number(values.price) || 0,
          category: values.category,
          imageUrl: imagePreviews[0], // First image as main image
          imageUrls: imagePreviews, // All image URLs
          publishDate: new Date().toISOString(),
          beansCount: Math.floor(Math.random() * 20) + 30,
        };

        // Store in localStorage with error handling for quota exceeded
        const existingArtworks = JSON.parse(localStorage.getItem('userArtworks') || '[]');
        try {
          // Limit to most recent 10 artworks to avoid localStorage quota issues
          const updatedArtworks = [newArtwork, ...existingArtworks].slice(0, 10);
          localStorage.setItem('userArtworks', JSON.stringify(updatedArtworks));
          
          toast.success("作品上传成功", {
            description: "您的作品已成功上传",
          });
          
          // Reset form
          setImageFiles([]);
        } catch (error) {
          console.error("Upload error:", error);
          // If we can't save to localStorage due to quota, just notify user of success anyway
          // but warn about persistence
          toast.success("作品上传成功", {
            description: "由于浏览器存储空间限制，可能无法保存所有历史作品",
          });
          
          // Try to save just this one new artwork
          try {
            localStorage.setItem('userArtworks', JSON.stringify([newArtwork]));
          } catch (innerError) {
            console.error("Failed to save even one artwork:", innerError);
          }
          
          // Reset form anyway
          setImageFiles([]);
        }
      } catch (error) {
        console.error("Upload processing error:", error);
        toast.error("上传失败", {
          description: "处理上传时发生错误，请重试",
        });
      } finally {
        setIsUploading(false);
      }
    }, 1500);
  };
  
  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <Navbar />
      
      <div className="container mx-auto px-4 py-6 pb-20 relative">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/60 z-10">
            <span className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></span>
          </div>
        )}
        <h1 className="text-2xl font-bold mb-6">发布作品</h1>
        
        <ScrollArea className="h-full">
          <div className="bg-white p-6 rounded-lg shadow mb-8">
            <ArtworkForm
              imageFiles={imageFiles}
              setImageFiles={setImageFiles}
              onSubmit={handleSubmit}
              isSubmitting={isUploading}
              submitButtonText="发布作品"
            />
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow mb-8">
            <h2 className="text-xl font-bold mb-4">发布须知</h2>
            <ul className="space-y-2 list-disc pl-5">
              <li>所有上传的作品必须是您拥有版权的原创内容</li>
              <li>请勿上传包含违规内容的作品</li>
              <li>高质量的图片和详细的描述有助于提高作品的浏览量</li>
              <li>请为您的作品选择最适合的分类，以便潜在买家更容易找到</li>
              <li>定价时请考虑市场行情和您的制作成本</li>
            </ul>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow mb-8">
            <h2 className="text-xl font-bold mb-4">常见问题</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">如何提高作品的曝光率？</h3>
                <p className="text-gray-600">使用高质量图片、详细描述、准确分类，并经常更新您的作品集。</p>
              </div>
              <div>
                <h3 className="font-semibold">如何设置合理的价格？</h3>
                <p className="text-gray-600">考虑您的材料成本、制作时间、独特性以及市场上类似作品的价格。</p>
              </div>
              <div>
                <h3 className="font-semibold">我可以编辑已发布的作品吗？</h3>
                <p className="text-gray-600">是的，您可以在个人资料页面找到并编辑已发布的作品。</p>
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
      
      <MobileNavFooter />
    </div>
  );
};

export default Publish;

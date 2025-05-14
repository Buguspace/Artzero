import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/sonner";
import { ImageFile } from "./ImageUploader";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Artwork } from "@/types/artwork";
import ArtworkForm, { ArtworkFormValues } from "./artwork/ArtworkForm";
import { useNavigate } from 'react-router-dom';

interface UploadArtworkProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (artwork: Artwork) => void;
}

const UploadArtwork: React.FC<UploadArtworkProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const [imageFiles, setImageFiles] = useState<ImageFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();
  
  const handleSubmit = async (values: ArtworkFormValues, images: ImageFile[]) => {
    setIsUploading(true);

    try {
      // In a real app, this would be an API call to upload the images and form data
      console.log("Form values:", values);
      console.log("Images:", images);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Extract image previews for the artwork object
      const imagePreviews = images.map(img => img.preview);

      // Create the artwork object
      const newArtwork: Artwork = {
        id: Date.now(), // Using timestamp as a simple unique ID
        title: values.title,
        description: values.description,
        price: Number(values.price),
        category: values.category,
        imageUrl: imagePreviews[0], // First image as the main image
        imageUrls: imagePreviews, // All image URLs
        publishDate: new Date().toISOString(),
        beansCount: Math.floor(Math.random() * 20) + 30, // Random beans count between 30-50
        author: "当前用户", // 补充 author 字段
      };

      toast.success("作品上传成功", {
        description: "您的作品已成功上传",
      });
      
      // Reset form state
      setImageFiles([]);
      
      // Pass the new artwork to parent component
      if (onSuccess) onSuccess(newArtwork);
      
      // Close modal
      onClose();
      // 新增：发布成功后跳转到个人中心
      navigate('/profile');
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("上传失败", {
        description: "上传作品时发生错误，请重试",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>上传新作品</DialogTitle>
          <DialogDescription>
            填写以下信息上传您的艺术作品
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="pr-4" style={{ maxHeight: "calc(90vh - 180px)" }}>
          <ArtworkForm
            imageFiles={imageFiles}
            setImageFiles={setImageFiles}
            onSubmit={handleSubmit}
            isSubmitting={isUploading}
            submitButtonText="提交作品"
          />
        </ScrollArea>

        <DialogFooter className="mt-6">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onClose}
            disabled={isUploading}
          >
            取消
          </Button>
        </DialogFooter>

        {/* 发布须知 */}
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
        {/* 常见问题 */}
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
      </DialogContent>
    </Dialog>
  );
};

export default UploadArtwork;

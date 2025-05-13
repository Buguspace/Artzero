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
      </DialogContent>
    </Dialog>
  );
};

export default UploadArtwork;

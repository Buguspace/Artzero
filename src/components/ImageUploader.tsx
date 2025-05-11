
import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { X, Plus, Images, Upload, Loader } from "lucide-react";
import { toast } from "sonner";

// Maximum number of images allowed
const MAX_IMAGES = 6;
// Maximum size for each image
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

export interface ImageFile {
  file: File;
  preview: string;
}

interface ImageUploaderProps {
  images: ImageFile[];
  onChange: (images: ImageFile[]) => void;
  maxImages?: number;
  className?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  images,
  onChange,
  maxImages = MAX_IMAGES,
  className = "",
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Function to resize an image and generate a smaller preview
  const generateSmallPreview = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          // Calculate new dimensions while maintaining aspect ratio
          let width = img.width;
          let height = img.height;
          const maxDimension = 800; // Max width/height for preview
          
          if (width > height && width > maxDimension) {
            height = (height / width) * maxDimension;
            width = maxDimension;
          } else if (height > maxDimension) {
            width = (width / height) * maxDimension;
            height = maxDimension;
          }
          
          canvas.width = width;
          canvas.height = height;
          
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            reject(new Error('Could not get canvas context'));
            return;
          }
          
          ctx.drawImage(img, 0, 0, width, height);
          
          // Get compressed image as DataURL with reduced quality
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.6);
          resolve(compressedDataUrl);
        };
        
        img.onerror = () => {
          reject(new Error('Failed to load image'));
        };
        
        img.src = e.target?.result as string;
      };
      
      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };
      
      reader.readAsDataURL(file);
    });
  };

  // Process files (validate and convert to ImageFile objects)
  const processFiles = async (files: FileList | File[]): Promise<void> => {
    if (!files || files.length === 0) return;
    
    setIsProcessing(true);
    
    try {
      // Convert FileList to Array and filter out any invalid files
      const validFiles: File[] = Array.from(files).filter(file => {
        // Check file size (limit to 5MB)
        if (file.size > MAX_IMAGE_SIZE) {
          toast.error("图片太大", { description: "请上传小于5MB的图片" });
          return false;
        }

        // Check file type
        if (!file.type.startsWith("image/")) {
          toast.error("文件格式错误", { description: "请上传JPG、PNG或GIF格式的图片" });
          return false;
        }
        
        return true;
      });
      
      if (validFiles.length === 0) {
        setIsProcessing(false);
        return;
      }
      
      // Check if adding these images would exceed the maximum
      if (images.length + validFiles.length > maxImages) {
        toast.error(`最多只能上传${maxImages}张图片`);
        setIsProcessing(false);
        return;
      }
      
      // Process each new file and create image objects
      const newImageFiles: ImageFile[] = await Promise.all(
        validFiles.map(async (file) => {
          const preview = await generateSmallPreview(file);
          return { file, preview };
        })
      );
      
      // Add new files to existing images
      onChange([...images, ...newImageFiles]);
    } catch (error) {
      console.error("Error processing images:", error);
      toast.error("处理图片时出错", { description: "请重试或选择其他图片" });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    await processFiles(files);
  };
  
  const removeImage = (index: number) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    onChange(updatedImages);
  };

  // Drag and drop handlers
  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) {
      setIsDragging(true);
    }
  }, [isDragging]);

  const handleDrop = useCallback(async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const { files } = e.dataTransfer;
    await processFiles(files);
  }, [processFiles]);

  return (
    <div
      className={`
        border-2 rounded-lg p-4 text-center transition-colors
        ${isDragging ? 'border-artflow-blue bg-blue-50' : 'border-dashed bg-gray-50'}
        ${className}
      `}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {isProcessing ? (
        <div className="flex flex-col items-center justify-center py-4">
          <Loader className="h-10 w-10 text-gray-400 animate-spin mb-2" />
          <p className="text-sm text-gray-500">处理图片中，请稍候...</p>
        </div>
      ) : images.length > 0 ? (
        <div className="relative">
          <div className="grid grid-cols-2 gap-2">
            {images.map((image, index) => (
              <div key={index} className="relative">
                <img 
                  src={image.preview} 
                  alt={`图片预览 ${index + 1}`} 
                  className="mx-auto h-[150px] w-full object-cover rounded"
                />
                <button
                  type="button"
                  className="absolute top-1 right-1 bg-black bg-opacity-50 rounded-full p-1 text-white"
                  onClick={() => removeImage(index)}
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
          {images.length < maxImages && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-2 flex items-center"
              onClick={() => document.getElementById("artwork-images")?.click()}
            >
              <Plus size={16} className="mr-1" /> 添加更多图片
            </Button>
          )}
        </div>
      ) : (
        <div>
          <div className="flex flex-col items-center py-4">
            {isDragging ? (
              <Upload className="mx-auto h-10 w-10 text-artflow-blue" />
            ) : (
              <Images className="mx-auto h-10 w-10 text-gray-400" />
            )}
            <p className="text-sm text-gray-500 mt-2">
              {isDragging ? '释放鼠标上传图片' : '点击或拖放图片到此处'}
            </p>
            <p className="text-xs text-gray-400 mt-1">支持 JPG、PNG、GIF (最大 5MB，最多 {maxImages} 张)</p>
            <Button 
              type="button" 
              variant="outline"
              className="mt-2"
              onClick={() => document.getElementById("artwork-images")?.click()}
            >
              选择文件
            </Button>
          </div>
        </div>
      )}
      <input
        id="artwork-images"
        type="file"
        className="hidden"
        accept="image/*"
        onChange={handleImageChange}
        multiple
      />
    </div>
  );
};

export default ImageUploader;

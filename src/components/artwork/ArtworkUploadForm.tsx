import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Images, X, Loader2 } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { validateArtworkForm, validateFile } from '@/lib/validations';
import { uploadMultipleFiles } from '@/services/uploadService';
import { Progress } from '@/components/ui/progress';

interface ArtworkUploadFormProps {
  onSubmit: (data: FormData) => void;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_FILES = 6;

const ArtworkUploadForm: React.FC<ArtworkUploadFormProps> = ({ onSubmit }) => {
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    // 验证文件数量
    if (images.length + files.length > MAX_FILES) {
      toast.error(`最多只能上传${MAX_FILES}张图片`);
      return;
    }

    // 验证文件大小和类型
    const validFiles = files.filter(file => {
      if (file.size > MAX_FILE_SIZE) {
        toast.error(`${file.name} 超过5MB限制`);
        return false;
      }
      if (!file.type.startsWith('image/')) {
        toast.error(`${file.name} 不是有效的图片文件`);
        return false;
      }
      return true;
    });

    // 更新图片列表
    setImages(prev => [...prev, ...validFiles]);

    // 生成预览
    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    // 验证表单
    const validationErrors = validateArtworkForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      Object.values(validationErrors).forEach(error => {
        toast.error(error);
      });
      return;
    }

    try {
      setIsUploading(true);
      setUploadProgress(0);

      // 上传图片
      const imageUrls = await uploadMultipleFiles(images, {
        onProgress: (progress) => {
          const percent = (progress.loaded / progress.total) * 100;
          setUploadProgress(percent);
        },
      });

      // 添加图片URL到表单数据
      imageUrls.forEach((url, index) => {
        formData.append(`imageUrl${index}`, url);
      });

      // 提交表单
      await onSubmit(formData);
      toast.success('作品上传成功');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('上传失败，请重试');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* 图片上传区域 */}
      <div className="mb-6">
        <Label htmlFor="artwork-images">作品图片</Label>
        <div className="mt-2">
          <div
            className={`
              border-2 rounded-lg p-4 text-center transition-colors
              border-dashed bg-gray-50
              ${images.length > 0 ? 'border-primary' : 'border-gray-300'}
              ${errors.images ? 'border-red-500' : ''}
            `}
          >
            {images.length > 0 ? (
              <div className="grid grid-cols-2 gap-4">
                {previews.map((preview, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={preview}
                      alt={`预览 ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-2 right-2 p-1 bg-black/50 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                {images.length < MAX_FILES && (
                  <div
                    className="flex flex-col items-center justify-center h-32 border-2 border-dashed rounded-lg cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Images className="h-8 w-8 text-gray-400" />
                    <span className="text-sm text-gray-500 mt-2">添加更多图片</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center py-4">
                <Images className="mx-auto h-10 w-10 text-gray-400" />
                <p className="text-sm text-gray-500 mt-2">点击或拖放图片到此处</p>
                <p className="text-xs text-gray-400 mt-1">支持 JPG、PNG、GIF (最大 5MB，最多 6 张)</p>
                <Button
                  type="button"
                  variant="outline"
                  className="mt-2"
                  onClick={() => fileInputRef.current?.click()}
                >
                  选择文件
                </Button>
              </div>
            )}
            <input
              ref={fileInputRef}
              id="artwork-images"
              type="file"
              className="hidden"
              accept="image/*"
              multiple
              onChange={handleFileChange}
            />
          </div>
          {errors.images && (
            <p className="text-sm text-red-500 mt-1">{errors.images}</p>
          )}
        </div>
      </div>

      {/* 作品名称 */}
      <div className="space-y-2">
        <Label htmlFor="title">作品名称</Label>
        <Input
          id="title"
          name="title"
          placeholder="输入作品名称"
          required
          className={errors.title ? 'border-red-500' : ''}
        />
        {errors.title && (
          <p className="text-sm text-red-500">{errors.title}</p>
        )}
      </div>

      {/* 作品描述 */}
      <div className="space-y-2">
        <Label htmlFor="description">作品描述</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="描述您的作品，创作背景，灵感等"
          required
          className={errors.description ? 'border-red-500' : ''}
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description}</p>
        )}
      </div>

      {/* 价格和分类 */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">价格 (¥)</Label>
          <Input
            id="price"
            name="price"
            type="number"
            step="0.01"
            min="0"
            placeholder="0.00"
            required
            className={errors.price ? 'border-red-500' : ''}
          />
          {errors.price && (
            <p className="text-sm text-red-500">{errors.price}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">分类</Label>
          <Select name="category" required>
            <SelectTrigger className={errors.category ? 'border-red-500' : ''}>
              <SelectValue placeholder="选择分类" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="art">艺术</SelectItem>
              <SelectItem value="books">书籍</SelectItem>
              <SelectItem value="music">音乐</SelectItem>
              <SelectItem value="video">视频</SelectItem>
              <SelectItem value="rental">租赁</SelectItem>
            </SelectContent>
          </Select>
          {errors.category && (
            <p className="text-sm text-red-500">{errors.category}</p>
          )}
        </div>
      </div>

      {/* 上传进度 */}
      {isUploading && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>上传进度</span>
            <span>{Math.round(uploadProgress)}%</span>
          </div>
          <Progress value={uploadProgress} />
        </div>
      )}

      <Button 
        type="submit" 
        className="w-full"
        disabled={isUploading}
      >
        {isUploading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            上传中...
          </>
        ) : (
          '发布作品'
        )}
      </Button>
    </form>
  );
};

export default ArtworkUploadForm; 
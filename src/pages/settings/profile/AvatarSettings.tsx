import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/sonner';
import { ArrowLeft, Upload } from 'lucide-react';
import ImageUploader, { ImageFile } from '@/components/ImageUploader';

const AvatarSettings: React.FC = () => {
  const navigate = useNavigate();
  const [imageFiles, setImageFiles] = useState<ImageFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = async () => {
    if (imageFiles.length === 0) {
      toast.error('请选择头像图片');
      return;
    }

    setIsUploading(true);

    try {
      // 模拟上传过程
      await new Promise(resolve => setTimeout(resolve, 1000));

      // 更新用户头像
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      currentUser.avatar = imageFiles[0].preview;
      localStorage.setItem('currentUser', JSON.stringify(currentUser));

      toast.success('头像更新成功');
      navigate('/settings');
    } catch (error) {
      toast.error('上传失败，请重试');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center mb-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/settings')}
              className="mr-2"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold">修改头像</h1>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="mb-6">
              <Label className="block mb-2">当前头像</Label>
              <div className="w-24 h-24 rounded-full overflow-hidden border">
                <img
                  src={JSON.parse(localStorage.getItem('currentUser') || '{}').avatar || '/placeholder.svg'}
                  alt="当前头像"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="mb-6">
              <Label className="block mb-2">上传新头像</Label>
              <ImageUploader
                images={imageFiles}
                onChange={setImageFiles}
                maxImages={1}
              />
            </div>

            <div className="flex justify-end space-x-4">
              <Button
                variant="outline"
                onClick={() => navigate('/settings')}
              >
                取消
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isUploading || imageFiles.length === 0}
              >
                {isUploading ? '上传中...' : '保存'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvatarSettings; 
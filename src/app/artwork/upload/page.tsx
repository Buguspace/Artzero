import React from 'react';
import ArtworkUploadForm from '@/components/artwork/ArtworkUploadForm';
import { toast } from '@/components/ui/sonner';

export default function ArtworkUploadPage() {
  const handleSubmit = async (formData: FormData) => {
    try {
      // TODO: 实现文件上传逻辑
      console.log('Form data:', Object.fromEntries(formData));
      toast.success('作品上传成功');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('上传失败，请重试');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">发布新作品</h1>
        
        {/* 上传表单 */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <ArtworkUploadForm onSubmit={handleSubmit} />
        </div>

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
      </div>
    </div>
  );
} 
 
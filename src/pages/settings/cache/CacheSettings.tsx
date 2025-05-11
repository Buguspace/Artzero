import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/sonner';
import { ArrowLeft, Trash2, Image, File, Database } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface CacheInfo {
  type: string;
  size: number;
  description: string;
  icon: React.ReactNode;
}

const CacheSettings: React.FC = () => {
  const navigate = useNavigate();
  const [isClearing, setIsClearing] = useState(false);
  const [progress, setProgress] = useState(0);

  const cacheTypes: CacheInfo[] = [
    {
      type: '图片缓存',
      size: 256,
      description: '已缓存的图片文件',
      icon: <Image className="h-5 w-5 text-blue-500" />,
    },
    {
      type: '文件缓存',
      size: 128,
      description: '已下载的文件',
      icon: <File className="h-5 w-5 text-green-500" />,
    },
    {
      type: '数据缓存',
      size: 64,
      description: '本地存储的数据',
      icon: <Database className="h-5 w-5 text-purple-500" />,
    },
  ];

  const totalSize = cacheTypes.reduce((sum, cache) => sum + cache.size, 0);

  const handleClearAll = async () => {
    setIsClearing(true);
    setProgress(0);

    try {
      // 模拟清理过程
      for (let i = 0; i <= 100; i += 20) {
        await new Promise(resolve => setTimeout(resolve, 200));
        setProgress(i);
      }

      // 清除所有缓存
      localStorage.removeItem('imageCache');
      localStorage.removeItem('fileCache');
      localStorage.removeItem('dataCache');

      toast.success('缓存清理完成');
      navigate('/settings');
    } catch (error) {
      toast.error('清理失败，请重试');
    } finally {
      setIsClearing(false);
    }
  };

  const handleClearType = async (type: string) => {
    setIsClearing(true);
    setProgress(0);

    try {
      // 模拟清理过程
      for (let i = 0; i <= 100; i += 20) {
        await new Promise(resolve => setTimeout(resolve, 200));
        setProgress(i);
      }

      // 清除指定类型的缓存
      switch (type) {
        case '图片缓存':
          localStorage.removeItem('imageCache');
          break;
        case '文件缓存':
          localStorage.removeItem('fileCache');
          break;
        case '数据缓存':
          localStorage.removeItem('dataCache');
          break;
      }

      toast.success(`${type}清理完成`);
    } catch (error) {
      toast.error('清理失败，请重试');
    } finally {
      setIsClearing(false);
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
            <h1 className="text-2xl font-bold">缓存管理</h1>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <Trash2 className="h-6 w-6 text-red-500 mr-2" />
                <h2 className="text-lg font-semibold">缓存信息</h2>
              </div>
              <div className="text-sm text-gray-500">
                总大小：{totalSize}MB
              </div>
            </div>

            {isClearing && (
              <div className="mb-6">
                <Progress value={progress} className="h-2" />
                <p className="text-sm text-gray-500 mt-2 text-center">
                  正在清理缓存...
                </p>
              </div>
            )}

            <div className="space-y-4">
              {cacheTypes.map((cache) => (
                <div
                  key={cache.type}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center">
                    {cache.icon}
                    <div className="ml-3">
                      <h3 className="font-medium">{cache.type}</h3>
                      <p className="text-sm text-gray-500">{cache.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-500 mr-4">
                      {cache.size}MB
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleClearType(cache.type)}
                      disabled={isClearing}
                    >
                      清理
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end space-x-4 mt-6">
              <Button
                variant="outline"
                onClick={() => navigate('/settings')}
              >
                返回
              </Button>
              <Button
                variant="destructive"
                onClick={handleClearAll}
                disabled={isClearing}
              >
                {isClearing ? '清理中...' : '清理所有缓存'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CacheSettings; 
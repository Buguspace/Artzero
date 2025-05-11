import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/sonner';
import { ArrowLeft } from 'lucide-react';

const BioSettings: React.FC = () => {
  const navigate = useNavigate();
  const [bio, setBio] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // 加载当前用户的简介
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    setBio(currentUser.bio || '');
  }, []);

  const handleSubmit = async () => {
    setIsSaving(true);

    try {
      // 模拟保存过程
      await new Promise(resolve => setTimeout(resolve, 500));

      // 更新用户简介
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      currentUser.bio = bio;
      localStorage.setItem('currentUser', JSON.stringify(currentUser));

      toast.success('简介更新成功');
      navigate('/settings');
    } catch (error) {
      toast.error('保存失败，请重试');
    } finally {
      setIsSaving(false);
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
            <h1 className="text-2xl font-bold">修改简介</h1>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="mb-6">
              <Label className="block mb-2">个人简介</Label>
              <Textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="介绍一下自己吧..."
                className="min-h-[150px]"
                maxLength={200}
              />
              <p className="text-sm text-gray-500 mt-1">
                {bio.length}/200
              </p>
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
                disabled={isSaving}
              >
                {isSaving ? '保存中...' : '保存'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BioSettings; 
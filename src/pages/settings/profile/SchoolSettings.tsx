import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/sonner';
import { ArrowLeft } from 'lucide-react';

const SchoolSettings: React.FC = () => {
  const navigate = useNavigate();
  const [school, setSchool] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // 加载当前用户的院校名称
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    setSchool(currentUser.school || '');
  }, []);

  const handleSubmit = async () => {
    if (!school.trim()) {
      toast.error('请输入院校名称');
      return;
    }

    setIsSaving(true);

    try {
      // 模拟保存过程
      await new Promise(resolve => setTimeout(resolve, 500));

      // 更新用户院校名称
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      currentUser.school = school.trim();
      localStorage.setItem('currentUser', JSON.stringify(currentUser));

      toast.success('院校名称更新成功');
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
            <h1 className="text-2xl font-bold">修改院校名称</h1>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="mb-6">
              <Label className="block mb-2">院校名称</Label>
              <Input
                type="text"
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                placeholder="请输入您的院校名称"
                className="max-w-md"
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

export default SchoolSettings; 
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/sonner';
import { ArrowLeft } from 'lucide-react';

const UsernameSettings: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // 加载当前用户名
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    setUsername(currentUser.username || '');
  }, []);

  const handleSubmit = async () => {
    if (!username.trim()) {
      toast.error('请输入用户名');
      return;
    }

    if (username.length < 3 || username.length > 20) {
      toast.error('用户名长度应在3-20个字符之间');
      return;
    }

    setIsSaving(true);

    try {
      // 模拟保存过程
      await new Promise(resolve => setTimeout(resolve, 500));

      // 更新用户名
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      currentUser.username = username.trim();
      localStorage.setItem('currentUser', JSON.stringify(currentUser));

      toast.success('用户名更新成功');
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
            <h1 className="text-2xl font-bold">修改用户名</h1>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="mb-6">
              <Label className="block mb-2">用户名</Label>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="请输入用户名"
                className="max-w-md"
              />
              <p className="text-sm text-gray-500 mt-1">
                用户名长度为3-20个字符
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

export default UsernameSettings; 
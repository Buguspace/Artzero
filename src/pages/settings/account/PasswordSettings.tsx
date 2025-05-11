import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/sonner';
import { ArrowLeft } from 'lucide-react';

const PasswordSettings: React.FC = () => {
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error('请填写完整的密码信息');
      return;
    }

    if (newPassword.length < 6 || newPassword.length > 20) {
      toast.error('新密码长度应在6-20个字符之间');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('两次输入的新密码不一致');
      return;
    }

    setIsSaving(true);

    try {
      // 模拟保存过程
      await new Promise(resolve => setTimeout(resolve, 500));

      // 更新密码
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      if (currentUser.password !== oldPassword) {
        toast.error('原密码错误');
        return;
      }

      currentUser.password = newPassword;
      localStorage.setItem('currentUser', JSON.stringify(currentUser));

      toast.success('密码修改成功');
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
            <h1 className="text-2xl font-bold">修改密码</h1>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="space-y-6">
              <div>
                <Label className="block mb-2">原密码</Label>
                <Input
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="请输入原密码"
                />
              </div>

              <div>
                <Label className="block mb-2">新密码</Label>
                <Input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="请输入新密码"
                />
                <p className="text-sm text-gray-500 mt-1">
                  密码长度为6-20个字符
                </p>
              </div>

              <div>
                <Label className="block mb-2">确认新密码</Label>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="请再次输入新密码"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4 mt-6">
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

export default PasswordSettings; 
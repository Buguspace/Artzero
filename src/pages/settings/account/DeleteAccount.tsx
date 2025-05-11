import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/sonner';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const DeleteAccount: React.FC = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleSubmit = async () => {
    if (!password) {
      toast.error('请输入密码');
      return;
    }

    setIsDeleting(true);

    try {
      // 验证密码
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      if (currentUser.password !== password) {
        toast.error('密码错误');
        return;
      }

      // 显示确认对话框
      setShowConfirmDialog(true);
    } catch (error) {
      toast.error('验证失败，请重试');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      // 模拟删除过程
      await new Promise(resolve => setTimeout(resolve, 1000));

      // 清除用户数据
      localStorage.removeItem('currentUser');
      localStorage.removeItem('token');

      toast.success('账号已注销');
      navigate('/login');
    } catch (error) {
      toast.error('注销失败，请重试');
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
            <h1 className="text-2xl font-bold">注销账号</h1>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-6 text-red-500">
              <AlertTriangle className="h-6 w-6 mr-2" />
              <h2 className="text-lg font-semibold">警告</h2>
            </div>

            <div className="space-y-4 mb-6">
              <p className="text-gray-600">
                注销账号后，您将无法：
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>访问您的账号和所有相关数据</li>
                <li>恢复已删除的内容</li>
                <li>使用相同的手机号重新注册</li>
              </ul>
            </div>

            <div className="mb-6">
              <Label className="block mb-2">请输入密码确认</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="请输入密码"
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
                variant="destructive"
                onClick={handleSubmit}
                disabled={isDeleting}
              >
                {isDeleting ? '验证中...' : '注销账号'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认注销账号？</AlertDialogTitle>
            <AlertDialogDescription>
              此操作不可逆，您确定要注销账号吗？
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-red-500 hover:bg-red-600"
            >
              确认注销
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DeleteAccount; 
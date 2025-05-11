import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/sonner';
import { ArrowLeft } from 'lucide-react';

const PhoneSettings: React.FC = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    // 加载当前手机号
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    setPhone(currentUser.phone || '');
  }, []);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleSendCode = () => {
    if (!phone || !/^1[3-9]\d{9}$/.test(phone)) {
      toast.error('请输入正确的手机号');
      return;
    }

    // 模拟发送验证码
    setCountdown(60);
    toast.success('验证码已发送');
  };

  const handleSubmit = async () => {
    if (!phone || !/^1[3-9]\d{9}$/.test(phone)) {
      toast.error('请输入正确的手机号');
      return;
    }

    if (!verificationCode || !/^\d{6}$/.test(verificationCode)) {
      toast.error('请输入正确的验证码');
      return;
    }

    setIsSaving(true);

    try {
      // 模拟保存过程
      await new Promise(resolve => setTimeout(resolve, 500));

      // 更新手机号
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      currentUser.phone = phone;
      localStorage.setItem('currentUser', JSON.stringify(currentUser));

      toast.success('手机号更新成功');
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
            <h1 className="text-2xl font-bold">修改手机号</h1>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="mb-6">
              <Label className="block mb-2">手机号</Label>
              <div className="flex space-x-4">
                <Input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="请输入手机号"
                  className="flex-1"
                />
                <Button
                  variant="outline"
                  onClick={handleSendCode}
                  disabled={countdown > 0}
                >
                  {countdown > 0 ? `${countdown}秒后重试` : '发送验证码'}
                </Button>
              </div>
            </div>

            <div className="mb-6">
              <Label className="block mb-2">验证码</Label>
              <Input
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="请输入验证码"
                maxLength={6}
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

export default PhoneSettings; 
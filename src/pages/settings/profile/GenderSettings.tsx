import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from '@/components/ui/sonner';
import { ArrowLeft } from 'lucide-react';

const GenderSettings: React.FC = () => {
  const navigate = useNavigate();
  const [gender, setGender] = useState<string>('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // 加载当前用户的性别
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    setGender(currentUser.gender || '');
  }, []);

  const handleSubmit = async () => {
    if (!gender) {
      toast.error('请选择性别');
      return;
    }

    setIsSaving(true);

    try {
      // 模拟保存过程
      await new Promise(resolve => setTimeout(resolve, 500));

      // 更新用户性别
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      currentUser.gender = gender;
      localStorage.setItem('currentUser', JSON.stringify(currentUser));

      toast.success('性别更新成功');
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
            <h1 className="text-2xl font-bold">修改性别</h1>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="mb-6">
              <Label className="block mb-4">选择性别</Label>
              <RadioGroup
                value={gender}
                onValueChange={setGender}
                className="space-y-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male">男</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female">女</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="other" />
                  <Label htmlFor="other">其他</Label>
                </div>
              </RadioGroup>
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

export default GenderSettings; 
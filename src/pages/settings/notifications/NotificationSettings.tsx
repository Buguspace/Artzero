import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Bell, MessageSquare, Heart, Star } from 'lucide-react';
import { toast } from 'sonner';

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  enabled: boolean;
}

const NotificationSettings: React.FC = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState<NotificationSetting[]>([
    {
      id: 'system',
      title: '系统通知',
      description: '接收系统更新、维护等重要通知',
      icon: <Bell className="h-5 w-5" />,
      enabled: true,
    },
    {
      id: 'message',
      title: '私信通知',
      description: '接收其他用户发送的私信通知',
      icon: <MessageSquare className="h-5 w-5" />,
      enabled: true,
    },
    {
      id: 'comment',
      title: '评论通知',
      description: '接收作品评论和回复通知',
      icon: <MessageSquare className="h-5 w-5" />,
      enabled: true,
    },
    {
      id: 'like',
      title: '点赞通知',
      description: '接收作品被点赞的通知',
      icon: <Heart className="h-5 w-5" />,
      enabled: true,
    },
    {
      id: 'favorite',
      title: '收藏通知',
      description: '接收作品被收藏的通知',
      icon: <Star className="h-5 w-5" />,
      enabled: true,
    },
  ]);

  const handleToggle = (id: string) => {
    setSettings(settings.map(setting => 
      setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
    ));
  };

  const handleSave = () => {
    // 模拟保存设置
    toast.success('设置已保存');
    navigate('/settings');
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
            <h1 className="text-2xl font-bold">消息提醒设置</h1>
          </div>

          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <div className="space-y-6">
                {settings.map((setting) => (
                  <div key={setting.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-gray-100 rounded-full">
                        {setting.icon}
                      </div>
                      <div>
                        <h3 className="font-medium">{setting.title}</h3>
                        <p className="text-sm text-gray-500">{setting.description}</p>
                      </div>
                    </div>
                    <Switch
                      checked={setting.enabled}
                      onCheckedChange={() => handleToggle(setting.id)}
                    />
                  </div>
                ))}
              </div>

              <div className="mt-8 flex justify-end">
                <Button onClick={handleSave}>
                  保存设置
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings; 
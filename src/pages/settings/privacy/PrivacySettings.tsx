import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/sonner';
import { ArrowLeft, Shield, Eye, MessageSquare, Download, Trash2 } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PrivacySettings {
  showProfile: boolean;
  showActivity: boolean;
  allowMessages: boolean;
  showLocation: boolean;
  allowNotifications: boolean;
  contentVisibility: 'public' | 'friends' | 'private';
  commentPermission: 'everyone' | 'friends' | 'none';
  allowDataExport: boolean;
  allowAccountDeletion: boolean;
}

const PrivacySettings: React.FC = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState<PrivacySettings>({
    showProfile: true,
    showActivity: true,
    allowMessages: true,
    showLocation: false,
    allowNotifications: true,
    contentVisibility: 'public',
    commentPermission: 'everyone',
    allowDataExport: true,
    allowAccountDeletion: true,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    // 加载隐私设置
    const storedSettings = JSON.parse(localStorage.getItem('privacySettings') || '{}');
    setSettings(prev => ({ ...prev, ...storedSettings }));
  }, []);

  const handleToggle = (key: keyof PrivacySettings) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSelect = (key: keyof PrivacySettings, value: string) => {
    setSettings(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      localStorage.setItem('privacySettings', JSON.stringify(settings));
      toast.success('设置已保存');
      navigate('/settings');
    } catch (error) {
      toast.error('保存失败，请重试');
    } finally {
      setIsSaving(false);
    }
  };

  const handleExportData = async () => {
    setIsExporting(true);
    try {
      // 模拟数据导出过程
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // 创建要导出的数据
      const exportData = {
        userData: {
          profile: JSON.parse(localStorage.getItem('userProfile') || '{}'),
          settings: settings,
          activity: JSON.parse(localStorage.getItem('userActivity') || '[]'),
        },
        exportDate: new Date().toISOString(),
      };

      // 创建并下载文件
      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `user-data-export-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success('数据导出成功');
    } catch (error) {
      toast.error('数据导出失败，请重试');
    } finally {
      setIsExporting(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm('确定要注销账号吗？此操作不可恢复，所有数据将被永久删除。')) {
      return;
    }

    setIsDeleting(true);
    try {
      // 模拟账号注销过程
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // 清除所有本地数据
      localStorage.clear();
      sessionStorage.clear();
      
      toast.success('账号已注销');
      navigate('/login');
    } catch (error) {
      toast.error('账号注销失败，请重试');
    } finally {
      setIsDeleting(false);
    }
  };

  const privacyOptions = [
    {
      key: 'showProfile',
      label: '公开个人资料',
      description: '允许其他用户查看您的个人资料信息',
      icon: <Shield className="h-5 w-5" />,
    },
    {
      key: 'showActivity',
      label: '公开活动记录',
      description: '允许其他用户查看您的活动记录',
      icon: <Eye className="h-5 w-5" />,
    },
    {
      key: 'allowMessages',
      label: '接收私信',
      description: '允许其他用户向您发送私信',
      icon: <MessageSquare className="h-5 w-5" />,
    },
    {
      key: 'showLocation',
      label: '显示位置信息',
      description: '在发布内容时显示您的位置信息',
      icon: <Eye className="h-5 w-5" />,
    },
    {
      key: 'allowNotifications',
      label: '接收通知',
      description: '接收系统通知和消息提醒',
      icon: <MessageSquare className="h-5 w-5" />,
    },
  ];

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
            <h1 className="text-2xl font-bold">隐私设置</h1>
          </div>

          <div className="space-y-6">
            {/* 基本隐私设置 */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">基本隐私设置</h2>
              <div className="space-y-4">
                {privacyOptions.map((option) => (
                  <div key={option.key} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {option.icon}
                      <div>
                        <Label htmlFor={option.key}>{option.label}</Label>
                        <p className="text-sm text-gray-500">{option.description}</p>
                      </div>
                    </div>
                    <Switch
                      id={option.key}
                      checked={settings[option.key as keyof PrivacySettings] as boolean}
                      onCheckedChange={() => handleToggle(option.key as keyof PrivacySettings)}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* 内容可见范围设置 */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">内容可见范围</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>内容默认可见范围</Label>
                    <p className="text-sm text-gray-500">设置您发布内容的默认可见范围</p>
                  </div>
                  <Select
                    value={settings.contentVisibility}
                    onValueChange={(value) => handleSelect('contentVisibility', value)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="选择可见范围" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">所有人可见</SelectItem>
                      <SelectItem value="friends">仅好友可见</SelectItem>
                      <SelectItem value="private">仅自己可见</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* 评论权限管理 */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">评论权限管理</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>评论权限设置</Label>
                    <p className="text-sm text-gray-500">设置谁可以评论您的内容</p>
                  </div>
                  <Select
                    value={settings.commentPermission}
                    onValueChange={(value) => handleSelect('commentPermission', value)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="选择评论权限" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="everyone">所有人可评论</SelectItem>
                      <SelectItem value="friends">仅好友可评论</SelectItem>
                      <SelectItem value="none">禁止评论</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* 数据管理 */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">数据管理</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>数据导出</Label>
                    <p className="text-sm text-gray-500">导出您的个人数据</p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={handleExportData}
                    disabled={isExporting}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    {isExporting ? '导出中...' : '导出数据'}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>账号注销</Label>
                    <p className="text-sm text-gray-500">永久删除您的账号及所有数据</p>
                  </div>
                  <Button
                    variant="destructive"
                    onClick={handleDeleteAccount}
                    disabled={isDeleting}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    {isDeleting ? '注销中...' : '注销账号'}
                  </Button>
                </div>
              </div>
            </div>

            {/* 保存按钮 */}
            <div className="flex justify-end">
              <Button
                onClick={handleSave}
                disabled={isSaving}
                className="w-full md:w-auto"
              >
                {isSaving ? '保存中...' : '保存设置'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacySettings; 
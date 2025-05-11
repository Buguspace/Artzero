import { useState, useEffect } from 'react';
import { userApi } from '@/services/api';
import { PrivacySettings, NotificationSettings } from '@/types';
import { toast } from '@/components/ui/sonner';

export const useSettings = () => {
  const [privacySettings, setPrivacySettings] = useState<PrivacySettings>({
    showProfile: true,
    showActivity: true,
    allowMessages: true,
    showLocation: false,
    allowNotifications: true,
  });

  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    systemNotifications: true,
    messageNotifications: true,
    likeNotifications: true,
    commentNotifications: true,
    followNotifications: true,
    emailNotifications: false,
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const response = await userApi.getSettings();
      setPrivacySettings(response.privacy);
      setNotificationSettings(response.notifications);
    } catch (error) {
      toast.error('加载设置失败');
    } finally {
      setIsLoading(false);
    }
  };

  const updatePrivacySettings = async (settings: PrivacySettings) => {
    try {
      await userApi.updatePrivacySettings(settings);
      setPrivacySettings(settings);
      toast.success('隐私设置已更新');
    } catch (error) {
      toast.error('更新隐私设置失败');
      throw error;
    }
  };

  const updateNotificationSettings = async (settings: NotificationSettings) => {
    try {
      await userApi.updateNotificationSettings(settings);
      setNotificationSettings(settings);
      toast.success('通知设置已更新');
    } catch (error) {
      toast.error('更新通知设置失败');
      throw error;
    }
  };

  return {
    privacySettings,
    notificationSettings,
    isLoading,
    updatePrivacySettings,
    updateNotificationSettings,
  };
}; 
import { toast } from '@/components/ui/sonner';

interface ExportData {
  userData: {
    profile: any;
    settings: any;
    activity: any[];
  };
  exportDate: string;
}

export const exportUserData = async (): Promise<void> => {
  try {
    // 获取用户数据
    const userData = {
      profile: JSON.parse(localStorage.getItem('userProfile') || '{}'),
      settings: JSON.parse(localStorage.getItem('privacySettings') || '{}'),
      activity: JSON.parse(localStorage.getItem('userActivity') || '[]'),
    };

    // 创建导出数据对象
    const exportData: ExportData = {
      userData,
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
    console.error('数据导出失败:', error);
    toast.error('数据导出失败，请重试');
    throw error;
  }
};

export const deleteUserAccount = async (): Promise<void> => {
  try {
    // 清除所有本地数据
    localStorage.clear();
    sessionStorage.clear();
    
    // 这里可以添加调用后端API删除账号的逻辑
    
    toast.success('账号已注销');
  } catch (error) {
    console.error('账号注销失败:', error);
    toast.error('账号注销失败，请重试');
    throw error;
  }
}; 
 
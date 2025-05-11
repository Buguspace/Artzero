import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Smartphone, Laptop, Tablet, LogOut } from 'lucide-react';
import { toast } from 'sonner';
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

interface Device {
  id: string;
  name: string;
  type: 'mobile' | 'desktop' | 'tablet';
  lastActive: string;
  location: string;
  isCurrent: boolean;
}

const DeviceManagement: React.FC = () => {
  const navigate = useNavigate();
  const [devices, setDevices] = useState<Device[]>([]);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);

  useEffect(() => {
    // 模拟获取设备列表
    const mockDevices: Device[] = [
      {
        id: '1',
        name: 'iPhone 13',
        type: 'mobile',
        lastActive: '2024-03-20 15:30',
        location: '北京',
        isCurrent: true,
      },
      {
        id: '2',
        name: 'MacBook Pro',
        type: 'desktop',
        lastActive: '2024-03-19 10:15',
        location: '上海',
        isCurrent: false,
      },
      {
        id: '3',
        name: 'iPad Pro',
        type: 'tablet',
        lastActive: '2024-03-18 09:45',
        location: '广州',
        isCurrent: false,
      },
    ];
    setDevices(mockDevices);
  }, []);

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'mobile':
        return <Smartphone className="h-5 w-5" />;
      case 'desktop':
        return <Laptop className="h-5 w-5" />;
      case 'tablet':
        return <Tablet className="h-5 w-5" />;
      default:
        return <Smartphone className="h-5 w-5" />;
    }
  };

  const handleLogout = (device: Device) => {
    setSelectedDevice(device);
    setShowConfirmDialog(true);
  };

  const confirmLogout = async () => {
    if (!selectedDevice) return;

    try {
      // 模拟登出设备
      setDevices(devices.filter(d => d.id !== selectedDevice.id));
      toast.success('设备已登出');
    } catch (error) {
      toast.error('操作失败，请重试');
    } finally {
      setShowConfirmDialog(false);
      setSelectedDevice(null);
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
            <h1 className="text-2xl font-bold">设备管理</h1>
          </div>

          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <h2 className="text-lg font-semibold mb-4">已登录设备</h2>
              <div className="space-y-4">
                {devices.map((device) => (
                  <div
                    key={device.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-gray-100 rounded-full">
                        {getDeviceIcon(device.type)}
                      </div>
                      <div>
                        <div className="flex items-center">
                          <span className="font-medium">{device.name}</span>
                          {device.isCurrent && (
                            <span className="ml-2 px-2 py-0.5 text-xs bg-artflow-blue text-white rounded-full">
                              当前设备
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-500">
                          <p>最后活动时间：{device.lastActive}</p>
                          <p>登录地点：{device.location}</p>
                        </div>
                      </div>
                    </div>
                    {!device.isCurrent && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleLogout(device)}
                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                      >
                        <LogOut className="h-4 w-4 mr-1" />
                        登出
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认登出设备</AlertDialogTitle>
            <AlertDialogDescription>
              您确定要登出该设备吗？这将终止该设备上的所有会话。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction onClick={confirmLogout} className="bg-red-500 hover:bg-red-600">
              确认登出
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DeviceManagement; 
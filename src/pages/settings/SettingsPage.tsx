import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import MobileNavFooter from '@/components/MobileNavFooter';
import {
  Lock,
  Mail,
  MapPin,
  Coffee,
  Bell,
  Shield,
  HelpCircle,
  Settings,
  Trash2,
  LogOut,
  ChevronRight,
} from 'lucide-react';

const SettingsPage: React.FC = () => {
  const navigate = useNavigate();

  const sections = [
    {
      title: '账号安全',
      icon: <Lock className="h-5 w-5" />,
      items: [
        {
          title: '修改密码',
          description: '更新您的登录密码',
          path: '/settings/account/password',
        },
        {
          title: '安全中心',
          description: '管理账号安全',
          path: '/settings/account/security',
        },
      ],
    },
    {
      title: '地址管理',
      icon: <MapPin className="h-5 w-5" />,
      items: [
        {
          title: '收货地址',
          description: '管理您的收货地址',
          path: '/settings/address/shipping',
        },
        {
          title: '退货地址',
          description: '管理退货地址',
          path: '/settings/address/return',
        },
      ],
    },
    {
      title: '咖啡豆',
      icon: <Coffee className="h-5 w-5" />,
      items: [
        {
          title: '充值',
          description: '充值咖啡豆',
          path: '/settings/coffee/recharge',
        },
        {
          title: '交易记录',
          description: '查看咖啡豆收支明细',
          path: '/settings/coffee/records',
        },
      ],
    },
    {
      title: '通知设置',
      icon: <Bell className="h-5 w-5" />,
      items: [
        {
          title: '通知偏好',
          description: '设置通知接收方式',
          path: '/settings/notifications',
        },
      ],
    },
    {
      title: '隐私设置',
      icon: <Shield className="h-5 w-5" />,
      items: [
        {
          title: '隐私选项',
          description: '管理您的隐私设置',
          path: '/settings/privacy',
        },
      ],
    },
    {
      title: '帮助中心',
      icon: <HelpCircle className="h-5 w-5" />,
      items: [
        {
          title: '常见问题',
          description: '查看常见问题解答',
          path: '/help/faqs',
        },
        {
          title: '联系客服',
          description: '获取帮助和支持',
          path: '/help/contact',
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">设置</h1>
          
          <div className="space-y-6">
            {sections.map((section, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    {section.icon}
                    <CardTitle>{section.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {section.items.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg cursor-pointer"
                        onClick={() => navigate(item.path)}
                      >
                        <div>
                          <h3 className="font-medium">{item.title}</h3>
                          <CardDescription>{item.description}</CardDescription>
                        </div>
                        <Button variant="ghost" size="icon">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <MobileNavFooter />
    </div>
  );
};

export default SettingsPage; 
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import MobileNavFooter from '@/components/MobileNavFooter';
import {
  User,
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
} from 'lucide-react';

const SettingsPage: React.FC = () => {
  const navigate = useNavigate();

  const sections = [
    {
      title: '个人资料',
      icon: <User className="h-5 w-5" />,
      items: [
        {
          title: '头像设置',
          description: '更换您的个人头像',
          path: '/settings/profile/avatar',
        },
        {
          title: '个人简介',
          description: '编辑您的个人介绍',
          path: '/settings/profile/bio',
        },
        {
          title: '性别设置',
          description: '设置您的性别信息',
          path: '/settings/profile/gender',
        },
        {
          title: '生日设置',
          description: '设置您的出生日期',
          path: '/settings/profile/birthday',
        },
        {
          title: '学校设置',
          description: '设置您的学校信息',
          path: '/settings/profile/school',
        },
      ],
    },
    {
      title: '账号安全',
      icon: <Shield className="h-5 w-5" />,
      items: [
        {
          title: '修改密码',
          description: '更新您的登录密码',
          path: '/settings/account/password',
        },
        {
          title: '安全中心',
          description: '管理账号安全设置',
          path: '/settings/account/security',
        },
        {
          title: '绑定邮箱',
          description: '设置或更换绑定邮箱',
          path: '/settings/account/email',
        },
        {
          title: '设备管理',
          description: '管理已登录设备',
          path: '/settings/account/device',
        },
        {
          title: '注销账号',
          description: '永久删除您的账号',
          path: '/settings/account/delete',
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
          description: '管理您的退货地址',
          path: '/settings/address/return',
        },
      ],
    },
    {
      title: '咖啡豆',
      icon: <Coffee className="h-5 w-5" />,
      items: [
        {
          title: '充值中心',
          description: '为您的账号充值咖啡豆',
          path: '/settings/coffee/recharge',
        },
        {
          title: '消费记录',
          description: '查看咖啡豆使用记录',
          path: '/settings/coffee/records',
        },
      ],
    },
    {
      title: '隐私与通知',
      icon: <Bell className="h-5 w-5" />,
      items: [
        {
          title: '隐私设置',
          description: '管理您的隐私选项',
          path: '/settings/privacy',
        },
        {
          title: '通知设置',
          description: '设置消息通知方式',
          path: '/settings/notifications',
        },
      ],
    },
    {
      title: '其他设置',
      icon: <Settings className="h-5 w-5" />,
      items: [
        {
          title: '缓存管理',
          description: '清理应用缓存数据',
          path: '/settings/cache',
        },
        {
          title: '关于我们',
          description: '了解平台更多信息',
          path: '/settings/about',
        },
        {
          title: '帮助中心',
          description: '获取使用帮助',
          path: '/settings/help',
        },
      ],
    },
    {
      title: '退出登录',
      icon: <LogOut className="h-5 w-5 text-red-500" />,
      items: [
        {
          title: '退出登录',
          description: '退出当前账号并返回登录页面',
          path: '/login',
          onClick: () => {
            // 清除登录状态
            localStorage.removeItem('token');
            // 跳转到登录页
            navigate('/login');
          }
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-14 md:pb-0">
      <Navbar />

      <div className="container mx-auto pt-24 pb-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">设置</h1>
            <p className="text-gray-500">管理您的账号和设置</p>
          </div>

          <div className="space-y-6">
            {sections.map((section, sectionIndex) => (
              <Card key={sectionIndex} className="border-none shadow-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      {section.icon}
                    </div>
                    <CardTitle className="text-lg">{section.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3">
                    {section.items.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div>
                          <h3 className="font-medium text-sm">{item.title}</h3>
                          <p className="text-xs text-gray-500">{item.description}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={item.onClick || (() => navigate(item.path))}
                          className="h-8"
                        >
                          去设置
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
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, Key, AlertTriangle } from 'lucide-react';

const SecurityCenter: React.FC = () => {
  const navigate = useNavigate();

  const securityItems = [
    {
      title: '修改密码',
      description: '定期更新密码可以提高账号安全性',
      icon: <Lock className="h-6 w-6" />,
      path: '/settings/account/password',
    },
    {
      title: '邮箱绑定',
      description: '绑定邮箱可以用于找回密码和接收重要通知',
      icon: <Key className="h-6 w-6" />,
      path: '/settings/account/email',
    },
    {
      title: '账号注销',
      description: '注销账号将永久删除所有数据，请谨慎操作',
      icon: <AlertTriangle className="h-6 w-6" />,
      path: '/settings/account/delete',
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">安全中心</h1>
        <p className="text-gray-500">管理您的账号安全设置</p>
      </div>

      <div className="grid gap-6">
        {securityItems.map((item, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  {item.icon}
                </div>
                <div>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                onClick={() => navigate(item.path)}
              >
                去设置
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SecurityCenter; 
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Shield, MapPin, Coffee, Bell, Settings as SettingsIcon } from 'lucide-react';

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const [sections, setSections] = useState([
    {
      title: "个人资料",
      icon: <User className="h-5 w-5" />,
      items: [
        {
          title: "头像设置",
          description: "更换您的个人头像",
          path: "/settings/profile/avatar",
        },
        {
          title: "个人资料",
          description: "修改您的个人信息",
          path: "/settings/profile/bio",
        },
      ],
    },
    {
      title: "账号安全",
      icon: <Shield className="h-5 w-5" />,
      items: [
        {
          title: "修改密码",
          description: "更新您的登录密码",
          path: "/settings/account/password",
        },
        {
          title: "安全中心",
          description: "管理账号安全",
          path: "/settings/account/security",
        },
      ],
    },
    {
      title: "地址管理",
      icon: <MapPin className="h-5 w-5" />,
      items: [
        {
          title: "收货地址",
          description: "管理您的收货地址",
          path: "/settings/address/shipping",
        },
        {
          title: "退货地址",
          description: "管理退货地址",
          path: "/settings/address/return",
        },
      ],
    },
    {
      title: "咖啡豆",
      icon: <Coffee className="h-5 w-5" />,
      items: [
        {
          title: "充值",
          description: "充值咖啡豆",
          path: "/settings/coffee/recharge",
        },
        {
          title: "交易记录",
          description: "查看咖啡豆收支明细",
          path: "/settings/coffee/records",
        },
      ],
    },
    {
      title: "隐私与通知",
      icon: <Bell className="h-5 w-5" />,
      items: [
        {
          title: "通知设置",
          description: "管理消息通知",
          path: "/settings/notifications",
        },
        {
          title: "隐私设置",
          description: "管理隐私选项",
          path: "/settings/privacy",
        },
      ],
    },
    {
      title: "其他设置",
      icon: <SettingsIcon className="h-5 w-5" />,
      items: [
        {
          title: "关于我们",
          description: "了解低碳艺术",
          path: "/settings/about",
        },
        {
          title: "帮助中心",
          description: "获取帮助与支持",
          path: "/settings/help",
        },
        {
          title: "退出登录",
          description: "退出当前账号",
          path: "/login",
          onClick: () => {
            // 清除登录状态
            localStorage.removeItem('token');
            // 跳转到登录页
            navigate('/login');
          }
        },
      ],
    },
  ]);

  return (
    <div className="p-4">
      {sections.map((section, index) => (
        <div key={index} className="mb-4">
          <h2 className="text-xl font-bold mb-2">{section.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {section.items.map((item, itemIndex) => (
              <div key={itemIndex} className="col-span-1">
                <div className="bg-white p-4 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-500">{item.description}</p>
                  <button 
                    onClick={item.onClick || (() => navigate(item.path))}
                    className="text-blue-500 hover:underline"
                  >
                    查看
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Settings; 
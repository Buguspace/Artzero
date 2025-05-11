import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Info, Github, Mail, Globe } from 'lucide-react';

const About: React.FC = () => {
  const navigate = useNavigate();

  const appInfo = {
    name: '新闻置网',
    version: '1.0.0',
    description: '一个专注于新闻分享和交流的平台',
    features: [
      '新闻发布与分享',
      '社区互动',
      '咖啡豆打赏系统',
      '个性化推荐',
    ],
  };

  const contactInfo = [
    {
      icon: <Github className="h-5 w-5" />,
      label: 'GitHub',
      value: 'github.com/newsplatform',
      link: 'https://github.com/newsplatform',
    },
    {
      icon: <Mail className="h-5 w-5" />,
      label: '邮箱',
      value: 'support@newsplatform.com',
      link: 'mailto:support@newsplatform.com',
    },
    {
      icon: <Globe className="h-5 w-5" />,
      label: '官网',
      value: 'www.newsplatform.com',
      link: 'https://www.newsplatform.com',
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
            <h1 className="text-2xl font-bold">关于我们</h1>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-6">
              <Info className="h-6 w-6 text-blue-500 mr-2" />
              <h2 className="text-lg font-semibold">应用信息</h2>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-2">{appInfo.name}</h3>
                <p className="text-gray-500">版本 {appInfo.version}</p>
              </div>

              <div>
                <h4 className="font-medium mb-2">应用简介</h4>
                <p className="text-gray-600">{appInfo.description}</p>
              </div>

              <div>
                <h4 className="font-medium mb-2">主要功能</h4>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  {appInfo.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-2">联系我们</h4>
                <div className="space-y-3">
                  {contactInfo.map((contact, index) => (
                    <div
                      key={index}
                      className="flex items-center text-gray-600"
                    >
                      {contact.icon}
                      <span className="ml-2">{contact.label}：</span>
                      <a
                        href={contact.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-1 text-blue-500 hover:underline"
                      >
                        {contact.value}
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t">
                <p className="text-sm text-gray-500 text-center">
                  © 2024 新闻置网. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 
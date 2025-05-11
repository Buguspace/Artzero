import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/sonner';
import { ArrowLeft, Search, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const HelpCenter: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const faqCategories = [
    {
      title: '账号相关',
      items: [
        {
          question: '如何修改密码？',
          answer: '您可以在"设置 > 账号与安全 > 修改密码"中修改您的密码。请确保新密码符合安全要求。',
        },
        {
          question: '忘记密码怎么办？',
          answer: '您可以通过绑定的手机号或邮箱进行密码重置。点击登录页面的"忘记密码"链接，按照提示操作即可。',
        },
        {
          question: '如何绑定手机号？',
          answer: '在"设置 > 账号与安全 > 手机绑定"中，输入您的手机号并完成验证即可绑定。',
        },
      ],
    },
    {
      title: '咖啡豆相关',
      items: [
        {
          question: '什么是咖啡豆？',
          answer: '咖啡豆是平台内的虚拟货币，可以用于打赏创作者、购买特殊功能等。',
        },
        {
          question: '如何获取咖啡豆？',
          answer: '您可以通过充值获取咖啡豆，也可以参与平台活动获得奖励。',
        },
        {
          question: '咖啡豆可以提现吗？',
          answer: '目前咖啡豆不支持提现，仅限在平台内使用。',
        },
      ],
    },
    {
      title: '内容发布',
      items: [
        {
          question: '如何发布新闻？',
          answer: '点击首页的"发布"按钮，填写新闻标题、内容和相关图片，点击发布即可。',
        },
        {
          question: '发布内容有什么限制？',
          answer: '请确保内容符合平台规范，不包含违法、违规或不良信息。',
        },
        {
          question: '如何编辑已发布的内容？',
          answer: '在个人主页找到要编辑的内容，点击编辑按钮进行修改。',
        },
      ],
    },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // 实现搜索功能
    toast.info('搜索功能开发中...');
  };

  const filteredCategories = faqCategories.map(category => ({
    ...category,
    items: category.items.filter(item =>
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter(category => category.items.length > 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center mb-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/settings')}
              className="mr-2"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold">帮助中心</h1>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-6">
              <HelpCircle className="h-6 w-6 text-blue-500 mr-2" />
              <h2 className="text-lg font-semibold">常见问题</h2>
            </div>

            <form onSubmit={handleSearch} className="mb-6">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="搜索问题..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
                <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
            </form>

            <Accordion type="single" collapsible className="space-y-4">
              {filteredCategories.map((category, index) => (
                <AccordionItem
                  key={index}
                  value={`category-${index}`}
                  className="border rounded-lg px-4"
                >
                  <AccordionTrigger className="text-lg font-medium">
                    {category.title}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 py-2">
                      {category.items.map((item, itemIndex) => (
                        <div
                          key={itemIndex}
                          className="border-b last:border-0 pb-4 last:pb-0"
                        >
                          <h4 className="font-medium mb-2">{item.question}</h4>
                          <p className="text-gray-600">{item.answer}</p>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="mt-8 text-center">
              <p className="text-gray-500 mb-2">没有找到您需要的答案？</p>
              <Button
                variant="outline"
                onClick={() => toast.info('联系客服功能开发中...')}
              >
                联系客服
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter; 
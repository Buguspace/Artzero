import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/sonner';
import { ArrowLeft, Coffee } from 'lucide-react';

const Recharge: React.FC = () => {
  const navigate = useNavigate();
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [isRecharging, setIsRecharging] = useState(false);

  const rechargeOptions = [
    { amount: 10, beans: 100 },
    { amount: 50, beans: 550 },
    { amount: 100, beans: 1200 },
    { amount: 200, beans: 2600 },
    { amount: 500, beans: 7000 },
    { amount: 1000, beans: 15000 },
  ];

  const handleRecharge = async () => {
    if (!selectedAmount) {
      toast.error('请选择充值金额');
      return;
    }

    setIsRecharging(true);

    try {
      // 模拟充值过程
      await new Promise(resolve => setTimeout(resolve, 1000));

      // 更新咖啡豆数量
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      const selectedOption = rechargeOptions.find(option => option.amount === selectedAmount);
      
      if (selectedOption) {
        currentUser.coffeeBeans = (currentUser.coffeeBeans || 0) + selectedOption.beans;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));

        // 触发咖啡豆更新事件
        window.dispatchEvent(new CustomEvent('coffeeBeansUpdated', {
          detail: { coffeeBeans: currentUser.coffeeBeans }
        }));

        toast.success('充值成功');
        navigate('/settings');
      }
    } catch (error) {
      toast.error('充值失败，请重试');
    } finally {
      setIsRecharging(false);
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
            <h1 className="text-2xl font-bold">咖啡豆充值</h1>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="mb-6">
              <Label className="block mb-4">选择充值金额</Label>
              <div className="grid grid-cols-2 gap-4">
                {rechargeOptions.map((option) => (
                  <Button
                    key={option.amount}
                    variant={selectedAmount === option.amount ? 'default' : 'outline'}
                    className="h-auto py-4 flex flex-col items-center justify-center"
                    onClick={() => setSelectedAmount(option.amount)}
                  >
                    <span className="text-lg font-semibold">¥{option.amount}</span>
                    <span className="text-sm text-gray-500 mt-1">
                      {option.beans} 咖啡豆
                    </span>
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg mb-6">
              <div className="flex items-center">
                <Coffee className="h-5 w-5 text-yellow-600 mr-2" />
                <span className="text-gray-600">当前咖啡豆：</span>
              </div>
              <span className="text-lg font-semibold">
                {JSON.parse(localStorage.getItem('currentUser') || '{}').coffeeBeans || 0}
              </span>
            </div>

            <div className="flex justify-end space-x-4">
              <Button
                variant="outline"
                onClick={() => navigate('/settings')}
              >
                取消
              </Button>
              <Button
                onClick={handleRecharge}
                disabled={isRecharging || !selectedAmount}
              >
                {isRecharging ? '充值中...' : '立即充值'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recharge; 
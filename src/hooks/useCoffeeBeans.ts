import { useState, useEffect } from 'react';
import { userApi } from '@/services/api';
import { CoffeeRecord } from '@/types';
import { toast } from '@/components/ui/sonner';

export const useCoffeeBeans = () => {
  const [balance, setBalance] = useState(0);
  const [records, setRecords] = useState<CoffeeRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadCoffeeBeans();
    loadRecords();
  }, []);

  const loadCoffeeBeans = async () => {
    try {
      const response = await userApi.getCoffeeBeans();
      setBalance(response.balance);
    } catch (error) {
      toast.error('加载咖啡豆余额失败');
    }
  };

  const loadRecords = async () => {
    try {
      const response = await userApi.getRecords();
      setRecords(response);
    } catch (error) {
      toast.error('加载咖啡豆记录失败');
    } finally {
      setIsLoading(false);
    }
  };

  const recharge = async (amount: number) => {
    try {
      const response = await userApi.recharge(amount);
      setBalance(response.balance);
      setRecords(prev => [response.record, ...prev]);
      toast.success('充值成功');
      return response;
    } catch (error) {
      toast.error('充值失败');
      throw error;
    }
  };

  return {
    balance,
    records,
    isLoading,
    recharge,
  };
}; 
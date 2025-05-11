import { useState, useEffect } from 'react';
import { userApi } from '@/services/api';
import { Address } from '@/types';
import { toast } from '@/components/ui/sonner';

export const useAddresses = (type: 'shipping' | 'return') => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadAddresses();
  }, [type]);

  const loadAddresses = async () => {
    try {
      const response = await userApi.getAddresses(type);
      setAddresses(response);
    } catch (error) {
      toast.error('加载地址失败');
    } finally {
      setIsLoading(false);
    }
  };

  const addAddress = async (address: Omit<Address, 'id' | 'type' | 'createdAt' | 'updatedAt'>) => {
    try {
      const response = await userApi.addAddress(type, address);
      setAddresses(prev => [...prev, response]);
      toast.success('地址添加成功');
      return response;
    } catch (error) {
      toast.error('添加地址失败');
      throw error;
    }
  };

  const updateAddress = async (id: string, address: Partial<Address>) => {
    try {
      const response = await userApi.updateAddress(type, id, address);
      setAddresses(prev =>
        prev.map(addr => (addr.id === id ? { ...addr, ...response } : addr))
      );
      toast.success('地址更新成功');
      return response;
    } catch (error) {
      toast.error('更新地址失败');
      throw error;
    }
  };

  const deleteAddress = async (id: string) => {
    try {
      await userApi.deleteAddress(type, id);
      setAddresses(prev => prev.filter(addr => addr.id !== id));
      toast.success('地址删除成功');
    } catch (error) {
      toast.error('删除地址失败');
      throw error;
    }
  };

  const setDefaultAddress = async (id: string) => {
    try {
      const response = await userApi.setDefaultAddress(type, id);
      setAddresses(prev =>
        prev.map(addr => ({
          ...addr,
          isDefault: addr.id === id,
        }))
      );
      toast.success('默认地址设置成功');
      return response;
    } catch (error) {
      toast.error('设置默认地址失败');
      throw error;
    }
  };

  return {
    addresses,
    isLoading,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
  };
}; 
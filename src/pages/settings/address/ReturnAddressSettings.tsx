import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/sonner';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Address {
  id: string;
  name: string;
  phone: string;
  province: string;
  city: string;
  district: string;
  detail: string;
  isDefault: boolean;
}

const ReturnAddressSettings: React.FC = () => {
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newAddress, setNewAddress] = useState<Partial<Address>>({
    name: '',
    phone: '',
    province: '',
    city: '',
    district: '',
    detail: '',
    isDefault: false
  });

  useEffect(() => {
    // 加载用户的退货地址
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    setAddresses(currentUser.returnAddresses || []);
  }, []);

  const handleAddAddress = () => {
    if (!newAddress.name || !newAddress.phone || !newAddress.province || 
        !newAddress.city || !newAddress.district || !newAddress.detail) {
      toast.error('请填写完整的地址信息');
      return;
    }

    const address: Address = {
      id: Date.now().toString(),
      ...newAddress as Address
    };

    const updatedAddresses = [...addresses, address];
    setAddresses(updatedAddresses);

    // 更新本地存储
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    currentUser.returnAddresses = updatedAddresses;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    // 重置表单
    setNewAddress({
      name: '',
      phone: '',
      province: '',
      city: '',
      district: '',
      detail: '',
      isDefault: false
    });
    setIsAdding(false);
    toast.success('地址添加成功');
  };

  const handleDeleteAddress = (id: string) => {
    const updatedAddresses = addresses.filter(addr => addr.id !== id);
    setAddresses(updatedAddresses);

    // 更新本地存储
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    currentUser.returnAddresses = updatedAddresses;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    toast.success('地址删除成功');
  };

  const handleSetDefault = (id: string) => {
    const updatedAddresses = addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    }));
    setAddresses(updatedAddresses);

    // 更新本地存储
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    currentUser.returnAddresses = updatedAddresses;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    toast.success('默认地址设置成功');
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
            <h1 className="text-2xl font-bold">退货地址管理</h1>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <ScrollArea className="h-[calc(100vh-16rem)]">
              {addresses.map((address) => (
                <div key={address.id} className="mb-4 p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="font-medium">{address.name}</span>
                      <span className="ml-4 text-gray-500">{address.phone}</span>
                      {address.isDefault && (
                        <span className="ml-2 px-2 py-1 text-xs bg-artflow-pink text-white rounded">
                          默认
                        </span>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteAddress(address.id)}
                    >
                      <Trash2 className="h-4 w-4 text-gray-500" />
                    </Button>
                  </div>
                  <p className="text-gray-600 mb-2">
                    {address.province} {address.city} {address.district}
                  </p>
                  <p className="text-gray-600">{address.detail}</p>
                  {!address.isDefault && (
                    <Button
                      variant="link"
                      className="mt-2 p-0 h-auto"
                      onClick={() => handleSetDefault(address.id)}
                    >
                      设为默认地址
                    </Button>
                  )}
                </div>
              ))}

              {isAdding ? (
                <div className="p-4 border rounded-lg">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label>收货人</Label>
                      <Input
                        value={newAddress.name}
                        onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                        placeholder="请输入收货人姓名"
                      />
                    </div>
                    <div>
                      <Label>手机号</Label>
                      <Input
                        value={newAddress.phone}
                        onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                        placeholder="请输入手机号"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                      <Label>省份</Label>
                      <Input
                        value={newAddress.province}
                        onChange={(e) => setNewAddress({ ...newAddress, province: e.target.value })}
                        placeholder="省份"
                      />
                    </div>
                    <div>
                      <Label>城市</Label>
                      <Input
                        value={newAddress.city}
                        onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                        placeholder="城市"
                      />
                    </div>
                    <div>
                      <Label>区县</Label>
                      <Input
                        value={newAddress.district}
                        onChange={(e) => setNewAddress({ ...newAddress, district: e.target.value })}
                        placeholder="区县"
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <Label>详细地址</Label>
                    <Textarea
                      value={newAddress.detail}
                      onChange={(e) => setNewAddress({ ...newAddress, detail: e.target.value })}
                      placeholder="请输入详细地址"
                    />
                  </div>
                  <div className="flex justify-end space-x-4">
                    <Button
                      variant="outline"
                      onClick={() => setIsAdding(false)}
                    >
                      取消
                    </Button>
                    <Button onClick={handleAddAddress}>
                      保存
                    </Button>
                  </div>
                </div>
              ) : (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setIsAdding(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  添加新地址
                </Button>
              )}
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnAddressSettings; 
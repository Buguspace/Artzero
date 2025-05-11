import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';
import { ArrowLeft, Coffee, Plus, Minus } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface CoffeeRecord {
  id: string;
  type: 'recharge' | 'tip' | 'reward';
  amount: number;
  description: string;
  timestamp: string;
}

const Records: React.FC = () => {
  const navigate = useNavigate();
  const [records, setRecords] = useState<CoffeeRecord[]>([]);

  useEffect(() => {
    // 从本地存储加载记录
    const storedRecords = JSON.parse(localStorage.getItem('coffeeRecords') || '[]');
    setRecords(storedRecords);
  }, []);

  const getRecordIcon = (type: string) => {
    switch (type) {
      case 'recharge':
        return <Plus className="h-4 w-4 text-green-500" />;
      case 'tip':
        return <Minus className="h-4 w-4 text-red-500" />;
      case 'reward':
        return <Plus className="h-4 w-4 text-blue-500" />;
      default:
        return null;
    }
  };

  const getRecordTypeText = (type: string) => {
    switch (type) {
      case 'recharge':
        return '充值';
      case 'tip':
        return '打赏';
      case 'reward':
        return '奖励';
      default:
        return type;
    }
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/settings')}
              className="mr-2"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold">咖啡豆记录</h1>
          </div>

          <div className="bg-white rounded-lg shadow">
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center">
                <Coffee className="h-5 w-5 text-yellow-600 mr-2" />
                <span className="text-gray-600">当前咖啡豆：</span>
                <span className="text-lg font-semibold ml-2">
                  {JSON.parse(localStorage.getItem('currentUser') || '{}').coffeeBeans || 0}
                </span>
              </div>
              <Button
                onClick={() => navigate('/settings/coffee/recharge')}
              >
                充值
              </Button>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>类型</TableHead>
                    <TableHead>数量</TableHead>
                    <TableHead>描述</TableHead>
                    <TableHead>时间</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {records.length > 0 ? (
                    records.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell>
                          <div className="flex items-center">
                            {getRecordIcon(record.type)}
                            <span className="ml-2">{getRecordTypeText(record.type)}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className={record.type === 'tip' ? 'text-red-500' : 'text-green-500'}>
                            {record.type === 'tip' ? '-' : '+'}{record.amount}
                          </span>
                        </TableCell>
                        <TableCell>{record.description}</TableCell>
                        <TableCell>{formatDate(record.timestamp)}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                        暂无记录
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Records; 
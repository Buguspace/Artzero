import { useState, useEffect } from 'react';
import { helpApi } from '@/services/api';
import { FAQ } from '@/types';
import { toast } from '@/components/ui/sonner';

export const useHelpCenter = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [searchResults, setSearchResults] = useState<FAQ[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    loadFaqs();
  }, []);

  const loadFaqs = async () => {
    try {
      const response = await helpApi.getFaqs();
      setFaqs(response);
    } catch (error) {
      toast.error('加载常见问题失败');
    } finally {
      setIsLoading(false);
    }
  };

  const searchFaqs = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const response = await helpApi.searchFaqs(query);
      setSearchResults(response);
    } catch (error) {
      toast.error('搜索失败');
    } finally {
      setIsSearching(false);
    }
  };

  const contactSupport = async (subject: string, message: string) => {
    try {
      await helpApi.contactSupport({ subject, message });
      toast.success('消息已发送，我们会尽快回复您');
    } catch (error) {
      toast.error('发送失败，请重试');
      throw error;
    }
  };

  return {
    faqs,
    searchResults,
    isLoading,
    isSearching,
    searchFaqs,
    contactSupport,
  };
}; 
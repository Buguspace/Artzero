import { toast } from '@/components/ui/sonner';

export interface SearchResult {
  id: string;
  title: string;
  content: string;
  type: 'article' | 'user' | 'comment';
  createdAt: string;
  author?: string;
  category?: string;
  tags?: string[];
}

export interface SearchFilter {
  type?: 'article' | 'user' | 'comment';
  category?: string;
  dateRange?: {
    start: string;
    end: string;
  };
  tags?: string[];
}

const SEARCH_HISTORY_KEY = 'searchHistory';
const MAX_HISTORY_ITEMS = 10;

export const searchService = {
  // 执行搜索
  async search(query: string, filter?: SearchFilter): Promise<SearchResult[]> {
    try {
      // 保存搜索历史
      this.saveSearchHistory(query);

      // 这里应该调用后端API进行搜索
      // 目前使用模拟数据
      const results: SearchResult[] = [
        {
          id: '1',
          title: '示例文章1',
          content: '这是示例文章1的内容...',
          type: 'article',
          createdAt: '2024-03-20T10:00:00Z',
          author: '张三',
          category: '科技',
          tags: ['技术', '编程'],
        },
        // ... 更多结果
      ];

      // 应用过滤条件
      return this.applyFilters(results, filter);
    } catch (error) {
      console.error('搜索失败:', error);
      toast.error('搜索失败，请重试');
      return [];
    }
  },

  // 应用过滤条件
  applyFilters(results: SearchResult[], filter?: SearchFilter): SearchResult[] {
    if (!filter) return results;

    return results.filter(result => {
      if (filter.type && result.type !== filter.type) return false;
      if (filter.category && result.category !== filter.category) return false;
      if (filter.tags && !filter.tags.every(tag => result.tags?.includes(tag))) return false;
      if (filter.dateRange) {
        const resultDate = new Date(result.createdAt);
        const startDate = new Date(filter.dateRange.start);
        const endDate = new Date(filter.dateRange.end);
        if (resultDate < startDate || resultDate > endDate) return false;
      }
      return true;
    });
  },

  // 保存搜索历史
  saveSearchHistory(query: string) {
    try {
      const history = this.getSearchHistory();
      // 移除重复项
      const filteredHistory = history.filter(item => item !== query);
      // 添加到开头
      filteredHistory.unshift(query);
      // 限制历史记录数量
      const trimmedHistory = filteredHistory.slice(0, MAX_HISTORY_ITEMS);
      localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(trimmedHistory));
    } catch (error) {
      console.error('保存搜索历史失败:', error);
    }
  },

  // 获取搜索历史
  getSearchHistory(): string[] {
    try {
      return JSON.parse(localStorage.getItem(SEARCH_HISTORY_KEY) || '[]');
    } catch (error) {
      console.error('获取搜索历史失败:', error);
      return [];
    }
  },

  // 清除搜索历史
  clearSearchHistory() {
    try {
      localStorage.removeItem(SEARCH_HISTORY_KEY);
      toast.success('搜索历史已清除');
    } catch (error) {
      console.error('清除搜索历史失败:', error);
      toast.error('清除搜索历史失败');
    }
  },

  // 删除单个搜索历史项
  removeSearchHistoryItem(query: string) {
    try {
      const history = this.getSearchHistory();
      const filteredHistory = history.filter(item => item !== query);
      localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(filteredHistory));
    } catch (error) {
      console.error('删除搜索历史项失败:', error);
    }
  },
}; 
 
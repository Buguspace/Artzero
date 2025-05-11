import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter, X } from 'lucide-react';
import { searchService, SearchResult, SearchFilter as SearchFilterType } from '@/services/searchService';
import SearchFilter from '@/components/search/SearchFilter';
import SearchHistory from '@/components/search/SearchHistory';
import SearchResults from '@/components/search/SearchResults';
import { useDebounce } from '@/hooks/useDebounce';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

const SearchPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [filter, setFilter] = useState<SearchFilterType>({});
  const debouncedQuery = useDebounce(query, 300);

  // 模拟分类和标签数据
  const categories = ['科技', '文化', '体育', '娱乐', '教育'];
  const tags = ['热门', '推荐', '最新', '精华', '置顶'];

  useEffect(() => {
    if (debouncedQuery) {
      handleSearch();
    }
  }, [debouncedQuery, filter]);

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const searchResults = await searchService.search(debouncedQuery, filter);
      setResults(searchResults);
    } catch (error) {
      console.error('搜索失败:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleHistorySelect = (historyQuery: string) => {
    setQuery(historyQuery);
  };

  const handleClearQuery = () => {
    setQuery('');
    setResults([]);
  };

  return (
    <div className="container mx-auto px-4 py-4 md:py-8">
      <div className="max-w-4xl mx-auto">
        {/* 搜索框 */}
        <div className="flex items-center space-x-2 mb-4 md:mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="搜索文章、用户或评论..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 pr-10"
            />
            {query && (
              <button
                onClick={handleClearQuery}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
          
          {/* 移动端筛选按钮 */}
          <Sheet open={showFilter} onOpenChange={setShowFilter}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Filter className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-[400px] p-0">
              <SheetHeader className="p-4 border-b">
                <SheetTitle>筛选条件</SheetTitle>
              </SheetHeader>
              <div className="p-4">
                <SearchFilter
                  filter={filter}
                  onFilterChange={setFilter}
                  categories={categories}
                  tags={tags}
                />
              </div>
            </SheetContent>
          </Sheet>

          {/* 桌面端筛选按钮 */}
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowFilter(!showFilter)}
            className="hidden md:flex"
          >
            <Filter className="h-5 w-5" />
          </Button>
          
          <Button onClick={handleSearch} className="hidden md:flex">搜索</Button>
        </div>

        {/* 桌面端筛选器 */}
        {showFilter && (
          <div className="hidden md:block mb-6">
            <SearchFilter
              filter={filter}
              onFilterChange={setFilter}
              categories={categories}
              tags={tags}
            />
          </div>
        )}

        {/* 搜索历史 */}
        {!query && <SearchHistory onSelectHistory={handleHistorySelect} />}

        {/* 搜索结果 */}
        {query && (
          <SearchResults
            results={results}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
};

export default SearchPage; 
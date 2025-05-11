import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { History, X, Clock } from 'lucide-react';
import { searchService } from '@/services/searchService';

interface SearchHistoryProps {
  onSelectHistory: (query: string) => void;
}

const SearchHistory: React.FC<SearchHistoryProps> = ({ onSelectHistory }) => {
  const [history, setHistory] = React.useState<string[]>([]);

  React.useEffect(() => {
    setHistory(searchService.getSearchHistory());
  }, []);

  const handleClearHistory = () => {
    searchService.clearSearchHistory();
    setHistory([]);
  };

  const handleRemoveItem = (query: string) => {
    searchService.removeSearchHistoryItem(query);
    setHistory(prev => prev.filter(item => item !== query));
  };

  if (history.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center space-x-2">
          <History className="h-4 w-4" />
          <span className="text-sm font-medium">搜索历史</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClearHistory}
          className="text-xs"
        >
          清除历史
        </Button>
      </div>

      <ScrollArea className="h-[180px] md:h-[200px]">
        <div className="space-y-1">
          {history.map((query, index) => (
            <div
              key={index}
              className="group flex items-center justify-between p-2 hover:bg-gray-100 rounded-md cursor-pointer"
            >
              <div
                className="flex items-center flex-1 min-w-0"
                onClick={() => onSelectHistory(query)}
              >
                <Clock className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
                <span className="truncate">{query}</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => handleRemoveItem(query)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default SearchHistory; 
 
import React from 'react';
import { SearchResult } from '@/services/searchService';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { FileText, User, MessageSquare, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SearchResultsProps {
  results: SearchResult[];
  isLoading: boolean;
}

const SearchResults: React.FC<SearchResultsProps> = ({ results, isLoading }) => {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">未找到相关结果</p>
      </div>
    );
  }

  const handleResultClick = (result: SearchResult) => {
    // 根据不同类型跳转到不同页面
    switch (result.type) {
      case 'article':
        navigate(`/article/${result.id}`);
        break;
      case 'user':
        navigate(`/user/${result.id}`);
        break;
      case 'comment':
        navigate(`/article/${result.id}#comment-${result.id}`);
        break;
    }
  };

  return (
    <div className="space-y-2">
      {results.map(result => (
        <div
          key={result.id}
          className="p-3 md:p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow active:bg-gray-50"
          onClick={() => handleResultClick(result)}
        >
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              {result.type === 'article' && <FileText className="h-5 w-5 md:h-6 md:w-6 text-blue-500" />}
              {result.type === 'user' && <User className="h-5 w-5 md:h-6 md:w-6 text-green-500" />}
              {result.type === 'comment' && <MessageSquare className="h-5 w-5 md:h-6 md:w-6 text-purple-500" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <h3 className="text-base md:text-lg font-semibold truncate pr-4">{result.title}</h3>
                <ChevronRight className="h-5 w-5 text-gray-400 flex-shrink-0" />
              </div>
              <p className="mt-1 text-sm md:text-base text-gray-600 line-clamp-2">{result.content}</p>
              <div className="mt-2 flex flex-wrap items-center gap-1.5 md:gap-2 text-xs md:text-sm text-gray-500">
                {result.author && (
                  <span className="flex items-center">
                    <User className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                    {result.author}
                  </span>
                )}
                {result.category && (
                  <span className="px-1.5 py-0.5 md:px-2 md:py-1 bg-gray-100 rounded-full">
                    {result.category}
                  </span>
                )}
                {result.tags?.map(tag => (
                  <span
                    key={tag}
                    className="px-1.5 py-0.5 md:px-2 md:py-1 bg-blue-50 text-blue-600 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
                <span className="ml-auto">
                  {format(new Date(result.createdAt), 'yyyy-MM-dd HH:mm')}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchResults; 
 
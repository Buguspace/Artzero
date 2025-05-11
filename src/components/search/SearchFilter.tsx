import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { CalendarIcon, X, Filter } from 'lucide-react';
import { SearchFilter as SearchFilterType } from '@/services/searchService';

interface SearchFilterProps {
  filter: SearchFilterType;
  onFilterChange: (filter: SearchFilterType) => void;
  categories: string[];
  tags: string[];
}

const SearchFilter: React.FC<SearchFilterProps> = ({
  filter,
  onFilterChange,
  categories,
  tags,
}) => {
  const handleTypeChange = (value: string) => {
    onFilterChange({ ...filter, type: value as 'article' | 'user' | 'comment' });
  };

  const handleCategoryChange = (value: string) => {
    onFilterChange({ ...filter, category: value });
  };

  const handleDateRangeChange = (range: { from: Date; to: Date }) => {
    onFilterChange({
      ...filter,
      dateRange: {
        start: range.from.toISOString(),
        end: range.to.toISOString(),
      },
    });
  };

  const handleTagToggle = (tag: string) => {
    const currentTags = filter.tags || [];
    const newTags = currentTags.includes(tag)
      ? currentTags.filter(t => t !== tag)
      : [...currentTags, tag];
    onFilterChange({ ...filter, tags: newTags });
  };

  const clearFilter = () => {
    onFilterChange({});
  };

  const hasActiveFilters = Object.keys(filter).length > 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4" />
          <h3 className="text-base md:text-lg font-semibold">筛选条件</h3>
        </div>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilter}>
            清除筛选
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 类型筛选 */}
        <div className="space-y-2">
          <Label className="text-sm">内容类型</Label>
          <Select value={filter.type} onValueChange={handleTypeChange}>
            <SelectTrigger className="h-9">
              <SelectValue placeholder="选择类型" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="article">文章</SelectItem>
              <SelectItem value="user">用户</SelectItem>
              <SelectItem value="comment">评论</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* 分类筛选 */}
        <div className="space-y-2">
          <Label className="text-sm">分类</Label>
          <Select value={filter.category} onValueChange={handleCategoryChange}>
            <SelectTrigger className="h-9">
              <SelectValue placeholder="选择分类" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* 日期范围筛选 */}
        <div className="space-y-2">
          <Label className="text-sm">日期范围</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  'w-full h-9 justify-start text-left font-normal',
                  !filter.dateRange && 'text-muted-foreground'
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {filter.dateRange ? (
                  `${format(new Date(filter.dateRange.start), 'yyyy-MM-dd')} - ${format(
                    new Date(filter.dateRange.end),
                    'yyyy-MM-dd'
                  )}`
                ) : (
                  <span>选择日期范围</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="range"
                selected={{
                  from: filter.dateRange ? new Date(filter.dateRange.start) : undefined,
                  to: filter.dateRange ? new Date(filter.dateRange.end) : undefined,
                }}
                onSelect={handleDateRangeChange}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* 标签筛选 */}
        <div className="space-y-2">
          <Label className="text-sm">标签</Label>
          <div className="flex flex-wrap gap-1.5">
            {tags.map(tag => (
              <Button
                key={tag}
                variant={filter.tags?.includes(tag) ? 'default' : 'outline'}
                size="sm"
                className="h-7 text-xs"
                onClick={() => handleTagToggle(tag)}
              >
                {tag}
                {filter.tags?.includes(tag) && (
                  <X className="ml-1 h-3 w-3" />
                )}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter; 
 

import React from "react";
import { SortAsc } from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export type SortOption = "latest" | "oldest" | "price-low" | "price-high";

interface SortControlsProps {
  sortBy: SortOption;
  onSortChange: (value: SortOption) => void;
  pageJumpInput: string;
  setPageJumpInput: (value: string) => void;
  onJumpToPage: () => void;
  totalPages: number;
}

const SortControls: React.FC<SortControlsProps> = ({
  sortBy,
  onSortChange,
  pageJumpInput,
  setPageJumpInput,
  onJumpToPage,
  totalPages
}) => {
  return (
    <div className="flex flex-wrap gap-4 items-center justify-between">
      <div className="flex items-center space-x-2">
        <SortAsc size={18} className="text-gray-500" />
        <span className="font-medium">排序</span>
        <Select value={sortBy} onValueChange={(value: SortOption) => onSortChange(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="选择排序方式" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="latest">最新发布</SelectItem>
            <SelectItem value="oldest">最早发布</SelectItem>
            <SelectItem value="price-low">价格从低到高</SelectItem>
            <SelectItem value="price-high">价格从高到低</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {/* Page Jump Control */}
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-500">跳转到页</span>
        <div className="flex space-x-1">
          <Input
            type="number"
            min="1"
            max={totalPages}
            value={pageJumpInput}
            onChange={(e) => setPageJumpInput(e.target.value)}
            className="w-16 h-8 text-center"
          />
          <Button 
            onClick={onJumpToPage}
            size="sm"
            className="h-8"
          >
            确定
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SortControls;

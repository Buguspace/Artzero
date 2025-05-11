import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

interface CategoryFiltersProps {
  activeTab: string;
  currentFilter: string | null;
  onFilterChange: (filterId: string | null) => void;
}

const CategoryFilters: React.FC<CategoryFiltersProps> = ({
  activeTab,
  currentFilter,
  onFilterChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Define filters based on the active tab
  const lifeFilters = [
    { id: "art", label: "艺术" },
    { id: "books", label: "书籍" },
    { id: "housing", label: "租房" },
    { id: "jobs", label: "招聘" },
  ];

  const entertainmentFilters = [
    { id: "music", label: "音乐" },
    { id: "video", label: "视频" },
  ];

  const filters = activeTab === "life" ? lifeFilters : entertainmentFilters;

  return (
    <div className="flex flex-wrap gap-2">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className={`px-4 py-2 rounded-full text-sm ${
              currentFilter === null
                ? "bg-artflow-blue text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            全部
            <ChevronDown className="ml-1 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48">
          {filters.map((filter) => (
            <DropdownMenuItem
              key={filter.id}
              onClick={() => {
                onFilterChange(filter.id);
                setIsOpen(false);
              }}
              className="cursor-pointer"
            >
              {filter.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {filters.map((filter) => (
        <Button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          className={`px-4 py-2 rounded-full text-sm ${
            currentFilter === filter.id
              ? "bg-artflow-blue text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {filter.label}
        </Button>
      ))}
    </div>
  );
};

export default CategoryFilters;

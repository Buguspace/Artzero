
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "../hooks/use-mobile";

// Mock product categories for demo purposes
const SEARCH_CATEGORIES = [
  { id: "1", name: "绘画", path: "/categories?type=painting" },
  { id: "2", name: "摄影", path: "/categories?type=photography" },
  { id: "3", name: "手工艺", path: "/categories?type=crafts" },
  { id: "4", name: "数字艺术", path: "/categories?type=digital" },
  { id: "5", name: "雕塑", path: "/categories?type=sculpture" },
];

const SearchBar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/categories?search=${encodeURIComponent(query)}`);
      setQuery("");
    }
  };

  // Handle keyboard shortcut to open search dialog
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSearchIconClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen(true);
  };

  return (
    <>
      <div className="relative w-full">
        <form onSubmit={handleSearch} className="relative">
          <div className="relative">
            <Search
              className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 cursor-pointer"
              onClick={handleSearchIconClick}
            />
            <Input
              type="search"
              placeholder={isMobile ? "搜索..." : "搜索作品、艺术家..."}
              className="pl-8 pr-4 py-1.5 text-sm border-gray-300 rounded-full focus:border-artflow-blue focus:ring-artflow-blue"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </form>
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="输入关键词搜索..." />
        <CommandList>
          <CommandEmpty>未找到匹配结果</CommandEmpty>
          <CommandGroup heading="热门分类">
            {SEARCH_CATEGORIES.map((category) => (
              <CommandItem
                key={category.id}
                onSelect={() => {
                  navigate(category.path);
                  setOpen(false);
                }}
              >
                {category.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default SearchBar;

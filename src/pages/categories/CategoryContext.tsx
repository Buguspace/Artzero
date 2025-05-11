import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { CategoryItemType } from "./CategoryItem";
import categoriesData from "./CategoryData";
import { 
  convertUserArtworksToItems, 
  sortItems, 
  Artwork, 
  SortOption 
} from "./CategoryUtils";

interface CategoryContextType {
  activeTab: "life" | "entertainment";
  filter: string | null;
  currentPage: number;
  sortBy: SortOption;
  pageJumpInput: string;
  totalPages: number;
  favorites: number[];
  paginatedItems: CategoryItemType[];
  handleTabChange: (tab: "life" | "entertainment") => void;
  handleFilterChange: (category: string | null) => void;
  handleSortChange: (value: SortOption) => void;
  setCurrentPage: (page: number) => void;
  setPageJumpInput: (input: string) => void;
  handleJumpToPage: () => void;
  toggleFavorite: (item: CategoryItemType) => void;
  hasUserArtworks: boolean;
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

interface CategoryProviderProps {
  children: ReactNode;
}

export const CategoryProvider: React.FC<CategoryProviderProps> = ({ children }) => {
  const params = useParams<{ tab?: string; category?: string }>();
  const [activeTab, setActiveTab] = useState<"life" | "entertainment">("life");
  const [filter, setFilter] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortOption>("latest");
  const [pageJumpInput, setPageJumpInput] = useState("");
  const [userArtworks, setUserArtworks] = useState<Artwork[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const itemsPerPage = 30;

  // Process URL parameters
  useEffect(() => {
    // Set the active tab based on URL parameter
    if (params.tab && (params.tab === "life" || params.tab === "entertainment")) {
      setActiveTab(params.tab);
    }
    
    // Set the category filter based on URL parameter
    if (params.category) {
      setFilter(params.category);
    }
  }, [params.tab, params.category]);

  // Load user artworks from localStorage on component mount
  useEffect(() => {
    const savedArtworks = localStorage.getItem('userArtworks');
    if (savedArtworks) {
      setUserArtworks(JSON.parse(savedArtworks));
    }
    
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem('userFavorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const handleTabChange = (tab: "life" | "entertainment") => {
    setActiveTab(tab);
    setFilter(null);
    setCurrentPage(1);
  };

  const handleFilterChange = (category: string | null) => {
    setFilter(category);
    setCurrentPage(1);
  };

  const handleSortChange = (value: SortOption) => {
    setSortBy(value);
    setCurrentPage(1);
  };

  const handleJumpToPage = () => {
    const pageNumber = parseInt(pageJumpInput);
    if (pageNumber && pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      setPageJumpInput("");
    }
  };

  // Handle favorites toggle
  const toggleFavorite = (item: CategoryItemType) => {
    const isFavorited = favorites.includes(item.id);
    let updatedFavorites: number[];
    
    if (isFavorited) {
      updatedFavorites = favorites.filter(id => id !== item.id);
    } else {
      updatedFavorites = [...favorites, item.id];
    }
    
    setFavorites(updatedFavorites);
    localStorage.setItem('userFavorites', JSON.stringify(updatedFavorites));
    
    // Save favorite items as a separate collection for display in profile
    const allItems = [...categoriesData.life, ...categoriesData.entertainment];
    const favoriteItems = allItems.filter(item => updatedFavorites.includes(item.id));
    localStorage.setItem('userFavoriteItems', JSON.stringify(favoriteItems));
  };

  const filteredItems = () => {
    let items = [...categoriesData[activeTab]];
    
    // Add user artworks that match the current tab category
    const userItems = convertUserArtworksToItems(userArtworks);
    const matchingUserItems = userItems.filter(item => {
      // For life tab: art and books categories
      if (activeTab === 'life') {
        return item.category === 'art' || item.category === 'books';
      }
      // For entertainment tab: music and video categories
      if (activeTab === 'entertainment') {
        return item.category === 'music' || item.category === 'video';
      }
      return false;
    });
    
    items = [...matchingUserItems, ...items];
    
    if (filter) {
      items = items.filter((item) => item.category === filter);
    }
    return sortItems(items, sortBy);
  };

  const paginatedItems = () => {
    const items = filteredItems();
    const startIndex = (currentPage - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  };

  const hasUserArtworks = userArtworks.length > 0;
  const totalPages = Math.ceil(filteredItems().length / itemsPerPage);

  const value = {
    activeTab,
    filter,
    currentPage,
    sortBy,
    pageJumpInput,
    totalPages,
    favorites,
    paginatedItems: paginatedItems(),
    handleTabChange,
    handleFilterChange,
    handleSortChange,
    setCurrentPage,
    setPageJumpInput,
    handleJumpToPage,
    toggleFavorite
  };

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategoryContext = (): CategoryContextType => {
  const context = useContext(CategoryContext);
  if (context === undefined) {
    throw new Error("useCategoryContext must be used within a CategoryProvider");
  }
  return context;
};

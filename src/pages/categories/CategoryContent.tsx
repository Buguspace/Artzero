
import React from "react";
import { useCategoryContext } from "./CategoryContext";
import UploadedWorksBanner from "./UploadedWorksBanner";
import CategoryGrid from "./CategoryGrid";
import EnhancedPagination from "./EnhancedPagination";

const CategoryContent: React.FC = () => {
  const { 
    paginatedItems, 
    favorites, 
    toggleFavorite, 
    hasUserArtworks,
    currentPage,
    setCurrentPage,
    totalPages
  } = useCategoryContext();

  const filteredItemsLength = paginatedItems.length > 0 ? 
    (currentPage - 1) * 30 + paginatedItems.length : 0;
  
  return (
    <>
      {/* User's Uploaded Works Banner (if any) */}
      <UploadedWorksBanner hasUploads={hasUserArtworks} />

      {/* Category Items Grid */}
      <CategoryGrid 
        items={paginatedItems}
        favorites={favorites}
        onToggleFavorite={toggleFavorite}
      />
      
      {/* Enhanced Pagination */}
      <EnhancedPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
      
      {/* Items per page information */}
      {filteredItemsLength > 0 && (
        <div className="mt-4 text-center text-sm text-gray-500">
          显示 {Math.max(1, (currentPage - 1) * 30 + 1)} - {Math.min(currentPage * 30, filteredItemsLength)} 件，共 {filteredItemsLength} 件商品
        </div>
      )}
    </>
  );
};

export default CategoryContent;

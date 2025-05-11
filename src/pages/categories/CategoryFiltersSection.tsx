
import React from "react";
import { useCategoryContext } from "./CategoryContext";
import CategoryFilters from "./CategoryFilters";
import SortControls from "./SortControls";

const CategoryFiltersSection: React.FC = () => {
  const { 
    activeTab, 
    filter, 
    sortBy, 
    pageJumpInput, 
    totalPages,
    handleFilterChange,
    handleSortChange,
    setPageJumpInput,
    handleJumpToPage
  } = useCategoryContext();

  return (
    <div className="mb-8 space-y-4">
      {/* Category Filters */}
      <CategoryFilters
        activeTab={activeTab}
        currentFilter={filter}
        onFilterChange={handleFilterChange}
      />

      {/* Sort Controls */}
      <SortControls
        sortBy={sortBy}
        onSortChange={handleSortChange}
        pageJumpInput={pageJumpInput}
        setPageJumpInput={setPageJumpInput}
        onJumpToPage={handleJumpToPage}
        totalPages={totalPages}
      />
    </div>
  );
};

export default CategoryFiltersSection;

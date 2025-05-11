
import React from "react";
import Navbar from "../components/Navbar";
import MobileNavFooter from "../components/MobileNavFooter";
import { CategoryProvider } from "./categories/CategoryContext";
import CategoryHeader from "./categories/CategoryHeader";
import CategoryTabs from "./categories/CategoryTabs";
import CategoryFiltersSection from "./categories/CategoryFiltersSection";
import CategoryContent from "./categories/CategoryContent";

const Categories: React.FC = () => {
  return (
    <CategoryProvider>
      <div className="min-h-screen pb-14 md:pb-0">
        <Navbar />

        <div className="container mx-auto px-4 py-6">
          <div className="max-w-7xl mx-auto">
            {/* Category Header */}
            <CategoryHeader />
            
            {/* Category Tabs */}
            <CategoryTabs />

            {/* Filters and Sort Controls */}
            <CategoryFiltersSection />

            {/* Main Content Area */}
            <CategoryContent />
          </div>
        </div>
        
        {/* Add mobile navigation footer */}
        <MobileNavFooter />
      </div>
    </CategoryProvider>
  );
};

export default Categories;


import React from "react";
import { useCategoryContext } from "./CategoryContext";

const CategoryTabs: React.FC = () => {
  const { activeTab, handleTabChange } = useCategoryContext();

  return (
    <div className="mb-6 border-b">
      <div className="flex">
        <button
          onClick={() => handleTabChange("life")}
          className={`px-6 py-3 font-medium text-lg ${
            activeTab === "life"
              ? "text-artflow-blue border-b-2 border-artflow-blue"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          生活
        </button>
        <button
          onClick={() => handleTabChange("entertainment")}
          className={`px-6 py-3 font-medium text-lg ${
            activeTab === "entertainment"
              ? "text-artflow-blue border-b-2 border-artflow-blue"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          娱乐
        </button>
      </div>
    </div>
  );
};

export default CategoryTabs;

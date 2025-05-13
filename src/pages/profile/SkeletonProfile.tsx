import React from "react";

const SkeletonProfile: React.FC = () => (
  <div className="animate-pulse max-w-3xl mx-auto mt-24">
    <div className="flex items-center space-x-4 mb-8">
      <div className="w-20 h-20 bg-gray-200 rounded-full" />
      <div className="flex-1 space-y-4 py-1">
        <div className="h-6 bg-gray-200 rounded w-1/3" />
        <div className="h-4 bg-gray-200 rounded w-1/4" />
      </div>
    </div>
    <div className="h-10 bg-gray-200 rounded mb-6 w-1/2" />
    <div className="grid grid-cols-2 gap-4">
      <div className="h-40 bg-gray-200 rounded" />
      <div className="h-40 bg-gray-200 rounded" />
    </div>
  </div>
);

export default SkeletonProfile; 
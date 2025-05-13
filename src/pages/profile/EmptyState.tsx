import React from "react";

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({ title, description, action }) => (
  <div className="flex flex-col items-center justify-center py-16 text-center text-gray-500">
    <div className="text-4xl mb-4">🖼️</div>
    <h2 className="text-xl font-semibold mb-2">{title}</h2>
    {description && <p className="mb-4">{description}</p>}
    {action}
  </div>
);

export default EmptyState;

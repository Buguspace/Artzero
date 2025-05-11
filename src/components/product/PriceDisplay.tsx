
import React from "react";

interface PriceDisplayProps {
  price: number;
  originalPrice: number;
  isRental?: boolean;
}

const PriceDisplay: React.FC<PriceDisplayProps> = ({ price, originalPrice, isRental = false }) => {
  return (
    <div className="flex items-baseline">
      <span className="text-xl font-bold text-artflow-blue">
        ¥{price}{isRental ? '/月' : ''}
      </span>
      {originalPrice > price && (
        <span className="ml-2 text-sm line-through text-gray-400">
          ¥{originalPrice}{isRental ? '/月' : ''}
        </span>
      )}
    </div>
  );
};

export default PriceDisplay;

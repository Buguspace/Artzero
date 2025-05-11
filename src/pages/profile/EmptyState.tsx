
import React from "react";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  buttonText: string;
  buttonAction: () => void;
  buttonVariant?: "default" | "outline";
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  buttonText,
  buttonAction,
  buttonVariant = "default",
}) => {
  return (
    <ScrollArea className="max-h-[70vh]">
      <div className="text-center py-10">
        <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <Icon size={32} className="text-gray-400" />
        </div>
        <h3 className="text-lg font-medium mb-2">{title}</h3>
        <p className="text-gray-500 mb-6">{description}</p>
        <Button onClick={buttonAction} variant={buttonVariant} className="flex items-center mx-auto">
          <span>{buttonText}</span>
        </Button>
      </div>
    </ScrollArea>
  );
};

export default EmptyState;

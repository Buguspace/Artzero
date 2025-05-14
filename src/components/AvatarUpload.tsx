import React, { useState, useRef, ChangeEvent } from "react";
import { Camera } from "lucide-react";

interface AvatarUploadProps {
  initialImage?: string;
  onImageChange?: (file: File | null) => void;
}

const AvatarUpload: React.FC<AvatarUploadProps> = ({
  initialImage = "",
  onImageChange,
}) => {
  const [preview, setPreview] = useState<string>(initialImage);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create preview
    const reader = new FileReader();
    reader.onload = () => {
      const previewUrl = reader.result as string;
      setPreview(previewUrl);
      // Save to localStorage
      localStorage.setItem('userAvatar', previewUrl);
    };
    reader.readAsDataURL(file);

    // Notify parent
    if (onImageChange) {
      onImageChange(file);
    }
  };

  return (
    <div className="relative w-32 h-32 mx-auto">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
      />

      <div
        onClick={handleClick}
        className={`w-full h-full rounded-full border-2 overflow-hidden cursor-pointer 
          ${preview ? "border-artflow-blue" : "border-dashed border-gray-300 bg-gray-50"}`}
      >
        {preview ? (
          <img
            src={preview}
            alt="Avatar preview"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
            <Camera size={24} />
            <span className="mt-1 text-xs">上传头像</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AvatarUpload;

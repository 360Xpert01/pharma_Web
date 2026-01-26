"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Upload, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button/button";

interface ProfileImageUploadProps {
  imagePreview: string | null;
  onImageChange: (file: File | null) => void;
  maxSizeMB?: number;
  className?: string;
  loading?: boolean;
}

export default function ProfileImageUpload({
  imagePreview,
  onImageChange,
  maxSizeMB = 5,
  className = "",
  loading = false,
}: ProfileImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    if (!loading) fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Size check
      if (file.size > maxSizeMB * 1024 * 1024) {
        alert(`Image size should be less than ${maxSizeMB}MB`);
        return;
      }
      onImageChange(file);
    }
  };

  const removeImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    onImageChange(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className={`relative ${className}`}>
      <div
        onClick={handleImageClick}
        className={`relative w-full h-96 bg-(--gray-1) border-2 border-dashed border-(--gray-3) rounded-8 cursor-pointer overflow-hidden group hover:border-(--gray-4) transition-all ${
          loading ? "cursor-not-allowed opacity-70" : ""
        }`}
      >
        {loading ? (
          <div className="flex flex-col items-center justify-center h-full text-(--primary)">
            <Loader2 className="w-16 h-16 mb-4 animate-spin" />
            <p className="text-lg font-medium">Uploading to Cloudinary...</p>
          </div>
        ) : imagePreview ? (
          <>
            <Image src={imagePreview} alt="Profile" fill className="object-cover" />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            <Button
              size="icon-lg"
              variant="ghost"
              onClick={removeImage}
              className="absolute top-4 right-4 bg-(--background)/90 backdrop-blur-sm text-(--gray-7) opacity-0 group-hover:opacity-100 transition-all hover:bg-(--light) shadow-soft"
            >
              <X className="w-6 h-6" />
            </Button>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-(--gray-4) px-8">
            <Upload className="w-16 h-16 mb-4" />
            <p className="text-lg font-medium">Click to upload image</p>
            <p className="text-sm">PNG, JPG up to {maxSizeMB}MB</p>
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/jpg"
        onChange={handleImageChange}
        className="hidden"
      />
    </div>
  );
}

"use client";

import { useState, useRef } from "react";
import { Pen, User } from "lucide-react";
import { Profile } from "@/lib/simple-database";
import toast from "react-hot-toast";
import Image from "next/image";
import { typography } from "@/app/styles/typography";
import { LoadingSpinner } from "./ui";

interface ProfilePictureEditProps {
  user: Profile;
  onProfileUpdate: (updatedProfile: Profile) => void;
}

export default function ProfilePictureEdit({
  user,
  onProfileUpdate,
}: ProfilePictureEditProps) {
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be less than 5MB");
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // TODO: Upload to Supabase storage
    // For now, we'll just show the preview
    setUploading(true);

    try {
      // Simulate upload delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // TODO: Replace with actual Supabase storage upload
      const mockImageUrl = previewUrl || user.avatar_url;

      const updatedProfile = {
        ...user,
        avatar_url: mockImageUrl,
      };

      onProfileUpdate(updatedProfile);
      toast.success("Profile picture updated successfully!");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to update profile picture");
      setPreviewUrl(null);
    } finally {
      setUploading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const displayImageUrl = previewUrl || user.avatar_url;

  return (
    <div className="flex flex-col items-center space-y-3">
      {/* Profile Picture Container */}
      <div className="relative group">
        <div className="relative w-20 h-20 rounded-full overflow-hidden bg-gray-100 border-2 border-gray-200">
          {displayImageUrl ? (
            <Image
              src={displayImageUrl}
              alt="Profile picture"
              fill
              className="object-cover"
              sizes="80px"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <User className="w-8 h-8 text-gray-400" />
            </div>
          )}

          {/* Edit overlay */}
          <div
            className={`absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer ${
              uploading ? "opacity-100" : ""
            }`}
            onClick={!uploading ? triggerFileInput : undefined}
          >
            {uploading ? (
              <LoadingSpinner size="sm" color="white" />
            ) : (
              <Pen className="w-4 h-4 text-white" />
            )}
          </div>
        </div>
      </div>

      {/* Upload Button */}
      <button
        onClick={triggerFileInput}
        disabled={uploading}
        className="flex items-center gap-1 px-3 py-1 bg-black hover:bg-gray-800 disabled:bg-gray-400 text-white rounded text-xs transition-colors"
        style={typography.button}
      >
        <Pen className="w-3 h-3" />
        {uploading ? "Uploading..." : "Change"}
      </button>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
}

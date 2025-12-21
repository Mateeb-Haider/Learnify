import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from "@/redux/features/layout/layoutApi";
import { Save, ImageIcon } from "lucide-react";
import React, { FC, useEffect, useState, useRef, useCallback } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import toast from "react-hot-toast";
import Loader from "../../Loader/Loader";

interface HeroData {
  title: string;
  subTitle: string;
  image: {
    url: string;
  };
}

interface ApiResponse {
  layout: {
    banner: HeroData;
  };
}

const EditHero: FC = () => {
  // Refs
  const fileInputRef = useRef<HTMLInputElement>(null);

  // State
  const [image, setImage] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [subTitle, setSubTitle] = useState<string>("");
  const [isImageUploading, setIsImageUploading] = useState<boolean>(false);

  // API Hooks
  const {
    data,
    refetch,
    isLoading: isFetchingData,
    isError: isFetchError,
  } = useGetHeroDataQuery("Banner", {
    refetchOnMountOrArgChange: true,
  });

  const [
    editLayout,
    { isSuccess: isEditSuccess, isLoading: isSaving, error: editError },
  ] = useEditLayoutMutation();

  // Initialize form data from API
  useEffect(() => {
    if (data?.layout?.banner) {
      const bannerData: HeroData = data.layout.banner;
      setTitle(bannerData.title || "");
      setSubTitle(bannerData.subTitle || "");
      setImage(bannerData.image?.url || "");
    }
  }, [data]);

  // Handle successful update
  useEffect(() => {
    if (isEditSuccess) {
      toast.success("Hero section updated successfully!");
      refetch();
    }
  }, [isEditSuccess, refetch]);

  // Handle API errors
  useEffect(() => {
    if (editError && "data" in editError) {
      toast.error(
        (editError as any)?.data?.message || "Failed to update hero section"
      );
    }
  }, [editError]);

  // Handle image file selection
  const handleImageUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];

      if (!file) return;

      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error("Please select a valid image file");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size must be less than 5MB");
        return;
      }

      setIsImageUploading(true);

      const reader = new FileReader();

      reader.onloadstart = () => {
        setIsImageUploading(true);
      };

      reader.onload = (event) => {
        if (event.target?.result) {
          setImage(event.target.result as string);
          toast.success("Image preview updated");
        }
        setIsImageUploading(false);
      };

      reader.onerror = () => {
        toast.error("Failed to read image file");
        setIsImageUploading(false);
      };

      reader.readAsDataURL(file);
    },
    []
  );

  // Trigger file input click
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Handle save/update
  const handleSave = async () => {
    // Validation
    if (!title.trim()) {
      toast.error("Please enter a title");
      return;
    }

    if (!subTitle.trim()) {
      toast.error("Please enter a subtitle");
      return;
    }

    if (!image) {
      toast.error("Please upload an image");
      return;
    }

    try {
      await editLayout({
        type: "Banner",
        image,
        title: title.trim(),
        subTitle: subTitle.trim(),
      }).unwrap();
    } catch (error) {
      console.error("Failed to update hero section:", error);
    }
  };

  // Check if form has changes
  const hasChanges = () => {
    if (!data?.layout?.banner) return true;

    const original = data.layout.banner;
    return (
      title.trim() !== original.title ||
      subTitle.trim() !== original.subTitle ||
      image !== original.image?.url
    );
  };

  // Check if form is valid
  const isValid = () => {
    return title.trim() !== "" && subTitle.trim() !== "" && image !== "";
  };

  // Show loader while fetching data
  if (isFetchingData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen font-poppins dark:bg-gray-900 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header spacing */}
        <div className="h-16 sm:h-20" />

        {/* Main Card */}
        <div
          className="rounded-2xl shadow-2xl backdrop-blur-sm border overflow-hidden 
          dark:bg-slate-800/50 dark:border-slate-700/50 dark:shadow-slate-900/50
          bg-white/70 border-slate-200/50 shadow-slate-200/50"
        >
          {/* Card Header */}
          <div className="px-6 py-5 border-b dark:border-slate-700/50 border-slate-200/50">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold dark:text-white text-slate-900">
                  Hero Section Editor
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Customize your website hero banner
                </p>
              </div>
              <ImageIcon className="w-8 h-8 dark:text-blue-400 text-blue-600" />
            </div>
          </div>

          {/* Card Content */}
          <div className="p-6 lg:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Left Column - Image Upload */}
              <div className="flex flex-col items-center justify-center">
                <div className="relative w-full max-w-md">
                  {/* Image Preview Container */}
                  <div
                    className={`relative aspect-video rounded-xl overflow-hidden border-2 transition-all duration-300
                    dark:border-slate-600 dark:bg-slate-700/30
                    border-slate-300 bg-slate-100
                    ${isImageUploading ? "animate-pulse" : ""}
                  `}
                  >
                    {image ? (
                      <img
                        src={image}
                        alt="Hero Banner Preview"
                        className="w-full h-full object-cover"
                        onLoad={() => setIsImageUploading(false)}
                        onError={() => {
                          toast.error("Failed to load image");
                          setImage("");
                          setIsImageUploading(false);
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-4">
                        <ImageIcon className="w-16 h-16 dark:text-slate-500 text-slate-400 mb-4" />
                        <p className="text-sm text-center dark:text-slate-400 text-slate-500">
                          No image uploaded
                        </p>
                      </div>
                    )}

                    {/* Upload Overlay */}
                    {isImageUploading && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                          <p className="text-white text-sm">Uploading...</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Camera Button */}
                  <div className="absolute -bottom-4 -right-4">
                    <input
                      ref={fileInputRef}
                      type="file"
                      id="banner-image"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={triggerFileInput}
                      disabled={isImageUploading || isSaving}
                      className="flex items-center justify-center w-14 h-14 rounded-full cursor-pointer shadow-lg transition-all duration-300 hover:scale-110 
                        dark:bg-blue-600 dark:hover:bg-blue-700
                        bg-blue-500 hover:bg-blue-600
                        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                        dark:focus:ring-offset-slate-800"
                      aria-label="Upload new image"
                    >
                      <AiOutlineCamera className="text-white text-2xl" />
                    </button>
                  </div>
                </div>

                {/* Image Instructions */}
                <div className="mt-8 text-center space-y-2">
                  <p className="text-sm dark:text-slate-400 text-slate-600">
                    Click the camera icon to upload a new image
                  </p>
                  <p className="text-xs dark:text-slate-500 text-slate-500">
                    Recommended: 16:9 aspect ratio, max 5MB
                  </p>
                </div>
              </div>

              {/* Right Column - Form */}
              <div className="flex flex-col space-y-6">
                {/* Title Input */}
                <div>
                  <label
                    htmlFor="hero-title"
                    className="block text-sm font-semibold mb-2 dark:text-slate-300 text-slate-700"
                  >
                    Hero Title
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <textarea
                    id="hero-title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    rows={3}
                    placeholder="Enter an engaging headline..."
                    className="w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 resize-none 
                      dark:bg-slate-700/50 dark:border-slate-600 dark:text-white dark:placeholder-slate-400
                      bg-white border-slate-300 text-slate-900 placeholder-slate-500
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                      disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isSaving}
                    maxLength={100}
                  />
                  <div className="flex justify-between mt-2">
                    <p className="text-xs dark:text-slate-400 text-slate-500">
                      Keep it concise and engaging
                    </p>
                    <p
                      className={`text-xs ${
                        title.length >= 90
                          ? "text-amber-500"
                          : "dark:text-slate-400 text-slate-500"
                      }`}
                    >
                      {title.length}/100
                    </p>
                  </div>
                </div>

                {/* Subtitle Input */}
                <div>
                  <label
                    htmlFor="hero-subtitle"
                    className="block text-sm font-semibold mb-2 dark:text-slate-300 text-slate-700"
                  >
                    Hero Subtitle
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <textarea
                    id="hero-subtitle"
                    value={subTitle}
                    onChange={(e) => setSubTitle(e.target.value)}
                    rows={3}
                    placeholder="Add supporting text or a call to action..."
                    className="w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 resize-none 
                      dark:bg-slate-700/50 dark:border-slate-600 dark:text-white dark:placeholder-slate-400
                      bg-white border-slate-300 text-slate-900 placeholder-slate-500
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                      disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isSaving}
                    maxLength={200}
                  />
                  <div className="flex justify-between mt-2">
                    <p className="text-xs dark:text-slate-400 text-slate-500">
                      Provide more details or a compelling message
                    </p>
                    <p
                      className={`text-xs ${
                        subTitle.length >= 180
                          ? "text-amber-500"
                          : "dark:text-slate-400 text-slate-500"
                      }`}
                    >
                      {subTitle.length}/200
                    </p>
                  </div>
                </div>

                {/* Status and Save Button */}
                <div className="pt-4">
                  {/* Status Message */}
                  {hasChanges() && !isSaving && (
                    <div className="mb-4 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                      <p className="text-sm text-blue-700 dark:text-blue-300 flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                        You have unsaved changes
                      </p>
                    </div>
                  )}

                  {/* Save Button */}
                  <button
                    onClick={handleSave}
                    disabled={!hasChanges() || !isValid() || isSaving}
                    className={`w-full px-8 py-3 rounded-lg font-semibold transition-all duration-300 
                      flex items-center justify-center gap-2 shadow-lg hover:shadow-xl
                      ${
                        !hasChanges() || !isValid() || isSaving
                          ? "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                          : "bg-gradient-to-r from-[#37a39a] to-[#2d8b7f] hover:from-[#2d8b7f] hover:to-[#1f6b5f] text-white cursor-pointer"
                      }`}
                  >
                    <Save className="w-5 h-5" />
                    {isSaving ? (
                      <>
                        <span className="h-2 w-2 rounded-full bg-white animate-pulse mr-2" />
                        Saving...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </button>

                  {/* Form Status */}
                  <div className="mt-4 text-sm dark:text-slate-400 text-slate-600">
                    {!isValid() && (
                      <p className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-red-500" />
                        Complete all required fields to save
                      </p>
                    )}
                    {hasChanges() && isValid() && !isSaving && (
                      <p className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-green-500" />
                        Ready to save
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditHero;

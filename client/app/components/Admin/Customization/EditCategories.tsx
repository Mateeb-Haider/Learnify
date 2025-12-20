import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from "@/redux/features/layout/layoutApi";
import React, { useEffect, useState } from "react";
import Loader from "../../Loader/Loader";
import { FolderOpen, Save } from "lucide-react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { AiOutlineDelete } from "react-icons/ai";
import toast from "react-hot-toast";

type Props = {};

interface Category {
  _id?: string;
  title: string;
  isNew?: boolean;
}

const EditCategories = (props: Props) => {
  const {
    data,
    refetch,
    isLoading: fetchingData,
  } = useGetHeroDataQuery("Categories", {
    refetchOnMountOrArgChange: true,
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [editLayout, { isSuccess, isLoading, error }] = useEditLayoutMutation();

  useEffect(() => {
    if (data && data.layout) {
      setCategories(data.layout.categories || []);
    }
  }, [data]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Category Updated Successfully!");
      refetch(); // Refetch to get updated data
    }
  }, [isSuccess, refetch]);

  useEffect(() => {
    if (error && "data" in error) {
      toast.error((error as any)?.data?.message || "An error occurred");
    }
  }, [error]);

  const handleCategoryChange = (
    id: string | undefined,
    value: string,
    index: number
  ) => {
    setCategories((prev) =>
      prev.map((item, i) =>
        (id && item._id === id) || (!id && i === index)
          ? { ...item, title: value }
          : item
      )
    );
  };

  const handleAddCategory = () => {
    // If there are no categories, allow adding the first one
    if (categories.length === 0) {
      const tempId = `temp-${Date.now()}-${Math.random()
        .toString(36)
        .substr(2, 9)}`;
      setCategories([{ _id: tempId, title: "", isNew: true }]);
      return;
    }

    const lastCategory = categories[categories.length - 1];
    if (!lastCategory || lastCategory.title.trim() === "") {
      toast.error("Please fill the current category before adding a new one");
      return;
    }

    // Generate a temporary ID for new categories
    const tempId = `temp-${Date.now()}-${Math.random()
      .toString(36)
      .substr(2, 9)}`;
    setCategories((prev) => [...prev, { _id: tempId, title: "", isNew: true }]);
  };

  const handleDeleteCategory = (category: Category, index: number) => {
    // Prevent deletion if it's the only category
    if (categories.length <= 1) {
      toast.error("At least one category is required");
      return;
    }

    setCategories((prev) =>
      prev.filter((item, i) => {
        if (category._id) {
          return item._id !== category._id;
        }
        // For items without ID, use index
        return i !== index;
      })
    );

    toast.success("Category removed");
  };

  const areCategoriesSame = (
    original: Category[],
    newCategories: Category[]
  ) => {
    // Filter out flags and temp ids for comparison
    const cleanOriginal = original.map(({ isNew, ...rest }) => rest);
    const cleanNew = newCategories.map(({ isNew, _id, ...rest }) => ({
      ...rest,
      // drop client-only temp ids so they don't force diff
      _id: _id && _id.startsWith("temp-") ? undefined : _id,
    }));
    return JSON.stringify(cleanOriginal) === JSON.stringify(cleanNew);
  };

  const hasEmptyCategories = (categories: Category[]) => {
    return categories.some((category) => category.title.trim() === "");
  };

  const handleEdit = async () => {
    if (!data || !data.layout) {
      toast.error("No data available");
      return;
    }

    // Check if there are changes and no empty categories
    const hasChanges = !areCategoriesSame(data.layout.categories, categories);
    const isEmpty = hasEmptyCategories(categories);

    if (!hasChanges) {
      toast.error("No changes detected");
      return;
    }

    if (isEmpty) {
      toast.error("Category titles cannot be empty");
      return;
    }

    try {
      // Remove client-only markers before sending to server
      const categoriesToSend = categories.map(({ isNew, _id, ...rest }) => ({
        ...rest,
        _id: _id && _id.startsWith("temp-") ? undefined : _id,
      }));

      await editLayout({
        type: "Categories",
        categories: categoriesToSend,
      }).unwrap();
    } catch (err) {
      console.error("Failed to update categories:", err);
    }
  };

  // Show loader while fetching initial data or saving
  if (fetchingData) {
    return <Loader />;
  }

  const hasChanges = data?.layout
    ? !areCategoriesSame(data.layout.categories, categories)
    : categories.length > 0;

  const isValid = !hasEmptyCategories(categories);

  return (
    <div
      className={`w-full transition-all duration-300 font-poppins 
       dark:bg-gray-900 bg-white
      `}
    >
      <br />
      <br />
      <br />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        {/* Card Container */}
        <div
          className={`rounded-2xl shadow-2xl backdrop-blur-sm transition-all duration-500 border overflow-hidden 
           dark:bg-slate-800/50 dark:border-slate-700/50 dark:shadow-slate-900/50
              bg-white/70 border-slate-200/50 shadow-slate-200/50
          `}
        >
          {/* Header */}
          <div
            className={`px-6 py-5 border-b 
              dark:border-slate-700/50
                border-slate-200/50
            `}
          >
            <div className="flex items-center justify-between">
              <div>
                <h2
                  className={`text-xl sm:text-2xl font-bold 
                   dark:text-white text-slate-900
                  }`}
                >
                  Edit Categories
                </h2>
                <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">
                  Add, edit, or remove categories
                </p>
              </div>
              <FolderOpen
                className={`w-8 h-8 
                  dark:text-blue-400 text-blue-600
                `}
              />
            </div>
          </div>

          {/* Content */}
          <div className="p-6 lg:p-8">
            {categories.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-slate-500 dark:text-slate-400">
                  No categories found. Add your first category below.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categories.map((category: Category, index: number) => (
                  <div
                    key={category._id || `category-${index}`}
                    className={`rounded-xl transition-all duration-300 border p-4 
                      dark:bg-slate-700/30 dark:border-slate-600
                        bg-slate-50 border-slate-200
                      ${
                        category.isNew
                          ? "ring-2 ring-blue-500/20 dark:ring-blue-400/20"
                          : ""
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <input
                          type="text"
                          value={category.title}
                          onChange={(e) =>
                            handleCategoryChange(
                              category._id,
                              e.target.value,
                              index
                            )
                          }
                          placeholder="Enter category title..."
                          className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 focus:outline-none focus:ring-2 
                            dark:bg-slate-800/50 dark:border-slate-600 dark:text-white dark:placeholder-slate-400 dark:focus:ring-blue-500 dark:focus:border-blue-500
                            bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:ring-blue-500 focus:border-blue-500
                          `}
                        />
                        {category.isNew && (
                          <p className="text-xs text-blue-500 dark:text-blue-400 mt-1 ml-1">
                            New category
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => handleDeleteCategory(category, index)}
                        className={`p-3 rounded-lg transition-all duration-200 
                          dark:bg-red-600/20 dark:hover:bg-red-600/30 dark:text-red-400
                          bg-red-50 hover:bg-red-100 text-red-600
                        `}
                        disabled={categories.length <= 1}
                        title={
                          categories.length <= 1
                            ? "At least one category is required"
                            : "Delete category"
                        }
                      >
                        <AiOutlineDelete className="text-xl" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Add New Category Button */}
            <button
              onClick={handleAddCategory}
              className={`w-full mt-6 py-4 rounded-xl border-2 border-dashed transition-all duration-300 flex items-center justify-center gap-2 
                dark:border-slate-600 dark:hover:border-blue-500 dark:hover:bg-slate-700/30 dark:text-slate-400 dark:hover:text-blue-400
                border-slate-300 hover:border-blue-500 hover:bg-blue-50 text-slate-600 hover:text-blue-600
              `}
            >
              <IoMdAddCircleOutline className="text-2xl" />
              <span className="font-medium">Add New Category</span>
            </button>

            {/* Info Message */}
            {hasChanges && (
              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  You have unsaved changes. Click Save Changes to update your
                  categories.
                </p>
              </div>
            )}

            {/* Save Button */}
            <div className="mt-8 flex justify-end">
              <button
                onClick={handleEdit}
                disabled={!hasChanges || !isValid || isLoading}
                className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl 
                  ${
                    !hasChanges || !isValid || isLoading
                      ? "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-[#37a39a] to-[#2d8b7f] hover:from-[#2d8b7f] hover:to-[#1f6b5f] text-white cursor-pointer"
                  }`}
              >
                <Save className="w-5 h-5 mr-2" />
                {isLoading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCategories;

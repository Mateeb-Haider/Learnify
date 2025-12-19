import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from "@/redux/features/layout/layoutApi";
import { HelpCircle, Save } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { HiMinus, HiPlus } from "react-icons/hi";
import { IoMdAddCircleOutline } from "react-icons/io";
import Loader from "../../Loader/Loader";

type Props = {};

interface FAQItem {
  _id?: string;
  question: string;
  answer: string;
  active?: boolean;
}

const EditFaq = (props: Props) => {
  // Fetch FAQ data
  const {
    data,
    refetch,
    isLoading: isFetchingData,
  } = useGetHeroDataQuery("FAQ", {
    refetchOnMountOrArgChange: true,
  });

  const [faqItems, setFaqItems] = useState<FAQItem[]>([]);
  const [editLayout, { isSuccess: isEditSuccess, isLoading: isSaving, error }] =
    useEditLayoutMutation();

  // Initialize FAQ items from API data
  useEffect(() => {
    if (data?.layout?.faq) {
      const faqWithActiveState = data.layout.faq.map((item: FAQItem) => ({
        ...item,
        active: item.active || false,
      }));
      setFaqItems(faqWithActiveState);
    }
  }, [data]);

  // Handle successful update
  useEffect(() => {
    if (isEditSuccess) {
      toast.success("FAQ updated successfully!");
      refetch();
    }
  }, [isEditSuccess, refetch]);

  // Handle API errors
  useEffect(() => {
    if (error && "data" in error) {
      toast.error((error as any)?.data?.message || "Failed to update FAQ");
    }
  }, [error]);

  // Toggle FAQ item expansion
  const toggleFaqItem = (id: string | undefined) => {
    setFaqItems((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, active: !item.active } : item
      )
    );
  };

  // Update question text
  const updateQuestion = (id: string | undefined, value: string) => {
    setFaqItems((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, question: value } : item
      )
    );
  };

  // Update answer text
  const updateAnswer = (id: string | undefined, value: string) => {
    setFaqItems((prev) =>
      prev.map((item) => (item._id === id ? { ...item, answer: value } : item))
    );
  };

  // Add new FAQ item
  const addNewFaqItem = () => {
    // Check if last item is empty
    const lastItem = faqItems[faqItems.length - 1];
    if (lastItem && (!lastItem.question.trim() || !lastItem.answer.trim())) {
      toast.error("Please complete the current FAQ before adding a new one");
      return;
    }

    const newFaqItem: FAQItem = {
      _id: `temp-${Date.now()}`,
      question: "",
      answer: "",
      active: true, // Auto-expand new items
    };

    setFaqItems([...faqItems, newFaqItem]);
  };

  // Remove FAQ item
  const removeFaqItem = (id: string | undefined) => {
    if (faqItems.length <= 1) {
      toast.error("At least one FAQ item is required");
      return;
    }

    setFaqItems((prev) => prev.filter((item) => item._id !== id));
    toast.success("FAQ item removed");
  };

  // Check if FAQ items are unchanged
  const areFaqItemsUnchanged = (original: FAQItem[], current: FAQItem[]) => {
    // Remove temporary IDs and active state for comparison
    const cleanOriginal = original.map(({ _id, active, ...rest }) => rest);
    const cleanCurrent = current.map(({ _id, active, ...rest }) => rest);
    return JSON.stringify(cleanOriginal) === JSON.stringify(cleanCurrent);
  };

  // Check if any FAQ item has empty fields
  const hasEmptyFaqItems = (items: FAQItem[]) => {
    return items.some((item) => !item.question.trim() || !item.answer.trim());
  };

  // Handle save/update
  const handleSave = async () => {
    if (!data?.layout?.faq) {
      toast.error("No FAQ data available");
      return;
    }

    const unchanged = areFaqItemsUnchanged(data.layout.faq, faqItems);
    const hasEmpty = hasEmptyFaqItems(faqItems);

    if (unchanged) {
      toast.error("No changes detected");
      return;
    }

    if (hasEmpty) {
      toast.error("All questions and answers must be filled");
      return;
    }

    try {
      // Remove temporary IDs and active state before sending
      const faqToSend = faqItems.map(({ _id, active, ...rest }) => rest);

      await editLayout({
        type: "FAQ",
        faq: faqToSend,
      }).unwrap();
    } catch (error) {
      console.error("Failed to update FAQ:", error);
    }
  };

  // Determine if save button should be enabled
  const canSave = data?.layout?.faq
    ? !areFaqItemsUnchanged(data.layout.faq, faqItems) &&
      !hasEmptyFaqItems(faqItems)
    : faqItems.length > 0 && !hasEmptyFaqItems(faqItems);

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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header Spacing */}
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
                  Frequently Asked Questions
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Manage your FAQ section
                </p>
              </div>
              <HelpCircle className="w-8 h-8 dark:text-blue-400 text-blue-600" />
            </div>
          </div>

          {/* Card Content */}
          <div className="p-6 lg:p-8">
            {/* FAQ Items List */}
            <div className="space-y-6">
              {faqItems.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-slate-500 dark:text-slate-400">
                    No FAQ items yet. Add your first question below.
                  </p>
                </div>
              ) : (
                faqItems.map((item, index) => (
                  <div
                    key={item._id || `faq-${index}`}
                    className={`rounded-xl border transition-all duration-300
                      dark:bg-slate-700/30 dark:border-slate-600
                      bg-slate-50 border-slate-200
                      ${
                        !item._id?.includes("temp-")
                          ? ""
                          : "ring-1 ring-blue-500/20"
                      }
                    `}
                  >
                    <div className="p-4 sm:p-5">
                      {/* Question Header */}
                      <div className="flex items-start justify-between gap-4">
                        <input
                          type="text"
                          value={item.question}
                          onChange={(e) =>
                            updateQuestion(item._id, e.target.value)
                          }
                          placeholder="Enter your question..."
                          className="flex-1 border-none bg-transparent outline-none font-medium text-base 
                            dark:text-white dark:placeholder-slate-400
                            text-slate-900 placeholder-slate-500
                            focus:ring-0"
                        />
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleFaqItem(item._id)}
                            className="flex-shrink-0 p-2 rounded-lg transition-all duration-200 
                              dark:hover:bg-slate-600/50 hover:bg-slate-200"
                            aria-label={item.active ? "Collapse" : "Expand"}
                          >
                            {item.active ? (
                              <HiMinus className="h-5 w-5 dark:text-slate-300 text-slate-600" />
                            ) : (
                              <HiPlus className="h-5 w-5 dark:text-slate-300 text-slate-600" />
                            )}
                          </button>
                          <button
                            onClick={() => removeFaqItem(item._id)}
                            className="flex-shrink-0 p-2 rounded-lg transition-all duration-200 
                              dark:bg-red-600/20 dark:hover:bg-red-600/30 dark:text-red-400
                              bg-red-50 hover:bg-red-100 text-red-600"
                            aria-label="Delete FAQ item"
                            disabled={faqItems.length <= 1}
                            title={
                              faqItems.length <= 1
                                ? "At least one FAQ item is required"
                                : "Delete"
                            }
                          >
                            <AiOutlineDelete className="text-lg" />
                          </button>
                        </div>
                      </div>

                      {/* Answer Section (Collapsible) */}
                      {item.active && (
                        <div className="mt-5 space-y-4">
                          <div className="relative">
                            <label className="block text-sm font-medium mb-2 dark:text-slate-300 text-slate-700">
                              Answer
                            </label>
                            <textarea
                              value={item.answer}
                              onChange={(e) =>
                                updateAnswer(item._id, e.target.value)
                              }
                              placeholder="Enter the answer..."
                              rows={4}
                              className="w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 resize-none 
                                dark:bg-slate-800/50 dark:border-slate-600 dark:text-white dark:placeholder-slate-400 
                                bg-white border-slate-300 text-slate-900 placeholder-slate-500
                                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            <div className="flex justify-end mt-2">
                              <span className="text-xs text-slate-500 dark:text-slate-400">
                                {item.answer.length}/1000 characters
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}

              {/* Add New FAQ Item Button */}
              <button
                onClick={addNewFaqItem}
                type="button"
                className="w-full py-4 rounded-xl border-2 border-dashed transition-all duration-300 
                  dark:border-slate-600 dark:hover:border-blue-500 dark:hover:bg-slate-700/30 dark:text-slate-400 dark:hover:text-blue-400
                  border-slate-300 hover:border-blue-500 hover:bg-blue-50 text-slate-600 hover:text-blue-600
                  flex items-center justify-center gap-2"
              >
                <IoMdAddCircleOutline className="text-2xl" />
                <span className="font-medium">Add New Question</span>
              </button>
            </div>

            {/* Save Button Section */}
            <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="text-sm text-slate-500 dark:text-slate-400">
                {canSave && !isSaving && (
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                    Changes detected
                  </span>
                )}
                {isSaving && (
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                    Saving changes...
                  </span>
                )}
              </div>
              <button
                onClick={handleSave}
                disabled={!canSave || isSaving}
                className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 
                  flex items-center justify-center gap-2 shadow-lg hover:shadow-xl
                  ${
                    !canSave || isSaving
                      ? "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-[#37a39a] to-[#2d8b7f] hover:from-[#2d8b7f] hover:to-[#1f6b5f] text-white cursor-pointer"
                  }`}
              >
                <Save className="w-5 h-5" />
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditFaq;

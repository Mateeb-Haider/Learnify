import React, { useState } from 'react';
import { useGetHeroDataQuery } from '@/redux/features/layout/layoutApi';
import { ChevronDown, HelpCircle } from 'lucide-react';
import Loader from '../Loader/Loader';

type Props = {};

const Faqs = (props: Props) => {
  const { data, isLoading } = useGetHeroDataQuery("FAQ", {});
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (isLoading) {
    return <Loader />;
  }

  const faqs = data?.layout?.faq || [];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 font-Poppins">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-6">
            <HelpCircle className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Find answers to common questions
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.length > 0 ? (
            faqs.map((faq: any, index: number) => (
              <div
                key={faq._id || index}
                className="group"
              >
                {/* FAQ Item */}
                <div className={`
                  bg-white dark:bg-gray-800 rounded-lg border transition-all duration-300
                  ${openIndex === index 
                    ? 'border-blue-500 dark:border-blue-400 shadow-lg' 
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }
                `}>
                  {/* Question Button */}
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`
                        w-10 h-10 rounded-lg flex items-center justify-center transition-colors
                        ${openIndex === index 
                          ? 'bg-blue-100 dark:bg-blue-900/50' 
                          : 'bg-gray-100 dark:bg-gray-700'
                        }
                      `}>
                        <span className={`
                          font-bold transition-colors
                          ${openIndex === index 
                            ? 'text-blue-600 dark:text-blue-400' 
                            : 'text-gray-600 dark:text-gray-400'
                          }
                        `}>
                          Q{index + 1}
                        </span>
                      </div>
                      <h3 className={`
                        font-semibold text-lg transition-colors
                        ${openIndex === index 
                          ? 'text-blue-600 dark:text-blue-400' 
                          : 'text-gray-900 dark:text-white'
                        }
                      `}>
                        {faq.question}
                      </h3>
                    </div>
                    
                    <ChevronDown className={`
                      w-5 h-5 transition-all duration-300
                      ${openIndex === index 
                        ? 'text-blue-600 dark:text-blue-400 rotate-180' 
                        : 'text-gray-400 dark:text-gray-500'
                      }
                    `} />
                  </button>

                  {/* Answer Section with smooth expansion */}
                  <div className={`
                    overflow-hidden transition-all duration-300 ease-in-out
                    ${openIndex === index 
                      ? 'max-h-96 opacity-100' 
                      : 'max-h-0 opacity-0'
                    }
                  `}>
                    <div className="px-6 pb-5">
                      <div className="pl-14">
                        {/* Decorative line */}
                        <div className="border-l-2 border-blue-200 dark:border-blue-800 pl-4">
                          {/* Answer content */}
                          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                            <div className="flex items-start gap-3">
                              <div className="flex-shrink-0 mt-1">
                                <div className="w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full"></div>
                              </div>
                              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                {faq.answer}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <HelpCircle className="w-8 h-8 text-gray-400 dark:text-gray-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                No FAQs Available
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Check back later for frequently asked questions
              </p>
            </div>
          )}
        </div>

        {/* Simple Contact Section */}
        {faqs.length > 0 && (
          <div className="mt-12 text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Still have questions?
            </p>
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-300">
              Read Doc
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Faqs;
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import { Search, Users, ArrowRight, Sparkles } from "lucide-react";

type Props = {};

const Hero: FC<Props> = (props) => {
  const { data, isLoading } = useGetHeroDataQuery("Banner", {});
  
  const studentAvatars = [
    "/assets/s1.jpg",
    "/assets/s2.jpg", 
    "/assets/s3.jpg"
  ];

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#37a39a]"></div>
      </div>
    );
  }

  return (
     <div className="w-full min-h-screen pt-[80px] pb-20 font-poppins transition-colors font-Poppins duration-300 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900" suppressHydrationWarning>
      <div className='w-[95%] md:w-[85%] mx-auto'>
        <div className="flex flex-col lg:flex-row items-center justify-between py-8 lg:py-12">
          {/* Left Content */}
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left mb-8 lg:mb-0 lg:pr-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 px-3 py-1.5 rounded-full mb-4">
              <Sparkles className="w-3 h-3 text-blue-600 dark:text-blue-400" />
              <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                500K+ Students Trusted
              </span>
            </div>

            {/* Main Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight mb-4">
              {data?.layout?.banner?.title || "Learn Without Limits"}
            </h1>

            {/* Subtitle */}
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-lg">
              {data?.layout?.banner?.subTitle || "Start your learning journey with expert-led courses."}
            </p>

            {/* Search Bar */}
            <div className="w-full max-w-md mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
                <input
                  type="search"
                  placeholder="Search courses..."
                  className="w-full pl-10 pr-28 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#37a39a] dark:focus:ring-[#2d8b7f] focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-sm"
                />
                <button className="absolute right-1.5 top-1/2 transform -translate-y-1/2 px-4 py-1.5 bg-gradient-to-r from-[#37a39a] to-[#2d8b7f] text-white font-medium rounded-md hover:from-[#2d8b7f] hover:to-[#1f6b5f] transition-all duration-300 text-sm">
                  Search
                </button>
              </div>
            </div>

            {/* Student Avatars */}
            <div className="flex items-center gap-3">
              <div className="flex -space-x-3">
                {studentAvatars.map((avatar, index) => (
                  <div 
                    key={index} 
                    className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 overflow-hidden"
                  >
                    <Image
                      src={require(`../../../public${avatar}`)}
                      alt={`Student ${index + 1}`}
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="text-left">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Join 500K+ learners
                </p>
                <Link
                  href="/courses"
                  className="inline-flex items-center gap-1 text-[#37a39a] dark:text-[#2d8b7f] text-sm font-medium hover:gap-2 transition-all duration-300"
                >
                  View courses
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end mt-8 lg:mt-0">
            <div className="relative w-[300px] h-[300px] sm:w-[250px] sm:h-[250px] lg:w-[400px] lg:h-[400px]">
              {/* Main Circular Image */}
              <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg">
                {data?.layout?.banner?.image?.url ? (
                  <Image
                    src={data.layout.banner.image.url}
                    alt="Learning Illustration"
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 flex items-center justify-center">
                    <Users className="w-16 h-16 text-blue-600 dark:text-blue-400 opacity-50" />
                  </div>
                )}
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-2 -right-2 bg-white dark:bg-gray-800 px-3 py-1 rounded-full shadow-md">
                <span className="text-xs font-medium text-gray-900 dark:text-white">✨ Certified</span>
              </div>

              <div className="absolute -bottom-2 -left-2 bg-white dark:bg-gray-800 px-3 py-1 rounded-full shadow-md">
                <span className="text-xs font-medium text-gray-900 dark:text-white">🎓 Expert</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
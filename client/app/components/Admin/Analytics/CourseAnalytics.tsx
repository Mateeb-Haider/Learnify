import { useGetCourseAnalyticsQuery } from "@/redux/features/analytics/analyticsApi";
import React from "react";

import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  Label,
  YAxis,
  LabelList,
} from "recharts";
import Loader from "../../Loader/Loader";
import { BarChart3 } from "lucide-react";

type Props = {};

const CourseAnalytics = (props: Props) => {
  const { data, isLoading, error } = useGetCourseAnalyticsQuery({});
  // const analyticsData = [
  //   { name: "June 2023", uv: 3 },
  //   { name: "July 2023", uv: 1 },
  //   { name: "August 2023", uv: 3 },
  //   { name: "Sept 2023", uv: 0 },
  //   { name: "Oct 2023", uv: 0 },
  //   { name: "Nov 2023", uv: 3 },
  //   { name: "Dec 2023", uv: 2 },
  // ];

  const analyticsData: any = [];

  data &&
    data.courses.last12Months.forEach((item: any) => {
      analyticsData.push({ name: item.month, uv: item.count });
    });

  const minValue = 0;
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full min-h-screen transition-all duration-300 font-poppins bg-gray-50 dark:bg-gray-900">
          <br />
          <br />
          <br />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
            <div className="rounded-2xl shadow-2xl backdrop-blur-sm transition-all duration-500 border overflow-hidden bg-white/70 border-slate-200/50 shadow-slate-200/50 dark:bg-slate-800/50 dark:border-slate-700/50 dark:shadow-slate-900/50">
              {/* Header */}
              <div className="px-6 py-5 border-b border-slate-200/50 dark:border-slate-700/50">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                      Courses Analytics
                    </h2>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                      Last 12 months analytics data
                    </p>
                  </div>
                  <BarChart3 className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
              </div>

              {/* Chart Container */}
              <div className="p-6 lg:p-8">
                <div className="rounded-xl p-6 transition-all duration-300 border bg-slate-50 border-slate-200 dark:bg-slate-700/30 dark:border-slate-600">
                  <ResponsiveContainer width="100%" height={500}>
                    <BarChart width={150} height={300} data={analyticsData}>
                      <XAxis dataKey="name">
                        <Label offset={0} position="insideBottom" />
                      </XAxis>
                      <YAxis domain={[minValue, "auto"]} />
                      <Bar
                        dataKey="uv"
                        className="fill-green-600 dark:fill-green-200"
                      >
                        <LabelList dataKey="uv" position="top" />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseAnalytics;

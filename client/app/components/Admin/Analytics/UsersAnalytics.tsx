import { useGetUserAnalyticsQuery } from "@/redux/features/analytics/analyticsApi";
import React, { FC } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Loader from "../../Loader/Loader";
import { BarChart3 } from "lucide-react";

type Props = {
  isDashboard?: boolean;
};

const UsersAnalytics: FC<Props> = ({ isDashboard }) => {
  const { data, isLoading, error } = useGetUserAnalyticsQuery({});

  // Use hardcoded data for now, replace with API data when ready
  //   const analyticsData = [
  //     { name: "June 2023", count: 440 },
  //     { name: "July 2023", count: 8200 },
  //     { name: "August 2023", count: 4033 },
  //     { name: "Sept 2023", count: 232 },
  //     { name: "Oct 2023", count: 3210 },
  //     { name: "Nov 2023", count: 3123 },
  //     { name: "Dec 2023", count: 2123 },
  //   ];

  // Uncomment when you want to use API data

  const analyticsData: any = [];
  data &&
    data.users.last12Months.forEach((item: any) => {
      analyticsData.push({ name: item.month, count: item.count });
    });

  // Handle error state
  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center p-8">
        <p className="text-red-500">Error loading analytics data</p>
      </div>
    );
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div
          className={`${
            !isDashboard ? "w-full min-h-screen" : "w-full h-full"
          } transition-all duration-300 font-poppins bg-gray-50 dark:bg-gray-900`}
        >
          {!isDashboard && (
            <>
              <br />
              <br />
              <br />
            </>
          )}

          <div
            className={`${
              !isDashboard
                ? "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8"
                : "w-full h-full p-4"
            }`}
          >
            <div
              className={`rounded-2xl shadow-2xl backdrop-blur-sm transition-all duration-500 border overflow-hidden bg-white/70 border-slate-200/50 shadow-slate-200/50 dark:bg-slate-800/50 dark:border-slate-700/50 dark:shadow-slate-900/50 ${
                isDashboard ? "h-full" : ""
              }`}
            >
              {/* Header */}
              <div className="px-6 py-5 border-b border-slate-200/50 dark:border-slate-700/50">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                      Users Analytics
                    </h2>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                      Last 12 months analytics data
                    </p>
                  </div>
                  <BarChart3 className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
              </div>

              {/* Chart Container */}
              <div className="p-6 lg:p-8 h-full">
                <div className="rounded-xl p-6 transition-all duration-300 border bg-slate-50 border-slate-200 dark:bg-slate-700/30 dark:border-slate-600 h-full">
                  <ResponsiveContainer
                    width="100%"
                    height={isDashboard ? "90%" : 500}
                  >
                    <AreaChart
                      data={analyticsData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <XAxis
                        dataKey="name"
                        tick={{ fill: "#6b7280" }}
                        className="dark:text-slate-400"
                      />
                      <YAxis
                        tick={{ fill: "#6b7280" }}
                        className="dark:text-slate-400"
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(255, 255, 255, 0.9)",
                          border: "1px solid #e5e7eb",
                          borderRadius: "0.5rem",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="count"
                        stroke="#10b981"
                        fill="#10b981"
                        strokeWidth={2}
                        fillOpacity={0.3}
                      />
                    </AreaChart>
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

export default UsersAnalytics;

import { useGetOrderAnalyticsQuery } from "@/redux/features/analytics/analyticsApi";
import React from "react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import Loader from "../../Loader/Loader";
import { BarChart3 } from "lucide-react";

type Props = {
  isDashboard?: boolean;
};

const OrdersAnalytics = ({ isDashboard = false }: Props) => {
  const { data, isLoading, error } = useGetOrderAnalyticsQuery({});

  // Hardcoded data as fallback
  // const analyticsData = [
  //   { name: "June 2023", orders: 3 },
  //   { name: "July 2023", orders: 1 },
  //   { name: "August 2023", orders: 3 },
  //   { name: "Sept 2023", orders: 0 },
  //   { name: "Oct 2023", orders: 0 },
  //   { name: "Nov 2023", orders: 3 },
  //   { name: "Dec 2023", orders: 2 },
  // ];

  const analyticsData: any = [];

  data &&
    data.orders.last12Months.forEach((item: any) => {
      analyticsData.push({ name: item.month, orders: item.count });
    });

  // Handle empty data
  if (!isLoading && analyticsData.length === 0) {
    return (
      <div
        className={`${
          isDashboard ? "w-full h-full" : "w-full min-h-screen"
        } transition-all duration-300 font-poppins bg-gray-50 dark:bg-gray-900 flex items-center justify-center`}
      >
        <div className="text-center p-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            No Order Data Available
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            No order analytics data found for the last 12 months
          </p>
        </div>
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
            isDashboard ? "w-full h-full" : "w-full min-h-screen"
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
              isDashboard
                ? "w-full h-full p-0"
                : "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8"
            }`}
          >
            <div
              className={`rounded-2xl shadow-2xl backdrop-blur-sm transition-all duration-500 border overflow-hidden bg-white/70 border-slate-200/50 shadow-slate-200/50 dark:bg-slate-800/50 dark:border-slate-700/50 dark:shadow-slate-900/50 ${
                isDashboard ? "h-full" : ""
              }`}
            >
              {/* Header */}
              <div
                className={`px-6 py-5 border-b border-slate-200/50 dark:border-slate-700/50 ${
                  isDashboard ? "py-3 px-4" : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2
                      className={`font-bold text-slate-900 dark:text-white ${
                        isDashboard ? "text-lg" : "text-xl sm:text-2xl"
                      }`}
                    >
                      Orders Analytics
                    </h2>
                    <p
                      className={`mt-1 ${
                        isDashboard ? "text-xs" : "text-sm"
                      } text-slate-600 dark:text-slate-400`}
                    >
                      Last 12 months analytics data
                    </p>
                  </div>
                  <BarChart3
                    className={`${
                      isDashboard ? "w-6 h-6" : "w-8 h-8"
                    } text-green-600 dark:text-green-400`}
                  />
                </div>
              </div>

              {/* Chart Container */}
              <div
                className={`${
                  isDashboard ? "p-3 h-[calc(100%-80px)]" : "p-6 lg:p-8"
                }`}
              >
                <div
                  className={`rounded-xl border bg-slate-50 border-slate-200 dark:bg-slate-700/30 dark:border-slate-600 ${
                    isDashboard
                      ? "p-3 h-full"
                      : "p-6 transition-all duration-300"
                  }`}
                >
                  <ResponsiveContainer
                    width="100%"
                    height={isDashboard ? "70%" : 400}
                  >
                    <LineChart
                      data={analyticsData}
                      margin={{
                        top: isDashboard ? 10 : 20,
                        right: isDashboard ? 10 : 30,
                        left: isDashboard ? 0 : 20,
                        bottom: isDashboard ? 0 : 10,
                      }}
                    >
                      {!isDashboard && (
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="#e5e7eb"
                          className="dark:stroke-slate-600"
                        />
                      )}
                      <XAxis
                        dataKey="name"
                        tick={{ fill: "#6b7280" }}
                        className="dark:text-slate-400"
                        fontSize={isDashboard ? 11 : 12}
                        tickMargin={isDashboard ? 5 : 10}
                      />
                      <YAxis
                        tick={{ fill: "#6b7280" }}
                        className="dark:text-slate-400"
                        fontSize={isDashboard ? 11 : 12}
                        width={isDashboard ? 30 : 40}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(255, 255, 255, 0.95)",
                          border: "1px solid #e5e7eb",
                          borderRadius: "0.5rem",
                          color: "#1f2937",
                          fontSize: isDashboard ? "12px" : "14px",
                        }}
                        className="dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                      />
                      {!isDashboard && (
                        <Legend verticalAlign="top" height={36} />
                      )}
                      <Line
                        type="monotone"
                        dataKey="orders"
                        name="Orders"
                        stroke="#10b981"
                        strokeWidth={isDashboard ? 2 : 3}
                        activeDot={{ r: isDashboard ? 4 : 8 }}
                        dot={{ r: isDashboard ? 2 : 4, fill: "#10b981" }}
                        fill="url(#colorOrders)"
                      />
                      {!isDashboard && (
                        <defs>
                          <linearGradient
                            id="colorOrders"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="#10b981"
                              stopOpacity={0.8}
                            />
                            <stop
                              offset="95%"
                              stopColor="#10b981"
                              stopOpacity={0}
                            />
                          </linearGradient>
                        </defs>
                      )}
                    </LineChart>
                  </ResponsiveContainer>

                  {/* Stats Summary - Only show in full view */}
                  {!isDashboard && (
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow">
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Total Orders (12 months)
                        </p>
                        <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                          {analyticsData.reduce(
                            (sum: number, item: any) =>
                              sum + (item.orders || 0),
                            0
                          )}
                        </p>
                      </div>
                      <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow">
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Average Monthly Orders
                        </p>
                        <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                          {Math.round(
                            analyticsData.reduce(
                              (sum: number, item: any) =>
                                sum + (item.orders || 0),
                              0
                            ) / analyticsData.length
                          )}
                        </p>
                      </div>
                      <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow">
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Peak Month
                        </p>
                        <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                          {analyticsData.length > 0
                            ? analyticsData.reduce(
                                (max: any, item: any) =>
                                  item.orders > max.orders ? item : max,
                                analyticsData[0]
                              ).name
                            : "N/A"}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Simple stats for dashboard view */}
                  {isDashboard && analyticsData.length > 0 && (
                    <div className="mt-3 flex justify-between items-center text-sm">
                      <div className="text-center">
                        <p className="text-slate-600 dark:text-slate-400">
                          Total
                        </p>
                        <p className="font-bold text-green-600 dark:text-green-400">
                          {analyticsData.reduce(
                            (sum: number, item: any) =>
                              sum + (item.orders || 0),
                            0
                          )}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-slate-600 dark:text-slate-400">
                          Avg/Month
                        </p>
                        <p className="font-bold text-green-600 dark:text-green-400">
                          {Math.round(
                            analyticsData.reduce(
                              (sum: number, item: any) =>
                                sum + (item.orders || 0),
                              0
                            ) / analyticsData.length
                          )}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-slate-600 dark:text-slate-400">
                          Peak
                        </p>
                        <p className="font-bold text-green-600 dark:text-green-400">
                          {Math.max(
                            ...analyticsData.map(
                              (item: any) => item.orders || 0
                            )
                          )}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrdersAnalytics;

import React from "react";
import { Users, ShoppingCart, Receipt } from "lucide-react";
import UsersAnalytics from "./Analytics/UsersAnalytics";
import OrdersAnalytics from "./Analytics/OrdersAnalytics";

import { useGetAllOrdersQuery } from "@/redux/features/orders/ordersApi";
import AllInvoices from "./Orders/AllInvoices";

type Props = {
  isDashboard?: boolean;
};

const Admin = ({ isDashboard = false }: Props) => {
  const { data, isLoading, error } = useGetAllOrdersQuery({});

  // Extract orders count from data
  const totalOrders = data?.orders?.length || 0;

  // Stats data - simplified with only orders count
  const statsData = [
    {
      title: "Total Orders",
      value: totalOrders.toString(),
      icon: <ShoppingCart className="w-6 h-6" />,
      color: "bg-purple-500",
      textColor: "text-purple-600 dark:text-purple-400",
    },
  ];

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center p-8">
        <div className="text-center">
          <h3 className="text-red-500 text-xl font-bold mb-2">
            Error Loading Data
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Unable to fetch orders data
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`font-poppins ${
        isDashboard
          ? "w-full h-full"
          : "min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-6"
      }`}
    >
      {/* Header - Only show in full view */}
      {!isDashboard && (
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Welcome back! Here's what's happening with your store today.
          </p>
        </div>
      )}

      {/* Stats Cards - Only show Total Orders */}
      {!isDashboard && (
        <div className="grid grid-cols-1 gap-6 mb-8">
          {statsData.map((stat, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {stat.title}
                  </p>
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-2">
                    {stat.value}
                  </h3>
                </div>
                <div
                  className={`${stat.color} p-3 rounded-lg text-white shadow-md`}
                >
                  {stat.icon}
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                  <span className="h-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-purple-500"
                      style={{
                        width: "100%",
                      }}
                    />
                  </span>
                  <span className="ml-2">All-time orders</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Charts Section */}
      <div
        className={`grid ${
          isDashboard ? "grid-cols-1 gap-6" : "grid-cols-1 lg:grid-cols-2 gap-8"
        }`}
      >
        {/* Users Analytics Widget */}
        <div
          className={`rounded-xl shadow-lg overflow-hidden ${
            isDashboard
              ? "bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50"
              : "bg-white dark:bg-slate-800"
          }`}
        >
          <div
            className={`border-b border-gray-100 dark:border-gray-700 ${
              isDashboard ? "px-4 py-3" : "px-6 py-4"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h2
                  className={`font-bold text-gray-900 dark:text-white ${
                    isDashboard ? "text-lg" : "text-xl"
                  }`}
                >
                  Users Analytics
                </h2>
                <p
                  className={`text-gray-500 dark:text-gray-400 ${
                    isDashboard ? "text-xs mt-0.5" : "text-sm mt-1"
                  }`}
                >
                  Last 12 months user growth
                </p>
              </div>
              <Users
                className={`${
                  isDashboard ? "w-5 h-5" : "w-6 h-6"
                } text-green-600 dark:text-green-400`}
              />
            </div>
          </div>
          <div className={isDashboard ? "p-3" : "p-4"}>
            <div style={{ height: isDashboard ? "200px" : "300px" }}>
              <UsersAnalytics isDashboard={true} />
            </div>
          </div>
        </div>

        {/* Orders Analytics Widget */}
        <div
          className={`rounded-xl shadow-lg overflow-hidden ${
            isDashboard
              ? "bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50"
              : "bg-white dark:bg-slate-800"
          }`}
        >
          <div
            className={`border-b border-gray-100 dark:border-gray-700 ${
              isDashboard ? "px-4 py-3" : "px-6 py-4"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h2
                  className={`font-bold text-gray-900 dark:text-white ${
                    isDashboard ? "text-lg" : "text-xl"
                  }`}
                >
                  Orders Analytics
                </h2>
                <p
                  className={`text-gray-500 dark:text-gray-400 ${
                    isDashboard ? "text-xs mt-0.5" : "text-sm mt-1"
                  }`}
                >
                  Last 12 months order trends
                </p>
              </div>
              <ShoppingCart
                className={`${
                  isDashboard ? "w-5 h-5" : "w-6 h-6"
                } text-purple-600 dark:text-purple-400`}
              />
            </div>
          </div>
          <div className={isDashboard ? "p-3" : "p-4"}>
            <div style={{ height: isDashboard ? "200px" : "300px" }}>
              <OrdersAnalytics isDashboard={true} />
            </div>
          </div>
        </div>
      </div>

      {/* Invoices Table Section - Only show in full view */}
      {!isDashboard && (
        <div className="mt-8">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-700">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                    All Invoices
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                    Complete transaction history
                  </p>
                </div>
                <Receipt className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <div className="p-4">
              <AllInvoices isDashboard={true} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;

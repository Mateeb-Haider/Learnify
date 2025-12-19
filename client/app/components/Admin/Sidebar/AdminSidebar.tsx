"use client";
import { FC, useEffect, useState, useMemo } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography } from "@mui/material";
import {
  HomeOutlinedIcon,
  ArrowForwardIosIcon,
  ArrowBackIosIcon,
  PeopleOutlinedIcon,
  ReceiptOutlinedIcon,
  BarChartOutlinedIcon,
  MapOutlinedIcon,
  GroupsIcon,
  OndemandVideoIcon,
  VideoCallIcon,
  WebIcon,
  QuizIcon,
  WysiwygIcon,
  ManageHistoryIcon,
  SettingsIcon,
  ExitToAppIcon,
} from "./Icons";
import avatarDefault from "../../../../public/assets/avatar.png";
import { useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";

// Types
interface SidebarItem {
  title: string;
  to: string;
  icon: JSX.Element;
  section?: string;
  category?: string;
}

interface User {
  name?: string;
  role?: string;
  avatar?: {
    url: string;
  };
}

interface ItemProps {
  title: string;
  to: string;
  icon: JSX.Element;
  selected: string;
  setSelected: (title: string) => void;
  isCollapsed: boolean;
}

// Sidebar Data
const sidebarItems: SidebarItem[] = [
  // Dashboard
  { title: "Dashboard", to: "/admin", icon: <HomeOutlinedIcon /> },

  // Data Section
  { title: "Users", to: "/admin/users", icon: <GroupsIcon />, section: "Data" },
  {
    title: "Invoices",
    to: "/admin/invoices",
    icon: <ReceiptOutlinedIcon />,
    section: "Data",
  },

  // Content Section
  {
    title: "Create Course",
    to: "/admin/create-course",
    icon: <VideoCallIcon />,
    section: "Content",
  },
  {
    title: "Live Courses",
    to: "/admin/courses",
    icon: <OndemandVideoIcon />,
    section: "Content",
  },

  // Customization Section
  {
    title: "Hero",
    to: "/admin/hero",
    icon: <WebIcon />,
    section: "Customization",
  },
  {
    title: "FAQ",
    to: "/admin/faq",
    icon: <QuizIcon />,
    section: "Customization",
  },
  {
    title: "Categories",
    to: "/admin/categories",
    icon: <WysiwygIcon />,
    section: "Customization",
  },

  // Controllers Section
  {
    title: "Manage Team",
    to: "/admin/team",
    icon: <PeopleOutlinedIcon />,
    section: "Controllers",
  },

  // Analytics Section
  {
    title: "Courses Analytics",
    to: "/admin/course-analytics",
    icon: <BarChartOutlinedIcon />,
    section: "Analytics",
  },
  {
    title: "Orders Analytics",
    to: "/admin/orders-analytics",
    icon: <MapOutlinedIcon />,
    section: "Analytics",
  },
  {
    title: "Users Analytics",
    to: "/admin/users-analytics",
    icon: <ManageHistoryIcon />,
    section: "Analytics",
  },
];

const Item: FC<ItemProps> = ({
  title,
  to,
  icon,
  selected,
  setSelected,
  isCollapsed,
}) => {
  const { theme } = useTheme();
  const isActive = selected === title;

  const iconColor = useMemo(() => {
    if (title === "Logout") return "text-red-500";
    return isActive
      ? "text-[#6870fa]"
      : theme === "dark"
      ? "text-white"
      : "text-black";
  }, [isActive, theme, title]);

  const textColor = useMemo(() => {
    if (title === "Logout") return "text-red-500 dark:text-red-400";
    return isActive
      ? "text-[#6870fa] dark:text-[#6870fa]"
      : theme === "dark"
      ? "text-white/80"
      : "text-gray-800";
  }, [isActive, theme, title]);

  return (
    <MenuItem
      active={isActive}
      onClick={() => setSelected(title)}
      icon={
        <div className={`${iconColor} ${isCollapsed ? "mx-auto" : ""}`}>
          {icon}
        </div>
      }
      className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
    >
      <Link
        href={to}
        className="block w-full"
        onClick={(e) => {
          if (title === "Logout") {
            e.preventDefault();
            // Handle logout
          }
        }}
      >
        {!isCollapsed && (
          <Typography
            className={`!text-[14px] !font-Poppins font-medium ${textColor} transition-colors duration-200`}
          >
            {title}
          </Typography>
        )}
      </Link>
    </MenuItem>
  );
};

const AdminSidebar: FC = () => {
  // State
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>("Dashboard");
  const [mounted, setMounted] = useState<boolean>(false);

  // Hooks
  const { theme } = useTheme();
  const { user } = useSelector((state: any) => state.auth) as { user: User };

  // Calculate widths (75% of original)
  const EXPANDED_WIDTH = 202.5; // 75% of 270px
  const COLLAPSED_WIDTH = 60; // 75% of 80px, rounded down for better appearance

  // Effects
  useEffect(() => {
    setMounted(true);

    // Set initial selected item based on current path
    const path = window.location.pathname;
    const currentItem = sidebarItems.find((item) => item.to === path);
    if (currentItem) {
      setSelected(currentItem.title);
    }
  }, []);

  // Memoized values
  const avatarUrl = useMemo(
    () => user?.avatar?.url || avatarDefault,
    [user?.avatar?.url]
  );

  const groupedItems = useMemo(() => {
    const groups: Record<string, SidebarItem[]> = {};
    sidebarItems.forEach((item) => {
      const section = item.section || "General";
      if (!groups[section]) {
        groups[section] = [];
      }
      groups[section].push(item);
    });
    return groups;
  }, []);

  // Handlers
  const handleLogout = async () => {
    try {
      console.log("Logging out...");
      // Add actual logout logic here
      // await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  // Render loading state
  if (!mounted) {
    return (
      <div
        className="bg-white dark:bg-[#111C43] h-screen fixed left-0 top-0 z-50"
        style={{ width: `${COLLAPSED_WIDTH}px` }}
      >
        <div className="animate-pulse p-4">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-6"></div>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="h-5 bg-gray-200 dark:bg-gray-700 rounded"
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <Box
      sx={{
        "& .pro-sidebar": {
          height: "100vh",
          position: "fixed",
          zIndex: 9999,
          overflow: "hidden",
          transition: "width 0.3s ease",
        },
        "& .pro-sidebar-inner": {
          background:
            theme === "dark" ? "#111C43 !important" : "#fff !important",
          height: "100%",
          overflowY: "auto",
          overflowX: "hidden",
          "&::-webkit-scrollbar": {
            width: "3px",
          },
          "&::-webkit-scrollbar-track": {
            background: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            background: theme === "dark" ? "#4a5568" : "#cbd5e0",
            borderRadius: "1.5px",
          },
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "6px 15px 6px 12px !important",
          transition: "all 0.2s ease",
          minHeight: "40px",
          "&:hover": {
            background:
              theme === "dark"
                ? "rgba(255, 255, 255, 0.05)"
                : "rgba(0, 0, 0, 0.03)",
          },
        },
        "& .pro-menu-item.active": {
          background:
            theme === "dark"
              ? "rgba(104, 112, 250, 0.1)"
              : "rgba(104, 112, 250, 0.05)",
          borderRight: "2px solid #6870fa",
        },
      }}
      className="h-screen"
    >
      <ProSidebar
        collapsed={isCollapsed}
        width={`${EXPANDED_WIDTH}px`}
        collapsedWidth={`${COLLAPSED_WIDTH}px`}
        breakPoint="lg"
        onToggle={toggleSidebar}
      >
        <Menu>
          {/* Header */}
          <MenuItem
            onClick={toggleSidebar}
            icon={isCollapsed ? <ArrowForwardIosIcon /> : undefined}
            style={{
              margin: "12px 0 20px 0",
              padding: isCollapsed ? "8px 15px" : "8px 15px 8px 18px",
              minHeight: "45px",
            }}
          >
            {!isCollapsed && (
              <Box className="flex items-center justify-between w-full">
                <Link href="/" className="no-underline">
                  <Typography
                    variant="h4"
                    className="!text-[20px] font-bold font-Poppins 
                      dark:text-white text-gray-900 
                      bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                  >
                    Learnify
                  </Typography>
                </Link>
              </Box>
            )}
          </MenuItem>

          {/* User Profile */}
          {!isCollapsed && (
            <Box className="px-4 pb-5">
              <Box className="flex flex-col items-center">
                <div className="relative mb-3">
                  <Image
                    src={avatarUrl}
                    alt={`${user?.name || "User"} profile`}
                    width={70}
                    height={70}
                    className="rounded-full border-2 border-[#5b6fe6] object-cover"
                    priority
                  />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border border-white dark:border-gray-800"></div>
                </div>
                <Typography
                  variant="h6"
                  className="!text-[16px] font-semibold text-center 
                    dark:text-white text-gray-900 mb-1 truncate w-full px-2"
                >
                  {user?.name || "Admin User"}
                </Typography>
                <Typography
                  variant="subtitle2"
                  className="!text-[12px] text-center 
                    dark:text-gray-400 text-gray-600 
                    bg-gray-100 dark:bg-gray-800 
                    px-2 py-1 rounded-full capitalize truncate w-full"
                >
                  {user?.role || "Administrator"}
                </Typography>
              </Box>
            </Box>
          )}

          {/* Navigation Items */}
          <Box className={isCollapsed ? "px-2" : "px-3"}>
            {Object.entries(groupedItems).map(([section, items]) => (
              <div key={section}>
                {/* Section Header */}
                {!isCollapsed && section !== "General" && (
                  <Typography
                    variant="caption"
                    className="!text-[11px] font-semibold uppercase 
                      tracking-wider dark:text-gray-400 text-gray-500 
                      block mt-3 mb-1 px-2"
                  >
                    {section}
                  </Typography>
                )}

                {/* Section Items */}
                {items.map((item) => (
                  <Item
                    key={item.title}
                    title={item.title}
                    to={item.to}
                    icon={item.icon}
                    selected={selected}
                    setSelected={setSelected}
                    isCollapsed={isCollapsed}
                  />
                ))}
              </div>
            ))}

            {/* Logout Item */}
            <div className="mt-6 pt-4 border-t dark:border-gray-800 border-gray-200">
              <MenuItem
                onClick={handleLogout}
                icon={
                  <div
                    className={`text-red-500 dark:text-red-400 ${
                      isCollapsed ? "mx-auto" : ""
                    }`}
                  >
                    <ExitToAppIcon />
                  </div>
                }
                className="hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors duration-200"
              >
                {!isCollapsed && (
                  <Typography
                    className="!text-[14px] !font-Poppins font-medium 
                      text-red-500 dark:text-red-400"
                  >
                    Logout
                  </Typography>
                )}
              </MenuItem>
            </div>
          </Box>

          {/* Collapse Hint */}
          {isCollapsed && (
            <Box className="absolute bottom-3 left-0 right-0 text-center">
              <Typography
                variant="caption"
                className="!text-[9px] dark:text-gray-500 text-gray-400"
              >
                Click to expand
              </Typography>
            </Box>
          )}
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default AdminSidebar;

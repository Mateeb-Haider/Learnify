"use client";
import DashboardHeader from "@/app/components/Admin/DashboardHeader";
import AdminSidebar from "@/app/components/Admin/Sidebar/AdminSidebar";
import Heading from "@/app/utils/Heading";
import React from "react";
import CourseAnalytics from "../../components/Admin/Analytics/CourseAnalytics";

type Props = {};

const page = ({ params }: any) => {
  const id = params?.id;
  return (
    <div>
      <Heading
        title="Learnify"
        description="Learnify is a platform for students to learn and get help from teachers"
        keywords="Mern, Machine Learning, Programming, Redux"
      />
      <div className="flex w-full">
        <div className="1500px:w-[16%] w-1/5">
          <AdminSidebar />
        </div>

        <div className="flex-1">
          <div className="w-full">
            <DashboardHeader />
            <CourseAnalytics />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;

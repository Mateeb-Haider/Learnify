"use client";
import React from "react";
import AdminSidebar from "../../components/Admin/Sidebar/AdminSidebar";
import Heading from "../../../app/utils/Heading";
import CreateCourse from "../../components/Admin/Course/CreateCourse";
import DashboardHeader from "../../components/Admin/DashboardHeader";

type Props = {};

const page = (props: Props) => {
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
            <CreateCourse />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;

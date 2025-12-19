"use client";
import React, { FC, useEffect, useState } from "react";
import CourseInformation from "./CourseInformation";
import CourseOptions from "./CourseOptions";
import CourseData from "./CourseData";
import CourseContent from "./CourseContent";
import CoursePreview from "./CoursePreview";
import {
  useEditCourseMutation,
  useGetAllCoursesQuery,
} from "@/redux/features/courses/coursesApi";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import Loader from "../../Loader/Loader";

type Props = {
  id: string;
};

const EditCourse: FC<Props> = ({ id }) => {
  const { data, refetch } = useGetAllCoursesQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const [editCourse, { isSuccess, isLoading, error }] = useEditCourseMutation();

  const editCourseData = data && data.courses.find((i: any) => i._id === id);

  useEffect(() => {
    if (isLoading) {
      <Loader />;
    }
    if (isSuccess) {
      toast.success("Course Updated Successfully");
      redirect("/admin/courses");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error, isLoading]);

  const [active, setActive] = useState(0);
  useEffect(() => {
    if (editCourseData) {
      setCourseInfo({
        name: editCourseData.name,
        description: editCourseData?.description,
        price: editCourseData?.price,
        estimatedPrice: editCourseData?.estimatedPrice,
        tags: editCourseData?.tags,
        level: editCourseData?.level,
        demoUrl: editCourseData?.demoUrl,
        thumbnail: editCourseData?.thumbnail?.url,
      });
      setBenefits(editCourseData.benefits);
      setPrerequisites(editCourseData.prerequisites);
      setCourseContentData(editCourseData.courseData);
    }
  }, [editCourseData]);
  const [courseInfo, setCourseInfo] = useState({
    name: "",
    description: "",
    price: "",
    estimatedPrice: "",
    tags: "",
    level: "",
    demoUrl: "",
    thumbnail: "",
  });
  const [benefits, setBenefits] = useState([{ title: "" }]);
  const [prerequisites, setPrerequisites] = useState([{ title: "" }]);
  const [courseContentData, setCourseContentData] = useState([
    {
      videoUrl: "",
      title: "",
      description: "",
      videoSection: "Untitled Section",
      links: [
        {
          title: "",
          url: "",
        },
      ],
      suggestion: "",
    },
  ]);
  const [courseData, setCourseData] = useState({});

  const handleSubmit = async () => {
    // Format beneifits data
    const formattedBenifits = benefits.map((benefit) => ({
      title: benefit.title,
    }));

    // Foemate prerequisites
    const formattedPrerequisites = prerequisites.map((prerequisite) => ({
      title: prerequisite.title,
    }));

    // formate course content data
    const formattedCourseConetentData = courseContentData.map(
      (courseContent) => ({
        videoUrl: courseContent.videoUrl,
        title: courseContent.title,
        description: courseContent.description,
        videoSection: courseContent.videoSection,
        links: courseContent.links.map((link) => ({
          title: link.title,
          url: link.url,
        })),
        suggestion: courseContent.suggestion,
      })
    );

    //  Prepare our data object
    const data = {
      name: courseInfo.name,
      description: courseInfo.description,
      price: Number(courseInfo.price),
      estimatedPrice: Number(courseInfo.estimatedPrice),
      tags: courseInfo.tags,
      thumbnail: courseInfo.thumbnail,
      level: courseInfo.level,
      demoUrl: courseInfo.demoUrl,
      benefits: formattedBenifits,
      prerequisites: formattedPrerequisites,
      courseData: formattedCourseConetentData,
    };
    setCourseData(data);
  };

  const handleCourseCreate = async (e: any) => {
    const data = courseData;
    await editCourse({ id, data });
  };

  return (
    <div className="w-full flex min-h-screen">
      <div className="w-[80%]">
        {active === 0 && (
          <CourseInformation
            courseInfo={courseInfo}
            setCourseInfo={setCourseInfo}
            active={active}
            setActive={setActive}
          />
        )}

        {active === 1 && (
          <CourseData
            benifits={benefits}
            setBenifits={setBenefits}
            active={active}
            setActive={setActive}
            prerequisites={prerequisites}
            setPrerequisites={setPrerequisites}
          />
        )}
        {active === 2 && (
          <CourseContent
            active={active}
            setActive={setActive}
            courseContentData={courseContentData}
            setCourseContentData={setCourseContentData}
            handleSubmit={handleSubmit}
          />
        )}
        {active === 3 && (
          <CoursePreview
            active={active}
            setActive={setActive}
            courseData={courseData}
            handleCourseCreate={handleCourseCreate}
            isEdit={true}
          />
        )}
      </div>
      <div className="w-[20%] mt-[100px] h-screen fixed z-[-1] top-18 right-0  ">
        <CourseOptions active={active} setActive={setActive} />
      </div>
    </div>
  );
};

export default EditCourse;

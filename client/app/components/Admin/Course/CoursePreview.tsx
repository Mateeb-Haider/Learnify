import React, { FC } from "react";
import CoursePlayer from "../../../utils/CoursePlayer";
import CourseData from "./CourseData";
import Ratings from "../../../utils/Ratings";
import { IoCheckmarkDoneOutline } from "react-icons/io5";

import { styles } from "../../../../app/styles/styles";
type Props = {
  active: number;
  setActive: (active: number) => void;
  courseData: any;
  handleCourseCreate: any;
  isEdit: boolean;
};

const CoursePreview: FC<Props> = ({
  active,
  setActive,
  courseData,
  handleCourseCreate,
  isEdit,
}) => {
  const discountPercentage =
    ((courseData?.estimatedPrice - courseData?.price) /
      courseData?.estimatedPrice) *
    100;
  const discountPercentagePrice = discountPercentage.toFixed(0);

  const prevButton = () => {
    setActive(active - 1);
  };
  const createCourse = () => {
    handleCourseCreate();
  };

  return (
    <div className="w-[90%] m-auto py-5 mb-5">
      <div className="w-full relative">
        <div className="w-full mt-10">
          <CoursePlayer
            videoUrl={courseData?.demoUrl}
            title={courseData?.title}
          />
        </div>
        <div className=" flex items-center ">
          <h1 className="pt-5 text-[25px] font-Poppins">
            {courseData?.price === 0 ? "Free" : courseData?.price + "$"}
          </h1>
          <h5 className="pl-3 text-[20px] mt-2 line-through opacity-80 font-Poppins">
            {courseData?.estimatedPrice}
          </h5>
          <h4 className="pl-5 pt-4 text-[22px] font-Poppins">
            {discountPercentagePrice}% off
          </h4>
        </div>

        <div className="flex items-center ">
          <div
            className={`${styles.button} !w-[180px] my-3 font-Poppins !bg-[green] cursor-not-allowed`}
          >
            Buy Now {courseData?.price} $
          </div>
        </div>
        <label className={styles.label}>Coupon Code: </label>

        <div className="flex">
          <input
            type="text"
            className={styles.input}
            placeholder="Enter Code Here"
          />
          <div className={`${styles.button} ml-3 mt-2 !h-[40px] !w-[180px]`}>
            {" "}
            Apply
          </div>
        </div>
        <br />
        <div>
          <p className="pb-1 text-black dark:text-white">
            * Source Code Included
          </p>
          <p className="pb-1 text-black dark:text-white">* Life Time Access</p>
          <p className="pb-1 text-black dark:text-white">
            * Certificate of Completion
          </p>
          <p className="pb-1 text-black dark:text-white">* Promium Support</p>
        </div>
        <div className="w-full">
          <div className="w-full 800px:pr-5">
            <h1 className="text-[25px] font-Poppins font-[600]">
              {courseData?.name}
            </h1>
            <div className=" flex items-center justify-between pt-3">
              <div className="flex items-center">
                <Ratings rating={0} />
                <h5> 0 Reviews</h5>
              </div>
              <h5> 0 Enrolled Students</h5>
            </div>
            <br />
            <h1 className="text-[25px] font-Poppins font-[600]">
              What you will learn from this course?
            </h1>
          </div>
          {courseData?.benefits?.map((item: any, index: number) => (
            <div className=" w-full flex 800px:items-center py-2" key={index}>
              <div className="w-[15px] mr-1  ">
                <IoCheckmarkDoneOutline size={20} />
              </div>
              <p className="pl-2">{item?.title}</p>
            </div>
          ))}
          <br />
          <br />

          {/* Course description */}
          <h1 className="text-[25px] font-Poppins font-[600] ">
            What are the prerequisites for starting this course?
          </h1>
          {courseData?.prerequisites?.map((item: any, index: number) => (
            <div className=" w-full flex 800px:items-center py-2" key={index}>
              <div className="w-[15px] mr-1  ">
                <IoCheckmarkDoneOutline size={20} />
              </div>
              <p className="pl-2">{item?.title}</p>
            </div>
          ))}
          <br />
          <br />

          <div className="w-full">
            <h1 className="text-[25px] font-Poppins font-[600] ">
              Course Details
            </h1>
            <p className="text-[18px] mt-[20px] whitespace-pre-line w-full overflow-hidden">
              {courseData?.description}
            </p>
          </div>
        </div>
        <div className="w-full flex items-center justify-between mt-5">
          <div
            className={`${styles.button} mr-16`}
            onClick={() => prevButton()}
          >
            Prev
          </div>
          <div className={`${styles.button}`} onClick={() => createCourse()}>
            {isEdit ? "Update" : "Create"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePreview;

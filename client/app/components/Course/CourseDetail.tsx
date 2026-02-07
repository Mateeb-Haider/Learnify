import { styles } from "@/app/styles/styles";
import CoursePlayer from "@/app/utils/CoursePlayer";
import Ratings from "@/app/utils/Ratings";
import { AnyARecord } from "dns";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import CourseContentList from "../Course/CourseContentList";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "../Payment/CheckOutForm";

import { IoClose } from "react-icons/io5";
import Link from "next/link";

type Props = {
  data: any;
  clientSecret: string;
  stripePromise: any;
};

const CourseDetail = ({ data, clientSecret, stripePromise }: Props) => {
  const { user } = useSelector((state: any) => state.auth);

  const [open, setOpen] = useState(false);
  const discountedPercentagePrice = (
    (data?.estimatedPrice - data?.price) /
    data?.estimatedPrice /
    100
  ).toFixed(2);

  const isPurchased =
    user && user?.courses?.find((item: any) => item._id === data._id);

  const handleOrder = (e: any) => {
    setOpen(true);
  };
  return (
    <div>
      <div className="w-[90%] 800px:w-[90%] m-auto py-5">
        <div className="w-full flex flex-col-reverse 800px:flex-row">
          <div className="w-full 800px:w-[65%] 800px:pr-5">
            <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
              {data?.name}
            </h1>
            <div className=" flex items-center justify-between pt-3">
              <div className="flex items-center">
                <Ratings rating={data.rating} />
                <h5 className="text-black dark:text-white">
                  {" "}
                  {data?.reviews?.length} Reviews
                </h5>
              </div>
              <h5 className="text-black dark:text-white">
                {data.purchased} Students
              </h5>
            </div>
            <br />
            <h1 className="text-[25px] mb-5 font-Poppins font-[600] text-black dark:text-white">
              {" "}
              What you will learn from this course
            </h1>
            <div>
              {data?.benefits?.map((item: any, index: any) => (
                <div
                  className=" w-full flex 800px:items-center py-2"
                  key={index}
                >
                  <svg
                    className="w-6 h-6 text-green-500 mr-2 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <h1 className="text-black dark:text-white">{item.title}</h1>
                </div>
              ))}
              <br />
              <br />
            </div>
            <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
              What are the prerequisites for this course ?
            </h1>
            {data?.prerequisites?.map((item: any, index: any) => (
              <div key={index} className=" w-full flex 800px:items-center py-2">
                <svg
                  className="w-6 h-6 text-green-500 mr-2 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <h1 className="text-black dark:text-white">{item.title}</h1>
              </div>
            ))}
            <br />
            <br />
            <div>
              <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
                Course Overview
              </h1>
              {/* Course Conten List */}
              <CourseContentList data={data?.courseData} isDemo={true} />
            </div>
            <br />
            <br />

            {/* Course Description */}
            <h1 className="text-[25px] mb-5 font-Poppins font-[600] text-black dark:text-white">
              Course Details
            </h1>
            <p className="text-[18px] mt-[20px] whitespace-pre-line  w-full overflow-hidden text-black dark:text-white">
              {data?.description}
            </p>

            <br />
            <br />
            <div className="w-full">
              <div className=" 800px:flex items-center">
                <Ratings rating={data?.ratings} />
                <div className="mb-2 800px:mb-[unset] ">
                  <h5 className="text-[25px] font-Poppins text-black dark:text-white">
                    {Number.isInteger(data?.ratings)
                      ? data?.ratings.toFixed(1)
                      : data?.ratings.toFixed(2)}{" "}
                    Course Rating • {data?.reviews?.length} Reviews
                  </h5>
                </div>
                <br />
                {data?.reviews &&
                  [...data?.reviews].reverse().map((item: any, index: any) => (
                    <div key={index} className="w-full pt-2 pb-2">
                      <div>
                        <div className="flex items-center">
                          <h1 className="text-[18px] pr-2 text-black dark:text-white">
                            {item.user.name.slice(0, 2)}
                          </h1>
                          <div>
                            <h1 className="text-black dark:text-white font-[600]">
                              {item.user?.name}
                            </h1>
                            <Ratings rating={item.rating} />
                          </div>
                        </div>
                        <p className="text-black dark:text-white mt-2">
                          {item.comment}
                        </p>
                        <small className="text-[#000000d1] dark:text-[#ffffff83]">
                          {
                            // formatDate(item.createdAt)
                          }
                        </small>
                      </div>
                      <div className="pl-2 flex 800px:hidden items-center">
                        <h5 className="text-[18px] pr-2 text-black dark:text-white">
                          {item.user.name}
                        </h5>
                        <Ratings rating={item.rating} />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="w-full 800px:w-[35%] relative">
            <div className=" sticky top-[100px] left-0 z-50 w-full">
              <CoursePlayer videoUrl={data?.demoUrl} title={data?.title} />
              <div className=" flex items-center">
                <h5 className=" pt-5 text-[25px]  text-black dark:text-white">
                  {data?.price === 0 ? "Free" : `${data?.price} $`}
                </h5>

                <h5 className=" pt-5 text-[25px] mt-2 line-through opacity-80 text-black dark:text-white">
                  {data?.estimatedPrice} $
                </h5>
                <h4 className="pl-5 pt-4 text-[22px] text-black dark:text-white ">
                  {discountedPercentagePrice}% off
                </h4>
              </div>

              <div className="flex items-center">
                {isPurchased ? (
                  <Link
                    href={`/course-access/${data?._id}`}
                    className={`${styles.button} !w-[180px] font-Poppins cursor-pointer `}
                  >
                    Enter to Course
                  </Link>
                ) : (
                  <button
                    onClick={handleOrder}
                    className={`${styles.button} !w-[180px] font-Poppins`}
                  >
                    Buy Now {data?.price} $
                  </button>
                )}
              </div>
              <br />
              <p className="pb-1 text-black dark:text-white">
                Source code included
              </p>
              <p className="pb-1 text-black dark:text-white">
                Life time access
              </p>
              <p className="pb-1 text-black dark:text-white">Premium support</p>
              <p className="pb-1 text-black dark:text-white">
                Certificate of Completion
              </p>
            </div>
          </div>
        </div>
      </div>

      <>
        {open && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-[90%] 800px:w-[50%] overflow-y-scroll">
              <div className="flex justify-between">
                <h2 className="text-2xl mb-4 text-black dark:text-white">
                  Order Placement
                </h2>
                <span
                  onClick={() => setOpen(false)}
                  className={`flex justify-end font-bold cursor-pointer`}
                >
                  <IoClose size={25} />
                </span>
              </div>

              <div className="w-full">
                {stripePromise && clientSecret && (
                  <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CheckOutForm setOpen={setOpen} data={data} />
                  </Elements>
                )}
              </div>
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default CourseDetail;

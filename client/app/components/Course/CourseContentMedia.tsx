import { styles } from "@/app/styles/styles";
import CoursePlayer from "@/app/utils/CoursePlayer";
import Ratings from "@/app/utils/Ratings";
import {
  useAddAnswerInQuestionMutation,
  useAddNewQuestionMutation,
  useAddReplyInReviewMutation,
  useAddReviewInCourseMutation,
  useGetCourseDetailsQuery,
} from "@/redux/features/courses/coursesApi";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  AiFillStar,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineStar,
} from "react-icons/ai";
import { BiMessage } from "react-icons/bi";
import { VscVerifiedFilled } from "react-icons/vsc";
import { format } from "timeago.js";

type Props = {
  data: any;
  id: string;
  activeVideo: number;
  setActiveVideo: (activeVideo: number) => void;
  user: any;
  refetch: any;
};

const CourseContentMedia = ({
  data,
  id,
  activeVideo,
  setActiveVideo,
  user,
  refetch,
}: Props) => {
  const [activeBar, setActiveBar] = useState(0);
  const [question, setQuestion] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [answer, setAnswer] = useState("");
  const [questionId, setQuestionId] = useState("");
  const [isReviewReply, setIsReviewReply] = useState(false);
  const [reply, setReply] = useState("");
  const [reviewId, setReviewId] = useState("");

  const { data: courseData, refetch: courseRefetch } = useGetCourseDetailsQuery(
    { id },
    { refetchOnMountOrArgChange: true },
  );

  const course = courseData?.course;
  const [
    addNewQuestion,
    { isSuccess, error, isLoading: questionCreationLoading },
  ] = useAddNewQuestionMutation();
  const [
    addAnswerInQuestion,
    { isSuccess: answerSuccess, error: answerError, isLoading: answerLoading },
  ] = useAddAnswerInQuestionMutation();

  const [
    addReviewInCourse,
    {
      isLoading: reviewCreationLoading,
      isSuccess: reviewSuccess,
      error: reviewError,
    },
  ] = useAddReviewInCourseMutation();

  const [
    addReplyInReview,
    { isSuccess: replySuccess, error: replyError, isLoading: replyLoading },
  ] = useAddReplyInReviewMutation();

  const isReviewExist = course?.reviews?.find(
    (item: any) => item.user._id === user._id,
  );
  const handleQuestion = () => {
    if (question.length === 0) {
      toast.error("Question can't be Empty");
    } else {
      addNewQuestion({
        question,
        courseId: id,
        contentId: data[activeVideo]._id,
      });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setQuestion("");
      refetch();
      toast.success("Question Added Successfuly");
    }
    if (answerSuccess) {
      setAnswer("");
      refetch();
      toast.success("Answer Added Successfuly");
    }
    if (reviewSuccess) {
      toast.success("Review added successfully");
      setReview("");
      courseRefetch();
    }
    if (replySuccess) {
      toast.success("Reply added successfully");
      setReply("");
      setIsReviewReply(false);
      setReviewId("");
      courseRefetch();
    }
    if (replyError) {
      if ("data" in replyError) {
        const errorMessage = replyError as any;
        toast.error(errorMessage?.data.message);
      }
    }
    if (reviewError) {
      if ("data" in reviewError) {
        const errorMessage = reviewError as any;
        toast.error(errorMessage?.data.message);
      }
    }
    if (answerError) {
      if ("data" in answerError) {
        const errorMessage = answerError as any;
        toast.error(errorMessage?.data.message);
      }
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage?.data.message);
      }
    }
  }, [
    isSuccess,
    answerSuccess,
    answerError,
    error,
    refetch,
    courseRefetch,
    reviewSuccess,
    reviewError,
    replySuccess,
    replyError,
  ]);

  const handleAnswerSubmit = () => {
    addAnswerInQuestion({
      answer,
      courseId: id,
      contentId: data[activeVideo]._id,
      questionId: questionId,
    });
  };

  const handleReviewSubmit = async () => {
    if (review.length === 0) {
      toast.error("Review can't be empty");
    } else {
      addReviewInCourse({ review, rating, courseId: id });
    }
  };
  const handleReviewReplySubmit = async () => {
    if (reply.length === 0) {
      toast.error("Reply can't be empty");
    } else {
      console.log("Helloworld");
      addReplyInReview({
        comment: reply,
        courseId: id,
        reviewId: reviewId,
      });
    }
  };

  return (
    <div className=" w-[95%] 800px:w-[86%] py-4 m-auto">
      <CoursePlayer
        title={data[activeVideo]?.title}
        videoUrl={data[activeVideo]?.videoUrl}
      />

      <div className="text-white w-full flex items-center justify-between my-3">
        <div
          className={`${styles.button} !w-[unset] !min-h-[40px] !py-[unset] ${activeVideo === 0 && "!cursor-no-drop opacity-[.8]"}`}
          onClick={() =>
            setActiveVideo(activeVideo === 0 ? 0 : activeVideo - 1)
          }
        >
          <AiOutlineArrowLeft className=" mr-2" />
          Prev Lesson
        </div>

        <div
          className={`${styles.button} !w-[unset] !min-h-[40px] !py-[unset] ${data.length - 1 === activeVideo && "!cursor-no-drop opacity-[.8]"}`}
          onClick={() =>
            setActiveVideo(
              data && data.length - 1 === activeVideo
                ? activeVideo
                : activeVideo + 1,
            )
          }
        >
          Next Lesson
          <AiOutlineArrowRight className=" mr-2" />
        </div>
      </div>

      <h1 className="text-black dark:text-white pt-2 text-[25px] font-[600]">
        {data[activeVideo].title}
      </h1>
      <br />
      <div className=" w-full p-4 flex items-center justify-between bg-slate-500 bg-opacity-20 backdrop-blur shadow-[bg-slate-700] rounded shadow-inner ">
        {["Overview", "Resources", "Q&A", "Reviews"].map((text, index) => (
          <h5
            key={index}
            className={` 800px:text-[20px] cursor-pointer ${activeBar === index ? "text-red-500" : " text-black dark:text-white "}
            `}
            onClick={() => setActiveBar(index)}
          >
            {text}
          </h5>
        ))}
      </div>
      <br />
      {activeBar === 0 && (
        <p className="dark:text-white text-black text-[18px] whitespace-pre-line mb-3 ">
          {data[activeVideo]?.description}
        </p>
      )}

      {activeBar === 1 && (
        <div className="">
          {data[activeVideo]?.links.map((item: any, index: number) => (
            <div className="mb-5" key={index}>
              <h2 className=" text-black dark:text-white 800px:text-[20px] 800px:inline-block">
                {item.title && item.title + " :"}
              </h2>
              <a
                className="inline-block text-[#4395c4] 800px:text-[20px] 800px:pl-2"
                href={item.url}
              >
                {item.url}
              </a>
            </div>
          ))}
        </div>
      )}

      {activeBar === 2 && (
        <>
          <div className="flex w-full">
            <Image
              src={
                user.avatar
                  ? user.avatar.url
                  : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqkI0Imu58AY227B29_DvKYq6Hk9Ig0t1x7e_2C5kjvQ&s&ec=121532756"
              }
              width={50}
              height={50}
              alt=""
              className="rounded-full w-[50px] h-[50px] object-cover"
            />
            <textarea
              name=""
              id=""
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              cols={40}
              rows={5}
              placeholder="Write your question..."
              className="outline-none bg-transparent ml-3  border border-[#000] dark:border-[#ffff57] 800px:w-full p-2 rounded w-[90%] 800px:text-[18px] text-black dark:text-white font-Poppins"
            ></textarea>
          </div>

          <div className=" w-full flex justify-end">
            <div
              className={`${styles.button} !w-[120px] !h-[40px] mt-5 ${questionCreationLoading && "cursor-not-allowed"}`}
              onClick={questionCreationLoading ? () => {} : handleQuestion}
            >
              {" "}
              Submit
            </div>
          </div>

          <br />
          <br />
          <div className=" w-full h-[1px] bg-[#ffffff3b] "> </div>
          <div>
            {" "}
            <CommentReply
              data={data}
              activeVideo={activeVideo}
              answer={answer}
              setAnswer={setAnswer}
              handleAnswerSubmit={handleAnswerSubmit}
              user={user}
              setQuestionId={setQuestionId}
            />
          </div>
          <div className="">{/* Reply */}</div>
        </>
      )}

      {activeBar === 3 && (
        <div className="w-full text-black dark:text-white">
          <>
            {!isReviewExist && (
              <>
                <div className="flex w-full">
                  <Image
                    src={
                      user.avatar
                        ? user.avatar.url
                        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqkI0Imu58AY227B29_DvKYq6Hk9Ig0t1x7e_2C5kjvQ&s&ec=121532756"
                    }
                    width={50}
                    height={50}
                    alt=""
                    className="rounded-full w-[50px] h-[50px] object-cover"
                  />
                  <div className="w-full">
                    <h5 className="pl-3 text-[20px] font-[500] dark:text-white text-black ">
                      Give a Rating <span className="text-red-500">*</span>
                    </h5>

                    <div className="flex w-full ml-2 pb-3">
                      {[1, 2, 3, 4, 5].map((i) =>
                        rating >= i ? (
                          <AiFillStar
                            key={i}
                            size={20}
                            color="#f6b100"
                            className="mr-2 cursor-pointer"
                            onClick={() => setRating(i)}
                          />
                        ) : (
                          <AiOutlineStar
                            key={i}
                            size={20}
                            color="#f6b100"
                            className="mr-2 cursor-pointer"
                            onClick={() => setRating(i)}
                          />
                        ),
                      )}
                    </div>
                    <textarea
                      name=""
                      id=""
                      value={review}
                      onChange={(e) => setReview(e.target.value)}
                      cols={40}
                      rows={5}
                      placeholder="Write your comment..."
                      className="outline-none bg-transparent ml-3  border border-[#000] dark:border-[#ffff57] 800px:w-full p-2 rounded w-[90%] 800px:text-[18px] font-Poppins"
                    ></textarea>
                  </div>
                </div>
                <div className=" w-full flex justify-end">
                  <div
                    className={`${styles.button} !w-[120px] !h-[40px] mt-5`}
                    onClick={
                      reviewCreationLoading ? () => {} : handleReviewSubmit
                    }
                  >
                    {" "}
                    Submit
                  </div>
                </div>
              </>
            )}
            <br />
            <div className=" w-full h-[1px] bg-[#ffffff3b]"></div>
            <div className="w-full">
              {course?.reviews &&
                [...course.reviews]
                  .reverse()
                  .map((item: any, index: number) => (
                    <div key={index} className="w-full my-5">
                      <div className="flex">
                        <Image
                          src={
                            item?.user?.avatar
                              ? item.user.avatar.url
                              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqkI0Imu58AY227B29_DvKYq6Hk9Ig0t1x7e_2C5kjvQ&s&ec=121532756"
                          }
                          width={50}
                          height={50}
                          alt=""
                          className="rounded-full w-[50px] h-[50px] object-cover"
                        />
                        <div className="ml-5 ">
                          {" "}
                          <h1 className="text-[20px] dark:text-white text-black ">
                            {item?.user.name}
                          </h1>
                          <Ratings rating={item.rating} />
                        </div>
                      </div>

                      <div className="ml-16 mt-1">
                        <h3 className=" text-black dark:text-white text-[17px]">
                          {item.comment}
                        </h3>

                        <small className=" text-black dark:text-[#ffffff83]">
                          {format(item.createdAt)}
                        </small>
                        <br />
                        {user.role === "admin" && (
                          <span
                            onClick={() => {
                              const clickedReviewId = item._id?.toString();
                              if (
                                isReviewReply &&
                                reviewId === clickedReviewId
                              ) {
                                setIsReviewReply(false);
                                setReviewId("");
                                setReply("");
                              } else {
                                setReviewId(clickedReviewId);
                                setIsReviewReply(true);
                              }
                            }}
                            className={`  dark:text-white text-black cursor-pointer`}
                          >
                            {" "}
                            {isReviewReply &&
                            reviewId === item._id?.toString()
                              ? "Hide Reply"
                              : "Add Reply"}{" "}
                          </span>
                        )}
                      </div>
                      {isReviewReply && reviewId === item._id?.toString() && (
                        <div className=" w-full flex  relative dark:text-white text-black">
                          <input
                            type="text"
                            placeholder="Enter Your Reply ..."
                            value={reply}
                            onChange={(e: any) => setReply(e.target.value)}
                            className=" block 800px:ml-12 mt-2 outline-none bg-transparent border-b dark:border-[#fff] border-black dark:text-white text-black p-[5px] w-[95%]"
                          />
                          <button
                            type="submit"
                            onClick={
                              replyLoading ? () => {} : handleReviewReplySubmit
                            }
                            className="  rignt-0 bottom-1"
                          >
                            {" "}
                            Submit
                          </button>
                        </div>
                      )}

                      {item.commentReplies.map((i: any, index: number) => (
                        <div
                          key={index}
                          className="w-full flex 800px:ml-16 my-5 text-black dark:text-white"
                        >
                          <div>
                            <Image
                              src={
                                i?.user?.avatar
                                  ? i.user.avatar.url
                                  : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqkI0Imu58AY227B29_DvKYq6Hk9Ig0t1x7e_2C5kjvQ&s&ec=121532756"
                              }
                              width={50}
                              height={50}
                              alt=""
                              className="rounded-full w-[50px] h-[50px] object-cover"
                            />
                          </div>
                          <div className="pl-3">
                            <div className="flex">
                              <h5 className="text-[20px] dark:text-white text-black ">
                                {i?.user.name}
                              </h5>
                            
                                <VscVerifiedFilled className="mt-2 text-[#50c750]  ml-2 text-[20px]" />
                           
                            </div>
                            <p className="dark:text-white text-black">
                              {i.comment}{" "}
                            </p>
                            <small className=" text-black dark:text-[#ffffff83]">
                              {format(i.createdAt)}
                            </small>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
            </div>
          </>
        </div>
      )}
    </div>
  );
};

const CommentReply = ({
  data,
  activeVideo,
  answer,
  setAnswer,
  handleAnswerSubmit,
  user,
  setQuestionId,
}: any) => {
  return (
    <>
      <div className=" w-full my-3 ">
        {data[activeVideo].questions.map((item: any, index: any) => (
          <CommentItem
            data={data}
            key={index}
            activeVideo={activeVideo}
            item={item}
            index={index}
            answer={answer}
            setAnswer={setAnswer}
            handleAnswerSubmit={handleAnswerSubmit}
            setQuestionId={setQuestionId}
          />
        ))}
      </div>
    </>
  );
};

const CommentItem = ({
  data,
  key,
  item,
  index,
  answer,
  setAnswer,
  handleAnswerSubmit,
  setQuestionId,
}: any) => {
  const [replyAcive, setReplyActive] = useState(false);
  console.log(item);
  return (
    <>
      <div className="my-4">
        <div className="flex mb-2">
          {/* <div className="w-[50px] h-[50px] ">
            <div className="w-[50px] h-[50px] bg-slate-600 rounded-[50px] flex items-center justify-center cursor-pointer">
              <h1 className=" uppercase text-[18px]">
                {item?.user.name.slice(0, 2)}
              </h1>
            </div>
          </div> */}
          <div>
            <Image
              src={
                item?.user?.avatar
                  ? item.user.avatar.url
                  : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqkI0Imu58AY227B29_DvKYq6Hk9Ig0t1x7e_2C5kjvQ&s&ec=121532756"
              }
              width={50}
              height={50}
              alt=""
              className="rounded-full w-[50px] h-[50px] object-cover"
            />
          </div>
          <div className="pl-3">
            <h5 className="text-[20px] dark:text-white text-black ">
              {item?.user.name}
            </h5>
            <p className="dark:text-white text-black">{item?.question}</p>
            <small className=" text-black dark:text-[#ffffff83]">
              {format(item.createdAt)}
            </small>
          </div>
        </div>
        <div className="w-full flex">
          <span
            className="800px:pl-16 dark:text-[#ffffff83] text-black  cursor-pointer mr-2"
            onClick={() => {
              (setReplyActive(!replyAcive), setQuestionId(item._id));
            }}
          >
            {!replyAcive
              ? item.questionReplies.length !== 0
                ? "All Replies"
                : "Add Reply"
              : "Hide Replies"}
          </span>
          <BiMessage
            size={20}
            className={`cursor-pointer dark:text-[#ffffff83] text-black`}
          />
          <span className="pl-1 mt-[-4px] cursor-pointer text-black dark:text-[#ffffff83]">
            {item.questionReplies.length}
          </span>
        </div>
        {replyAcive && (
          <>
            {item.questionReplies.map((item: any, index: any) => (
              <div
                key={index}
                className="w-full flex 800px:ml-16 my-5 text-black dark:text-white"
              >
                <div>
                  <Image
                    src={
                      item?.user?.avatar
                        ? item.user.avatar.url
                        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqkI0Imu58AY227B29_DvKYq6Hk9Ig0t1x7e_2C5kjvQ&s&ec=121532756"
                    }
                    width={50}
                    height={50}
                    alt=""
                    className="rounded-full w-[50px] h-[50px] object-cover"
                  />
                </div>
                <div className="pl-3">
                  <div className="flex">
                    <h5 className="text-[20px] dark:text-white text-black ">
                      {item?.user.name}
                    </h5>
                    {item.user.role === "admin" && (
                      <VscVerifiedFilled className="mt-2 text-[#50c750]  ml-2 text-[20px]" />
                    )}
                  </div>
                  <p className="dark:text-white text-black">{item.answer} </p>
                  <small className=" text-black dark:text-[#ffffff83]">
                    {format(item.createdAt)}
                  </small>
                </div>
              </div>
            ))}
            <>
              <div className=" w-full flex  relative dark:text-white text-black">
                <input
                  type="text"
                  placeholder="Enter Your Answer ..."
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className=" block 800px:ml-12 mt-2 outline-none bg-transparent border-b dark:border-[#fff] border-black dark:text-white text-black p-[5px] w-[95%]"
                />
                <button
                  type="submit"
                  className="  rignt-0 bottom-1"
                  onClick={handleAnswerSubmit}
                  disabled={answer === ""}
                >
                  {" "}
                  Submit
                </button>
              </div>
              <br />
            </>
          </>
        )}
      </div>
    </>
  );
};

export default CourseContentMedia;

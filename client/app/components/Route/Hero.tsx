import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import { BiSearch } from "react-icons/bi";

type Props = {};

const Hero: FC<Props> = (props) => {
  return (
    <div className="w-full 1000px:flex items-center">
      <div className="1000px:w-[60%] flex flex-col items-center 1000px:mt-[0px] text-center 1000px:text-left mt-[150px]">
        <h2 className="dark:text-white text-black text-[30px] px-3 w-full 1000px:text-[70px] font-Josefin font-[600] py-2 1000px:leading-[75px] 1500px:!w-[55%] 1100px:!w-[78%] ">
          Improve your online experience better Instantly
        </h2>

        <p className="dark:text-white text-black font-Josefin font-[600] text-[18px] 1500px:!w-[55%] 1100px:!w-[78%] px-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, similique
          optio? Id cum quasi inventore?
        </p>
        <br />
        <div className="1500px:w-[55%] 1100px:w-[78%] w-[90%] flex items-center ">
          <input
            type="search"
            placeholder="Search Course ...."
            className=" bg-transparent border dark:border-none dark:bg-[#575757] dark:placeholder:text-[#ffffdd] rounded-[5px] p-2 w-full h-full outline-none text-black dark:text-white"
          />
          <div className="  mr-12 bg-green-500 rounded-[4px] flex items-center justify-center w-[50px] cursor-pointer h-[40px] right-0 top-0">
            <BiSearch size={25} className="text-white" />
          </div>
        </div>
        <br />
        <div className="flex items-center w-[90%] 1100px:w-[78%] 1500px:w-[55%]">
          <Image
            src={require("../../../public/assets/s1.jpg")}
            alt=""
            className="rounded-full h-10 w-10"
          />
          <Image
            src={require("../../../public/assets/s2.jpg")}
            alt=""
            className="rounded-full ml-[-16px] h-10 w-10"
          />
          <Image
            src={require("../../../public/assets/s3.jpg")}
            alt=""
            className="rounded-full ml-[-16px] h-10 w-10"
          />
          <p className="font-Josefin dark:text-white text-black 1000px:pl-3 text-[18px] font-[600]">
            500K+ People already trusted us.{" "}
            <Link
              href="/courses"
              className="dark:text-[#26e256] text-[crimson]"
            >
              View Courses
            </Link>{" "}
          </p>
        </div>
      </div>
      <div className="1000px:w-[40%] flex 1000px:min-h-screen items-center justify-start pt-[70px] 1000px:pt-0 z-10">
        <Image
          src={require("../../../public/assets/heroImg.png")}
          alt=""
          className="object-contain 1100px:max-w-[90%] w-[90%] 1500px:max-w-[85%] h-[auto] z-[10]"
        />
      </div>
    </div>
  );
};

export default Hero;

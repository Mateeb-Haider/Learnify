"use client";
import React, { FC, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { styles } from "../../../app/styles/styles";
import {
  AiFillGithub,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";

type Props = {
  setRoute: (route: string) => void;
};
const schema = Yup.object().shape({
  name: Yup.string().required("Please Enter Your Name"),
  email: Yup.string()
    .email("Invalid Email")
    .required("Please Enter Your Email"),
  password: Yup.string().required("Please Enter Your Password!").min(6),
});

const SignUp: FC<Props> = ({ setRoute }) => {
  const [show, setShow] = useState(false);
  const [register, { data, error, isSuccess }] = useRegisterMutation();

  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || "Registration Success";
      toast.success(message);
      setRoute("Verification");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error]);

  const formik = useFormik({
    initialValues: { name: "", email: "", password: "" },
    validationSchema: schema,
    onSubmit: async ({ name, email, password }) => {
      const data = {
        name,
        email,
        password,
      };
      await register(data);
    },
  });

  const { errors, touched, values, handleChange, handleSubmit } = formik;
  return (
    <>
      <div className="w-full">
        <h1 className={`${styles.title}`}>Welcome to Learnify</h1>
        <h3 className="text-center text-[14px]  py-3 font-Poppins justify-center mb-5 text-black dark:text-white">
          Create New Account to Start Learning
        </h3>
        <form onSubmit={handleSubmit}>
          <div className=" mb-3">
            <label htmlFor="name" className={`${styles.label}`}>
              Enter Your Name
            </label>
            <input
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              id="name"
              placeholder="Enter Name Here"
              className={`${errors.name && touched.name && "border-red-500"} ${
                styles.input
              }`}
            />
            {errors.name && touched.name && (
              <span className="text-red-500 pt-2 block">{errors.name}</span>
            )}
          </div>
          <label htmlFor="email" className={`${styles.label}`}>
            Enter Your Email
          </label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            id="email"
            placeholder="learnify@gmail.com"
            className={`${errors.email && touched.email && "border-red-500"} ${
              styles.input
            }`}
          />
          {errors.email && touched.email && (
            <span className="text-red-500 pt-2 block">{errors.email}</span>
          )}
          <div className="w-full mt-5 relative mb-1">
            <label htmlFor="password" className={`${styles.label}`}>
              Enter Your Password
            </label>
            <input
              type={!show ? "password" : "text"}
              name="password"
              value={values.password}
              onChange={handleChange}
              id="password"
              placeholder="password"
              className={`${
                errors.password && touched.password && "border-red-500"
              } ${styles.input}`}
            />
            {!show ? (
              <AiOutlineEyeInvisible
                className="absolute bottom-3 right-2 z-1 cursor-pointer "
                size={20}
                onClick={() => setShow(true)}
              />
            ) : (
              <AiOutlineEye
                className="absolute bottom-3 right-2 z-1 cursor-pointer "
                size={20}
                onClick={() => setShow(false)}
              />
            )}
          </div>
          {errors.password && touched.password && (
            <span className="text-red-500 pt-2 block">{errors.password}</span>
          )}
          <div className=" w-full mt-5">
            <input
              type="submit"
              value="Sign Up"
              className={`${styles.button}`}
            />
          </div>
          <br />
          <div className="flex items-center gap-4 w-full">
            <div className="flex-1 h-[1px] bg-gray-300"></div>
            <span className="text-gray-600 font-Poppins">
              Continue with Google
            </span>
            <div className="flex-1 h-[1px] bg-gray-300"></div>
          </div>
          <div className="flex items-center justify-center my-3">
            <FcGoogle size={30} className=" cursor-pointer mr-2" />
            <AiFillGithub
              size={30}
              className=" cursor-pointer ml-2 text-black dark:text-white"
            />
          </div>

          <h5 className="dark:text-white text-black text-center pt-4 font-Poppins text-[14px]">
            Already have an account?{" "}
            <span
              className="text-blue-600 pl-1 cursor-pointer"
              onClick={() => setRoute("Login")}
            >
              Login
            </span>
          </h5>
        </form>
      </div>
    </>
  );
};

export default SignUp;

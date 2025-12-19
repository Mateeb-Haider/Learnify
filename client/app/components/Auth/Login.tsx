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
import { useLoginMutation } from "@/redux/features/auth/authApi";
import toast, { Toast } from "react-hot-toast";
import { signIn } from "next-auth/react";

type Props = {
  setRoute: (route: string) => void;
  setOpen: (open: boolean) => void;
};
const schema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid Email")
    .required("Please Enter Your Email"),
  password: Yup.string().required("Please Enter Your Password").min(6),
});

const Login: FC<Props> = ({ setRoute, setOpen }) => {
  const [show, setShow] = useState(false);
  const [login, { isSuccess, error, data }] = useLoginMutation();
  useEffect(() => {
    if (isSuccess) {
      toast.success("Login Success Fully");
      setOpen(false);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [error]);

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: schema,
    onSubmit: async ({ email, password }) => {
      await login({ email, password });
    },
  });

  const { errors, touched, values, handleChange, handleSubmit } = formik;
  return (
    <div className="w-full">
      <h1 className={`${styles.title}`}>Welcome Back to Learnify</h1>
      <h3 className="text-center text-[14px]  py-3 font-Poppins justify-center mb-5 text-black dark:text-white">
        Login to Your Account
      </h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email" className={`${styles.label}`}>
          Enter Your Email
        </label>
        <input
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          id="email"
          placeholder="muteebhdr@gmail.com"
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
          <input type="submit" value="Login" className={`${styles.button}`} />
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
          <FcGoogle
            size={30}
            className=" cursor-pointer mr-2"
            onClick={() => signIn("google")}
          />
          <AiFillGithub
            size={30}
            className=" cursor-pointer ml-2 text-black dark:text-white"
            onClick={() => signIn("github")}
          />
        </div>

        <h5 className="dark:text-white text-black text-center pt-4 font-Poppins text-[14px]">
          Don,t have an account?{" "}
          <span
            className="text-blue-600 pl-1 cursor-pointer"
            onClick={() => setRoute("Sign-Up")}
          >
            Sign up
          </span>
        </h5>
      </form>
    </div>
  );
};

export default Login;

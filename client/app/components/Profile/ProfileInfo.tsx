import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import defaultAvatar from "../../../public/assets/avatar.png";
import { styles } from "@/app/styles/styles";
import { BiCamera } from "react-icons/bi";
import toast from "react-hot-toast";
import {
  useEditProfilesMutation,
  useUpdateAvatarMutation,
} from "@/redux/features/user/userApi";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";

type Props = {
  avatar: string | null;
  user: any;
};

const ProfileInfo: FC<Props> = ({ user, avatar }) => {
  const [name, setName] = useState(user?.name);
  const [updateAvatar, { isSuccess, error }] = useUpdateAvatarMutation();
  const [editProfile, { isSuccess: success, error: updateError }] =
    useEditProfilesMutation();
  const [loadUser, setLoadUser] = useState(false);
  const {} = useLoadUserQuery(undefined, { skip: loadUser ? false : true });

  const imageHandler = async (e: any) => {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        const avatar = fileReader.result;
        updateAvatar(avatar);
      }
    };

    // fileReader.readAsDataURL(e.target.files[0]);

    const file = e.target.files?.[0];
    fileReader.readAsDataURL(file);
  };

  useEffect(() => {
    if (isSuccess || success) {
      setLoadUser(true);
    }
    if (error || updateError) {
      console.log(error);
    }
    if (success === true) {
      toast.success("Profile Updated Successfully");
    }
  }, [isSuccess, error, success, updateError]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (name !== "") {
      await editProfile({
        name: name,
      });
    }
  };
  return (
    <div
      className="w-[80%] flex flex-col justify-center
    "
    >
      <form onSubmit={handleSubmit}>
        <div className=" mx-auto relative flex justify-center items-center  ">
          <input
            type="file"
            id="avatar"
            className="hidden"
            onChange={imageHandler}
            accept="image/png, image/jpg, image/jpeg, image/webp"
          />
          <Image
            src={
              user.avatar || avatar ? user?.avatar.url || avatar : defaultAvatar
            }
            alt=""
            width={120}
            height={120}
            className=" rounded-full object-cover  border-green-400 border-[2px]"
          />

          <label htmlFor="avatar">
            <span
              className="absolute flex left-auto bottom-1 bg-gray-500 w-[25px] h-[25px]
               rounded-full text-white cursor-pointer items-center justify-center "
            >
              <BiCamera size={20} />
            </span>
          </label>
        </div>

        <div className="pt-10">
          <label className={`${styles.label} ml-8`}>User Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`${styles.input} ml-8`}
          />
        </div>
        <div className="pt-4">
          <label className={`${styles.label} ml-8`}>Email</label>
          <input
            type="text"
            readOnly
            value={user?.email}
            onChange={() => toast.error("You can't update your mail")}
            className={`${styles.input} ml-8`}
          />
        </div>

        <div className="py-5 flex justify-center  ">
          <input
            type="submit"
            value="Update"
            className={`${styles.button} !w-[200px] `}
          />
        </div>
      </form>
    </div>
  );
};

export default ProfileInfo;

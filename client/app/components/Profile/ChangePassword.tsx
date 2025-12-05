import { styles } from "@/app/styles/styles";
import { useUpdatePasswordMutation } from "@/redux/features/user/userApi";
import React, { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";

type Props = {
  user: any;
};

const ChangePassword: FC<Props> = ({ user }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [updatePassword, { isSuccess, error }] = useUpdatePasswordMutation();
  const passwordChangeHandler = async (e: any) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Password don't match");
    } else {
      await updatePassword({ oldPassword, newPassword });
      setNewPassword("");
      setOldPassword("");
      setConfirmPassword("");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Password Updated Successfully");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error]);
  return (
    <div>
      <form onSubmit={passwordChangeHandler}>
        <h5 className={`${styles.title}`}>Change Password</h5>
        <div className="pt-10">
          <label className={`${styles.label} ml-8`}> Enter Old Password</label>
          <input
            type="password"
            className={`${styles.input} ml-8`}
            value={oldPassword}
            required
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>
        <div className="pt-4">
          <label className={`${styles.label} ml-8`}> Enter New Password</label>
          <input
            type="password"
            required
            className={`${styles.input} ml-8`}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="pt-4">
          <label className={`${styles.label} ml-8`}>
            {" "}
            Enter Confirm Password
          </label>
          <input
            type="password"
            required
            className={`${styles.input} ml-8`}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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

export default ChangePassword;

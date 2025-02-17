
import { useStatus } from "@/context/contextStatus";

import postRequest from "@/lib/postRequest";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";

const ResetPassword = () => {

    const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [visibleChangePass, setVisibleChangePass] = useState(false);

  const [visibleChangePassConfirm, setVisibleChangePassConfirm] =
    useState(false);

  const { resetToken,setTabIndex } = useStatus();

  const schema = yup.object().shape({
    password: yup
      .string()
      .min(4, "Password should be at least 4 characters")
      .required("This field is required"),
    password_confirmation: yup
      .string()
      .oneOf([yup.ref("password"), null], "confirm passwords must match"),
  });

  const {
    register,
    reset,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const toggleBtn = () => {
    setVisible(!visible);
  };

  const toggleBtnChangePass = () => {
    setVisibleChangePass(!visibleChangePass);
  };

  const toggleBtnChangePassConfirm = () => {
    setVisibleChangePassConfirm(!visibleChangePassConfirm);
  };

  const handleChangePass = async (data) => {
     data["token"] = resetToken;
    delete data?.password_confirmation;

    let res = await postRequest(`customer/reset-password`, data);
    if (res?.success) {
      toast(`${res?.message}`);
      setTabIndex(1);
      router.push(`/auth`);

    } else {
      toast.error(`${res.message}`);
    }
  };

  return (
    <div className="bg-[#ddd] pt-32">
      <div className="max-w-7xl md:max-w-[62rem] sm:max-w-[47rem] xxl:max-w-[110rem]  mx-auto min-h-[600px] pt-5">
        <div className="mt-4  w-[350px] xs:w-[320px] mx-auto bg-white p-8 rounded-md">
          <p className="text-center text-xl font-semibold tracking-wider mb-4">
            Reset password
          </p>
          <form onSubmit={handleSubmit(handleChangePass)}>
            <div className="flex justify-center mt-6">
              <div className="relative w-full">
                <label className="form-label inline-block mb-2 text-gray-700 font-semibold">
                  Change password
                </label>
                <div className="relative mt-1">
                  <input
                    type={visibleChangePass ? "text" : "password"}
                    className="form-control dark:text-black block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-400
      "
                    placeholder="Enter change password ..."
                    {...register("password")}
                  />
                  <div onClick={toggleBtnChangePass}>
                    {visibleChangePass ? (
                      <svg
                        className="absolute top-2 right-2 text-gray-400 fill-current h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                      >
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path d="M17.882 19.297A10.949 10.949 0 0 1 12 21c-5.392 0-9.878-3.88-10.819-9a10.982 10.982 0 0 1 3.34-6.066L1.392 2.808l1.415-1.415 19.799 19.8-1.415 1.414-3.31-3.31zM5.935 7.35A8.965 8.965 0 0 0 3.223 12a9.005 9.005 0 0 0 13.201 5.838l-2.028-2.028A4.5 4.5 0 0 1 8.19 9.604L5.935 7.35zm6.979 6.978l-3.242-3.242a2.5 2.5 0 0 0 3.241 3.241zm7.893 2.264l-1.431-1.43A8.935 8.935 0 0 0 20.777 12 9.005 9.005 0 0 0 9.552 5.338L7.974 3.76C9.221 3.27 10.58 3 12 3c5.392 0 9.878 3.88 10.819 9a10.947 10.947 0 0 1-2.012 4.592zm-9.084-9.084a4.5 4.5 0 0 1 4.769 4.769l-4.77-4.769z" />
                      </svg>
                    ) : (
                      <svg
                        className="absolute top-2 right-2 text-gray-400 fill-current h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                      >
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path d="M12 3c5.392 0 9.878 3.88 10.819 9-.94 5.12-5.427 9-10.819 9-5.392 0-9.878-3.88-10.819-9C2.121 6.88 6.608 3 12 3zm0 16a9.005 9.005 0 0 0 8.777-7 9.005 9.005 0 0 0-17.554 0A9.005 9.005 0 0 0 12 19zm0-2.5a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9zm0-2a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
                      </svg>
                    )}
                  </div>
                  <p className="absolute top-[2.5rem] md:left-0 left-0 text-red-600 text-sm">
                    {errors.password?.message}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-6">
              <div className="relative mb-3 w-full">
                <label className="form-label inline-block mb-2 text-gray-700 font-semibold">
                  Password confirmation
                </label>
                <div className="relative mt-1">
                  <input
                    type={visibleChangePassConfirm ? "text" : "password"}
                    className="form-control block dark:text-black w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-400
      "
                    placeholder="Enter password conformation ..."
                    {...register("password_confirmation")}
                  />
                  <div onClick={toggleBtnChangePassConfirm}>
                    {visibleChangePassConfirm ? (
                      <svg
                        className="absolute top-2 right-2 text-gray-400 fill-current h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                      >
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path d="M17.882 19.297A10.949 10.949 0 0 1 12 21c-5.392 0-9.878-3.88-10.819-9a10.982 10.982 0 0 1 3.34-6.066L1.392 2.808l1.415-1.415 19.799 19.8-1.415 1.414-3.31-3.31zM5.935 7.35A8.965 8.965 0 0 0 3.223 12a9.005 9.005 0 0 0 13.201 5.838l-2.028-2.028A4.5 4.5 0 0 1 8.19 9.604L5.935 7.35zm6.979 6.978l-3.242-3.242a2.5 2.5 0 0 0 3.241 3.241zm7.893 2.264l-1.431-1.43A8.935 8.935 0 0 0 20.777 12 9.005 9.005 0 0 0 9.552 5.338L7.974 3.76C9.221 3.27 10.58 3 12 3c5.392 0 9.878 3.88 10.819 9a10.947 10.947 0 0 1-2.012 4.592zm-9.084-9.084a4.5 4.5 0 0 1 4.769 4.769l-4.77-4.769z" />
                      </svg>
                    ) : (
                      <svg
                        className="absolute top-2 right-2 text-gray-400 fill-current h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                      >
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path d="M12 3c5.392 0 9.878 3.88 10.819 9-.94 5.12-5.427 9-10.819 9-5.392 0-9.878-3.88-10.819-9C2.121 6.88 6.608 3 12 3zm0 16a9.005 9.005 0 0 0 8.777-7 9.005 9.005 0 0 0-17.554 0A9.005 9.005 0 0 0 12 19zm0-2.5a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9zm0-2a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
                      </svg>
                    )}
                  </div>
                </div>
                <p className="absolute top-20 md:left-0 left-0 text-red-600 text-sm">
                  {errors.password_confirmation?.message}
                </p>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button
                type="submit"
                className="bg-primary rounded-lg px-4 py-2 text-white font-semibold ml-4 drop-shadow-lg shadow-md"
              >
                save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;

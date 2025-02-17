import { useStatus } from "@/context/contextStatus";
import postRequest from "@/lib/postRequest";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { setCookie } from "nookies";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import Link from "next/link";


const Login = () => {
  const router = useRouter();

  const [visible, setVisible] = useState(false);

  const { setToken, setUserData, userId, setUserId,wishCall, setWishCall } = useStatus();

  const toggleBtn = () => {
    setVisible(!visible);
  };

 
  const schema = yup.object().shape({
    phone: yup
      .string()
      .required("The field is required")
      .min(11, "Phone number should be  11 characters")
      .max(11, "Phone number should be  11 characters"),

    password: yup
      .string()
      .min(4, "Password should be at least 4 characters")
      .required("This field is required"),
  });

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleLogin = async (data) => {
    let res = await postRequest(`customer/login`, data);

    if (res?.success) {
      toast(res?.message);
      setToken(res?.data?.token);
      setWishCall(!wishCall);
      setUserData(res?.user?.name);
      setUserId(res?.user?._id);
      setCookie(null, "userId", res?.data?._id, {
        maxAge: 24 * 60 * 60,
        path: "/",
      });

      setCookie(null, "token", res?.data?.token, {
        maxAge: 24 * 60 * 60,
        path: "/",
      });
      setCookie(null, "user", res?.user?.name, {
        maxAge: 24 * 60 * 60,
        path: "/",
      });
      setCookie(null, "image", res?.data?.image, {
        maxAge: 24 * 60 * 60,
        path: "/",
      });
      router.push(`/`);
      reset();
    } else {
      toast.error(res?.message);
    }
  };

 

  const responseFacebook = (response) => {
    console.log(response);
  };

  return (
    <div className="mt-4 pb-8">
      <form onSubmit={handleSubmit(handleLogin)}>
        <div className="relative pb-6">
          <div>
            <input
              type="text"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:text-black"
              placeholder="Phone number"
              {...register("phone")}
            />
          </div>
          <p className="absolute top-11 md:left-0 left-0 text-red-600 text-sm">
            {errors.phone?.message}
          </p>
        </div>

        <div className="relative pb-2">
          <div>
            <input
              type={visible ? "text" : "password"}
              className="bg-gray-50 border border-gray-300 text-gray-900 dark:text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter password"
              {...register("password")}
            />
            <div onClick={toggleBtn}>
              {visible ? (
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
          <p className="absolute top-11 md:left-0 left-0 text-red-600 text-sm">
            {errors.password?.message}
          </p>
        </div>

        <Link href="/forgot-password">
          <p className="font-semibold text-blue-500 pt-3">Forgot password?</p>
        </Link>

        <button className="flex justify-center bg-primary py-3 rounded-full w-full text-white font-semibold tracking-wide mt-3">
          Sign in
        </button>

        {/* <div className="grid grid-cols-3 px-3">
          <div className="w-full h-[2px] bg-gray-300 mt-3"></div>
          <p className="text-black text-center">Or continue with</p>
          <div className="w-full h-[2px] bg-gray-300 mt-3"></div>
        </div>
        <div className="pb-3">
          <div className="flex space-x-10 justify-center items-center">
            <div className="h-12 w-12 rounded-full flex justify-center items-center bg-[#3b5998]">
              <svg
                className="fill-current text-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z" />
              </svg>
             
            </div>
            <div className="h-12 w-12 rounded-full flex justify-center items-center bg-red-600">
              <svg
                className="fill-current text-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M3.064 7.51A9.996 9.996 0 0 1 12 2c2.695 0 4.959.99 6.69 2.605l-2.867 2.868C14.786 6.482 13.468 5.977 12 5.977c-2.605 0-4.81 1.76-5.595 4.123-.2.6-.314 1.24-.314 1.9 0 .66.114 1.3.314 1.9.786 2.364 2.99 4.123 5.595 4.123 1.345 0 2.49-.355 3.386-.955a4.6 4.6 0 0 0 1.996-3.018H12v-3.868h9.418c.118.654.182 1.336.182 2.045 0 3.046-1.09 5.61-2.982 7.35C16.964 21.105 14.7 22 12 22A9.996 9.996 0 0 1 2 12c0-1.614.386-3.14 1.064-4.49z" />
              </svg>
            </div>
          </div>
        </div> */}
      </form>
    </div>
  );
};

export default Login;

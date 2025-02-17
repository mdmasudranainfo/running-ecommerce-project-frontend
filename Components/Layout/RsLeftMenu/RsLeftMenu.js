/* eslint-disable react/jsx-key */
/* eslint-disable react/jsx-no-undef */
import { useEffect, useState } from "react";

import styles from "./RsLeftMenu.module.css";

import { useStatus } from "@/context/contextStatus";
import request from "@/lib/request";
import Link from "next/link";
import { useRouter } from "next/router";
import LeftMenu from "./LeftMenu";
import Image from "next/image";
import { hostname } from "@/lib/config";
import { IoMdClose } from "react-icons/io";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa";

function ResLeftMenu() {
  const { sideCategory, setSideCategory, Logo } = useStatus();
  const [categoryItems, setCategoryItems] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const axiosCategory = async () => {
      const res = await request(`category/fetch-all`);
      setCategoryItems(res?.data);
    };
    axiosCategory();
  }, []);

  const handleRoute = (item) => {
    router.push(`/${item?.slug}`);
  };

  return (
    <div className={`${sideCategory ? styles.main__wrapper : ``}`}>
      <div
        className={`overflow-y-auto
							md:hidden bg-white fixed top-0 
							duration-500 h-[100vh]  sm:p-10 z-50 ${
                sideCategory ? "left-0 w-[100%]" : "left-[-100%]"
              }
        			`}
      >
        <div
          className="flex justify-between items-center py-2 px-4 pb-0 pt-4 "
          onClick={() => setSideCategory(false)}
        >
          {/* <div>
            <Image
              src={`${hostname}/${Logo}`}
              height={100}
              width={200}
              alt="logo"
            />
          </div> */}

          {/* <svg
            className="h-7 w-7 fill-current text-black"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 10.5858L14.8284 7.75736L16.2426 9.17157L13.4142 12L16.2426 14.8284L14.8284 16.2426L12 13.4142L9.17157 16.2426L7.75736 14.8284L10.5858 12L7.75736 9.17157L9.17157 7.75736L12 10.5858Z"></path>
          </svg> */}

          <IoMdClose size={35} />
        </div>

        <div className="p-4 flex items-center gap-3 text-lg">
          <div className="   bg-stone-200  p-2 rounded-full border border-primary ">
            <FaRegUser size={35} />
          </div>
          <div className="">
            <Link className="text-blue-400" href={"/auth"}>
              Login
            </Link>{" "}
            Or{" "}
            <Link className="text-blue-400" href={"/auth"}>
              Register
            </Link>
          </div>
        </div>

        <h4 className="px-4 pt-2 font-semibold !text-xl">All Category</h4>

        <ul className="p-4">
          {categoryItems?.map((item, index) => (
            <>
              {item?.children?.length > 0 ? (
                <li
                  // border-b border-gray-300
                  className="list-none py-2 "
                  key={index}
                >
                  <LeftMenu item={item} />
                </li>
              ) : (
                <Link href={`/${item?.slug}`}>
                  <li
                    // border-b border-gray-300
                    className="list-none py-2 "
                    key={index}
                  >
                    <LeftMenu item={item} />
                  </li>
                </Link>
              )}
            </>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ResLeftMenu;

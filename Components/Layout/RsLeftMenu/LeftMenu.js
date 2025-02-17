import { useStatus } from "@/context/contextStatus";
import { hostname } from "@/lib/config";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";

const LeftMenu = ({ item }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { sideCategory, setSideCategory } = useStatus();

  const router = useRouter();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClick = (slug) => {
    setSideCategory(false);
    router.push(`/${slug}`);
  };

  return (
    <>
      <button className="flex items-center justify-between list-none w-full text-sm font-medium">
        <p
          className="text-black uppercase font-semibold flex items-center gap-1"
          onClick={() => handleClick(item?.slug)}
        >
          <Image
            className="grayscale"
            src={`${hostname}/${item?.image}`}
            height={30}
            width={30}
            alt="Logo"
          />
          <span>{item?.name}</span>
        </p>

        {item?.children?.length > 0 ? (
          <>
            {isDropdownOpen ? (
              <IoIosArrowForward
                onClick={() => toggleDropdown()}
                size={20}
                className="rotate-90 ease-in duration-200"
              />
            ) : (
              <IoIosArrowForward
                onClick={() => toggleDropdown()}
                size={20}
                className="ease-in duration-200"
              />
            )}
          </>
        ) : null}
      </button>
      {isDropdownOpen && (
        <ul className="pl-4 mt-2 space-y-2 transition-all duration-300">
          {item?.children?.length > 0 ? (
            <>
              {item?.children?.map((subItem, subIndex) => (
                <div key={subIndex}>
                  <li
                    className={`list-none text-sm ml-3 ${
                      subIndex ? "border-none" : ""
                    }  py-2 text-black`}
                  >
                    <Link
                      href={`/${subItem?.slug}`}
                      className="text-black"
                      onClick={() => setSideCategory(false)}
                    >
                      {subItem?.name}
                    </Link>
                  </li>
                </div>
              ))}
            </>
          ) : null}
        </ul>
      )}
    </>
  );
};

export default LeftMenu;

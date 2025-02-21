import { useStatus } from "@/context/contextStatus";
import { hostname } from "@/lib/config";
import postRequest from "@/lib/postRequest";
import request from "@/lib/request";
import { Menu, Transition } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { destroyCookie, parseCookies } from "nookies";
import { Fragment, useEffect, useRef, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { CiMenuBurger, CiShop } from "react-icons/ci";
import { BsCart3, BsCart4 } from "react-icons/bs";
import { IoMdHome } from "react-icons/io";

import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import { toast } from "react-toastify";
import { MdOutlineCategory } from "react-icons/md";
import { IoCartOutline } from "react-icons/io5";

const Navbar = () => {
  const {
    token,
    setToken,
    setUserData,
    cartItems,
    image,
    setImage,
    isAlive,
    flag,
    setFlag,
    setSideCategory,
    shakeAnimation,
    wishCall,
    wishData,
    setWishData,
    userPhone,
    Email,
  } = useStatus();
  const cookie = parseCookies();

  const wrapperRef = useRef(null);

  const [searchKey, setsearchKey] = useState("");
  const { isCartOpen, setIsCartOpen } = useStatus();
  const [searchData, setsearchData] = useState([]);
  const [userProfileData, setUserProfileData] = useState({});
  const [data, setData] = useState({});

  const router = useRouter();

  const [serachboxOpen, setSearchboxOpen] = useState(false);

  const handleClick = () => {
    setFlag(true);
  };
  useEffect(() => {
    const getData = async () => {
      const res = await request(`setting/view`);

      setData(res?.data);
    };
    getData();
  }, []);

  useEffect(() => {
    if (token) {
      const getData = async () => {
        let res = await request(`customer/wishlist/fetch`);

        if (res?.success) {
          setWishData(res?.data);
        }
      };
      getData();
    }
  }, [wishCall]);

  useEffect(() => {
    function handleClickOutside() {
      setFlag(false);
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setsearchData([]);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  useEffect(() => {
    if (token) {
      const getData = async () => {
        let res = await request(`customer/profile-view/${cookie?.userId}`);
        setUserProfileData(res?.data);
      };
      getData();
    }
  }, [isAlive, cookie?.userId]);

  useEffect(() => {
    setImage(userProfileData?.image);
  }, [userProfileData]);

  const handleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const search = async (val) => {
    setsearchKey(val);
    const data = {
      value: val,
    };
    let res = await postRequest(
      "product/search-by-sku-or-name?page=1&limit=6&userType=CUSTOMER",
      data
    );
    if (res?.success) {
      setsearchData(res?.data);
    }
  };

  const handleProfile = () => {
    router.push(`/profile`);
  };

  const handleLogout = () => {
    toast("Successfully logged out!");

    setToken(null);
    setUserData(null);
    destroyCookie({}, "token", {
      path: "/",
    });
    destroyCookie({}, "user", {
      path: "/",
    });
    destroyCookie({}, "userId", {
      path: "/",
    });

    router.push("/");
  };

  const handleRoute = (item) => {
    router.replace(`/products/${item?.slug}`);
  };

  const handleSearchClick = () => {
    setSearchboxOpen(!serachboxOpen);
  };

  const handleWishRoute = () => {
    if (token) {
      router?.push(`/wishlist`);
    } else {
      toast.error(`You need to login first`);
    }
  };

  return (
    <div className="fixed w-full z-20 top-0 bg-white border-b py-4 sm:py-1 xls:py-0 xms:py-0 xs:py-0 ">
      <div className="border-b pb-3">
        <div className="max-w-7xl xls:max-w-[25rem] xs:max-w-[20rem] md:max-w-[62rem] xxl:max-w-[110rem] mx-auto">
          <div className="flex items-center justify-between sm:hidden xls:hidden xms:hidden xs:hidden ">
            <Link href={`/`}>
              <div className="flex justify-center lg:w-auto lg:flex-1">
                <p className="text-4xl font-semibold text-primary">
                  <img
                    className="w-56  object-contain  max-h-[40px]"
                    src={`${hostname}/${data?.logoImg}`}
                    alt="logo"
                  />
                </p>
              </div>
            </Link>
            <div>
              {/* <div className="flex items-center bg-gray-200  rounded-md"> */}
              <div className="flex items-center bg-white  border-2 border-primary rounded-md pl-2">
                <div className="relative ">
                  <div>
                    <input
                      placeholder="Looking for something? ...."
                      className={`${
                        token ? "w-[525px]" : "w-[525px]"
                      }  md:w-[450px] sm:w-[480px] xls:w-[210px] xms:w-[190px] xs:w-[130px] px-3 bg-white outline-none placeholder:text-sm`}
                      onClick={handleClick}
                      onChange={(e) => search(e.target.value)}
                      type="text"
                      value={searchKey}
                    />
                  </div>

                  {flag && (
                    <div
                      className="rounded-b-lg bg-white xxl:w-full xl:w-full lg:w-full md:w-full sm:w-full mx-auto h-[400px] xls:w-[290px] xms:w-[280px] xs:w-[287px] absolute z-20 xs:left-[-78px] overflow-y-auto top-[35px] xs:top-[33px] shadow-md drop-shadow-md"
                      ref={wrapperRef}
                    >
                      {!searchKey && (
                        <div>
                          {/* <div className="h-40 w-40 mx-auto mt-6">
                            <img src="/image/coding.png" />
                          </div> */}
                          <p className="text-gray-400 text-center pt-4">
                            {/* Start typing to search */}
                            Search for products
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                  {searchData?.length ? (
                    <div
                      className="bg-white xxl:w-full xl:w-full lg:w-full md:w-full sm:w-full mx-auto h-[400px] xls:w-[290px] xms:w-[280px] xs:w-[287px] absolute z-20 xs:left-[-78px] xs:top-[33px] overflow-y-auto "
                      ref={wrapperRef}
                    >
                      {searchData?.map((item, index) => (
                        <div onClick={() => handleRoute(item)} key={index}>
                          <div
                            onClick={() => {
                              setsearchData([]);
                              setsearchKey("");
                            }}
                            key={index}
                            className="m-2 flex items-center justify-start border-[1px] cursor-pointer hover:border-primary rounded-lg overflow-hidden"
                          >
                            <div className="w-[70px] h-[70px] relative mr-10">
                              <Image
                                alt=""
                                fill
                                src={`${hostname}/${item?.galleryImage[0]}`}
                              />
                            </div>
                            <div>
                              <span className="mr-10 text-black text-sm">
                                {item?.name?.slice(0, 50)}
                              </span>
                              <div className="flex space-x-2 items-center text-xs">
                                {item?.isFlashDeal ? (
                                  <>
                                    {item?.isVariant == false ? (
                                      <>
                                        <p className="text-[14px] xs:text-xs xms:text-xs font-semibold text-red-600 text-center">
                                          ৳ {item?.nonVariation?.flashPrice}
                                        </p>{" "}
                                        <p className="text-[12px] xs:text-xs xms:text-xs font-semibold text-green-700 text-center line-through">
                                          TK. {item?.nonVariation?.regularPrice}
                                        </p>{" "}
                                      </>
                                    ) : (
                                      <>
                                        {" "}
                                        <p className="text-[14px] xs:text-xs xms:text-xs font-semibold text-red-600 text-center">
                                          ৳ {item?.variations[0]?.flashPrice}
                                        </p>
                                        <p className="text-[12px] xs:text-xs xms:text-xs font-semibold text-green-700 text-center line-through">
                                          TK.{" "}
                                          {item?.variations[0]?.regularPrice}
                                        </p>
                                      </>
                                    )}
                                  </>
                                ) : (
                                  <>
                                    {item?.isVariant == false ? (
                                      <>
                                        <p className="text-[14px] xs:text-xs xms:text-xs font-semibold text-red-600 text-center">
                                          ৳ {item?.nonVariation?.sellingPrice}
                                        </p>
                                        <>
                                          {item?.nonVariation?.sellingPrice ==
                                          item?.nonVariation
                                            ?.regularPrice ? null : (
                                            <p className="text-[12px] xs:text-xs xms:text-xs font-semibold text-green-700 text-center line-through">
                                              TK.{" "}
                                              {item?.nonVariation?.regularPrice}
                                            </p>
                                          )}
                                        </>
                                      </>
                                    ) : (
                                      <>
                                        <p className="text-[14px] xs:text-xs xms:text-xs font-semibold text-red-600 text-center">
                                          ৳ {item?.variations[0]?.sellingPrice}
                                        </p>

                                        <>
                                          {item?.variations[0]?.sellingPrice ==
                                          item?.variations[0]
                                            ?.regularPrice ? null : (
                                            <p className="text-[12px] xs:text-xs xms:text-xs font-semibold text-green-700 text-center line-through">
                                              TK.{" "}
                                              {
                                                item?.variations[0]
                                                  ?.regularPrice
                                              }
                                            </p>
                                          )}
                                        </>
                                      </>
                                    )}
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>

                <div
                  className="flex items-center bg-primary text-white   py-2 px-4 cursor-pointer z-30"
                  onClick={() => search(searchKey)}
                >
                  <p className="block">
                    {/* <svg
                    className="fill-current text-primary h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"></path>
                  </svg> */}
                    <button className=" ">Search</button>
                  </p>
                </div>
              </div>
            </div>

            {/* trak order button */}

            <div className="flex items-center space-x-2 font-medium text-lg text-black">
              <div>
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
                </svg>
              </div>
              <div>
                <Link href={``}>
                  <p className="text-sm">Track Order</p>
                </Link>
              </div>
            </div>

            {/* <div className="flex items-center space-x-2 font-medium text-lg text-black">
              <div>
            

                <svg
                  className="h-8 w-8"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M896 554.666667v170.666666a85.333333 85.333333 0 0 1-85.333333 85.333334v42.666666a128 128 0 0 1-128 128h-128a42.666667 42.666667 0 0 1-42.666667-42.666666v-21.333334a21.333333 21.333333 0 0 1 21.333333-21.333333H682.666667a42.666667 42.666667 0 0 0 42.666666-42.666667v-42.666666a42.666667 42.666667 0 0 1-42.666666-42.666667v-256a42.666667 42.666667 0 0 1 42.666666-42.666667V341.333333A213.333333 213.333333 0 0 0 298.666667 341.333333v128a42.666667 42.666667 0 0 1 42.666666 42.666667v256a42.666667 42.666667 0 0 1-42.666666 42.666667H213.333333a85.333333 85.333333 0 0 1-85.333333-85.333334v-170.666666a85.333333 85.333333 0 0 1 85.333333-85.333334V341.333333a298.666667 298.666667 0 0 1 597.333334 0v128a85.333333 85.333333 0 0 1 85.333333 85.333334z" />
                </svg>
              </div>
              <div>
                <Link href={`tel:${userPhone}`} target="_blank">
                  <p className="text-sm">{userPhone}</p>
                </Link>
                <Link href={`mailto:${Email}`} target="_blank">
                  <p className="text-sm">{Email}</p>
                </Link>
              </div>
            </div> */}
            <div className="flex items-center space-x-10 justify-between">
              {token ? (
                <div
                  className="relative cursor-pointer"
                  onClick={() => handleWishRoute()}
                >
                  <svg
                    className="h-7 w-7"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12.001 4.52853C14.35 2.42 17.98 2.49 20.2426 4.75736C22.5053 7.02472 22.583 10.637 20.4786 12.993L11.9999 21.485L3.52138 12.993C1.41705 10.637 1.49571 7.01901 3.75736 4.75736C6.02157 2.49315 9.64519 2.41687 12.001 4.52853ZM18.827 6.1701C17.3279 4.66794 14.9076 4.60701 13.337 6.01687L12.0019 7.21524L10.6661 6.01781C9.09098 4.60597 6.67506 4.66808 5.17157 6.17157C3.68183 7.66131 3.60704 10.0473 4.97993 11.6232L11.9999 18.6543L19.0201 11.6232C20.3935 10.0467 20.319 7.66525 18.827 6.1701Z"></path>
                  </svg>
                  <div className="bg-red-500 rounded-full h-4 w-4 flex justify-center items-center absolute top-[-4px] right-[-8px]">
                    <p className="text-white text-xs">{wishData?.length}</p>
                  </div>
                </div>
              ) : null}

              {/* <Link href="/auth">
              <div className="flex items-center justify-between">
                <div className="px-1">
                  <FaRegUser color="#000" size={20} />
                </div>
                <span>User sign</span>
              </div>
            </Link> */}
              <Menu
                as="div"
                className="ml-3 relative sm:hidden xls:hidden xms:hidden xs:hidden"
              >
                {({ open }) => (
                  <Fragment>
                    <div>
                      <Menu.Button className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:myblue-500">
                        <span className="sr-only">Open user menu</span>
                        {token ? (
                          <>
                            {image ? (
                              <img
                                src={`${hostname}/${image}`}
                                className="object-cover h-10 w-10 rounded-full"
                              />
                            ) : (
                              <div className="h-9 w-9 rounded-full border border-gray-300 flex justify-center items-center">
                                <svg
                                  className="fill-current text-black h-5 w-5"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  width="24"
                                  height="24"
                                >
                                  <path fill="none" d="M0 0h24v24H0z" />
                                  <path d="M4 22a8 8 0 1 1 16 0h-2a6 6 0 1 0-12 0H4zm8-9c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6zm0-2c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" />
                                </svg>
                              </div>
                            )}
                          </>
                        ) : (
                          <Link href={`/auth`}>
                            <div className="h-9 w-9 rounded-full border border-gray-300 flex justify-center items-center">
                              <svg
                                className="fill-current text-black h-5 w-5"
                                viewBox="0 0 1024 1024"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M512.476 648.247c-170.169 0-308.118-136.411-308.118-304.681 0-168.271 137.949-304.681 308.118-304.681 170.169 0 308.119 136.411 308.119 304.681C820.594 511.837 682.645 648.247 512.476 648.247L512.476 648.247zM512.476 100.186c-135.713 0-246.12 109.178-246.12 243.381 0 134.202 110.407 243.381 246.12 243.381 135.719 0 246.126-109.179 246.126-243.381C758.602 209.364 648.195 100.186 512.476 100.186L512.476 100.186zM935.867 985.115l-26.164 0c-9.648 0-17.779-6.941-19.384-16.35-2.646-15.426-6.277-30.52-11.142-44.95-24.769-87.686-81.337-164.13-159.104-214.266-63.232 35.203-134.235 53.64-207.597 53.64-73.555 0-144.73-18.537-208.084-53.922-78 50.131-134.75 126.68-159.564 214.549 0 0-4.893 18.172-11.795 46.4-2.136 8.723-10.035 14.9-19.112 14.9L88.133 985.116c-9.415 0-16.693-8.214-15.47-17.452C91.698 824.084 181.099 702.474 305.51 637.615c58.682 40.472 129.996 64.267 206.966 64.267 76.799 0 147.968-23.684 206.584-63.991 124.123 64.932 213.281 186.403 232.277 329.772C952.56 976.901 945.287 985.115 935.867 985.115L935.867 985.115z" />
                              </svg>
                            </div>
                          </Link>
                        )}
                      </Menu.Button>
                    </div>
                    {!token ? null : (
                      <Transition
                        show={open}
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="origin-top-right absolute z-40 static right-0 mt-4 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <div
                                className="hover:bg-primary hover:text-white block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                                onClick={() => handleProfile()}
                              >
                                Profile
                              </div>
                            )}
                          </Menu.Item>

                          <Menu.Item>
                            {({ active }) => (
                              <div
                                className="hover:bg-primary hover:text-white block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                                onClick={handleLogout}
                              >
                                Sign Out
                              </div>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    )}
                  </Fragment>
                )}
              </Menu>
            </div>
          </div>

          <div className={`xls:block xms:block xs:block sm:block hidden`}>
            <div className="relative">
              <div className="flex justify-between items-center px-3 bg-white py-2">
                <div
                  onClick={() => {
                    setSideCategory(true);
                  }}
                >
                  <CiMenuBurger size={20} color="#000" />
                </div>

                <Link href={`/`}>
                  <div className="flex justify-center lg:w-auto lg:flex-1">
                    <p className="text-3xl font-extrabold text-primary">
                      <img
                        src={`${hostname}/${data?.logoImg}`}
                        className="object-cover h-10 w-15"
                        alt="logo"
                      />
                    </p>
                  </div>
                </Link>

                <div className="flex items-center space-x-4">
                  {/* <div>
                    {serachboxOpen ? (
                      <div
                        onClick={handleSearchClick}
                        className="cursor-pointer"
                      >
                        <RxCross2 size={25} color="#000" />
                      </div>
                    ) : (
                      <div
                        onClick={handleSearchClick}
                        className="cursor-pointer"
                      >
                        <BiSearch size={25} color="#000" />
                      </div>
                    )}
                  </div> */}
                  <div
                    className={`relative ${
                      shakeAnimation ? "shake-animation" : ""
                    } cursor-pointer`}
                    onClick={() => handleCart()}
                  >
                    <IoCartOutline color="#000" size={25} />
                    <p className="absolute top-[-10px] left-[18px] text-xs text-white flex justify-center items-center bg-red-600 rounded-full h-4 w-4">
                      {cartItems?.length}
                    </p>
                  </div>
                </div>
              </div>
              {serachboxOpen && (
                <div className=" top-1 sm:w-[400px] xls:w-[270px] xms:w-[250px] xs:w-[200px] left-10 sm:left-40  border-[#d1d5db] mt-[5px]">
                  <div>
                    <input
                      className="w-full py-[6px] px-2 rounded-lg border border-primary outline-none placeholder-black bg-white"
                      placeholder="Search products...."
                      onClick={handleClick}
                      onChange={(e) => search(e.target.value)}
                      type="text"
                      value={searchKey}
                    />

                    {searchData?.length ? (
                      <div
                        className="bg-white xxl:w-full xl:w-full lg:w-full md:w-full sm:w-full mx-auto h-[400px]  xls:w-[350px] xms:w-[320px] xs:w-[287px] absolute z-20 xs:left-[18px]  overflow-y-auto shadow-lg drop-shadow-md"
                        ref={wrapperRef}
                      >
                        {searchData?.map((item, index) => (
                          <div onClick={() => handleRoute(item)} key={index}>
                            <div
                              onClick={() => {
                                setsearchData([]);
                                setsearchKey("");
                              }}
                              key={index}
                              className="m-2 flex items-center justify-start border-[1px] cursor-pointer hover:border-primary"
                            >
                              <div className="w-[70px] h-[70px] relative mr-10">
                                <Image
                                  alt=""
                                  fill
                                  src={`${hostname}/${item?.galleryImage[0]}`}
                                />
                              </div>
                              <div>
                                <span className="mr-10 text-black text-sm">
                                  {item?.name?.slice(0, 50)}
                                </span>
                                <div className="flex space-x-2 items-center text-xs">
                                  {item?.isFlashDeal ? (
                                    <>
                                      {item?.isVariant == false ? (
                                        <>
                                          {" "}
                                          <p className="text-[14px] xs:text-xs xms:text-xs font-semibold text-red-600 text-center">
                                            ৳ {item?.nonVariation?.flashPrice}
                                          </p>{" "}
                                          <p className="text-[12px] xs:text-xs xms:text-xs font-semibold text-green-700 text-center line-through">
                                            TK.{" "}
                                            {item?.nonVariation?.regularPrice}
                                          </p>{" "}
                                        </>
                                      ) : (
                                        <>
                                          {" "}
                                          <p className="text-[14px] xs:text-xs xms:text-xs font-semibold text-red-600 text-center">
                                            ৳ {item?.variations[0]?.flashPrice}
                                          </p>
                                          <p className="text-[12px] xs:text-xs xms:text-xs font-semibold text-green-700 text-center line-through">
                                            TK.{" "}
                                            {item?.variations[0]?.regularPrice}
                                          </p>
                                        </>
                                      )}
                                    </>
                                  ) : (
                                    <>
                                      {item?.isVariant == false ? (
                                        <>
                                          <p className="text-[14px] xs:text-xs xms:text-xs font-semibold text-red-600 text-center">
                                            ৳ {item?.nonVariation?.sellingPrice}
                                          </p>
                                          <>
                                            {item?.nonVariation?.sellingPrice ==
                                            item?.nonVariation
                                              ?.regularPrice ? null : (
                                              <p className="text-[12px] xs:text-xs xms:text-xs font-semibold text-green-700 text-center line-through">
                                                TK.{" "}
                                                {
                                                  item?.nonVariation
                                                    ?.regularPrice
                                                }
                                              </p>
                                            )}
                                          </>
                                        </>
                                      ) : (
                                        <>
                                          <p className="text-[14px] xs:text-xs xms:text-xs font-semibold text-red-600 text-center">
                                            ৳{" "}
                                            {item?.variations[0]?.sellingPrice}
                                          </p>

                                          <>
                                            {item?.variations[0]
                                              ?.sellingPrice ==
                                            item?.variations[0]
                                              ?.regularPrice ? null : (
                                              <p className="text-[12px] xs:text-xs xms:text-xs font-semibold text-green-700 text-center line-through">
                                                TK.{" "}
                                                {
                                                  item?.variations[0]
                                                    ?.regularPrice
                                                }
                                              </p>
                                            )}
                                          </>
                                        </>
                                      )}
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : null}
                    {/* <div className="w-full mt-2">
                    <button className="bg-primary text-white py-2 w-full text-center">
                      Search
                    </button>
                  </div> */}
                  </div>
                </div>
              )}
              <div className=" top-1 w-full px-4 left-10 sm:left-40  border-[#d1d5db] mt-[5px]">
                <div>
                  <input
                    className="w-full py-[6px] px-2 rounded-lg border border-primary outline-none placeholder-black bg-white"
                    placeholder="Search products...."
                    onClick={handleClick}
                    onChange={(e) => search(e.target.value)}
                    type="text"
                    value={searchKey}
                  />

                  {searchData?.length ? (
                    <div
                      className="bg-white xxl:w-full xl:w-full lg:w-full md:w-full sm:w-full mx-auto h-[400px]  xls:w-[350px] xms:w-[320px] xs:w-[287px] absolute z-20 xs:left-[18px]  overflow-y-auto shadow-lg drop-shadow-md"
                      ref={wrapperRef}
                    >
                      {searchData?.map((item, index) => (
                        <div onClick={() => handleRoute(item)} key={index}>
                          <div
                            onClick={() => {
                              setsearchData([]);
                              setsearchKey("");
                            }}
                            key={index}
                            className="m-2 flex items-center justify-start border-[1px] cursor-pointer hover:border-primary"
                          >
                            <div className="w-[70px] h-[70px] relative mr-10">
                              <Image
                                alt=""
                                fill
                                src={`${hostname}/${item?.galleryImage[0]}`}
                              />
                            </div>
                            <div>
                              <span className="mr-10 text-black text-sm">
                                {item?.name?.slice(0, 50)}
                              </span>
                              <div className="flex space-x-2 items-center text-xs">
                                {item?.isFlashDeal ? (
                                  <>
                                    {item?.isVariant == false ? (
                                      <>
                                        <p className="text-[14px] xs:text-xs xms:text-xs font-semibold text-red-600 text-center">
                                          ৳ {item?.nonVariation?.flashPrice}
                                        </p>
                                        <p className="text-[12px] xs:text-xs xms:text-xs font-semibold text-green-700 text-center line-through">
                                          TK. {item?.nonVariation?.regularPrice}
                                        </p>
                                      </>
                                    ) : (
                                      <>
                                        <p className="text-[14px] xs:text-xs xms:text-xs font-semibold text-red-600 text-center">
                                          ৳ {item?.variations[0]?.flashPrice}
                                        </p>
                                        <p className="text-[12px] xs:text-xs xms:text-xs font-semibold text-green-700 text-center line-through">
                                          TK.
                                          {item?.variations[0]?.regularPrice}
                                        </p>
                                      </>
                                    )}
                                  </>
                                ) : (
                                  <>
                                    {item?.isVariant == false ? (
                                      <>
                                        <p className="text-[14px] xs:text-xs xms:text-xs font-semibold text-red-600 text-center">
                                          ৳ {item?.nonVariation?.sellingPrice}
                                        </p>
                                        <>
                                          {item?.nonVariation?.sellingPrice ==
                                          item?.nonVariation
                                            ?.regularPrice ? null : (
                                            <p className="text-[12px] xs:text-xs xms:text-xs font-semibold text-green-700 text-center line-through">
                                              TK.{" "}
                                              {item?.nonVariation?.regularPrice}
                                            </p>
                                          )}
                                        </>
                                      </>
                                    ) : (
                                      <>
                                        <p className="text-[14px] xs:text-xs xms:text-xs font-semibold text-red-600 text-center">
                                          ৳ {item?.variations[0]?.sellingPrice}
                                        </p>

                                        <>
                                          {item?.variations[0]?.sellingPrice ==
                                          item?.variations[0]
                                            ?.regularPrice ? null : (
                                            <p className="text-[12px] xs:text-xs xms:text-xs font-semibold text-green-700 text-center line-through">
                                              TK.{" "}
                                              {
                                                item?.variations[0]
                                                  ?.regularPrice
                                              }
                                            </p>
                                          )}
                                        </>
                                      </>
                                    )}
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : null}
                  {/* <div className="w-full mt-2">
                    <button className="bg-primary text-white py-2 w-full text-center">
                      Search
                    </button>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*  */}

      <div className="max-w-7xl  px-5 hidden md:block  lg:block xl:block sxl:block  xls:max-w-[25rem] xs:max-w-[20rem] md:max-w-[62rem] xxl:max-w-[110rem] mx-auto pt-3">
        <div className="flex gap-4">
          <Link className="group flex items-center  gap-1 " href={`/`}>
            <IoMdHome className="group-hover:text-primary text-xl" />
            <p className="mt-1">Home</p>
          </Link>
          <Link className="group flex items-center  gap-1 " href={`/`}>
            <MdOutlineCategory className="group-hover:text-primary text-xl" />
            <p className="mt-1">Category</p>
          </Link>
          <Link className="group flex items-center  gap-1 " href={`/`}>
            <CiShop className="group-hover:text-primary text-xl" />
            <p className="mt-1">Shop</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

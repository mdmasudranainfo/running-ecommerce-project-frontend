import { hostname } from "@/lib/config";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import Skeleton from "react-loading-skeleton";
import { Autoplay, Navigation } from "swiper";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

const SubCategory = ({ categoryData, loading }) => {
  let [cat1, setCat1] = useState([]);

  let [cat2, setCat2] = useState([]);

  useEffect(() => {
    if (categoryData?.length > 4) {
      setCat1(categoryData.slice(0, 8));
    }

    if (categoryData?.length > 8) {
      setCat2(categoryData.slice(9, categoryData?.length));
    }
  }, [categoryData]);

  // console.log("categoryData...", categoryData);

  return (
    <div className="mt-3 rounded-md bg-white pt-4 shadow">
      <div className="flex justify-start p-2">
        <div className="flex items-center justify-between w-full">
          <p className="font-bold pl-2 uppercase text-black tracking-wider xls:text-sm xms:text-sm xs:text-sm">
            Top Categories
          </p>
        </div>
      </div>
      <div>
        <div>
          {loading ? (
            <div className="grid grid-cols-8 md:grid-cols-6 sm:grid-cols-4 xls:grid-cols-2 xms:grid-cols-2 xs:grid-cols-2 gap-5">
              <div className="group bg-white shadow-md rounded-md px-4 py-2">
                <div>
                  <div className="flex justify-center">
                    <Skeleton circle={true} height={50} width={50} />
                  </div>
                  <Skeleton count={1} />
                </div>
              </div>
              <div className="group bg-white shadow-md rounded-md px-4 py-2">
                <div>
                  <div className="flex justify-center">
                    <Skeleton circle={true} height={50} width={50} />
                  </div>
                  <Skeleton count={1} />
                </div>
              </div>
              <div className="group bg-white shadow-md rounded-md px-4 py-2">
                <div>
                  <div className="flex justify-center">
                    <Skeleton circle={true} height={50} width={50} />
                  </div>
                  <Skeleton count={1} />
                </div>
              </div>
              <div className="group bg-white shadow-md rounded-md px-4 py-2">
                <div>
                  <div className="flex justify-center">
                    <Skeleton circle={true} height={50} width={50} />
                  </div>
                  <Skeleton count={1} />
                </div>
              </div>
              <div className="group bg-white shadow-md rounded-md px-4 py-2">
                <div>
                  <div className="flex justify-center">
                    <Skeleton circle={true} height={50} width={50} />
                  </div>
                  <Skeleton count={1} />
                </div>
              </div>
              <div className="group bg-white shadow-md rounded-md px-4 py-2">
                <div>
                  <div className="flex justify-center">
                    <Skeleton circle={true} height={50} width={50} />
                  </div>
                  <Skeleton count={1} />
                </div>
              </div>
              <div className="group bg-white shadow-md rounded-md px-4 py-2">
                <div>
                  <div className="flex justify-center">
                    <Skeleton circle={true} height={50} width={50} />
                  </div>
                  <Skeleton count={1} />
                </div>
              </div>
              <div className="group bg-white shadow-md rounded-md px-4 py-2">
                <div>
                  <div className="flex justify-center">
                    <Skeleton circle={true} height={50} width={50} />
                  </div>
                  <Skeleton count={1} />
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="grid grid-cols-8 md:grid-cols-6 sm:hidden xls:hidden xms:hidden xs:hidden xms:grid-cols-2 xs:grid-cols-2 pb-3">
                {categoryData?.map((item, index) => (
                  <Link href={`${item?.slug}`} key={index}>
                    <div className={`group bg-white md:hidden block `}>
                      <div className="pt-4 items-center justify-center cursor-pointer">
                        <div>
                          <div className="h-[80px] w-[80px] flex justify-center items-center mx-auto">
                            <Image
                              width={100}
                              height={100}
                              src={`${hostname}/${item?.image}`}
                              className="h-[50px] w-[50px] object-contain group-hover:scale-110 ease-in-out duration-500 rounded-full"
                              alt="category"
                            />
                          </div>
                          <div className="p-2">
                            {item?.name?.length > 22 ? (
                              <p className="text-xs font-semibold tracking-wider text-black text-center capitalize">
                                {item?.name.substring(0, 22) + "...."}
                              </p>
                            ) : (
                              <p className="text-xs tracking-wider font-semibold text-black text-center capitalize">
                                {item?.name}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={`group bg-white md:block hidden `}>
                      <div className="pt-4 items-center justify-center cursor-pointer">
                        <div>
                          <div className="h-[80px] w-[80px] flex justify-center items-center mx-auto">
                            <img
                              src={`${hostname}/${item?.image}`}
                              className="h-[50px] w-[50px] object-contain group-hover:scale-110 ease-in-out duration-500 rounded-full"
                            />
                          </div>
                          <div className="p-2">
                            {item?.name?.length > 22 ? (
                              <p className="text-xs tracking-wider font-semibold text-black text-center capitalize">
                                {item?.name.substring(0, 22) + "...."}
                              </p>
                            ) : (
                              <p className="text-xs tracking-wider font-semibold text-black text-center capitalize">
                                {item?.name}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="hidden sm:block xls:block xms:block xs:block overflow-y-auto">
                <div className="flex flex-row pb-3">
                  {cat1?.map((item, index) => (
                    <Link href={`${item?.slug}`} key={index}>
                      <div
                        className={`group bg-white  h-[135px]  w-[130px] xls:w-[115px] xms:w-[100px] xs:w-[88px] `}
                      >
                        <div className="pt-4 items-center justify-center cursor-pointer">
                          <div>
                            <div className="h-[80px] xls:h-[70px] xms:h-[60px] xs:h-[60px] w-[80px]  flex justify-center items-center mx-auto">
                              <img
                                src={`${hostname}/${item?.image}`}
                                className="h-[50px] w-[50px] object-contain group-hover:scale-110 ease-in-out duration-500"
                              />
                            </div>
                            <div className="p-2 ">
                              {item?.name?.length > 22 ? (
                                <p className="text-xs tracking-wider font-semibold text-black text-center capitalize">
                                  {item?.name.substring(0, 22) + "...."}
                                </p>
                              ) : (
                                <p className="text-xs tracking-wider font-semibold text-black text-center capitalize">
                                  {item?.name}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="flex flex-row">
                  {cat2?.map((item, index) => (
                    <Link href={`${item?.slug}`} key={index}>
                      <div
                        className={`group bg-white border-r border-t border-[#e2e2e2] w-[130px] ${
                          index <= 7 ? "border-b" : ""
                        }`}
                      >
                        <div className="pt-4 items-center justify-center cursor-pointer">
                          <div>
                            <div className="h-[80px] w-[80px] flex justify-center items-center mx-auto">
                              <img
                                src={`${hostname}/${item?.image}`}
                                className="h-[50px] w-[50px] object-contain group-hover:scale-110 ease-in-out duration-500"
                              />
                            </div>
                            <div className="p-2">
                              {item?.name?.length > 22 ? (
                                <p className="text-xs tracking-wider text-black text-center font-semibold capitalize">
                                  {item?.name.substring(0, 22) + "...."}
                                </p>
                              ) : (
                                <p className="text-xs tracking-wider font-semibold text-black text-center capitalize">
                                  {item?.name}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* <div className="xxl:hidden xl:hidden lg:hidden md:hidden sm:hidden">
          <div className="relative px-3">
            <Swiper
              slidesPerView={1}
              spaceBetween={20}
              navigation={{
                nextEl: ".button-next-slide",
                prevEl: ".button-prev-slide",
              }}
              modules={[Navigation]}
            >
              {categoryData?.map((item, index) => (
                <Link href={`${item?.slug}`} key={index}>
                  <SwiperSlide>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="group bg-white shadow-md rounded-md">
                        <div className="pt-4 items-center justify-center cursor-pointer">
                          <div>
                            <div className="h-[80px] w-[80px] flex justify-center items-center mx-auto rounded-full bg-gray-50">
                              <img
                                src={`${hostname}/${item?.image}`}
                                className="h-[50px] w-[50px] object-contain group-hover:scale-110 ease-in-out duration-500"
                              />
                            </div>
                            <div className="p-2">
                              {item?.name?.length > 12 ? (
                                <p className="text-sm  text-black text-center capitalize">
                                  {item?.name.substring(0, 12) + "...."}
                                </p>
                              ) : (
                                <p className="text-sm  text-black text-center capitalize">
                                  {item?.name}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                    </div>
                  </SwiperSlide>
                </Link>
              ))}

              <div className="button-prev-slide w-[30px] h-[30px] rounded-full shadow-xl drop-shadow-lg hover:scale-150 transition duration-200 bg-slate-50 text-black grid place-items-center absolute top-[47%] z-10 left-[2px] cursor-pointer">
                <BiLeftArrowAlt size={20} className="text-primary" />
              </div>

              <div className="button-next-slide w-[30px] h-[30px] rounded-full shadow-xl drop-shadow-lg hover:scale-150 transition duration-200 bg-slate-50 text-black grid place-items-center absolute top-[47%] z-10 right-[-2px] cursor-pointer">
                <BiRightArrowAlt size={20} className="text-primary" />
              </div>
            </Swiper>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default SubCategory;

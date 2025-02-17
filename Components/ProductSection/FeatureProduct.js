import {
  MdOutlineFeaturedPlayList,
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import Skeleton from "react-loading-skeleton";
import { Autoplay, Navigation } from "swiper";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard from "./ProductCard";
import Link from "next/link";

const FeatureProduct = ({ loading, data }) => {
  return (
    <div className=" rounded-md pt-2">
      <div className="flex justify-between p-2">
        <div className="flex items-center">
          {/* <button className="font-semibold text-white px-1 py-1 bg-primary rounded-md text-sm tracking-wider flex items-center space-x-2">
            <MdOutlineFeaturedPlayList color="#fff" size={20} />
          </button> */}
          <span className="font-bold pl-2 text-lg xls:text-sm xms:text-sm xs:text-xs tracking-wider capitalize text-white">
            Feature Products
          </span>
        </div>

        <Link href="/feature-products">
          <span className="font-medium px-4 py-1  text-black bg-white text-sm bg-primary rounded-full">
            See all
          </span>
        </Link>
      </div>

      <div>
        {loading ? (
          <div className="grid grid-cols-3 md:grid-cols-2 sm:grid-cols-3 xls:grid-cols-2 xms:grid-cols-2 xs:grid-cols-1 gap-5 xms:gap-3 p-2">
            <div className="shadow-md p-2">
              <div>
                <Skeleton height={200} />
              </div>
              <Skeleton count={3} />
            </div>
            <div className="shadow-md p-2">
              <div>
                <Skeleton height={200} />
              </div>
              <Skeleton count={3} />
            </div>
            <div className="shadow-md p-2">
              <div>
                <Skeleton height={200} />
              </div>
              <Skeleton count={3} />
            </div>
          </div>
        ) : (
          <div className="relative px-5 pb-4 xms:px-0 xs:px-0 xls:px-0">
            <Swiper
              slidesPerView={3}
              spaceBetween={20}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              navigation={{
                nextEl: ".button-next-slide",
                prevEl: ".button-prev-slide",
              }}
              modules={[Autoplay, Navigation]}
              breakpoints={{
                270: {
                  slidesPerView: 2.3,
                  spaceBetween: 9,
                },

                320: {
                  slidesPerView: 2.3,
                  spaceBetween: 9,
                },

                375: {
                  slidesPerView: 2.2,
                  spaceBetween: 10,
                },

                425: {
                  slidesPerView: 2.3,
                  spaceBetween: 15,
                },

                480: {
                  slidesPerView: 2.5,
                  spaceBetween: 18,
                },
                768: {
                  slidesPerView: 3.5,
                  spaceBetween: 18,
                },
                1024: {
                  slidesPerView: 4.5,
                  spaceBetween: 18,
                },
                1150: {
                  slidesPerView: 5,
                  spaceBetween: 18,
                },
                1440: {
                  slidesPerView: 5.5,
                  spaceBetween: 18,
                },
              }}
            >
              {data?.featureProducts?.map((item, index) => (
                <SwiperSlide key={index}>
                  <div className="p-3 my-2 rounded-md bg-white">
                    <ProductCard item={item} />
                  </div>
                </SwiperSlide>
              ))}

              <button className="button-prev-slide w-[30px] h-[30px] rounded-full shadow-xl drop-shadow-lg hover:scale-150 transition duration-200 bg-slate-50 text-black grid place-items-center absolute top-[47%] z-10 left-[2px] cursor-pointer">
                <MdOutlineKeyboardArrowLeft
                  size={20}
                  className="text-primary"
                />
              </button>

              <button className="button-next-slide w-[30px] h-[30px] rounded-full shadow-xl drop-shadow-lg hover:scale-150 transition duration-200 bg-slate-50 text-black grid place-items-center absolute top-[47%] z-10 right-[-2px] cursor-pointer">
                <MdOutlineKeyboardArrowRight
                  size={20}
                  className="text-primary"
                />
              </button>
            </Swiper>{" "}
          </div>
        )}
      </div>
    </div>
  );
};

export default FeatureProduct;

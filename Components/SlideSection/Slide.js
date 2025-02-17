import { hostname } from "@/lib/config";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Autoplay, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";

const Slide = ({ slider, loading }) => {
  const [slide, setSlide] = useState([]);

  // console.log("slider....", slider);

  useEffect(() => {
    setSlide(slider?.settingData?.sliderImgs);
  }, [slider]);

  console.log("slide....", slide);

  return (
    <div>
      {loading ? (
        <SkeletonTheme>
          <p>
            <Skeleton height={400} />
          </p>
        </SkeletonTheme>
      ) : (
        <div className="relative">
          <Swiper
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={{
              nextEl: ".button-next-slide",
              prevEl: ".button-prev-slide",
            }}
            modules={[Autoplay, Pagination, Navigation]}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 1,
              },
              1024: {
                slidesPerView: 1,
              },
              1440: {
                slidesPerView: 1,
              },
            }}
          >
            {slide?.map((item, index) => (
              <div key={index}>
                <SwiperSlide>

                  <div className=" relative h-[400px] md:h-auto sm:h-auto xls:h-auto xms:h-auto xs:h-auto w-full">
                  <Link href={item?.url} passHref >
                    <Image
                      width={1200}
                      height={700}
                      src={`${hostname}/${item?.image}`}
                      className="object-contain h-auto w-full rounded-lg  "
                      alt="slider"
                    />
                  </Link>
                  </div>
                
                </SwiperSlide>
              </div>
            ))}
            <div className="button-prev-slide w-[30px] h-[30px] rounded-full  bg-slate-50 text-black grid place-items-center absolute top-[47%] z-10 left-[20px] cursor-pointer">
              <MdOutlineKeyboardArrowLeft size={20} className="text-primary" />
            </div>
            <div className="button-next-slide w-[30px] h-[30px] rounded-full bg-slate-50 text-black grid place-items-center absolute top-[47%] z-10 right-[20px] cursor-pointer">
              <MdOutlineKeyboardArrowRight size={20} className="text-primary" />
            </div>
          </Swiper>
        </div>
      )}
    </div>
  );
};

export default Slide;

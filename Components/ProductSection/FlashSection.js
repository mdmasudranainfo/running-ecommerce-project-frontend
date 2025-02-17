import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import ProductCard from "./ProductCard";
import { AiOutlineThunderbolt } from "react-icons/ai";
import Link from "next/link";
import CountdownTimer from "../CountdownTimer";
import request from "@/lib/request";

const FlashSection = ({ data }) => {
  console.log(data);

  const [diffTimes, setDiffTimes] = useState();

  const [currentDate, setCurrentDate] = useState(Date.now());

  useEffect(() => {
    const intervalID = setInterval(() => {
      setCurrentDate(Date.now());
    }, 1000);

    return () => {
      clearInterval(intervalID);
    };
  }, []);

  useEffect(() => {
    if (
      currentDate <= new Date(data?.settingData?.flashTime?.endTime).getTime()
    ) {
      if (data?.settingData?.flashTime) {
        let endTime = new Date(data?.settingData?.flashTime?.endTime).getTime();

        let diffTime = endTime - currentDate;

        setDiffTimes(diffTime);
      }
    } else if (
      currentDate > new Date(data?.settingData?.flashTime?.endTime).getTime()
    ) {
      const checkFlashDeal = async () => {
        const res = await request(`flashdeal/check-flashdeal`);
        if (res?.success) {
          window.location.reload();
        }
      };
      checkFlashDeal();
    }
  }, [data?.settingData?.flashTime, currentDate]);

  return (
    <div className="border border-gray-100 mt-5 pb-4 bg-white rounded-md p-3">
      <div className="flex justify-between p-2">
        <div className="flex items-center">
          <button className="font-semibold text-white px-1 py-1 bg-primary rounded-md text-sm tracking-wider flex items-center space-x-2">
            <AiOutlineThunderbolt color="#fff" size={20} />
          </button>

          <span className="font-bold pl-2 text-lg xls:text-sm xms:text-sm xs:text-xs tracking-wider capitalize text-black">
            Flash Deal
          </span>

          <div className="xls:hidden xms:hidden xs:hidden sm:block md:block lg:block xl:block xxl:block">
            <CountdownTimer countdown={diffTimes} />
          </div>
        </div>

        <Link href="/flash-deal">
          <span className="font-medium px-4 py-1  text-white text-sm bg-primary rounded-full">
            See all
          </span>
        </Link>
      </div>

      <div className="xls:block xms:block xs:block hidden">
        <CountdownTimer countdown={diffTimes} />
      </div>

      <div className="grid grid-cols-6 md:grid-cols-4 sm:grid-cols-3 xls:grid-cols-2 xms:grid-cols-2 xs:grid-cols-1 gap-5 xms:gap-3 p-2">
        {data?.flashProducts?.map((item, index) => (
          <div
            className="overflow-hidden items-center justify-center h-full cardFull"
            key={index}
          >
            <ProductCard item={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlashSection;

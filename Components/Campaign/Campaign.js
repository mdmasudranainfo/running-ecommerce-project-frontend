import Image from "next/image";
import React from "react";
import Clock from "../DateCouter/Clock";

const Campaign = () => {
  let deadline = "December, 30, 2024";
  return (
    <div className="p-2">
      <h2 className="text-xl font-bold text-center my-3">Featured Campaigns</h2>

      <div className="grid grid-cols-2 gap-2 overflow-y-scroll h-[170px] sm:h-[170px] md:h-[170px] lg:h-[300px] xl:h-[300px] xxl:h-[300px] no-scrollbar">
        <div className="col-span-2 sm:col-span-1 md:col-span-1  xxl:col-span-1  grid grid-cols-3 p-2 gap-2 items-center shadow border  ">
          <Image
            className="rounded-lg"
            src={"/image/comingsoon.jpg"}
            width={100}
            height={100}
            alt=""
          />

          <div className="col-span-2">
            <div className="flex items-center gap-2">
              <h3 className=" text-[16px]">
                <span className="text-xl font-semibold text-red-600">10% </span>
                Off
              </h3>
              <h4 className="rounded-xl text-primary bg-sky-100 px-2 ">
                Active
              </h4>
            </div>
            <h4 className="uppercase font-bold pb-1">Coming Soon</h4>
            <Clock deadline={deadline} />
          </div>
        </div>
        <div className="col-span-2 sm:col-span-1 md:col-span-1  xxl:col-span-1  grid grid-cols-3 p-2 gap-2 items-center shadow border  ">
          <Image
            className="rounded-lg"
            src={"/image/comingsoon.jpg"}
            width={100}
            height={100}
            alt=""
          />

          <div className="col-span-2">
            <div className="flex items-center gap-2">
              <h3 className=" text-[16px]">
                <span className="text-xl font-semibold text-red-600">10% </span>
                Off
              </h3>
              <h4 className="rounded-xl text-primary bg-sky-100 px-2 ">
                Active
              </h4>
            </div>
            <h4 className="uppercase font-bold pb-1">Coming Soon</h4>
            <Clock deadline={deadline} />
          </div>
        </div>
        <div className="col-span-2 sm:col-span-1 md:col-span-1  xxl:col-span-1  grid grid-cols-3 p-2 gap-2 items-center shadow border  ">
          <Image
            className="rounded-lg"
            src={"/image/comingsoon.jpg"}
            width={100}
            height={100}
            alt=""
          />

          <div className="col-span-2">
            <div className="flex items-center gap-2">
              <h3 className=" text-[16px]">
                <span className="text-xl font-semibold text-red-600">10% </span>
                Off
              </h3>
              <h4 className="rounded-xl text-primary bg-sky-100 px-2 ">
                Active
              </h4>
            </div>
            <h4 className="uppercase font-bold pb-1">Coming Soon</h4>
            <Clock deadline={deadline} />
          </div>
        </div>
        <div className="col-span-2 sm:col-span-1 md:col-span-1  xxl:col-span-1  grid grid-cols-3 p-2 gap-2 items-center shadow border  ">
          <Image
            className="rounded-lg"
            src={"/image/comingsoon.jpg"}
            width={100}
            height={100}
            alt=""
          />

          <div className="col-span-2">
            <div className="flex items-center gap-2">
              <h3 className=" text-[16px]">
                <span className="text-xl font-semibold text-red-600">10% </span>
                Off
              </h3>
              <h4 className="rounded-xl text-primary bg-sky-100 px-2 ">
                Active
              </h4>
            </div>
            <h4 className="uppercase font-bold pb-1">Coming Soon</h4>
            <Clock deadline={deadline} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Campaign;

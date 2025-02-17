import Link from "next/link";

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

import request from "@/lib/request";
import { useRouter } from "next/router";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { FcBriefcase, FcBusiness } from 'react-icons/fc';
import CountDownTimer from "../CountdownTimer";

const ProductSection = ({
  section,
  products,
  sectionName,
  allProducts,
  flashDetails,
}) => {

const router = useRouter();

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
    if (currentDate <= new Date(flashDetails?.endTime).getTime()) {

      if (flashDetails) {
        let endTime = new Date(flashDetails?.endTime).getTime();

        let diffTime = endTime - currentDate;

        setDiffTimes(diffTime);
      }
    } else if (currentDate > new Date(flashDetails?.endTime).getTime()) {
      const checkFlashDeal = async () => {
        const res = await request(`flashdeal/check-flashdeal`);

        if(res?.success){

          window.location.reload();
        }
      };
      checkFlashDeal();
    }
  }, [flashDetails, currentDate]);

  const handleRouter = () =>{
    if (sectionName !== "Flash deal") {
      router.replace(`all-products`);
    } else {
       router.replace(`flash-deal`);
    }
  }
   
  


  return (
    <div className="border border-gray-100 mt-5 pb-4 bg-white rounded-md mb-5">
      <div className="flex justify-between p-2">
        <div className="flex items-center">
          {allProducts ? (
            <span>
              <FcBriefcase size={25} />{" "}
            </span>
          ) : sectionName == `Flash deal` ? (
            <button className="font-semibold text-white px-1 py-1 bg-gradient-to-r from-red-500 via-orange-400 to-red-400 rounded-md text-sm tracking-wider flex items-center space-x-2">
              <AiOutlineThunderbolt color="#fff" size={20} />
            </button>
          ) : (
            <span>
              <FcBusiness size={25} />{" "}
            </span>
          )}

          <span className="font-bold pl-2 text-lg xls:text-sm xms:text-sm xs:text-xs tracking-wider capitalize text-black">
            {section?.name} {sectionName} {allProducts}
          </span>

          <div className="xls:hidden xms:hidden xs:hidden sm:block md:block lg:block xl:block xxl:block">
            {sectionName && (
              <div>
                <CountDownTimer countdown={diffTimes} />
              </div>
            )}
          </div>
        </div>

        <>
          {allProducts && products.length === 18 ? (
            <div onClick={() => handleRouter()}>
              <span className="font-medium px-4 py-1 tracking-wider bg-gray-800 rounded-full text-sm shadow-lg drop-shadow-md text-white cursor-pointer hover:text-gray-800 hover:bg-gray-200 hover:duration-500">
                Show more
              </span>
            </div>
          ) : sectionName == "Flash deal" && products.length === 6 ? (
            <div onClick={() => handleRouter()}>
              <span className="font-medium px-4 py-1 tracking-wider bg-gray-800 rounded-full text-sm shadow-lg drop-shadow-md text-white cursor-pointer hover:text-gray-800 hover:bg-gray-200 hover:duration-500">
                Show more
              </span>
            </div>
          ) : sectionName !== "Flash deal" && products.length === 6 ? (
            <Link href={`/section/${section?.slug}`}>
              <span className="font-medium px-4 py-1 tracking-wider bg-gray-800 rounded-full text-sm shadow-lg drop-shadow-md text-white cursor-pointer hover:text-gray-800 hover:bg-gray-200 hover:duration-500">
                Show more
              </span>
            </Link>
          ) : null}
        </>
      </div>
      <div className="xls:block xms:block xs:block sm:hidden md:hidden lg:hidden xl:hidden xxl:hidden">
        {sectionName && (
          <div>
            <CountDownTimer countdown={diffTimes} />
          </div>
        )}
      </div>
      <div className="grid grid-cols-6 md:grid-cols-4 sm:grid-cols-3 xls:grid-cols-2 xms:grid-cols-2 xs:grid-cols-1 gap-5 xms:gap-3 p-2">
        <>
          {allProducts ? (
            <>
              {" "}
              {products?.map((item, index) => (
                <div key={index} className="h-full">
                  <ProductCard item={item} />
                </div>
              ))}{" "}
            </>
          ) : (
            <>
              {" "}
              {products?.map((item, index) => (
                <div key={index} className="h-full">
                  <ProductCard item={item} />
                </div>
              ))}{" "}
            </>
          )}
        </>
      </div>
    </div>
  );
};

export default ProductSection;

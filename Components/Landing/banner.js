import React,{useState,useEffect} from 'react'
import request from "@/lib/request";
import Image from "next/image";
import { hostname } from '@/lib/config';


const FirstSection = ({eightSectionRef,data}) => {


  const scrollToFifthSection = () => {
    eightSectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };


  return (
    <div>
        <div style={{backgroundColor:data?.backgroundColor}} className="">
        <div className="py-20 grid items-center justify-center px-2">
          <div>
            <div className=" flex items-center justify-center">
              <Image
                className="rounded-2xl drop-shadow-lg "
                src={`${hostname}/${data?.image}`}
                width={700}
                height={600}
                alt={"landing"}
              />
            </div>
            <div className="text-center max-w-6xl text-[30px] font-bold text-white py-8 xs:text-[16px] xms:text-[16px] xls:text-[16px] sm:text-[18px]">
              {data?.title}
            </div>
            <div className="flex items-center justify-center">
              <button onClick={scrollToFifthSection} className="border-[5px] px-3 py-3 w-[300px] rounded-lg text-[24px] font-bold text-white bg-black hover:bg-[#27a734] transition duration-300 transform hover:scale-90">
                {" "}
                অর্ডার করুন
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FirstSection
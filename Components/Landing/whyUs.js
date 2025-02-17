import Image from 'next/image'
import React from 'react'
import { BiSolidChevronRightCircle } from 'react-icons/bi'
import { hostname } from '@/lib/config';


const WhyUs = ({eightSectionRef,data}) => {

    const scrollToFifthSection = () => {
        eightSectionRef.current.scrollIntoView({ behavior: 'smooth' });
      };
  return (
    <div className="mt-[50px]">
        <div style={{backgroundColor:data?.backgroundColor}} className=" py-[40px]">
          <div className="max-w-6xl mx-auto px-2">
            <div className="flex items-center justify-center">
              {data?.title   ? 
              <div className="bg-[#b08020] px-4 py-2 text-[24px] font-bold text-white rounded-3xl xs:text-[16px] xms:text-[16px] xls:text-[16px] sm:text-[18px]">
                {data?.title}
              </div>
              :null}
            </div>
            <div
              style={{ boxShadow: "0 4px 8px 0 #96c9d4, 0 6px 20px 0 #96c9d4" }}
              className="rounded-xl w-full bg-white min-h-[500px] mt-[-25px]"
            >
              <div className="pt-[50px]">
                <div className="grid grid-cols-2 gap-16 px-10 xs:grid-cols-1 xms:grid-cols-1 xls:grid-cols-1 sm:grid-cols-1">
                  <div className="col-span-1 rounded-2xl">
                    
                    <div className="">
                      <Image
                        className="rounded-2xl drop-shadow-lg "
                        src={`${hostname}/${data?.image}`}
                        width={400}
                        height={400}
                        alt={"landing"}
                      />
                    </div>
                  </div>
                  <div className="col-span-1 grid items-center justify-center">
                    {data?.text.map((item,index)=>
                    <div key={index} className="flex items-center border-b py-2">
                      <div className="text-[24px] mr-[5px] text-[#b08020] xs:text-[16px] xms:text-[16px] xls:text-[16px] sm:text-[18px]">
                        <BiSolidChevronRightCircle />
                      </div>
                      <div className="text-[22px] font-bold text-[#b08020] xs:text-[16px] xms:text-[16px] xls:text-[16px] sm:text-[18px]">
                        {item}
                      </div>
                    </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center py-[40px] xs:px-2">
                <button
                onClick={scrollToFifthSection}
                  style={{
                    boxShadow: "0 4px 8px 0 #1234, 0 6px 20px 0 #1234",
                  }}
                  className="border-[5px] border-white px-3 py-3 w-[300px] rounded-lg text-[24px] font-bold text-white bg-black hover:bg-[#27a734] transition duration-300 transform hover:scale-90 xs:text-[16px] xms:text-[16px] xls:text-[16px] sm:text-[18px]"
                >
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

export default WhyUs
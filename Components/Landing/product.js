import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { hostname } from '@/lib/config';


const Product = ({eightSectionRef,data}) => {
  return (
    <div className="mt-[30px]">
    <div
      style={{
        background: `${data?.backgroundColor} || linear-gradient(180deg, #c7c7c7 20%, #E1111D 100%)`,
      }}
      className="min-h-[550px] px-2"
    >
      <div className="flex items-center justify-center pt-[50px]">
        {data.title  ?
        <div className="bg-[#b08020] px-4 py-2 text-[26px] font-bold text-white rounded-3xl xs:text-[16px] xms:text-[16px] xls:text-[16px] sm:text-[18px]">
          {data?.title}
        </div>
        :null}
      </div>
      <div className="flex items-center justify-center py-10">
        {data?.images.length > 0 ? 
        <div className="grid grid-cols-3 gap-8 xs:grid-cols-1 xms:grid-cols-1 xls:grid-cols-1 sm:grid-cols-1">
          {data?.images?.map((item,index)=>
          <div key={index} className="col-span-1">
            <div className="relative z-10">
              <Image
                className="rounded-2xl drop-shadow-lg "
                src={`${hostname}/${item?.url}`}
                width={350}
                height={350}
                alt={"landing"}
              />
              <div className="absolute top-0 left-[30%] z-20 bg-[#b08020] py-1 px-2 rounded-bl-md rounded-br-md text-white md:left-[25%]">
                {item?.name}
              </div>
            </div>
          </div>
          )}
        </div>
        :<div>Product Not found</div>}
      </div>
      <div className="flex items-center justify-center py-3">
        <Link href="https://lazma.com/" target="_blank">
          <button  className="border-[5px] px-3 py-3 w-[300px] rounded-lg text-[24px] font-bold text-white bg-black hover:bg-[#27a734] transition duration-300 transform hover:scale-90">
            {" "}
            ভিজিট করুন
          </button>
          </Link>
        </div>
    </div>
  </div>
  )
}

export default Product

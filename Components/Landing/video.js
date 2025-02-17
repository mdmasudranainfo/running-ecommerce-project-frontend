import Image from 'next/image'
import React from 'react'
import { hostname } from '@/lib/config'
import Link from 'next/link'
import ReactPlayer from 'react-player'

const Video = ({data,eightSectionRef}) => {
  return (
    <div className="mt-[50px]">
    <div
      style={{
        backgroundColor: data?.backgroundColor,
      }}
      className="min-h-[550px] px-2"
    >
      <div className="flex items-center justify-center pt-[50px]">
        
          <div className="bg-[#b08020] px-4 py-2 text-[26px] font-bold text-white rounded-3xl xs:text-[16px] xms:text-[16px] xls:text-[16px] sm:text-[18px]">
            {data?.title}
          </div>
        
      </div>
      <div className="flex items-center justify-center py-10">
        {data?.links.length > 0 ? (
          <div className="grid grid-cols-3 gap-8 xs:grid-cols-1 xms:grid-cols-1 xls:grid-cols-1 sm:grid-cols-1">
            {data?.links?.map((item, index) => (
              <div key={index} className="col-span-1">
                <ReactPlayer
              url={`${item}`}
              width="100%"
              height="300px"
              volume={1}
              controls
          />
              </div>
            ))}
          </div>
        ) : (
          <div>Video Not found</div>
        )}
      </div>
      <div className="flex items-center justify-center py-3">
        <Link href="https://lazma.com/" target="_blank">
          <button className="border-[5px] px-3 py-3 w-[300px] rounded-lg text-[24px] font-bold text-white bg-black hover:bg-[#27a734] transition duration-300 transform hover:scale-90">
            {" "}
            ভিজিট করুন
          </button>
        </Link>
      </div>
    </div>
  </div>
  )
}

export default Video
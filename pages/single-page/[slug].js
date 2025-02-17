import React, { useState, useEffect,useRef } from "react";
import Header from '@/Components/Landing/header'
import { useRouter } from "next/router";
import request from "@/lib/request";
import Banner from '@/Components/Landing/banner'
import Video from '@/Components/Landing/video'
import Product from '@/Components/Landing/product'
import WhyUs from "@/Components/Landing/whyUs";



const Products = ({data}) => {
  const router = useRouter();
  const { slug } = router?.query;
  const eightSectionRef = useRef(null);


  return (
    <div style={{backgroundColor:data?.backgroundColor}} className={`z-0 `}>
       
       {data?.header?.text?.isActive && <Header data={data?.header}/>}
       {data?.banner?.isActive && <Banner data={data?.banner} eightSectionRef={eightSectionRef}/>}
       {data?.video?.isActive && <Video data={data?.video} eightSectionRef={eightSectionRef}/>}
       {data?.product?.isActive && <Product data={data?.product} eightSectionRef={eightSectionRef}/>}
       {data?.whyUs?.isActive && <WhyUs data={data?.whyUs} eightSectionRef={eightSectionRef}/>}
       

       
      {/* <FirstSection  eightSectionRef={eightSectionRef}/> */}
      {/* <SecondSection /> */}
      {/* <ThirdSection eightSectionRef={eightSectionRef}/> */}
      {/* <FourthSection eightSectionRef={eightSectionRef}/> */}
      {/* <FifthSection eightSectionRef={eightSectionRef}/> */}
      {/* <SixthSection/> */}
      {/* <EightSection eightSectionRef={eightSectionRef}/> */}
      {/* <DemoNine eightSectionRef={eightSectionRef}/> */}
      

    </div>
  );
};

export default Products;



export async function getServerSideProps(context) {
  let page = 1;

  let res = await request(
    `landingPage/page-detail-customer/${context.query.slug}`
  );

  return {
    props: {
      data: res?.data || null,
     
    },
  };
}
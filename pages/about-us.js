import request from "@/lib/request";
import React from "react";

const AboutUs = ({ data }) => {
  return (
    <div className="bg-white min-h-[600px] pt-20 xls:pt-0 xms:pt-0 xs:pt-0">
      <section>
        <div className="container px-6 xls:px-0 xms:px-0 xs:px-0 py-10 mx-auto">
          <h1 className="text-4xl xls:text-2xl xms:text-2xl xs:text-2xl font-semibold text-center text-black dark:text-black">
            About Us
          </h1>
          <div className="py-4 pt-5">
            <p
              className="text-base dark:text-black text-justify"
              dangerouslySetInnerHTML={{ __html: data }}
            ></p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;

export async function getStaticProps(context) {
  let settings = await request(`setting/pages-view`);

  return {
    props: {
      data: settings?.data?.pages?.aboutUs || null,
    },
    revalidate: 5,
  };
}

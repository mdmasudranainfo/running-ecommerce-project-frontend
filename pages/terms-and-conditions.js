import request from "@/lib/request";
import React from "react";

const TermsAndConditions = ({ data }) => {
  return (
    <div className="bg-white min-h-[670px] pt-20 xls:pt-0 xms:pt-0 xs:pt-0">
      <section>
        <div className="container px-6 py-10 mx-auto">
          <h1 className="text-4xl xls:text-2xl xms:text-2xl xs:text-2xl font-semibold text-center text-black dark:text-black">
            Terms and conditions
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

export default TermsAndConditions;

export async function getStaticProps(context) {
  let settings = await request(`setting/pages-view`);

  return {
    props: {
      data: settings?.data?.pages?.termsAndConditions || null,
    },
    revalidate: 5,
  };
}

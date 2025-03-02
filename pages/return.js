import { useStatus } from "@/context/contextStatus";
import { hostname } from "@/lib/config";
import request from "@/lib/request";
import Head from "next/head";
import React from "react";

const Return = ({ data }) => {
  const {
    shopName,

    Favicon,
  } = useStatus();
  return (
    <>
      <Head>
        <title>{shopName}</title>
        <meta name="description" content={shopName} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={`${hostname}/${Favicon}`} />
        <link
          href="https://fonts.googleapis.com/css2?family=Baloo+Da+2:wght@400..800&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className="bg-white min-h-[670px] pt-20 xls:pt-0 xms:pt-0 xs:pt-0">
        <section>
          <div className="container px-6 py-10 mx-auto">
            <h1 className="text-4xl xls:text-2xl xms:text-2xl xs:text-2xl font-semibold text-center text-black dark:text-black">
              Return & refund
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
    </>
  );
};

export default Return;

export async function getStaticProps(context) {
  let settings = await request(`setting/pages-view`);

  return {
    props: {
      data: settings?.data?.pages?.returned || null,
    },
    revalidate: 5,
  };
}

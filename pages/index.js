import Category from "@/Components/CategorySection/Category";
import SubCategory from "@/Components/CategorySection/SubCategory";
import CountdownTimer from "@/Components/CountdownTimer";
import BestProduct from "@/Components/ProductSection/BestProduct";
import FeatureProduct from "@/Components/ProductSection/FeatureProduct";
import FlashSection from "@/Components/ProductSection/FlashSection";
import NewProduct from "@/Components/ProductSection/NewProduct";
import ProductCard from "@/Components/ProductSection/ProductCard";
import Slide from "@/Components/SlideSection/Slide";
import { useStatus } from "@/context/contextStatus";
import { hostname } from "@/lib/config";
import request from "@/lib/request";
import { Inter } from "@next/font/google";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { setCookie } from "nookies";
import { useContext, useEffect, useState } from "react";
import { MdCategory } from "react-icons/md";
import Skeleton from "react-loading-skeleton";
import { project_name } from "@/lib/config";
import Campaign from "@/Components/Campaign/Campaign";

// import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const {
    shopName,
    Logo,
    Favicon,
    loading,
    setLoading,
    setPopUpImage,
    setInside,
    setOutside,
    setUserPhone,
  } = useStatus();

  // slider data
  const sliderData = [
    {
      id: 1,
      title: "Electronics",
      subtitle: "Discover the latest trends",
      image: "/images/slider/1.jpg",
    },
    {
      id: 1,
      title: "Electronics",
      subtitle: "Discover the latest trends",
      image: "/images/slider/1.jpg",
    },
    {
      id: 1,
      title: "Electronics",
      subtitle: "Discover the latest trends",
      image: "/images/slider/1.jpg",
    },
  ];

  const [data, setData] = useState({});
  // dami data
  const categories = [
    { id: 1, name: "Electronics", icon: <MdCategory /> },
    { id: 2, name: "Clothing", icon: <MdCategory /> },
    { id: 3, name: "Home & Garden", icon: <MdCategory /> },
    { id: 4, name: "Sports & Outdoors", icon: <MdCategory /> },
    { id: 5, name: "Books & Stationery", icon: <MdCategory /> },
    { id: 6, name: "Beauty & Health", icon: <MdCategory /> },
    { id: 7, name: "Kids & Baby", icon: <MdCategory /> },
    { id: 8, name: "Toys & Games", icon: <MdCategory /> },
    { id: 9, name: "Travel & Lifestyle", icon: <MdCategory /> },
  ];

  const [categoryData, setCategoryData] = useState();

  const [bannerTwo, setBannerTwo] = useState(null);

  const [categoryOne, setCategoryOne] = useState({});

  const [categoryTwo, setCategoryTwo] = useState({});

  const [catLoading, setCatLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const getHome = async () => {
      const res = await request(`home/fetch-products?inWhere=web`);
      setLoading(false);
      setData(res?.data);
      setPopUpImage(res?.data?.settingData?.popupImg);

      setCookie(null, "userPhone", res?.data?.settingData?.phone, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
      setUserPhone(res?.data?.settingData?.phone);
    };
    getHome();
  }, []);

  useEffect(() => {
    if (router?.pathname == "/") {
      setLoading(true);
      setCatLoading(true);
    }
  }, [router?.pathname]);

  useEffect(() => {
    const getData = async () => {
      let res = await request(`category/fetch-all`);
      setCategoryData(res?.data);
      setCatLoading(false);
    };
    getData();
  }, []);

  useEffect(() => {
    if (data?.category1) {
      setCategoryOne(data?.category1);
    } else {
      setCategoryOne({});
    }

    if (data?.category2) {
      setCategoryTwo(data?.category2);
    } else {
      setCategoryTwo({});
    }
  }, [data]);

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

      <main
        className={` bg-[#FCFCFC] pt-[90px] lg:pt-[120px] md:pt-[120px] sm:pt-[90px] xls:pt-[90px] xms:pt-[90px] xs:pt-90px]`}
      >
        <div className="max-w-7xl md:max-w-[62rem] sm:max-w-[47rem] xls:max-w-[25rem] xms:max-w-[22rem] xs:max-w-[19rem] mx-auto">
          <div className="grid grid-cols-12 sm:grid-cols-1 w-full bg-white rounded-md gap-2">
            <div className="col-span-2 md:col-span-3 sm:hidden xls:hidden xms:hidden xs:hidden rounded-md shadow">
              <Category category={categoryData} catLoading={catLoading} />
            </div>
            <div className="col-span-10 md:col-span-9 sm:col-span-full xls:col-span-full xms:col-span-full xs:col-span-full ">
              <Slide slider={data} loading={loading} />
            </div>
            {/* <div className="lg:col-span-3 xl:col-span-3 xxl:col-span-3 col-span-full border shadow rounded-lg ">
              <Campaign />
            </div> */}
          </div>

          <div>
            <SubCategory categoryData={data?.categoryData} loading={loading} />
          </div>

          {loading ? (
            <div className="grid grid-cols-6 md:grid-cols-4 sm:grid-cols-3 xls:grid-cols-2 xms:grid-cols-2 xs:grid-cols-1 gap-5 xms:gap-3 p-4 mt-4 rounded-md bg-white">
              <div className="shadow-md p-2">
                <div>
                  <Skeleton height={100} />
                </div>
                <Skeleton count={3} />
              </div>
              <div className="shadow-md p-2">
                <div>
                  <Skeleton height={100} />
                </div>
                <Skeleton count={3} />
              </div>
              <div className="shadow-md p-2">
                <div>
                  <Skeleton height={100} />
                </div>
                <Skeleton count={3} />
              </div>
              <div className="shadow-md p-2">
                <div>
                  <Skeleton height={100} />
                </div>
                <Skeleton count={3} />
              </div>
              <div className="shadow-md p-2">
                <div>
                  <Skeleton height={100} />
                </div>
                <Skeleton count={3} />
              </div>
              <div className="shadow-md p-2">
                <div>
                  <Skeleton height={100} />
                </div>
                <Skeleton count={3} />
              </div>
            </div>
          ) : (
            <>
              {data?.flashProducts?.length > 0 ? (
                <FlashSection data={data} />
              ) : null}
            </>
          )}

          {data?.settingData?.featureBanner ? (
            <>
              {loading ? (
                <div className="rounded-md py-4">
                  <Skeleton height={150} />
                </div>
              ) : (
                <div className=" rounded-t-lg overflow-hidden mt-5">
                  <img
                    src={`${hostname}/${data?.settingData?.featureBanner?.one}`}
                    className="w-screen max-h-[350px] xls:h-auto xms:h-auto xs:h-auto"
                    alt="hero"
                  />
                </div>
              )}
            </>
          ) : null}

          <div className="bg-secondary rounded-b-lg">
            <div className="grid grid-cols-1 xls:grid-cols-1 xms:grid-cols-1 xs:grid-cols-1 gap-x-5 mb-3 xls:gap-x-3">
              {data?.featureProducts?.length > 0 && (
                <FeatureProduct loading={loading} data={data} />
              )}

              {data?.newProducts?.length > 0 && (
                <NewProduct loading={loading} data={data} />
              )}
            </div>
          </div>

          {/* {data?.settingData?.featureBanner ? (
            <>
              {loading ? (
                <div className="rounded-md py-4">
                  <Skeleton height={150} />
                </div>
              ) : (
                <div>
                  <img
                    src={`${hostname}/${data?.settingData?.featureBanner?.one}`}
                    className="w-screen max-h-[350px] xls:h-auto xms:h-auto xs:h-auto"
                    alt="hero"
                  />
                </div>
              )}
            </>
          ) : null} */}

          <>
            {loading ? (
              <div className="border border-gray-100 mt-5 pb-4 bg-white rounded-md mb-5 p-3 ">
                <div className="flex justify-between p-2">
                  <div>
                    <span className="font-medium px-4 py-1  text-blue-500 underline">
                      <Skeleton count={1} />
                    </span>
                  </div>

                  <div>
                    <span className="font-medium px-4 py-1  text-blue-500 underline">
                      <Skeleton count={1} />
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-6 md:grid-cols-4 sm:grid-cols-3 xls:grid-cols-2 xms:grid-cols-2 xs:grid-cols-1 gap-5 xms:gap-3 p-2">
                  <>
                    <div className="shadow-md p-2">
                      <div>
                        <Skeleton height={100} />
                      </div>
                      <Skeleton count={3} />
                    </div>
                    <div className="shadow-md p-2">
                      <div>
                        <Skeleton height={100} />
                      </div>
                      <Skeleton count={3} />
                    </div>
                    <div className="shadow-md p-2">
                      <div>
                        <Skeleton height={100} />
                      </div>
                      <Skeleton count={3} />
                    </div>
                    <div className="shadow-md p-2">
                      <div>
                        <Skeleton height={100} />
                      </div>
                      <Skeleton count={3} />
                    </div>
                    <div className="shadow-md p-2">
                      <div>
                        <Skeleton height={100} />
                      </div>
                      <Skeleton count={3} />
                    </div>
                    <div className="shadow-md p-2">
                      <div>
                        <Skeleton height={100} />
                      </div>
                      <Skeleton count={3} />
                    </div>
                  </>
                </div>
              </div>
            ) : (
              <>
                {Object.keys(categoryOne)?.length > 0 ? (
                  <div className="border border-gray-100 mt-3 pb-4 bg-white rounded-lg shadow mb-3 p-3 xls:p-0 xms:p-0 xs:p-0">
                    <div className="grid grid-cols-12 xls:grid-cols-2 xms:grid-cols-2 xs:grid-cols-2 mb-2 xxl:p-0 xl:p-0 lg:p-0 md:p-0 sm:p-0 p-2">
                      <div className="flex items-center col-span-3 xls:col-span-1 xms:col-span-1 xs:col-span-1">
                        <button className="font-semibold text-white px-1 py-1 bg-primary rounded-md text-sm tracking-wider flex items-center space-x-2">
                          <MdCategory color="#fff" size={20} />
                        </button>
                        <p className="font-bold pl-2 text-lg xls:text-sm xms:text-sm xs:text-xs tracking-wider capitalize text-black">
                          {categoryOne?.name}
                        </p>
                      </div>

                      {categoryOne?.children?.length > 0 ? (
                        <div className="flex space-x-2 justify-center items-center col-span-6  xls:hidden xms:hidden xs:hidden">
                          {categoryOne?.children?.map((item, index) => (
                            <Link href={`/${item?.slug}`} key={index}>
                              <p className="text-xs shadow-md bg-gray-200 px-3 py-1 rounded-full text-black whitespace-nowrap">
                                {item?.name}
                              </p>
                            </Link>
                          ))}
                        </div>
                      ) : (
                        <div className="xls:hidden xms:hidden xs:hidden col-span-6"></div>
                      )}

                      <div className="flex justify-end col-span-3 xls:col-span-1 xms:col-span-1 xs:col-span-1">
                        <Link
                          className="font-medium px-4 py-1 text-sm bg-primary text-white rounded-full"
                          href={`/${categoryOne?.slug}`}
                        >
                          See all
                        </Link>
                      </div>
                      {categoryOne?.children?.length > 0 ? (
                        <div className="hidden  xls:flex xms:flex xs:flex space-x-2 justify-center xls:justify-start xms:justify-start xs:justify-start xls:pt-1 xms:pt-1 xs:pt-1 items-center col-span-6 xls:col-span-full xms:col-span-full xs:col-span-full xxl:hidden xl:hidden lg:hidden md:hidden sm:hidden overflow-x-auto pb-2">
                          {categoryOne?.children?.map((item, index) => (
                            <Link href={`/${item?.slug}`} key={index}>
                              <p className="text-xs shadow-md bg-gray-200 px-3 py-1 rounded-full text-black whitespace-nowrap">
                                {item?.name}
                              </p>{" "}
                            </Link>
                          ))}
                        </div>
                      ) : (
                        <div className="hidden  xls:flex xms:flex xs:flex"></div>
                      )}
                    </div>

                    <div className="grid grid-cols-6 md:grid-cols-4 sm:grid-cols-3 xls:grid-cols-2 xms:grid-cols-2 xs:grid-cols-2 gap-5 xms:gap-3 xs:gap-2 xls:gap-3 p-2 xls:p-0 xms:p-0 xs:p-0">
                      {categoryOne?.products?.map((item, index) => (
                        <div
                          className="overflow-hidden items-center justify-center h-full cardFull rounded-md"
                          key={index}
                        >
                          <ProductCard item={item} />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </>
            )}
          </>

          {Object.keys(categoryTwo)?.length > 0 ? (
            <div className="border border-gray-100 mt-3 pb-4 mb-3  bg-white rounded-md p-3 xls:p-0 xms:p-0 xs:p-0">
              <div className="grid grid-cols-12 xls:grid-cols-2 xms:grid-cols-2 xs:grid-cols-2 p-2 xxl:p-0 xl:p-0 lg:p-0 md:p-0 sm:p-0 mb-2">
                <div className="flex items-center col-span-3 xls:col-span-1 xms:col-span-1 xs:col-span-1">
                  <button className="font-semibold text-white px-1 py-1 bg-primary rounded-md text-sm tracking-wider flex items-center space-x-2">
                    <MdCategory color="#fff" size={20} />
                  </button>
                  <p className="font-bold pl-2 text-lg xls:text-sm xms:text-sm xs:text-xs tracking-wider capitalize text-black">
                    {categoryTwo?.name}
                  </p>
                </div>

                {categoryTwo?.children?.length > 0 ? (
                  <div className="flex space-x-2 justify-center items-center col-span-6  xls:hidden xms:hidden xs:hidden">
                    {categoryTwo?.children?.map((item, index) => (
                      <Link
                        href={`/${item?.slug}`}
                        key={index}
                        className="text-xs shadow-md bg-gray-200 px-3 py-1 rounded-full text-black whitespace-nowrap overflow-hidden"
                      >
                        {item?.name}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="xls:hidden xms:hidden xs:hidden col-span-6"></div>
                )}

                <div className="flex justify-end col-span-3 xls:col-span-1 xms:col-span-1 xs:col-span-1">
                  <Link
                    className="font-medium px-4 py-1 text-sm bg-primary text-white rounded-full"
                    href={`/${categoryTwo?.slug}`}
                  >
                    See all
                  </Link>
                </div>
                {categoryTwo?.children?.length > 0 ? (
                  <div className="hidden  xls:flex xms:flex xs:flex space-x-2 justify-center xls:justify-start xms:justify-start xs:justify-start xls:pt-1 xms:pt-1 xs:pt-1 items-center col-span-6 xls:col-span-full xms:col-span-full xs:col-span-full xxl:hidden xl:hidden lg:hidden md:hidden sm:hidden overflow-x-auto pb-2">
                    {categoryTwo?.children?.map((item, index) => (
                      <Link
                        href={`/${item?.slug}`}
                        key={index}
                        className="text-xs shadow-md bg-gray-200 px-3 py-1 text-black rounded-full whitespace-nowrap"
                      >
                        {item?.name}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="hidden  xls:flex xms:flex xs:flex"></div>
                )}
              </div>

              <div className="grid grid-cols-6 md:grid-cols-4 sm:grid-cols-3 xls:grid-cols-2 xms:grid-cols-2 xs:grid-cols-2 gap-5 xms:gap-3 xls:gap-3 xs:gap-2 p-2 xls:p-0 xms:p-0 xs:p-0">
                {categoryTwo?.products?.map((item, index) => (
                  <div
                    className="overflow-hidden items-center justify-center h-full cardFull"
                    key={index}
                  >
                    <ProductCard item={item} />
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {data?.settingData?.offerBanner ? (
            <div
              className={`${
                loading ? "py-3" : ""
              }  grid-cols-2 gap-x-4 hidden xxl:grid xl:grid lg:grid md:grid sm:grid`}
            >
              {loading ? (
                <>
                  <div className="rounded-md">
                    <Skeleton height={150} />
                  </div>
                  <div className="rounded-md">
                    <Skeleton height={150} />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <img
                      src={`${hostname}/${data?.settingData?.offerBanner?.left}`}
                      className="w-screen h-auto xls:h-auto xms:h-auto xs:h-auto object-contain"
                      alt="hero"
                    />
                  </div>
                  <div>
                    <img
                      src={`${hostname}/${data?.settingData?.offerBanner?.right}`}
                      className="w-screen h-auto xls:h-auto xms:h-auto xs:h-auto object-contain"
                      alt="hero"
                    />
                  </div>
                </>
              )}
            </div>
          ) : null}

          {data?.settingData?.offerBanner ? (
            <div
              className={`${
                loading ? "py-3" : ""
              }  hidden xls:block xms:block xs:block`}
            >
              {loading ? (
                <>
                  <div className="rounded-md">
                    <Skeleton height={150} />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <img
                      src={`${hostname}/${data?.settingData?.offerBanner?.left}`}
                      className="w-screen h-auto xls:h-auto xms:h-auto xs:h-auto object-contain"
                      alt="hero"
                    />
                  </div>
                </>
              )}
            </div>
          ) : null}

          {data?.bestProducts?.length > 0 && (
            <BestProduct data={data} loading={loading} />
          )}
        </div>
      </main>
    </>
  );
}

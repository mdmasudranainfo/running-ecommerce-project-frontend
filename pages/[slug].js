import BreadCrumbs from "@/Components/Common/BreadCrumbs";
import ModalCart from "@/Components/ProductSection/ModalCart";
import ProductCard from "@/Components/ProductSection/ProductCard";
import request from "@/lib/request";
import { Pagination } from "antd";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";

import { hostname, project_name } from "@/lib/config";
import { useStatus } from "@/context/contextStatus";
import Image from "next/image";
import Link from "next/link";

const CategoryDetails = ({ Data, Total }) => {
  const { shopName } = useStatus();
  const router = useRouter();

  const [modalOpen, setIsModalOpen] = useState(false);

  const [selectedItem, setSelectedItem] = useState({});
  const [buyFlag, setBuyFlag] = useState(false);

  const { slug } = router?.query;

  const [page, setPage] = useState(1);

  const [total, setTotal] = useState(Total);
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState([]);

  // new start category
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      let res = await request(`category/fetch-all`);
      setCategoryData(res?.data);
      setLoading(false);
    };
    getData();
  }, []);

  // new end

  useEffect(() => {
    if (Data) {
      setLoading(false);
      setData(Data);
    } else {
      setLoading(true);
    }
  }, [Data]);

  const handlePageChange = async (page) => {
    let res = await request(
      `product/all-productby-category/${slug}?page=${page}&limit=24&userType=CUSTOMER`
    );
    setPage(page);
    setData(res?.data);
    setTotal(res?.metaData?.totalData);

    scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
      block: "start",
    });
  };

  const breadCumbs = [
    { name: "Home", url: "/" },
    { name: `${slug}`, url: `/${slug}` },
  ];

  useEffect(() => {
    if (typeof window.fbq === "function") {
      window.fbq("track", "Pageview");
    }
  }, []);
  console.log(categoryData);

  return (
    <>
      <Head>
        <title>{shopName}</title>
        <meta name="description" content={shopName} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="bg-[#FCFCFC] pt-20 xls:pt-4 xms:pt-4 xs:pt-4">
        <div className="max-w-7xl md:max-w-[62rem] sm:max-w-[46rem] xls:max-w-[25rem] xms:max-w-[22rem] xs:max-w-[19rem] mx-auto min-h-[500px]">
          <BreadCrumbs breadCumbs={breadCumbs} />

          {loading ? (
            <div className="grid grid-cols-6 sm:grid-cols-3 md:grid-cols-4 xls:grid-cols-2 xms:grid-cols-2 xs:grid-cols-1 gap-4 bg-white p-4 rounded-lg shadow-sm">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow p-3">
                  <Skeleton height={180} className="rounded-lg mb-3" />
                  <Skeleton count={2} className="mb-2" />
                  <Skeleton width={80} />
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm">
              {data?.length > 0 ? (
                <div className="flex gap-6 p-4">
                  {/* Category Sidebar */}
                  <div className="w-[240px] hidden lg:block">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="font-semibold text-lg mb-4 text-gray-800">
                        Categories
                      </h3>
                      <div className="space-y-2 max-h-[600px] overflow-y-auto custom-scrollbar">
                        {categoryData?.map((category, i) => (
                          <Link
                            href={`/${category?.slug}`}
                            key={i}
                            className="group flex items-center gap-3 p-2 rounded-md cursor-pointer transition-all hover:bg-white hover:shadow-md"
                          >
                            <div className="w-12 h-12 relative rounded-lg overflow-hidden bg-white shadow-sm">
                              <Image
                                src={`${hostname}/${category?.image}`}
                                alt={category?.name}
                                width={48}
                                height={48}
                                className="object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                            </div>
                            <span className="text-sm font-medium text-gray-700 group-hover:text-primary">
                              {category?.name}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Product Grid */}
                  <div className="flex-1">
                    <div className="grid grid-cols-5 md:grid-cols-3 sm:grid-cols-2 xls:grid-cols-2 xms:grid-cols-2 xs:grid-cols-1 gap-4">
                      {data?.map((item, index) => (
                        <div
                          key={index}
                          className="transform hover:-translate-y-1 transition-transform duration-200"
                        >
                          <div className="h-full bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                            <ProductCard item={item} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16">
                  <div className="text-gray-400 mb-4">
                    <svg
                      className="w-16 h-16"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 10h16M4 14h16M4 18h16"
                      />
                    </svg>
                  </div>
                  <p className="text-xl font-semibold text-gray-700">
                    No Products Found
                  </p>
                  <p className="text-gray-500 mt-2">
                    Try searching for different products
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Pagination */}
          {data?.length > 0 && (
            <div className="mt-6 mb-8 flex justify-center">
              <div className="bg-white rounded-lg shadow-sm p-2">
                <Pagination
                  current={page}
                  total={total}
                  onChange={handlePageChange}
                  defaultPageSize={24}
                  showSizeChanger={false}
                  className="custom-pagination"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <ModalCart
        modalOpen={modalOpen}
        setIsModalOpen={setIsModalOpen}
        selectedItem={selectedItem}
        buyFlag={buyFlag}
      />
    </>
  );
};

export default CategoryDetails;

export async function getServerSideProps(context) {
  let page = 1;

  let res = await request(
    `product/all-productby-category/${context.query.slug}?page=${page}&limit=24&userType=CUSTOMER`
  );

  return {
    props: {
      Data: res?.data || null,
      Total: res?.metaData?.totalData || null,
    },
  };
}

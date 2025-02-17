import request from "@/lib/request";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useStatus } from "@/context/contextStatus";
import ModalCart from "@/Components/ProductSection/ModalCart";
import { Pagination } from "antd";
import ProductCard from "@/Components/ProductSection/ProductCard";
import BreadCrumbs from "@/Components/Common/BreadCrumbs";
import Skeleton from "react-loading-skeleton";
import { project_name } from "@/lib/config";

const FeatureProducts = ({ product }) => {
  const { cartItems, setCartItems, setPromoDiscount } = useStatus();

  const [count, setCount] = useState(1);

  const [modalOpen, setIsModalOpen] = useState(false);

  const [selectedItem, setSelectedItem] = useState({});
  const [buyFlag, setBuyFlag] = useState(false);

  const [page, setPage] = useState(1);

  const [total, setTotal] = useState(1);
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = await request(
        `product/new-arrival-products?page=${page}&limit=20&userType=CUSTOMER`
      );

      if (res?.success) {
        setData(res?.data);
        setTotal(res?.metaData?.totalData);
        setLoading(false);
      }
    };
    getData();
  }, [page]);

  const handlePageChange = (pageNumber) => {
    // Scroll the container element to the top
    scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
      block: "start",
    });

    // Additional logic for handling the page change
    setPage(pageNumber);
  };

  const breadCumbs = [
    { name: "Home", url: "/" },
    { name: `new-products`, url: `/new-products` },
  ];

  return (
    <>
      <Head>
        <title>{project_name}</title>
        <meta name="description" content={project_name} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="bg-[#ddd] pt-14 xls:pt-4 xms:pt-4 xs:pt-4">
        <div className="max-w-7xl md:max-w-[62rem] sm:max-w-[46rem] xls:max-w-[25rem] xms:max-w-[22rem] xs:max-w-[19rem] mx-auto min-h-[500px]">
          <BreadCrumbs breadCumbs={breadCumbs} />
          {loading ? (
            <div className="grid grid-cols-6 sm:grid-cols-3 md:grid-cols-4 xls:grid-cols-2 xms:grid-cols-2 xs:grid-cols-1 xls:gap-x-3 xms:gap-x-3 xs:gap-x-2 gap-x-6 bg-white p-3">
              <div className="shadow-md p-2 xls:p-0 xms:p-0 xs:p-0">
                <div>
                  <Skeleton height={200} />
                </div>
                <Skeleton count={3} />
              </div>
              <div className="shadow-md p-2 xls:p-0 xms:p-0 xs:p-0">
                <div>
                  <Skeleton height={200} />
                </div>
                <Skeleton count={3} />
              </div>
              <div className="shadow-md p-2 xls:p-0 xms:p-0 xs:p-0">
                <div>
                  <Skeleton height={200} />
                </div>
                <Skeleton count={3} />
              </div>
              <div className="shadow-md p-2 xls:p-0 xms:p-0 xs:p-0">
                <div>
                  <Skeleton height={200} />
                </div>
                <Skeleton count={3} />
              </div>
              <div className="shadow-md p-2 xls:p-0 xms:p-0 xs:p-0">
                <div>
                  <Skeleton height={200} />
                </div>
                <Skeleton count={3} />
              </div>
              <div className="shadow-md p-2 xls:p-0 xms:p-0 xs:p-0">
                <div>
                  <Skeleton height={200} />
                </div>
                <Skeleton count={3} />
              </div>
            </div>
          ) : (
            <div
              className={`${
                data?.length > 0 ? "" : "min-h-[600px]"
              }bg-white py-3 px-3 xls:px-0 xls:py-0  xms:px-0 xms:py-0 xs:px-0 xs:py-0 rounded-md`}
            >
              {data?.length > 0 ? (
                <>
                  <div className="grid grid-cols-6 md:grid-cols-4 sm:grid-cols-3 xls:grid-cols-2 xms:grid-cols-2 xs:grid-cols-1 gap-5 xms:gap-3 xs:gap-2 xls:gap-3 p-2">
                    <>
                      {data?.map((item, index) => (
                        <div key={index}>
                          <div className="overflow-hidden  rounded-md items-center justify-center h-full cardFull">
                            <ProductCard item={item} />
                          </div>
                        </div>
                      ))}
                    </>
                  </div>
                </>
              ) : (
                <div>
                  {" "}
                  <p className="text-center text-4xl pt-32 font-semibold dark:text-black">
                    No data Found
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="my-4 flex justify-center">
          <Pagination
            current={page}
            total={total}
            onChange={(page) => handlePageChange(page)}
            defaultPageSize={24}
            showSizeChanger={false}
          />
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

export default FeatureProducts;

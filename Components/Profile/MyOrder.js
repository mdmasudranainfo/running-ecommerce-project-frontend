import { useStatus } from "@/context/contextStatus";
import request from "@/lib/request";
import { Pagination } from "antd";
import jwtDecode from "jwt-decode";
import LottiePlayer from "lottie-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import NotFound from "../../Components/office.json";
import SingleOrderModal from "../SingleOrderModal";

import dayjs from "dayjs";

const MyOrder = () => {
  const [page, setPage] = useState(1);

  const [customerId, setCustomerId] = useState(null);

  const { token } = useStatus();

  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(true);

  const [total, setTotal] = useState(null);

  const router = useRouter();

  const [orderId, setOrderId] = useState(null);

  const [orderModalOpen, setOrderModalOpen] = useState(false);

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      setCustomerId(decoded?.data?._id);
    }
  }, [token]);

  useEffect(() => {
    if (customerId) {
      const getData = async () => {
        const res = await request(
          `order/fetch-all-customer-order/${customerId}?page=${page}&limit=10`
        );
        if (res?.success) {
          setTotal(res?.metaData?.totalData);
          setData(res?.data);
          setLoading(false);
        }
      };
      getData();
    }
  }, [customerId, page]);

    

  const handleClick = (id) => {
    setOrderId(id);
    setOrderModalOpen(true);
  };

  return (
    <>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: "170px",
          }}
        >
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="#1F2937"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            visible={true}
          />
        </div>
      ) : (
        <>
          {data?.length > 0 ? (
            <div className="bg-white p-3 rounded-md">
              <div className="flex space-x-2 items-center">
                <svg
                 className="fill-current text-black h-7 w-7"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M7.83 20A3.001 3.001 0 1 1 4 16.17V7.83A3.001 3.001 0 1 1 7.83 4h8.34A3.001 3.001 0 1 1 20 7.83v8.34A3.001 3.001 0 1 1 16.17 20H7.83zm0-2h8.34A3.008 3.008 0 0 1 18 16.17V7.83A3.008 3.008 0 0 1 16.17 6H7.83A3.008 3.008 0 0 1 6 7.83v8.34A3.008 3.008 0 0 1 7.83 18zM5 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm14 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM5 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                </svg>
                <h1 className="font-semibold text-2xl">
                  <span className="text-black">My Order</span>{" "}
                </h1>
              </div>

              <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
                <table class="w-full text-left text-gray-500 dark:text-gray-400">
                  <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-white dark:text-gray-400">
                    <tr>
                      <th scope="col" class="px-6 py-3 text-base">
                        Order Id
                      </th>
                      <th scope="col" class="px-6 py-3 text-base">
                        Date
                      </th>
                      <th scope="col" class="px-6 py-3 text-base">
                        Amount
                      </th>
                      <th scope="col" class="px-6 py-3 text-base">
                        Payment
                      </th>
                      <th scope="col" class="px-6 py-3 text-base">
                        Status
                      </th>
                      <th scope="col" class="px-6 py-3 text-base"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((item, index) => (
                      <tr
                        class="bg-white border-b dark:bg-white dark:border-gray-700"
                        key={index}
                      >
                        <th
                          scope="row"
                          class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray-700"
                        >
                          {item?.serialId}
                        </th>
                        <td class="px-6 py-4">
                          {dayjs(item?.createdAt).format("DD-MM-YYYY")}
                        </td>
                        <td class="px-6 py-4">
                          {item?.customerCharge?.TotalBill} tk
                        </td>
                        <td class="px-6 py-4">{item?.payment?.paymentType}</td>
                        <td class="px-6 py-4">
                          <div>
                            {item?.orderStatus[item?.orderStatus?.length - 1]
                              .status == "CANCELED" ? (
                              <p className="bg-red-400 py-1 text-[11px] xs:px-2 rounded-full text-center text-sm text-white font-semibold">
                                {
                                  item?.orderStatus[
                                    item?.orderStatus?.length - 1
                                  ].status
                                }
                              </p>
                            ) : item?.orderStatus[item?.orderStatus?.length - 1]
                                .status == "DELIVERED" ? (
                              <div>
                                <p className="bg-green-400 py-1 text-[11px] xs:px-2 rounded-full text-center text-sm text-white font-semibold">
                                  {
                                    item?.orderStatus[
                                      item?.orderStatus?.length - 1
                                    ].status
                                  }
                                </p>
                              </div>
                            ) : (
                              <p className="text-sm text-center">
                                {
                                  item?.orderStatus[
                                    item?.orderStatus?.length - 1
                                  ].status
                                }
                              </p>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            className="px-3 bg-green-500 text-white font-medium text-sm py-2 tracking-wider"
                            onClick={() => handleClick(item?.serialId)}
                          >
                            view
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-center py-6">
                <Pagination
                  current={page}
                  total={total}
                  onChange={(page) => setPage(page)}
                  showSizeChanger={false}
                />
              </div>
            </div>
          ) : (
            <div className="bg-white p-3 rounded-md">
              {" "}
              <div className="w-96 mx-auto">
                <LottiePlayer loop={true} animationData={NotFound} />
              </div>
            </div>
          )}
        </>
      )}

      <SingleOrderModal
        orderModalOpen={orderModalOpen}
        setOrderModalOpen={setOrderModalOpen}
        orderId={orderId}
      />
    </>
  );
};

export default MyOrder;

import { useStatus } from "@/context/contextStatus";
import { hostname, project_name } from "@/lib/config";
import request from "@/lib/request";
import dayjs from "dayjs";
import Head from "next/head";
import { parseCookies } from "nookies";

import { useEffect, useState } from "react";

const PaymentSuccessful = () => {
  const cookie = parseCookies();

  const { setCartItems, cartItems, renderMe, orderObj, shopName, Logo , Favicon} =
    useStatus();

  const [orderDetail, setOrderDetail] = useState({});

  const [userPhone, setUserPhone] = useState(null);

  const [orderProducts, setOrderProducts] = useState([]);

  useEffect(() => {
    setCartItems(cartItems);
  }, [renderMe]);

  useEffect(() => {
    if (cookie?.hasOwnProperty("orderObj")) {
      setOrderDetail(JSON.parse(cookie.orderObj));
      // setOrderDetail(JSON.parse(orderObj));
    }
  }, [orderObj]);

  useEffect(() => {
    const getData = async () => {
      const res = await request(`setting/view`);

      setUserPhone(res?.data?.phone);
    };
    getData();
  }, []);

  useEffect(() => {
    if (orderDetail) {
      let getData = async () => {
        let res = await request(`order/single-order/${orderDetail?.serialId}`);
        setOrderProducts(res?.data?.products);
      };
      getData();
    }
  }, [orderDetail]);

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

      <div className="mt-12 success-page min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Success Animation */}
          <div className="success-animation mb-8">
            <div className="checkmark-circle">
              <div className="checkmark-stem"></div>
              <div className="checkmark-kick"></div>
            </div>
          </div>

          {/* Success Message */}
          <div className="text-center mb-12 success-message">
            <h1 className="text-3xl font-bold text-gray-800 mb-3">
              Order Placed Successfully!
            </h1>
            <p className="text-gray-600">
              Thank you for your purchase. Our team will contact you shortly.
            </p>
          </div>

          {/* Order Details Card */}
          <div className="bg-white rounded-xl shadow-soft p-6 mb-8 order-card">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Order Summary */}
              <div className="order-summary">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                  Order Summary
                </h2>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Order #</span>
                    <span className="font-medium">{orderDetail?.serialId}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Order Date</span>
                    <span className="font-medium">
                      {dayjs(orderDetail?.createdAt).format("DD MMM, YYYY")}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Amount</span>
                    <span className="font-bold text-lg">
                      ৳ {orderDetail?.customerCharge?.TotalBill}
                    </span>
                  </div>
                </div>
              </div>

              {/* Shipping Details */}
              <div className="shipping-details">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                  Shipping Details
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <span className="text-gray-600 w-20">Name:</span>
                    <span className="font-medium">
                      {orderDetail?.deliveryAddress?.name}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-600 w-20">Phone:</span>
                    <span className="font-medium">
                      {orderDetail?.deliveryAddress?.phone}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-600 w-20">Address:</span>
                    <span className="font-medium">
                      {orderDetail?.deliveryAddress?.address}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-white rounded-xl shadow-soft p-6 order-items">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Order Items
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 text-gray-600">
                      Product
                    </th>
                    <th className="text-center py-3 px-4 text-gray-600">
                      Quantity
                    </th>
                    <th className="text-right py-3 px-4 text-gray-600">
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orderProducts?.map((item, index) => (
                    <tr
                      key={index}
                      className="border-b last:border-0 hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-3">
                          <img
                            src={`${hostname}/${item?.galleryImage[0]}`}
                            className="h-12 w-12 object-cover rounded"
                            alt={item?.name}
                          />
                          <span className="font-medium">{item?.name}</span>
                        </div>
                      </td>
                      <td className="text-center py-4 px-4">
                        {item?.quantity}
                      </td>
                      <td className="text-right py-4 px-4">৳ {item?.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Order Totals */}
            <div className="mt-6 border-t pt-4">
              <div className="flex justify-end space-y-2 flex-col items-end">
                <div className="flex space-x-4">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium">
                    ৳ {orderDetail?.customerCharge?.afterDiscountTotalPrice}
                  </span>
                </div>
                <div className="flex space-x-4">
                  <span className="text-gray-600">Delivery Charge:</span>
                  <span className="font-medium">
                    ৳ {orderDetail?.customerCharge?.deliveryCharge}
                  </span>
                </div>
                <div className="flex space-x-4 text-lg font-bold">
                  <span>Total:</span>
                  <span>৳ {orderDetail?.customerCharge?.TotalBill}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Card */}
          <div className="mt-8 text-center">
            <a
              href={`tel:${userPhone}`}
              className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 transition-colors rounded-lg text-white font-medium space-x-2 contact-button"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <span>Contact Support: {userPhone}</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentSuccessful;

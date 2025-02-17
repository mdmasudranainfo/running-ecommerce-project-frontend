import { useStatus } from "@/context/contextStatus";
import styles from "./ProductPolicy.module.css";

import {
  faCalendar,
  faMoneyBillWaveAlt,
  faMoneyCheck,
  faTag,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useEffect } from "react";

const ProductPolicy = ({ deliveryData, socialLinks, userPhone }) => {
  const { setIsScrolled } = useStatus();

  const handleScroll = () => {
    const element = document.querySelector(`.policyClass`);

    if (element) {
      const scrollY = window.scrollY;
      if (scrollY > 200) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const element = document.querySelector(`.policyClass`);
    if (element) {
      const scrollY = window.scrollY;
      if (scrollY == 0) {
        setIsScrolled(false);
      }
    }
  }, []);

  // col-span-3 xls:col-span-4 xms:col-span-4 xs:col-span-4  sm:col-span-1

  return (
    <div className="policyClass   xls:mb-5 xms:mb-5 xs:mb-5  xms:ml-[6px] xms:p-1 xs:ml-[3px]">
      {/* xxl:block xl:block lg:block md:block sm:block hidden */}
      <div className="">
        <div className="p-5 border-t shadow-md rounded-md grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <h5 className="font-semibold text-lg mb-3 text-black">
              Delivery Charge
            </h5>
            <div className="flex flex-row items-center mb-[5px]">
              <FontAwesomeIcon
                style={{ marginRight: "5px" }}
                color="#737373"
                height={15}
                width={15}
                icon={faTruck}
              />
              <p className="text-black" style={{ fontSize: "14px" }}>
                Dhaka City: {deliveryData?.inside?.amount} TK (2-3 Days)
              </p>
            </div>

            <div className="flex flex-row items-center mb-[5px]">
              <FontAwesomeIcon
                style={{ marginRight: "5px" }}
                color="#737373"
                height={15}
                width={15}
                icon={faTruck}
              />
              <p className="text-black" style={{ fontSize: "14px" }}>
                Outside Dhaka: {deliveryData?.outside?.amount} TK (3-5 Days)
              </p>
            </div>
          </div>

          <div>
            <h5 className="font-semibold text-lg mt-3 mb-2 text-black">
              Payment
            </h5>
            <div className="flex flex-row items-center mb-[5px]">
              <FontAwesomeIcon
                style={{ marginRight: "5px" }}
                color="#737373"
                height={15}
                width={15}
                icon={faMoneyCheck}
              />
              <p className="text-black text-sm">Cash on Delivery: Available</p>
            </div>
            <div className={styles.iconContainer}>
              <FontAwesomeIcon
                style={{ marginRight: "5px" }}
                color="#737373"
                height={15}
                width={15}
                icon={faTag}
              />
              <p className="text-black text-sm">Online Payment: 50 tk Off</p>
            </div>
          </div>

          <div className="">
            <h5 className="font-semibold text-lg mt-3 mb-2 text-black">
              Others Feature
            </h5>
            <div className={styles.iconContainer}>
              <FontAwesomeIcon
                style={{ marginRight: "5px" }}
                color="#737373"
                height={15}
                width={15}
                icon={faCalendar}
              />
              <p className="text-black text-sm">Warranty: 6 months</p>
            </div>
            <div className={styles.iconContainer}>
              <FontAwesomeIcon
                style={{ marginRight: "5px" }}
                color="#737373"
                height={15}
                width={15}
                icon={faMoneyBillWaveAlt}
              />
              <p className="text-black text-sm">Refund: 7 Days</p>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="hidden xls:block xms:block xs:block">
        <p className="font-semibold text-center xls:py-2 py-1 xls:text-sm text-black">
          <span className="text-black">Have any Question?</span>
          <span className="pl-2 xms:block xs:hidden">
            <Link href={`tel:${userPhone}`} target="_blank">
              <span className="text-red-500">{userPhone}</span>
            </Link>{" "}
            Or{" "}
            <Link href={`${socialLinks?.facebook}`} target="_blank">
              <span className="text-green-500">Live chat</span>
            </Link>
          </span>
          <p className="pl-2 xs:block hidden">
            <Link href={`tel:${userPhone}`}>
              <span className="text-red-500">{userPhone}</span>
            </Link>{" "}
            Or{" "}
            <Link href={`${socialLinks?.facebook}`} target="_blank">
              <span className="text-green-500">Live chat</span>
            </Link>
          </p>
        </p>

        <table className="w-full text-sm text-left text-gray-500 table border border-collapse border-gray-400">
          <thead className="text-xs text-gray-700 uppercase">
            <tr>
              <th
                scope="col"
                className="px-3 py-3 border border-gray-400 text-center"
              >
                Area
              </th>
              <th
                scope="col"
                className="px-3 py-3 border text-center border-gray-400"
              >
                delivery Charge
              </th>
              <th
                scope="col"
                className="px-3 py-3 border text-center border-gray-400"
              >
                Times
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th
                scope="row"
                className="px-3 py-2 font-medium text-gray-900 whitespace-nowrap border border-collapse border-gray-400 text-center"
              >
                Dhaka City
              </th>
              <td className="px-3 py-2 border border-collapse border-gray-400 text-center text-black">
                ৳ {deliveryData?.inside?.amount}
              </td>
              <td className="px-3 py-2 border border-collapse border-gray-400 text-center text-black">
                {deliveryData?.inside?.days}
              </td>
            </tr>
            <tr>
              <th
                scope="row"
                className="px-3 py-2 font-medium text-gray-900 whitespace-nowrap border border-collapse border-gray-400 text-center"
              >
                Outside Dhaka
              </th>
              <td className="px-3 py-2 border border-collapse border-gray-400 text-center text-black">
                ৳ {deliveryData?.outside?.amount}
              </td>
              <td className="px-3 py-2 border border-collapse border-gray-400 text-center text-black">
                {deliveryData?.outside?.days}
              </td>
            </tr>
          </tbody>
        </table>
      </div> */}
    </div>
  );
};

export default ProductPolicy;

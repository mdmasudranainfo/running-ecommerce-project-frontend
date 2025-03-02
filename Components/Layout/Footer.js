import { hostname } from "@/lib/config";
import request from "@/lib/request";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsFacebook } from "react-icons/bs";
import { FcLike } from "react-icons/fc";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import MessengerCustomerChat from "react-messenger-customer-chat";
import { project_name, company_name, link, company_link } from "@/lib/config";
import { useStatus } from "@/context/contextStatus";
import Image from "next/image";

const Footer = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  const {
    setOrderBtn,
    shopName,
    setCartBtn,
    setNamePlaceHolder,
    setAddressPlaceHolder,
    setMobilePlaceHolder,
    setCustomerNotesPlaceholder,
  } = useStatus();

  useEffect(() => {
    const getData = async () => {
      const res = await request(`setting/view`);

      setOrderBtn(res?.data?.orderBtn);
      setCartBtn(res?.data?.cartBtn);
      setNamePlaceHolder(res?.data?.customerNamePlaceholder);
      setAddressPlaceHolder(res?.data?.customerAddressPlaceholder);
      setMobilePlaceHolder(res?.data?.customerMobilePlaceholder);
      setCustomerNotesPlaceholder(res?.data?.customerNotesPlaceholder);
      setLoading(false);
      setData(res?.data);
    };
    getData();
  }, []);

  return (
    <div>
      <div className="bg-secondary hidden sm:block xls:block xms:block xs:block sm:bock">
        <div className="w-full pb-20 xls:pb-16 xms:pb-16 xs:pb-16 xls:max-w-[25rem] xms:max-w-[21rem] xs:max-w-[20rem] mx-auto">
          <div className="pt-3">
            <div className="flex items-center justify-between px-4 space-x-2 xms:space-x-2 sm:hidden xs:hidden">
              <div className="text-center">
                <p className="text-white text-[12px] ">
                  <Link href="/about-us">About-us</Link>
                </p>

                <p className="text-white text-[12px] ">
                  <Link href="/terms-and-conditions">Terms & Conditions</Link>
                </p>
              </div>

              <div className="text-center">
                <p className="text-white text-[12px] ">
                  <Link href="/privacy-policy">Privacy-policy</Link>
                </p>

                <p className="text-white text-[12px] ">
                  <Link href="/return">Return & refund</Link>
                </p>
              </div>

              {/* <p className="text-white text-[12px] ">
                <Link href="/refund">Refund policy</Link>
              </p> */}
            </div>
            <div className="xms:hidden xls:hidden xs:block">
              <div className="flex justify-center items-center space-x-2">
                <div className="text-center">
                  <p className="text-white text-[12px] ">
                    <Link href="/about-us">About-us</Link>
                  </p>

                  <p className="text-white text-[12px] ">
                    <Link href="/terms-and-conditions">Terms & Conditions</Link>
                  </p>
                </div>

                <div className="text-center">
                  <p className="text-white text-[12px] ">
                    <Link href="/privacy-policy">Privacy-policy</Link>
                  </p>

                  <p className="text-white text-[12px] ">
                    <Link href="/return">Return & refund</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="text-white text-xs flex xls:space-x-1 xls:pt-3 xms:pt-2 xs:pt-2 items-center justify-center">
            <p>
              Copyright © 2023 <span className="text-orange-500">{link}</span>
            </p>
            {/* <div className="xs:pl-1 xms:pl-1 xls:pl-1 sm:pl-1">
              <Link
                className="hover:underline text-blue-500 font-semibold flex items-center xls:space-x-1 tracking-wider"
                href={company_link}
                target="_blank"
              >
                <p className="text-xs text-orange-500">{company_name}</p>{" "}
              </Link>
            </div> */}
          </div>
        </div>
      </div>

      <div className="bg-secondary w-full py-20 xls:hidden sm:hidden xms:hidden xs:hidden">
        <div className="grid grid-cols-3 justify-items-center sm:grid-cols-3 xls:grid-cols-1 xms:grid-cols-1 xs:grid-cols-1 gap-x-10 xls:gap-4 xms:gap-4 xs:gap-4  max-w-[85rem] md:max-w-[62rem] xls:max-w-[22rem] xms:max-w-[20rem] xs:max-w-[18rem] mx-auto">
          {loading ? (
            <SkeletonTheme
              baseColor="#fff"
              highlightColor="#444"
              borderRadius="0.1rem"
            >
              <p>
                <Skeleton count={3} />
              </p>
              <p>
                <Skeleton count={3} />
              </p>
            </SkeletonTheme>
          ) : (
            <>
              <div>
                <div className="xls:grid xms:grid xs:grid justify-center">
                  <img
                    className="h-20 w-56  object-contain"
                    src={`${hostname}/${data?.logoImg}`}
                    alt="logo"
                  />
                </div>
                <p className="text-white xls:pl-0 xms:pl-0 xs:pl-0 mt-2 text-sm">
                  {data?.subTitle}
                </p>
                <div className="flex items-center gap-1">
                  <p className="text-white">Follow Us:</p>

                  <div className="flex space-x-3 py-3">
                    <Link href={`https://wa.me/${data?.phone}`} target="_blank">
                      {/* <BsWhatsapp size={25} color="#5FFC7B" /> */}
                      <div className="h-10 w-10 relative">
                        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-600 opacity-75"></span>
                        <div className="h-10 w-10 absolute rounded-full bg-green-500  flex justify-center items-center">
                          <svg
                            className="fill-current text-white absolute h-6 w-6"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                          >
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path d="M7.253 18.494l.724.423A7.953 7.953 0 0 0 12 20a8 8 0 1 0-8-8c0 1.436.377 2.813 1.084 4.024l.422.724-.653 2.401 2.4-.655zM2.004 22l1.352-4.968A9.954 9.954 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10a9.954 9.954 0 0 1-5.03-1.355L2.004 22zM8.391 7.308c.134-.01.269-.01.403-.004.054.004.108.01.162.016.159.018.334.115.393.249.298.676.588 1.357.868 2.04.062.152.025.347-.093.537a4.38 4.38 0 0 1-.263.372c-.113.145-.356.411-.356.411s-.099.118-.061.265c.014.056.06.137.102.205l.059.095c.256.427.6.86 1.02 1.268.12.116.237.235.363.346.468.413.998.75 1.57 1l.005.002c.085.037.128.057.252.11.062.026.126.049.191.066a.35.35 0 0 0 .367-.13c.724-.877.79-.934.796-.934v.002a.482.482 0 0 1 .378-.127c.06.004.121.015.177.04.531.243 1.4.622 1.4.622l.582.261c.098.047.187.158.19.265.004.067.01.175-.013.373-.032.259-.11.57-.188.733a1.155 1.155 0 0 1-.21.302 2.378 2.378 0 0 1-.33.288 3.71 3.71 0 0 1-.125.09 5.024 5.024 0 0 1-.383.22 1.99 1.99 0 0 1-.833.23c-.185.01-.37.024-.556.014-.008 0-.568-.087-.568-.087a9.448 9.448 0 0 1-3.84-2.046c-.226-.199-.435-.413-.649-.626-.89-.885-1.562-1.84-1.97-2.742A3.47 3.47 0 0 1 6.9 9.62a2.729 2.729 0 0 1 .564-1.68c.073-.094.142-.192.261-.305.127-.12.207-.184.294-.228a.961.961 0 0 1 .371-.1z" />
                          </svg>
                        </div>
                      </div>
                    </Link>

                    <Link
                      href={`${data?.socialLinks?.facebook}`}
                      target="_blank"
                    >
                      <div className="mt-2">
                        <BsFacebook size={25} color="#fff" />
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-white  tracking-wider text-xl font-semibold">
                  Contact Us
                </p>
                <p className="text-white text-sm py-3">
                  {data?.address?.house}
                  {/* exiting feature 
                   Road {data?.address?.road},{" "}
                  {data?.address?.union}, {data?.address?.district} -{" "}
                  {data?.address?.zipCode}
                  */}
                </p>
                <div className="space-y-2">
                  <p className="text-white font-semibold text-sm">Email:</p>
                  <Link
                    href={`https://mail.google.com/mail/u/0/#search/${data?.email}`}
                    target="_blank"
                  >
                    <p className="text-white text-xs">{data?.email}</p>
                  </Link>

                  <p className="text-white font-semibold text-sm">Phone:</p>
                  <Link href={`tel:${data?.phone}`} target="_blank">
                    <p className="text-white text-xs">+88{data?.phone}</p>
                  </Link>
                </div>
              </div>
            </>
          )}

          <div>
            <p className="text-white text-xl tracking-wider  font-semibold">
              Let Us Help You
            </p>
            <div className="py-3 space-y-2">
              <p className="text-white text-sm">
                <Link href="/about-us">About-us</Link>
              </p>

              <p className="text-white text-sm">
                <Link href="/terms-and-conditions">Terms & Conditions</Link>
              </p>

              <p className="text-white text-sm">
                <Link href="/privacy-policy">Privacy-policy</Link>
              </p>

              <p className="text-white text-sm">
                <Link href="/return">Return & refund</Link>
              </p>
              {/* <p className="text-white text-sm">
                <Link href="/refund">Refund policy</Link>
              </p> */}
            </div>
          </div>

          {/* <div className="pl-[0px] sm:pl-[45px] sm:pt-[10px] ">
            <p className="text-white text-xl tracking-wider   font-semibold">
              Get {shopName} App
            </p>
            <div className=" py-3">
              <Image
                src="/image/playstore.png"
                width={200}
                height={120}
                alt=""
                className="cursor-pointer"
              />
              <Image
                src="/image/appStore.png"
                width={200}
                height={120}
                alt=""
                className="cursor-pointer"
              />
            </div>
          </div> */}

          <div>{/* <MessengerCustomerChat pageId="103424579277922" /> */}</div>
        </div>
      </div>
      <div className="bg-[#222836]  xls:hidden xms:hidden xs:hidden sm:hidden">
        <div className=" flex items-center justify-center max-w-[85rem] md:max-w-[62rem] xls:max-w-[22rem] xms:max-w-[20rem] xs:max-w-[18rem] mx-auto py-2">
          <p className="text-white text-xs ">Copyright © 2023, {link}</p>

          {/* <div className="text-white text-xs flex space-x-2 items-center">
            <p>Developed by</p>
            <div>
              <Link
                className="hover:underline text-blue-500 font-semibold flex items-center space-x-1 tracking-wider"
                href={company_link}
                target="_blank"
              >
                <p className="text-sm">{company_name}</p>
              </Link>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Footer;

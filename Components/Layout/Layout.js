import { useStatus } from "@/context/contextStatus";
import { hostname } from "@/lib/config";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import Cart from "../Cart";
import BottomNavbar from "./BottomNavbar/BottomNavbar";
import Footer from "./Footer";
import styles from "./Layout.module.css";
import Navbar from "./Navbar/Navbar";
import ResLeftMenu from "./RsLeftMenu/RsLeftMenu";
import SideProfileMenu from "./SideProfileMenu/SideProfileMenu";
import CountUp from "react-countup";
import request from "@/lib/request";
import Head from "next/head";
import parse from "html-react-parser";

const Layout = ({ children }) => {
  const router = useRouter();
  const [total, settotal] = useState(0);
  const [pixel, setPixel] = useState(null);

  const {
    cartItems,
    setCartItems,
    loading,
    renderMe,
    setLoading,
    popUpImage,
    popupShow,
    setPopupShow,
    bannerText,
    flag,
    setIsCartOpen,
    primaryColor,
    setIsScrolled,
  } = useStatus();

  useEffect(() => {
    const totalPrice = cartItems?.reduce(
      (a, b) =>
        a +
        (b?.sellingPrice
          ? b?.sellingPrice * b?.quantity
          : b?.sellingPrice * b?.quantity),
      0
    );
    settotal(totalPrice);
  }, [cartItems, renderMe]);

  useEffect(() => {
    const getData = async () => {
      if (typeof document !== "undefined") {
        const res = await request(`home/site-color`);
        const root = document.documentElement;
        root.style.setProperty("--color-primary", res?.data?.colors?.primary);
        root.style.setProperty(
          "--color-secondary",
          res?.data?.colors?.secondary
        );
      }
    };

    getData();
  }, []);

  useEffect(() => {
    let getData = async () => {
      let res = await request(`setting/fetch-fb-pixel`);
      if (res?.success) {
        // console.log("res",res?.data?.script);
        setPixel(res?.data?.script);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    if (router?.pathname !== "/products/[slug]") {
      setIsScrolled(true);
    }
  }, [router?.pathname]);

  /* const pagesWithoutSideCategory = ["/landing/[slug]"];
  const shouldHideSideCategory = pagesWithoutSideCategory.includes(
    router.pathname
  ); */
  const shouldHideSideCategory = router.pathname.startsWith("/landing/");

  return (
    <div className="font-baloo">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      {pixel !== null ? <Head>{parse(pixel)}</Head> : null}

      <div className="font-body bg-[#FCFCFC] pt-8 ">
        {!shouldHideSideCategory ? <Navbar /> : null}

        <ResLeftMenu />
        <SideProfileMenu />
        <Fragment>{children}</Fragment>
        {!shouldHideSideCategory ? <BottomNavbar /> : null}
        {!shouldHideSideCategory ? <Footer /> : null}

        {!shouldHideSideCategory ? (
          <Cart cartItems={cartItems} setCartItems={setCartItems} />
        ) : null}

        {!shouldHideSideCategory ? (
          <div className=" shadow border-primary overflow-hidden rounded-xl fixed bottom-2/4 right-0 z-10 w-20 text-center cursor-pointer   xls:hidden xms:hidden xs:hidden sm:hidden ">
            <div className="bg-white" onClick={() => setIsCartOpen(true)}>
              <div>
                {/* <Image
                  height={30}
                  width={80}
                  src="/image/CompleteShallowFlyingsquirrel-size_restricted.gif"
                  alt="category"
                /> */}
                <span class="text-2xl mb-1 text-blue-600 flex w-full items-center justify-center pt-2">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 512 512"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="32"
                      d="M80 176a16 16 0 00-16 16v216c0 30.24 25.76 56 56 56h272c30.24 0 56-24.51 56-54.75V192a16 16 0 00-16-16zm80 0v-32a96 96 0 0196-96h0a96 96 0 0196 96v32"
                    ></path>
                    <path
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="32"
                      d="M160 224v16a96 96 0 0096 96h0a96 96 0 0096-96v-16"
                    ></path>
                  </svg>
                </span>
              </div>
              <div className="">
                <p className="text-sm   font-semibold">
                  {cartItems?.length} items
                </p>
              </div>

              <p className="text-sm mt-[6px] font-semibold text-white bg-primary py-2">
                ৳ {total}
              </p>
            </div>
          </div>
        ) : null}

        {popUpImage?.web && popUpImage?.isShow == true && (
          <div
            className={`${styles.modal} ${
              popupShow ? styles.displayBlock : styles.displayNone
            }`}
          >
            <section className={styles.mainModal}>
              {popUpImage?.url == "" ? (
                <>
                  <img
                    src={`${hostname}/${popUpImage?.web}`}
                    className="h-96 w-full object-fill"
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    height={25}
                    width={25}
                    style={{
                      position: "fixed",
                      top: "3",
                      right: "5",
                      cursor: "pointer",
                    }}
                    color="white"
                    onClick={() => setPopupShow(false)}
                  />
                </>
              ) : (
                <>
                  <Link href={`${popUpImage?.url}`} target="__blank">
                    <img
                      src={`${hostname}/${popUpImage?.web}`}
                      className="h-96 w-full object-fill"
                    />
                  </Link>
                  <FontAwesomeIcon
                    icon={faTimes}
                    height={25}
                    width={25}
                    style={{
                      position: "fixed",
                      top: "3",
                      right: "5",
                      cursor: "pointer",
                    }}
                    color="white"
                    onClick={() => setPopupShow(false)}
                  />
                </>
              )}
            </section>
          </div>
        )}
        {popUpImage?.web && popUpImage?.isShow == true && (
          <div
            className={`${styles.modal} ${
              popupShow ? styles.displayMobileBlock : styles.displayNone
            }`}
          >
            <section className={styles.mainMobileModal}>
              {popUpImage?.url == "" ? (
                <>
                  <img
                    src={`${hostname}/${popUpImage?.web}`}
                    className="h-96 w-full object-fill"
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    height={25}
                    width={25}
                    style={{
                      position: "fixed",
                      top: "3",
                      right: "5",
                      cursor: "pointer",
                    }}
                    color="white"
                    onClick={() => setPopupShow(false)}
                  />
                </>
              ) : (
                <>
                  <Link href={`${popUpImage?.url}`} target="__blank">
                    <img
                      src={`${hostname}/${popUpImage?.web}`}
                      className="h-96 w-full object-fill"
                    />
                  </Link>
                  <FontAwesomeIcon
                    icon={faTimes}
                    height={25}
                    width={25}
                    style={{
                      position: "fixed",
                      top: "3",
                      right: "5",
                      cursor: "pointer",
                    }}
                    color="white"
                    onClick={() => setPopupShow(false)}
                  />
                </>
              )}
            </section>
          </div>
        )}
      </div>
    </div>
  );
};

export default Layout;

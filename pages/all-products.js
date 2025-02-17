import ModalCart from "@/Components/ProductSection/ModalCart";
import { useStatus } from "@/context/contextStatus";
import { hostname } from "@/lib/config";
import request from "@/lib/request";
import { Pagination } from "antd";
import Head from "next/head";
import Image from "next/image";
import { destroyCookie, setCookie } from "nookies";
import { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";
import styles from "../Components/ProductSection/ProductCard.module.css";

import { project_name } from "@/lib/config";

const AllProducts = () => {
  const [page, setPage] = useState(1);

  const [total, setTotal] = useState(1);
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState([]);

  const { shopName, cartItems, setCartItems, setPromoDiscount } = useStatus();

  const [count, setCount] = useState(1);

  const [modalOpen, setIsModalOpen] = useState(false);

  const [selectedItem, setSelectedItem] = useState({});
  const [buyFlag, setBuyFlag] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const res = await request(
        `product/all-products?page=${page}&limit=24&userType=CUSTOMER`
      );

      if (res?.success) {
        console.log("res....", res);
        setTotal(res?.metaData?.totalData);
        setData(res?.data);
        setLoading(false);
      }
    };
    getData();
  }, [page]);

  const handleRoute = (item) => {
    router.push(`/products/${item?.slug}`);
  };

  const handleCart = (item) => {
    if (item?.isVariant == false) {
      let itemCart = {
        _id: item?._id,
        name: item?.name,
        image: item?.galleryImage[0],
        sellingPrice: item?.sellingPrice,
        isVariant: item?.isVariant,
        quantity: 1,
        variation: item?.variations,
        stock: item?.nonVariation?.stock,
      };

      const is_exist = cartItems.find(
        (variation) => variation._id == itemCart._id
      );

      if (is_exist) {
        const index = cartItems.findIndex(
          (variation) => variation.variation == is_exist.variation
        );

        if (
          cartItems[index].quantity + itemCart?.quantity <=
          item?.nonVariation?.stock
        ) {
          cartItems[index].quantity += count;
          setCartItems(cartItems);
          setCookie(null, "lazmaCart", JSON.stringify(cartItems), {
            maxAge: 30 * 24 * 60 * 60,
            path: "/",
          });
          setPromoDiscount(null);
          destroyCookie({}, "promoDiscount", {
            path: "/",
          });
          toast("Product Added");
        } else {
          toast.error("you cant add more products");
        }
      }

      if (is_exist === undefined) {
        setCartItems((cartItems) => [...cartItems, itemCart]);
        setCookie(null, "lazmaCart", JSON.stringify([...cartItems, itemCart]), {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
        });
        setPromoDiscount(null);
        destroyCookie({}, "promoDiscount", {
          path: "/",
        });
        toast("Product Added");
      }
    } else {
      setSelectedItem(item);
      setIsModalOpen(true);
      setBuyFlag(false);
    }
  };

  const handleBuyNow = (item) => {
    if (item?.isVariant == false) {
      let itemCart = {
        _id: item?._id,
        name: item?.name,
        image: item?.galleryImage[0],
        sellingPrice: item?.sellingPrice,
        quantity: 1,
        isVariant: item?.isVariant,
        variation: item?.variations,
        stock: item?.nonVariation?.stock,
      };

      const is_exist = cartItems.find(
        (variation) => variation._id == itemCart._id
      );

      if (is_exist) {
        const index = cartItems.findIndex(
          (variation) => variation.variation == is_exist.variation
        );

        if (
          cartItems[index].quantity + itemCart?.quantity <=
          item?.nonVariation?.stock
        ) {
          cartItems[index].quantity += count;
          setCartItems(cartItems);
          setCookie(null, "lazmaCart", JSON.stringify(cartItems), {
            maxAge: 30 * 24 * 60 * 60,
            path: "/",
          });
          setPromoDiscount(null);
          destroyCookie({}, "promoDiscount", {
            path: "/",
          });
          toast("Product Added");
          router.push(`/checkout`);
        } else {
          toast.error("you cant add more products");
        }
      }

      if (is_exist === undefined) {
        setCartItems((cartItems) => [...cartItems, itemCart]);
        setCookie(null, "lazmaCart", JSON.stringify([...cartItems, itemCart]), {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
        });
        setPromoDiscount(null);
        destroyCookie({}, "promoDiscount", {
          path: "/",
        });
        toast("Product Added");
        router.push(`/checkout`);
      }
    } else {
      setSelectedItem(item);
      setIsModalOpen(true);
      setBuyFlag(true);
    }
  };

  return (
    <>
      <Head>
        <title>{project_name}</title>
        <meta name="description" content={project_name} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="bg-[#ddd] pt-32">
        <div className="max-w-7xl mx-auto min-h-[600px] pb-3">
          {loading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingTop: "170px",
              }}
            >
              {" "}
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
            <div>
              {data?.length > 0 ? (
                <>
                  <div className="grid grid-cols-6 md:grid-cols-4 sm:grid-cols-3 xls:grid-cols-2 xms:grid-cols-2 xs:grid-cols-1 gap-5 xms:gap-3 p-2">
                    {data?.map((item, index) => (
                      <div key={index}>
                        <div
                          className="overflow-hidden  rounded-md items-center justify-center h-full cardFull"
                          key={index}
                        >
                          <div className="relative">
                            {item?.sticker ? (
                              <div className={styles.ribbon}>
                                <span
                                  style={{
                                    position: "absolute",
                                    backgroundColor: `${item.sticker.color}`,
                                    width: "122px",
                                    top: "55px",
                                    left: "-14px",
                                    color: "#fff",
                                    transform: "rotate(45deg)",
                                    textAlign: "center",
                                    textTransform: "uppercase",
                                    fontSize: "10px",
                                    fontWeight: "bold",
                                    zIndex: "10px",
                                  }}
                                >
                                  {item?.sticker?.name}
                                </span>
                              </div>
                            ) : null}

                            <div
                              className="h-[195px] w-[195px] md:h-[230px] md:w-[230px] sm:h-[237px] sm:w-[237px] xs:h-[302px] xs:w-[302px] cursor-pointer"
                              onClick={() => handleRoute(item)}
                            >
                              <Image
                                priority={true}
                                height={250}
                                width={250}
                                alt="Product"
                                src={`${hostname}/${item?.galleryImage[0]}`}
                                className={styles.zoom}
                              />
                            </div>
                            <div className="pt-2">
                              {item?.name.length > 35 ? (
                                <p
                                  className="text-sm font-semibold text-black text-center hover:underline cursor-pointer xms:h-[52px]"
                                  onClick={() => handleRoute()}
                                >
                                  {item?.name.substring(0, 35) + "...."}
                                </p>
                              ) : (
                                <p
                                  className="text-sm font-semibold text-black text-center hover:underline cursor-pointer xms:h-[52px]"
                                  onClick={() => handleRoute()}
                                >
                                  {item?.name}
                                </p>
                              )}
                              <div className="flex justify-between px-3  xls:px-1 xms:px-1 pt-2">
                                <div className="flex space-x-2 items-center">
                                  <p className="text-base font-semibold text-green-700 text-center">
                                    TK. {item?.sellingPrice}
                                  </p>

                                  {item?.sellingPrice ==
                                  item?.regularPrice ? null : (
                                    <p className="text-[12px] font-semibold text-red-900 text-center line-through">
                                      TK. {item?.regularPrice}
                                    </p>
                                  )}
                                </div>

                                <div
                                  className="group h-7 w-7 relative cursor-pointer rounded-full  group-hover:border border-black flex justify-center items-center hover:bg-black"
                                  onClick={() => handleCart(item)}
                                >
                                  {/* <span class="group-hover:animate-ping absolute inline-flex group-hover:h-full  group-hover:w-full rounded-full bg-myBlue-700 opacity-75"></span> */}
                                  <svg
                                    className="fill-current group-hover:text-white group-hover:duration-500 dark:text-black"
                                    stroke-width="0"
                                    viewBox="0 0 16 16"
                                    height="18"
                                    width="18"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM9 5.5V7h1.5a.5.5 0 0 1 0 1H9v1.5a.5.5 0 0 1-1 0V8H6.5a.5.5 0 0 1 0-1H8V5.5a.5.5 0 0 1 1 0z"></path>
                                  </svg>
                                </div>
                              </div>

                              <div
                                className="bg-gray-300 flex justify-center cursor-pointer mt-2 hover:bg-black group shadow-md"
                                onClick={() => handleBuyNow(item)}
                              >
                                <div className="flex py-1 items-center space-x-2">
                                  <p className="text-sm text-black font-semibold tracking-wider group-hover:text-white group-hover:duration-500">
                                    Buy now
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-center mt-4">
                    <Pagination
                      current={page}
                      total={total}
                      onChange={(page) => setPage(page)}
                      showSizeChanger={false}
                    />
                  </div>
                </>
              ) : (
                <div className="mt-20">
                  <p className="text-3xl text-center font-semibold text-black tracking-wider">
                    No Data found
                  </p>
                </div>
              )}
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

export default AllProducts;

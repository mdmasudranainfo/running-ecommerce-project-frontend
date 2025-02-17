import { useStatus } from "@/context/contextStatus";
import {hostname} from "@/lib/config";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import { destroyCookie, setCookie } from "nookies";
import { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { BiMinus, BiPlus } from "react-icons/bi";
import { BsArrowUpShort } from "react-icons/bs";
import { AiFillHeart } from "react-icons/ai";
import postRequest from "@/lib/postRequest";
import request from "@/lib/request";
import Skeleton from "react-loading-skeleton";

const ModalCart = ({ modalOpen, setIsModalOpen, selectedItem, buyFlag }) => {
  const {
    cartItems,
    setCartItems,
    token,
    setPromoDiscount,
    setIsRenderMe,
    renderMe,
    setShakeAnimation,
    wishData,
    wishCall,
    setWishCall,
  } = useStatus();

  const [activeVariation, setActiveVariation] = useState(null);

  const [stock, setStock] = useState(null);

  const [totalStock, setTotalStock] = useState(null);

  const [selectedImage, setSelectedImage] = useState(null);

  const [count, setCount] = useState(1);

  const [variation, setVariation] = useState({});

  const router = useRouter();

  const [size, setSize] = useState(null);

  const [sellingPrice, setSellingPrice] = useState(null);

  const [regularPrice, setRegularPrice] = useState(null);

  const [selected, setSelected] = useState(false);

  const [isExist, setIsExist] = useState(null);

  const [data, setData] = useState({});

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (selectedItem && modalOpen) {
      const getData = async () => {
        let res = await request(`product/single-product/${selectedItem?.slug}`);
        if (res?.success) {
          setData(res?.data);
          setLoading(false);
          if (res?.data?.isFlashDeal) {
            if (res?.data?.isVariant) {
              setStock(res?.data?.variations[0]?.stock);
              setSellingPrice(res?.data?.variations[0]?.flashPrice);
              setRegularPrice(res?.data?.variations[0]?.regularPrice);
            } else {
              setStock(res?.data?.nonVariation?.stock);
              setSellingPrice(res?.data?.nonVariation?.flashPrice);
              setRegularPrice(res?.data?.nonVariation?.regularPrice);
            }
          } else {
            if (res?.data?.isVariant) {
              setStock(res?.data?.variations[0]?.stock);
              setSellingPrice(res?.data?.variations[0]?.sellingPrice);
              setRegularPrice(res?.data?.variations[0]?.regularPrice);
            } else {
              setSellingPrice(res?.data?.nonVariation?.sellingPrice);
              setRegularPrice(res?.data?.nonVariation?.regularPrice);
              setStock(res?.data?.nonVariation?.stock);
            }
          }

          setSelected(false);
        }
      };
      getData();
    }
    
  }, [selectedItem]);



  

  const handleVariation = (index, stock, image, item) => {
    setActiveVariation(index);
    setStock(stock);
    setSelectedImage(image);
    setCount(1);
    setVariation(item);
    setSize(item?.attributeOpts[0]?.name);
    setSellingPrice(
      data?.isFlashDeal == true ? item?.flashPrice : item?.sellingPrice
    );
    setRegularPrice(item?.regularPrice);
    setSelected(false);
  };

  const handleCart = () => {
    if (data?.isVariant && Object.keys(variation).length) {
      let item = {
        _id: data?._id,
        name: data?.name,
        image: selectedImage,

        sellingPrice: data?.isFlashDeal
          ? data?.isVariant
            ? sellingPrice
            : data?.nonVariation?.flashPrice
          : sellingPrice,
        isVariant: data?.isVariant,
        quantity: count,
        variation: variation,
        stock: stock,
      };

      const is_exist = cartItems.find(
        (variation) => variation.variation._id == item.variation._id
      );

      if (is_exist) {
        const index = cartItems.findIndex(
          (variation) => variation.variation == is_exist.variation
        );

        if (cartItems[index].quantity + item?.quantity <= stock) {
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
          setShakeAnimation(true);
          setTimeout(() => {
            setShakeAnimation(false);
          }, 2000);
          setIsRenderMe(!renderMe);
        } else {
          toast.error("You cant add more products");
        }
      }

      if (is_exist === undefined) {
        setCartItems((cartItems) => [...cartItems, item]);
        setCookie(null, "lazmaCart", JSON.stringify([...cartItems, item]), {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
        });
        setPromoDiscount(null);
        destroyCookie({}, "promoDiscount", {
          path: "/",
        });
        setShakeAnimation(true);
        setTimeout(() => {
          setShakeAnimation(false);
        }, 2000);
        setIsRenderMe(!renderMe);
      }
    } else {
      setSelected(true);
    }
  };

  const handleBuyNow = () => {
    if (data?.isVariant && Object.keys(variation).length) {
      let item = {
        _id: data?._id,
        name: data?.name,
        image:
          selectedImage?.length > 0 ? selectedImage : data?.galleryImage[0],
        sellingPrice: data?.isFlashDeal
          ? data?.isVariant
            ? sellingPrice
            : data?.nonVariation?.flashPrice
          : sellingPrice,
        isVariant: data?.isVariant,
        quantity: count,
        variation: variation,
        stock: stock ? stock : totalStock,
      };

      const is_exist = cartItems.find(
        (variation) => variation.variation._id == item.variation._id
      );

      if (is_exist) {
        const index = cartItems.findIndex(
          (variation) => variation.variation == is_exist.variation
        );

        if (cartItems[index].quantity + item?.quantity <= stock) {
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
          setShakeAnimation(true);
          setTimeout(() => {
            setShakeAnimation(false);
          }, 2000);
          setIsRenderMe(!renderMe);

          router.push(`/checkout`);
        }
      }

      if (is_exist === undefined) {
        setCartItems((cartItems) => [...cartItems, item]);
        setCookie(null, "lazmaCart", JSON.stringify([...cartItems, item]), {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
        });
        router.push(`/checkout`);
        setPromoDiscount(null);
        destroyCookie({}, "promoDiscount", {
          path: "/",
        });
        setShakeAnimation(true);
        setTimeout(() => {
          setShakeAnimation(false);
        }, 2000);
        setIsRenderMe(!renderMe);
      }
    } else {
      setSelected(true);
    }
  };

  useEffect(() => {
    const is_exist = wishData.find((product) => product?._id == data?._id);
    setIsExist(is_exist);
  }, [wishData, data]);

  const handleWishInsert = async () => {
    if (!token) {
      toast.error(`please login at first`);
    } else {
      const res = await postRequest(`customer/wishlist/insert/${data?._id}`);
      if (res?.success) {
        setWishCall(!wishCall);
        toast(`${res?.message}`);
      } else {
        toast.error(`${res?.message}`);
      }
    }
  };

  const handleWishRemove = async () => {
    const res = await postRequest(`customer/wishlist/remove/${data?._id}`);
    if (res?.success) {
      setWishCall(!wishCall);
      toast(`${res?.message}`);
    } else {
      toast.error(`${res?.message}`);
    }
  };

  return (
    <Transition appear show={modalOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-40 overflow-y-auto bg-opacity-60 bg-black"
        onClose={() => setIsModalOpen(false)}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-500"
            enterFrom="opacity-0 duration-500"
            enterTo="opacity-100 duration-500"
            leave="ease-in duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black/30" />
          </Transition.Child>
          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-500"
            enterFrom="opacity-0 scale-95 duration-500"
            enterTo="opacity-100 scale-100 duration-500"
            leave="ease-in duration-500"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-[800px] p-4 my-8 overflow-hidden text-left align-middle transition-all transform bg-gray-100 shadow-xl">
              <div className="mt-2">
                <div className="py-4 flex flex-col justify-center">
                  <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="text-center text-3xl font-extrabold text-gray-900 relative">
                      <div
                        className="absolute top-[-25px] right-0 sm:right-[-130px]"
                        onClick={() => setIsModalOpen(false)}
                      >
                        <svg
                          className="h-7 w-7 fill-current text-red-600 cursor-pointer"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 10.5858L14.8284 7.75736L16.2426 9.17157L13.4142 12L16.2426 14.8284L14.8284 16.2426L12 13.4142L9.17157 16.2426L7.75736 14.8284L10.5858 12L7.75736 9.17157L9.17157 7.75736L12 10.5858Z"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-100 my-5">
                    {loading ? (
                      <div className="grid grid-cols-1 md:grid-cols-1 sm:grid-cols-1 xls:grid-cols-1 xms:grid-cols-1 xs:grid-cols-1 gap-5 xms:gap-3 p-4 mt-4 rounded-md bg-white">
                        <div className="shadow-md p-2">
                          <div>
                            <Skeleton height={200} />
                          </div>
                          <Skeleton count={3} />
                        </div>
                        {/* <div className="shadow-md p-2">
                          <div>
                            <Skeleton height={200} />
                          </div>
                          <Skeleton count={3} />
                        </div> */}
                      </div>
                    ) : (
                      <div className="grid grid-cols-12 xls:grid-cols-1 xms:grid-cols-1 xs:grid-cols-1">
                        <div className="col-span-6">
                          {data !== undefined &&
                          Object.keys(data).length > 0 ? (
                            <>
                              <div className="grid grid-cols-12">
                                <p className="text-lg font-bold pl-7 xls:pl-0 xms:pl-0 xs:pl-0 text-black col-span-10">
                                  {data?.name}
                                </p>

                                <div className="col-span-2">
                                  {token ? (
                                    <>
                                      {isExist == undefined ? (
                                        <div onClick={() => handleWishInsert()}>
                                          <svg
                                            className="h-7 w-7 fill-current text-red-500 cursor-pointer"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                          >
                                            <path d="M12.001 4.52853C14.35 2.42 17.98 2.49 20.2426 4.75736C22.5053 7.02472 22.583 10.637 20.4786 12.993L11.9999 21.485L3.52138 12.993C1.41705 10.637 1.49571 7.01901 3.75736 4.75736C6.02157 2.49315 9.64519 2.41687 12.001 4.52853ZM18.827 6.1701C17.3279 4.66794 14.9076 4.60701 13.337 6.01687L12.0019 7.21524L10.6661 6.01781C9.09098 4.60597 6.67506 4.66808 5.17157 6.17157C3.68183 7.66131 3.60704 10.0473 4.97993 11.6232L11.9999 18.6543L19.0201 11.6232C20.3935 10.0467 20.319 7.66525 18.827 6.1701Z"></path>
                                          </svg>
                                        </div>
                                      ) : (
                                        <div onClick={() => handleWishRemove()}>
                                          <AiFillHeart
                                            size={25}
                                            className="fill-current text-red-600 cursor-pointer"
                                          />
                                        </div>
                                      )}
                                    </>
                                  ) : (
                                    <div onClick={() => handleWishInsert()}>
                                      <svg
                                        className="h-7 w-7 fill-current text-red-500 cursor-pointer"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                      >
                                        <path d="M12.001 4.52853C14.35 2.42 17.98 2.49 20.2426 4.75736C22.5053 7.02472 22.583 10.637 20.4786 12.993L11.9999 21.485L3.52138 12.993C1.41705 10.637 1.49571 7.01901 3.75736 4.75736C6.02157 2.49315 9.64519 2.41687 12.001 4.52853ZM18.827 6.1701C17.3279 4.66794 14.9076 4.60701 13.337 6.01687L12.0019 7.21524L10.6661 6.01781C9.09098 4.60597 6.67506 4.66808 5.17157 6.17157C3.68183 7.66131 3.60704 10.0473 4.97993 11.6232L11.9999 18.6543L19.0201 11.6232C20.3935 10.0467 20.319 7.66525 18.827 6.1701Z"></path>
                                      </svg>
                                    </div>
                                  )}
                                </div>
                              </div>

                              <p className="mt-2 font-semibold text-black pl-7 xls:pl-0 xms:pl-0 xs:pl-0 text-sm">
                                SKU : <span>{data?.sku}</span>
                              </p>
                              <div className="mt-3 pl-5 xls:pl-0 xms:pl-0 xs:pl-0">
                                {data?.categories?.length > 0 ? (
                                  <p className="text-gray-800 font-semibold pl-3 xls:pl-0 xms:pl-0 xs:pl-0">
                                    Category:{" "}
                                    {data?.categories?.map(
                                      (item, index, arr) => (
                                        <span
                                          className="font-light text-black text-sm uppercase"
                                          key={index}
                                        >
                                          {item?.name}
                                          {index != arr.length - 1
                                            ? ","
                                            : ""}{" "}
                                        </span>
                                      )
                                    )}
                                  </p>
                                ) : null}

                                {data?.brand ? (
                                  <p
                                    className={`${
                                      data?.categories?.length > 0
                                        ? "pl-3 xls:pl-0 xms:pl-0 xs:pl-0"
                                        : "pl-0"
                                    } text-gray-800 font-semibold`}
                                  >
                                    Brand:{" "}
                                    <span className="font-light text-black text-sm">
                                      {data?.brand?.name}
                                    </span>
                                  </p>
                                ) : null}
                              </div>
                              <div className="h-60 w-auto mt-3">
                                {selectedImage?.length > 0 ? (
                                  <img
                                    src={`${hostname}/${selectedImage[0]}`}
                                    className="h-full w-full object-contain"
                                  />
                                ) : (
                                  <img
                                    src={`${hostname}/${data?.galleryImage[0]}`}
                                    className="h-full w-full object-contain"
                                  />
                                )}
                              </div>

                              <div className="mt-5">
                                {data?.isFlashDeal ? (
                                  <>
                                    {data?.isVariant ? (
                                      <h2 className="font-semibold text-lg text-center">
                                        {sellingPrice == regularPrice ? null : (
                                          <span className="line-through text-sm text-black">
                                            ৳ {regularPrice * count}
                                          </span>
                                        )}
                                        <span className="text-red-600">
                                          ৳ {sellingPrice * count}
                                        </span>
                                      </h2>
                                    ) : (
                                      <h2 className="font-semibold text-lg text-center">
                                        {data?.nonVariation.flashPrice ==
                                        data?.nonVariation
                                          ?.regularPrice ? null : (
                                          <span className="line-through text-sm text-black">
                                            ৳{" "}
                                            {data?.nonVariation?.regularPrice *
                                              count}
                                          </span>
                                        )}
                                        <span className="text-red-600">
                                          ৳{" "}
                                          {data?.nonVariation.flashPrice *
                                            count}
                                        </span>
                                      </h2>
                                    )}
                                  </>
                                ) : (
                                  <h2 className="font-semibold text-lg text-center">
                                    {sellingPrice == regularPrice ? null : (
                                      <span className="line-through text-sm text-black">
                                        ৳ {regularPrice * count}
                                      </span>
                                    )}
                                    <span className="text-red-600">
                                      ৳ {sellingPrice * count}
                                    </span>
                                  </h2>
                                )}
                              </div>
                            </>
                          ) : null}
                        </div>

                        <div className="col-span-6">
                          {data !== undefined && Object.keys(data).length > 0 && (
                            <div className="mt-4 xls:mt-2 xms:mt-2 xs:mt-1">
                              {data?.isVariant == true ? (
                                <div>
                                  <p className="text-black font-bold text-lg mt-3 flex">
                                    {data?.variations[0]?.attributeOpts?.map(
                                      (val, idx, arr) =>
                                        val.attributeName +
                                        (idx != arr.length - 1 ? " - " : "")
                                    )}
                                  </p>
                                  <div className="grid grid-cols-4 xms:grid-cols-3 xs:grid-cols-3 mt-3 gap-4">
                                    {data?.variations?.map((item, index) => (
                                      <div
                                        className={`${
                                          index == activeVariation
                                            ? "bg-gray-600  text-white border border-black"
                                            : "border border-black text-black"
                                        } px-2 py-2 cursor-pointer`}
                                        key={index}
                                        onClick={() =>
                                          handleVariation(
                                            index,
                                            item?.stock,
                                            item?.images,
                                            item
                                          )
                                        }
                                      >
                                        <p className=" text-sm h-full flex items-center justify-center">
                                          {item?.attributeOpts?.map(
                                            (val, idx, arr) =>
                                              val.name +
                                              (idx != arr.length - 1 ? "-" : "")
                                          )}
                                        </p>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              ) : null}
                              {selected == false ? null : (
                                <div className="flex items-center space-x-1 mt-2">
                                  <p className="text-red-500 text-sm">
                                    Must select a size
                                  </p>
                                  <BsArrowUpShort
                                    className="text-red-500"
                                    size={18}
                                  />
                                </div>
                              )}

                              {stock == 0 && totalStock == 0 ? null : (
                                <div className="grid grid-cols-3 gap-7 mt-1">
                                  <p className="font-semibold text-black">
                                    Quantity:{" "}
                                  </p>
                                  <div className="w-[200px] flex items-center">
                                    <div
                                      className="bg-white px-3 py-2 cursor-pointer"
                                      onClick={() =>
                                        setCount(count > 1 ? count - 1 : 1)
                                      }
                                    >
                                      <BiMinus
                                        size={15}
                                        className="font-semibold"
                                        color="#000"
                                      />
                                    </div>
                                    <input
                                      type="text"
                                      value={count}
                                      className="border-none w-[50px] p-[1px] text-center outline-none bg-gray-100"
                                      readOnly
                                    />
                                    {stock == 0 ? (
                                      <div
                                        className="bg-white px-3  py-2 cursor-pointer"
                                        onClick={() =>
                                          count < stock
                                            ? setCount((c) => c + 1)
                                            : toast.error(
                                                "You cant add more than product!"
                                              )
                                        }
                                      >
                                        <BiPlus
                                          size={15}
                                          color="#000"
                                          className="font-semibold"
                                        />
                                      </div>
                                    ) : (
                                      <div
                                        className="bg-white px-3  py-2 cursor-pointer"
                                        onClick={() =>
                                          count < stock
                                            ? setCount((c) => c + 1)
                                            : toast.error(
                                                "You cant add more than product!"
                                              )
                                        }
                                      >
                                        <BiPlus
                                          size={15}
                                          color="#000"
                                          className="font-semibold"
                                        />
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}

                              {/* <div className="mt-3">
                                {stock == 0 || stock == null ? (
                                  <button className="font-semibold text-white px-3 py-1 bg-red-500 text-sm tracking-wider rounded-md outline-none">
                                    Out of stock
                                  </button>
                                ) : (
                                  <p className="text-black">
                                    <span className="font-semibold pr-1">
                                      {stock == null ? totalStock : stock}
                                    </span>
                                    <span className="text-gray-400">
                                      products available
                                    </span>{" "}
                                  </p>
                                )}
                              </div> */}

                              {buyFlag ? (
                                <div className="mt-6">
                                  {stock == 0 || stock == null ? (
                                    <button className="px-7 py-2 bg-gray-300 text-white  font-semibold text-sm tracking-wide cursor-not-allowed">
                                      Buy now
                                    </button>
                                  ) : (
                                    <button
                                      className="px-7 py-2 bg-green-500 text-white  font-semibold text-sm"
                                      onClick={() => handleBuyNow()}
                                    >
                                      Buy now
                                    </button>
                                  )}
                                </div>
                              ) : (
                                <div className="mt-6">
                                  {stock == 0 || stock == null ? (
                                    <button className="px-7 py-2  text-white bg-primary font-semibold text-sm tracking-wide cursor-not-allowed">
                                      Add to cart
                                    </button>
                                  ) : (
                                    <button
                                      className="px-7 py-2 bg-myBlue-700 text-white bg-primary font-semibold text-sm"
                                      onClick={() => handleCart()}
                                    >
                                      Add to cart
                                    </button>
                                  )}
                                </div>
                              )}
                            </div>
                          )}

                          {/* <p className="font-body font-semibold mt-3 py-1 text-black rounded-md">
                          {data?.chartTitle}
                        </p> */}

                          {/* <div className={styles.table__container}>
                          <table>
                            {data?.chartList?.length
                              ? data?.chartList?.map((item, index) => (
                                  <tr
                                    className={`${
                                      size == item[1]
                                        ? styles.single__variation
                                        : styles.single__variation
                                    }`}
                                    key={index}
                                  >
                                    {index === 0
                                      ? item?.map((i, ind) => (
                                          <>{<th>{i}</th>}</>
                                        ))
                                      : item?.map((i, ind) => (
                                          <>{<td>{i}</td>}</>
                                        ))}
                                  </tr>
                                ))
                              : null}
                          </table>
                        </div> */}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ModalCart;

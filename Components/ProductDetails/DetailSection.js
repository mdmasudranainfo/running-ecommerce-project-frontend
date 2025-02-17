import { useStatus } from "@/context/contextStatus";
import { useRouter } from "next/router";
import { destroyCookie, setCookie } from "nookies";
import { useEffect, useState } from "react";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { toast } from "react-toastify";
import { RxCross2 } from "react-icons/rx";
import postRequest from "@/lib/postRequest";
import { BiMinus, BiPlus } from "react-icons/bi";
import { BsArrowUpShort } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";

const DetailSection = ({
  userPhone,
  data,
  selectImage,
  stock,
  setStock,
  regularPrice,
  sellingPrice,
  selected,
  setSelected,
  showingVariantList,
  selectedVariation,
  handleAttribute,
  imageSelect,
  description,
  short_description
}) => {
  const {
    setPromoDiscount,
    setIsRenderMe,
    renderMe,
    setShakeAnimation,
    token,
    wishCall,
    setWishCall,
    wishData,
    orderBtn,
    cartBtn,
    isScrolled,
  } = useStatus();

  const router = useRouter();

  const [arr, setArr] = useState([]);

  const { cartItems, setCartItems } = useStatus();

  const [activeVariation, setActiveVariation] = useState(null);

  const [count, setCount] = useState(1);

  const [variation, setVariation] = useState({});

  const [isExist, setIsExist] = useState(null);
  const [isVariant, setIsVariant] = useState(false);
  const handleVariant = () => setIsVariant(!isVariant);

  useEffect(() => {
    if (data) {
      setSelected(false);
      setActiveVariation(null);
      setStock(null);
    }
  }, [data]);

  const handleCart = () => {
    if (data?.isVariant) {
      let isNotValid = showingVariantList.find(
        (val) => val.selectedValue === ""
      );
      if (selectedVariation !== null && !isNotValid) {
        setCount(1);
        let item = {
          _id: data?._id,
          name: data?.name,
          // image: selectImage?.length > 0 ? selectImage : data?.galleryImage[0],
          image:
            data?.isVariant == false
              ? data?.galleryImage[0]
              : data?.isVariant == true && selectImage?.length == 0
              ? imageSelect
              : selectImage,
          sellingPrice: data?.isFlashDeal
            ? selectedVariation?.flashPrice
            : selectedVariation?.sellingPrice,
          isVariant: data?.isVariant,
          quantity: count,
          variation: selectedVariation,
          stock: stock,
        };

        const is_exist = cartItems.find(
          (variation) => variation?.variation?._id == item.variation._id
        );

        if (is_exist) {
          const index = cartItems.findIndex(
            (variation) => variation?.variation == is_exist?.variation
          );

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
    } else {
      setCount(1);
      let item = {
        _id: data?._id,
        name: data?.name,
        image:
          data?.isVariant == false
            ? data?.galleryImage[0]
            : data?.isVariant == true && selectImage?.length == 0
            ? imageSelect
            : selectImage,
        sellingPrice: data?.isFlashDeal
          ? data?.nonVariation?.flashPrice
          : data?.nonVariation?.sellingPrice,
        isVariant: data?.isVariant,
        quantity: count,
        variation: selectedVariation,
        stock: stock,
      };

      const is_exist = cartItems.find(
        (variation) => variation?._id == item?._id
      );

      if (is_exist) {
        const index = cartItems.findIndex(
          (variation) => variation?._id == is_exist?._id
        );

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
    }
  };

  const handleBuyNow = () => {
    if (data?.isVariant) {
      let isNotValid = showingVariantList.find(
        (val) => val.selectedValue === ""
      );
      if (selectedVariation !== null && !isNotValid) {
        setCount(1);
        let item = {
          _id: data?._id,
          name: data?.name,
          image:
            data?.isVariant == false
              ? data?.galleryImage[0]
              : data?.isVariant == true && selectImage?.length == 0
              ? data?.variations[0]?.images[0]
              : selectImage,
          sellingPrice: data?.isFlashDeal
            ? selectedVariation?.flashPrice
            : selectedVariation?.sellingPrice,
          isVariant: data?.isVariant,
          quantity: count,
          variation: selectedVariation,
          stock: stock,
        };

        const is_exist = cartItems.find(
          (variation) => variation?.variation?._id == item?.variation?._id
        );

        if (is_exist) {
          const index = cartItems.findIndex(
            (variation) => variation?.variation == is_exist?.variation
          );

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
          setIsRenderMe(!renderMe);

          router.push(`/checkout`);
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
          setIsRenderMe(!renderMe);

          router.push(`/checkout`);
        }
      } else {
        setSelected(true);
      }
    } else {
      setCount(1);
      let item = {
        _id: data?._id,
        name: data?.name,
        image:
          data?.isVariant == false
            ? data?.galleryImage[0]
            : data?.isVariant == true && selectImage?.length == 0
            ? data?.variations[0]?.images[0]
            : selectImage,
        sellingPrice: data?.isFlashDeal
          ? data?.nonVariation?.flashPrice
          : data?.nonVariation?.sellingPrice,
        isVariant: data?.isVariant,
        quantity: count,
        variation: selectedVariation,
        stock: stock,
      };

      const is_exist = cartItems.find(
        (variation) => variation?._id == item?._id
      );

      if (is_exist) {
        const index = cartItems.findIndex(
          (variation) => variation?._id == is_exist?._id
        );

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

        setIsRenderMe(!renderMe);
        router.push(`/checkout`);
      }

      if (is_exist === undefined) {
        setCartItems((cartItems) => [...cartItems, item]);
        setCookie(null, "lazmaCart", JSON.stringify([...cartItems, item]), {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
        });
        setPromoDiscount(null);

        setIsRenderMe(!renderMe);
        router.push(`/checkout`);
      }
    }
  };

  useEffect(() => {
    const is_exist = wishData.find((product) => product?._id == data?._id);
    setIsExist(is_exist);
  }, [wishData, data]);

  return (
    <div className="dark:text-black col-span-8 sm:col-span-1 pb-7 xls:pb-3 xms:pb-3 xs:pb-3 xls:pr-2 xms:pr-2 xs:pr-1 pt-7 xls:pt-0 xms:pt-0 xs:pt-0">
      <div>
        <div
          className={` bg-white ${
            isScrolled
              ? "xls:fixed  xms:fixed xs:fixed xxl:hidden xl:hidden lg:hidden md:hidden sm:hidden"
              : "hidden"
          } fixed left-0 bottom-14 w-full z-20 border border-[#d1d5db] p-2 pt-0 shadow-lg filter drop-shadow-lg`}
        >
          {selected == false ? null : (
            <div className="flex items-center justify-center space-x-1 mt-2">
              <p className="text-red-500 text-sm">Must select all variations</p>
              <BsArrowUpShort className="text-red-500 rotate-180" size={18} />
            </div>
          )}
          <div className=" flex justify-center gap-4 py-1 items-center">
            <div
              className="bg-gray-100 px-3 py-3 cursor-pointer"
              onClick={() => setCount(count > 1 ? count - 1 : 1)}
            >
              <BiMinus size={15} color="#000" className="font-semibold" />
            </div>
            <input
              type="text"
              value={count}
              className="border-2 border-gray-100 p-[5px] w-[50px] text-center dark:bg-white"
              readOnly
            />

            <div
              className="bg-gray-100 px-3  py-[12px] cursor-pointer"
              onClick={() =>
                count < 10
                  ? setCount((c) => c + 1)
                  : toast.error(
                      "You can add a maximum of 10 products at one time."
                    )
              }
            >
              <BiPlus size={15} color="#000" className="font-semibold" />
            </div>
          </div>

          <div className="flex space-x-5 xls:justify-center xms:justify-center xs:justify-center">
            {data?.isVariant == true ? (
              <button
                onClick={() => handleCart()}
                className="px-7 xls:px-[25px] xls:w-2/4 xls:text-base xms:px-6   xs:px-6 py-2  bg-primary text-white  font-semibold tracking-wide md:text-base text-sm rounded-md"
              >
                {cartBtn ?? "Add to Cart"}
              </button>
            ) : (
              <button
                className="px-7 xls:px-[25px] xls:w-2/4 xls:text-base xms:px-6   xs:px-6 py-2  bg-primary text-white  font-semibold tracking-wide md:text-base text-sm rounded-md"
                onClick={() =>
                  data?.isVariant == true ? handleVariant() : handleCart()
                }
              >
                {cartBtn ?? "Add to Cart"}
              </button>
            )}

            <button
              className="px-7 xls:px-[25px] xls:w-2/4 xls:text-base xms:px-6 xs:px-6 py-2 bg-red-500 text-white  font-semibold tracking-wide md:text-base text-sm rounded-md"
              onClick={() => handleBuyNow()}
            >
              {orderBtn ?? "Buy Now"}
            </button>
          </div>
        </div>

        {data?.isFlashDeal == true && (
          <button className="font-semibold text-white px-4 py-1 bg-red-500 rounded-full text-sm tracking-wider flex items-center space-x-2 mb-3">
            <div>
              <AiOutlineThunderbolt color="#fff" size={20} />
            </div>
            <p>Flash Deal</p>
          </button>
        )}

        <div className=" p-2 rounded-md">
          <p className="font-semibold text-xl xls:text-lg xms:text-lg xs:text-base dark:text-black col-span-10 ">
            {data?.name}
          </p>
          <p className="text-primary text-sm"> SKU: {data?.sku}</p>
        </div>

        <div>
                {data?.isFlashDeal ? (
                  <>
                    {data?.isVariant && selectedVariation !== null ? (
                      <h2 className="font-semibold relative">
                        <span className="text-red-600 text-2xl">
                          ৳ {selectedVariation?.flashPrice * count}
                        </span>

                        {selectedVariation?.regularPrice ==
                        selectedVariation?.sellingPrice ? null : (
                          <span className="line-through text-[18px] text-gray-400 ml-2">
                            ৳ {selectedVariation?.regularPrice * count}
                          </span>
                        )}
                      </h2>
                    ) : data?.isVariant && selectedVariation == null ? (
                      <h2 className="font-semibold relative ">
                        <span className="text-red-600 text-2xl">
                          ৳ {data?.variations[0].flashPrice * count}
                        </span>

                        {data?.variations[0]?.regularPrice ==
                        data?.variations[0].flashPrice ? null : (
                          <span className="line-through text-[18px] text-gray-400 ml-2">
                            ৳ {data?.variations[0]?.regularPrice * count}
                          </span>
                        )}
                      </h2>
                    ) : (
                      <h2 className="font-semibold relative ">
                        <span className="text-red-600 text-2xl">
                          ৳ {data?.nonVariation.flashPrice * count}
                        </span>

                        {data?.nonVariation?.regularPrice ==
                        data?.nonVariation.flashPrice ? null : (
                          <span className="line-through text-[18px] text-gray-400 ml-2">
                            ৳ {data?.nonVariation?.regularPrice * count}
                          </span>
                        )}
                      </h2>
                    )}
                  </>
                ) : data?.isVariant && selectedVariation !== null ? (
                  <h2 className="font-semibold relative ">
                    <span className="text-red-600 text-2xl">
                      ৳ {selectedVariation?.sellingPrice * count}
                    </span>

                    {selectedVariation?.regularPrice ==
                    selectedVariation?.sellingPrice ? null : (
                      <span className="line-through text-[18px] text-gray-400 ml-2">
                        ৳ {selectedVariation?.regularPrice * count}
                      </span>
                    )}
                  </h2>
                ) : data?.isVariant && selectedVariation == null ? (
                  <h2 className="font-semibold relative ">
                    <span className="text-red-600 text-2xl">
                      ৳ {data?.variations[0]?.sellingPrice * count}
                    </span>

                    {data?.variations[0]?.regularPrice ==
                    data?.variations[0]?.sellingPrice ? null : (
                      <span className="line-through text-[18px] text-gray-400 ml-2">
                        ৳ {data?.variations[0]?.regularPrice * count}
                      </span>
                    )}
                  </h2>
                ) : (
                  <h2 className="font-semibold relative ">
                    <span className="text-red-600 text-2xl">
                      ৳ {data?.nonVariation?.sellingPrice * count}
                    </span>

                    {data?.nonVariation?.regularPrice ==
                    data?.nonVariation.sellingPrice ? null : (
                      <span className="line-through text-[18px] text-gray-400 ml-2">
                        ৳ {data?.nonVariation?.regularPrice * count}
                      </span>
                    )}
                  </h2>
                )}
              </div>

        {/*  */}
        <div className="mb-4 shadow-sm p-2 rounded-md  border-t">
          {/* <Image
            className="mb-2"
            src={"/image/delivery.gif"}
            width={300}
            height={150}
            alt=""
          /> */}

          <span
            className="text-black 2xl:block xl:block lg:block md:block sm:block hidden "
            dangerouslySetInnerHTML={{
              __html: data?.short_description
            }}
          ></span>
        </div>

        {selected == false ? null : (
          <div className="flex items-center space-x-1 mt-2">
            <p className="text-red-500 text-sm">Must select all variations</p>
            <BsArrowUpShort className="text-red-500 rotate-180" size={18} />
          </div>
        )}
        {/*  */}
        <div className="shadow-md rounded-md  p-3 border-t lg:flex">
          <div>
            <div className=" my-3 xls:my-0 xms:my-0 xs:my-0 sm:my-2 xls:py-2 xms:py-2 xs:py-2 xls:flex xms:flex xs:flex justify-between flex-col  xls:border-t xms:border-t xs:border-t xls:border-b xms:border-b xs:border-b border-[#d1d5db]">
            

              {/*  */}

              {showingVariantList?.map((item, Mainindex) => (
                <>
                  <div className="xls:flex xms:flex xs:flex hidden">
                    {item?.values?.length > 0 ? (
                      <div className="w-[70px]">{item?.name}</div>
                    ) : null}
                    <div className="grid grid-cols-4  gap-4 mb-3">
                      {item?.values.map((col, index) => (
                        <>
                          {item?.selectedValue == col ? (
                            <button
                              className="px-2 py-2 text-xs text-white bg-gray-800 border border-primary rounded"
                              onClick={() => handleAttribute(item, col)}
                            >
                              {col}
                            </button>
                          ) : (
                            <button
                              className="px-1 py-2 text-xs border border-primary rounded"
                              onClick={() => handleAttribute(item, col)}
                            >
                              {col}
                            </button>
                          )}
                        </>
                      ))}
                    </div>
                  </div>
                  <div className="xxl:block xl:block lg:block md:block sm:block hidden">
                    {item?.values?.length > 0 ? <div>{item?.name}</div> : null}
                    <div className="grid grid-cols-5  gap-1 mb-3">
                      {item?.values.map((col, index) => (
                        <>
                          {item?.selectedValue == col ? (
                            <button
                              className=" text-xs text-white bg-gray-800 border border-primary rounded"
                              onClick={() => handleAttribute(item, col)}
                            >
                              {col}
                            </button>
                          ) : (
                            <button
                              className=" text-xs border border-primary rounded"
                              onClick={() => handleAttribute(item, col)}
                            >
                              {col}
                            </button>
                          )}
                        </>
                      ))}
                    </div>
                  </div>
                </>
              ))}
              {/*  */}
            </div>

            {/*  */}
            <div className=" grid grid-cols-12 sm:grid-cols-2 xls:hidden xms:hidden xs:hidden xls:border-b xms:border-b xs:border-b border-[#d1d5db] xls:pb-2 xms:pb-2 xs:pb-2">
              <p className="font-semibold col-span-2 xms:col-span-2 xls:col-span-2 xs:col-span-2 sm:col-span-1">
                Quantity:
              </p>
              <div className="col-span-12 xls:col-span-6  xms:col-span-6 sm:col-span-1 xs:col-span-4 flex  xls:justify-start xms:justify-start xs:justify-start  items-center">
                <div
                  className="bg-gray-100 px-3 py-2 cursor-pointer"
                  onClick={() => setCount(count > 1 ? count - 1 : 1)}
                >
                  <BiMinus size={15} color="#000" className="font-semibold" />
                </div>
                <input
                  type="text"
                  value={count}
                  className="border-2 border-gray-100 p-[1px] w-[50px] text-center dark:bg-white"
                  readOnly
                />

                <div
                  className="bg-gray-100 px-3  py-[8px] cursor-pointer"
                  onClick={() =>
                    count < 10
                      ? setCount((c) => c + 1)
                      : toast.error(
                          "You can add a maximum of 10 products at one time."
                        )
                  }
                >
                  <BiPlus size={15} color="#000" className="font-semibold" />
                </div>
              </div>
            </div>
            {/* hidden sm:block md:block lg:block xl:block 2xl:block */}
            <div className="mt-6 xls:mt-3 xls:pr-2 xms:mt-3 xs:mt-2 sm:mt-2 ">
              <div className="flex space-x-4 xls:justify-center xms:justify-center xs:justify-center">
                {data?.isVariant == true ? (
                  <button
                    onClick={() => handleCart()}
                    className="px-7 xls:px-[25px] xls:w-2/4 xls:text-base xms:px-6   xs:px-6 py-2  bg-primary text-white  font-semibold tracking-wide md:text-base text-sm rounded-md"
                  >
                    {cartBtn ?? "Add to Cart"}
                  </button>
                ) : (
                  <button
                    className="px-7 xls:px-[25px] xls:w-2/4 xls:text-base xms:px-6   xs:px-6 py-2  bg-primary text-white  font-semibold tracking-wide md:text-base text-sm rounded-md"
                    onClick={() =>
                      data?.isVariant == true ? handleVariant() : handleCart()
                    }
                  >
                    {cartBtn ?? "Add to Cart"}
                  </button>
                )}

                <button
                  className="px-7 xls:px-[25px] xls:w-2/4 xls:text-base xms:px-6 xs:px-6 py-2 bg-red-500 text-white  font-semibold tracking-wide md:text-base text-sm rounded-md"
                  onClick={() => handleBuyNow()}
                >
                  {orderBtn ?? "Buy Now"}
                </button>
              </div>

              <div className="mt-2 flex space-x-5 xls:justify-center xms:justify-center xs:justify-center">
                <Link
                  href={`https://wa.me/${userPhone}`}
                  target="_blank"
                  className="whatsapp-button px-[18px] xls:px-[25px] xls:w-2/4 xls:text-base xms:px-6 xs:px-6 py-2 bg-[#25D366] hover:bg-[#20bd59] text-white font-semibold tracking-wide md:text-base text-sm rounded-md flex items-center justify-center gap-2 transition-all duration-300"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp
                  {/* WhatsApp */}
                </Link>
                <Link
                  href={`tel:${userPhone}`}
                  className="call-button px-[20px] xls:px-[25px] xls:w-2/4 xls:text-base xms:px-6 xs:px-6 py-2 bg-[#34B7F1] hover:bg-[#2da8dd] text-white font-semibold tracking-wide md:text-base text-sm rounded-md flex items-center justify-center gap-2 transition-all duration-300"
                >
                  {/* <svg
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
                  </svg> */}
                  {userPhone}
                </Link>
              </div>
            </div>
          </div>

          <div>
            {/* this is warning section */}
            <div className="mt-3 lg:mt-0">
              {/* Warning Box */}
              <div className="relative overflow-hidden bg-gradient-to-r from-red-50 via-orange-50 to-red-50 rounded-lg p-4 border-l-4 border-red-500 shadow-lg">
                {/* Header */}
                <div className="flex items-center mb-3 border-b border-red-200 pb-2">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-red-500 rounded-full animate-ping opacity-20"></div>
                    <svg
                      className="w-6 h-6 text-red-500 relative"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-red-800 font-bold ml-2 text-lg">
                    সতর্কবার্তা
                  </h3>
                </div>

                {/* Content */}
                <div className="space-y-1 max-w-[500px]">
                  <div className="flex items-start group">
                    <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5 mr-2 shrink-0 group-hover:scale-125 transition-transform"></div>
                    <p className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                      আমাদের ওয়েবসাইটে ইচ্ছাকৃতভাবে ফেইক অর্ডার করে আমাদের
                      ক্ষতিগ্রস্ত করার চেষ্টা করলে, কঠোর আইনি পদক্ষেপ গ্রহণ করা
                      হবে।
                    </p>
                  </div>

                  <div className="flex items-start group">
                    <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5 mr-2 shrink-0 group-hover:scale-125 transition-transform"></div>
                    <p className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                      এটা মনে রাখুন: প্রতিটি অর্ডার আমরা নিবিড়ভাবে পর্যবেক্ষণ
                      করি।
                    </p>
                  </div>

                  <div className="flex items-start group">
                    <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5 mr-2 shrink-0 group-hover:scale-125 transition-transform"></div>
                    <p className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                      ফেইক অর্ডার শনাক্ত হলে, আপনার আইপি ঠিকানা এবং অন্যান্য
                      পরিচয় সংরক্ষণ করা হবে।
                    </p>
                  </div>
                </div>

                {/* Bottom Info */}
                <div className="mt-4 pt-3 border-t border-red-200">
                  <div className="flex items-center justify-center text-xs text-red-600 bg-red-50 py-2 px-3 rounded-full group hover:bg-red-100 transition-colors">
                    <svg
                      className="w-4 h-4 mr-1 group-hover:animate-bounce"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="font-medium">
                      অনুগ্রহ করে সতর্কতার সাথে অর্ডার করুন
                    </span>
                  </div>
                </div>

                {/* Animated Background Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-shine"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailSection;

import { useStatus } from "@/context/contextStatus";
import { hostname } from "@/lib/config";
import Image from "next/image";
import { useRouter } from "next/router";
import { destroyCookie, setCookie } from "nookies";
import { useState } from "react";
import { TbShoppingBag } from "react-icons/tb";
import { toast } from "react-toastify";
import ModalCart from "./ModalCart";
import styles from "./ProductCard.module.css";
import { FaHeart } from "react-icons/fa";

const ProductCard = ({ item }) => {
  const router = useRouter();

  const {
    cartItems,
    setCartItems,
    setPromoDiscount,
    setIsRenderMe,
    renderMe,
    setShakeAnimation,
    orderBtn,
  } = useStatus();

  const [selectedItem, setSelectedItem] = useState({});

  const [modalOpen, setIsModalOpen] = useState(false);

  const [buyFlag, setBuyFlag] = useState(false);

  const [count, setCount] = useState(1);

  const handleRoute = (slug) => {
    router.push(`/products/${slug}`);
  };

  const handleCart = (item) => {
    if (item?.isVariant == false) {
      if (item?.nonVariation?.stock > 0) {
        let itemCart = {
          _id: item?._id,
          name: item?.name,
          image: item?.galleryImage[0],
          sellingPrice: item?.isFlashDeal
            ? item?.isVariant
              ? item?.variations[0]?.flashPrice
              : item?.nonVariation?.flashPrice
            : item?.nonVariation?.sellingPrice,
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
            setShakeAnimation(true);
            setTimeout(() => {
              setShakeAnimation(false);
            }, 2000);
            setIsRenderMe(!renderMe);
          } else {
            toast.error("you cant add more products");
          }
        }

        if (is_exist === undefined) {
          setCartItems((cartItems) => [...cartItems, itemCart]);
          setCookie(
            null,
            "lazmaCart",
            JSON.stringify([...cartItems, itemCart]),
            {
              maxAge: 30 * 24 * 60 * 60,
              path: "/",
            }
          );
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
        toast.error("This item is out of stock!");
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
        sellingPrice: item?.isFlashDeal
          ? item?.isVariant
            ? item?.variations[0]?.flashPrice
            : item?.nonVariation?.flashPrice
          : item?.nonVariation?.sellingPrice,
        quantity: 1,
        isVariant: item?.isVariant,
        variation: item?.variations?.length > 0 ? item?.variations : null,
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
          setShakeAnimation(true);
          setTimeout(() => {
            setShakeAnimation(false);
          }, 2000);
          setIsRenderMe(!renderMe);
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
        setIsRenderMe(!renderMe);
        setShakeAnimation(true);
        setTimeout(() => {
          setShakeAnimation(false);
        }, 2000);
        router.push(`/checkout`);
      }
    } else {
      router.push(`/products/${item?.slug}`);
    }
  };

  return (
    <>
      <div className="relative bg-white  ">
        <div className="absolute top-0 left-0 bg-primary z-10 text-white rounded-md px-1">
          In Stock
        </div>
        <div className="absolute top-0 right-0 p-1  z-10 text-white rounded-md px-1">
          <FaHeart size={20} className="text-primary cursor-pointer" />
        </div>
        <div
          className="h-[195px] xls:h-[150px] xms:h-[150px] xs:h-[150px] overflow-hidden cursor-pointer "
          onClick={() => handleRoute(item?.slug)}
        >
          {item?.isVariant == false ? (
            <>
              {item?.galleryImage?.length > 0 ? (
                <Image
                  priority={true}
                  height={250}
                  width={250}
                  alt="Product"
                  src={`${hostname}/${item?.galleryImage[0]}`}
                  className={`rounded-md ${styles.zoom}`}
                />
              ) : (
                <Image
                  priority={true}
                  height={250}
                  width={250}
                  alt="Product"
                  src={`/image/placeholder_image.png`}
                  className={`rounded-md ${styles.zoom}`}
                />
              )}
            </>
          ) : (
            <>
              {item?.variations[0]?.images?.length > 0 ? (
                <>
                  <Image
                    priority={true}
                    height={250}
                    width={250}
                    alt="Product"
                    src={`${hostname}/${item?.variations[0]?.images[0]}`}
                    className={`rounded-md ${styles.zoom}`}
                  />
                </>
              ) : (
                <Image
                  priority={true}
                  height={250}
                  width={250}
                  alt="Product"
                  // src={`/image/placeholder_image.png`}
                  src={`${hostname}/${item?.galleryImage[0]}`}
                  className={`rounded-md ${styles.zoom}`}
                />
              )}
            </>
          )}
        </div>
        <div className="pt-3">
          {item?.name.length > 35 ? (
            <p
              className="text-sm xs:text-xs xms:text-xs text-black text-center hover:underline cursor-pointer  xs:h-[40px]"
              onClick={() => handleRoute(item?.slug)}
            >
              {item?.name.substring(0, 35) + "...."}
            </p>
          ) : (
            <p
              className="text-sm xs:text-xs xms:text-xs text-black  hover:underline cursor-pointer   xs:h-[40px]"
              onClick={() => handleRoute(item?.slug)}
            >
              {item?.name}
            </p>
          )}
          <div className="flex justify-between items-center px-3 xls:px-1 xms:px-1 xs:px-0">
            <div className="flex justify-center  space-x-2 items-center">
              {item?.isFlashDeal ? (
                <>
                  {item?.isVariant == false ? (
                    <>
                      <p className="text-[14px] xs:text-xs xms:text-xs font-semibold text-primary text-center">
                        ৳ {item?.nonVariation?.flashPrice}
                      </p>
                      <p className="text-[12px] xs:text-xs xms:text-xs font-semibold text-red-600 text-center line-through">
                        TK. {item?.nonVariation?.regularPrice}
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-[14px] xs:text-xs xms:text-xs font-semibold text-primary text-center">
                        ৳ {item?.variations[0]?.flashPrice}
                      </p>
                      <p className="text-[12px] xs:text-xs xms:text-xs font-semibold text-red-600 text-center line-through">
                        TK. {item?.variations[0]?.regularPrice}
                      </p>
                    </>
                  )}
                </>
              ) : (
                <>
                  {item?.isVariant == false ? (
                    <>
                      <>
                        {item?.nonVariation?.sellingPrice ==
                        item?.nonVariation?.regularPrice ? null : (
                          <p className="text-[12px] xs:text-xs xms:text-xs font-semibold text-red-600 text-center line-through">
                            TK. {item?.nonVariation?.regularPrice}
                          </p>
                        )}
                      </>
                      <p className="text-[14px] xs:text-xs xms:text-xs font-semibold text-primary text-center">
                        ৳ {item?.nonVariation?.sellingPrice}
                      </p>
                    </>
                  ) : (
                    <>
                      <>
                        {item?.variations[0]?.sellingPrice ==
                        item?.variations[0]?.regularPrice ? null : (
                          <p className="text-[12px] xs:text-xs xms:text-xs font-semibold text-red-600 text-center line-through">
                            TK. {item?.variations[0]?.regularPrice}
                          </p>
                        )}
                      </>
                      <p className="text-[14px] xs:text-xs xms:text-xs font-semibold text-primary text-center">
                        ৳ {item?.variations[0]?.sellingPrice}
                      </p>
                    </>
                  )}
                </>
              )}
            </div>

            {/* <div className="flex items-center">
              <div
                className="h-5 w-5 relative cursor-pointer rounded-full  flex justify-center items-center"
                onClick={() => handleCart(item)}
              >
                <TbShoppingBag
                  size={18}
                  color="#000"
                  className="font-semibold"
                />
              </div>
            </div> */}
          </div>

          <div
            className="rounded-md hover:bg-gray-100 flex justify-center cursor-pointer hover:border border-primary mt-2 hover:m-1 bg-primary group"
            onClick={() => handleBuyNow(item)}
          >
            <div className="flex py-1 items-center space-x-2">
              <p className=" text-sm text-white font-semibold tracking-wider group-hover:text-primary group-hover:duration-500">
                {orderBtn}
              </p>
              {/* <fa */}
            </div>
          </div>
        </div>
      </div>
      {/* <ModalCart
        modalOpen={modalOpen}
        setIsModalOpen={setIsModalOpen}
        selectedItem={selectedItem}
        buyFlag={buyFlag}
      /> */}
    </>
  );
};

export default ProductCard;

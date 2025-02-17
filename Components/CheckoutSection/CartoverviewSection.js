import { hostname } from "@/lib/config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { destroyCookie, setCookie } from "nookies";
import { useEffect, useState } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { RiCoupon2Line } from "react-icons/ri";
import { TiDeleteOutline } from "react-icons/ti";
import { toast } from "react-toastify";
import CouponModal from "./CouponModal";
import { TbTrash } from "react-icons/tb";

const CartoverviewSection = ({
  cartItems,
  setCartItems,
  renderMe,
  setIsRenderMe,
  inside,
  outside,
  subside,
  deliveryType,
  promoDiscount,
  setPromoDiscount,
  handleChange,
  handlePromo,
}) => {
  const [couponModalOpen, setCouponModalOpen] = useState(false);

  const handleClick = () => {
    setCouponModalOpen(true);
  };

  const [count, setCount] = useState(1);

  const [newArr, setNewArr] = useState([]);

  const [total, setTotal] = useState(0);

  const AddCart = (index) => {
    if (cartItems[index].quantity + count <= 10) {
      cartItems[index].quantity += count;
      setCartItems(cartItems);
      setPromoDiscount(null);
      destroyCookie({}, "promoDiscount", {
        path: "/",
      });
      setCookie(null, "lazmaCart", JSON.stringify(cartItems), {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
      setIsRenderMe(!renderMe);
    } else {
      toast.error("You can't add more than 10 products.");
    }
  };

  const SubCart = (index) => {
    if (cartItems[index]?.quantity > 0) {
      cartItems[index].quantity -= count;
      setCartItems(cartItems);
      setPromoDiscount(null);
      destroyCookie({}, "promoDiscount", {
        path: "/",
      });
      setCookie(null, "lazmaCart", JSON.stringify(cartItems), {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
    }
    if (cartItems[index]?.quantity === 0) {
      cartItems?.splice(index, 1);
      setCartItems(cartItems);

      setCookie(null, "lazmaCart", JSON.stringify(cartItems), {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });

      toast(`product removed successfully`);
    }
    setIsRenderMe(!renderMe);
  };

  const DeleteItem = (index) => {
    cartItems?.splice(index, 1);
    setNewArr(cartItems);
    setCartItems(cartItems);

    setCookie(null, "lazmaCart", JSON.stringify(cartItems), {
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });

    toast(`product removed successfully`);
    setIsRenderMe(!renderMe);
  };

  let deliveryFee = 0;

  if (deliveryType == "INSIDE") {
    deliveryFee = inside;
  } else if (deliveryType == "OUTSIDE") {
    deliveryFee = outside;
  } else {
    deliveryFee = 0;
  }

  useEffect(() => {
    if (cartItems?.length == newArr?.length) {
      setPromoDiscount(null);

      destroyCookie({}, "promoDiscount", {
        path: "/",
      });
    }
  }, [renderMe]);

  useEffect(() => {
    let dd = cartItems?.reduce(
      (a, b) =>
        a +
        (b?.sellingPrice
          ? b?.sellingPrice * b?.quantity
          : b?.sellingPrice * b?.quantity),
      0
    );

    setTotal(Number(dd));
  }, [renderMe]);

  return (
    <>
      <div className=" mt-0 xls:mt-1 xms:mt-1 xs:mt-1 px-6 xls:px-4 xms:px-4  xs:px-4 ">
        <div className="flex justify-between items-center py-1 ">
          <p className="text-xl font-semibold dark:text-black border-b-2 border-dashed border-gray-300">
            প্রোডাক্ট ডিটেইল
          </p>

          <div className="flex space-x-1 items-center">
            <p className="text-base font-semibold dark:text-black hidden xls:block xms:block xs:block">
              ৳
              {cartItems?.reduce(
                (a, b) =>
                  a +
                  (b?.sellingPrice
                    ? b?.sellingPrice * b?.quantity
                    : b?.sellingPrice * b?.quantity),
                0
              )}
            </p>
            <p className="text-black font-semibold tracking-wider text-xs">
              ({cartItems?.length} <span className="text-sm">items)</span>
            </p>
          </div>
        </div>
        <div className="mt-1 space-y-3 h-[300px] sm:h-auto xls:h-auto xms:h-auto xs:h-auto overflow-y-auto">
          {cartItems?.map((item, index) => (
            <div
              key={index}
              className="xls:border-b xms:border-b xs:border-b lg:shadow-sm xl:lg:shadow-sm border-b  rounded-lg py-2  border-gray-300 xls:pb-2 xms:pb-2 xs:pb-2 "
            >
              <div className="flex justify-between items-center xs:space-x-2">
                <div className="flex  items-center gap-4">
                  <div className="h-20 w-2h-20 xms:h-12 xms:w-12 xs:h-12 xs:w-12">
                    {typeof item?.image == "string" ? (
                      <img
                        src={`${hostname}/${item?.image}`}
                        className="h-full w-full object-contain rounded-lg"
                      />
                    ) : item?.image?.length > 0 ? (
                      <img
                        src={`${hostname}/${item?.image[0]}`}
                        className="h-full w-full object-contain rounded-lg"
                      />
                    ) : (
                      <img
                        src="/image/placeholder_image.png"
                        className="h-full w-full object-contain rounded-lg"
                      />
                    )}
                  </div>

                  <div className="text-sm text-black pb-2">
                    <p>
                      <span className="font-semibold pr-2 ">{index + 1}.</span>
                      {item?.name.slice(0, 30)}
                      {item?.name?.length > 30 && "..."}
                      <span className="block">
                        {item?.variation == null ? null : (
                          <span className="font-semibold text-black text-xs tracking-wider lowercase">
                            (
                            {item?.variation?.attributeOpts?.map(
                              (val, idx, arr) =>
                                val.name + (idx != arr.length - 1 ? "-" : "")
                            )}
                            )
                          </span>
                        )}
                      </span>
                    </p>

                    <div className="flex items-center">
                      <div
                        className="bg-gray-100 px-3 py-1 cursor-pointer"
                        onClick={() => SubCart(index)}
                      >
                        <BiMinus
                          size={15}
                          color="#000"
                          className="font-semibold"
                        />
                      </div>
                      <input
                        value={item?.quantity}
                        style={{ outline: "none" }}
                        className="border-2 border-gray-100 p-[1px] w-[50px] text-center text-black dark:bg-white"
                      />
                      <div
                        className="bg-gray-100 px-3 py-1 cursor-pointer"
                        onClick={() => AddCart(index)}
                      >
                        <BiPlus
                          size={15}
                          color="#000"
                          className="font-semibold"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center flex-col  gap-2  space-x-3">
                    <h2 className="font-semibold text-lg">
                      <span className="text-sm dark:text-black">
                        ৳ {Number(item?.sellingPrice) * Number(item?.quantity)}
                      </span>
                    </h2>
                    <p
                      className="cursor-pointer text-black text-sm underline flex justify-center "
                      onClick={() => DeleteItem(index)}
                    >
                      Remove
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="border-t xls:border-none xms:border-none xs:border-none border-gray-300  space-y-2">
          <div className="flex justify-between items-center">
            <p className="text-base font-semibold dark:text-black block xls:hidden  xms:hidden xs:hidden">
              Price :
            </p>
            {/* <div
              className="hidden justify-end sm:flex xls:flex xms:flex xs:flex items-center space-x-1 pr-3 py-3 cursor-pointer"
              onClick={() => handleClick()}
            >
              <div>
                <RiCoupon2Line
                  size={20}
                  className="text-red-500 fill-current font-bold"
                />
              </div>
              <p className="text-red-500 font-semibold">Apply coupon </p>
            </div> */}
            <p className="text-base font-semibold dark:text-black xls:hidden xms:hidden xs:hidden">
              ৳
              {cartItems?.reduce(
                (a, b) =>
                  a +
                  (b?.sellingPrice
                    ? b?.sellingPrice * b?.quantity
                    : b?.sellingPrice * b?.quantity),
                0
              )}
            </p>
          </div>
          {cartItems?.length == 0 ? null : (
            <div className="flex justify-between xls:hidden xms:hidden xs:hidden">
              <p className="text-base font-semibold dark:text-black">
                Delivery charge :
              </p>
              <p className="text-base font-semibold dark:text-black">
                (+) ৳ {Number(deliveryFee)}
              </p>
            </div>
          )}

          {cartItems?.length == 0 ||
          promoDiscount == null ||
          promoDiscount == 0 ? null : (
            <div className="flex justify-between">
              <p className="text-base font-semibold dark:text-black">
                Promo discount :
              </p>
              <p className="text-base font-semibold dark:text-black">
                (-) ৳ {promoDiscount}
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-between border-t border-gray-300 mt-3 pt-2 xls:hidden xms:hidden xs:hidden">
          <p className="text-base font-semibold dark:text-black">Due :</p>
          <>
            {cartItems?.length == 0 ? (
              <p className="text-base font-semibold dark:text-black">৳ 0</p>
            ) : (
              <>
                {" "}
                {promoDiscount == null || promoDiscount == 0 ? (
                  <p className="text-base font-semibold dark:text-black">
                    ৳ {total + Number(deliveryFee)}
                  </p>
                ) : (
                  <p className="text-base font-semibold dark:text-black">
                    ৳ {total + Number(deliveryFee) - Number(promoDiscount)}
                  </p>
                )}{" "}
              </>
            )}
          </>
        </div>
      </div>

      <CouponModal
        couponModalOpen={couponModalOpen}
        setCouponModalOpen={setCouponModalOpen}
        handleChange={handleChange}
        handlePromo={handlePromo}
      />
    </>
  );
};

export default CartoverviewSection;

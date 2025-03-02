import { useStatus } from "@/context/contextStatus";
import { hostname } from "@/lib/config";
import Lottie from "lottie-react";
import { useRouter } from "next/router";
import { setCookie } from "nookies";
import { useEffect, useRef } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { TiDeleteOutline } from "react-icons/ti";
import { toast } from "react-toastify";
import EmptyCart from "../Components/EmptyCart.json";
import { trackAddToCart, trackPurchase } from "@/lib/fbCAPI";

const Cart = ({ cartItems, setCartItems }) => {
  const { isCartOpen, setIsCartOpen, renderMe, setIsRenderMe, token } =
    useStatus();
  const wrapperRef = useRef(null);
  const router = useRouter();

  const handleClick = () => setIsCartOpen(false);

  const handleRoute = () => {
    // Track purchase event when proceeding to checkout
    const totalValue = cartItems.reduce((sum, item) => sum + (item.sellingPrice * item.quantity), 0);
    const contentIds = cartItems.map(item => item._id);
    trackPurchase(contentIds, totalValue, 'BDT');
    
    router.push(`/checkout`);
    setIsCartOpen(false);
  };

  const SubCart = (index) => {
    const updatedItems = [...cartItems];
    updatedItems[index].quantity = Math.max(
      0,
      updatedItems[index].quantity - 1
    );
    setCartItems(updatedItems);
    setCookie(null, "lazmaCart", JSON.stringify(updatedItems), {
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });
    setIsRenderMe(!renderMe);
  };

  const AddCart = (index) => {
    const updatedItems = [...cartItems];
    const item = updatedItems[index];
    updatedItems[index].quantity += 1;
    setCartItems(updatedItems);
    setCookie(null, "lazmaCart", JSON.stringify(updatedItems), {
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });
    setIsRenderMe(!renderMe);

    // Track add to cart event
    trackAddToCart([item._id], item.name, item.sellingPrice, 'BDT');
  };

  const DeleteItem = (index) => {
    const updatedItems = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedItems);
    setCookie(null, "lazmaCart", JSON.stringify(updatedItems), {
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });
    toast("Product removed successfully");
    setIsRenderMe(!renderMe);
  };

  return (
    <div
      className={`transition-transform duration-500 rounded-lg overflow-hidden shadow-lg fixed top-[70px] xs:top-[50px] right-[15px] bottom-0 w-[340px] xs:w-[320px] bg-white ${
        isCartOpen ? "translate-x-[16px]" : "translate-x-96"
      } z-20`}
      ref={wrapperRef}
    >
      <div className="flex items-center justify-between py-2 px-4 bg-secondary text-white">
        <div onClick={handleClick} className="cursor-pointer">
          <svg
            className="fill-current text-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
          </svg>
        </div>
        <p className="font-semibold tracking-wider">
          Cart ({cartItems?.length})
        </p>
      </div>

      {cartItems?.length > 0 ? (
        <div className="absolute overflow-y-auto top-[40px] bottom-[60px] w-full px-4 py-2 space-y-4 pb-12">
          {cartItems.map((item, index) => (
            <div key={index} className="flex items-center border-b pb-4">
              <img
                src={
                  item?.image
                    ? `${hostname}/${item.image}`
                    : "/image/placeholder_image.png"
                }
                alt={item?.name}
                className="h-16 w-16 object-contain rounded"
              />
              <div className="flex-1 ml-4">
                <p className="text-sm font-semibold">{item?.name}</p>
                {item?.variation && (
                  <p className="text-xs text-gray-500">
                    (
                    {item.variation.attributeOpts
                      .map((opt) => opt.name)
                      .join(" - ")}
                    )
                  </p>
                )}
                <div className="flex items-center mt-2">
                  <button
                    onClick={() => SubCart(index)}
                    className="bg-gray-100 p-2"
                  >
                    <BiMinus size={15} color="#000" />
                  </button>
                  <input
                    value={item.quantity}
                    readOnly
                    className="w-10 text-center border-gray-200"
                  />
                  <button
                    onClick={() => AddCart(index)}
                    className="bg-gray-100 p-2"
                  >
                    <BiPlus size={15} color="#000" />
                  </button>

                  <p className="ml-2 font-semibold text-sm">
                    ৳ {item.sellingPrice * item.quantity}
                  </p>
                </div>
              </div>
              <button
                onClick={() => DeleteItem(index)}
                className="text-red-500"
              >
                <TiDeleteOutline size={24} />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-full">
          <Lottie loop={true} animationData={EmptyCart} className="w-40" />
        </div>
      )}

      {cartItems.length > 0 && (
        <div className="absolute bottom-0 left-0 w-full bg-white border-t border-gray-300 p-4">
          <div className="flex justify-between">
            <span className="font-semibold text-gray-700">Total:</span>
            <span className="font-bold text-gray-800">
              ৳{" "}
              {cartItems.reduce(
                (total, item) => total + item.sellingPrice * item.quantity,
                0
              )}
            </span>
          </div>
          <button
            onClick={handleRoute}
            className="mt-2 w-full bg-primary text-white py-2 rounded text-center font-semibold"
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;

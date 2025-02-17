import request from "@/lib/request";
import { parseCookies } from "nookies";
import { createContext, useContext, useEffect, useState } from "react";

const ContextStatus = createContext();

const ContextStatusProvider = ContextStatus.Provider;

function StatusProvider({ children }) {
  const cookie = parseCookies();
  let items = cookie?.hasOwnProperty("lazmaCart")
    ? [...JSON.parse(cookie?.lazmaCart)]
    : [];

  const [token, setToken] = useState(cookie?.token ? cookie?.token : "");
  const [userData, setUserData] = useState(cookie?.user ? cookie?.user : "");

  const [isCartOpen, setIsCartOpen] = useState(false);

  const [tabIndex, setTabIndex] = useState(1);

  const [selectImage, setSelectImage] = useState([]);
  const [cartItems, setCartItems] = useState(items);
  const [renderMe, setIsRenderMe] = useState(false);
  const [userId, setUserId] = useState(cookie?.userId ? cookie?.userId : null);
  const [inside, setInside] = useState(cookie?.INSIDE && cookie?.INSIDE);
  const [outside, setOutside] = useState(cookie?.OUTSIDE && cookie?.OUTSIDE);
  const [subside, setSubSide] = useState(cookie?.SUBSIDE && cookie?.SUBSIDE);
  const [deliveryType, setDeliveryType] = useState(cookie?.deliveryType);
  const [promoDiscount, setPromoDiscount] = useState(
    cookie?.promoDiscount && cookie?.promoDiscount
  );

  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState(cookie?.image ? cookie?.image : "");
  const [isAlive, setIsAlive] = useState(false);
  const [popupShow, setPopupShow] = useState(true);
  const [popUpImage, setPopUpImage] = useState(null);

  const [bannerText, setBannerText] = useState(
    cookie?.BANNER && cookie?.BANNER
  );

  const [flag, setFlag] = useState(false);
  const [sideCategory, setSideCategory] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);
  const [resetToken, setResetToken] = useState(
    cookie?.resetToken ? cookie?.resetToken : ""
  );
  const [shakeAnimation, setShakeAnimation] = useState(false);
  const [wishCall, setWishCall] = useState(false);
  const [wishData, setWishData] = useState([]);
  const [userPhone, setUserPhone] = useState(
    cookie?.userPhone ? cookie?.userPhone : ""
  );
  const [isScrolled, setIsScrolled] = useState(false);

  const [orderObj, setOrderObj] = useState(cookie.orderObj);

  const [orderBtn, setOrderBtn] = useState("");

  const [cartBtn, setCartBtn] = useState("");
  const [namePlaceHolder, setNamePlaceHolder] = useState("");
  const [addressPlaceHolder, setAddressPlaceHolder] = useState("");
  const [mobilePlaceHolder, setMobilePlaceHolder] = useState("");
  const [customerNotesPlaceholder, setCustomerNotesPlaceholder] = useState("");

  // web setting Code
  const [data, setData] = useState({});
  useEffect(() => {
    const getData = async () => {
      const res = await request(`setting/view`);

      setData(res?.data);
    };
    getData();
  }, []);

  // data not available

  // web setting Code

  return (
    <ContextStatusProvider
      value={{
        Logo: data?.logoImg,
        Favicon: data?.favicon,
        Email: data?.email,
        shopName: data?.shopName,
        isCartOpen,
        setIsCartOpen,
        token,
        setToken,
        userData,
        setUserData,
        tabIndex,
        setTabIndex,
        selectImage,
        setSelectImage,
        cartItems,
        setCartItems,
        renderMe,
        setIsRenderMe,
        userId,
        setUserId,
        inside,
        setInside,
        outside,
        setOutside,
        subside,
        setSubSide,
        deliveryType,
        setDeliveryType,
        promoDiscount,
        setPromoDiscount,
        loading,
        setLoading,
        image,
        setImage,
        isAlive,
        setIsAlive,
        popupShow,
        setPopupShow,
        popUpImage,
        setPopUpImage,
        bannerText,
        setBannerText,
        flag,
        setFlag,
        sideCategory,
        setSideCategory,
        profileMenu,
        setProfileMenu,
        resetToken,
        setResetToken,
        shakeAnimation,
        setShakeAnimation,
        wishCall,
        setWishCall,
        wishData,
        setWishData,
        userPhone,
        setUserPhone,
        isScrolled,
        setIsScrolled,
        orderObj,
        setOrderObj,
        orderBtn,
        setOrderBtn,
        cartBtn,
        setCartBtn,
        namePlaceHolder,
        setNamePlaceHolder,
        addressPlaceHolder,
        setAddressPlaceHolder,
        mobilePlaceHolder,
        setMobilePlaceHolder,
        customerNotesPlaceholder,
        setCustomerNotesPlaceholder,
      }}
    >
      {children}
    </ContextStatusProvider>
  );
}

function useStatus() {
  const all = useContext(ContextStatus);
  return all;
}

export { StatusProvider, useStatus };

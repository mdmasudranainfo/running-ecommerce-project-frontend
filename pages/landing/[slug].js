import AddressSection from "@/Components/CheckoutSection/AddressSection";
import CartoverviewSection from "@/Components/CheckoutSection/CartoverviewSection";
import PaymentSection from "@/Components/CheckoutSection/PaymentSection";
import { useStatus } from "@/context/contextStatus";
import { company_link, company_name, hostname, link } from "@/lib/config";
import postRequest from "@/lib/postRequest";
import { FaFacebookF } from "react-icons/fa6";
import request from "@/lib/request";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { destroyCookie, setCookie } from "nookies";
import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import Slider from "react-slick";
import { toast } from "react-toastify";
import Head from "next/head";

const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  initialSlide: 0,
  autoplay: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: "26px",
        arrows: false,
      },
    },
  ],
};

const LandingPage = ({ data }) => {
  const {
    cartItems,
    setCartItems,
    renderMe,
    setIsRenderMe,
    deliveryType,
    setDeliveryType,
    inside,
    outside,
    subside,
    promoDiscount,
    setPromoDiscount,
    token,
    setInside,
    setOutside,
    setOrderObj,
    namePlaceHolder,
    addressPlaceHolder,
    mobilePlaceHolder,
    customerNotesPlaceholder,
    setNamePlaceHolder,
    setAddressPlaceHolder,
    setMobilePlaceHolder,
    setCustomerNotesPlaceholder,
    userPhone,
    shopName,
    Logo,
    Favicon,
  } = useStatus();
  const router = useRouter();
  const [total, setTotal] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [deliveryOption, setDeliveryOption] = useState("outside");
  const [customerNotes, setCustomerNotes] = useState("");
  const [customerId, setCustomerId] = useState(null);
  const [globalData, setGlobalData] = useState({});
  //  const [isVariant]

  let arr = [];

  cartItems?.map((item, index) => {
    arr.push({
      productId: item?._id,
      isVariant: item?.isVariant,
      quantity: item?.quantity,
      price: item?.sellingPrice,
      variationId: item?.variation == null ? "" : item?.variation?._id,

      variationName:
        item?.variation == null
          ? ""
          : item?.variation?.attributeOpts?.map((i) => i?.name).join("-"),
    });
  });

  let deliveryFee = 0;

  if (deliveryType == "INSIDE") {
    deliveryFee = inside;
  } else if (deliveryType == "OUTSIDE") {
    deliveryFee = outside;
  } else {
    deliveryFee = 0;
  }

  const handleOrder = async () => {
    let validate = false;

    if (cartItems?.length == 0) {
      toast.error("you must have to add atleast 1 product");
      return;
    }

    if (name == "" || name == undefined) {
      toast.error("name is required");
      return;
    }

    if (phone == "" || phone == undefined) {
      toast.error("Phone number is required");
      return;
    }

    if (phone) {
      var bdMobilePattern = /^(\+)?(88)?01[3-9]\d{8}$/;
      if (bdMobilePattern.test(phone)) {
      } else {
        toast.error("Not a valid phone number");

        return;
      }
    }

    if (address == "" || address == undefined) {
      toast.error("Address details is required");
      return;
    }

    if (validate == false) {
      setIsLoading(true);
      const res = await postRequest(`order/create-customer-order`, {
        customerId: customerId ? customerId : "",
        products: arr,
        promo: "",
        payment: {
          paymentType: "Cod",
          amount: 0,
          details: "",
          documentImg: "",
        },
        insideDhaka: deliveryType == "INSIDE" ? true : false,
        customerCharge: {
          totalProductPrice: Number(total),
          discountPrice: promoDiscount ? Number(promoDiscount) : 0,
          deliveryCharge: Number(deliveryFee),
          totalPayTk: 0,
        },
        deliveryAddress: {
          name: name,
          phone: phone,
          address: address,
          customerNotes,
        },
      });

      if (res?.success) {
        destroyCookie([], "lazmaCart", {
          path: "/",
        });
        destroyCookie([], "promoDiscount", {
          path: "/",
        });
        setOrderObj(res?.data);
        setCookie(null, "orderObj", JSON.stringify(res?.data), {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
        });
        toast(res?.message);
        setIsLoading(false);
        setCartItems([]);
        setPromoDiscount("");
        setIsRenderMe(!renderMe);
        router.push(`/payment-successful`);
      } else {
        toast.error(res?.message);
        setIsLoading(false);
      }
    }
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

  useEffect(() => {
    const getData = async () => {
      const res = await request(`setting/view`);

      setGlobalData(res?.data);
      setNamePlaceHolder(res?.data?.customerNamePlaceholder);
      setAddressPlaceHolder(res?.data?.customerAddressPlaceholder);
      setMobilePlaceHolder(res?.data?.customerMobilePlaceholder);
      setCustomerNotesPlaceholder(res?.data?.customerNotesPlaceholder);
    };
    getData();
  }, []);

  useEffect(() => {
    const totalPrice = cartItems?.reduce(
      (a, b) =>
        a +
        (b?.sellingPrice
          ? b?.sellingPrice * b?.quantity
          : b?.sellingPrice * b?.quantity),
      0
    );
    setTotal(totalPrice);
  }, [cartItems, renderMe]);

  useEffect(() => {
    if (deliveryOption == "inside") {
      setDeliveryType("INSIDE");
      setCookie(null, "deliveryType", "INSIDE", {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
    } else {
      setDeliveryType("OUTSIDE");
      setCookie(null, "deliveryType", "OUTSIDE", {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
    }
  }, [deliveryOption]);

  useEffect(() => {
    let item = data?.product;
    if (item?.isVariant == false) {
      let itemCart = {
        _id: item?._id,
        name: item?.name,
        image: item?.galleryImage[0],
        sellingPrice: item?.nonVariation?.sellingPrice,
        isVariant: item?.isVariant,
        quantity: 1,
        variation: item?.variations[0],
        stock: item?.nonVariation?.stock,
      };
      const is_exist = cartItems.find(
        (variation) => variation._id == itemCart._id
      );
      if (!is_exist) {
        setCartItems((prevItems) => [...prevItems, itemCart]);
        setCookie(null, "lazmaCart", JSON.stringify([...cartItems, itemCart]), {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
        });
      }
    }
  }, [data]);

  return (
    <>
      <Head>
        <title>{shopName}</title>
        <meta name="description" content={shopName} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={`${hostname}/${Favicon}`} />
        <link
          href="https://fonts.googleapis.com/css2?family=Baloo+Da+2:wght@400..800&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="mt-[-2rem]">
        <div className="bg-gray-100 min-h-screen">
          <header className="bg-primary  text-white text-center py-2">
            <div className="flex justify-between items-center max-w-7xl mx-auto px-4">
              <div className="text-2xl">
                <Link href={"/"}>
                  <img
                    className="w-56  object-contain  max-h-[40px]"
                    src={`${hostname}/${globalData?.logoImg}`}
                    alt="logo"
                  />
                </Link>
              </div>
              <div>
                <Link
                  href={globalData?.socialLinks?.facebook ?? ""}
                  target="_blank" // Opens in a new tab/window
                  rel="noopener noreferrer" // Security measure
                >
                  <FaFacebookF />
                </Link>
              </div>
            </div>
          </header>

          {/* new code start */}

          <section className="relative max-w-7xl mx-auto xs:px-0 lg:px-4 mt-4">
            <div className="relative rounded-lg overflow-hidden">
              {/* Banner Image */}
              <div className="relative h-96">
                <img
                  src={`${hostname}/${data?.title_image_url}`}
                  alt="ads"
                  className="w-full h-full object-cover"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                {/* Text and Button */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
                  <h1 className="text-2xl lg:text-4xl font-bold mb-4 !text-white">
                    {data?.name}
                  </h1>
                  <p className="text-lg font-medium mb-6">{data?.sub_title}</p>
                  <Link
                    className="bg-primary px-6 py-3 text-lg text-white rounded-lg font-bold shadow-lg"
                    href={`#submit`}
                  >
                    অর্ডার কারতে ক্লিক করুন
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* new code end */}

          {data?.video_url && (
            <section className="max-w-7xl mx-auto xs:px-0 lg:px-4 mt-4 ">
              <div className="text-center sm:py-4 xls:py-4 py-8 bg-orange-100 rounded-lg">
                <div className="mt-4 max-w-4xl mx-auto px-2 rounded overflow-hidden">
                  {data?.video_url && (
                    <ReactPlayer
                      url={data?.video_url}
                      width="100%"
                      height="400px"
                      volume={1}
                      stopOnUnmount={false}
                      controls
                    />
                  )}
                </div>

                {/* <Link
                  className="bg-primary px-6 py-2 mt-5 inline-block text-lg text-white rounded font-bold"
                  href={`#submit`}
                >
                  অর্ডার কারতে ক্লিক করুন
                </Link> */}
              </div>
            </section>
          )}

          <section className="max-w-7xl mx-auto xs:px-0 lg:px-4  mt-4">
            <p className="text-center text-2xl font-bold  bg-primary text-white py-2">
              {data?.descTitle}
            </p>
            <div
              className={`py-4 text-area px-4`}
              dangerouslySetInnerHTML={{ __html: data?.description }}
            ></div>

            <div className="text-center">
              <Link
                className="bg-primary px-6 py-2 mt-5 inline-block text-lg text-white rounded font-bold"
                href={`#submit`}
              >
                অর্ডার কারতে ক্লিক করুন
              </Link>
            </div>
          </section>
          <section className="max-w-7xl mx-auto px-4 py-8">
            <div className="slider-container">
              <Slider {...settings}>
                {data?.product?.galleryImage?.map((image, i) => (
                  <div
                    key={i}
                    className="px-1 flex justify-center items-center"
                  >
                    <Image
                      className="w-auto h-auto max-w-full max-h-80 object-contain" // Ensures proper scaling
                      src={`${hostname}/${image}`}
                      width={300}
                      height={300}
                      alt="product"
                    />
                  </div>
                ))}
              </Slider>
            </div>
          </section>

          <section className=" py-4 max-w-7xl mx-auto ">
            <h2 className=" text-2xl font-bold bg-primary !text-white text-center py-2">
              {data?.termTitle}
            </h2>

            <div
              className="py-4 text-area px-4"
              dangerouslySetInnerHTML={{ __html: data?.use_term }}
            ></div>

            {/* <ul className="text-gray-700 mt-4 space-y-2 xms:px-2 xls:px-2 lg:px-0">
          {
            data?.use_term?.map((use,index)=> <li key={index} className='list-none text-xl mb-1 font-bold'>{use}</li>)
          }
        </ul> */}
            <div className="text-center">
              <Link
                className="bg-primary px-6 py-2 mt-5 inline-block text-lg text-white rounded font-bold"
                href={`#submit`}
              >
                অর্ডার কারতে ক্লিক করুন
              </Link>
            </div>
          </section>
          {data?.reviewTitle && (
            <>
              <section className="max-w-7xl mx-auto xs:px-0 lg:px-4 py-4">
                <h2 className=" text-2xl font-bold bg-primary !text-white  text-center py-2">
                  {data?.reviewTitle}
                </h2>
                <div className="slider-container">
                  <Slider {...settings}>
                    {data?.reviews?.map((image, i) => (
                      <div key={i} className="px-1">
                        <Image
                          className="w-full"
                          src={`${hostname}/${image}`}
                          width={300}
                          height={300}
                          alt="review"
                        />
                      </div>
                    ))}
                  </Slider>
                </div>
              </section>
            </>
          )}

          <section id="submit" className="bg-gray-100 xls:py-4 py-8">
            <h2 className="text-center text-xl font-bold text-gray-800">
              অর্ডার করতে সঠিক তথ্য দিয়ে নিচের ফর্মটি পূরণ করুন
            </h2>
            {/* <div className="max-w-7xl mx-auto mt-4 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <p onClick={()=> setIsVariant(true)}>Please Select variant</p>
          </div> */}
            <div className="max-w-7xl mx-auto mt-4 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <div className="grid sm:grid-cols-1 xls:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 xxl:grid-cols-2   gap-4">
                <div>
                  <AddressSection
                    name={name}
                    setName={setName}
                    phone={phone}
                    setPhone={setPhone}
                    address={address}
                    setAddress={setAddress}
                    deliveryOption={deliveryOption}
                    setDeliveryOption={setDeliveryOption}
                    customerNotes={customerNotes}
                    setCustomerNotes={setCustomerNotes}
                    namePlaceHolder={namePlaceHolder ?? "Your Name"}
                    addressPlaceHolder={addressPlaceHolder ?? "Your Address"}
                    mobilePlaceHolder={mobilePlaceHolder ?? "Mobile Number"}
                    customerNotesPlaceholder={
                      customerNotesPlaceholder ?? "Notes"
                    }
                  />
                  <div className="flex justify-center xls:mt-0 xms:mt-0 xs:mt-0 mt-3">
                    {isLoading == true ? (
                      <button className="bg-primary  text-white hover:bg-orange-500 px-8 py-1 rounded-md cursor-pointer flex space-x-1 disabled">
                        <svg
                          className="fill-current text-white animate-spin h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2C12.5523 2 13 2.44772 13 3V6C13 6.55228 12.5523 7 12 7C11.4477 7 11 6.55228 11 6V3C11 2.44772 11.4477 2 12 2ZM12 17C12.5523 17 13 17.4477 13 18V21C13 21.5523 12.5523 22 12 22C11.4477 22 11 21.5523 11 21V18C11 17.4477 11.4477 17 12 17ZM22 12C22 12.5523 21.5523 13 21 13H18C17.4477 13 17 12.5523 17 12C17 11.4477 17.4477 11 18 11H21C21.5523 11 22 11.4477 22 12ZM7 12C7 12.5523 6.55228 13 6 13H3C2.44772 13 2 12.5523 2 12C2 11.4477 2.44772 11 3 11H6C6.55228 11 7 11.4477 7 12ZM19.0711 19.0711C18.6805 19.4616 18.0474 19.4616 17.6569 19.0711L15.5355 16.9497C15.145 16.5592 15.145 15.9261 15.5355 15.5355C15.9261 15.145 16.5592 15.145 16.9497 15.5355L19.0711 17.6569C19.4616 18.0474 19.4616 18.6805 19.0711 19.0711ZM8.46447 8.46447C8.07394 8.85499 7.44078 8.85499 7.05025 8.46447L4.92893 6.34315C4.53841 5.95262 4.53841 5.31946 4.92893 4.92893C5.31946 4.53841 5.95262 4.53841 6.34315 4.92893L8.46447 7.05025C8.85499 7.44078 8.85499 8.07394 8.46447 8.46447ZM4.92893 19.0711C4.53841 18.6805 4.53841 18.0474 4.92893 17.6569L7.05025 15.5355C7.44078 15.145 8.07394 15.145 8.46447 15.5355C8.85499 15.9261 8.85499 16.5592 8.46447 16.9497L6.34315 19.0711C5.95262 19.4616 5.31946 19.4616 4.92893 19.0711ZM15.5355 8.46447C15.145 8.07394 15.145 7.44078 15.5355 7.05025L17.6569 4.92893C18.0474 4.53841 18.6805 4.53841 19.0711 4.92893C19.4616 5.31946 19.4616 5.95262 19.0711 6.34315L16.9497 8.46447C16.5592 8.85499 15.9261 8.85499 15.5355 8.46447Z"></path>
                        </svg>
                        <p>ordering...</p>
                      </button>
                    ) : (
                      <button
                        className="bg-primary  text-white hover:bg-orange-500 px-8 py-2 rounded-md cursor-pointer mt-3"
                        onClick={() => handleOrder()}
                      >
                        Confirm order
                      </button>
                    )}
                  </div>
                </div>
                {/* <form className="bg-white p-4 shadow-md flex-1">
            <label className="block mb-2">নাম:</label>
            <input type="text" className="w-full border rounded p-2 mb-4" />
            
            <label className="block mb-2">মোবাইল নাম্বার:</label>
            <input type="text" className="w-full border rounded p-2 mb-4" />
            
            <label className="block mb-2">ঠিকানা:</label>
            <input type="text" className="w-full border rounded p-2 mb-4" />
            
            <div className="flex space-x-4">
              <div>
                <input type="radio" id="dhaka" name="location" className="mr-2" />
                <label htmlFor="dhaka">Dhaka city</label>
              </div>
              <div>
                <input type="radio" id="outside" name="location" className="mr-2" />
                <label htmlFor="outside">Outside dhaka</label>
              </div>
            </div>
            
            <button type="submit" className="mt-4 bg-orange-500 text-white py-2 px-4 rounded">
              Confirm order
            </button>
          </form> */}

                <div className="bg-white p-4 shadow-md flex-1">
                  {/*  <h3 className="text-lg font-bold">Product Overview</h3>
            <div className="mt-4">
              <p>1. চারমারা 1 লায়ার ক্লিয়ারিং ব্লান্ড</p>
              <p className="mt-2">Price: ৳680</p>
              <p className="mt-2">Delivery charge: ৳120</p>
              <p className="mt-2">Due: ৳800</p>
            </div> */}
                  <CartoverviewSection
                    cartItems={cartItems}
                    setCartItems={setCartItems}
                    renderMe={renderMe}
                    setIsRenderMe={setIsRenderMe}
                    deliveryType={deliveryType}
                    inside={inside}
                    outside={outside}
                    subside={subside}
                    promoDiscount={promoDiscount}
                    setPromoDiscount={setPromoDiscount}
                  />
                  <PaymentSection
                    cartItems={cartItems}
                    deliveryType={deliveryType}
                    inside={inside}
                    outside={outside}
                    subside={subside}
                    promoDiscount={promoDiscount}
                    renderMe={renderMe}
                  />
                </div>
              </div>
            </div>
          </section>
          <div className="bg-secondary xls:mb-14 xms:mb-14 lg:mb-2">
            <div className=" flex items-center justify-between max-w-[85rem] md:max-w-[62rem] xls:max-w-[22rem] xms:max-w-[22rem] xs:max-w-[18rem] mx-auto py-2 ">
              <p className="text-white text-xs">
                Copyright © 2023,{" "}
                <span className="text-orange-500">{link}</span>
              </p>

              <div className="text-white text-xs flex space-x-2 items-center">
                <p>Developed by</p>
                <div>
                  <Link
                    className="hover:underline  font-semibold flex items-center space-x-1 tracking-wider text-orange-500"
                    href={company_link}
                    target="_blank"
                  >
                    <p className="text-sm">{company_name}</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <footer className="bg-primary text-white text-center py-4 xls:fixed xms:fixed bottom-0 left-0 w-full">
            <p className="font-medium">
              কল করুনঃ
              <Link className="ml-1" href={`tel:${userPhone}`} target="_blank">
                {userPhone}
              </Link>
            </p>
          </footer>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  let products = await request(`landing/${context.query.slug}`);
  return {
    props: {
      data: products?.data || null,
    },
  };
}

export default LandingPage;

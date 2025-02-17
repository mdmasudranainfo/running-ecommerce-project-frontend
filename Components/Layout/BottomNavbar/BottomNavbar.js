/* eslint-disable @next/next/no-html-link-for-pages */
import Image from "next/image";
import Link from "next/link";
import styles from "./BottomNavbar.module.css";
import { useStatus } from "@/context/contextStatus";
import { AiFillHome } from "react-icons/ai";
import request from "@/lib/request";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { PiWhatsappLogoBold } from "react-icons/pi";

import { BsTelephoneFill } from "react-icons/bs";
import {
  FaFacebook,
  FaFacebookF,
  FaUser,
  FaWhatsapp,
  FaWhatsappSquare,
} from "react-icons/fa";
import { CiShop } from "react-icons/ci";
import { FaBasketShopping } from "react-icons/fa6";

export default function BottomNavbar() {
  const { setProfileMenu, wishData, token, isScrolled } = useStatus();

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      const res = await request(`setting/view`);

      setLoading(false);
      setData(res?.data);
    };
    getData();
  }, []);

  const handleWishRoute = () => {
    if (token) {
      router?.push(`/wishlist`);
    } else {
      toast.error(`You need to login first`);
    }
  };

  const handleProfileRoute = () => {
    if (!token) {
      router.push(`/auth`);
    } else {
      router.push(`/profile`);
    }
  };

  return (
    <div
      className={`bg-[#EAEAEA]  ${
        isScrolled
          ? "xls:fixed  xms:fixed xs:fixed xxl:hidden xl:hidden lg:hidden md:hidden sm:hidden"
          : "hidden"
      } fixed bottom-0 w-full z-20 border border-[#d1d5db] p-[8px] shadow-lg filter drop-shadow-lg`}
    >
      <div className={styles.icons}>
        <Link className="bg-white pt-2 rounded-lg" href="/">
          <span>
            <AiFillHome size={20} className="fill-current text-gray-500" />
          </span>
          <span className="text-[10px] text-gray-500 capitalize ">Home</span>
        </Link>
        <Link className="bg-white pt-2 rounded-lg" href="/">
          <span>
            <FaBasketShopping
              size={20}
              className="fill-current text-gray-500"
            />
          </span>
          <span className="text-[10px] text-gray-500 capitalize ">Shop</span>
        </Link>
        <Link
          className="bg-white pt-2 rounded-lg"
          href={`tel:${data?.phone}`}
          target="_blank"
        >
          <span>
            <BsTelephoneFill size={25} className="fill-current text-primary" />
          </span>
          <span className="text-[10px] text-gray-500 capitalize">Call</span>
        </Link>
        <Link
          className="bg-white pt-2 rounded-lg"
          href={`${data?.socialLinks?.whatsapp}`}
          target="_blank"
        >
          <span>
            <FaWhatsappSquare
              size={18}
              className="fill-current text-gray-500"
            />
          </span>
          <span className="text-[10px] text-gray-500 capitalize">WhatsApp</span>
        </Link>
        <Link
          className="bg-white pt-2 rounded-lg"
          href={`${data?.socialLinks?.facebook}`}
          target="_blank"
        >
          <span>
            <FaFacebook size={16} className="fill-current text-gray-500" />
          </span>
          <span className="text-[10px] text-gray-500 capitalize">Facebook</span>
        </Link>
      </div>
    </div>
  );
}

import React from 'react'
import { GiSellCard } from 'react-icons/gi';
import Skeleton from 'react-loading-skeleton';
import ProductCard from './ProductCard';
import Link from 'next/link';

const BestProduct = ({loading,data}) => {
  return (
    <div className="border border-gray-100 mt-3 pb-4 bg-white rounded-md mb-5 p-3 xls:p-0 xms:p-0 xs:p-0">
      <div className="flex justify-between p-2 xxl:p-0 xl:p-0 lg:p-0 md:p-0 sm:p-0">
        <div className="flex items-center">
          <button className="font-semibold text-white px-1 py-1 bg-primary rounded-md text-sm tracking-wider flex items-center space-x-2">
            <GiSellCard color="#fff" size={20} />
          </button>
          <span className="font-bold pl-2 text-lg xls:text-sm xms:text-sm xs:text-xs tracking-wider capitalize text-black">
            Best Selling
          </span>
        </div>
        <Link href="/best-products">
          <span className="font-medium px-4 py-1  text-white text-sm bg-primary rounded-full">
            See all
          </span>
        </Link>
      </div>

      <div className="grid grid-cols-6 md:grid-cols-4 sm:grid-cols-3 xls:grid-cols-2 xms:grid-cols-2 xs:grid-cols-2 gap-5 xls:gap-3 xms:gap-3 xs:gap-2 ">
        {loading ? (
          <>
            <div className="shadow-md p-2">
              <div>
                <Skeleton height={200} />
              </div>
              <Skeleton count={3} />
            </div>
            <div className="shadow-md p-2">
              <div>
                <Skeleton height={200} />
              </div>
              <Skeleton count={3} />
            </div>
            <div className="shadow-md p-2">
              <div>
                <Skeleton height={200} />
              </div>
              <Skeleton count={3} />
            </div>
            <div className="shadow-md p-2">
              <div>
                <Skeleton height={200} />
              </div>
              <Skeleton count={3} />
            </div>
            <div className="shadow-md p-2">
              <div>
                <Skeleton height={200} />
              </div>
              <Skeleton count={3} />
            </div>
            <div className="shadow-md p-2">
              <div>
                <Skeleton height={200} />
              </div>
              <Skeleton count={3} />
            </div>
          </>
        ) : (
          <>
            {data?.bestProducts?.map((item, index) => (
              <div
                className="overflow-hidden items-center justify-center h-full cardFull"
                key={index}
              >
                <ProductCard item={item} />
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default BestProduct
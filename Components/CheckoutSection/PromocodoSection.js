import React from "react";

import CouponModal from "./CouponModal";

const PromocodoSection = ({ handleChange, handlePromo }) => {
  return (
    <div>
      <div className="flex mt-4 px-4 sm:hidden xls:hidden xms:hidden xs:hidden">
        <div className="w-full ">
          <input
            type="text"
            className="rounded-l-md h-10 w-full border-2  px-3 bg-white outline-none placeholder:text-sm placeholder:text-gray-400"
            placeholder="If you have a Promo Code, Enter Here..."
            onChange={(event) => handleChange(event.target.value)}
          />
        </div>
        <div>
          <button
            className="bg-secondary px-4 h-10 text-white font-semibold tracking-wide text-sm rounded-tr-md rounded-br-md"
            onClick={() => handlePromo()}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromocodoSection;

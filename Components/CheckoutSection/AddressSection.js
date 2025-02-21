import { useStatus } from "@/context/contextStatus";
import { FaPhoneAlt, FaUser, FaAddressBook } from "react-icons/fa";

const AddressSection = ({
  name,
  setName,
  phone,
  setPhone,
  address,
  setAddress,
  deliveryOption,
  setDeliveryOption,
  namePlaceHolder,
  addressPlaceHolder,
  mobilePlaceHolder,
  customerNotes,
  setCustomerNotes,
  customerNotesPlaceholder,
}) => {
  return (
    <div className="bg-white mt-0 px-4 pb-2 rounded-md pt-1 sm:mt-2 xls:mt-2 xms:mt-2 xs:mt-2">
      <div>
        <p className="text-left font-semibold text-xl text-black">
          <span className="border-b-2 border-dashed ">বিলিং ডিটেইল</span>
        </p>
      </div>

      <div className="flex items-center pt-2">
        <div className="w-full">
          <label htmlFor={namePlaceHolder} className="mb-1 block text-black">
            {namePlaceHolder}
            <span style={{ color: "red" }}>*</span>
          </label>
          <input
            id={namePlaceHolder}
            className="bg-white w-full pl-2 h-[35px] outline-none text-sm rounded-md placeholder:text-base border border-gray-400 transition-all focus:border-primary"
            value={name}
            placeholder={namePlaceHolder}
            // placeholder="Your name ..."
            onChange={(event) => setName(event.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center pt-4">
        <div className="w-full">
          <label htmlFor={mobilePlaceHolder} className="mb-1 block text-black">
            {mobilePlaceHolder}
            <span style={{ color: "red" }}>*</span>
          </label>
          <input
            id={mobilePlaceHolder}
            className="bg-white w-full pl-2 h-[35px] outline-none text-sm rounded-md placeholder:text-base border border-gray-400 transition-all focus:border-primary"
            value={phone}
            placeholder={mobilePlaceHolder}
            // placeholder="Phone number..."
            onChange={(event) => setPhone(event.target.value)}
          />
        </div>
      </div>
      <div className="flex items-center pt-4">
        <div className="w-full">
          <label htmlFor={addressPlaceHolder} className="mb-1 block text-black">
            {addressPlaceHolder}
            <span style={{ color: "red" }}>*</span>
          </label>
          <input
            id={addressPlaceHolder}
            className="bg-white w-full pl-2 h-[35px] outline-none text-sm rounded-md placeholder:text-base border border-gray-400 transition-all focus:border-primary"
            placeholder={addressPlaceHolder}
            value={address}
            onChange={(event) => setAddress(event.target.value)}
          />
        </div>
      </div>

      <div className="w-full pt-4">
        <textarea
          className="bg-white w-full pl-2 pt-2 outline-none text-sm text-white rounded-md placeholder:text-base border border-gray-400 transition-all focus:border-primary focus:shadow-outline-none resize-none h-12"
          placeholder={customerNotesPlaceholder}
          // placeholder="Enter address....."
          value={customerNotes}
          onChange={(event) => setCustomerNotes(event.target.value)}
        />
      </div>

      {/* select aria */}

      <div className="w-full flex flex-col space-y-2 py-2">
        <p className=" font-normal text-black">
          এলাকা সিলেক্ট করুন <span style={{ color: "red" }}>*</span>{" "}
        </p>
        <div className="w-full">
          <select
            className="bg-white text-black w-full p-2 rounded-md border border-gray-300 focus:ring-indigo-700 focus:outline-none"
            value={deliveryOption}
            onChange={(e) => setDeliveryOption(e.target.value)}
          >
            <option className="" value="inside">
              {" "}
              ঢাকা সিটির ভিতরে
            </option>
            <option className="" value="outside">
              ঢাকা সিটির বাহিরে
            </option>
          </select>
        </div>
      </div>

      {/* end  */}

      {/* <div className="w-full flex xs:block items-center space-x-2 py-2">
        <p className="text-xs font-normal text-black">
          Select area <span style={{ color: "red" }}>*</span>{" "}
        </p>
        <div className="flex items-center space-x-3 text-black">
          <div className="flex items-center">
            <label
              htmlFor="inside"
              className="flex items-center cursor-pointer"
            >
              <div className="bg-white rounded-full w-4 h-4 flex flex-shrink-0 justify-center items-center relative">
                <input
                  checked={deliveryOption === "inside"}
                  type="radio"
                  id="inside"
                  name="deliveryOption"
                  className="appearance-none focus:opacity-100 focus:ring-indigo-700 focus:outline-none border rounded-full border-gray-400 absolute cursor-pointer w-full h-full checked:border-none"
                  onChange={() => setDeliveryOption("inside")}
                />
                <div
                  className={`check-icon ${
                    deliveryOption === "inside" ? "block" : "hidden"
                  } border-[1px] p-[1px] border-primary rounded-full w-full h-full z-1`}
                >
                  <div className="bg-primary w-full h-full rounded-full"></div>
                </div>
              </div>
              <span className="ml-2 font-semibold">Dhaka city</span>
            </label>
          </div>

          <div className="flex items-center">
            <label
              htmlFor="outside"
              className="flex items-center cursor-pointer"
            >
              <div className="bg-white rounded-full w-4 h-4 flex flex-shrink-0 justify-center items-center relative">
                <input
                  checked={deliveryOption === "outside"}
                  type="radio"
                  id="outside"
                  name="deliveryOption"
                  className="appearance-none focus:opacity-100 focus:ring-indigo-700 focus:outline-none border rounded-full border-gray-400 absolute cursor-pointer w-full h-full checked:border-none"
                  onChange={() => setDeliveryOption("outside")}
                />
                <div
                  className={`check-icon ${
                    deliveryOption === "outside" ? "block" : "hidden"
                  } border-[1px] p-[1px] border-primary rounded-full w-full h-full z-1`}
                >
                  <div className="bg-primary w-full h-full rounded-full"></div>
                </div>
              </div>
              <span className="ml-2 font-semibold">Outside dhaka</span>
            </label>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default AddressSection;

import React from "react";

const PaymentOption = ({ handlePayment }) => {
  const options = [
    {
      value: "Bkash",
      label: "Bkash",
    },
    {
      value: "Nagad",
      label: "Nagad",
    },
    {
      value: "Rocket",
      label: "Rocket",
    },
    {
      value: "Bank",
      label: "Banking",
    },
    {
      value: "Cod",
      label: "Cash on delivery",
    },
  ];

  return (
    <div className="p-3 mt-4 rounded-md">
      <p className="text-left text-black text-base font-semibold">
        Payment Options
      </p>

      <div className="mt-3">
        <select
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={(event) => handlePayment(event.target.value)}
        >
          <option value="">Select payment option</option>
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="dark:text-black"
            >
              <img
                src={option.image}
                alt={option.label}
                width="20"
                height="20"
              />
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default PaymentOption;

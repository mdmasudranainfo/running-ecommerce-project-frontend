import request from "@/lib/request";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";

// CANCELED, HOLD, CONFIRM, PROCESSING, PICKED, SHIPPED, DELIVERED, RETURNED", REFUND

const OrderDetails = () => {

    const arrStatus = [
      {
        id: 1,
        name: "Hold",
        icon: (
          <svg
            className="fill-current text-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M10.478 11.632L5.968 4.56l1.931-.518 6.951 6.42 5.262-1.41a1.5 1.5 0 0 1 .776 2.898L5.916 15.96l-.776-2.898.241-.065 2.467 2.445-2.626.704a1 1 0 0 1-1.133-.48L1.466 10.94l1.449-.388 2.466 2.445 5.097-1.366zM4 19h16v2H4v-2z" />
          </svg>
        ),
      },
      {
        id: 2,
        name: "CONFIRM",
        icon: (
          <svg
            className="fill-current text-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M5.463 4.433A9.961 9.961 0 0 1 12 2c5.523 0 10 4.477 10 10 0 2.136-.67 4.116-1.81 5.74L17 12h3A8 8 0 0 0 6.46 6.228l-.997-1.795zm13.074 15.134A9.961 9.961 0 0 1 12 22C6.477 22 2 17.523 2 12c0-2.136.67-4.116 1.81-5.74L7 12H4a8 8 0 0 0 13.54 5.772l.997 1.795z" />
          </svg>
        ),
      },
      {
        id: 3,
        name: "PROCESSING",
        icon: (
          <svg
            className="fill-current text-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M6.455 19L2 22.5V4a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H6.455zM4 18.385L5.763 17H20V5H4v13.385zM13.414 11l2.475 2.475-1.414 1.414L12 12.414 9.525 14.89l-1.414-1.414L10.586 11 8.11 8.525l1.414-1.414L12 9.586l2.475-2.475 1.414 1.414L13.414 11z" />
          </svg>
        ),
      },
      {
        id: 4,
        name: "PICKED",
        icon: (
          <svg
            className="fill-current text-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M6.455 19L2 22.5V4a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H6.455zM4 18.385L5.763 17H20V5H4v13.385zM13 11v4h-2v-4H8l4-4 4 4h-3z" />
          </svg>
        ),
      },
      {
        id: 5,
        name: "SHIPPED",
        icon: (
          <svg
            className="fill-current text-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M7.617 8.712l3.205-2.328A1.995 1.995 0 0 1 12.065 6a2.616 2.616 0 0 1 2.427 1.82c.186.583.356.977.51 1.182A4.992 4.992 0 0 0 19 11v2a6.986 6.986 0 0 1-5.402-2.547l-.697 3.955 2.061 1.73 2.223 6.108-1.88.684-2.04-5.604-3.39-2.845a2 2 0 0 1-.713-1.904l.509-2.885-.677.492-2.127 2.928-1.618-1.176L7.6 8.7l.017.012zM13.5 5.5a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm-2.972 13.181l-3.214 3.83-1.532-1.285 2.976-3.546.746-2.18 1.791 1.5-.767 1.681z" />
          </svg>
        ),
      },
      {
        id: 6,
        name: "DELIVERED",
        icon: (
          <svg
            className="fill-current text-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M7 5V2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h4zm13 8H4v6h16v-6zm0-6H4v4h3V9h2v2h6V9h2v2h3V7zM9 3v2h6V3H9z" />
          </svg>
        ),
      },
     
     
    ];
 
    const router = useRouter()

    const {id} = router?.query

    const [data,setData] = useState(null);


    useEffect(()=>{
        if(id){
            const getData = async () => {
              const res = await request(`order/single-order/${id}`);
              if(res?.success){

                setData(res?.data);
              }
            };

            getData();

        }
        

    },[id])


  console.log("data.....",data);

  return (
    <div className="bg-gray-100 h-screen pt-28">
      <div className="mx-auto max-w-[90rem]">
        <div className="flex justify-between items-center bg-white p-4 rounded-md">
          <div className="flex space-x-2">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M21 8v12.993A1 1 0 0 1 20.007 22H3.993A.993.993 0 0 1 3 21.008V2.992C3 2.455 3.449 2 4.002 2h10.995L21 8zm-2 1h-5V4H5v16h14V9zM8 7h3v2H8V7zm0 4h8v2H8v-2zm0 4h8v2H8v-2z" />
              </svg>
            </div>
            <p className="text-lg text-black font-bold">Order Details </p>
          </div>
          <div className="flex space-x-3 items-center">
            <div className="flex bg-yellow-500 items-center px-2 py-1 rounded cursor-pointer">
              <div>
                <svg
                  className="fill-current text-white h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M7.828 11H20v2H7.828l5.364 5.364-1.414 1.414L4 12l7.778-7.778 1.414 1.414z" />
                </svg>
              </div>
              <div>
                <button className="text-white font-semibold">Back</button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-md mt-4">
          <div className="xxl:p-3 xl:p-3 lg:p-3 md:p-3 sm:p-3 xs:p-1">
            <div className="xxl:mx-4 xl:mx-4 lg:mx-4 md:mx-3 sm:mx-2 xs:mx-0 xl:p-4 xxl:p-4 lg:p-4 md:p-3 sm:p-2 xs:p-0 ">
              <div className="xxl:flex xl:flex lg:flex md:flex sm:flex xs:hidden xxs:hidden items-center">
                {arrStatus.map((item, index, arr) => (
                  <>
                    {index <=
                    data?.orderStatus[data?.orderStatus?.length - 1].status -
                      1 ? (
                      <div className="flex items-center text-myblue-500 relative">
                        <div className="bg-gray-800 rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 border-myblue-500 flex justify-center items-center">
                          <svg
                            className="fill-current text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                          >
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path d="M11.602 13.76l1.412 1.412 8.466-8.466 1.414 1.414-9.88 9.88-6.364-6.364 1.414-1.414 2.125 2.125 1.413 1.412zm.002-2.828l4.952-4.953 1.41 1.41-4.952 4.953-1.41-1.41zm-2.827 5.655L7.364 18 1 11.636l1.414-1.414 1.413 1.413-.001.001 4.951 4.951z" />
                          </svg>
                        </div>
                        <div className="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-gray-800">
                          {item?.name}
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center text-gray-800 relative">
                        <div className="bg-white rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 border-myblue-500 flex justify-center items-center">
                          <svg
                            className="fill-current text-myblue-500"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                          >
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path d="M5.463 4.433A9.961 9.961 0 0 1 12 2c5.523 0 10 4.477 10 10 0 2.136-.67 4.116-1.81 5.74L17 12h3A8 8 0 0 0 6.46 6.228l-.997-1.795zm13.074 15.134A9.961 9.961 0 0 1 12 22C6.477 22 2 17.523 2 12c0-2.136.67-4.116 1.81-5.74L7 12H4a8 8 0 0 0 13.54 5.772l.997 1.795z" />
                          </svg>
                        </div>
                        <div className="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-myblue-500">
                          {item?.name}
                        </div>
                      </div>
                    )}

                    {index === arr?.length - 1 ? null : index <=
                      data?.orderStatus[data?.orderStatus?.length - 1].status -
                        2 ? (
                      <div className="flex-auto  border-t-2 transition duration-500 ease-in-out border-myblue-500"></div>
                    ) : (
                      <div className="flex-auto  border-t-2 transition duration-500 ease-in-out border-gray-300"></div>
                    )}
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails


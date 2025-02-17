import postRequest from "@/lib/postRequest";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";

const ForgotPassword = () => {

    const router = useRouter();
 
    const [num,setNum] = useState('');

    const handleChange = (value) =>{
        setNum(value);
    }

    const handleSubmit = async () =>{
  

        if(num == ""){
            toast.error("the field is required");
            return;
        }

         if (num) {

            if(num?.length > 11){
                toast.error("phone number should be 11 characters");
                return;
            }

            if(num?.length < 11){
                toast.error("phone number should be 11 characters");
                return;
            }
        //    var bdMobilePattern = /^(\+)?(88)?01[3-9]\d{8}$/;
        //    if (bdMobilePattern.test(num)) {
        //    } else {
        //      toast.error("Not a valid phone number");

        //      return;
        //    }
         }



        let res = await postRequest(`customer/forget-password`, {
          phone: num,
        });

        if(res?.success){
             toast(`${res?.message}`);
             router.push(`/otp-verify`);
        } else {
             toast.error(`${res?.message}`);
        }

    }


  return (
    <div className="bg-[#ddd] pt-32">
      <div className="max-w-[50rem] md:max-w-[62rem] sm:max-w-[47rem] xxl:max-w-[110rem]  mx-auto min-h-[600px] pt-5">
        <div className="mt-4 min-h-[500px] bg-gray-100 pt-32 pb-16">
          <p className="text-center text-xl font-semibold tracking-wider mb-4 dark:text-black">
            Forgot password
          </p>
          <div className=" bg-gray-200 w-[350px] xs:w-[290px] h-[150px] mx-auto rounded-md pl-3 pt-3">
            <label className="font-semibold dark:text-black">
              Phone number
            </label>
            <div className="flex justify-center items-center my-3">
              <input
                type="text"
                className="w-full mr-4 py-2 px-4 rounded-md dark:bg-white"
                onChange={(e) => handleChange(e.target.value)}
              />
            </div>
            <div className="flex justify-center">
              <button
                className="px-3 py-1 bg-primary text-white rounded-md"
                onClick={() => handleSubmit()}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword
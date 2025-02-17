import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';


const CouponModal = ({
  couponModalOpen,
  setCouponModalOpen,
  handleChange,
  handlePromo,
}) => {
  const closeCouponModal = () => {
    setCouponModalOpen(false);
  };

  return (
    <Transition appear show={couponModalOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-[-88px] z-40 overflow-y-auto bg-opacity-40"
        onClose={closeCouponModal}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black/30" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-xl xls:max-w-[25rem] xms:max-w-[22rem] xs:max-w-[18rem] p-8 xls:p-5 xms:p-4 xs:p-3 my-8 overflow-hidden text-left align-middle transition-all transform bg-gray-100 shadow-xl rounded-2xl">
              <div className="mt-2">
                <div className="bg-gray-100 flex flex-col justify-center">
                  <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="text-center text-3xl font-extrabold text-gray-900 relative">
                      <div
                        className="absolute top-[-25px] xms:top-[-20px] xs:top-[-15px] right-[-50px] xls:right-[-10px] xms:right-[-8px] xs:right-[-5px]"
                        onClick={closeCouponModal}
                      >
                        <svg
                          className="text-red-600 fill-current cursor-pointer h-6 w-6"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 10.5858L14.8284 7.75736L16.2426 9.17157L13.4142 12L16.2426 14.8284L14.8284 16.2426L12 13.4142L9.17157 16.2426L7.75736 14.8284L10.5858 12L7.75736 9.17157L9.17157 7.75736L12 10.5858Z"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-md font-body">
                    {/* <label className='text-black text-xs'>Coupon code</label> */}
                    <div className="flex items-center">
                      <div className="w-full">
                        <input
                          type="text"
                          className="rounded-l-md h-10 w-full px-3 bg-white outline-none placeholder:text-sm placeholder:text-gray-400"
                          placeholder="If you have a Promo Code, Enter Here..."
                          onChange={(event) => handleChange(event.target.value)}
                        />
                      </div>
                      <div>
                        <button
                          className="bg-primary px-4 h-10 text-white font-semibold tracking-wide text-sm rounded-tr-md rounded-br-md"
                          onClick={() => handlePromo()}
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CouponModal
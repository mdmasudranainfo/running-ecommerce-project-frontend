import { useRouter } from "next/router";
import { RxDoubleArrowRight } from "react-icons/rx";

const BreadCrumbs = ({ breadCumbs }) => {
  const router = useRouter();

  const handleRoute = (url, index) => {
    if (index == 1) {
      router.replace(`/${url}`);
    } else if (index == 2) {
      router.replace(`/products/${url}`);
    } else if (index == 0) {
      router.replace(`/`);
    }
  };

  return (
    <div>
      <ol className="inline-flex flex-wrap text-gray-700 space-x-1 items-center mb-4 pl-2 lg:pt-8 md:pt-8 sm:pt-4 xls:pt-[10px] xms:pt-[10px] xs:pt-[10px] xls:mb-2 xms:mb-2 xs:mb-2">
        {breadCumbs?.map((breadCumb, index) => (
          <li className="inline-flex items-center" key={index}>
            <div
              onClick={() => handleRoute(breadCumb?.url, index)}
              className="cursor-pointer"
            >
              {breadCumb?.name?.length > 32 ? (
                <p className=" hover:text-blue-500 hover:underline">
                  {breadCumb?.name.substring(0, 32) + "...."}
                </p>
              ) : (
                <p className=" hover:text-blue-500 hover:underline">
                  {breadCumb?.name}
                </p>
              )}
            </div>
            {breadCumbs?.length - 1 !== index && (
              <RxDoubleArrowRight
                size={15}
                className="text-gray-400 font-bold"
              />
            )}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default BreadCrumbs;

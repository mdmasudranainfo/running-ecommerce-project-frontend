import { hostname } from "@/lib/config";
import Image from "next/image";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";

const Category = ({ category, catLoading }) => {
  return (
    <div className="relative">
      {catLoading ? (
        <Skeleton count={15} />
      ) : (
        <ul className="list-none pl-0 overflow-y-auto h-[400px] mb-0 cursor-pointer scroll-smooth">
          {category?.map((cat, indexMain) => (
            <li
              key={indexMain}
              className="border-b border-gray-200 group hover:bg-primary list-none"
              style={{ overflow: "hidden" }}
            >
              <Link
                prefetch={false}
                href={`/${cat?.slug}`}
                className="block pl-3 py-2 leading-[15px] cursor-pointer capitalize"
              >
                <div className="flex justify-between items-center">
                  <div className="text-black flex items-center gap-1">
                    {cat?.image && (
                      <Image
                        src={`${hostname}/${cat?.image}`}
                        height={20}
                        width={20}
                        alt={cat?.name}
                      />
                    )}

                    {cat?.name?.length > 30 ? (
                      <p className="capitalize group-hover:text-white text-xs">
                        {cat?.name?.substring(0, 30) + "...."}
                      </p>
                    ) : (
                      <p className="capitalize group-hover:text-white text-xs">
                        {cat?.name}
                      </p>
                    )}
                  </div>
                  {cat?.children?.length > 0 && (
                    <div>
                      <svg
                        className="fill-current text-black group-hover:text-white h-[15px] w-[15px]"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                      >
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z" />
                      </svg>
                    </div>
                  )}
                </div>
              </Link>

              {cat?.children?.length > 0 && (
                <div className="hidden group-hover:block absolute left-[210px] h-[400px] top-0 bg-white min-w-[220px] z-40 shadow-lg">
                  <ul>
                    {cat?.children?.map((item, indexChild) => (
                      <li
                        key={indexChild}
                        className="border-b border-gray-200 hover:bg-primary list-none children"
                      >
                        <Link
                          prefetch={false}
                          href={`/${item?.slug}`}
                          className="block pl-3 py-2 leading-[15px] cursor-pointer capitalize text-black"
                        >
                          <div className="flex items-center gap-1">
                            {cat?.image && (
                              <Image
                                src={`${hostname}/${cat?.image}`}
                                height={20}
                                width={20}
                                alt={cat?.name}
                              />
                            )}
                            {item?.name?.length > 30 ? (
                              <p className="capitalize  text-black text-xs">
                                {item?.name?.substring(0, 30) + "...."}
                              </p>
                            ) : (
                              <p className="capitalize text-black text-xs">
                                {item?.name}
                              </p>
                            )}
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Category;

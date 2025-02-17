import { hostname } from "@/lib/config";
import Image from "next/image";
import { useEffect, useState } from "react";
import ReactImageZoom from "react-image-zoom";
import ReactPlayer from "react-player";

const ImageGallery = ({
  image,
  selectImage,
  setSelectImage,
  imageSelect,
  setImageSelect,
  activeYoutubeVideo,
  setActiveYoutubeVideo,
  selectedVariation,
}) => {
  const [video, setVideo] = useState(false);

  const handleSelectImage = (item) => {
    setVideo(false);
    setImageSelect(item);
  };

  const props = {
    width: 400,
    height: 400,
    img:
      imageSelect == null
        ? hostname + "/" + selectImage
        : hostname + "/" + imageSelect,
  };

  const [mergedArr, setMergedArr] = useState([]);

  useEffect(() => {
    let mergedArr = [];

    for (let a of image?.galleryImage) {
      mergedArr.push(a);
    }
    setMergedArr(mergedArr);
  }, [image]);

  useEffect(() => {
    setVideo(false);
  }, [image]);

  return (
    <div className=" py-7 xls:py-2 xms:py-2 xs:py-2 col-span-4 sm:col-span-1">
      {/* <Image src="http://192.168.0.245:3680/public/product/0pPA5m2aKIbDNWOlAs_.jpg" height={500} width={500} className="h-10 w-10" /> */}
      <div className=" xxl:block xl:block lg:block md:block sm:block xls:hidden xms:hidden xs:hidden sm:w-[350px]">
        {video && (
          <ReactPlayer
            url={`${activeYoutubeVideo}`}
            width="100%"
            height="400px"
            volume={1}
            controls
          />
        )}

        {!video && (
          <div className="cursor-crosshair">
            <ReactImageZoom {...props} zoomPosition="original" alt="product" />
          </div>
        )}
      </div>

      <div className="xxl:hidden xl:hidden lg:hidden md:hidden sm:hidden xls:flex xms:flex xs:flex justify-center">
        {video && (
          <ReactPlayer
            url={`${activeYoutubeVideo}`}
            width="100%"
            height="400px"
            volume={1}
            controls
          />
        )}

        {!video && (
          <img
            src={
              imageSelect == null
                ? hostname + "/" + selectImage
                : hostname + "/" + imageSelect
            }
            className=" h-auto w-auto object-fill "
            alt="product"
          />
        )}
      </div>

      <div className="grid grid-cols-5 xs:grid-cols-4 gap-2 md:gap-x-2 sm:gap-x-2 xms:gap-x-2 xs:gap-x-2 mt-2">
        {!video ? (
          <>
            <>
              {mergedArr?.map((data, indexData) => (
                <div
                  key={indexData}
                  onClick={() => handleSelectImage(data)}
                  className="cursor-pointer  "
                >
                  <Image
                    src={`${hostname}/${data}`}
                    width={90}
                    height={90}
                    className=" h-16 w-16 rounded-md"
                    alt="product"
                  />
                </div>
              ))}
            </>
            <>
              {image?.videoUrl && (
                <div
                  className="w-16 h-16 border border-gray-400"
                  onClick={() => setVideo(true)}
                >
                  <p className="mt-[20px] xms:mt-[10px] xs:mt-[6px] text-center text-black xs:text-xs text-sm cursor-pointer">
                    See Videos
                  </p>
                </div>
              )}
            </>
          </>
        ) : (
          <>
            {video && (
              <>
                <>
                  {mergedArr?.map((data, indexData) => (
                    <div
                      key={indexData}
                      onClick={() => handleSelectImage(data)}
                      className="cursor-pointer"
                    >
                      <Image
                        src={`${hostname}/${data}`}
                        width={90}
                        height={90}
                        className="border-[1px] border-gray-800 h-16 w-16 rounded-md"
                        alt="product"
                      />
                    </div>
                  ))}
                </>
                <div className="w-16 h-16 border border-gray-400">
                  <ReactPlayer
                    url={`${activeYoutubeVideo}`}
                    onClick={() => setActiveYoutubeVideo(video)}
                    width="64px"
                    height="64px"
                    volume={0}
                    pip={true}
                    playing={false}
                    muted={true}
                  />
                </div>

                {/* <div
                  className="w-16 h-16 border border-gray-400 ml-2 xls:ml-3 xms:ml-4 xs:ml-7"
                  onClick={() => setVideo(false)}
                >
                  <p className="text-xs mt-[20px] text-black text-center cursor-pointer">
                    See Images
                  </p>
                </div> */}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ImageGallery;

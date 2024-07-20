import { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Img } from "react-image";
import ProgressiveImage from "react-progressive-graceful-image";
import logoImg from "@/assets/logo.png";
import placeImage from "@/assets/the-logo.png";
import { PRODUCT_FACE } from "@/lib/axios";


export default function ProductImageCarousel({ data = productImages, waterMark }) {
  const thumbnailRef = useRef(null);
  const [slideIndex, setSlideIndex] = useState(1);

  console.log(data)

  const [width, setWidth] = useState(0);

  const handleSlide = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex - 1 >= 1 ? slideIndex - 1 : data.length);
    } else if (direction === "right") {
      setSlideIndex(slideIndex === data.length ? 1 : slideIndex + 1);
    }
  };

  useEffect(() => {
    if (!thumbnailRef.current) return;
    let childrenElem = thumbnailRef.current.childElementCount;
    let scrollWidth = thumbnailRef.current.scrollWidth;
    let width = scrollWidth / childrenElem;
    setWidth(width);
  });

  useEffect(() => {
    if (!thumbnailRef.current || !width) return;
    let numOfThumbnail = Math.round(thumbnailRef.current.offsetWidth / width);
    thumbnailRef.current.scrollLeft =
      slideIndex + 1 > numOfThumbnail ? (slideIndex - 1) * width : 0;
  }, [slideIndex, width]);

  return (
    <>
      <div className="flex flex-col items-center mt-10">
        {/* <div className="w-full aspect-video md:min-h-[200px] md:max-h-[400px] min-h-[300px] h-full  bg-white rounded-lg relative flex justify-center items-center overflow-hidden select-none"> */}
        {/* <div className="md:min-h-[200px] md:max-h-[400px] min-h-[300px] bg-white overflow-hidden select-none"> */}
        <div className="w-full h-full relative rounded-2xl flex justify-center items-center aspect-video select-none bg-white p-2">
          {
              data?.map((image, idx) => (
                // <Img
                //   key={idx}
                //   src={image}
                //   loader={
                //     <p className={idx + 1 === slideIndex ? "block" : "hidden"}>
                //       Loading...
                //     </p>
                //   }
                //   unloader={
                //     <p
                //       className={
                //         idx + 1 === slideIndex
                //           ? "block text-sm text-brandDarkGray italic"
                //           : "hidden"
                //       }
                //     >
                //       Couldn't not load Image
                //     </p>
                //   }
                //   alt=""
                //   className={`w-full h-full object-contain ${
                //     idx + 1 === slideIndex ? "block" : "hidden"
                //   }`}
                // />
                  <ProgressiveImage key={idx} src={`${PRODUCT_FACE}${image}`}>
                    {(src) => (
                      <img
                        className={`rounded-md p-1 bg-red-200 ${
                          idx + 1 === slideIndex ? "block" : "hidden"
                        }`}
                        src={src}
                        alt=""
                      />
                    )}
                  </ProgressiveImage>
              ))
          }

          {/* Arrow button */}
          {data?.length !== 1 && (
            <>
              <div
                onClick={() => handleSlide("left")}
                className="cursor-pointer bg-black bg-opacity-50 h-10 ml-10 w-10 absolute left-2 z-20 rounded-full items-center flex justify-center"
              >
                <FaArrowLeft size={20} color="#fff" />
              </div>
              <div
                onClick={() => handleSlide("right")}
                className="cursor-pointer bg-black bg-opacity-50 h-10 w-10 mr-10 absolute right-2 z-20 rounded-full  items-center flex justify-center"
              >
                <FaArrowRight size={20} color="#fff" />
              </div>
            </>
          )}
          {/* ========Arrow button----- */}

            <div className="absolute mt-5">
                <img src={waterMark} className="" style={{width: '120px'}} />
            </div>
        </div>

        {!!data && data?.length > 1 && (
          <div
            className="overflow-x-auto h-[100px] items-center flex  mt-1 gap-x-2 pr-2"
            draggable={true}
            ref={thumbnailRef}
          >
            {data?.map((image, idx) => (
              <ProgressiveImage key={idx} src={`${PRODUCT_FACE}${image}`}>
                {(src) => (
                  <img
                    key={idx}
                    onClick={() => setSlideIndex(idx + 1)}
                    className={`select-none object-cover duration-150 p-2 transition-all h-[45px] aspect-square inline-block cursor-pointer ${
                      slideIndex - 1 === idx
                        ? "border-brandGreen border-2 p-1"
                        : "opacity-50 hover:border-brandGreen hover:border-2 hover:p-1 hover:opacity-100"
                    }  `}
                    src={src}
                    alt=""
                  />
                )}
              </ProgressiveImage>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

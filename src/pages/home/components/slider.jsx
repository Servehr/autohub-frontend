import React,  { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
// import Swiper core and required modules
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs"; 
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import './slide.css'
import { ImageSlider, fetchSponsored } from "@/apis/ads";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import currencyFormatter from "@/utils/currency-formatter";
import { generateProductDetailsRouteWithSlugUrl } from "@/constant/links";
import ProgressiveImage from "react-progressive-graceful-image";
import { IMAGE_SLIDER } from "@/lib/axios";

export const SlideTheImages = ({data, imageSize}) => 
{

  const [slide, setSlide] = useState(0)
  const [sliderSize, setSliderSize] = useState(0)
  let sliderTimeOut;

  useEffect(() => 
  {
    //   setSliderSize(imageSize)
      sliderTimeOut =  setTimeout(() => {
          console.log("First Trip")
          if(slide === 0)
          {
              console.log(imageSize)
              console.log(slide)
              console.log(data?.length)
              console.log("It`s Zero")
              if(imageSize > 1)
              {
                setSlide(slide+1)
              }
          } else if((imageSize-1) > slide) {
              setSlide(slide+1)
              console.log("It`s the last number")
          } else {
            console.log("Am ehere")
              setSlide(0)
          }
      }, 5000);
  }, [slide])

  const nextSlide = () => 
  {
      clearTimeout(sliderTimeOut)
      setSlide(slide === (data?.length - 1) ? 0 : slide + 1)
  }

  const prevSlide = () => 
  {
      clearTimeout(sliderTimeOut)
      setSlide(slide === 0 ? (data?.length - 1) : slide - 1)
  }

  const goToSlide = (position) => 
  {
      clearTimeout(sliderTimeOut)
      setSlide(position)
  }

  if(imageSize > 0)
  {
     console.log(data?.length)
     console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
     console.log(data)
     console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
    // for (let index = 0; index < data.length; index++) 
    //   {
    //       console.log(data?.)
    //   }
  }

  if(imageSize > 0)
  {
     console.log(data?.length)
     console.log(data)
  }

  return (
      <>
          <div className="z-40 carousel h-[300px] md:h-[450px] lg:h-[450px] w-full m-auto overflow-hidden relative cursor-pointer"
           >

              {
                  ((data?.length < 1)) && <></>
              }

              {
                  ((data?.length > 0)) && <img
                                                                src={`${IMAGE_SLIDER}${data[slide]?.slider?.url?.image_url}`} 
                                                                className="slide absolute w-full h-full object-fit" 
                                                            />
              }

              {
                    (data?.length > 1) && <>
                        <div className="absolute top-[40%] -translate-x-0 translate-y-[-50%] left-5 text-xl rounded-full text-white cursor-pointer"> 
                            <BsArrowLeftCircleFill color="green" fill="green" className="arrow arrow-left" style={{ backgroundColor: "" }} onClick={prevSlide} />
                        </div>
                        
                        <div className="absolute top-[40%] -translate-x-0 translate-y-[-50%] right-5 text-xl rounded-full text-white cursor-pointer">
                            <BsArrowRightCircleFill color="green" className="arrow arrow-right" style={{ backgroundColor: "" }} onClick={nextSlide} />
                        </div>
                    </>
              }

              {/* <BsArrowRightCircleFill className="arrow arrow-right" onClick={nextSlide} /> */}

             {/* <span className="indicators bg-green-700 rounded-full hidden md:block left-10 bg-red-600">
              { ((data?.length > 0)) &&
                  data?.map((control, index) => {
                      return (
                        <button key={index}	onClick={() => goToSlide(index)} 
                          className={ slide === index ? "rounded-full bg-white p-2 m-3" : "rounded-full bg-blue-400 p-2 m-3" }>
                        </button>
                      )
                  })
              }
             </span> */}

             {
               (data?.length > 0) && 
                <div className="absolute bg-brandGreen/80 rounded-full px-4 py-2 bottom-7 md:bottom-5 font-semibold text-sm  text-white right-2">
                    <span className="">{data[slide]?.slider.url.product.title} - </span>&nbsp;
                    <span className="">{currencyFormatter(data[slide]?.slider.url.product.price)}</span>
                    <br />
                    <span className="text-xs font-medium">
                        {`${data[slide]?.slider.lga && `${data[slide]?.slider.lga}, `}`}
                        {data[slide]?.slider.state || data[slide]?.slider.lga }
                    </span>
                  </div>
             }

          </div>          
      </>
  )

  
};

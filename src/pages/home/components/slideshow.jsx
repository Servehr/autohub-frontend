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
import { SlideTheImages } from "./slider";

const SlideShow = () => {
  const { data, isLoading, isFetching } = useQuery("image-slider", ImageSlider, {
    staleTime: Infinity,
  })

  const [slide, setSlide] = useState(0)
  const [sliderSize, setSliderSize] = useState(0)
  let sliderTimeOut;

  useEffect(() => 
  {
      setSliderSize(data?.length)
      sliderTimeOut =  setTimeout(() => {
          if(slide === 0)
          {
              if(sliderSize === 1)
              { 
                setSlide(1)
              }
              console.log(slide)
              console.log(data?.length)
              console.log("It`s Zero")
          } else if(sliderSize === 1) {
                setSlide(0)
          } else if(slide < Number(data?.length)-1) {
              setSlide(slide+1)
              console.log("It`s the last number")
          } else {
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

  if(!isLoading)
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

  if(!isFetching)
  {
     console.log(data?.length)
     console.log(data)
  }

  return (
      <>
          <div className="z-40 carousel h-[300px] md:h-[450px] lg:h-[450px] w-full m-auto overflow-hidden relative cursor-pointer"
           >

              {
                  (!isLoading && (data?.length > 0)) && <img
                                                                src={`${IMAGE_SLIDER}${data[slide]?.slider?.url?.image_url}`} 
                                                                className="slide absolute w-full h-full object-fit" 
                                                            />
              }

              {
                    !isLoading && (data?.length === 0) && <>
                        <div className="flex justify-content items-center  top-[40%] -translate-x-0 translate-y-[-50%] left-5 text-xl rounded-full text-white cursor-pointer"
                        >
                            <h1 className="w-full flex jusftify-center items-center font-bold text-2xl text-green-900">
                                Place An Advert
                            </h1>
                        </div>
                    </>
              }

              { (!isLoading && (data?.length > 0)) && <SlideTheImages data={data} imageSize={data?.length} />  }


          </div>          
      </>
  )

  
};

export default SlideShow;

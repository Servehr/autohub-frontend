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

const SlideShow = () => {
  const { data, isLoading, isFetching } = useQuery("image-slider", ImageSlider, {
    staleTime: Infinity,
  })

  const [slide, setSlide] = useState(0)
  let sliderTimeOut;

  useEffect(() => 
  {
      sliderTimeOut =  setTimeout(() => {
          if(slide === 0)
          {
              setSlide(1)
              console.log(slide)
              console.log("It`s Zero")
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
     console.log(data.length)
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
     console.log(data.length)
     console.log(data)
  }

  return (
      <>
          <div className="z-40 carousel h-[300px] md:h-[450px] lg:h-[450px] w-full m-auto overflow-hidden relative cursor-pointer"
           >

              {
                  (!isLoading && (data?.length < 1)) && <></>
              }

              {
                  (!isLoading && (data?.length > 0)) && <img
                                                                src={`${IMAGE_SLIDER}${data[slide]?.slider?.url?.image_url}`} 
                                                                className="slide absolute w-full h-full object-fit" 
                                                            />
              }

              <div className="absolute top-[40%] -translate-x-0 translate-y-[-50%] left-5 text-xl rounded-full text-white cursor-pointer"> 
                  <BsArrowLeftCircleFill color="green" fill="green" className="arrow arrow-left" style={{ backgroundColor: "" }} onClick={prevSlide} />
              </div>
              
              <div className="absolute top-[40%] -translate-x-0 translate-y-[-50%] right-5 text-xl rounded-full text-white cursor-pointer">
                  <BsArrowRightCircleFill color="green" className="arrow arrow-right" style={{ backgroundColor: "" }} onClick={nextSlide} />
              </div>

              {/* <BsArrowRightCircleFill className="arrow arrow-right" onClick={nextSlide} /> */}

             {/* <span className="indicators bg-green-700 rounded-full hidden md:block left-10 bg-red-600">
              { (!isLoading && (data?.length > 0)) &&
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
               !isLoading && 
                <div className="absolute bg-brandGreen/80 rounded-full px-4 py-2 bottom-7 md:bottom-5 font-semibold text-sm  text-white right-2">
                    <span className="">{data[slide].slider.url.product.title} - </span>&nbsp;
                    <span className="">{currencyFormatter(data[slide].slider.url.product.price)}</span>
                    <br />
                    <span className="text-xs font-medium">
                        {`${data[slide].slider.lga && `${data[slide].slider.lga}, `}`}
                        {data[slide].slider.state || data[slide].slider.lga }
                    </span>
                  </div>
             }

          </div>          
      </>
  )

  
};

export default SlideShow;

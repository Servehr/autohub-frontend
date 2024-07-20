import React from "react";
import { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs"
// Import Swiper styles
import "swiper/css";
// import Swiper core and required modules
import { Navigation, Pagination, Autoplay } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import { ImageSlider, fetchSponsored } from "@/apis/ads";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import currencyFormatter from "@/utils/currency-formatter";
import { generateProductDetailsRouteWithSlugUrl } from "@/constant/links";
import ProgressiveImage from "react-progressive-graceful-image";
import { RxDotFilled } from "react-icons/rx";

const SlideShow = () => {
  const { data, isLoading } = useQuery("image-slider", ImageSlider, {
    staleTime: Infinity,
});

const [currentImage, setCurrentImage] = useState(0)

  if(!isLoading)
  {
    //   console.log(data)
    //   if(currentImage === 0)
    //   {console.log(data?.length)
    //       setCurrentImage(currentImage+1)
    //   } else if(currentImage === Number(data?.length)+1) {
    //       setCurrentImage(0)
    //   }
    
    //   console.log(data[0].slider.url.image_url)
    //   data.map((car, index) => {
    //       console.log(car.slider.url.image_url)
    //   })
  }

  useEffect(() => {
        setTimeout(() => {
            // setCurrentImage(1)            
            if(currentImage === 0)
            {
                console.log(data?.length)
                setCurrentImage(currentImage+1)
            } else if(currentImage === Number(data?.length)-1) {
                setCurrentImage(0)
            } else {
                setCurrentImage(currentImage+1)                
            }
        }, 5000)
  }, [currentImage])

  const prevSlide = () => 
  {
      const firstImageOnSlide = currentImage === 0
      const imagePosition = firstImageOnSlide ? data.length - 1 : data.length + 1     
      setCurrentImage(imagePosition)
      console.log(firstImageOnSlide)
  }

  const nextSlide = () => 
  {
      const lastImageOnSlide = currentImage === (data.length - 1)
      const imagePosition = lastImageOnSlide ? 0 : currentImage + 1     
      setCurrentImage(imagePosition)
      console.log(lastImageOnSlide)
  }

  const bgImageSlider = [
                            'http://127.0.0.1:8000/product/1714241459-938741880882126-pexels-pixabay-210019.jpg',
                            'http://127.0.0.1:8000/product/3516318571006617802edf10f.jpg'
                        ]

  return (
          <> 
            <div className='max-w-[1400px] h-full w-full m-auto relative'>
            {
                !isLoading && 
                  <>
                      <img src={data[currentImage].slider.url.image_url} className='absolute w-full h-full rounded-2xl bg-center object-cover duration-500' /> 
                          
                      <div className="absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-xl rounded-full p-2 bg-red-800 text-white cursor-pointer">
                          <BsChevronCompactLeft size={30} onClick={prevSlide} /> 
                      </div>
                      <div className="absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-xl rounded-full p-2 bg-red-800 text-white cursor-pointer">
                          <BsChevronCompactRight size={30} onClick={nextSlide} />  
                      </div>
                      <div className="absolute bg-brandGreen/80 rounded-full px-4 py-2 bottom-7 md:bottom-5 font-semibold text-sm  text-white right-2">
                          <span className="">{data[currentImage].slider.url.product.title} - </span>&nbsp;
                          <span className="">{currencyFormatter(data[currentImage].slider.url.product.price)}</span>
                          <br />
                          <span className="text-xs font-medium">
                            {`${data[currentImage].slider.lga && `${data[currentImage].slider.lga}, `}`}
                            {data[currentImage].slider.state || data[currentImage].slider.lga }
                          </span>
                      </div>
                  </>
            }  
              {/* <div className="absolute flex bottom-4 ml-10 bg-brandGreen/80 rounded-full justify-center">
                  {
                      !isLoading && data?.map((car, index) => {
                          return (
                              <div className="text-xl cursor-pointer">
                                  <RxDotFilled size={50} color="white" />
                              </div>
                          )
                      })
                  }
              </div> */}
            </div>
          </>
  );
};

export default SlideShow;

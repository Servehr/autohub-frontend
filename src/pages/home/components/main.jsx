import MaxWidthWrapper from "@/components/max-width-wrapper";
import categories from "@/constant/categories";
import SlideShow from "./slideshow";
import { Link, useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { useQuery } from "react-query";
import { fetchSponsored } from "@/apis/ads";
import LongAd from "@/assets/images/ads/p_ad.png";
import swapCar from "@/assets/swap-car.png";
import ReloadError from "@/components/error/reload";
import { fetchCategoryWithProductCount } from "@/apis/misc";
import axios from "axios";
import { useEffect, useState } from "react";
import { appStore } from "@/state/appState";
import { BASE_URL } from "@/lib/axios";

export default function Main() 
{ 
    const advertState = appStore((state) => state)
    const [theCategoryLink, setTheCategoryLink] = useState(advertState.getCategory())
    const { data, isLoading, isError } = useQuery("sponsored", fetchSponsored, {
      staleTime: Infinity,
    });


  const bgImageSlider = 'http://127.0.0.1:8000/product/1714241459-938741880882126-pexels-pixabay-210019.jpg'

  return (
    <main className="py-2 px-3">
      <MaxWidthWrapper>
        <div className="mb-5">
          {/* <div className="flex flex-col max-w-[1350px] bg-red-700 md:flex-row gap-2 min-h-max md:h-[450px] h-[400px] w-full"> */}
          <div className="grid grid-cols-12 gap-3">
             <div className="hidden md:block col-span-3">
                <CategoryContainer />
             </div>

             <div className="w-full col-span-12 md:col-span-6 h-full w-fit order-1 md:order-2 rounded-lg flex relative">
                  {data && (data.length === 0 || isError) && (
                    <>
                      <div className="flex justify-center items-center h-full w-full">
                        <img src="/assets/logo.png" alt="" aria-hidden />
                      </div>
                    </>
                  )}

                  {isError && (
                    <>
                      <div className="flex justify-center items-center h-full w-full">
                        <img src="/assets/logo.png" alt="" aria-hidden />
                      </div>
                    </>
                  )}

                  {isLoading && (
                    <>
                      <div className="flex justify-center items-center h-full w-full">
                        <BeatLoader color="#1c9236" />
                      </div>
                    </>
                  )}

                  {
                    data && data?.length !== 0 && <SlideShow />
                  }
             </div>

            <div className="hidden order-3 w-fit object-cover col-span-3 bg-gray-100 p-1 shrink-0 h-fit lg:flex justify-center">
                <img src={swapCar} alt="" />
            </div>
          </div>
        </div>
        
      </MaxWidthWrapper>
    </main>
  );
}

export const CategoryContainer = () => {
  // const navigate = useNavigate();
  const advertState = appStore((state) => state)
  

  // const { data, isLoading } = useQuery("category-with-product", fetchCategoryWithProductCount, {
  //   staleTime: Infinity,
  // });
  const [categoryData, setCategoryData] = useState([])

  useEffect(() => 
  {
      axios.get(`${BASE_URL}ad/list-with-catogries-count`).then((response) => {
          console.log(response.data)
          advertState.setCategory(response.data)
          setCategoryData(response.data)
      }).catch((error) => {
          console.log(error)
      })
  }, [categories]) 

  console.log(categoryData)


  return (
    <div className="order-2 md:order-1 w-full shrink-0  md:block h-full md:h-fit pb-5 bg-white overflow-hidden">
      <h3 className="hidden md:flex h-12 text-[#1e1e1e]/50 bg-brandGreen/5 w-full items-center px-4 text-sm font-semibold">
        Categories
      </h3>

      {/* Desktop View */}
      <ul className="hidden gap-1 md:flex flex-col justify-between px-2 pt-2">
        {categoryData.map((category, idx) => (
          <li key={idx}>
            <Link
              to={category.link}
              className="h-[39px] duration-300 transition flex items-center justify-between hover:bg-brandGreen/10 px-4 cursor-pointer rounded-lg"
            >
              <div className="flex gap-3 items-center">
                {/* <img src="/assets/arrow-right.svg" alt="" style={{width: "15px", height: "15px"}} /> */}
                <img src={category.icon} alt="" style={{width: "15px", height: "15px"}} />

                <p className="text-brandGreen text-xs font-medium">
                  {category.name}
                </p>
              </div>

              <div className="text-brandGreen text-sm font-semibold flex relative gap-5">
                {/* <div style={{paddingTop: "0.1em", paddingBottom: "0.1rem", fontSize: "11px"}} classsName="p-2 bg-blue-200 text-gray-800 rounded">{category.adverts}</div> */}
                <span style={{fontSize: "11px"}} class="bg-blue-500 text-purple-100 px-1 rounded-full">{category.products_count}</span>
                <img src="/assets/arrow-right.svg" alt="" />
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {/* Mobile View */}
      <ul className="p-3 gap-3 mt-3 grid grid-cols-4 flex-col md:hidden">
        {categoryData.map((category, idx) => (
          <li key={idx}>
            <Link
              to={category.link}
              className="h-full gap-2 flex flex-col items-center justify-between rounded cursor-pointer"
              role="button"
            >
              <div className="flex justify-center gap-3 items-center bg-brandGray w-full h-[72px] rounded-lg">
                <img aria-hidden="true" src={category.mobile_icon} alt="" />
              </div>

              <p className="text-center text-xs font-semibold text-ellipsis truncate w-full">
                {category.name}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};


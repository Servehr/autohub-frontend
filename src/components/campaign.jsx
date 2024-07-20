import Desktop from "@/assets/images/campaign_desk.png";
import Mobile from "@/assets/images/campaign_mobile.png";
import MaxWidthWrapper from "./max-width-wrapper";
import { appStore } from "@/state/appState";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "@/lib/axios";
import axios from "axios";
import { getCategories } from "@/apis/ads";
import { useQuery } from "react-query";

export default function Campaign() 
{
  const { data, isLoading, error, isError, refetch, isFetching } = useQuery([`all-categories`], () => getCategories());
  // const advertState = appStore((state) => state)
  // const [theCategoryLink, setTheCategoryLink] = useState(advertState.getCategory())

  const [categoryData, setCategoryData] = useState([])
  const [dataFeteched, setIsDataFetched] = useState(false)

  if(!isLoading)
  {
     console.log(data)
  }

  // useEffect(() => 
  // {
  //     axios.get(`${BASE_URL}ad/list-with-catogries-count`).then((response) => {
  //         setCategoryData(response.data)
  //     }).catch((error) => {
  //         console.log(error)
  //     })
  // }, [])

  return (
    <section className="cursor-pointer -mt-2 -mb-10" onClick={() => {}}>
      <MaxWidthWrapper>
        { !isLoading &&
          <>        
            <div className="md:hidden lg:hidden xs:block sm:block p-1 py-7 -mt-5">
                    <div className="px-1 font-bold text-xl text-green-600 mb-2 mx-3">Categories</div>
                    <ul className="p-3 gap-3 mt-3 grid grid-cols-12 flex-col md:hidden">
                    {!isLoading && data?.data?.map((category, idx) => (
                        <li key={idx} className="col-span-4">
                          <Link
                            to={category.mobile}
                            className="h-full gap-2 flex flex-col items-center justify-between rounded cursor-pointer"
                            role="button"
                          >
                            <div className="flex justify-center gap-3 items-center bg-brandGray w-full h-[72px] hover:bg-green-300 rounded-lg">
                              <img aria-hidden="true" src={category.mobile} alt="" />
                            </div>

                            <p className="text-center text-xs font-semibold text-ellipsis truncate w-full">
                              {category.name}
                            </p>
                          </Link>
                        </li>
                      ))}
                    </ul>
            </div>

            {/* <div className="bg-blue-500 font-bold text-white md:text-md text-sm">      
                <marquee direction="up" scrollamount="1" className="flex mx-3 justify-center items-center">AutoHub: To Revolutionize Automobile Industry through a turnkey service provision</marquee>
            </div> */}
            <div className="-mt-3 sm:mb-2 xs:mb-2 p-2">
                <img src={Desktop} alt="" className="hidden sm:block" />
                <img src={Mobile} alt="" className="sm:hidden w-full" />
            </div>
            {/* <div className="bg-blue-300 p-1 md:hidden lg:hidden"></div> */}
            <div className="mb:hidden lg:hidden p-5"></div>
          </>
        }
      </MaxWidthWrapper>
    </section>
  );
}

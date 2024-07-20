import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import Main from "./components/main";
import { useEffect, useState } from "react";
import { browserType } from "@/store";
import { isMobile } from 'react-device-detect';
import { BeatLoader } from "react-spinners";
import { useInfiniteQuery, useQuery } from "react-query";
import { fetchAll, fetchSponsored } from "@/apis/ads";
import { useInView } from "react-intersection-observer";
import Campaign from "@/components/campaign";
import categories from "@/constant/categories";
import { SectionSkeleton } from "@/components/product/skeletons";
import { appStore } from "@/state/appState";
import {
  BlankSection,
  Cars,
  Featured,
  SponsoredSection,
  SponsoredSection2,
} from "@/components/product/sections";
import { ProductCard } from "@/components/product/product-card";
import ReloadError, { ReloadError2 } from "@/components/error/reload";
import { fetchCategoryWithProductCount } from "@/apis/misc"; 
import HomeLand from "./components/HomeLand";

export default function HomePage() {
  const { isMobile } = browserType();
  // console.log(isMobile)
  
  return (
    <>
      <Helmet>
        <title>Home | Autohub</title>
        <meta name="description" content="The Home For Automobiles" />
      </Helmet>

      <Main />

      { isMobile ? <MobileView /> : <DesktopView />}
    </>
  );
}

function DesktopView() {
  const [loading, setLoading] = useState(false);
  const advertState = appStore((state) => state)
  const [theCategoryLink, setTheCategoryLink] = useState(advertState.getCategory())
  console.log(theCategoryLink)

  const { data, isLoading } = useQuery("sponsored", fetchSponsored, {
    staleTime: Infinity,
  });

  useEffect(() => {
    if (!data) {
      setLoading(true);
    }
    if (data) {
      setLoading(false);
    }
  }, [isLoading, data]);
  
  return (
    <>
      <MaxWidthWrapper>
        <div className="flex flex-col gap-4">
          {loading ? (
            <div className="">
              {/* <Campaign /> */}

              <SectionSkeleton />
              
              {/* <SectionSkeleton /> */}

            </div>
          ) : (
            <>
              {/* <img src={xImage} alt="theImage" width={30} height={30} /> */}


              <Campaign />
              
              {/* <div className="bg-green-700 -mb-4 mt-5 md:hidden lg:hidden xs:block sm:block p-1 py-3">
                  <h1 className="px-2 font-bold text-white mb-2">Categories</h1>
                  <ul className="gap-1 grid grid-cols-12 justify-between">
                          {theCategoryLink.map((category, idx) => (
                            <li key={idx} className="col-span-4 bg-white rounded-md m-1 hover:bg-green-300">
                              <Link
                                to={category.link}
                                className="h-[39px] duration-300 py-10 transition flex items-center justify-between hover:bg-green-300 px-4 cursor-pointer rounded-lg"
                              >
                                <div className="items-center flex">
                                  <img src={category.icon} alt="" width={40} height={40}/>

                                  <p className="text-brandGreen text-xs font-medium pl-2">
                                    {category.name}
                                  </p>
                                </div>

                                <div className="text-brandGreen text-sm font-semibold flex relative gap-5 bottom-0 right-0">
                                  <span style={{fontSize: "11px"}} class="bg-blue-500 text-purple-100 px-1 rounded-full">{category.products_count}</span>
                                </div>
                              </Link>
                            </li>
                          ))}
                  </ul>
              </div> */}

              {/* <SponsoredSection2 /> */}

              <HomeLand />

              {/* <SponsoredSection /> */}

              {/* <Featured /> */}

              {/* <Cars /> */}

              {/* <Link to="/products" className="w-full flex justify-center">
                <button className="font-semibold text-sm md:text-base bg-brandGreen min-w-[200px] text-white h-[45px] rounded w-full md:w-max">
                  See More
                </button>
              </Link> */}
            </>
          )}
        </div>
      </MaxWidthWrapper>
    </>
  );
}

function MobileView() {
  const { ref, inView } = useInView();
  const [loading, setLoading] = useState(false);
  const { data, isLoading, isError, refetch } = useQuery(
    "sponsored",
    fetchSponsored,
    {
      staleTime: Infinity,
    }
  );
  const {
    data: AllData,
    isSuccess,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: "all",
    queryFn: ({ pageParam = 1 }) => fetchAll(pageParam),
    getNextPageParam: (lastPage, allPages) => {
      const nextPageParam =
        lastPage?.current_page !== lastPage?.last_page
          ? allPages.length + 1
          : undefined;
      return nextPageParam;
    },
  });

  const content =
    isSuccess &&
    AllData?.pages.map((page) =>
      page.data.map((item, idx) => {
        if (page.data.length === idx + 1) {
          return <ProductCard innerRef={ref} key={item.id} data={item} />;
        }
        return <ProductCard key={item.id} data={item} />;
      })
    );

  useEffect(() => {
    if (!data) {
      setLoading(true);
    }
    if (data) {
      setLoading(false);
    }
  }, [isLoading, data]);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  return (
    <>
      <div className="px-3 pb-5">
        <Campaign />

        {loading ? (
          <div className="py-10 justify-center flex items-center">
            <BeatLoader color="#1c9236" />
          </div>
        ) : (
          <>

            <BlankSection>{content}</BlankSection>

            {isFetchingNextPage && (
              <div className="pt-2 pb-5 justify-center flex items-center">
                <BeatLoader color="#1c9236" />
              </div>
            )}

            <div className="font-bold text-[#8f8e8e] flex justify-center">
              <p>.</p>
            </div>
          </>
        )}
      </div>
    </>
  );
}

// export const InfinteScrollAllProducts = () => {
//   const { ref, inView } = useInView();
//   const [loading, setLoading] = useState(false);
//   const { data, isLoading } = useQuery("sponsored", fetchSponsored);
//   const {
//     data: AllData,
//     isSuccess,
//     hasNextPage,
//     fetchNextPage,
//     isFetchingNextPage,
//   } = useInfiniteQuery({
//     queryKey: "all",
//     queryFn: ({ pageParam = 1 }) => fetchAll(pageParam),
//     getNextPageParam: (lastPage, allPages) => {
//       const nextPageParam =
//         lastPage?.current_page !== lastPage?.last_page
//           ? allPages.length + 1
//           : undefined;
//       return nextPageParam;
//     },
//   });

//   const content =
//     isSuccess &&
//     AllData?.pages.map((page) =>
//       page.data.map((item, idx) => {
//         if (page.data.length === idx + 1) {
//           return <ProductCard innerRef={ref} key={item.id} data={item} />;
//         }
//         return <ProductCard key={item.id} data={item} />;
//       })
//     );

//   useEffect(() => {
//     if (!data) {
//       setLoading(true);
//     }
//     if (data) {
//       setLoading(false);
//     }
//   }, [isLoading, data]);

//   useEffect(() => {
//     if (inView && hasNextPage) {
//       fetchNextPage();
//     }
//   }, [inView, fetchNextPage, hasNextPage]);
//   return (
//     <>
//       <MaxWidthWrapper>
//         <div className="px-3 pb-5">
//           <Campaign />

//           {loading ? (
//             <div className="py-10 justify-center flex items-center">
//               <BeatLoader color="#1c9236" />
//             </div>
//           ) : (
//             <>
//               <SponsoredSection />

//               <BlankSection>{content}</BlankSection>

//               {isFetchingNextPage && (
//                 <div className="pt-2 pb-5 justify-center flex items-center">
//                   <BeatLoader color="#1c9236" />
//                 </div>
//               )}

//               <div className="font-bold text-[#8f8e8e] flex justify-center">
//                 <p>.</p>
//               </div>
//             </>
//           )}
//         </div>
//       </MaxWidthWrapper>
//     </>
//   );
// };

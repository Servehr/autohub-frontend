import Breadcrumb from "@/components/breadcrumb";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import categories from "@/constant/categories";
import { useLocation } from "react-router-dom";
import NotFound from "../not-found";
import { useInfiniteQuery } from "react-query";
import { fetchByCategory } from "@/apis/ads";
import { Loader } from "@/App";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { BeatLoader } from "react-spinners";
import { BlankSection, SponsoredSection } from "@/components/product/sections";
import { ProductCard } from "@/components/product/product-card";
import { IoReload } from "react-icons/io5";

export default function CategoryPage() 
{
  
  console.log("+++++++++++++++++++++++")
  const { pathname } = useLocation();
  const { ref, inView } = useInView();
  const categoryData = categories.filter((item) => item.link === pathname)[0];
  const categoryName = pathname.split("/")[1];
  // console.log(categoryData)
  // console.log(categoryName)
  // console.log(pathname)

  if (!categoryData || categoryData.length == 0) {
    return <NotFound />;
  }

  const {
    data,
    isSuccess,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    error,
    isError,
    refetch,
  } = useInfiniteQuery({
    queryKey: categoryName,
    queryFn: ({ pageParam = 1 }) => fetchByCategory(categoryData.id, pageParam),
    getNextPageParam: (lastPage, allPages) => {
      console.log(allPages)
      const nextPageParam =
        lastPage?.current_page !== lastPage?.last_page
          ? allPages.length + 1
          : undefined;
      return nextPageParam;
    },
  });

  const handleRetry = () => {
    refetch();
  };

  const content =
    isSuccess &&
    data?.pages?.map((page) =>
      page?.data.map((item, idx) => {
        if (page.data.length === idx + 1) {
          return <ProductCard innerRef={ref} key={item.id} data={item} />;
        }
        return <ProductCard key={item.id} data={item} />;
      })
    );

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  return (
    <>
      <MaxWidthWrapper>
        <div className="px-3 py-5">
          <>
            <Breadcrumb
              routes={
                categoryData && [
                  { name: categoryData?.name, link: categoryData?.link },
                ]
              }
            />

            {/* <h1 className="text-brandGreen text-4xl font-semibold">
              {categoryData.name}
            </h1>
            */}

            <p className="text-sm mt-4 text-brandDarkGray">
              {data && data?.pages[0]?.total
                ? `${data.pages[0].total} Total Product found`
                : ""}
            </p>

            {isLoading && <Loader />}

            {isSuccess && (
              <>
                {data.pages[0].data?.length === 0 ? (
                  <>
                    <div className="py-4">
                      <div className="mb-2 py-10 w-full text-brandDarkGray italic text-sm font-medium text-center justify-center items-center rounded-lg px-2">
                        Nothing Product found in <br />
                        <span className="font-semibold">
                          "{categoryData.name}".
                        </span>
                        <br /> <br /> Check back later.
                      </div>

                      <SponsoredSection />
                    </div>
                  </>
                ) : (
                  <>
                    <BlankSection>{content}</BlankSection>
                  </>
                )}

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

            {/* error */}
            {isError && (
              <>
                <div className="w-full min-h-[500px] flex flex-col gap-3 justify-center items-center text-brandDarkGray">
                  <IoReload size={40} />
                  <p>Something went wrong!</p>
                  <p
                    onClick={handleRetry}
                    className="font-bold inderline cursor-pointer"
                  >
                    Click to retry!
                  </p>
                </div>
              </>
            )}
          </>
        </div>
      </MaxWidthWrapper>
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

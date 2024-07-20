import { useQuery } from "react-query";
import { fetchByCategory } from "@/apis/ads";
import { fetchFeatured } from "@/apis/ads";
import { fetchMoreFromModel } from "@/apis/ads";
import { fetchMoreFromVendor } from "@/apis/ads";
import { SectionSkeleton, SponsoredCardSkeleton } from "./skeletons";
import { fetchSponsored } from "@/apis/ads";
import { Link, useNavigate } from "react-router-dom";
import currencyFormatter from "@/utils/currency-formatter";
import { Img } from "react-image";
import useUser from "@/hooks/useUser";
import WatchListIcon from "./watchlist-icon";
import { ProductCard, ProductCard2 } from "./product-card";
import { generateProductDetailsRouteWithSlugUrl } from "@/constant/links";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { useEffect } from "react";

export function Cars() {
  const { data, isLoading } = useQuery("carsD", () => fetchByCategory(1, 1));

  if (isLoading) {
    return <SectionSkeleton />;
  }

  return (
    <Section data={data?.data?.slice(0, 8)} title={"Cars"} route="/cars" />
  );
}

export function Featured() {
  const { data, isLoading } = useQuery("featured", fetchFeatured);

  if (isLoading) {
    return <SectionSkeleton />;
  }

  if(!isLoading) {
    return <SectionSkeleton />;
  }

  return <Section data={data} title={"Featured"} route="/search?featured" />

  // return <>
  //     {
  //        !isLoading && <Section data={data} title={"Featured"} route="/search?featured" />
  //     }
  // </>
}

export function MoreFromModel({ id }) {
  const { data, isLoading } = useQuery(["more-from-model", id], () =>
    fetchMoreFromModel(id)
  );

  if (isLoading) {
    return <SectionSkeleton />;
  }

  if (data) {
    return <Section data={data} title={"More from Model"} />;
  }
}

export function MoreFromVendor({ id }) {
  const { data, isLoading } = useQuery(["more-from-vendor", id], () =>
    fetchMoreFromVendor(id)
  );

  if (isLoading) {
    return <SectionSkeleton />;
  }

  if (data) {
    return <Section data={data} title={"More from Vendor"} />;
  }
}

export function SponsoredSection({ title = "Sponsored" }) 
{
  const { data, isLoading } = useQuery("sponsored", fetchSponsored, {
    staleTime: Infinity,
  });

  return (
    <>
      {isLoading && (
        <div className="mb-4 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
          {[1, 2, 3, 4, 5].map((item) => (
            <SponsoredCardSkeleton key={item} />
          ))}
        </div>
      )}

      {data && (
        <div className="min-h-[150px] rounded-xl flex flex-col p-6 px-3 gap-4 bg-white">
          <div className="flex gap-1 items-center">
            <h2 className="font-semibold md:text-lg shrink-0">{title}</h2>
            <img src="/assets/icons/star.svg" alt="" />
          </div>

          {data?.length === 0 ? (
            <>
              <div className="py-10 w-full text-brandDarkGray italic text-sm font-medium text-center justify-center items-center flex">
                No Sponsored Ad
              </div>
            </>
          ) : (
            <div className="grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
              {data.map((item, idx) => (
                <SponsoredProductCard key={idx} data={item} />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export function SponsoredSection2() {
  const { data, isLoading } = useQuery(`sponsored`, fetchSponsored, {
    staleTime: Infinity,
  });

  if (isLoading) {
    return <SectionSkeleton />;
  } else {
    //  console.log(data)
  }

  return (
     <>
          {
             !isLoading && <Section2 data={data?.slice(-10).reverse()} title={"Sponsored"} />
          }
     </>
  );
}

export function SponsoredProductCard({ data }) {
  const imgUrl = data?.avatar;
  const navigate = useNavigate();
  const { data: user } = useUser();

  return (
    <div
      onClick={() => {
        navigate(
          generateProductDetailsRouteWithSlugUrl(data.category_id, data.slug)
        );
      }}
      title={data?.title}
      className="w-full h-[100px] gap-4 rounded-xl border border-gray-100 p-2 text-sm items-center flex hover:shadow-md  overflow-hidden"
    >
      <div className="h-[80px] w-[100px] bg-gray-200 flex justify-center items-center rounded-xl overflow-hidden shrink-0 relative">
        {user && (
          <div className="absolute z-30 right-0 bottom-0">
            <WatchListIcon id={data?.id} />
          </div>
        )}
        <Img src={imgUrl} alt="" className="object-cover w-full h-full" />
      </div>

      <div className="flex flex-col flex-wrap gap-1 md:gap-[1px] ">
        <h3 className="font-semibold whitespace-break-spaces w-full text-sm md:text-base text-brandGreen text-ellipsis truncate">
          {data?.title}
        </h3>

        {/* <div className="justify-between flex gap-2"> */}
        <p className="text-brandGreen text-sm md:text-base font-bold text-ellipsis truncate">
          {data?.price && currencyFormatter(data.price)}
        </p>

        <p className="text-[10px] text-sm text-red-600 text-ellipsis truncate">
          {data?.state?.name}
        </p>
      </div>
    </div>
  );
}

export function Section2({ title, data, route }) 
{
  return (
    <>
      <div className="min-h-[200px] rounded-xl flex flex-col p-6 px-3 gap-4 bg-white">
        <>
          <div className="flex justify-between">
            {title && (
              <div className="flex gap-1">
                <h2 className="font-semibold md:text-lg shrink-0">{title}</h2>
                <img src="/assets/icons/star.svg" alt="" />
              </div>
            )}

            {route && (
              <Link to={route} className="text-brandGreen font-semibold">
                See all
              </Link>
            )}
          </div>
        </>

        {data?.length === 0 ? (
          <>
            <div className="py-10 w-full text-brandDarkGray italic text-sm font-medium text-center justify-center items-center flex">
              Nothing here. <br /> Check back back later
            </div>
          </>
        ) : (
          // <div class="container mx-auto">
          //   <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          //       <ProductCard2 key={idx} data={item} />
          //   </div>
          // </div>
          <ResponsiveMasonry
            columnsCountBreakPoints={{ 300: 1, 480: 2, 768: 3, 1024: 4 }}
          >
            <Masonry gutter="16px">
              {data?.map((item, idx) => (
                <ProductCard2 key={idx} data={item} />
              ))}
            </Masonry>
          </ResponsiveMasonry>
        )}
      </div>
    </>
  );
}

export function Section({ title, data, route, background }) 
{
  useEffect(() => {

  }, [])

  return (
    <>
      <div
        className={`${
          background && "bg-white"
        } min-h-[200px] rounded-xl flex flex-col py-4 px-1 md:px-3 gap-4`}
      >
        <>
          <div className="flex justify-between">
            {title && (
              <div className="flex gap-1">
                <h2 className="font-semibold md:text-lg shrink-0">{title}</h2>
                {/* <img src="/assets/icons/star.svg" alt="" /> */}
              </div>
            )}

            {route && (
              <Link to={route} className="text-brandGreen font-semibold">
                See all
              </Link>
            )}
          </div>
        </>

        {data?.length === 0 ? (
          <>
            <div className="py-10 w-full text-brandDarkGray italic text-sm font-medium text-center justify-center items-center flex">
              Nothing here. <br /> Check back back later
            </div>
          </>
        ) : (
          <ResponsiveMasonry columnsCountBreakPoints={{ 300: 2, 1024: 4 }}>
            <Masonry gutter="16px">
              {
                data?.map((item, idx) => (
                  <div key={idx} className="justify-center flex">
                    <ProductCard data={item} />
                  </div>
                ))
              }
            </Masonry>
          </ResponsiveMasonry>
        )}
      </div>
    </>
  );
}

export function BlankSection({ children, background }) {
  return (
    <>
      {children && (
        <div
          className={`${
            background && "bg-white"
          } min-h-[200px] rounded-xl flex flex-col my-4 gap-4`}
        >
          <div className="flex gap-1"></div>

          <ResponsiveMasonry
            columnsCountBreakPoints={{ 300: 2, 768: 3, 1024: 4 }}
          >
            <Masonry gutter="5px">{children}</Masonry>
          </ResponsiveMasonry>
        </div>
      )}
    </>
  );
}

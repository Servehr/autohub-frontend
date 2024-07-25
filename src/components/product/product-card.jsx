import { generateProductDetailsRouteWithSlugUrl } from "@/constant/links";
import WatchListIcon from "./watchlist-icon";
import { IoLocationSharp } from "react-icons/io5";
import { Img } from "react-image";
import { useNavigate } from "react-router-dom";
import currencyFormatter from "@/utils/currency-formatter";
import useUser from "@/hooks/useUser";
import { useQuery } from "react-query";
import { fetchWatchList } from "@/apis/watchlist";
import ProgressiveImage from "react-progressive-graceful-image";
import logoImg from "@/assets/logo.png";
import { PRODUCT_FACE, WATER_MARK } from "@/lib/axios";

function isProductInWatchList(watchlist, product_id) {
  try {
    if (watchlist || watchlist?.length !== 0) {
      const result = watchlist?.filter(
        (product) => product.product_id === product_id
      )[0];
      console.log(result)
      return result;
    } else {
      return false;
    }
  } catch {
    return false;
  }
}

export function ProductCard2({ data }) {
  const { data: user } = useUser();
  const { data: watchlist } = useQuery("watchlist", fetchWatchList, {
    staleTime: Infinity,
    token: !!user,
  });

  const imgUrl = data?.avatar;
  const navigate = useNavigate();
  console.log(watchlist)
  // const { data: user } = useUser();

  return (
    <div
      onClick={() => {
        navigate(
          generateProductDetailsRouteWithSlugUrl(data.category_id, data.slug)
        );
      }}
      className="w-full cursor-pointer lg:max-w-[300px] h-[250px] sm:h-[280px] overflow-hidden gap-4 border border-2 border-gray-100 rounded-xl pb-2 bg-white  text-sm justify-betwee flex-col flex hover:shadow-lg"
    >
      <div className="h-[180px] w-full bg-gray-200 flex justify-center items-center rounded-t-xl overflow-hidden relative" style={{ marginBottom: '30px' }}>
        {/* {user && ( */}
        <div className="absolute z-30 right-1 bottom-1">
          <WatchListIcon
            id={data?.id}
            inWatchlist={isProductInWatchList(watchlist, data?.id)}
          />
        </div>
        {/* )} */}
        <ProgressiveImage src={imgUrl} placeholder={logoImg}>
          {(src, loading) => (
            <img
              className={`${
                loading
                  ? "max-w-[150px] w-2/3 animate-pulse h-auto brightness-100 grayscale"
                  : "w-full h-full"
              } object-cover `}
              src={src}
              alt={data?.title}
            />
          )}
        </ProgressiveImage>
      </div>

      <div className="flex flex-col gap-[1px] px-3">
        <h3 className="font-bold text-sm sm:text-base text-brandGreen text-ellipsis truncate">
          {`${data?.title}`}
        </h3>

        <div className="justify-between flex flex-col md:flex-row gap-[1px]">
          <p className="text-sm sm:text-base font-bold text-ellipsis truncate text-blue-500">
            {data?.price && currencyFormatter(data.price)}
          </p>

          <div className="text-brandRed flex items-center">
            <IoLocationSharp />
            <p className="text-sm text-red-600 text-ellipsis truncate">
              {data?.state?.name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProductCard({ data, innerRef }) {
  const imgUrl = `${PRODUCT_FACE}${data?.avatar}`;
  const waterM = `${WATER_MARK}${data?.watermark}`;
  console.log(imgUrl)
  const navigate = useNavigate();
  const { data: user } = useUser();
  const { data: watchlist } = useQuery("watchlist", fetchWatchList, {
    staleTime: Infinity,
    token: !!user,
  });

  console.log(imgUrl)

  return (
    <div
      ref={innerRef && innerRef}
      onClick={() => {
        navigate(
          generateProductDetailsRouteWithSlugUrl(data.category_id, data.slug)
        );
      }}
      style={{ marginBottom: '30px' }}
      className="w-full lg:max-w-[300px] h-max overflow-hidden cursor-pointer gap-2 rounded-xl border border-3 border-gray-200 hover:border-gray-400 hover:border-5 hover:p-1 pb-1 justify-between flex-col flex shadow-md hover:shadow-lg bg-white"
    >
      <div className="h-[180px] w-full bg-gray-200 flex justify-center items-center rounded-t-xl overflow-hidden relative">
        {/* {user && ( */}
        <div className="absolute z-30 right-1 bottom-1">
          <WatchListIcon
            id={data?.id}
            inWatchlist={isProductInWatchList(watchlist, data?.id)}
          />
        </div>
        {/* )} */}
        {/* <img
              className={`${
                "w-full h-full"
              }`}
              src={imgUrl}
              alt={data?.title}
            /> */}


            
            <ProgressiveImage src={imgUrl} placeholder={logoImg}>
              {(src, loading) => (
                <img
                  className={`${
                    loading
                      ? "max-w-[150px] w-2/3 h-auto brightness-100 grayscale animate-pulse"
                      : "w-full h-full"
                  } object-cover `}
                  src={src}
                  alt={data?.title}
                />
              )}
            </ProgressiveImage>
            <div className="absolute mt-0">
                <img src={waterM} className="" style={{width: '90px'}} />
            </div>
      </div>

      <div className="flex flex-col gap-[1px] p-2 px-4 pb-2">
        <p className="font-bold md:text-md text-lg" style={{ fontSize: '16px', color: '#05b52c' }}>
          {data?.title}
        </p>

        <p className="text-sm md:text-base text-blue-500 font-bold">
          {data?.price && currencyFormatter(data.price)}
        </p>

        <p className="text-brandRed leading-none">
          <IoLocationSharp size={10} className="inline" />{" "}
          <span className="text-xs md:text-sm text-red-600 font-semibold">
            {data?.ijinle_id} {data?.country_id} 
            {data?.state?.name}
          </span>
        </p>
      </div>
    </div>
  );
}

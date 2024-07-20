import { deleteWatchListItem, fetchWatchList } from "@/apis/watchlist";
import { useState } from "react";
import { useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { BeatLoader, BounceLoader } from "react-spinners";
import currencyFormatter from "@/utils/currency-formatter";
import { queryClient } from "@/main";
import toast from "react-hot-toast";
import { fetchMyMessage } from "@/apis/user";
import { generateProductDetailsRouteWithSlugUrl } from "@/constant/links";
import { browserType } from "@/store";
// import { Loader } from "@/App";

const tabItems = [
  {
    id: 1,
    name: "Watchlist",
  },
  {
    id: 2,
    name: "Bought",
  },
  {
    id: 3,
    name: "Messages",
  },
];

export default function Shopping() {
  const [active, setActive] = useState(1);

  return (
    <div className="flex flex-col items-center md:items-start h-full mb-20">
      {/* Tab */}
      <div className="shrink-0 h-[47px] md:h-14  bg-[#F1FFF4] max-w-[400px] w-full rounded-3xl flex justify-between items-center px-6 text-sm md:text-base">
        {tabItems.map((item) => (
          <p
            key={item.id}
            onClick={() => setActive(item.id)}
            className={` ${
              item.id === active
                ? "text-brandGreen font-bold"
                : "text-brandDarkGray font-medium"
            } cursor-pointer `}
          >
            {item.name}
          </p>
        ))}
      </div>
      {/* Item */}
      <div className="mt-4  w-full h-max md:min-h-[400px] p-2 rounded-lg md:border overflow-hidden">
        {active === 1 && <WatchList />}

        {active === 2 && <Bought />}

        {active === 3 && <Messages />}
      </div>
    </div>
  );
}

function Messages() {
  const { data, isLoading, isError } = useQuery("messages", fetchMyMessage);

  const navigate = useNavigate();
  const { isMobile } = browserType();
  return (
    <>
      <div className="flex flex-col gap-2 bg-white py-4 px-2 rounded-lg">
        {data &&
          data.length !== 0 &&
          data.map((item) => (
            <div
              key={item.id}
              onClick={() =>
                navigate(
                  `${navigate(
                    generateProductDetailsRouteWithSlugUrl(
                      item.product.category_id,
                      item.product.slug
                    )
                  )}#comments`
                )
              }
              className="h-max border-b flex flex-col p-2 gap-5 justify-between relative bg-whit"
            >
              <div className="flex flex-col gap-1 text-brandDarkGray ">
                <p className="font-medium text-brandDarkGray text-sm ">
                  Comment on product{" "}
                  <span className="text-brandGreen underline">
                    #{item?.product_id} - {item?.product?.title}
                  </span>
                </p>
              </div>

              {item?.user && (
                <>
                  <p>
                    <span className="text-brandGreen">{item.user.name}</span> :{" "}
                    <span className="whitespace-break-spaces">
                      {item.message}
                    </span>
                  </p>
                </>
              )}
            </div>
          ))}
      </div>
      {isLoading && (
        <div className="min-h-[320px] flex justify-center items-center text-brandGreen">
          {isMobile ? (
            <BeatLoader color="#1c9236" />
          ) : (
            <BounceLoader color="#1c9236" />
          )}
        </div>
      )}
      {!isLoading && !isError && data?.length === 0 && (
        <div className="rounded-lg py-2 min-h-[320px] h-full">
          <div className="flex justify-center min-h-[320px] h-full items-center w-full ">
            <div className="text-center">
              <Link
                to="/"
                className="inline-block px-5 py-2 mt-4 text-sm font-medium text-white bg-brandGreen/90 rounded hover:bg-brandGreen focus:outline-none focus:ring"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      )}
      {isError && (
        <>
          <div className="rounded-lg py-2 min-h-[320px] h-full">
            <div className="flex justify-center min-h-[320px] h-full items-center w-full ">
              <div className="text-center">
                <p className="mt-4 text-gray-500">No message yet!</p>

                <Link
                  to="/"
                  className="inline-block px-5 py-2 mt-4 text-sm font-medium text-white bg-brandGreen/90 rounded hover:bg-brandGreen focus:outline-none focus:ring"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

function Bought() {
  // const { data, isLoading, isError } = useQuery("watchlist", fetchWatchList);
  // const imgUrl = data?.avatar && JSON.parse(data?.avatar)[0];
  return (
    <>
      {/* {console.log(data)} */}

      <div className="rounded-lg py-2 h-[300px]">
        <div className="flex justify-center  h-full items-center w-full ">
          <div className="text-center">
            <p className="mt-4 text-gray-500">Nothing Here</p>

            <Link
              to="/"
              className="inline-block px-5 py-2 mt-4 text-sm font-medium text-white bg-brandGreen/90 rounded hover:bg-brandGreen focus:outline-none focus:ring"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export function WatchList() {
  const { data, isLoading, isError } = useQuery("watchlist", fetchWatchList);
  const [loading, setLoading] = useState(false);
  const [clickedItem, setClickedItem] = useState(null);
  const { isMobile } = browserType();

  const navigate = useNavigate();
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {loading && (
          <>
            <div
              className="h-screen w-screen top-0 z-40 left-0 fixed bg-brandDarkGray/50
               flex justify-center items-center"
            >
              {isMobile ? (
                <BeatLoader color="#1c9236" />
              ) : (
                <BounceLoader color="#1c9236" />
              )}
            </div>
          </>
        )}
        {data &&
          data.length !== 0 &&
          data.map((item) => (
            <div
              key={item.id}
              onClick={() =>
                navigate(
                  generateProductDetailsRouteWithSlugUrl(
                    item.product.category_id,
                    item.product.slug
                  )
                )
              }
              className="h-[130px] bg-brandGreen/5 hover:bg-brandGreen/10 hover:shadow flex flex-col p-2 rounded-lg gap-2 justify-between relative"
            >
              <div className="flex items-center h-[90px] gap-5">
                <div className="h-full bg-gray-100 w-[120px] rounded-lg overflow-hidden">
                  <img
                    src={
                      item.product.avatar
                        ? JSON.parse(item?.product?.avatar)[0]
                        : ""
                    }
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-sm sm:text-base">
                  <h1 className="sm:text-sm ">{item?.product?.title}</h1>
                  <p className="font-medium text-brandGreen">
                    {item?.product?.price &&
                      currencyFormatter(item.product.price)}
                  </p>
                  <p className="text-xs text-brandRed">
                    {item?.product?.state?.name}
                  </p>
                </div>
              </div>

              <div className="text-sm md:text-lg  shrink-0 text-right text-brandRed font-semibold cursor-pointer">
                <button
                  onClick={(e) => {
                    e.stopPropagation();

                    setLoading(true);
                    setClickedItem(item.product_id);

                    deleteWatchListItem(item.product_id)
                      .then(() => {
                        setLoading(false);
                        setClickedItem(null);
                        queryClient.invalidateQueries("watchlist");
                        toast.success("Product removed succesfully", {
                          position: "top-right",
                        });
                      })
                      .catch((err) => {
                        setLoading(false);
                        setClickedItem(null);
                        toast.error(`${err}`, { position: "top-right" });
                      });
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
      </div>

      {isLoading && (
        <div className="min-h-[320px] flex justify-center items-center text-brandGreen">
          {isMobile ? (
            <BeatLoader color="#1c9236" />
          ) : (
            <BounceLoader color="#1c9236" />
          )}
        </div>
      )}

      {!isLoading && !isError && data?.length === 0 && (
        <div className="rounded-lg py-2 min-h-[200px] h-full">
          <div className="flex justify-center min-h-[200px] h-full items-center w-full ">
            <div className="text-center">
              <p className="mt-4 text-gray-500">Watchlist is empty</p>

              <Link
                to="/"
                className="inline-block px-5 py-2 mt-4 text-sm font-medium text-white bg-brandGreen/90 rounded hover:bg-brandGreen focus:outline-none focus:ring"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      )}

      {isError && (
        <>
          <div className="rounded-lg py-2 min-h-[200px] h-full">
            <div className="flex justify-center min-h-[200px] h-full items-center w-full ">
              <div className="text-center">
                <p className="mt-4 text-gray-500">Watchlist is empty</p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

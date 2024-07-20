import { fetchMyMessage } from "@/apis/user";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { browserType } from "@/store";
// import { product_details_base_url } from "@/constant/links";
import { useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { BeatLoader, BounceLoader } from "react-spinners";

export default function NotificationPage() {
  return (
    <main className="px-3 mt-5 mb-10">
      <MaxWidthWrapper>
        <div>
          <div className="bg-brandGreen/10 w-full rounded ">
            <p className="py-2 px-3 text-brandGreen font-semibold">Messages</p>
          </div>

          <div className="w-full py-2 min-h-[300px] rounded flex flex-col gap-2">
            <Messages />
          </div>
        </div>
      </MaxWidthWrapper>
    </main>
  );
}

export function Messages() {
  const { data, isLoading, isError } = useQuery("messages", fetchMyMessage);

  // console.log(data)
  const { isMobile } = browserType();
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-col gap-2  py-2 rounded-lg">
        {data &&
          data.length !== 0 &&
          data.map((item) => (
            <div
              key={item.id}
              onClick={() => navigate(`/product/${item.product_id}#comments`)}
              className="h-max flex flex-col p-2 gap-3 justify-between relative bg-white rounded-lg w-full"
            >
              {/* {console.log(item)} */}
              <div className="flex flex-col gap-1 text-brandDarkGray ">
                <p className="font-medium text-brandDarkGray text-sm ">
                  Comment on product{" "}
                  <span className="text-brandGreen underline">
                    #{item?.product_id}
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

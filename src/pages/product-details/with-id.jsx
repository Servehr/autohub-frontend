import MaxWidthWrapper from "@/components/max-width-wrapper";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import caution from "@/assets/icons/caution.svg";
import { formatDate } from "@/utils/ad";
import { addMessage, fetchProductDetails } from "@/apis/ads";
import currencyFormatter from "@/utils/currency-formatter";
import useUser from "@/hooks/useUser";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { queryClient } from "@/main";
import { BeatLoader } from "react-spinners";
import { Helmet } from "react-helmet-async";
import Breadcrumb from "@/components/breadcrumb";
import categories from "@/constant/categories";
import ProductImageCarousel from "@/components/product-image-carousel";
import { ProductDetailSkeleton } from "@/components/product/skeletons";
import { generateProductDetailsRouteWithSlugUrl } from "@/constant/links";
import { MoreFromModel, MoreFromVendor } from "@/components/product/sections";
import { AVATAR, WATER_MARK } from "@/lib/axios";

const schema = yup
  .object({
    message: yup
      .string()
      .required("Comment is required")
      .min(3, "Comment must be at least 10 characters"),
    product_id: yup.number().positive().integer().required(),
  })
  .required();

function Info() {
  return (
    <>
      {/* Useful Info */}
      <div className="lg:hidden lg:w-[300px] max-w-[800px] w-full rounded-xl bg-white h-max shrink-0 flex flex-col gap-4 p-[1px]">
        <div className="flex p-5  justify-between items-center bg-[#f8f5f5] rounded-t-xl">
          <p className="font-semibold text-brandGreen">Useful Information</p>
          <img src={caution} alt="" />
        </div>

        <p className="px-4 pb-5 text-sm">
          Avoid scams by acting locally or paying with PayPal. Be sure to see
          what you are buying before making payment{" "}
        </p>
      </div>
    </>
  );
}

export default function ProductDetailsPageWithID() 
{ 
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [error, setError] = useState("");
  const { id } = useParams();
  

  const { data: user } = useUser();

  const { data, isLoading, isError, refetch } = useQuery(
    ["product-details-with-id", id],
    () => fetchProductDetails(id)
  );

  if(!loading)
    {
      console.log(data)
    }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    setLoading(true);

    addMessage(data)
      .then(() => {
        setLoading(false);
        refetch();
        // queryClient.invalidateQueries("details");
        reset();
      })
      .catch((res) => {
        setLoading(false);
        setError(`${res}`);
      });
  };

  useEffect(() => {
    // Check if the data is available and the hash is present in the URL
    if (data && window.location.hash === "#comments") {
      // Scroll to the "comments" section
      const commentsSection = document.getElementById("comments");
      if (commentsSection) {
        commentsSection.scrollIntoView({ behavior: "smooth" });
      }
    }
    console.log(data)
  }, [data]);

  return (
    <>
      <Helmet>
        <title>{data ? `${data?.title}` : "Product Details"} | Autohub</title>
        <meta
          name="description"
          content={data ? `${data?.description}` : "The Home For Automobiles"}
        />
      </Helmet>

      {/* <Header /> */}

      <main className="px-3 pt-1">
        <MaxWidthWrapper>
          {/* ==================== */}

          {isLoading && <ProductDetailSkeleton />}

          {data && (
            <>
              <Breadcrumb
                routes={[
                  {
                    name: data.product.detail.category.name,
                    route: `${
                      categories.filter(
                        (item) => item.id === data.product.detail.category.id
                      )[0].link
                    }`,
                  },
                  {
                    name: data?.title,
                    route: generateProductDetailsRouteWithSlugUrl(
                      data.product.detail.category.id,
                      data.product.detail.slug
                    ),
                  },
                ]}
              />

              {/* <p onClick={() => navigate(-1)}>testing</p> */}
              <div className="flex flex-col gap-4 pb-10">
                <div className="flex justify-center w-full">
                  <div className="flex flex-col lg:flex-row w-full items-center lg:items-start lg:justify-center gap-5">
                    {/* Useful Info */}
                    <div className="hidden order-2 lg:order-1 lg:w-[350px] max-w-[600px] w-full rounded-xl bg-white h-[200px] shrink-0 lg:flex flex-col gap-4">
                      <div className="flex p-5  justify-between items-center bg-[#f8f5f5]">
                        <p className="font-semibold text-brandGreen">
                          Useful Information
                        </p>
                        <img src={caution} alt="" />
                      </div>

                      <p className="px-4 py-2 text-sm">
                        Avoid scams by acting locally or paying with PayPal. Be
                        sure to see what you are buying before making payment{" "}
                      </p>
                    </div>

                    {/* Product Details */}
                    <div className="flex flex-col gap-2 order-1 lg:order-2 md:max-w-[800px] w-full">
                      {/* Header */}
                      <div className="w-full rounded-xl bg-white h-[180px] -mb-9 flex flex-col gap-1 p-5 pb-6">
                        <h1 className="text-[#1B5B29] text-base md:text-xl font-semibold">
                          {data?.product.detail.title}
                        </h1>
                        <div className="flex justify-between flex-wrap items-center text-[10px] text-xs sm:text-sm">
                          <p className="text-brandRed ">{data.product.detail.make.title}</p>

                          <div className="flex gap-1">
                            <p className="text-brandRed ">{data.product.detail.user.name}</p>
                            <p className="text-brandDarkGray ">
                              {formatDate(data.product.detail.created_at)}
                            </p>
                          </div>
                        </div>

                        <div className="flex justify-between">
                            <p className="text-brandDarkGray text-sm">
                                Comments: {data?.product.detail.messages?.length}
                            </p>
                            {/* <p className="text-brandDarkGray text-sm mr-20">
                                { (Number(data?.product.detail.live) === 0) && <span className="font-bold text-md text-green-600">Offline</span> }
                                { (Number(data?.product.detail.live) === 1) && <span className="font-bold text-md text-green-600">Online</span> }
                            </p> */}
                        </div>
                        <div className="flex justify-left items-center space-x-4">                              
                           <img className="w-14 h-14 rounded-full border border-10 border-green-500" src={`${AVATAR}${data?.product.detail.user?.avatar}`} />
                           <p className="text-md text-blue-900">{" "} - {data?.product.detail.user?.name}</p>
                        </div>
                      </div>

                      {/* Product Image */}

                      {/* <div className="w-full rounded-xl bg-gray-200 h-[300px] lg:h-[400px] overflow-hidden"> */}
                      {/* <img
                          src={imgUrl}
                          alt=""
                          className="w-full h-full object-cover"
                        /> */}
                      {/* {console.log(data.avatar)} */}
                      {/* {console.log(JSON.parse(data.avatar))} */}
                      {/* <ProductImageCarousel data={`${AVATAR}${data?.product.detail.user?.avatar}`} /> */}
                      <ProductImageCarousel data={data.product.images} waterMark={`${WATER_MARK}${data?.product.detail.watermark}`} />
                      {/* </div> */}

                      {/* Description */}
                      <div className="w-full rounded-xl bg-white p-4 min-h-[100px] h-max flex flex-col gap-2">
                        <p className="text-brandGreen font-semibold text-xl">
                          {data?.price && currencyFormatter(data?.product.detail.price)}
                        </p>
                        <div className="">
                            <span className="text-md text-blue-900 rounded-lg font-bold">Description:</span>
                            <div dangerouslySetInnerHTML={{ __html: data?.product?.detail?.description }} 
                                className="w-full p-2 rounded-md border border-3 border-gray-300 border-shadow mb-3" style={{ wordBreak: 'break-all' }} />
                        </div>
                      </div>

                      {/* Product Details */}
                      <div className="w-full rounded-xl bg-white p-[1px] min-h-[250px] h-max">
                        {/* Header */}
                        <div className="flex py-3 px-4 items-center bg-[#f8f5f5] rounded-t-xl">
                          <p className="font-semibold text-brandGreen">
                            Product Details
                          </p>
                        </div>

                        {/* Body */}
                        <div className="px-6 my-4 flex-col flex gap-2">
                          {/* Manufacturer */}
                          <div className="bg-[#f8f5f5] h-10 w-full flex justify-between px-4 items-center">
                            <p>Manufacturer:</p>
                            <p className="text-brandGreen">
                              {data?.product.detail.make?.title}
                            </p>
                          </div>
                          {/* Model */}
                          <div className="bg-[#f8f5f5] h-10 w-full flex justify-between px-4 items-center">
                            <p>Model:</p>
                            <p className="text-brandGreen">
                              {data?.product.detail.model?.title}
                            </p>
                          </div>
                          {/* Color */}
                          <div className="bg-[#f8f5f5] h-10 w-full flex justify-between px-4 items-center">
                            <p>Colour:</p>
                            <p className="text-brandGreen">
                              {data?.product.detail.color?.name}
                            </p>
                          </div>
                          {/* Transmission */}
                          <div className="bg-[#f8f5f5] h-10 w-full flex justify-between px-4 items-center">
                            <p>Transmission:</p>
                            <p className="text-brandGreen">
                              {data?.product.detail.trans?.name}
                            </p>
                          </div>
                          {/* Year */}
                          <div className="bg-[#f8f5f5] h-10 w-full flex justify-between px-4 items-center">
                            <p>Year:</p>
                            <p className="text-brandGreen">
                              {data?.product.detail.year_of_production}
                            </p>
                          </div>
                          {/* Price */}
                          <div className="bg-[#f8f5f5] h-10 w-full flex justify-between px-4 items-center">
                            <p>Price:</p>
                            <p className="text-brandGreen">
                              {currencyFormatter(data?.product.detail.price)}
                            </p>
                          </div>
                          {/* Door */}
                          <div className="bg-[#f8f5f5] h-10 w-full flex justify-between px-4 items-center">
                            <p>Door:</p>
                            <p className="text-brandGreen">{data?.product.detail.door}</p>
                          </div>
                          {/* Seat */}
                          <div className="bg-[#f8f5f5] h-10 w-full flex justify-between px-4 items-center">
                            <p>Seat:</p>
                            <p className="text-brandGreen">{data?.product.detail.seat}</p>
                          </div>
                        </div>
                      </div>

                      <Info />

                      {/* Seller Information */}
                      <div className="w-full rounded-xl  bg-white min-h-max p-[1px]">
                        {/* Header */}
                        <div className="flex py-3 px-4 items-center bg-[#f8f5f5] rounded-t-xl">
                          <p className="font-semibold text-brandGreen">
                            Seller Information
                          </p>
                        </div>

                        <div className="px-6 my-4 flex flex-col gap-5">
                          {/* details */}
                          <div className="flex gap-4 items-center">
                            {/* display picture */}
                            <div className="h-[90px] aspect-square rounded-full border bg-gray-200 overflow-hidden">
                              <img
                                src={`${AVATAR}${data?.product.detail.user?.avatar}`}
                                alt=""
                                className="w-full h-full object-cover"
                              />
                            </div>

                            {/* info */}
                            <div className="flex flex-col gap-1">
                              <p className="text-brandGreen font-semibold">
                                {" "}
                                {data?.product.detail.user?.name}{" "}
                              </p>
                              <p className="text-brandDarkGray font-semibold">
                                {data?.user?.phoneno}
                              </p>
                            </div>
                          </div>
                          {/* <div>
                            <Link to="#more-from-vendor">
                              <button className="py-3 px-2 border border-brandGreen text-brandGreen text-sm flex justify-center rounded-xl font-semibold w-full hover:bg-brandGreen hover:text-white transition ease-in-out duration-150">
                                See All Products From this Seller
                              </button>
                            </Link>
                          </div> */}
                        </div>
                      </div>

                      {/* Comments */}
                      <div
                        className="w-full rounded-xl bg-[#f8f5f5] min-h-[200px] h-max border mt-2"
                        id="comments"
                      >
                        {/* Header */}
                        <div className="flex py-3 px-4 justify-center items-center bg-white rounded-t-xl">
                          <p className="font-semibold text-brandGreen">
                            Comments ({data?.product.detail.messages?.length})
                          </p>
                        </div>
                        {/* message */}
                        <div className="my-5 px-6 gap-2 flex flex-col">
                          {data?.product.detail.messages?.map((item, idx) => (
                            <div
                              key={idx}
                              className="bg-white w-full p-4 rounded-xl flex flex-col gap-2"
                            >
                              {/* Header */}
                              <div className="flex gap-3 items-center">
                                <div className="h-6 rounded-full w-6 overflow-hidden">
                                  <img
                                    src={`${AVATAR}${data?.product.detail.user?.avatar}`}
                                    alt=""
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <p className="text-sm text-brandGreen font-semibold">
                                  {item?.user?.name}
                                </p>
                              </div>

                              {/* message */}
                              <p>{item?.message}</p>
                            </div>
                          ))}
                        </div>

                        {!user ? (
                          <div className="px-6 my-6 flex justify-center text-center gap-2">
                            <p>
                              You have to{" "}
                              <span className="font-medium text-brandGreen">
                                <Link to="/register">Register</Link>
                              </span>{" "}
                              or{" "}
                              <span className="font-medium text-brandGreen">
                                <Link to="/login">Login</Link>
                              </span>{" "}
                              to leave a comment
                            </p>
                          </div>
                        ) : (
                          <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="px-6 my-4 flex flex-col gap-2"
                          >
                            <div className="flex flex-col w-full">
                              <input
                                type="text"
                                name="message"
                                {...register("message")}
                                className="outline-none px-4 py-3 bg-transparent rounded-xl border  focus:border-brandGreen w-full transition duration-150"
                                placeholder="Leave a comment"
                              />
                              <p className="text-sm text-brandRed">
                                {errors.message?.message || serverError}
                              </p>
                            </div>

                            <input
                              type="hidden"
                              value={data?.product.detail.id}
                              {...register("product_id")}
                              name="product_id"
                            />

                            <div className="flex justify-end">
                              <button className="py-3 px-4 bg-brandGreen text-white font-semibold text-sm rounded-xl w-max">
                                {loading ? (
                                  <BeatLoader size={9} color="#fff" />
                                ) : (
                                  "Submit"
                                )}
                              </button>
                            </div>
                          </form>
                        )}

                        {/* {user && ( */}

                        {/* )} */}
                      </div>
                    </div>
                  </div>
                </div>

                {/* <MoreFromVendor id={data.product.detail.id} />

                {data?.product.detail.model_id && <MoreFromModel id={data?.product.detail.model_id} />} */}
              </div>
            </>
          )}

          {isError && <ReloadError refetch={refetch} />}
          {/* ============================ */}
        </MaxWidthWrapper>
      </main>
    </>
  );
}

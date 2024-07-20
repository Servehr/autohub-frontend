import MaxWidthWrapper from "@/components/max-width-wrapper";
import { useQuery } from "react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import caution from "@/assets/icons/caution.svg";
import { formatDate } from "@/utils/ad";
import { addMessage, fetchProductWithSlug, followUser } from "@/apis/ads";
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
import logoImg from "@/assets/logo.png";
import {
  MoreFromModel,
  MoreFromVendor,
  SponsoredSection,
} from "@/components/product/sections";
import ReloadError from "@/components/error/reload";
import { Icons } from "@/util/icon";

const schema = yup
  .object({
    message: yup
      .string()
      .required("Comment is required")
      .min(5, "Comment must be at least 10 characters"),
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

export default function ProductDetailsPage() {
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const { slug } = useParams();
  const navigate = useNavigate();

  const { data: user } = useUser();

  // prettier-ignore
  const { data, isLoading, error, isError, refetch, isFetching } = useQuery([`product-details/${Math.round()}`, slug], () => fetchProductWithSlug(slug));
  const telePhoneNumber = `Tel: +${2348097924718}`
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  if(!isLoading)
  {
    console.log(data)
  }

  if(!isFetching)
  {
    console.log("loaded") 
    console.log(isFetching)   
    console.log(data?.product?.vendor_followers)
    console.log("loaded")
  } else {
     console.log("Am still loading")
  }

  const onSubmit = (adMsg) => {
    setLoading(true);
    console.log(adMsg)
    addMessage(adMsg)
      .then(() => {
        setLoading(false);
        setServerError("");
        // queryClient.invalidateQueries("product-details");
        refetch();
        reset();
      })
      .catch((res) => {
        setLoading(false);
        setServerError(`${res}`);
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

  const checkSubmit = () => 
  {
     alert("its working")
  }

  const follower = () => 
  {
     followUser({vendor: data?.product?.detail?.user_id})
     .then((res) => {
          console.log(res)
          refetch();
     })
     .catch((res) => {
       setLoading(false);
       setServerError(`${res}`);
     });
  }

  return (
    <>
      <Helmet>
        <title>{data ? `${data?.product.detail.title}` : "Product Details"} | Autohub</title>
        <meta
          name="description"
          content={data ? `${data?.product.detail.description}` : "The Home For Automobiles"}
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
                    name: data?.product.detail.title,
                    route: generateProductDetailsRouteWithSlugUrl(
                      data.product.detail.category_id,
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
                      <div className="w-full rounded-xl bg-white h-[180px] flex flex-col gap-1 p-4">
                        <h1 className="text-[#1B5B29] text-base md:text-xl font-semibold">
                          {data?.product.detail.title}
                        </h1>
                        <div className="flex justify-between flex-wrap items-center text-[10px] text-xs sm:text-sm">
                          <p className="text-brandRed ">{data.product.detail.make.title}</p>

                          <div className="flex gap-1">
                            <p className="text-brandRed ">{telePhoneNumber}</p>
                            <p className="text-brandDarkGray ">
                              {formatDate(data.product.detail.created_at)}
                            </p>
                          </div>
                        </div>

                        <div className="flex justify-between">
                            <p className="text-brandDarkGray text-sm">
                                Comments: {data?.product.detail.messages?.length}
                            </p>
                        </div>

                          <button onClick={() => follower() } className="bg-green-700 w-fit rounded-md p-2 text-white font-bold text-xs mt-2">
                              { (data?.product?.vendor_followers === "Yes") ? 'Unfollow': 'Follow'}
                          </button>

                          <div className="flex justify-between mt-2">
                              <p className="text-brandDarkGray text-sm mr-20">
                                  { (Number(data?.product.detail.user.online) === 0) && <div className="font-bold text-sm">Advertiser is <span className="text-red-600">Offline</span></div> }
                                  { (Number(data?.product.detail.user.online) === 1) && <div className="font-bold text-sm">Advertiser is <span className="text-red-600">Online</span></div> }
                              </p>
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
                      <ProductImageCarousel data={data.product.images} />
                      {/* </div> */}

                      {/* Description */}
                      <div className="w-full rounded-xl bg-white p-4 min-h-[150px] h-max flex flex-col gap-2">
                        <p className="text-brandGreen font-semibold text-xl">
                          {data?.product.price && currencyFormatter(data.product.price)}
                        </p>
                        <p className="">{data?.product.detail.description}</p>
                        <p className="text-brandRed text-sm">
                          {" "}
                          - {data?.product.detail.user?.name}
                        </p>
                        <div className="w-full mt-5 mb-5 flex justify-center items-center space-x-10">
                            <div className="flex"> 
                                <div className="bg-blue-500 p-3">                               
                                    <Icons iconName={'call'} color="white" />
                                </div>
                                <a href={telePhoneNumber} className="bg-brandGreen px-3 py-3 text-xs justify-center font-bold text-white col-span-6">
                                    Call Advertiser <br/>
                                  <span className="text-lg w-full flex justify-center text-center">08082763541</span>
                                </a>
                            </div>
                            <div className="flex">
                              <div className="bg-blue-500 p-3">                                 
                                  <Icons iconName={'call'} />
                              </div>
                              <a href="Tel: +2348097924718" className="bg-brandGreen px-3 py-3 text-xs font-bold text-white col-span-6">
                                  Call Admin for Complaint <br/>
                                  <span className="text-lg w-full flex justify-center text-center">{data?.product.detail.user.phoneno}</span>
                              </a>
                            </div>
                            {/* <div className="flex">
                              <div className="bg-blue-500 p-3">                                 
                                  <Icons iconName={'call'} />
                              </div>
                              <a onClick={() => alert("XYZ") } className="cursor-pointer bg-brandGreen px-3 py-3 text-xs font-bold text-white col-span-6">
                                  Chat Advertiser
                              </a>
                            </div> */}
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
                          <div className="bg-[#f8f5f5] h-10 w-full flex justify-between px-4 items-center">
                            <p>Sellable at:</p>
                            { (data?.product.detail.min_price != 0) && (data?.product.detail.max_price != 0) ? 
                                <>
                                  <p className="text-brandGreen">{currencyFormatter(data?.product.detail.min_price)}</p>
                                  <p className="text-brandGreen">{currencyFormatter(data?.product.detail.max_price)}</p>
                                </>
                                :
                                <>
                                  <p className="text-brandGreen">{currencyFormatter(data?.product.detail.max_price)}</p> 
                                </>
                              
                                // <>
                                //   <p className="text-brandGreen">{currencyFormatter(data?.product.detail.min_price)}</p>
                                //   <p className="text-brandGreen">{currencyFormatter(data?.product.detail.max_price)}</p> 
                                // </>                           
                            }
                            {/* { (data?.product.detail.min_price != 0) && (data?.product.detail.max_price != 0)  && 
                                <p className="text-brandGreen">{currencyFormatter(data?.product.detail.max_price)}</p> 
                            } */}
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
                                src={data?.product.detail.user?.avatar}
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
                                    src={item?.user?.avatar}
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

                <MoreFromVendor id={data.product.detail.id} />

                {data?.product.detail.model_id && <MoreFromModel id={data?.product.detail.model_id} />}

                <SponsoredSection />
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

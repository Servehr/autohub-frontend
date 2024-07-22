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
import swapCar from "@/assets/swap-car.png";
import swapBuySell from "@/assets/swap-buy-sell.png";
import ownACar from "@/assets/own-a-car.png";
import {
  MoreFromModel,
  MoreFromVendor,
  SponsoredSection,
} from "@/components/product/sections";
import ReloadError from "@/components/error/reload";
import { Icons } from "@/util/icon";
import { CategoryContainer } from "../home/components/main";
import { ChatModal } from "@/components/ChatModal";
import { AVATAR, PRODUCT_FACE, WATER_MARK } from "@/lib/axios";
import FollowUser from "@/components/FollowUser";

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

export default function ProductDetailsPage() 
{
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [chatModal, setOpenChatModel] = useState(false)
  const [vendorImage, setVendorImage] = useState('')
  const [vendorName, setVendorName] = useState('')
  const [toAdvertiser, setToAdvertiser] = useState(-1)
  const [toAdvertiserProduct, setToAdvertiserProduct] = useState(-1)
  const { slug } = useParams();
  const navigate = useNavigate();

  const { data: user } = useUser();

  // prettier-ignore
  const { data, isLoading, error, isError, refetch, isFetching } = useQuery([`product-details`, slug], () => fetchProductWithSlug(slug));
  const telePhoneNumber = "tel:+2349133333357"
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
    console.log(data?.product)
    // alert(data?.product?.vendor_follower)
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
      <main className="py-2 px-3 -mb-2">
        <MaxWidthWrapper>
          <div className="">
            {/* <div className="flex flex-col max-w-[1350px] bg-red-700 md:flex-row gap-2 min-h-max md:h-[450px] h-[400px] w-full"> */}
            <div className="grid grid-cols-12 gap-3 mb-10">
              <div className="hidden md:block lg:block col-span-3">
                  <div className="w-full">
                      <img src={swapBuySell} alt=""/>
                  </div>
                  <div className="w-full p-2 bg-white mb-3  h-fit mt-2 flex justify-center items-center">
                     <span className="font-bold text-2xl w-full text-red-900">Mission:</span><br/>
                     <h1 className="font-bold p-3">
                        To revolunize automobile industry throught a turnkey service provision
                     </h1>
                  </div>
                  <div className="w-full">
                      <img src={ownACar} alt="" className="mb-3" />   
                  </div>
              </div>

              
              <div className="md:col-span-6 lg:col-span-6 col-span-12 w-full bg-white h-fit flex flex-col gap-1 p-4">
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
                    {/* <div className="hidden order-2 lg:order-1 lg:w-[350px] max-w-[600px] w-full rounded-xl bg-white h-[200px] shrink-0 lg:flex flex-col gap-4">
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
                    </div> */}

                    {/* Product Details */}
                    <div className="flex flex-col gap-2 order-1 lg:order-2 w-full">
                      {/* Header */}
                      <div className="w-full rounded-xl bg-white h-[195px] flex flex-col gap-1 p-1 md:p-4">
                        <h1 className="text-[#1B5B29] text-base md:text-[30px] text-[25px] font-semibold mb-2">
                          {data?.product.detail.title}
                        </h1>
                        <div className="flex justify-between flex-wrap items-center text-[10px] text-xs sm:text-sm">
                          <p className="text-brandRed mb-1">{data.product.detail.make.title}</p>

                          <div className="d-flex gap-1">
                            <p className="text-brandRed ">{data?.product?.detail?.phoneno}</p>
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

                        
                        <FollowUser vendor={data?.product?.detail?.user_id} image={data?.product.detail.user?.avatar} name={data?.product.detail.user?.name} />

                          <div className="flex justify-between mt-2 mb-4">
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
                      <ProductImageCarousel data={data.product.images} waterMark={`${WATER_MARK}${data?.product.detail.watermark}`} />
                      {/* </div> */}

                      {/* Description */}
                      <div className="w-full rounded-xl bg-white p-4 min-h-[150px] h-max flex flex-col gap-2">
                        <p className="text-brandGreen font-semibold text-xl">
                          {data?.product.price && currencyFormatter(data.product.price)}
                        </p>
                        <div className="">
                            <span className="text-md font-bold text-blue-900 rounded-lg">Description:</span>
                            <div dangerouslySetInnerHTML={{ __html: data?.product?.detail?.description }} 
                                className="w-full p-2 rounded-md border border-3 border-gray-300 border-shadow mb-3" style={{ wordBreak: 'break-all' }} />
                        </div>

                        <div className="grid md:grid-cols-12 grid-cols-12 gap-5 md:-mb-8 py-4">
                            <div className="flex md:col-span-4 col-span-12 -mb-1 md:mb-0 w-full rounded-md">
                                <div className="bg-blue-500 py-2 px-4 d-flex sm:pt-5 md:px-2 md:py-2 flex justify-center item-center"> 
                                    <Icons iconName={'call'} color="white" />
                                </div>
                                <a href={telePhoneNumber} className="bg-brandGreen rounded-br-md rounded-tr-md w-full px-3 py-2 text-xs justify-center font-bold text-white col-span-6">
                                    <span className="text-sm w-full flex justify-center text-center">Advertiser</span>
                                </a>
                            </div>
                            <div className="flex md:col-span-4 col-span-12 bg-green-500 -mb-1 md:mb-0 w-full rounded-md">
                                <div className="bg-blue-500 py-2 px-4 d-flex sm:pt-5 md:px-2 md:py-2 flex justify-center item-center"> 
                                    <Icons iconName={'call'} color="white" />
                                </div>
                                <a href={`tel:${data?.product.detail.user.phoneno}`} className="bg-brandGreen rounded-br-md rounded-tr-md w-full px-3 py-2 text-xs justify-center font-bold text-white col-span-6">
                                    <span className="text-sm w-full flex justify-center text-center">For Complaint</span>
                                    {/* <span className="text-md w-full flex justify-center text-center">{data?.product.detail.user.phoneno}</span> */}
                                </a>
                            </div>                            
                            <div className="flex md:col-span-4 col-span-12 bg-green-500 -mb-1 md:mb-0 w-full rounded-md">
                                <div className="bg-blue-500 py-2 px-4 d-flex sm:pt-5 md:px-2 md:py-2 flex justify-center item-center"> 
                                    <Icons iconName={'call'} color="white" />
                                </div>
                                <a  onClick={() => {
                                      setVendorName(data?.product?.detail?.user?.name)
                                      setVendorImage(data?.product?.detail?.user?.avatar)
                                      setToAdvertiser(data?.product?.detail?.user_id)
                                      setToAdvertiserProduct(data?.product?.detail?.id)
                                      setOpenChatModel(true)
                                    }} className="bg-brandGreen rounded-br-md rounded-tr-md w-full px-3 py-2 text-xs justify-center font-bold text-white col-span-6">
                                    <span className="text-sm w-full flex justify-center text-center cursor-pointer">Chat Advertiser</span>
                                </a>
                            </div>
                        </div>

                        <div className="w-full mb-5 flex justify-center items-center space-x-10">
                            {/* <div className="flex"> 
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
                            <div className="flex">
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
                        {/* Header #f8f5f5 */}
                        <div className="flex py-3 px-4 items-center bg-[#f1dcdc] rounded-t-xl">
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
                        <div className="flex py-3 px-4 items-center bg-[#f1dcdc] rounded-t-xl">
                          <p className="font-semibold text-brandGreen">
                            Seller Information
                          </p>
                        </div>

                        <div className="px-6 my-4 flex flex-col gap-5">
                          {/* details */}
                          <div className="flex gap-4 items-center">
                            {/* display picture */}
                            <div className="h-[90px] aspect-square rounded-full border bg-gray-200 border border-10 border-green-500 overflow-hidden">
                              <img
                                src={`${AVATAR}${data?.product.detail.user?.avatar}`}
                                alt=""
                                className="w-full h-full object-cover"
                              />
                            </div>

                            {/* info */}
                            <div className="flex flex-col gap-1">
                              <p className="text-brandGreen font-semiboldtext-blue-900">
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
                                <div className="h-6 rounded-full w-6 overflow-hidden border border-5 border-green-500">
                                  <img
                                    src={`${AVATAR}${item?.user?.avatar}`}
                                    alt=""
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <p className="text-sm text-blue-900 font-semibold">
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

                {/* <MoreFromVendor id={data.product.detail.id} /> */}

                  {/* { data?.product.detail.model_id && <MoreFromModel id={data?.product.detail.model_id} /> } */}
              </div>
            </>
          )}

            {isError && <ReloadError refetch={refetch} />}
          {/* ============================ */}                
              </div>


              {/* <div className="order-3 w-fit object-cover col-span-2 bg-gray-100 p-1 shrink-0 h-fit justify-center"> */}
              <div className="hidden md:block lg:block col-span-3">
                  {/* <img src={swapCar} alt="" /> */}
                   {/* <RandomProduct data={data} /> */}
                   <div className="d-flex">                    
                      <div className="w-full">                    
                            <CategoryContainer />
                      </div>
                      <div className="w-full">                    
                            <RandomProduct data={data} />
                      </div>
                   </div>
              </div>

            </div>
          </div>

          { chatModal && <ChatModal chatModal={chatModal} 
                                    imageUrl={vendorImage} 
                                    vendorName={vendorName} 
                                    userLiveStatus={data?.product?.detail?.user?.online} 
                                    toAdvertiser={toAdvertiser} 
                                    toAdvertiserProduct={toAdvertiserProduct}
                                    message={''} 
                                    onClick={() => {
                                        setOpenChatModel(false)
                                    }} />
          }

<SponsoredSection />
          
        </MaxWidthWrapper>
      </main>
    </>
  );
}

function RandomProduct({ data })
{
   return (
      <>
          <h1 className="p-1 text-lg font-bold uppercase mb-2 mt-5">Sponsored Ads</h1>
                                        <div className="">                                
                                            {
                                                data?.product.products.map((product) => {
                                                  
                                                  return  (
                                                    <>
                                                        <div className="py-1 mb-5 my-1 rounded-md bg-blue-100">
                                                            <h1 className="p-2 ml-2 font-bold text-green-600">{`${product?.title}`}</h1>
                                                            <div className="w-full p-3 bg-blue-100">
                                                                <img src={`${PRODUCT_FACE}${product?.avatar}`} 
                                                                        className="rounded-lg"
                                                                        onClick={() => {
                                                                            // navigate(`${product.category.link}/${product.slug}`)
                                                                            // alert("Great")
                                                                            goHere(product.category.link, product.slug)
                                                                        }}
                                                                        />
                                                            </div>
                                                            <div className="flex justify-between px-5 py-3 bg-blue-100 -mt-2">
                                                                <h1 className="text-blue-900 font-bold">{currencyFormatter(product?.price)}</h1>
                                                                <h1 className="text-blue-900 font-bold">{product?.state?.name}</h1>
                                                            </div>
                                                            {/* <div className="w-full pt-4 mb-2 -mt-4 mx-3">
                                                                <div className="px-2 py-1 bg-red-0 text-red-900 font-bold hover:text-white w-fit rounded-lg text-xs cursor-pointer hover:bg-green-900">View Product</div>
                                                            </div> */}
                                                            <a className="w-full pt-1 m-2 bg-white px-2 py-1 bg-red-0 text-red-900 font-bold hover:text-white w-fit rounded-lg text-xs cursor-pointer hover:bg-green-900">
                                                                {/* <div className="px-2 py-1 bg-blue-900 text-white font-bold w-fit rounded-lg text-xs cursor-pointer hover:bg-green-900">See More</div> */}
                                                                <Link to={`${product.category.link}/${product.slug}`} >View Product</Link>
                                                            </a>
                                                            <div className="pb-2"></div>
                                                        </div>
                                                    </>
                                            )})
                                            }
                                            </div>
      </>
   )
}

function goHere(x, y){
   navigate(`http://localhost:5173/${Destin}${x}/${y}`)
}

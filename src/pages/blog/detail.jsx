import MaxWidthWrapper from "@/components/max-width-wrapper";
import { useQuery } from "react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import caution from "@/assets/icons/caution.svg";
import { formatDate } from "@/utils/ad";
import { blogDetail, addCommentOnBlog } from "@/apis/ads";
import currencyFormatter from "@/utils/currency-formatter";
import useUser from "@/hooks/useUser";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { queryClient } from "@/main";
import { BeatLoader, BounceLoader } from "react-spinners";
import { browserType } from "@/store";
import { Helmet } from "react-helmet-async";
import Breadcrumb from "@/components/breadcrumb";
import categories from "@/constant/categories";
import ProductImageCarousel from "@/components/product-image-carousel";
import { ProductDetailSkeleton } from "@/components/product/skeletons";
import { generateProductDetailsRouteWithSlugUrl } from "@/constant/links";
import { MoreFromModel, MoreFromVendor } from "@/components/product/sections";
import Accordion from "@/components/Accordion";
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import Pagination from "@/components/Pagination";
import { AVATAR, BLOG_POST, PRODUCT_FACE } from "@/lib/axios";


const schema = yup
  .object({
    message: yup
      .string()
      .required("Comment is required")
      .min(3, "Comment must be at least 3 characters"),
    post_id: yup.number().positive().integer().required(),
  })
  .required();

export default function BlogDetail() 
{
    const navigate = useNavigate()
    const { post_id } = useParams();
    const { data: user } = useUser();
    const [serverError, setServerError] = useState("");
    console.log(post_id)
    
    const { isMobile } = browserType();
    const [currentPage, setCurrentPage] = useState(post_id)  
    const [perPage, setPerPage] = useState(10)  
    const [comment, setCommentMessage] = useState("")
    const [refresh, setRefresh] = useState(-1)

    const { data, isLoading, refetch, isRefetching } = useQuery([`get-post-detail/${Math.round()}`, currentPage], () => blogDetail(currentPage), { refetchOnWindowFocus: true, staleTime: Infinity, retry: 2 })
    if(!isLoading)
    {
        console.log(data?.post)
        // setCurrentPage(data?.data?.currentPage)
    }
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(schema),
      });

    useEffect(() => {
        // console.log(currentPage)
        // setCurrentPage(refresh)
        // console.log("+++++++++++++++++++++++")
        // refetch()
    }, [])
    

  const onSubmit = (adMsg) => {
    // setLoading(true);
    console.log(adMsg)
    let payLoad = { id: post_id, comment: comment }
    addCommentOnBlog(payLoad)
      .then(() => {
        // setLoading(false);
        // setServerError("");
        // queryClient.invalidateQueries("product-details");
        refetch();
        reset();
      })
      .catch((res) => {
        // setLoading(false);
        setServerError(`${res}`);
      });
  };


    const products = [
        {
           title: "Title 1",
           body: "Body 1",
        },
        {
          title: "Title 2",
          body: "Body 2",
       }
    ]

    return (
        <>
            <Helmet>
              <title> Blog | Autohub</title>
               <meta
                  name="description"
                  content={"The Home For Automobiles"}
                />
              </Helmet>

              {/* <Header /> */}

              <main className="px-3 pt-5 border border-2">
                <MaxWidthWrapper>
                    <div className="grid grid-cols-12 gap-8">
                        <div className="col-span-12 md:col-span-8 h-full mb-20">
                        
                        {isLoading && (
                            <div className="min-h-[320px] flex justify-center items-center text-brandGreen">
                            {isMobile ? (
                                <BeatLoader color="#1c9236" />
                            ) : (
                                <BounceLoader color="#1c9236" />
                            )}
                            </div>
                        )}
                            
                            {
                                !isLoading && data?.post &&
                                    <>
                                        <div className="w-full">
                                            {/* <div className="w-full pt-3" style={{ backgroundColor: '#95afc6' }}> */}
                                            <div className="w-full pt-3 bg-blue-500">
                                                <h1 class="mb-2 text-gray-600 px-3 text-white mb-3" style={{ fontSize: '28px' }}>{data?.post?.title}</h1>
                                            </div>
                                            <div className="flex justify-between bg-gray-300 px-3 py-1 -mt-2 my-2">
                                                <h2>{data?.post?.user.name} - {data?.post?.id}</h2>
                                                <h2>{data?.post?.created_at}</h2>
                                            </div>
                                            <div className="mx-auto bg-white p-3 bg-gray-200 border border-2 border-gray-300">
                                                <img src={`${BLOG_POST}${data?.post?.photos}`} className="w-9/12 mx-auto rounded-md" />
                                            </div>
                                        </div>                                            
                                        <div class="bg-white p-6 rounded shadow-xl mb-5">
                                            {/* <h1 class="mb-2 font-bold text-gray-600 px-3 text-white" style={{ fontSize: '50px' }}>{data?.post.title}</h1> */}
                                            {/* <p class="text-gray-500">{post.content}</p> */}
                                            <div dangerouslySetInnerHTML={{ __html: data?.post?.keypoint }} className="w-400" style={{ wordBreak: 'break-all' }} />
                                        </div>
                                    </>
                            }   
                            
                            <div className="w-full p-3">
                            <div className="w-full">
                                {/* Comments */}
                                <div
                                    className="w-full rounded-xl bg-[#f8f5f5] min-h-[200px] h-max border mt-2"
                                    id="comments"
                                >
                                    {/* Header */}
                                    <div className="flex py-3 px-4 justify-center items-center bg-white rounded-t-xl">
                                    <p className="font-semibold text-brandGreen">
                                        
                                        Comments <span className="font-bold text:md">({data?.post?.comments_count})</span>
                                    </p>
                                    </div>
                                    {/* message */}
                                    <div className="my-5 px-6 gap-2 flex flex-col">
                                    {data?.post?.comments.map((item, idx) => (
                                        <div
                                        key={idx}
                                        className="bg-white w-full p-4 rounded-xl flex flex-col gap-2"
                                        >
                                        {/* Header */}
                                        <div className="flex gap-3 items-center">
                                            <div className="h-6 rounded-full w-6 overflow-hidden">
                                            <img
                                                src={(item?.user?.avatar === null) ? `${AVATAR}${item?.user?.avatar}` : `${AVATAR}${item?.user?.avatar}`}
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
                                            onChange={(e) => setCommentMessage(e.target.value)}
                                        />
                                        <p className="text-sm text-brandRed">
                                            {errors.message?.message || serverError}
                                        </p>
                                        </div>

                                        <input
                                        type="hidden"
                                        value={post_id}
                                        {...register("post_id")}
                                        name="post_id"
                                        />

                                        <div className="flex justify-end">
                                        <button className="py-3 px-4 bg-brandGreen text-white font-semibold text-sm rounded-xl w-max">
                                            {isLoading ? (
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

                                    
                                    

                        <div className="col-span-12 md:col-span-4 h-fit rounded-lg border border-0 border-gray-300 bg-white p-4 mb-20">
                            { !isLoading && (data?.product.length > 0) && (data?.faq.length > 0) && (data?.comments.length > 0) &&
                                <>
                                    <div className="w-full bg-white p-3 rounded-md py-3 border border-b-2 pb-5 border-red">
                                        <h1 className="p-1 text-lg font-bold uppercase mb-3">What Customer Frequently Ask Us</h1>
                                        <div className="">                                
                                            {
                                                data.faq.map((product) => {
                                                    return  (
                                                        <Accordion {...product} />
                                                )})
                                            }
                                        </div>
                                        <div className="w-full pt-4">
                                            <div className="p-2 bg-blue-0 font-bold w-fit rounded-lg text-xs text-blue cursor-pointer hover:bg-red-900 hover:text-white">See More</div>
                                        </div>
                                    </div>

                                    <div className="w-full my-5 bg-white p-3 rounded-md py-3 border border-3 border-gray-400 bg-green-200">
                                        <h1 className="p-1 text-lg font-bold uppercase mb-2">Sponsored Ads</h1>
                                        <div className="">                                
                                            {
                                                data?.product.map((product) => {
                                                    // let isImageAvailable = product.avatar ==
                                                    return  (
                                                        <>
                                                            <div className="py-1 mb-5 my-1 rounded-md bg-blue-100">
                                                                <h1 className="p-2 ml-2 font-bold text-green-600">{`${product?.title}`}</h1>
                                                                <div className="w-full p-3 bg-blue-100">
                                                                    <img src={`${PRODUCT_FACE}${product?.avatar}`} 
                                                                            className="rounded-lg cursor-pointer"
                                                                            onClick={() => {
                                                                                navigate(`${product.category.link}/${product.slug}`)
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
                                    </div>
                                    {/* src={`${AVATAR}${data?.product.detail.user?.avatar}`} */}
                                    <div className="w-full bg-white my-5 p-2 rounded-md py-3">
                                        <h1 className="p-1 text-lg font-bold uppercase mb-3">Check Out What People Are Saying</h1>
                                        <div className="">                                
                                            {
                                                data && (data?.comments.length > 0) && data?.comments.map((comment) => {
                                                    return  (
                                                        <div className="py-1 my-3 rounded-md bg-gray-100 p-3">
                                                            <div className="flex w-full p-3 mb-2 bg-blue-100 mt-2 rounded-md">
                                                                <img src={`${PRODUCT_FACE}${comment?.product?.avatar}`} className="rounded-lg w-2/12 p-1 bg-blue-300" />
                                                                <div className="d-flex justify-between px-5 py-3 text-white -mt-2">
                                                                    <h1 className="text-blue-900 font-bold text-sm">{comment?.product?.title}</h1>
                                                                    <h1 className="text-blue-900 font-bold text-sm"> {currencyFormatter(comment?.product?.price)}</h1>
                                                                </div>
                                                            </div>
                                                            <div className="flex justify-between px-5 py-3 bg-green-900 -mt-2 mb-2">
                                                                <h1 className="text-white">{comment?.message}</h1>
                                                            </div>
                                                            {/* <div className="w-full pt-4 mb-2 -mt-3">
                                                                <div className="px-2 py-1 bg-red-0 text-red-900 font-bold hover:text-white w-fit rounded-lg text-xs cursor-pointer hover:bg-green-900">See product talked about</div>
                                                            </div> */}
                                                            <a className="w-full pt-1 mt-4 bg-blue-500 px-2 py-1 bg-red-0 text-white font-bold hover:text-white w-fit rounded-lg text-xs cursor-pointer hover:bg-green-900">
                                                                {/* <div className="px-2 py-1 bg-blue-900 text-white font-bold w-fit rounded-lg text-xs cursor-pointer hover:bg-green-900">See More</div> */}
                                                                <Link to={`${comment?.product?.category?.link}/${comment?.product?.slug}`} >See product talked about</Link>
                                                            </a>
                                                            <div className="pb-2"></div>
                                                        </div>
                                                )})
                                            }
                                        </div>
                                        {/* <div className="w-full pt-4 bg-white">
                                            <div className="px-3 py-2 bg-red-900 text-white font-bold w-fit rounded-lg text-xs cursor-pointer hover:bg-green-900">View All Product</div>
                                        </div> */}
                                    </div>
                                </>
                            }
                        </div>
                        
                        
                    </div>


                </MaxWidthWrapper>
              </main>
        </>
    );
}

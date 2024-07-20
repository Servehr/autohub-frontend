import MaxWidthWrapper from "@/components/max-width-wrapper";
import { useQuery } from "react-query";
import { Link, useParams, useNavigate } from "react-router-dom";
import caution from "@/assets/icons/caution.svg";
import { formatDate } from "@/utils/ad";
import { addMessage, fetchProductDetails, viewPosts, faqAndProduct } from "@/apis/ads";
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
import { BASE_URL_FRONT, BLOG_POST, PRODUCT_FACE } from "@/lib/axios";


export default function Blogs() 
{
    const navigate = useNavigate();
    const { isMobile } = browserType();
    const [currentPage, setCurrentPage] = useState(1)  
    const [perPage, setPerPage] = useState(10)  
    const [searchQuery, setSearchQuery] = useState("")
    const [refresh, setRefresh] = useState(-1)

    const { data, isLoading, refetch, isRefetching } = useQuery(["get-all-post"], () => viewPosts(currentPage, perPage, searchQuery), { refetchOnWindowFocus: true, staleTime: Infinity, retry: 2 })
    const { data: faqProduct, isLoading: faqAndProductLoading } = useQuery("faq-and-product", faqAndProduct, { refetchOnWindowFocus: true, staleTime: Infinity, retry: 2 })
    if(!isLoading)
    {
        console.log(data?.data?.currentPage)
        // setCurrentPage(data?.data?.currentPage)
    }
    if(!faqAndProductLoading)
    {
        console.log(faqProduct)
    }
    if(!isRefetching)
    {
        console.log(data?.data)
        // setCurrentPage(data?.data?.currentPage)
    }

    useEffect(() => {
        // console.log(currentPage)
        // setCurrentPage(refresh)
        // console.log("+++++++++++++++++++++++")
        // refetch()
    }, [])

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
                        
                        {isLoading && !isRefetching && (
                            <div className="min-h-[320px] flex justify-center items-center text-brandGreen">
                            {isMobile ? (
                                <BeatLoader color="#1c9236" />
                            ) : (
                                <BounceLoader color="#1c9236" />
                            )}
                            </div>
                        )}

                        {!isLoading && isRefetching && (
                            <div className="min-h-[320px] flex justify-center items-center text-brandGreen">
                            {isMobile ? (
                                <BeatLoader color="#1c9236" />
                            ) : (
                                <BounceLoader color="#1c9236" />
                            )}
                            </div>
                        )}
                            
                            {
                                !isLoading && !isRefetching && (data?.data?.posts.length > 0) && data?.data?.posts.map((post, index) => {
                                     return (
                                        <>
                                            <div className="flex w-full">
                                                <div className="w-2/12 p-1 bg-gray-200 border border-2 border-green-600">
                                                    <img src={`${BLOG_POST}${post?.photos}`} width={200} />
                                                </div>
                                                <div className="w-10/12 pt-3" style={{ backgroundColor: '#95afc6' }}>
                                                    <h1 class="mb-2 text-gray-600 px-3 text-white" style={{ fontSize: '28px' }}>{post?.title}</h1>
                                                    <div className="flex justify-between px-3 -mt-2 text-white mb-1">
                                                        <h2>{post?.user} - {post?.id}</h2>
                                                        <h2>{post?.created_at}</h2>
                                                    </div>
                                                </div>
                                            </div>                                            
                                            <div class="bg-white p-6 rounded shadow-xl mb-5">
                                                {/* <h1 class="mb-2 font-bold text-gray-600 px-3 text-white" style={{ fontSize: '50px' }}>{post.title}</h1> */}
                                                {/* <p class="text-gray-500">{post.content}</p> */}
                                                <div dangerouslySetInnerHTML={{ __html: post.keypoint }} className="w-400" style={{ wordBreak: 'break-all' }} />
                                                <div className="w-full pt-4">
                                                    <a onClick={() => {
                                                        navigate(`/blog-detail/${post.id}`)
                                                    }} className="px-3 py-2 bg-red-900 text-white w-fit rounded-lg text-xs cursor-pointer hover:bg-green-900">
                                                        {/* <Link to={`${BASE_URL_FRONT}${post.id}`}>Read More</Link> */}  Read More                                                      
                                                    </a>
                                                </div>
                                            </div>
                                        </>
                                     )
                                })
                            }
                            
                            
                            <div className="mt-20">
                                { 
                                    !isLoading && !isRefetching && (data?.data.posts.length > 0) && 
                                                                                        <Pagination onClick={(data) => {
                                                                                                        setCurrentPage(data)
                                                                                                        console.log(data)
                                                                                                        console.log(currentPage)
                                                                                                        // setRefresh(data)
                                                                                                        // setPerPage(data.perPage)
                                                                                                        setTimeout(() => {
                                                                                                            refetch()   
                                                                                                        }, 1000)
                                                                                                        // setRefresh(Math.random())
                                                                                                        // do all the setting here and then refresh for new set of data rows
                                                                                                    } } 
                                                                                                    perPageNo={perPage} 
                                                                                                    currentPageNo={currentPage} 
                                                                                                    noOfPages={data?.data?.noOfPages} 
                                                                                                    hasNextPage={data?.data?.hasNextPage} 
                                                                                                    hasPreviousPage={data?.data?.hasPreviousPage} 
                                                                                                    from={'blog'}
                                                                                        />    
                                }
                            </div>

                        </div>
                        <div className="col-span-12 md:col-span-4 h-fit rounded-lg border border-0 border-gray-300 bg-white p-4 mb-20">
                            { !isLoading && !faqAndProductLoading && (faqProduct?.product.length > 0) && (faqProduct?.faq.length > 0) && (faqProduct?.comments.length > 0) &&
                                <>
                                    <div className="w-full bg-white p-3 rounded-md py-3 border border-b-2 pb-5 border-red">
                                        <h1 className="p-1 text-lg font-bold uppercase mb-3">What Customer Frequently Ask Us</h1>
                                        <div className="">                                
                                            {
                                                faqProduct.faq.map((product) => {
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
                                                faqProduct.product.map((product) => {
                                                    
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

                                    <div className="w-full bg-white my-5 p-2 rounded-md py-3">
                                        <h1 className="p-1 text-lg font-bold uppercase mb-3">Check Out What People Are Saying</h1>
                                        <div className="">                                
                                            {
                                                faqProduct && (faqProduct?.comments.length > 0) && faqProduct?.comments.map((comment) => {
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

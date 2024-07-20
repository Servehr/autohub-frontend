import MaxWidthWrapper from "@/components/max-width-wrapper";
import { useQuery } from "react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import caution from "@/assets/icons/caution.svg";
import { formatDate } from "@/utils/ad";
import { addMessage, fetchProductDetails } from "@/apis/ads";
import currencyFormatter from "@/utils/currency-formatter";
import useUser from "@/hooks/useUser";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useContext, useEffect, useRef, useState } from "react";
import { queryClient } from "@/main";
import { BeatLoader } from "react-spinners";
import { Helmet } from "react-helmet-async";
import Breadcrumb from "@/components/breadcrumb";
import categories from "@/constant/categories";
import ProductImageCarousel from "@/components/product-image-carousel";
import { ProductDetailSkeleton } from "@/components/product/skeletons";
import { generateProductDetailsRouteWithSlugUrl } from "@/constant/links";
import { MoreFromModel, MoreFromVendor } from "@/components/product/sections";
import Accordion from "@/components/Accordion";
import { fetchAllFaqs } from "@/apis/misc";
import swapBuySell from "@/assets/swap-buy-sell.png";
import swapCar from "@/assets/swap-car.png";
import ownACar from "@/assets/own-a-car.png"; 
import { updateAvatar } from "@/apis/user";
import ImageUploading from "react-images-uploading";


export default function AboutUs() 
{

    return (
        <>
            <Helmet>
              <title> | Autohub</title>
               <meta
                  name="description"
                  content={"The Home For Automobiles"}
                />
              </Helmet>

              {/* <Header /> */}

              <main className="px-3 pt-5 border border-2 bg-green-50">
                <MaxWidthWrapper>
                        <div className="w-full p-4">
                            <p className="text-green-800 text-lg font-bold uppercase">About AutoHub</p>
                        </div>
                        <div className="grid grid-cols-12 gap-4 -mb-20">
                                
                                <div className="md:col-span-9 col-span-12 h-full bg-white p-5 rounded-md text-gray-600 font-semibold">
                                    <p className="mb-5">Autohub is a company that is determined to revolutionise the automobile industry through a turnkey automobile service and the building of an automobile inter-business community.</p>
                                    <p className="mb-5">We have discovered the wealth, opportunity and futuristic nature of the automobile industry and we are awake to provide solutions for the maximum utilization of automotive products.</p>
                                    <p className="mb-5">We are here to work with you, so we can achieve great things together.</p>
                                </div>

                                <div className="col-span-12 md:col-span-3 h-fullbg-white ">                            
                                    <div class="bg-white p-1 rounded shadow-xl item-center">                                
                                        <div className="w-full h-[500px]">
                                            {/* <img src={swapBuySell} alt=""/> */}
                                        </div>                             
                                        <div className="w-full p-3"></div>              
                                        {/* <div className="w-full">
                                            <img src={swapBuySell} alt="" />
                                        </div> */}
                                    </div>
                                </div>
                        </div>
                </MaxWidthWrapper>
              </main>
        </>
    );

}

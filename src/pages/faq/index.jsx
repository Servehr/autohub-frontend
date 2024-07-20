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
import Accordion from "@/components/Accordion";
import { fetchAllFaqs } from "@/apis/misc";


export default function FAQ() 
{
    const { data, isLoading } = useQuery("all-faqs", fetchAllFaqs, { refetchOnWindowFocus: false, staleTime: Infinity, retry: 2 });

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

              <main className="px-3 pt-5 border border-2">
                <MaxWidthWrapper>
                        <div className="grid grid-cols-12 gap-4 mb-10">
                                <div className="col-span-12 md:col-span-8 h-full bg-white ">
                                        <div class="bg-white p-6 rounded shadow-xl">
                                            <div className="flex items-center">
                                                <h1 className="font-bold uppercase mb-5 mr-10" style={{fontSize: "40px"}}>FAQ</h1>
                                                <h1 className="font-bold text-xl uppercase mb-5 float-right">How can we help you</h1>
                                            </div> 
                        { !isLoading && data.length > 0 && data &&
                                        
                                            <>                                            
                                            { 
                                                data.map((faq) => {
                                                    return  (
                                                        <Accordion {...faq} />
                                                )})
                                            }
                                            </>
                        }
                                        </div>

                                    </div>
                        <div className="col-span-12 md:col-span-4 h-fullbg-white ">
                            
                            <div class="bg-white p-6 rounded shadow-xl item-center">
                                <h1 className="font-bold item-center">Get your cars at affordable price</h1>
                            </div>

                        </div>
                    </div>
                </MaxWidthWrapper>
              </main>
        </>
    );
}

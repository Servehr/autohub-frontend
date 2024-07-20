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
import { fetchAllFaqs } from "@/apis/misc";
import swapBuySell from "@/assets/swap-buy-sell.png";
import swapCar from "@/assets/swap-car.png";
import ownACar from "@/assets/own-a-car.png"; 
import { updateAvatar } from "@/apis/user";
import ImageUploading from "react-images-uploading";


export default function ContactUs() 
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
                            <p className="text-green-800 text-lg font-bold uppercase">Get In Touch With Us</p>
                        </div>
                        <div className="grid grid-cols-12 gap-4 -mb-20">
                                
                                <div className="col-span-12 md:col-span-6 h-full bg-white p-5 pt-10 rounded-md text-gray-600 font-semibold text-lg">
                                    <p className="mb-1 font-bold">Head Office:</p>
                                    <p className="mb-1">Plot 2015, Festac Link Road, Amuwo-Odofin Road, Lagos</p>
                                    <p className="mb-1">Tel: +2349133333357</p>
                                    <p className="mb-1">Website: www.autohub.ng</p>
                                </div>

                                <div className="col-span-12 md:col-span-6 h-full bg-white py-7 px-3">                            
                                    
                                    <h1 className="font-bold text-lg px-7 text-blue-800">Leave A Message</h1>
                                    <div className="flex flex-wrap -m-2 mt-2 mb-2 md:mx-5 mx-2">
                                        <div className="p-2 w-1/2">
                                            <span className="w-full font-bold text-sm">Firstname</span>
                                            <input onBlur={(e) => {
                                                       
                                                }} type="text" id="firstname" defaultValue={''}  name="firstname" placeholder="Enter Your Firstname" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 text-sm py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" 
                                            />
                                        </div>
                                        <div className="p-2 w-1/2">
                                            <span className="w-full font-bold text-sm">Surname</span>
                                            <input onKeyUp={(e) => {   
                                                        
                                                }} type="text" id="surname" defaultValue={''} name="surname" placeholder="Enter Your Surname" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 text-sm leading-8 transition-colors duration-200 ease-in-out" 
                                            />
                                            <div className="text-red-500 font-bold text-sm"></div>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap -m-2 mt-2 mb-2 md:mx-5 mx-2">
                                        <div className="p-2 w-1/2">
                                            <span className="w-full font-bold text-sm">Phone Number</span>
                                            <input onBlur={(e) => {
                                                       
                                                }} type="text" id="phoneNumber" defaultValue={''}  name="phoneNumber" placeholder="Enter Your Phone Number" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 text-sm py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" 
                                            />
                                        </div>
                                        <div className="p-2 w-1/2">
                                            <span className="w-full font-bold text-sm">Email</span>
                                            <input onKeyUp={(e) => {   
                                                        
                                                }} type="email" id="email" defaultValue={''} name="email" placeholder="Enter Your Email" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 text-sm leading-8 transition-colors duration-200 ease-in-out" 
                                            />
                                            <div className="text-red-500 font-bold text-sm"></div>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap -m-2 mt-2 mb-2 md:mx-5 px-3">
                                        <span className="w-full font-bold text-sm">Message</span>
                                        <textarea onChange={(e) => { 
                                                               
                                            } } defaultValue={''} 
                                            className="shadow form-textarea mb-2 block w-full border rounded w-full 
                                                       py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                            rows="2" 
                                            placeholder="Enter Description"
                                        >
                                        </textarea>
                                    </div>
                                    <div className="flex flex-wrap -m-2 mb-1 md:mx-5 mx-2 mt-3">
                                        <div className="w-1/2 p-2 flex justify-item item-center">
                                            <div type="checkbox" onClick={() => navigate('/maceos-upload-receipt') }
                                                 className="peer relative appearance-none w-fit text-white p-3 cursor-pointer bg-green-800 hover:bg-green-600 hover:font-bold rounded-md">Submit</div>
                                        </div>
                                    </div>
                                    <div className="p-16"></div>
                                </div>
                        </div>
                </MaxWidthWrapper>
              </main>
        </>
    );

}

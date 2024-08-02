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
import { MakePayment } from "./MakePayment";


export default function PaymentPage({ onClick }) 
{
    const [openCourseModal, setOpenCourseModal] = useState(false)

    return (
        <>
            <p className="font-bold text-lg col-span-12 p-3 bg-green-300 w-full rounded-full px-5"
            >
                Payment Option
            </p>

            <div className="col-span-12 md:flex d-flex bg-white">
                <div className="md:w-1/2 w-full p-5 d-flex justify-center items-center border-2 py-10 md:py-5 md:mb-0 mb-5 pb-10 shadow-md">                                            
                    <h3 className="font-bold text-md text-green-700 mb-3 mt-0 -md:mt-20 text-center p-5">TRANSFER</h3>
                    <div className="d-flex font-bold mb-2 justify-center items-center text-center">
                        <h6 className="font-bold text-sm text-red-600 text-center">Bank Name </h6><h4 className="text-xl text-center">UBA</h4>
                    </div>
                    <div className="d-flex font-bold mb-2 text-center">
                        <h6 className="font-bold text-sm text-red-600">Account Number </h6><span className="text-xl">09887674672</span>
                    </div>
                    <div className="d-flex font-bold mb-2 text-center">
                        <h6 className="font-bold text-sm text-red-600">Account Name </h6><span className="text-xl">AUTOHUB AUTOMOBILE</span>
                    </div>
                    <div className="d-flex font-bold mb-2 text-center p-3 mb-5 mt-10"
                    >
                        <a className="py-2 px-5 rounded-full text-white text-sm font-bold mb-2 text-center bg-green-700 cursor-pointer hover:bg-green-900"
                            onClick={() => {
                                setOpenCourseModal(true)
                            }}
                        >
                            Authenticate if you made payment manually
                        </a>
                    </div>
                </div>
                                    
                <div className="md:w-1/2 w-full p-5 flex justify-center items-center border-2 py-10 md:py-0 md:mb-0 mb-40 shadow-md">
                    <div className="">                                            
                        <h3 className="font-bold text-md text-center text-green-700 mb-10 md:-mt-20">Online-Payment</h3>
                        <div 
                            className="p-3 bg-green-600 border border-4 border-green-300 hover:border-green-500 hover:text-white rounded-xl cursor-pointer"
                        >
                            Make Payment
                        </div>
                    </div>
                </div>
            </div>

            <MakePayment openCourseModal={openCourseModal} onClick={(e) => {
                    onClick(e)
                    setOpenCourseModal(false)  
            }} />
        </>
    );
}

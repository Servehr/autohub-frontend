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


export default function UploadReciept() 
{
    // const navigate = useNavigate();
    const [formattedImage, setFromattedImage] = useState("");
    const [image, setImage] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const maxFileSize = 3000000;

    const onChange = (imageList) => {
        setImage(imageList);
        console.log(imageList)
        let data = "";
        let x = ''
        imageList.map((image) => {
          // let data = image.data_url;
          let base64 = image.data_url.split(",")[1];
          x = base64
          data += `${data && "<=>"}${base64}`;
        });
        console.log(data)
        console.log(typeof x)
        console.log(typeof data)
        setFromattedImage(x);
    }

  const handleFormSubmit = (e) => 
  {
        e.preventDefault();

        if (formattedImage) {
        setError("");
        setLoading(true);
        let requestData = { avatar: formattedImage };

        updateAvatar(requestData)
            .then(() => navigate("/", { replace: true }))
            .catch((err) => {
            setLoading(false);
            setError(`${err}`);
            });
        }
    }

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
                        <div className="w-full p-4 bg-blue-100">
                            <p className="text-blue-600 font-bold">Payment Options</p>
                        </div>
                        <div className="grid grid-cols-12 gap-4 -mb-20">
                                
                                <div className="md:flex d-flex md:col-span-9 col-span-12 h-full bg-white">
                                    <div className="md:w-1/2 w-full p-5 flex justify-center items-center border-2 py-10 md:py-0 md:mb-0 mb-10 shadow-md mb-4">
                                        <div className="text-center">                                            
                                            <h3 className="font-bold text-md text-green-700 mb-10 mt-0 -md:mt-20">TRANSFER</h3>
                                            <div className="d-flex font-bold mb-2 justify-center items-center">
                                                <h6 className="font-bold text-sm text-red-600 text-center">Bank Name </h6><h4 className="text-xl text-center">UBA</h4>
                                            </div>
                                            <div className="d-flex font-bold mb-2">
                                                <h6 className="font-bold text-sm text-red-600">Account Number </h6><span className="text-xl">09887674672</span>
                                            </div>
                                            <div className="d-flex font-bold mb-2">
                                                <h6 className="font-bold text-sm text-red-600">Account Name </h6><span className="text-xl">AUTOHUB AUTOMOBILE</span>
                                            </div>
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

                                <div className="col-span-12 md:col-span-3 h-fullbg-white ">                            
                                    <div class="bg-white p-1 rounded shadow-xl item-center">                                
                                        <div className="w-full">
                                            <img src={ownACar} alt=""/>
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

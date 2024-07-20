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
                        <div className="grid grid-cols-12 gap-4 mb-10">
                                <div className="col-span-12 md:col-span-9 h-full bg-white ">
                                        <div class="bg-white p-6 rounded shadow-xl">
                                            <div className="w-full md:flex items-center justify-center">
                                                <div className="md:w-8/12 w-12/12">
                                                    <span className="font-bold uppercase mb-5 mr-5 w-full text-blue-900" style={{fontSize: "30px"}}>MODERN AUTOMOBILE CEOS</span>
                                                </div>
                                                <div className="md:w-4/12 w-12/12">
                                                    <span className="w-full font-bold text-green-700" style={{fontSize: "18px"}}>Application Form - Upload Receipt</span>
                                                </div>
                                                {/* <span className="font-bold uppercase mb-5 mr-10 w-full text-blue-900" style={{fontSize: "30px"}}>MODERN AUTOMOBILE CEOS</span>
                                                <span className="w-full font-bold text-green-700" style={{fontSize: "18px"}}>Application Form - Upload Receipt</span> */}
                                            </div> 
                                        </div>

                                        <div className="w-full mt-5">
                                            <div className="h-full w-full bg-white rounded-[10px] relative flex flex-col justify-between overflow-hidden pt-6">
                                                {/* error */}
                                                <div
                                                    className={`transition duration-300 w-full ${
                                                    !error && "hidden"
                                                    }`}
                                                >
                                                    <div
                                                    className={`bg-red-500/10 border-red-500/80 border w-full flex justify-center p-2`}
                                                    >
                                                    <p className=" w-max text-center text-xs text-[#D10000]">
                                                        {error}
                                                    </p>
                                                    </div>
                                                </div>

                                                <form onSubmit={handleFormSubmit}>
                                                    <div className="p-4flex flex-col  gap-5 overflow-y-auto">

                                                        <div className="w-full flex justify-center items-center gap-3 flex-col">

                                                            {/* <div className="rounded-full h-[150px] w-[150px] border flex justify-center items-center"> */}
                                                            <ImageUploading
                                                            // multiple
                                                            value={image}
                                                            onChange={onChange}
                                                            maxFileSize={maxFileSize}
                                                            dataURLKey="data_url"
                                                            acceptType={["jpg", "png"]}
                                                            >
                                                            {({
                                                                imageList,
                                                                onImageUpload,
                                                                isDragging,
                                                                dragProps,
                                                                errors,
                                                            }) => (
                                                                // write your building UI
                                                                <div className="w-full flex flex-col items-center justify-center">
                                                                {errors && (
                                                                    <div className="text-brandRed text-sm">
                                                                    {errors.maxNumber && (
                                                                        <span>
                                                                        Images must not be more than {maxNumber}
                                                                        </span>
                                                                    )}
                                                                    {errors.acceptType && (
                                                                        <span>
                                                                        Your selected file type is not allow
                                                                        </span>
                                                                    )}
                                                                    {errors.maxFileSize && (
                                                                        <span>Image must not be more than 3MB </span>
                                                                    )}
                                                                    </div>
                                                                )}
                                                                <div
                                                                    style={isDragging ? { color: "red" } : null}
                                                                    onClick={onImageUpload}
                                                                    {...dragProps}
                                                                    className="rounded-full h-[450px] w-[450px] flex p-2 justify-center items-center"
                                                                >
                                                                    <div className="border-double border-4 border-blue-500 bg-white h-full w-full flex flex-col p-2 border-solid justify-center items-center overflow-hidden">
                                                                        <div className="border border-green-500 border-10 bg-white h-full w-full flex flex-col justify-center items-center overflow-hidden">
                                                                        {imageList.length === 0 ? (
                                                                            <>
                                                                            <img src="/assets/icons/camera.svg" alt="" />
                                                                            <p className="font-semibold text-sm text-center">
                                                                                Click or Drop Image To Attach Payment Receipt
                                                                            </p>
                                                                            </>
                                                                        ) : (
                                                                            imageList.map((image, index) => (
                                                                            <img
                                                                                key={index}
                                                                                src={image.data_url}
                                                                                alt=""
                                                                                className="w-full h-full object-cover"
                                                                            />
                                                                            ))
                                                                        )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                </div>
                                                            )}
                                                            </ImageUploading>
                                                        </div>

                                                        {/* Action */}
                                                        <div className="mt-10 w-full bg-white justify-center flex px-4 items-center sm:mb-20">
                                                            <div></div>
                                                            {/* <button
                                                            onClick={decrement}
                                                            className="text-brandDarkGray px-4 font-semibold"
                                                            >
                                                            Back
                                                            </button> */}
                                                            <button
                                                            type="submit"
                                                            disabled={formattedImage ? false : true}
                                                            className="h-[50px] bg-brandGreen hover:bg-green-900 text-white px-4 font-semibold rounded-md disabled:bg-brandDarkGray disabled:cursor-not-allowed"
                                                            >
                                                                    Confirm Payment
                                                            {/* {loading ? <BeatLoader className="hover:bg-green-900 rounded-md" size={10} color="#fff" /> : "Confirm Payment"} */}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                        
                                        {/* <div className="flex flex-wrap -m-2 mb-1 md:mx-5 mx-2 mt-3">
                                            <div className="w-1/2 p-2 flex justify-item item-center">
                                                <div type="checkbox"
                                                    className="peer relative appearance-none w-fit text-white p-3 cursor-pointer bg-green-800 hover:bg-green-600 hover:font-bold rounded-md">Submit</div>
                                            </div>
                                        </div> */}
                                        
                                        <div className="px-20 py-10"></div>
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

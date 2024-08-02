import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { deleteAdProduct } from '@/apis/ads';
import { appStore } from "@/state/appState";
import axios from 'axios';
import { BASE_URL } from "@/lib/axios";
import { CreateFaq } from '@/apis/misc';
import { BeatLoader } from "react-spinners";
import { AddCourse } from '@/apis/backend/course';
import { Modal } from '@/components/Modal';
import ImageUploading from "react-images-uploading";
import { uploadReceipt } from '@/apis/user';


export const MakePayment = ({onClick, openCourseModal})  =>
{
        // const navigate = useNavigate();
        const [formattedImage, setFromattedImage] = useState("");
        const [image, setImage] = useState([]);
        const [error, setError] = useState("");
        const [loading, setLoading] = useState(false);
        const [url, setUrl] = useState(false);
        const [processAdvert, setProcessAdvert] = useState(false);
        const maxFileSize = 3000000;
    
        function fixBinary (bin) 
        {
            var length = bin.length;
            var buf = new ArrayBuffer(length);
            var arr = new Uint8Array(buf);
            for (var i = 0; i < length; i++) {
              arr[i] = bin.charCodeAt(i);
            }
            return buf;
        }
        

        useEffect(() => {
                setImage([])
                setUrl("")
                setLoading(false)
        }, [])
        

        const handleFormSubmit = (e) => 
        {
                e.preventDefault();
        
                if (formattedImage) {
                setError("");
                setLoading(true);
                let requestData = { avatar: formattedImage };
        
                uploadReceipt(formattedImage)
                .then(() => {
                        // setSuccessful(true)
                        setTimeout(() => {
                                setLoading(false)
                                // navigate("/login", { replace: true })
                                onClick("Receipt Successfuly Sent for vertification and approval")
                        }, 2000)
                })
                .catch((err) => {
                        setLoading(false);
                        setError(`${err}`);
                });
                }
       };
      
        const onChange = (imageList) => 
        {
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
      
            var binary = fixBinary(atob(x));
            var blob = new Blob([binary], {type: 'image/jpeg'});
            var url = URL.createObjectURL(blob);
            setUrl(url)
            console.log('Created a png blob of size: ' + blob.size);
            if(blob.size > 1000000)
            {
                setError("Attachment must not be more than 1 MB")
                // setIsAllow(false)
                setProcessAdvert(false)
                binary = ''
            } else {
                console.log(data)
                console.log(typeof x)
                console.log(typeof data)
                setFromattedImage(x);
                setError("")
                // setIsAllow(true)
                setProcessAdvert(true)
            }
        };

        const closeIt = () => 
        {                
                setFromattedImage("");
                setUrl("")
                onClick(!openCourseModal)
        }

        const sendIt = () => {
                onClick("Receipt Successfuly Sent for vertification and approval")
        }

        return (
                <Modal onClick={onClick} isOpen={openCourseModal} wrapperWidth={800} margin={'100px auto 0px auto'}>
                        <div className='col-span-12 pt-1 pb-5 overflow-y-auto xm:overflow-y-scroll justify-center item-center'>
                                
                                <div className='col-span-12 pb-2 overflow-auto justify-center h-fit py-2 item-center -mt-5'>
                                        <div className="mt-10 w-full flex justify-center items-center gap-3 flex-col">
                                                <p className="text-center text-xl font-semibold text-brandDarkGray mb-5 text-green-700">Upload Payment Receipt</p>
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
                                                {/* <div className="rounded-full h-[150px] w-[150px] border flex justify-center items-center"> */}
                                                <ImageUploading
                                                // multiple
                                                value={image}
                                                onChange={onChange}
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
                                                                        className="rounded-full h-[350px] w-[350px] border flex p-2 justify-center items-center"
                                                                        >
                                                                                <div className="rounded-full h-full w-full border flex flex-col justify-center items-center overflow-hidden">
                                                                                        {
                                                                                                url.length === 0 ? (
                                                                                                        <>
                                                                                                        <img src="/assets/icons/camera.svg" alt="" />
                                                                                                        <p className="text-brandDarkGray italic font-semibold text-sm text-center">
                                                                                                        Click or Drop image here
                                                                                                        </p>
                                                                                                        </>
                                                                                                ) : (
                                                                                                        // imageList.map((image, index) => (
                                                                                                        <img
                                                                                                        src={url}
                                                                                                        alt=""
                                                                                                        className="w-full h-full object-cover"
                                                                                                        />
                                                                                                        // ))
                                                                                                )
                                                                                        }
                                                                                </div>
                                                                </div>
                                                        </div>
                                                )}
                                                </ImageUploading>
                                        </div>
                                </div>
                                
                                <div className="items-center gap-5 mt-2 sm:flex flex justify-between mb-2 mx-1 mt-3">
                                        {/* { !loading ? "It`s True" : "It`s False" } */}
                                        <button  
                                                className="py-3 px-4 bg-red-600 text-white font-semibold text-sm rounded-xl w-max"
                                                onClick={closeIt}
                                        >
                                                        Cancel
                                        </button>
                                        <button
                                                disabled={!processAdvert}
                                                className={`mt-2 py-3 px-4 ${(processAdvert) ? "bg-brandGreen hover:bg-green-700" : "bg-gray-500"} text-white font-semibold text-sm rounded-xl w-max`}
                                                onClick={handleFormSubmit}
                                                >                                                
                                                {       loading ? ( <BeatLoader size={9} color="#fff" />) : ( "Send Receipt" )          }
                                        </button>
                                </div>
                        </div>
                </Modal>  
        );
}

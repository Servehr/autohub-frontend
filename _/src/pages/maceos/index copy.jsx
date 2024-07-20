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
import swapBuySell from "@/assets/swap-buy-sell.png";
import swapCar from "@/assets/swap-car.png";


export default function MACEOS() 
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

              <main className="px-3 pt-5 border border-2">
                <MaxWidthWrapper>
                        <div className="grid grid-cols-12 gap-4 mb-10">
                                <div className="col-span-12 md:col-span-9 h-full bg-white ">
                                        <div class="bg-white p-6 rounded shadow-xl">
                                            <div className="items-center">
                                                <h1 className="font-bold uppercase mb-5 mr-10 w-full text-blue-900" style={{fontSize: "30px"}}>MODERN AUTOMOBILE CEOS</h1>
                                                <h1 className="w-full font-bold text-green-700" style={{fontSize: "20px"}}>Application Form</h1>
                                            </div> 
                                        </div>


                                        <div className="w-full mt-5">
                                            <div className="flex flex-wrap -m-2 mt-2 mb-2 md:mx-5 mx-2">
                                                <div className="p-2 w-1/2">
                                                    <span className="w-full font-bold text-sm">Firstname</span>
                                                    <input onBlur={(e) => {
                                                        
                                                    }} type="text" id="firstname" defaultValue={''}  name="firstname" placeholder="Enter Your Firstname" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 text-sm py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                                </div>
                                                <div className="p-2 w-1/2">
                                                    <span className="w-full font-bold text-sm">Surname</span>
                                                    <input onKeyUp={(e) => {   
                                                        
                                                    } 
                                                    } type="text" id="surname" defaultValue={''} name="surname" placeholder="Enter Your Surname" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 text-sm leading-8 transition-colors duration-200 ease-in-out" />
                                                    <div className="text-red-500 font-bold text-sm"></div>
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap -m-2 mt-2 mb-1 md:mx-5 mx-2">
                                                <div className="p-2 w-1/2">
                                                    <span className="w-full font-bold text-sm">Email</span>
                                                    <input onBlur={(e) => {
                                                        
                                                    }} type="email" id="email" defaultValue={''}  name="email" placeholder="Enter Your Email" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 text-sm py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                                </div>
                                                <div className="p-2 w-1/2">
                                                    <span className="w-full font-bold text-sm">Phone Number</span>
                                                    <input onKeyUp={(e) => {   
                                                        
                                                    } 
                                                    } type="number" id="phoneNo" defaultValue={''} name="phoneNo" placeholder="Enter Your Phone No" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 text-sm leading-8 transition-colors duration-200 ease-in-out" />
                                                    <div className="text-red-500 font-bold text-sm"></div>
                                                </div>
                                            </div>
                                            <div className="flex mb-1 md:mx-5 mx-2">
                                                <div className="w-full p-2">
                                                    <span className="font-bold text-sm">Residential Address</span>
                                                    <textarea onChange={(e) => { 
                                                        
                                                            } 
                                                        } defaultValue={''} 
                                                        className="w-full shadow form-textarea mb-2 block border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                                        rows="2" placeholder="Enter Description"
                                                        >
                                                    </textarea> 
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap -m-2 mb-1 md:mx-5 mx-2">
                                                <div className="w-1/2 p-2">    
                                                    <span className="w-full font-bold text-sm">Address Line 1</span>
                                                    <textarea onChange={(e) => { 
                                                                
                                                            } 
                                                        } defaultValue={''} 
                                                        className="w-full shadow form-textarea mb-2 block border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                                        rows="3" placeholder="Enter Description"
                                                        >
                                                    </textarea> 
                                                    <div className="text-red-500 font-bold text-sm"></div>
                                                </div>
                                                <div className="w-1/2 p-2">
                                                    <span className="w-full font-bold text-sm">Address Line 2</span>
                                                    <textarea onChange={(e) => { 
                                                                
                                                            } 
                                                        } defaultValue={''} 
                                                        className="w-full shadow form-textarea mb-2 block border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                                        rows="3" placeholder="Enter Description"
                                                        >
                                                    </textarea>
                                                    <div className="text-red-500 font-bold text-sm"></div>
                                                </div>
                                            </div>                                            
                                            <div className="flex flex-wrap -m-2 mt-2 mb-2 md:mx-5 mx-2">
                                                <div className="p-2 w-1/2">
                                                    <span className="w-full font-bold text-sm">Date of Birth</span>
                                                    <input onKeyUp={(e) => {   
                                                        
                                                    } 
                                                    } type="date" id="dob" defaultValue={''} name="dob" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 text-sm leading-8 transition-colors duration-200 ease-in-out" />
                                                    <div className="text-red-500 font-bold text-sm"></div>
                                                </div>
                                                <div className="p-2 w-1/2">
                                                    <span className="w-full font-bold text-sm">Postal Code</span>
                                                    <input onBlur={(e) => {
                                                        
                                                    }} type="text" id="postalCode" defaultValue={''}  name="postalCode" placeholder="Enter Your Postal Code" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 text-sm py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                                </div>
                                            </div>                                         
                                            <div className="flex flex-wrap -m-2 mt-2 mb-2 md:mx-5 mx-3">
                                                <div className="p-2 w-1/2 -mt-2">
                                                    <span className="w-full font-bold text-sm">City</span>
                                                    <input onBlur={(e) => {
                                                        
                                                    }} type="text" id="city" defaultValue={''}  name="city" placeholder="Enter Your City" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 text-sm py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                                </div>
                                                <div className="w-1/2 relative">
                                                    <span className="w-full font-bold text-sm">State / Province / Region</span>
                                                    <select onChange={(e) => {    
                                                                            
                                                                            }
                                                        } className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                                        { <option value={-1}> - Select State / Province / Region -  </option> }
                                                    </select>
                                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 mt-5">
                                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="relative flex flex-wrap -m-2 mt-2 mb-2 md:mx-5 mx-3">
                                                <span className="w-full font-bold text-sm">Country</span>
                                                <select onChange={(e) => {    
                                                                         
                                                                        }
                                                    } className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                                    { <option value={-1}> - Select Country -  </option> }
                                                </select>
                                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 mt-5">
                                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap -m-2 mt-2 mb-2 md:mx-5 mx-2">
                                                <div className="p-2 w-1/2">
                                                    <span className="w-full font-bold text-sm">State of Origin</span>
                                                    <input onBlur={(e) => {
                                                        
                                                    }} type="text" id="soo" defaultValue={''}  name="soo" placeholder="Enter Your Origin" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 text-sm py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                                </div>
                                                <div className="p-2 w-1/2">
                                                    <span className="w-full font-bold text-sm">Religion</span>
                                                    <input onKeyUp={(e) => {   
                                                        
                                                    } 
                                                    } type="text" id="religion" defaultValue={''} name="religion" placeholder="Enter Your Religion" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 text-sm leading-8 transition-colors duration-200 ease-in-out" />
                                                    <div className="text-red-500 font-bold text-sm"></div>
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap -m-2 mt-2 mb-2 md:mx-5 mx-2">
                                                <div className="p-2 w-1/2">
                                                    <span className="w-full font-bold text-sm">Company Name</span>
                                                    <input onBlur={(e) => {
                                                        
                                                    }} type="text" id="companyName" defaultValue={''}  name="companyName" placeholder="Enter Your Company Name" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 text-sm py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                                </div>
                                                <div className="p-2 w-1/2">
                                                    <span className="w-full font-bold text-sm">Company Address</span>
                                                    <input onKeyUp={(e) => {   
                                                        
                                                    } 
                                                    } type="text" id="companyAddress" defaultValue={''} name="companyAddress" placeholder="Enter Your Company Address" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 text-sm leading-8 transition-colors duration-200 ease-in-out" />
                                                    <div className="text-red-500 font-bold text-sm"></div>
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap -m-2 mt-2 mb-2 md:mx-5 mx-2">
                                                <div className="p-2 w-1/2">
                                                    <span className="w-full font-bold text-sm">CAC Number</span>
                                                    <input onBlur={(e) => {
                                                        
                                                    }} type="text" id="cac" defaultValue={''}  name="cac" placeholder="Enter Your CAC Number" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 text-sm py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                                </div>
                                                <div className="w-1/2 p-2 relative">
                                                    <span className="w-full font-bold text-sm">Do you have a bank account in your company's name? <strong className="text-red-500">*</strong></span> 
                                                    <select onChange={(e) => {    
                                                                            
                                                                            }
                                                        } className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                                        { <option value={-1}> - Do You? -  </option> }
                                                    </select>
                                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 mt-5">
                                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap -m-2 mt-2 mb-2 md:mx-5 mx-2">
                                                <div className="w-1/2 p-2 relative">
                                                    <span className="w-full font-bold text-sm">Years of experience in automobile industry? <strong className="text-red-500">*</strong></span> 
                                                    <select onChange={(e) => {    
                                                                            
                                                                            }
                                                        } className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                                        <option value={-1}> - Select Your Years of Experience -  </option>
                                                        <option value={-1}> - 0 to 3 Years -  </option>
                                                        <option value={-1}> - 4 to 6 Years? -  </option>
                                                        <option value={-1}> - More than 6 Years? -  </option>
                                                    </select>
                                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 mt-5">
                                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                                    </div>
                                                </div>
                                                <div className="w-1/2 p-2 relative">
                                                    <span className="w-full font-bold text-sm">Would you accept training from us? <strong className="text-red-500">*</strong></span> 
                                                    <select onChange={(e) => {    
                                                                            
                                                                            }
                                                        } className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                                        <option value={-1}> - Let us know -  </option>
                                                        <option value={-1}> Yes  </option>
                                                        <option value={-1}> No  </option>
                                                    </select>
                                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 mt-5">
                                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap -m-2 mt-2 mb-2 md:mx-5 mx-2">
                                                <div className="p-2 w-1/2">
                                                    <span className="w-full font-bold text-sm">How Much Do You Need?</span>
                                                    <input onBlur={(e) => {
                                                        
                                                    }} type="number" id="price" defaultValue={''}  name="price" placeholder="State Your Price " className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 text-sm py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                                </div>
                                                <div className="w-1/2 p-2 relative">
                                                    <span className="w-full font-bold text-sm">Are you willing to provide two verifiable guarantors? <strong className="text-red-500">*</strong></span> 
                                                    <select onChange={(e) => {    
                                                                            
                                                                            }
                                                        } className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                                        <option value={-1}> - Let us know -  </option>
                                                        <option value={-1}> Yes  </option>
                                                        <option value={-1}> No  </option>
                                                    </select>
                                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 mt-5">
                                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap -m-2 mb-1 md:mx-5 mx-2">
                                                <div className="w-1/2 p-2 flex justify-item item-center">
                                                    <input type="checkbox"
                                                        className="peer relative appearance-none w-7 h-7
                                                                border border-blue-400 border-4
                                                                cursor-pointer  
                                                                checked:bg-pink-600"
                                                        id="circular-checkbox" 
                                                    />
                                                    <label for="circular-checkbox" class="ms-2 text-sm font-medium font-bold mt-1">I agree to the <span className="font-bold text-green-700 cursor-pointer">Terms & Conditions</span></label>
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap -m-2 mb-1 md:mx-5 mx-2 mt-3">
                                                <div className="w-1/2 p-2 flex justify-item item-center">
                                                    <div type="checkbox"
                                                        className="peer relative appearance-none w-fit text-white p-3 cursor-pointer bg-green-800 hover:bg-green-600 hover:font-bold rounded-md">Submit</div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="px-20 py-10"></div>
                                    </div>

                                    <div className="col-span-12 md:col-span-3 h-fullbg-white ">                            
                                        <div class="bg-white p-1 rounded shadow-xl item-center">                                
                                            <div className="w-full">
                                                <img src={swapBuySell} alt=""/>
                                            </div>                             
                                            <div className="w-full p-3"></div>               
                                            {/* <div className="w-full">
                                                <img src={swapCar} alt="" />
                                            </div> */}
                                        </div>
                                    </div>
                    </div>
                </MaxWidthWrapper>
              </main>
        </>
    );
}

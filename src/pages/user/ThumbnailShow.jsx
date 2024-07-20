import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Outlet } from "react-router-dom";
import DashSidebar from "@/layouts/sidebar";
import { Helmet } from "react-helmet-async";

import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { BeatLoader, BounceLoader } from "react-spinners";
import currencyFormatter from "@/utils/currency-formatter";
import { browserType } from "@/store";
import { Icons } from "@/util/icon";
import { DeleteModal } from "@/components/DeleteModal";
import { appStore } from "@/state/appState";
import EditProductImage from "@/components/EditProductImage";
import { ChangeProductImage } from "@/components/ChangeProductImage";
import { UserWatchList } from "@/apis/watchlist";

export default function ListShow({product}) 
{

  return (   
      <div className="flex grid grid-cols-12 gap-5" style={{ paddingBottom: '10px' }}>
          <div className="col-span-3" style={{ marginBottom: '20px' }}>
              <img
                  src={product.avatar ? product?.avatar : ""}
                  alt=""
                  className="w-full h-[110px] object-cover cursor-pointer rounded-md p-1 bg-blue-300"
                  key={product.id}
                  onClick={() => navigate(`/product/details/${product.id}`)}
                  style={{marginTop: "-12px"}}
                />
          </div>
          <div className="col-span-4 p-2">
              <h1 className="font-bold md:text-base text-brandGreen sm:text-md" style={{ fontSize: '12px' }}>{product?.title}</h1>
              <p className="text-sm md:text-base text-blue-500 font-bold">
                  {product?.price && currencyFormatter(product.price)}
              </p>
              {/* <p className="text-brandGreen font-bold">
                {product?.price && currencyFormatter(product.price)}
              </p> */}
              <p className="text-xs text-brandRed mb-2">{product?.state?.name}</p>
              {/* <p className="text-xs text-brandRed">{ product.status}</p> */}
              {/* <span  class="px-2 leading-loose bg-green-700 font-bold text-white rounded-lg mt-3 p-2" style={{ fontSize: '12px' }}>
                <b>{ (product?.status === "active") ? 'Unpublish' : 'Publish' }</b>
              </span> */}
          </div>                                      
          <div className="col-span-5 p-1 flex flex-row md:flex-cols gap-10">
              <div className="col-span-3 items-center justify-center"> 
                  <div className="flex gap-1">
                  <span className="flex delete cursor-pointer pl-3" style={{zIndex: 0}} onClick={(e) => 
                    { 
                        setProductTitle(`${product.title}`)
                        advertState.setProductId(product.id)
                        advertState.setImageOnEdit(product.images)
                        setProductImages(product.images)
                        console.log(product.id)
                        console.log(product.images)
                        console.log(advertState.getProductId())
                        setProductId(product.id)
                        localStorage.setItem("theProductId", product.id)
                        setImageOpenModal(true)
                    }}
                  >
                      <div className="relative flex justify-center items-center">                                              
                          <div className="w-full">
                              <Icons iconName='image' color="green"/>
                          </div>
                          <div className="absolute flex justify-center items-center mt-12 text-black">                                                  
                              <span className="font-semibold" style={{ fontSize: '10px' }}>{product.images.length}</span>
                              <span className="font-semibold" style={{ fontSize: '10px' }}>&nbsp;Images</span>
                          </div>
                      </div>
                  </span>
                  </div>  
              </div>
          <div className="col-span-3 items-center justify-center mx-2"> 
              <div className="flex gap-2" onClick={() => { 
                    populateProductStore(item)
                    localStorage.setItem("modelId", product.id)
                    console.log(item)
                    navigate(`${product.id}/edit`)
                  }  
              }>
                  <div className="relative flex justify-center items-center">                                              
                      <Icons iconName='edit' color="red"/>
                      <div className="absolute flex justify-center items-center mt-12 text-black">                                                  
                          <span className="font-semibold" style={{ fontSize: '10px' }}>Edit</span>
                          <span className="font-semibold" style={{ fontSize: '10px' }}>&nbsp;Ads</span>
                      </div>
                  </div>
              </div>  
          </div>
          <div className="col-span-3 items-center justify-center mx-2">                                   
              <div className="relative flex justify-center items-center">                                              
                  <Icons iconName='eye' color="green"/>
                  <div className="absolute flex justify-center items-center mt-12 text-black">                                                  
                      <span className="font-semibold" style={{ fontSize: '14px' }}>{product.views}</span>
                      {/* <span className="font-semibold" style={{ fontSize: '10px' }}>&nbsp;Product</span> */}
                  </div>
              </div> 
              {/* <div className="flex gap-2">
                  <Icons iconName='eye' color="red" />
                  <span className="mt-1" style={{color: 'blue'}}>{product.views}</span>
              </div>   */}
          </div>
          <div className="col-span-3 items-center justify-center">                        
              
              {/* { (product.messages_count > 0) && <> <Icons iconName='comment' color="blue"/> </> } */}
              {   (product.messages_count > 0) ? 
                  (                                                
                      <div className="flex gap-2" onClick={() => { 
                            setProductMessages(product.messages)
                            advertState.setProductComments(item)
                            advertState.setProductTitle(product.title)
                            console.log(advertState.getProductTitle())
                            console.log(advertState.getProductComments())
                            setCloseCommentDialog(true)
                          }  
                      }>                                   
                        <div className="relative flex justify-center items-center">                                              
                            { (product.messages_count > 0) && <> <Icons iconName='comment' color="blue"/> </> }
                            <div className="absolute flex justify-center items-center mt-12 text-black">                                                  
                                <span className="font-semibold" style={{ fontSize: '14px' }}>{product.messages_count}</span>
                                {/* <span className="font-semibold" style={{ fontSize: '10px' }}>&nbsp;Product</span> */}
                            </div>
                        </div> 
                      </div>
                  ) : 
                  (                                                
                    <div className="flex gap-2">                                   
                      <div className="relative flex justify-center items-center">                                              
                          { (product.messages_count > 0) && <> <Icons iconName='comment' color="blue"/> </> }
                          <div className="absolute flex justify-center items-center mt-12 text-black">                                                  
                              <span className="font-semibold" style={{ fontSize: '14px' }}>{product.messages_count}</span>
                              {/* <span className="font-semibold" style={{ fontSize: '10px' }}>&nbsp;Product</span> */}
                          </div>
                      </div> 
                    </div>
                )
              }

          </div>
          <div className="col-span-3 items-center justify-center"> 
              <div className="flex gap-2" onClick={() => { 
                    setDeleteUrl(`ad/delete/${product.id}`)
                    setProductToDeleteMessage(`You are about to delete the product: ${product.title}`)
                    setProductImages(product.avatar)
                    setDeleteModal(true)
                  }  
              }>                                     
                <div className="relative flex justify-center items-center">                                              
                    <Icons iconName='delete' color="red"/>
                    <div className="absolute flex justify-center items-center mt-12 text-black">                                                  
                        <span className="font-semibold" style={{ fontSize: '14px' }}></span>
                        <span className="font-semibold" style={{ fontSize: '10px' }}>Delete</span>
                    </div>
                </div> 
                {/* <div className="justify-center items-center gap-2">
                    <Icons iconName='delete' color="red"/>
                    <span className="font-semibold" style={{ fontSize: '10px', lineHeight: '1' }}>Delete</span>
              </div> */}
              </div>  
          </div>
          </div>
      </div>
  );

}

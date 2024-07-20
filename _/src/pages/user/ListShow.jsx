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
import { ProductComments } from "@/components/ProductComments";
import { AVATAR, PRODUCT_FACE } from "@/lib/axios";

export default function ListShow({productItem, refetch}) 
{
  const advertState = appStore((state) => state)
  const navigate = useNavigate();
  // const [product, setProduct] = useState([])  
  const [deleteOpenModal, setDeleteModal] = useState(false)
  const [deleteUrl, setDeleteUrl] = useState("") 
  const [productToDeleteMessage, setProductToDeleteMessage] = useState("") 
  const [imageOpenModal, setImageOpenModal] = useState(false)
  const [productImages, setProductImages] = useState("")
  const [productId, setProductId] = useState("")
  const [refreshIt, setRefreshIt] = useState(0)
  const [closeCommentDialog, setCloseCommentDialog] = useState(false)
  const [selectedProductName, setSelectedProductName] = useState("")
  const [productMessages, setProductMessages] = useState(advertState.getProductComments())
  const [productTitle, setProductTitle] = useState(advertState.getProductTitle())

  const callThatPlace = () => 
  {
    //   Oncli
  }

  console.log(productItem)

  const populateProductStore = (item) => 
  {      
        advertState.setStates(item.state_id)
        advertState.setCateg(item.category_id)
        advertState.setMaker(item.make_id)
        advertState.setModel(item.model_id)
        advertState.setColour(item.colour)
        advertState.setYearOfPoduction(item.year_of_production)
        advertState.setTransmission(item.transmission_id)
        advertState.setCondition(item.condition_id)
        advertState.setChasisNumber(item.chasis_no)
        advertState.setTrim(item.trim)
        advertState.setDescription(item.description)
        advertState.setPrice(item.price)
        advertState.setPlan_id(item.plan_id)
        advertState.setOthers(item.others)
        advertState.setAvatar(item.avatar)
        advertState.setOnEdit('yes')
        console.log("=======================")
        console.log(advertState.getTheMakerModels())
        console.log("=======================")
  }

  return (   
      <>
      <div className="flex grid grid-cols-12 gap-5" style={{ paddingBottom: '10px' }}>
          <div className="col-span-3" style={{ marginBottom: '20px' }}>
              <img
                  src={productItem?.avatar ? `${PRODUCT_FACE}${productItem?.avatar}` : ""}
                  alt=""
                  className="w-full h-[110px] object-cover cursor-pointer rounded-md p-1 bg-blue-300"
                  key={productItem.id}
                  onClick={() => navigate(`/product/details/${productItem.id}`)}
                  style={{marginTop: "-12px"}}
                />
          </div>
          <div className="col-span-4 p-2">
              <h1 className="font-bold md:text-base text-brandGreen sm:text-md" style={{ fontSize: '12px' }}>{productItem?.title}</h1>
              <p className="text-sm md:text-base text-blue-500 font-bold">
                  {productItem?.price && currencyFormatter(productItem.price)}
              </p>
              {/* <p className="text-brandGreen font-bold">
                {productItem?.price && currencyFormatter(productItem.price)}
              </p> */}
              <p className="text-xs text-brandRed mb-2">{productItem?.state?.name}</p>
              {/* <p className="text-xs text-brandRed">{ productItem.status}</p> */}
              {/* <span  class="px-2 leading-loose bg-green-700 font-bold text-white rounded-lg mt-3 p-2" style={{ fontSize: '12px' }}>
                <b>{ (productItem?.status === "active") ? 'Unpublish' : 'Publish' }</b>
              </span> */}
          </div>                                      
          <div className="col-span-5 p-1 flex flex-row md:flex-cols gap-10">
              <div className="col-span-3 items-center justify-center"> 
                  <div className="flex gap-1">
                  <span className="flex delete cursor-pointer pl-3" style={{zIndex: 0}} onClick={(e) => 
                    { 
                        setProductTitle(`${productItem.title}`)
                        advertState.setProductId(productItem.id)
                        advertState.setImageOnEdit(productItem.images)
                        setProductImages(productItem.images)
                        console.log(productItem.id)
                        console.log(productItem.images)
                        console.log(advertState.getProductId())
                        setProductId(productItem.id)
                        localStorage.setItem("theProductId", productItem.id)
                        setImageOpenModal(true)
                    }}
                  >
                      <div className="relative flex justify-center items-center">                                              
                          <div className="w-full">
                              <Icons iconName='image' color="green"/>
                          </div>
                          <div className="absolute flex justify-center items-center mt-12 text-black">                                                  
                              <span className="font-semibold" style={{ fontSize: '10px' }}>{productItem.images.length}</span>
                              <span className="font-semibold" style={{ fontSize: '10px' }}>&nbsp;Images</span>
                          </div>
                      </div>
                  </span>
                  </div>  
              </div>
          <div className="col-span-3 items-center justify-center mx-2"> 
              <div className="flex gap-2" onClick={() => { 
                    populateProductStore(productItem)
                    localStorage.setItem("modelId", productItem.id)
                    console.log(productItem)
                    navigate(`${productItem.id}/edit`)
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
                      <span className="font-semibold" style={{ fontSize: '14px' }}>{productItem.views}</span>
                      {/* <span className="font-semibold" style={{ fontSize: '10px' }}>&nbsp;Product</span> */}
                  </div>
              </div> 
              {/* <div className="flex gap-2">
                  <Icons iconName='eye' color="red" />
                  <span className="mt-1" style={{color: 'blue'}}>{productItem.views}</span>
              </div>   */}
          </div>
          <div className="col-span-3 items-center justify-center">                        
              
              {/* { (productItem.messages_count > 0) && <> <Icons iconName='comment' color="blue"/> </> } */}
              {   (productItem.messages_count > 0) ? 
                  (                                                
                      <div className="flex gap-2" onClick={() => { 
                            setProductMessages(productItem.messages)
                            advertState.setProductComments(productItem)
                            advertState.setProductTitle(productItem.title)
                            console.log(advertState.getProductTitle())
                            console.log(advertState.getProductComments())
                            setCloseCommentDialog(true)
                          }  
                      }>                                   
                        <div className="relative flex justify-center items-center">                                              
                            { (productItem.messages_count > 0) && <> <Icons iconName='comment' color="blue"/> </> }
                            <div className="absolute flex justify-center items-center mt-12 text-black">                                                  
                                <span className="font-semibold" style={{ fontSize: '14px' }}>{productItem.messages_count}</span>
                                {/* <span className="font-semibold" style={{ fontSize: '10px' }}>&nbsp;Product</span> */}
                            </div>
                        </div> 
                      </div>
                  ) : 
                  (                                                
                    <div className="flex gap-2">                                   
                      <div className="relative flex justify-center items-center">                                              
                          { (productItem.messages_count > 0) && <> <Icons iconName='comment' color="blue"/> </> }
                          <div className="absolute flex justify-center items-center mt-12 text-black">                                                  
                              <span className="font-semibold" style={{ fontSize: '14px' }}>{productItem.messages_count}</span>
                              {/* <span className="font-semibold" style={{ fontSize: '10px' }}>&nbsp;Product</span> */}
                          </div>
                      </div> 
                    </div>
                )
              }

          </div>
          <div className="col-span-3 items-center justify-center"> 
              <div className="flex gap-2" onClick={() => { 
                    setDeleteUrl(`ad/delete/${productItem.id}`)
                    setProductToDeleteMessage(`You are about to delete the product: ${productItem.title}`)
                    setProductImages(productItem.avatar)
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

      {
          deleteOpenModal && <DeleteModal onClick={() => {
                                                setDeleteModal(false)
                                                refetch(true)
                                          } } 
                                          deleteModal={deleteOpenModal} 
                                          deleteUrl={deleteUrl} 
                                          returnTo={'/dashboard/store'} 
                                          imageProductUrl={productImages} 
                                          message={productToDeleteMessage}
                                    />
      }

      {
         imageOpenModal && (productId != "")  && <ChangeProductImage onClick={(e) => 
          { 
              setRefreshIt(e)
              console.log(e)
              setImageOpenModal(false) 
              console.log("Greater Things")
              refetch(e)
         }
          } imageModal={imageOpenModal} imageId={productTitle} imageUrl={productImages} mode="" productId={productId} />
      }

      { closeCommentDialog && <ProductComments onClick={(e) => 
          { 
              setCloseCommentDialog(false) 
         }
        } closeCommentDialog={closeCommentDialog} messages={productMessages} productName={productTitle} /> 
      }

      </>
  );

}

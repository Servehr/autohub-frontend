import { draftProduct, fetchOnSale, fetchSold, fetchUnposted, pendingProduct, publishedPost } from "@/apis/user";
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
import { DeleteWishList } from "@/components/DeleteWishList"
import Pagination from "@/components/Pagination";;
import ListShow from "./ListShow";
import PhoneShow from "./PhoneShow";
import { PRODUCT_FACE } from "@/lib/axios";

const tabItems = [
  {
    id: 1,
    name: "Active",
  },
  {
    id: 2,
    name: "Moderation",
  },
  {
    id: 3,
    name: "Unposted",
  },
  {
    id: 5,
    name: "WatchList",
  },
];

export default function Store() {
  const [active, setActive] = useState(1);

  return (
      <div className="flex flex-col items-center md:items-start h-fit px-3">
        {/* Tab bg-[#F1FFF4] */}
        <div className="z-30 shrink-0 md:mt-0 md:mb-0 lg:mb-0 lg:mt-0 mt-28 h-[47px] md:h-14 bg-[#F1FFF4] w-full rounded-3xl flex justify-between items-center px-6 text-sm md:text-base">
          {tabItems.map((item) => (
            <p
              key={item.id}
              onClick={() => setActive(item.id)}
              className={` ${
                item.id === active
                  ? "text-brandGreen font-bold"
                  : "text-brandDarkGray font-medium"
              } cursor-pointer `}
            >
              {item.name}
            </p>
          ))}
        </div>
        {/* Item */}
        <div className="mt-2 w-full h-max md:min-h-[400px] p-2 rounded-lg overflow-hidden">
          {active === 1 && <Active />}

          {active === 2 && <Moderation />}

          {active === 3 && <Unposted />}

          {/* {active === 4 && <Closed />} */}

          {active === 5 && <WatchList />}
        </div>
      </div>
  );
}

export function Closed() {
  return (
    <>
      <div className="rounded-lg py-2 h-[400px] ">
        <div className="flex justify-center  h-full items-center w-full ">
          <div className="text-center">
            <p className="mt-4 text-gray-500">No Product has been closed!</p>
          </div>
        </div>
      </div>
    </>
  );
}

export function Moderation() {
  const advertState = appStore((state) => state)

  const [currentPage, setCurrentPage] = useState(1)  
  const [perPage, setPerPage] = useState(5) 
  const { data, isLoading, refetch, isRefetching, isError }= useQuery(['pending-product'], () => pendingProduct(currentPage, perPage), { refetchOnWindowFocus: true, staleTime: Infinity, retry: 2 })


  if(!isLoading)
  {
      console.log(data)
  }
  
  const [refresh, setRefresh] = useState(0)
  const navigate = useNavigate();
  const [product, setProduct] = useState([])  
  const [deleteOpenModal, setDeleteModal] = useState(false)
  const [ deleteUrl, setDeleteUrl] = useState("") 
  const [ productToDeleteMessage, setProductToDeleteMessage] = useState("") 
  const [imageOpenModal, setImageOpenModal] = useState(false)
  const [productImages, setProductImages] = useState("")
  const [productId, setProductId] = useState("")
  const [refreshIt, setRefreshIt] = useState(0)
  const [closeCommentDialog, setCloseCommentDialog] = useState(false)
  const [selectedProductName, setSelectedProductName] = useState("")
  const [productMessages, setProductMessages] = useState(advertState.getProductComments())
  const [productTitle, setProductTitle] = useState(advertState.getProductTitle())

  useEffect(() => {
    setProduct(data)
    setRefresh(advertState.getRefresh())
    console.log(deleteOpenModal)
    refetch()
}, [data, refresh, productId, productImages, deleteOpenModal])


useEffect(() => {
  refetch()
}, [refreshIt])


useEffect(() => {
    console.log(advertState.getProductComments())
}, [productMessages])

const { isMobile } = browserType();

if(!isLoading)
{
   console.log(data)
   console.log(data?.product_advert?.noOfPages)
}
  
const populateProductStore = (item) => 
{      
        advertState.setStates(item?.state_id)
        advertState.setCateg(item?.category_id)
        advertState.setMaker(item?.make_id)
        advertState.setModel(item?.model_id)
        advertState.setColour(item?.colour)
        advertState.setYearOfPoduction(item?.year_of_production)
        advertState.setTransmission(item?.transmission_id)
        advertState.setCondition(item?.condition_id)
        advertState.setChasisNumber(item?.chasis_no)
        advertState.setTrim(item?.trim)
        advertState.setDescription(item?.description)
        advertState.setPrice(item?.price)
        advertState.setPlan_id(item?.plan_id)
        advertState.setOthers(item?.others)
        advertState.setAvatar(item?.avatar)
        advertState.setOnEdit('yes')
        console.log("=======================")
        console.log(advertState.getStates())
        console.log("=======================")
  }

  return (
    <>
      {/* {console.log(data)} */}

      <div className="md:mt-0 lg:mt-0 mt-10">

        {isLoading && !isRefetching && (
          <div className="min-h-[320px] flex justify-center items-center text-brandGreen">
            {isMobile ? (
              <BeatLoader color="#1c9236" />
            ) : (
              <BounceLoader color="#1c9236" />
            )}
          </div>
        )}

        {/* {!isLoading && isRefetching && (
          <div className="min-h-[320px] flex justify-center items-center text-brandGreen">
            {isMobile ? (
              <BeatLoader color="#1c9236" />
            ) : (
              <BounceLoader color="#1c9236" />
            )}
          </div>
        )} */}

          {!isLoading && !isError && data?.product_advert?.product?.length === 0 && (
            <div className="rounded-lg py-2 min-h-[320px] h-full">
              <div className="flex justify-center min-h-[320px] h-full items-center w-full ">
                <div className="text-center">
                  <p className="mt-4 text-gray-500">Nothing Here</p>

                  <Link
                    to="/dashboard/create-advert"
                    className="inline-block px-5 py-2 mt-4 text-sm font-medium text-white bg-brandGreen/90 rounded hover:bg-brandGreen focus:outline-none focus:ring"
                  >
                    Place An Advert
                  </Link>
                </div>
              </div>
            </div>
          )}
          
          {
              !isLoading && !isRefetching && (data?.product_advert?.product?.length > 0) && data?.product_advert?.product.map((productItem, index) => {
                  return (
                      <>
                        <div
                            className="h-[130px] md:block lg:block hidden bg-brandGreen/10 hover:bg-brandGreen/20 hover:shadow rounded-lg gap-2 justify-between py-5 px-2 pl-3 pb-10 mb-3"
                          >
                            <ListShow productItem={productItem} refetch={(e) => {
                                refetch()
                            }} />
                        </div>
                        <div
                            className="h-fit md:hidden lg:hidden bg-brandGreen/10 hover:bg-brandGreen/20 hover:shadow rounded-lg gap-2 justify-between pt-5 px-2 pl-3 pb-2 mb-3"
                          >
                            <PhoneShow productItem={productItem} refetch={(e) => {
                                refetch()
                            }} />
                        </div>
                      </>
                )
              })
          }

          <div className="mt-20">
                { 
                    !isLoading && !isRefetching && (data?.product_advert?.product.length > 0) && 
                            <Pagination onClick={(data) => {
                                      setCurrentPage(data)
                                      console.log(data)
                                      console.log(currentPage)
                                      // setRefresh(data)
                                      // setPerPage(data.perPage)
                                      setTimeout(() => {
                                          refetch()   
                                      }, 1000)
                                      // do all the setting here and then refresh for new set of data rows
                                  } 
                              } 
                              perPageNo={perPage} 
                              currentPageNo={currentPage} 
                              noOfPages={data?.product_advert?.noOfPages} 
                              hasNextPage={data?.product_advert?.hasNextPage} 
                              hasPreviousPage={data?.product_advert?.hasPreviousPage} 
                              from={'blog'}
                          />    
                }
         </div>
                            
        

          {/* { closeCommentDialog && <ProductComments onClick={ (e) => setCloseCommentDialog(false) } messages={productMessages} productName={selectedProductName} /> } */}
          
      </div>

      {!isLoading && !isError && data?.length === 0 && (
        <div className="rounded-lg py-2 min-h-[320px] h-full">
          <div className="flex justify-center min-h-[320px] h-full items-center w-full ">
            <div className="text-center">
              <p className="mt-4 text-gray-500">Nothing Here</p>

              <Link
                to="/"
                className="inline-block px-5 py-2 mt-4 text-sm font-medium text-white bg-brandGreen/90 rounded hover:bg-brandGreen focus:outline-none focus:ring"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      )}

      {isError && (
        <>
          <div className="rounded-lg py-2 min-h-[320px] h-full">
            <div className="flex justify-center min-h-[320px] h-full items-center w-full ">
              <div className="text-center">
                <p className="mt-4 text-gray-500">Nothing Here</p>

                <Link
                  to="/"
                  className="inline-block px-5 py-2 mt-4 text-sm font-medium text-white bg-brandGreen/90 rounded hover:bg-brandGreen focus:outline-none focus:ring"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </>
      )}


      {/* <CreateOfficeTool onClick={() => setOpenModal(false) } openOfficeToolModal={openModal} /> */}
      {
          deleteOpenModal && <DeleteModal onClick={() => setDeleteModal(false) } deleteModal={deleteOpenModal} deleteUrl={deleteUrl} returnTo={'/dashboard/store'} imageProductUrl={productImages} message={productToDeleteMessage} />
      }

      {
         imageOpenModal && (productId != "")  && <ChangeProductImage onClick={(e) => 
          { 
              setRefreshIt(e)
              console.log(e)
              setImageOpenModal(false) 
              console.log("Greater Things")
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

export function Sold() {
  const { data, isLoading, isError } = useQuery("sold", fetchSold);

  const { isMobile } = browserType();

  const navigate = useNavigate();
  return (
    <>
      {/* {console.log(data)} */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {data &&
          data.length !== 0 &&
          data.map((item) => (
            <div
              key={item?.id}
              onClick={() => navigate(`/ad/details/${item?.id}`)}
              className="h-[130px] bg-brandGreen/5 hover:bg-brandGreen/10 hover:shadow flex flex-col p-2 rounded-lg gap-2 justify-between"
            >
              <div className="flex items-center h-[90px] gap-5">
                <div className="h-full bg-gray-100 w-[120px] rounded-lg overflow-hidden">
                  <img
                    src={item?.avatar ? item?.avatar : ""}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-sm sm:text-base">
                  <h1 className="sm:text-sm ">{item?.title}</h1>
                  <p className="font-medium text-brandGreen">
                    {item?.price && currencyFormatter(item?.price)}
                  </p>
                  <p className="text-xs text-brandRed">{item?.state?.name}</p>
                </div>
              </div>

              <div
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="text-xs sm:text-sm  shrink-0 text-right text-brandRed font-bold cursor-pointer"
              >
                <div>Remove</div>
              </div>
            </div>
          ))}
      </div>

      {isLoading && (
        <div className="min-h-[320px] flex justify-center items-center text-brandGreen">
          {isMobile ? (
            <BeatLoader color="#1c9236" />
          ) : (
            <BounceLoader color="#1c9236" />
          )}
        </div>
      )}

      {!isLoading && !isError && data?.length === 0 && (
        <div className="rounded-lg py-2 min-h-[320px] h-full">
          <div className="flex justify-center min-h-[320px] h-full items-center w-full ">
            <div className="text-center">
              <p className="mt-4 text-gray-500">Nothing Here</p>

              <Link
                to="/dashboard/create-advert"
                className="inline-block px-5 py-2 mt-4 text-sm font-medium text-white bg-brandGreen/90 rounded hover:bg-brandGreen focus:outline-none focus:ring"
              >
                Place An Advert
              </Link>
            </div>
          </div>
        </div>
      )}

      {isError && (
        <>
          <div className="rounded-lg py-2 min-h-[320px] h-full">
            <div className="flex justify-center min-h-[320px] h-full items-center w-full ">
              <div className="text-center">
                <p className="mt-4 text-gray-500">Nothing Here</p>

                <Link
                  to="/"
                  className="inline-block px-5 py-2 mt-4 text-sm font-medium text-white bg-brandGreen/90 rounded hover:bg-brandGreen focus:outline-none focus:ring"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export function Unposted()  {
  const advertState = appStore((state) => state)

  const [currentPage, setCurrentPage] = useState(1)  
  const [perPage, setPerPage] = useState(5) 
  const { data, isLoading, refetch, isRefetching, isError }= useQuery(['draft-product'], () => draftProduct(currentPage, perPage), { refetchOnWindowFocus: true, staleTime: Infinity, retry: 2 })


  if(!isLoading)
  {
      console.log(data)
  }
  
  const [refresh, setRefresh] = useState(0)
  const navigate = useNavigate();
  const [product, setProduct] = useState([])  
  const [deleteOpenModal, setDeleteModal] = useState(false)
  const [ deleteUrl, setDeleteUrl] = useState("") 
  const [ productToDeleteMessage, setProductToDeleteMessage] = useState("") 
  const [imageOpenModal, setImageOpenModal] = useState(false)
  const [productImages, setProductImages] = useState("")
  const [productId, setProductId] = useState("")
  const [refreshIt, setRefreshIt] = useState(0)
  const [closeCommentDialog, setCloseCommentDialog] = useState(false)
  const [selectedProductName, setSelectedProductName] = useState("")
  const [productMessages, setProductMessages] = useState(advertState.getProductComments())
  const [productTitle, setProductTitle] = useState(advertState.getProductTitle())

  useEffect(() => {
    setProduct(data)
    setRefresh(advertState.getRefresh())
    console.log(deleteOpenModal)
    refetch()
}, [data, refresh, productId, productImages, deleteOpenModal])


useEffect(() => {
  refetch()
}, [refreshIt])


useEffect(() => {
    console.log(advertState.getProductComments())
}, [productMessages])

const { isMobile } = browserType();

if(!isLoading)
{
   console.log(data)
   console.log(data.product_advert?.noOfPages)
}
  
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
        console.log(advertState.getStates())
        console.log("=======================")
  }

  return (
    <>
      {/* {console.log(data)} */}

        <div className="md:mt-0 lg:mt-0 mt-10">

          {isLoading && !isRefetching && (
            <div className="min-h-[320px] flex justify-center items-center text-brandGreen">
              {isMobile ? (
                <BeatLoader color="#1c9236" />
              ) : (
                <BounceLoader color="#1c9236" />
              )}
            </div>
          )}

          {!isLoading && isRefetching && (
            <div className="min-h-[320px] flex justify-center items-center text-brandGreen">
              {isMobile ? (
                <BeatLoader color="#1c9236" />
              ) : (
                <BounceLoader color="#1c9236" />
              )}
            </div>
          )}

          

              {             
                  !isLoading && !isError && data.product_advert?.product.length === 0 && (
                    <div className="rounded-lg py-2 min-h-[320px] h-full">
                      <div className="flex justify-center min-h-[320px] h-full items-center w-full ">
                        <div className="text-center">
                          <p className="mt-4 text-gray-500">Nothing Here</p>

                          <Link
                            to="/dashboard/create-advert"
                            className="inline-block px-5 py-2 mt-4 text-sm font-medium text-white bg-brandGreen/90 rounded hover:bg-brandGreen focus:outline-none focus:ring"
                          >
                            Place An Advert
                          </Link>
                        </div>
                      </div>
                    </div>
                  )
              }
          
          {
              !isLoading && !isRefetching && (data?.product_advert?.product.length > 0) && data?.product_advert?.product.map((productItem, index) => {
                return (
                         <>
                           <div
                               className="h-[130px] md:block lg:block hidden bg-brandGreen/10 hover:bg-brandGreen/20 hover:shadow rounded-lg gap-2 justify-between py-5 px-2 pl-3 pb-10 mb-3"
                             >
                               <ListShow productItem={productItem} refetch={(e) => {
                                   refetch()
                               }} />
                           </div>
                           <div
                               className="h-fit md:hidden lg:hidden bg-brandGreen/10 hover:bg-brandGreen/20 hover:shadow rounded-lg gap-2 justify-between pt-5 px-2 pl-3 pb-2 mb-3"
                             >
                               <PhoneShow productItem={productItem} refetch={(e) => {
                                   refetch()
                               }} />
                           </div>
                         </>
                )
              })
          }

          <div className="mt-20">
                { 
                    !isLoading && !isRefetching && (data?.product_advert?.product.length > 0) && 
                            <Pagination onClick={(data) => {
                                      setCurrentPage(data)
                                      console.log(data)
                                      console.log(currentPage)
                                      // setRefresh(data)
                                      // setPerPage(data.perPage)
                                      setTimeout(() => {
                                          refetch()   
                                      }, 1000)
                                      // do all the setting here and then refresh for new set of data rows
                                  } 
                              } 
                              perPageNo={perPage} 
                              currentPageNo={currentPage} 
                              noOfPages={data?.product_advert?.noOfPages} 
                              hasNextPage={data?.product_advert?.hasNextPage} 
                              hasPreviousPage={data?.product_advert?.hasPreviousPage} 
                              from={'blog'}
                          />    
                }
         </div>
                            
        

          {/* { closeCommentDialog && <ProductComments onClick={ (e) => setCloseCommentDialog(false) } messages={productMessages} productName={selectedProductName} /> } */}
          
      </div>
      
      {/* {!isLoading && !isError && data?.length === 0 && (
        <div className="rounded-lg py-2 min-h-[320px] h-full">
          <div className="flex justify-center min-h-[320px] h-full items-center w-full ">
            <div className="text-center">
              <p className="mt-4 text-gray-500">Nothing Here</p>

              <Link
                to="/"
                className="inline-block px-5 py-2 mt-4 text-sm font-medium text-white bg-brandGreen/90 rounded hover:bg-brandGreen focus:outline-none focus:ring"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      )} */}

      {isError && (
        <>
          <div className="rounded-lg py-2 min-h-[320px] h-full">
            <div className="flex justify-center min-h-[320px] h-full items-center w-full ">
              <div className="text-center">
                <p className="mt-4 text-gray-500">Nothing Here</p>

                <Link
                  to="/"
                  className="inline-block px-5 py-2 mt-4 text-sm font-medium text-white bg-brandGreen/90 rounded hover:bg-brandGreen focus:outline-none focus:ring"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </>
      )}


      {/* <CreateOfficeTool onClick={() => setOpenModal(false) } openOfficeToolModal={openModal} /> */}
      {
          deleteOpenModal && <DeleteModal onClick={() => setDeleteModal(false) } deleteModal={deleteOpenModal} deleteUrl={deleteUrl} returnTo={'/dashboard/store'} imageProductUrl={productImages} message={productToDeleteMessage} />
      }

      {
         imageOpenModal && (productId != "")  && <ChangeProductImage onClick={(e) => 
          { 
              setRefreshIt(e)
              console.log(e)
              setImageOpenModal(false) 
              console.log("Greater Things")
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


export function Active() 
{
  const advertState = appStore((state) => state)

  const [currentPage, setCurrentPage] = useState(1)  
  const [perPage, setPerPage] = useState(5) 
  const { data, isLoading, refetch, isRefetching, isError } = useQuery(["get-all-draft-post"], () => publishedPost(currentPage, perPage), { refetchOnWindowFocus: true, staleTime: Infinity, retry: 2 })

  const [refresh, setRefresh] = useState(0)
  const navigate = useNavigate();
  const [product, setProduct] = useState([])  
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
  
  
  useEffect(() => {
      setProduct(data)
      setRefresh(advertState.getRefresh())
      console.log(deleteOpenModal)
      refetch()
  }, [data, refresh, productId, productImages, deleteOpenModal])

  
  useEffect(() => {
    refetch()
  }, [refreshIt])

  
  useEffect(() => {
      console.log(advertState.getProductComments())
  }, [productMessages])

  const { isMobile } = browserType();

  if(!isLoading)
  {
     console.log(data)
     console.log(data.product_advert?.noOfPages)
  }

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
      {/* {console.log(data)} */}

        <div className="md:mt-0 lg:mt-0 -mb-5">

          {isLoading && !isRefetching && (
            <div className="min-h-[320px] flex justify-center items-center text-brandGreen">
              {isMobile ? (
                <BeatLoader color="#1c9236" />
              ) : (
                <BounceLoader color="#1c9236" />
              )}
            </div>
          )}

          {!isLoading && isRefetching && (
            <div className="min-h-[320px] flex justify-center items-center text-brandGreen">
              {isMobile ? (
                <BeatLoader color="#1c9236" />
              ) : (
                <BounceLoader color="#1c9236" />
              )}
            </div>
          )}

          

              {             
                  !isLoading && !isError && data.product_advert?.product.length === 0 && (
                    <div className="rounded-lg py-2 min-h-[320px] h-full">
                      <div className="flex justify-center min-h-[320px] h-full items-center w-full ">
                        <div className="text-center">
                          <p className="mt-4 text-gray-500">Nothing Here</p>

                          <Link
                            to="/dashboard/create-advert"
                            className="inline-block px-5 py-2 mt-4 text-sm font-medium text-white bg-brandGreen/90 rounded hover:bg-brandGreen focus:outline-none focus:ring"
                          >
                            Place An Advert
                          </Link>
                        </div>
                      </div>
                    </div>
                  )
              }

          
          {
              !isLoading && !isRefetching && (data?.product_advert?.product.length > 0) && data?.product_advert?.product.map((productItem, index) => {
                   return (
                            <>
                              <div
                                  className="h-[130px] md:block lg:block hidden bg-brandGreen/10 hover:bg-brandGreen/20 hover:shadow rounded-lg gap-2 justify-between py-5 px-2 pl-3 mb-3"
                                >
                                  <ListShow productItem={productItem} refetch={(e) => {
                                      refetch()
                                  }} />
                              </div>
                              <div
                                  className="h-fit md:hidden lg:hidden bg-brandGreen/10 hover:bg-brandGreen/20 hover:shadow rounded-lg gap-2 justify-between pt-5 px-2 pl-3 pb-2 mb-3"
                                >
                                  <PhoneShow productItem={productItem} refetch={(e) => {
                                      refetch()
                                  }} />
                              </div>
                            </>
                   )
              })
          }

          <div className="mt-20">
                { 
                    !isLoading && !isRefetching && (data?.product_advert?.product.length > 0) && 
                            <Pagination onClick={(data) => {
                                      setCurrentPage(data)
                                      console.log(data)
                                      console.log(currentPage)
                                      // setRefresh(data)
                                      // setPerPage(data.perPage)
                                      setTimeout(() => {
                                          refetch()   
                                      }, 1000)
                                      // do all the setting here and then refresh for new set of data rows
                                  } 
                              } 
                              perPageNo={perPage} 
                              currentPageNo={currentPage} 
                              noOfPages={data?.product_advert?.noOfPages} 
                              hasNextPage={data?.product_advert?.hasNextPage} 
                              hasPreviousPage={data?.product_advert?.hasPreviousPage} 
                              from={'blog'}
                          />    
                }
         </div>
                            
        

          {/* { closeCommentDialog && <ProductComments onClick={ (e) => setCloseCommentDialog(false) } messages={productMessages} productName={selectedProductName} /> } */}
          
      </div>

      
      {/* {!isLoading && !isError && data?.length === 0 && (
        <div className="rounded-lg py-2 min-h-[320px] h-full">
          <div className="flex justify-center min-h-[320px] h-full items-center w-full ">
            <div className="text-center">
              <p className="mt-4 text-gray-500">Nothing Here</p>

              <Link
                to="/"
                className="inline-block px-5 py-2 mt-4 text-sm font-medium text-white bg-brandGreen/90 rounded hover:bg-brandGreen focus:outline-none focus:ring"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      )} */}

      {/* {isError && (
        <>
          <div className="rounded-lg py-2 min-h-[320px] h-full">
            <div className="flex justify-center min-h-[320px] h-full items-center w-full ">
              <div className="text-center">
                <p className="mt-4 text-gray-500">Nothing Here</p>

                <Link
                  to="/"
                  className="inline-block px-5 py-2 mt-4 text-sm font-medium text-white bg-brandGreen/90 rounded hover:bg-brandGreen focus:outline-none focus:ring"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </>
      )} */}


      {/* <CreateOfficeTool onClick={() => setOpenModal(false) } openOfficeToolModal={openModal} /> */}
      {
          deleteOpenModal && <DeleteModal onClick={() => setDeleteModal(false) } deleteModal={deleteOpenModal} deleteUrl={deleteUrl} returnTo={'/dashboard/store'} imageProductUrl={productImages} message={productToDeleteMessage} />
      }

      {
         imageOpenModal && (productId != "")  && <ChangeProductImage onClick={(e) => 
          { 
              setRefreshIt(e)
              console.log(e)
              setImageOpenModal(false) 
              console.log("Greater Things")
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

export function WatchList() 
{
  const advertState = appStore((state) => state)

  const [currentPage, setCurrentPage] = useState(1)  
  const [perPage, setPerPage] = useState(3) 

  const { data, isLoading, refetch, isRefetching, isError } = useQuery(["user-watch-list"], () => UserWatchList(currentPage, perPage), { refetchOnWindowFocus: true, staleTime: Infinity, retry: 2 })

  
  const navigate = useNavigate();
  
  // const [refresh, setRefresh] = useState(0)
  // const navigate = useNavigate();
  // const [product, setProduct] = useState([])  
  // const [deleteOpenModal, setDeleteModal] = useState(false)
  // const [ deleteUrl, setDeleteUrl] = useState("") 
  // const [ productToDeleteMessage, setProductToDeleteMessage] = useState("") 
  const [imageOpenModal, setImageOpenModal] = useState(false)
  const [productTitle, setProductTitile] = useState(false)
  const [productImages, setProductImages] = useState("")
  const [productId, setProductId] = useState("")
  const [deleteWishListOpenModal, setDeleteWishListModal] = useState(false)
  const [deleteUrl, setDeleteUrl] = useState("") 
  const [productToDeleteMessage, setProductToDeleteMessage] = useState("")

  if(!isLoading)
  {
     console.log(data)
  }
    
  
    // useEffect(() => {
        // setProduct(data)
        // setRefresh(advertState.getRefresh())
        // console.log(advertState.chasis_no)
    // }, [data, refresh])
  
    const { isMobile } = browserType();
  
    return (
      <>
        {/* {console.log(data)} */}

        
  
        <div className="md:mt-0 lg:mt-0 mt-10">

              {isLoading && !isRefetching && (
                <div className="min-h-[320px] flex justify-center items-center text-brandGreen">
                  {isMobile ? (
                    <BeatLoader color="#1c9236" />
                  ) : (
                    <BounceLoader color="#1c9236" />
                  )}
                </div>
              )}

              {!isLoading && isRefetching && (
                <div className="min-h-[320px] flex justify-center items-center text-brandGreen">
                  {isMobile ? (
                    <BeatLoader color="#1c9236" />
                  ) : (
                    <BounceLoader color="#1c9236" />
                  )}
                </div>
              )}

              

          

              {             
                  !isLoading && !isError && data.product_advert?.wishList.length === 0 && (
                    <div className="rounded-lg py-2 min-h-[320px] h-full">
                      <div className="flex justify-center min-h-[320px] h-full items-center w-full ">
                        <div className="text-center">
                          <p className="mt-4 text-gray-500">Nothing Here</p>

                          <Link
                            to="/dashboard/create-advert"
                            className="inline-block px-5 py-2 mt-4 text-sm font-medium text-white bg-brandGreen/90 rounded hover:bg-brandGreen focus:outline-none focus:ring"
                          >
                            Place An Advert
                          </Link>
                        </div>
                      </div>
                    </div>
                  )
              }

              {
                !isLoading && !isRefetching &&
                    data.product_advert?.wishList.length > 0 &&
                    data.product_advert?.wishList.map((item) => (
                      <div
                      className="h-[130px] bg-brandGreen/10 hover:bg-brandGreen/20 hover:shadow rounded-lg gap-2 justify-between py-5 px-2 pl-3 pb-10 mb-3"
                    >
                      <div className="flex grid grid-cols-12 gap-5" style={{ paddingBottom: '10px' }}>
                            <div className="col-span-3" style={{ marginBottom: '20px' }}>
                                <img
                                      src={item.avatar ? `${PRODUCT_FACE}${item?.avatar}` : ""}
                                      alt=""
                                      className="w-full h-[110px] object-cover cursor-pointer rounded-md p-1 bg-blue-300"
                                      key={item.id}
                                      onClick={() => navigate(`/product/details/${item.id}`)}
                                      style={{marginTop: "-12px"}}
                                   />
                            </div>
                            <div className="col-span-4 p-2">
                                <h1 className="font-bold md:text-base text-brandGreen sm:text-md" style={{ fontSize: '12px' }}>{item?.title}</h1>
                                <p className="text-sm md:text-base text-blue-500 font-bold">
                                    {item?.price && currencyFormatter(item.price)}
                                </p>
                                {/* <p className="text-brandGreen font-bold">
                                  {item?.price && currencyFormatter(item.price)}
                                </p> */}
                                <p className="text-xs text-brandRed mb-2">{item?.state?.name}</p>
                                {/* <p className="text-xs text-brandRed">{ item.status}</p> */}
                                {/* <span  class="px-2 leading-loose bg-green-700 font-bold text-white rounded-lg mt-3 p-2" style={{ fontSize: '12px' }}>
                                  <b>{ (item?.status === "active") ? 'Unpublish' : 'Publish' }</b>
                                </span> */}
                            </div>                                      
                            <div className="col-span-5 p-1 flex flex-row md:flex-cols gap-10">
                            
                            <div className="col-span-3 items-center justify-center mx-2">                                   
                                <div className="relative flex justify-center items-center">                                              
                                    <Icons iconName='eye' color="green"/>
                                    <div className="absolute flex justify-center items-center mt-12 text-black">                                                  
                                        <span className="font-semibold" style={{ fontSize: '14px' }}>{item.views}</span>
                                        {/* <span className="font-semibold" style={{ fontSize: '10px' }}>&nbsp;Product</span> */}
                                    </div>
                                </div> 
                            </div>
                            <div className="col-span-3 items-center justify-center">                        
                                
                                {/* { (item.messages_count > 0) && <> <Icons iconName='comment' color="blue"/> </> } */}
                                {   (item.messages_count > 0) ? 
                                    (                                                
                                        <div className="flex gap-2" onClick={() => { 
                                              setProductMessages(item.messages)
                                              advertState.setProductComments(item)
                                              advertState.setProductTitle(item.title)
                                              console.log(advertState.getProductTitle())
                                              console.log(advertState.getProductComments())
                                              setCloseCommentDialog(true)
                                            }  
                                        }>                                   
                                          <div className="relative flex justify-center items-center">                                              
                                              { (item.messages_count > 0) && <> <Icons iconName='comment' color="blue"/> </> }
                                              <div className="absolute flex justify-center items-center mt-12 text-black">                                                  
                                                  <span className="font-semibold" style={{ fontSize: '14px' }}>{item.messages_count}</span>
                                                  {/* <span className="font-semibold" style={{ fontSize: '10px' }}>&nbsp;Product</span> */}
                                              </div>
                                          </div> 
                                        </div>
                                    ) : 
                                    (                                                
                                      <div className="flex gap-2">                                   
                                        <div className="relative flex justify-center items-center">                                              
                                            { (item.messages_count > 0) && <> <Icons iconName='comment' color="blue"/> </> }
                                            <div className="absolute flex justify-center items-center mt-12 text-black">                                                  
                                                <span className="font-semibold" style={{ fontSize: '14px' }}>{item.messages_count}</span>
                                                {/* <span className="font-semibold" style={{ fontSize: '10px' }}>&nbsp;Product</span> */}
                                            </div>
                                        </div> 
                                      </div>
                                  )
                                }

                            </div>
                            <div className="col-span-1 items-center justify-center"> 
                                <div className="flex gap-2" onClick={() => { 
                                      setDeleteUrl(`ad/remove-wish-list/${item.id}`)
                                      setProductToDeleteMessage(`You are about to delete the product: ${item.title}`)
                                      setProductImages(item.avatar)
                                      setDeleteWishListModal(true)
                                    }  
                                }>                                     
                                  <div className="relative flex justify-center items-center">                                              
                                      <Icons iconName='delete' color="red"/>
                                      <div className="absolute flex justify-center items-center mt-12 text-black">                                                  
                                          <span className="font-semibold" style={{ fontSize: '14px' }}></span>
                                          <span className="font-semibold" style={{ fontSize: '10px' }}>Romove</span>
                                      </div>
                                  </div>
                                </div>  
                            </div>
                          </div>

                      </div>
                  </div>
                            
                      ))
                  }
          </div>

          <div className="mt-20">
                { 
                    !isLoading && !isRefetching && (data.product_advert?.wishList.length > 0) && 
                            <Pagination onClick={(data) => {
                                      setCurrentPage(data)
                                      console.log(data)
                                      console.log(currentPage)
                                      // setRefresh(data)
                                      // setPerPage(data.perPage)
                                      setTimeout(() => {
                                          refetch()   
                                      }, 1000)
                                      // do all the setting here and then refresh for new set of data rows
                                  } 
                              } 
                              perPageNo={perPage} 
                              currentPageNo={currentPage} 
                              noOfPages={data?.product_advert?.noOfPages} 
                              hasNextPage={data?.product_advert?.hasNextPage} 
                              hasPreviousPage={data?.product_advert?.hasPreviousPage} 
                              from={'blog'}
                          />    
                }
         </div>
  
        {/* {isLoading && (
          <div className="min-h-[320px] flex justify-center items-center text-brandGreen">
            {isMobile ? (
              <BeatLoader color="#1c9236" />
            ) : (
              <BounceLoader color="#1c9236" />
            )}
          </div>
        )} */}
  
        {/* {!isLoading && !isError && data?.length === 0 && (
          <div className="rounded-lg py-2 min-h-[320px] h-full">
            <div className="flex justify-center min-h-[320px] h-full items-center w-full ">
              <div className="text-center">
                <p className="mt-4 text-gray-500">Nothing Here</p>
  
                <Link
                  to="/"
                  className="inline-block px-5 py-2 mt-4 text-sm font-medium text-white bg-brandGreen/90 rounded hover:bg-brandGreen focus:outline-none focus:ring"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )} */}
  
        {/* {isError && (
          <>
            <div className="rounded-lg py-2 min-h-[320px] h-full">
              <div className="flex justify-center min-h-[320px] h-full items-center w-full ">
                <div className="text-center">
                  <p className="mt-4 text-gray-500">Nothing Here</p>
  
                  <Link
                    to="/"
                    className="inline-block px-5 py-2 mt-4 text-sm font-medium text-white bg-brandGreen/90 rounded hover:bg-brandGreen focus:outline-none focus:ring"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </>
        )} */}
  
  
        {/* <CreateOfficeTool onClick={() => setOpenModal(false) } openOfficeToolModal={openModal} /> */}
        {/* <DeleteModal onClick={() => setDeleteModal(false) } deleteModal={deleteOpenModal} deleteUrl={deleteUrl} returnTo={'activities'} message={productToDeleteMessage} /> */}
        {/* <ChangeProductImage onClick={() => setImageOpenModal(false) } imageModal={imageOpenModal} imageId={productTitle} imageUrl={productImages} mode="view" productId={productId}/>  */}
        {
          imageOpenModal && (productId != "")  && <ChangeProductImage onClick={(e) => {
                setImageOpenModal(false)
                refetch()
              }              
            } 
            imageModal={imageOpenModal} imageId={productTitle} imageUrl={productImages} mode="" productId={productId} />
        }

      {
          deleteWishListOpenModal && <DeleteWishList onClick={() => {
              refetch()
              setDeleteWishListModal(false)
          } } deleteWisListModal={deleteWishListOpenModal} deleteUrl={deleteUrl} returnTo={'/dashboard/store'} imageProductUrl={productImages} message={productToDeleteMessage} />
      }
        
  
      </>
    );
  }

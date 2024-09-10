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
import { ProductSold } from "@/components/ProductSold";

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
    {
      id: 6,
      name: "Sold",
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

          {active === 6 && <Sold />}

        </div>
      </div>
  );
}

export function Closed() 
{
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

export function Moderation() 
{
  const advertState = appStore((state) => state)

  const [currentPage, setCurrentPage] = useState(1)  
  const [perPage, setPerPage] = useState(20) 
  const { data, isLoading, refetch, isRefetching, isError }= useQuery(['pending-product'], () => pendingProduct(currentPage, perPage), { cacheTime: 0 })

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
    refetch()
}, [data, refresh, productId, productImages, deleteOpenModal])


useEffect(() => {
  refetch()
}, [refreshIt])


useEffect(() => {
}, [productMessages])

const { isMobile } = browserType();

const populateProductStore = (item) => 
{      
        advertState.setCountry(item?.country_id)
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
        advertState.setMileAge(item?.mileage)
        advertState.setFuelType(item?.fuel)
  }

  return (
    <>
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


      {
          deleteOpenModal && <DeleteModal onClick={() => setDeleteModal(false) } deleteModal={deleteOpenModal} deleteUrl={deleteUrl} returnTo={'/dashboard/store'} imageProductUrl={productImages} message={productToDeleteMessage} />
      }

      {
         imageOpenModal && (productId != "")  && <ChangeProductImage onClick={(e) => 
          { 
              setRefreshIt(e)
              setImageOpenModal(false) 
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

export function Sold() 
{
  const { data, isLoading, isError, refetch } = useQuery("sold", fetchSold, { cacheTime: 0 });

  const { isMobile } = browserType();
  const [theSoldId, setProductSoldId] = useState(-1)
  const [productImages, setProductImages] = useState("")
  const [productId, setProductId] = useState("")
  const [productSold, setIsProductSold] = useState(false)
  const navigate = useNavigate();

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {data &&
          data.length !== 0 &&
          data.map((item) => (
            <div
              key={item?.id}
              // onClick={() => navigate(`/ad/details/${item?.id}`)}
              className="h-[130px] bg-brandGreen/5 hover:bg-brandGreen/10 hover:shadow flex flex-col p-2 rounded-lg gap-2 justify-between"
            >
              <div className="flex items-center h-[90px] gap-5">
                <div className="h-full bg-gray-100 w-[190px] rounded-lg overflow-hidden">
                  <img
                    src={`${PRODUCT_FACE}${item?.avatar}`}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-sm sm:text-base -mt-2">
                  <h1 className="sm:text-md font-bold">{item?.title}</h1>
                  <p className="font-medium text-brandGreen">
                    {item?.price && currencyFormatter(item?.price)}
                  </p>
                  <p className="text-xs text-brandRed">{item?.state?.name}</p>
                </div>

                <div                
                  onClick={() => {
                    setProductSoldId(item.id)
                    setProductImages(item.avatar)
                    setIsProductSold(true)
                }}
                className="text-[12px] font-bold text-brandRed bg-green-800 mt-2 px-3 mr-3 py-1 rounded-md text-white hover:bg-green-500 cursor-pointer"
                >
                    UnSold
                </div>

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

      

      {
          productSold && <ProductSold onClick={() => { 
                                                setIsProductSold(false)
                                                refetch()
                                            }} productSold={productSold} isProductSold={theSoldId} returnTo={'/dashboard/store'}
                                            type='un-sold'
                                            imageProductUrl={productImages}
                                            message={'Confrom to UnSold Product'}
                                  />
      }
    </>
  );
}

export function Unposted()  
{
  const advertState = appStore((state) => state)

  const [currentPage, setCurrentPage] = useState(1)  
  const [perPage, setPerPage] = useState(20) 
  const { data, isLoading, refetch, isRefetching, isError }= useQuery(['draft-product'], () => draftProduct(currentPage, perPage), { cacheTime: 0 })

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
    refetch()
}, [data, refresh, productId, productImages, deleteOpenModal])


useEffect(() => {
  refetch()
}, [refreshIt])


useEffect(() => {
}, [productMessages])

const { isMobile } = browserType();

  
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
        advertState.setLocation(item?.location)
  }

  return (
    <>
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
                            
        
      </div>
      

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

      {
          deleteOpenModal && <DeleteModal onClick={() => setDeleteModal(false) } deleteModal={deleteOpenModal} deleteUrl={deleteUrl} returnTo={'/dashboard/store'} imageProductUrl={productImages} message={productToDeleteMessage} />
      }

      {
         imageOpenModal && (productId != "")  && <ChangeProductImage onClick={(e) => 
          { 
              setRefreshIt(e)
              setImageOpenModal(false) 
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
    const [perPage, setPerPage] = useState(20) 
    const { data, isLoading, refetch, isRefetching, isError } = useQuery(["get-all-draft-post"], () => publishedPost(currentPage, perPage), { staleTime: Infinity })

    const [refresh, setRefresh] = useState(0)
    const navigate = useNavigate();
    const [product, setProduct] = useState([])  
    const [deleteOpenModal, setDeleteModal] = useState(false)
    const [productSold, setIsProductSold] = useState(false)
    const [theSoldId, setProductSoldId] = useState(-1)
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
        refetch()
    }, [data, refresh, productId, productImages, deleteOpenModal])

    
    useEffect(() => {
      refetch()
    }, [refreshIt])

    
    useEffect(() => {
    }, [productMessages])

    const { isMobile } = browserType();

    const populateProductStore = (item) => 
    {  
        advertState.setCountry(item?.country_id)
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
        advertState.setMileAge(item?.mileage)
        advertState.setFuelType(item?.fuel_type)
        advertState.setLocation(item?.location)
        advertState.setOnEdit('yes')
    }


  return (
      <>
          <div 
              className="md:mt-0 lg:mt-0 -mb-5"
          >

              {isLoading && (
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
                  !isLoading && (data?.product_advert?.product.length > 0) && data?.product_advert?.product.map((productItem, index) => {
                      return (
                                <>
                                  <div
                                      className="h-[170px] md:block lg:block hidden bg-brandGreen/10 hover:bg-brandGreen/20 hover:shadow rounded-lg gap-2 justify-between py-5 px-2 pl-3 mb-3"
                                    >
                                      <div className="flex grid grid-cols-12 gap-5" style={{ paddingBottom: '10px' }}>
                                        <div className="col-span-3" style={{ marginBottom: '20px' }}>
                                            <img
                                                src={productItem?.avatar ? `${PRODUCT_FACE}${productItem?.avatar}` : ""}
                                                alt=""
                                                className="w-full h-[110px] object-cover cursor-pointer rounded-md p-1 bg-blue-300 mt-2"
                                                key={productItem.id}
                                                onClick={() => navigate(`/product/details/${productItem.id}`)}
                                                style={{marginTop: "-12px"}}
                                              />
                                        </div>
                                        <div className="col-span-4 px-2 pt-2">
                                            <h1 className="font-bold md:text-lg text-brandGreen sm:text-md">{productItem?.title}</h1>
                                            <p className="text-sm md:text-base text-blue-500 font-bold">
                                                {productItem?.price && currencyFormatter(productItem.price)}
                                            </p>
                                            {/* <p className="text-brandGreen font-bold">
                                              {productItem?.price && currencyFormatter(productItem.price)}
                                            </p> */}
                                            {/* <p className="text-xs text-brandRed">{ productItem.status}</p> */}
                                            {/* <span  class="px-2 leading-loose bg-green-700 font-bold text-white rounded-lg mt-3 p-2" style={{ fontSize: '12px' }}>
                                              <b>{ (productItem?.status === "active") ? 'Unpublish' : 'Publish' }</b>
                                            </span> */}
                                            <div 
                                                  className="d-flex justify-between pb-3"
                                            >                                                        
                                                <p className="text-md font-bold text-brandRed">{productItem?.state?.name}</p>
                                                <button 
                                                          className="text-[12px] font-bold text-brandRed bg-green-800 mt-2 px-3 py-1 rounded-md text-white hover:bg-green-500"
                                                          onClick={() => {
                                                              setProductSoldId(productItem.id)
                                                              setProductImages(productItem.avatar)
                                                              setIsProductSold(true)
                                                          }}
                                                >
                                                     Sold
                                                </button>
                                            </div>
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
                                                  console.log(productItem)
                                                  populateProductStore(productItem)
                                                  navigate(`${productItem.id}/edit/${productItem.country_id}/${productItem.make_id}/${productItem.model_id}`) // stateId, modelId, trimId
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
                                  </div>

                                  <div
                                      className="h-fit md:hidden lg:hidden bg-brandGreen/10 hover:bg-brandGreen/20 hover:shadow rounded-lg gap-2 justify-between pt-5 px-2 pl-3 pb-2 mb-3"
                                    >
                                        <div 
                                            className="d-flex mb-3"
                                        >
                                            <div className="d-flex w-full p-1">                
                                                <div className="w-full">
                                                    <img
                                                        src={productItem?.avatar ? `${PRODUCT_FACE}${productItem?.avatar}` : ""}
                                                        alt=""
                                                        className="w-full h-fit object-cover cursor-pointer rounded-md p-1 bg-blue-300"
                                                        key={productItem.id}
                                                        onClick={() => navigate(`/product/details/${productItem.id}`)}
                                                    />
                                                </div>

                                                <div className="w-full p-1">
                                                    <p className="font-bold md:text-md text-lg text-brandGreen mb-1 mt-2">{productItem?.title}</p>
                                                    <p className="text-lg md:text-md text-blue-500 font-bold mb-1">
                                                        {productItem?.price && currencyFormatter(productItem.price)}
                                                    </p>
                                                    <div 
                                                          className="flex justify-between pb-3"
                                                    >                                                        
                                                        <p className="text-md font-bold text-brandRed">{productItem?.state?.name}</p>
                                                        <button 
                                                            className="text-[12px] font-bold text-brandRed bg-green-800 mt-2 px-3 py-2 rounded-md text-white hover:bg-green-500"
                                                            onClick={() => {
                                                                setProductSoldId(productItem.id)
                                                                setProductImages(productItem.avatar)
                                                                setIsProductSold(true)
                                                            }}
                                                        >
                                                            Sold
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="p-2 mb-2 bg-white rounded-md bg-white">
                                                <div className="grid grid-cols-12 justify-between pl-5">   
                                                    <div className="col-span-3 h-[50px]"> 
                                                            <div className="flex gap-1">
                                                            <span className="flex delete cursor-pointer pl-3" style={{zIndex: 0}} onClick={(e) => 
                                                                { 
                                                                    setProductTitle(`${productItem.title}`)
                                                                    advertState.setProductId(productItem.id)
                                                                    advertState.setImageOnEdit(productItem.images)
                                                                    setProductImages(productItem.images)
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
                                                    <div className="col-span-2"> 
                                                                    <div className="flex gap-2" onClick={() => { 
                                                                            populateProductStore(productItem)
                                                                            navigate(`${productItem.id}/edit/${productItem.country_id}/${productItem.make_id}/${productItem.model_id}`) // stateId, modelId, trimId
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
                                                    <div className="col-span-3">                                   
                                                                    <div className="relative flex justify-center items-center">                                              
                                                                        <Icons iconName='eye' color="green"/>
                                                                        <div className="absolute flex justify-center items-center mt-12 text-black">                                                  
                                                                            <span className="font-semibold" style={{ fontSize: '14px' }}>{productItem.views}</span>
                                                                        </div>
                                                                    </div> 
                                                    </div>
                                                    <div className="col-span-2">  
                                                                    {   (productItem.messages_count > 0) ? 
                                                                        (                                                
                                                                            <div className="flex gap-2" onClick={() => { 
                                                                                    setProductMessages(productItem.messages)
                                                                                    advertState.setProductComments(productItem)
                                                                                    advertState.setProductTitle(productItem.title)
                                                                                    setCloseCommentDialog(true)
                                                                                }  
                                                                            }>                                   
                                                                                <div className="relative flex justify-center items-center">                                              
                                                                                    { (productItem.messages_count > 0) && <> <Icons iconName='comment' color="blue"/> </> }
                                                                                    <div className="absolute flex justify-center items-center mt-12 text-black">                                                  
                                                                                        <span className="font-semibold" style={{ fontSize: '14px' }}>{productItem.messages_count}</span>
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
                                                                                </div>
                                                                            </div> 
                                                                            </div>
                                                                        )
                                                                    }
                                                    </div>
                                                    <div 
                                                            className="col-span-2"> 
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
                                                                    </div>  
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                  </div>
                                </>
                      )
                  })
              }

          
              {/* {
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
              } */}

              <div 
                  className="mt-20"
              >
                { 
                    !isLoading && !isRefetching && (data?.product_advert?.product.length > 0) && 
                            <Pagination onClick={(data) => {
                                      setCurrentPage(data)
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
                            
      </div>

      
      {
          deleteOpenModal && <DeleteModal onClick={() => setDeleteModal(false) } 
                                  deleteModal={deleteOpenModal} 
                                  deleteUrl={deleteUrl} returnTo={'/dashboard/store'} 
                                  imageProductUrl={productImages} 
                                  message={productToDeleteMessage} 
                            />
      }

      {
          productSold && <ProductSold onClick={() => { 
                                                refetch()
                                                setIsProductSold(false)
                                            }} productSold={productSold} isProductSold={theSoldId} returnTo={'/dashboard/store'}
                                            imageProductUrl={productImages}
                                            type='sold'
                                            message={'Confrom Sold Product'}
                                  />
      }

      {
         imageOpenModal && (productId != "")  && <ChangeProductImage onClick={(e) => 
          { 
              setRefreshIt(e)
              setImageOpenModal(false) 
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
    const [perPage, setPerPage] = useState(20) 

    const { data, isLoading, refetch, isRefetching, isError } = useQuery(["user-watch-list"], () => UserWatchList(currentPage, perPage), { cacheTime: 0 })

    
    const navigate = useNavigate();
    
    const [imageOpenModal, setImageOpenModal] = useState(false)
    const [productTitle, setProductTitile] = useState(false)
    const [productImages, setProductImages] = useState("")
    const [productId, setProductId] = useState("")
    const [deleteWishListOpenModal, setDeleteWishListModal] = useState(false)
    const [deleteUrl, setDeleteUrl] = useState("") 
    const [productToDeleteMessage, setProductToDeleteMessage] = useState("")

    const { isMobile } = browserType();
  
    return (
      <>
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
                      <>
                      <div
                          className="md:block hidden h-[130px] bg-brandGreen/10 hover:bg-brandGreen/20 hover:shadow rounded-lg gap-2 justify-between py-5 px-2 pl-3 pb-10 mb-3"
                        >
                        <div className="grid grid-cols-12 gap-5" style={{ paddingBottom: '10px' }}>
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
                                  <p className="text-xs text-brandRed mb-2">{item?.state?.name}</p>
                              </div>                                      
                              <div className="col-span-5 p-1 flex flex-row md:flex-cols gap-10">
                              
                              <div className="col-span-3 items-center justify-center mx-2">                                   
                                  <div className="relative flex justify-center items-center">                                              
                                      <Icons iconName='eye' color="green"/>
                                      <div className="absolute flex justify-center items-center mt-12 text-black">                                                  
                                          <span className="font-semibold" style={{ fontSize: '14px' }}>{item.views}</span>
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
                      <div
                          className="block md:hidden h-fit bg-brandGreen/10 hover:bg-brandGreen/20 hover:shadow -mt-10 rounded-lg gap-2 justify-between py-5 px-2 pl-3 pb-10 mb-3"
                        >
                        <div className="grid grid-cols-12 gap-5" style={{ paddingBottom: '5px' }}>
                              <div className="col-span-12">
                                <div className="w-full"
                                  >
                                    <img
                                          src={item.avatar ? `${PRODUCT_FACE}${item?.avatar}` : ""}
                                          alt=""
                                          className="object-cover cursor-pointer rounded-md p-1 bg-blue-300"
                                          key={item.id}
                                          onClick={() => navigate(`/product/details/${item.id}`)}
                                      />
                                </div>
                              </div>
                              <div 
                                  className="col-span-12 -mt-2"
                              >
                                <div className="w-full p-2">
                                    <h1 className="font-bold md:text-base text-brandGreen sm:text-md" style={{ fontSize: '20px' }}>{item?.title}</h1>
                                    <p className="text-lg mt-1 md:text-base text-blue-500 font-bold">
                                        {item?.price && currencyFormatter(item.price)}
                                    </p>
                                    <p className="text-md text-brandRed">{item?.state?.name}</p>
                                </div>                                      
                                <div 
                                    className="w-full bg-green-50 p-5 pb-10 rounded-lg flex flex-row md:flex-cols gap-10"
                                >
                                
                                  <div className="col-span-3 items-center justify-center mx-2">                                   
                                      <div className="relative flex justify-center items-center">                                              
                                          <Icons iconName='eye' color="green"/>
                                          <div className="absolute flex justify-center items-center mt-12 text-black">                                                  
                                              <span className="font-semibold" style={{ fontSize: '14px' }}>{item.views}</span>
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
                     </div>
                    </>
                            
                      ))
                  }
          </div>

          <div className="mt-20">
                { 
                    !isLoading && !isRefetching && (data.product_advert?.wishList.length > 0) && 
                            <Pagination onClick={(data) => {
                                      setCurrentPage(data)
                                      setTimeout(() => {
                                          refetch()   
                                      }, 1000)
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

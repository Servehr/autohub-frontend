import MaxWidthWrapper from "@/components/max-width-wrapper";
import { useQuery } from "react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import caution from "@/assets/icons/caution.svg";
import { formatDate } from "@/utils/ad";
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
import { fetchUserProduct } from "@/apis/ads";
import { fetchAllRequiredData } from "@/apis/misc";
import { getYearsArray } from "@/utils/misc";
import { appStore } from "@/state/appState";
import { updateAds } from "@/apis/ads";
import EditProductImage from "@/components/EditProductImage";
import { SuccessModal } from "@/components/SuccessModal";
import ReactQuill from 'react-quill'

export default function EditProduct() 
{
  const navigate = useNavigate();
  
  const { id } = useParams();
  
  const { data: allRequiredData, isLoading: isRequiredDataLoading } = useQuery(["required-data", id], () => fetchAllRequiredData(id), { refetchOnWindowFocus: false, staleTime: Infinity, retry: 2 });

  const advertState = appStore((state) => state)
  const years = getYearsArray();

  if(!allRequiredData)
  {
     console.log(allRequiredData)
  }


  const [selectedMaker, setSelectedMaker] = useState(0);
  const [selectedModel, setSelectedModel] = useState([]);
  
  const [deleteOpenModal, setDeleteModal] = useState(false)
  const [ deleteUrl, setDeleteUrl] = useState("") 
  const [ productToDeleteMessage, setProductToDeleteMessage] = useState("")

  const [ theCountry, setTheCountry] = useState(advertState.getCountry())
  const [ theState, setTheState] = useState(advertState.getStates())
  const [ theCategory, setTheCategory] = useState(advertState.getCateg())
  const [ theManufacturer, setTheManufacturer] = useState(advertState.getMaker())
  const [ theModel, setTheModel] = useState(advertState.getModel())
  const [ theProductionYear, setTheProductionYear] = useState(advertState.getYearOfPoduction())
  const [ theColour, setTheColour] = useState(advertState.getColour())
  const [ theTransmission, setTheTransmission] = useState(advertState.getTransmission())
  const [ theCondition, setTheCondition] = useState(advertState.getCondition())
  const [ theTrim, setTheTrim] = useState(advertState.getTrim())
  const [ theDescription, setTheDescription] = useState(advertState.getDescription())
  const [ theChasisNo, setTheChasisNo] = useState(advertState.getChasisNumber())
  const [ thePrice, setThePrice] = useState(advertState.getPrice())
  const [ theFuel, setTheFuel] = useState(advertState.getFuelType())
  const [ theMileAge, setTheMileAge] = useState(advertState.getMileAge())

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setIsSuccess] = useState("");
  const [successModal, setSuccessModal] = useState(false)

  const [selectedCarModelOption, setCarSelectedModelGroupOption] = useState(false)
  const tellData = (x) => 
  {
      const filteredModel = allRequiredData?.model && allRequiredData?.model?.filter((item) => item.make_id === Number(x))
      setSelectedModel(filteredModel)
      console.log(filteredModel)
  }
  console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk")
  console.log(theState)
  console.log(theCategory)
  console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk")
  const [selectedCarModel, setCarSelectedModelGroup] = useState("");

//   const userSelectedModel = localStorage.getItem("modelId")
//   console.log(allRequiredData)
//   setCarSelectedModelGroup(allRequiredData?.model)

  const updateAdvertDetail = () => 
  {
      setLoading(true)
      const advertDetail = { 
                                state: theState, category: theCategory, maker: theManufacturer, model: theModel, year_of_production: theProductionYear, 
                                colour: theColour, transmission: theTransmission, condition: theCondition, trim: theTrim, description: theDescription, 
                                chasis_number: theChasisNo, price: thePrice, productId: allRequiredData?.userProductDetail?.id, mileage: theMileAge, fuel: theFuel, country: theCountry
                            }   
    console.log(advertDetail)
    updateAds(advertDetail)
      .then((res) => {
            setError(false)
            setLoading(false);
            console.log(res)
            setIsSuccess(res.message)
            clearProductStore()
            setSuccessModal(true)            
            setTimeout(() => {
                advertState.setRefresh(Math.random())
                setSuccessModal(false)
                navigate('/dashboard/store')
            }, 2000)
      })
      .catch((err) => {
        setIsSuccess("")
        console.log(err)
        setLoading(false);
        setError(`${err}`);
      });
  }
  
  const [value, setValue] = useState(advertState.getDescription())
  const modules = {
      toolbar: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ font: [] }],
          [{ size: [] }],          
          [ "bold", "italic", "underline" ],
          [ "link"]
        //   [ 
        //       { list: "ordered" },
        //       { list: "bullet" },
        //       { list: "-1" },
        //       { list: "+1" },
        //   ],
        //   [ "link"]
      ],
  }

  useEffect(() => {
        setTheDescription(value)   
        advertState.setDescription(value)
  }, [value])

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
        console.log("=======================")
        console.log(advertState.getStates())
        console.log("=======================")
        advertState.setMileAge(item?.mileage)
    advertState.setFuelType(item?.fuel)
  }

  const clearProductStore = () => 
  {      
     advertState.setStates(-1)
     advertState.setCateg(-1)
     advertState.setMaker(-1)
     advertState.setModel(-1)
     advertState.setColour(-1)
     advertState.setYearOfPoduction("")
     advertState.setTransmission(-1)
     advertState.setCondition(-1)
     advertState.setChasisNumber("")
     advertState.setTrim(-1)
     advertState.setDescription("")
     advertState.setPrice("")
     advertState.setPlan_id(0)
     advertState.setOthers("")
     advertState.setAvatar([])
     advertState.setOnEdit('no')
     advertState.setTheModelName("")
     advertState.setTheManufacturerName("")
     advertState.setCountry(-1)
     advertState.setMileAge("")
     advertState.setFuelType("")
   }


    return (
        <>
            

            {
                isRequiredDataLoading && <div className="h-[500px] flex justify-center items-center" style={{ marginTop: '30px', paddingTop: '20px' }}>
                    <BeatLoader color="#1c9236" />
                </div>
            }
            
            { !isRequiredDataLoading && (
                
                    <main className="mb-30 md:-mt-5" style={{ marginTop: '100px' }}>

                        <div className="mt-3 mb-2 ml-3">
                            <span className="font-bold text-blue-600">UPDATE ADS</span>
                        </div>

                        {/* <MaxWidthWrapper> */}
                            <div className='md:w-12/12 lg:12/12 w-12/12 lg:flex-row'>

                                        <div className="p-1">
                                            {/* <div className="w-full bg-blue-200 px-5 py-3 pb-5 -mt-2 font-bold">{`You are about editing ${data.title}`}</div> */}
                                        </div>

                                        <div className="p-1 -mt-3">
                                            <div className="grid md:grid-cols-12 grid-cols-12 gap-5 mt-1 justify-center">
                                                
                                                <div className="md:col-span-12 col-span-12 bg-white p-3 order-2 md:order-1">

                                                    
                                                    <div className="flex flex-wrap -m-2 mt-2">
                                                        <div className="p-2 md:w-1/2 w-full">
                                                            <div className="mb-4">
                                                                <div className="relative">
                                                                    <span className="w-full font-bold text-sm">Country</span>
                                                                    <select onChange={
                                                                        (e) => {
                                                                            advertState.setCountry(e.target.value)
                                                                            setTheCountry(Number(e.target.value))
                                                                        }
                                                                        } className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                                                        {   
                                                                            allRequiredData?.countries &&
                                                                            allRequiredData?.countries?.length !== 0 &&
                                                                            allRequiredData?.countries.map((country) => (
                                                                                <option key={country.id} value={country.id} selected={(country.id === advertState.getCountry())}>
                                                                                    {country.name}
                                                                                </option>
                                                                            ))
                                                                        }
                                                                    </select>
                                                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 mt-5">
                                                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="p-2 md:w-1/2 w-full">
                                                            <div className="mb-4">
                                                                <div className="relative">
                                                                    <span className="w-full font-bold text-sm">State</span>
                                                                    <select onChange={
                                                                        (e) => {
                                                                            advertState.setStates(e.target.value)
                                                                            setTheState(Number(e.target.value))
                                                                        }
                                                                        } className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                                                        {   
                                                                            allRequiredData?.state &&
                                                                            allRequiredData?.state?.length !== 0 &&
                                                                            allRequiredData?.state.map((state) => (
                                                                                <option key={state.id} value={state.id} selected={(state.id === advertState.getStates())}>
                                                                                    {state.name}
                                                                                </option>
                                                                            ))
                                                                        }
                                                                    </select>
                                                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 mt-5">
                                                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="flex flex-wrap -m-2 mt-2">
                                                        <div className="p-2 md:w-1/2 w-full">
                                                            <div className="mb-4">
                                                                <div className="relative">
                                                                <span className="w-full font-bold text-sm">Category</span>
                                                                <select onChange={(e) => { 
                                                                        advertState.setCateg(e.target.value)
                                                                        setTheCategory(Number(e.target.value))}
                                                                    }className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                                                {   
                                                                    allRequiredData?.category &&
                                                                    allRequiredData?.category?.length !== 0 &&
                                                                    allRequiredData?.category.map((category) => (
                                                                        <option key={category.id} value={category.id} selected={category.id === advertState.getCateg()}>
                                                                            {category.name}
                                                                        </option>
                                                                    ))
                                                                }
                                                                </select>
                                                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 mt-5">
                                                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                                                </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="p-2 md:w-1/2 w-full">
                                                            <div className="mb-4">
                                                                <div className="relative">
                                                                <span className="w-full font-bold text-sm">Manufacturer</span>
                                                                <select onChange={
                                                                    (e) => {    
                                                                        advertState.setMaker(e.target.value)
                                                                        setTheManufacturer(e.target.value)
                                                                        setSelectedMaker(e.target.value)
                                                                        setCarSelectedModelGroupOption(true)
                                                                        tellData(e.target.value)   
                                                                        }
                                                                    } className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                                                    {
                                                                        allRequiredData?.maker && 
                                                                        allRequiredData?.maker?.length !== 0 &&
                                                                        allRequiredData?.maker.map((maker) => (
                                                                        <option key={maker.id} value={maker.id} selected={maker.id === advertState.getMaker() }>
                                                                            {maker.title}
                                                                        </option>
                                                                        ))
                                                                    }
                                                                </select>
                                                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 mt-5">
                                                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                                                </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="flex flex-wrap -m-2 mt-2">
                                                        <div className="p-2 md:w-1/2 w-full">
                                                            <div className="mb-4">
                                                                <div className="relative">
                                                                <span className="w-full font-bold text-sm">Model</span>
                                                                { !selectedCarModelOption &&                                                                    
                                                                    <select onChange={(e) =>{ 
                                                                            advertState.setModel(e.target.value)
                                                                            setTheModel(Number(e.target.value))
                                                                        }
                                                                        } className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                                                        {
                                                                            
                                                                            allRequiredData?.model &&
                                                                            allRequiredData?.model?.length != 0 &&
                                                                            allRequiredData?.model.map((model) => (
                                                                                <option key={model.code} value={model.id} selected={model.id === advertState.getModel()}>
                                                                                    {model.title}
                                                                                </option>
                                                                            ))
                                                                        }
                                                                    </select>
                                                                }
                                                                { selectedCarModelOption &&    
                                                                    <select onChange={(e) =>{ 
                                                                            advertState.setModel(e.target.value)
                                                                            setTheModel(Number(e.target.value))
                                                                        }
                                                                        } className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                                                        {
                                                                            
                                                                            selectedModel &&
                                                                            selectedModel?.length != 0 &&
                                                                            selectedModel.map((model) => (
                                                                                <option key={model.code} value={model.id} selected={model.id === advertState.getModel()}>
                                                                                    {model.title}
                                                                                </option>
                                                                            ))
                                                                        }
                                                                    </select>
                                                                }
                                                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 mt-5">
                                                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                                                </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="p-2 md:w-1/2 w-full">
                                                            <div className="mb-4">
                                                                <div className="relative">
                                                                <span className="w-full font-bold text-sm">Trim</span>
                                                                <select onChange={(e) => { 
                                                                    advertState.setTrim(e.target.value)
                                                                    setTheTrim(e.target.value) } 
                                                                } className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                                                {
                                                                    allRequiredData?.trim &&
                                                                    allRequiredData?.trim?.length !== 0 &&
                                                                    allRequiredData?.trim.map((trim) => (
                                                                        <option key={trim.id} value={trim.id} selected={trim.id === advertState.getTrim()}>
                                                                            {trim.name}
                                                                        </option>
                                                                    ))
                                                                }
                                                                </select>
                                                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 mt-5">
                                                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                                                </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="flex flex-wrap -m-2 mt-2">
                                                        <div className="p-2 md:w-1/2 w-full">
                                                            <div className="mb-4">
                                                                <div className="relative">
                                                                <span className="w-full font-bold text-sm">Fuel Type</span>
                                                                { !selectedCarModelOption &&                                                                    
                                                                    <select onChange={(e) =>{ 
                                                                            advertState.setModel(e.target.value)
                                                                            setTheModel(Number(e.target.value))
                                                                        }
                                                                        } className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                                                        {
                                                                            
                                                                            allRequiredData?.fuel &&
                                                                            allRequiredData?.fuel?.length != 0 &&
                                                                            allRequiredData?.fuel.map((fuelType) => (
                                                                                <option key={fuelType.code} value={fuelType.id} selected={fuelType.id === advertState.getFuelType()}>
                                                                                    {fuelType.name}
                                                                                </option>
                                                                            ))
                                                                        }
                                                                    </select>
                                                                }
                                                                { selectedCarModelOption &&    
                                                                    <select onChange={(e) =>{ 
                                                                            advertState.setModel(e.target.value)
                                                                            setTheModel(Number(e.target.value))
                                                                        }
                                                                        } className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                                                        {
                                                                            
                                                                            selectedModel &&
                                                                            selectedModel?.length != 0 &&
                                                                            selectedModel.map((model) => (
                                                                                <option key={model.code} value={model.id} selected={model.id === advertState.getModel()}>
                                                                                    {model.title}
                                                                                </option>
                                                                            ))
                                                                        }
                                                                    </select>
                                                                }
                                                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 mt-5">
                                                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                                                </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="p-2 md:w-1/2 w-full">
                                                            <div className="mb-4">
                                                                <div className="relative">
                                                                <span className="w-full font-bold text-sm">Production Year</span>
                                                                <select onChange={(e) => { 
                                                                        advertState.setYearOfPoduction(e.target.value)
                                                                        setTheProductionYear(e.target.value) 
                                                                    } } className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                                                {
                                                                    years &&
                                                                    years?.length !== 0 &&
                                                                    years.map((year) => (
                                                                        <option key={year} value={year} selected={year === Number(advertState.getYearOfPoduction())}>
                                                                          {year}
                                                                        </option>
                                                                    ))
                                                                }
                                                                </select>
                                                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 mt-5">
                                                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                                                </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="flex flex-wrap -m-2 mt-2">
                                                        <div className="p-2 md:w-1/2 w-full">
                                                            <div className="mb-4">
                                                                <div className="relative">
                                                                <span className="w-full font-bold text-sm">Colour</span>
                                                                <select onChange={(e) =>{                                                                          
                                                                        advertState.setColour(e.target.value)                                                                    
                                                                        setTheColour(e.target.value) 
                                                                    } 
                                                                }className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                                                {
                                                                    allRequiredData?.colour &&
                                                                    allRequiredData?.colour?.length !== 0 &&
                                                                    allRequiredData?.colour.map((colour) => (
                                                                        <option key={colour.id} value={colour.id} data-id={colour.name} selected={colour.id === Number(advertState.getColour()) }>
                                                                            {colour.name}
                                                                        </option>
                                                                    ))
                                                                }
                                                                </select>
                                                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 mt-5">
                                                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                                                </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="p-2 md:w-1/2 w-full">
                                                            <div className="mb-4">
                                                                <div className="relative">
                                                                <span className="w-full font-bold text-sm">Transmission</span>
                                                                <select onChange={(e) => {    
                                                                        advertState.setTransmission(e.target.value)
                                                                        setTheTransmission(e.target.value)
                                                                    } 
                                                                }  className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                                                {
                                                                    allRequiredData?.transmission &&
                                                                    allRequiredData?.transmission?.length !== 0 &&
                                                                    allRequiredData?.transmission.map((transmission) => (
                                                                        <option key={transmission.id} value={transmission.id} selected={transmission.id === advertState.getTransmission()}>
                                                                            {transmission.name}
                                                                        </option>
                                                                    ))
                                                                } 
                                                                </select>
                                                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 mt-5">
                                                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                                                </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-wrap -m-2 mt-2">
                                                        <div className="p-2 md:w-1/2 w-full">
                                                            <div className="mb-4">
                                                                <div className="relative">
                                                                <span className="w-full font-bold text-sm">Condition</span>
                                                                <select onChange={(e) => { 
                                                                        advertState.setCondition(e.target.value)
                                                                        setTheCondition(e.target.value)
                                                                    } 
                                                                } className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                                                {
                                                                    allRequiredData?.condition &&
                                                                    allRequiredData?.condition?.length !== 0 &&
                                                                    allRequiredData?.condition.map((condition) => (
                                                                        <option key={condition.id} value={condition.id} selected={condition.id === Number(advertState.getCondition())}>
                                                                            {condition.name}
                                                                        </option>
                                                                    ))
                                                                }
                                                                </select>
                                                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 mt-5">
                                                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                                                </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="p-2 md:w-1/2 w-full">
                                                            <div className="mb-4">
                                                                <div className="relative">
                                                                <span className="w-full font-bold text-sm">MileAge</span>
                                                                <input onBlur={(e) => {
                                                                    advertState.setMileAge(e.target.value)
                                                                    setTheMileAge(e.target.value)
                                                                }} type="text" id="vin" defaultValue={advertState.getMileAge()}  name="vin" placeholder="VIN chasis number (Optional)" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 text-sm py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                                            </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-wrap -m-2 mt-5 md:mb-10 mb-20 p-2">
                                                        <span className="w-full font-bold text-sm">Description</span>
                                                        <ReactQuill theme="snow" defaultValue={value} onChange={setValue} className="w-full h-[150px]" modules={modules} />
                                                        {/* <textarea onKeyUp={(e) => { 
                                                                advertState.setDescription(e.target.value)
                                                                setTheDescription(e.target.value)
                                                            } 
                                                            } defaultValue={advertState.getDescription()} className="shadow form-textarea mb-2 block w-full border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" rows="2" placeholder="Enter Description"></textarea> */}
                                                    </div>

                                                    <div className="flex flex-wrap -m-2 mt-2 mb-5">
                                                        <div className="p-2 md:w-1/2 w-full">
                                                            <span className="w-full font-bold text-sm">Chasis Number</span>
                                                            <input onBlur={(e) => {
                                                                    advertState.setChasisNumber(e.target.value)
                                                                    setTheChasisNo(e.target.value)
                                                            }} type="text" id="vin" defaultValue={advertState.getChasisNumber()}  name="vin" placeholder="VIN chasis number (Optional)" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 text-sm py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                                        </div>
                                                        <div className="p-2 md:w-1/2 w-full">
                                                            <span className="w-full font-bold text-sm">Price</span>
                                                            <input onKeyUp={(e) => {    
                                                                    advertState.setPrice(e.target.value)
                                                                    setThePrice(e.target.value)} 
                                                            } type="text" id="price" defaultValue={advertState.getPrice()} name="price" placeholder="Price (₦)" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 text-sm leading-8 transition-colors duration-200 ease-in-out" />
                                                        </div>
                                                    </div>
                                                    {/* <div className="grid md:grid-cols-12 grid-cols-12 gap-5 md:p-3 mb-5 justify-center items-center border border-2 rounded-lg">
                                                        <div className="col-span-6">
                                                            <button className="bg-green-600 border border-4 border-blue-200 border-dotted text-white font-medium text-sm py-4 w-full px-6 rounded-md gap-2 hover:bg-blue-700">
                                                                Free (₦) 0.00
                                                            </button>
                                                        </div>
                                                        <div className="col-span-6">
                                                            <button className="bg-green-600 border border-4 border-blue-200 border-dotted text-white font-medium text-sm py-4 w-full px-6 rounded-md gap-2 hover:bg-blue-700">
                                                                Premium (₦) 35, 000.00
                                                            </button>
                                                        </div>
                                                    </div> */}
                                                    <div className={`transition duration-300 w-full ${(success == "") && "hidden"}`}>
                                                        <div
                                                            className={`bg-green-500/10 border-green-500/80 border w-full flex justify-center p-2`}
                                                        >
                                                            <p className=" w-max text-center text-xs text-[#D10000]">{success}</p>
                                                        </div>
                                                    </div>
                                                    <div className={`transition duration-300 w-full ${!error && "hidden"}`}>
                                                        <div
                                                            className={`bg-red-500/10 border-red-500/80 border w-full flex justify-center p-2`}
                                                        >
                                                            <p className=" w-max text-center text-xs text-[#D10000]">{error}</p>
                                                        </div>
                                                    </div>
                                                    <div className="px-1 py-2 -mt-2">
                                                        {/* {
                                                            (data?.category_id == theCategory) && 
                                                                <button className="bg-primary text-white font-medium text-sm py-2.5  px-6 rounded-md flex items-center gap-2 hover:bg-blue-700" style={{backgroundColor: "#1e3a8a"}}>
                                                                    Update
                                                                </button>
                                                        } */}
                                                        <button onClick={updateAdvertDetail} className="bg-brandGreen text-white font-semibold px-4 py-3 rounded disabled:bg-brandDarkGray" style={{backgroundColor: "#1e3a8a"}}>
                                                            {loading ? <BeatLoader size={10} color="#fff" /> : "Update Store"}
                                                        </button>
                                                    </div>

                                                    <div className="p-5"></div>

                                                </div>

                                                {/* <div className="md:col-span-4 col-span-12 bg-white p-4 rounded-lg shadow-lg order-1 order-1 md:order-2"> */}
                                                    {/* <div className="card"> */}
                                                        {/* <div className="top">
                                                            <p>Upload Vehicle Images</p>
                                                        </div>
                                                        <div className="drag-area p-3 items-center text-center flex justify-center">
                                                            {
                                                                (true === true) ? (
                                                                    <span className="select">Drop Image Here</span>
                                                                ) : (
                                                                    <>
                                                                        
                                                                        <span className="flex select justify-center items-center text-xs block" role="button">
                                                                            <b class="px-10 py-5">Browse</b>
                                                                            <input type="file" name="file" className="file" multiple onChange={selectMultipleFiles} />
                                                                        </span>
                                                                    </>
                                                                )                                        
                                                            }
                                                        </div> */}
                                                        {/* <div className="grid md:grid-cols-12 gap-5 pt-3">
                                                            <EditProductImage data={data} />
                                                        </div> */}
                                                    {/* </div> */}
                                                {/* </div> */}
                                            </div>
                                        </div>

                            </div>
                        {/* </MaxWidthWrapper> */}

                        <SuccessModal onClick={() => setSuccessModal(false) } successModal={successModal} returnTo={''} message={'Product Successfully Updated'} />
                    </main>
                )
            }
        </>
    );
}

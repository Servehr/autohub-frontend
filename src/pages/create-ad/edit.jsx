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
import { fetchAllRequiredData, fetchAllRequiredDataForEdit } from "@/apis/misc";
import { getYearsArray } from "@/utils/misc";
import { appStore } from "@/state/appState";
import { updateAds, saveAdvert } from "@/apis/ads";
import EditProductImage from "@/components/EditProductImage";
import { SuccessModal } from "@/components/SuccessModal";
import ReactQuill from 'react-quill'
import Header from "@/layouts/header";
import axios from "axios";
import { BASE_URL } from "@/lib/axios";


function randomNumber()
{
    return Math.floor(Math.random() * 19453 * 86559)
}

function randomNumb()
{
    return Math.floor(Math.random() * 89874212 * 4958685)
}

export default function EditProduct() 
{
  const navigate = useNavigate();
  const { id } = useParams();
  const { country_id } = useParams();
  const { make_id } = useParams();
  const { model_id } = useParams();
  const a = randomNumber()
  const b = randomNumb()

//   alert(a)

  
  const advertState = appStore((state) => state)
  const years = getYearsArray()

  const [selectedMaker, setSelectedMaker] = useState(0);
  const [selectedModel, setSelectedModel] = useState(advertState.getTheMakerModels());
  const [selectedStates, setSelectedStates] = useState(advertState.getStateModel());
  const [selectedTrim, setSelectedTrim] = useState(advertState.getTheModelTrim());
  const [noMakerOption, setNoMakerOption] = useState(false);
  const [msg, setMsg] = useState("")

  const [theCountry, setTheCountry] = useState(advertState.getCountry())
  const [theState, setTheState] = useState(advertState.getStates())
  const [theCategory, setTheCategory] = useState(advertState.getCateg())
  const [theManufacturer, setTheManufacturer] = useState(advertState.getMaker())
  const [theModel, setTheModel] = useState(advertState.getModel())
  const [theProductionYear, setTheProductionYear] = useState(advertState.getYearOfPoduction())
  const [theColour, setTheColour] = useState(advertState.getColour())
  const [theFuelType, setFuelType] = useState(advertState.getFuelType())
  const [theMileAge, setTheMileAge] = useState(advertState.getMileAge())
  const [theTransmission, setTheTransmission] = useState(advertState.getTransmission())
  const [theCondition, setTheCondition] = useState(advertState.getCondition())
  const [theTrim, setTheTrim] = useState(advertState.getTrim())
  const [theDescription, setTheDescription] = useState(advertState.getDescription())
  const [theChasisNo, setTheChasisNo] = useState(advertState.getChasisNumber())
  const [thePrice, setThePrice] = useState(advertState.getPrice())
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setIsSuccess] = useState("")
  const [theOthers, setTheOthers] = useState(advertState.getOthers())
  const [successModal, setSuccessModal] = useState(false)

  const [selectedCarModelOption, setCarSelectedModelGroupOption] = useState(false)
  const [selectManufacturer, setTheSelectManufacturer] = useState(true)

  const [countryErrorMsg, setCountryErrorMsg] = useState("")
  const [stateErrorMsg, setStateErrorMsg] = useState("")
  const [categoryErrorMsg, setCategoryErrorMsg] = useState("")
  const [makerErrorMsg, setMakerErrorMsg] = useState("")
  const [modelErrorMsg, setModelErrorMsg] = useState("")
  const [productionYearErrorMsg, setProductionYearErrorMsg] = useState("")
  const [colorErrorMsg, setColorErrorMsg] = useState("")
  const [fuelTypeErrorMsg, setFuelTypeErrorMsg] = useState("")
  const [mileAgeError, setTheMileAgeError] = useState("")
  const [transmissionErrorMsg, setTransmissionErrorMsg] = useState("")
  const [conditionErrorMsg, setConditionErrorMsg] = useState("")
  const [trimErrorMsg, setTrimErrorMsg] = useState("")
  const [descriptionErrorMsg, setDescriptionErrorMsg] = useState("")
  const [priceErrorMsg, setPriceErrorMsg] = useState("")
  const [entryErrorMsg, setEntryErrorMsg] = useState("")
  const [mainImageErrorMsg, setMainImageErrorMsg] = useState("")
  const [formValid, setFormValid] = useState("no")
  const [fillForm, setFillForm] = useState("")

  const [chooseAnotherState, setChooseAnotherState] = useState(false)
  const [chooseAnotherModel, setChooseAnotherModel] = useState(false)
  const [chooseAnotherTrim, setChooseAnotherTrim] = useState(false)
  const [changingTrim, setChangingTrim] = useState(0)

  console.log({id, country_id, make_id, model_id})
  
  const { data: allRequiredData, isLoading: isRequiredDataLoading } = useQuery([`required-data-${id}${country_id}${make_id}${model_id}`], () => fetchAllRequiredDataForEdit(id, country_id, make_id, model_id), { refetchOnWindowFocus: false, retry: 2 });

  if(!isRequiredDataLoading)
  {
     console.log(allRequiredData)
  }
  console.log(advertState.getStateModel())
  useEffect(() => 
  {
        // clearProductStore()
        // save data to session
            // advertState.setCountry(localStorage.getItem("country"))
            // advertState.setStates(localStorage.getItem("state"))
            // advertState.setCateg(localStorage.getItem("category"))
            // advertState.setMaker(localStorage.getItem("maker"))
            // advertState.setModel(localStorage.getItem("model"))
            // advertState.setTrim(localStorage.getItem("trim"))
            // advertState.setFuelType(localStorage.getItem("fuelType"))
            // advertState.setYearOfPoduction(localStorage.getItem("productionYear"))
            // advertState.setColour(localStorage.getItem("colour"))
            // advertState.setTransmission(localStorage.getItem("transmission"))
            // advertState.setCondition(localStorage.getItem("condition"))
            // advertState.setDescription(localStorage.getItem("description"))
            // advertState.setChasisNumber(localStorage.getItem("chasisNo"))
            // advertState.setPrice(localStorage.getItem("price"))
            // advertState.setMileAge(localStorage.getItem("mileage"))
        // data saved to session    
  }, []) 
  
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
      ],
  }
    //   [ "bold", "italic", "underline", "strike", "blockquote" ],

  useEffect(() => 
  {
        setTheDescription(value)   
        advertState.setDescription(value)
  }, [value])


  useEffect(() => {

  }, [theCountry, theFuelType, theMileAge, theTrim, theState, theCategory, theModel, theProductionYear, theColour, theTransmission, theCondition, selectedTrim])

    // model
  const callTellData = (x) => 
  {
        const filteredTrim = allRequiredData?.trim && allRequiredData?.trim?.filter((model) => Number(model.model_id) === Number(x))
        console.log(filteredTrim)
        console.log(filteredTrim.length)
        if(filteredTrim.length > 0)
        {
            setChangingTrim(filteredTrim.length)
        } else {
            setChangingTrim(0)
        }
        advertState.setTheModelTrim(filteredTrim)
        console.log(advertState.getTheModelTrim())
  }
  // country
  const callData = (x) => 
  {
      const filteredModel = allRequiredData?.state && allRequiredData?.state?.filter((state) => Number(state.country_id) === Number(x))
      // sorting
      let sortedProducts = filteredModel.sort((p1, p2) => (p1.rate < p2.rate) ? 1 : (p1.rate > p2.rate) ? -1 : 0);
      console.log(allRequiredData?.state)
      console.log(filteredModel)
      setSelectedStates(sortedProducts)
      advertState.setStateModel(sortedProducts)
      setSelectedTrim([])
  }

  // manufacturer
  const tellData = (x) => 
  {
    //   alert(x)
      const filteredModel = allRequiredData?.model && allRequiredData?.model?.filter((item) => Number(item.make_id) === Number(x))
      // sorting
      let sortedProducts = filteredModel.sort((p1, p2) => (p1.rate < p2.rate) ? 1 : (p1.rate > p2.rate) ? -1 : 0);
      console.log(allRequiredData?.model)
      console.log(sortedProducts)
      setSelectedModel(sortedProducts)
      advertState.setTheMakerModels(sortedProducts)
      console.log(sortedProducts)
      console.log(advertState.getTheMakerModels())
      console.log(selectedModel)
  }

  const populateProductStore = () => 
  {      
     advertState.setStates("")
     advertState.setCateg("")
     advertState.setMaker(-1)
     advertState.setModel(-1)
     advertState.setColour("")
     advertState.setYearOfPoduction("")
     advertState.setTransmission("")
     advertState.setCondition("")
     advertState.setChasisNumber(-"")
     advertState.setTrim(-1)
     advertState.setDescription("")
     advertState.setPrice("")
     advertState.setPlan_id(0)
     advertState.setOthers("")
     advertState.setAvatar([])
     advertState.setTheModelName("")
     advertState.setTheManufacturerName("")
     advertState.setCountry(-1)
     advertState.setMileAge("")
     advertState.setFuelType("")
     console.log("=======================")
     console.log(advertState.getStates())
     console.log("=======================")
  }

  const clearProductStore = () => 
  {      
      advertState.setCountry(-1)
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
      advertState.setMileAge("")
      advertState.setFuelType(-1)
  }

  const updateAdvertDetail = () => 
  {

    let submitForm = true
    
    if(theState === "" || theState === -1)
    { 
       setStateErrorMsg("Kindly Select State"); submitForm = false; 
    } else {
       setStateErrorMsg(""); submitForm = true; 
    }
    
    if(theModel === -1){ 
       setModelErrorMsg("Kindly Select Model")
       submitForm = false
    } else {
       setModelErrorMsg("")
       submitForm = true;
    }

    if(theTrim === -1 || theTrim === "")
    {
        setTrimErrorMsg("Kindly Select Trim"); submitForm = false; 
    } else {
        setTrimErrorMsg(""); submitForm = true;
    }

      setLoading(true)
      const advertDetail = { 
                                state: theState, category: theCategory, maker: theManufacturer, model: theModel, year_of_production: theProductionYear, 
                                colour: Number(theColour), transmission: theTransmission, condition: Number(theCondition), trim: theTrim, description: theDescription, 
                                chasis_number: theChasisNo, price: thePrice, productId: allRequiredData?.userProductDetail?.id, mileage: theMileAge, fuel: Number(theFuelType), 
                                country: theCountry
                            }   
    
    console.log(advertDetail)

    if(submitForm === true)
    {
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
    } else {
        console.log("Something went wrong")
    }
    
  }


    return (
        <>

            {
                isRequiredDataLoading && <div className="h-[500px] flex justify-center items-center" style={{ marginTop: '30px', paddingTop: '20px' }}>
                    <BeatLoader color="#1c9236" />
                </div>
            }
            
            { !isRequiredDataLoading && (
                    <>

                    {/* { (theManufacturer === "") && tellData(theManufacturer) } */}
                    {/* <Header /> */}

                    <main className="mb-30 mt-24 md:-mt-5">
                        {/* <MaxWidthWrapper> */}
                            <div className='md:w-12/12 lg:12/12 w-12/12 lg:flex-row'>

                                        <div className="p-1 md:-mt-5">
                                            <div className="grid md:grid-cols-8 grid-cols-8 gap-5 mt-1 justify-center">
                                                
                                                <div className="md:col-span-12 col-span-12 bg-white p-3 rounded-lg order-2 md:order-1">

                                                    <div className="mt-3 mb-5">
                                                        <span className="font-bold text-blue-600">UPDATE PRODUCT ADVERT</span>
                                                    </div>

                                                    <div className="flex flex-wrap -m-2 mt-2">
                                                        <div className="p-2 md:w-1/2 w-full">
                                                            <div className="mb-0">
                                                                <div className="relative">
                                                                <span className="w-full font-bold text-sm">Country {allRequiredData?.userProductDetail?.country_id}</span>
                                                                <select onChange={(e) => 
                                                                    { 
                                                                        advertState.setCountry(Number(e.target.value))
                                                                        setTheCountry(Number(e.target.value))
                                                                        callData(e.target.value)
                                                                        setChooseAnotherState(true) 
                                                                        setTheState(-1)
                                                                        advertState.setStates(-1)
                                                                    } 
                                                                    } className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                                                    {/* { <option value={-1}> - Select Country -  </option> } */}
                                                                    {
                                                                        allRequiredData?.countries &&
                                                                        allRequiredData?.countries?.length !== 0 &&
                                                                        allRequiredData?.countries.map((country) => {
                                                                            return (
                                                                                <option key={country.id} value={country.id} selected={country.id === allRequiredData?.userProductDetail?.country_id ? allRequiredData?.userProductDetail?.country_id : ""}>
                                                                                    {country.name}
                                                                                </option>
                                                                            )
                                                                        })
                                                                    }
                                                                </select>
                                                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 mt-5">
                                                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                                                </div>
                                                                </div>
                                                            </div>
                                                            {/* <div className="text-red-500 font-bold text-sm">{ (theCountry === -1) ?  countryErrorMsg : "" }</div> */}
                                                        </div>
                                                        <div className="p-2 md:w-1/2 w-full">
                                                            <div className="mb-0">
                                                                <div className="relative">
                                                                    <span className="w-full font-bold text-sm">Select State {typeof allRequiredData?.userProductDetail?.state_id}</span>
                                                                    <select onChange={
                                                                            (e) => {
                                                                                if(Number(e.target.value) === -1)
                                                                                {
                                                                                    setTheState(-1)
                                                                                    advertState.setStates(-1)                                                                                    
                                                                                    setStateErrorMsg("Kindly Select State")
                                                                                } else {
                                                                                    console.log(e.target.value)
                                                                                    advertState.setStates(Number(e.target.value))
                                                                                    console.log(advertState.getStates())
                                                                                    setTheState(Number(e.target.value))                                                                                    
                                                                                    setStateErrorMsg("")
                                                                                }
                                                                            }
                                                                        } className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                                                        <option value={-1}> - Select State -  </option>
                                                                        {   chooseAnotherState &&   
                                                                            advertState.getStateModel() &&
                                                                            advertState.getStateModel().length !== 0 &&
                                                                            advertState.getStateModel().map((state) =>  {
                                                                                return (
                                                                                    <option key={state.id} value={state.id} selected={state.country_id === theState ? theState : ""}>
                                                                                        {state.name}
                                                                                    </option>
                                                                                )
                                                                            })
                                                                        }
                                                                        {   !chooseAnotherState &&
                                                                            allRequiredData?.user_state?.map((state) =>  {
                                                                                return (
                                                                                    <option key={state.id} value={state.id} selected={state.id === allRequiredData?.userProductDetail?.state_id ? allRequiredData?.userProductDetail?.state_id: ""}>
                                                                                        {state.name}
                                                                                    </option>
                                                                                )
                                                                            })
                                                                        }
                                                                    </select>
                                                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 mt-5">
                                                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="text-red-500 font-bold text-sm">{ (Number(theState) === -1) ?  stateErrorMsg : "" }</div>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="flex flex-wrap -m-2 mt-2">
                                                        <div className="p-2 md:w-1/2 w-full">
                                                            <div className="mb-0">
                                                                <div className="relative">
                                                                <span className="w-full font-bold text-sm">Category</span>
                                                                <select onChange={
                                                                    (e) => {
                                                                            if(Number(e.target.value) === -1)
                                                                            {
                                                                                advertState.setCateg(-1)
                                                                                setTheCategory(-1)                                                                                
                                                                                setCategoryErrorMsg("Kindly Select Category")
                                                                            } else {
                                                                                advertState.setCateg(Number(e.target.value))
                                                                                setTheCategory(Number(e.target.value))                                                                                
                                                                                setCategoryErrorMsg("")
                                                                            }
                                                                        }
                                                                } className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                                                {/* { <option value={-1}> - Select Category -  </option> } */}
                                                                {   
                                                                    allRequiredData?.category &&
                                                                    allRequiredData?.category?.length !== 0 &&
                                                                    allRequiredData?.category.map((category) => {
                                                                        return (
                                                                            <option key={category.id} value={category.id} selected={category.id === allRequiredData?.userProductDetail?.category_id ? allRequiredData?.userProductDetail?.category_id: ""}>
                                                                                {category.name}
                                                                            </option>
                                                                        )
                                                                    })
                                                                }
                                                                </select>
                                                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 mt-5">
                                                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                                                </div>
                                                                </div>
                                                            </div>
                                                            <div className="text-red-500 font-bold text-sm">{ (theCategory === -1) ?  categoryErrorMsg : "" }</div>
                                                        </div>
                                                        <div className="p-2 md:w-1/2 w-full">
                                                            <div className="">
                                                                <div className="relative">
                                                                <span className="w-full font-bold text-sm">Manufacturer</span>
                                                                <select onChange={
                                                                    (e) => {    
                                                                            setTheSelectManufacturer(true)
                                                                            setTheManufacturer(Number(e.target.value))
                                                                            advertState.setMaker(Number(e.target.value))
                                                                            setChooseAnotherModel(true)
                                                                            advertState.setTheModelTrim([])

                                                                            advertState.setTrim(-1)
                                                                            setTheTrim(-1)

                                                                            advertState.setModel(-1)
                                                                            setTheModel(-1)
                                                                            
                                                                            setChangingTrim(true)
                                                                            tellData(e.target.value) 
                                                                            // setNoMakerOption(false)
                                                                            // setSelectedMaker(Number(e.target.value))
                                                                            // setCarSelectedModelGroupOption(false)
                                                                        }                                                                        
                                                                    } className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                                                    {/* { <option value={-1}> - Select Manufacturer -  </option> } */}
                                                                    { 
                                                                        allRequiredData?.maker && 
                                                                        allRequiredData?.maker?.length !== 0 &&
                                                                        allRequiredData?.maker.map((maker) => {
                                                                            return (
                                                                                <option key={maker.id} value={maker.id} selected={maker.id === allRequiredData?.userProductDetail?.make_id ? allRequiredData?.userProductDetail?.make_id: ""}>
                                                                                    {maker.title}
                                                                                </option>
                                                                            )
                                                                        })                                                                        
                                                                    }
                                                                </select>
                                                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 mt-5">
                                                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                                                </div>
                                                                </div>
                                                            </div>                                                            
                                                            {/* <div className="text-red-500 font-bold text-sm">{ (theManufacturer === -1) ?  makerErrorMsg : "" }</div> */}
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="flex flex-wrap -m-2 mt-2">
                                                        <div className="p-2 md:w-1/2 w-full">
                                                            <div className="mb-0">
                                                                <div className="relative">
                                                                    <span className="w-full font-bold text-sm">Model</span>
                                                                    {/* {   (theManufacturer === -1) && 
                                                                        <select onChange={(e) => {  }
                                                                            } className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                                                            { (theManufacturer === -1) && <option key={-1} value={-1}> - Select Manufacturer First - </option> }
                                                                        </select>
                                                                    } */}
                                                                    {/* {   !selectedCarModelOption && selectManufacturer && (selectedModel.length === 0) && (theManufacturer === -1) &&
                                                                        <select onChange={(e) =>{ 
                                                                                advertState.setModel(Number(e.target.value))
                                                                                setTheModel(Number(e.target.value))
                                                                            }
                                                                            } className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                                                            { (Number(theManufacturer) === -1) && selectManufacturer && <option key={-1} value={-1}> - Select Manufacturer First - </option> }
                                                                            { (Number(theManufacturer) != -1) && selectManufacturer && <option key={-1} value={-1}> - Select Model - </option> }
                                                                            {                                                                                
                                                                                selectedModel  && !noMakerOption &&
                                                                                selectedModel?.length != 0 &&
                                                                                selectedModel.map((model) => {
                                                                                    return (
                                                                                        <option key={model.code} value={model.id} selected={model.make_id === Number(theModel) ? Number(theModel) : ""}>
                                                                                            {model.title}
                                                                                        </option>
                                                                                    )
                                                                                })
                                                                            }
                                                                            
                                                                            {                                                                                
                                                                                (theManufacturer === -1) && selectManufacturer && selectedModel  && !noMakerOption &&
                                                                                selectedModel?.length != 0 &&
                                                                                selectedModel.map((model) => {
                                                                                    return (
                                                                                        <option key={model.code} value={model.id} selected={model.make_id === theModel ? theModel : ""}>
                                                                                            {model.title}
                                                                                        </option>
                                                                                    )
                                                                                })
                                                                            }
                                                                        </select>
                                                                    } */}

                                                                    
                                                                    {   chooseAnotherModel && (selectedModel.length > 0) &&
                                                                        <select onChange={(e) =>{ 
                                                                                advertState.setModel(Number(e.target.value))
                                                                                setTheModel(Number(e.target.value))
                                                                                callTellData(e.target.value)
                                                                                console.log(Number(e.target.value))
                                                                            }
                                                                            } className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                                                            <option key={-1} value={-1}> - Select Model - </option>
                                                                            {            
                                                                                selectedModel.map((model) => {
                                                                                    return (
                                                                                        <option key={model.code} value={model.id} selected={Number(model.id) === (Number(theModel)) ? (Number(theModel)) : ""}>
                                                                                            {model.title}
                                                                                        </option>
                                                                                    )
                                                                                })
                                                                            }
                                                                        </select>
                                                                    }

                                                                    {   !chooseAnotherModel &&
                                                                        <select onChange={(e) => {
                                                                                if(Number(e.target.value) === -1)
                                                                                {
                                                                                    advertState.setModel(-1)
                                                                                    setTheModel(-1)                                                                            
                                                                                    setModelErrorMsg("Kindly Select Model")
                                                                                } else {
                                                                                    advertState.setModel(Number(e.target.value))
                                                                                    setTheModel(Number(e.target.value))
                                                                                    callTellData(e.target.value)
                                                                                    console.log(Number(e.target.value))
                                                                                    setChooseAnotherTrim(true)
                                                                                }
                                                                            }
                                                                            } className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                                                            <option key={-1} value={-1}> - Select Model - </option>
                                                                            {                                                                                
                                                                                allRequiredData?.user_model?.map((model) => {
                                                                                    return (
                                                                                        <option key={model.code} value={model.id} selected={model.id === allRequiredData?.userProductDetail?.model_id ? allRequiredData?.userProductDetail?.model_id: ""}>
                                                                                            {model.title}
                                                                                        </option>
                                                                                    )
                                                                                })
                                                                            }
                                                                        </select>
                                                                    }

                                                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 mt-5">
                                                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/* Trim  */}
                                                        <div className="p-2 md:w-1/2 w-full">
                                                            <div className="mb-0">
                                                                <div className="relative">
                                                                    <span className="w-full font-bold text-sm">{advertState.getTheModelTrim().length} Trim{(advertState.getTheModelTrim().length) > 1 ? "s" : "" }</span>
                                                                    <select onChange={(e) => { 
                                                                        if(Number(e.target.value) === -1)
                                                                        {
                                                                            advertState.setTrim(-1)
                                                                            setTheTrim(-1)                                                                            
                                                                            setTrimErrorMsg("Kindly Select Trim")
                                                                        } else {
                                                                            // alert(e.target.value)
                                                                            advertState.setTrim(Number(e.target.value))
                                                                            setTheTrim(Number(e.target.value))                                                                            
                                                                            setTrimErrorMsg("")
                                                                        }
                                                                    } 
                                                                } className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                                                    { chooseAnotherModel && (changingTrim === 0) && <option value={-1}> - No trim for this model - </option> }
                                                                    { chooseAnotherModel && (changingTrim > 0) && <option value={-1}> - Select Trim  -</option> }
                                                                    {/* { (theModel != -1) && (Number(theManufacturer) != -1) && (advertState.getTheModelTrim().length > 0) && <option value={-1}> - Select Trim -  </option> }  */}
                                                                    {/* { theModel != -1 && theManufacturer != -1 && advertState.getTheModelTrim().length === 0 && <option value={-1}> - No trim for this model -  </option> } */}
                                                                    {
                                                                        (advertState.getTheModelTrim().length > 0) &&
                                                                        advertState.getTheModelTrim().map((trim, index) => {                                                               
                                                                            return (                                                                                
                                                                                <option key={index} value={trim.id} selected={Number(trim.id)  === Number(theTrim) ? Number(theTrim) : ""}>
                                                                                    {trim.name}
                                                                                </option>
                                                                            )
                                                                        })
                                                                    }
                                                                    {   advertState.getTheMakerModels().length === 0 &&
                                                                        allRequiredData?.user_trim?.map((trim, index) => {                                                               
                                                                            return (                                                                                
                                                                                <option key={index} value={trim.id} selected={Number(trim.id)  === allRequiredData?.userProductDetail?.trim ? allRequiredData?.userProductDetail?.trim: ""}>
                                                                                    {trim.name}
                                                                                </option>
                                                                            )
                                                                        })
                                                                    }
                                                                    </select>
                                                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 mt-5">
                                                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="text-red-500 font-bold text-sm">{ (theModel === -1  || theModel === "") ?  modelErrorMsg : "" }</div>
                                                        </div>
                                                    </div>
                                                    {/* Fuel Type  */}
                                                    <div className="flex flex-wrap -m-2 mt-2">
                                                        <div className="p-2 md:w-1/2 w-full">
                                                            <div className="mb-0">
                                                                <div className="relative">
                                                                <span className="w-full font-bold text-sm">Fuel Type</span>
                                                                <select onChange={(e) => 
                                                                    {                                                                         
                                                                        // advertState.setColour(e.target.value)
                                                                        // setTheColour(e.target.value)
                                                                        if(Number(e.target.value) === -1)
                                                                        {
                                                                            advertState.setFuelType(-1)
                                                                            setFuelType(-1)
                                                                            
                                                                            setFuelTypeErrorMsg("Kindly Select Fuel Type")
                                                                        } else {
                                                                            advertState.setFuelType(Number(e.target.value))
                                                                            setFuelType(Number(e.target.value))
                                                                            setFuelTypeErrorMsg("")
                                                                            
                                                                        }
                                                                    } 
                                                                    } className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                                                {/* { <option value={-1}> - Select Fuel -  </option> } */}
                                                                {
                                                                    allRequiredData?.fuel &&
                                                                    allRequiredData?.fuel?.length !== 0 &&
                                                                    allRequiredData?.fuel.map((fuel) => {
                                                                        return (
                                                                            <option key={fuel.id} value={fuel.id} data-id={fuel.name} selected={fuel?.id === Number(allRequiredData?.userProductDetail?.fuel_type) ? Number(allRequiredData?.userProductDetail?.fuel_type) : ""}>
                                                                                {fuel.name}
                                                                            </option>
                                                                        )
                                                                    })
                                                                }
                                                                </select>
                                                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 mt-5">
                                                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                                                </div>
                                                                </div>
                                                            </div>
                                                            <div className="text-red-500 font-bold text-sm">{ (theFuelType === -1) ?  fuelTypeErrorMsg : "" }</div>
                                                        </div>
                                                        <div className="p-2 md:w-1/2 w-full">
                                                            <div className="mb-0">
                                                                <div className="relative">
                                                                <span className="w-full font-bold text-sm">Production Year</span>
                                                                <select onChange={(e) => { 
                                                                        // advertState.setYearOfPoduction(e.target.value)
                                                                        // setTheProductionYear(e.target.value) 
                                                                        if(Number(e.target.value) === -1)
                                                                        {
                                                                            advertState.setYearOfPoduction(-1)
                                                                            setTheProductionYear(-1)                                                                            
                                                                            setProductionYearErrorMsg("Kindly Select Production Year")
                                                                        } else {
                                                                            advertState.setYearOfPoduction(Number(e.target.value))
                                                                            setTheProductionYear(Number(e.target.value))                                                                            
                                                                            setProductionYearErrorMsg("")
                                                                        }
                                                                } 
                                                                    } className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                                                {/* { <option value={-1}> - Select Year -  </option> } */}
                                                                {
                                                                    years &&
                                                                    years?.length !== 0 &&
                                                                    years.map((year) => (
                                                                        <option key={year} value={year} selected={Number(year)  === Number(allRequiredData?.userProductDetail?.year_of_production) ? Number(allRequiredData?.userProductDetail?.year_of_production) : ""}>
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
                                                            <div className="text-red-500 font-bold text-sm">{ (theProductionYear === -1  || theProductionYear === "") ?  productionYearErrorMsg : "" }</div>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="flex flex-wrap -m-2 mt-2">
                                                        <div className="p-2 md:w-1/2 w-full">
                                                            <div className="mb-0">
                                                                <div className="relative">
                                                                <span className="w-full font-bold text-sm">Colour</span>
                                                                <select onChange={(e) => 
                                                                    {                                                                         
                                                                        // advertState.setColour(e.target.value)
                                                                        // setTheColour(e.target.value)
                                                                        if(Number(e.target.value) === -1)
                                                                        {
                                                                            advertState.setColour(-1)
                                                                            setTheColour(-1)                                                                            
                                                                            setColorErrorMsg("Kindly Select Colour")
                                                                        } else {
                                                                            advertState.setColour(Number(e.target.value))
                                                                            setTheColour(Number(e.target.value))                                                                            
                                                                            setColorErrorMsg("")
                                                                        }
                                                                    } 
                                                                    } className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                                                {/* { <option value={-1}> - Select Colour -  </option> } */}
                                                                {
                                                                    allRequiredData?.colour &&
                                                                    allRequiredData?.colour?.length !== 0 &&
                                                                    allRequiredData?.colour.map((colour) => {
                                                                        return (
                                                                            <option key={colour.id} value={colour.id} data-id={colour.name} selected={Number(colour.id) === Number(allRequiredData?.userProductDetail?.colour) ? Number(allRequiredData?.userProductDetail?.colour) : ""}>
                                                                                {colour.name}
                                                                            </option>
                                                                        )
                                                                    })
                                                                }
                                                                </select>
                                                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 mt-5">
                                                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                                                </div>
                                                                </div>
                                                            </div>
                                                            <div className="text-red-500 font-bold text-sm">{ (theColour === -1) ?  colorErrorMsg : "" }</div>
                                                        </div>
                                                        <div className="p-2 md:w-1/2 w-full">
                                                            <div className="mb-0">
                                                                <div className="relative">
                                                                <span className="w-full font-bold text-sm">Transmission</span>
                                                                <select onChange={(e) => {                             
                                                                        // advertState.setTransmission(e.target.value)
                                                                        // setTheTransmission(e.target.value)
                                                                        if(Number(e.target.value) === -1)
                                                                        {
                                                                            advertState.setTransmission(-1)
                                                                            setTheTransmission(-1)                                                                            
                                                                            setTransmissionErrorMsg("Kindly Select Transmission")
                                                                        } else {
                                                                            advertState.setTransmission(Number(e.target.value))
                                                                            setTheTransmission(Number(e.target.value))                                                                            
                                                                            setTransmissionErrorMsg("")
                                                                        }
                                                                    } 
                                                                    } className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                                                {/* { <option value={-1}> - Select Transmission -  </option> } */}
                                                                {
                                                                    allRequiredData?.transmission &&
                                                                    allRequiredData?.transmission?.length !== 0 &&
                                                                    allRequiredData?.transmission.map((transmission) => {
                                                                        return (
                                                                            <option key={transmission.id} value={transmission.id} selected={transmission.id === Number(allRequiredData?.userProductDetail?.transmission_id) ? Number(allRequiredData?.userProductDetail?.transmission_id) : ""}>
                                                                                {transmission.name}
                                                                            </option>
                                                                        )
                                                                    })
                                                                } 
                                                                </select>
                                                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 mt-5">
                                                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                                                </div>
                                                                </div>
                                                            </div>
                                                            <div className="text-red-500 font-bold text-sm">{ (theTransmission === -1) ?  transmissionErrorMsg : "" }</div>
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-wrap -m-2 mt-2">
                                                        <div className="p-2 md:w-1/2 w-full">
                                                            <div className="mb-0">
                                                                <div className="relative">
                                                                    <span className="w-full font-bold text-sm">Condition</span>
                                                                    <select onChange={(e) => {   
                                                                            // advertState.setCondition(e.target.value)
                                                                            // setTheCondition(e.target.value)
                                                                            if(Number(e.target.value) === -1)
                                                                            {
                                                                                advertState.setCondition(-1)
                                                                                setTheCondition(-1)                                                                                
                                                                                setConditionErrorMsg("Kindly Select Condition")
                                                                            } else {
                                                                                advertState.setCondition(Number(e.target.value))
                                                                                setTheCondition(Number(e.target.value))                                                                                
                                                                                setConditionErrorMsg("")
                                                                            }
                                                                        }
                                                                        } className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                                                    {/* { <option value={-1}> - Select Condition -  </option> } */}
                                                                    {
                                                                        allRequiredData?.condition &&
                                                                        allRequiredData?.condition?.length !== 0 &&
                                                                        allRequiredData?.condition.map((condition) => (
                                                                            <option key={condition.id} value={condition.id} selected={condition.id === Number(allRequiredData?.userProductDetail?.condition_id) ? Number(allRequiredData?.userProductDetail?.condition_id) : ""}>
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
                                                            <div className="text-red-500 font-bold text-sm">{ (theCondition === -1) ?  conditionErrorMsg : "" }</div>
                                                        </div>
                                                        <div className="p-2 md:w-1/2 w-full">
                                                            <span className="w-full font-bold text-sm">MileAge</span>
                                                            <input 
                                                                defaultValue={allRequiredData?.userProductDetail?.mileage}
                                                                onKeyUp={(e) => {    
                                                                advertState.getMileAge(e.target.value)
                                                                setTheMileAge(e.target.value)} 
                                                            } type="number" id="price" name="price" placeholder="Distance covered so far (optional)" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 text-sm leading-8 transition-colors duration-200 ease-in-out" />
                                                            <div className="text-red-500 font-bold text-sm">{ (theMileAge === "") ?  mileAgeError : "" }</div>
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-wrap -m-2 mt-5 md:mb-10 mb-20 p-2">
                                                        <span className="w-full font-bold text-sm">Description</span>
                                                        <ReactQuill theme="snow" defaultValue={allRequiredData?.userProductDetail?.description} onChange={setValue} className="w-full h-[150px]" modules={modules} />
                                                        
                                                        {/* <textarea onChange={(e) => { 
                                                                advertState.setDescription(e.target.value)
                                                                setTheDescription(e.target.value)
                                                            } 
                                                        } defaultValue={theDescription} 
                                                         className="shadow form-textarea mb-2 block w-full border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                                         rows="2" 
                                                         placeholder="Enter Description"></textarea> */}
                                                    </div>
                                                    <div className="text-red-500 font-bold text-sm">{ (value === "") ?  descriptionErrorMsg : "" }</div>

                                                    <div className="flex flex-wrap -m-2 mt-2 mb-5">
                                                        <div className="p-2 md:w-1/2 w-full">
                                                            <span className="w-full font-bold text-sm">Chasis Number</span>
                                                            <input onBlur={(e) => {
                                                                advertState.setChasisNumber(e.target.value)
                                                                setTheChasisNo(e.target.value)
                                                            }} type="text" id="vin" defaultValue={allRequiredData?.userProductDetail?.chasis_no}  name="vin" placeholder="VIN chasis number (Optional)" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 text-sm py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                                        </div>
                                                        <div className="p-2 md:w-1/2 w-full">
                                                            <span className="w-full font-bold text-sm">Price</span>
                                                            <input onKeyUp={(e) => {    
                                                                advertState.setPrice(e.target.value)
                                                                setThePrice(e.target.value)} 
                                                            } type="text" id="price" defaultValue={allRequiredData?.userProductDetail?.price} name="price" placeholder="Price (₦)" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 text-sm leading-8 transition-colors duration-200 ease-in-out" />
                                                            <div className="text-red-500 font-bold text-sm">{ (thePrice === "") ?  priceErrorMsg : "" }</div>
                                                        </div>
                                                    </div>
                                                   
                                                    {/* <div className={`transition duration-300 w-full ${(success == "") && "hidden"}`}>
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
                                                    <div className="w-full">                                                        
                                                        { fillForm && <span className="font-bold text-md mb-3 text-red-600"> { fillForm } </span> }
                                                    </div> */}

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

                                            </div>
                                        </div>

                            </div>
                        {/* </MaxWidthWrapper> */}

                        <SuccessModal onClick={() => setSuccessModal(false) } successModal={successModal} returnTo={''} message={'Product Successfully Updated'} />
                   
                    </main>

                    </>
                )
            }
        </>
    );
}

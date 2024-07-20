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
import { updateAds, saveAdvert } from "@/apis/ads";
import EditProductImage from "@/components/EditProductImage";
import { SuccessModal } from "@/components/SuccessModal";
import ReactQuill from 'react-quill'
import Header from "@/layouts/header";

export default function CreateAd() 
{
  const navigate = useNavigate();
  const { id } = useParams();

  const advertState = appStore((state) => state)
  const years = getYearsArray()

  const [selectedMaker, setSelectedMaker] = useState(0);
  const [selectedModel, setSelectedModel] = useState(advertState.getTheMakerModels);
  const [noMakerOption, setNoMakerOption] = useState(false);
  const [msg, setMsg] = useState("")
  
  const [deleteOpenModal, setDeleteModal] = useState(false)
  const [ deleteUrl, setDeleteUrl] = useState("") 
  const [ productToDeleteMessage, setProductToDeleteMessage] = useState("")
  const [ mainImage, setMainImage] = useState(-1)
  const [ mainImagePosition, setMainImagePosition] = useState(-1)
  const [ saveDraft, setSaveDraft] = useState(false)

  const [theState, setTheState] = useState(advertState.getStates())
  const [theCategory, setTheCategory] = useState(advertState.getCateg())
  const [theManufacturer, setTheManufacturer] = useState(advertState.getMaker())
  const [theModel, setTheModel] = useState(advertState.getModel())
  const [theProductionYear, setTheProductionYear] = useState(advertState.getYearOfPoduction())
  const [theColour, setTheColour] = useState(advertState.getColour())
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
  const [theManufacturerName, setTheManufacturerName] = useState(advertState.getTheManufacturerName())
  const [theModelName, setTheModelName] = useState(advertState.getTheModelName())
  const [selectManufacturer, setTheSelectManufacturer] = useState(true)
  const [successModal, setSuccessModal] = useState(false)

  console.log({ theManufacturer, theModel, theTrim: advertState.getTrim(), theOthers, theCategory, theState })  
//   advertState.setTrim(-1)

  const [stateErrorMsg, setStateErrorMsg] = useState("")
  const [categoryErrorMsg, setCategoryErrorMsg] = useState("")
  const [makerErrorMsg, setMakerErrorMsg] = useState("")
  const [modelErrorMsg, setModelErrorMsg] = useState("")
  const [productionYearErrorMsg, setProductionYearErrorMsg] = useState("")
  const [colorErrorMsg, setColorErrorMsg] = useState("")
  const [transmissionErrorMsg, setTransmissionErrorMsg] = useState("")
  const [conditionErrorMsg, setConditionErrorMsg] = useState("")
  const [trimErrorMsg, setTrimErrorMsg] = useState("")
  const [descriptionErrorMsg, setDescriptionErrorMsg] = useState("")
  const [priceErrorMsg, setPriceErrorMsg] = useState("")
  const [entryErrorMsg, setEntryErrorMsg] = useState("")
  const [mainImageErrorMsg, setMainImageErrorMsg] = useState("")
  const [formValid, setFormValid] = useState("no")
  const [fillForm, setFillForm] = useState("")

  const [theUserState, setTheUserStates] = useState("")
  const [thumbnail, setImages] = useState(advertState.getProductImages())
  const [isDragging, setIsDragging] = useState(false)
  const [images, setProductImages] = useState([]);    
  const [previewUrls, setPreviewUrls] = useState([]);
  const [selectedOptionOne, setSelectedOptionOne] = useState('');
  const [selectedOptionTwo, setSelectedOptionTwo] = useState('');
  const [processAdvert, setProcessAdvert] = useState(advertState.getProcessAdvert());
  const [processAdvertAsDetail, setProcessAdvertAsDraft] = useState(advertState.getProcessAdvertAsDraft());

  const [selectedCarModelOption, setCarSelectedModelGroupOption] = useState(false)
  
  const { data: allRequiredData, isLoading: isRequiredDataLoading } = useQuery(["required-data", id], () => fetchAllRequiredData(id), { refetchOnWindowFocus: false, staleTime: Infinity, retry: 2 });

  let submitForm = true
  let processData = false

  useEffect(() => {
    // alert("Trying to implement change")
    // advertState.setStates("")
    //  alert(theManufacturer)
    advertState.setProcessAdvertAsDraft(false)
    advertState.setProcessAdvert(false)
    console.log(selectedModel)
    const onEdit = advertState.getOnEdit()
    if(onEdit === "yes")
    {
        // alert(advertState.getOnEdit())
        clearProductStore()
        window.location.href = '/dashboard/create-advert'
        setProcessAdvert(false)
        setProcessAdvertAsDraft(false)
    }
  }, []) 
  
  const [value, setValue] = useState(advertState.getDescription())
  const modules = {
      toolbar: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ font: [] }],
          [{ size: [] }],
          [ "bold", "italic", "underline", "strike", "blockquote" ],
          [ 
              { list: "ordered" },
              { list: "bullet" },
              { list: "-1" },
              { list: "+1" },
          ],
          [ "link"]
      ],
  }

  useEffect(() => {
        setTheDescription(value)   
        advertState.setDescription(value)
  }, [value])

  useEffect(() => {

  }, [processAdvert])

  useEffect(() => {

  }, [theManufacturer, theManufacturerName, theModelName, theTrim, theState, theCategory, theModel, theProductionYear, theColour, theTransmission, theCondition, theOthers])

  useEffect(() => {
    // alert("Trying to implement change")
    }, [mainImagePosition])

    useEffect(() => {
        
    }, [saveDraft])

    useEffect(() => {
        setTimeout(() => {
            setFillForm("")
        }, 15000)
    }, [fillForm])

    useEffect(() => {
        setTheUserStates(advertState.getStates())
        console.log(advertState.getStates())
    }, [selectedOptionOne, selectedOptionTwo])


  const tellData = (x) => 
  {
      const filteredModel = allRequiredData?.model && allRequiredData?.model?.filter((item) => item.make_id === Number(x))
      setSelectedModel(filteredModel)
      advertState.setTheMakerModels(filteredModel)
      console.log(filteredModel)
      console.log(advertState.getTheMakerModels())
      console.log(selectedModel)
  }
  
//   useEffect(() => {

//   }, [previewUrls])

  const [selectedCarModel, setCarSelectedModelGroup] = useState("");

//   const userSelectedModel = localStorage.getItem("modelId")
//   console.log(allRequiredData)
//   setCarSelectedModelGroup(allRequiredData?.model)

    const savePost = (x) => 
    {
            // advertState.getLoggedInUser()
            saveAdvertDetail(x)
    }

    const savePostAsDraft = (x) => 
    {
        saveAdvertDetail(x)
    }

    const saveAdvertDetail = (x) => 
  {
      submitForm = true
      let imagesToSave = []
      for (let index = 0; index < previewUrls.length; index++) 
      {
         const y = previewUrls[index].split(",")[1]
         imagesToSave.push(y)
      }
      //   setLoading(true)

    //   const advertDetail = { 
    //                             state: theState, category: theCategory, maker: theManufacturer, model: theModel, year_of_production: theProductionYear, 
    //                             colour: theColour, transmission: theTransmission, condition: theCondition, trim: theTrim, description: theDescription, 
    //                             chasis_number: theChasisNo, price: thePrice, others: theOthers, plan_id: 1,
    //                             manufacturerName: theManufacturerName, modelName: theModelName, avatar: imagesToSave, mainImage: mainImagePosition, draft: x
    //                         }  
    //   console.log(advertDetail)

    //   return
      
      if(theState === "" || theState === -1)
      { 
          setStateErrorMsg("Kindly Select State"); submitForm = false; 
      } else {
          setStateErrorMsg(""); submitForm = true; 
      }
      if(theCategory === "" || theCategory === -1)
      { 
         setCategoryErrorMsg("Kindly Select Category");  submitForm = false; 
      } else {
         setCategoryErrorMsg(""); submitForm = true; 
      }
      if(theManufacturer === -1)
      { 
          setMakerErrorMsg("Kindly Select Manufacturer");  submitForm = false; 
      } else {
          setMakerErrorMsg(""); submitForm = true; 
      }
      if(theOthers === "others")
      {
          if(theManufacturerName === "" || theModelName === "")
          {
             setEntryErrorMsg("Kindly enter manufacturer name and model name")
             submitForm = false
          } else {
             setEntryErrorMsg("")
            //  submitForm = true
          }
      } else if(theModel === -1){ 
          setModelErrorMsg("Kindly Select Model")
          console.log("Model");
          submitForm = false
      } else {
          setModelErrorMsg("")
          submitForm = true;
      }
      if(theProductionYear === "" || theProductionYear === -1)
      { 
         setProductionYearErrorMsg("Kindly Select Production Year"); submitForm = false; 
      } else {
         setProductionYearErrorMsg(""); submitForm = true; 
      }
      if(theColour === "" || theColour === -1)  
      { 
          setColorErrorMsg("Kindly Select Color"); submitForm = false; 
      } else {
          setColorErrorMsg(""); submitForm = true; 
      }
      if(theTransmission === "" || theTransmission === -1)
      { 
            setTransmissionErrorMsg("Kindly Select Transmission"); submitForm = false; 
      } else {
            setTransmissionErrorMsg(""); submitForm = true; 
      }
      if(theCondition === "" || theCondition === -1)
      { 
            setConditionErrorMsg("Kindly Select Condition"); submitForm = false; 
      } else {
            setConditionErrorMsg(""); submitForm = true; 
      }
      if(theTrim === -1 || theTrim === "")
      { 
         setTrimErrorMsg("Kindly Select Trim"); submitForm = false; 
      } else {
        setTrimErrorMsg(""); submitForm = true;
      }
        //   if(theDescription === ""){ setDescriptionErrorMsg("Kindly Give details regards product"); submitForm = false; }
        if(thePrice === ""){ setPriceErrorMsg("Kindly Specify price for your product"); submitForm = false; }
        if(previewUrls.length === 0)
        {
        submitForm = false; 
            setMainImageErrorMsg("Kindly select picture(s) to upload");  
            submitForm = false
        } else
        if(previewUrls.length < 5)
        {
            setMainImageErrorMsg("Minimum Upload is 5 Pictures");  
            submitForm = false 
        } else
        if(mainImagePosition === -1)
        { 
            setMainImageErrorMsg("Make one of the uploaded image 'COVER IMAGE' by click on (MAKE AS MAIN IMAGE)"); 
            submitForm = false
        }
        
        const advertDetail = { 
        state: theState, category: theCategory, maker: theManufacturer, model: theModel, year_of_production: theProductionYear, 
        colour: theColour, transmission: theTransmission, condition: theCondition, trim: theTrim, description: theDescription, 
        chasis_number: theChasisNo, price: thePrice, others: theOthers, plan_id: 1,
        manufacturerName: theManufacturerName, modelName: theModelName, avatar: imagesToSave, mainImage: mainImagePosition, draft: x
        }  
        console.log(advertDetail)

      if(submitForm === true)
      {
        //  alert("All forms valid")
         processData = true 
        //  if(x === "no"){  advertState.setProcessAdvert(true)  }
        //  if(x === "yes"){  advertState.setProcessAdvertAsDraft(true)  }

         if(x === "no"){  
            setProcessAdvert(false)
            advertState.setProcessAdvert(false)  
        }
        if(x === "yes"){  
            setProcessAdvertAsDraft(false)
            advertState.setProcessAdvertAsDraft(false)  
        }
         
      } else {
        //  alert("Attend to all forms")
            setTimeout(() => {
                // advertState.setProcessAdvert(true)
                if(x === "no"){  
                    setProcessAdvert(false)
                    advertState.setProcessAdvert(false)  
                }
                if(x === "yes"){  
                    setProcessAdvertAsDraft(false)
                    advertState.setProcessAdvertAsDraft(false)  
                }
            }, 1000)
            setFillForm("Attend to all fields above")
      }
      
      console.log(advertDetail)
      console.log(formValid)

      if(processData)
      {  
          submitForm = true
          setProcessAdvert(true)
        //   return
          saveAdvert(advertDetail)
            .then((res) => {
                setError(false)
                setLoading(false);
                console.log(res)
                populateProductStore()
                setIsSuccess(res.message)
                if(res === "yes")
                {
                    setMsg('Advert Successfully Drafted to unposted advert section')
                } else {
                    setMsg('Advert Successfully Published')
                }
                setPreviewUrls([])
                setSuccessModal(true)
                setTimeout(() => {
                    setSuccessModal(false)
                    navigate('/dashboard/store')
                }, 2000)
            })
            .catch((err) => {
                setIsSuccess("")
                console.log(err)
                setLoading(false);
                setError(`${err}`);
            }
          )
      }
    }
    
    // const fileInputRef = useRef(null)
    const formData = new FormData();
    const handleMultipleImages = (e) => 
    {
        const files = Array.from(e.target.files)
        if (files.length > 0) 
        {
            setProductImages([...images, ...files]);
            Promise.all(
            files.map((file) => {
                return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = (error) => reject(error);
                });
            })
            ).then((results) => {
                setPreviewUrls([...previewUrls, ...results]);
            });
        }          
        setMainImageErrorMsg("")      
    };

    const handleDeleteImage = (index) => 
    {
        const newImages = [...images];
        newImages.splice(index, 1);
        setImages(newImages);
        console.log('images ',images)
      
        const newPreviewUrls = [...previewUrls];
        newPreviewUrls.splice(index, 1);
        setPreviewUrls(newPreviewUrls);
        if(mainImagePosition === index)
        {
            setMainImagePosition(-1)
        }
        if(mainImagePosition > index)
        {
            setMainImagePosition(mainImagePosition - 1)
        }

    };

    const userOption = (option) => 
    {
        // alert(option)
    }

    console.log(images)
    console.log(previewUrls)

    console.log(theUserState)
    const selectFiles = () => 
    {
        // fileInputRef.current.click()
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
    }

    const selectMultipleFiles = (event) => 
    {
        const selectedFiles = event.target.files;
        console.log(selectedFiles)
        const selectedFilesArray = Array.from(selectedFiles)

        const imagesArray = selectedFilesArray.map((file) => {
            return URL.createObjectURL(file)
        })     
        console.log(imagesArray)   
        imagesArray.forEach((image, index) => {
            advertState.setAvatar(image)
            setImages((previousImages) => previousImages.concat(image))
        })
        thumbnail.forEach((img, index) => {
            console.log(img)
        })
        console.log(imagesArray.length)
        console.log(advertState.getAvatar())

        listOfFiles = []
        for (let index = 0; index < array.length; index++) 
        {
            let x = new File([imagesArray], "filename")
        }
        
        console.log(x)

        // console.log("I came here")
        // const files = event.target.files;
        // console.log(files.length)
        // if(files.length === 0) return;
        // for (let index = 0; index < files.length; index++) 
        // {
        //     if(files[index].type.split('/')[0] !== 'image') continue;
        //     if(thumbnail.length > 0)
        //     {
        //         if(!thumbnail.some((e) => e.name === files[index].name))
        //         {    
        //             setImages((prevImages) => [
        //                 ...prevImages, {
        //                     name: files[index].name,
        //                     url: URL.createObjectURL(files[index])
        //                 }
        //             ])
        //         }
        //     } else { 
        //         setImages((prevImages) => [
        //             ...prevImages, {
        //                 name: files[index].name,
        //                 url: URL.createObjectURL(files[index])
        //             }
        //         ])
        //     }
        // }
        // console.log(thumbnail)
    }

    const deleteImage = (image) => 
    {
        setImages(thumbnail.filter((e) => e !== (image)))
        // setImages((prevImages) => {
        //     prevImages.filter((i) => i != index)
        // })
    }

    const markMainImage = (position) => 
    {
        setMainImagePosition(position)
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
        console.log("=======================")
        console.log(advertState.getStates())
        console.log("=======================")
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

                    { (theManufacturer === "") && tellData(theManufacturer) }
                    {/* <Header /> */}

                    <main className="mb-30 mt-24 md:-mt-5">
                        {/* <MaxWidthWrapper> */}
                            <div className='md:w-12/12 lg:12/12 w-12/12 lg:flex-row'>

                                        <div className="p-1 md:-mt-5">
                                            <div className="grid md:grid-cols-8 grid-cols-8 gap-5 mt-1 justify-center">
                                                
                                                <div className="md:col-span-12 col-span-12 bg-white p-3 rounded-lg order-2 md:order-1">

                                                    <div className="mt-3 mb-5">
                                                        <span className="font-bold text-blue-600">CREATE ADS</span>
                                                    </div>

                                                    <div className="mb-0">
                                                        {/* <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                                                            Categories
                                                        </label> */}
                                                        <div className="relative">
                                                            <span className="w-full font-bold text-sm">State</span>
                                                            <select onChange={
                                                                    (e) => {
                                                                        if(Number(e.target.value) === -1)
                                                                        {
                                                                            setTheState(-1)
                                                                            advertState.setStates(-1)
                                                                            submitForm = false
                                                                            setStateErrorMsg("Kindly Select State")
                                                                        } else {
                                                                            console.log(e.target.value)
                                                                            advertState.setStates(e.target.value)
                                                                            console.log(advertState.getStates())
                                                                            setTheState(e.target.value)
                                                                            submitForm = true
                                                                            setStateErrorMsg("")
                                                                        }
                                                                    }
                                                                } className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                                                { <option value={-1}> - Select States -  </option> }
                                                                {   
                                                                    allRequiredData?.state &&
                                                                    allRequiredData?.state?.length !== 0 &&
                                                                    allRequiredData?.state.map((state) => (
                                                                        <option key={state.id} value={state.id} selected={state.id === Number(theState) ? Number(theState) : ""}>
                                                                            {state.name}
                                                                        </option>
                                                                    ))
                                                                }
                                                            </select>
                                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 mt-5">
                                                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                                            </div>
                                                        </div>
                                                        <div className="text-red-500 font-bold text-sm">{ (theState === -1) ?  stateErrorMsg : "" }</div>
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
                                                                                submitForm = false
                                                                                setCategoryErrorMsg("Kindly Select Category")
                                                                            } else {
                                                                                advertState.setCateg(Number(e.target.value))
                                                                                setTheCategory(Number(e.target.value))
                                                                                submitForm = true
                                                                                setCategoryErrorMsg("")
                                                                            }
                                                                        }
                                                                } className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                                                { <option value={-1}> - Select Category -  </option> }
                                                                {   
                                                                    allRequiredData?.category &&
                                                                    allRequiredData?.category?.length !== 0 &&
                                                                    allRequiredData?.category.map((category) => (
                                                                        <option key={category.id} value={category.id} selected={category.id === Number(theCategory) ? Number(theCategory) : ""}>
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
                                                            <div className="text-red-500 font-bold text-sm">{ (theCategory === -1) ?  categoryErrorMsg : "" }</div>
                                                        </div>
                                                        <div className="p-2 md:w-1/2 w-full">
                                                            <div className="">
                                                                <div className="relative">
                                                                <span className="w-full font-bold text-sm">Manufacturer</span>
                                                                <select onChange={
                                                                    (e) => {    
                                                                            if(e.target.value === "others")
                                                                            {
                                                                                advertState.setMaker(-1)
                                                                                setTheManufacturer(-1)
                                                                                advertState.setOthers(e.target.value)
                                                                                setTheOthers(e.target.value)
                                                                                setCarSelectedModelGroupOption(true)
                                                                                advertState.setModel(-1)
                                                                                setTheModel(-1)
                                                                                setNoMakerOption(false)
                                                                                advertState.setTheMakerModels([])
                                                                                submitForm = true

                                                                            } else if(Number(e.target.value) === -1){
                                                                                setTheManufacturer(-1)                                                                                
                                                                                advertState.setMaker(-1)
                                                                                advertState.setOthers(-1)
                                                                                setTheOthers(-1)
                                                                                setCarSelectedModelGroupOption(false)
                                                                                advertState.setModel(-1)
                                                                                setTheModel(-1)
                                                                                advertState.setTheMakerModels([])

                                                                                setMakerErrorMsg("Kindly Select Manufacturer")
                                                                                setNoMakerOption(true)
                                                                                submitForm = false
                                                                            } else{
                                                                                setTheOthers("")
                                                                                advertState.setOthers("")
                                                                                advertState.setMaker(Number(e.target.value))
                                                                                setTheSelectManufacturer(true)
                                                                                setTheManufacturer(Number(e.target.value))
                                                                                setSelectedMaker(Number(e.target.value))
                                                                                setCarSelectedModelGroupOption(false)
                                                                                setTheManufacturerName("")
                                                                                setTheModelName("")
                                                                                tellData(Number(e.target.value)) 
                                                                                setNoMakerOption(false)
                                                                                submitForm = true
                                                                            }
                                                                        }
                                                                    } className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                                                    { <option value={-1}> - Select Maker -  </option> }
                                                                    {   allRequiredData?.maker && 
                                                                        allRequiredData?.maker?.length !== 0 &&
                                                                        allRequiredData?.maker.map((maker) => (
                                                                            <option key={maker.id} value={maker.id} selected={maker.id === Number(theManufacturer) ? Number(theManufacturer) : ""}>
                                                                                {maker.title}
                                                                            </option>
                                                                        ))                                                                        
                                                                    }
                                                                    <option key={"others"} value={"others"} selected={"others" === theOthers ? theOthers : ""}>
                                                                        Others
                                                                    </option>
                                                                </select>
                                                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 mt-5">
                                                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                                                </div>
                                                                </div>
                                                            </div>                                                            
                                                            <div className="text-red-500 font-bold text-sm">{ ((theManufacturer === -1) && (theOthers === "")) ?  makerErrorMsg : "" }</div>
                                                            {/* <div className="text-red-500 font-bold text-sm">{ ((theManufacturer === "") && (others != "")) ?  "makerErrorMsg" : "" }</div> */}
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="flex flex-wrap -m-2 mt-2">
                                                        <div className="p-2 md:w-1/2 w-full">
                                                            <div className="mb-0">
                                                                <div className="relative">
                                                                    { (theOthers != "others") && <span className="w-full font-bold text-sm">Model</span>}
                                                                    {   !selectManufacturer && (theOthers != "others") && 
                                                                        <select onChange={(e) => {  }
                                                                            } className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                                                            {/* { (theManufacturer === "" || theManufacturer === -1) && <option key={-1} value={-1}> - Select Manufacturer First - </option> } */}
                                                                            { (Number(theManufacturer) === -1) && <option key={-1} value={-1}> - Select Manufacturer First - </option> }
                                                                        </select>
                                                                    }
                                                                    {   !selectedCarModelOption && selectManufacturer && (selectedModel.length === 0 || selectedModel.length > 0) && (theManufacturer === -1) &&
                                                                        (theOthers != "others") &&   
                                                                        <select onChange={(e) =>{ 
                                                                                advertState.setModel(Number(e.target.value))
                                                                                setTheModel(Number(e.target.value))
                                                                            }
                                                                            } className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                                                            { (theOthers === "") && (Number(theManufacturer) === -1) && selectManufacturer && <option key={-1} value={-1}> - Select Manufacturer First - </option> }
                                                                            { (theOthers === "") && (Number(theManufacturer) != -1) && selectManufacturer && <option key={-1} value={-1}> - Select Model - </option> }
                                                                            {                                                                                
                                                                                selectedModel  && !noMakerOption &&
                                                                                selectedModel?.length != 0 &&
                                                                                selectedModel.map((model) => (
                                                                                    <option key={model.code} value={model.id} selected={model.make_id === Number(theModel) ? Number(theModel) : ""}>
                                                                                        {model.title}
                                                                                    </option>
                                                                                ))
                                                                            }
                                                                            {/* { (theManufacturer != "") && tellData(theManufacturer) } */}
                                                                            {                                                                                
                                                                                (theManufacturer === -1) && selectManufacturer && selectedModel  && !noMakerOption &&
                                                                                selectedModel?.length != 0 &&
                                                                                selectedModel.map((model) => (
                                                                                    <option key={model.code} value={model.id} selected={model.make_id === theModel ? theModel : ""}>
                                                                                        {model.title}
                                                                                    </option>
                                                                                ))
                                                                            }
                                                                        </select>
                                                                    }

                                                                    
                                                                    {   !selectedCarModelOption && selectManufacturer && (selectedModel.length > 0) && (theManufacturer != -1) &&
                                                                        (theOthers != "others") &&   
                                                                        <select onChange={(e) =>{ 
                                                                                advertState.setModel(Number(e.target.value))
                                                                                setTheModel(Number(e.target.value))
                                                                                console.log(Number(e.target.value))
                                                                            }
                                                                            } className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                                                            {/* { (theManufacturer != "") && tellData(theManufacturer) } */}
                                                                            <option key={-1} value={-1}> - Select Model First - </option>
                                                                            {            
                                                                                selectedModel.map((model) => (
                                                                                    <option key={model.code} value={model.id} selected={Number(model.id) === (Number(theModel)) ? (Number(theModel)) : ""}>
                                                                                        {model.title}
                                                                                    </option>
                                                                                ))
                                                                            }
                                                                        </select>
                                                                    }

                                                                    { (theOthers != "others") && <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 mt-5">
                                                                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                                                        </div>
                                                                    }
                                                                    { (theOthers === "others") && <span className="w-full font-bold text-sm">Enter Model</span>}
                                                                    { (theOthers === "others") && <input onBlur={(e) => {
                                                                            advertState.setTheManufacturerName(e.target.value)
                                                                            setTheManufacturerName(e.target.value)
                                                                        }} type="text" id="manufacturerName" defaultValue={theManufacturerName}  name="manufacturerName" placeholder={"Enter Manufacturer Name"}
                                                                        className="mb-3 w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 text-sm py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                                                    }
                                                                    { (theOthers === "others") && <input onBlur={(e) => {
                                                                            advertState.setTheModelName(e.target.value)
                                                                            setTheModelName(e.target.value)
                                                                        }} type="text" id="modelName" defaultValue={theModelName}  name="modelName" placeholder={"Enter Model Name"} className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 text-sm py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                                                    }
                                                                </div>
                                                                { (theOthers != "others") &&  <div className="text-red-500 font-bold text-sm">{ (theModel === "" || theModel === -1) ?  modelErrorMsg : "" }</div> }
                                                                { (theOthers === "others") && <div className="text-red-500 font-bold text-sm">{ ((theManufacturerName === "") || (theModelName === "")) ?  entryErrorMsg : "" }</div> }
                                                            </div>
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
                                                                            submitForm = false
                                                                            setProductionYearErrorMsg("Kindly Select Production Year")
                                                                        } else {
                                                                            advertState.setYearOfPoduction(Number(e.target.value))
                                                                            setTheProductionYear(Number(e.target.value))
                                                                            submitForm = true
                                                                            setProductionYearErrorMsg("")
                                                                        }
                                                                } 
                                                                    } className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                                                { <option value={-1}> - Select Year -  </option> }
                                                                {
                                                                    years &&
                                                                    years?.length !== 0 &&
                                                                    years.map((year) => (
                                                                        <option key={year} value={year} selected={Number(year)  === Number(theProductionYear) ? Number(theProductionYear) : ""}>
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
                                                            <div className="text-red-500 font-bold text-sm">{ (theProductionYear === -1) ?  productionYearErrorMsg : "" }</div>
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
                                                                            submitForm = false
                                                                            setColorErrorMsg("Kindly Select Colour")
                                                                        } else {
                                                                            advertState.setColour(Number(e.target.value))
                                                                            setTheColour(Number(e.target.value))
                                                                            submitForm = true
                                                                            setColorErrorMsg("")
                                                                        }
                                                                    } 
                                                                    } className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                                                { <option value={-1}> - Select Colour -  </option> }
                                                                {
                                                                    allRequiredData?.colour &&
                                                                    allRequiredData?.colour?.length !== 0 &&
                                                                    allRequiredData?.colour.map((colour) => (
                                                                        <option key={colour.id} value={colour.id} data-id={colour.name} selected={colour.id === Number(theColour) ? Number(theColour) : ""}>
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
                                                                            submitForm = false
                                                                            setTransmissionErrorMsg("Kindly Select Transmission")
                                                                        } else {
                                                                            advertState.setTransmission(Number(e.target.value))
                                                                            setTheTransmission(Number(e.target.value))
                                                                            submitForm = true
                                                                            setTransmissionErrorMsg("")
                                                                        }
                                                                    } 
                                                                    } className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                                                { <option value={-1}> - Select Transmission -  </option> }
                                                                {
                                                                    allRequiredData?.transmission &&
                                                                    allRequiredData?.transmission?.length !== 0 &&
                                                                    allRequiredData?.transmission.map((transmission) => (
                                                                        <option key={transmission.id} value={transmission.id} selected={transmission.id === Number(theTransmission) ? Number(theTransmission) : ""}>
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
                                                                                submitForm = false
                                                                                setConditionErrorMsg("Kindly Select Condition")
                                                                            } else {
                                                                                advertState.setCondition(Number(e.target.value))
                                                                                setTheCondition(Number(e.target.value))
                                                                                submitForm = true
                                                                                setConditionErrorMsg("")
                                                                            }
                                                                        }
                                                                        } className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                                                    { <option value={-1}> - Select Condition -  </option> }
                                                                    {
                                                                        allRequiredData?.condition &&
                                                                        allRequiredData?.condition?.length !== 0 &&
                                                                        allRequiredData?.condition.map((condition) => (
                                                                            <option key={condition.id} value={condition.id} selected={condition.id === Number(theCondition) ? Number(theCondition) : ""}>
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
                                                            <div className="mb-0">
                                                                <div className="relative">
                                                                <span className="w-full font-bold text-sm">Trim</span>
                                                                <select onChange={(e) => { 
                                                                    // alert(e.target.value)
                                                                    if(Number(e.target.value) === -1)
                                                                    {
                                                                        setTheTrim(advertState.setTrim(-1))
                                                                        setTheTrim(-1)
                                                                        submitForm = false
                                                                        setTrimErrorMsg("Kindly Select Trim")
                                                                    } else {
                                                                        advertState.setTrim(Number(e.target.value))
                                                                        setTheTrim(Number(e.target.value))
                                                                        submitForm = true
                                                                        setTrimErrorMsg("")
                                                                    }
                                                                    // setTheTrim(e.target.value)
                                                                } 
                                                                } className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                                                { <option value={-1}> - Select Trim -  </option> }
                                                                {
                                                                    allRequiredData?.trim &&
                                                                    allRequiredData?.trim?.length !== 0 &&
                                                                    allRequiredData?.trim.map((trim) => (
                                                                        <option key={trim.id} value={trim.id} selected={trim.id === Number(theTrim) ? Number(theTrim) : ""}>
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
                                                            <div className="text-red-500 font-bold text-sm">{ (theTrim === -1) ?  trimErrorMsg : "" }</div>
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-wrap -m-2 mt-5 md:mb-10 mb-20 p-2">
                                                        <span className="w-full font-bold text-sm">Description</span>
                                                        <ReactQuill theme="snow" defaultValue={value} onChange={setValue} className="w-full h-[150px]" modules={modules} />
                                                        {/* <textarea onChange={(e) => { 
                                                                advertState.setDescription(e.target.value)
                                                                setTheDescription(e.target.value)
                                                            } 
                                                        } defaultValue={theDescription} className="shadow form-textarea mb-2 block w-full border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" rows="2" placeholder="Enter Description"></textarea> */}
                                                    </div>

                                                    <div className="flex flex-wrap -m-2 mt-2 mb-5">
                                                        <div className="p-2 md:w-1/2 w-full">
                                                            <span className="w-full font-bold text-sm">Chasis Number</span>
                                                            <input onBlur={(e) => {
                                                                advertState.setChasisNumber(e.target.value)
                                                                setTheChasisNo(e.target.value)
                                                            }} type="text" id="vin" defaultValue={theChasisNo}  name="vin" placeholder="VIN chasis number (Optional)" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 text-sm py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                                        </div>
                                                        <div className="p-2 md:w-1/2 w-full">
                                                            <span className="w-full font-bold text-sm">Price</span>
                                                            <input onKeyUp={(e) => {    
                                                                advertState.setPrice(e.target.value)
                                                                setThePrice(e.target.value)} 
                                                            } type="text" id="price" defaultValue={thePrice} name="price" placeholder="Price (₦)" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 text-sm leading-8 transition-colors duration-200 ease-in-out" />
                                                            <div className="text-red-500 font-bold text-sm">{ (thePrice === "") ?  priceErrorMsg : "" }</div>
                                                        </div>
                                                    </div>

                                                    <div className="card mb-5">
                                                        <div className="top">
                                                            <p>Upload Vehicle Images</p>
                                                        </div>
                                                        <div className="text-red-500 font-bold text-sm">{ (mainImagePosition === -1) ?   mainImageErrorMsg : "" }</div>
                                                        <div className="drag-area p-3 items-center text-center flex justify-center">
                                                            {
                                                                (true === false) ? (
                                                                    <span className="select">Drop Image Here</span>
                                                                ) : (
                                                                    <>
                                                                        
                                                                        <span className="flex justify-center items-center text-xs block" role="button">
                                                                            <b class="px-10 py-5">Browse</b>
                                                                            <input type="file" name="file" className="file" multiple onChange={handleMultipleImages} />
                                                                        </span>
                                                                    </>
                                                                )                                        
                                                            }
                                                        </div>
                                                        {/* <div className="grid md:grid-cols-12 gap-5">
                                                            <EditProductImage data={'data'} />
                                                        </div> */}
                                                        <div className="grid md:grid-cols-12 gap-5 pt-3">
                                                            {/* {
                                                                images.map((image, index) => 
                                                                {
                                                                    <div className="image" key={index}>
                                                                    {index}
                                                                        <span className="delete" onClick={() => deleteImage(index)}>&times;</span>
                                                                        <img src={image.url} alt={image.name} />
                                                                    </div>
                                                                })
                                                            } */}
                                                            {
                                                                previewUrls && previewUrls.map((image, index) => {
                                                                    let whenSet = (index === mainImagePosition) ? `col-span-3 z-30 border border-4 h-23 relative border-green p-1 bg-green-400` : `col-span-3  z-30 border border-2 h-23 relative`
                                                                    return (
                                                                        <div className={whenSet} key={index}>
                                                                            <img src={image} alt="upload" />
                                                                            {/* <span className="delete cursor-pointer pt-2 pl-3" onClick={() => setImages((e) => e !== image)}> */}
                                                                            <div className="absolute flex justify-between bottom-0 w-full">
                                                                                <span className="rounded-sm border border-1 left-0 border-green-900 p-1 bg-blue-200 delete cursor-pointer hover:bg-orange-200" onClick={() => handleDeleteImage(index)}>
                                                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" class="w-4 h-4">
                                                                                        <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clip-rule="evenodd" />
                                                                                    </svg>
                                                                                </span>
                                                                                <span className="rounded-sm border border-1 right-0 border-green-900 p-1 bg-blue-200 delete cursor-pointer hover:bg-orange-200" onClick={() => markMainImage(index)}>
                                                                                    {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" class="w-4 h-4">
                                                                                        <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clip-rule="evenodd" />
                                                                                    </svg> */}
                                                                                    <div 
                                                                                        className="p-1 bg-blue-700 hover:bg-blue-900 text-white hover:font-bold" 
                                                                                        style={{ fontSize: "9px" }}
                                                                                        >
                                                                                            Make as Main Image
                                                                                    </div>
                                                                                </span>
                                                                            </div>
                                                                        </div> 
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                    </div>
                                                    
                                                    {
                                                        /* <div className="grid md:grid-cols-12 grid-cols-12 gap-5 md:p-3 mb-5 justify-center items-center border border-2 rounded-lg">
                                                        <div className="col-span-6">
                                                            <button onClick={() => {
                                                                 setSelectedOptionOne('border-blue-200')
                                                                 setSelectedOptionTwo('')
                                                                 userOption(1) 
                                                            }} className={`bg-green-600 ${selectedOptionOne} border border-4 border-dotted text-white font-medium text-sm py-4 w-full px-6 rounded-md gap-2 hover:bg-blue-700`}>
                                                                Free (₦) 0.00
                                                            </button>
                                                        </div>
                                                        <div className="col-span-6">
                                                            <button onClick={() => {
                                                                 setSelectedOptionOne('')
                                                                 setSelectedOptionTwo('border-blue-200')
                                                                 userOption(2) 
                                                            }}  className={`bg-green-600 ${selectedOptionTwo} border border-4 border-dotted text-white font-medium text-sm py-4 w-full px-6 rounded-md gap-2 hover:bg-blue-700`}>
                                                                Premium (₦) 35, 000.00
                                                            </button>
                                                        </div>
                                                        </div> */
                                                    }

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
                                                    <div className="w-full">                                                        
                                                        { fillForm && <span className="font-bold text-md mb-3 text-red-600"> { fillForm } </span> }
                                                    </div>
                                                    <div className="px-1 py-2 mt-5 flex justify-between">
                                                        {/* {
                                                            (data?.category_id == theCategory) && 
                                                                <button className="bg-primary text-white font-medium text-sm py-2.5  px-6 rounded-md flex items-center gap-2 hover:bg-blue-700" style={{backgroundColor: "#1e3a8a"}}>
                                                                    Update
                                                                </button>
                                                        } */}
                                                        <button onClick={() => {
                                                            setProcessAdvert(true)
                                                            advertState.setProcessAdvert(true)
                                                            savePost('no')
                                                        }} className="bg-brandGreen text-white font-semibold px-4 py-3 rounded disabled:bg-brandDarkGray" style={{backgroundColor: "#1e3a8a"}}>
                                                            { processAdvert ? <BeatLoader size={10} color="#fff" /> : "Upload Ad"}
                                                        </button>
                                                        <button onClick={() => {
                                                            advertState.setProcessAdvertAsDraft(true)
                                                            setProcessAdvertAsDraft(true)
                                                            savePost('yes')
                                                        }} className="bg-brandGreen text-white font-semibold px-4 py-3 rounded disabled:bg-brandDarkGray" style={{backgroundColor: "#1e3a8a"}}>
                                                            { processAdvertAsDetail ? <BeatLoader size={10} color="#fff" /> : "Save As Draft"}
                                                        </button>
                                                    </div>

                                                    <div className="p-2"></div>
                                                </div>

                                            </div>
                                        </div>

                            </div>
                        {/* </MaxWidthWrapper> */}

                        <SuccessModal onClick={() => setSuccessModal(false) } successModal={successModal} returnTo={'/dashboard/store'} message={msg} />
                   
                    </main>

                    </>
                )
            }
        </>
    );
}

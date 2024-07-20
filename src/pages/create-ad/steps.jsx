// import { fetchMaker, fetchModel } from "apis/misc";
import { createAd } from "@/apis/ads";
import { fetchPlans } from "@/apis/misc";
import {
  CategorySelect,
  ColourSelect,
  ConditionSelect,
  MakeAndModelSelect,
  StateSelect,
  TransmissionSelect,
  TrimSelect,
  YearSelect,
} from "@/components/select";
import { PostAdContext } from "@/context/post-ad-context";
import { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { BeatLoader } from "react-spinners";
import currencyFormatter from "@/utils/currency-formatter";
import { checkPayment, requestPayment } from "@/apis/payment";
import ImageUploading from "react-images-uploading";
import { appStore } from "@/state/appState";

const FirstStep = () => 
{  
  const advertState = appStore((state) => state)
  const { nextStep, setData, data } = useContext(PostAdContext);
  const [error, setError] = useState("");
  const [formattedImage, setFromattedImage] = useState("");
  const [images, setImages] = useState([]);
  const maxNumber = 15;
  const maxFileSize = 3000000;

  useEffect(() => {
      console.log(advertState.getStates())
  }, [])

  const onChange = (imageList) => {
    console.log(imageList)
    setImages(imageList);
    let data = "";
    imageList.map((image) => {
      let base64 = image.data_url.split(",")[1];
      // advertState.setAvatar(base64)
      data += `${data && "<=>"}${base64}`;
    });
    setFromattedImage(data);
  };

  const addAvatar = () => {
    handleData({ avatar: formattedImage });
  };

  const isDataComplete = () => {
    return data.state && images.length >= 5;
  };
  const handleData = (newData) => {
    setData((data) => {
      return { ...data, ...newData };
    });
  };

  // const imageUrl = URL.createObjectURL(advertState.getAvatar())

  return (
    <>
      <div className="px-5 py-10 h-max flex flex-col items-center justify-center gap-5">
        {/* <div className="bg-brandGreen h-2 w-1/5 rounded-md"></div> */}
        <h1 className="text-brandGreen font-bold text-3xl text-center">
          Post An Ad
        </h1>

        {/* <img src={imageUrl} /> */}
        
        {/* <h1>{advertState.getStates()}</h1>
        <h1>{data.state}</h1> */}
        <StateSelect value={data.state} setValue={handleData} />

        <div className="flex flex-col items-center text-center gap-2 mt-10 w-full">
          <h2 className="text-brandGreen text-[20px] font-bold">Add Images </h2>
          <p className="text-sm md:text-base font-medium">
            This should be the image of your car.
          </p>

          <p className="text-neutral-700 max-w-[350px] text-sm md:text-base">
            Include at least 5 image.
          </p>

          {/* Display error message if there is an error */}
          {error && <div className="text-brandRed text-sm">{error}</div>}

          <ImageUploading
            multiple
            value={images}
            onChange={onChange}
            maxNumber={maxNumber}
            maxFileSize={maxFileSize}
            dataURLKey="data_url"
            acceptType={["jpg"]}
          >
            {({
              imageList,
              onImageUpload,
              onImageRemoveAll,
              onImageUpdate,
              onImageRemove,
              isDragging,
              dragProps,
              errors,
            }) => (
              // write your building UI
              <div className="w-full">
                {errors && (
                  <div className="text-brandRed text-sm">
                    {errors.maxNumber && (
                      <span>Images must not be more than {maxNumber}</span>
                    )}
                    {errors.acceptType && (
                      <span>Your selected file type is not allow</span>
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
                  className="w-full bg-brandGray h-[100px] rounded-xl flex flex-col items-center justify-center p-2 gap-2 relative  border-dashed border-brandDarkGray border"
                >
                  <img src="/assets/icons/camera.svg" alt="" />
                  <p className="text-brandDarkGray italic font-semibold text-sm text-center">
                    Click or Drop image(s) here
                  </p>
                </div>
                &nbsp;
                {/* <button
                  onClick={onImageRemoveAll}
                  className=" text-brandRed text-sm font-semibold"
                >
                  Click to remove all images
                </button> */}
                <div className="flex flex-wrap gap-2 w-full justify-center">
                  {imageList.map((image, index) => (
                    <div key={index} className="w-[100px] relative">
                      <img src={image.data_url} alt="" width="100" />

                      <div className="absolute top-1 right-1">
                        {/* // onClick={() => onImageUpdate(index)}
                     
                    // onClick={() => onImageRemove(index)}  */}

                        <button
                          onClick={() => {
                            advertState.removeImage(image)
                            onImageRemove(index)
                          }}
                          className="bg-white text-red-500 rounded-full w-5 h-5 border border-brandRed flex items-center justify-center cursor-pointer"
                        >
                          x
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </ImageUploading>
        </div>

        <button
          onClick={() => {
            addAvatar();
            nextStep();
          }}
          disabled={!isDataComplete()}
          className="bg-brandGreen text-white font-semibold px-4 py-3 rounded disabled:bg-brandDarkGray"
        >
          Proceed
        </button>
      </div>
    </>
  );
};

const SecondStep = () => {
  const advertState = appStore((state) => state)
  const mdl = advertState.getModel()
  const { nextStep, step, setStep, setData, data } = useContext(PostAdContext);
  const isDataComplete = () => {
    // advertState.setMaker(data.maker)
    // advertState.Model(data.model)
    if(data.model === "")
    {
      return data.others && data.model && data.year_of_production && data.category;
    } else {
      return data.maker && data.model && data.year_of_production && data.category;
    }
  };
  const handleData = (newData) => {
    setData((data) => {
      return { ...data, ...newData };
    });
  };

  return (
    <>
      <div className="px-5 pt-10 h-max flex flex-col items-center justify-center gap-5">
        <h1 className="text-brandGreen font-bold text-xl md:text-2xl lg:text-3xl text-center">
          Car details 
        </h1>

        <div className="flex flex-col items-center text-center gap-2 max-w-[400px] w-full">
          <CategorySelect value={data.category} setValue={handleData} />
          {/* <h2>{advertState.getOthers()}</h2>
          <h2>{advertState.getMaker()}</h2> */}
          
          <MakeAndModelSelect
              value={{ maker: data.maker, model: data.model }}
              setValue={handleData}
            />    
          {
             
             (advertState.getOthers() === "others") && <>

                <input
                    type="text"
                    placeholder="Enter Manufacturer Name"
                    name="maker"
                    defaultValue={advertState.getMaker()}
                    onBlur={(e) => {
                      e.preventDefault()
                      advertState.setMaker(e.target.value)
                      // advertState.setModel("")
                      console.log(e.target.value)
                      handleData({ maker: e.target.value })
                    }}
                    className="mt-1.5 w-full p-3 rounded-lg border outline-none border-brandGreen/50 focus:border-brandGreen text-gray-700 text-sm md:text-base bg-transparent"
                />
                {/* {mdl} */}
                <input
                    type="text"
                    placeholder="Enter Model Name"
                    name="model"
                    defaultValue={advertState.getModel()}
                    onKeyUp={(e) => {
                      e.preventDefault()
                      advertState.setModel(e.target.value)
                      // advertState.setModel("")
                      console.log(e.target.value)
                      handleData({ model: e.target.value })
                    }}
                    className="mt-1.5 w-full p-3 rounded-lg border outline-none border-brandGreen/50 focus:border-brandGreen text-gray-700 text-sm md:text-base bg-transparent"
                />
             </>
          }           
          <YearSelect value={data.year_of_production} setValue={handleData} />
        </div>

        {/* Action Button */}
        <div className="flex justify-between w-full mt-10">
          <div
            onClick={() => setStep(step - 1)}
            className="cursor-pointer text-brandDarkGray font-semibold px-4 py-3 rounded"
          >
            Back
          </div>
          <button
            onClick={nextStep}
            disabled={!isDataComplete()}
            className="bg-brandGreen text-white font-semibold px-4 py-3 rounded disabled:bg-brandDarkGray"
          >
            Proceed
          </button>
        </div>
      </div>
    </>
  );
};

const ThirdStep = () => {
  const advertState = appStore((state) => state)
  const selectedChasisNumber = advertState.getTransmission()

  const { nextStep, step, setStep, setData, data } = useContext(PostAdContext);
  const isDataComplete = () => {
    return data.colour && data.transmission && data.condition;
  };
  const handleData = (newData) => {
    setData((data) => {
        // console.log(newData)
      return { ...data, ...newData };
    });
  };

  return (
    <>
      <div className="px-5 pt-10 h-max flex flex-col items-center justify-center gap-5">
        <h1 className="text-brandGreen font-bold text-xl md:text-2xl lg:text-3xl text-center">
          Car descriptions
        </h1>

        <div className="flex flex-col items-center text-center gap-2 max-w-[400px] w-full">
          <ColourSelect value={data.colour} setValue={handleData} />
          <TransmissionSelect value={data.transmission} setValue={handleData} />
          <ConditionSelect value={data.condition} setValue={handleData} />
          <input
            type="text"
            value={data.chasis_number}
            onChange={(e) => {
              advertState.setChasisNumber(e.target.value)
              handleData({ chasis_number: e.target.value });
            }}
            name="chasis_number"
            placeholder="VIN chasis number (Optional)"
            className="mt-1.5 w-full p-3 rounded-lg border outline-none border-brandGreen/50 focus:border-brandGreen text-gray-700 text-sm md:text-base bg-transparent"
          />
          <TrimSelect value={data.trim} setValue={handleData} />
        </div>

        {/* Action Button */}
        <div className="flex justify-between w-full mt-10">
          <div
            onClick={() => setStep(step - 1)}
            className="cursor-pointer text-brandDarkGray font-semibold px-4 py-3 rounded"
          >
            Back
          </div>
          <button
            onClick={nextStep}
            disabled={!isDataComplete()}
            className="bg-brandGreen text-white font-semibold px-4 py-3 rounded disabled:bg-brandDarkGray"
          >
            Proceed
          </button>
        </div>
      </div>
    </>
  );
};

const FourthStep = () => {
  const advertState = appStore((state) => state)
  const descriptionState = advertState.getDescription()
  const priceState = advertState.getPrice()

  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const {
    nextStep,
    step,
    setStep,
    setData,
    data,
    selectedPlan,
    setSelectedPlan,
    title,
    setProductId,
  } = useContext(PostAdContext);

  const isDataComplete = () => {
    return data.description && data.plan_id;
  };
  const handleData = (newData) => {
    setData((data) => {
      return { ...data, ...newData };
    });
  };
  // console.log(title);

  const handleSubmit = () => {
    setLoading(true);
    setError("");

    const requestData = { ...data, ...title }; // remove trim

    console.log(requestData);

    createAd(requestData)
      .then((res) => {
        setLoading(false);
        setProductId(res.data);
        nextStep();
      })
      .catch((err) => {
        setLoading(false);
        setError(`${err}`);
      });
  };

  const { data: plans, isLoading } = useQuery("plans", fetchPlans, {
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    retry: 2,
  });
  return (
    <>
      <div className="px-5 pt-10 h-max flex flex-col items-center justify-center gap-5">
        <div className="flex flex-col items-center text-center gap-2 max-w-[400px] w-full">
          <div className="w-full">
            <textarea
              id="Description"
              className="mt-2 w-full border rounded-lg align-top p-2 shadow-sm text-sm md:text-base border-brandGreen/50 focus:border-brandGreen outline-none"
              rows="4"
              onBlur={(e) => {
                advertState.setDescription(e.target.value)
                handleData({ description: e.target.value });
              }}
              placeholder="Description"
            >
              {advertState.getDescription()}
            </textarea>
          </div>

          <input
            type="number"
            placeholder="Price (₦)"
            name="price"
            defaultValue={advertState.getPrice()}
            // value={advertState.getPrice()}
            onBlur={(e) => {
              const rawValue = e.target.value; // Remove extra decimal points
              advertState.setPrice(e.target.value)
              setPrice(rawValue);
              handleData({ price: rawValue });
            }}
            className="mt-1.5 w-full p-3 rounded-lg border outline-none border-brandGreen/50 focus:border-brandGreen text-gray-700 text-sm md:text-base bg-transparent"
          />

          <div className="w-full h-20 border rounded-lg border-brandGreen/50 p-3 gap-4 flex">
            {plans &&
              plans?.map((plan) => (
                <div
                  onClick={() => setSelectedPlan(plan.id)}
                  key={plan.id}
                  className={` cursor-pointer w-full h-full rounded-lg flex justify-center flex-col text-sm ${
                    plan.id === selectedPlan
                      ? "bg-brandGreen text-white font-semibold"
                      : "bg-brandGreen/10 text-brandGreen"
                  } `}
                >
                  <p>{plan.name}</p>
                  <p>{currencyFormatter(plan.amount)}</p>
                </div>
              ))}
          </div>
        </div>

        {/* error */}
        <div className={`transition duration-300 w-full ${!error && "hidden"}`}>
          <div
            className={`bg-red-500/10 border-red-500/80 border w-full flex justify-center p-2`}
          >
            <p className=" w-max text-center text-xs text-[#D10000]">{error}</p>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-between w-full mt-10">
          <div
            onClick={() => setStep(step - 1)}
            className="cursor-pointer text-brandDarkGray font-semibold px-4 py-3 rounded"
          >
            Back
          </div>
          <button
            onClick={handleSubmit}
            disabled={!isDataComplete()}
            className="bg-brandGreen text-white font-semibold px-4 py-3 rounded disabled:bg-brandDarkGray"
          >
            {loading ? <BeatLoader size={10} color="#fff" /> : "Submit"}
          </button>
        </div>
      </div>
    </>
  );
};

const FifthStep = () => {
  const { productId, data } = useContext(PostAdContext);

  // console.log(productId, data.plan_id);

  const [refreshing, setRefreshing] = useState(false);

  const [status, setStatus] = useState(null);

  const requestData = { product_id: productId, plan_id: data.plan_id };

  const { data: paymentInfo, isLoading } = useQuery(
    ["requestPayment", productId],
    () => requestPayment(requestData),
    {
      enabled: data.plan_id !== 1,
      staleTime: Infinity,
    }
  );

  const handleCheckPayment = () => {
    if (refreshing || !paymentInfo?.id) return;

    setRefreshing(true);

    checkPayment(paymentInfo.id)
      .then((res) => {
        setRefreshing(false);
        setStatus(true);
        // console.log(res);
      })
      .catch((err) => {
        setRefreshing(false);
        // console.log(`${err}`);
      });
  };

  // console.log(paymentInfo);

  return (
    <>
      <div className="justify-center items-center flex flex-col gap-4 px-5 py-10">
        <div className="h-[55px] w-[55px]">
          <img src="/assets/icons/success.svg" alt="" />
        </div>

        <p className="text-center max-w-[350px] text-sm">
          We have recieved your details,{" "}
          {paymentInfo && "make payment to the account details below and"}{" "}
          Kindly wait for our response{" "}
        </p>

        {isLoading && <BeatLoader />}

        {paymentInfo && (
          <div className=" w-full border-brandGreen p-2 rounded-lg flex flex-col items-center gap-4">
            <div className="bg-brandGreen/5 border border-brandGreen rounded-lg p-5 flex flex-col text-brandGreen  mt-4 text-sm font-medium gap-1 ">
              <p>
                Account Name:{" "}
                <span className="font-semibold">
                  {paymentInfo?.customer_name}
                </span>
              </p>
              <p>
                Account Number:{" "}
                <span className="font-semibold">
                  {" "}
                  {paymentInfo?.account_number}
                </span>
              </p>
              <p>
                Bank Name:{" "}
                <span className="font-semibold">{paymentInfo?.bank_name}</span>
              </p>
              <p>
                Total Amount:{" "}
                <span className="font-semibold">
                  {paymentInfo?.total_amount &&
                    currencyFormatter(paymentInfo.total_amount)}
                </span>
              </p>
              <p>
                Reference:{" "}
                <span className="font-semibold"> {paymentInfo?.reference}</span>
              </p>
            </div>

            <ClipboardToCopy copyText={paymentInfo.account_number} />

            {!status ? (
              <div className="flex flex-col items-center justify-center gap-4 font-semibold text-sm text-brandGreen  w-full py-5">
                <p className=" font-semibold text-xs text-brandRed">
                  Awaiting Payment...
                </p>

                <button
                  onClick={handleCheckPayment}
                  className="cursor-pointer outline-none bg-brandGreen p-2 px-4 text-white rounded-full w-[100px]"
                >
                  {refreshing ? (
                    <BeatLoader size={8} color="#fff" />
                  ) : (
                    "Refresh"
                  )}
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-4 font-semibold text-sm text-brandGreen  w-full py-5">
                <p className=" font-normal text-brandRed">Payment Completed</p>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export { FirstStep, SecondStep, ThirdStep, FourthStep, FifthStep };

function ClipboardToCopy({ copyText }) {
  const [isCopied, setIsCopied] = useState(false);

  // This is the function we wrote earlier
  async function copyTextToClipboard(text) {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand("copy", true, text);
    }
  }

  // onClick handler function for the copy button
  const handleCopyClick = () => {
    // Asynchronously call copyTextToClipboard
    copyTextToClipboard(copyText)
      .then(() => {
        // If successful, update the isCopied state value
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      onClick={handleCopyClick}
      className="justify-center hover:bg-brandGreen hover:text-white w-max my-2 text-xs border border-brandGreen font-semibold py-2 px-5 rounded-full text-brandGreen"
    >
      {isCopied ? "Copied" : "Copy account number"}
    </div>
  );
}

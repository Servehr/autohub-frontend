import RegisterProvider, {
  RegisterContext,
  types,
} from "@/context/register-context";
import { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { schemaForAffiliate, schemaForBuyer } from "./schema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { BeatLoader } from "react-spinners";
import { registerAffiliate, registerBuyer } from "@/apis/auth";
import { updateAvatar } from "@/apis/user";
import { Helmet } from "react-helmet-async";
import ImageUploading from "react-images-uploading";
import useUser from "@/hooks/useUser";

export default function RegisterPage() 
{  
  const navigate = useNavigate();
  const { data: user } = useUser();
  // alert(user?.data?.id)
  // if((user?.data?.id !=-1) || (user?.data?.id !=undefined) ||  (user?.data?.id !=''))
  // {
  //     navigate('/')
  // }

  if(localStorage.getItem("token") != undefined || localStorage.getItem("token") != '' || localStorage.getItem("token") != null)
    {
        navigate('/')
    }

  return (
    <RegisterProvider>
      <RegisterView />
    </RegisterProvider>
  );
}

function RegisterView() 
{
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [allow, setIsAllow] = useState("");
  const [imageSize, setImageSize] = useState(0);
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);
  const { data: user } = useUser();
  const [successful, setSuccessful] = useState(false)

  useEffect(() => {
      console.log(imageSize)
  }, [imageSize])


  const { step, userType, decrement, setType, increment } = useContext(RegisterContext);

  const [formattedImage, setFromattedImage] = useState("");
  const [image, setImage] = useState([]);
  const maxFileSize = 3000000;

  function fixBinary (bin) {
    var length = bin.length;
    var buf = new ArrayBuffer(length);
    var arr = new Uint8Array(buf);
    for (var i = 0; i < length; i++) {
      arr[i] = bin.charCodeAt(i);
    }
    return buf;
  }

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
      console.log('Created a png blob of size: ' + blob.size);
      if(blob.size > 1000000)
      {
          setError("Image must not be more than 1 MB")
          setIsAllow(false)
          binary = ''
      } else {
          console.log(data)
          console.log(typeof x)
          console.log(typeof data)
          setFromattedImage(x);
          setError("")
          setIsAllow(true)
      }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (formattedImage) {
      setError("");
      setLoading(true);
      let requestData = { avatar: formattedImage };

      updateAvatar(requestData)
        .then(() => {
            setSuccessful(true)
            setTimeout(() => {
              navigate("/login", { replace: true })
            }, 10000)
        })
        .catch((err) => {
          setLoading(false);
          setError(`${err}`);
        });
    }
  };

  const schema = userType === types[0] ? schemaForBuyer : schemaForAffiliate;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {    
    // return
    if (userType === types[0]) {
      setLoading(true);
      setError("");
      const { email, name, password, phoneno } = data;

      registerBuyer({ name, password, phoneno, email })
        .then((res) => {
          setLoading(false);
          increment();
          return
        })
        .catch((err) => {
          setLoading(false);
          setError(`${err}`);
          console.log(err);
        });
    }
    if (userType === types[1]) {
      setLoading(true);
      setError("");
      const {
        email,
        name,
        password,
        phoneno,
        company_address,
        company_cac,
        company_name,
      } = data;

      registerAffiliate({
        name,
        password,
        phoneno,
        email,
        company_address,
        company_cac,
        company_name,
      })
        .then(() => {
          // console.log()
          setLoading(false);
          increment();
          return
        })
        .catch((err) => {
          setLoading(false);
          setError(`${err}`);
          console.log(err);
        });
    }
  };

  const handleChoice = (id) => {
    setType(id);
    increment();
  };

  return (
    <>
      <Helmet>
        <title>Register | Autohub</title>
        <meta name="description" content="The Home For Automobiles" />
      </Helmet>

      <div
        className="bg-brandGreen bg-opacity-95 min-h-screen h-full w-screen flex flex-col items-center p-3 sm:p-8 md:p-10 duration-1000 ease-in-out transition"
        // style={menuStyle}
      >
        <div className="w-full h-10 flex justify-end mb-20">
          {/* menu */}
          <div
            className="flex items-center gap-4 cursor-pointer"
            onClick={(e) => {
              navigate("/");
            }}
          >
            <div className="h-[50px] sm:h-[58px] aspect-square rounded-full bg-[#1B5B29] text-3xl text-white flex justify-center items-center">
              <img src="/assets/close.svg" alt="" className="h-[30px] w-auto" />
            </div>
          </div>
        </div>

        {step === 1 && (
          <>
            <div className="flex flex-col md:flex-row gap-10 justify-center items-center">
              {/*  Member  */}
              <div className="md:max-w-[450px] md:h-[450px] w-full border p-5 gap-8 md:p-16 lg:p-20 flex flex-col md:gap-10 justify-center items-center bg-white rounded-lg">
                <div className="flex flex-col justify-center items-center gap-2 md:gap-4">
                  <h3 className="font-medium text-lg md:text-2xl text-brandGreen">
                    Member
                  </h3>

                  <p className="text-center px-5 text-sm md:text-base">
                    Register here if you want to sell or buy. You can still
                    change later.
                  </p>
                </div>

                <button
                  onClick={() => handleChoice(0)}
                  className="px-6 h-[50px] bg-brandGreen text-white rounded-md font-semibold"
                >
                  Register
                </button>
              </div>

              {/* Affiliate */}
              <div className="md:max-w-[450px] md:h-[450px] w-full border p-5 gap-8 md:p-16 lg:p-20 flex flex-col md:gap-10 justify-center items-center bg-white rounded-lg">
                <div className="flex flex-col justify-center items-center gap-2 md:gap-4">
                  <h3 className="font-medium text-lg md:text-2xl text-brandRed">
                    Affiliate
                  </h3>

                  <p className="text-center px-5 text-sm md:text-base">
                    Register here if you want to become an Affiliate Dealer with
                    Autohub Nigeria.
                  </p>
                </div>

                <button
                  onClick={() => handleChoice(1)}
                  className="px-6 h-[50px] bg-brandGreen text-white rounded-md font-semibold"
                >
                  Register
                </button>
              </div>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div className="max-w-[600px] max-h-[calc(100vh-300px)] w-full bg-white rounded-[10px] relative flex flex-col justify-between overflow-hidden">
              <div className="h-full overflow-y-auto p-10 relative">
                <h1 className="text-center font-bold text-lg sm:text-xl md:text-2xl text-brandGreen">
                  SELL SMARTER, BUY SMARTER
                </h1>

                <h3 className="text-brandGreen text-center mt-6 mb-2 uppercase">
                  Register For Free
                </h3>

                <div className="flex flex-col gap-5">
                  <p className="text-center">
                    Thank you for choosing us. AutoHub Nigeria is the first
                    automobile inter-business company in Nigeria and Africa at
                    large. We wish to do business with you as we provide both
                    online and offline sales services to all our members. Our
                    goal is to integrate your goals into our dream and give your
                    business a great turnover.
                  </p>

                  <p className="text-center">
                    Please, carefully read our membership agreement below
                    because upon signing up with us, it would be accepted that
                    you have read and agreed to it. Meanwhile, this sales
                    agreement is subject to change of which a prior notification
                    would be sent to you.
                  </p>
                </div>

                <h3 className="text-brandGreen text-center mt-6 mb-2 uppercase">
                  MEMBERSHIP AGREEMENT
                </h3>

                <ol className="list-decimal flex flex-col gap-4 px-4">
                  {agreementList.map((item, index) => (
                    <li key={index}>
                      <p className="ml-4">{item}</p>
                    </li>
                  ))}
                </ol>

                <p className="my-6">Thank you.</p>
              </div>

              {/* Action */}
              <div className="shrink-0 h-16 w-full bg-white justify-between flex px-4 items-center py-5">
                <button
                  onClick={decrement}
                  className="text-brandDarkGray px-4 font-semibold"
                >
                  Back
                </button>
                <button
                  onClick={increment}
                  className="h-[50px] bg-brandGreen text-white px-4 rounded-lg font-semibold"
                >
                  Proceed
                </button>
              </div>
            </div>
          </>
        )}

        {step === 3 && (
          <form
            className="w-full flex justify-center"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="max-w-[450px] h-full w-full bg-white rounded-[10px] relative flex flex-col justify-between overflow-hidden">
              <div className="p-4 flex flex-col mt-5 gap-5 overflow-y-auto ">
                <h1 className="text-center text-brandGreen text-xl font-bold">
                  Register as {userType}
                </h1>

                <p className="text-center">Enter your details</p>

                {/* error */}
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

                {userType === types[1] && (
                  <>
                    <div className="w-full">
                      <input
                        name="company_name"
                        // type="text"
                        // required
                        {...register("company_name")}
                        type={passwordIsVisible ? "text" : "text"}
                        placeholder="Company Name"
                        className="w-full border py-3 px-4 rounded-lg border-brandGreen/50 focus:border-brandGreen outline-none text-sm md:text-base"
                      />
                      <button
                        type="button"
                        onClick={() => setPasswordIsVisible(!passwordIsVisible)}
                        className="font-semibold absolute top-4 right-5 text-xs text-brandGreen"
                      >
                        {passwordIsVisible ? "Hide" : "Show"}
                      </button>
                      <p className="text-xs text-brandRed">
                        {errors.company_name?.message}
                      </p>
                    </div>
                    <div className="w-full">
                      <input
                        name="company_address"
                        type="text"
                        // required
                        {...register("company_address")}
                        placeholder="Company Address"
                        className="w-full border py-3 px-4 rounded-lg border-brandGreen/50 focus:border-brandGreen outline-none text-sm md:text-base"
                      />
                      <p className="text-xs text-brandRed">
                        {errors.company_address?.message}
                      </p>
                    </div>
                    <div className="w-full">
                      <input
                        type="number"
                        // required
                        name="company_cac"
                        {...register("company_cac")}
                        placeholder="RC Number"
                        className="w-full border py-3 px-4 rounded-lg border-brandGreen/50 focus:border-brandGreen outline-none text-sm md:text-base"
                      />
                      <p className="text-xs text-brandRed">
                        {errors.company_cac?.message}
                      </p>
                    </div>
                  </>
                )}
                <div className="w-full">
                  <input
                    name="name"
                    type="text"
                    // required
                    {...register("name")}
                    placeholder="Name"
                    className="w-full border py-3 px-4 rounded-lg border-brandGreen/50 focus:border-brandGreen outline-none text-sm md:text-base"
                  />
                  <p className="text-xs text-brandRed">
                    {errors.name?.message}
                  </p>
                </div>
                <div className="w-full">
                  <input
                    type="email"
                    name="email"
                    // required
                    {...register("email")}
                    placeholder="Your Email"
                    className="w-full border py-3 px-4 rounded-lg border-brandGreen/50 focus:border-brandGreen outline-none text-sm md:text-base"
                  />
                  <p className="text-xs text-brandRed">
                    {errors.email?.message}
                  </p>
                </div>
                <div className="w-full">
                  <input
                    type="number"
                    // required
                    name="phoneno"
                    {...register("phoneno")}
                    placeholder="Your Phone Number"
                    className="w-full border py-3 px-4 rounded-lg border-brandGreen/50 focus:border-brandGreen outline-none text-sm md:text-base"
                  />
                  <p className="text-xs text-brandRed">
                    {errors.phoneno?.message}
                  </p>
                </div>
                <div className="w-full relative">
                  <input
                    name="password"
                    // type="password"
                    type={passwordIsVisible ? "text" : "password"}
                    // required
                    {...register("password")}
                    placeholder="Create Password"
                    className="w-full border py-3 px-4 rounded-lg border-brandGreen/50 focus:border-brandGreen outline-none text-sm md:text-base"
                  />
                  <button
                    type="button"
                    onClick={() => setPasswordIsVisible(!passwordIsVisible)}
                    className="font-semibold absolute top-4 right-5 text-xs text-brandGreen"
                  >
                    {passwordIsVisible ? "Hide" : "Show"}
                  </button>
                  <p className="text-xs text-brandRed">
                    {errors.password?.message}
                  </p>
                </div>
                <div className="w-full">
                  <input
                    name="confirmPassword"
                    type="password"
                    // required
                    {...register("confirmPassword")}
                    placeholder="Re-type Password"
                    className="w-full border py-3 px-4 rounded-lg border-brandGreen/50 focus:border-brandGreen outline-none text-sm md:text-base"
                  />
                  <p className="text-xs text-brandRed">
                    {errors.confirmPassword?.message}
                  </p>
                </div>
              </div>
              {/* Action */}
              <div className="shrink-0 h-16 w-full bg-white justify-between flex px-4 items-center py-10">
                <div
                  onClick={decrement}
                  className="text-brandDarkGray px-4 font-semibold"
                >
                  Back
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="h-[50px] bg-brandGreen text-white px-4 rounded-lg font-semibold"
                >
                  {loading ? <BeatLoader size={10} color="#fff" /> : "Next"}
                </button>
              </div>
            </div>
          </form>
        )}

        {step === 4 && (
          <>
            <div className="max-w-[450px] max-h-[calc(100vh-300px)] w-full bg-white rounded-[10px] relative flex flex-col justify-between overflow-hidden pt-6">
              {/* error */}
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

              <form onSubmit={handleFormSubmit}>
                <div className="p-4 flex flex-col  gap-5 overflow-y-auto ">
                  <h1 className="text-center text-brandGreen text-xl font-bold">
                    Upload Passport!
                  </h1>

                  { 
                    error && <>
                        <h1 className="text-red-600"></h1>
                    </> 
                  } 

                  { successful && <>
                        <h1 className="text-center text-green-600">Your account was created successfully</h1>
                        <h1 className="text-center text-green-600">You will be redirected to login with your email and password</h1>
                    </> 
                  }

                  <div className="mt-10 w-full flex justify-center items-center gap-3 flex-col">
                    <p className="text-center font-semibold text-brandDarkGray">
                      Add a photo
                    </p>

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
                            className="rounded-full h-[150px] w-[150px] border flex p-2 justify-center items-center"
                          >
                            <div className="rounded-full h-full w-full border flex flex-col justify-center items-center overflow-hidden">
                              {imageList.length === 0 ? (
                                <>
                                  <img src="/assets/icons/camera.svg" alt="" />
                                  <p className="text-brandDarkGray italic font-semibold text-sm text-center">
                                    Click or Drop image here
                                  </p>
                                </>
                              ) : (
                                imageList.map((image, index) => (
                                  <img
                                    key={index}
                                    src={image.data_url}
                                    alt=""
                                    className="w-full h-full object-cover"
                                  />
                                ))
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </ImageUploading>
                  </div>

                  {/* Action */}
                  <div className="mt-10 w-full bg-white justify-between flex px-4 items-center ">
                    <div></div>
                    {/* <button
                      onClick={decrement}
                      className="text-brandDarkGray px-4 font-semibold"
                    >
                      Back
                    </button> */}
                    <div
                      onClick={() => navigate("/", { replace: true })}
                      className="text-brandDarkGray px-4 font-semibold cursor-pointer"
                    >
                      
                    </div>
                    {
                       !successful && 
                       <button
                         type="submit"
                         disabled={allow ? false : true}
                         className="h-[50px] bg-brandGreen text-white px-4 rounded-lg font-semibold disabled:bg-brandDarkGray disabled:cursor-not-allowed"
                       >
                         {loading ? <BeatLoader size={10} color="#fff" /> : "Done"}
                       </button>
                    }
                  </div>
                </div>
              </form>
            </div>
          </>
        )}

        {step === 1 && (
          <p className="text-sm font-medium my-5 text-center text-white">
            <Link to="/login">
              If you have an account, <br />
              <span className="text-[#1DF65A] font-semibold">Sign in</span>
            </Link>
          </p>
        )}
      </div>
    </>
  );
}

const agreementList = [
  `All members registering as a company must be CAC certified: A non-individual account must be a registered company with CAC. However, an individual who is into automobile business but has not registered his/her company with CAC can be profiled by us and get registered as an Affiliate Dealer with us but must register his/her company with CAC within a span of three months.`,
  `Thank you for choosing us. AutoHub Nigeria is the first automobile inter-business company in Nigeria and Africa at large. We wish to do business with you as we provide both online and offline sales services to all our members. Our goal is to integrate your goals into our dream and give your business a great turnover.`,
  ` No false declaration of the condition of a vehicle: The condition of all vehicles must be stated exactly the way they are. Under no condition should you conceal the condition of a given vehicle in your description. This we consider misleading and criminally intended. If discovered, such an ad would be immediately declined by our moderator.`,
];

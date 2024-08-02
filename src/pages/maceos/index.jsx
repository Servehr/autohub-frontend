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
import swapBuySell from "@/assets/swap-buy-sell.png";
import swapCar from "@/assets/swap-car.png";
import { MACEOSRegistration } from "../register/schema";
import { AuthenticatedUser, ExistingUser, NewUser } from "@/apis/maceos";
import { logItOut, logOut } from "@/apis/auth";


export default function MACEOS() 
{
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [userId, setUserId] = useState(localStorage.getItem("authenticatedId"));

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [passwordIsVisible, setPasswordIsVisible] = useState(false);  
    
    const [emailErrorMsg, setEmailErrorMsg] = useState("")
    const [passwordErrorMsg, setPasswordErrorMsg] = useState("")
    const [confirmPasswordErrorMsg, setConfirmPasswordErrorMsg] = useState("")
    const [errMsg, setErrMsg] = useState("")

    // console.log(userId)
    const { data, isLoading, refetch, isRefetching, isError } = useQuery(["get-authenticated-user", userId], () => AuthenticatedUser(userId), { cacheTime: 0 })

    useEffect(() => {
        
    }, [])

    if(!isLoading)
    {
        console.log(data)
        console.log(data.plus)
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm(
            {
                resolver: yupResolver(MACEOSRegistration),
            }
    ); 

    const onSubmit = (data) => { 
        setLoading(true)      
        const x = new Date(data.birth)
        data.birth = x.getFullYear() + '-' + x.getMonth() + '-' +  x.getDay()
        // console.log(data)
        // return false
        if(userId)
        { 
            ExistingUser(Number(userId), data)
            .then((res) => {
                logItOut()
            })
            .catch((err) => 
            {
                setErrMsg(`Registration Failed - ${err}`)
            })                
        } else {
            if(email.length === 0)
            {
                setEmailErrorMsg("Kindly provide email")
            }

            if(password.length === 0)
            {
                setPasswordErrorMsg("Kindly provide password")
            }

            if(confirmPassword.length === 0)
            {
                setConfirmPasswordErrorMsg("Kindly re-enter your password")
            }

            if((password.length > 0 ) && (confirmPassword.length > 0) && (password === confirmPassword))
            {
                data.password = password
                NewUser(data)
                .then((res) => {
                    navigate('/login')
                })
                .catch((err) => 
                {
                    setErrMsg(`Registration Failed - ${err}`)
                })
            } else {
                setPasswordErrorMsg("Password do not match confirm password")
                setConfirmPasswordErrorMsg("confirm password do not match password")
            }
        }
           
        setTimeout(() => {
            setLoading(false)
        }, [1000])
        
    }

    return (
        <>
            <Helmet>
              <title> | Autohub</title>
               <meta
                  name="Become Our Student -> Apply To MACEOS ACADEMY"
                  content={"The Home For Automobiles"}
                />
              </Helmet>

              {/* <Header /> */}

              <main className="px-3 pt-5 border border-2">
                { isLoading &&
                    <MaxWidthWrapper>
                        <div className="flex h-[150px] justify-center items-center">
                            <BeatLoader color="#1c9236" style={{ marginTop: '350px' }} />
                        </div>
                    </MaxWidthWrapper>
                }

                {
                    (data?.plus === "student") &&  <> { navigate('/dashboard/summary') } </>
                }
                { !isLoading &&
                    <MaxWidthWrapper>
                            <div className="w-full flex p-1 text-sm justify-left items-center">
                                <Link className="font-bold flex justify-center items-center" to={'/maceos-welcome'}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 font-bold">
                                        <path fill-rule="evenodd" d="M10.72 11.47a.75.75 0 0 0 0 1.06l7.5 7.5a.75.75 0 1 0 1.06-1.06L12.31 12l6.97-6.97a.75.75 0 0 0-1.06-1.06l-7.5 7.5Z" clip-rule="evenodd" />
                                        <path fill-rule="evenodd" d="M4.72 11.47a.75.75 0 0 0 0 1.06l7.5 7.5a.75.75 0 1 0 1.06-1.06L6.31 12l6.97-6.97a.75.75 0 0 0-1.06-1.06l-7.5 7.5Z" clip-rule="evenodd" />
                                    </svg>
                                    &nbsp;Back
                                </Link>
                                {/* <a className="text-blue-600 font-bold" href="http://localhost:5173/maceos-registration">Registration</a> */}
                            </div>
                            <div className="grid grid-cols-12 gap-4 mb-10">
                                    <div className="col-span-12 md:col-span-9 h-full bg-white ">
                                            <div class="bg-white p-6 rounded shadow-xl">
                                                <div className="items-center">
                                                    <h1 className="font-bold uppercase mb-5 mr-10 w-full text-blue-900" style={{fontSize: "30px"}}>MACEOS ACADEMY : {userId}</h1>
                                                    <h4 className="w-full font-bold text-green-700 mt-3" style={{fontSize: "16px"}}>Application Form - Start Registration</h4>
                                                </div> 
                                            </div>

                                            <form
                                                className="w-full flex justify-center"
                                                onSubmit={handleSubmit(onSubmit)}
                                            >
                                                <div className="w-full mt-5">
                                                    <div className="flex flex-wrap -m-2 mt-2 mb-2 md:mx-5 mx-2">
                                                        <div className="p-2 md:w-1/2 w-full">
                                                            <span className="w-full font-bold text-sm">Firstname</span>
                                                            <input
                                                                    {...register("firstname")} 
                                                                    onBlur={(e) => {
                                                                
                                                            }} type="text" id="firstname" defaultValue={data?.data?.name}  name="firstname" placeholder="Enter Your Firstname" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 text-sm py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                                            <p className="text-sm text-brandRed font-bold">{errors.firstname?.message}</p>
                                                        </div>
                                                        <div className="p-2 md:w-1/2 w-full">
                                                            <span className="w-full font-bold text-sm">Lastname</span>
                                                            <input 
                                                                {...register("surname")}  
                                                                type="text" id="surname" defaultValue={data?.data?.lastname}  name="surname" placeholder="Enter Your Lastname" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 text-sm py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                                            <p className="text-sm text-brandRed font-bold">{errors.surname?.message}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-wrap -m-2 mt-2 mb-1 md:mx-5 mx-2">
                                                        <div className="p-2 md:w-1/2 w-full">
                                                            <span className="w-full font-bold text-sm">Middlename</span>
                                                            <input 
                                                                {...register("middlename")}  
                                                                type="text" id="middlename" defaultValue={data?.data?.middlename} name="middlename" 
                                                                placeholder="Enter Your Middlename" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 text-sm leading-8 transition-colors duration-200 ease-in-out" />
                                                            <p className="text-sm text-brandRed font-bold">{errors.middlename?.message}</p>
                                                        </div>
                                                        <div className="p-2 md:w-1/2 w-full">
                                                            <span className="w-full font-bold text-sm">Phone Number</span>
                                                            <input 
                                                                {...register("phoneno")}  
                                                                type="number" id="phoneno" defaultValue={data?.data?.phoneno} name="phoneno" placeholder="Enter Your phone Number" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 text-sm leading-8 transition-colors duration-200 ease-in-out" />
                                                            <p className="text-sm text-brandRed font-bold">{errors.phoneno?.message}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-wrap -m-2 mt-2 mb-1 md:mx-5 mx-2">
                                                        <div className="p-2 md:w-1/2 w-full">
                                                            <span className="w-full font-bold text-sm">Email</span>
                                                            <input 
                                                                onChange={(e) => {
                                                                    setEmail(e.target.value)
                                                                    setEmailErrorMsg("")
                                                                }}
                                                                disabled={(userId) ? true : false }  
                                                                type="email" id="email" defaultValue={data?.data?.email}  name="email" placeholder="Enter Your Email" 
                                                                className={`${(userId) ? 'bg-green-300' : ''} w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 text-sm py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`} />
                                                                <p className="text-sm text-brandRed font-bold">{ (email != "") ? emailErrorMsg : ""}</p>
                                                        </div>
                                                        <div className="p-2 md:w-1/2 w-full">
                                                            <span className="w-full font-bold text-sm">Company Name</span>
                                                            <input
                                                                {...register("companyName")}  
                                                                type="text" id="companyName" defaultValue={''}  name="companyName" placeholder="Enter Your Company Name" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 text-sm py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                                            <p className="text-sm text-brandRed font-bold">{errors.companyName?.message}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-wrap -m-2 mt-2 mb-2 md:mx-5 mx-2">
                                                        <div className="p-2 w-full">
                                                            <span className="w-full font-bold text-sm">Home or Office Address</span>                                                        
                                                            <textarea
                                                                {...register("companyAddress")} 
                                                                defaultValue={''} 
                                                                className="shadow form-textarea block w-full border rounded w-full 
                                                                        py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                                                rows="2" 
                                                                placeholder="Enter Description"
                                                            >
                                                            </textarea>
                                                            <p className="text-sm text-brandRed font-bold">{errors.companyAddress?.message}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-wrap -m-2 mt-2 mb-2 md:mx-5 mx-2">
                                                        <div className="p-2 md:w-1/2 w-full">
                                                            <span className="w-full font-bold text-sm">Specialization in Automobile</span>
                                                            <input 
                                                                {...register("specialization")}  
                                                                type="text" id="specialization" defaultValue={''}  name="specialization" placeholder="Let us know your specialization" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 text-sm py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                                            <p className="text-sm text-brandRed font-bold">{errors.specialization?.message}</p>
                                                        </div>
                                                        <div className="p-2 md:w-1/2 w-full">
                                                            <span className="w-full font-bold text-sm">Years in Automobile Business</span>
                                                            <input 
                                                                {...register("yearsIn")} 
                                                                type="number" id="yearsIn" defaultValue={''} name="yearsIn" placeholder="Enter Your of Experience" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 text-sm leading-8 transition-colors duration-200 ease-in-out" />
                                                            <p className="text-sm text-brandRed font-bold">{errors.yearsIn?.message}</p>
                                                        </div>
                                                    </div>                                        
                                                    <div className="flex flex-wrap -m-2 mt-2 mb-2 md:mx-5 mx-2">
                                                        <div className=" md:w-1/2 w-full relative px-2">
                                                            <span className="w-full font-bold text-sm">State / Province / Region</span>
                                                            <select 
                                                                {...register("region")}  
                                                                name="region"
                                                                id="region"
                                                                className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                                                    <option value={''}> - Select State / Province / Region -  </option>
                                                                    <option value={'Nigeria'}> Nigeria </option>
                                                            </select>
                                                            <div className="pointer-events-none absolute mr-3 inset-y-0 right-0 flex items-center px-2 text-gray-700 mt-5">
                                                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                                            </div>
                                                            <p className="text-sm text-brandRed font-bold">{errors.region?.message}</p>
                                                        </div>
                                                        <div className="p-2 md:w-1/2 w-full -mt-2">
                                                            <span className="w-full font-bold text-sm">City</span>
                                                            <input 
                                                                {...register("city")} 
                                                                type="text" id="city" defaultValue={''}  name="city" placeholder="Enter Your City" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 text-sm py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                                            <p className="text-sm text-brandRed font-bold">{errors.city?.message}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-wrap -m-2 mt-2 mb-2 md:mx-5 mx-2">
                                                        <div className="p-2 md:w-1/2 w-full">
                                                            <span className="w-full font-bold text-sm">Date of Birth</span>
                                                            <input 
                                                                {...register("birth")} 
                                                                type="date" id="birth" defaultValue={''} name="birth" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 text-sm leading-8 transition-colors duration-200 ease-in-out" />
                                                            <p className="text-sm text-brandRed font-bold">{errors.birth?.message}</p>
                                                        </div>
                                                        <div className=" md:w-1/2 w-full p-2 relative">
                                                            <span className="w-full font-bold text-sm">Gender <strong className="text-red-500"></strong></span> 
                                                            <select                                                             
                                                                {...register("gender")}
                                                                className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                                                <option value={''}> - What Gender are you? -  </option>
                                                                <option value={1}> Male  </option>
                                                                <option value={2}> Female  </option>
                                                            </select>
                                                            <div className="pointer-events-none mr-3 absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 mt-5">
                                                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                                            </div>
                                                            <p className="text-sm text-brandRed font-bold">{errors.gender?.message}</p>
                                                        </div>
                                                    </div>  
                                                    <div className="flex flex-wrap -m-2 mt-2 mb-5 md:mx-5 mx-2">
                                                        <div className="p-2 w-full">
                                                            <span className="w-full font-bold text-sm">Academic Qualification</span>
                                                            <input 
                                                                {...register("academic")} 
                                                                type="text" id="academic" defaultValue={''}  name="academic" placeholder="Enter Your Qualification" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 text-sm py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                                            <p className="text-sm text-brandRed font-bold">{errors.academic?.message}</p>
                                                        </div>
                                                    </div>                                                      
                                                    
                                                    {   (data?.data === "none") &&                                      
                                                        <div className="flex flex-wrap -m-2 mb-2 md:mx-5 mx-2">
                                                            <div className="p-2 md:w-1/2 w-full">
                                                                <span className="w-full font-bold text-sm">Password</span>
                                                                <input 
                                                                    onChange={(e) => {
                                                                        setPassword(e.target.value)
                                                                        setPasswordErrorMsg("")
                                                                        setConfirmPasswordErrorMsg("")
                                                                    }} 
                                                                    type="password" id="password" defaultValue={''}  name="password" placeholder="Enter Your Password" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 text-sm py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                                                <p className="text-sm text-brandRed font-bold">{ (passwordErrorMsg != "") ? passwordErrorMsg : ""}</p>
                                                            </div>
                                                            <div className="p-2 md:w-1/2 w-full">
                                                                <span className="w-full font-bold text-sm">Confirm Password</span>
                                                                <input 
                                                                    onChange={(e) => {
                                                                        setConfirmPassword(e.target.value)
                                                                        setPasswordErrorMsg("")
                                                                        setConfirmPasswordErrorMsg("")
                                                                    }} 
                                                                    type="password" id="confirm_password" defaultValue={''}  name="confirm_password" placeholder="Re-Enter Password" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 text-sm py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                                                    <p className="text-sm text-brandRed font-bold">{ (confirmPasswordErrorMsg != "") ? confirmPasswordErrorMsg : ""}</p>
                                                            </div>
                                                        </div>
                                                    }

                                                    <div className="w-full p-2">
                                                        <div className="flex flex-wrap -m-2 mb-1 mt-2 md:mx-5 mx-2 border-dashed border-2 border-gray-300">
                                                            <div className="w-2/2 p-2 flex justify-item item-center">
                                                                <input type="checkbox"                                          
                                                                    {...register("agree")}
                                                                    className="peer relative appearance-none w-7 h-7
                                                                            border border-red-400 border-4
                                                                            cursor-pointer  
                                                                            checked:bg-pink-600"
                                                                    id="circular-checkbox" 
                                                                />
                                                                <label for="circular-checkbox" class="ms-2 text-sm font-medium font-bold mt-1">I agree to the <span className="font-bold text-green-700 cursor-pointer">Terms & Conditions</span></label>
                                                            </div>
                                                        </div>
                                                    <p className="text-sm text-brandRed font-bold ml-5">{errors.agree?.message}</p>
                                                    </div>
                                                    <button
                                                        type="submit"
                                                        disabled={loading}
                                                        onClick={handleSubmit}
                                                        className="h-[50px] bg-brandGreen text-white px-4 ml-5 mt-3 rounded-lg font-semibold"
                                                        >
                                                        { loading ? <BeatLoader size={10} color="#fff" /> : "Submit" }
                                                    </button>
                                                    {/* <div className="flex flex-wrap -m-2 mb-1 md:mx-5 mx-2 mt-3">
                                                        <div className="w-1/2 p-2 flex justify-item item-center">
                                                            <div type="checkbox" onClick={() => navigate('/maceos-upload-receipt') }
                                                                className="peer relative appearance-none w-fit text-white p-3 cursor-pointer bg-green-800 hover:bg-green-600 hover:font-bold rounded-md">Submit</div>
                                                        </div>
                                                    </div> */}
                                                </div>
                                            </form>
                                            
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
                }
              </main>
        </>
    );
}

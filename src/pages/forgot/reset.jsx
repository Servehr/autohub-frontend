import { forgotPasswordComplete } from "@/apis/auth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const schema = yup.object().shape(
  {
      firstDigit: yup.string().required("Enter first digit"),
      secondDigit: yup.string().required("Enter second digit"),
      thirdDigit: yup.string().required("Enter third digit"),
      fourthDigit: yup.string().required("Enter fourth digit")
  }
);

export default function ResetPassword() 
{
    const navigate = useNavigate();
    const [userReset, setUserReset] = useState("-1")
    

    // const isUserActivated = localStorage.getItem("userId")
    // if(isUserActivated === null)
    // {
    //     console.log(isUserActivated)
    //     navigate("/login");
    // }

    // const x =  localStorage.setItem("autoUser", "dfihoahdfar343dfdaer3")
    // const isUser = localStorage.getItem("userId")
    // console.log(isUser)

    useEffect(() => 
    {
        const isUserActivated = localStorage.getItem("userId")
        console.log(isUserActivated)
        setUserReset(isUserActivated)
        console.log(userReset)
        if(!isUserActivated)
        {
            console.log(isUserActivated)
            navigate("/login");
        }
    }, [userReset])

  return (
    <>
      <Helmet>
        <title>Forgot Password | Autohub</title>
        <meta name="description" content="Sell Faster, Buy Smarter" />
      </Helmet>

      <div
        className=" bg-brandGreen bg-opacity-95 min-h-screen h-full flex flex-col items-center p-10 duration-1000 ease-in-out transition">
            
          <div className="w-full h-10 flex justify-end mb-20">
            {/* menu */}
            <div
              className="flex items-center gap-4 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                navigate("/");
              }}
            >
              <div className="h-[50px] sm:h-[58px] aspect-square rounded-full bg-[#1B5B29] text-3xl text-white flex justify-center items-center">
                <img src="/assets/close.svg" alt="" className="h-[30px] w-auto" />
              </div>
            </div>
          </div>

        {/*  */}
        <ResetContainer />
      </div>
    </>
  );
}

function ResetContainer() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);

  const onSubmit = (data) => {
    setLoading(true);
    setError("");
    const { firstDigit, secondDigit, thirdDigit, fourthDigit } = data;
    const activationCode = firstDigit.toString()+secondDigit.toString()+thirdDigit.toString()+fourthDigit.toString()
    console.log(activationCode)
    forgotPasswordComplete(activationCode)
      .then(() => {})
      .catch((err) => {
        setLoading(false);
        setError(`${err}`);
      });
  };

  return (
    <>
      <div
        className="max-w-[450px] h-max w-full bg-white px-6 md:px-10 py-12 rounded-[10px] flex flex-col gap-4 justify-center items-center"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {/* error */}
        <div className={`transition duration-300 w-full ${!error && "hidden"}`}>
          <div
            className={`bg-red-500/10 border-red-500/80 border w-full flex justify-center p-2`}
          >
            <p className=" w-max text-center text-xs text-[#D10000]">{error}</p>
          </div>
        </div>

        <h1 className="text-brandGreen font-semibold md:font-bold text-center md:text-2xl">Reset Password Verification</h1>
        <h3 className="text-brandGreen font-semibold md:font-bold text-xl md:text-sm text-center">Enter the four digit code sent to your email</h3>

        <form
          method="post"
          className="flex flex-col items-center gap-4 w-full"
          onSubmit={handleSubmit(onSubmit)}
        >

          <div className="max-w-md mx-auto text-center bg-white px-4 sm:px-8 mt-5 py-10 rounded-xl shadow">
            
                  {/* <div className="flex flex-col gap-1 w-full">
                    <input  
                      {...register("email")}
                      name="email"
                      type="email"
                      placeholder="Email Address"
                      className="border w-full outline-none focus:border-brandGreen text-xs sm:text-base rounded-[10px] p-4"
                    />
                    <p className="text-xs text-[#D10000]">
                      {errors && errors.email?.message}
                    </p>
                  </div> */}

                    <div className="flex items-center justify-center gap-3">
                        <input
                            {...register("firstDigit")}
                            type="text"
                            name="firstDigit"
                            className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                            />
                        <input
                            {...register("secondDigit")}
                            type="text"
                            name="secondDigit"
                            className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                           />
                        <input
                            {...register("thirdDigit")}
                            type="text"
                            name="thirdDigit"
                            className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                           />
                        <input
                            {...register("fourthDigit")}
                            type="text"
                            name="fourthDigit"
                            className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                          />
                    </div>
                    {/* <div className="max-w-[260px] mx-auto mt-4">
                        <button type="submit"
                            className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150">Verify</button>
                    </div> */}
              {/* <div className="text-sm text-slate-500 mt-4">Didn't receive code? <a className="font-medium text-indigo-500 hover:text-indigo-600" href="#0">Resend</a></div> */}
        </div>

          <button
            type="submit"
            className="font-medium bg-brandGreen text-white w-[150px] h-[50px] px-8 mt-5  rounded-lg"
          >
            {loading ? <BeatLoader size={20} color="#fff" /> : "Verify"}
          </button>
        </form>

      </div>

      <p
        className="text-sm font-medium my-5 text-center text-white"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
      </p>
    </>
  );
}

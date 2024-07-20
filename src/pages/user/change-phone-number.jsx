
import { useEffect, useState } from "react";
import { setUserNewPhoneNumber } from "@/apis/auth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { BeatLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

// const schema = yup.object().shape({
//   password: yup.string().required("Please enter your password"),
//   confirmPassword: yup.string().required("Please retype your password"),
// });

const schema = yup.object().shape({
  phone: yup.string().required("Please enter your phone number"),
  password: yup.string().required('Password is required'),
});

export default function ChangePhoneNumber() 
{
  const navigate = useNavigate();
  const [isUser, setIsUser] = useState("-1")

  // useEffect(() => 
  // {
  //     const isTheUser = localStorage.getItem("user")
  //     setIsUser(isTheUser)
  //     if(!isTheUser)
  //     {
  //         navigate("/login");
  //     }
  // }, [setIsUser])

  return (
    <>
      <Helmet>
        <title>Change Phone Number | Autohub</title>
        <meta name="description" content="Sell Faster, Buy Smarter" />
      </Helmet>

      
      <ChangePasswordContainer />
    </>
  );
}

function ChangePasswordContainer() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sucessMessage, setSuccessMessage] = useState("");
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);

  const onSubmit = (data) => {
    setLoading(true);
    setError("");
    let passwordd = data.password
    let phone = data.phone
    let credentilas = { phone: phone, password: passwordd}
    console.log(credentilas)
    setUserNewPhoneNumber(credentilas)
      .then((res) => {
          setLoading(false);
          console.log(res)
          setSuccessMessage(res.message)
          setTimeout(() => {
              setSuccessMessage("")
          }, 2000)
      })
      .catch((err) => {
        setLoading(false);
        setError(`${err}`);
      });
  };

  return (
    <>
      <div
        className="max-w-[450px] h-max w-full bg-white px-6 md:px-10 py-12 rounded-[10px] mt-24 md:mt-0 flex flex-col gap-4 justify-center items-center"
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

        <h1 className="text-brandGreen font-semibold md:font-bold text-md md:text-xl text-center mb-5">
           Change Phone Number
        </h1>

        {
            (sucessMessage != "") && <span className="w-full bg-green-600 text-md font-bold text-white p-4 rounded-md">{sucessMessage}</span>
        }


        <form
          method="post"
          className="flex flex-col items-center gap-4 w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-1 w-full relative">
            <input
              {...register("password")}
              name="password"
              type={passwordIsVisible ? "text" : "password"}
              placeholder="Enter Password"
              className="border w-full outline-none focus:border-brandGreen text-xs sm:text-base rounded-[10px] p-4"
            />
            <button
              type="button"
              onClick={() => setPasswordIsVisible(!passwordIsVisible)}
              className="font-semibold absolute top-4 right-5 text-xs text-brandGreen"
            >
              {passwordIsVisible ? "Hide" : "Show"}
            </button>
            <p className="text-xs text-[#D10000]">{errors.password?.message}</p>
          </div>
          
          <div className="flex flex-col gap-1 w-full relative">
            <input
              {...register("phone")}
              name="phone"
              type="text"
              placeholder="Enter your phone number"
              className="border w-full outline-none focus:border-brandGreen text-xs sm:text-base rounded-[10px] p-4"
            />
            <p className="text-xs text-[#D10000]">{errors.email?.message}</p>
          </div>

          <button
            type="submit"
            className="font-medium bg-brandGreen text-white w-[250px] h-[50px] px-8 mt-5 rounded-lg"
          >
            {loading ? <BeatLoader size={30} color="#fff" /> : "Change"}
          </button>
        </form>

        {/* <div className="grid grid-cols-2 gap-4 mt-5">
          <div className="col">                
            <Link to="/login">
              Login
            </Link>
          </div> 
          <div className="col">
            <Link to="/register">
              Register
            </Link>
          </div>
        </div> */}
        
      </div>

    </>
  );
}

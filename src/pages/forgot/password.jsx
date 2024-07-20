
import { useEffect, useState } from "react";
import { setUserNewPassword } from "@/apis/auth";
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
  password: yup.string().required('Password is required'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
});

export default function NewPassword() 
{
  const navigate = useNavigate();
  const [isUser, setIsUser] = useState("-1")

  useEffect(() => 
  {
      const isTheUser = localStorage.getItem("user")
      setIsUser(isTheUser)
      if(!isTheUser)
      {
          navigate("/login");
      }
  }, [setIsUser])

  return (
    <>
      <Helmet>
        <title>New Password | Autohub</title>
        <meta name="description" content="Sell Faster, Buy Smarter" />
      </Helmet>

      <div
        className=" bg-brandGreen bg-opacity-95 min-h-screen h-full  flex flex-col items-center p-10 duration-1000 ease-in-out transition"
        onClick={() => navigate("/")}
      >
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
        <NewPasswordContainer />
      </div>
    </>
  );
}

function NewPasswordContainer() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);
  const [passwordIsVisible1, setPasswordIsVisible1] = useState(false);

  const onSubmit = (data) => {
    setLoading(true);
    setError("");
    const email = localStorage.getItem("userEmail")
    const { password } = data;
    // alert({email, password})
    setUserNewPassword(email, password)
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

        <h1 className="text-brandGreen font-semibold md:font-bold text-xl md:text-2xl text-center mb-5">
          Create a New Password
        </h1>

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
              placeholder="Password"
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
              {...register("confirmPassword")}
              name="confirmPassword"
              type={passwordIsVisible1 ? "text" : "password"}
              placeholder="Retype Password"
              className="border w-full outline-none focus:border-brandGreen text-xs sm:text-base rounded-[10px] p-4"
            />
            <button
              type="button"
              onClick={() => setPasswordIsVisible1(!passwordIsVisible1)}
              className="font-semibold absolute top-4 right-5 text-xs text-brandGreen"
            >
              {passwordIsVisible1 ? "Hide" : "Show"}
            </button>
            <p className="text-xs text-[#D10000]">{errors.confirmPassword?.message}</p>
          </div>

          <button
            type="submit"
            className="font-medium bg-brandGreen text-white w-[250px] h-[50px] px-8 mt-5 rounded-lg"
          >
            {loading ? <BeatLoader size={30} color="#fff" /> : "Create New Password"}
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

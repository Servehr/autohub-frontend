import { forgotPassword } from "@/apis/auth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { BeatLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const schema = yup.object().shape({
  email: yup.string().email().required("Please enter your email")
});

export default function ForgotPassword() {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Forgot Password | Autohub</title>
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
        <PasswordContainer />
      </div>
    </>
  );
}

function PasswordContainer() {
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
    const { email } = data;
    forgotPassword(email)
      .then(() => {})
      .catch((err) => {
        setLoading(false);
        console.log(err)
        setError(`${err}`);
      });
  };

  return (
    <>
      <div
        className="max-w-[850px] h-max w-full bg-white py-12 rounded-[10px] flex flex-col gap-4 justify-center items-center"
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

        <h1 className="text-brandGreen font-semibold md:font-bold text-xl md:text-2xl text-center mb-1">
          Recover your password
        </h1>

        <form
          method="post"
          className="flex flex-col items-center gap-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-1 justify-center items-center">
            <input  
              {...register("email")}
              name="email"
              type="email"
              placeholder="Email Address"
              className="border md:w-[500px] sm:w-[350px] outline-none focus:border-brandGreen text-xs sm:text-base mt-5 rounded-[10px] p-4"
            />
            <p className="text-xs text-[#D10000]">
              {errors && errors.email?.message}
            </p>
          </div>

          <button
            type="submit"
            className="font-medium bg-brandGreen text-white w-[150px] h-[50px] px-8 mt-5 rounded-lg"
          >
            {loading ? <BeatLoader size={20} color="#fff" /> : "Reset"}
          </button>
        </form>

        <div className="grid grid-cols-2 gap-4 mt-5">
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
        </div>

      </div>

    </>
  );
}

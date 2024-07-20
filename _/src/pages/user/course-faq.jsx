
import { useEffect, useState } from "react";
import { setUserNewEmail } from "@/apis/auth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { BeatLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";


export default function CourseFaq() 
{
  const navigate = useNavigate();
  const [isUser, setIsUser] = useState("-1")

  return (
    <>
      <Helmet>
        <title>Coursre FAQ | Autohub</title>
        <meta name="description" content="Sell Faster, Buy Smarter" />
      </Helmet>

      
      <CFaq />
    </>
  );
}

function CFaq() 
{

  const info = [
    { name: 'Ads', nos: 34 },
    { name: 'WishList', nos: 13 },
    { name: 'Draft', nos: 20 },
    { name: 'Active', nos: 5 },
    { name: 'Enrollment', nos: 2 },
    { name: 'Advert', nos: 5 },
    { name: 'Product Views', nos: 20 },
    { name: 'Profile Views', nos: 5 },
  ]
  
  return (
    <>
      <div className="font-bold text-md mb-4 text-blue-700 mt-28 md:mt-0">Course FAQ</div> 
      <div
        className="grid md:grid-cols-12 grid-cols-12 justify-center items-center gap-5"
      >
           
      </div>

    </>
  );
}

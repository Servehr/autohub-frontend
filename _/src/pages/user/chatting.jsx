
import { useEffect, useState } from "react";
import { setUserNewEmail } from "@/apis/auth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { BeatLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";


export default function Chatting({ onClick, users }) 
{
  const navigate = useNavigate();
  const [isUser, setIsUser] = useState("-1")
  const [chatUsers, setChatUsers] = useState(users)

  return (
    <div>
      <Helmet>
        <title>Conversation | Autohub</title>
        <meta name="description" content="Sell Faster, Buy Smarter" />
      </Helmet>

      
      <NewPasswordContainer users={users} onClick={onClick} />
    </div>
  );
}

function NewPasswordContainer({users, onClick}) 
{

  return (
    <>
        <div className="">
            {
                users.map((user, index) => {
                   return (
                      <div onClick={() => {
                          onClick(user.id)
                      }} className="flex bg-gray-100 hover:bg-blue-200 text-white w-full py-5 px-3 border-2 border-blue gap-5 items-center cursor-pointer">
                          <img
                                    src={user.profile_photo_url}
                                    alt=""
                                    className="bg-blue-200 rounded-full col-span-2 font-bold" style={{ width: '40px', margin: '0px',  height: '40px' }}
                                  />
                          <div className="">
                              <span className="text-md text-gray-500 font-bold">{user.name}</span>
                          </div>
                          
                      </div>
                   )
                })
            }
        </div>
    </>
  );
}

 
import { useEffect, useState, useRef } from "react";
import { setUserNewEmail } from "@/apis/auth";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { BeatLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Conversation from "./conversation";
import Chatting from "./chatting";
import { ChatList, Conversations } from "@/apis/misc";import axios from 'axios';
import { BASE_URL, axios_instance, sendDataWithForm } from "@/lib/axios";


export default function Chat() 
{
  const { data, isLoading } = useQuery([`user-chat`], ChatList, { refetchOnWindowFocus: true, staleTime: Infinity, retry: 2 })
  if(!isLoading)
  {
     console.log(data)
  }


  const navigate = useNavigate();
  const [isUser, setIsUser] = useState("-1")

  return (
    <>
      <Helmet>
        <title>Change Email | Autohub</title>
        <meta name="description" content="Sell Faster, Buy Smarter" />
      </Helmet>

      
      {
         !isLoading && <ChatController users={data} />
      }
    </>
  );
}

function ChatController({ users }) 
{  
  const paragraphRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sucessMessage, setSuccessMessage] = useState("");
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);
  const [userId, setUserId] = useState(-1)
  const [conversations, setConversations] = useState([])
  const [refresh, setRefresh] = useState(-1)


  useEffect(() => 
  {
      if(userId != -1)
      {
          // setTimeout(() => {
          //     fetchUserConversation(userId)
          //     console.log("Great ++++++++")
          //     setRefresh(Math.random()*userId)
          // }, 2000)

          // paragraphRef.current.scrollIntoView({
          //   behavior: "smooth",
          //   block: "end"
          // })
          console.log(userId)
      }
  }, [userId, refresh])


  // const fetchUserConversation = async (userId) => 
  // {
  //     console.log(userId)
  //     Conversations(userId)
  //     .then((res) => 
  //     {
  //         console.log("Trying to fetch user information")
  //         console.log(res)
  //         setConversations(res)
  //     })
  //     .catch((err) => 
  //     {
  //             console.log(err)
  //     })
  // }

  return (
    <>
        <main className="mb-30" style={{marginTop: "-18px"}}>
              <div className="grid grid-cols-12 gap-5 py-3 mt-5">
                    <div className="col-span-8 flex flex-col h-[550px] pr-5">

                      {/* <p ref={paragraphRef}>
                          Lorem ipsum…
                      </p> */}
                      {
                         (userId === -1) && 
                            <div className="flex flex-col justify-center items-center w-full h-full">                              
                                <div className="font-bold text-2xl -mt-10 w-full text-center">Welcome to chat room</div>
                                <div className="font-bold text-lg w-full text-center">Leave your message here</div>
                            </div>
                      }
                      {
                         (userId != -1) &&  <>
                                  <Conversation theUserId={userId} /> 

                            </>
                      }
                      </div>

                    <div className="col-span-4 border border-1 overflow-auto overflow-y-scroll justify-center h-[550px] item-center">
                        <Chatting onClick={ 
                                (e) => {
                                  console.log(e)
                                  setUserId(e)
                                }
                          }  users={users} />
                    </div>
                    
              </div>
        </main>
    </>
  );
}

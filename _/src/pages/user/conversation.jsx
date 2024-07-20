
import { useEffect, useState, useRef } from "react";
import { setUserNewEmail } from "@/apis/auth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { BeatLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { sendConversationMessage, Conversations } from "@/apis/misc";
import { useQuery } from "react-query";
import { addMessage } from "@/apis/ads";
import { AVATAR } from "@/lib/axios";
import { Icons } from "@/util/icon";

const schema = yup.object({conversation: yup.string().required("Leave a message")}).required();

export default function Conversation({ theUserId, advertiserProductId }) 
{   
    const { data, isLoading } = useQuery([`conversations/${theUserId}/${advertiserProductId}`], () => Conversations(theUserId, advertiserProductId), 
                                      { 
                                            refetchOnWindowFocus: true, 
                                            staleTime: Infinity, 
                                            retry: 2,
                                            refetchInterval: 1000
                                      })
    
    if(!isLoading)
    {
       console.log(data)
    }
    const [loading, setLoading] = useState(false);  
    const [serverError, setServerError] = useState("");
    const paragraphRef = useRef(null);    
    const [messageToSend, setMessageTosend] = useState('')  
    const [emptyMessage, setEmptyMessage] = useState('')

    useEffect(() => {
        setEmptyMessage('')
    }, [emptyMessage])

    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm({
      resolver: yupResolver(schema),
    });
  

    const onSubmit = (msg) => 
    {
        // console.log({"MSG" : msg.conversation, theUserId, advertiserProductId})
        // return
        setLoading(true);
        sendConversationMessage(msg.conversation, theUserId, advertiserProductId)
        .then(() => {
            setEmptyMessage('')
            document.getElementById('conversation').innerHTML = ''
            reset();
            setLoading(false);
            setServerError("");
            // refetch();
            // reset();
        })
        .catch((res) => {
            setLoading(false);
            setServerError(`${res}`);
        });
    };

    // const userId = Number(localStorage.getItem("authenticatedId"))
    // if(!isLoading)
    // {
    //   console.log(data)
    //   paragraphRef?.current.scrollIntoView({
    //     behavior: "smooth",
    //     block: "end"
    //   })
    //   // this.messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    // }

  return (
    <>
        <div className="flex flex-col pt-5 overflow-auto overflow-y-scroll px-3 mb-5">
            <div className="w-full rounded-md py-2 h-[400px]" id="messages">

              {
                 isLoading && <div className="flex w-full h-[150px] justify-center items-center">
                      <BeatLoader color="#1c9236" />
                 </div>
              }

              {
                 !isLoading && (data?.length === 0)  && <div className="flex w-full h-[150px] justify-center items-center">
                      <div className="d-flex justify-items items-center">
                          <div className="ml-20 mb-5 mt-20">                              
                            <Icons iconName={'comment'} height={20} width={20} color="gray" />
                          </div>
                          <p>Leave your message here</p>
                      </div>
                 </div>
              }

               {  !isLoading && 
                  data?.map((user) => {
                      return (
                          <>
                              { (theUserId === user?.sent_by) &&
                                  <div className="h-fit w-full rounded-md mb-2 items-center grid grid-cols-12 gap-5 justify-center overflow-hidden"
                                  >
                                      <div className="bg-green-200 rounded-lg text-sm pr-5 py-2 col-span-11 text-right">
                                            {user?.message} 
                                      </div>
                                      <img
                                        src={`${AVATAR}/${user?.avatar}`}
                                        alt=""
                                        className="bg-blue-500 rounded-full col-span-1 w-11 h-15"
                                      />
                                  </div>
                              }
                              { 
                                (theUserId != user?.sent_by) &&
                                  <div className="w-full rounded-md mb-2 items-center grid grid-cols-12 gap-5 justify-center overflow-hidden"
                                  >
                                      <img
                                        src={`${AVATAR}/${user?.avatar}`}
                                        alt=""
                                        className="bg-blue-500 rounded-full col-span-1 w-11"
                                      />
                                      <div className="bg-blue-100 rounded-lg text-sm pl-5 py-2 col-span-11 text-left">
                                          {user?.message} 
                                      </div>
                                </div>
                              }
                          </>
                      )

                  })
               }            

            </div>
            <div className="w-full h-[10]" ref={paragraphRef} style={{ marginTop: '-10px' }}></div>
        </div>                                 
        
        {/* <p ref={paragraphRef}>Lorem ipsum…</p> */}
        <div className="grid grid-cols-12 gap-2">                        
                  <div className="w-full rounded-xl bg-[#f8f5f5] border mt-2 col-span-12"> 

                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="px-6 my-4 flex gap-2"
                          >
                            <div className="flex flex-col w-full">
                              <input
                                defaultValue={emptyMessage}
                                type="text"
                                id="conversation"
                                name="conversation"
                                {...register("conversation")}
                                className="outline-none px-2 py-4 bg-transparent rounded-xl border  focus:border-brandGreen w-full transition duration-150"
                                placeholder="Enter message here"
                              />  
                            </div>

                            <div className="flex justify-end">
                              <button type="submit" className="px-4 bg-green-600 text-white font-semibold text-sm rounded-xl w-max">
                                {loading ? (
                                  <BeatLoader size={3} color="#fff" />
                                ) : (
                                  "Submit"
                                )}
                              </button>
                            </div>
                        </form>
                        <p className="text-sm font-bold text-brandRed -mt-2 mb-3 ml-6">{errors?.conversation?.message || serverError}</p>

                      {/* <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="px-6 my-4 flex flex-col gap-2"
                              >                                     
                          <input defaultValue={messageToSend} onBlur={(e) => {
                                              console.log(e)
                                              setMessageTosend(e.target.value)
                                  }} type="text" id="content"  name="content" rows={1}   
                                  className="absolulte w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 text-sm py-2 px-3 leading-8 transition-colors duration-200 ease-in-out"
                          /> 
                      </form>*/}
                </div>              
                <div className="text-sm font-bold text-green-900 mt-2 mb-3 rounded-md col-span-12">{data?.length} Messages</div>        
                {/* <div className="col-span-2">                   
                      <button className="p-3 w-full bg-green-900 rounded-lg text-white" onClick={sendMessage}>Send</button>
                </div> */}
        </div>

    </>
  );
}
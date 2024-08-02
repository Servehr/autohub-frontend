import { logOut } from "@/apis/auth";
import useUser from "@/hooks/useUser";
import { Link, NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import Header from "@/layouts/header";
import { browserType } from "@/store";
import { BeatLoader, BounceLoader } from "react-spinners";
import { appStore } from "@/state/appState";
import { useEffect, useState } from "react";
import { AVATAR } from "@/lib/axios";
import { ChangeProfilePicture } from "@/components/ChangeProfilePicture";
import { BasicProfile } from "./user-profile/BasicProfile";

export default function Profile() 
{
  const advertState = appStore((state) => state)
  const { data, isLoading, refetch } = useUser();
  const [ imageOpenModal, setImageOpenModal] = useState(false)  
  const [profilePicture, setProfilePicture] = useState(`${AVATAR}${data.data.avatar}`)
  const { isMobile } = browserType();
  const navigate = useNavigate();

  const [loggedInUserType, setLoggedInUserType] = useState('')
  const [theService, setTheService] = useState(-1)
  const [isUser, setIsUser] = useState("-1")
  const [openBasicInfo, setOpenBasicInfo] = useState(false)

  useEffect(() => 
  {
      const loggedInUser = localStorage.getItem('users')
      const convert = JSON.parse(loggedInUser)
      advertState.setLoggedInUserType(localStorage.getItem("userTypes"))
      advertState.setUserServices(localStorage.getItem("services"))
      setLoggedInUserType(localStorage.getItem("userTypes"))
      setTheService((localStorage.getItem("services")))
  }, [])
  
  return (
    <>
      <Header />
      <div className="-mb-10">
        {/* Profile Picture and Button */}
        <div className="md:hidden mt-5">
          <div className="grid grid-cols-12 items-center">

            <div className="col-span-6 items-center justify-center gap-[1px] mb-10">
              <ul className="w-[180px]">
                  <li className="py-1 px-3 my-2 bg-green-700 text-gray-300 text-sm hover:bg-green-700 rounded-md hover:text-white hover:font-bold cursor-pointer" onClick={() => {
                      navigate('/dashboard/store')
                  }}>My Ads</li>
                  <li className="py-1 px-3 my-2 bg-green-700 text-gray-300 text-sm hover:bg-green-700 rounded-md hover:text-white hover:font-bold cursor-pointer" onClick={() => {
                      navigate('/dashboard/create-advert')
                  }}>Create Advert</li>
                  <li className="py-1 px-3 my-2 bg-green-700 text-gray-300 text-sm hover:bg-green-700 rounded-md hover:text-white hover:font-bold cursor-pointer" onClick={() => {
                      navigate('/dashboard')
                  }}>Account</li>
                  <li className="py-1 px-3 my-2 bg-green-700 text-gray-300 text-sm hover:bg-green-700 rounded-md hover:text-white hover:font-bold cursor-pointer" onClick={() => {
                      navigate('/dashboard/change-email')
                  }}>Change Email</li>
                  <li className="py-1 px-3 my-2 bg-green-700 text-gray-300 text-sm hover:bg-green-700 rounded-md hover:text-white hover:font-bold cursor-pointer" onClick={() => {
                      navigate('/dashboard/change-phone-number')
                  }}>Change Phone Number</li>
              </ul>
            </div>
           
            <div className="col-span-6 d-flex items-center justify-center h-full w-full border h-[180px] w-[180px] p-2 md:p-4">
              <div className="relative aspect-square rounded-full border border-5 border-green-800 overflow-hidden flex items-center justify-center">
              {/* <div className="relative aspect-square rounded-full overflow-hidden h-full w-full flex items-center justify-center"> */}
                
                {data && (
                  <img
                    src={
                      (profilePicture != "")
                        ? profilePicture
                        : `${AVATAR}${data.data.avatar}`
                    }
                    alt=""
                    className="object-cover w-full h-full"
                  />
                )}
                <div className="p-3 absolute bottom-0 -mb-2">
                    <span className="px-3 pb-3 pt-1 text-xs font-bold bg-green-500 hover:bg-green-800 rounded-full cursor-pointer border border-white border-10 hover:text-white hover:text-white"
                    onClick={() => {
                       setImageOpenModal(true)
                    }}
                    >Change</span>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center mt-5 gap-[1px]">
                <p className="text-brandGreen text-sm sm:text-base font-bold">
                  {data && data.data?.name}
                </p>
                <p className="font-medium text-sm sm:text-base">
                  {data && data.data?.phoneno}
                </p>              
              </div>
            </div>

          </div>

          {/* <div className="w-full justify-center gap-4 flex md:hidden text-xs">
            <div className="p-4 py-3 my-2 bg-brandGreen/10 w-max rounded-full text-brandGreen font-semibold">
              Change Password
            </div>
            <div className="p-4 py-3 my-2 bg-brandGreen/10 w-max rounded-full text-brandGreen font-semibold">
              Edit Profile
            </div>
          </div>           */}
        </div>


        <div className="gap-5 p-5 md:-mt-24 mt-5 md:px-0 min-h-[100vh-350px] h-full bg-white shadow md:shadow-none rounded-lg">
          <h2 className="text-sm md:text-base mb-5 font-bold text-brandGreen mt-10">
            Profile
          </h2>

          {isLoading && (
            <div className="min-h-[320px] flex justify-center items-center text-brandGreen">
              {isMobile ? (
                <BeatLoader color="#1c9236" />
              ) : (
                <BounceLoader color="#1c9236" />
              )}
            </div>
          )}
          { !isLoading && data &&
            <div className="grid md:grid-cols-2 gap-5">
              <div className="w-full h-[50px] rounded-lg border border-brandGreen relative flex items-center px-3 text-sm text-brandDarkGray font-bold">
                <p className="absolute -top-2 left-4 font-semibold text-xs text-brandDarkGray bg-white px-2">
                  Firstname
                </p>
                <p className="w-full text-ellipsis truncate">{data?.data?.name}</p>
              </div>

              <EditDetails />
              <div className="w-full h-[50px] rounded-lg border border-brandGreen relative flex items-center px-3 text-sm text-brandDarkGray font-bold">
                <p className="absolute -top-2 left-4 font-semibold text-xs text-brandDarkGray bg-white px-2">
                  Surname
                </p>
                <p className="w-full text-ellipsis truncate">{data?.data?.lastname}</p>
              </div>
              <div className="w-full h-[50px] rounded-lg border border-brandGreen relative flex items-center px-3 text-sm text-brandDarkGray font-bold">
                <p className="absolute -top-2 left-4 font-semibold text-xs text-brandDarkGray bg-white px-2">
                  Email
                </p>
                <p className="w-full text-ellipsis truncate">
                  {data?.data?.email}
                </p>
              </div>
              <div className="w-full h-[50px] rounded-lg border border-brandGreen relative flex items-center px-3 text-sm text-brandDarkGray font-bold">
                <p className="absolute -top-2 left-4 font-semibold text-xs text-brandDarkGray bg-white px-2">
                  Phone Number
                </p>
                <p className="w-full text-ellipsis truncate">
                  {data?.data?.phoneno}
                </p>
              </div>
            </div>
          }

        </div>
        
        <div className="font-bold w-fit p-4 mt-5 bg-green-900 text-white rounded-md cursor-pointer" onClick={() => setOpenBasicInfo(true)}>Edit Information</div>

        { openBasicInfo && <BasicProfile data={data?.data} openBasicInfo={openBasicInfo}  onClick={() => {
              refetch()
              setOpenBasicInfo(false)
        }} /> }

        {/* <div className="w-full justify-end flex">
          <div
            className={`p-2 px-4  bg-brandDarkGray w-max text-sm text-white font-medium rounded-lg`}
            // onClick={() => logOut()}
          >
            Save Changes
          </div>
        </div> */}

        {/* Change Profile Picture Button */}
        {/* <div className="w-full my-2">
          <div
            className="text-xs"
            // className="p-2 px-4  bg-brandGreen w-max text-sm text-white font-medium rounded-lg"
            // onClick={() => logOut()}
          >
            Change Profile Picture
          </div>
        </div> */}

        <div className="w-full justify-center flex md:hidden mt-14">
          <div
            className="p-4 py-3 my-2 bg-brandGreen/10 w-max rounded-full text-brandGreen font-semibold"
            onClick={() => logOut()}
          >
            Log Out
          </div>
        </div>
      </div>
      {
          imageOpenModal && <ChangeProfilePicture onClick={(e) => {
              // useUser();
              if(e != true)
              {   
                  setProfilePicture(`${AVATAR}${e}`)
                  console.log(e)
              }
              // alert(e)
              setImageOpenModal(false)
          } } imageModal={imageOpenModal} />
      }
    </>
  );
}

const EditDetails = ({}) => {
  <input
    type="text"
    className="w-full h-[50px] rounded-lg border border-brandGreen relative flex items-center px-3 text-sm text-brandDarkGray font-bold"
  />;
};


// const Highlight = ()
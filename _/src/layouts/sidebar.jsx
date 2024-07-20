import { logOut } from "@/apis/auth";
import { ChangeProfilePicture } from "@/components/ChangeProfilePicture";
import useUser from "@/hooks/useUser";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import SupvervisorDashboard from "./SupvervisorDashboard";
import { appStore } from "@/state/appState";
import { AVATAR } from "@/lib/axios";

export default function DashSidebar() 
{
  const advertState = appStore((state) => state)
  
  // advertState.setLoggedInUser(convert)
  // const userType = advertState.getLoggedInUser()

  const [loggedInUserType, setLoggedInUserType] = useState(advertState.getUserServices())
  const [isUser, setIsUser] = useState("-1")
  const navigate = useNavigate();
  const [theService, setTheService] = useState(-1)

  const [ imageOpenModal, setImageOpenModal] = useState(false)   
  const { data } = useUser();
  const [profilePicture, setProfilePicture] = useState(`${AVATAR}${data.data.avatar}`)
  console.log(data)
  console.log(data.followers)
  const uType = advertState.getUserServices()

  useEffect(() => 
  {
      const loggedInUser = localStorage.getItem('users')
      const convert = JSON.parse(loggedInUser)
      advertState.setLoggedInUserType(localStorage.getItem("userTypes"))
      advertState.setUserServices(localStorage.getItem("services"))
      setLoggedInUserType(localStorage.getItem("userTypes"))
      setTheService((localStorage.getItem("services")))
  }, [])

  useEffect(() => {

  }, [profilePicture])

  return (
    <>
      <div className="hidden w-full md:w-[269px] md:bg-white h-full px-3 md:px-6 py-2 md:py-5 rounded-[15px] md:flex flex-col justify-center md:justify-start items-center gap-2 md:gap-5 shrink-0 md:shadow-xl ">
        <div className="flex gap-10 md:gap-5 items-center flex-row md:flex-col border md:border-none w-full rounded-[15px] py-10 md:py-0 justify-center">
          <div className="border h-[70px] sm:h-[130px] md:h-[137px] rounded-full aspect-square p-2 md:p-4">
            <div className="relative h-full w-full aspect-square rounded-full flex items-center justify-center overflow-hidden">
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
          </div>
          <div className="md:border h-fit py-3 md:w-full -mt-3 flex flex-col items-center justify-center rounded-[10px]">
            <p className="text-brandGreen text-lg lg:text-base font-bold">
              { data && data.data?.name}
            </p>
            { (advertState.getLoggedInUserType()) === "market" && <p className="font-medium text-md md:text-base">
              {data && data.data?.phoneno}            
            </p>}
            { (advertState.getLoggedInUserType()) === "market" && <p className="text-blue-800 p-2 text-lg">
                Followers: <strong style={{ color: 'red' }}>{ data.followers }</strong>
            </p>
            }
            {/* { advertState.getLoggedInUserType() } - { advertState.getUserServices() } */}
          </div>
        </div>

        {/*  */}
        <div className="w-full -mt-3 hidden  md:block text-white">
          <ul className="flex flex-col w-full gap-1">
            { ((advertState.getUserServices() === '2') || advertState.getUserServices() === '1') && advertState.getLoggedInUserType() === 'market' && sidebarItems?.map((item, idx) => (
              <li key={item + idx} className="cursor-pointer">
                <>
                  <NavLink end to={item.link}>
                    {({ isActive }) => (
                      <div
                        className={`${
                          isActive
                            ? "bg-brandGreen/[1] text-white font-bold"
                            : "hover:bg-brandGreen/[0.15] hover:text-brandGreen text-brandDarkGray font-semibold bg-green-100"
                        } px-6 py-2 rounded-[10px] font-semibold text-sm`}
                      >
                        {item.name}
                      </div>
                    )}
                  </NavLink>
                </>
              </li>
            ))}
            
            { ((advertState.getUserServices() === '2') && (advertState.getLoggedInUserType() === 'both')) | ((advertState.getUserServices() === '4') && (advertState.getLoggedInUserType() === 'student')) && supervisorSidebarItems?.map((item, idx) => (
              <li key={item + idx} className="cursor-pointer">
                <>
                  <NavLink end to={item.link}>
                    {({ isActive }) => (
                      <div
                        className={`${
                          isActive
                            ? "bg-blue-500 text-white font-bold"
                            : "hover:bg-blue-800 hover:text-white text-black font-semibold bg-blue-200"
                        } px-6 py-2 rounded-[10px] font-semibold text-sm`}
                      >
                        {item.name}
                      </div>
                    )}
                  </NavLink>
                </>
              </li>
            ))} 

            <li
              onClick={logOut}
              className="flex space-x-5 cursor-pointer mt-1 hover:bg-brandRed/[0.15] hover:text-brandRed hover:font-bold  md:text-gray-800 px-6 py-2 mb-5 rounded-[10px] font-bold text-sm bg-brandRed md:bg-white"
            >
              <span>Log Out </span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" className="w-4 h-4">
                <path fill-rule="evenodd" d="M12 2.25a.75.75 0 0 1 .75.75v9a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM6.166 5.106a.75.75 0 0 1 0 1.06 8.25 8.25 0 1 0 11.668 0 .75.75 0 1 1 1.06-1.06c3.808 3.807 3.808 9.98 0 13.788-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788a.75.75 0 0 1 1.06 0Z" clip-rule="evenodd" />
              </svg>

            </li>
          </ul>
        </div>
      </div>
      {
          imageOpenModal && <ChangeProfilePicture onClick={(e) => {
              // useUser();
              // alert(e)
              if(e != true)
                {   
                    setProfilePicture(`${AVATAR}${e}`)
                    console.log(e)
                }
              console.log(e)
              setImageOpenModal(false)
          } } imageModal={imageOpenModal} />
      }
    </>
  );
}

const sidebarItems = [
  // {
  //   name: "Dashboard",
  //   link: "/dashboard/summary",
  // },
  {
    name: "My Ads",
    link: "/dashboard/store",
  },
  {
    name: "Create Advert",
    link: "/dashboard/create-advert",
  },
  {
    name: "Account",
    link: "/dashboard/profile",
  },
  {
    name: "Change Email",
    link: "/dashboard/change-email",
  },
  {
    name: "Change Phone Number",
    link: "/dashboard/change-phone-number",
  },
  // {
  //   name: "Chat",
  //   link: "/dashboard/chat",
  // },
];


const supervisorSidebarItems = [
  {
    name: "Dashboard",
    link: "/dashboard/summary",
  },
  // {
  //   name: "Curriculum",
  //   link: "/dashboard/curriculum",
  // },
  {
    name: "Courses",
    link: "/dashboard/courses",
  },
  {
    name: "Take A Test",
    link: "/dashboard/test-user",
  },
  {
    name: "Take An Exam",
    link: "/dashboard/exam-user",
  },
  {
    name: "FAQ",
    link: "/dashboard/course-faq",
  },
  {
    name: "Profile",
    link: "/dashboard/profile",
  },
  // {
  //   name: "Change Phone Number",
  //   link: "/dashboard/change-phone-number",
  // },
  // {
  //   name: "Chat",
  //   link: "/dashboard/chat",
  // },
];
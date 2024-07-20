import { useState } from "react";
import { menu_items } from "@/constant/nav";
import { Link, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { modalStore } from "@/store";
import useUser from "@/hooks/useUser";
import { logOut } from "@/apis/auth";
import DashSidebar from "@/layouts/sidebar";


export default function Menu() {
  const { menu, toggleMenu } = modalStore();
  const { openMenu, setOpenMenu } = useState(false);  
  const navigate = useNavigate()
  const { data: user } = useUser()
  const [profilePicture, setProfilePicture] = useState(user?.data?.avatar)
  console.log(user)

  const menuStyle = {
    transform: menu ? "translateX(0)" : "translateX(-100%)",
    backgroundColor: menu ? "rgb(252 252 252 / 0%);" : "rgb(252 252 252 / 0%);"
  };

  const menuBar = () => 
  {
      setOpenMenu(!openMenu)
  }

  return (
                
          <div
            className="fixed top-0 left-0 z-[60] h-screen w-full border-none flex duration-1000 ease-in-out transition"
            style={menuStyle} onClick={toggleMenu}
          >
            <div className="bg-green-900 text-white border-r-4 border-red-300 w-[300px] p-5">
              <div className="w-full h-10 flex justify-end mb-14 -mt-5">
                <div
                  className="flex items-center gap-2 cursor-pointer pt-10"
                  // onClick={toggleMenu}
                  onClick={() => setOpenMenu(!openMenu) }
                >
                  {/* <p className="text-red-300 mr-3 text-base md:text-lg font-semibold">Menu</p> */}
                  <div className="relative h-[40px] md:h-[50px] aspect-square rounded-full bg-brandGreen text-white flex justify-center items-center">
                    <img
                      src="/assets/close.svg"
                      alt=""
                      className="absolute z-[100] h-[25px] md:h-[30px] w-auto"
                      onClick={() => setOpenMenu(!openMenu) }
                    />
                  </div>
                </div>
              </div>

              <div className="max-w-[400px] w-full -mt-24">
                <div className="p-3 mb-3 mt-3">
                  { 
                    user && (
                      <img
                        src={
                          profilePicture
                            ? profilePicture
                            : user.data.avatar
                        }
                        alt=""
                        className="object-cover w-[65px] h-[65px] rounded-full border border-green-100 border-4 -ml-3 mb-3"
                      />
                    )
                  }
                  {/* { 
                    user &&
                    <div className="w-full -ml-8 -mb-5 text-white border border-gray-400 rounded-md p-3 md:hidden lg:hidden">
                        <ul className="flex flex-col w-full gap-1">
                          {sidebarItems?.map((item, idx) => (
                            <li key={item + idx} className="cursor-pointer">
                              <>
                                <NavLink end to={item.link}>
                                  {({ isActive }) => (
                                    <div
                                      className={`${
                                        isActive
                                          ? "text-white text-sm font-bold"
                                          : "text-white text-sm hover:border-gray-100 hover:border-2 p-1 hover:text-blue-500 hover:text-brandGreen font-semibold"
                                      } px-6 rounded-[10px] font-semibold`}
                                    >
                                      {item.name}
                                    </div>
                                  )}
                                </NavLink>
                              </>
                            </li>
                          ))}
                          
                        </ul>
                    </div>
                 } */}
                </div>
                <ul className="flex flex-col -ml-5 text-white">
                  {menu_items.map((link, idx) => (
                    <li
                      onClick={menuBar}
                      key={idx}
                      className="text-brandGreen text-white hover:bg-brandGreen/20 font-semibold text-xs sm:text-base md:text-sm py-2 hover:border-l-4 hover:border-red-900 px-6 flex text-left"
                    >
                      <Link to={link.route}>{link.name}</Link>
                    </li>
                  ))}

                  {/* { (user?.data?.email != "") } */}

                  {/* { (user?.data?.email === "" || user?.data?.email === undefined) && <a href="/login" className="text-brandGreen text-white hover:bg-brandGreen/20 font-semibold text-sm sm:text-base md:text-md py-2 hover:border-l-4 hover:border-red-900 px-6 flex text-left">Login</a>}
                  { (user?.data?.email === "" || user?.data?.email === undefined) && <a href="/register" className="text-brandGreen text-white hover:bg-brandGreen/20 font-semibold text-sm sm:text-base md:text-md py-2 hover:border-l-4 hover:border-red-900 px-6 flex text-left">Register</a> }
                  { (user?.data?.email != "" || user?.data?.email != undefined) && <a onClick={logOut} className="text-brandGreen text-white hover:bg-brandGreen/20 font-semibold text-sm sm:text-base md:text-md py-2 hover:border-l-4 hover:border-red-900 px-6 flex text-left">Logout</a> } */}

                  { (user?.data?.email === "" || user?.data?.email === undefined) ? (
                        <>
                            <a href="/login" className="text-brandGreen text-white hover:bg-brandGreen/20 font-semibold text-sm sm:text-base md:text-md py-2 hover:border-l-4 hover:border-red-900 px-6 flex text-left">Login</a>
                            <a href="/register" className="text-brandGreen text-white hover:bg-brandGreen/20 font-semibold text-sm sm:text-base md:text-md py-2 hover:border-l-4 hover:border-red-900 px-6 flex text-left">Register</a>
                        </>
                    ): (
                        <>
                          {/* <a onClick={logOut} className="text-brandGreen cursor-pointer text-white hover:bg-brandGreen/20 font-semibold text-sm sm:text-base md:text-md py-2 hover:border-l-4 hover:border-red-900 px-6 flex text-left">Profile</a> */}
                          <li
                            onClick={menuBar}
                            className="text-brandGreen text-white hover:bg-brandGreen/20 font-semibold text-sm md:text-sm py-2 hover:border-l-4 hover:border-red-900 px-6 flex text-left"
                          >
                            <Link to={'/dashboard/profile'}>My Profile</Link>
                          </li>
                          <a onClick={logOut} className="text-brandGreen cursor-pointer text-white hover:bg-brandGreen/20 font-semibold text-sm md:text-sm py-2 hover:border-l-4 hover:border-red-900 px-6 flex text-left">Logout</a>
                         </>   
                    ) 
                  }

                  {/* { (user?.data?.email != "") && (
                    <li
                        onClick={toggleMenu}
                        className="text-brandGreen text-white hover:bg-brandGreen/20 font-semibold text-sm sm:text-base md:text-md py-2 hover:border-l-4 hover:border-red-900 px-6 flex text-left"
                      >
                        <Link
                          to="/register"
                          className="text-brandGreen font-medium text-sm md:hidden"
                        >
                          Register
                        </Link>
                    </li>
                  )} */}
                </ul>
              </div>
              </div>
          </div>
  );
}


const sidebarItems = [
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
    link: "/dashboard",
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
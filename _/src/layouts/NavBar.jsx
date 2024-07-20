import MaxWidthWrapper from "@/components/max-width-wrapper";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logOut } from "@/apis/auth";
import useUser from "@/hooks/useUser";
import { appStore } from "@/state/appState";


export default function MobileNavMenu() 
{
    const advertState = appStore((state) => state)
    const [open, setOpen] = useState(false)
    const [flyer, setFlyer] = useState(false)
    const [flyerTwo, setFlyerTwo] = useState(false)
    const navigate = useNavigate()  
    const { data: user } = useUser();    

    useEffect(() => {
      // document.body.addEventListener("click", function (evt) 
      // {
          // localStorage.setItem('fly', false)
          // setFlyer(true)
          // if(flyer === true)
          //   {
          //     setFlyer(false)
          //   }
      // });
    }, [flyer])

    return (
        <>
            <nav className="md:hidden lg:hidden">
              <div className="relative">
                {/* Item active: "text-gray-900", Item inactive: "text-gray-500" */}
                <button
                  type="button"
                  className="
                   group bg-white rounded-sm mt-3 text-gray-500 inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 pb-8'
                  "
                  onClick={() => (setFlyer(!flyer), setFlyerTwo(false))}
                >
                  <span className="w-fit">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                      <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clip-rule="evenodd" />
                    </svg>
                  </span>
           
                  <svg
                    className={
                      flyer === true
                        ? "transform rotate-180 ml-2 h-5 w-5 text-gray-400 group-hover:text-gray-500 transition ease-out duration-200"
                        : "transform rotate-0 transition ease-out duration-200 ml-2 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                    }
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                

                { user &&
                    <div id="flyOutter"
                  onMouseLeave={() => setFlyer(false)}
                  className={
                    flyer
                      ? " translate-y-0 transition ease-out duration-200 absolute z-10 -ml-4 mt-3 transform px-2 w-[110px]"
                      : " hidden translate-y-1 absolute z-10 -ml-5 mt-3 transform px-2 w-[110px]"
                  }
                >
                  <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden -mt-4 -ml-48"
                  >
                    { ((advertState.getUserServices() === "1")  ||  (advertState.getUserServices() === "2")) &&
                      <div className="relative grid gap-6 bg-white px-5 py-2 sm:gap-8 sm:p-8">
                        <a
                          href="#"
                          className="-m-3 p-2 flex items-start rounded-sm hover:bg-green-600"
                          onClick={() => {
                            setFlyer(false)
                            navigate('/dashboard/store')
                          }}
                        >
                          {/* Heroicon name: outline/chart-bar */}
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="mt-1 w-4 h-4">
                            <path fill-rule="evenodd" d="M3 6a3 3 0 0 1 3-3h2.25a3 3 0 0 1 3 3v2.25a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6Zm9.75 0a3 3 0 0 1 3-3H18a3 3 0 0 1 3 3v2.25a3 3 0 0 1-3 3h-2.25a3 3 0 0 1-3-3V6ZM3 15.75a3 3 0 0 1 3-3h2.25a3 3 0 0 1 3 3V18a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-2.25Zm9.75 0a3 3 0 0 1 3-3H18a3 3 0 0 1 3 3V18a3 3 0 0 1-3 3h-2.25a3 3 0 0 1-3-3v-2.25Z" clip-rule="evenodd" />
                          </svg>

                          <div className="ml-4">
                            <p className="text-sm font-medium text-gray-900">
                              {/* <Link to={'/dashboard/store'}>My Ads</Link> */}
                              My Ads
                            </p>
                          </div>
                        </a>
                        <a
                          href="#"
                          className="-m-3 p-2 flex items-start rounded-sm hover:bg-green-600"
                          onClick={() => {
                            setFlyer(false)
                            navigate('/dashboard/create-advert')
                          }}
                        >
                          {/* Heroicon name: outline/cursor-click */}
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="mt-1 w-4 h-4">
                            <path d="M6 3a3 3 0 0 0-3 3v2.25a3 3 0 0 0 3 3h2.25a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3H6ZM15.75 3a3 3 0 0 0-3 3v2.25a3 3 0 0 0 3 3H18a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3h-2.25ZM6 12.75a3 3 0 0 0-3 3V18a3 3 0 0 0 3 3h2.25a3 3 0 0 0 3-3v-2.25a3 3 0 0 0-3-3H6ZM17.625 13.5a.75.75 0 0 0-1.5 0v2.625H13.5a.75.75 0 0 0 0 1.5h2.625v2.625a.75.75 0 0 0 1.5 0v-2.625h2.625a.75.75 0 0 0 0-1.5h-2.625V13.5Z" />
                          </svg>

                          <div className="ml-4">
                              <p className="text-sm font-medium text-gray-900">
                                {/* <Link to={'/dashboard/create-advert'}>Create Advert</Link> */}
                                Create Advert
                              </p>
                          </div>
                        </a>
                        <a
                          href="#"
                          className="-m-3 p-2 flex items-start rounded-sm hover:bg-green-600"
                          onClick={() => {
                            setFlyer(false)
                            navigate('/dashboard/profile')
                          }}
                        >
                          {/* Heroicon name: outline/shield-check */}
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="mt-1 w-4 h-4">
                            <path d="M5.25 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM2.25 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM18.75 7.5a.75.75 0 0 0-1.5 0v2.25H15a.75.75 0 0 0 0 1.5h2.25v2.25a.75.75 0 0 0 1.5 0v-2.25H21a.75.75 0 0 0 0-1.5h-2.25V7.5Z" />
                          </svg>

                          <div className="ml-4">
                              <p className="text-sm font-medium text-gray-900">
                                {/* <Link to={'/dashboard'}>Account</Link> */}
                                Profile
                              </p>
                          </div>
                        </a>
                        <a
                          href="#"
                          className="-m-3 p-2 flex items-start rounded-sm hover:bg-green-600"
                          onClick={() => {
                            setFlyer(false)
                            navigate('/dashboard/change-email')
                          }}
                        >
                          {/* Heroicon name: outline/view-grid */}
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="mt-1 w-4 h-4">
                            <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                            <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                          </svg>
                          <div className="ml-4">
                              <p className="text-sm font-medium text-gray-900">
                                {/* <Link to={'/dashboard/change-email'}>Change Email</Link> */}
                                Change Email
                              </p>
                          </div>
                        </a>
                        <a
                          href="#"
                          className="-m-3 p-2 flex items-start rounded-sm hover:bg-green-600"
                          onClick={() => {
                            setFlyer(false)
                            navigate('/dashboard/change-phone-number')
                          }}
                        >
                          {/* Heroicon name: outline/refresh */}
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="mt-1 w-4 h-4">
                            <path fill-rule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clip-rule="evenodd" />
                          </svg>

                          <div className="ml-4">
                              <p className="text-sm font-medium text-gray-900">
                                {/* <Link to={'/dashboard/change-phone-number'}>Change Phone Number</Link> */}
                                Change Phone Number
                              </p>
                          </div>
                        </a>
                      </div>
                    }
                    { ((advertState.getUserServices() === "2")  ||  (advertState.getUserServices() === "4")) &&
                      <div className="relative grid gap-6 bg-white px-5 py-2 sm:gap-8 sm:p-8 -mt-8">
                        <a
                          href="#"
                          className="-m-3 p-2 flex items-start rounded-sm hover:bg-green-600"
                          onClick={() => {
                            setFlyer(false)
                            navigate('/dashboard/courses')
                          }}
                        >
                          {/* Heroicon name: outline/chart-bar */}
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="mt-1 w-4 h-4">
                            <path fill-rule="evenodd" d="M3 6a3 3 0 0 1 3-3h2.25a3 3 0 0 1 3 3v2.25a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6Zm9.75 0a3 3 0 0 1 3-3H18a3 3 0 0 1 3 3v2.25a3 3 0 0 1-3 3h-2.25a3 3 0 0 1-3-3V6ZM3 15.75a3 3 0 0 1 3-3h2.25a3 3 0 0 1 3 3V18a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-2.25Zm9.75 0a3 3 0 0 1 3-3H18a3 3 0 0 1 3 3V18a3 3 0 0 1-3 3h-2.25a3 3 0 0 1-3-3v-2.25Z" clip-rule="evenodd" />
                          </svg>

                          <div className="ml-4">
                            <p className="text-sm font-medium text-gray-900">
                              {/* <Link to={'/dashboard/store'}>My Ads</Link> */}
                              Dashboard
                            </p>
                          </div>
                        </a>
                        <a
                          href="#"
                          className="-m-3 p-2 flex items-start rounded-sm hover:bg-green-600"
                          onClick={() => {
                            setFlyer(false)
                            navigate('/dashboard/create-advert')
                          }}
                        >
                          {/* Heroicon name: outline/cursor-click */}
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="mt-1 w-4 h-4">
                            <path d="M6 3a3 3 0 0 0-3 3v2.25a3 3 0 0 0 3 3h2.25a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3H6ZM15.75 3a3 3 0 0 0-3 3v2.25a3 3 0 0 0 3 3H18a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3h-2.25ZM6 12.75a3 3 0 0 0-3 3V18a3 3 0 0 0 3 3h2.25a3 3 0 0 0 3-3v-2.25a3 3 0 0 0-3-3H6ZM17.625 13.5a.75.75 0 0 0-1.5 0v2.625H13.5a.75.75 0 0 0 0 1.5h2.625v2.625a.75.75 0 0 0 1.5 0v-2.625h2.625a.75.75 0 0 0 0-1.5h-2.625V13.5Z" />
                          </svg>

                          <div className="ml-4">
                              <p className="text-sm font-medium text-gray-900">
                                {/* <Link to={'/dashboard/create-advert'}>Create Advert</Link> */}
                                Create Advert
                              </p>
                          </div>
                        </a>
                        <a
                          href="#"
                          className="-m-3 p-2 flex items-start rounded-sm hover:bg-green-600"
                          onClick={() => {
                            setFlyer(false)
                            navigate('/dashboard/profile')
                          }}
                        >
                          {/* Heroicon name: outline/shield-check */}
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="mt-1 w-4 h-4">
                            <path d="M5.25 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM2.25 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM18.75 7.5a.75.75 0 0 0-1.5 0v2.25H15a.75.75 0 0 0 0 1.5h2.25v2.25a.75.75 0 0 0 1.5 0v-2.25H21a.75.75 0 0 0 0-1.5h-2.25V7.5Z" />
                          </svg>

                          <div className="ml-4">
                              <p className="text-sm font-medium text-gray-900">
                                {/* <Link to={'/dashboard'}>Account</Link> */}
                                Profile
                              </p>
                          </div>
                        </a>
                        <a
                          href="#"
                          className="-m-3 p-2 flex items-start rounded-sm hover:bg-green-600"
                          onClick={() => {
                            setFlyer(false)
                            navigate('/dashboard/change-email')
                          }}
                        >
                          {/* Heroicon name: outline/view-grid */}
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="mt-1 w-4 h-4">
                            <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                            <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                          </svg>
                          <div className="ml-4">
                              <p className="text-sm font-medium text-gray-900">
                                {/* <Link to={'/dashboard/change-email'}>Change Email</Link> */}
                                Change Email
                              </p>
                          </div>
                        </a>
                        <a
                          href="#"
                          className="-m-3 p-2 flex items-start rounded-sm hover:bg-green-600"
                          onClick={() => {
                            setFlyer(false)
                            navigate('/dashboard/change-phone-number')
                          }}
                        >
                          {/* Heroicon name: outline/refresh */}
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="mt-1 w-4 h-4">
                            <path fill-rule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clip-rule="evenodd" />
                          </svg>

                          <div className="ml-4">
                              <p className="text-sm font-medium text-gray-900">
                                {/* <Link to={'/dashboard/change-phone-number'}>Change Phone Number</Link> */}
                                Change Phone Number
                              </p>
                          </div>
                        </a>
                      </div>
                    }
                    <a
                      href="#"
                      className="px-6 py-5 flex items-start rounded-sm hover:text-red-600 bg-white -mt-5"
                      onClick={() => {
                        setFlyer(false)
                        logOut()
                      }}
                    >
                      {/* Heroicon name: outline/refresh */}
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="mt-1 w-4 h-4">
                        <path fill-rule="evenodd" d="M12 2.25a.75.75 0 0 1 .75.75v9a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM6.166 5.106a.75.75 0 0 1 0 1.06 8.25 8.25 0 1 0 11.668 0 .75.75 0 1 1 1.06-1.06c3.808 3.807 3.808 9.98 0 13.788-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788a.75.75 0 0 1 1.06 0Z" clip-rule="evenodd" />
                      </svg>

                      <div className="ml-4 flex hover:text-red-600 hover:font-bold">
                        <p className="text-sm font-medium hover:text-red-600 hover:font-bold text-gray-900">
                          Logout
                        </p>
                      </div>
                    </a>
                  </div>
                    </div>
                }

                {
                   !user && 
                   <div id="flyOutter"
                 onMouseLeave={() => setFlyer(false)}
                 className={
                   flyer
                     ? " opacity-100 translate-y-0 transition ease-out duration-200 absolute z-10 -ml-4 mt-3 transform px-2 w-[110px]"
                     : " opacity-0 translate-y-1 absolute z-10 -ml-5 mt-3 transform px-2 w-[110px]"
                 }
               >
                 <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden -mt-4 -ml-48"
                 >
                   <div className="relative grid gap-6 bg-white px-5 py-2 sm:gap-8 sm:p-8">
                     <a
                       className="-m-3 p-2 flex items-start rounded-sm hover:bg-green-600 cursor-pointer"
                       onClick={() => {
                          setFlyer(false)
                          navigate('login')
                       }}
                     >
                       {/* Heroicon name: outline/chart-bar */}
                       {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="mt-1 w-4 h-4">
                         <path fill-rule="evenodd" d="M3 6a3 3 0 0 1 3-3h2.25a3 3 0 0 1 3 3v2.25a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6Zm9.75 0a3 3 0 0 1 3-3H18a3 3 0 0 1 3 3v2.25a3 3 0 0 1-3 3h-2.25a3 3 0 0 1-3-3V6ZM3 15.75a3 3 0 0 1 3-3h2.25a3 3 0 0 1 3 3V18a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-2.25Zm9.75 0a3 3 0 0 1 3-3H18a3 3 0 0 1 3 3V18a3 3 0 0 1-3 3h-2.25a3 3 0 0 1-3-3v-2.25Z" clip-rule="evenodd" />
                       </svg> */}

                       <div className="ml-4">
                         <p className="text-sm p-2 font-medium text-gray-900">
                           {/* <Link to={'/dashboard/store'}>My Ads</Link> */}
                           Login
                         </p>
                       </div>
                     </a>
                     <a
                       className="-m-3 p-1 flex items-start rounded-sm hover:bg-green-600 cursor-pointer"
                       onClick={() => {
                          setFlyer(false)
                          navigate('register')
                       }}
                     >
                       {/* Heroicon name: outline/cursor-click */}
                       {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="mt-1 w-4 h-4">
                         <path d="M6 3a3 3 0 0 0-3 3v2.25a3 3 0 0 0 3 3h2.25a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3H6ZM15.75 3a3 3 0 0 0-3 3v2.25a3 3 0 0 0 3 3H18a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3h-2.25ZM6 12.75a3 3 0 0 0-3 3V18a3 3 0 0 0 3 3h2.25a3 3 0 0 0 3-3v-2.25a3 3 0 0 0-3-3H6ZM17.625 13.5a.75.75 0 0 0-1.5 0v2.625H13.5a.75.75 0 0 0 0 1.5h2.625v2.625a.75.75 0 0 0 1.5 0v-2.625h2.625a.75.75 0 0 0 0-1.5h-2.625V13.5Z" />
                       </svg> */}

                       <div className="ml-4">
                           <p className="text-sm p-2 font-medium text-gray-900">
                             {/* <Link to={'/dashboard/create-advert'}>Create Advert</Link> */}
                             Register
                           </p>
                       </div>
                     </a>
                   </div>
                 </div>
                   </div>
                } 

              </div>
            </nav>
        </>
    );
}
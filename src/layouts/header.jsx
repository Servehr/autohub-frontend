import { useEffect, useState } from "react";
import { HiMenu } from "react-icons/hi";
import { Link, NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import { modalStore } from "@/store";
import { RxAvatar } from "react-icons/rx";
import SearchBar from "@/components/searchbar";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import Menu from "@/components/menu";
import useUser from "@/hooks/useUser";
import MobileNav from "./mobile";
import MobileNavMenu from "./NavBar";
import './nav.css'
import { appStore } from "@/state/appState";



export default function Header() 
{
  const advertState = appStore((state) => state)
  const [loggedInUserType, setLoggedInUserType] = useState('')
  const [userService, setUserService] = useState('')

  useEffect(() => 
  {
      setUserService('')
  }, [])

  useEffect(() => 
  {
      const loggedInUser = localStorage.getItem('users')
      // console.log(loggedInUser)
      const useServ = userService
      const convert = JSON.parse(loggedInUser)
      // localStorage.setItem('ux', convert.type)
      // setLoggedInUserType(convert.type)
      setUserService(useServ)
  }, [loggedInUserType, userService])

  // advertState.setLoggedInUserType(ux)
  // alert(loggedInUserType)

  const { id } = useParams()
  console.log(id)
  const editPost = localStorage.getItem('editPost')
  const pathToEdit = `/edit-post/${editPost}`
  console.log("bbbbbbbbbbbbbbbbbbbbbbbb")
  console.log(Number(editPost))
  console.log("bbbbbbbbbbbbbbbbbbbbbbbb")

  const excludedPaths = [
    "/login",
    "/register",
    "/post-ad",
    "/sell-your-vehicle",
    "/swap-your-vehicle",
    "/forgot",
    "/reset",
    "/new-password",
    "/overview",
    "/ads",
    "/package",
    "/faqs",
    "/blog-post",
    "/create-post",
    "/edit-post",
    "/students",
    "/result",
    "/questionaires",
    `/edit-post/${editPost}`,
    `/questions`,
    `/courses`,
    `/dealers`,
    `/dealer-post`,
    `/staffs`,
    `/finance`,  
    `/expenses`,
    `/items`,
    `/request-item`,
    `/settings`,
  ];

  const { pathname } = useLocation();
  if (excludedPaths.includes(pathname)) {
    return <></>;
  }
  if (pathname.startsWith("/messages") || pathname.startsWith("/watchlist")) {
    return <Main />;
  }

  if (pathname.includes("/dashboard")) return <Dash />;

  return <Main />;
}

function Main() {
  const advertState = appStore((state) => state)
  const navigate = useNavigate();
  const { menu } = modalStore();
  const { pathname } = useLocation();
  const [showAccount, setShowAccount] = useState(false);
  const { data: user } = useUser();
  const [loggedInUser, setLoggedInUser] = useState('')

  useEffect(() => {
    if (menu) {
      document.body.classList.add("stop-scroll");
    } else {
      document.body.classList.remove("stop-scroll");
    }
  }, [menu, pathname]);
  const [loggedInUserType, setLoggedInUserType] = useState('')
  const [userService, setUserService] = useState('')

  useEffect(() => 
  {
      setUserService('')
  }, [])

  useEffect(() => 
  {
      const loggedInUser = localStorage.getItem('users')
      // console.log(loggedInUser)
      const useServ = userService
      const convert = JSON.parse(loggedInUser)
      // localStorage.setItem('ux', convert.type)
      // setLoggedInUserType(convert.type)
      setUserService(useServ)
  }, [loggedInUserType, userService])

  return (
    <>
      <Menu />

      <div
        className="sticky top-0 left-0 z-50 shadow w-full h-full lg:h-full bg-white px-3 sm:px-8 md:px-10 select-none"
        onMouseLeave={() => setShowAccount(false)}
      >
        <MaxWidthWrapper>
          <div className="gap-1 flex-col flex h-full w-full fit py-2">

              <TopHeader />

              <div className="h-[70px] lg:h-full w-full justify-between flex items-center gap-4 mb-3">
                <Brand />

                <SearchBar customStyle="hidden max-w-[600px] lg:flex" />

                <div className="flex gap-4 sm:gap-5 items-center">
                  <Account
                    showAccount={showAccount}
                    setShowAccount={setShowAccount}
                  />

                  {/* {!user && (
                    <Link
                      to="/login"
                      className="text-brandGreen font-medium text-sm md:hidden"
                    >
                      Login
                    </Link>
                  )} */}
                  { (userService != "4") && 
                      <button
                        onClick={() => {
                            advertState.setLoggedInUserType('market')
                            localStorage.setItem('userTypes', 'market')
                          if((user?.data?.id !=-1) || (user?.data?.id !=null) ||  (user?.data?.id !=''))
                            {
                                navigate("/dashboard/create-advert")
                            } else {
                                navigate('/')
                            }
                        }}
                        className="w-max text-white bg-brandGreen h-[36px] px-3 sm:px-5 md:text-sm text-xs font-semibold rounded-lg"
                      >
                        Post An Ad
                      </button>
                  }   
  
                  <MenuButton />
                </div>
              </div>

              <div className="flex lg:hidden w-full">
                  <div className="w-full p-2">
                      <SearchBar />
                  </div>
                  <div className="w-2/12 md:hidden lg:hidden p-2">
                      {/* <div className="bg-pink-500 p-4 lg:hidden md:hidden">Great</div> */}
                      <MobileNavMenu />
                  </div>
              </div>
          </div>
          
        </MaxWidthWrapper>
      </div>

      {/* <div className="pb-[132px] lg:pb-[80px]"></div> */}
    </>
  );
}

function TopHeader()
{
   const [openit, setOpenIt] = useState(false)

   return (
          
        <div className="hidden md:block lg:block grid grid-col-12 pb-2 border-b-2 mb-3">
            <ul className="flex px-5 pt-3 justify-center items-center justify-between">
                <li className="text-sm text-green-500 hover:text-red-900 hover:font-bold hover:text-md"><Link to='/'>Home</Link></li>
                <li className="text-sm text-green-500 hover:text-red-900 hover:font-bold hover:text-md"><Link to='/about-us'>About Us</Link></li>
                <li className="text-sm text-green-500 hover:text-red-900 hover:font-bold hover:text-md"><Link to='/contact-us'>Contact Us</Link></li>
                <li className="text-sm text-green-500 hover:text-red-900 hover:font-bold hover:text-md"><Link to='/blog'>Blog</Link></li>
                <li className="text-sm text-green-500 hover:text-red-900 hover:font-bold hover:text-md"><Link to='/faq'>FAQ</Link></li>
                <li className="text-sm text-green-500 hover:text-red-900 hover:font-bold hover:text-md">Sell Your Vehicle</li>
                <li className="text-sm text-green-500 hover:text-red-900 hover:font-bold hover:text-md">swap Your Vehicle</li>
                <li className="text-sm text-green-500 hover:text-red-900 hover:font-bold hover:text-md">Car Loan</li>
                <li className="text-sm text-green-500 hover:text-red-900 hover:font-bold hover:text-md">Build Your Money</li>
                <li className="text-sm text-green-500 hover:text-red-900 hover:font-bold hover:text-md">
                    {/* <NavLink to='/maceos-welcome' activeClassName="selected">MACEOS</NavLink> */}
                    <div className="dropdown inline-block relative">
                      <button onMouseOver={() => {
                          setOpenIt(true)
                      }}  className="text-gray-700 py-2 px-4 rounded inline-flex items-center">
                        <span className="mr-1 text-green-500">MACEOS</span>
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/> </svg>
                      </button>
                      { openit &&
                        <ul 
                          onMouseLeave={() => {
                              setOpenIt(false)
                          }}  className="dropdown-menu absolute w-[200px] z-[60] text-gray-700 pt-1 bg-green-400 pb-2">
                          <li className="">
                            <Link to={'/maceos-welcome'} className="rounded-t cursor-pointer hover:text-white font-bold bg-white border border-gray-100 border-2 hover:bg-blue-800 py-4 px-4 block whitespace-no-wrap" onClick={() => setOpenIt(false) }
                              >
                                MACEOS Academy
                            </Link>
                          </li>
                          <li className="">
                            <Link to={'#'} className="rounded-t cursor-pointer hover:text-white font-bold bg-white border border-gray-100 border-2 hover:bg-blue-800 py-4 px-4 block whitespace-no-wrap" onClick={() => setOpenIt(false) }
                              >
                                Business Loan
                            </Link>
                          </li>                        
                        </ul>
                      }
                  </div>
                </li>
                <li className="text-sm text-green-500 hover:text-red-900 hover:font-bold hover:text-md">OAS</li>
            </ul>
        </div>
   )
}

function Dash() 
{
  const advertState = appStore((state) => state)
  const navigate = useNavigate();
  const { menu } = modalStore();
  const { pathname } = useLocation();
  const [showAccount, setShowAccount] = useState(false);
  const { data: user } = useUser();
  const xUser = localStorage.getItem('ux')
  // advertState.setLoggedInUserType(xUser)

  useEffect(() => {
    if (menu) {
      document.body.classList.add("stop-scroll");
    } else {
      document.body.classList.remove("stop-scroll");
    }
  }, [menu, pathname]);

  
  const [loggedInUserType, setLoggedInUserType] = useState('')
  const [userService, setUserService] = useState('')

  useEffect(() => 
  {
      setUserService('')
  }, [])

  useEffect(() => 
  {
      const loggedInUser = localStorage.getItem('users')
      // console.log(loggedInUser)
      const useServ = userService
      const convert = JSON.parse(loggedInUser)
      // localStorage.setItem('ux', convert.type)
      // setLoggedInUserType(convert.type)
      setUserService(useServ)
  }, [loggedInUserType, userService])

  return (
    <>
      <Menu />

      <div
        className="fixed top-0 left-0 z-40 w-full bg-white px-5 sm:px-8 md:px-10 select-none md:pb-3"
        onMouseLeave={() => setShowAccount(false)}
      >
        <MaxWidthWrapper>
          <div className="gap-1 flex-col flex h-full w-full fit py-2 -mt-2">

              <TopHeader />

              <div className="h-[70px] lg:h-full w-full justify-between flex items-center gap-4">
                <Brand />

                <SearchBar customStyle="hidden max-w-[600px] lg:flex" />

                <div className="flex gap-4 sm:gap-5 items-center">
                  <Account
                    showAccount={showAccount}
                    setShowAccount={setShowAccount}
                  />

                  {!user && (
                    <Link
                      to="/login"
                      className="text-brandGreen font-medium text-sm md:hidden"
                    >
                      Login
                    </Link>
                  )}

                  {
                     (userService != "4") && 
                      <button
                        onClick={() => {
                          // alert("Great")
                          advertState.setLoggedInUserType('market')
                          localStorage.setItem('userTypes', 'market')
                          // advertState.setUserServices(1)
                          if((user?.data?.id !=-1) || (user?.data?.id !=null) || (user?.data?.id !=''))
                            {
                                navigate("/dashboard/create-advert")
                            } else {
                                navigate('/login')
                            }
                        }}
                        className="w-max text-white bg-brandGreen h-[36px] px-3 sm:px-5 md:text-sm text-xs font-semibold rounded-lg"
                      >
                        Post An Ad
                     </button>
                  }
  
                  <MenuButton />
                </div>
              </div>

              <div className="flex lg:hidden w-full">
                  <div className="w-full p-2">
                      <SearchBar />
                  </div>
                  <div className="w-2/12 md:hidden lg:hidden p-2">
                      {/* <div className="bg-pink-500 p-4 lg:hidden md:hidden">Great</div> */}
                      <MobileNavMenu />
                  </div>
              </div>
          </div>
          
        </MaxWidthWrapper>
      </div>

      <div className="pb-[80px]"></div>
    </>
  );
}

export function Brand() {
  return (
    <div className="gap-2 sm:gap-4 items-center shrink-0">
      <Link to="/">
        <img
          src="/assets/logo.png"
          alt=""
          className="w-[100px] sm:w-[135px] md:w-[180px]"
        />
      </Link>
    </div>
  );
}

function MenuButton({ custom = "" }) {
  const { toggleMenu } = modalStore();

  return (
    <div className="relative justify-center items-center flex">
      <button
        className={`text-brandGreen text-2xl md:text-3xl ${custom}`}
        onClick={toggleMenu}
      >
        <HiMenu />
      </button>
    </div>
  );
}

function Account({ showAccount, setShowAccount }) 
{
  const advertState = appStore((state) => state)
  const j = advertState.getLoggedInUser()
  const navigate = useNavigate();
  const { data: user } = useUser();
  console.log(user)

  
  const [loggedInUserType, setLoggedInUserType] = useState('')
  const [userService, setUserService] = useState('')

  useEffect(() => 
  {
      setUserService('')
  }, [])

  useEffect(() => 
  {
      const loggedInUser = localStorage.getItem('users')
      // console.log(loggedInUser)
      const useServ = userService
      const convert = JSON.parse(loggedInUser)
      // localStorage.setItem('ux', convert.type)
      // setLoggedInUserType(convert.type)
      setUserService(useServ)
  }, [loggedInUserType, userService])
  

  const goThere = () => 
  {
      if(user?.data?.type === "student")
      {
          navigate('/dashboard/summary')
      } else {
          navigate('/dashboard/profile')
      }
  }

  const whereTo = (whichUser) => 
  {
      // let tpe = advertState.getLoggedInUserType()
      // return
     if(whichUser === '1')
     {
        // advertState.setUserServices("1")
        localStorage.setItem('userTypes', 'market')
        navigate('/dashboard/profile')
     }

     if(whichUser === '2')
      {
        //  advertState.setUserServices("2")
        //  localStorage.setItem('userTypes', 'both')
         navigate('/dashboard/summary')
      }
  }

  if (!user) {
    return (
      <>
        <div
          className=" hidden md:flex relative flex-col h-full"
          onMouseEnter={() => setShowAccount(true)}
          onClick={() => setShowAccount(!showAccount)}
          // onMouseLeave={() => setShowAccount(false)}
        >
          {/* <div className="flex items-center gap-1">
            <RxAvatar size={24} color={"#1C9236"} />

            <p className="text-brandGreen text-xs sm:text-sm font-semibold cursor-pointer relative">
              Profile
            </p>
          </div> */}

          <div className="">
            {/* {showAccount && (
              <div className="w-[200px] border bg-white rounded-xl top-7 right-0 z-30 absolute justify-center flex flex-col gap-1 p-2"> */}
                <Link
                  to="/login"
                  className="text-brandGreen hover:bg-green-100 font-semibold text-sm px-4 py-2 rounded-xl"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-brandGreen hover:bg-green-100 text-sm font-semibold px-4 py-2 rounded-xl"
                >
                  Register
                </Link>
              {/* </div>
            )} */}
          </div>
        </div>
      </>
    );
  }

  if (user) {
    return (
      // <>
      //   <a onClick={() => setShowAccount(true) } className="hidden md:flex gap-1 items-center">
      //     <RxAvatar size={24} color={"#1C9236"} />

      //     <p className="font-medium cursor-pointer w-fit relative truncate text-ellipsis text-brandGreen text-sm md:text-base">
      //       {user?.data?.name?.split(" ")[0]}
      //     </p>
      //     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="green" className="w-4 h-4">
      //       <path fill-rule="evenodd" d="M11.47 13.28a.75.75 0 0 0 1.06 0l7.5-7.5a.75.75 0 0 0-1.06-1.06L12 11.69 5.03 4.72a.75.75 0 0 0-1.06 1.06l7.5 7.5Z" clip-rule="evenodd" />
      //       <path fill-rule="evenodd" d="M11.47 19.28a.75.75 0 0 0 1.06 0l7.5-7.5a.75.75 0 1 0-1.06-1.06L12 17.69l-6.97-6.97a.75.75 0 0 0-1.06 1.06l7.5 7.5Z" clip-rule="evenodd" />
      //     </svg>
      //   </a>
        
      //   <div
      //     className=" hidden md:flex relative flex-col h-full"
      //     onMouseEnter={() => setShowAccount(true)}
      //     onClick={() => setShowAccount(!showAccount)}
      //     onMouseLeave={() => setShowAccount(false)}
      //   >
      //     <div className="flex items-center gap-1">
      //       <RxAvatar size={24} color={"#1C9236"} />

      //       <p className="text-brandGreen text-xs sm:text-sm font-semibold cursor-pointer relative">
      //         Profile
      //       </p>
      //     </div>
      //   </div>
      // </>
      <>
      {/* { typeof(advertState.getUserServices()) } */}
        {
            (advertState.getUserServices() === "1") && 
              <div className="flex items-center gap-1" onClick={() => {
                   advertState.setLoggedInUserType("market")
                   navigate('/dashboard/profile')
              }}>
                  <RxAvatar size={19} color={"#1C9236"} />

                  <div className="text-brandGreen sm:text-sm font-semibold cursor-pointer relative">
                    <p className="text-md" style={{ fontSize: '17px' }}>{user?.data?.name?.split(" ")[0]} Account</p>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="green" className="w-4 h-4">
                    <path fill-rule="evenodd" d="M11.47 13.28a.75.75 0 0 0 1.06 0l7.5-7.5a.75.75 0 0 0-1.06-1.06L12 11.69 5.03 4.72a.75.75 0 0 0-1.06 1.06l7.5 7.5Z" clip-rule="evenodd" />
                    <path fill-rule="evenodd" d="M11.47 19.28a.75.75 0 0 0 1.06 0l7.5-7.5a.75.75 0 1 0-1.06-1.06L12 17.69l-6.97-6.97a.75.75 0 0 0-1.06 1.06l7.5 7.5Z" clip-rule="evenodd" />
                  </svg>
              </div>
        }
        {
          (advertState.getUserServices() === "2" || advertState.getUserServices() === "4") && <div
              className=" hidden md:flex relative flex-col h-full"
              onMouseEnter={() => setShowAccount(true)}
              onClick={() => setShowAccount(!showAccount)}
              // onMouseLeave={() => setShowAccount(false)}
            >
              <div className="flex items-center gap-1">
                <RxAvatar size={20} color={"#1C9236"} />

                <div className="text-brandGreen sm:text-sm font-semibold cursor-pointer relative">
                  <p className="text-lg">{user?.data?.name?.split(" ")[0]} Account</p>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="green" className="w-4 h-4">
                  <path fill-rule="evenodd" d="M11.47 13.28a.75.75 0 0 0 1.06 0l7.5-7.5a.75.75 0 0 0-1.06-1.06L12 11.69 5.03 4.72a.75.75 0 0 0-1.06 1.06l7.5 7.5Z" clip-rule="evenodd" />
                  <path fill-rule="evenodd" d="M11.47 19.28a.75.75 0 0 0 1.06 0l7.5-7.5a.75.75 0 1 0-1.06-1.06L12 17.69l-6.97-6.97a.75.75 0 0 0-1.06 1.06l7.5 7.5Z" clip-rule="evenodd" />
                </svg>
              </div>

              <div className="">
                {showAccount && (
                  <div className="w-[200px] border bg-white rounded-xl top-7 right-0 z-30 absolute justify-center flex flex-col gap-1 p-2">
                    <a 
                      onClick={() => {
                          if(advertState.getUserServices() === "4")
                          {
                            localStorage.setItem("userTypes", "student")
                            advertState.setLoggedInUserType("student")
                            whereTo("2")
                          } else {
                            localStorage.setItem("userTypes", "both")
                            advertState.setLoggedInUserType("both")
                            whereTo("2")
                          }
                        // navigate('/dashboard/profile')
                      }}
                      // to="/dashboard/summary"
                      className="text-brandGreen hover:bg-green-100 font-semibold text-sm px-4 py-2 rounded-xl cursor-pointer"
                    >
                      As A Student
                    </a>
                    { (userService != "4") && <a
                        onClick={() => {
                          advertState.setLoggedInUserType("market")
                          // advertState.setUserServices("1")
                          whereTo("1")
                          // navigate('/dashboard/profile')
                        }}
                        // to={'/dashboard/profile'}
                        className="text-brandGreen hover:bg-green-100 font-semibold text-sm px-4 py-2 rounded-xl cursor-pointer"
                      >
                        Market Place
                      </a>
                    }
                  </div>
                )}
              </div>
        </div>
        }
    </>
    );
  } else {
    return (
      <>
        <div
          className="relative flex-col hidden md:flex h-full"
          onMouseEnter={() => setShowAccount(true)}
          onClick={() => setShowAccount(!showAccount)}
          // onMouseLeave={() => setShowAccount(false)}
        >
          <div className="flex items-center gap-1">
            <RxAvatar size={24} color={"#1C9236"} />

            <p className="text-brandGreen text-xs sm:text-sm font-semibold cursor-pointer relative">
              Profile
            </p>
          </div>

          <div className="">
            {showAccount && (
              <div className="w-[200px] border bg-white rounded-xl top-7 right-0 z-30 absolute justify-center flex flex-col gap-1 p-2">
                <Link
                  to="/login"
                  className="text-brandGreen hover:bg-green-100 font-semibold text-sm px-4 py-2 rounded-xl"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-brandGreen hover:bg-green-100 text-sm font-semibold px-4 py-2 rounded-xl"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
}

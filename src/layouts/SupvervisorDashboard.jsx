import { logOut } from "@/apis/auth";
import { ChangeProfilePicture } from "@/components/ChangeProfilePicture";
import useUser from "@/hooks/useUser";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function SupvervisorDashboard() 
{
  const [ imageOpenModal, setImageOpenModal] = useState(false)   
  const { data } = useUser();
  const [profilePicture, setProfilePicture] = useState(data.data.avatar)
  console.log(data)
  console.log(data.followers)

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
                    profilePicture
                      ? profilePicture
                      : data.data.avatar
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
          <div className="md:border h-[40px] md:w-full -mt-3 flex flex-col items-center justify-center rounded-[10px] bg-red-100 border border-2 border-blue-500">
            <p className="text-blute-700 text-lg lg:text-base font-bold">
              {data && data.data?.name}
            </p>
          </div>
        </div>

        {/*  */}
        <div className="w-full -mt-3 hidden  md:block">
          <ul className="flex flex-col w-full gap-1">
            {sidebarItems?.map((item, idx) => (
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

            <li
              onClick={logOut}
              className="cursor-pointer mt-1 hover:bg-brandRed/[0.15] hover:text-brandRed hover:font-bold md:text-brandDarkGray px-6 py-2 mb-5 rounded-[10px] font-semibold text-sm bg-brandRed text-white md:bg-white"
            >
              Log Out
            </li>
          </ul>
        </div>
      </div>
      {
          imageOpenModal && <ChangeProfilePicture onClick={(e) => {
              // useUser();
              setProfilePicture(e)
              console.log(e)
              setImageOpenModal(false)
          } } imageModal={imageOpenModal} />
      }
    </>
  );
}

const sidebarItems = [
  {
    name: "Dashboard",
    link: "/profile/summary",
  }
];

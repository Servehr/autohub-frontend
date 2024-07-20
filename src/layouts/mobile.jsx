import { useLocation } from "react-router-dom";
// import { FaRegListAlt } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import useUser from "@/hooks/useUser";

const excludedPaths = [
  "/login",
  "/register",
  "/post-ad",
  "/sell-your-vehicle",
  "/swap-your-vehicle",
];

export default function MobileNav() {
  const location = useLocation();
  const { pathname } = useLocation();

  const { data: user } = useUser();

  if (excludedPaths.includes(pathname)) {
    return;
  }

  if (
    location.pathname.startsWith("/dashboard") &&
    !["/messages", "/watchlist"].includes(location.pathname)
  ) {
    return (
      <>
        <div className="mt-16"></div>

        {user && <DashNav />}
      </>
    );
  } else {
    return (
      <>
        <div className="mt-16"></div>
        <Main />
      </>
    );
  }
}

function Main() {
  const { data: user } = useUser();

  return (
    <div className="h-16 w-full bg-white fixed bottom-0 left-0 z-50 px-5 border-t">
      <div className="flex h-full w-full justify-between items-center text-sm font-semibold text-brandGreen">
        {navItems.map((item, idx) => (
          <NavLink key={idx} end to={item.link} className={`px-2`}>
            {({ isActive }) => (
              <div className="flex flex-col items-center justify-between gap-1">
                <item.icon fill={isActive ? "#1C9236" : "none"} />
                <p className={`${isActive && "font-bold"} text-xs `}>
                  {item.name}
                </p>
              </div>
            )}
          </NavLink>
        ))}
        <Link to="/dashboard">
          <div className="flex flex-col items-center justify-between gap-1">
            <div className="h-6 w-6 rounded-full overflow-hidden">
              {user?.data ? (
                user?.data?.avatar ? (
                  <img
                    src={user?.data.avatar}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                ) : user?.data?.profile_photo_url ? (
                  <img
                    src={user?.data.profile_photo_url}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <RxAvatar size={24} color={"#1C9236"} />
                )
              ) : (
                <RxAvatar size={24} color={"#1C9236"} />
              )}
            </div>
            <p className="text-xs">Profile</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

const navItems = [
  {
    name: "Home",
    icon: HomeIcon,
    link: "/",
  },
  {
    name: "WatchList",
    icon: WatchListIcon,
    link: "/watchlist",
  },
  {
    name: "Messages", // notification was changed to messages
    icon: NotificationIcon,
    link: "/messages",
  },
];

function HomeIcon({ fill = "#1C9236" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="25"
      fill="none"
      viewBox="0 0 22 25"
    >
      <path
        fill={fill}
        stroke="#1C9236"
        strokeWidth={fill === "none" ? "2" : "0"}
        d="M1.484 8.583l-.386.3V20.115a3 3 0 003 3h2.125a3 3 0 003-3v-4.692h3.555v4.692a3 3 0 003 3h2.125a3 3 0 003-3V8.883l-.386-.3-7.676-5.965a3 3 0 00-3.682 0L1.484 8.583z"
      ></path>
    </svg>
  );
}

function WatchListIcon({ fill = "#1C9236" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      fill="none"
      viewBox="0 0 25 25"
    >
      <path
        fill={fill}
        stroke="#1C9236"
        strokeWidth={fill === "none" ? "2" : "0"}
        d="M12.667 21.146l-1.45-1.3c-1.683-1.516-3.075-2.825-4.175-3.925-1.1-1.1-1.975-2.087-2.625-2.963-.65-.874-1.104-1.678-1.362-2.412a6.751 6.751 0 01-.388-2.25c0-1.566.525-2.875 1.575-3.925 1.05-1.05 2.358-1.575 3.925-1.575.867 0 1.692.184 2.475.55a5.93 5.93 0 012.025 1.55 5.93 5.93 0 012.025-1.55 5.769 5.769 0 012.475-.55c1.567 0 2.875.525 3.925 1.575 1.05 1.05 1.575 2.359 1.575 3.925 0 .767-.13 1.517-.388 2.25-.259.734-.713 1.538-1.362 2.412-.65.876-1.525 1.863-2.625 2.963s-2.492 2.409-4.175 3.925l-1.45 1.3z"
      ></path>
    </svg>
  );
}

function NotificationIcon({ fill = "#1C9236" }) {
  if (fill === "none") {
    return (
      <svg
        width={22}
        height={23}
        viewBox="0 0 22 23"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.79199 9.77148H14.2087"
          stroke="#1C9236"
          strokeWidth="1.5"
          strokeMiterlimit={10}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.41634 17.0407H10.083L14.1622 19.754C14.7672 20.1574 15.583 19.7265 15.583 18.9932V17.0407C18.333 17.0407 20.1663 15.2074 20.1663 12.4574V6.95736C20.1663 4.20736 18.333 2.37402 15.583 2.37402H6.41634C3.66634 2.37402 1.83301 4.20736 1.83301 6.95736V12.4574C1.83301 15.2074 3.66634 17.0407 6.41634 17.0407Z"
          stroke="#1C9236"
          strokeWidth="1.5"
          strokeMiterlimit={10}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  } else {
    return (
      <svg
        width={22}
        height={23}
        viewBox="0 0 22 23"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.79199 9.77148H14.2087"
          stroke="#1C9236"
          strokeWidth="1.5"
          strokeMiterlimit={10}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.41634 17.0407H10.083L14.1622 19.754C14.7672 20.1574 15.583 19.7265 15.583 18.9932V17.0407C18.333 17.0407 20.1663 15.2074 20.1663 12.4574V6.95736C20.1663 4.20736 18.333 2.37402 15.583 2.37402H6.41634C3.66634 2.37402 1.83301 4.20736 1.83301 6.95736V12.4574C1.83301 15.2074 3.66634 17.0407 6.41634 17.0407Z"
          stroke="#1C9236"
          strokeWidth="1.5"
          strokeMiterlimit={10}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
}

function DashNav() {
  const { data: user } = useUser();
  if (!user) return null;

  return (
    <div className="hidden h-16 w-full bg-[#E7FBEB] fixed bottom-0 left-0 z-40 px-10">
      <div className="flex h-full justify-between items-center  font-mediumd text-brandGreen">
        {dashItems.map((item, idx) => (
          <NavLink key={idx} end to={item.link}>
            {({ isActive }) => (
              <div className="flex flex-col items-center justify-between gap-1">
                <p className={`text-xs sm:text-sm ${isActive && "font-bold"}`}>
                  {item.name}
                </p>
              </div>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
}

const dashItems = [
  {
    name: "Store",
    link: "/dashboard/store",
  },
  {
    name: "Activities",
    link: "/dashboard/activities",
  },
  {
    name: "Account",
    link: "/dashboard",
  },
];

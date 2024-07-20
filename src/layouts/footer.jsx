import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Link, useLocation } from "react-router-dom";
import facebook from "@/assets/icons/facebook.svg";
import twitter from "@/assets/icons/twitter.svg";
import instagram from "@/assets/icons/instagram.svg";
import { isMobile } from "react-device-detect";

const excludedPaths = [
  "/login",
  "/register",
  "/post-ad",
  "/sell-your-vehicle",
  "/swap-your-vehicle",
  "/dashboard",
  "/ads",
  "/package"
];
export default function Footer() {
  const { pathname } = useLocation();

  if (isMobile) return;

  if (excludedPaths.includes(pathname)) {
    return <></>;
  }

  return (
    <>
      <footer className="w-full min-h-[300px] md:h-[300px] h-full bg-black py-10 px-3 sm:px-6 md:px-10 mt-10">
        <MaxWidthWrapper>
          <div className="flex flex-col gap-10 justify-center items-center">
            <div className="flex flex-col md:flex-row gap-10 md:gap-30 items-center">
              <div className="order-2 md:order-1 flex flex-col items-center md:items-start gap-4 text-white text-sm">
                <img src="/assets/logo.png" alt="" className="max-w-[148px]" />

                <p>support@autohub.ng</p>

                <p>+234 909 430 0096</p>

                <div className="flex gap-5">
                  {socialIcons.map((item) => (
                    <img
                      key={item}
                      src={item}
                      className="w-[20px] md:w-[30px]"
                    />
                  ))}
                </div>
              </div>

              <div className="order-1 md:order-2 grid grid-cols-2 md:grid-cols-3 w-full md:w-[500px] h-max text-white">
                {footerItems.map((item, idx) => (
                  <Link
                    key={idx}
                    to={item.link}
                    className={`text-xs sm:text-sm flex flex-col gap-2 p-4 cursor-pointer text-center md:text-left`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="justify-center flex w-full">
              <p className="text-center text-xs md:text-sm text-brandGreen">
                &copy; 2023. All right reserved | autohub.ng
              </p>
            </div>
          </div>
        </MaxWidthWrapper>
      </footer>
    </>
  );
}

const socialIcons = [facebook, twitter, instagram];

const footerItems = [
  {
    name: "About Us",
    link: "",
  },
  {
    name: "Privacy Policy",
    link: "/#",
  },
  {
    name: "Billing Policy",
    link: "#",
  },
  {
    name: "Term of Use",
    link: "/#",
  },
  {
    name: "Login",
    link: "/login",
  },
  {
    name: "Register",
    link: "/register",
  },
];

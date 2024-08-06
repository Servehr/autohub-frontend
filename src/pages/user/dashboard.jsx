import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Outlet } from "react-router-dom";
import DashSidebar from "@/layouts/sidebar";
import { Helmet } from "react-helmet-async";
import useUser from "@/hooks/useUser";
import { draftProduct, fetchOnSale, fetchSold, fetchUnposted, pendingProduct, publishedPost } from "@/apis/user";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { BeatLoader, BounceLoader } from "react-spinners";
import currencyFormatter from "@/utils/currency-formatter";
import { browserType } from "@/store";
import { Icons } from "@/util/icon";
import { DeleteModal } from "@/components/DeleteModal";
import { appStore } from "@/state/appState";
import EditProductImage from "@/components/EditProductImage";
import { ChangeProductImage } from "@/components/ChangeProductImage";
import { UserWatchList } from "@/apis/watchlist";
import { ProductComments } from "@/components/ProductComments";
import Pagination from "@/components/Pagination";
import { DeleteWishList } from "@/components/DeleteWishList";
import ListShow from "./ListShow";
import SupvervisorDashboard from "@/layouts/SupvervisorDashboard";
import SideNav from "@/layouts/SideNav";

export default function UserDashboard() 
{
  const { data } = useUser();

  return (
    <>
      <Helmet>
        <title>Profile | Autohub</title>
        <meta name="description" content="The Home For Automobiles" />
      </Helmet>

      <div className="relative">
        <div className="hidden md:block bg-brandGreen/30 w-full h-20"></div>

        <MaxWidthWrapper>
          <div className="flex flex-col md:flex-row gap-3 md:gap-10 px-3 relative -mt-5 md:mt-0 md:-top-1 mb-20 -pb-10">
            {/* side bar */}

            <DashSidebar />
            {/* <SideNav /> */}

            {/* {
               (data?.data?.type === "supervisor") && <DashSidebar />
            } */}
            
            {/* {
               (data?.data?.type === "supervisor") && <SupvervisorDashboard />
            } */}

            <div className="hidden md:block lg:block max-w-[1030px] w-full shadow px-6 py-5 -mt-10 rounded-[15px] bg-white md:top-16 relative">
              <Outlet />
            </div>

            <div className="md:hidden w-full">
              <Outlet />
            </div>
          </div>
        </MaxWidthWrapper>
      </div>
    </>
  );
}

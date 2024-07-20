import * as yup from "yup";
import { useState } from "react";
import { BeatLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../shared/sidebar";
import AdminHeader from "@/layouts/AdminHeader";
import Pulsate from "@/components/Pulsate";


const pulsates = [
    { title: "Transactions", figures: "240,000,000", icon: "finance" },
    { title: "Users", figures: 4, icon: "sellers" },
    { title: "Managers", figures: 4, icon: "managers" },
    { title: "Staff", figures: 8, icon: "user" },
    { title: "Marketers", figures: 24, icon: "sellers" },
    { title: "Dealers", figures: 120, icon: "user" },
    { title: "Sellers", figures: 650, icon: "sellers" },
    { title: "Products", figures: 400, icon: "products" },
    { title: "Requests", figures: 43, icon: "requests" },
    { title: "Expenses", figures: 410, icon: "expenses" },
    { title: "Visitors", figures: 3573, icon: "visitors" },
    { title: "Ads", figures: 573, icon: "ads" },
]

export default function Dashboard()
{

  return ( 
        <div className='w-full flex h-full bg-blue-500'>
                <div className='w-2/12 lg:w-2/12 lg:visible md:block hidden h-full bg-pink-600'> 
                    <Sidebar />
                </div>
                <div className='bg-white md:w-10/12 lg:10/12 w-12/12 lg:flex-row px-5 bg-blue-500'>
                <div className='grid grid-cols-12 gap-5 py-2 pr-5 mt-2 mb-5 justify-center items-center order-5 mt-5'>
                    <AdminHeader />
                </div>
                
                <div className='grid grid-cols-12 gap-5 py-2 px-3 mt-5 mb-20'>
                    {
                        pulsates.map((summary, index) => <Pulsate titles={summary.title} figures={summary.figures} icons={summary.icon} />)
                    }
                </div>
            </div>
        </div>
  )
}
import * as yup from "yup";
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import Sidebar  from "../shared/sidebar";
import AdminHeader from "@/layouts/AdminHeader";
import '../css/ad.css'
import '../css/dragAndDrop.css'
import { appStore } from "@/state/appState";
import { BeatLoader, BounceLoader } from "react-spinners";
import { browserType } from "@/store";
import DynamicTable from "@/components/table"
import { allProduct } from "@/apis/ads";
import axios from 'axios';
import { BASE_URL } from "@/lib/axios";
import { fetchAllFaqs } from "@/apis/misc";
import { AddFaqModal } from "@/components/faq/AddFaqModal";

export default function Settings()
{

  return ( 
        <>
            <div className='w-full flex'>
                <div className='w-2/12 lg:w-2/12 lg:visible md:block hidden h-full bg-pink-600'> 
                    <Sidebar />
                </div>
                <div className='bg-white md:w-10/12 lg:10/12 w-12/12 lg:flex-row px-5'>

                    <div className="w-full justify-between p-3 flex space-x-10 -mb-3 items-center">                        
                        <div className="bg-white p-3 mt-5">
                            <h1 className="font-bold">Application Settings</h1>
                        </div>
                        {/* <div className="font-bold px-3 py-2 bg-green-900 text-white rounded-md cursor-pointer" onClick={() => setOpenFaqModal(true)}>Add Faq</div> */}
                    </div>
                    
                    <div className="w-full p-3 mb-10" style={{ marginBottom: '100px' }}>
                       
                    </div>

                </div>
            </div>
        </>
  )
}
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
import { AddQuestionaireModal } from "@/components/questionaire/AddQuestionaireModal";
import Folder from "@/components/Folder";
import { AllTestQuestionaires } from "@/apis/backend/questionaires";
import { AddTestQuestionaireTheoryModal } from "@/components/questionaire/theory/AddTestQuestionaireTheoryModal";
import TestQuestionaireTheory from "./testQuestionaireTheory";
import TestQuestionaireObjective from "./testQuestionaireObjective";

export default function TestQuestionaire()
{

  return ( 
        <>
            <div className='w-full flex h-full bg-blue-500'>
                <div className='w-2/12 lg:w-2/12 lg:visible md:block hidden h-full bg-pink-600'> 
                    <Sidebar />
                </div>
                <div className='bg-white md:w-10/12 lg:10/12 w-full lg:flex-row h-fit'>

                    <TestQuestionaireObjective />

                    <TestQuestionaireTheory />

                </div>
            </div>
        </>
  )
}
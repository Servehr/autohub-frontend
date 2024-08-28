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
import { AllAcademicSession } from "@/apis/backend/academic";

const courseYear = () => 
{

    const years = [];
    const currentYear = new Date().getFullYear()
    for (let year = 2023; year <= currentYear; year++) 
    {
      years.push(year);
    }
    return years.toReversed();
}

export default function TestQuestionaire()
{  

  const { data, isLoading, refetch, isRefetching } = useQuery([`academic-session`], () => AllAcademicSession(), { refetchOnWindowFocus: true, cacheTime : 0 })
 
  return ( 
        <>
            {
                isLoading && <div className="col-span-12 h-[200px] flex justify-center items-center" style={{ marginTop: '30px', paddingTop: '20px' }}>
                    <BeatLoader color="#1c9236" />
                </div>
            }
            {
                !isLoading && <>
                    <TestQuestionaireObjective academicSession={data} />
        
                    <TestQuestionaireTheory academicSession={data}  />                        
                </>
            }
        </>
  )
}
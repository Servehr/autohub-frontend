import * as yup from "yup";
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import Sidebar  from "../shared/sidebar";
import AdminHeader from "@/layouts/AdminHeader";
import '../css/ad.css'
import '../css/dragAndDrop.css'
import ExamQuestionaireObjective from "./examQuestionaireObjective";
import ExamQuestionaireTheory from "./examQuestionaireTheory";
import { BeatLoader } from "react-spinners";
import { AllAcademicSession } from "@/apis/backend/academic";

export default function ExamQuestionaire()
{

  const { data, isLoading, refetch, isRefetching } = useQuery([`exam-academic-session`], () => AllAcademicSession(), { refetchOnWindowFocus: true, cacheTime : 0 })
  
  return ( 
        <>
            {
                isLoading && <div className="col-span-12 h-[200px] flex justify-center items-center" style={{ marginTop: '30px', paddingTop: '20px' }}>
                    <BeatLoader color="#1c9236" />
                </div>
            }
            
            {
                !isLoading && <>
                    <ExamQuestionaireObjective academicSession={data} />
        
                    <ExamQuestionaireTheory academicSession={data}  />
                </>
            }
        </>
  )
}
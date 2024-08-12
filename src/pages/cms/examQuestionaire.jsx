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

export default function ExamQuestionaire()
{
  return ( 
        <>
            <ExamQuestionaireObjective />

            <ExamQuestionaireTheory />
        </>
  )
}
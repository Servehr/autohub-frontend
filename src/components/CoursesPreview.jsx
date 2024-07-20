import React, { useEffect, useState } from 'react';
import { Modal } from './Modal';
import { Link, useNavigate } from "react-router-dom";
import { deleteAdProduct } from '@/apis/ads';
import { appStore } from "@/state/appState";
import axios from 'axios';
import { BASE_URL } from "@/lib/axios";
import Accordion from './Accordion';
import ModuleAccordion from './ModuleAccordion';

export const CourseModule = ({modules, subCourseId}) => 
{
        console.log(modules)
        return (
                <>
                        <ul className="text-black" style={{ listStylePosition: 'outside' }}>
                                {
                                        modules.map((module, index) => {
                                                return (
                                                                <li style={{ listStylePosition: 'outside' }}>{module}</li>
                                                )
                                        })
                                }
                        </ul>
                        
                </>
            )
}

export const CoursesPreview = ({onClick, subCourses, modules, courseName, courseId})  =>
{
        const advertState = appStore((state) => state)
        const navigate = useNavigate();
        const [courseIds, setCourseIds] = useState(0)
        const [moduleList, setModuleList] = useState([])

        // let courseModule = modules[courseIds].map((x) => x )

        useEffect(() => {
                // let courseModule = modules[courseIds].map((x) => x )
                // setModuleList(courseModule)
        }, [])

        // { (selectedsubCourse != -1) &&
        //         <div className="p-4 w-full border border-gray-500 rounded-md">
        //             { 
        //                 modules[selectedsubCourse].map((x) => 
        //                     {
        //                         return (
        //                             <ul className="" style={{ listStylePosition: 'outside' }}>
        //                                 <li style={{ listStylePosition: 'outside' }}> - {x}</li>
        //                             </ul>
        //                         )
        //                     }
        //                 ) 
        //             }
        //         </div>
        // }

        return (
                <Modal onClick={onClick} isOpen={true} wrapperWidth={800} margin={'178px auto 0px auto'}>
                        <div className='mt-5 px-2 overflow-y-auto xm:overflow-y-scroll' style={{ maxHeight: '32rem' }}>
                                {/* <div className='p-3 w-full bg-blue-400 -mt-7 text-white font-bold text-sm rounded-md mb-10'>{JSON.stringify(courseModule)}</div>
                                 <div className='p-3 w-full bg-blue-400 -mt-7 text-white font-bold text-sm rounded-md'>{JSON.stringify(subCourses)}</div> */}
                                <h1 className='font-bold text-md mb-4 -mt-5'>{courseName} Sub-Courses</h1>
                                { subCourses.length > 0 && subCourses &&
                                        
                                        <>                                            
                                                { 
                                                        subCourses.map((x) => {
                                                                return  (
                                                                        // <div className='p-3 w-full bg-blue-400 -mt-7 text-white font-bold text-sm rounded-md'>{x.id}</div>
                                                                        <>
                                                                                {/* {setCourseIds(x.id)} */}
                                                                                <ModuleAccordion key={x} title={x.module} id={x.id} content={modules} />
                                                                        </>
                                                                )
                                                        })
                                                }
                                        </>
                                }
                                <div className='flex w-full pt-1 pb-5 overflow-y-auto xm:overflow-y-scroll justify-between'
                                >       
                                        <div  
                                                className="mt-2 p-4 text-white cursor-pointer hover:font-bold text-sm bg-red-600 rounded-md outline-none ring-offset-2 ring-red-600 focus:ring-2"
                                                onClick={() =>
                                                        onClick(false)
                                                }
                                                >
                                                Close
                                                </div>
                                </div>
                        </div>
                </Modal>  
        );
}

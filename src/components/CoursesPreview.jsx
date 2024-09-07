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

export const CoursesPreview = ({onClick, theModule, theModuleId, theModuleName})  =>
{
        const advertState = appStore((state) => state)
        const navigate = useNavigate();
        const [courseIds, setCourseIds] = useState(0)
        const [moduleList, setModuleList] = useState([])
        const [theSubModule, setTheModule] = useState(theModule?.modules.filter((x) => x.course_id === theModuleId))

        return (
                <Modal onClick={onClick} isOpen={true} wrapperWidth={800} margin={'88px auto 0px auto'}>
                        <div className='mt-5 px-2 overflow-y-auto xm:overflow-y-scroll' style={{ maxHeight: '32rem' }}>
                                <h1 className='font-bold text-md mb-4 -mt-5'>{theModuleName} Sub-Courses</h1>
                                { theSubModule.length > 0 && theSubModule &&
                                        
                                        <>                                            
                                                { 
                                                        theSubModule.map((x, index) => {
                                                                return  (
                                                                        <div key={index}
                                                                        >
                                                                                <ModuleAccordion title={x.name} id={x.id} content={x?.submodule} />
                                                                                
                                                                        </div>
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

import { Link } from "react-router-dom";
import { browserType } from "@/store";
import { useState, useEffect } from "react";
import { Icons } from "@/util/icon";
import { CourseModule } from "./CoursesPreview";

export default function ModuleAccordion({id='', title='', content}) 
{
    const { isMobile } = browserType();
    const [isOpen, setIsOpen] = useState(false)
    const [theCss, setCss] = useState('')
    const [position, setPosition] = useState(-1)
    const removePadding = !isOpen ? 'px-3 py-1' : ''
    const [theSubModule, setTheModule] = useState(content)

    useEffect(() => {
        const openOrNot = (isOpen === true ) ?  "mb-5 mt-2 p-5 rounded-md border border-2" : "mt-2 p-5 rounded-md border border-2"
        setCss(openOrNot)
    }, [isOpen])

    // useEffect(() => {
    //     let currentSubModule = content?.submodule?.filter((x) => x.module_id === position)
    //     console.log(currentSubModule)
    //     setTheModule(currentSubModule)
    // }, [position])
    
    return (        
        <div>
            <div className="inline-flex items-center justify-between w-full rounded py-2 px-4 text-xl font-bold bg-green-700 cursor-pointer px-3 py-2" 
                    onMouseOver={() => {
                        setPosition(id)
                        setIsOpen(!isOpen)
                    }}>
                <span className="text-white font-bold text-sm">{title}</span>
                <div className="accordion-indicator">
                    { isOpen? <Icons width={3} height={3} iconName={'upArrow'} color="white" /> : <Icons width={3} height={3} iconName={'downArrow'} color="white" /> }
                </div>
            </div>
            <div className={removePadding}> 
                {
                    isOpen && <div className={theCss}>
                        <ul className="text-black" style={{ listStylePosition: 'outside' }}>
                                {
                                    (theSubModule?.length > 0) && theSubModule?.map((module, index) => {
                                                return (
                                                                <li className="text-lg font-bold" key={index} style={{ listStylePosition: 'outside' }}>{module?.name}</li>
                                                )
                                        })
                                }
                                {
                                    (theSubModule?.length === 0) && <div className="text-md text-black font-bold">No Sub Course Listed for <span className="text-blue-700 font-bold">{title}</span></div>
                                }
                        </ul>
                    </div>
                } 
            </div>
            <span className='py-3 mt-10'></span>
        </div>
    );
}

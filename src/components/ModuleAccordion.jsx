import { Link } from "react-router-dom";
import { browserType } from "@/store";
import { useState, useEffect } from "react";
import { Icons } from "@/util/icon";
import { CourseModule } from "./CoursesPreview";

export default function ModuleAccordion({id='', title='', content='', status='', isOpened='', created_at=''}) 
{
    const { isMobile } = browserType();
    const [isOpen, setIsOpen] = useState(false)
    const [theCss, setCss] = useState('')
    const [position, setPosition] = useState(-1)
    const removePadding = !isOpen ? 'px-3 py-1' : ''

    useEffect(() => {
        const openOrNot = (isOpen === true ) ?  "mb-5 mt-2 p-5 rounded-md border border-2" : "mt-2 p-5 rounded-md border border-2"
        setCss(openOrNot)
    }, [isOpen, position])

    // console.log({title, body})
    
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
                                        content[id].map((module, index) => {
                                                return (
                                                                <li style={{ listStylePosition: 'outside' }}>{module}</li>
                                                )
                                        })
                                }
                        </ul>
                    </div>
                } 
            </div>
        </div>
    );
}

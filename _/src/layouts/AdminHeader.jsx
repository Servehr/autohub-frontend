import Right from '@/components/header/right'
import { appStore } from '@/state/appState'
import { useEffect, useState } from 'react'


export const revalidate = 0

export default function AdminHeader()
{
    const advertState = appStore((state) => state)
    const [openSidebar, setOpenSideBar] = useState(advertState.getSideBar())

  return (    
            <>
                <div className='col-span-1'>
                    <svg onClick={() => {
                        setOpenSideBar(!openSidebar)
                    }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 ml-5 md:hidden lg:hidden cursor-pointer">
                        <path fillRule="evenodd" d="M3 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 5.25Zm0 4.5A.75.75 0 0 1 3.75 9h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 9.75Zm0 4.5a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Zm0 4.5a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
                    </svg>                        
                </div>
                {/* <div className='col-span-9'>
                    <input type="text" name="price" id="price" className="block w-full rounded-md border-0 pl-7 py-4 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-200 sm:text-sm sm:leading-6" placeholder="0.00" />
                </div>
                <div className='col-span-2'>
                    <Right />
                </div> */}
            </>
  )
}

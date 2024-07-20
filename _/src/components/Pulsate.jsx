import { Icons } from '@/util/icon'
import { useEffect, useState } from 'react'


export default function Pulsate({titles, figures, icons})
{  
    
    return (
        // <div className='col-span-3' style={{ backgroundColor: 'rgb(206 228 217)' }}>
        <div className='md:col-span-3 col-span-6 bg-white'>
            <div className="p-4 transition-shadow border rounded-lg shadow-sm hover:shadow-lg">
                <div className="flex items-start justify-between">
                    <div className="flex flex-col space-y-2">
                        <span className="text-blue-900 font-bold text-sm">{titles}</span>
                        <span className="text-lg">{figures}</span>
                    </div>
                    <div className="px-3 py-2 bg-white rounded-full">
                        <Icons iconName={icons} width={6} height={6} />
                    </div>
                </div>
                <div className='flex flex-row col-span-12 justify-start'>
                </div>
            </div>
        </div>
  )

}
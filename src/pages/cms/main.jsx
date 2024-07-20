"use client"

import CardOne from '@/app/components/CardOne'
import Pulsate from '@/app/components/Pulsate'
import Table from '@/app/components/Table'
import AdminFooter from '@/app/shared/footer/AdminFooter'
import AdminHeader from '@/app/shared/header/AdminHeader'
import Image from 'next/image'
import { useEffect, useState } from 'react'


export const revalidate = 0

export default function MainSection()
{

  return (
    <> 
        <div className='md:w-4/5 lg:4/5 w-full flex md:flex-row lg:flex-row'>
            <div className='px-3'>
                {/* s#f0fbff */}
                
                <AdminHeader />
                
                <div className='grid md:grid-cols-12 grid-cols-6 gap-5 py-2 px-3'>
                    <Pulsate />
                    <Pulsate />
                    <Pulsate />
                    <Pulsate />
                    <Pulsate />
                    <Pulsate />
                    <Pulsate />
                    <Pulsate />
                </div>

                <div className='grid md:grid-cols-12 grid-cols-6 gap-5 py-2'>
                    <Table />
                    <Table />
                </div>                

                <div className='grid md:grid-cols-12 grid-cols-1 gap-5 py-2 px-4'>
                    <CardOne />
                    <CardOne />
                    <CardOne />
                </div>

                <AdminFooter />

            </div> 
        </div>
    </>
  )
}

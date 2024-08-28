import React, { useEffect, useState } from 'react';
import { Modal } from '../../Modal';
import { DeleteSubModulee } from '@/apis/backend/course';


export const DeleteSubModule = ({onClick, openDeleteSubModule, subModulez})  =>
{
        const [subModuleId, setSubModuleId] = useState(subModulez.id)
        const [subModuleNamee, setSubModuleName] = useState(subModulez.name)

        const deleteModuleSub = () => 
        {
                DeleteSubModulee(subModuleId)
                .then((res) => 
                {
                        onClick(Math.random())
                })
                .catch((err) => 
                {
                        
                })       
        }
        
        return (
                <Modal onClick={onClick} isOpen={openDeleteSubModule} wrapperWidth={800} margin={'100px auto 0px auto'}>
                        <div className='col-span-12 pt-1 pb-5 overflow-y-auto xm:overflow-y-scroll d-flex justify-center item-center'>
                                <h1 className='flex w-full justify-center items-center font-bold text-lg mb-10 mx-auto text-red-600'>You are about to delete {subModuleNamee}</h1>
                                
                                <div className="items-center gap-5 mt-2 sm:flex flex justify-between mb-2 mx-2 mt-5">
                                        <button  
                                                className="mt-2 p-4 text-white hover:font-bold text-sm bg-red-600 rounded-md outline-none ring-offset-2 ring-red-600 focus:ring-2 justify-start"
                                                onClick={() => {
                                                        onClick(!openDeleteSubModule)
                                                }}
                                                >
                                                        Close
                                        </button>
                                        <button
                                                className="mt-2 p-4 text-white hover:font-bold text-sm bg-blue-600 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2 justify-end"
                                                onClick={() => deleteModuleSub() }
                                        >
                                        Delete 
                                        </button>
                                </div>
                        </div>
                </Modal>  
        );
}

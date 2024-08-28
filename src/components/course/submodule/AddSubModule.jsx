import React, { useEffect, useState } from 'react';
import { Modal } from '../../Modal';
import { CreateSubModule } from '@/apis/backend/course';


export const AddSubModule = ({onClick, openAddSubModule, modulez})  =>
{
        const [subModuleNamee, setSubModuleName] = useState("")

        const AddSubModulee = async () => 
        {            
                const data = { id: modulez, name: subModuleNamee }
                CreateSubModule(data)
                .then((res) => 
                {
                        return onClick(Math.random())
                })
                .catch((err) => 
                {
        
                })    
        }

        return (
                <Modal onClick={onClick} isOpen={openAddSubModule} wrapperWidth={800} margin={'100px auto 0px auto'}>
                        <div className='col-span-12 pt-1 pb-5 overflow-y-auto xm:overflow-y-scroll justify-center item-center'>
                                
                                <div className='col-span-12 pb-2 overflow-auto justify-center h-fit py-2 item-center'>
                                        <>                                                
                                                <div className="p-1 mt-1">
                                                        <h1 className='font-bold text-md mb-5 text-blue-800 px-3'>Add SubModule</h1>      
                                                        <div className="w-full d-flex md:flex mt-1 gap-5 w-2/2 p-2">
                                                                <input onChange={(e) => {
                                                                        setSubModuleName(e.target.value)
                                                                }} type="text" id="subModule" 
                                                                name="subModule" 
                                                                placeholder="Enter SubModule Name" 
                                                                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 text-sm py-2 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                                        </div>
                                                </div>
                                        </>
                                </div>
                                
                                <div className="items-center gap-5 mt-2 sm:flex flex justify-between mb-2 mx-1 px-1">
                                        <button  
                                                className="mt-2 p-4 text-white hover:font-bold text-sm bg-red-600 rounded-md outline-none ring-offset-2 ring-red-600 focus:ring-2 justify-start"
                                                onClick={() => {
                                                        onClick(!openAddSubModule)
                                                }}
                                        >
                                                        Cancel
                                        </button>
                                        <button
                                                className="mt-2 p-4 text-white hover:font-bold text-sm bg-blue-600 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2 justify-end"
                                                onClick={AddSubModulee}
                                                >
                                                Add
                                        </button>
                                </div>
                        </div>
                </Modal>  
        );
}

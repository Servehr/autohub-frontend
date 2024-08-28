import React, { useEffect, useState } from 'react';
import { Modal } from '../Modal';
import { AVATAR, BASE_URL } from "@/lib/axios";
import { ChangeUserRole } from '@/apis/user';


export const ChangeRole = ({onClick, openChangeRole, user})  =>
{
        const [userRole, setRole] = useState(user.admin_role)
        const [userId, setUserId] = useState(user.id)
        const adminRoles = ['super-admin', 'sales manager', 'supervisor'];        

        const changeUserRole = async () => 
        {
            
                const data = { id: userId, role: userRole }
                if(userRole === -1)
                {
                     alert("Select Role")   
                }
                ChangeUserRole(data)
                .then((res) => 
                {
                        return onClick(Math.random())
                })
                .catch((err) => 
                {

                })    
        }

        return (
                <Modal onClick={onClick} isOpen={openChangeRole} wrapperWidth={800} margin={'80px auto 0px auto'}>
                <div className='col-span-12 pt-1 justify-center item-center'>
                        
                        <div className='col-span-12 pb-2 justify-center h-fit py-2 item-center -mt-5'>
                                <>                                                
                                        <div className="p-1 mt-1">
                                                <h1 className='font-bold text-lg mb-5 p-3 bg-blue-100 rounded-lg'>Change {user.name} {user.lastname} Role</h1>
                                                <div className="w-full d-flex justify-center items-center md:flex mt-1 gap-5 mb-5 border p-3">
                                                        <img src={`${AVATAR}/${user.avatar}`} width={100} />        
                                                </div>                                    

                                        
                                                <div className="relative w-full mb-3">
                                                                <select onChange={(e) => 
                                                                   {  
                                                                        setRole(e.target.value)
                                                                   } 
                                                                }
                                                                defaultValue={userRole} 
                                                                className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                                                        {
                                                                                adminRoles.map((role, index) => {
                                                                                        return (                                                                                                
                                                                                                <option value={role} selected={role === userRole ? role : ""}>{role.toUpperCase()}</option> 
                                                                                        )
                                                                                })
                                                                        }
                                                                </select>
                                                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 mt-0">
                                                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                                                                        </svg>
                                                                </div>
                                                                <div className="text-red-500 font-bold text-sm">{ "" }</div>
                                                        </div> 
                                                
                                        </div>
                                </>
                        </div>
                        
                        <div className="items-center gap-5 sm:flex flex justify-between mb-2 mx-1">
                                <button  
                                        className="mt-2 p-4 text-white hover:font-bold text-sm bg-red-600 rounded-md outline-none ring-offset-2 ring-red-600 focus:ring-2 justify-start"
                                        onClick={() => {
                                                onClick(!openChangeRole)
                                        }}
                                >
                                                Close
                                </button>
                                <button
                                        onClick={changeUserRole}
                                        className="mt-2 p-4 text-white hover:font-bold text-sm bg-blue-600 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2 justify-end"
                                >
                                   Change 
                                </button>
                        </div>
                </div>
                </Modal>  
        );
}

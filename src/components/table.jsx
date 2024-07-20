import * as yup from "yup";
import { useState, useRef, useEffect } from "react";
import { BeatLoader } from "react-spinners";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";   
import { appStore } from "@/state/appState";
import { ViewFaqModal } from "./faq/ViewFaqModal";
import { EditFaqModal } from "./faq/EditFaqModal";
import { ViewProductDetail } from "./product/ViewProductDetail";
import { VerifyProduct } from "./product/VerifyProduct";
import { DeleteFaqModal } from "./faq/DeleteFaqModal";
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { StudentMessage } from "./StudentMessage";
import { EditCourseModal } from "./course/EditCourseModal";
import { DeleteCourseModal } from "./course/DeleteCourseModal";
import { UploadCourseModal } from "./course/UploadCourseModal";
import { EditStaffModal } from "./staffs/EditStaffModal";
import { ChangeRole } from "./staffs/ChangeRole";
import { SuspendUser } from "./staffs/SuspendUser";
import { UserDetail } from "./staffs/UserDetail";
import { RevokeRole } from "./staffs/RevokeRole";
import { ApproveExpenses } from "./expenses/ApproveExpenses";
import { DeclineExpenses } from "./expenses/DeclineExpenses";
import { EditItemModal } from "./item/EditItemModal";
import { DeleteItemModal } from "./item/DeleteItemModal";


export default function DynamicTable({header, columns, data, onClick, page})
{
    // const advertState = appStore((state) => state)
    const navigate = useNavigate();
    const [dataTable, setDatable] = useState(data)
    const [theHead, setHeader] = useState(header)
    const [viewFaqModal, setViewFaqModalcourse] = useState(false)
    const [editFaqModal, setEditFaqModal] = useState(false)
    const [viewAdvert, setViewAdvert] = useState(false)
    const [productId, setProductId] = useState(false)
    const [verifyProduct, setVerifyProduct] = useState(false)
    const [deleteFaqModal, setDeleteFaqModal] = useState(false)
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [isOpened, setIsOpened] = useState("")
    const [studentMessage, setStudentMessage] = useState(false)
    const [path, setPath] = useState('')

    const [editCourseModal, setEditCourseModal] = useState(false)
    const [uploadCourse, setUploadCourse] = useState(false)
    const [deleteCourseModal, setDeleteCourseModal] = useState(false)

    const [editStaff, setEditStaffModal] = useState(false)
    const [suspendUser, setSuspendUser] = useState(false)
    const [changeRole, setChangeRole] = useState(false)
    const [UserDetails, setUserDetails] = useState(false)
    const [revokeUserRole, setRevokeUserRole] = useState(false)

    const [approveEx, setApproveEx] = useState(false)
    const [declineEx, setDeclineEx] = useState(false)

    const [editItem, setEditItem] = useState(false)
    const [deleteItem, setDeleteItem] = useState(false)

    console.log(data)

    // data.map((d) => {
    //     columns.map((column, index) => {
    //         console.log(d[column.field])
    //     })
    // })

    useEffect(() => {
        console.log('veiwStaff')
    }, [])

    const clicked = (value) => 
    {
        const x = Math.random()* value * value
        return onClick(Math.random() * x)
    }

  return ( 
        <>
            <div className='grid grid-cols-1 overflow-x-auto mb-10'>
                <table className="text-left border-shadow" style={{ width: '100%' }}>
                    <thead className="border-1 shadow-sm shadow-black">
                        <tr className='px-5 py-3 border-b-2 border-blue-200 bg-green-800 text-left text-white text-[11px] font-semibold uppercase tracking-wider'>
                            {
                                theHead.map((thead, index) => {
                                    return (
                                        <th key={index} className="px-6 py-4 text-xs font-bold text-white" style={{color: 'black'  }}>
                                            {thead} 
                                        </th>
                                    )
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((product, index) => {
                                return  (
                                    <> 
                                        <tr key={product.id} className='px-5 border-b border-gray-300 bg-white text-sm text-white border-1 hover:text-white hover:bg-blue-100'>
                                            {
                                                columns.map((column, index) => {
                                                    return (
                                                        <td key={index} style={{ wordWrap: "break-word" }}
                                                            className="whitespace-nowrap w-fit px-6 py-3 text-md font-medium text-black hover:font-bold">
                                                                <div dangerouslySetInnerHTML={{ __html: product[column.field] }} className="w-400" style={{ wordBreak: 'break-all' }} />
                                                                    {/* {product[column.field]} */}
                                                                {/* </div> */}
                                                        </td>
                                                    )
                                                })
                                                
                                            }  
                                            <td className="flex whitespace-nowrap px-6 py-2 text-xs font-medium gap-3"> 
                                                {/* onClick={() => clicked(Math.random())} */}
                                                { (page === "advert") && <>                                                        
                                                        <div className="bg-blue-600 px-3 py-2 rounded-md hover:bg-blue-500 hover:text-white cursor-pointer" onClick={() =>
                                                            { 
                                                                setProductId(product.id)
                                                                setViewAdvert(true) 
                                                            } }>View</div>
                                                        <div className="bg-gray-800 px-3 py-2 rounded-md hover:bg-gray-500 hover:text-white cursor-pointer" onClick={() =>
                                                            { 
                                                                setProductId(product.id)
                                                                setVerifyProduct(true) 
                                                            } }>Verify</div>
                                                    </>
                                                }
                                                {   (page === 'faqs') && 
                                                    <>
                                                         {/* <div className="bg-blue-800 px-3 py-2 rounded-md hover:bg-green-500 hover:text-white cursor-pointer">Extend</div> */}
                                                        <div className="bg-red-800 px-3 py-2 rounded-md hover:bg-blue-500 hover:text-white cursor-pointer" onClick={() =>
                                                            { 
                                                                setProductId(product.id)
                                                                setTitle(product.title)
                                                                setContent(product.content)
                                                                setIsOpened(product.isOpened)
                                                                setViewFaqModal(true) 
                                                            } }>
                                                                View
                                                        </div>
                                                        <div className="bg-gray-800 px-3 py-2 rounded-md hover:bg-gray-500 hover:text-white cursor-pointer" onClick={() =>
                                                            { 
                                                                setProductId(product.id)
                                                                setTitle(product.title)
                                                                setContent(product.content)
                                                                setIsOpened(product.isOpened)
                                                                setEditFaqModal(true) 
                                                            } }>
                                                                Edit
                                                        </div> 
                                                        <div className="bg-gray-800 px-3 py-2 rounded-md hover:bg-gray-500 hover:text-white cursor-pointer" onClick={() =>
                                                            { 
                                                                setProductId(product.id)
                                                                setTitle(product.title)
                                                                setContent(product.content)
                                                                setIsOpened(product.isOpened)
                                                                setDeleteFaqModal(true) 
                                                            } }>
                                                                Delete
                                                        </div> 
                                                    </>
                                                }
                                                {   (page === 'blog') && 
                                                    <div className="flex justify-center items-center gap-3 mt-5">
                                                         {/* <div className="bg-blue-800 px-3 py-2 rounded-md hover:bg-green-500 hover:text-white cursor-pointer">Extend</div> */}
                                                        <div className="bg-gray-800 px-3 py-2 rounded-md hover:bg-gray-500 hover:text-white cursor-pointer" onClick={() =>
                                                            { 
                                                                setProductId(product.id)
                                                                setTitle(product.title)
                                                                setContent(product.content)
                                                                setIsOpened(product.isOpened)
                                                                setViewFaqModal(true) 
                                                            } }>
                                                                View
                                                        </div>
                                                        <div className="bg-blue-700 px-3 py-2 rounded-md hover:bg-blue-900 hover:text-white cursor-pointer" onClick={() =>
                                                            { 
                                                                localStorage.setItem('editPost', product.id)
                                                                navigate(`/edit-post/${product.id}`)
                                                            } }>
                                                                Edit
                                                        </div> 
                                                        <div className="bg-red-700 px-3 py-2 rounded-md hover:bg-red-900 hover:text-white cursor-pointer" onClick={() =>
                                                            { 
                                                                setProductId(product.id)
                                                                setTitle(product.title)
                                                                setContent(product.content)
                                                                setIsOpened(product.isOpened)
                                                                setDeleteFaqModal(true) 
                                                            } }>
                                                                Delete
                                                        </div> 
                                                    </div>
                                                }
                                                {   (page === 'student') && 
                                                    <div className="flex justify-center items-center gap-3 mt-5">
                                                         {/* <div className="bg-blue-800 px-3 py-2 rounded-md hover:bg-green-500 hover:text-white cursor-pointer">Extend</div> */}
                                                        {/* <div className="bg-gray-800 px-3 py-2 rounded-md hover:bg-gray-500 hover:text-white cursor-pointer" onClick={() =>
                                                            { 
                                                                setProductId(product.id)
                                                                setTitle(product.title)
                                                                setContent(product.content)
                                                                setIsOpened(product.isOpened)
                                                                setViewFaqModal(true) 
                                                            } }>
                                                                Mark
                                                        </div> */}
                                                        <div className="bg-blue-700 px-3 py-2 rounded-md hover:bg-blue-900 hover:text-white cursor-pointer" onClick={() =>
                                                            { 
                                                                setPath('result')
                                                                setStudentMessage(true)
                                                            } }>
                                                                Send Message
                                                        </div> 
                                                    </div>
                                                }
                                                {   (page === 'result') && 
                                                    <div className="flex justify-center items-center gap-3 mt-5">
                                                    </div>
                                                }
                                                {   (page === 'questions') && 
                                                    <>
                                                         {/* <div className="bg-blue-800 px-3 py-2 rounded-md hover:bg-green-500 hover:text-white cursor-pointer">Extend</div> */}
                                                        <div className="bg-blue-800 px-3 py-2 rounded-md hover:bg-gray-500 hover:text-white cursor-pointer" onClick={() =>
                                                            { 
                                                                setProductId(product.id)
                                                                setTitle(product.title)
                                                                setContent(product.content)
                                                                setIsOpened(product.isOpened)
                                                                setEditFaqModal(true) 
                                                            } }>
                                                                Edit
                                                        </div> 
                                                        <div className="bg-gray-800 px-3 py-2 rounded-md hover:bg-gray-500 hover:text-white cursor-pointer" onClick={() =>
                                                            { 
                                                                setProductId(product.id)
                                                                setTitle(product.title)
                                                                setContent(product.content)
                                                                setIsOpened(product.isOpened)
                                                                setDeleteFaqModal(true) 
                                                            } }>
                                                                Delete
                                                        </div> 
                                                    </>
                                                }
                                                {   (page === 'course') && 
                                                    <>
                                                         {/* <div className="bg-blue-800 px-3 py-2 rounded-md hover:bg-green-500 hover:text-white cursor-pointer">Extend</div> */}
                                                        <div className="bg-blue-800 px-3 py-2 rounded-md hover:bg-gray-500 hover:text-white cursor-pointer" onClick={() =>
                                                            { 
                                                                setEditCourseModal(true)
                                                            } }>
                                                                Edit
                                                        </div> 
                                                        <div className="bg-gray-800 px-3 py-2 rounded-md hover:bg-gray-500 hover:text-white cursor-pointer" onClick={() =>
                                                            { 
                                                                setDeleteCourseModal(true)
                                                            } }>
                                                                Delete
                                                        </div>
                                                        <div className="bg-red-800 px-3 py-2 rounded-md hover:bg-gray-500 hover:text-white cursor-pointer" onClick={() =>
                                                            { 
                                                                setUploadCourse(true)
                                                            } }>
                                                                Upload Course
                                                        </div> 
                                                    </>
                                                }
                                                {   (page === 'dealers') && 
                                                    <>
                                                         {/* <div className="bg-blue-800 px-3 py-2 rounded-md hover:bg-green-500 hover:text-white cursor-pointer">Extend</div> */}
                                                        <div className="bg-green-400 border border-2 border-gray-500 px-3 py-2 rounded-md hover:bg-green-700 hover:text-white cursor-pointer" onClick={() =>
                                                            { 
                                                                navigate('/dealer-post')
                                                            } }>
                                                                View Posts
                                                        </div> 
                                                        <div className="bg-blue-800 px-3 py-2 rounded-md hover:bg-gray-500 hover:text-white cursor-pointer" onClick={() =>
                                                            { 
                                                                setUserDetails(true)
                                                            } }>
                                                                View Detail
                                                        </div> 
                                                        <div className="bg-gray-800 px-3 py-2 rounded-md hover:bg-gray-500 hover:text-white cursor-pointer" onClick={() =>
                                                            { 
                                                                setSuspendUser(true)
                                                            } }>
                                                                Suspend
                                                        </div>
                                                    </>
                                                }
                                                {   (page === 'dealer-post') && 
                                                    <>
                                                        <div className="bg-green-800 px-3 py-2 rounded-md hover:bg-gray-500 hover:text-white cursor-pointer" onClick={() =>
                                                            { 
                                                                setUserDetails(true)
                                                            } }>
                                                                View Detail
                                                        </div>
                                                    </>
                                                }
                                                {   (page === 'staffs') && 
                                                    <>
                                                         {/* <div className="bg-blue-800 px-3 py-2 rounded-md hover:bg-green-500 hover:text-white cursor-pointer">Extend</div> */}
                                                        <div className="bg-blue-800 px-3 py-2 rounded-md hover:bg-gray-500 hover:text-white cursor-pointer" onClick={() =>
                                                            { 
                                                                setEditStaffModal(true)
                                                            } }>
                                                                Edit
                                                        </div> 
                                                        <div onClick={() => {
                                                            setUserDetails(true)
                                                        }} className="bg-orange-800 px-3 py-2 rounded-md hover:bg-gray-500 hover:text-white cursor-pointer">
                                                                View Staff
                                                        </div> 
                                                        <div className="bg-gray-800 px-3 py-2 rounded-md hover:bg-gray-500 hover:text-white cursor-pointer" onClick={() =>
                                                            { 
                                                                setChangeRole(true)
                                                            } }>
                                                                Change Role
                                                        </div>
                                                        <div className="bg-green-800 px-3 py-2 rounded-md hover:bg-gray-500 hover:text-white cursor-pointer" onClick={() =>
                                                            { 
                                                                setRevokeUserRole(true)
                                                            } }>
                                                                Withdraw Role
                                                        </div>
                                                        <div className="bg-red-800 px-3 py-2 rounded-md hover:bg-gray-500 hover:text-white cursor-pointer" onClick={() =>
                                                            { 
                                                                setSuspendUser(true)
                                                            } }>
                                                                Suspend
                                                        </div>
                                                    </>
                                                }
                                                {   (page === 'expenses') && 
                                                    <div className="flex justify-center items-center gap-3 mt-5">
                                                    </div>
                                                }
                                                {   (page === 'request') && 
                                                    <>
                                                         {/* <div className="bg-blue-800 px-3 py-2 rounded-md hover:bg-green-500 hover:text-white cursor-pointer">Extend</div> */}
                                                        <div className="bg-blue-800 px-3 py-2 rounded-md hover:bg-gray-500 hover:text-white cursor-pointer" onClick={() =>
                                                            { 
                                                                setApproveEx(true)
                                                            } }>
                                                                Approve
                                                        </div> 
                                                        <div onClick={() => {
                                                            setDeclineEx(true)
                                                        }} className="bg-orange-800 px-3 py-2 rounded-md hover:bg-gray-500 hover:text-white cursor-pointer">
                                                                Decline
                                                        </div>
                                                    </>
                                                }
                                                {   (page === 'items') && 
                                                    <>
                                                         {/* <div className="bg-blue-800 px-3 py-2 rounded-md hover:bg-green-500 hover:text-white cursor-pointer">Extend</div> */}
                                                        <div className="bg-blue-800 px-3 py-2 rounded-md hover:bg-gray-500 hover:text-white cursor-pointer" onClick={() =>
                                                            { 
                                                                setEditItem(true)
                                                            } }>
                                                                Edit
                                                        </div> 
                                                        <div className="bg-red-800 px-3 py-2 rounded-md hover:bg-gray-500 hover:text-white cursor-pointer" onClick={() =>
                                                            { 
                                                                setDeleteItem(true)
                                                            } }>
                                                                Delete
                                                        </div>
                                                    </>
                                                }
                                            </td>
                                        </tr>   
                                    </>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            { viewAdvert && <ViewProductDetail onClick={() => setViewAdvert(false) } viewAdvert={viewAdvert} productId={productId} /> }


            { verifyProduct && <VerifyProduct onClick={(e) => { 
                                                                setVerifyProduct(false)
                                                                console.log(e) 
                                                                onClick(e)
                                                            }
                                            } verifyProduct={verifyProduct} productId={productId} /> }
            
            { viewFaqModal && <ViewFaqModal onClick={(e) => { 
                                                                setViewFaqModal(false)
                                                                console.log(e) 
                                                                onClick(e)
                                                            }
                                            } viewFaqModal={viewFaqModal} title={title} content={content} isOpened={isOpened}  /> }
            { editFaqModal && <EditFaqModal onClick={(e) => { 
                                                                setEditFaqModal(false)
                                                                console.log(e) 
                                                                onClick(e)
                                                            }
                                            } editFaqModal={editFaqModal} productId={productId} title={title} content={content} isOpened={isOpened}  /> } 
            { deleteFaqModal && <DeleteFaqModal onClick={(e) => { 
                                                                setDeleteFaqModal(false)
                                                                console.log(e) 
                                                                onClick(e)
                                                            }
                                            } deleteFaqModal={deleteFaqModal} productId={productId} title={title}  /> } 

            { studentMessage && <StudentMessage studentMessage={studentMessage} path={path} onClick={() => {
                 setStudentMessage(false)
            }} message={''} /> }

            { editCourseModal && <EditCourseModal editCourseModal={editCourseModal} courseId={''} onClick={() => {
                 setEditCourseModal(false)
            }} message={''} /> }

            { deleteCourseModal && <DeleteCourseModal deleteCourseModal={deleteCourseModal} courseId={''} onClick={() => {
                 setDeleteCourseModal(false)
            }} message={''} /> }

            { uploadCourse && <UploadCourseModal uploadCourse={uploadCourse} courseId={''} onClick={() => {
                 setUploadCourse(false)
            }} message={''} /> }

            { editStaff && <EditStaffModal editStaff={editStaff} onClick={() => {
                 setEditStaffModal(false)
              }} /> 
            }

            { changeRole && <ChangeRole openChangeRole={changeRole} userId={''} onClick={() => {
                 setChangeRole(false)
              }} /> 
            }

            { suspendUser && <SuspendUser openSuspend={suspendUser} userId={''} onClick={() => {
                 setSuspendUser(false)
              }} /> 
            }

            { UserDetails && <UserDetail openUserDetail={UserDetails} userId={''} onClick={() => {
                 setUserDetails(false)
              }} /> 
            }

            { revokeUserRole && <RevokeRole openRevoke={revokeUserRole} userId={''} onClick={() => {
                 setRevokeUserRole(false)
              }} /> 
            }

            { approveEx && <ApproveExpenses approveExpenses={approveEx} expenseId ={''} onClick={() => {
                 setApproveEx(false)
              }} /> 
            }

            { declineEx && <DeclineExpenses declineExpenses={declineEx} expenseId ={''} onClick={() => {
                 setDeclineEx(false)
              }} /> 
            }

            { editItem && <EditItemModal editItemModal={editItem} itemId ={''} onClick={() => {
                 setEditItem(false)
              }} /> 
            }

            { deleteItem && <DeleteItemModal DeleteItemModal={deleteItem} itemId ={''} onClick={() => {
                 setDeleteItem(false)
              }} /> 
            }
           
        </>
  )
}
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
import { UserDetail } from "./staffs/UserDetail";
import { RevokeRole } from "./staffs/RevokeRole";
import { ApproveExpenses } from "./expenses/ApproveExpenses";
import { DeclineExpenses } from "./expenses/DeclineExpenses";
import { EditItemModal } from "./item/EditItemModal";
import { DeleteItemModal } from "./item/DeleteItemModal";
import { RemoveCourseModal } from "./course/RemoveCourseModal";
import { AdminCourseFaqQuestion } from "./maceos/AdminCourseFaqQuestion";
import { AssessmentModal } from "./maceos/AssessmentModal";
import { EditCountry } from "./location/EditCountry";
import { DeleteCountry } from "./location/DeleteCountry";
import { ViewStates } from "./location/ViewStates";
import { DeleteStateModal } from "./location/state/DeleteStateModal";
import { EditStateModal } from "./location/state/EditStateModal";
import { DeleteStaffModal } from "./staffs/DeleteStaffModal";
import { SuspendUser } from "./staffs/SuspendUser";
import { EditManufacturer } from "./manufacturer/EditManufacturer";
import { DeleteManufacturer } from "./manufacturer/DeleteManufacturer";
import { ViewBrands } from "./manufacturer/ViewBrands";
import { PlaceBrandLevel } from "./manufacturer/Brand/PlaceBrandLevel";
import { PlaceManufacturerLevel } from "./manufacturer/PlaceManufacturerLevel";
import { EditProductBrand } from "./manufacturer/Brand/EditProductBrand";
import { DeleteProductBrand } from "./manufacturer/Brand/DeleteProductBrand";
import { ViewTims } from "./manufacturer/Brand/ViewTims";
import { AllowDownloadDocument } from "./maceos/AllowDownloadDocument";
import { PlaceTrimLevel } from "./manufacturer/Trim/PlaceTrimLevel";
import { AddTrim } from "./manufacturer/Trim/AddTrim";
import { EditTrim } from "./manufacturer/Trim/EditTrim";
import { DeleteTrim } from "./manufacturer/Trim/DeleteTrim";
import { PlaceStateLevel } from "./location/state/PlaceStateLevel";
import { ViewBlog } from "./ViewBlog";
import { DeleteBlogPost } from "@/pages/cms/blog/delete-post-blog";
import { ViewCourseModule } from "./course/ViewCourseModule";
import { EditModule } from "./course/modules/EditModule";
import { DeleteModule } from "./course/modules/DeleteModule";
import { ViewCourseSubModule } from "./course/modules/ViewCourseSubModule";
import { EditSubModule } from "./course/submodule/EditSubModule";
import { DeleteSubModule } from "./course/submodule/DeleteSubModule";
import { OpenOrCloseSessionModal } from "./acadamic_session/OpenOrCloseSessionModal";
import { DeleteSessionModal } from "./acadamic_session/DeleteSessionModal";
import { EditSessionModal } from "./acadamic_session/EditSessionModal";
import toast from "react-hot-toast";
import { AlllowCourseDownload } from "./course/exam/AlllowCourseDownload";
import { CourseStatus } from "./course/exam/CourseStatus";
import { TestTheoryDuration } from "./course/TestTheoryDuration";
import { TestExamDuration } from "./course/TestExamDuration";
import { downloadPdfFile } from "@/pages/user/allCourses";


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
    const [viewBlog, setViewBlog] = useState(false)
    const [deleteBlog, setDeleteBlog] = useState(false)
    const [verifyProduct, setVerifyProduct] = useState(false)
    const [deleteFaqModal, setDeleteFaqModal] = useState(false)
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [isOpened, setIsOpened] = useState("")
    const [studentMessage, setStudentMessage] = useState(false)
    const [path, setPath] = useState('')

    const [editCourseModal, setEditCourseModal] = useState(false)
    const [editDataCourse, setEditDataCOurse] = useState("")
    const [uploadCourse, setUploadCourse] = useState(false)
    const [deleteCourseModal, setDeleteCourseModal] = useState(false)
    const [deleteDataCourse, setDeleteDataCourse] = useState("")
    const [uploadId, setUploadCourseid] = useState("")
    const [openTheCourseFaq, setOpenTheCourseFaq] = useState(false)
    const [revokeRole, setRevokePermission] = useState(false)    

    const [editStaff, setEditStaffModal] = useState(false)
    const [changeRole, setChangeRole] = useState(false)
    const [UserDetails, setUserDetails] = useState(false)
    const [revokeUserRole, setRevokeUserRole] = useState(false) 
    const [grantPermission, setGrantPermission] = useState(false) 
    const [openSuspendUser, setSuspendUser] = useState(false) 
    const [openUserDetail, setOpenUserDetail] = useState(false) 
    const [assessment, setAssessment] = useState(false)
    const [allowDownload, setAllowDownload] = useState(false)
    const [courseStatus, setCourseStatus] = useState(false)

    const [editManufacturer, setEditManfucturer] = useState(false)
    const [editManufacturerId, setEditManfucturerId] = useState(false)
    const [placeBrandLevel, setBrandPlaceLevel] = useState(false)
    const [manufactureLevel, setManufacturePlaceLevel] = useState(false)
    const [removeManfuacturer, setRemoveManufacturer] = useState(false)
    const [viewBrands, setViewBrands] = useState(false)
    const [viewBrandTrim, setViewBrandTrims] = useState(false)
    const [editManfucturerBrand, setEditManfucturerBrand] = useState(false)
    const [removeManufacturerBrand, setRemoveManufacturerBrand] = useState(false)
    const [viewManufacturerBrandTrims, setViewManufacturerBrandTrims] = useState(false)
    const [brandModelTrims, setBrandModelTrims] = useState(false)

    const [trimLevel, setTrimLevel] = useState(false)
    const [editTrim, setEditTrim] = useState(false)
    const [removeTrim, setRemoveTrim] = useState(false)
    
    const [productManufacturerId, setProductManufacturerId] = useState(0)

    const [approveEx, setApproveEx] = useState(false)
    const [declineEx, setDeclineEx] = useState(false)
    const [editCountry, setEditCountry] = useState(false)
    const [countryName, setCountryName] = useState('')
    const [deleteCountry, setDeleteCountry] = useState(false)
    const [viewStates, setViewStates] = useState(false)
    const [editState, setEditState] = useState(false)
    const [placeStateLevel, setPlaceStateLevel] = useState(false)
    const [deleteStateModal, setDeleteState] = useState(false)

    const [viewCourseModule, setViewCourseModule] = useState(false)
    const [viewEditCourseModule, setViewEditCourseModule] = useState(false)
    const [viewDeleteCourseModule, setViewDeleteCourseModule] = useState(false)

    const [viewSubCourseModule, setViewSubCourseModule] = useState(false)
    const [viewEditSubCourseModule, setViewEditSubCourseModule] = useState(false)
    const [viewDeleteSubCourseModule, setViewDeleteSubCourseModule] = useState(false)
    
    const [openOrCloseAcademicSession, setViewOpenOrCloseAcademicSession] = useState(false)    
    const [editAcademicSession, setViewEditAcademicSession] = useState(false)    
    const [deleteAcademicSession, setViewDeleteAcademicSession] = useState(false)

    const [editItem, setEditItem] = useState(false)
    const [deleteItem, setDeleteItem] = useState(false)

    const [removeCourseId, setRemoveCourseId] = useState("")
    const [removeUploadCourse, setRemoveUploadCourse] = useState(false)

    const [testTheoryDuration, setTestTheoryDuration] = useState(false)
    const [testObjectiveDuration, setTestObjectiveDuration] = useState(false)
        

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
                                                        <td key={index} style={{ wordWrap: "break-word", fontSize: '16px'  }}
                                                            className="whitespace-nowrap w-fit px-6 py-3 font-medium text-gray-700 hover:font-bold">
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
                                                                setViewFaqModalcourse(true) 
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
                                                                setCountryName(product)
                                                                setViewBlog(true) 
                                                            } }>
                                                                View
                                                        </div>
                                                        <div className="bg-blue-700 px-3 py-2 rounded-md hover:bg-blue-900 hover:text-white cursor-pointer" onClick={() =>
                                                            { 
                                                                localStorage.setItem('editPost', product.id)
                                                                navigate(`/a/edit-post/${product.id}`)
                                                            } }>
                                                                Edit
                                                        </div> 
                                                        <div className="bg-red-700 px-3 py-2 rounded-md hover:bg-red-900 hover:text-white cursor-pointer" onClick={() =>
                                                            { 
                                                                setCountryName(product)
                                                                setDeleteBlog(true) 
                                                            } }>
                                                                Delete
                                                        </div> 
                                                    </div>
                                                }
                                                {   (page === 'student') && 
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
                                                                Mark
                                                        </div>
                                                        <div className="bg-blue-700 px-3 py-2 rounded-md hover:bg-blue-900 hover:text-white cursor-pointer" onClick={() =>
                                                            { 
                                                                setPath('result')
                                                                setStudentMessage(true)
                                                            } }>
                                                                Confirm Student
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
                                                         {/* <div className={`${(product.downloadable === "yes") ? 'bg-blue-900' : 'bg-blue-500'} px-3 py-2 rounded-md hover:bg-gray-500 hover:text-white cursor-pointer`} onClick={() =>
                                                            { 
                                                                setCountryName(product)
                                                                setAllowDownload(true)
                                                            } }>
                                                                Permission To Download ({product.downloadable})
                                                        </div>  */}
                                                        <div className={`${(product.assessment === 1) ? 'bg-green-900' : 'bg-orange-500'} px-3 py-2 rounded-md hover:bg-gray-500 hover:text-white cursor-pointer`} onClick={() =>
                                                            { 
                                                                setEditDataCOurse(product)
                                                                setAssessment(true)
                                                            } }>
                                                                Assessment
                                                        </div> 
                                                        <div className="bg-blue-800 px-3 py-2 rounded-md hover:bg-gray-500 hover:text-white cursor-pointer" onClick={() =>
                                                            { 
                                                                setEditDataCOurse(product)
                                                                setEditCourseModal(true)
                                                            } }>
                                                                Edit
                                                        </div>
                                                        <div className="bg-gray-800 px-3 py-2 rounded-md hover:bg-gray-500 hover:text-white cursor-pointer" onClick={() =>
                                                            { 
                                                                setDeleteDataCourse(product)
                                                                setDeleteCourseModal(true)
                                                            } }>
                                                                Delete
                                                        </div>
                                                        <div className={`bg-pink-500 px-3 py-2 rounded-md hover:bg-pink-500 hover:text-white cursor-pointer`} onClick={() =>
                                                            { 
                                                                setCountryName(product)
                                                                setTestObjectiveDuration(true)
                                                            } }>
                                                                Objective Duration
                                                        </div> 
                                                        <div className={`bg-purple-500 px-3 py-2 rounded-md hover:bg-purple-500 hover:text-white cursor-pointer`} onClick={() =>
                                                            { 
                                                                setCountryName(product)
                                                                setTestTheoryDuration(true) 
                                                            } }>
                                                                Theory Duration
                                                        </div>
                                                        <div className="bg-red-500 px-3 py-2 rounded-md hover:bg-gray-500 hover:text-white cursor-pointer" onClick={() =>
                                                            { 
                                                                setUploadCourseid(product)
                                                                setUploadCourse(true)
                                                            } }>
                                                                Upload Course
                                                        </div>  
                                                        {
                                                            (product?.file_name != null) && 
                                                                <>                                                                    
                                                                    <div className="bg-green-800 px-3 py-2 rounded-md hover:bg-gray-500 hover:text-white cursor-pointer" onClick={() =>
                                                                        { 
                                                                            downloadPdfFile(product?.id)
                                                                            // setUploadCourse(true)
                                                                        } }>
                                                                            Download
                                                                    </div> 
                                                                    <div className="bg-red-900 px-3 py-2 rounded-md hover:bg-gray-500 hover:text-white cursor-pointer" onClick={() =>
                                                                        { 
                                                                            setRemoveCourseId(product)
                                                                            setRemoveUploadCourse(true)
                                                                        } }>
                                                                        Remove
                                                                </div> 
                                                                </>
                                                        }                                                       
                                                        <div className="bg-blue-500 px-3 py-2 rounded-md hover:bg-gray-500 hover:text-white cursor-pointer" onClick={() =>
                                                            { 
                                                                setUploadCourseid(product)
                                                                setOpenTheCourseFaq(true)
                                                            } }>
                                                                FAQ
                                                        </div> 
                                                    </>
                                                }
                                                {   (page === 'modules') && 
                                                    <>
                                                    <div className={`bg-blue-500 px-3 py-2 rounded-md hover:bg-blue-900 hover:text-white cursor-pointer`} onClick={() =>
                                                        { 
                                                            setCountryName(product)
                                                            setViewCourseModule(true)
                                                        } }>
                                                            View Sub Module
                                                    </div> 
                                                    </>
                                                }
                                                {   (page === 'submodules') && 
                                                    <>
                                                        <div className={`bg-blue-500 px-3 py-2 rounded-md hover:bg-blue-900 hover:text-white cursor-pointer`} onClick={() =>
                                                            { 
                                                                setCountryName(product)
                                                                setViewEditCourseModule(true)
                                                            } }>
                                                                Edit
                                                        </div>
                                                        <div className={`bg-red-500 px-3 py-2 rounded-md hover:bg-red-900 hover:text-white cursor-pointer`} onClick={() =>
                                                            { 
                                                                setCountryName(product)
                                                                setViewDeleteCourseModule(true)
                                                            } }>
                                                                Delete
                                                        </div>
                                                        <div className={`bg-gray-500 px-3 py-2 rounded-md hover:bg-gray-900 hover:text-white cursor-pointer`} onClick={() =>
                                                            { 
                                                                setCountryName(product)
                                                                setViewSubCourseModule(true)
                                                            } }>
                                                                View Sub Module
                                                        </div> 
                                                    </>
                                                }
                                                {   (page === 'sub') && 
                                                    <>
                                                        <div className={`bg-blue-500 px-3 py-2 rounded-md hover:bg-blue-900 hover:text-white cursor-pointer`} onClick={() =>
                                                            { 
                                                                setCountryName(product)
                                                                setViewEditSubCourseModule(true)
                                                            } }>
                                                                Edit
                                                        </div>
                                                        <div className={`bg-red-500 px-3 py-2 rounded-md hover:bg-red-900 hover:text-white cursor-pointer`} onClick={() =>
                                                            { 
                                                                setCountryName(product)
                                                                setViewDeleteSubCourseModule(true)
                                                            } }>
                                                                Delete
                                                        </div>
                                                    </>
                                                }
                                                {   (page === 'academic') && 
                                                    <>
                                                        <div className={`bg-red-500 px-3 py-2 rounded-md hover:bg-red-900 hover:text-white cursor-pointer`} onClick={() =>
                                                            { 
                                                                setCountryName(product)
                                                                setViewOpenOrCloseAcademicSession(true)
                                                            } }>
                                                                Status
                                                        </div>
                                                        <div className={`bg-blue-500 px-3 py-2 rounded-md hover:bg-blue-900 hover:text-white cursor-pointer`} onClick={() =>
                                                            { 
                                                                setCountryName(product)
                                                                setViewEditAcademicSession(true)
                                                            } }>
                                                                Edit
                                                        </div>
                                                        <div className={`bg-red-500 px-3 py-2 rounded-md hover:bg-red-900 hover:text-white cursor-pointer`} onClick={() =>
                                                            { 
                                                                setCountryName(product)
                                                                setViewDeleteAcademicSession(true)
                                                            } }>
                                                                Delete
                                                        </div>
                                                    </>
                                                }
                                                {   (page === 'dealers') && 
                                                    <> 
                                                        <div className="bg-blue-800 px-3 py-2 rounded-md hover:bg-gray-500 hover:text-white cursor-pointer" onClick={() =>
                                                            { 
                                                                setCountryName(product)
                                                                setOpenUserDetail(true)
                                                            } }>
                                                                View Detail
                                                        </div> 
                                                        <div className="bg-gray-800 px-3 py-2 rounded-md hover:bg-gray-500 hover:text-white cursor-pointer" onClick={() =>
                                                            { 
                                                                setCountryName(product)
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
                                                                setGrantPermission(true)
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
                                                {   (page === 'countries') && 
                                                    <>
                                                         {/* <div className="bg-blue-800 px-3 py-2 rounded-md hover:bg-green-500 hover:text-white cursor-pointer">Extend</div> */}
                                                        <div className="bg-orange-600 px-3 py-2 rounded-md hover:bg-gray-500 hover:text-white cursor-pointer" onClick={() =>
                                                            { 
                                                                setCountryName(product)
                                                                setViewStates(true)
                                                            } }>
                                                                View States
                                                        </div> 
                                                        <div className="bg-blue-800 px-3 py-2 rounded-md hover:bg-gray-500 hover:text-white cursor-pointer" onClick={() =>
                                                            { 
                                                                setCountryName(product)
                                                                setEditCountry(true)
                                                            } }>
                                                                Edit
                                                        </div> 
                                                        <div className="bg-red-800 px-3 py-2 rounded-md hover:bg-gray-500 hover:text-white cursor-pointer" onClick={() =>
                                                            { 
                                                                setCountryName(product)
                                                                setDeleteCountry(true)
                                                            } }>
                                                                Delete
                                                        </div>
                                                    </>
                                                }
                                                {   (page === 'states') && 
                                                    <>
                                                        <div className="bg-orange-400 px-3 py-2 rounded-md hover:bg-gray-500 hover:text-white cursor-pointer" onClick={() =>
                                                            { 
                                                                setCountryName(product)
                                                                setPlaceStateLevel(true)
                                                            } }>
                                                                Place Level
                                                        </div> 
                                                        <div className="bg-blue-800 px-3 py-2 rounded-md hover:bg-gray-500 hover:text-white cursor-pointer" onClick={() =>
                                                            { 
                                                                setCountryName(product)
                                                                setEditState(true)
                                                            } }>
                                                                Edit
                                                        </div> 
                                                        <div className="bg-red-800 px-3 py-2 rounded-md hover:bg-gray-500 hover:text-white cursor-pointer" onClick={() =>
                                                            { 
                                                                setCountryName(product)
                                                                setDeleteState(true)
                                                            } }>
                                                                Delete
                                                        </div>
                                                    </>
                                                }
                                                {   (page === 'users') && 
                                                    <>
                                                        <div className="bg-blue-800 px-3 py-2 rounded-md hover:bg-blue-500 hover:text-white cursor-pointer" onClick={() =>
                                                            { 
                                                                setCountryName(product)
                                                                setOpenUserDetail(true)
                                                            } }>
                                                                view
                                                        </div> 
                                                        <div className="bg-orange-800 px-3 py-2 rounded-md hover:bg-orange-500 hover:text-white cursor-pointer" onClick={() =>
                                                            { 
                                                                setCountryName(product)
                                                                setEditStaffModal(true)
                                                            } }>
                                                                Edit
                                                        </div>
                                                        <div className="bg-gray-800 px-3 py-2 rounded-md hover:bg-gray-500 hover:text-white cursor-pointer" onClick={() =>
                                                            { 
                                                                setCountryName(product)
                                                                setSuspendUser(true)
                                                            } }>
                                                                Status
                                                        </div>                                                        
                                                        <div className="bg-green-800 px-3 py-2 rounded-md hover:bg-green-500 hover:text-white cursor-pointer" onClick={() =>
                                                            { 
                                                                setCountryName(product)
                                                                setGrantPermission(true)
                                                            } }>
                                                                Permission
                                                        </div>
                                                        {/* <div className="bg-green-800 px-3 py-2 rounded-md hover:bg-green-500 hover:text-white cursor-pointer" onClick={() =>
                                                            { 
                                                                setCountryName(product)
                                                                setGrantPermission(true)
                                                            } }>
                                                                Grant Permission
                                                        </div>
                                                        <div className="bg-red-800 px-3 py-2 rounded-md hover:bg-gray-500 hover:text-white cursor-pointer" onClick={() =>
                                                            { 
                                                                setCountryName(product)
                                                                setRevokePermission(true)
                                                            } }>
                                                                Revoke Permission
                                                        </div> */}
                                                    </>
                                                }
                                                {   (page === 'product-entry') && 
                                                    <>
                                                        <div className="bg-gray-500 px-3 py-2 rounded-md hover:bg-gray-800 hover:text-white cursor-pointer" onClick={() =>
                                                            { 
                                                                setCountryName(product)
                                                                setManufacturePlaceLevel(true)
                                                            } }>
                                                                Place Level
                                                        </div>
                                                        <div className="bg-orange-800 px-3 py-2 rounded-md hover:bg-orange-500 hover:text-white cursor-pointer" onClick={() =>
                                                            { 
                                                                setCountryName(product)
                                                                setEditManfucturerId(product?.id)
                                                                setEditManfucturer(true)
                                                            } }>
                                                                Edit
                                                        </div>
                                                        <div className="bg-gray-800 px-3 py-2 rounded-md hover:bg-gray-500 hover:text-white cursor-pointer" onClick={() =>
                                                            { 
                                                                setCountryName(product)
                                                                setRemoveManufacturer(true)
                                                            } }>
                                                                Remove
                                                        </div>
                                                        <div className="bg-blue-800 px-3 py-2 rounded-md hover:bg-blue-500 hover:text-white cursor-pointer" onClick={() =>
                                                            { 
                                                                setProductManufacturerId(product?.id)
                                                                setCountryName(product)
                                                                setViewBrands(true)
                                                            } }>
                                                                view Brands
                                                        </div>
                                                    </>
                                                }
                                                {   (page === 'brands') && 
                                                    <>
                                                        <div className="bg-gray-500 px-3 py-2 rounded-md hover:bg-gray-800 hover:text-white cursor-pointer" onClick={() =>
                                                            { 
                                                                setCountryName(product)
                                                                setBrandPlaceLevel(true)
                                                            } }>
                                                                Place Level
                                                        </div>
                                                        <div className="bg-orange-800 px-3 py-2 rounded-md hover:bg-orange-500 hover:text-white cursor-pointer" onClick={() =>
                                                            { 
                                                                setCountryName(product)
                                                                setEditManfucturerBrand(true)
                                                            } }>
                                                                Edit
                                                        </div>
                                                        <div className="bg-gray-800 px-3 py-2 rounded-md hover:bg-gray-500 hover:text-white cursor-pointer" onClick={() =>
                                                            { 
                                                                setCountryName(product)
                                                                setRemoveManufacturerBrand(true)
                                                            } }>
                                                                Remove
                                                        </div> 
                                                        <div className="bg-blue-800 px-3 py-2 rounded-md hover:bg-blue-500 hover:text-white cursor-pointer" onClick={() =>
                                                            { 
                                                                setCountryName(product)
                                                                setBrandModelTrims(true)
                                                            } }>
                                                                view Tims
                                                        </div> 
                                                    </>
                                                }
                                                {   (page === 'trims') && 
                                                    <>
                                                        <div className="bg-gray-500 px-3 py-2 rounded-md hover:bg-gray-800 hover:text-white cursor-pointer" onClick={() =>
                                                            {
                                                                setCountryName(product)
                                                                setTrimLevel(true)
                                                            } }>
                                                                Place Level
                                                        </div>
                                                        <div className="bg-orange-800 px-3 py-2 rounded-md hover:bg-orange-500 hover:text-white cursor-pointer" onClick={() =>
                                                            { 
                                                                setCountryName(product)
                                                                setEditTrim(true)
                                                            } }>
                                                                Edit
                                                        </div>
                                                        <div className="bg-gray-800 px-3 py-2 rounded-md hover:bg-gray-500 hover:text-white cursor-pointer" onClick={() =>
                                                            { 
                                                                setCountryName(product)
                                                                setRemoveTrim(true)
                                                            } }>
                                                                Remove
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
                                                                onClick(e)
                                                            }
                                            } verifyProduct={verifyProduct} productId={productId} /> }
            
            { viewFaqModal && <ViewFaqModal onClick={(e) => { 
                                                                setViewFaqModalcourse(false)
                                                                onClick(e)
                                                            }
                                            } viewFaqModal={viewFaqModal} title={title} content={content} isOpened={isOpened}  /> }
            { editFaqModal && <EditFaqModal onClick={(e) => { 
                                                                setEditFaqModal(false)
                                                                onClick(e)
                                                            }
                                            } editFaqModal={editFaqModal} productId={productId} title={title} content={content} isOpened={isOpened}  /> } 
            { deleteFaqModal && <DeleteFaqModal onClick={(e) => { 
                                                                setDeleteFaqModal(false)
                                                                onClick(e)
                                                            }
                                            } deleteFaqModal={deleteFaqModal} productId={productId} title={title}  /> } 

            { studentMessage && <StudentMessage studentMessage={studentMessage} path={path} onClick={() => {
                    onClick()
                    setStudentMessage(false)
            }} message={''} /> }

            { editCourseModal && <EditCourseModal editCourseModal={editCourseModal} editCourse={editDataCourse} courseId={''} onClick={(e) => {
                 onClick(false)
                 setEditCourseModal(false)
            }} message={''} /> }

            { deleteCourseModal && <DeleteCourseModal deleteCourseModal={deleteCourseModal} deleteCourse={deleteDataCourse} courseId={''} onClick={() => {
                 onClick(false)
                 setDeleteCourseModal(false)
            }} message={''} /> }

            { uploadCourse && <UploadCourseModal uploadCourse={uploadCourse} courseId={uploadId} onClick={() => {
                 onClick(false)
                 setUploadCourse(false)
            }} message={''} /> }

            { removeUploadCourse && <RemoveCourseModal removeUploadCourse={removeUploadCourse} removeCourse={removeCourseId} courseId={''} onClick={() => {
                 onClick(false)
                 setRemoveUploadCourse(false)
            }} message={''} /> }

            { editStaff && <EditStaffModal editStaff={editStaff} user={countryName} onClick={() => {
                    onClick()
                    setEditStaffModal(false)
              }} /> 
            }

            { changeRole && <ChangeRole openChangeRole={changeRole} userId={''} onClick={() => {
                    onClick()
                    setChangeRole(false)
              }} /> 
            }

            { openSuspendUser && <SuspendUser openSuspend={openSuspendUser} user={countryName} onClick={() => {
                    onClick()
                    setSuspendUser(false)
              }} /> 
            }

            { UserDetails && <UserDetail openUserDetail={UserDetails} userId={''} onClick={() => {
                    onClick()
                    setUserDetails(false)
              }} /> 
            }

            { revokeRole && <RevokeRole openRevoke={revokeRole} userId={''} onClick={() => {
                    onClick()
                    setRevokePermission(false)
              }} /> 
            }

            { approveEx && <ApproveExpenses approveExpenses={approveEx} expenseId ={''} onClick={() => {
                    onClick()
                    setApproveEx(false)
              }} /> 
            }

            { declineEx && <DeclineExpenses declineExpenses={declineEx} expenseId ={''} onClick={() => {
                    onClick()
                    setDeclineEx(false)
              }} /> 
            }

            {/* { editItem && <EditItemModal editItemModal={editItem} itemId ={''} onClick={() => {
                    onClick()
                 setEditItem(false)
              }} /> 
            } */}

            { deleteItem && <DeleteItemModal DeleteItemModal={deleteItem} itemId ={''} onClick={() => {
                    onClick()
                 setDeleteItem(false)
              }} /> 
            }

            { 
                openTheCourseFaq && <AdminCourseFaqQuestion openTheCourseFaq={openTheCourseFaq} courseId={uploadId} onClick={() => {
                    onClick()
                    setOpenTheCourseFaq(false)
                }} />
            }

            { 
                allowDownload && <AlllowCourseDownload openCourseDownloadStatus={allowDownload} course={countryName} onClick={() => {
                    setAllowDownload(false)
                    onClick(false)
                }} />
            }

            { 
                courseStatus && <CourseStatus openCourseStatus={courseStatus} course={countryName} onClick={() => {
                    setCourseStatus(false)
                    onClick(false)
                }} />
            }

            { 
                assessment && <AssessmentModal assessment={assessment} editDataCourse={editDataCourse} courseId={uploadId} onClick={() => {
                    onClick(false)
                    setAssessment(false)
                }} />
            }

            { editCountry &&<EditCountry openEditCountry={editCountry} countryName={countryName} onClick={() => {
                    onClick()
                    setEditCountry(false)
            }} /> }

            { deleteCountry &&<DeleteCountry openDeleteCountry={deleteCountry} countryName={countryName} onClick={() => {
                    onClick()
                    setDeleteCountry(false)
            }} /> }

            { viewStates &&<ViewStates openViewState={viewStates} countryId={countryName} onClick={() => {
                    onClick()
                    setViewStates(false)
            }} /> }

            { editState &&<EditStateModal editCountryModal={editState} country={countryName} onClick={() => {
                    onClick()
                    setEditState(false)
            }} /> }

            { placeStateLevel && <PlaceStateLevel placeStateLevel={placeStateLevel} stateLevel={countryName} onClick={() => {
                    onClick()
                    setPlaceStateLevel(false)
            }} /> }

            { deleteStateModal &&<DeleteStateModal deleteStateModal={deleteStateModal} stateId={countryName} onClick={() => {
                    onClick()
                    setDeleteState(false)
            }} /> }

            { openUserDetail &&<UserDetail openUserDetail={openUserDetail} user={countryName} onClick={() => {
                    onClick()
                    setOpenUserDetail(false)
            }} /> }

            { grantPermission &&<ChangeRole openChangeRole={grantPermission} user ={countryName} onClick={() => {
                    onClick()
                    setGrantPermission(false)
            }} /> }

            { editManufacturer &&<EditManufacturer openEditManufacturer={editManufacturer} productId={countryName?.id} productName={countryName?.title} onClick={() => {
                    onClick(true)
                    setEditManfucturer(false)
            }} /> }

            { removeManfuacturer &&<DeleteManufacturer openDeleteManufacturer={removeManfuacturer} productId ={countryName?.id} productName={countryName?.title} onClick={() => {
                    onClick(true)
                    setRemoveManufacturer(false)
            }} /> }

            { viewBrands &&<ViewBrands openViewBrand={viewBrands} manufacturerId ={countryName} onClick={() => {
                    onClick(true)
                    setViewBrands(false)
            }} /> }         

            { manufactureLevel &&<PlaceManufacturerLevel openManufacturerLevel={manufactureLevel} brandId={countryName?.id} productBrand={countryName?.rate} onClick={() => {
                    onClick(true)
                    setManufacturePlaceLevel(false)    
            }} /> }

            { placeBrandLevel &&<PlaceBrandLevel openBrandLevel={placeBrandLevel} productBrand ={countryName} onClick={() => {
                    onClick()
                    setBrandPlaceLevel(false)    
            }} /> } 

            { editManfucturerBrand &&<EditProductBrand openEditProductBrand={editManfucturerBrand} model={countryName} onClick={() => {
                    onClick()
                    setEditManfucturerBrand(false)    
            }} /> } 

            { removeManufacturerBrand &&<DeleteProductBrand openDeleteBrand={removeManufacturerBrand} modelId ={countryName} onClick={() => {
                    onClick()
                    setRemoveManufacturerBrand(false)    
            }} /> } 

            { brandModelTrims &&<ViewTims openTrim={brandModelTrims} trimId={countryName} onClick={() => {
                    onClick()
                    setBrandModelTrims(false)    
            }} /> }  

            { trimLevel &&<PlaceTrimLevel openTrimLevel={trimLevel} trim={countryName} onClick={() => {
                    onClick()
                    setTrimLevel(false)    
            }} /> } 

            { editTrim &&<EditTrim openEditTrim={editTrim} trimId={countryName?.id} trimName={countryName?.name} onClick={() => {
                    onClick()
                    setEditTrim(false)    
            }} /> } 

            { removeTrim &&<DeleteTrim openDeleteTrim={removeTrim} trimId={countryName?.id} onClick={() => {
                    onClick()
                    setRemoveTrim(false)    
            }} /> }  

            { viewBlog &&<ViewBlog openViewBlog={viewBlog} blogs={countryName} onClick={() => {
                    onClick()
                    setViewBlog(false)    
            }} /> }  

            { deleteBlog &&<DeleteBlogPost openDeleteBlog={deleteBlog} blogs={countryName} onClick={() => {
                    setDeleteBlog(false)    
                    onClick()
            }} /> }  

            { viewCourseModule &&<ViewCourseModule oopenCourseModule={viewCourseModule} module={countryName} onClick={() => {
                    setViewCourseModule(false)    
                    onClick()
            }} /> }   

            { viewEditCourseModule &&<EditModule openEditModule={viewEditCourseModule} modulez={countryName} onClick={() => {
                    setViewEditCourseModule(false)    
                    onClick()
            }} /> }    

            { viewDeleteCourseModule &&<DeleteModule openDeleteModule={viewDeleteCourseModule} modulez={countryName} onClick={() => {
                    setViewDeleteCourseModule(false)    
                    onClick()
            }} /> }  

            { viewSubCourseModule &&<ViewCourseSubModule oopenCourseModule={viewSubCourseModule} subModulez={countryName} onClick={() => {
                    setViewSubCourseModule(false)    
                    onClick()
            }} /> }
            
            { viewEditSubCourseModule &&<EditSubModule openEditSubModule={viewEditSubCourseModule} subModulez={countryName} onClick={() => {
                    setViewEditSubCourseModule(false)    
                    onClick()
            }} /> }   
            
            { viewDeleteSubCourseModule &&<DeleteSubModule openDeleteSubModule={viewDeleteSubCourseModule} subModulez={countryName} onClick={() => {
                    setViewDeleteSubCourseModule(false)    
                    onClick()
            }} /> }    
            
            { openOrCloseAcademicSession &&<OpenOrCloseSessionModal openOrCloseAcademicSession={openOrCloseAcademicSession} sessionId ={countryName} onClick={(e) => {
                    setViewOpenOrCloseAcademicSession(false) 
                    toast.success(e, {
                        position: "top-center",
                    });
                    onClick()
            }} /> }     
            
            { editAcademicSession &&<EditSessionModal openEditAcademicSession={editAcademicSession} sessionId={countryName} onClick={() => {
                    setViewEditAcademicSession(false)    
                    onClick()
            }} /> }   
            
            { deleteAcademicSession &&<DeleteSessionModal openDeleteSession={deleteAcademicSession} sessionId={countryName} onClick={() => {
                    setViewDeleteAcademicSession(false)    
                    onClick()
            }} /> }  
            
            { testTheoryDuration &&<TestTheoryDuration openExamStatus={testTheoryDuration} exam ={countryName} onClick={() => {
                    setTestTheoryDuration(false)    
                    onClick()
            }} /> } 
            
            { testObjectiveDuration &&<TestExamDuration openExamStatus={testObjectiveDuration} exam ={countryName} onClick={() => {
                    setTestObjectiveDuration(false)    
                    onClick()
            }} /> }

        </>
  )
}
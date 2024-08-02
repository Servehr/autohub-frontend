import { Icons } from '@/util/icon'
import { useEffect, useState } from 'react'
import { EditQuestionaireModal } from './questionaire/EditQuestionaireModal'
import { DeleteQuestionaireModal } from './questionaire/DeleteQuestionaireModal'
import { useNavigate } from 'react-router-dom'
import { EditExamQuestionaireModal } from './exam-questionaire/EditExamQuestionaireModal'
import { DeleteExamQuestionaireModal } from './exam-questionaire/DeleteExamQuestionaireModal'
import { EditTestQuestionaireTheoryModal } from './questionaire/theory/EditQuestionaireTheoryModal'
import { DeleteTestQuestionaireTheoryModal } from './questionaire/theory/DeleteQuestionaireTheoryModal'


export default function Folder({id, titles, figures, type, toEdit, toDelete, icons, description, onClick})
{  
    const navigate = useNavigate()
    const [editFolder, setEditFolder] = useState(false)
    const [deleteFolder, setDeleteQuestion] = useState(false)
    
    return (
        // <div className='col-span-3' style={{ backgroundColor: 'rgb(206 228 217)' }}>
        <>
            <div className='md:col-span-3 col-span-6'>
                <div className="px-3 py-2 transition-shadow border border-4 bg-white hover:bg-red-100 cursor-pointer rounded-lg shadow-sm hover:shadow-lg"
                onClick={() => {
                    localStorage.setItem('questions', id)
                    if(type === "exam"){ navigate(`/exams/${id}`) }
                    if(type === "test"){ navigate(`/questions/${id}`) }
                    if(type === "test-theory"){ navigate(`/test-thoery-question/${id}`) }
                    if(type === "exam-thoery-question"){ navigate(`/exam-thoery-question/${id}`) }
                }} 
                >
                    <div className="d-flex items-start justify-center space-y-3">
                        <span className="text-blue-900 font-bold text-md mb-5">{titles}</span>
                        <div className="flex items-center justify-between space-y-2">
                        {/* <div className="px-3 py-2 bg-white rounded-full">
                            <Icons iconName={icons} width={6} height={6} />
                        </div> */}
                    </div>                    
                    </div>
                </div>
                <div className='flex flex-row col-span-12 justify-between px-3 mt-1 bg-gray-100 py-2 rounded-md'>
                    <span className="text-lg text-green-800 font-bold">{figures}</span>
                    <div className='' onClick={() => {
                            setEditFolder(toEdit)
                    } }>
                        <Icons iconName={'edit'} width={5} height={5} />
                    </div>
                    <div className='' onClick={() => {
                            // alert("Great")
                            setDeleteQuestion(toDelete)
                        }}>
                        <Icons iconName={'delete'} color='red' width={5} height={5} />
                    </div>
                </div>
            </div>

            { (editFolder === "editTestFolder") && <EditQuestionaireModal id={id} name={titles} description={description} onClick={() => {
                setEditFolder(false)
                onClick(false)
            }} editFolder={editFolder} courseId={''} /> }

            { (deleteFolder === "deleteTestFolder") && <DeleteQuestionaireModal id={id} name={titles} onClick={() => {
                setDeleteQuestion(false)
                onClick(false)
            }} deleteFolder={deleteFolder} courseId={''} /> }

            { (editFolder === "editExamFolder") && <EditExamQuestionaireModal id={id} name={titles} description={description} onClick={() => {
                setEditFolder(false)
                onClick(false)
            }} editFolder={editFolder} courseId={''} /> }

            { (deleteFolder === "deleteExamFolder") && <DeleteExamQuestionaireModal id={id} name={titles} onClick={() => {
                setDeleteQuestion(false)
                onClick(false)
            }} deleteFolder={deleteFolder} courseId={''} /> }

            { (editFolder === "editTestTheory") && <EditTestQuestionaireTheoryModal id={id} name={titles} description={description} onClick={() => {
                setEditFolder(false)
                onClick(false)
            }} editFolder={editFolder} courseId={''} /> }

            { (deleteFolder === "deleteTestTheory") && <DeleteTestQuestionaireTheoryModal id={id} name={titles} onClick={() => {
                setDeleteQuestion(false)
                onClick(false)
            }} deleteFolder={deleteFolder} courseId={''} /> }
        </>
  )

}

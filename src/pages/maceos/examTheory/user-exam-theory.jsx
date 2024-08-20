import { useEffect, useState } from "react";
import { setUserNewEmail } from "@/apis/auth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { BeatLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useQuery } from "react-query";
import { ExamCourseTheoryQuestions, SubmitExamTheory } from "@/apis/backend/course";
import { appStore } from "@/state/appState";
import { ChangeExamTheoryQuestion } from "./ChangeExamTheoryQuestion";
import { AnswerExamTheoryQuestion } from "./AnswerExamTheoryQuestion";
import CountDownTimerExamTheory from "@/components/CountDownTimerExamTheory";


export default function UserExamTheory() 
{
  const [isUser, setIsUser] = useState("-1")

  return (
    <>
      <Helmet>
        <title>Test | Autohub</title>
        <meta name="description" content="Sell Faster, Buy Smarter" />
      </Helmet>

      
      <ExamTheory />
    </>
  );
}

function ExamTheory() 
{
  const navigate = useNavigate();
  const { data, isLoading, refetch, isRefetching } = useQuery(["get-all-questions"], () => ExamCourseTheoryQuestions(), { cacheTime: 0 })

  const advertState = appStore((state) => state)
  const [selectedOptions, selectedTestTheoryOptions] = useState([])
  const [answer, setAnswer] = useState('')
  const [typedAnswer, setTypedAnswer] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState(false)
  const [nextQuestion, setNextQuestion] = useState(-1)

  const [loading, setIsLoading] = useState(false)
  const [currentQuestion, setcurrentQuestion] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)
  const [courseId, setCourseId] = useState('')
  const [studentValue, setStudentValue] = useState("")
  const [questionId, setQuestionId] = useState(-1)
  const [tempSave, setTempSave] = useState(false)
  const [tempSaveName, setTempSaveName] = useState('Save')
  const [success, setSuccess] = useState(false)
  const [openExamTheoryAnswerToEdit, setOpenExamTheoryAnswerToEdit] = useState(false)
  const [OpenAnswerExamTheoryQuestion, setOpenAnswerExamTheoryQuestion] = useState(false)

  const [fakeRefresh, setFakeRefresh] = useState(-1)
  const [choosen, setChoosen] = useState(advertState.getSelectedExamTheoryOption())

  useEffect(() => {
    const checkIfForcedToSubmit = advertState.getForceExamTheory()
    if(checkIfForcedToSubmit === "yes")
    {
        navigate('/dashboard/force-submit-exam', { replace: true })
    }
  }, [])

  const SubmitExamTheoryQuestionn = () => 
  {
      setIsSubmitting(true)
      const userTheoryAnswers = { userSubmitted : 'yes', answers: advertState.getSelectedExamTheoryOption() }
      if(userTheoryAnswers.answers.length === 0)
      {
          setErrorMsg("Answer at least one question")
          setTimeout(() => {
              setIsSubmitting(false)
              setErrorMsg("")
          }, 7000)
          return false
      } else {
        SubmitExamTheory(userTheoryAnswers)
        .then((res) => {
            if(res === "submitted")
            {
                advertState.setEmptyExamTheory([])
                navigate('/dashboard/summary')
                // return false
            } else {
                setErrorMsg("Submitting Result Failed")
                setIsSubmitting(false)
                setTimeout(() => {
                    setErrorMsg("")
                }, 3000)
            }
        })
        .catch(() => {
            setTimeout(() => {
                setIsSubmitting(false)
            }, 2000)
        })
      }
  }

  useEffect(() => {
    
  }, [])
  
  useEffect(() => 
  {      
  }, [currentQuestion, fakeRefresh])

  const showQuestion = (pst) => 
  {
      setCurrentPage(pst)
      const checkIfPresent = advertState.getSelectedExamTheoryOption().find((x) => x.position === currentPage); 
      if(checkIfPresent)
      {
          document.getElementById("answering").value = ''
      } else {
      }
  }

   const EnteredAnswer = () => 
  {
      setTempSave(true)
      const checkIfPresent = advertState.getSelectedExamTheoryOption().findIndex(x => {
        return x.position === currentPage;
      });      
      if(checkIfPresent === -1)
      {          
          let answerz = { user_id: Number(localStorage.getItem("authenticatedId")), exam_theory_id: questionId, answer: studentValue, position: currentPage }
          advertState.setSelectedExamTheoryOption(answerz)     
      } else {        
          advertState.getSelectedExamTheoryOption().splice(checkIfPresent, 1);
          let answerz = { user_id: Number(localStorage.getItem("authenticatedId")), exam_theory_id: questionId, answer: studentValue, position: currentPage }
          advertState.setSelectedExamTheoryOption(answerz)             
      }
      setSuccess('Saved')
      setTimeout(() => {
        setTempSave(false)
        setSuccess('')
      }, 2000)
  }

  const isSelected = (id) => 
  {
      const answeredOption = advertState.getSelectedExamTheoryOption()
      const numbers = answeredOption.map((x) => x.position)
       if(numbers.includes(id))
       {
          return "yes"
       } else {
          return "no"
       }
  }

  const theTypedAnswer = () => 
  {
      let enteredValue;
      const theChoosen = advertState.getSelectedExamTheoryOption()
      if(theChoosen.length === 0)
      {
         enteredValue = ''
      } else
      {
        const x = theChoosen.find((p) => p.position === currentPage)
        if(x === '' || x === undefined ||x === null)
        {
          enteredValue = ''
        } else {
          enteredValue = x.answer
        }
      }      
      advertState.getSelectedAnswerValue(enteredValue)
      return enteredValue
  }
  
  return (
    <>
          <div className="col-span-12">
              {
                isLoading && <div className="col-span-12 h-[300px] flex justify-center items-center" style={{ marginTop: '30px', paddingTop: '20px' }}>
                    <BeatLoader color="#1c9236" />
                </div>
              }
              {
                !isLoading && (data?.data?.plus === 0) && <div className="col-span-12 h-[500px] flex justify-center items-center border border-3 border-shadow border-green-200 bg-[#f5fbf7]" style={{ marginTop: '30px', paddingTop: '20px' }}>
                    <h1 className="font-bold">
                        Exam Theory Question Not Yet Prepared
                    </h1>
                </div>
              }
              {
                !isLoading && isRefetching && (data?.data?.length === 0) && <div className="col-span-12 h-[500px] flex justify-center items-center border border-3 border-shadow border-green-200 bg-[#f5fbf7]" style={{ marginTop: '30px', paddingTop: '20px' }}>
                    <h1 className="font-bold">
                        Exam Theory Question Not Yet Prepared
                    </h1>
                </div>
              }
              {
                !isLoading && (data?.plus > 0) &&                   
                    <div className="d-flex justify-center text-center items-center text-lg h-[300px] pt-52 mb-20">
                        <div className="font-bold text-blue-700 pr-5 text-md mb-5 text-green-700" style={{ fontSize: '26px' }}>You Already Had This Exam Taken</div>
                        <Link
                          to="/dashboard/summary"
                          className="inline-block px-5 py-3 mt-6 text-sm font-semibold text-white bg-brandGreen rounded cursor-pointer"
                        >
                          Go Dashboard
                        </Link>
                    </div>
              }

              { !isLoading && (data?.data?.length > 0) && (data?.message === 'closed') &&
                  
                  <div className="col-span-12 flex justify-center items-center text-lg h-[500px]">
                      <span className="font-bold text-blue-700 pr-5 text-md" style={{ fontSize: '25px' }}>Exam Date will be communiated</span>
                  </div>
              }

              { !isLoading && (data?.data?.length === 0) && (data?.message === 'closed') &&
                  
                  <div className="col-span-12 flex justify-center items-center text-lg h-[500px]">
                      <span className="font-bold text-blue-700 pr-5 text-md" style={{ fontSize: '25px' }}>Exam Date will be communiated</span>
                  </div>
              }

              { !isLoading && (data?.data === undefined) &&
                  
                  <div className="col-span-12 flex justify-center items-center text-lg h-[500px]">
                      {/* <span className="font-bold text-blue-700 pr-5 text-md" style={{ fontSize: '15px' }}>Loading Questions ...</span> */}
                  </div>
              }

              { !isLoading && !isRefetching && (data?.data.length > 0) && (data?.plus < 1) && (data?.message === 'open') && 
                 <div className="w-full mb-5">
                      {/* <div className="font-bold text-xl mb-4 text-green-700 mt-28 md:mt-0 p-3 bg-green-100">{data?.plus}</div>  */}

                      <div className="d-flex -mb-3 col-span-12 p-3"
                      >
                            <div className="w-full flex justify-between items-center">
                                <span className="font-bold text-blue-700 pr-5 text-lg" style={{ fontSize: '15px' }}>Question {currentPage+1} of {data?.data?.length}</span> 
                                <span className="w-fit">
                                    <CountDownTimerExamTheory seconds={data?.addition} />
                                </span>
                                <button type="sumbit" 
                                  disabled={!isSubmitting}
                                  className={`p-3 text-white text-sm font-bold rounded-md  ${(isSubmitting === true) ? 'bg-gray-600' : 'bg-red-600 hover:text-red-600 hover:bg-red-900 cursor-pointer'}`}
                                  onClick={() => {
                                      SubmitExamTheoryQuestionn()
                                  }}
                                  >
                                      {   isSubmitting ? ( <BeatLoader size={9} color="#fff" className="" />) : ( "Sumbit" )     }
                              </button>
                            </div>
                             
                            <h1 className="w-full font-bold text-blue-900 mt-10 shadow-md px-2 py-4 border border-3 text-lg border-gray-300 bg-white">{data?.data[currentPage]['question']}</h1>
                            
                            <div className="flex flex-wrap -m-2 mt-4 mb-2 px-2"
                            >
                              {
                                  
                                  <textarea 
                                      id="answering"
                                      onChange={ (e) => {
                                          setStudentValue(e.target.value)
                                          setQuestionId(data?.data[currentPage]['id'])
                                          setCurrentPage(currentPage)
                                      } } 
                                      name="answerings"
                                      className="shadow form-textarea mb-2 block w-full border rounded w-full 
                                      py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline text-lg" 
                                      rows="6" 
                                      placeholder="Your answer appears here"
                                      value={theTypedAnswer()}
                                  >
                                  </textarea>
                              }
                            </div>
                            <div className="flex justify-between"
                            >
                              <button type="sumbit" 
                                  disabled={tempSave}
                                  className={`p-3 text-white text-sm font-bold rounded-md  ${(tempSave === true) ? 'bg-gray-600' : 'bg-green-600 hover:text-white hover:bg-green-900 cursor-pointer'}`}
                                  onClick={() => {
                                      setOpenAnswerExamTheoryQuestion(true)
                                  }}
                                  >
                                    Answer Question
                              </button> 
                              <div
                                  className={`p-3 text-white text-sm font-bold rounded-md bg-blue-600 hover:text-white hover:bg-blue-900 cursor-pointer`}
                                  onClick={() => {
                                      setOpenExamTheoryAnswerToEdit(true)
                                  }}
                                  >
                                      Edit Answer
                              </div>          
                            </div>
                              { success && <>
                                    <span className="font-bold text-lg text-green-600">{success}</span>
                                </> 
                              }
                      </div>          
                </div>
              }

              
              <div className="col-span-12 flex justify-center items-center mx-auto px-4 mt-10">
                <nav className="flex flex-row flex-nowrap justify-between md:justify-center items-center overflow-auto overflow-y-scroll py-10" aria-label="Pagination"
                >
                  {
                    data?.data &&  (data?.plus < 1) && (data?.message === 'open') &&              
                      data?.data.map((num, index) => {
                        const isAnswered = (isSelected(index) === "yes") ? "bg-green-700 border border-solid border-green-700" : "bg-white-600"
                        const currentAnswer = (currentPage === index) ? "bg-blue-600 text-white text-green-500 disabled" : `${isAnswered} border border-gray-700 cursor-pointer hover:border-gray-300 hover:bg-green-800 hover:text-white`
                        const style = `${currentAnswer} md:flex py-1 px-3 mx-1 justify-center items-center rounded-full font-bold text-black` 
                        return (
                          <a className={style} title="Page 1" onClick={() => showQuestion(index)}>
                            {index+1}
                          </a>  
                        )
                      })
                  }
                </nav>
              </div>

              
          {  
            data?.data &&  (data?.plus < 1) && (data?.message === 'open') &&  
            <div className="col-span-12 flex justify-center items-center mx-auto px-4 md:mt-3 mt-10">
                <button type="sumbit" 
                        disabled={isSubmitting}
                        className={`p-3 text-white text-sm font-bold rounded-md  ${(isSubmitting === true) ? 'bg-gray-600' : 'bg-red-600 hover:text-red-600 hover:bg-red-900'}`}
                        onClick={SubmitExamTheoryQuestionn}
                      >
                        SUBMIT
                      </button> 
            </div>
          }

          </div>

          <div className="p-5"></div>
          {
              openExamTheoryAnswerToEdit && <ChangeExamTheoryQuestion question={data?.data[currentPage]['question']} courseId={''} questionId={data?.data?.[currentPage]['id']} studentValue={theTypedAnswer()} currentPage={currentPage} openExamTheoryAnswerToEdit={openExamTheoryAnswerToEdit} onClick={() => {
                  // refetch()
                  setOpenExamTheoryAnswerToEdit(false)
              }} />
          }
          {
              OpenAnswerExamTheoryQuestion && <AnswerExamTheoryQuestion question={data?.data[currentPage]['question']} courseId={''} questionId={data?.data?.[currentPage]['id']} currentPage={currentPage} OpenAnswerExamTheoryQuestion={OpenAnswerExamTheoryQuestion} onClick={() => {
                  // refetch()
                  setOpenAnswerExamTheoryQuestion(false)
              }} />
          }
    </>
  );
}

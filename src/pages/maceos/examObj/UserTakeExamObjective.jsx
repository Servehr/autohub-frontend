
import { useEffect, useReducer, useState } from "react";
import { setUserNewEmail } from "@/apis/auth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { BeatLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useQuery } from "react-query";
import { ExamCourseObjectiveQuestions, SubmitExamObjective } from "@/apis/backend/course";
import { appStore } from "@/state/appState";


export default function UserTakeExamObjective() 
{
  const advertState = appStore((state) => state)
  const navigate = useNavigate()
  const { data, isLoading, refetch, isRefetching } = useQuery(["get-all-questions"], () => ExamCourseObjectiveQuestions(), { cacheTime: 0 })

  if(!isLoading)
  {
      console.log(data)
  }

  const [selectedOptions, setSelectedExamObjectiveOptions] = useState([])
  const [courseId, setCourseId] = useState('')
  const [answer, setAnswer] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState(false)
  const [nextQuestion, setNextQuestion] = useState(-1)
  const [, forceUpdate] = useReducer(x => x + 1, 0)

  const [loading, setIsLoading] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [fakeRefresh, setFakeRefresh] = useState(-1)
  const [choosen, setChoosen] = useState(advertState.getSelectedExamObjectiveOption())

  useEffect(() => {

  }, [fakeRefresh])

  const SubmitObjectiveTest = () => 
    {
      setIsSubmitting(true)
      const userAnswers = advertState.getSelectedExamObjectiveOption()
      console.log(userAnswers)
      // return false
      if(userAnswers.length === 0)
      {
          setErrorMsg("Answer at least one question")
          setTimeout(() => {
              setIsSubmitting(false)
              setErrorMsg("")
          }, 2000)
      } else {
        SubmitExamObjective(userAnswers)
        .then((res) => {
            if(res === "submitted")
            {
                advertState.setEmptyExamObjective([])
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
      // console.log(advertState.getSelectedExamObjectiveOption())
  }, [])
  
  useEffect(() => 
  {      
      isChecked()
  }, [currentQuestion, fakeRefresh])

  const showQuestion = (position) => 
  {
      deselectAll()
      setCurrentQuestion(position)
      console.log(position)      
      console.log(choosen)
      console.log(advertState.getSelectedExamObjectiveOption())
  }

  const deselectAll = () => 
  {
      setChoosen(advertState.getSelectedExamObjectiveOption())
      let allOptions = document.querySelectorAll('.theOption')
      allOptions.forEach(value => value.checked = false)
  }

  useEffect(() => {
      console.log(selectedOptions)
  }, [selectedOptions, answer, courseId])


  const selectOption = (option, course, question, position) => 
  {
      const checkIfPresent = advertState.getSelectedExamObjectiveOption().findIndex(x => {
        return x.position === position;
      });      
      if(checkIfPresent === -1)
      {          
          // id, user_id, course_id, option_id, selected
          let answer = { user_id: Number(localStorage.getItem("authenticatedId")), course_id: course, selected: option, option_id: question, position: position }
          advertState.setSelectedExamObjectiveOption(answer)     
          console.log(advertState.getSelectedExamObjectiveOption())
      } else {        
          advertState.getSelectedExamObjectiveOption().splice(checkIfPresent, 1);
          let answer = { user_id: Number(localStorage.getItem("authenticatedId")), course_id: course, selected: option, option_id: question, position: position }
          advertState.setSelectedExamObjectiveOption(answer)     
          console.log(advertState.getSelectedExamObjectiveOption())          
      }
      setCurrentQuestion(position)
      setFakeRefresh(Math.random() * position)
      // refetch()
  }

  const isSelected = (id) => 
  {
      const answeredOption = advertState.getSelectedExamObjectiveOption()
      const numbers = answeredOption.map((x) => x.position)
       if(numbers.includes(id))
       {
          return "yes"
       } else {
          return "no"
       }
  }

  const callThePeople = (x) => 
  {
      const someone = people.filter((p) => {
          return p.position !== x
      })
      if(someone === undefined)
      {
         alert("Undefined")
      } else {        
        // alert(someone.selected)
      }
      console.log(someone)
  }

  const isChecked = () => 
  {
      let checkedValue;
      const theChoosen = advertState.getSelectedExamObjectiveOption()
      if(theChoosen.length === 0)
      {
         checkedValue = false
      } else
      {
        const x = theChoosen.find((p) => p.position === currentQuestion)
        if(x === undefined)
        {
          checkedValue = false
        } else {
          checkedValue = x.selected
        }
      }      
      return checkedValue
  }
  
  return (
    <>
        <div className="col-span-12">
              {
                isLoading && !isRefetching && <div className="col-span-12 h-[300px] flex justify-center items-center" style={{ marginTop: '30px', paddingTop: '20px' }}>
                    <BeatLoader color="#1c9236" />
                </div>
              }
              {
                !isLoading && isRefetching && <div className="col-span-12 h-[300px] flex justify-center items-center" style={{ marginTop: '30px', paddingTop: '20px' }}>
                    <BeatLoader color="#1c9236" />
                </div>
              }
              
              
              {
                !isLoading && (data?.plus > 0) &&                   
                    <div className="d-flex justify-center text-center items-center text-lg h-[300px] pt-52 mb-20">
                        <div className="font-bold text-blue-700 pr-5 text-md mb-5 text-green-700" style={{ fontSize: '26px' }}>You Already Had This Objective Exam</div>
                        <Link
                          to="/dashboard/summary"
                          className="inline-block px-5 py-3 mt-6 text-sm font-semibold text-white bg-brandGreen rounded cursor-pointer"
                        >
                          Go Dashboard
                        </Link>
                    </div>
              }
              {
                !isLoading && isRefetching && (data?.data?.length === 0) && <div className="col-span-12 h-[500px] flex justify-center items-center border border-3 border-shadow border-green-200 bg-[#f5fbf7]" style={{ marginTop: '30px', paddingTop: '20px' }}>
                    <h1 className="font-bold">
                        Exam Objective Question Not Yet Prepared
                    </h1>
                </div>
              }

              { !isLoading && (data?.data === undefined) &&
                  
                  <div className="col-span-12 flex justify-center items-center text-lg h-[500px]">
                      <span className="font-bold text-blue-700 pr-5 text-md" style={{ fontSize: '15px' }}>Loading Questions ...</span>
                  </div>
              }
              { !isLoading && !isRefetching && (data?.data.length > 0) && (data?.plus < 1) &&
                 <div className="w-full mb-1">
                      <div className="mb-2 text-white cursor-pointer grid grid-cols-12 justify-between rounded-lg"
                      >          
                          <div className="font-bold text-xl mb-4 text-green-700 mt-28 md:mt-0 p-3 bg-green-100 col-span-12">Course:  Artificial Intelligence</div>
                      </div>

                      { 
                          errorMsg &&  
                          <div className="w-full text-lg font-md text-white bg-red-600 rounded-md mb-5 p-3">
                              { errorMsg }
                          </div>
                      }

                      <div className="w-full flex justify-between">
                          <span className="font-bold text-blue-700 pr-5 text-lg" style={{ fontSize: '15px' }}>Question {currentQuestion+1} of {data?.data?.length}</span> 
                          <button type="sumbit" 
                              disabled={isSubmitting}
                              className={`p-3 text-white text-sm font-bold rounded-md  ${(isSubmitting === true) ? 'bg-gray-600' : 'bg-red-600 hover:text-red-600 hover:bg-red-900'}`}
                              onClick={SubmitObjectiveTest}
                              >
                                  SUBMIT
                          </button> 
                      </div>

                      <div className="d-flex -mb-3 col-span-12 py-1">
                          {/* <h1 className="font-bold -mb-1 ml-1">Question: {((data?.data?.length))}</h1> */}
                          <div className="p-5 shadow-md bg-white border border-2 border-green-200 my-2">
                             
                            <h1 className="w-full font-bold text-blue-900 mb-4">{data?.data?.[currentQuestion]['question']}</h1>
                            <div className="flex mt-2 justify-left space-between-5 mb-3">
                                <div className="p-1 font-bold text-blue-300">(a)</div>
                                <input type="radio"
                                                // defaultChecked={true}
                                                defaultChecked={(isChecked() === 'a') ? true : false}
                                                onChange={ (e) => selectOption(e.target.value, data?.data?.[currentQuestion]['course_id'], data?.data[currentQuestion]['id'], currentQuestion) }
                                                className="peer relative appearance-none w-5 h-5
                                                            border border-red-400 border-2
                                                            cursor-pointer rounded-full
                                                            checked:bg-blue-600 mt-1 ml-3 mr-1 theOption"
                                                      id="theOption11" name="theOption1" value={'a'}
                                                      checked={(isChecked() === 'a') ? true : false }
                                          /> 
                                <div className="p-1 text-lg -mt-1">{data?.data[currentQuestion]['option_a']}</div>
                            </div>
                            <div className="flex mt-2 justify-left space-between-5 mb-3">
                                <div className="p-1 font-bold text-blue-300">(b)</div>
                                <input type="radio"
                                                // defaultChecked={false}
                                                defaultChecked={(isChecked() === 'b') ? true : false }
                                                onChange={ (e) => selectOption(e.target.value, data?.data?.[currentQuestion]['course_id'], data?.data[currentQuestion]['id'], currentQuestion) }
                                                className="peer relative appearance-none w-5 h-5
                                                            border border-red-400 border-2
                                                            cursor-pointer rounded-full
                                                            checked:bg-blue-600 mt-1 ml-3 mr-1 theOption"
                                                      id="theOption22" name="theOption2" value={'b'}
                                                      checked={(isChecked() === 'b') ? true : false }
                                          /> 
                                <div className="p-1 text-lg -mt-1">{data?.data[currentQuestion]['option_b']}</div>
                            </div>
                            <div className="flex mt-2 justify-left space-between-5 mb-3">
                                <div className="p-1 font-bold text-blue-300">(c)</div>
                                <input type="radio"                                 
                                                // defaultChecked={false}    
                                                defaultChecked={(isChecked() === 'c') ? true : false }           
                                                onChange={ (e) => selectOption(e.target.value, data?.data?.[currentQuestion]['course_id'], data?.data[currentQuestion]['id'], currentQuestion) }
                                                className="peer relative appearance-none w-5 h-5
                                                            border border-red-400 border-2
                                                            cursor-pointer rounded-full
                                                            checked:bg-blue-600 mt-1 ml-3 mr-1 theOption"
                                                      id="theOption33" name="theOption3" value={'c'}
                                                      checked={(isChecked() === 'c') ? true : false }
                                          /> 
                                <div className="p-1 text-lg -mt-1">{data?.data[currentQuestion]['option_c']}</div>
                            </div>
                            <div className="flex mt-2 justify-left space-between-5 mb-3">
                               <div className="p-1 font-bold text-blue-300">(d)</div>
                                <input type="radio"
                                                // defaultChecked={false}
                                                defaultChecked={(isChecked() === 'd') ? true : false }
                                                onChange={ (e) => selectOption(e.target.value, data?.data?.[currentQuestion]['course_id'], data?.data[currentQuestion]['id'], currentQuestion) }
                                                className="peer relative appearance-none w-5 h-5
                                                            border border-red-400 border-2
                                                            cursor-pointer rounded-full
                                                            checked:bg-blue-600 mt-1 ml-3 mr-1 theOption"
                                                      id="theOption44" name="theOption4" value={'d'}
                                                      checked={(isChecked() === 'd') ? true : false }
                                          /> 
                               <div className="p-1 text-lg -mt-1">{data?.data[currentQuestion]['option_d']}</div>
                            </div>
                        </div>
                      </div>          
                </div>
              }
          {  data?.data &&               
            <div className="col-span-12 flex justify-center items-center mx-auto px-4 mt-1">
              <nav className="flex flex-row flex-nowrap justify-between md:justify-center items-center overflow-auto overflow-y-scroll py-10" aria-label="Pagination">
                 
                {
                  
                  data?.data &&  (data?.plus < 1) &&            
                    data?.data.map((num, index) => {
                      const isAnswered = (isSelected(index) === "yes") ? "bg-green-700 border border-solid border-green-700" : "bg-white-600"
                      const currentAnswer = (currentQuestion === index) ? "bg-blue-600 text-white text-green-500 disabled" : `${isAnswered} border border-gray-700 cursor-pointer hover:border-gray-300 hover:bg-green-800 hover:text-white`
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
          }
          {  
            data?.data && (data?.data.length > 0) && (data?.plus < 1) &&
            <div className="col-span-12 flex justify-center items-center mx-auto px-4 mt-3">
                <button type="sumbit" 
                disabled={isSubmitting}
                className={`p-3  text-white text-md font-bold rounded-md  ${(isSubmitting === true) ? 'bg-gray-600' : 'bg-red-600 hover:text-red-600 hover:bg-red-900'}`}
                onClick={SubmitObjectiveTest}
                >
                    SUBMIT
                </button>
            </div>
          }



          <div className="p-5"></div>

        </div>
    </>
  );
}

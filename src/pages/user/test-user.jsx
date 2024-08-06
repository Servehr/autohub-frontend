
import { useEffect, useReducer, useState } from "react";
import { setUserNewEmail } from "@/apis/auth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { BeatLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useQuery } from "react-query";
import { TestQuestions } from "@/apis/backend/course";
import { appStore } from "@/state/appState";


export default function TestUser() 
{
  const navigate = useNavigate();
  const [isUser, setIsUser] = useState("-1")

  return (
    <>
      <Helmet>
        <title>Test | Autohub</title>
        <meta name="description" content="Sell Faster, Buy Smarter" />
      </Helmet>

      
      <Course />
    </>
  );
}

function Course() 
{
  const advertState = appStore((state) => state)
  const { data, isLoading, refetch, isRefetching } = useQuery(["get-all-questions"], () => TestQuestions(), { cacheTime: 0 })

  if(!isLoading)
  {
      console.log(data)
  }

  const [selectedOptions, setSelectedOptions] = useState([])
  const [courseId, setCourseId] = useState('')
  const [answer, setAnswer] = useState('')
  const [nextQuestion, setNextQuestion] = useState(-1)
  const [, forceUpdate] = useReducer(x => x + 1, 0)

  const [loading, setIsLoading] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [fakeRefresh, setFakeRefresh] = useState(-1)
  const [choosen, setChoosen] = useState(advertState.getSelectedOption())

  const people = [
    {
      "courseId": 1,
      "answer": "b",
      "question": 5,
      "position": 0
    },
    {
      "courseId": 1,
      "answer": "c",
      "question": 6,
      "position": 1
    },
    {
      "courseId": 1,
      "answer": "d",
      "question": 7,
      "position": 2
    },
    {
      "courseId": 1,
      "answer": "a",
      "question": 8,
      "position": 3
    },
    {
      "courseId": 1,
      "answer": "c",
      "question": 9,
      "position": 4
    },
    {
      "courseId": 1,
      "answer": "b",
      "question": 10,
      "position": 5
    },
    {
      "courseId": 1,
      "answer": "d",
      "question": 11,
      "position": 6
    },
    {
      "courseId": 1,
      "answer": "b",
      "question": 13,
      "position": 7
    },
    {
      "courseId": 1,
      "answer": "c",
      "question": 14,
      "position": 8
    },
    {
      "courseId": 1,
      "answer": "a",
      "question": 19,
      "position": 9
    }
  ]
  
  useEffect(() => {
    // console.log(selectedOptions)
      // forceUpdate()
      // console.log(advertState.getSelectedOption()[0]['answer'])
      // console.log(advertState.getSelectedOption())
      // isChecked()
      // setChoosen(advertState.getSelectedOption())
      console.log(advertState.getSelectedOption())
  }, [])
  
  useEffect(() => 
  {      
    //  console.log(advertState.getSelectedOption()[currentQuestion]['answer'])
      isChecked()
  }, [currentQuestion, fakeRefresh])

  const showQuestion = (position) => 
  {
      deselectAll()
      setCurrentQuestion(position)
      console.log(position)      
      // setChoosen([...choosen, question])
      // localStorage.setItem('no', question)
      // refetch()
      console.log(choosen)
      console.log(advertState.getSelectedOption())
  }

  const deselectAll = () => 
  {
      setChoosen(advertState.getSelectedOption())
      let allOptions = document.querySelectorAll('.theOption')
      // console.log(allOptions)
      allOptions.forEach(value => value.checked = false)
  }

  useEffect(() => {
      console.log(selectedOptions)
  }, [selectedOptions, answer, courseId])


  const selectOption = (option, course, question, position) => 
  {
      const checkIfPresent = advertState.getSelectedOption().findIndex(x => {
        return x.position === position;
      });      
      if(checkIfPresent === -1)
      {          
          let answer = { courseId: course, answer: option, question: question, position: position }
          advertState.setSelectedOption(answer)     
          console.log(advertState.getSelectedOption())
      } else {        
          advertState.getSelectedOption().splice(checkIfPresent, 1);
          let answer = { courseId: course, answer: option, question: question, position: position }
          advertState.setSelectedOption(answer)     
          console.log(advertState.getSelectedOption())          
      }
      setCurrentQuestion(position)
      setFakeRefresh(Math.random() * position)
  }

  const isSelected = (id) => 
  {
      // const selectedOptions = selectedOptions.filter((item) => Number(item.make_id) === Number(x))
      // console.log(advertState.getSelectedOption())
      const answeredOption = advertState.getSelectedOption()
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
      // const someone = people.find((p) => p.position === x)
      const someone = people.filter((p) => {
          return p.position !== x
      })
      if(someone === undefined)
      {
         alert("Undefined")
      } else {        
        // alert(someone.answer)
      }
      console.log(someone)
  }

  const isChecked = () => 
  {
      let checkedValue;
      const theChoosen = advertState.getSelectedOption()
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
          checkedValue = x.answer
        }
      }      
      return checkedValue
  }
  
  return (
    <>

      
      <div className="mb-2 text-white cursor-pointer grid grid-cols-12 justify-between rounded-lg"
      >          
        <div className="font-bold text-xl mb-4 text-green-700 mt-28 md:mt-0 p-3 bg-green-100 col-span-10">Course: Artificial Intelligence</div> 
        <div className="font-bold text-sm mb-4 text-green-700 mt-28 md:mt-0 p-3 bg-red-700 hover:bg-red-900 hover:text-red-600 rounded-lg text-white flex justify-center items-center col-span-2 p-3">SUBMIT</div> 
      </div>
      <div
        className="grid md:grid-cols-12 md:bg-transparent bg-white md:p-0 p-5 grid-cols-12 justify-center items-center gap-5 pb-1"
      >
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
                !isLoading && isRefetching && (data.length === 0) && <div className="col-span-12 h-[500px] flex justify-center items-center border border-3 border-shadow border-green-200 bg-[#f5fbf7]" style={{ marginTop: '30px', paddingTop: '20px' }}>
                    <h1 className="font-bold">
                        No course created yet
                    </h1>
                </div>
              }

              { !isLoading && !isRefetching &&
                  
                  <div className="w-full text-lg">
                      <span className="font-bold text-blue-700 pr-5 text-md" style={{ fontSize: '15px' }}>Question {currentQuestion+1} of {data?.length}</span>
                  </div>
              }
              { !isLoading && !isRefetching && (data?.length > 0) &&
                 <div className="w-full mb-1">
                      <div className="d-flex -mb-3 col-span-12 py-1">
                          {/* <h1 className="font-bold -mb-1 ml-1">Question: {((data?.length))}</h1> */}
                          <div className="p-5 shadow-md bg-white border border-2 border-green-200 my-2">
                             
                            <h1 className="w-full font-bold text-blue-900 mb-4">{data[currentQuestion]['question']}</h1>
                            <div className="flex mt-2 justify-left space-between-5 mb-3">
                                <div className="p-1 font-bold text-blue-300">(a)</div>
                                <input type="radio"
                                                // defaultChecked={true}
                                                // defaultChecked={(isChecked() === 'a') ? true : false}
                                                onChange={ (e) => selectOption(e.target.value, data[currentQuestion]['course_id'], data[currentQuestion]['id'], currentQuestion) }
                                                className="peer relative appearance-none w-5 h-5
                                                            border border-red-400 border-2
                                                            cursor-pointer rounded-full
                                                            checked:bg-blue-600 mt-1 ml-3 mr-1 theOption"
                                                      id="theOption1" name="theOption1" value={'a'}
                                                      checked={(isChecked() === 'a') ? true : false }
                                          /> 
                                <div className="p-1 text-lg -mt-1">{data[currentQuestion]['option_a']}</div>
                            </div>
                            <div className="flex mt-2 justify-left space-between-5 mb-3">
                                <div className="p-1 font-bold text-blue-300">(b)</div>
                                <input type="radio"
                                                // defaultChecked={false}
                                                // defaultChecked={(isChecked() === 'b') ? true : false }
                                                onChange={ (e) => selectOption(e.target.value, data[currentQuestion]['course_id'], data[currentQuestion]['id'], currentQuestion) }
                                                className="peer relative appearance-none w-5 h-5
                                                            border border-red-400 border-2
                                                            cursor-pointer rounded-full
                                                            checked:bg-blue-600 mt-1 ml-3 mr-1 theOption"
                                                      id="theOption2" name="theOption2" value={'b'}
                                                      checked={(isChecked() === 'b') ? true : false }
                                          /> 
                                <div className="p-1 text-lg -mt-1">{data[currentQuestion]['option_b']}</div>
                            </div>
                            <div className="flex mt-2 justify-left space-between-5 mb-3">
                                <div className="p-1 font-bold text-blue-300">(c)</div>
                                <input type="radio"                                 
                                                // defaultChecked={false}    
                                                defaultChecked={(isChecked() === 'c') ? true : false }           
                                                onChange={ (e) => selectOption(e.target.value, data[currentQuestion]['course_id'], data[currentQuestion]['id'], currentQuestion) }
                                                className="peer relative appearance-none w-5 h-5
                                                            border border-red-400 border-2
                                                            cursor-pointer rounded-full
                                                            checked:bg-blue-600 mt-1 ml-3 mr-1 theOption"
                                                      id="theOption3" name="theOption3" value={'c'}
                                                      checked={(isChecked() === 'c') ? true : false }
                                          /> 
                                <div className="p-1 text-lg -mt-1">{data[currentQuestion]['option_c']}</div>
                            </div>
                            <div className="flex mt-2 justify-left space-between-5 mb-3">
                               <div className="p-1 font-bold text-blue-300">(d)</div>
                                <input type="radio"
                                                // defaultChecked={false}
                                                defaultChecked={(isChecked() === 'd') ? true : false }
                                                onChange={ (e) => selectOption(e.target.value, data[currentQuestion]['course_id'], data[currentQuestion]['id'], currentQuestion) }
                                                className="peer relative appearance-none w-5 h-5
                                                            border border-red-400 border-2
                                                            cursor-pointer rounded-full
                                                            checked:bg-blue-600 mt-1 ml-3 mr-1 theOption"
                                                      id="theOption4" name="theOption4" value={'d'}
                                                      checked={(isChecked() === 'd') ? true : false }
                                          /> 
                               <div className="p-1 text-lg -mt-1">{data[currentQuestion]['option_d']}</div>
                            </div>
                        </div>
                      </div>          
                </div>
              }

              
          <div className="col-span-12 flex justify-center items-center mx-auto px-4 mt-1">
            <nav className="flex flex-row flex-nowrap justify-between md:justify-center items-center overflow-auto overflow-y-scroll py-10" aria-label="Pagination">
              {
                  /* <a className="md:flex sm:col-span-1 w-fit h-10 mx-1 justify-center items-center px-2 text-black hover:text-green-800 hover:font-bold" href="#" title="Page 1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="green" class="w-4 h-4 font-bold">
                      <path fill-rule="evenodd" d="M10.72 11.47a.75.75 0 0 0 0 1.06l7.5 7.5a.75.75 0 1 0 1.06-1.06L12.31 12l6.97-6.97a.75.75 0 0 0-1.06-1.06l-7.5 7.5Z" clip-rule="evenodd" />
                      <path fill-rule="evenodd" d="M4.72 11.47a.75.75 0 0 0 0 1.06l7.5 7.5a.75.75 0 1 0 1.06-1.06L6.31 12l6.97-6.97a.75.75 0 0 0-1.06-1.06l-7.5 7.5Z" clip-rule="evenodd" />
                    </svg>
                    Previous
                  </a> */
              } 
              {                  
                  data?.map((num, index) => {
                    // console.log(index)
                    // console.log(advertState.getSelectedOption())
                    const isAnswered = (isSelected(index) === "yes") ? "bg-green-700 border border-solid border-green-700" : "bg-white-600"
                    const currentAnswer = (currentQuestion === index) ? "bg-green-400 text-white text-green-500 disabled" : `${isAnswered} border border-gray-700 cursor-pointer hover:border-gray-300 hover:bg-green-800 hover:text-white`
                    const style = `${currentAnswer} md:flex py-1 px-3 mx-1 justify-center items-center rounded-full font-bold text-black` 
                    return (
                      <a className={style} title="Page 1" onClick={() => showQuestion(index)}>
                        {index+1}
                      </a>  
                    )
                  })
              }
          {
              /* <a className="md:flex w-fit h-10 mx-1 justify-center items-center px-2 text-black hover:text-green-800 hover:font-bold" href="#" title="Page 1">
                    Next
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="green" class="w-4 h-4 font-bold">
                      <path fill-rule="evenodd" d="M13.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L11.69 12 4.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clip-rule="evenodd" />
                      <path fill-rule="evenodd" d="M19.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06L17.69 12l-6.97-6.97a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clip-rule="evenodd" />
                    </svg>
                  </a> 
              */
              }
            </nav>
          </div>

          <div className="col-span-12 flex justify-center items-center mx-auto px-4 mt-3">
              <button type="sumbit" className="p-3 bg-red-600 text-white text-md font-bold hover:bg-red-900 rounded-md hover:text-red-600"
              >
                  SUBMIT
              </button>
          </div>



          <div className="p-5"></div>

          </div>
       </div>

    </>
  );
}

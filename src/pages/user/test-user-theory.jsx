
import { useEffect, useState } from "react";
import { setUserNewEmail } from "@/apis/auth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { BeatLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useQuery } from "react-query";
import { TestCourseTheoryQuestions, TestQuestions } from "@/apis/backend/course";


export default function TestUserTheory() 
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
  const { data, isLoading, refetch, isRefetching } = useQuery(["get-all-questions"], () => TestCourseTheoryQuestions(12), { cacheTime: 0 })

  if(!isLoading)
  {
      console.log(data)
  }

  const [loading, setIsLoading] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [theQuestion, setTheQuestion] = useState(0)

  const showQuestion = (question) => 
  {
      setCurrentQuestion(question)
  }

  const Questions = [
      { id: 1, question: "Artificial Intelligence is about_____", options: [ 'Playing a game on Computer', 'Making a machine Intelligent', 'Programming on Machine with your Own Intelligence',
                                                                              'Putting your intelligence in Machine',
                                                                          ] 
      },
      { id: 1, question: "Who is known as the -Father of AI?", options: [ 'Fisher Ada', 'Alan Turing', 'John McCarthy', 'Allen Newell' ]  },
      { id: 3, question: "Select the most appropriate situation for that a blind search can be used", options: [ 'Real-life situation', 'Small Search Space', 'Complex game', 'All of the above' ]  },
      { id: 4, question: "If a robot is able to change its own trajectory as per the external conditions, then the robot is considered as the__", options: [ 'Mobile', 'Non-Servo', 'Open Loop', 'Intelligent' ]  },
      { id: 5, question: "Which algorithm is used in the Game tree to make decisions of Win/Lose?", options: [ 'Heuristic Search Algorithm', 'DFS/BFS algorithm', 'Greedy Search Algorithm', 'Min/Max algorithm' ]  },
  ]
  
  return (
    <>
      <div
        className="grid md:grid-cols-12 md:bg-transparent bg-white md:p-0 p-5 grid-cols-12 justify-center items-center gap-5 pb-20"
      >
          <div className="col-span-12">
              {
                isLoading && <div className="col-span-12 h-[300px] flex justify-center items-center" style={{ marginTop: '30px', paddingTop: '20px' }}>
                    <BeatLoader color="#1c9236" />
                </div>
              }
              {
                !isLoading && (data?.data?.length === 0) && <div className="col-span-12 h-[500px] flex justify-center items-center border border-3 border-shadow border-green-200 bg-[#f5fbf7]" style={{ marginTop: '30px', paddingTop: '20px' }}>
                    <h1 className="font-bold">
                        No course created yet
                    </h1>
                </div>
              }

              { !isLoading && (data?.data?.length > 0) &&
                 <div className="w-full mb-5">
                      <div className="font-bold text-xl mb-4 text-green-700 mt-28 md:mt-0 p-3 bg-green-100">{data?.plus}</div> 

                      <div className="d-flex -mb-3 col-span-12 p-3">
                            <span className="w-full font-bold text-blue-700 pr-5 text-md uppercase" style={{ fontSize: '15px' }}>Question {currentQuestion+1} of {data?.data?.length}</span>
                             
                            <h1 className="w-full font-bold text-blue-900 mt-10 shadow-md px-2 py-4 border border-3 border-gray-300">{data?.data[currentQuestion]['question']}</h1>

                            <div className="flex flex-wrap -m-2 mt-4 mb-2 px-2">
                                <textarea onChange={(e) => { 
                                    setTheQuestion(e.target.value)                                                                                
                                  } } defaultValue={''} 
                                  className="shadow form-textarea mb-2 block w-full border rounded w-full 
                                  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                  rows="6" 
                                  placeholder="Enter Answer Here"
                                >
                                </textarea>
                            </div>
                      </div>          
                </div>
              }

              
          <div className="col-span-12 flex justify-center items-center mx-auto px-4 mt-10">
            <nav className="flex flex-row flex-nowrap justify-between md:justify-center items-center overflow-auto overflow-y-scroll py-10" aria-label="Pagination">
              {/* <a className="md:flex sm:col-span-1 w-fit h-10 mx-1 justify-center items-center px-2 text-black hover:text-green-800 hover:font-bold" href="#" title="Page 1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="green" class="w-4 h-4 font-bold">
                  <path fill-rule="evenodd" d="M10.72 11.47a.75.75 0 0 0 0 1.06l7.5 7.5a.75.75 0 1 0 1.06-1.06L12.31 12l6.97-6.97a.75.75 0 0 0-1.06-1.06l-7.5 7.5Z" clip-rule="evenodd" />
                  <path fill-rule="evenodd" d="M4.72 11.47a.75.75 0 0 0 0 1.06l7.5 7.5a.75.75 0 1 0 1.06-1.06L6.31 12l6.97-6.97a.75.75 0 0 0-1.06-1.06l-7.5 7.5Z" clip-rule="evenodd" />
                </svg>
                Previous
              </a> */} 
              {                  
                  data?.data?.map((num, index) => {
                    const currentAnswer = (currentQuestion === index) ? "bg-blue-700 text-white text-green-500 disabled" : "bg-white border border-gray-700 cursor-pointer hover:border-gray-300 hover:bg-green-800 hover:text-white"
                    const style = `${currentAnswer} md:flex py-1 px-3 mx-1 justify-center items-center rounded-full font-bold text-black` 
                    return (
                      <a className={style} title="Page 1" onClick={() => showQuestion(index)}>
                        {index+1}
                      </a>  
                    )
                  })
              }
              {/* <a className="md:flex w-fit h-10 mx-1 justify-center items-center px-2 text-black hover:text-green-800 hover:font-bold" href="#" title="Page 1">
                Next
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="green" class="w-4 h-4 font-bold">
                  <path fill-rule="evenodd" d="M13.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L11.69 12 4.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clip-rule="evenodd" />
                  <path fill-rule="evenodd" d="M19.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06L17.69 12l-6.97-6.97a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clip-rule="evenodd" />
                </svg>
              </a> */}
            </nav>
          </div>

              
{/* <div className="flex py-3">       
                                          <input type="radio"
                                                className="peer relative appearance-none w-5 h-5
                                                            border border-red-400 border-2
                                                            cursor-pointer rounded-full
                                                            checked:bg-blue-600 mt-1"
                                                      id="circular-checkbox" name="testing-user"
                                          />                                          
                                          <div className="w-9/12"><span className="w-fit pl-5 pr-3">{index+1}. </span>{option}</div>
                                      </div> */}
          </div>
          {/* <div className="col-span-12 flex justify-center items-center mx-auto px-4 mt-10">
            <nav className="flex  flex-row flex-nowrap justify-between md:justify-center items-center" aria-label="Pagination">
              <a className="md:flex sm:col-span-1 w-fit h-10 mx-1 justify-center items-center px-2 text-black hover:text-green-800 hover:font-bold" href="#" title="Page 1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="green" class="w-4 h-4 font-bold">
                  <path fill-rule="evenodd" d="M10.72 11.47a.75.75 0 0 0 0 1.06l7.5 7.5a.75.75 0 1 0 1.06-1.06L12.31 12l6.97-6.97a.75.75 0 0 0-1.06-1.06l-7.5 7.5Z" clip-rule="evenodd" />
                  <path fill-rule="evenodd" d="M4.72 11.47a.75.75 0 0 0 0 1.06l7.5 7.5a.75.75 0 1 0 1.06-1.06L6.31 12l6.97-6.97a.75.75 0 0 0-1.06-1.06l-7.5 7.5Z" clip-rule="evenodd" />
                </svg>
                Previous
              </a>
              <a className="md:flex w-7 h-7 mx-1 justify-center items-center rounded-full border border-gray-700 bg-white text-black hover:border-gray-300 hover:bg-green-800 hover:text-white" href="#" title="Page 1">
                  1
              </a>
              <a className="md:flex w-7 h-7 mx-1 justify-center items-center rounded-full border border-gray-700 bg-white text-black hover:border-gray-300 hover:bg-green-800 hover:text-white" href="#" title="Page 2">
                  2
              </a>
              <a className="md:flex w-7 h-7 mx-1 justify-center items-center rounded-full border border-black bg-black text-white pointer-events-none" href="#" aria-current="page" title="Page 3">
                  3
              </a>
              <a className="md:flex w-7 h-7 mx-1 justify-center items-center rounded-full border border-gray-700 bg-white text-black hover:border-gray-300 hover:bg-green-800 hover:text-white" href="#" title="Page 4">
                  4
              </a>
              <a className="md:flex w-7 h-7 mx-1 justify-center items-center rounded-full border border-gray-700 bg-white text-black hover:border-gray-300 hover:bg-green-800 hover:text-white" href="#" title="Page 5">
                  5
              </a>
              <a className="md:flex w-7 h-7 mx-1 justify-center items-center rounded-full border border-gray-700 bg-white text-black hover:border-gray-300 hover:bg-green-800 hover:text-white" href="#" title="Page 4">
                  6
              </a>
              <a className="md:flex w-7 h-7 mx-1 justify-center items-center rounded-full border border-gray-700 bg-white text-black hover:border-gray-300 hover:bg-green-800 hover:text-white" href="#" title="Page 5">
                  7
              </a>
              <a className="md:flex w-7 h-7 mx-1 justify-center items-center rounded-full border border-gray-700 bg-white text-black hover:border-gray-300 hover:bg-green-800 hover:text-white" href="#" title="Page 5">
                  8
              </a>
              <a className="md:flex w-7 h-7 mx-1 justify-center items-center rounded-full border border-gray-700 bg-white text-black hover:border-gray-300 hover:bg-green-800 hover:text-white" href="#" title="Page 4">
                  9
              </a>
              <a className="md:flex w-7 h-7 mx-1 justify-center items-center rounded-full border border-gray-700 bg-white text-black hover:border-gray-300 hover:bg-green-800 hover:text-white" href="#" title="Page 1">
                  10
              </a>
              <a className="md:flex w-fit h-10 mx-1 justify-center items-center px-2 text-black hover:text-green-800 hover:font-bold" href="#" title="Page 1">
                Next
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="green" class="w-4 h-4 font-bold">
                  <path fill-rule="evenodd" d="M13.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L11.69 12 4.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clip-rule="evenodd" />
                  <path fill-rule="evenodd" d="M19.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06L17.69 12l-6.97-6.97a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clip-rule="evenodd" />
                </svg>
              </a>
            </nav>
          </div> */}

          <div className="p-5"></div>

      </div>

    </>
  );
}

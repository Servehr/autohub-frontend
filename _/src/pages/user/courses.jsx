
import { useEffect, useState } from "react";
import { setUserNewEmail } from "@/apis/auth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { BeatLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FormCode } from "@/components/FormCode";


export default function Courses() 
{
  const navigate = useNavigate();
  const [isUser, setIsUser] = useState("-1")

  return (
    <>
      <Helmet>
        <title>Change Email | Autohub</title>
        <meta name="description" content="Sell Faster, Buy Smarter" />
      </Helmet>

      
      <Course />
    </>
  );
}

function Course() 
{

  const [downloadForm, setDownloadForm] = useState(false)

  const info = [
    { id: 'course-a', name: 'General Knowledge On Vehicle Management', nos: 34 },
    { id: 'course-b', name: 'Car Dealings (Sales and Purchase)', nos: 13 },
    { id: 'course-c', name: 'Repairs And Maintenance', nos: 20 },
    { id: 'course-d', name: 'Visit to Automobile Plant (Innoson)', nos: 5 },
    { id: 'course-e', name: 'Car Auctioning', nos: 5 },
    { id: 'course-f', name: 'Active', nos: 5 },
    { id: 'course-g', name: 'Enrollment', nos: 2 },
    { id: 'course-h', name: 'Product Views', nos: 20 },
    { id: 'course-i', name: 'Profile Views', nos: 5 },
  ]
  
  return (
    <div className="px-3 mb-3">
        <div className="font-bold text-xl mb-5 text-blue-700 mt-28 md:mt-0">MACEOS ACADEMY COURSES</div> 
        <div
          className="grid md:grid-cols-12 grid-cols-12 justify-center items-center gap-5"
          >
              {/* <span className="col-span-12 font-bold text-green-800 mb-3">MACEOS ACADEMY COURSES: </span> */}
              <span className="col-span-12 font-bold text-red-800 text-sm -mt-3 mb-3">Download Course</span>
              {/* <p className="mb-4 col-span-12 ">Below are the courses we offer. Browse through for your kind perusal; from the main courses to sub-courses and modules.</p> */}

               {
                      info.map((x) => {
                                return (
                                        <div
                                          onClick={() => setDownloadForm(true)}
                                          className="text-md text-left col-span-4 px-2 py-2 mb-3 justify-center w-full font-bold cursor-pointer 
                                                    text-black gap-2 bg-white 
                                                    ring-2 ring-blue-100 hover:bg-green-100 rounded-lg px-1 border border-solid 
                                                    border-blue-400 flex justify-between px-5"
                                        >
                                            {x.name}
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" className="w-4 h-4">
                                              <path fill-rule="evenodd" d="M12 2.25a.75.75 0 0 1 .75.75v11.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.22 3.22V3a.75.75 0 0 1 .75-.75Zm-9 13.5a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z" clip-rule="evenodd" />
                                            </svg>
                                        </div>
                                      )
                              })
                  }
                    
        </div>
        <div className="p-5"></div>


        <FormCode onClick={() => setDownloadForm(false) } downloadForm={downloadForm} message={''} />
    </div>
  );
}

import { useEffect, useState } from "react";
import * as yup from "yup";
import { BeatLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FormCode } from "@/components/FormCode";
import { AllCourse, DownloadDocument } from "@/apis/backend/course";
import { useQuery } from "react-query";
import axios_instance, { BASE_URL } from "@/lib/axios";
import axios from "axios";

export const downloadPdfFile = async (id) =>
{
    await axios_instance.get(`${BASE_URL}download-document/${id}`, {responseType: 'blob'})
    .then((response) => 
    {  
        window.open(URL.createObjectURL(response.data));
    }).catch((error) => {                      
       return false;
    })
}

export default function AllCourses() 
{
  
  const { data, isLoading, refetch, isRefetching } = useQuery([`get-courses`], () => AllCourse(), { refetchOnWindowFocus: true, cacheTime: 0 })
  const [downloadForm, setDownloadForm] = useState(false)

  useEffect(() => {

  }, [downloadForm])

  const downloadDocument = (id) => 
  {
      DownloadDocument(id)
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));

        // Create a link element to simulate a click on it
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "file.pdf"); // Set the desired filename
  
        document.body.appendChild(link);
        link.click();
  
        // Clean up the temporary URL and link element
        URL.revokeObjectURL(url);
        document.body.removeChild(link);
      })
      .catch((error) => {

      })
  }

  

  const downloadPdfFiles = async () => 
  {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', `${BASE_URL}download-document/${id}`, true);
    xhr.responseType = 'arraybuffer';
    xhr.onload = function(e) {
       if (this.status == 200) {
          var blob=new Blob([this.response], {type:"application/pdf"});
          var link=document.createElement('a');
          link.href=window.URL.createObjectURL(blob);
          link.download="Report_"+new Date()+".pdf";
          link.click();
       }
    };
  xhr.send();
}

  
  return (
    <>
        {/* <span className="col-span-12 font-bold text-green-800 mb-3">MACEOS ACADEMY COURSES: </span> */}
              {/* <p className="mb-4 col-span-12 ">Below are the courses we offer. Browse through for your kind perusal; from the main courses to sub-courses and modules.</p> */}
              {
                  (data?.data?.length === 0) && <div className="col-span-12 h-[500px] flex justify-center items-center border border-3 border-shadow border-green-200 bg-[#f5fbf7]" style={{ marginTop: '30px', paddingTop: '20px' }}>
                      <h1 className="font-bold">
                          No course created yet
                      </h1>
                  </div>
                }
                {
                    (data?.data?.length > 0) && < div className="col-span-12">                      
                      <div className="font-bold text-xl mb-5 text-blue-700 mt-28 md:mt-0">MACEOS ACADEMY COURSES</div> 
                      <span className="col-span-12 font-bold text-red-800 text-sm -mt-3 mb-3">Download Course</span>
                    </div>
                }
                {
                    (data?.data?.length > 0) && data?.data?.map((x) => {
                                let hasFile = (x.file_name != null) ? "cursor-pointer" : ""
                                return (
                                        <button
                                          disabled={(x.file_name === null) ? true : false}
                                          onClick={(e) => { 
                                              downloadPdfFile(x.id) 
                                          }}
                                          className={`text-md text-left md:col-span-4 col-span-12 px-2 py-2 mb-1 justify-center w-full font-bold  
                                                    text-black gap-2 ${hasFile}
                                                    ring-2 ring-blue-100 hover:bg-green-100 rounded-lg px-1 border border-solid 
                                                    border-blue-400 flex justify-between px-5 ${(x.downloadable === 'yes') ? 'bg-green-500 text-white hover:bg-green-800' : ''}`}
                                        >
                                            {x.name}
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" className="w-4 h-4">
                                              <path fill-rule="evenodd" d="M12 2.25a.75.75 0 0 1 .75.75v11.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.22 3.22V3a.75.75 0 0 1 .75-.75Zm-9 13.5a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z" clip-rule="evenodd" />
                                            </svg>
                                        </button>
                                      )
                              })
                  }
        <div className="p-5"></div>


        {/* <FormCode onClick={() => setDownloadForm(false) } downloadForm={downloadForm} message={''} /> */}
    </>
  );
}

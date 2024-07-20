import MaxWidthWrapper from "@/components/max-width-wrapper";
import { useQuery } from "react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { formatDate } from "@/utils/ad";
import currencyFormatter from "@/utils/currency-formatter";
import useUser from "@/hooks/useUser";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import swapCar from "@/assets/swap-car.png";
import { CoursesPreview } from "@/components/CoursesPreview";


export default function MaceoWelcome() 
{
    const navigate = useNavigate();

    const [selectedCourse, setSelectedCourse] = useState(-1)
    const [selectedsubCourse, setSelectedSubCourse] = useState(-1)
    const [subCourseList, setSubCourseList] = useState([])
    const [showTooltip, setShowTooltip] = useState(false)
    const [courseName, setCourseName] = useState('')
    const [courseId, setCourseId] = useState('')

    useEffect(() => {
        // setSelectedCourse(selectedCourse)
    }, [subCourseList])

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

    const courses = [
        { id: "course-a", name: "Course A" },
        { id: "course-b", name: "Course B" },
        { id: "course-c", name: "Course C" },
        { id: "course-d", name: "Course D" },
        { id: "course-e", name: "Course E" },
        { id: "course-f", name: "Course F" },
        { id: "course-g", name: "Course G" },
        { id: "course-h", name: "Course H" },
        { id: "course-i", name: "Course I" },
    ]

    const subCourses = [
        { courseId: "course-a", name: [{ id: 1, module: "Course A-AA"}, { id: 2, module: "Course A-AB"}, { id: 3, module: "Course A-AC" }, { id: 4, module: "Course A-AD"} ] },
        { courseId: "course-b", name: [{ id: 4, module: "Course B-BB"}, { id: 5, module: "Course B-BC"}] },
        { courseId: "course-c", name: [{ id: 6, module: "Course C-CA"}] },
        { courseId: "course-d", name: [{ id: 7, module: "Course D-DA"}] },
        { courseId: "course-e", name: [{ id: 8, module: "Course E-EA"}, { id: 9, module: "Course E-EB"}] },
        { courseId: "course-f", name: [{ id: 10, module: "Course F-FA"}, { id: 11, module: "Course F-FB"}, { id: 12, module: "Course F-AC"}] },
        { courseId: "course-g", name: [{ id: 13, module: "Course G-GA"}, { id: 14, module: "Course G-GB"}, { id: 15, module: "Course G-AC"}] },
        { courseId: "course-h", name: [{ id: 16, module: "Course H-HA"}] },
        { courseId: "course-i", name: [{ id: 17, module: "Course I-IA"}, { id: 18, module: "Course I-IB"}] },
    ]

    const theSubCourse = (course) => {
        const subCourse = subCourses.filter((x) => x.courseId === course)
        setSubCourseList(subCourse[0].name)
        console.log(subCourse[0].name)
    }

    const modules= {
        1: ["Module 1", "Module 2"],
        2: ["Module 3", "Module 4"],
        3: ["Module 5", "Module 6"],
        4: ["Module 7", "Module 8"],
        5: ["Module 9", "Module 10"],
        6: ["Module 11", "Module 12"],
        7: ["Module 13", "Module 14"],
        8: ["Module 15", "Module 16"],
        9: ["Module 17", "Module 18"],
        10: ["Module 19", "Module 20"],
        11: ["Module 21", "Module 22"],
        12: ["Module 23", "Module 24"],
        13: ["Module 25", "Module 26"],
        14: ["Module 27", "Module 28"],
        15: ["Module 29", "Module 30"],
        16: ["Module 31", "Module 32"],
        17: ["Module 33", "Module 34"],
        18: ["Module 35", "Module 36"],
    }

    return (
        <>
            <Helmet>
              <title> | Autohub</title>
               <meta
                  name="description"
                  content={"The Home For Automobiles"}
                />
              </Helmet>

              {/* <Header /> */}

              <main className="px-1 pt-5 border border-2">
                <MaxWidthWrapper>
                        <div className="grid grid-cols-12 gap-4 mb-10">
                                <div className="col-span-12 md:col-span-9 h-full bg-white ">
                                        <div class="bg-white p-6 rounded shadow-xl">
                                            <div className="items-center">
                                                <h1 className="font-bold uppercase mb-5 mr-10 w-full text-blue-900" style={{fontSize: "30px"}}>MACEOS ACADEMY</h1>
                                                <p className="mb-5 w-full text-md font-bold text-green-800">ABOUT MACEOS ACADEMY.</p>
                                                <p className="text-md -mt-2">
                                                    MACEOS Academy is a global automobile academic programme that is loaded with a curriculum that is feasible and prolific. We recommend that everyone who is in the automobile industry enrols for our Academy and such a person’s life will never be the same. We also recommend our Academy to those who are not into the automobile industry because the courses therein have the potential to change the state of any business exponentially.
                                                </p>
                                                <p className="text-md mt-3">
                                                    MACEOS  stands for Modern Automobile CEOs. It’s a programme poised at educating, funding and providing sales platforms to automobile intending and established CEOs. 
                                                    To harness and propel the automobile industry, we must raise great individuals who are experienced and passionate about changing the industry in the areas of innovation, utilization, modernization and expansion. As a wake-up call, we are equipping intending and established automobile CEOs to be contemporary, innovative and successful.
                                                </p>
                                                <p className="text-md mt-3">
                                                    The automobile industry is the wealthiest and most futuristic industry in the world, and it will maintain this status as long as man exists. The industry cuts across automotive, aviation, maritime, artificial intelligence and space exploration. 
                                                </p>
                                                <p className="text-md mt-3">
                                                    We are delighted to present to you the opportunities that our MACEOS program avails especially the Academic aspect. Our Academy is a game-changer! Our Academy teaches you everything you need to become successful in any field of your choice in the automobile industry. 
                                                </p>
                                                <p className="text-md mt-3">
                                                    We have invested years of hard work to come up with the type of course materials that we have in our Academy. We discovered through a narrow lens that for the automobile industry to thrive in Africa with incredible innovations, there is a need for the education of personnel who have an interest in the industry. 
                                                    This education is not for engineering nor the invention of automotive products, rather, it’s to equip students to understand the business in the industry, the innovative diversity, opportunities therein, management and how futuristic. Meanwhile, we will teach students the elementary aspects of automobile engineering and other related automobile inventions.
                                                </p>
                                                <p className="text-md mt-3">
                                                    Our Academy will open your eyes to see the different types of businesses in the industry, the need for you to be established as a CEO managing a particular field in the industry, the economic and scientific position of the automobile industry in the world economy today and what it requires to be a successful CEO.                                                     
                                                </p>
                                                <p className="text-md mt-10 font-bold text-lg text-green-800 mb-2">HOW MACEOS ACADEMY WORKS</p>
                                                <p className="font-bold text-md underline text-red-700 indent">Static Section </p>
                                                <p className="text-md mt-3 mb-5">
                                                    MACEOS Academy has static and dynamic sections. The static section works with the standard curriculum. To put it differently, the static section maintains the six-months academic section and follows up on the timetable. 
                                                    <br />We have nine courses in total with each having sub-courses, and sub-courses, modules. Each course lasts for two weeks which brings it to a total of 18 weeks (four months, two weeks). The remaining six weeks are for four weeks of live lectures and interactions, and two weeks for examinations.
                                                    <br />The first step that a student will take is to apply for admission into the Academy. After the application, we will review it and grant you admission upon qualification. This comes after we must have confirmed the payment of your admission fee.
                                                </p>
                                                <p className="font-bold text-md underline text-red-700 indent">Dynamic Section </p>
                                                <p className="text-md mt-3">
                                                    Dynamic Section is not fixed. We made this available for those who might not meet up with our academic timetable. As the name applies, the dynamic section allows a student to determine when he or she will graduate. It allows the student to choose when to demand for course materials, tutor mark assignments (TMA), and examinations. 
                                                    However, dynamic section cannot exceed two years. We shall rusticate any student that exceeds two years under dynamic section. 
                                                </p>
                                                <p className="font-bold text-md mt-10 indent">Our Courses</p>
                                                <p className="text-md mt-3 mb-5">
                                                    Our courses are an output of years of handwork and practical research in the automobile industry, covering automotive, aviation, maritime, artificial intelligence and space exploration. 
                                                    <br/>Our courses are practical, revelatory and highly futuristic. You can browse below to go through our courses, sub-courses and modules. 
                                                </p>
                                                <p className="font-bold text-md mt-10 indent">Admission Process</p>
                                                <p className="text-md mt-3 mb-5">
                                                    After you have gone through our preamble and other information and you are satisfied and willing to enrol for MACEOS Academy, fill out the form by providing truthfully your information as required. When you are through filling out the form, click on “submit”. Then pay your registration fees and we will confirm your payment and act accordingly.
                                                    <br />
                                                    After you have gained admission into our life-changing Academy, the next step would be for you to make payment for your tuition fees. When the payment of your tuition fees is confirmed, you will be contacted by your Academy Supervisor, who will see you through the academic section. After which, a code will be sent to you which you would use to access your courses. 
                                                </p>
                                                <p className="font-bold text-md mt-10 indent">Accessing  Courses</p>
                                                <p className="text-md mt-3 mb-5">
                                                    You can only access one course at a time. The reason is that we want to make sure that you understand a course you have read and take an online test for it before you can be allowed to access the next course. We want to equip you optimally, and we want to ascertain that you thrive as a CEO in the automobile industry.
                                                    <br />
                                                    You shall take tutor-marked assignment (TMA) on every course and examinations on all courses. During your academic period, you shall have at least two times live-lectures and interactions, although, this is optional. However, it’s important.  
                                                </p>
                                                <p className="font-bold text-md mt-10 indent">Graduation</p>
                                                <p className="text-md mt-3 mb-5">
                                                    After the academic section, you will be graduated and we will “STAR” you by your performance and a certificate will be issued to you. Your “STAR” grading and your current business structure guide us on investment recommendations to our awaiting investors. <br />
                                                    After your graduation, we shall contact you for your business branding, funding if required and mentorship.
                                                </p>
                                                <p className="font-bold text-md mt-10 indent">Benefits</p>
                                                <p className="text-md mt-3 mb-5">
                                                    As a graduate of MACEOS ACADEMY, you would automatically join our inter-business community, become our affiliate, qualify to attend our summit, join our excursion, get funds from investors, qualify to  receive advanced lectures, one year of free sales on our website, free interview in our studio, free MACEOS Book and many more.
                                                </p>
                                            </div> 
                                        </div>


                                        <div className="w-full mt-5 py-5 px-5"
                                        >
                                            <h1 className="font-bold mb-4 text-green-800">MACEOS ACADEMY COURSES</h1>
                                            <p className="mb-4">Below are the courses we offer. Browse through for your kind perusal; from the main courses to sub-courses and modules.</p>
                                            <div
                                            className="grid md:grid-cols-12 grid-cols-12 flex justify-center items-center gap-5"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                            }}
                                            >
                                                {
                                                    info.map((x) => {
                                                        return (
                                                        <div
                                                                onMouseEnter={() => {
                                                                    theSubCourse(x.id)
                                                                    setCourseName(x.name)
                                                                    setCourseId(x.id)
                                                                    setShowTooltip(true)
                                                                }}
                                                                onMouseDown={() => setShowTooltip(false)}
                                                                 className="flex text-md text-center px-2 py-3 justify-center w-full font-bold cursor-pointer 
                                                                        text-black md:col-span-4 col-span-6 gap-2 flex justify-center items-center bg-white 
                                                                        ring-2 ring-blue-100 hover:bg-green-100 rounded-lg space-between px-1 border border-solid 
                                                                        border-blue-400"
                                                            >
                                                            {x.name}
                                                        </div>
                                                        )
                                                    })
                                                    
                                                }
                                            </div>

                                            <div className="flex mb-1 mt-5">
                                                <div className="w-1/2 flex justify-item item-center">
                                                    <div type="checkbox" onClick={() => navigate('/maceos-registration') }
                                                        className="peer relative appearance-none text-md text-white px-3 py-3 cursor-pointer bg-green-800 hover:bg-green-600 hover:font-bold rounded-md">Apply</div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="px-20 py-10"></div>
                                    </div>

                                    <div className="col-span-12 md:col-span-3 h-fullbg-white ">                            
                                        <div class="bg-white p-1 rounded shadow-xl item-center">                                
                                            <div className="w-full">
                                                <img src={swapCar} alt=""/>
                                            </div>                             
                                            <div className="w-full p-3"></div>               
                                            {/* <div className="w-full">
                                                <img src={swapCar} alt="" />
                                            </div> */}
                                        </div>
                                    </div>
                    </div>
                </MaxWidthWrapper>
              </main>

                { 
                
                    showTooltip && <CoursesPreview courseName={courseName} onClick={() => {
                        setShowTooltip(false)
                    }} subCourses={subCourseList} modules={modules} courseId={courseId} /> 
                }

        </>
    );
}

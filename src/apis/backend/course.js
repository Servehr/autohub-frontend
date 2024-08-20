import axios_instance from "@/lib/axios";

export async function AddCourse(data) 
{
    return new Promise((resolve, reject) => 
    {
        axios_instance
          .post("create-course", data)
          .then((res) => {
            if (res.data.success === false) {
              reject(res.data.message);
            } else {
              resolve(res.data.data);
            }
          })
          .catch(() => {
            let message = "Something went wrong!";
            reject(new Error(message));
          });
    });
}

export async function AllCourse() 
{
    return new Promise((resolve, reject) => 
    {
        axios_instance
          .get('get-course')
          .then((res) => {
            if (res.data.success === false) {
              reject(res.data.message);
            } else {
              resolve(res.data);
            }
          })
          .catch(() => {
            let message = "Something went wrong!";
            reject(new Error(message));
          });
    });
}
export async function AllCourses() 
{
    return new Promise((resolve, reject) => 
    {
        axios_instance
          .get('get-all-course')
          .then((res) => {
            if (res.data.success === false) {
              reject(res.data.message);
            } else {
              resolve(res.data);
            }
          })
          .catch(() => {
            let message = "Something went wrong!";
            reject(new Error(message));
          });
    });
}

export async function GetAllCourse() 
{
    return new Promise((resolve, reject) => 
    {
        axios_instance
          .get('get-all-course')
          .then((res) => {
            if (res.data.success === false) {
              reject(res.data.message);
            } else {
              resolve(res.data);
            }
          })
          .catch(() => {
            let message = "Something went wrong!";
            reject(new Error(message));
          });
    });
}

export async function UpdateCourse(data) 
{
    return new Promise((resolve, reject) => 
    {
        axios_instance
          .put("update-course", data)
          .then((res) => {
            if (res.data.success === false) {
              reject(res.data.message);
            } else {
              resolve(res.data.data);
            }
          })
          .catch(() => {
            let message = "Something went wrong!";
            reject(new Error(message));
          });
    });
}

export async function DeleteCourse(id) 
{
    return new Promise((resolve, reject) => 
    {
        axios_instance
          .delete(`remove-course/${id}`)
          .then((res) => {
            if (res.data.success === false) {
              reject(res.data.message);
            } else {
              resolve(res.data.data);
            }
          })
          .catch((err) => {
            let message = "Something went wrong!";
            reject(new Error(err));
          });
    });
}

export async function RemoveCourse(data) 
{
    return new Promise((resolve, reject) => 
    {
        axios_instance
          .put("remove-course-material", data)
          .then((res) => {
            if (res.data.success === false) {
              reject(res.data.message);
            } else {
              resolve(res.data.data);
            }
          })
          .catch((err) => {
            let message = "Something went wrong!";
            reject(new Error(err));
          });
    });
}

export async function TestQuestions() 
{
    return new Promise((resolve, reject) => 
    {
        axios_instance
          .get("test-questions")
          .then((res) => {
            if (res.data.success === false) {
              reject(res.data.message);
            } else {
              resolve(res.data);
            }
          })
          .catch((err) => {
            let message = "Something went wrong!";
            reject(new Error(err));
          });
    });
}

export async function TestCourseTheoryQuestions() 
{
    return new Promise((resolve, reject) => 
    {
        axios_instance
          .get(`theory-question`)
          .then((res) => {
            if (res.data.success === false) {
              reject(res.data.message);
            } else {
              resolve(res.data);
            }
          })
          .catch((err) => {
            let message = "Something went wrong!";
            reject(new Error(err));
          });
    });
}

export async function ExamCourseTheoryQuestions() 
{
    return new Promise((resolve, reject) => 
    {
        axios_instance
          .get(`exam-theory-question`)
          .then((res) => {
            if (res.data.success === false) {
              reject(res.data.message);
            } else {
              resolve(res.data);
            }
          })
          .catch((err) => {
            let message = "Something went wrong!";
            reject(new Error(err));
          });
    });
}

export async function ExamCourseObjectiveQuestions() 
{
    return new Promise((resolve, reject) => 
    {
        axios_instance
          .get(`exam-questions`)
          .then((res) => {
            if (res.data.success === false) {
              reject(res.data.message);
            } else {
              resolve(res.data);
            }
          })
          .catch((err) => {
            let message = "Something went wrong!";
            reject(new Error(err));
          });
    });
}

// get-test-questionaires test_questions
export async function getCourseFaq(id) 
{
    return new Promise((resolve, reject) => 
    {
        axios_instance
          .get(`course-faq/${id}`)
          .then((res) => {
            if (res.data.success === false) {
              reject(res.data.message);
            } else {
              resolve(res.data.data);
            }
          })
          .catch((err) => {
            let message = "Something went wrong!";
            reject(new Error(err));
          });
    });
}

export async function AddCourseFaq(data) 
{
    return new Promise((resolve, reject) => 
    {
        axios_instance
          .post(`course-faq/`, {course_id: data.course_id, question: data.question})
          .then((res) => {
            if (res.data.success === false) {
              reject(res.data.message);
            } else {
              resolve(res.data.data);
            }
          })
          .catch((err) => {
            let message = "Something went wrong!";
            reject(new Error(err));
          });
    });
}

export async function UpdateCourseFaq(data) 
{
    return new Promise((resolve, reject) => 
    {
        axios_instance
          .put(`course-faq-update/`, {id: data.id, question: data.question})
          .then((res) => {
            if (res.data.success === false) {
              reject(res.data.message);
            } else {
              resolve(res.data.data);
            }
          })
          .catch((err) => {
            let message = "Something went wrong!";
            reject(new Error(err));
          });
    });
}

export async function RemoveCourseFaq(id) 
{
    return new Promise((resolve, reject) => 
    {
        axios_instance
          .delete(`course-faq/${id}`)
          .then((res) => {
            if (res.data.success === false) {
              reject(res.data.message);
            } else {
              resolve(res.data.data);
            }
          })
          .catch((err) => {
            let message = "Something went wrong!";
            reject(new Error(err));
          });
    });
}

export async function CourseAssessment(id) 
{
    return new Promise((resolve, reject) => 
    {
        axios_instance
          .put(`assessment`, {id : id})
          .then((res) => {
            if (res.data.success === false) {
              reject(res.data.message);
            } else {
              resolve(res.data.data);
            }
          })
          .catch((err) => {
            let message = "Something went wrong!";
            reject(new Error(err));
          });
    });
}

export async function CheckIfUserHasPaid(from) 
{
    return new Promise((resolve, reject) => 
    {
        axios_instance
          .get(`check-if-user-has-paid/${from}`)
          .then((res) => {
              resolve(res.data);
          })
          .catch((err) => {
            let message = "Something went wrong!";
            reject(new Error(err));
          });
    });
}


// get-test-questionaires test_questions
export async function SubmitTestObjective(data) 
{
    return new Promise((resolve, reject) => 
    {
        axios_instance
          .post("submit-test-objective", data)
          .then((res) => {
            if (res.data.success === false) {
              reject(res.data.message);
            } else {
              resolve(res.data.data);
            }
          })
          .catch((err) => {
            let message = "Something went wrong!";
            reject(new Error(err));
          });
    });
}

export async function SubmitTestTheory(data) 
{
    return new Promise((resolve, reject) => 
    {
        axios_instance
          .post(`submit-test-theory`, data)
          .then((res) => {
            if (res.data.success === false) {
              reject(res.data.message);
            } else {
              resolve(res.data.data);
            }
          })
          .catch((err) => {
            let message = "Something went wrong!";
            reject(new Error(err));
          });
    });
}

export async function SubmitExamObjective(data) 
{alert("Hey")
    return new Promise((resolve, reject) => 
    {
        axios_instance
          .post(`submit-exam-objective`, data)
          .then((res) => {
            if (res.data.success === false) {
              reject(res.data.message);
            } else {
              resolve(res.data.data);
            }
          })
          .catch((err) => {
            let message = "Something went wrong!";
            reject(new Error(err));
          });
    });
}

export async function SubmitExamTheory(data) 
{
    return new Promise((resolve, reject) => 
    {
        axios_instance
          .post("submit-exam-theory", data)
          .then((res) => {
            if (res.data.success === false) {
              reject(res.data.message);
            } else {
              resolve(res.data.data);
            }
          })
          .catch((err) => {
            let message = "Something went wrong!";
            reject(new Error(err));
          });
    });
}

export async function UserCourses() 
{
    return new Promise((resolve, reject) => 
    {
        axios_instance
          .get("user-courses")
          .then((res) => {
            if (res.data.success === false) {
              reject(res.data.message);
            } else {
              resolve(res.data.data);
            }
          })
          .catch((err) => {
            let message = "Something went wrong!";
            reject(new Error(err));
          });
    });
}

export async function AllStudent() 
{
    return new Promise((resolve, reject) => 
    {
        axios_instance
          .get("all-student")
          .then((res) => {
            if (res.data.success === false) {
              reject(res.data.message);
            } else {
              resolve(res.data.data);
            }
          })
          .catch((err) => {
            let message = "Something went wrong!";
            reject(new Error(err));
          });
    });
}

export async function UserTestTheoryAnswers(id) 
{
    return new Promise((resolve, reject) => 
    {
        axios_instance
          .get(`test-theory-answer/${id}`)
          .then((res) => {
            if (res.data.success === false) {
              reject(res.data.message);
            } else {
              resolve(res.data.data);
            }
          })
          .catch((err) => {
            let message = "Something went wrong!";
            reject(new Error(err));
          });
    });
}

export async function UserExamTheoryAnswers(id) 
{
    return new Promise((resolve, reject) => 
    {
        axios_instance
          .get(`exam-theory-answer/${id}`)
          .then((res) => {
            if (res.data.success === false) {
              reject(res.data.message);
            } else {
              resolve(res.data.data);
            }
          })
          .catch((err) => {
            let message = "Something went wrong!";
            reject(new Error(err));
          });
    });
}

export async function DownloadDocument(id) 
{
    return new Promise((resolve, reject) => 
    {
        axios_instance
          .get(`download-document/${id}`)
          .then((res) => {
            if (res.data.success === false) {
              reject(res.data.message);
            } else {
              resolve(res);
            }
          })
          .catch((err) => {
            let message = "Something went wrong!";
            reject(new Error(err));
          });
    });
}


export async function ScoreStudentScore(data) 
{
    return new Promise((resolve, reject) => 
    {
        axios_instance
          .post(`test-theory-mark`, { score: data.score, test_theory_question_id: data.questionId, user_id: data.userId })
          .then((res) => {
            if (res.data.success === false) {
              reject(res.data.message);
            } else {
              resolve(res);
            }
          })
          .catch((err) => {
            let message = "Something went wrong!";
            reject(new Error(err));
          });
    });
}

export async function ScoreStudentScoreExam(data) 
{
    return new Promise((resolve, reject) => 
    {
        axios_instance
          .post(`exam-theory-mark`, { score: data.score,  exam_theory_id : Number(data.questionId), user_id: data.userId })
          .then((res) => {
            if (res.data.success === false) {
              reject(res.data.message);
            } else {
              resolve(res);
            }
          })
          .catch((err) => {
            let message = "Something went wrong!";
            reject(new Error(err));
          });
    });
}
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
                console.log(res.data)
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
                console.log(res.data)
              resolve(res.data.data);
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
                console.log(res.data)
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
                console.log(res.data)
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
                console.log(res.data)
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
                console.log(res.data)
              resolve(res.data.data);
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
                console.log(res.data)
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
  console.log(data)
    return new Promise((resolve, reject) => 
    {
        axios_instance
          .post(`course-faq/`, {course_id: data.course_id, question: data.question})
          .then((res) => {
            if (res.data.success === false) {
              reject(res.data.message);
            } else {
                console.log(res.data)
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
                console.log(res.data)
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
  console.log(id)
    return new Promise((resolve, reject) => 
    {
        axios_instance
          .delete(`course-faq/${id}`)
          .then((res) => {
            if (res.data.success === false) {
              reject(res.data.message);
            } else {
                console.log(res.data)
              resolve(res.data.data);
            }
          })
          .catch((err) => {
            let message = "Something went wrong!";
            reject(new Error(err));
          });
    });
}
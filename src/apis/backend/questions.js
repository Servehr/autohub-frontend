import axios_instance from "@/lib/axios";

// test objective
export async function AddTest(data) 
{
    return new Promise((resolve, reject) => 
    {
        axios_instance
          .post("create-test-question", data)
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

export async function AllTest(id) 
{
    return new Promise((resolve, reject) => 
    {
        axios_instance
          .get(`all-test-question/${id}`)
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

export async function UpdateTestQuestion(data) 
{
    return new Promise((resolve, reject) => 
    {
        axios_instance
          .put("update-test-question", data)
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

export async function DeleteTestQuestion(id) 
{
    return new Promise((resolve, reject) => 
    {
        axios_instance
          .delete(`remove-test-question/${id}`)
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


// test-theory
export async function AddTestTheoryQuestion(data) 
{
    return new Promise((resolve, reject) => 
    {
        axios_instance
          .post("create-test-theory-question", data)
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

export async function AllTestTheory(id) 
{
    return new Promise((resolve, reject) => 
    {
        axios_instance
          .get(`all-test-theory-questions/${id}`)
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

export async function UpdateTestQuestionTheory(data) 
{
    console.log(data)
    return new Promise((resolve, reject) => 
    {
        axios_instance
          .put("update-test-theory-question", data)
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

export async function DeleteTestQuestionTheory(id) 
{
    return new Promise((resolve, reject) => 
    {
        axios_instance
          .delete(`remove-test-theory-question/${id}`)
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


// exams objective
export async function AddExam(data) 
{
    return new Promise((resolve, reject) => 
    {
        axios_instance
          .post("create-exam-question", data)
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

export async function AllExam(id) 
{
    return new Promise((resolve, reject) => 
    {
        axios_instance
          .get(`all-exam-question/${id}`)
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

export async function UpdateExamQuestion(data) 
{
    return new Promise((resolve, reject) => 
    {
        axios_instance
          .put("update-exam-question", data)
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

export async function DeleteExamQuestion(id) 
{
    return new Promise((resolve, reject) => 
    {
        axios_instance
          .delete(`remove-exam-question/${id}`)
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


// exam theory
export async function AddExamTheoryQuestion(data) 
{
    return new Promise((resolve, reject) => 
    {
        axios_instance
          .post("create-exam-theory-question", data)
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

export async function AllExamTheory(id) 
{
    return new Promise((resolve, reject) => 
    {
        axios_instance
          .get(`all-exam-theory-questions/${id}`)
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

export async function UpdateExamQuestionTheory(data) 
{
    console.log(data)
    return new Promise((resolve, reject) => 
    {
        axios_instance
          .put("update-exam-theory-question", data)
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

export async function DeleteExamQuestionTheory(id) 
{
    return new Promise((resolve, reject) => 
    {
        axios_instance
          .delete(`remove-exam-theory-question/${id}`)
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

// exam theory theory theory theory theory theory
export async function AddTheoryQuestionExam(data) 
{
    return new Promise((resolve, reject) => 
    {
        axios_instance
          .post("create-exam-theory-question", data)
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

export async function AllTheoryQuestionExam(id) 
{
    return new Promise((resolve, reject) => 
    {
        axios_instance
          .get(`all-exam-theory-question/${id}`)
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

export async function UpdateQuestionTheoryExam(data) 
{
    console.log(data)
    return new Promise((resolve, reject) => 
    {
        axios_instance
          .put("update-exam-theory-question", data)
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

export async function DeleteQuestionTheoryExam(id) 
{
    return new Promise((resolve, reject) => 
    {
        axios_instance
          .delete(`remove-exam-theory-question/${id}`)
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

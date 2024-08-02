import axios_instance from "@/lib/axios";

// test
export async function AddTestQuestionaire(data) 
{
    return new Promise((resolve, reject) => 
    {
        axios_instance
          .post("create-test-questionaire", data)
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

export async function AllTestQuestionaires() 
{
    return new Promise((resolve, reject) => 
    {
        axios_instance
          .get("all-test-questionaires")
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

export async function UpdateTestQuestionaires(data) 
{
    return new Promise((resolve, reject) => 
    {
        axios_instance
          .put("update-test-questionaires", data)
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

export async function DeleteTestQuestionaires(id) 
{
    return new Promise((resolve, reject) => 
    {
        axios_instance
          .delete(`remove-test-questionaires/${id}`)
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
export async function AddTestQuestionaireTheory(data) 
{
   const name = data.name
   const description = data.description

    return new Promise((resolve, reject) => 
    {
        axios_instance
          .post("create-test-theory-questionire", {name, description})
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

export async function AllTestQuestionairesTheory() 
{
    return new Promise((resolve, reject) => 
    {
        axios_instance
          .get("all-test-theory-questionaire")
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

export async function UpdateTestQuestionairesTheory(data) 
{
    return new Promise((resolve, reject) => 
    {
        axios_instance
          .put("update-test-theory-questionaire", data)
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

export async function DeleteTestQuestionairesTheory(id) 
{
    return new Promise((resolve, reject) => 
    {
        axios_instance
          .delete(`remove-test-theory-questionaire/${id}`)
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

// exam
export async function AddExamQuestionaire(data) 
{
    return new Promise((resolve, reject) => 
    {
        axios_instance
          .post("create-exam-questionaire", data)
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

export async function AllExamQuestionaires() 
{
    return new Promise((resolve, reject) => 
    {
        axios_instance
          .get("all-exam-questionaires")
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

export async function UpdateExamQuestionaires(data) 
{
    return new Promise((resolve, reject) => 
    {
        axios_instance
          .put("update-exam-questionaires", data)
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

export async function DeleteExamQuestionaires(id) 
{
    return new Promise((resolve, reject) => 
    {
        axios_instance
          .delete(`remove-exam-questionaires/${id}`)
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
export async function AddExamQuestionaireTheory(data) 
{
    return new Promise((resolve, reject) => 
    {
        axios_instance
          .post("create-exam-theory-questionaire", data)
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

export async function AllExamQuestionairesTheory() 
{
    return new Promise((resolve, reject) => 
    {
        axios_instance
          .get("all-exam-theory-questionaires")
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

export async function UpdateExamQuestionairesTheory(data) 
{
    return new Promise((resolve, reject) => 
    {
        axios_instance
          .put("update-exam-theory-questionaires", data)
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

export async function DeleteExamQuestionairesTheory(id) 
{
    return new Promise((resolve, reject) => 
    {
        axios_instance
          .delete(`remove-exam-theory-questionaires/${id}`)
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

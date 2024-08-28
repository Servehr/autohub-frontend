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
              resolve(res.data.data);
            }
          })
          .catch(() => {
            let message = "Something went wrong!";
            reject(new Error(message));
          });
    });
}

export async function AllTestQuestionaires(year) 
{
    return new Promise((resolve, reject) => 
    {
        axios_instance
          .get(`all-test-questionaires/${year}`)
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
   const current_session = data.current_session

    return new Promise((resolve, reject) => 
    {
        axios_instance
          .post("create-test-theory-questionire", {name, description, current_session})
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

export async function AllTestQuestionairesTheory(year) 
{
    return new Promise((resolve, reject) => 
    {
        axios_instance
          .get(`all-test-theory-questionaire/${year}`)
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
              resolve(res.data.data);
            }
          })
          .catch(() => {
            let message = "Something went wrong!";
            reject(new Error(message));
          });
    });
}

export async function AllExamQuestionaires(year) 
{
    return new Promise((resolve, reject) => 
    {
        axios_instance
          .get(`all-exam-questionaires/${year}`)
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
              resolve(res.data.data);
            }
          })
          .catch(() => {
            let message = "Something went wrong!";
            reject(new Error(message));
          });
    });
}

export async function AllExamQuestionairesTheory(year) 
{
    return new Promise((resolve, reject) => 
    {
        axios_instance
          .get(`all-exam-theory-questionaires/${year}`)
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
              resolve(res.data.data);
            }
          })
          .catch(() => {
            let message = "Something went wrong!";
            reject(new Error(message));
          });
    });
}

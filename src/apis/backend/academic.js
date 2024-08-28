import axios_instance from "@/lib/axios";

export async function AllAcademicSession() 
{
    return new Promise((resolve, reject) => 
    {
        axios_instance
          .get("all-academic-session")
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

export async function AddAcademicSession(data) 
{
    return new Promise((resolve, reject) => 
    {
        axios_instance
          .post("add-academic-session", { name: data.name, first_time: data.first_time })
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

export async function UpdateAcademicSession(data) 
{
    return new Promise((resolve, reject) => 
    {
        axios_instance
          .put("update-academic-session", { id: data.id, name: data.name })
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

export async function DeleteAcademicSession(id) 
{
    return new Promise((resolve, reject) => 
    {
        axios_instance
          .delete(`delete-academic-session/${id}`)
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

export async function OpenAcademicSession(id) 
{
    return new Promise((resolve, reject) => 
    {
        axios_instance
          .put("open-academic-session", { id: id })
          .then((res) => {
            if (res.data.success === false) {
              reject(res.data.message);
            } else {
              resolve(res.data.plus);
            }
          })
          .catch(() => {
            let message = "Something went wrong!";
            reject(new Error(message));
          });
    });
}

export async function CloseAcademicSession(id) 
{
    return new Promise((resolve, reject) => 
    {
        axios_instance
          .put("close-academic-session", { id: id })
          .then((res) => {
            if (res.data.success === false) {
              reject(res.data.message);
            } else {
              resolve(res.data.plus);
            }
          })
          .catch(() => {
            let message = "Something went wrong!";
            reject(new Error(message));
          });
    });
}
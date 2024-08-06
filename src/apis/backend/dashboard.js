import axios_instance from "@/lib/axios";

export async function dashboardOverview() 
{
    return new Promise((resolve, reject) => 
    {
        axios_instance
          .get("dashboard-overview")
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

export async function GetStudentOverview() 
{
    return new Promise((resolve, reject) => 
    {
        axios_instance
          .get("student-overview")
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
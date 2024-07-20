import axios_instance from "@/lib/axios";

export async function AuthenticatedUser(userId) 
{
    if(userId != null || userId != "" || userId != undefined || userId != -1)
    {
        return new Promise((resolve, reject) => {
          axios_instance
            .get(`maceos-registration/${userId}`)
            .then((res) => {
                console.log(res)
                resolve(res.data.data);
            })
            .catch(() => {
              let message = "Something went wrong!";
              reject(new Error(message));
            });
        });
    } else {
        return []
    }
}

export async function NewUser(data) 
{
    return new Promise((resolve, reject) => {
      axios_instance
        .post(`maceos-new-registration`, data)
        .then((res) => {
            if(res.data.status === 200)
            {
                console.log(res.data.message); 
                resolve(res.data.message);               
            } if(res.data.status === 400){
                let message = "Ooops!!!, registration failed";
                reject(new Error(message));              
            }else {
                let message = "Something went wrong!";
                reject(new Error(message));              
            }
        })
        .catch(() => {
          let message = "Something went wrong!";
          reject(new Error(message));
        });
    });
}

export async function ExistingUser(userId, data) 
{
    let id = userId
    data.user_id = id
    return new Promise((resolve, reject) => {
      axios_instance
        .post(`maceos-registration`, data)
        .then((res) => {
            // console.log(res.data)
            // console.log(res.data.status) // 200
            // console.log(res.data.data)
            if(res.data.status === 200)
            {
                resolve(res.data.data);               
            } if(res.data.status === 400){
                let message = "Ooops!!!, registration failed";
                reject(new Error(message));              
            }else {
                let message = "Something went wrong!";
                reject(new Error(message));              
            }
        })
        .catch((err) => {
          let message = "Something went wrong!";
          reject(new Error(err));
        });
    });
}


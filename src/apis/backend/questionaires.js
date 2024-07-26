import axios_instance from "@/lib/axios";

export async function AddTestQuestion() 
{
    return new Promise((resolve, reject) => 
    {
        axios_instance
          .post("create-test-questionaire")
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

// get-test-questionaires

import axios_instance from "@/lib/axios";

export async function requestPayment(requestData) {
    // const requestData = data;
  
    return new Promise((resolve, reject) => {
      axios_instance
        .post(`payment`, requestData)
        .then((res) => {
          if (res.data.success === 0) {
            reject(res.data.message);
          } else {
            resolve(res.data.data);
          }
        })
        .catch((err) => {
          // console.log(err);
          let message = err.response.data.message || err.message;
          reject(message);
        });
    });
  }

export async function checkPayment(id) {
    return new Promise((resolve, reject) => {
      axios_instance
        .get(`payment/${id}`)
        .then((res) => {
          if (res.data.success === 0) {
            reject(new Error(res.data.message));
          } else {
            resolve(res.data);
          }
        })
        .catch(() => {
          reject(new Error("Something went wrong"));
        });
    });
  }
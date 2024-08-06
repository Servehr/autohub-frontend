import axios from "axios";
import { BASE_URL, axios_instance } from "@/lib/axios";

export async function loginUser(email, password) {
  const requestData = { email, password };

  return new Promise((resolve, reject) => {
    axios
      .post(`${BASE_URL}login`, requestData)
      .then((res) => {
        if (res.data.success === 0) {
          reject(res.data.message);
        } else {
            localStorage.setItem("authenticatedId", res.data.data.id);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("admin", res.data.admin);
            localStorage.setItem("user", res.data);
            localStorage.setItem("users", JSON.stringify(res.data.data));
            console.log(res.data)
            localStorage.setItem("services", res.data.persin)
            // alert(res.data.persin)
            // console.log(res.data.data.id)
            const theUser = localStorage.getItem('user')
            // const theUsers = localStorage.getItem('users')
            // const convert = JSON.parse(theUsers)
            // console.log(convert)
            // console.log(theUser)
            // console.log(theUsers)
            // console.log(theUsers.message)
            // console.log(JSON.stringify(theUser))
            // console.log(JSON.parse(theUser))
            // return
            // resolve(res);   
            // alert(typeof res.data.persin)         
            if(res.data.persin === 3)
            {
                localStorage.setItem("userTypes", 'admin');
                window.location.href = "overview";
            } else if(res.data.persin === 2) {  
                localStorage.setItem("userTypes", 'both');
                window.location.href = "/dashboard/summary";
            } else if(res.data.persin === 1){
                localStorage.setItem("userTypes", 'market');
                window.location.href = "/dashboard/profile";
            } else if(res.data.persin === 4){
                localStorage.setItem("userTypes", 'student');
                window.location.href = "/dashboard/summary";
            }
        }
      })
      .catch((err) => {
        let message = "Something went wrong";
        reject(new Error(message));
      });
  });
}

export async function setUserNewPassword(email, password) {
  const requestData = { email, password };

  return new Promise((resolve, reject) => {
    axios
      .post(`${BASE_URL}new-password`, requestData)
      .then((res) => {
        console.log(res)
        if (res.data.success === false) {
          reject(res.data.message);
        } else {
          window.location.href = "/login";
        }
      })
      .catch((err) => {
        let message = "Something went wrong";
        reject(new Error(message));
      });
  });
}

export async function userOffline() 
{
  return new Promise((resolve, reject) => {
    axios_instance
      .post(`${BASE_URL}login-out`)
      .then((res) => {
        console.log(res)
        if (res.data.success === false) {
          reject(res.data.message);
        } else {
          localStorage.removeItem("autoHub")
          localStorage.clear()
          window.location.href = "/"
        }
      })
      .catch((err) => {
        let message = "Something went wrong";
        reject(new Error(message));
      });
  });
}

export async function forgotPassword(email) {
  const requestData = { email };

  return new Promise((resolve, reject) => {
    axios
      .post(`${BASE_URL}forget-password-sendcode`, requestData)
      .then((res) => 
      {
          if (res.data.success == false){
            console.log(res);
            reject(res.data.message);
          } else {
            localStorage.setItem("userId", res.data.user.id);
            localStorage.setItem("userEmail", res.data.user.email);
            // resolve(res);
            window.location.href = "/reset";
          }
      })
      .catch((err) => {
        console.log(err);
        // let message = err.response.data.message || err.message;
        // reject(message);
      });
  });
}

export async function forgotPasswordComplete(code) 
{
  return new Promise((resolve, reject) => {
    axios
      .post(`${BASE_URL}forget-password-complete`, {code: code})
      .then((res) => {
        if (res.data.success === false) {
          console.log(res.data);
          reject(res.data.message);
        } else {
          console.log(res.data)
          localStorage.setItem("user", localStorage.getItem("userId"));
          localStorage.setItem("userId", "");
          // resolve(res);
          window.location.href = "/new-password";
        }
      })
      .catch((err) => {
        console.log(err);
        let message = err.response.data.message || err.message;
        reject(message);
      });
  });
}

export function registerBuyer({ name, email, password, phoneno, avatar }) {
  const requestData = { name, email, password, phoneno, avatar };

  return new Promise((resolve, reject) => {
    axios
      .post(`${BASE_URL}buyer/register`, requestData)
      .then((res) => {
        if (res.data.success === 0) {
          reject(res.data.message);
        } else {
          localStorage.setItem("tokenn", res.data.token);
          localStorage.setItem("authenticatedIdd", res.data.id);
          resolve(res);
        }
      })
      .catch(() => {
        let message = "Something went wrong";
        reject(new Error(message));
      });
  });
}

// prettier-ignore
export function registerAffiliate({ name, email, password, phoneno, avatar, company_cac, company_address, company_name }) {
  const requestData = { email, password, phoneno, avatar, name, company_cac, company_address, company_name, };

  return new Promise((resolve, reject) => {
    axios
      .post(`${BASE_URL}affiliate/register`, requestData)
      .then((res) => {
        if (res.data.success === 0) {
          reject(res.data.message);
        } else {
          localStorage.setItem("tokenn", res.data.token);
          localStorage.setItem("authenticatedIdd", res.data.id);
          resolve(res);
        }
      })
      .catch((err) => {
        let message = "Something went wrong";
        reject(new Error(message));
      });
  });
}

export function setUserNewPhoneNumber({ password, phone }) {
  const requestData = { password, phone  };

  return new Promise((resolve, reject) => {
    axios_instance
      .post(`${BASE_URL}change-phone-number`, requestData)
      .then((res) => {
        if (res.data.success === 0) {
          reject(res.data.message);
        } else {
          resolve(res.data);
        }
      })
      .catch(() => {
        let message = "Something went wrong";
        reject(new Error(message));
      });
  });
}

export function setUserNewEmail({ password, email }) {
  const requestData = { password, email  };

  return new Promise((resolve, reject) => {
    axios_instance
      .post(`${BASE_URL}change-email`, requestData)
      .then((res) => {
        if (res.data.success === 0) {
          reject(res.data.message);
        } else {
          resolve(res.data);
        }
      })
      .catch(() => {
        let message = "Something went wrong";
        reject(new Error(message));
      });
  });
}

export function deleteProductAdvert({ id }) 
{
  return new Promise((resolve, reject) => {
    axios_instance
      .post(`${BASE_URL}ad/delete`, id)
      .then((res) => {
        if (res.data.success === 0) {
          reject(res.data.message);
        } else {
          resolve(res.data);
        }
      })
      .catch(() => {
        let message = "Something went wrong";
        reject(new Error(message));
      });
  });
}


export function logOut()
{
    return new Promise((resolve, reject) => {
      axios_instance
        .post(`${BASE_URL}login-out`)
        .then((res) => {
          console.log(res.data)
          if (res.data.success === false) {
            reject(res.data.message);
          } else {
            localStorage.removeItem("autoHub")
            localStorage.clear()
            sessionStorage.clear();
            window.location.href = "/"
          }
        })
        .catch((err) => {
          alert("User already logged out")
          let message = "Something went wrong";
          reject(new Error(message));
        });
  });
//   localStorage.removeItem("autoHub")
//   localStorage.clear()
//   window.location.href = "/"
}


export function logItOut()
{
    return new Promise((resolve, reject) => {
      axios_instance
        .post(`${BASE_URL}login-out`)
        .then((res) => {
          console.log(res.data)
          if (res.data.success === false) {
            reject(res.data.message);
          } else {
            localStorage.removeItem("autoHub")
            localStorage.clear()
            window.location.href = "/login"
          }
        })
        .catch((err) => {
          alert("User already logged out")
          let message = "Something went wrong";
          reject(new Error(message));
        });
  });
//   localStorage.removeItem("autoHub")
//   localStorage.clear()
//   window.location.href = "/"
}

// prettier-ignore
// export function registerVendor( name, email, password, phoneno, avatar, year_of_experience, id_card_back, id_card_front, avatar, service_id, company_nata, company_cac, company_address, company_name ) {
//   const requestData = { email, password, phoneno, avatar, name, company_cac, company_address, company_name, service_id, company_nata, year_of_experience, id_card_back, id_card_front, };

//   return new Promise((resolve, reject) => {
//     axios
//       .post(`${BASE_URL}buyer/register`, requestData)
//       .then((res) => {
//         if (res.data.success === 0) {
//           reject(res.data.message);
//         } else {
//           localStorage.setItem("token", res.data.token);
//           resolve(res);
//           window.location.href = "/user";
//         }
//       })
//       .catch((err) => {
//         let message = err.response.data.message || err.message;
//         reject(message);
//       });
//   });
// }

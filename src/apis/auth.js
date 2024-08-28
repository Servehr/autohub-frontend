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
            localStorage.setItem("typeOfUser", res.data.data.type);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("admin", res.data.admin);
            localStorage.setItem("user", res.data);
            localStorage.setItem("users", JSON.stringify(res.data.data));
            localStorage.setItem("kindOfUser", JSON.stringify(res.data.resource));
            localStorage.setItem("services", res.data.persin)
            const theUser = localStorage.getItem('user')
            if(res.data.persin === 3)
            {
                 window.location.href = "/a/overview";
                //  localStorage.setItem("userTypes", 'both');
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
        reject(new Error(err));
      });
  });
}

export async function setUserNewPassword(email, password) {
  const requestData = { email, password };

  return new Promise((resolve, reject) => {
    axios
      .post(`${BASE_URL}new-password`, requestData)
      .then((res) => {
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
            reject(res.data.message);
          } else {
            localStorage.setItem("userId", res.data.user.id);
            localStorage.setItem("userEmail", res.data.user.email);
            // resolve(res);
            window.location.href = "/reset";
          }
      })
      .catch((err) => {
        let message = err.response.data.message || err.message;
        reject(message);
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
          reject(res.data.message);
        } else {
          localStorage.setItem("user", localStorage.getItem("userId"));
          localStorage.setItem("userId", "");
          // resolve(res);
          window.location.href = "/new-password";
        }
      })
      .catch((err) => {
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
          if (res.data.success === false) {
            reject(res.data.message);
          } else {
            localStorage.removeItem("autoHub")
            localStorage.clear()
            sessionStorage.clear();
            window.location.href = "/home"
          }
        })
        .catch((err) => {
          alert("User already logged out")
          let message = "Something went wrong";
          reject(new Error(message));
        });
  });
}

export function logItOut()
{
    return new Promise((resolve, reject) => {
      axios_instance
        .post(`${BASE_URL}login-out`)
        .then((res) => {
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
}

export function staffs()
{
    return new Promise((resolve, reject) => {
      axios_instance
        .get(`${BASE_URL}all-staff`)
        .then((res) => {
          if (res.data.success === false) {
            reject(res.data.message);
          } else {
            resolve(res.data.data);
          }
        })
        .catch((err) => {
          let message = "Something went wrong";
          reject(new Error(message));
        });
    });    
}
import axios_instance from "@/lib/axios";

export async function fetchProfile() {
  return new Promise((resolve, reject) => {
    axios_instance
      .get("profile")
      .then((res) => {
        if (res.data.success === 0) {
          reject(new Error(res.data.message));
        } else {
          resolve(res.data);
        }
      })
      .catch(() => {
        let message = "Something went wrong!";
        reject(new Error(message));
      });
  });
}

export async function fetchOnSale() {
  return new Promise((resolve, reject) => {
    axios_instance
      .get("store/onsale")
      .then((res) => {
        if (res.data.success === 0) {
          reject(new Error(res.data.message));
        } else {
          resolve(res.data.data);
        }
      })
      .catch(() => {
        reject(new Error("Something went wrong"));
      });
  });
}

export async function publishedPost(currentPage, perPage) {
  return new Promise((resolve, reject) => {
    axios_instance
      .get(`ad/published-post/${currentPage}/${perPage}`)
      .then((res) => {
        if (res.data.success === 0) {
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

export async function pendingProduct(currentPage, perPage) 
{
  return new Promise((resolve, reject) => {
    axios_instance
      .get(`ad/inactive-post/${currentPage}/${perPage}`)
      .then((res) => {
        if (res.data.success === 0) {
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

export async function draftProduct(currentPage, perPage) 
{
  return new Promise((resolve, reject) => {
    axios_instance
      .get(`ad/draft-post/${currentPage}/${perPage}`)
      .then((res) => {
        if (res.data.success === 0) {
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

export async function fetchUnposted() {
  return new Promise((resolve, reject) => {
    axios_instance
      .get("store/unposted")
      .then((res) => {
        if (res.data.success === 0) {
          reject(new Error(res.data.message));
        } else {
          resolve(res.data.data);
        }
      })
      .catch(() => {
        reject(new Error("Something went wrong"));
      });
  });
}

export async function fetchSold() {
  return new Promise((resolve, reject) => {
    axios_instance
      .get("store/sold")
      .then((res) => {
        if (res.data.success === 0) {
          reject(new Error(res.data.message));
        } else {
          resolve(res.data.data);
        }
      })
      .catch(() => {
        reject(new Error("Something went wrong"));
      });
  });
}

export async function updatePassword(currentPassword, newPassword) {
  const requestData = { currentPassword, newPassword };

  return new Promise((resolve, reject) => {
    axios_instance
      .post(`change-password`, requestData)
      .then((res) => {
        if (res.data.success === 0) {
          reject(res.data.message);
        } else {
          resolve(res);
        }
      })
      .catch((err) => {
        let message = err.response.data.message || err.message;
        reject(message);
      });
  });
}

export async function updateAvatar(avatar) 
{  
  const id = localStorage.getItem("authenticatedIdd");
  return new Promise((resolve, reject) => {
    axios_instance
      .post(`update-avatar`, { id: id, avatar: avatar.avatar})
      .then((res) => {
        if (res?.data?.success === 0) {
          reject(res.data.message);
        } else {
          resolve(res);
        }
      })
      .catch(() => {
        reject(new Error("Something went wrong"));
      });
  });
}

export async function fetchNotifications() {
  return new Promise((resolve, reject) => {
    axios_instance
      .get("notifications")
      .then((res) => {
        if (res.data.success === 0) {
          reject(new Error(res.data.message));
        } else {
          resolve(res.data.data);
        }
      })
      .catch(() => {
        reject(new Error("Something went wrong"));
      });
  });
}

export async function fetchMyMessage() {
  return new Promise((resolve, reject) => {
    axios_instance
      .get("message")
      .then((res) => {
        if (res.data.success === 0) {
          reject(new Error(res.data.message));
        } else {
          resolve(res.data.data);
        }
      })
      .catch(() => {
        reject(new Error("Something went wrong"));
      });
  });
}

export async function UpdateUserProfile(data) {
  return new Promise((resolve, reject) => {
    axios_instance
      .post("update-user-info", data)
      .then((res) => {
        if (res.data.success === 0) {
          reject(new Error(res.data.message));
        } else {
          resolve(res.data.data);
        }
      })
      .catch(() => {
        reject(new Error("Something went wrong"));
      });
  });
}

export async function isPaidAndStudentSummary() 
{
  return new Promise((resolve, reject) => {
    axios_instance
      .get("is-paid-and-summary")
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

export async function uploadReceipt(receipt) 
{
  return new Promise((resolve, reject) => {
    axios_instance
      .post("upload-receipt", { receipt: receipt})
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

export async function ConfirmStudentAccess(id) 
{
  return new Promise((resolve, reject) => {
    axios_instance
      .post("confirm-student", { id: id})
      .then((res) => {
        if (res.data.success === false) {
          reject(new Error(res.data.message));
        } else {
          resolve(res.data.success);
        }
      })
      .catch(() => {
        reject(new Error("Something went wrong"));
      });
  });
}

export async function EnrolStudent(id) 
{
  return new Promise((resolve, reject) => {
    axios_instance
      .put("enrol-student", { id: id})
      .then((res) => {
        if (res.data.success === false) {
          reject(new Error(res.data.message));
        } else {
          resolve(res.data.success);
        }
      })
      .catch(() => {
        reject(new Error("Something went wrong"));
      });
  });
}

export async function AddStaff(data) 
{
  return new Promise((resolve, reject) => {
    axios_instance
      .post("add-staff", { name: data.firstname, lastname: data.surname, email: data.email, admin_role: data.role })
      .then((res) => {
        if (res.data.success === false) {
          reject(new Error(res.data.message));
        } else {
          resolve(res.data.success);
        }
      })
      .catch(() => {
        reject(new Error("Something went wrong"));
      });
  });
}

export async function UpdateStaff(data) 
{
  return new Promise((resolve, reject) => {
    axios_instance
      .put("update-staff", { id: data.id, name: data.firstname, lastname: data.surname, email: data.email, admin_role: data.role })
      .then((res) => {
        if (res.data.success === false) {
          reject(new Error(res.data.message));
        } else {
          resolve(res.data.success);
        }
      })
      .catch(() => {
        reject(new Error("Something went wrong"));
      });
  });
}

export async function SuspendStaff(data) 
{
  return new Promise((resolve, reject) => {
    axios_instance
      .put("suspend-user", { id: data.id, status: data.status})
      .then((res) => {
        if (res.data.success === false) {
          reject(new Error(res.data.message));
        } else {
          resolve(res.data.success);
        }
      })
      .catch(() => {
        reject(new Error("Something went wrong"));
      });
  });
}

export async function ChangeUserRole(data) 
{
  return new Promise((resolve, reject) => {
    axios_instance
      .put("change-user-role", { id: data.id, admin_role: data.role})
      .then((res) => {
        if (res.data.success === false) {
          reject(new Error(res.data.message));
        } else {
          resolve(res.data.success);
        }
      })
      .catch(() => {
        reject(new Error("Something went wrong"));
      });
  });
}

export async function UserDealers(currentPage, perPage, searchQuery)  
{
  let theQuery = searchQuery.trim()
  if(theQuery.length === 0)
  {        
      return new Promise((resolve, reject) => {
        axios_instance
          .get(`dealers/${currentPage}/${perPage}`)
          .then((res) => {
            if (res.data.success === 0) {
              reject(res.data.message);
            } else {
              console.log(res.data.response)
              resolve(res.data.response);
            }
          })
          .catch(() => {
            let message = "Something went wrong!";
            reject(new Error(message));
          });
      });
  } else {        
      return new Promise((resolve, reject) => {
    
        axios_instance
          .get(`dealers/${currentPage}/${perPage}/${theQuery}`)
          .then((res) => {
            if (res.data.success === 0) {
              reject(res.data.message);
            } else {
              resolve(res.data.response);
            }
          })
          .catch(() => {
            let message = "Something went wrong!";
            reject(new Error(message));
          });
      });
  }
}

export async function GetUserResult(id) 
{
  return new Promise((resolve, reject) => {
    axios_instance
      .get(`user-result-student/${id}`)
      .then((res) => {
        if (res.data.success === 0) {
          reject(new Error(res.data.message));
        } else {
          resolve(res.data.data);
        }
      })
      .catch(() => {
        reject(new Error("Something went wrong"));
      });
  });
}

export async function CourseMaterial(id) 
{
  return new Promise((resolve, reject) => {
    axios_instance
      .get(`student-course-material/${id}`)
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



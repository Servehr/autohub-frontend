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
          console.log(res.data.data)
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
          console.log(res.data.data);
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
  console.log('why why why ++++')
  return new Promise((resolve, reject) => {
    axios_instance
      .get(`ad/inactive-post/${currentPage}/${perPage}`)
      .then((res) => {
         console.log(res)
        if (res.data.success === 0) {
          reject(res.data.message);
        } else {
          console.log(res.data.data);
          console.log(res.data);
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
         console.log(res)
        if (res.data.success === 0) {
          reject(res.data.message);
        } else {
          console.log(res.data.data);
          console.log(res.data);
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
          console.log(res);
          // localStorage.setItem("token", res.data.token);
          resolve(res);
          // window.location.href = "/user";
        }
      })
      .catch((err) => {
        console.log(err);
        let message = err.response.data.message || err.message;
        reject(message);
      });
  });
}

export async function updateAvatar(avatar) 
{  
  // console.log(avatar.avatar)
  // console.log(typeof data)
  // console.log(localStorage.getItem("token"))
  // console.log(localStorage.getItem("authenticatedId"))
  const id = localStorage.getItem("authenticatedIdd");
  return new Promise((resolve, reject) => {
    axios_instance
      .post(`update-avatar`, { id: id, avatar: avatar.avatar})
      .then((res) => {
        if (res?.data?.success === 0) {
          console.log("Error")
          reject(res.data.message);
        } else {
          console.log(res.data)
          // return
          // window.location.href = '/login'
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

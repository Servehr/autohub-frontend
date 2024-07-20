import axios_instance from "@/lib/axios";

export async function fetchWatchList() {
  return new Promise((resolve, reject) => {
    axios_instance
      .get("watchlist")
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

export async function fetchWatchListDetails(id) {
  return new Promise((resolve, reject) => {
    axios_instance
      .get(`watchlist/${id}`)
      .then((res) => {
        if (res.data.success === 0) {
          reject(new Error("Something went wrong!"));
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

export async function fetchWatchProductStatus(id) {
  return new Promise((resolve, reject) => {
    axios_instance
      .get(`watchlist/${id}/product`)
      .then((res) => {
        if (res.data.success === 0) {
          reject(new Error("Something went wrong!"));
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

export async function deleteWatchListItem(id) {
  return new Promise((resolve, reject) => {
    axios_instance
      .delete(`watchlist/${id}`)
      .then((res) => {
        if (res.data.success === 0) {
          reject(new Error("Something went wrong!"));
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

export async function addToWatchlist(requestData) {
  return new Promise((resolve, reject) => {
    axios_instance
      .post(`watchlist`, requestData)
      .then((res) => {
        if (res.data.success === 0) {
          reject(res.data.message);
        } else {
          resolve(res.data.message);
        }
      })
      .catch((err) => {
        let message = "Something went wrong";
        reject(new Error(message));
      });
  });
}

// user-watch-list
// export async function UserWatchList(currentPage, perPage) {
//   return new Promise((resolve, reject) => {
//     axios_instance
//       .get(`user-watch-list`)
//       .then((res) => {
//         if (res.data.success === 0) {
//           reject(res.data.message);
//         } else {
//           console.log(res.data.data)
//           resolve(res.data.data);
//         }
//       })
//       .catch((err) => {
//         let message = "Something went wrong";
//         reject(new Error(message));
//       });
//   });
// }

export async function UserWatchList(currentPage, perPage) {
  return new Promise((resolve, reject) => {
    axios_instance
      .get(`user-watch-list/${currentPage}/${perPage}`)
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
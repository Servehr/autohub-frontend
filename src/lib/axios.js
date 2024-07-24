import axios from "axios";

let token = localStorage.getItem("token")

const DESTINATION = "https://scentsbyhoppey.com/";
// const DESTINATION = "http://127.0.0.1:8000/";
   

export const BASE_URL = `${DESTINATION}api/app/`;
export const BASE_URL_FRONT = `${DESTINATION}blog-detail/`;
export const IMAGE_SLIDER = `${DESTINATION}product/`; 
export const PRODUCT_FACE = `${DESTINATION}product/`;
export const AVATAR = `${DESTINATION}avatar/`;
export const WATER_MARK = `${DESTINATION}water/`;
export const BLOG_POST = `${DESTINATION}posts/`;

export const axios_instance_no = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json"
  },
});

export const axios_instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  },
});

export const sendDataWithForm = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: token ? `Bearer ${token}` : "",
  },
});

// axios_instance.interceptors.request.use(
//   (config) => {
//     if (token) {
//       config.headers["Authorization"] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// axios_instance.interceptors.response.use(
//   (res) => {
//     return res;
//   },
//   async (err) => {
//     const originalRequest = err.config;
//     if (
//       err?.response &&
//       (err.response.status === 403 || err.response.status === 401) &&
//       !originalRequest._retry
//     ) {
//       console.log("Error occurred with token");
//       window.location.href = "/login";

//       // logoutAndRedirect();

//       originalRequest._retry = true;

//       try {
//         if (refresh_token) {
//           const rs = getRefreshToken();
//           const access_token = rs?.access_token;
//           localStorage.setItem("token", access_token);
//           originalRequest.headers.Authorization = `Bearer ${access_token}`;
//           return axios(originalRequest);
//         } else {
//           throw new Error("refresh token not found");
//         }
//       } catch (_error) {
//         // localStorage.clear();
//         // sessionStorage.clear();
//         // console.log("refresh token not found");
//         // window.location.href = "/login";

//         logoutAndRedirect();
//       }
//     }

//     return Promise.reject(err);
//   }
// );

// const logoutAndRedirect = () => {
//   localStorage.clear();
//   sessionStorage.clear();
//   console.log("Token error occurred. Logging out and redirecting to login.");
//   window.location.href = "/login";
// };

export default axios_instance;

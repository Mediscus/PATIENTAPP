import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5001/api/",
  headers: {
    "Content-Type": "application/json",
    apiVersion: "1.0",
    ApiKey: "HkciTr5CHUuPLKOiaeQzMFQINA6fNX6uw12qbfpFv5M=",
  },
});

// instance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("authToken");
//     if (token) {
//       config.headers["authToken"] = token;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// instance.interceptors.response.use((res) => {
//   if (res && res.data && res.data.Error && res.data.Error.ErrorCode === 10003) {
//     window.location.href = "/";
//     alert("InaValid Credentials .Please login again");
//   }
//   return res;
// });

export default instance;

import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:5000/api/v1',
    timeout: 5000,
    headers: {'Content-Type': 'application/json'}, // Định nghĩa tiêu đề cho các yêu cầu API là dữ liệu JSON
});

// Interceptor để tự động thêm token vào các yêu cầu
api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token'); // Lấy token từ localStorage hoặc từ nơi lưu trữ khác
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Thêm token vào tiêu đề Authorization
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default api;



//   // can thiep vao qua trinh request len server
// axios.interceptors.request.use(
//     function (config) {
//     // Do something before request is sent
//     const token = localStorage.getItem("token");
//     if (token) {
//         config.headers["Authorization"] = "Bearer"+ token;
//     }
//     return config;
//   }, function (error) {
//     // Do something with request error
//     return Promise.reject(error);
//   });

// // can thiep vao qua trinh nhan respone tu server
// axios.interceptors.response.use(
//     function (response) {
//     // Any status code that lie within the range of 2xx cause this function to trigger
//     // Do something with response data
//     return response;
//   }, function (error) {
//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     // Do something with response error
//     return Promise.reject(error);
//   });


import api from "./axios";

console.log("Axios Interceptors file loaded!");

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    console.log("Request Interceptor is working!");

    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log("Request URL:", config.baseURL + config.url);
    console.log("Request Method:", config.method?.toUpperCase());
    console.log(
      "Authorization Header:",
      token ? "Bearer token attached" : "No token found"
    );

    return config;
  },
  (error) => {
    console.error("Request Interceptor Error:", error);
    return Promise.reject(error);
  }
);

// Response Interceptor
api.interceptors.response.use(
  (response) => {
    console.log("Response Interceptor is working!");
    console.log("Response Status:", response.status);
    console.log("Response Data:", response.data);

    return response;
  },
  (error) => {
    console.error("Response Interceptor Error:", error.message);
    console.log("Response Status:", error.response?.status);

    if (error.response?.status === 401) {
      console.log("401 Unauthorized! Logging out...");

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);


import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "./api/axiosInterceptors";
// import api from "./api/axios";

// Temporary test for Axios Interceptor
// api.get("/users/all")
//   .then((response) => {
//     console.log("API response:", response.data);
//   })
//   .catch((error) => {
//     console.log("Request status:", error.response?.status);
//     console.log("Request error:", error.message);
//   });

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)

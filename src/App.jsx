import React from 'react';
import FullPageLoader from './components/FullPageLoader';
import './api/axiosInterceptors';
import LoginPage from './pages/login';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div>
      <FullPageLoader />
      <LoginPage />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
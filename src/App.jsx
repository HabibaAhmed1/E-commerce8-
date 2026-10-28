import React from 'react';
import FullPageLoader from './components/FullPageLoader';
import './api/axiosInterceptors';
import LoginPage from './pages/login';

function App() {
  return (
    <div>
      <FullPageLoader />
      <LoginPage />
    </div>
  );
}

export default App;
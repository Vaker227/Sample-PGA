import React, { useEffect } from 'react';
import ToastContainer from './modules/toast/ToastContainer';
import { Routes } from './Routes';

function App() {
  useEffect(() => {
    const preLoading = document.getElementById('pre-loading');
    if (preLoading) preLoading.style.display = 'none';
  }, []);
  return (
    <>
      <Routes />
      <ToastContainer />
    </>
  );
}

export default App;

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCommonValues } from './modules/common/redux/commonSagas';
import ToastContainer from './modules/toast/ToastContainer';
import { Routes } from './Routes';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCommonValues.request());
  }, [dispatch]);
  return (
    <>
      <Routes />
      <ToastContainer />
    </>
  );
}

export default App;

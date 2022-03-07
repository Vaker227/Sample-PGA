import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../redux/reducer';
import { IToastInfo } from './redux/toastReducer';
import ToastMessage from './ToastMessage';

const ToastContainer = () => {
  const list = useSelector<AppState, IToastInfo[]>((state) => state.toast.list);
  return (
    <div className="fixed top-[10%] right-10">
      <div className="space-y-3">
        {list.map((toast) => {
          return <ToastMessage key={toast.id} toast={toast} />;
        })}
      </div>
    </div>
  );
};

export default ToastContainer;

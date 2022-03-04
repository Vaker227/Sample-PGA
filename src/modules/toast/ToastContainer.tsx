import React from 'react';
import ToastMessage from './ToastMessage';
import { useToast } from './ToastProvier';

const ToastContainer = () => {
  const { list, removeToast } = useToast();
  return (
    <div className="fixed top-[10%] right-10">
      <div className="space-y-3">
        {list.map((toast) => {
          return (
            <ToastMessage key={toast.id} toast={toast} onRemove={removeToast} />
          );
        })}
      </div>
    </div>
  );
};

export default ToastContainer;

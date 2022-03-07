import React from 'react';
import { ICustomToastProps } from '../redux/toastReducer';

const ErrorToast = (props: ICustomToastProps) => {
  const { message, startDelay, stopDelay, onRemove } = props;
  return (
    <div
      className="relative w-80 rounded bg-red-100 py-5 px-9 ring-2 ring-red-500"
      onMouseEnter={() => startDelay()}
      onMouseLeave={() => stopDelay()}
    >
      <div className="relative flex items-center ">
        <i
          className="fa-solid fa-circle-exclamation absolute -left-6
         text-xl text-red-500 "
        ></i>
        {message}
      </div>
      <i
        className="fa-solid fa-xmark absolute right-2 top-0.5 cursor-pointer rounded-full text-xl hover:text-red-500"
        onClick={onRemove}
      ></i>
    </div>
  );
};

export default ErrorToast;

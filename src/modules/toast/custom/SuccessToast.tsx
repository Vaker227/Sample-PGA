import React from 'react';
import { ICustomToastProps } from '../redux/toastReducer';

const SuccessToast = (props: ICustomToastProps) => {
  const { message, startDelay, stopDelay, onRemove } = props;
  return (
    <div
      className="relative w-80 rounded bg-green-100 py-5 px-9 ring-2 ring-green-400"
      onMouseEnter={() => startDelay()}
      onMouseLeave={() => stopDelay()}
    >
      <div className="relative flex items-center ">
        <i
          className="fa-solid fa-circle-exclamation absolute -left-6
         text-xl text-green-500 "
        ></i>
        {message}
      </div>
      <i
        className="fa-solid fa-xmark absolute right-2 top-0.5 cursor-pointer rounded-full text-xl hover:text-green-500"
        onClick={onRemove}
      ></i>
    </div>
  );
};

export default SuccessToast;

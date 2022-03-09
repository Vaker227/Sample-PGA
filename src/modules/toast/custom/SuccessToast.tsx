import React from 'react';
import { ICustomToastProps } from '../redux/toastReducer';

const SuccessToast = (props: ICustomToastProps) => {
  const { message, startDelay, stopDelay, onRemove } = props;
  return (
    <div
      className="relative w-80 rounded bg-green-500 p-5 hover:bg-green-400"
      onMouseEnter={() => startDelay()}
      onMouseLeave={() => stopDelay()}
    >
      <div className="flex w-full gap-x-3">
        <div className="h-fit rounded-md bg-white py-1 px-2">
          <i
            className="fa-solid fa-check
          text-2xl text-green-500 "
          ></i>
        </div>
        <div className="text-white">{message}</div>
      </div>
      <i
        className="fa-solid fa-xmark absolute right-2 top-0.5 cursor-pointer rounded-full text-xl hover:text-white"
        onClick={onRemove}
      ></i>
    </div>
  );
};

export default SuccessToast;

import React from 'react';
import { ICustomToastProps } from '../redux/toastReducer';

const ErrorToast = (props: ICustomToastProps) => {
  const { message, startDelay, stopDelay, onRemove } = props;
  return (
    <div
      className="relative w-80 rounded bg-[#ff3d71] p-5 hover:bg-[#FF708D]"
      onMouseEnter={() => startDelay()}
      onMouseLeave={() => stopDelay()}
    >
      <div className="flex w-full gap-x-3">
        <div className="bg-third h-fit rounded-md py-1 px-2">
          <i
            className="fa-solid fa-circle-exclamation
          text-2xl text-[#ff3d71] "
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

export default ErrorToast;

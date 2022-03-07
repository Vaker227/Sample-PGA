import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { IToastInfo, removeToast } from './redux/toastReducer';

interface Props {
  toast: IToastInfo;
}

type ToastState = 'init' | 'state';

const ToastMessage = (props: Props) => {
  const { toast } = props;
  const dispatch = useDispatch();
  const [delayFlag, setDelayFlag] = useState(false);
  const [toastState, setToastState] = useState<ToastState>('init');

  const handleRemove = useCallback(() => {
    dispatch(removeToast(toast));
  }, [dispatch, toast]);

  // animation init
  useEffect(() => {
    setTimeout(() => setToastState('state'), 50);
  }, []);

  // delay
  useEffect(() => {
    if (typeof toast.duration !== 'number') {
      return;
    }
    if (delayFlag) {
      return;
    }
    const timing = setTimeout(handleRemove, toast.duration);
    return () => {
      clearTimeout(timing);
    };
  }, [handleRemove, toast.duration, delayFlag]);

  const handleDelay = (isDelay: boolean) => {
    setDelayFlag(isDelay);
  };

  // use custom template
  if (toast.template) {
    return (
      <div
        className={`transition-transform  ${
          toastState == 'init' ? 'translate-x-full' : 'translate-x-0'
        } hover:-translate-x-1`}
      >
        <toast.template
          message={toast.message}
          onRemove={handleRemove}
          startDelay={() => handleDelay(true)}
          stopDelay={() => handleDelay(false)}
        />
      </div>
    );
  }
  return (
    <div
      className="rounded bg-white p-3 ring"
      onMouseEnter={() => handleDelay(true)}
      onMouseLeave={() => handleDelay(false)}
    >
      {toast.message}
    </div>
  );
};

export default ToastMessage;

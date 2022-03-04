import React, { useCallback, useEffect, useState } from 'react';
import { IToastInfo } from './ToastProvier';

interface Props {
  toast: IToastInfo;
  onRemove(toast: IToastInfo): void;
}

type ToastState = 'init' | 'state';

const ToastMessage = (props: Props) => {
  const { toast, onRemove } = props;
  const [delayFlag, setDelayFlag] = useState(false);
  const [toastState, setToastState] = useState<ToastState>('init');

  const handleRemove = useCallback(() => {
    onRemove(toast), toast.duration;
  }, [onRemove, toast]);

  useEffect(() => {
    setTimeout(() => setToastState('state'), 50);
  }, []);

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

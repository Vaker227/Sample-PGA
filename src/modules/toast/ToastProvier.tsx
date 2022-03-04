import React, { useCallback, useContext, useState } from 'react';

export interface ICustomToastProps {
  onRemove(): void;
  message: string;
  startDelay(): void;
  stopDelay(): void;
}
export interface IToastInfo {
  template?: React.FC<ICustomToastProps>;
  message: string;
  duration: number | 'none';
  id?: number;
}
interface IToastContext {
  list: IToastInfo[];
  pushToast(toast: IToastInfo): void;
  removeToast(toast: IToastInfo): void;
}

export const ToastContext = React.createContext<IToastContext>({
  list: [],
  pushToast: () => {},
  removeToast: () => {},
});

const ToastProvider: React.FC = (props) => {
  const [listToast, setListToast] = useState<IToastInfo[]>([]);
  const pushToast = useCallback((newToast: IToastInfo) => {
    newToast.id = Date.now();
    setListToast((prev) => [...prev, newToast]);
  }, []);
  const removeToast = useCallback((removingToast: IToastInfo) => {
    setListToast((prev) => prev.filter((toast) => toast != removingToast));
  }, []);
  return (
    <ToastContext.Provider value={{ list: listToast, pushToast, removeToast }}>
      {props.children}
    </ToastContext.Provider>
  );
};

export default ToastProvider;

export const useToast = () => {
  return useContext(ToastContext);
};

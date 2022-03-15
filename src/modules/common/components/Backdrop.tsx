import React, { useRef } from 'react';

interface Props {
  show: boolean;
  children?: React.ReactNode;
  onClose?(): void;
  closeOnBackdrop?: boolean;
}

const Backdrop = (props: Props) => {
  const { show, children, onClose, closeOnBackdrop } = props;
  const backdropRef = useRef(null);
  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnBackdrop && e.target === backdropRef.current && onClose) {
      onClose();
    }
  };
  if (!show) {
    return <></>;
  }
  return (
    <div
      ref={backdropRef}
      className="absolute top-0 left-0 z-50 grid h-screen w-screen place-content-center bg-black/50"
      onClick={handleClose}
    >
      {children}
    </div>
  );
};

export default Backdrop;

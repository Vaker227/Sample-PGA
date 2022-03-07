import React from 'react';

interface Props {
  children: React.ReactNode;
  onClick?(): void;
  disabled?: boolean;
  selected?: boolean;
}

const PageSelectComponent = (props: Props) => {
  const { children, onClick, disabled, selected } = props;
  return (
    <div
      onClick={disabled ? undefined : onClick}
      className={`${selected && 'bg-purple-400'} inline w-10 cursor-pointer select-none p-2 text-center ${
        disabled ? 'opacity-50' : ' hover:bg-purple-400'
      }`}
    >
      {children}
    </div>
  );
};

export default React.memo(PageSelectComponent);

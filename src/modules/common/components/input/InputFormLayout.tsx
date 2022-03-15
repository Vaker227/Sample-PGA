import React from 'react';

interface Props {
  title?: string;
  required?: boolean;
  children: React.ReactNode;
  error?: string;
  lg?: boolean;
  smTitle?: boolean;
  helper?: string;
}

const InputFormLayout = (props: Props) => {
  const { title, required, children, error, lg, smTitle, helper } = props;
  return (
    <div className="flex w-full flex-wrap gap-x-5 gap-y-3 md:flex-nowrap">
      <div
        className={`w-full pt-[6px] after:ml-1 ${required && "after:text-red-500 after:content-['*']"}  ${
          smTitle ? 'md:w-1/6' : 'md:w-2/6'
        } md:text-right`}
      >
        {title}
      </div>
      <div className={`w-full ${lg ? 'md:w-3/6' : 'md:w-2/6'}`}>
        {children}
        {helper && <div className="mt-2 ml-2 w-full text-xs text-gray-500 ">{helper}</div>}
        {error && <div className="mt-2 ml-2 w-full text-red-500">{error}</div>}
      </div>
    </div>
  );
};

export default React.memo(InputFormLayout);

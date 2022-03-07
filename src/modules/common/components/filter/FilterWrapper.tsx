import React, { useState } from 'react';

interface Props {
  header: React.ReactNode;
  detail?: React.ReactNode;
}

const FilterWrapper = (props: Props) => {
  const { header, detail } = props;
  const [expand, setExpand] = useState(false);
  return (
    <div className=" relative my-10 w-full rounded border border-secondary bg-primary ">
      <div className="mb-4 flex w-full space-x-4 p-4 pb-0">{header}</div>
      <div
        className={`${expand ? 'max-h-[1000px] ' : 'max-h-0'} overflow-hidden transition-all duration-300
      `}
      >
        <div className={`border-t border-t-black p-4 `}>{detail}</div>
      </div>
      <div className="absolute -bottom-6 w-full text-center">
        <i
          className={
            'fa-solid fa-angles-down  cursor-pointer select-none rounded-br rounded-bl bg-primary py-1 px-6 text-white' +
            ' border border-secondary ' +
            (expand ? ' rotate-180 border-b-transparent' : ' border-t-transparent')
          }
          onClick={() => setExpand(!expand)}
        ></i>
      </div>
    </div>
  );
};

export default FilterWrapper;

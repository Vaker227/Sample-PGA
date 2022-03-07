import React, { useState } from 'react';

interface SelectProps {
  value: number;
  onChange(value: number): void;
}

const SelectRowPerPage = (props: SelectProps) => {
  const { value, onChange } = props;
  const [expand, setExpand] = useState(false);
  const options = [10, 25, 50, 75, 100];

  const handleChange = (value: number) => {
    setExpand(false);
    onChange(value);
  };
  return (
    <div tabIndex={0} className="relative w-20 bg-purple-400 px-3 py-1" onBlur={() => setExpand(false)}>
      <div className="flex cursor-pointer items-center justify-between" onClick={() => setExpand(true)}>
        <div>{value}</div>
        <i className="fa-solid fa-angle-down"></i>
      </div>
      {expand && (
        <div className="absolute left-0 z-30 h-3 w-20">
          {options.map((option) => (
            <div
              key={option}
              className={`${option == value ? 'bg-sky-500' : 'bg-purple-400'} cursor-pointer px-3 hover:bg-sky-500`}
              onClick={() => handleChange(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

interface Props {
  total: number;
  count: number;
  onSelectRowPerPage(number: number): void;
}

const RowMangementComponent = (props: Props) => {
  const { total, count, onSelectRowPerPage } = props;

  return (
    <div className="flex grow items-center justify-start gap-x-3">
      <div>
        <span className="font-bold">{total}</span> items
      </div>
      <SelectRowPerPage value={count} onChange={onSelectRowPerPage} />
      per page
    </div>
  );
};

export default RowMangementComponent;

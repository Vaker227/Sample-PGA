import React from 'react';

interface Props {
  value: boolean;
  onChange?(changeTo: boolean): void;
  transparent?: boolean;
}

const Checkbox = (props: Props) => {
  const { value, onChange, transparent } = props;
  return (
    <div
      className={`flex h-[18px] w-[18px] shrink-0 cursor-pointer place-content-center rounded-sm transition-all ${
        value ? 'bg-purple-800' : 'bg-[#4F4F76] '
      } ${transparent && 'bg-transparent'} ring-1 ring-secondary  hover:ring-gray-500 `}
      onClick={() => onChange && onChange(!value)}
    >
      {value && <i className="fa-solid fa-check  text-sm"></i>}
    </div>
  );
};

export default React.memo(Checkbox);

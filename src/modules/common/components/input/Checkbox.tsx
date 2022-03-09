import React from 'react';

interface Props {
  value: boolean;
  onChange?(changeTo: boolean): void;
  transparent?: boolean;
  white?: boolean;
}

const Checkbox = (props: Props) => {
  const { value, onChange, transparent, white } = props;
  return (
    <div
      className={`flex h-[18px] w-[18px] shrink-0 cursor-pointer place-content-center rounded-sm transition-all ${
        value ? 'bg-purple-800' : 'bg-[#4F4F76] '
      } ${transparent && 'bg-transparent'} ${white && 'bg-white'} ring-1 ring-secondary  hover:ring-gray-500 `}
      onClick={() => onChange && onChange(!value)}
    >
      {value && <i className="fa-solid fa-check  text-sm"></i>}
    </div>
  );
};

export default React.memo(Checkbox);

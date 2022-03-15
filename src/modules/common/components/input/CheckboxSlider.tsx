import React from 'react';

interface Props {
  value: boolean;
  onChange?(changeTo: boolean): void;
}

const CheckboxSlider = (props: Props) => {
  const { value, onChange } = props;
  return (
    <div
      className={`relative flex h-[20px] w-[54px] shrink-0 cursor-pointer select-none items-center justify-between rounded-sm border-2 border-[#1ab394] transition-colors ${
        value ? 'bg-[#1ab394]' : 'bg-white '
      } ring-1 ring-secondary  hover:ring-gray-500 `}
      onClick={() => onChange && onChange(!value)}
    >
      <div className={`absolute left-1 opacity-0 transition-opacity duration-300 ${value && 'opacity-100'}`}>YES</div>
      <div
        className={`absolute right-1 text-gray-600 opacity-0 transition-opacity duration-300  ${
          !value && 'opacity-100'
        }`}
      >
        NO
      </div>
      <div
        className={`absolute h-[20px] w-[20px] rounded border-2 border-[#1ab394] transition-transform duration-300 ${
          value && 'translate-x-[32px]'
        } bg-white`}
      ></div>
    </div>
  );
};

export default React.memo(CheckboxSlider);

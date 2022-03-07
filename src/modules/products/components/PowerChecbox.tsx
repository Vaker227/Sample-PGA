import React from 'react';

interface Props {
  value: boolean;
  onChange?(changeTo: boolean): void;
}

const PowerChecbox = (props: Props) => {
  const { value, onChange } = props;

  return (
    <div
      className={`group flex h-[18px] w-[18px] shrink-0 cursor-pointer place-content-center transition-all`}
      onClick={() => onChange && onChange(!value)}
    >
      <i
        className={`fa-solid fa-power-off ${value ? 'text-green-600' : 'text-gray-400 '} group-hover:text-green-400`}
      ></i>
    </div>
  );
};

export default PowerChecbox;

import React, { useMemo } from 'react';

interface Props {
  value: boolean;
  onChange?(changeTo: boolean): void;
  transparent?: boolean;
  white?: boolean;
}

const Checkbox = (props: Props) => {
  const { value, onChange, transparent, white } = props;
  const checkBg = useMemo(
    () => (transparent ? 'bg-transparent' : white ? 'bg-[#005CC8]' : 'bg-purple-800'),
    [transparent, white],
  );
  const uncheckBg = useMemo(
    () => (transparent ? 'bg-transparent' : white ? 'bg-white' : 'bg-[#4F4F76]'),
    [transparent, white],
  );
  return (
    <div
      className={`flex h-[18px] w-[18px] shrink-0 cursor-pointer place-content-center rounded-sm transition-all ${
        value ? checkBg : uncheckBg
      } ring-1 ring-secondary  hover:ring-gray-500 `}
      onClick={() => onChange && onChange(!value)}
    >
      {value && <i className={`fa-solid fa-check text-sm `}></i>}
    </div>
  );
};

export default React.memo(Checkbox);

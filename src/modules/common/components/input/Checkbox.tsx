import React from 'react';

interface Props {
  selected: boolean;
  onChange?(changeTo: boolean): void;
}

const Checkbox = (props: Props) => {
  const { selected, onChange } = props;
  return (
    <div
      className={`flex h-[18px] w-[18px] shrink-0 place-content-center rounded-sm transition-all ${
        selected ? 'bg-purple-800' : 'bg-[#4F4F76] ring-1 ring-white'
      } `}
      onClick={() => onChange && onChange(!selected)}
    >
      {selected && <i className="fa-solid fa-check  text-sm"></i>}
    </div>
  );
};

export default React.memo(Checkbox);

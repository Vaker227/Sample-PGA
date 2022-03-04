import React, { useCallback, useState } from 'react';
import { SelectOption } from '../../../../models/utils/input';

interface Props {
  title: string;
  list: SelectOption[];
  onSelect(value: string): void;
  selectedValue: string;
  width?: number;
}

function SelectionComponent(props: Props) {
  const { title, list, onSelect, selectedValue, width } = props;
  const [expand, setExpand] = useState(false);

  const handleExpand = () => {
    setExpand(!expand);
  };
  const handleBlur = useCallback(() => {
    setExpand(false);
  }, []);

  const handleSelect = (selection: SelectOption) => {
    onSelect(selection.value);
    setExpand(false);
  };

  return (
    <div
      className="relative flex-auto cursor-pointer select-none font-semibold text-white"
      onBlur={handleBlur}
      tabIndex={0}
    >
      <div
        className={
          'flex items-center  rounded border py-2 px-4 shadow' +
          ' border-[#13132b] bg-[#252547]' +
          ' hover:border-[#13132b] hover:bg-[#1b1b38]' +
          ' focus:border-[#a16eff] focus:outline-none' +
          ' hover:focus:border-[#13132b] hover:focus:bg-[#1b1b38]'
        }
        onClick={handleExpand}
        style={width ? { width } : {}}
      >
        <div className="flex-shrink truncate">
          {selectedValue
            ? list.find((option) => option.value == selectedValue)?.label
            : title}
        </div>
        <i
          className={`fa-solid fa-angle-down ml-auto transition-transform duration-300 ${
            expand ? '' : 'rotate-180'
          }`}
        ></i>
      </div>
      <div
        className={`${
          expand ? '' : 'hidden'
        } absolute z-10 max-h-72 w-max overflow-auto bg-[#323259]`}
      >
        <div
          className={`${
            selectedValue == '' ? 'bg-purple-800' : ''
          } px-4 py-2 transition hover:bg-slate-100/50`}
          onClick={() => handleSelect({ label: title, value: '' })}
        >
          {title}
        </div>
        {list.map((value: SelectOption, index) => {
          return (
            <div
              key={index}
              className={`${
                value.value == selectedValue ? 'bg-purple-800' : ''
              } px-4 py-2 transition hover:bg-slate-100/50 `}
              onClick={() => handleSelect(value)}
            >
              {value.label}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SelectionComponent;

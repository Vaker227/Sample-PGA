import React, { useCallback, useState } from 'react';
import { SelectOption } from '../../../../models/utils/input';

interface Props {
  title: string;
  list: SelectOption[];
  onChange(value: string): void;
  selectedValue: string;
  width?: number;
  defaultValue?: string;
  returnable?: boolean;
}

function SelectionComponent(props: Props) {
  const { title, list, onChange, selectedValue, width, defaultValue, returnable } = props;
  const [expand, setExpand] = useState(false);
  const handleExpand = () => {
    setExpand(!expand);
  };
  const handleBlur = useCallback(() => {
    setExpand(false);
  }, []);

  const handleSelect = (selection: SelectOption) => {
    onChange(selection.value);
    setExpand(false);
  };

  return (
    <div
      className="relative w-full cursor-pointer select-none font-semibold text-white"
      onBlur={handleBlur}
      tabIndex={0}
    >
      <div
        className={
          'flex items-center  rounded border py-2 px-4 shadow' +
          ' border-secondary bg-[#252547]' +
          ' hover:border-secondary hover:bg-[#1b1b38]' +
          ' focus:border-[#a16eff] focus:outline-none' +
          ' hover:focus:border-secondary hover:focus:bg-[#1b1b38]'
        }
        onClick={handleExpand}
        style={width ? { width } : {}}
      >
        <div className="mr-2 flex-shrink truncate">
          {selectedValue ? list.find((option) => option.value == selectedValue)?.label || title : title}
        </div>
        <i
          className={`fa-solid fa-angle-down ml-auto transition-transform duration-300 ${expand ? '' : 'rotate-180'}`}
        ></i>
      </div>
      <div
        className={`${
          expand ? '' : 'hidden'
        } absolute z-50 max-h-72 w-full max-w-sm overflow-auto border border-secondary bg-primary`}
      >
        {returnable && (
          <div
            className={`${selectedValue == '' ? 'bg-purple-800' : ''} px-4 py-2 transition hover:bg-slate-100/50`}
            onClick={() => handleSelect({ label: title, value: defaultValue || '' })}
          >
            {title}
          </div>
        )}
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

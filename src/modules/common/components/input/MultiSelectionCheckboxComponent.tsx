import React, { useCallback, useState } from 'react';
import { SelectOption } from '../../../../models/utils/input';
import Checkbox from './Checkbox';

interface CheckboxSelectionProps {
  option: SelectOption;
  onChange(option: SelectOption): void;
  selected: boolean;
}

const CheckboxSelection = (props: CheckboxSelectionProps) => {
  const { option, selected, onChange } = props;
  const handleChange = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    onChange(option);
  };
  return (
    <div
      className={`flex items-center  px-4 py-2 transition hover:bg-slate-100/50 `}
      onClick={handleChange}
    >
      <Checkbox selected={selected} />
      <div className="p-1">{option.label}</div>
    </div>
  );
};

interface Props {
  title: string;
  list: SelectOption[];
  onChange(values: string[]): void;
  selectedValues: string[];
  width?: number;
}

function MultiSelectionCheckboxComponent(props: Props) {
  const { title, list, onChange, selectedValues, width } = props;
  const [expand, setExpand] = useState(false);
  const handleExpand = () => {
    setExpand(!expand);
  };
  const handleBlur = useCallback(() => {
    setExpand(false);
  }, []);
  const handleChange = (changingOption: SelectOption) => {
    const index = selectedValues.findIndex(
      (value) => value == changingOption.value,
    );
    if (index < 0) {
      const newArray = [...selectedValues, changingOption.value];
      onChange(newArray);
    } else {
      selectedValues.splice(index, 1);
      const newArray = [...selectedValues];
      onChange([...newArray]);
    }
  };
  return (
    <div
      className="relative w-48 flex-auto cursor-pointer select-none font-semibold text-white"
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
        <div className="flex-shrink">
          {selectedValues.length
            ? list
                .filter((option) => selectedValues.includes(option.value))
                .map((option) => option.label)
                .join(', ')
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
        } absolute z-10 max-h-72 min-w-full overflow-auto bg-[#323259]`}
      >
        {list.map((option: SelectOption) => {
          const isSelected = selectedValues.includes(option.value);
          return (
            <CheckboxSelection
              key={option.value}
              option={option}
              selected={isSelected}
              onChange={handleChange}
            />
          );
        })}
      </div>
    </div>
  );
}

export default MultiSelectionCheckboxComponent;

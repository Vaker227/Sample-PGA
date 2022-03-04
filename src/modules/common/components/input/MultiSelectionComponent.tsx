import React, { useCallback, useState } from 'react';
import { SelectOption } from '../../../../models/utils/input';

interface OptionSelectedProps {
  option: SelectOption;
  onRemove(option: SelectOption): void;
}

const OptionSelected = (props: OptionSelectedProps) => {
  const { option, onRemove } = props;
  const handleRemove = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    onRemove(option);
  };
  return (
    <div className="my-[2px] flex w-fit items-center divide-x bg-[#a16eff] text-sm">
      <i
        className="fa-solid fa-xmark cursor-pointer p-[7px] hover:bg-white/30"
        onClick={handleRemove}
      ></i>
      <div className="p-1">{option.label}</div>
    </div>
  );
};

interface MultiSelectionProps {
  title: string;
  list: SelectOption[];
  selectedValues: string[];
  onChange(values: string[]): void;
  width?: number;
}

function MultiSelectionComponent(props: MultiSelectionProps) {
  const { title, list, selectedValues, width, onChange } = props;
  const [expand, setExpand] = useState(false);

  const handleExpand = () => {
    setExpand(!expand);
  };
  const handleBlur = useCallback(() => {
    setExpand(false);
  }, []);

  const handleSelect = (selection: SelectOption) => {
    onChange([...selectedValues, selection.value]);
    setExpand(false);
  };
  const handleRemove = (removingOption: SelectOption) => {
    const index = selectedValues.findIndex(
      (value) => value == removingOption.value,
    );
    selectedValues.splice(index, 1);
    onChange([...selectedValues]);
  };
  return (
    <div
      className="relative w-48 flex-auto select-none font-semibold text-white"
      onBlur={handleBlur}
      tabIndex={0}
    >
      <div
        className={
          'flex items-center rounded border py-1 px-4 shadow' +
          ' border-[#13132b] bg-[#252547]' +
          ' hover:border-[#13132b] hover:bg-[#1b1b38]' +
          ' focus:border-[#a16eff] focus:outline-none' +
          ' hover:focus:border-[#13132b] hover:focus:bg-[#1b1b38]'
        }
        onClick={handleExpand}
        style={width ? { width } : {}}
      >
        {/* title  */}
        <div className="mr-2 flex flex-wrap space-x-2">
          {selectedValues.length ? (
            list.map((option) =>
              selectedValues.includes(option.value) ? (
                <OptionSelected
                  key={option.value}
                  option={option}
                  onRemove={handleRemove}
                />
              ) : null,
            )
          ) : (
            <span className="p-1">{title}</span>
          )}
        </div>
        <i
          className={`fa-solid fa-angle-down ml-auto shrink-0 cursor-pointer transition-transform duration-300 ${
            expand ? '' : 'rotate-180'
          }`}
        ></i>
      </div>
      <div
        className={`${
          expand ? '' : 'hidden'
        } absolute z-10 max-h-72 w-max cursor-pointer overflow-auto bg-[#323259]`}
      >
        <div
          className={`${
            selectedValues.length == 0 ? 'bg-purple-800' : ''
          } px-4 py-2 transition hover:bg-slate-100/50`}
          onClick={() => handleSelect({ label: title, value: '' })}
        >
          {title}
        </div>
        {list.map((option: SelectOption, index) => {
          const isSelected = selectedValues.includes(option.value);
          return (
            <div
              key={index}
              className={`${
                isSelected ? 'bg-purple-800' : ''
              } px-4 py-2 transition hover:bg-slate-100/50 `}
              onClick={() =>
                isSelected ? handleRemove(option) : handleSelect(option)
              }
            >
              {option.label}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MultiSelectionComponent;

import React, { useCallback, useState } from 'react';
import { SelectOption } from '../../../../models/utils/input';
import Checkbox from './Checkbox';
import useSelectIndex from './useSelectIndex';

interface CheckboxSelectionProps {
  option: SelectOption;
  onChange(option: SelectOption): void;
  selected: boolean;
  focus?: boolean;
}

const CheckboxSelection = React.forwardRef<HTMLDivElement, CheckboxSelectionProps>(function CheckBoxForwardRef(
  props: CheckboxSelectionProps,
  ref,
) {
  const { option, selected, onChange, focus } = props;
  const handleChange = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    onChange(option);
  };
  return (
    <div
      ref={ref}
      className={`${focus && 'bg-slate-100/50'} flex items-center px-4 py-2 transition hover:bg-slate-100/50 `}
      onClick={handleChange}
    >
      <Checkbox value={selected} />
      <div className="ml-1 p-1">{option.label}</div>
    </div>
  );
});

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

  const { focusingElement, wrapperElement, focusIndex, handleSelectByKeyBoard } = useSelectIndex(0, 0, list.length - 1);

  const handleChange = (changingOption: SelectOption) => {
    const index = selectedValues.findIndex((value) => value == changingOption.value);
    if (index < 0) {
      const newArray = [...selectedValues, changingOption.value];
      onChange(newArray);
    } else {
      selectedValues.splice(index, 1);
      const newArray = [...selectedValues];
      onChange([...newArray]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (expand) {
      handleSelectByKeyBoard(e);
    }
  };

  const renderOptionList = () => {
    const rows: React.ReactNode[] = [];
    let lastCategory: string;
    list.forEach((option: SelectOption, index: number) => {
      if (option.parent && lastCategory != option.parent) {
        lastCategory = option.parent;
        rows.push(
          <div key={option.parent} className="p-3 pl-2 font-semibold capitalize text-gray-400">
            {option.parent}
          </div>,
        );
      }
      const isSelected = selectedValues.includes(option.value);
      rows.push(
        <CheckboxSelection
          key={option.value}
          option={option}
          focus={index == focusIndex}
          ref={index == focusIndex ? focusingElement : undefined}
          selected={isSelected}
          onChange={handleChange}
        />,
      );
    });
    return rows;
  };
  return (
    <div
      className="relative w-full cursor-pointer select-none font-semibold text-white"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {expand && <div className="fixed top-0 left-0 h-screen w-screen" onClick={handleBlur}></div>}
      <div
        className={
          'flex items-center gap-x-2 rounded border py-2 px-4 shadow' +
          ' border-secondary bg-[#252547]' +
          ' hover:border-secondary hover:bg-[#1b1b38]' +
          ' focus:border-[#a16eff] focus:outline-none' +
          ' hover:focus:border-secondary hover:focus:bg-[#1b1b38]'
        }
        onClick={handleExpand}
        style={width ? { width } : {}}
      >
        <div className="">
          {selectedValues.length
            ? list
                .filter((option) => selectedValues.includes(option.value))
                .map((option) => option.label)
                .join(', ')
            : title}
        </div>
        <i
          className={`fa-solid fa-angle-down ml-auto transition-transform duration-300 ${expand ? '' : 'rotate-180'}`}
        ></i>
      </div>
      <div
        ref={wrapperElement}
        className={`${
          expand ? '' : 'hidden'
        } absolute z-10 max-h-72 min-w-full overflow-auto border border-secondary bg-primary`}
      >
        {renderOptionList()}
      </div>
    </div>
  );
}

export default React.memo(MultiSelectionCheckboxComponent);

import React, { useCallback, useState } from 'react';
import { SelectOption } from '../../../../models/utils/input';
import useSelectIndex from '../../hooks/useSelectIndex';

interface Props {
  title: string;
  list: SelectOption[];
  onChange(value: string): void;
  onBlur?(): void;
  selectedValue: string;
  width?: number;
  defaultValue?: string;
  returnable?: boolean;
}

function SelectionComponent(props: Props) {
  const { title, list, onChange, selectedValue, width, defaultValue, returnable, onBlur } = props;
  const [expand, setExpand] = useState(false);

  const handleExpand = () => {
    setExpand(!expand);
  };

  const handleBlur = useCallback(() => {
    setExpand(false);
    onBlur && onBlur();
  }, [onBlur]);

  const handleSelect = (selection: SelectOption, index: number) => {
    setFocusIndex(index);
    setExpand(false);
    onChange(selection.value);
  };

  const { focusingElement, wrapperElement, focusIndex, setFocusIndex, handleSelectByKeyBoard } = useSelectIndex(
    0,
    returnable ? -1 : 0,
    list.length - 1,
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (expand) {
      handleSelectByKeyBoard(e);
    }
  };

  return (
    <div className="relative w-full select-none font-semibold text-white" tabIndex={0} onKeyDown={handleKeyDown}>
      {expand && <div className="fixed top-0 left-0 h-screen w-screen " onClick={handleBlur}></div>}
      <div
        className={
          'flex cursor-pointer  items-center rounded border py-2 px-4 shadow' +
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
        ref={wrapperElement}
        className={`${
          expand ? '' : 'hidden'
        } absolute z-50 max-h-72 w-full max-w-sm overflow-auto border border-secondary bg-primary`}
      >
        {returnable && (
          <div
            ref={focusIndex == -1 ? focusingElement : undefined}
            className={`${
              selectedValue == '' ? 'bg-purple-800' : focusIndex == -1 ? 'bg-slate-100/50' : ''
            } cursor-pointer px-4 py-2 transition hover:bg-slate-100/50`}
            onClick={() => handleSelect({ label: title, value: defaultValue || '' }, -1)}
          >
            {title}
          </div>
        )}
        {list.map((option: SelectOption, index) => {
          return (
            <div
              key={option.value || option.label}
              ref={focusIndex == index ? focusingElement : undefined}
              className={` ${
                option.value == selectedValue ? 'bg-purple-800' : focusIndex == index ? 'bg-slate-100/50' : ''
              }  cursor-pointer px-4 py-2 transition hover:bg-slate-100/50`}
              onClick={() => handleSelect(option, index)}
            >
              {option.label}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SelectionComponent;

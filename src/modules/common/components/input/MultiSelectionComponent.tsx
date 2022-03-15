import React, { useCallback, useEffect, useRef, useState } from 'react';
import { SelectOption } from '../../../../models/utils/input';
import useSelectIndex from './useSelectIndex';

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
      <i className="fa-solid fa-xmark cursor-pointer p-[7px] hover:bg-white/30" onClick={handleRemove}></i>
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
  onBlur?(): void;
}

function MultiSelectionComponent(props: MultiSelectionProps) {
  const { title, list, selectedValues, width, onChange, onBlur } = props;
  const [filteredList, setFilterdList] = useState<SelectOption[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [text, setText] = useState('');
  const [focusing, setFocusing] = useState(false);
  useEffect(() => {
    if (focusing) {
      setFilterdList(list.filter((option) => option.label.toLowerCase().includes(text.toLowerCase())));
    }
  }, [list, text]); // eslint-disable-line

  const { focusingElement, wrapperElement, focusIndex, handleSelectByKeyBoard } = useSelectIndex(
    0,
    0,
    filteredList.length - 1,
  );

  const handleFocus = useCallback(() => {
    setFocusing(true);
    setFilterdList(list.filter((option) => option.label.toLowerCase().includes(text.toLowerCase())));
  }, [list, text]);

  const handleBlur = useCallback(() => {
    setFocusing(false);
    onBlur && onBlur();
  }, [onBlur]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    handleSelectByKeyBoard(e);
  }, []); // eslint-disable-line
  const handleSelect = (selection: SelectOption) => {
    console.log([...selectedValues, selection.value]);
    onChange([...selectedValues, selection.value]);
    inputRef.current?.focus();
  };
  const handleRemove = (removingOption: SelectOption) => {
    const index = selectedValues.findIndex((value) => value == removingOption.value);
    selectedValues.splice(index, 1);
    onChange([...selectedValues]);
  };
  return (
    <div className="relative w-full select-none font-semibold text-white" tabIndex={0}>
      {focusing && <div className="fixed top-0 left-0 h-screen w-screen" onClick={handleBlur}></div>}
      <div
        className={
          'flex min-h-[42px] items-center rounded border py-1 px-4 shadow' +
          ' border-secondary bg-[#252547]' +
          ' hover:border-secondary hover:bg-[#1b1b38]' +
          ' focus:border-[#a16eff] focus:outline-none' +
          ' hover:focus:border-secondary hover:focus:bg-[#1b1b38]'
        }
        onClick={() => inputRef.current?.focus()}
        style={width ? { width } : {}}
      >
        {/* title  */}
        <div className="mr-2 flex flex-wrap space-x-2">
          {selectedValues.length ? (
            list.map((option) =>
              selectedValues.includes(option.value) ? (
                <OptionSelected key={option.value} option={option} onRemove={handleRemove} />
              ) : null,
            )
          ) : (
            <span className="p-1">{title}</span>
          )}
          <input
            ref={inputRef}
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="bg-transparent font-semibold outline-none"
            onFocus={handleFocus}
            onKeyDown={handleKeyDown}
          />
        </div>
        <i
          className={`fa-solid fa-angle-down ml-auto shrink-0 cursor-pointer transition-transform duration-300 ${
            focusing ? '' : 'rotate-180'
          }`}
        ></i>
      </div>
      <div
        ref={wrapperElement}
        className={`${focusing ? '' : 'hidden'} absolute z-10 max-h-72 w-full cursor-pointer overflow-auto bg-primary`}
      >
        {filteredList.map((option: SelectOption, index) => {
          const isSelected = selectedValues.includes(option.value);
          return (
            <div
              key={index}
              ref={focusIndex == index ? focusingElement : undefined}
              className={`${
                isSelected ? 'bg-purple-800' : focusIndex == index ? 'bg-slate-100/50' : ''
              } px-4 py-2 transition hover:bg-slate-100/50 `}
              onClick={() => (isSelected ? handleRemove(option) : handleSelect(option))}
            >
              {option.label}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default React.memo(MultiSelectionComponent);

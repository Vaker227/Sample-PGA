import React, { useCallback, useEffect, useState } from 'react';
import { SelectOption } from '../../../../models/utils/input';
import useSelectIndex from '../../hooks/useSelectIndex';

interface Props {
  list: SelectOption[];
  onSelect(value: string): void;
  selectedValue?: string;
  onBlur?(): void;
  selectable?: boolean;
  placeholder?: string;
}

const SuggestiveInputStatic = (props: Props) => {
  const { list, onSelect, selectedValue, onBlur, selectable, placeholder } = props;
  const [text, setText] = useState('');
  const [expand, setExpand] = useState(false);
  const [filteredList, setFilteredList] = useState<SelectOption[]>([]);
  const [focusing, setFocusing] = useState(false);

  const { focusingElement, wrapperElement, focusIndex, handleSelectByKeyBoard } = useSelectIndex(
    0,
    0,
    filteredList.length,
  );

  const handleSelect = useCallback(
    (option: SelectOption) => {
      setExpand(false);
      onSelect(option.value);
      setText('');
      setFocusing(false);
    },
    [onSelect],
  );
  useEffect(() => {
    setFilteredList(list.filter((option) => option.label.toLowerCase().includes(text.toLowerCase())));
    if (focusing) {
      setExpand(true);
    }
  }, [list, text]); // eslint-disable-line

  const handleTextChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    setFocusing(true);
  }, []);

  const handleBlur = useCallback(() => {
    setExpand(false);
    onSelect('');
    onBlur && onBlur();
  }, [onSelect, onBlur]);

  const handleFocus = useCallback(() => {
    setExpand(true);
    setFocusing(true);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (expand) {
      handleSelectByKeyBoard(e);
    }
  };

  return (
    <div className="relative">
      {expand && <div className="fixed top-0 left-0 h-screen w-screen " onClick={handleBlur}></div>}
      <input
        className={
          ' w-full rounded border py-2 px-4 font-semibold text-white shadow transition duration-300' +
          ' border-secondary bg-[#252547]' +
          ' hover:border-secondary hover:bg-[#1b1b38]' +
          ' focus:border-[#a16eff] focus:outline-none' +
          ' hover:focus:border-secondary hover:focus:bg-[#1b1b38]' +
          ` ${selectedValue ? 'placeholder:text-white' : 'placeholder:font-normal placeholder:text-gray-400'} `
        }
        placeholder={list.find((option) => option.value === selectedValue)?.label || placeholder}
        type="text"
        value={text}
        onChange={handleTextChange}
        onFocus={selectable ? handleFocus : undefined}
        onKeyDown={handleKeyDown}
      />
      {expand && (
        <div
          ref={wrapperElement}
          className={`absolute z-50 max-h-72 max-w-sm overflow-auto border border-secondary bg-primary`}
        >
          {filteredList.map((option: SelectOption, index) => {
            return (
              <div
                key={option.value}
                ref={index == focusIndex ? focusingElement : undefined}
                className={`${
                  focusIndex == index && 'bg-slate-100/50'
                } cursor-pointer px-4 py-2 transition hover:bg-slate-100/50 `}
                onClick={() => handleSelect(option)}
              >
                {option.label}
              </div>
            );
          })}
          {!filteredList.length && text !== '' && <div className={`w-full px-4 py-2 `}>Not found</div>}
        </div>
      )}
    </div>
  );
};

export default React.memo(SuggestiveInputStatic);

import React, { useCallback, useEffect, useState } from 'react';
import { SelectOption } from '../../../../models/utils/input';
import useSelectIndex from '../../hooks/useSelectIndex';

interface Props {
  list: SelectOption[];
  onChangeText(text: string): void;
  onSelect(value: string): void;
  placeholder?: string;
  onBlur?(): void;
  defaultText?: string;
}

const SuggestiveInput = (props: Props) => {
  const { list, onChangeText, onSelect, placeholder, onBlur, defaultText } = props;
  const [text, setText] = useState(defaultText);
  const [expand, setExpand] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const [inputDebounce, setInputDebounce] = useState<NodeJS.Timeout>();

  const { focusingElement, wrapperElement, focusIndex, handleSelectByKeyBoard } = useSelectIndex(0, 0, list.length - 1);

  useEffect(() => {
    if (searching) {
      setLoading(false);
      setExpand(true);
      setSearching(false);
    }
  }, [list]); /* eslint-disable-line */ // only change when focus(searching)

  useEffect(() => {
    setText(defaultText);
  }, [defaultText]);

  const handleChangeText = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const pattern = e.target.value;
      setText(pattern);
      setExpand(false);
      setLoading(pattern !== '');
      if (inputDebounce) clearTimeout(inputDebounce);
      setInputDebounce(
        setTimeout(() => {
          if (pattern == '') {
            onSelect('');
            return;
          }
          setSearching(true);
          onChangeText(pattern);
        }, 1000),
      );
    },
    [onChangeText, inputDebounce, onSelect],
  );

  const handleSelect = useCallback(
    (option: SelectOption) => {
      onSelect(option.value);
      setText(option.label);
      setExpand(false);
    },
    [onSelect],
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (expand) {
      handleSelectByKeyBoard(e);
    }
  };

  const handleBlur = useCallback(() => {
    onSelect('');
    setExpand(false);
    onBlur && onBlur();
  }, [onSelect, onBlur]);
  return (
    <div className="relative">
      {expand && <div className="fixed top-0 left-0 h-screen w-screen " onClick={handleBlur}></div>}
      <input
        className={
          ' w-full rounded border py-2 pl-4 pr-12 font-semibold text-white shadow transition duration-300' +
          ' border-secondary bg-[#252547]' +
          ' hover:border-secondary hover:bg-[#1b1b38]' +
          ' focus:border-[#a16eff] focus:outline-none' +
          ' hover:focus:border-secondary hover:focus:bg-[#1b1b38]'
        }
        placeholder={placeholder}
        type="text"
        value={text}
        onChange={handleChangeText}
        onKeyDown={handleKeyDown}
      />
      {loading && (
        <div className="absolute right-3 top-2 h-7 w-7 animate-spin rounded-full border-2 border-white border-t-transparent "></div>
      )}
      {expand && (
        <div
          ref={wrapperElement}
          className={`absolute z-50 max-h-72 max-w-sm overflow-auto border border-secondary bg-primary`}
        >
          {list.map((option: SelectOption, index) => {
            return (
              <div
                key={option.value}
                ref={focusIndex == index ? focusingElement : undefined}
                className={`cursor-pointer px-4 py-2 transition hover:bg-slate-100/50 ${
                  focusIndex == index && 'bg-slate-100/50'
                }`}
                onClick={() => handleSelect(option)}
              >
                {option.label}
              </div>
            );
          })}
          {!list.length && !loading && text !== '' && <div className={`w-full px-4 py-2 `}>Not found</div>}
        </div>
      )}
    </div>
  );
};

export default React.memo(SuggestiveInput);

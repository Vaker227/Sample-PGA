import React, { useCallback, useEffect, useState } from 'react';
import { API_PATHS } from '../../../../configs/api';
import { SelectOption } from '../../../../models/utils/input';
import { IVendor } from '../../../../models/vendor';
import { CustomFetch } from '../../../common/utils';

interface Props {
  onChange(value: string): void;
}

const InputSearchVendor = (props: Props) => {
  const [text, setText] = useState('');
  const [isSelected, setIsSelected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<SelectOption[]>([]);

  useEffect(() => {
    if (text == '' || isSelected) return;
    setLoading(true);
    const timing = setTimeout(async () => {
      const response = await CustomFetch(API_PATHS.getVendorList, 'post', { search: text });
      setLoading(false);
      if (response.errors) {
        return;
      }
      setOptions(response.data.map((vendor: IVendor) => ({ label: vendor.name, value: vendor.id })));
    }, 1000);
    return () => {
      setLoading(false);
      clearTimeout(timing);
    };
  }, [text]);

  const handleChangeText = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setIsSelected(false);
    setText(e.target.value);
  }, []);

  const handleSelectVendor = useCallback(
    (option: SelectOption) => {
      props.onChange(option.value);
      setText(option.label);
      setOptions([]);
      setIsSelected(true);
    },
    [props],
  );
  return (
    <div className="relative">
      <input
        className={
          ' w-full rounded border py-2 pl-4 pr-12 font-semibold text-white shadow transition duration-300' +
          ' border-secondary bg-[#252547]' +
          ' hover:border-secondary hover:bg-[#1b1b38]' +
          ' focus:border-[#a16eff] focus:outline-none' +
          ' hover:focus:border-secondary hover:focus:bg-[#1b1b38]'
        }
        type="text"
        value={text}
        onChange={handleChangeText}
      />
      {loading && (
        <div className="absolute right-3 top-2 h-7 w-7 animate-spin rounded-full border-2 border-white border-t-transparent "></div>
      )}
      <div className={`absolute z-50 max-h-72 max-w-sm overflow-auto border border-secondary bg-primary`}>
        {options.map((option: SelectOption) => {
          return (
            <div
              key={option.value}
              className={`cursor-pointer px-4 py-2 transition hover:bg-slate-100/50 `}
              onClick={() => handleSelectVendor(option)}
            >
              {option.label}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InputSearchVendor;

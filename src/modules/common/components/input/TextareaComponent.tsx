import React from 'react';

interface Props {
  value?: string;
  onChange?(value: string): void;
  onBlur?(): void;
}

const TextareaComponent = (props: Props) => {
  const { value, onChange, onBlur } = props;
  return (
    <textarea
      className={
        ' w-full rounded border py-2 px-4 font-semibold text-white shadow transition duration-300' +
        ' border-secondary bg-[#252547]' +
        ' hover:border-secondary hover:bg-[#1b1b38]' +
        ' focus:border-[#a16eff] focus:outline-none' +
        ' hover:focus:border-secondary hover:focus:bg-[#1b1b38]'
      }
      value={value}
      onChange={(e) => onChange && onChange(e.target.value)}
      onBlur={onBlur}
    ></textarea>
  );
};

export default TextareaComponent;

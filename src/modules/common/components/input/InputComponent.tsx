import React from 'react';

interface Props {
  value?: string;
  onChange?(e: React.ChangeEvent<HTMLInputElement>): void;
  placeholder?: string;
}

function InputComponent(props: Props) {
  return (
    <input
      className={
        ' w-full rounded border py-2 px-4 font-semibold text-white shadow transition duration-300' +
        ' border-secondary bg-[#252547]' +
        ' hover:border-secondary hover:bg-[#1b1b38]' +
        ' focus:border-[#a16eff] focus:outline-none' +
        ' hover:focus:border-secondary hover:focus:bg-[#1b1b38]'
      }
      type="text"
      value={props.value}
      placeholder={props.placeholder}
      onChange={props.onChange}
    />
  );
}

export default React.memo(InputComponent);

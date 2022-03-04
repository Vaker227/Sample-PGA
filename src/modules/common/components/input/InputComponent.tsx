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
        ' rounded border py-2 px-4 font-semibold text-white shadow transition duration-300' +
        ' border-[#13132b] bg-[#252547]' +
        ' hover:border-[#13132b] hover:bg-[#1b1b38]' +
        ' focus:border-[#a16eff] focus:outline-none' +
        ' hover:focus:border-[#13132b] hover:focus:bg-[#1b1b38]'
      }
      type="text"
      value={props.value}
      placeholder={props.placeholder}
      onChange={props.onChange}
    />
  );
}

export default React.memo(InputComponent);

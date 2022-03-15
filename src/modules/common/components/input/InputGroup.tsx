import React from 'react';

interface Props {
  sign: React.ReactNode;
  children: React.ReactNode;
}

const InputGroup = (props: Props) => {
  const { sign, children } = props;
  return (
    <div className="flex h-fit">
      <div className="grid shrink-0 place-content-center rounded-l bg-[#b4b4db3d] px-4 text-[#b4b4db7a]">
        {sign}
      </div>
      <div className="flex-grow rounded border border-[#a16eff]">{children}</div>
    </div>
  );
};

export default InputGroup;

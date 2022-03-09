import React from 'react';

interface Props {
  onClick?(): void;
}

const BackButton = (props: Props) => {
  return (
    <div
      className="grid h-8 w-8 cursor-pointer place-content-center rounded-full bg-white hover:ring-4"
      onClick={props.onClick}
    >
      <i className="fa-solid fa-arrow-left text-lg text-gray-500"></i>
    </div>
  );
};

export default React.memo(BackButton);

import React, { useMemo } from 'react';
import { getStyleClasses } from '../../utils';

interface Props {
  variant?: string;
  children: React.ReactNode;
  onClick?(e: React.MouseEvent<HTMLButtonElement>): void;
  disabled?: boolean;
}

const Button = (props: Props) => {
  const { variant, children, onClick, disabled } = props;
  const btnType = useMemo(() => getStyleClasses(variant || ''), [variant]);
  return (
    <button
      disabled={disabled}
      className={`inline-block cursor-pointer rounded border-2 py-1.5 px-2 ${btnType} leading-6 focus:ring active:ring ${
        disabled && 'pointer-events-none opacity-60'
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;

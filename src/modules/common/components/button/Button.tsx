import React, { useMemo } from 'react';
import { getStyleClasses } from '../../utils';

interface Props {
  variant?: string;
  children: React.ReactNode;
  onClick?(e: React.MouseEvent<HTMLButtonElement>): void;
  disabled?: boolean;
  bold?: boolean;
}

const Button = (props: Props) => {
  const { variant, children, onClick, disabled, bold } = props;
  const btnType = useMemo(() => getStyleClasses(variant || ''), [variant]);
  return (
    <button
      disabled={disabled}
      className={`inline-block cursor-pointer rounded ${btnType} leading-6 ${
        disabled && 'pointer-events-none opacity-60'
      } ${bold && 'font-semibold'} transition-colors`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default React.memo(Button);

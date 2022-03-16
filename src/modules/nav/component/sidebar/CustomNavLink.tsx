import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  to: string;
  label: string;
  active?: boolean;
}

const CustomNavLink = (props: Props) => {
  const { to, label, active } = props;

  return (
    <Link
      to={to}
      className={`block  cursor-pointer p-3 first-of-type:border-t first-of-type:border-t-black hover:text-violet-400 ${
        active && 'text-violet-500'
      }`}
    >
      {label}
    </Link>
  );
};

export default React.memo(CustomNavLink);

import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  to: string;
  label: string;
  isActive?: boolean;
}

const CustomNavLink = (props: Props) => {
  const { to, label, isActive } = props;

  return (
    <Link
      to={to}
      className="block cursor-pointer p-3 first-of-type:border-t first-of-type:border-t-black hover:text-violet-400"
    >
      {label}
    </Link>
  );
};

export default CustomNavLink;

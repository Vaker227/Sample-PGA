import React from 'react';

interface Props {
  children?: React.ReactNode;
}

const FilterHeader = (props: Props) => {
  return <>{props.children}</>;
};

export default FilterHeader;

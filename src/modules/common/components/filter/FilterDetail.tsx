import React from 'react';

interface Props {
  children: React.ReactNode;
}

const FilterDetail = (props: Props) => {
  return <>{props.children}</>;
};

export default FilterDetail;

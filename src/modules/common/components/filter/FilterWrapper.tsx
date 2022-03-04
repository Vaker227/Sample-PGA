import React from 'react';
import FilterDetail from './FilterDetail';
import FilterHeader from './FilterHeader';

interface Props {
  header: React.ReactNode;
  detail?: React.ReactNode;
}

const FilterWrapper = (props: Props) => {
  const { header, detail } = props;
  return (
    <div className="w-full rounded border border-[#13132b] bg-[#323259] p-4">
      {header}
      {detail}
    </div>
  );
};

export default FilterWrapper;

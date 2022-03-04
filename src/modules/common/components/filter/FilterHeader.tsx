import React from 'react';
import Button from '../button/Button';

interface Props {
  children?: React.ReactNode;
}

const FilterHeader = (props: Props) => {
  return (
    <div className="flex w-full space-x-4">
      {props.children}{' '}
      <div className="flex-none">
        <Button variant="purple" onClick={() => console.log('click')}>
          Search
        </Button>
      </div>
    </div>
  );
};

export default FilterHeader;

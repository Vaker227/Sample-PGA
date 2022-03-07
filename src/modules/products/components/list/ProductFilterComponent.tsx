import React from 'react';
import Button from '../../../common/components/button/Button';
import FilterWrapper from '../../../common/components/filter/FilterWrapper';
import InputComponent from '../../../common/components/input/InputComponent';

interface Props {}

const ProductFilterComponent = (props: Props) => {
  return (
    <FilterWrapper
      header={
        <>
          <div className="grow-[2]">
            <InputComponent />
          </div>
          <div className="grow">{/* <MultiSelectionComponent /> */}</div>
          <div className="grow">{/* <MultiSelectionComponent /> */}</div>
          <div className="flex-none">
            <Button variant="purple">Search</Button>
          </div>
        </>
      }
    ></FilterWrapper>
  );
};

export default ProductFilterComponent;

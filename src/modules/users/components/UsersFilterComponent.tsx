import React, { useState } from 'react';
import FilterHeader from '../../common/components/filter/FilterHeader';
import FilterWrapper from '../../common/components/filter/FilterWrapper';
import InputComponent from '../../common/components/input/InputComponent';
import MultiSelectionComponent from '../../common/components/input/MultiSelectionComponent';
import { selecOption } from '../pages/UserListPage';

interface Props {}

const UsersFilterComponent = (props: Props) => {
  const [options, setOptions] = useState<string[]>([]);
  return (
    <div>
      <FilterWrapper
        header={
          <FilterHeader>
            <div className="grow-1 shrink-0">
              <InputComponent placeholder="Search keyword" />
            </div>
            <MultiSelectionComponent
              title="All membership"
              list={selecOption}
              onChange={(values) => setOptions(values)}
              selectedValues={options}
            />
            <MultiSelectionComponent
              title="All membership"
              list={selecOption}
              onChange={(values) => setOptions(values)}
              selectedValues={options}
            />
          </FilterHeader>
        }
      />
    </div>
  );
};

export default UsersFilterComponent;

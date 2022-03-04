import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { SelectOption } from '../../../models/utils/input';
import MultiSelectionCheckboxComponent from '../../common/components/input/MultiSelectionCheckboxComponent';
import MultiSelectionComponent from '../../common/components/input/MultiSelectionComponent';
import UsersFilterComponent from '../components/UsersFilterComponent';
interface Props {}

export const selecOption: SelectOption[] = [
  { label: 'Austraslia', value: '1' },
  { label: 'Philpin', value: '2' },
  { label: 'Vietnam', value: '3' },
  { label: 'Thailand', value: '4' },
  { label: 'Sinapore', value: '5' },
  { label: 'Sinapore1', value: '6' },
  { label: 'Sinapore2', value: '7' },
  { label: 'Sinapore3 asd asd asd', value: '8' },
  { label: 'Sinapore4', value: '9' },
  { label: 'Sinapore5', value: '10' },
];

const UserList = (props: Props) => {
  const { handleSubmit, control } = useForm();

  return (
    <div className="px-7 py-8">
      <div className="text-4xl text-white">Search for users</div>
      <div>
        <UsersFilterComponent />
        <div className="mt-3 max-w-lg">
          <form onSubmit={handleSubmit((data) => console.log(data))}>
            <div className="flex">
              <Controller
                control={control}
                name="selecter"
                defaultValue={[]}
                render={({ field: { onChange, value } }) => (
                  <MultiSelectionCheckboxComponent
                    list={selecOption}
                    selectedValues={value}
                    title="Select Country"
                    onChange={onChange}
                  />
                )}
              />
              <Controller
                control={control}
                name="ReactDatepicker"
                defaultValue={[]}
                render={({ field: { onChange, value } }) => (
                  <MultiSelectionComponent
                    list={selecOption}
                    selectedValues={value}
                    title="Select Country"
                    onChange={onChange}
                  />
                )}
              />
            </div>

            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserList;

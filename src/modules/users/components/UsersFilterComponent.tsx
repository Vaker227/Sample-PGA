import moment from 'moment';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { ICountry, IRole } from '../../../models/common';
import { IFilterUser, IFilterUserMembership, IUserStatus } from '../../../models/user';
import { SelectOption } from '../../../models/utils/input';
import { AppState } from '../../../redux/reducer';
import Button from '../../common/components/button/Button';
import FilterWrapper from '../../common/components/filter/FilterWrapper';
import InputComponent from '../../common/components/input/InputComponent';
import MultiSelectionCheckboxComponent from '../../common/components/input/MultiSelectionCheckboxComponent';
import PickDateComponent from '../../common/components/input/PickDateComponent';
import SelectionComponent from '../../common/components/input/SelectionComponent';

interface Props {
  filterObject: IFilterUser;
  onSearch(filter: IFilterUser): void;
}

const UsersFilterComponent = (props: Props) => {
  const { filterObject, onSearch } = props;
  const [filterProperties, setFilterProperties] = useState<IFilterUser>(filterObject);
  const roles = useSelector<AppState, { [index: string]: IRole[] }>((state) => state.common.roles);
  const countries = useSelector<AppState, ICountry[]>((state) => state.common.countries);

  useEffect(() => {
    setFilterProperties(filterObject);
  }, [filterObject]);

  const roleOptions = useMemo(() => {
    const options: SelectOption[] = [];
    Object.keys(roles).forEach((key) => {
      roles[key].forEach((role) => {
        options.push({
          label: role.name,
          value: role.id,
          parent: key == 'administrator' ? 'Memberships' : 'Pending Memberships',
        });
      });
    });
    return options;
  }, [roles]);

  const countryOptions: SelectOption[] = useMemo(
    () => countries.map((country) => ({ label: country.country, value: country.code })),
    [countries],
  );

  const membershipOptions: SelectOption[] = useMemo(
    () => [
      { label: 'General', value: 'M_4', parent: 'Memberships' },
      { label: 'General', value: 'P_4', parent: 'Pending Memberships' },
    ],
    [],
  );

  const filterUserStatusOptions: SelectOption[] = useMemo(
    () => [
      { label: 'Enable', value: 'E' },
      { label: 'Disable', value: 'D' },
      { label: 'Unapproved vendor', value: 'U' },
    ],
    [],
  );

  const handleSubmit = useCallback(
    (e: any) => {
      if (e) {
        e.preventDefault();
      }
      onSearch(filterProperties);
    },
    [onSearch, filterProperties],
  );
  const handleChangeSearchs = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFilterProperties((prev) => ({ ...prev, search: e.target.value }));
    },
    [setFilterProperties],
  );
  const handleChangeMemberships = useCallback(
    (values: IFilterUserMembership[]) => {
      setFilterProperties((prev) => ({ ...prev, memberships: values }));
    },
    [setFilterProperties],
  );
  const handleChangeRole = useCallback(
    (values: IRole['id'][]) => {
      setFilterProperties((prev) => ({ ...prev, types: values }));
    },
    [setFilterProperties],
  );
  const handleChangeUserStatus = useCallback(
    (value: IUserStatus) => {
      setFilterProperties((prev) => ({ ...prev, status: value ? [value] : [] }));
    },
    [setFilterProperties],
  );
  const handleChangeCountry = useCallback(
    (value: ICountry['code']) => {
      setFilterProperties((prev) => ({ ...prev, country: value }));
    },
    [setFilterProperties],
  );
  const handleChangeState = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFilterProperties((prev) => ({ ...prev, state: e.target.value }));
    },
    [setFilterProperties],
  );
  const handleChangeAddress = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFilterProperties((prev) => ({ ...prev, address: e.target.value }));
    },
    [setFilterProperties],
  );
  const handleChangePhone = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFilterProperties((prev) => ({ ...prev, phone: e.target.value }));
    },
    [setFilterProperties],
  );
  const handleChangeRange = useCallback(
    (dates) => {
      const [start, end] = dates;
      const startText = start ? moment(start).format('YYYY-MM-DD') : '';
      const endText = end ? moment(end).format('YYYY-MM-DD') : '';
      setFilterProperties((prev) => ({ ...prev, date_range: [startText, endText] }));
    },
    [setFilterProperties],
  );

  return (
    <form onSubmit={handleSubmit}>
      <FilterWrapper
        header={
          <>
            <div className="w-32 flex-auto">
              <InputComponent
                placeholder="Search keyword"
                value={filterProperties.search}
                onChange={handleChangeSearchs}
              />
            </div>
            <div className="w-32 flex-auto">
              <MultiSelectionCheckboxComponent
                title="All memberships"
                list={membershipOptions}
                onChange={handleChangeMemberships}
                selectedValues={filterProperties.memberships}
              />
            </div>
            <div className="w-32 flex-auto">
              <MultiSelectionCheckboxComponent
                title="All user types"
                list={roleOptions}
                onChange={handleChangeRole}
                selectedValues={filterProperties.types}
              />
            </div>
            <div className="w-16 flex-auto">
              <SelectionComponent
                returnable
                title="Any status"
                list={filterUserStatusOptions}
                onChange={handleChangeUserStatus}
                selectedValue={filterProperties.status[0]}
              />
            </div>
            <div className="flex-none">
              <Button variant="purple" onClick={handleSubmit}>
                Search
              </Button>
              <input type="submit" />
            </div>
          </>
        }
        detail={
          <>
            <div className="flex flex-wrap space-y-4">
              <div className=" h-full w-full shrink-0 space-y-3 md:ml-8 md:w-2/5 lg:w-1/3">
                <div className="flex items-center justify-between">
                  <div className="w-20 shrink-0 text-sm text-white">Country</div>
                  <div className="shrink-0 grow md:w-52">
                    <SelectionComponent
                      title="Select country"
                      list={countryOptions}
                      onChange={handleChangeCountry}
                      returnable
                      selectedValue={filterProperties.country}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="w-20 shrink-0 text-sm text-white">State</div>
                  <div className="shrink-0 grow md:w-52">
                    <InputComponent value={filterProperties.state} onChange={handleChangeState} />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="w-20 shrink-0 text-sm text-white">Address</div>
                  <div className="shrink-0 grow md:w-52">
                    <InputComponent value={filterProperties.address} onChange={handleChangeAddress} />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="w-20 shrink-0 text-sm text-white">Phone</div>
                  <div className="shrink-0 grow md:w-52">
                    <InputComponent value={filterProperties.phone} onChange={handleChangePhone} />
                  </div>
                </div>
              </div>
              <div className="md:1/2 h-full grow text-white md:ml-8 lg:w-2/5">
                <div className="flex w-full space-x-2 ">
                  <div className="flex-initial">User activity</div>
                  <div className="shrink-0 grow space-y-4">
                    <div className="flex space-x-4">
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="filter-register"
                          checked={filterProperties.date_type == 'R'}
                          onChange={() => setFilterProperties({ ...filterProperties, date_type: 'R' })}
                        ></input>
                        <label htmlFor="filter-register">Register</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="filter-last-login"
                          checked={filterProperties.date_type == 'L'}
                          onChange={() => setFilterProperties({ ...filterProperties, date_type: 'L' })}
                        ></input>
                        <label htmlFor="filter-last-login">Last logged in</label>
                      </div>
                    </div>
                    <div>
                      <PickDateComponent
                        selectRange
                        range={{ startDate: filterProperties.date_range[0], endDate: filterProperties.date_range[1] }}
                        onChange={handleChangeRange}
                        placeholder="Enter date range"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        }
      />
    </form>
  );
};

export default UsersFilterComponent;

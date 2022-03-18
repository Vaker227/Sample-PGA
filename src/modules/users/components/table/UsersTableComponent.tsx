import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { loadingProcess } from '../../../../configs/loadingProcess';
import { IFilterUser, IUserInfo } from '../../../../models/user';
import Checkbox from '../../../common/components/input/Checkbox';
import RowMangementComponent from '../../../common/components/table/RowMangementComponent';
import TableHeadSort from '../../../common/components/table/TableHeadSort';
import TablePaginationComponent from '../../../common/components/table/TablePaginationComponent';
import { turnOffLoadingOverlay } from '../../../common/redux/commonReducer';
import UserRowComponent from './UserRowComponent';

interface Props {
  total: number;
  filter: IFilterUser;
  onSettingsChange(filterSort: Partial<IFilterUser>): void;
  selectedUsers: IUserInfo['profile_id'][];
  onSelectRow(userId: IUserInfo['profile_id']): void;
  onSelectAllRow(changeTo: boolean): void;
  userList: IUserInfo[];
}

const UsersTableComponent = (props: Props) => {
  const { selectedUsers, total, onSettingsChange, filter, onSelectRow, onSelectAllRow, userList } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(turnOffLoadingOverlay(loadingProcess.LoadingUsersList));
  }, [dispatch, userList]);

  const handleSelectPage = useCallback(
    (number) => {
      onSettingsChange({ page: number });
    },
    [onSettingsChange],
  );
  const handleSelectCount = useCallback(
    (count) => {
      onSettingsChange({ count, page: 1 });
    },
    [onSettingsChange],
  );

  const handleSort = useCallback(
    (sort: any, changeTo: 'DESC' | 'ASC') => {
      onSettingsChange({ sort, order_by: changeTo });
    },
    [onSettingsChange],
  );

  const pagesLength = useMemo(() => Math.ceil(total / filter.count), [total, filter.count]);
  return (
    <div className="mb-14 border-secondary bg-primary p-4 text-white">
      <table id="main-table" className="block border-collapse overflow-x-hidden">
        <thead>
          <tr className="border-b border-b-secondary text-left">
            <th className="min-w-[60px] p-3 ">
              <Checkbox
                value={userList.length > 0 && selectedUsers.length == userList.length}
                onChange={onSelectAllRow}
              />
            </th>
            <th className="min-w-[100px] p-3 ">
              <TableHeadSort
                label="Login/Email"
                type="vendor"
                orderBy={filter.order_by}
                sort={filter.sort}
                onClick={handleSort}
              />
            </th>
            <th className="min-w-[300px] p-3 ">
              <TableHeadSort
                label="Name"
                type="firstName"
                orderBy={filter.order_by}
                sort={filter.sort}
                onClick={handleSort}
              />
            </th>
            <th className="min-w-[150px] p-3 ">
              <TableHeadSort
                label="Access level"
                type="access_level"
                orderBy={filter.order_by}
                sort={filter.sort}
                onClick={handleSort}
              />
            </th>
            <th className="min-w-[100px] p-3 ">Products</th>
            <th className="min-w-[100px] p-3 ">Orders</th>
            <th className="min-w-[100px] p-3 ">Wishlist</th>
            <th className="min-w-[200px] p-3 ">
              <TableHeadSort
                label="Created"
                type="created"
                orderBy={filter.order_by}
                sort={filter.sort}
                onClick={handleSort}
              />
            </th>
            <th className="min-w-[200px] p-3 ">
              <TableHeadSort
                label="Last Login"
                type="last_login"
                orderBy={filter.order_by}
                sort={filter.sort}
                onClick={handleSort}
              />
            </th>
            <th className="min-w-[100px] p-3 "></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-secondary">
          {userList.map((user) => (
            <UserRowComponent
              key={user.profile_id}
              user={user}
              selected={selectedUsers.includes(user.profile_id)}
              onSelect={onSelectRow}
            />
          ))}
        </tbody>
      </table>
      <div className="my-5 flex flex-wrap items-center gap-5">
        <TablePaginationComponent pagesLength={pagesLength} currentPage={filter.page} setPage={handleSelectPage} />
        <RowMangementComponent count={filter.count} total={total} onSelectRowPerPage={handleSelectCount} />
      </div>
    </div>
  );
};

export default UsersTableComponent;

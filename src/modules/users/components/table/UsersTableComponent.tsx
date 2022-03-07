import React, { useCallback, useMemo, useState } from 'react';
import { IFilterUser, IUserInfo } from '../../../../models/user';
import Checkbox from '../../../common/components/input/Checkbox';
import RowMangementComponent from '../../../common/components/table/RowMangementComponent';
import TableHeadSort from '../../../common/components/table/TableHeadSort';
import TablePaginationComponent from '../../../common/components/table/TablePaginationComponent';
import UserRowComponent from './UserRowComponent';

const mockData: IUserInfo[] = [
  {
    access_level: 'Administrator',
    created: '1559752515',
    fistName: 'Customer',
    lastName: 'Support',
    last_login: '1646498372',
    order: { order_as_buyer: 2, order_as_buyer_total: '2345.30' },
    product: 0,
    profile_id: '7',
    storeName: null,
    vendor: 'admin.training@powergatesoftware.com',
    vendor_id: '2',
    wishlist: '0',
  },
  {
    access_level: 'Vendor',
    created: '1614826232',
    fistName: 'Matthew',
    lastName: 'Johnson',
    last_login: '1614826237',
    order: { order_as_buyer: 0, order_as_buyer_total: 0 },
    product: 1,
    profile_id: '11148',
    storeName: "Matthew's Gear Shop",
    vendor: 'LeviFiction@yahoo.com',
    vendor_id: '6016',
    wishlist: '1',
  },
  {
    access_level: 'Vendor',
    created: '1614826232',
    fistName: 'Matthew',
    lastName: 'Johnson',
    last_login: '1614826237',
    order: { order_as_buyer: 0, order_as_buyer_total: 0 },
    product: 1,
    profile_id: '11149',
    storeName: "Matthew's Gear Shop",
    vendor: 'LeviFiction@yahoo.com',
    vendor_id: '6016',
    wishlist: '1',
  },
  {
    access_level: 'Vendor',
    created: '1614826232',
    fistName: 'Matthew',
    lastName: 'Johnson',
    last_login: '1614826237',
    order: { order_as_buyer: 0, order_as_buyer_total: 0 },
    product: 1,
    profile_id: '111',
    storeName: "Matthew's Gear Shop",
    vendor: 'LeviFiction@yahoo.com',
    vendor_id: '6016',
    wishlist: '1',
  },
  {
    access_level: 'Vendor',
    created: '1614826232',
    fistName: 'Matthew',
    lastName: 'Johnson',
    last_login: '1614826237',
    order: { order_as_buyer: 0, order_as_buyer_total: 0 },
    product: 1,
    profile_id: '11150',
    storeName: "Matthew's Gear Shop",
    vendor: 'LeviFiction@yahoo.com',
    vendor_id: '6016',
    wishlist: '1',
  },
  {
    access_level: 'Vendor',
    created: '1614826232',
    fistName: 'Matthew',
    lastName: 'Johnso asd asdas s das das das dn',
    last_login: '1614826237',
    order: { order_as_buyer: 0, order_as_buyer_total: 0 },
    product: 1,
    profile_id: '11141',
    storeName: "Matthew's Gear Shop",
    vendor: 'LeviFiction@yahoo.com asljd asjd lasj l;ajsld; jas asd asd sa dsa das;d jasldj sa',
    vendor_id: '6016',
    wishlist: '1',
  },
];

interface Props {
  selectedUsers: IUserInfo['profile_id'][];
  page: number;
  count: number;
  total: number;
  sort: IFilterUser['sort'];
  orderBy: IFilterUser['order_by'];
  forceChange(filterSort: Partial<IFilterUser>): void;
  onSelectRow(userId: IUserInfo['profile_id']): void;
  onSelectAllRows(changeTo: boolean): void;
  userList: IUserInfo[];
}

const UsersTableComponent = (props: Props) => {
  const { selectedUsers, page, total, count, sort, orderBy, forceChange, onSelectRow, onSelectAllRows, userList } =
    props;

  const handleSelectPage = useCallback(
    (number) => {
      forceChange({ page: number });
    },
    [forceChange],
  );
  const handleSelectCount = useCallback(
    (count) => {
      forceChange({ count });
    },
    [forceChange],
  );
  const handleSort = (sort: any, changeTo: 'DESC' | 'ASC') => {
    forceChange({ sort, order_by: changeTo });
  };

  const pagesLength = useMemo(() => Math.ceil(total / count), [total, count]);
  return (
    <div className="mb-14 border-secondary bg-primary p-4 text-white">
      <table id="main-table" className="block border-collapse overflow-x-hidden">
        <thead>
          <tr className="border-b border-b-secondary text-left">
            <th className="min-w-[60px] p-3 ">
              <Checkbox
                value={userList.length > 0 && selectedUsers.length == userList.length}
                onChange={onSelectAllRows}
              />
            </th>
            <th className="min-w-[100px] p-3 ">
              <TableHeadSort label="Login/Email" type="vendor" orderBy={orderBy} sort={sort} onClick={handleSort} />
            </th>
            <th className="min-w-[300px] p-3 ">
              <TableHeadSort label="Name" type="firstName" orderBy={orderBy} sort={sort} onClick={handleSort} />
            </th>
            <th className="min-w-[150px] p-3 ">
              <TableHeadSort
                label="Access level"
                type="access_level"
                orderBy={orderBy}
                sort={sort}
                onClick={handleSort}
              />
            </th>
            <th className="min-w-[100px] p-3 ">Products</th>
            <th className="min-w-[100px] p-3 ">Orders</th>
            <th className="min-w-[100px] p-3 ">Wishlist</th>
            <th className="min-w-[200px] p-3 ">
              <TableHeadSort label="Created" type="created" orderBy={orderBy} sort={sort} onClick={handleSort} />
            </th>
            <th className="min-w-[200px] p-3 ">
              <TableHeadSort label="Last Login" type="last_login" orderBy={orderBy} sort={sort} onClick={handleSort} />
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
        <TablePaginationComponent pagesLength={pagesLength} currentPage={page} setPage={handleSelectPage} />
        <RowMangementComponent count={count} total={total} onSelectRowPerPage={handleSelectCount} />
      </div>
    </div>
  );
};

export default UsersTableComponent;

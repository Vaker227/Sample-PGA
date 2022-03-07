import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { API_PATHS } from '../../../configs/api';
import { IFilterUser, IUserInfo } from '../../../models/user';
import { getErrorMessageResponse } from '../../../utils';
import Backdrop from '../../common/components/Backdrop';
import Button from '../../common/components/button/Button';
import LoadingScreen from '../../common/components/LoadingScreen';
import ToolBar from '../../common/components/ToolBar';
import { CustomFetch } from '../../common/utils';
import { getErrorToastAction, getSuccessToastAction } from '../../toast/utils';
import UsersTableComponent from '../components/table/UsersTableComponent';
import UsersFilterComponent from '../components/UsersFilterComponent';
import { getFilterUsers } from '../redux/usersSagas';

interface Props {}

const UserListPage = (props: Props) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [recordsTotal, setRecordsTotal] = useState(0);
  const [userList, setUserList] = useState<IUserInfo[]>([]);
  const [filterObject, setFilterObject] = useState<IFilterUser>({
    address: '',
    country: '',
    date_range: [],
    date_type: 'R',
    memberships: [],
    phone: '',
    search: '',
    state: '',
    status: [],
    types: [],
    sort: 'firstName',
    order_by: 'ASC',
    count: 25,
    page: 1,
    tz: 7,
  });

  const [selectedUsers, setSelectedUser] = useState<IUserInfo['profile_id'][]>([]);

  // first render
  useEffect(() => {
    dispatch(getFilterUsers.request());
    handleFetchUser(filterObject);
  }, [dispatch]);

  const handleFetchUser = useCallback(async (filter: IFilterUser) => {
    setLoading(true);
    const response = await CustomFetch(API_PATHS.getUserList, 'post', filter);
    if (response.errors) {
      return;
    }
    setRecordsTotal(response.recordsTotal);
    setUserList(response.data);
    setLoading(false);
  }, []);

  const handleChangeFilterSort = useCallback((filter: Partial<IFilterUser>) => {
    setFilterObject((prev) => ({ ...prev, ...filter }));
  }, []);

  const handleOnSearch = useCallback(
    (filter: IFilterUser) => {
      const newFilter = { ...filterObject, ...filter };
      setFilterObject(newFilter);
    },
    [filterObject],
  );

  useEffect(() => {
    handleFetchUser(filterObject);
  }, [filterObject, handleFetchUser]);

  const handleSelectRow = useCallback((userId: IUserInfo['profile_id']) => {
    setSelectedUser((prev) => {
      const newSelectedUsers = prev.slice();
      const index = prev.indexOf(userId);
      if (index < 0) {
        newSelectedUsers.push(userId);
      } else {
        newSelectedUsers.splice(index, 1);
      }
      return newSelectedUsers;
    });
  }, []);

  const handleSeletAllRows = useCallback(
    (changeTo: boolean) => {
      setSelectedUser(changeTo ? userList.map((user) => user.profile_id) : []);
    },
    [userList],
  );
  const handleRemove = useCallback(async () => {
    setShowRemoveModal(false);
    setLoading(true);
    const response = await CustomFetch(API_PATHS.editUser, 'post', {
      params: selectedUsers.map((userId) => ({ id: userId, delete: 1 })),
    });
    setLoading(false);
    if (response.errors) {
      dispatch(getErrorToastAction('Delete:' + getErrorMessageResponse(response)));
    } else {
      dispatch(getSuccessToastAction('Delete success'));
    }
    handleFetchUser(filterObject);
  }, [selectedUsers, dispatch, filterObject, handleFetchUser]);

  const toolBarElement = useMemo(
    () => (
      <ToolBar>
        <Button variant="yellow" disabled={selectedUsers.length <= 0} onClick={() => setShowRemoveModal(true)}>
          Remove selected
        </Button>
      </ToolBar>
    ),
    [selectedUsers.length],
  );

  return (
    <div className="px-7 pt-8">
      {loading && <LoadingScreen />}
      <div className="text-4xl text-white">Search for users {Date.now()}</div>
      <div>
        <UsersFilterComponent filterObject={filterObject} onSearch={handleOnSearch} />
        <div className="my-8">
          <Button variant="purple">Add User</Button>
        </div>
        <UsersTableComponent
          userList={userList}
          selectedUsers={selectedUsers}
          count={filterObject.count}
          total={recordsTotal}
          sort={filterObject.sort}
          orderBy={filterObject.order_by}
          page={filterObject.page}
          onSelectRow={handleSelectRow}
          onSelectAllRows={handleSeletAllRows}
          forceChange={handleChangeFilterSort}
        />
      </div>
      {toolBarElement}
      <Backdrop show={showRemoveModal} closeOnBackdrop onClose={() => setShowRemoveModal(false)}>
        <div className="w-96 divide-y divide-secondary rounded border border-secondary bg-primary text-white">
          <div className="p-6 py-4 text-lg font-semibold">Confirm delete</div>
          <div className="p-6 py-4">Do you want to delete this user</div>
          <div className="flex w-full justify-between p-6 py-4">
            <Button variant="flat-purple" bold onClick={handleRemove}>
              Yes
            </Button>
            <Button variant="flat-red" bold onClick={() => setShowRemoveModal(false)}>
              No
            </Button>
          </div>
        </div>
      </Backdrop>
    </div>
  );
};

export default UserListPage;

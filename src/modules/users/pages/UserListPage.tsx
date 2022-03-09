import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { API_PATHS } from '../../../configs/api';
import { loadingProcess } from '../../../configs/loadingProcess';
import { ROUTES } from '../../../configs/routes';
import { IFilterUser, IUserInfo } from '../../../models/user';
import { AppState } from '../../../redux/reducer';
import { getErrorMessageResponse } from '../../../utils';
import Backdrop from '../../common/components/Backdrop';
import Button from '../../common/components/button/Button';
import LoadingScreen from '../../common/components/LoadingScreen';
import ToolBar from '../../common/components/ToolBar';
import { turnOffLoadingOverlay, turnOnLoadingOverlay } from '../../common/redux/commonReducer';
import { getCommonValues } from '../../common/redux/commonSagas';
import { CustomFetch } from '../../common/utils';
import { getErrorToastAction, getSuccessToastAction } from '../../toast/utils';
import UsersTableComponent from '../components/table/UsersTableComponent';
import UsersFilterComponent from '../components/UsersFilterComponent';

const UserListPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const loading = useSelector<AppState, loadingProcess[]>((state) => state.common.loading);
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

  useEffect(() => {
    dispatch(getCommonValues.request());
  }, [dispatch]);

  const handleFetchUser = useCallback(
    async (filter: IFilterUser) => {
      dispatch(turnOnLoadingOverlay(loadingProcess.LoadingUsersList));
      const response = await CustomFetch(API_PATHS.getUserList, 'post', filter);
      if (response.errors) {
        dispatch(turnOffLoadingOverlay(loadingProcess.LoadingUsersList));
        return;
      }
      setRecordsTotal(response.recordsTotal);
      setUserList(response.data);
    },
    [dispatch],
  );

  const handleSettingsChange = useCallback((filter: Partial<IFilterUser>) => {
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

  const toolBarElement = useMemo(
    () => (
      <ToolBar scrollTable>
        <Button variant="yellow" disabled={selectedUsers.length <= 0} onClick={() => setShowRemoveModal(true)}>
          Remove selected
        </Button>
      </ToolBar>
    ),
    [selectedUsers.length],
  );

  const removeModalElement = useMemo(() => {
    const handleRemove = async () => {
      setShowRemoveModal(false);
      dispatch(turnOnLoadingOverlay(loadingProcess.RemoveUser));
      const response = await CustomFetch(API_PATHS.editUser, 'post', {
        params: selectedUsers.map((userId) => ({ id: userId, delete: 1 })),
      });
      dispatch(turnOffLoadingOverlay(loadingProcess.RemoveUser));
      if (response.errors) {
        dispatch(getErrorToastAction('Delete:' + getErrorMessageResponse(response)));
      } else {
        dispatch(getSuccessToastAction('Delete success'));
      }
      setSelectedUser([]);
      handleFetchUser(filterObject);
    };
    return (
      <Backdrop show={showRemoveModal} closeOnBackdrop onClose={() => setShowRemoveModal(false)}>
        <div className="w-96 divide-y divide-secondary rounded border border-secondary bg-primary text-white">
          <div className="p-6 py-4 text-lg font-semibold">Confirm delete</div>
          <div className="p-6 py-4">Do you want to delete {selectedUsers.length > 1 ? 'these' : 'this'} user</div>
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
    );
  }, [showRemoveModal]);

  return (
    <div className="px-7 pt-8">
      {loading.length && <LoadingScreen />}
      <div className="text-4xl text-white">Search for users </div>
      <div>
        <UsersFilterComponent filterObject={filterObject} onSearch={handleOnSearch} />
        <div className="my-8">
          <Button variant="purple" onClick={() => history.push(ROUTES.createUser)}>
            Add User
          </Button>
        </div>
        <UsersTableComponent
          userList={userList}
          filter={filterObject}
          selectedUsers={selectedUsers}
          total={recordsTotal}
          onSelectRow={handleSelectRow}
          onSelectAllRows={handleSeletAllRows}
          onSettingsChange={handleSettingsChange}
        />
      </div>
      {toolBarElement}
      {removeModalElement}
    </div>
  );
};

export default UserListPage;

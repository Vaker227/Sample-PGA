import QueryString from 'query-string';
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { API_PATHS } from '../../../configs/api';
import { loadingProcess } from '../../../configs/loadingProcess';
import { ROUTES } from '../../../configs/routes';
import { IFilterUser, IUserInfo } from '../../../models/user';
import { AppState } from '../../../redux/reducer';
import { getErrorMessageResponse } from '../../../utils';
import Backdrop from '../../common/components/Backdrop';
import Button from '../../common/components/button/Button';
import ToolBar from '../../common/components/ToolBar';
import {
  clearScrollPosition,
  turnOffLoadingOverlay,
  turnOnLoadingOverlay,
  storeScrollPosition,
} from '../../common/redux/commonReducer';
import { CustomFetch } from '../../common/utils';
import { getErrorToastAction, getSuccessToastAction } from '../../toast/utils';
import UsersTableComponent from '../components/table/UsersTableComponent';
import UsersFilterComponent from '../components/UsersFilterComponent';
import useUserList from '../hooks/useUserList';
import { getUserListValues } from '../redux/usersSagas';

const UserListPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const scroll = useSelector<AppState, number | undefined>((state) => state.common.scrollPositions[ROUTES.listUsers]);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [selectedUsers, setSelectedUser] = useState<IUserInfo['profile_id'][]>([]);
  const [filterObject, setFilterObject] = useState<IFilterUser>(() => {
    const queryObj: Partial<IFilterUser> = QueryString.parse(history.location.search, { arrayFormat: 'bracket' });
    const defaultObj: IFilterUser = {
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
    };
    return { ...defaultObj, ...queryObj };
  });
  const { userList, recordsTotal, forceRevalidate, isLoading } = useUserList(filterObject);

  useEffect(() => {
    if (userList) {
      dispatch(turnOffLoadingOverlay(loadingProcess.LoadingUsersList));
    } else {
      dispatch(turnOnLoadingOverlay(loadingProcess.LoadingUsersList));
    }
  }, [userList, dispatch]);

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
    dispatch(getUserListValues.request());
  }, [dispatch]);

  // scroll
  useLayoutEffect(() => {
    // only persist scroll when back from detail
    if (scroll && history.action === 'POP') {
      document.getElementById('scrollable-container')?.scrollTo(0, scroll);
    } else if (history.action !== 'REPLACE') {
      document.getElementById('scrollable-container')?.scrollTo(0, 0);
    }
    dispatch(clearScrollPosition());
  }, [scroll, dispatch, history]);

  // trigger when query empty
  useEffect(() => {
    if (location.search == '') {
      setFilterObject({
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
    }
  }, [location]);

  // store query to url
  useEffect(() => {
    const query = QueryString.stringify(filterObject, { arrayFormat: 'bracket' });
    history.replace(history.location.pathname + '?' + query);
    setSelectedUser([]);
  }, [filterObject, history]);

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
      forceRevalidate();
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
  }, [showRemoveModal]); // eslint-disable-line

  if (isLoading) {
    return <div>Loading....</div>;
  }

  return (
    <div className="px-7 pt-8">
      <div className="text-4xl text-white">Search for users </div>
      <div>
        <UsersFilterComponent filterObject={filterObject} onSearch={handleOnSearch} />
        <div className="my-8">
          <Link to={ROUTES.createUser}>
            <Button variant="purple">Add User</Button>
          </Link>
        </div>
        <UsersTableComponent
          userList={userList || []}
          filter={filterObject}
          selectedUsers={selectedUsers}
          total={recordsTotal}
          onSelectRow={handleSelectRow}
          onSelectAllRow={handleSeletAllRows}
          onSettingsChange={handleSettingsChange}
        />
      </div>
      {toolBarElement}
      {removeModalElement}
    </div>
  );
};

export default UserListPage;

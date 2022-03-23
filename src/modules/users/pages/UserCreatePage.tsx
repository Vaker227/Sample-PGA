import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { API_PATHS } from '../../../configs/api';
import { ROUTES } from '../../../configs/routes';
import { IParamsUserInfo } from '../../../models/user';
import BackButton from '../../common/components/button/BackButton';
import Button from '../../common/components/button/Button';
import ToolBar from '../../common/components/ToolBar';
import useScrollToTop from '../../common/hooks/useScrollToTop';
import { CustomFetch } from '../../common/utils';
import { getErrorToastAction, getSuccessToastAction } from '../../toast/utils';
import FormUserProfileComponent from '../components/FormUserProfileComponent';
import { getUserDetailValues } from '../redux/usersSagas';

const UserCreatePage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { containerRef } = useScrollToTop();
  const [submitable, setSubmitable] = useState(false);
  const [submitFlag, setSubmitFlag] = useState(false);

  useEffect(() => {
    dispatch(getUserDetailValues.request());
  }, [dispatch]);

  const handleCreateUser = useCallback(
    async (userInfo: IParamsUserInfo) => {
      const response = await CustomFetch(API_PATHS.createUser, 'post', userInfo);
      if (response.errors || !response.success) {
        dispatch(getErrorToastAction(response.errors));
        return;
      }
      history.push(ROUTES.detailUser + '/' + response.data.info.profile_id);
    },
    [dispatch, history],
  );

  const handleSubmitForm = useCallback(
    (userInfo: IParamsUserInfo) => {
      handleCreateUser(userInfo);
      setSubmitFlag(false);
    },
    [handleCreateUser],
  );

  const defaultCreateUserValues: IParamsUserInfo = useMemo(
    () => ({
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      confirm_password: '',
      membership_id: '',
      forceChangePassword: 0,
      taxExempt: 0,
      paymentRailsType: 'individual',
      access_level: '10',
      roles: ['1'],
    }),
    [],
  );
  return (
    <div ref={containerRef} className="space-y-4 pt-10  text-white">
      <div className="mx-10">
        <BackButton onClick={() => history.goBack()} />
      </div>
      <div className="mx-10 text-3xl font-semibold">Create Profile</div>
      <FormUserProfileComponent
        userInfo={defaultCreateUserValues}
        onSubmitable={setSubmitable}
        onSubmit={handleSubmitForm}
        triggerSubmitFlag={submitFlag}
      />
      <div className="sticky bottom-0 px-10">
        <ToolBar>
          <Button disabled={!submitable} variant="yellow" onClick={() => setSubmitFlag(true)}>
            Create account
          </Button>
        </ToolBar>
      </div>
    </div>
  );
};

export default UserCreatePage;

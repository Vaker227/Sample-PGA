import { goBack } from 'connected-react-router';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { API_PATHS } from '../../../configs/api';
import { loadingProcess } from '../../../configs/loadingProcess';
import { IParamsUserInfo } from '../../../models/user';
import BackButton from '../../common/components/button/BackButton';
import Button from '../../common/components/button/Button';
import ToolBar from '../../common/components/ToolBar';
import { turnOffLoadingOverlay, turnOnLoadingOverlay } from '../../common/redux/commonReducer';
import { CustomFetch } from '../../common/utils';
import { getErrorToastAction, getSuccessToastAction } from '../../toast/utils';
import FormUserProfileComponent from '../components/FormUserProfileComponent';
import { preConfigDetailUserObject } from '../utils';

const UserDetailPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [submitable, setSubmitable] = useState(false);
  const [submitFlag, setSubmitFlag] = useState(false);
  const params = useParams<{ id: string }>();
  const [userInfo, setUserInfo] = useState<IParamsUserInfo>();

  useEffect(() => {
    async function fetchUserInfo() {
      dispatch(turnOnLoadingOverlay(loadingProcess.LoadUser));
      const response = await CustomFetch(API_PATHS.getProfileDetail, 'post', { id: params.id });
      setTimeout(() => {
        dispatch(turnOffLoadingOverlay(loadingProcess.LoadUser));
      }, 2000);
      if (response.errors || !response.data) {
        dispatch(getErrorToastAction("Cant load this user's info"));
        dispatch(goBack());
        return;
      }
      const validUserInfo = preConfigDetailUserObject(response.data.info);
      setUserInfo(validUserInfo);
      dispatch(getSuccessToastAction('Loaded user'));
    }
    fetchUserInfo();
  }, [params, dispatch]);

  const handleSubmitalbe = useCallback((changeTo: boolean) => {
    setSubmitable(changeTo);
  }, []);

  const handleSubmit = useCallback(
    async (userInfo: IParamsUserInfo) => {
      setSubmitFlag(false);
      dispatch(turnOnLoadingOverlay(loadingProcess.UpdateUser));
      const response = await CustomFetch(API_PATHS.editUser, 'post', { params: [{ ...userInfo, id: params.id }] });
      dispatch(turnOffLoadingOverlay(loadingProcess.UpdateUser));
      if (response.errors) {
        dispatch(getErrorToastAction("Cant load this user's info"));
        return;
      }
      dispatch(getSuccessToastAction('Updated user'));
      response.data.info.password = '';
      response.data.info.confirm_password = '';
      setUserInfo(response.data.info);
    },
    [params, dispatch],
  );

  return (
    <div className="space-y-4 pt-10 text-white">
      <div className="mx-10">
        <BackButton onClick={() => history.goBack()} />
      </div>
      <div className="mx-10 text-3xl font-semibold">Detail Profile</div>
      <div className="min-h-screen">
        {userInfo && (
          <FormUserProfileComponent
            userInfo={userInfo}
            onSubmitable={handleSubmitalbe}
            onSubmit={handleSubmit}
            triggerSubmitFlag={submitFlag}
            setSubmitFlag={setSubmitFlag}
            detailForm
          />
        )}
      </div>
      <div className="sticky bottom-0 px-10">
        <ToolBar>
          <Button disabled={!submitable} variant="yellow" onClick={() => setSubmitFlag(true)}>
            Update account
          </Button>
        </ToolBar>
      </div>
    </div>
  );
};

export default UserDetailPage;

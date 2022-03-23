import { useCallback, useEffect } from 'react';
import useSWR from 'swr';
import { API_PATHS } from '../../../configs/api';
import { IFilterUser, IUserInfo } from '../../../models/user';
import { CustomFetch } from '../../common/utils';

const useUserList = (filterObject: IFilterUser) => {
  const fetcher = useCallback(async () => {
    const response = await CustomFetch(API_PATHS.getUserList, 'post', filterObject);
    if (response.errors) {
      return;
    }
    return response;
  }, [filterObject]);
  const { data, error, mutate } = useSWR(API_PATHS.getUserList, fetcher);

  const forceRevalidate = useCallback(() => {
    mutate();
  }, [mutate]);

  useEffect(() => {
    mutate();
  }, [filterObject, mutate]);
  return {
    forceRevalidate,
    userList: data?.data as IUserInfo[],
    recordsTotal: data?.recordsTotal ?? 0,
    error,
    isLoading: !data,
  };
};

export default useUserList;

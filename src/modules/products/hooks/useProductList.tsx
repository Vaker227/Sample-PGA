import { useCallback, useEffect } from 'react';
import useSWR from 'swr';
import { API_PATHS } from '../../../configs/api';
import { IFilterProduct, IProduct } from '../../../models/product';
import { CustomFetch } from '../../common/utils';

const useProductList = (filterObject: IFilterProduct) => {
  const fetcher = useCallback(async () => {
    const response = await CustomFetch(API_PATHS.getProductList, 'post', filterObject);
    if (response.errors) {
      return;
    }
    return response;
  }, [filterObject]);
  const { data, error, mutate } = useSWR(API_PATHS.getProductList, fetcher);

  const forceRevalidate = useCallback(() => {
    mutate();
  }, [mutate]);

  useEffect(() => {
    mutate();
  }, [filterObject, mutate]);
  return {
    forceRevalidate,
    productList: data?.data as IProduct[],
    recordsTotal: data?.recordsTotal ?? 0,
    error,
    isLoading: !data,
  };
};

export default useProductList;

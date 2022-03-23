import { goBack } from 'connected-react-router';
import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { API_PATHS } from '../../../configs/api';
import { loadingProcess } from '../../../configs/loadingProcess';
import { IParamsProduct } from '../../../models/product';
import BackButton from '../../common/components/button/BackButton';
import Button from '../../common/components/button/Button';
import ToolBar from '../../common/components/ToolBar';
import useScrollToTop from '../../common/hooks/useScrollToTop';
import { turnOffLoadingOverlay, turnOnLoadingOverlay } from '../../common/redux/commonReducer';
import { CustomFetch, CustomFetchFormData } from '../../common/utils';
import { getErrorToastAction, getSuccessToastAction } from '../../toast/utils';
import FormProductComponent from '../components/FormProductComponent';
import { getProductDetailValues } from '../redux/productSagas';
import { detectImageChange, preConfigDetailProductObject, UploadImageProduct } from '../utils';

const ProductCreatePage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { containerRef } = useScrollToTop();
  const params = useParams<{ id: string }>();
  const [originalProductInfo, setProductInfo] = useState<IParamsProduct>();
  const [submitable, setSubmitable] = useState(false);
  const [submitFlag, setSubmitFlag] = useState(false);

  useEffect(() => {
    dispatch(getProductDetailValues.request());
  }, [dispatch]);

  const fetchProductInfo = useCallback(async () => {
    dispatch(turnOnLoadingOverlay(loadingProcess.LoadProduct));
    const response = await CustomFetch(API_PATHS.getProductDetail, 'post', { id: params.id });
    setTimeout(() => {
      dispatch(turnOffLoadingOverlay(loadingProcess.LoadProduct));
    }, 2000);
    if (response.errors || !response.data) {
      dispatch(getErrorToastAction("Cant load this product's info"));
      dispatch(goBack());
      return;
    }
    // convert to valid form's type
    const validFormProductInfo = preConfigDetailProductObject(response.data);
    setProductInfo(validFormProductInfo);
    dispatch(getSuccessToastAction('Loaded Product'));
  }, [dispatch, params.id]);

  useEffect(() => {
    fetchProductInfo();
  }, [fetchProductInfo]);

  const handleSetSubmitable = useCallback((changeTo: boolean) => {
    setSubmitable(changeTo);
  }, []);

  const handleUpdateProduct = useCallback(
    async (productInfo: IParamsProduct) => {
      // set id for send request as update (create/update have same request url)
      productInfo.id = originalProductInfo?.id;
      // convert to server type
      productInfo.arrival_date = moment(productInfo.arrival_date).format('YYYY-MM-DD');
      // image process
      const { imagesOrder, deleted_images, newImages } = detectImageChange(productInfo, originalProductInfo);
      productInfo.imagesOrder = imagesOrder;
      productInfo.deleted_images = deleted_images;
      delete productInfo.imagesInfo;

      const createForm = new FormData();
      createForm.append('productDetail', JSON.stringify(productInfo));
      const response = await CustomFetchFormData(API_PATHS.createProduct, 'post', createForm);
      if (response.errors || !response.data) {
        dispatch(getErrorToastAction(response.errors || 'Something wrong'));
        return;
      }
      dispatch(getSuccessToastAction('Update product success! ID: ' + response.data));

      // upload new image
      if (newImages.length) {
        try {
          const productId = response.data;
          const uploadProcess: Promise<any>[] = [];
          newImages.forEach((info) => {
            uploadProcess.push(UploadImageProduct(productId, info.order + '', info.url!));
          });
          await Promise.all(uploadProcess);
          dispatch(getSuccessToastAction('Uploaded images'));
        } catch (error: any) {
          if (typeof error == 'string') dispatch(getErrorToastAction(error));
        }
      }

      fetchProductInfo();
    },
    [dispatch, originalProductInfo, fetchProductInfo],
  );

  const handleSubmitForm = useCallback(
    (productInfo: IParamsProduct) => {
      handleUpdateProduct(productInfo);
      setSubmitFlag(false);
    },
    [handleUpdateProduct],
  );

  useEffect(() => {
    setSubmitable(false);
    setSubmitFlag(false);
  }, [originalProductInfo]);

  return (
    <div ref={containerRef} className="space-y-4 pt-10  text-white">
      <div className="mx-10">
        <BackButton onClick={() => history.goBack()} />
      </div>
      <div className="mx-10 text-3xl font-semibold">{originalProductInfo?.name || 'Product Detail'}</div>
      <div className="min-h-screen">
        {originalProductInfo && (
          <FormProductComponent
            detailForm
            productInfo={originalProductInfo}
            submitFlag={submitFlag}
            setSubmitFlag={setSubmitFlag}
            onSubmit={handleSubmitForm}
            onSubmitable={handleSetSubmitable}
          />
        )}
      </div>
      <div className="sticky bottom-0 px-10">
        <ToolBar>
          <Button disabled={!submitable} variant="yellow" onClick={() => setSubmitFlag(true)}>
            Update product
          </Button>
        </ToolBar>
      </div>
    </div>
  );
};

export default ProductCreatePage;

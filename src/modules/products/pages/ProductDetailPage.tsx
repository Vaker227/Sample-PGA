import { goBack } from 'connected-react-router';
import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { API_PATHS } from '../../../configs/api';
import { loadingProcess } from '../../../configs/loadingProcess';
import { ROUTES } from '../../../configs/routes';
import { IParamsProduct } from '../../../models/product';
import BackButton from '../../common/components/button/BackButton';
import Button from '../../common/components/button/Button';
import ToolBar from '../../common/components/ToolBar';
import { turnOffLoadingOverlay, turnOnLoadingOverlay } from '../../common/redux/commonReducer';
import { CustomFetch, CustomFetchFormData } from '../../common/utils';
import { getErrorToastAction, getSuccessToastAction } from '../../toast/utils';
import FormProductComponent from '../components/FormProductComponent';
import { UploadImageProduct } from '../utils';

const ProductCreatePage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams<{ id: string }>();
  const [originalProductInfo, setProductInfo] = useState<IParamsProduct>();
  const [submitable, setSubmitable] = useState(false);
  const [submitFlag, setSubmitFlag] = useState(false);

  const fetchProductInfo = useCallback(async () => {
    dispatch(turnOnLoadingOverlay(loadingProcess.LoadProduct));
    const response = await CustomFetch(API_PATHS.getProductDetail, 'post', { id: params.id });
    setTimeout(() => {
      dispatch(turnOffLoadingOverlay(loadingProcess.LoadProduct));
    }, 2000);
    if (response.errors && !response.data) {
      dispatch(getErrorToastAction("Cant load this product's info"));
      dispatch(goBack());
      return;
    }
    // pre-config data
    const tempProductInfo: IParamsProduct = response.data;
    tempProductInfo.imagesInfo = tempProductInfo.images!.map((image) => ({ ...image, url: image.file }));
    tempProductInfo.categories = tempProductInfo.categories.map((category: any) => category.category_id);
    if (tempProductInfo.shipping && tempProductInfo.shipping.length < 1) {
      tempProductInfo.shipping?.push({ id: '1', price: '0' });
    }
    tempProductInfo.shipping_to_zones = tempProductInfo.shipping;
    tempProductInfo.arrival_date = new Date(parseInt(tempProductInfo.arrival_date as string) * 1000);

    setProductInfo(response.data);
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
      productInfo.arrival_date = moment(productInfo.arrival_date).format('YYYY-MM-DD');
      const imagesInfo = productInfo.imagesInfo || [];
      delete productInfo.imagesInfo;
      const imagesOrder = imagesInfo.map((imageInfo) => imageInfo.file);
      productInfo.imagesOrder = imagesOrder;
      productInfo.deleted_images =
        originalProductInfo?.images?.filter((image) => !imagesOrder.includes(image.file)).map((image) => image.id) ??
        [];

      productInfo.id = originalProductInfo?.id;
      const createForm = new FormData();
      createForm.append('productDetail', JSON.stringify(productInfo));
      const response = await CustomFetchFormData(API_PATHS.createProduct, 'post', createForm);
      if (response.errors || !response.data) {
        dispatch(getErrorToastAction(response.errors || 'Something wrong'));
        return;
      }
      dispatch(getSuccessToastAction('Update product success! ID: ' + response.data));
      const productId = response.data;
      const uploadProcess: Promise<any>[] = [];
      imagesInfo.forEach((info, index) => {
        if (info.id == 'new') {
          uploadProcess.push(UploadImageProduct(productId, index + '', info.url!));
        }
      });
      try {
        if (uploadProcess.length) {
          await Promise.all(uploadProcess);
          dispatch(getSuccessToastAction('Uploaded images'));
        }
      } catch (error: any) {
        if (typeof error == 'string') dispatch(getErrorToastAction(error));
      } finally {
        fetchProductInfo();
      }
    },
    [dispatch, originalProductInfo, fetchProductInfo],
  );

  const handleSubmitForm = useCallback(
    (productInfo: IParamsProduct) => {
      handleUpdateProduct(productInfo);
      console.log(productInfo);
      setSubmitFlag(false);
    },
    [handleUpdateProduct],
  );

  useEffect(() => {
    setSubmitable(false);
    setSubmitFlag(false);
  }, [originalProductInfo]);

  return (
    <div className="space-y-4 pt-10  text-white">
      <div className="mx-10">
        <BackButton onClick={() => history.goBack()} />
      </div>
      <div className="mx-10 text-3xl font-semibold">Product Detail</div>
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

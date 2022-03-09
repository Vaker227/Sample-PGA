import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { API_PATHS } from '../../../configs/api';
import { loadingProcess } from '../../../configs/loadingProcess';
import { IFilterProduct, IProduct } from '../../../models/product';
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
import ProductFilterComponent from '../components/list/ProductFilterComponent';
import ProductTableComponent from '../components/list/ProductTableComponent';

interface Props {}

const ProductListPage = (props: Props) => {
  const dispatch = useDispatch();
  const loading = useSelector<AppState, loadingProcess[]>((state) => state.common.loading);
  const [productList, setProductList] = useState<IProduct[]>([]);
  const [recordsTotal, setRecordsTotal] = useState(0);
  const [selectedRemovingProducts, setSelectedRemoingProducts] = useState<IProduct['id'][]>([]);
  const [selectedExportintProducts, setSelectedExportintProducts] = useState<IProduct['id'][]>([]);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [filterObject, setFilterObject] = useState<IFilterProduct>({
    availability: 'all',
    category: '0',
    count: 25,
    order_by: 'ASC',
    page: 1,
    search: '',
    search_type: '',
    sort: 'name',
    stock_status: 'all',
    vendor: '',
  });

  const handleFecth = useCallback(
    async (filter: IFilterProduct) => {
      dispatch(turnOnLoadingOverlay(loadingProcess.LoadingProductList));
      const response = await CustomFetch(API_PATHS.getProductList, 'post', filter);
      if (response.errors) {
        dispatch(turnOffLoadingOverlay(loadingProcess.LoadingProductList));
        return;
      }
      setProductList(response.data);
      setRecordsTotal(response.recordsTotal);
    },
    [dispatch],
  );

  const handleSearch = useCallback((filter: IFilterProduct) => {
    setFilterObject((prev) => ({ ...prev, ...filter }));
  }, []);

  const handleSettingsChange = useCallback((filter: Partial<IFilterProduct>) => {
    setFilterObject((prev) => {
      console.log(prev);
      return { ...prev, ...filter };
    });
  }, []);

  const handleSelectRemove = useCallback((productId: IProduct['id']) => {
    setSelectedRemoingProducts((prev) => {
      const newArr = prev.slice(0);
      const index = prev.indexOf(productId);
      index < 0 ? newArr.push(productId) : newArr.splice(index, 1);
      return newArr;
    });
  }, []);

  const handleSelectExport = useCallback((productId: IProduct['id']) => {
    setSelectedExportintProducts((prev) => {
      const newArr = prev.slice(0);
      const index = prev.indexOf(productId);
      index < 0 ? newArr.push(productId) : newArr.splice(index, 1);
      return newArr;
    });
  }, []);

  // force reload when update product
  const handleForceReload = useCallback(() => {
    handleFecth(filterObject);
  }, [filterObject, handleFecth]);

  useEffect(() => {
    dispatch(getCommonValues.request());
  }, [dispatch]);

  // fetch when click search btn from filter and table settings change
  useEffect(() => {
    handleFecth(filterObject);
  }, [filterObject, handleFecth]);

  const toolBarElement = useMemo(
    () => (
      <ToolBar scrollTable>
        <Button variant="yellow" disabled={!selectedRemovingProducts.length} onClick={() => setShowRemoveModal(true)}>
          {selectedRemovingProducts.length ? 'Remove selected' : 'Save Changes'}
        </Button>
        <Button variant="yellow">Export CSV</Button>
      </ToolBar>
    ),
    [selectedRemovingProducts],
  );

  const removeModalElement = useMemo(() => {
    const handleRemove = async () => {
      setShowRemoveModal(false);
      dispatch(turnOnLoadingOverlay(loadingProcess.RemoveUser));
      const response = await CustomFetch(API_PATHS.editProduct, 'post', {
        params: selectedRemovingProducts.map((productId) => ({ id: productId, delete: 1 })),
      });
      dispatch(turnOffLoadingOverlay(loadingProcess.RemoveUser));
      if (response.errors) {
        dispatch(getErrorToastAction('Delete:' + getErrorMessageResponse(response)));
      } else {
        dispatch(getSuccessToastAction('Delete success'));
      }
      setSelectedRemoingProducts([]);
      handleForceReload();
    };
    return (
      <Backdrop show={showRemoveModal} closeOnBackdrop onClose={() => setShowRemoveModal(false)}>
        <div className="w-96 divide-y divide-secondary rounded border border-secondary bg-primary text-white">
          <div className="p-6 py-4 text-lg font-semibold">Confirm delete</div>
          <div className="p-6 py-4">
            Do you want to delete {selectedRemovingProducts.length > 1 ? 'these products' : 'this product'}
          </div>
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
      <div className="text-4xl text-white">Products {Date.now()}</div>
      <div>
        <ProductFilterComponent filterObject={filterObject} onSearch={handleSearch} />
        <div className="my-8">
          <Button variant="purple" onClick={() => setShowRemoveModal(true)}>
            Add Product
          </Button>
        </div>
        <ProductTableComponent
          onSelectRemove={handleSelectRemove}
          selectedRemovingProducts={selectedRemovingProducts}
          onSelectExport={handleSelectExport}
          selectedExportintProducts={selectedExportintProducts}
          list={productList}
          filter={filterObject}
          total={recordsTotal}
          onSettingsChange={handleSettingsChange}
          forceReload={handleForceReload}
        />
      </div>
      {toolBarElement}
      {removeModalElement}
    </div>
  );
};

export default ProductListPage;

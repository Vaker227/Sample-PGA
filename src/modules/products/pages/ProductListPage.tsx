import QueryString from 'query-string';
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { API_PATHS } from '../../../configs/api';
import { loadingProcess } from '../../../configs/loadingProcess';
import { ROUTES } from '../../../configs/routes';
import { IFilterProduct, IProduct } from '../../../models/product';
import { AppState } from '../../../redux/reducer';
import { getErrorMessageResponse } from '../../../utils';
import Backdrop from '../../common/components/Backdrop';
import Button from '../../common/components/button/Button';
import ToolBar from '../../common/components/ToolBar';
import { clearScrollPosition, turnOffLoadingOverlay, turnOnLoadingOverlay } from '../../common/redux/commonReducer';
import { CustomFetch } from '../../common/utils';
import { getErrorToastAction, getSuccessToastAction } from '../../toast/utils';
import ProductFilterComponent from '../components/list/ProductFilterComponent';
import ProductTableComponent from '../components/list/ProductTableComponent';
import useProductList from '../hooks/useProductList';
import { getProductListValues } from '../redux/productSagas';

const ProductListPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const scroll = useSelector<AppState, number | undefined>(
    (state) => state.common.scrollPositions[ROUTES.listProducts],
  );
  const [selectedRemovingProducts, setSelectedRemovingProducts] = useState<IProduct['id'][]>([]);
  const [selectedExportintProducts, setSelectedExportintProducts] = useState<IProduct['id'][]>([]);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [filterObject, setFilterObject] = useState<IFilterProduct>(() => {
    const queryObj: Partial<IFilterProduct> = QueryString.parse(history.location.search, { arrayFormat: 'bracket' });
    const defaultObj: IFilterProduct = {
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
    };
    return { ...defaultObj, ...queryObj };
  });

  const { recordsTotal, forceRevalidate, productList } = useProductList(filterObject);

  useEffect(() => {
    dispatch(getProductListValues.request());
  }, [dispatch]);

  const handleSearch = useCallback((filter: IFilterProduct) => {
    setFilterObject((prev) => ({ ...prev, ...filter }));
  }, []);

  const handleSettingsChange = useCallback((filter: Partial<IFilterProduct>) => {
    setFilterObject((prev) => {
      return { ...prev, ...filter };
    });
  }, []);

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
    }
  }, [location]);

  useEffect(() => {
    // store filter to URL
    const query = QueryString.stringify(filterObject, { arrayFormat: 'bracket' });
    history.replace(history.location.pathname + '?' + query);
    setSelectedExportintProducts([]);
    setSelectedRemovingProducts([]);
  }, [filterObject, history]);

  const toolBarElement = useMemo(
    () => (
      <ToolBar scrollTable>
        <Button variant="yellow" disabled={!selectedRemovingProducts.length} onClick={() => setShowRemoveModal(true)}>
          {selectedRemovingProducts.length ? 'Remove selected' : 'Save Changes'}
        </Button>
        <Button
          disabled={!selectedExportintProducts.length}
          variant="yellow"
          onClick={() => dispatch(getErrorToastAction('Export not work yet'))}
        >
          Export CSV
        </Button>
      </ToolBar>
    ),
    [selectedRemovingProducts, selectedExportintProducts, dispatch],
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
      setSelectedRemovingProducts([]);
      forceRevalidate();
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
  }, [showRemoveModal]); // eslint-disable-line

  const handleSelectRemove = useCallback((productId: IProduct['id']) => {
    setSelectedRemovingProducts((prev) => {
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

  const handleSelectAllExport = useCallback(
    (changeTo: boolean) => {
      setSelectedExportintProducts(changeTo ? productList.map((product) => product.id) : []);
    },
    [productList],
  );

  return (
    <div className="px-7 pt-8">
      <div className="text-4xl text-white">Products </div>
      <div>
        <ProductFilterComponent filterObject={filterObject} onSearch={handleSearch} />
        <div className="my-8">
          <Link to={ROUTES.createProduct}>
            <Button variant="purple">Add Product</Button>
          </Link>
        </div>
        <ProductTableComponent
          onSelectRemove={handleSelectRemove}
          selectedRemovingProducts={selectedRemovingProducts}
          onSelectExport={handleSelectExport}
          selectedExportintProducts={selectedExportintProducts}
          onSelectAllExport={handleSelectAllExport}
          list={productList || []}
          filter={filterObject}
          total={recordsTotal}
          onSettingsChange={handleSettingsChange}
          forceReload={forceRevalidate}
        />
      </div>
      {toolBarElement}
      {removeModalElement}
    </div>
  );
};

export default ProductListPage;

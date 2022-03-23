import moment from 'moment';
import React, { useState } from 'react';
import { FormattedNumber } from 'react-intl';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { API_PATHS } from '../../../../configs/api';
import { loadingProcess } from '../../../../configs/loadingProcess';
import { ROUTES } from '../../../../configs/routes';
import { IProduct } from '../../../../models/product';
import Backdrop from '../../../common/components/Backdrop';
import Button from '../../../common/components/button/Button';
import Checkbox from '../../../common/components/input/Checkbox';
import { storeScrollPosition, turnOffLoadingOverlay, turnOnLoadingOverlay } from '../../../common/redux/commonReducer';
import { CustomFetch } from '../../../common/utils';
import { getErrorToastAction, getSuccessToastAction } from '../../../toast/utils';
import PowerChecbox from '../PowerChecbox';

interface Props {
  product: IProduct;
  onSelectRemove(productId: IProduct['id']): void;
  selectedRemoving: boolean;
  onSelectExport(productId: IProduct['id']): void;
  selectedExporting: boolean;
  forceReload(): void;
}

const ProductRowComponent = (props: Props) => {
  const dispatch = useDispatch();
  const { product, onSelectRemove, selectedRemoving, onSelectExport, selectedExporting, forceReload } = props;
  const [showUpdataModal, setShowUpdateModal] = useState(false);
  const handleUpdate = async () => {
    setShowUpdateModal(false);
    dispatch(turnOnLoadingOverlay(loadingProcess.UpdateProduct));
    const response = await CustomFetch(API_PATHS.editProduct, 'post', {
      params: [{ id: product.id, enable: product.enabled == '1' ? 0 : 1 }],
    });
    dispatch(turnOffLoadingOverlay(loadingProcess.UpdateProduct));
    if (response.errors) {
      dispatch(getErrorToastAction('Update product failure'));
      return;
    }
    dispatch(getSuccessToastAction('Update product success'));
    forceReload();
  };

  const handleRestroScroll = () => {
    dispatch(
      storeScrollPosition({
        page: ROUTES.listProducts,
        scroll: document.getElementById('scrollable-container')?.scrollTop || 0,
      }),
    );
  };
  return (
    <>
      <tr className={`${selectedRemoving && 'opacity-70'}`}>
        <td className="x truncate p-3 ">
          <div className="flex divide-x border-r border-dashed py-2">
            <div className="pr-2">
              <Checkbox value={selectedExporting} onChange={() => onSelectExport(product.id)} />
            </div>
            <div className="pl-2">
              <PowerChecbox value={product.enabled == '1'} onChange={() => setShowUpdateModal(true)} />
            </div>
          </div>
        </td>
        <td className="truncate p-3 text-left">
          <Link
            onClick={handleRestroScroll}
            className="text-sky-500 hover:underline"
            to={ROUTES.detailProduct + '/' + product.id}
          >
            {product.sku}
          </Link>
        </td>
        <td className="truncate p-3 text-left">
          <Link
            onClick={handleRestroScroll}
            className="text-sky-500 hover:underline"
            to={ROUTES.detailProduct + '/' + product.id}
          >
            {product.name}
          </Link>
        </td>
        <td className="truncate p-3 text-left">{product.category}</td>
        <td className="truncate p-3 text-left">
          <FormattedNumber value={product.price as number} style="currency" currency="USD" />
        </td>
        <td className="truncate p-3 text-left">{product.amount}</td>
        <td className="truncate p-3 text-left">
          <div className="max-w-[200px] truncate">{product.vendor}</div>
        </td>
        <td className="truncate p-3 text-left">
          {moment(parseInt(product.arrivalDate) * 1000).format('MMM DD, YYYY')}
        </td>
        <td className="p-3">
          <div className="border-l border-dashed pl-4">
            <Button variant="purple" onClick={() => onSelectRemove(product.id)}>
              <i className="fa-solid fa-trash"></i>
            </Button>
          </div>
        </td>
      </tr>
      <Backdrop show={showUpdataModal} closeOnBackdrop onClose={() => setShowUpdateModal(false)}>
        <div className="w-96 divide-y divide-secondary rounded border border-secondary bg-primary text-white">
          <div className="p-6 py-4 text-lg font-semibold">Confirm update</div>
          <div className="p-6 py-4">Do you want to update this product</div>
          <div className="flex w-full justify-between p-6 py-4">
            <Button variant="flat-purple" bold onClick={handleUpdate}>
              Yes
            </Button>
            <Button variant="flat-red" bold onClick={() => setShowUpdateModal(false)}>
              No
            </Button>
          </div>
        </div>
      </Backdrop>
    </>
  );
};

export default React.memo(ProductRowComponent);

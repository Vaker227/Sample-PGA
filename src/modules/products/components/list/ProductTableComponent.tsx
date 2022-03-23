import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { loadingProcess } from '../../../../configs/loadingProcess';
import { IFilterProduct, IProduct } from '../../../../models/product';
import Checkbox from '../../../common/components/input/Checkbox';
import RowMangementComponent from '../../../common/components/table/RowMangementComponent';
import TableHeadSort from '../../../common/components/table/TableHeadSort';
import TablePaginationComponent from '../../../common/components/table/TablePaginationComponent';
import { turnOffLoadingOverlay } from '../../../common/redux/commonReducer';
import ProductRowComponent from './ProductRowComponent';

interface Props {
  filter: IFilterProduct;
  list: IProduct[];
  total: number;
  onSettingsChange(filter: Partial<IFilterProduct>): void;
  onSelectRemove(productId: IProduct['id']): void;
  selectedRemovingProducts: IProduct['id'][];
  onSelectExport(productId: IProduct['id']): void;
  selectedExportintProducts: IProduct['id'][];
  onSelectAllExport(changeTo: boolean): void;
  forceReload(): void;
}

const ProductTableComponent = (props: Props) => {
  const {
    filter,
    list,
    total,
    onSettingsChange,
    onSelectRemove,
    selectedRemovingProducts,
    onSelectExport,
    selectedExportintProducts,
    onSelectAllExport,
    forceReload,
  } = props;
  const dispatch = useDispatch();
  const pagesLength = useMemo(() => Math.ceil(total / filter.count), [filter.count, total]);

  const handleSort = useCallback(
    (sort: any, changeTo: 'DESC' | 'ASC') => {
      onSettingsChange({ sort, order_by: changeTo });
    },
    [onSettingsChange],
  );
  const handleSelectCount = useCallback(
    (count: number) => {
      onSettingsChange({ count, page: 1 });
    },
    [onSettingsChange],
  );
  const handleSelectPage = useCallback(
    (page: number) => {
      onSettingsChange({ page });
    },
    [onSettingsChange],
  );

  useEffect(() => {
    dispatch(turnOffLoadingOverlay(loadingProcess.LoadingProductList));
  }, [list, dispatch]);
  return (
    <div className="mb-14 border-secondary bg-primary p-4 text-white">
      <table id="main-table" className="block border-collapse overflow-x-hidden">
        <thead>
          <tr className="border-b border-b-secondary text-left">
            <th className="flex min-w-[100px] p-3">
              <Checkbox
                value={selectedExportintProducts.length == list.length && list.length != 0}
                onChange={onSelectAllExport}
              />
            </th>
            <th className="min-w-[100px] p-3 ">
              <TableHeadSort label="SKU" type="sku" orderBy={filter.order_by} sort={filter.sort} onClick={handleSort} />
            </th>
            <th className="min-w-[300px] p-3 ">
              <TableHeadSort
                label="Name"
                type="name"
                orderBy={filter.order_by}
                sort={filter.sort}
                onClick={handleSort}
              />
            </th>
            <th className="min-w-[150px] p-3 ">Category</th>
            <th className="min-w-[100px] p-3 ">
              <TableHeadSort
                label="Price"
                type="price"
                orderBy={filter.order_by}
                sort={filter.sort}
                onClick={handleSort}
              />
            </th>
            <th className="min-w-[100px] p-3 ">
              <TableHeadSort
                label="In stock"
                type="amount"
                orderBy={filter.order_by}
                sort={filter.sort}
                onClick={handleSort}
              />
            </th>
            <th className="min-w-[100px] p-3 ">Vendor</th>
            <th className="min-w-[200px] p-3 ">
              <TableHeadSort
                label="Arrival date"
                type="arrivalDate"
                orderBy={filter.order_by}
                sort={filter.sort}
                onClick={handleSort}
              />
            </th>
            <th className="min-w-[100px] p-3 "></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-secondary">
          {list.map((product) => (
            <ProductRowComponent
              forceReload={forceReload}
              key={product.id}
              product={product}
              onSelectRemove={onSelectRemove}
              selectedRemoving={selectedRemovingProducts.includes(product.id)}
              onSelectExport={onSelectExport}
              selectedExporting={selectedExportintProducts.includes(product.id)}
            />
          ))}
        </tbody>
      </table>
      <div className="my-5 flex flex-wrap items-center gap-5">
        <TablePaginationComponent pagesLength={pagesLength} currentPage={filter.page} setPage={handleSelectPage} />
        <RowMangementComponent count={filter.count} total={total} onSelectRowPerPage={handleSelectCount} />
      </div>
    </div>
  );
};

export default React.memo(ProductTableComponent);

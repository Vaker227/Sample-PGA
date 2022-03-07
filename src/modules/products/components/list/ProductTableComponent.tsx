import React from 'react';
import Checkbox from '../../../common/components/input/Checkbox';
import RowMangementComponent from '../../../common/components/table/RowMangementComponent';
import TablePaginationComponent from '../../../common/components/table/TablePaginationComponent';
import ProductRowComponent from './ProductRowComponent';

interface Props {}

const ProductTableComponent = (props: Props) => {
  return (
    <div className="mb-14 border-secondary bg-primary p-4 text-white">
      <table id="main-table" className="block border-collapse overflow-x-hidden">
        <thead>
          <tr className="border-b border-b-secondary text-left">
            <th className="flex min-w-[100px] p-3">
              <Checkbox value={true} onChange={() => {}} />
            </th>
            <th className="min-w-[100px] p-3 ">SKU</th>
            <th className="min-w-[300px] p-3 ">Name</th>
            <th className="min-w-[150px] p-3 ">Category</th>
            <th className="min-w-[100px] p-3 ">Price</th>
            <th className="min-w-[100px] p-3 ">In stock</th>
            <th className="min-w-[100px] p-3 ">Vendor</th>
            <th className="min-w-[200px] p-3 ">Arrival Date</th>
            <th className="min-w-[100px] p-3 "></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-secondary">
          {[1, 2, 3].map((product) => (
            <ProductRowComponent key={product} />
          ))}
        </tbody>
      </table>
      <div className="my-5 flex flex-wrap items-center gap-5">
        <TablePaginationComponent pagesLength={8} currentPage={1} setPage={() => {}} />
        <RowMangementComponent count={25} total={9999} onSelectRowPerPage={() => {}} />
      </div>
    </div>
  );
};

export default ProductTableComponent;

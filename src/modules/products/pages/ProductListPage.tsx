import React, { useMemo, useState } from 'react';
import Button from '../../common/components/button/Button';
import Backdrop from '../../common/components/Backdrop';
import ToolBar from '../../common/components/ToolBar';
import ProductFilterComponent from '../components/list/ProductFilterComponent';
import ProductTableComponent from '../components/list/ProductTableComponent';

interface Props {}

const ProductListPage = (props: Props) => {
  const [modalShow, setModalShow] = useState(false);
  const toolBarElement = useMemo(
    () => (
      <ToolBar>
        <Button variant="yellow">Remove selected</Button>
        <Button variant="yellow">Export CSV</Button>
      </ToolBar>
    ),
    [],
  );
  return (
    <div className="px-7 pt-8">
      <div className="text-4xl text-white">Products {Date.now()}</div>
      <div>
        <ProductFilterComponent />
        <div className="my-8">
          <Button variant="purple" onClick={() => setModalShow(true)}>
            Add Product
          </Button>
        </div>
        <ProductTableComponent />
      </div>
      {toolBarElement}
      <Backdrop show={modalShow} onClose={() => setModalShow(false)}>
        <div className="bg-white">asdasd</div>
      </Backdrop>
    </div>
  );
};

export default ProductListPage;

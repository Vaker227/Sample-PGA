import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch } from 'react-redux';

function TableRowComponent() {
  const dispatch = useDispatch();

  return (
    <tr className="product-table-row">
      <td className={`text-capitalize fw-bold `}></td>
      <td>
        <div className="view-detail-btn">
          <FormattedMessage id="viewDetailProduct" />
        </div>
      </td>
      <td className="btn" style={{ display: 'table-cell' }}>
        <i className="fa-solid fa-trash text-danger"></i>
      </td>
    </tr>
  );
}

export default React.memo(TableRowComponent);
// export default TableRowComponent;

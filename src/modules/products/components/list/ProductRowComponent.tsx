import React from 'react';
import { FormattedNumber } from 'react-intl';
import Button from '../../../common/components/button/Button';
import Checkbox from '../../../common/components/input/Checkbox';
import PowerChecbox from '../PowerChecbox';

interface Props {}

const ProductRowComponent = (props: Props) => {
  return (
    <tr className="">
      <td className="x truncate p-3 ">
        <div className="flex divide-x border-r border-dashed py-2">
          <div className="pr-2">
            <Checkbox value={true} onChange={() => {}} />
          </div>
          <div className="pl-2">
            <PowerChecbox value={true} onChange={() => {}} />
          </div>
        </div>
      </td>
      <td className="truncate p-3 text-left">ss-1446</td>
      <td className="truncate p-3 text-left">Name asdl kjasdl asdj askldj klasj daslasdkh</td>
      <td className="truncate p-3 text-left">Memero card</td>
      <td className="truncate p-3 text-left">
        <FormattedNumber value={1000} style="currency" currency="USD" />
      </td>
      <td className="truncate p-3 text-left">50</td>
      <td className="truncate p-3 text-left">
        <div className="max-w-[200px] truncate">hello@gmasilaskldjaskld jaskldj asd asd as das a asd</div>
      </td>
      <td className="truncate p-3 text-left">{Date.now()}</td>
      <td className="p-3">
        <div className="border-l border-dashed pl-4">
          <Button variant="purple">
            <i className="fa-solid fa-trash"></i>
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default React.memo(ProductRowComponent);

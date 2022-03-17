import React, { useMemo, useState } from 'react';
import NumberFormat from 'react-number-format';
import { IShipping, IShippingParams } from '../../../../models/shipping';
import { SelectOption } from '../../../../models/utils/input';
import Button from '../../../common/components/button/Button';
import InputComponent from '../../../common/components/input/InputComponent';
import InputFormLayout from '../../../common/components/input/InputFormLayout';
import InputGroup from '../../../common/components/input/InputGroup';
import SelectionComponent from '../../../common/components/input/SelectionComponent';

interface Props {
  list: IShipping[];
  selectedValues: IShippingParams[];
  onChange(shippingList: IShippingParams[]): void;
  onBlur?(): void;
}

const SelectShippingComponent = (props: Props) => {
  const { list, selectedValues, onChange, onBlur } = props;
  const [selectingShipping, setSelectingShipping] = useState('');
  const shippingOptions: SelectOption[] = useMemo(
    () =>
      list
        .filter((shipping) => selectedValues.every((selected) => selected.id !== shipping.id))
        .map((shipping) => ({ label: shipping.name, value: shipping.id || '' })),
    [list, selectedValues],
  );

  const handleChangePrice = (index: number, value: string) => {
    const nextShippings = selectedValues.slice(0);
    const cloneObj = { ...nextShippings[index] };
    cloneObj.price = value;
    nextShippings[index] = cloneObj;
    onChange(nextShippings);
  };

  const handleAddLocation = () => {
    const nextShippings = selectedValues.slice(0);
    const newShipping = {
      id: selectingShipping,
      zone_name: list.find((shipping) => shipping.id == selectingShipping)?.name,
      price: '0',
    };
    nextShippings.push(newShipping);
    onChange(nextShippings);
    setSelectingShipping('');
  };

  const handleRemoveLocation = (id: string) => {
    const nextShippings = selectedValues.slice();
    const index = nextShippings.findIndex((shipping) => shipping.id == id);
    nextShippings.splice(index, 1);
    onChange(nextShippings);
  };

  return (
    <div className="space-y-3">
      <InputFormLayout title="Contineltal U.S." smTitle required>
        <div className="w-64">
          <InputGroup sign={<i className="fa-solid fa-dollar-sign"></i>}>
            <NumberFormat
              customInput={InputComponent}
              decimalScale={2}
              placeholder="0.00"
              value={selectedValues[0].price}
              fixedDecimalScale
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangePrice(0, e.target.value)}
              onBlur={onBlur}
            />
          </InputGroup>
        </div>
      </InputFormLayout>
      {selectedValues.map((shipping, index) => {
        if (index == 0) return;
        return (
          <InputFormLayout key={shipping.id} title={shipping.zone_name} smTitle lg>
            <div className="flex gap-x-5">
              <div className="w-44">
                <InputGroup sign={<i className="fa-solid fa-dollar-sign"></i>}>
                  <NumberFormat
                    customInput={InputComponent}
                    decimalScale={2}
                    placeholder="0.00"
                    fixedDecimalScale
                    value={shipping.price}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangePrice(index, e.target.value)}
                    onBlur={onBlur}
                  />
                </InputGroup>
              </div>
              <Button onClick={() => handleRemoveLocation(shipping.id!)}>Remove</Button>
            </div>
          </InputFormLayout>
        );
      })}
      <InputFormLayout smTitle title="" lg>
        <div className="flex gap-x-3">
          <div className="w-1/2">
            <SelectionComponent
              title="Select new zone"
              list={shippingOptions}
              selectedValue={selectingShipping}
              onChange={setSelectingShipping}
            />
          </div>
          <div className="w-1/2">
            <Button disabled={selectingShipping == ''} onClick={handleAddLocation}>
              Add Shipping Location
            </Button>
          </div>
        </div>
      </InputFormLayout>
    </div>
  );
};

export default SelectShippingComponent;

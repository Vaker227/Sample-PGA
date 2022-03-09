import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { IFilterProduct } from '../../../../models/product';
import { ICategory } from '../../../../models/products';
import { SelectOption } from '../../../../models/utils/input';
import { AppState } from '../../../../redux/reducer';
import Button from '../../../common/components/button/Button';
import FilterWrapper from '../../../common/components/filter/FilterWrapper';
import Checkbox from '../../../common/components/input/Checkbox';
import InputComponent from '../../../common/components/input/InputComponent';
import SelectionComponent from '../../../common/components/input/SelectionComponent';
import InputSearchVendor from './InputSearchVendor';

interface Props {
  filterObject: IFilterProduct;
  onSearch(filter: IFilterProduct): void;
}

const ProductFilterComponent = (props: Props) => {
  const { filterObject, onSearch } = props;
  const categories = useSelector<AppState, ICategory[]>((state) => state.category.list);
  const [filterProperties, setFilterProperties] = useState<IFilterProduct>(filterObject);

  useEffect(() => {
    setFilterProperties(filterObject);
  }, [filterObject]);

  const categoryOptions: SelectOption[] = useMemo(
    () => categories.map((category) => ({ label: category.name, value: category.id })),
    [categories],
  );

  const stockStatusOptions: SelectOption[] = useMemo(
    () => [
      { label: 'In stock', value: 'in' },
      { label: 'Low stock', value: 'low' },
      { label: 'SOLD', value: 'out' },
    ],
    [],
  );
  const availabilityOptions: SelectOption[] = useMemo(
    () => [
      { label: 'Only enabled', value: '1' },
      { label: 'Only disabled', value: '0' },
    ],
    [],
  );

  const handleSearchKeywords = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterProperties((prev) => ({ ...prev, search: e.target.value }));
  }, []);
  const handleSelectCategory = useCallback((value) => {
    setFilterProperties((prev) => ({ ...prev, category: value }));
  }, []);
  const handleSelectStockStatus = useCallback((value) => {
    setFilterProperties((prev) => ({ ...prev, stock_status: value }));
  }, []);
  const handleSelectAvailability = useCallback((value) => {
    setFilterProperties((prev) => ({ ...prev, availability: value }));
  }, []);

  const handleSelectSearchType = (type: string) => {
    const selectedTypes = filterProperties.search_type.split(',');
    const index = selectedTypes.indexOf(type);
    index > 0 ? selectedTypes.splice(index, 1) : selectedTypes.push(type);
    setFilterProperties({ ...filterProperties, search_type: selectedTypes.filter((type) => type).join(',') });
  };

  const handleSelectVendor = useCallback((value: string) => {
    setFilterProperties((prev) => ({ ...prev, vendor: value }));
  }, []);

  return (
    <FilterWrapper
      header={
        <>
          <div className="grow-[2]">
            <InputComponent
              placeholder="Search keywords"
              onChange={handleSearchKeywords}
              value={filterProperties.search}
            />
          </div>
          <div className="grow">
            <SelectionComponent
              title="Any category"
              list={categoryOptions}
              selectedValue={filterProperties.category}
              onChange={handleSelectCategory}
            />
          </div>
          <div className="grow">
            <SelectionComponent
              title="Any stock status"
              defaultValue="all"
              list={stockStatusOptions}
              selectedValue={filterProperties.stock_status}
              onChange={handleSelectStockStatus}
            />
          </div>
          <div className="flex-none">
            <Button variant="purple" onClick={() => onSearch(filterProperties)}>
              Search
            </Button>
          </div>
        </>
      }
      detail={
        <>
          <div className="flex flex-wrap gap-10 text-white">
            <div className="flex gap-x-3">
              <div>Search in:</div>
              <div className="space-y-2">
                <div className="flex items-center gap-x-3">
                  <Checkbox
                    value={filterProperties.search_type.includes('name')}
                    onChange={() => handleSelectSearchType('name')}
                  />
                  Name
                </div>
                <div className="flex items-center gap-x-3">
                  <Checkbox
                    value={filterProperties.search_type.includes('sku')}
                    onChange={() => handleSelectSearchType('sku')}
                  />
                  SKU
                </div>
                <div className="flex items-center gap-x-3">
                  <Checkbox
                    value={filterProperties.search_type.includes('description')}
                    onChange={() => handleSelectSearchType('description')}
                  />
                  FullDescription
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-x-3">
                <div>Availability</div>
                <SelectionComponent
                  list={availabilityOptions}
                  selectedValue={filterProperties.availability}
                  defaultValue="all"
                  title="Any availability status"
                  onChange={handleSelectAvailability}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-x-3">
                <div>Vendor</div>
                <InputSearchVendor onChange={handleSelectVendor} />
              </div>
            </div>
          </div>
        </>
      }
    ></FilterWrapper>
  );
};

export default ProductFilterComponent;

import React from 'react';
import DatePicker from 'react-datepicker';
import '../../style/custom-react-date-picker.css';

const CustomDateInput = React.forwardRef(function DateInput(
  props: any,
  ref: any,
) {
  const { value, onClick, isClearable, placeholder, onChange, onRemove } =
    props;
  return (
    <div className="relative w-fit">
      <input
        ref={ref}
        value={value}
        onChange={onChange}
        onClick={onClick}
        placeholder={placeholder}
        className={
          ' rounded border p-2 pr-6 font-semibold text-white shadow transition duration-300' +
          ' border-[#13132b] bg-[#252547]' +
          ' hover:border-[#13132b] hover:bg-[#1b1b38]' +
          ' focus:border-[#a16eff] focus:outline-none' +
          ' hover:focus:border-[#13132b] hover:focus:bg-[#1b1b38]'
        }
      />
      {value && isClearable && (
        <i className="fa-solid fa-circle-xmark" onClick={onRemove}></i>
      )}
      <i className="fa-solid fa-calendar-days absolute top-3 right-3 text-white"></i>
    </div>
  );
});

interface Props {
  placeholder?: string;
  onChange(date: Date | null): void;
  selectedValue?: Date | null;
  clearable?: boolean;
  selectRange?: boolean;
  range?: { startDate: Date; endDate: Date };
}

function PickDateComponent(props: Props) {
  const { placeholder, selectedValue, clearable, selectRange, range } = props;
  const handleChange = (date: Date | null) => {
    props.onChange(date);
  };
  const handleRemove = () => {
    props.onChange(null);
  };
  return (
    <DatePicker
      selected={selectedValue}
      startDate={range?.startDate}
      endDate={range?.endDate}
      onChange={handleChange}
      customInput={
        <CustomDateInput onRemove={handleRemove} isClearable={clearable} />
      }
      selectsRange={selectRange}
      calendarClassName="text-red-400"
      placeholderText={placeholder}
    />
  );
}

export default PickDateComponent;

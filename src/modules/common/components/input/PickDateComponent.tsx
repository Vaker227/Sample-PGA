import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import '../../style/custom-react-date-picker.css';

const CustomDateInput = React.forwardRef(function DateInput(props: any, ref: any) {
  const { value, onClick, isClearable, placeholder, onChange, onRemove } = props;
  return (
    <div className="relative w-fit">
      <input
        ref={ref}
        value={value}
        onChange={onChange}
        onClick={onClick}
        placeholder={placeholder}
        className={
          ' truncate rounded border p-2 pr-8 font-semibold text-white shadow transition duration-300' +
          ' border-secondary bg-[#252547]' +
          ' hover:border-secondary hover:bg-[#1b1b38]' +
          ' focus:border-[#a16eff] focus:outline-none' +
          ' hover:focus:border-secondary hover:focus:bg-[#1b1b38]'
        }
      />
      {value && isClearable && <i className="fa-solid fa-circle-xmark" onClick={onRemove}></i>}
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
  range?: { startDate: string; endDate: string };
}

function PickDateComponent(props: Props) {
  const { placeholder, selectedValue, clearable, selectRange, range } = props;
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  useEffect(() => {
    setStartDate(range?.startDate ? new Date(range.startDate) : null);
    setEndDate(range?.endDate ? new Date(range.startDate) : null);
  }, [range]);

  const handleChange = (date: Date | null) => {
    props.onChange(date);
  };
  const handleRemove = () => {
    props.onChange(null);
  };
  return (
    <DatePicker
      selected={selectedValue || startDate}
      startDate={startDate}
      endDate={endDate}
      onChange={handleChange}
      customInput={<CustomDateInput onRemove={handleRemove} isClearable={clearable} />}
      selectsRange={selectRange}
      calendarClassName="text-red-400"
      placeholderText={placeholder}
      dateFormat={'MMMM d, yyyy'}
    />
  );
}

export default PickDateComponent;

import React from 'react';

interface Props {
  orderBy: 'DESC' | 'ASC';
  sort: string;
  type: string;
  label: string;
  onClick(sort: string, changeTo: 'DESC' | 'ASC'): void;
}

const TableHeadSort = (props: Props) => {
  const { onClick, sort, orderBy, type, label } = props;
  const handleClick = () => {
    if (type != sort) {
      onClick(type, 'ASC');
    } else if (orderBy == 'ASC') {
      onClick(type, 'DESC');
    } else {
      onClick(type, 'ASC');
    }
  };
  return (
    <div className="flex cursor-pointer items-center space-x-3" onClick={handleClick}>
      <span>{label}</span>
      {sort == type && <i className={`fa-solid fa-arrow-down-long ${orderBy == 'DESC' && 'rotate-180'}`}></i>}
    </div>
  );
};

export default TableHeadSort;

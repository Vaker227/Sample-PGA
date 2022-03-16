import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSidebarExpand } from '../../redux/navReducer';

interface Props {
  label: string;
  icon: React.ReactNode;
  active: boolean;
  children?: React.ReactNode;
  expand?: boolean;
}

const Dropdown = (props: Props) => {
  const { label, children, icon, expand: sidebarExpand, active } = props;
  const [expand, setExpand] = useState(false);
  const dispatch = useDispatch();
  const handleExpand = () => {
    if (!sidebarExpand) {
      dispatch(setSidebarExpand(true));
    }
    setExpand(!expand);
  };

  return (
    <div className={`${sidebarExpand ? 'pl-7' : 'pl-6'} pr-3 text-sm font-semibold`} onClick={() => {}}>
      <div
        className={`flex cursor-pointer items-center py-3 hover:text-violet-400 ${active && 'text-violet-500'}`}
        onClick={handleExpand}
      >
        <div className="">{icon}</div>
        {sidebarExpand && <div className="ml-3">{label}</div>}
        <i
          className={`fa-solid fa-chevron-down duration-400 ml-auto transition-transform ${
            expand ? 'ease-out' : 'rotate-90 ease-in '
          }`}
        ></i>
      </div>
      {sidebarExpand && (
        <div
          className={`duration-400 divide-y divide-black overflow-hidden transition-all  ${
            expand ? 'max-h-screen ease-in' : 'max-h-0 ease-out'
          }`}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default Dropdown;

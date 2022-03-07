import React, { useCallback, useEffect, useState } from 'react';

interface Props {
  children?: React.ReactNode;
}

const ToolBar = (props: Props) => {
  console.log('rerender toolbar');
  const [scrollRef, setScrollRef] = useState<HTMLDivElement>();
  const setRefForScrollRef = useCallback((element) => {
    setScrollRef(element);
  }, []);

  // scroll binding -- temporary remove 2-way-binding for performance (#main-table: scroll-hidden)
  useEffect(() => {
    const table = document.getElementById('main-table');
    const scrollBindingRef2Table = () => {
      if (table && scrollRef) {
        table.scrollLeft = scrollRef.scrollLeft;
      }
    };
    // const scrollBindingTable2Ref = () => {
    //   if (table && scrollRef) {
    //     scrollRef.scrollLeft = table.scrollLeft;
    //   }
    // };

    if (scrollRef && table) {
      const child = scrollRef.querySelector('div');
      if (child) {
        child.style.width = table.scrollWidth + 500 + 'px';
      }
      scrollRef.addEventListener('scroll', scrollBindingRef2Table);
      // table.addEventListener('scroll', scrollBindingTable2Ref);
    }

    return () => {
      if (scrollRef) scrollRef.removeEventListener('scroll', scrollBindingRef2Table);
      // if (table) table.removeEventListener('scroll', scrollBindingTable2Ref);
    };
  }, [scrollRef]);

  return (
    <div className="sticky bottom-0 h-20 w-full rounded border-secondary bg-primary py-3 shadow-[0_0_13px_0_#b18aff]">
      <div className="flex space-x-3 px-10">{props.children}</div>
      <div ref={setRefForScrollRef} className="h-5 w-full overflow-x-scroll">
        <div className="h-full w-[3000px]"></div>
      </div>
    </div>
  );
};

export default ToolBar;

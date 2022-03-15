import React, { useEffect, useMemo, useRef, useState } from 'react';

const useSelectIndex = (index: number, start: number, end: number) => {
  const [focusIndex, setFocusIndex] = useState(index);
  const lowest = useMemo(() => start, [start]);
  const highest = useMemo(() => end, [end]);
  const focusingElement = useRef<HTMLDivElement>(null);
  const wrapperElement = useRef<HTMLDivElement>(null);

  const handleSelectByKeyBoard = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key == 'ArrowUp') {
      e.preventDefault();
      setFocusIndex((prev) => (prev - 1 >= lowest ? prev - 1 : highest));
    } else if (e.key == 'ArrowDown') {
      e.preventDefault();
      setFocusIndex((prev) => (prev + 1 <= highest ? prev + 1 : lowest));
    } else if (e.key == 'Enter') {
      e.preventDefault();
      focusingElement.current?.click();
    }
  };

  useEffect(() => {
    if (focusIndex > end) {
      setFocusIndex(end);
    } else if (focusIndex < start) {
      setFocusIndex(start);
    }
  }, [start, end]);
  useEffect(() => {
    focusingElement.current && wrapperElement.current?.scrollTo(0, focusingElement.current.offsetTop - 80);
  }, [focusIndex]);

  return { focusingElement, wrapperElement, focusIndex, setFocusIndex, handleSelectByKeyBoard };
};

export default useSelectIndex;

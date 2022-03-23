import { useEffect, useRef } from 'react';

const useScrollToTop = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.parentElement?.scrollTo(0, 0);
    }
  }, []);
  return { containerRef };
};

export default useScrollToTop;

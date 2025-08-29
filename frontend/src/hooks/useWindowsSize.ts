import { useEffect, useState } from 'react';

export type UseWindowSizeOutput = {
  width?: number;
  height?: number;
};

export function useWindowSize(): UseWindowSizeOutput {
  const [windowSize, setWindowSize] = useState<{
    width?: number;
    height?: number;
  }>({
    width: typeof window === 'undefined' ? undefined : window.innerWidth,
    height: typeof window === 'undefined' ? undefined : window.innerHeight,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

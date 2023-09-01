import { useState, useEffect } from "react";

const useDebounce = (delay: number) => {
  const [blocked, setBlocked] = useState<boolean>(false);

  const [lastClick, setLastClick] = useState<number>(0);

  useEffect(() => {
    if (blocked) {
      const timeout = setTimeout(() => {
        setBlocked(false);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [blocked, delay]);

  const debounce = (callback: () => void) => {
    if (Date.now() - lastClick > (delay || 300)) {
      callback && callback();
      setBlocked(true);
      setLastClick(Date.now());
    }
  };

  return { blocked, debounce };
};

export default useDebounce;

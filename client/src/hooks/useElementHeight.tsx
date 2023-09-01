import { ReactNode, useCallback, useState } from "react";

const useElementHeight = () => {
  const [elemHeight, setElemHeight] = useState<number>(0);

  const getHeight = useCallback((node: HTMLDivElement) => {
    if (node !== null) {
      setElemHeight(node.offsetHeight);
    }
  }, []);

  return { elemHeight, getHeight };
};

export default useElementHeight;

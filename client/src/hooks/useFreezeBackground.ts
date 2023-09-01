import { useEffect } from "react";

const useFreezeBackground = () => {
  useEffect((): (() => void) => {
    document.body.style.overflow = "hidden";
    return () => {
      return (document.body.style.overflow = "unset");
    };
  }, []);
};

export default useFreezeBackground;

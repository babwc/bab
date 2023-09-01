import { ReactNode, useEffect } from "react";

const FrozenBackground = ({ children }: { children: ReactNode }) => {
  useEffect((): (() => void) => {
    document.body.style.overflow = "hidden";
    return () => {
      return (document.body.style.overflow = "unset");
    };
  }, []);

  return <></>;
};

export default FrozenBackground;

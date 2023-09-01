import { useState, useRef, useMemo } from "react";

const useRollDown = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const ref = useRef<any>();

  const handleState = () => setIsOpen((isOpen) => !isOpen);

  const style = useMemo(
    () => ({
      maxHeight: isOpen ? ref.current?.scrollHeight + "px" : "0",
    }),
    [isOpen]
  );

  return { ref, style, isOpen, handleState };
};

export default useRollDown;

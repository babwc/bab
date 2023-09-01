import { useState, useRef, useEffect } from "react";

const usePopup = (closeOnAny?: boolean) => {
  const [popupOpen, setPopupOpen] = useState<boolean>(false);

  const ref = useRef<HTMLDivElement>(null);
  const refExeption = useRef<any>(null);

  const handleToggle = () => {
    setPopupOpen(!popupOpen);
  };

  const handleOpen = () => !popupOpen && setPopupOpen(true);

  const handleMousedown = (e: any) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setPopupOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleMousedown);
    return () => {
      document.removeEventListener("click", handleMousedown);
    };
  }, []);

  return {
    popupOpen,
    ref,
    refExeption,
    handleToggle,
    handleOpen,
  };
};

export default usePopup;

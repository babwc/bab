import { useState } from "react";

import "./style.scss";

const MenuIcon = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div
      className={`menu-icon ${open ? "open" : ""}`}
      onClick={() => setOpen(!open)}
    >
      <span />
      <span />
      <span />
    </div>
  );
};

export default MenuIcon;

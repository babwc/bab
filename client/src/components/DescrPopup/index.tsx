import { ReactNode } from "react";

import { motion } from "framer-motion";

import useFreezeBackground from "../../hooks/useFreezeBackground";

import Close from "../Close";

import "./style.scss";

const DescrPopup = ({
  name,
  handleToggle,
  children,
}: {
  name?: string;
  handleToggle: () => void;
  children: ReactNode;
}) => {
  useFreezeBackground();
  return (
    <motion.div
      key={"descr-popup"}
      className="descr-popup"
      initial={{ opacity: 0, y: -200, x: "-50%" }}
      animate={{ opacity: 1, y: "-50%", x: "-50%" }}
      exit={{ opacity: 0, y: -200 }}
    >
      <div className="descr-popup__body">
        <div className="descr-popup__body__header">
          {name ? <h3>{name}</h3> : null}
        </div>
        <div className="descr-popup__close" onClick={handleToggle}>
          <Close color="#fff" />
        </div>
        <div className="descr-popup__text">
          <motion.h3
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {children}
          </motion.h3>
        </div>
      </div>
    </motion.div>
  );
};

export default DescrPopup;

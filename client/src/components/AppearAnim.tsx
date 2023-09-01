import { ReactNode } from "react";

import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

const AppearAnim = ({
  motionKey,
  inProp,
  className,
  children,
}: {
  motionKey: string;
  inProp: boolean;
  className?: string;
  children: ReactNode;
}) => {
  return (
    <AnimatePresence>
      {inProp && (
        <motion.div
          key={motionKey}
          className={className}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AppearAnim;

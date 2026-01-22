// src/components/MotionWrapper.tsx
import { ReactNode } from "react";
import { motion } from "framer-motion";

interface MotionWrapperProps {
  children: ReactNode;
}

export const MotionWrapper: React.FC<MotionWrapperProps> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3, ease: "backIn" }}
      style={{ height: "100%" }} // optional: keeps layout stable
    >
      {children}
    </motion.div>
  );
};

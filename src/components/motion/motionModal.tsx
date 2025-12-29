// src/components/motion/MotionModal.tsx
import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

interface MotionModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  /** Optional: custom class for inner content */
  contentClassName?: string;
  /** Optional: disable backdrop click close */
  disableBackdropClose?: boolean;
}

export const MotionModal: React.FC<MotionModalProps> = ({
  isOpen,
  onClose,
  children,
  contentClassName = "",
  disableBackdropClose = false,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={!disableBackdropClose ? onClose : undefined}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-40"
          />

          {/* Modal Content - Unique slide-up + scale */}
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 300,
            }}
            className="fixed inset-4 md:inset-8 lg:inset-16 z-50 flex items-center justify-center pointer-events-none"
          >
            <div
              className={`bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[95vh] flex flex-col overflow-hidden pointer-events-auto ${contentClassName}`}
            >
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
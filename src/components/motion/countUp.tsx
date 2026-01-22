// src/components/motion/CountUp.tsx
import {
  motion,
  useMotionValue,
  useTransform,
  useMotionTemplate,
  animate,
} from "framer-motion";
import { useEffect } from "react";

interface CountUpProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

export const CountUp: React.FC<CountUpProps> = ({
  value,
  prefix = "",
  suffix = "",
  duration = 1.1,
}) => {
  const count = useMotionValue(0);

  // Convert number → formatted string
  const formatted = useTransform(count, (v) =>
    Math.round(v).toLocaleString()
  );

  // Safely interpolate motion value into text
  const text = useMotionTemplate`${prefix}${formatted}${suffix}`;

  useEffect(() => {
    const controls = animate(count, value, {
      duration,
      ease: "easeOut",
    });

    return controls.stop;
  }, [value, duration, count]);

  return <motion.span>{text}</motion.span>;
};

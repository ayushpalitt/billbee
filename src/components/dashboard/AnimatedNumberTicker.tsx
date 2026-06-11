"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

export function AnimatedNumberTicker({ value, prefix = "" }: { value: number, prefix?: string }) {
  const [mounted, setMounted] = useState(false);
  const springValue = useSpring(0, { stiffness: 50, damping: 20 });
  const displayValue = useTransform(springValue, (current) => 
    `${prefix}${current.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  );

  useEffect(() => {
    setMounted(true);
    springValue.set(value);
  }, [value, springValue]);

  if (!mounted) {
    return <span>{prefix}0.00</span>;
  }

  return <motion.span>{displayValue}</motion.span>;
}

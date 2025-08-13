import React, { useEffect, useRef, useState } from "react";

interface NumberTickerProps {
  to: number;
  duration?: number; // ms
  className?: string;
}

export const NumberTicker: React.FC<NumberTickerProps> = ({ to, duration = 1500, className }) => {
  const [value, setValue] = useState(0);
  const startRef = useRef<number | null>(null);
  const prefersReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (prefersReduced) { setValue(to); return; }
    let raf = 0;
    const step = (timestamp: number) => {
      if (!startRef.current) startRef.current = timestamp;
      const progress = Math.min((timestamp - startRef.current) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * to));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [to, duration, prefersReduced]);

  return <span className={className}>{value}</span>;
};

export default NumberTicker;

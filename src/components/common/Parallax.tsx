import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface ParallaxProps extends React.HTMLAttributes<HTMLDivElement> {
  speed?: number; // -1..1 (negative moves slower, positive faster)
}

export const Parallax: React.FC<ParallaxProps> = ({ speed = -0.2, className, style, children, ...rest }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handle = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = (vh - rect.top) / (vh + rect.height);
      setOffset((progress - 0.5) * 100 * speed);
    };
    handle();
    window.addEventListener('scroll', handle, { passive: true });
    window.addEventListener('resize', handle);
    return () => { window.removeEventListener('scroll', handle); window.removeEventListener('resize', handle); };
  }, [speed]);

  return (
    <div
      ref={ref}
      className={cn(className)}
      style={{ transform: `translateY(${offset.toFixed(2)}px)`, willChange: 'transform', ...style }}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Parallax;

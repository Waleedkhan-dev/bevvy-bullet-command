import { useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MiniChartProps {
  data: number[];
  color?: "primary" | "secondary" | "accent" | "warning";
  height?: number;
  className?: string;
}

export function MiniChart({ data, color = "primary", height = 40, className }: MiniChartProps) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const colorClasses = {
    primary: { stroke: "stroke-primary", fill: "fill-primary/20" },
    secondary: { stroke: "stroke-secondary", fill: "fill-secondary/20" },
    accent: { stroke: "stroke-accent", fill: "fill-accent/20" },
    warning: { stroke: "stroke-warning", fill: "fill-warning/20" },
  };

  const points = useMemo(() => {
    const width = 100;
    const step = width / (data.length - 1);
    return data.map((value, index) => ({
      x: index * step,
      y: height - ((value - min) / range) * (height - 4) - 2,
    }));
  }, [data, height, min, range]);

  const linePath = points.map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`)).join(" ");
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${height} L 0 ${height} Z`;

  return (
    <svg viewBox={`0 0 100 ${height}`} className={cn("w-full", className)} preserveAspectRatio="none">
      <motion.path
        d={areaPath}
        className={colorClasses[color].fill}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />
      <motion.path
        d={linePath}
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={colorClasses[color].stroke}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
    </svg>
  );
}

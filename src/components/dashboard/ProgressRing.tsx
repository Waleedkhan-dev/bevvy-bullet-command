import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProgressRingProps {
  value: number;
  max: number;
  label: string;
  sublabel?: string;
  color?: "primary" | "secondary" | "accent" | "warning";
  size?: number;
  strokeWidth?: number;
}

export function ProgressRing({
  value,
  max,
  label,
  sublabel,
  color = "primary",
  size = 100,
  strokeWidth = 8,
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const percentage = Math.min((value / max) * 100, 100);
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const colorClasses = {
    primary: "stroke-primary",
    secondary: "stroke-secondary",
    accent: "stroke-accent",
    warning: "stroke-warning",
  };

  const glowClasses = {
    primary: "drop-shadow-[0_0_8px_rgba(0,240,255,0.5)]",
    secondary: "drop-shadow-[0_0_8px_rgba(255,107,53,0.5)]",
    accent: "drop-shadow-[0_0_8px_rgba(0,255,136,0.5)]",
    warning: "drop-shadow-[0_0_8px_rgba(255,184,0,0.5)]",
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="transform -rotate-90" width={size} height={size}>
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            strokeWidth={strokeWidth}
            className="stroke-muted"
          />
          {/* Progress circle */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            className={cn(colorClasses[color], glowClasses[color])}
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-mono font-bold text-foreground">
            {percentage.toFixed(0)}%
          </span>
        </div>
      </div>
      <p className="text-sm font-medium text-foreground mt-2">{label}</p>
      {sublabel && <p className="text-xs text-muted-foreground">{sublabel}</p>}
    </div>
  );
}

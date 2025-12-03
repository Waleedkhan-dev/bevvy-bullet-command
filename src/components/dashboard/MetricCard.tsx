import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  prefix?: string;
  suffix?: string;
  change?: number;
  changeLabel?: string;
  icon?: React.ReactNode;
  variant?: "default" | "primary" | "secondary" | "success";
  delay?: number;
}

export function MetricCard({
  title,
  value,
  prefix = "",
  suffix = "",
  change,
  changeLabel,
  icon,
  variant = "default",
  delay = 0,
}: MetricCardProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const numericValue = typeof value === "number" ? value : parseFloat(value.replace(/[^0-9.]/g, ""));

  useEffect(() => {
    const duration = 1500;
    const steps = 60;
    const increment = numericValue / steps;
    let current = 0;
    let step = 0;

    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        step++;
        current += increment;
        if (step >= steps) {
          setDisplayValue(numericValue);
          clearInterval(interval);
        } else {
          setDisplayValue(Math.floor(current));
        }
      }, duration / steps);
    }, delay);

    return () => clearTimeout(timer);
  }, [numericValue, delay]);

  const formatValue = (val: number) => {
    if (prefix === "$") {
      return val.toLocaleString();
    }
    return val.toLocaleString();
  };

  const variantStyles = {
    default: "border-border",
    primary: "border-primary/30 shadow-[0_0_30px_rgba(0,240,255,0.1)]",
    secondary: "border-secondary/30 shadow-[0_0_30px_rgba(255,107,53,0.1)]",
    success: "border-accent/30 shadow-[0_0_30px_rgba(0,255,136,0.1)]",
  };

  const valueStyles = {
    default: "text-foreground",
    primary: "text-primary glow-cyan",
    secondary: "text-secondary glow-orange",
    success: "text-accent glow-green",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: delay / 1000 }}
      className={cn(
        "glass-card p-5 gradient-border",
        variantStyles[variant]
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-sm text-muted-foreground font-medium">{title}</span>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </div>

      <div className="flex items-end justify-between">
        <div>
          <p className={cn("text-3xl font-mono font-bold tabular-nums", valueStyles[variant])}>
            {prefix}
            {formatValue(displayValue)}
            {suffix}
          </p>
          {change !== undefined && (
            <div className="flex items-center gap-1 mt-2">
              {change >= 0 ? (
                <ArrowUp className="w-3 h-3 text-accent" />
              ) : (
                <ArrowDown className="w-3 h-3 text-destructive" />
              )}
              <span
                className={cn(
                  "text-xs font-medium",
                  change >= 0 ? "text-accent" : "text-destructive"
                )}
              >
                {Math.abs(change)}%
              </span>
              {changeLabel && (
                <span className="text-xs text-muted-foreground">{changeLabel}</span>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

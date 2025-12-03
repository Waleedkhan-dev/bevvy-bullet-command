import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AnalyticsCardProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function AnalyticsCard({ title, icon, children, delay = 0, className }: AnalyticsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: delay / 1000 }}
      className={cn("glass-card p-5 gradient-border", className)}
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="text-muted-foreground">{icon}</div>
        <h3 className="text-sm font-mono font-semibold text-foreground tracking-wide uppercase">
          {title}
        </h3>
      </div>
      {children}
    </motion.div>
  );
}

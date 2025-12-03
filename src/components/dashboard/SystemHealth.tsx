import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Status = "operational" | "warning" | "error" | "disconnected";

interface Integration {
  name: string;
  status: Status;
}

const integrations: Integration[] = [
  { name: "n8n", status: "operational" },
  { name: "Stripe", status: "operational" },
  { name: "SendGrid", status: "operational" },
  { name: "TikTok", status: "operational" },
  { name: "Instagram", status: "warning" },
  { name: "Facebook", status: "operational" },
  { name: "X", status: "operational" },
  { name: "LinkedIn", status: "operational" },
  { name: "YouTube", status: "operational" },
  { name: "Discord", status: "operational" },
  { name: "Kickstarter", status: "disconnected" },
  { name: "Supabase", status: "operational" },
];

const statusConfig: Record<Status, { dot: string; label: string; color: string }> = {
  operational: { dot: "status-dot-operational", label: "Operational", color: "text-accent" },
  warning: { dot: "status-dot-warning", label: "Warning", color: "text-warning" },
  error: { dot: "status-dot-error", label: "Error", color: "text-destructive" },
  disconnected: { dot: "status-dot-inactive", label: "Not Connected", color: "text-muted-foreground" },
};

export function SystemHealth() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="glass-card p-4"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-mono font-semibold text-foreground tracking-wide">
          SYSTEM HEALTH
        </h3>
        <div className="flex items-center gap-4 text-xs">
          {(["operational", "warning", "error", "disconnected"] as Status[]).map((status) => (
            <div key={status} className="flex items-center gap-1.5">
              <div className={statusConfig[status].dot} />
              <span className="text-muted-foreground">{statusConfig[status].label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        {integrations.map((integration, index) => (
          <motion.div
            key={integration.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50 border border-border hover:border-primary/30 transition-colors cursor-default"
            )}
          >
            <div className={statusConfig[integration.status].dot} />
            <span className={cn("text-sm font-medium", statusConfig[integration.status].color)}>
              {integration.name}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

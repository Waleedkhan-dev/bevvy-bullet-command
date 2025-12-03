import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Mail, DollarSign, Target, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

interface ActivityItem {
  id: string;
  type: "workflow" | "email" | "payment" | "influencer" | "community";
  message: string;
  time: string;
}

const icons = {
  workflow: Zap,
  email: Mail,
  payment: DollarSign,
  influencer: Target,
  community: MessageSquare,
};

const colors = {
  workflow: "text-primary",
  email: "text-secondary",
  payment: "text-accent",
  influencer: "text-warning",
  community: "text-pink-hot",
};

const initialActivities: ActivityItem[] = [
  { id: "1", type: "workflow", message: 'Workflow #34 completed: "Instagram Reel Posted"', time: "2s ago" },
  { id: "2", type: "email", message: "New subscriber: j***@gmail.com (Landing Page)", time: "45s ago" },
  { id: "3", type: "payment", message: "VIP Deposit: $1.00 from Sarah M.", time: "2m ago" },
  { id: "4", type: "influencer", message: "Influencer @techguru responded: Interested", time: "5m ago" },
  { id: "5", type: "workflow", message: 'Workflow #12 started: "TikTok Content Posting"', time: "8m ago" },
  { id: "6", type: "community", message: "New member joined Discord: Alex K.", time: "12m ago" },
  { id: "7", type: "email", message: "Welcome email sent to m***@outlook.com", time: "15m ago" },
  { id: "8", type: "payment", message: "VIP Deposit: $1.00 from Mike R.", time: "23m ago" },
];

const newActivityMessages = [
  { type: "workflow" as const, message: 'Workflow #18 completed: "LinkedIn Post Scheduled"' },
  { type: "email" as const, message: "New subscriber: k***@yahoo.com (Referral)" },
  { type: "payment" as const, message: "VIP Deposit: $1.00 from Emma L." },
  { type: "community" as const, message: "New message in #launch-squad channel" },
  { type: "workflow" as const, message: 'Workflow #23 started: "AI Content Generation"' },
];

export function LiveActivityFeed() {
  const [activities, setActivities] = useState<ActivityItem[]>(initialActivities);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomActivity = newActivityMessages[Math.floor(Math.random() * newActivityMessages.length)];
      const newActivity: ActivityItem = {
        id: Date.now().toString(),
        type: randomActivity.type,
        message: randomActivity.message,
        time: "just now",
      };

      setActivities((prev) => {
        const updated = [newActivity, ...prev.slice(0, 7)];
        return updated;
      });
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.5 }}
      className="glass-card p-5 h-full"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-mono font-semibold text-foreground tracking-wide">
          LIVE ACTIVITY
        </h3>
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
          </span>
          <span className="text-xs text-muted-foreground">Live</span>
        </div>
      </div>

      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
        <AnimatePresence mode="popLayout">
          {activities.map((activity) => {
            const Icon = icons[activity.type];
            return (
              <motion.div
                key={activity.id}
                layout
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <div className={cn("p-1.5 rounded-md bg-background/50", colors[activity.type])}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground truncate">{activity.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

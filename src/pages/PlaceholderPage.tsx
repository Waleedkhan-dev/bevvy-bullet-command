import { AppLayout } from "@/components/layout/AppLayout";
import { motion } from "framer-motion";
import { Construction } from "lucide-react";

interface PlaceholderPageProps {
  title: string;
  subtitle: string;
  accentWord: string;
}

export default function PlaceholderPage({ title, subtitle, accentWord }: PlaceholderPageProps) {
  return (
    <AppLayout>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-mono font-bold text-foreground mb-2">
          {title} <span className="text-primary glow-cyan">{accentWord}</span>
        </h1>
        <p className="text-muted-foreground">{subtitle}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="glass-card p-12 flex flex-col items-center justify-center text-center"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Construction className="w-16 h-16 text-primary mb-6" />
        </motion.div>
        <h2 className="text-xl font-mono font-semibold text-foreground mb-2">
          Coming Soon
        </h2>
        <p className="text-muted-foreground max-w-md">
          This section is under construction. We're building something amazing for your campaign management.
        </p>
      </motion.div>
    </AppLayout>
  );
}

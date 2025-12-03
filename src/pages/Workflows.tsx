import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  Plus,
  ChevronDown,
  ChevronRight,
  Play,
  Pause,
  ExternalLink,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface Workflow {
  id: number;
  name: string;
  status: "active" | "paused" | "error";
  frequency: string;
  lastRun: string;
  runs: number;
  phase: number;
}

const workflows: Record<number, { title: string; workflows: Workflow[] }> = {
  1: {
    title: "Foundation",
    workflows: [
      { id: 1, name: "Email Capture → Database Write", status: "active", frequency: "On trigger", lastRun: "2m ago", runs: 1247, phase: 1 },
      { id: 2, name: "$1 Deposit Payment Processing (Stripe)", status: "active", frequency: "On trigger", lastRun: "23m ago", runs: 89, phase: 1 },
      { id: 3, name: "VIP Depositor Tagging & Segmentation", status: "active", frequency: "On trigger", lastRun: "23m ago", runs: 89, phase: 1 },
      { id: 4, name: "Welcome Email Sequence (3 emails)", status: "active", frequency: "On trigger", lastRun: "45s ago", runs: 1247, phase: 1 },
      { id: 5, name: "AI Text Content Generation", status: "active", frequency: "4x daily", lastRun: "1h ago", runs: 127, phase: 1 },
      { id: 6, name: "AI Image Generation", status: "active", frequency: "2x daily", lastRun: "3h ago", runs: 89, phase: 1 },
      { id: 7, name: "AI Video Generation & Editing", status: "paused", frequency: "Daily", lastRun: "2d ago", runs: 34, phase: 1 },
      { id: 8, name: "Community Auto-Invitation (Discord/GHL)", status: "active", frequency: "On trigger", lastRun: "15m ago", runs: 287, phase: 1 },
      { id: 9, name: "Role Assignment (Member/VIP/Beta)", status: "active", frequency: "On trigger", lastRun: "15m ago", runs: 287, phase: 1 },
      { id: 10, name: "Daily Conversation Starter", status: "active", frequency: "Daily 9AM", lastRun: "5h ago", runs: 21, phase: 1 },
      { id: 11, name: "Weekly Poll & Engagement", status: "active", frequency: "Weekly Mon", lastRun: "2d ago", runs: 3, phase: 1 },
    ],
  },
  2: {
    title: "Distribution",
    workflows: [
      { id: 12, name: "TikTok Content Posting", status: "active", frequency: "2x daily", lastRun: "2m ago", runs: 847, phase: 2 },
      { id: 13, name: "Instagram Feed Posting", status: "active", frequency: "Daily", lastRun: "4h ago", runs: 324, phase: 2 },
      { id: 14, name: "Instagram Reels Posting", status: "active", frequency: "2x daily", lastRun: "1h ago", runs: 456, phase: 2 },
      { id: 15, name: "Facebook Content Posting", status: "active", frequency: "2x daily", lastRun: "3h ago", runs: 289, phase: 2 },
      { id: 16, name: "X (Twitter) Posting", status: "error", frequency: "3x daily", lastRun: "Failed", runs: 567, phase: 2 },
      { id: 17, name: "LinkedIn Content Posting", status: "active", frequency: "Daily", lastRun: "6h ago", runs: 156, phase: 2 },
      { id: 18, name: "YouTube Shorts Upload", status: "active", frequency: "Daily", lastRun: "8h ago", runs: 98, phase: 2 },
      { id: 19, name: "Master Scheduling & Queue", status: "active", frequency: "Continuous", lastRun: "1m ago", runs: 2345, phase: 2 },
      { id: 20, name: "8-Week Email Nurture", status: "active", frequency: "Scheduled", lastRun: "30m ago", runs: 892, phase: 2 },
      { id: 21, name: "VIP Exclusive Emails", status: "active", frequency: "Weekly", lastRun: "1d ago", runs: 45, phase: 2 },
      { id: 22, name: "Cross-Platform Analytics Collection", status: "active", frequency: "Hourly", lastRun: "12m ago", runs: 1892, phase: 2 },
    ],
  },
  3: {
    title: "Optimization",
    workflows: [
      { id: 29, name: "Influencer Database Management", status: "active", frequency: "Daily", lastRun: "4h ago", runs: 147, phase: 3 },
      { id: 30, name: "Influencer Discovery AI", status: "active", frequency: "2x daily", lastRun: "2h ago", runs: 234, phase: 3 },
      { id: 31, name: "DM Outreach Automation", status: "paused", frequency: "On trigger", lastRun: "1d ago", runs: 89, phase: 3 },
      { id: 32, name: "Follow-Up Sequences", status: "active", frequency: "Daily", lastRun: "8h ago", runs: 67, phase: 3 },
      { id: 33, name: "Sample Shipping Tracker", status: "active", frequency: "On trigger", lastRun: "2d ago", runs: 18, phase: 3 },
      { id: 34, name: "A/B Test: Subject Lines", status: "active", frequency: "Continuous", lastRun: "1h ago", runs: 456, phase: 3 },
      { id: 35, name: "A/B Test: Thumbnails", status: "active", frequency: "Continuous", lastRun: "3h ago", runs: 234, phase: 3 },
      { id: 36, name: "A/B Test: Captions", status: "paused", frequency: "Continuous", lastRun: "5d ago", runs: 123, phase: 3 },
    ],
  },
  4: {
    title: "Launch",
    workflows: [
      { id: 47, name: "Kickstarter API Sync", status: "paused", frequency: "Real-time", lastRun: "N/A", runs: 0, phase: 4 },
      { id: 48, name: "Live Funding Display", status: "paused", frequency: "Real-time", lastRun: "N/A", runs: 0, phase: 4 },
      { id: 49, name: "System Health Monitoring", status: "active", frequency: "Every 5min", lastRun: "2m ago", runs: 4567, phase: 4 },
      { id: 50, name: "Milestone Posts (25/50/75/100%)", status: "paused", frequency: "On trigger", lastRun: "N/A", runs: 0, phase: 4 },
      { id: 51, name: "Backer Update Automation", status: "paused", frequency: "On trigger", lastRun: "N/A", runs: 0, phase: 4 },
      { id: 52, name: "Negative Comment Detection", status: "active", frequency: "Real-time", lastRun: "15m ago", runs: 234, phase: 4 },
    ],
  },
};

const statusConfig = {
  active: { icon: CheckCircle, color: "text-accent", bg: "bg-accent/10", label: "Active" },
  paused: { icon: Pause, color: "text-warning", bg: "bg-warning/10", label: "Paused" },
  error: { icon: XCircle, color: "text-destructive", bg: "bg-destructive/10", label: "Error" },
};

export default function Workflows() {
  const [expandedPhases, setExpandedPhases] = useState<number[]>([1, 2]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const totalWorkflows = Object.values(workflows).reduce((sum, phase) => sum + phase.workflows.length, 0);
  const activeWorkflows = Object.values(workflows).reduce(
    (sum, phase) => sum + phase.workflows.filter((w) => w.status === "active").length,
    0
  );
  const pausedWorkflows = Object.values(workflows).reduce(
    (sum, phase) => sum + phase.workflows.filter((w) => w.status === "paused").length,
    0
  );
  const errorWorkflows = Object.values(workflows).reduce(
    (sum, phase) => sum + phase.workflows.filter((w) => w.status === "error").length,
    0
  );

  const togglePhase = (phase: number) => {
    setExpandedPhases((prev) =>
      prev.includes(phase) ? prev.filter((p) => p !== phase) : [...prev, phase]
    );
  };

  const filterWorkflows = (workflowList: Workflow[]) => {
    return workflowList.filter((w) => {
      const matchesSearch = w.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "all" || w.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  };

  return (
    <AppLayout>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-mono font-bold text-foreground mb-2">
          Automation <span className="text-primary glow-cyan">Workflows</span>
        </h1>
        <p className="text-muted-foreground">
          Manage and monitor your 52+ campaign automation workflows
        </p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total", value: totalWorkflows, color: "text-foreground" },
          { label: "Active", value: activeWorkflows, color: "text-accent" },
          { label: "Paused", value: pausedWorkflows, color: "text-warning" },
          { label: "Error", value: errorWorkflows, color: "text-destructive" },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card p-4 text-center"
          >
            <p className={cn("text-3xl font-mono font-bold", stat.color)}>{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search workflows..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-muted border border-border rounded-lg px-3 py-2 text-sm text-foreground"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="paused">Paused</option>
            <option value="error">Error</option>
          </select>
        </div>
        <Button className="ml-auto">
          <Plus className="w-4 h-4 mr-2" />
          New Workflow
        </Button>
      </div>

      {/* Workflow Phases */}
      <div className="space-y-4">
        {Object.entries(workflows).map(([phaseNum, phase]) => {
          const phaseNumber = parseInt(phaseNum);
          const isExpanded = expandedPhases.includes(phaseNumber);
          const filteredWorkflows = filterWorkflows(phase.workflows);

          return (
            <motion.div
              key={phaseNumber}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: phaseNumber * 0.1 }}
              className="glass-card overflow-hidden"
            >
              {/* Phase Header */}
              <button
                onClick={() => togglePhase(phaseNumber)}
                className="w-full flex items-center justify-between p-4 hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {isExpanded ? (
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  )}
                  <span className="text-xs text-primary font-mono">PHASE {phaseNumber}</span>
                  <span className="text-lg font-semibold text-foreground">{phase.title}</span>
                  <span className="text-sm text-muted-foreground">
                    ({filteredWorkflows.length} workflows)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-accent">
                    {filteredWorkflows.filter((w) => w.status === "active").length} active
                  </span>
                </div>
              </button>

              {/* Workflow List */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="border-t border-border"
                  >
                    <div className="divide-y divide-border">
                      {filteredWorkflows.map((workflow) => {
                        const StatusIcon = statusConfig[workflow.status].icon;
                        return (
                          <div
                            key={workflow.id}
                            className="flex items-center justify-between px-4 py-3 hover:bg-muted/20 transition-colors"
                          >
                            <div className="flex items-center gap-4">
                              <span className="text-xs text-muted-foreground font-mono w-8">
                                #{workflow.id}
                              </span>
                              <span className="text-sm text-foreground">{workflow.name}</span>
                            </div>
                            <div className="flex items-center gap-6">
                              <div className="flex items-center gap-1.5">
                                <StatusIcon
                                  className={cn("w-4 h-4", statusConfig[workflow.status].color)}
                                />
                                <span
                                  className={cn(
                                    "text-xs font-medium",
                                    statusConfig[workflow.status].color
                                  )}
                                >
                                  {statusConfig[workflow.status].label}
                                </span>
                              </div>
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Clock className="w-3 h-3" />
                                <span>{workflow.frequency}</span>
                              </div>
                              <div className="text-xs text-muted-foreground w-20">
                                Last: {workflow.lastRun}
                              </div>
                              <div className="text-xs text-foreground font-mono w-16 text-right">
                                {workflow.runs.toLocaleString()} runs
                              </div>
                              <div className="flex items-center gap-1">
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <ExternalLink className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <FileText className="w-4 h-4" />
                                </Button>
                                {workflow.status === "active" ? (
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <Pause className="w-4 h-4" />
                                  </Button>
                                ) : (
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <Play className="w-4 h-4" />
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </AppLayout>
  );
}

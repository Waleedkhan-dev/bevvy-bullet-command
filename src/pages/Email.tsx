import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Mail, 
  Users, 
  MousePointerClick, 
  UserMinus,
  ChevronRight,
  Clock,
  TrendingUp,
  Filter,
  Download,
  Search,
  Star,
  Crown,
  FlaskConical
} from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { AnalyticsCard } from "@/components/dashboard/AnalyticsCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const emailSequences = [
  {
    name: "Welcome Sequence",
    emails: [
      { name: "Email 1", delay: "Immediate", opens: 58, clicks: 12 },
      { name: "Email 2", delay: "Day 2", opens: 47, clicks: 9 },
      { name: "Email 3", delay: "Day 5", opens: 42, clicks: 8 },
    ],
    totalSubscribers: 1247,
    completionRate: 78,
  },
  {
    name: "8-Week Nurture",
    emails: [
      { name: "Week 1", delay: "Day 7", opens: 44, clicks: 7 },
      { name: "Week 2", delay: "Day 14", opens: 41, clicks: 6 },
      { name: "Week 3", delay: "Day 21", opens: 38, clicks: 6 },
      { name: "Week 4", delay: "Day 28", opens: 36, clicks: 5 },
      { name: "Week 5", delay: "Day 35", opens: 35, clicks: 5 },
      { name: "Week 6", delay: "Day 42", opens: 33, clicks: 4 },
      { name: "Week 7", delay: "Day 49", opens: 32, clicks: 4 },
      { name: "Week 8", delay: "Day 56", opens: 31, clicks: 4 },
    ],
    totalSubscribers: 892,
    completionRate: 45,
  },
  {
    name: "VIP Depositor Sequence",
    emails: [
      { name: "VIP Welcome", delay: "Immediate", opens: 72, clicks: 24 },
      { name: "Exclusive Preview", delay: "Day 1", opens: 68, clicks: 22 },
      { name: "Early Bird Access", delay: "Day 3", opens: 65, clicks: 20 },
    ],
    totalSubscribers: 89,
    completionRate: 92,
  },
];

const subscribers = [
  { id: 1, email: "sarah.m***@gmail.com", name: "Sarah M.", segment: "VIP", status: "Active", joinedAt: "2 days ago", opens: 8, clicks: 3 },
  { id: 2, email: "john.d***@outlook.com", name: "John D.", segment: "Regular", status: "Active", joinedAt: "5 days ago", opens: 5, clicks: 1 },
  { id: 3, email: "emma.w***@yahoo.com", name: "Emma W.", segment: "Beta", status: "Active", joinedAt: "1 week ago", opens: 12, clicks: 4 },
  { id: 4, email: "mike.t***@gmail.com", name: "Mike T.", segment: "VIP", status: "Active", joinedAt: "3 days ago", opens: 6, clicks: 2 },
  { id: 5, email: "lisa.r***@gmail.com", name: "Lisa R.", segment: "Regular", status: "Inactive", joinedAt: "2 weeks ago", opens: 2, clicks: 0 },
];

const sendTimeData = [
  { hour: "6AM", mon: 12, tue: 15, wed: 18, thu: 14, fri: 11, sat: 8, sun: 6 },
  { hour: "9AM", mon: 45, tue: 52, wed: 48, thu: 51, fri: 42, sat: 22, sun: 18 },
  { hour: "12PM", mon: 38, tue: 42, wed: 45, thu: 40, fri: 35, sat: 28, sun: 25 },
  { hour: "3PM", mon: 32, tue: 35, wed: 38, thu: 36, fri: 30, sat: 20, sun: 15 },
  { hour: "6PM", mon: 48, tue: 55, wed: 52, thu: 50, fri: 45, sat: 35, sun: 32 },
  { hour: "9PM", mon: 42, tue: 48, wed: 45, thu: 44, fri: 38, sat: 30, sun: 28 },
];

export default function Email() {
  const [activeSequence, setActiveSequence] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [segmentFilter, setSegmentFilter] = useState("All");

  const getSegmentIcon = (segment: string) => {
    switch (segment) {
      case "VIP": return <Crown className="w-3 h-3" />;
      case "Beta": return <FlaskConical className="w-3 h-3" />;
      default: return <Star className="w-3 h-3" />;
    }
  };

  const getSegmentColor = (segment: string) => {
    switch (segment) {
      case "VIP": return "text-secondary bg-secondary/20";
      case "Beta": return "text-primary bg-primary/20";
      default: return "text-muted-foreground bg-muted";
    }
  };

  const getHeatmapColor = (value: number) => {
    if (value >= 50) return "bg-accent/80";
    if (value >= 40) return "bg-accent/60";
    if (value >= 30) return "bg-accent/40";
    if (value >= 20) return "bg-primary/40";
    return "bg-primary/20";
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-mono font-bold text-foreground">
              Email <span className="text-primary glow-cyan">Marketing</span>
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Manage email sequences and subscriber engagement
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button size="sm">
              <Mail className="w-4 h-4 mr-2" />
              New Campaign
            </Button>
          </div>
        </div>

        {/* Overview Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Total Subscribers"
            value={1247}
            change={12}
            changeLabel="vs last week"
            icon={<Users className="w-5 h-5" />}
            variant="primary"
            delay={0}
          />
          <MetricCard
            title="Open Rate"
            value={42.3}
            suffix="%"
            change={5.2}
            changeLabel="vs target 35%"
            icon={<Mail className="w-5 h-5" />}
            variant="success"
            delay={100}
          />
          <MetricCard
            title="Click Rate"
            value={8.7}
            suffix="%"
            change={2.1}
            changeLabel="vs target 5%"
            icon={<MousePointerClick className="w-5 h-5" />}
            variant="secondary"
            delay={200}
          />
          <MetricCard
            title="Unsubscribe Rate"
            value={0.12}
            suffix="%"
            change={-0.03}
            changeLabel="vs last month"
            icon={<UserMinus className="w-5 h-5" />}
            variant="default"
            delay={300}
          />
        </div>

        {/* Email Sequences */}
        <AnalyticsCard
          title="Email Sequences"
          icon={<Mail className="w-4 h-4" />}
          delay={400}
        >
          <div className="space-y-4">
            {/* Sequence Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {emailSequences.map((seq, idx) => (
                <button
                  key={seq.name}
                  onClick={() => setActiveSequence(idx)}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all",
                    activeSequence === idx
                      ? "bg-primary/20 text-primary border border-primary/30"
                      : "bg-muted/50 text-muted-foreground hover:bg-muted"
                  )}
                >
                  {seq.name}
                </button>
              ))}
            </div>

            {/* Active Sequence Flow */}
            <div className="glass-card p-4 border border-border/50">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-semibold text-foreground">
                    {emailSequences[activeSequence].name}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {emailSequences[activeSequence].totalSubscribers} subscribers • {emailSequences[activeSequence].completionRate}% completion
                  </p>
                </div>
                <Button variant="ghost" size="sm">
                  Edit Sequence
                </Button>
              </div>

              {/* Visual Flow */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2">
                {emailSequences[activeSequence].emails.map((email, idx) => (
                  <motion.div
                    key={email.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center"
                  >
                    <div className="glass-card p-3 border border-border/50 min-w-[140px]">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                          <span className="text-xs font-mono text-primary">{idx + 1}</span>
                        </div>
                        <span className="text-sm font-medium text-foreground">{email.name}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                        <Clock className="w-3 h-3" />
                        {email.delay}
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">Opens</span>
                          <span className="text-accent font-mono">{email.opens}%</span>
                        </div>
                        <div className="h-1 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-accent rounded-full"
                            style={{ width: `${email.opens}%` }}
                          />
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">Clicks</span>
                          <span className="text-primary font-mono">{email.clicks}%</span>
                        </div>
                        <div className="h-1 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${email.clicks * 3}%` }}
                          />
                        </div>
                      </div>
                    </div>
                    {idx < emailSequences[activeSequence].emails.length - 1 && (
                      <ChevronRight className="w-5 h-5 text-muted-foreground mx-1 flex-shrink-0" />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </AnalyticsCard>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Subscriber Management */}
          <AnalyticsCard
            title="Subscribers"
            icon={<Users className="w-4 h-4" />}
            delay={500}
          >
            <div className="space-y-4">
              {/* Search and Filter */}
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search subscribers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="w-4 h-4" />
                </Button>
              </div>

              {/* Segment Filters */}
              <div className="flex gap-2">
                {["All", "VIP", "Regular", "Beta"].map((seg) => (
                  <button
                    key={seg}
                    onClick={() => setSegmentFilter(seg)}
                    className={cn(
                      "px-3 py-1 rounded-full text-xs font-medium transition-all",
                      segmentFilter === seg
                        ? "bg-primary/20 text-primary"
                        : "bg-muted/50 text-muted-foreground hover:bg-muted"
                    )}
                  >
                    {seg}
                  </button>
                ))}
              </div>

              {/* Subscriber List */}
              <div className="space-y-2 max-h-[300px] overflow-y-auto">
                {subscribers
                  .filter(s => segmentFilter === "All" || s.segment === segmentFilter)
                  .map((sub) => (
                  <div
                    key={sub.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-xs font-mono text-primary">
                          {sub.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{sub.email}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className={cn(
                            "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs",
                            getSegmentColor(sub.segment)
                          )}>
                            {getSegmentIcon(sub.segment)}
                            {sub.segment}
                          </span>
                          <span className="text-xs text-muted-foreground">{sub.joinedAt}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">
                        {sub.opens} opens • {sub.clicks} clicks
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnalyticsCard>

          {/* Best Send Times Heatmap */}
          <AnalyticsCard
            title="Best Send Times"
            icon={<TrendingUp className="w-4 h-4" />}
            delay={600}
          >
            <div className="space-y-3">
              <p className="text-xs text-muted-foreground">
                Open rates by hour and day (higher is better)
              </p>
              
              {/* Heatmap Header */}
              <div className="flex">
                <div className="w-12" />
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                  <div key={day} className="flex-1 text-center text-xs text-muted-foreground">
                    {day}
                  </div>
                ))}
              </div>

              {/* Heatmap Grid */}
              <div className="space-y-1">
                {sendTimeData.map((row) => (
                  <div key={row.hour} className="flex items-center gap-1">
                    <div className="w-12 text-xs text-muted-foreground">{row.hour}</div>
                    <div className={cn("flex-1 h-8 rounded", getHeatmapColor(row.mon))} title={`${row.mon}%`} />
                    <div className={cn("flex-1 h-8 rounded", getHeatmapColor(row.tue))} title={`${row.tue}%`} />
                    <div className={cn("flex-1 h-8 rounded", getHeatmapColor(row.wed))} title={`${row.wed}%`} />
                    <div className={cn("flex-1 h-8 rounded", getHeatmapColor(row.thu))} title={`${row.thu}%`} />
                    <div className={cn("flex-1 h-8 rounded", getHeatmapColor(row.fri))} title={`${row.fri}%`} />
                    <div className={cn("flex-1 h-8 rounded", getHeatmapColor(row.sat))} title={`${row.sat}%`} />
                    <div className={cn("flex-1 h-8 rounded", getHeatmapColor(row.sun))} title={`${row.sun}%`} />
                  </div>
                ))}
              </div>

              {/* Legend */}
              <div className="flex items-center justify-center gap-4 pt-2">
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 rounded bg-primary/20" />
                  <span className="text-xs text-muted-foreground">Low</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 rounded bg-primary/40" />
                  <span className="text-xs text-muted-foreground">Medium</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 rounded bg-accent/60" />
                  <span className="text-xs text-muted-foreground">High</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 rounded bg-accent/80" />
                  <span className="text-xs text-muted-foreground">Best</span>
                </div>
              </div>
            </div>
          </AnalyticsCard>
        </div>
      </div>
    </AppLayout>
  );
}

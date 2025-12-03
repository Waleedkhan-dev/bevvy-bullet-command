import { AppLayout } from "@/components/layout/AppLayout";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { SystemHealth } from "@/components/dashboard/SystemHealth";
import { LiveActivityFeed } from "@/components/dashboard/LiveActivityFeed";
import { AnalyticsCard } from "@/components/dashboard/AnalyticsCard";
import { MiniChart } from "@/components/dashboard/MiniChart";
import { ProgressRing } from "@/components/dashboard/ProgressRing";
import { motion } from "framer-motion";
import {
  DollarSign,
  Mail,
  Users,
  Zap,
  TrendingUp,
  BarChart3,
  MessageSquare,
  PieChart,
} from "lucide-react";

const contentData = [65, 72, 68, 85, 92, 88, 95, 110, 105, 120, 115, 130];
const emailData = [28, 32, 35, 38, 42, 45, 47, 42, 48, 52, 55, 58];
const communityData = [50, 65, 78, 92, 105, 118, 135, 152, 168, 185, 205, 220];
const revenueData = [2500, 3200, 4100, 5200, 6800, 7900, 8500, 9200, 10100, 11200, 12000, 12847];

const topPosts = [
  { platform: "TikTok", title: "Unboxing Preview", views: "12.4K", engagement: "8.2%" },
  { platform: "Instagram", title: "Behind the Scenes", views: "8.7K", engagement: "6.5%" },
  { platform: "X", title: "Launch Teaser", views: "5.2K", engagement: "4.8%" },
];

const emailSequences = [
  { name: "Welcome", status: "active", completion: 89 },
  { name: "8-Week Nurture", status: "active", completion: 34 },
  { name: "VIP Exclusive", status: "active", completion: 67 },
];

export default function Index() {
  return (
    <AppLayout>
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-mono font-bold text-foreground mb-2">
          Campaign <span className="text-primary glow-cyan">Pulse</span>
        </h1>
        <p className="text-muted-foreground">
          Real-time overview of your Bevvy Bullet Kickstarter campaign
        </p>
      </motion.div>

      {/* Primary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <MetricCard
          title="Pre-Launch Revenue"
          value={12847}
          prefix="$"
          change={23}
          changeLabel="vs last week"
          icon={<DollarSign className="w-5 h-5" />}
          variant="primary"
          delay={0}
        />
        <MetricCard
          title="Email Subscribers"
          value={1247}
          change={12}
          changeLabel="vs last week"
          icon={<Mail className="w-5 h-5" />}
          variant="secondary"
          delay={100}
        />
        <MetricCard
          title="VIP Depositors"
          value={89}
          change={8}
          changeLabel="vs last week"
          icon={<Users className="w-5 h-5" />}
          variant="success"
          delay={200}
        />
        <MetricCard
          title="Active Workflows"
          value="42/52"
          icon={<Zap className="w-5 h-5" />}
          delay={300}
        />
      </div>

      {/* System Health */}
      <SystemHealth />

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Content Performance */}
        <AnalyticsCard
          title="Content Performance"
          icon={<TrendingUp className="w-4 h-4" />}
          delay={400}
        >
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground">Posts this week</span>
                <span className="text-lg font-mono font-bold text-foreground">127</span>
              </div>
              <MiniChart data={contentData} color="primary" height={50} />
            </div>

            <div className="border-t border-border pt-4">
              <p className="text-xs text-muted-foreground mb-3">Top Performing Content</p>
              <div className="space-y-2">
                {topPosts.map((post, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 rounded-lg bg-muted/30"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground w-16">{post.platform}</span>
                      <span className="text-sm text-foreground">{post.title}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-mono text-foreground">{post.views}</span>
                      <span className="text-xs text-accent">{post.engagement}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AnalyticsCard>

        {/* Email Health */}
        <AnalyticsCard
          title="Email Health"
          icon={<BarChart3 className="w-4 h-4" />}
          delay={500}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-6">
              <ProgressRing
                value={42.3}
                max={100}
                label="Open Rate"
                sublabel="Target: 35%"
                color="primary"
                size={90}
              />
              <ProgressRing
                value={8.7}
                max={15}
                label="Click Rate"
                sublabel="Target: 5%"
                color="secondary"
                size={90}
              />
              <ProgressRing
                value={0.12}
                max={0.5}
                label="Unsub Rate"
                sublabel="Target: <0.5%"
                color="accent"
                size={90}
              />
            </div>

            <div className="border-t border-border pt-4">
              <p className="text-xs text-muted-foreground mb-3">Active Sequences</p>
              <div className="space-y-2">
                {emailSequences.map((seq, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="status-dot-operational" />
                      <span className="text-sm text-foreground">{seq.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-1.5 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${seq.completion}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className="h-full bg-primary rounded-full"
                        />
                      </div>
                      <span className="text-xs font-mono text-muted-foreground w-10">
                        {seq.completion}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AnalyticsCard>

        {/* Community Metrics */}
        <AnalyticsCard
          title="Community Metrics"
          icon={<MessageSquare className="w-4 h-4" />}
          delay={600}
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 rounded-lg bg-muted/30">
                <p className="text-xs text-muted-foreground mb-1">Total Members</p>
                <p className="text-2xl font-mono font-bold text-foreground">287</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/30">
                <p className="text-xs text-muted-foreground mb-1">Active (7d)</p>
                <p className="text-2xl font-mono font-bold text-accent">156</p>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground">Member growth</span>
                <span className="text-xs text-accent">+18%</span>
              </div>
              <MiniChart data={communityData} color="accent" height={50} />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
              <div>
                <p className="text-xs text-muted-foreground">Messages Today</p>
                <p className="text-lg font-mono font-bold text-foreground">247</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Top Channel</p>
                <p className="text-sm text-foreground">#general</p>
              </div>
            </div>
          </div>
        </AnalyticsCard>

        {/* Financial Overview */}
        <AnalyticsCard
          title="Financial Overview"
          icon={<PieChart className="w-4 h-4" />}
          delay={700}
        >
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="p-3 rounded-lg bg-muted/30">
                <p className="text-xs text-muted-foreground mb-1">Revenue</p>
                <p className="text-xl font-mono font-bold text-primary">$12.8K</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/30">
                <p className="text-xs text-muted-foreground mb-1">Expenses</p>
                <p className="text-xl font-mono font-bold text-secondary">$8.2K</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/30">
                <p className="text-xs text-muted-foreground mb-1">Net</p>
                <p className="text-xl font-mono font-bold text-accent">+$4.6K</p>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground">Revenue trend</span>
                <span className="text-xs text-accent">+56% ROI</span>
              </div>
              <MiniChart data={revenueData} color="primary" height={60} />
            </div>

            <div className="border-t border-border pt-4">
              <p className="text-xs text-muted-foreground mb-3">Conversion Funnel</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Visitors</span>
                  <span className="text-sm font-mono text-muted-foreground">8,234</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Sign-ups</span>
                  <span className="text-sm font-mono text-muted-foreground">1,247 (15.1%)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">VIP Deposits</span>
                  <span className="text-sm font-mono text-accent">89 (7.1%)</span>
                </div>
              </div>
            </div>
          </div>
        </AnalyticsCard>
      </div>

      {/* Live Activity Feed */}
      <div className="mt-6">
        <LiveActivityFeed />
      </div>
    </AppLayout>
  );
}

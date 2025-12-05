import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import {
  DollarSign,
  Users,
  TrendingUp,
  Clock,
  Target,
  Zap,
  Heart,
  MessageSquare,
  Share2,
  Award,
  Bell,
  Search,
  Filter,
  Download,
  ExternalLink,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Calendar,
  BarChart3,
  TrendingDown,
} from "lucide-react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const fundingData = [
  { hour: "12AM", amount: 0 },
  { hour: "1AM", amount: 2400 },
  { hour: "2AM", amount: 4800 },
  { hour: "3AM", amount: 8200 },
  { hour: "4AM", amount: 12600 },
  { hour: "5AM", amount: 18900 },
  { hour: "6AM", amount: 24300 },
  { hour: "7AM", amount: 31200 },
  { hour: "8AM", amount: 39800 },
  { hour: "9AM", amount: 48500 },
  { hour: "10AM", amount: 58200 },
  { hour: "11AM", amount: 67800 },
  { hour: "12PM", amount: 76400 },
];

const pledgeTiers = [
  {
    name: "Early Bird Special",
    price: 49,
    backers: 234,
    total: 11466,
    available: 0,
    claimed: 100,
  },
  {
    name: "Standard Edition",
    price: 69,
    backers: 156,
    total: 10764,
    available: 344,
    claimed: 45,
  },
  {
    name: "Premium Bundle",
    price: 129,
    backers: 89,
    total: 11481,
    available: 211,
    claimed: 42,
  },
  {
    name: "Ultimate Pack",
    price: 199,
    backers: 45,
    total: 8955,
    available: 155,
    claimed: 23,
  },
  {
    name: "Founder's Edition",
    price: 499,
    backers: 12,
    total: 5988,
    available: 8,
    claimed: 60,
  },
];

const recentBackers = [
  {
    id: 1,
    name: "Sarah M.",
    amount: 129,
    tier: "Premium Bundle",
    time: "Just now",
    location: "Los Angeles, CA",
  },
  {
    id: 2,
    name: "John D.",
    amount: 69,
    tier: "Standard Edition",
    time: "2 min ago",
    location: "New York, NY",
  },
  {
    id: 3,
    name: "Emma W.",
    amount: 499,
    tier: "Founder's Edition",
    time: "5 min ago",
    location: "Seattle, WA",
  },
  {
    id: 4,
    name: "Mike T.",
    amount: 49,
    tier: "Early Bird Special",
    time: "8 min ago",
    location: "Austin, TX",
  },
  {
    id: 5,
    name: "Lisa R.",
    amount: 199,
    tier: "Ultimate Pack",
    time: "12 min ago",
    location: "Miami, FL",
  },
  {
    id: 6,
    name: "David K.",
    amount: 69,
    tier: "Standard Edition",
    time: "15 min ago",
    location: "Chicago, IL",
  },
];

const milestones = [
  {
    name: "Campaign Launch",
    target: 0,
    reached: true,
    time: "12 hours ago",
    message: "We're live! 🚀",
  },
  {
    name: "25% Funded",
    target: 25000,
    reached: true,
    time: "6 hours ago",
    message: "Amazing start! Thank you!",
  },
  {
    name: "50% Funded",
    target: 50000,
    reached: true,
    time: "2 hours ago",
    message: "Halfway there! 🎉",
  },
  {
    name: "75% Funded",
    target: 75000,
    reached: false,
    time: null,
    message: "Almost at our goal!",
  },
  {
    name: "100% Funded",
    target: 100000,
    reached: false,
    time: null,
    message: "Goal achieved! 🎊",
  },
  {
    name: "Stretch Goal 1",
    target: 150000,
    reached: false,
    time: null,
    message: "Unlocking premium features",
  },
];

const recentComments = [
  {
    id: 1,
    author: "TechEnthusiast",
    comment: "This looks amazing! Can't wait to get mine!",
    time: "3 min ago",
    sentiment: "positive",
  },
  {
    id: 2,
    author: "HealthyLiving",
    comment: "Will this work with my existing blender?",
    time: "12 min ago",
    sentiment: "neutral",
  },
  {
    id: 3,
    author: "EarlyAdopter",
    comment: "Just backed! Love the concept!",
    time: "18 min ago",
    sentiment: "positive",
  },
  {
    id: 4,
    author: "CuriousGeorge",
    comment: "What's the shipping timeline?",
    time: "25 min ago",
    sentiment: "neutral",
  },
];

const liveStats = [
  { label: "Backers/Hour", value: "47", trend: "up", change: "+12%" },
  { label: "Avg Pledge", value: "$94", trend: "up", change: "+8%" },
  { label: "Conversion Rate", value: "4.2%", trend: "down", change: "-0.3%" },
  { label: "Page Views", value: "2,847", trend: "up", change: "+23%" },
];

export default function Kickstarter() {
  const [currentFunding, setCurrentFunding] = useState(76400);
  const [totalBackers, setTotalBackers] = useState(536);
  const [isLive, setIsLive] = useState(true);

  const goalAmount = 100000;
  const fundingPercentage = (currentFunding / goalAmount) * 100;
  const hoursLeft = 28;
  const daysLeft = Math.floor(hoursLeft / 24);

  // Simulate live updates
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      const increment = Math.floor(Math.random() * 200) + 50;
      setCurrentFunding((prev) => Math.min(prev + increment, goalAmount * 1.5));

      if (Math.random() > 0.7) {
        setTotalBackers((prev) => prev + 1);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isLive]);

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "text-success";
      case "negative":
        return "text-destructive";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-mono font-bold text-foreground">
                Kickstarter <span className="text-primary glow-cyan">Live</span>
              </h1>
              <Badge className="bg-destructive/20 text-destructive border-destructive/30 animate-pulse">
                <div className="w-2 h-2 rounded-full bg-destructive mr-2" />
                LIVE
              </Badge>
            </div>
            <p className="text-muted-foreground">
              Real-time campaign monitoring and backer management
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsLive(!isLive)}
            >
              <RefreshCw
                className={`w-4 h-4 mr-2 ${isLive ? "animate-spin" : ""}`}
              />
              {isLive ? "Auto-refresh On" : "Auto-refresh Off"}
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              <ExternalLink className="w-4 h-4 mr-2" />
              View on Kickstarter
            </Button>
          </div>
        </motion.div>

        {/* Hero Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-6 gradient-border border-primary/30 shadow-[0_0_30px_rgba(0,240,255,0.1)] col-span-2"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Total Raised
                </p>
                <p className="text-4xl font-mono font-bold text-primary glow-cyan">
                  ${currentFunding.toLocaleString()}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-primary/50" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  Goal: ${goalAmount.toLocaleString()}
                </span>
                <span className="text-accent font-mono font-bold">
                  {fundingPercentage.toFixed(1)}%
                </span>
              </div>
              <Progress value={fundingPercentage} className="h-2" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-6 gradient-border border-accent/30 shadow-[0_0_30px_rgba(0,255,136,0.1)]"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Total Backers
                </p>
                <p className="text-4xl font-mono font-bold text-accent glow-green">
                  {totalBackers}
                </p>
              </div>
              <Users className="w-8 h-8 text-accent/50" />
            </div>
            <div className="flex items-center gap-1 text-sm text-success mt-4">
              <TrendingUp className="w-4 h-4" />
              <span>+47 in last hour</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-6 gradient-border border-secondary/30 shadow-[0_0_30px_rgba(255,107,53,0.1)]"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Time Remaining
                </p>
                <p className="text-4xl font-mono font-bold text-secondary glow-orange">
                  {daysLeft}d {hoursLeft % 24}h
                </p>
              </div>
              <Clock className="w-8 h-8 text-secondary/50" />
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground mt-4">
              <Calendar className="w-4 h-4" />
              <span>Ends Dec 6, 2025</span>
            </div>
          </motion.div>
        </div>

        {/* Live Stats Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-4"
        >
          <div className="grid grid-cols-4 gap-4">
            {liveStats.map((stat, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                  <p className="text-xl font-mono font-bold text-foreground">
                    {stat.value}
                  </p>
                </div>
                <div
                  className={`flex items-center gap-1 text-xs ${
                    stat.trend === "up" ? "text-success" : "text-destructive"
                  }`}
                >
                  {stat.trend === "up" ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  <span>{stat.change}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Funding Chart */}
          <Card className="col-span-2 glass-card gradient-border">
            <CardHeader>
              <CardTitle className="text-sm font-mono">
                FUNDING VELOCITY
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={fundingData}>
                  <defs>
                    <linearGradient
                      id="fundingGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="hsl(var(--primary))"
                        stopOpacity={0.3}
                      />
                      <stop
                        offset="95%"
                        stopColor="hsl(var(--primary))"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="hsl(var(--border))"
                  />
                  <XAxis
                    dataKey="hour"
                    stroke="hsl(var(--muted-foreground))"
                    style={{ fontSize: 12 }}
                  />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    style={{ fontSize: 12 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="amount"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    fill="url(#fundingGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Milestones */}
          <Card className="glass-card gradient-border">
            <CardHeader>
              <CardTitle className="text-sm font-mono">MILESTONES</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {milestones.map((milestone, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-3 p-3 rounded-lg ${
                      milestone.reached
                        ? "bg-success/10 border border-success/30"
                        : "bg-muted/30"
                    }`}
                  >
                    <div className="mt-0.5">
                      {milestone.reached ? (
                        <CheckCircle className="w-5 h-5 text-success" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">
                        {milestone.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {milestone.message}
                      </p>
                      {milestone.reached && milestone.time && (
                        <p className="text-xs text-success mt-1">
                          {milestone.time}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pledge Tiers */}
        <Card className="glass-card gradient-border">
          <CardHeader>
            <CardTitle className="text-sm font-mono">
              PLEDGE TIERS PERFORMANCE
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pledgeTiers.map((tier, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-lg bg-muted/30 border border-border hover:border-primary/30 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-medium text-foreground">
                        {tier.name}
                      </h4>
                      <Badge
                        variant="outline"
                        className="text-primary border-primary/30"
                      >
                        ${tier.price}
                      </Badge>
                      {tier.available === 0 && (
                        <Badge
                          variant="outline"
                          className="text-destructive border-destructive/30"
                        >
                          SOLD OUT
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-6 text-sm">
                      <div>
                        <span className="text-muted-foreground">Backers: </span>
                        <span className="text-foreground font-mono font-bold">
                          {tier.backers}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Revenue: </span>
                        <span className="text-accent font-mono font-bold">
                          ${tier.total.toLocaleString()}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">
                          Available:{" "}
                        </span>
                        <span className="text-foreground font-mono">
                          {tier.available > 0 ? tier.available : "None"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="w-24">
                    <Progress value={tier.claimed} className="h-2" />
                    <p className="text-xs text-muted-foreground text-center mt-1">
                      {tier.claimed}% claimed
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Backers */}
          <Card className="glass-card gradient-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-mono">
                RECENT BACKERS
              </CardTitle>
              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentBackers.map((backer) => (
                  <motion.div
                    key={backer.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                        <span className="text-sm font-bold text-primary-foreground">
                          {backer.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">
                          {backer.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {backer.location}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-mono font-bold text-primary">
                        ${backer.amount}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {backer.time}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Comments */}
          <Card className="glass-card gradient-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-mono">
                CAMPAIGN COMMENTS
              </CardTitle>
              <Button variant="ghost" size="sm">
                <MessageSquare className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentComments.map((comment) => (
                  <div
                    key={comment.id}
                    className="p-3 rounded-lg bg-muted/30 border border-border"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <p className="font-medium text-sm text-foreground">
                        {comment.author}
                      </p>
                      <span className="text-xs text-muted-foreground">
                        {comment.time}
                      </span>
                    </div>
                    <p
                      className={`text-sm ${getSentimentColor(
                        comment.sentiment
                      )}`}
                    >
                      {comment.comment}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}

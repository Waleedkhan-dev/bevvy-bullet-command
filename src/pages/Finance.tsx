import { motion } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  CreditCard,
  PiggyBank,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  Users,
  MousePointer,
  UserPlus,
  Wallet,
  BarChart3,
  PieChart,
  Calendar,
  Download,
} from "lucide-react";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const revenueData = [
  { date: "Nov 1", revenue: 1200, expenses: 800 },
  { date: "Nov 8", revenue: 2800, expenses: 1200 },
  { date: "Nov 15", revenue: 4500, expenses: 2100 },
  { date: "Nov 22", revenue: 7200, expenses: 3800 },
  { date: "Nov 29", revenue: 9800, expenses: 5400 },
  { date: "Dec 5", revenue: 12847, expenses: 8234 },
];

const projectionData = [
  { week: "W1", actual: 2800, projected: 3000 },
  { week: "W2", actual: 5200, projected: 6000 },
  { week: "W3", actual: 8500, projected: 9000 },
  { week: "W4", actual: 12847, projected: 12000 },
  { week: "W5", actual: null, projected: 18000 },
  { week: "W6", actual: null, projected: 25000 },
  { week: "W7", actual: null, projected: 35000 },
  { week: "W8", actual: null, projected: 48000 },
];

const expenseCategories = [
  { category: "API Costs", spent: 2340, budget: 3000, icon: CreditCard },
  { category: "Advertising", spent: 3200, budget: 4000, icon: BarChart3 },
  { category: "Influencer Samples", spent: 1450, budget: 2000, icon: Users },
  { category: "Tools & Software", spent: 890, budget: 1000, icon: PieChart },
  { category: "Design Assets", spent: 280, budget: 500, icon: PiggyBank },
  { category: "Miscellaneous", spent: 74, budget: 500, icon: Wallet },
];

const funnelSteps = [
  { step: "Website Visitors", count: 12847, rate: "100%" },
  { step: "Landing Page Views", count: 8234, rate: "64%" },
  { step: "Email Signups", count: 1247, rate: "15%" },
  { step: "VIP Deposits", count: 89, rate: "7%" },
];

const recentTransactions = [
  { id: 1, type: "income", description: "VIP Deposit - Sarah M.", amount: 1.00, date: "2 hours ago" },
  { id: 2, type: "expense", description: "TikTok Ads", amount: -150.00, date: "5 hours ago" },
  { id: 3, type: "income", description: "VIP Deposit - John D.", amount: 1.00, date: "8 hours ago" },
  { id: 4, type: "expense", description: "OpenAI API", amount: -45.20, date: "12 hours ago" },
  { id: 5, type: "income", description: "VIP Deposit - Emma L.", amount: 1.00, date: "1 day ago" },
  { id: 6, type: "expense", description: "Influencer Sample Ship", amount: -28.50, date: "1 day ago" },
];

export default function Finance() {
  const totalRevenue = 12847;
  const totalExpenses = 8234;
  const netPosition = totalRevenue - totalExpenses;
  const roi = ((netPosition / totalExpenses) * 100).toFixed(0);

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
            <h1 className="text-3xl font-mono font-bold text-foreground">Financial Tracker</h1>
            <p className="text-muted-foreground mt-1">Monitor revenue, expenses, and campaign projections</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Calendar className="w-4 h-4 mr-2" />
              Date Range
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </motion.div>

        {/* Financial Overview Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {/* Revenue */}
          <Card className="glass-card border-success/30 bg-gradient-to-b from-success/10 to-success/5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pre-Launch Revenue</p>
                  <p className="text-3xl font-mono font-bold text-foreground mt-1">
                    ${totalRevenue.toLocaleString()}
                  </p>
                  <div className="flex items-center gap-1 mt-2 text-success text-sm">
                    <ArrowUpRight className="w-4 h-4" />
                    <span>+23% from last week</span>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-success/20">
                  <TrendingUp className="w-8 h-8 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Expenses */}
          <Card className="glass-card border-destructive/30 bg-gradient-to-b from-destructive/10 to-destructive/5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Marketing Spend</p>
                  <p className="text-3xl font-mono font-bold text-foreground mt-1">
                    ${totalExpenses.toLocaleString()}
                  </p>
                  <div className="flex items-center gap-1 mt-2 text-destructive text-sm">
                    <ArrowDownRight className="w-4 h-4" />
                    <span>+12% from last week</span>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-destructive/20">
                  <CreditCard className="w-8 h-8 text-destructive" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Net Position */}
          <Card className="glass-card border-primary/30 bg-gradient-to-b from-primary/10 to-primary/5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Net Position</p>
                  <p className="text-3xl font-mono font-bold text-foreground mt-1">
                    +${netPosition.toLocaleString()}
                  </p>
                  <div className="flex items-center gap-1 mt-2 text-primary text-sm">
                    <Target className="w-4 h-4" />
                    <span>ROI: {roi}%</span>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-primary/20">
                  <DollarSign className="w-8 h-8 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Revenue vs Expenses Chart & Conversion Funnel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revenue Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="glass-card border-white/10 h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-mono">Revenue vs Expenses</CardTitle>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-success" />
                      <span className="text-muted-foreground">Revenue</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-destructive" />
                      <span className="text-muted-foreground">Expenses</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={revenueData}>
                      <defs>
                        <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#00FF88" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#00FF88" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#FF3366" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#FF3366" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="date" stroke="#94A3B8" fontSize={12} />
                      <YAxis stroke="#94A3B8" fontSize={12} tickFormatter={(v) => `$${v / 1000}k`} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(17, 24, 39, 0.9)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          borderRadius: "8px",
                        }}
                        formatter={(value: number) => [`$${value.toLocaleString()}`, ""]}
                      />
                      <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke="#00FF88"
                        strokeWidth={2}
                        fill="url(#revenueGradient)"
                      />
                      <Area
                        type="monotone"
                        dataKey="expenses"
                        stroke="#FF3366"
                        strokeWidth={2}
                        fill="url(#expenseGradient)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Conversion Funnel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <Card className="glass-card border-white/10 h-full">
              <CardHeader>
                <CardTitle className="text-lg font-mono flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  Conversion Funnel
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {funnelSteps.map((step, index) => (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        {index === 0 && <MousePointer className="w-4 h-4 text-muted-foreground" />}
                        {index === 1 && <Users className="w-4 h-4 text-muted-foreground" />}
                        {index === 2 && <UserPlus className="w-4 h-4 text-muted-foreground" />}
                        {index === 3 && <DollarSign className="w-4 h-4 text-muted-foreground" />}
                        <span className="text-sm text-foreground">{step.step}</span>
                      </div>
                      <span className="text-sm font-mono text-muted-foreground">{step.rate}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                          style={{ width: step.rate }}
                        />
                      </div>
                      <span className="text-sm font-mono font-bold text-foreground w-16 text-right">
                        {step.count.toLocaleString()}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Expense Breakdown & Projections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Expense Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="glass-card border-white/10 h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-mono flex items-center gap-2">
                    <PieChart className="w-5 h-5 text-secondary" />
                    Expense Breakdown
                  </CardTitle>
                  <Badge variant="outline" className="border-white/10">
                    ${totalExpenses.toLocaleString()} / $11,000
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {expenseCategories.map((expense, index) => {
                  const percentage = (expense.spent / expense.budget) * 100;
                  const remaining = expense.budget - expense.spent;
                  return (
                    <motion.div
                      key={expense.category}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.35 + index * 0.05 }}
                      className="p-3 rounded-lg bg-white/5 border border-white/10"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <expense.icon className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm font-medium text-foreground">{expense.category}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-mono text-foreground">${expense.spent.toLocaleString()}</span>
                          <span className="text-xs text-muted-foreground"> / ${expense.budget.toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              percentage > 90 ? "bg-destructive" : percentage > 70 ? "bg-warning" : "bg-success"
                            }`}
                            style={{ width: `${Math.min(percentage, 100)}%` }}
                          />
                        </div>
                        <span className={`text-xs font-mono ${remaining < 100 ? "text-warning" : "text-muted-foreground"}`}>
                          ${remaining.toLocaleString()} left
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </CardContent>
            </Card>
          </motion.div>

          {/* Campaign Projections */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="glass-card border-white/10 h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-mono flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    Campaign Projections
                  </CardTitle>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-primary" />
                      <span className="text-muted-foreground">Actual</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-white/30" />
                      <span className="text-muted-foreground">Projected</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-48 mb-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={projectionData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="week" stroke="#94A3B8" fontSize={12} />
                      <YAxis stroke="#94A3B8" fontSize={12} tickFormatter={(v) => `$${v / 1000}k`} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(17, 24, 39, 0.9)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          borderRadius: "8px",
                        }}
                        formatter={(value: number | null) => [value ? `$${value.toLocaleString()}` : "—", ""]}
                      />
                      <Bar dataKey="projected" fill="rgba(255,255,255,0.15)" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="actual" fill="#00F0FF" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                    <p className="text-xs text-muted-foreground">48hr Launch Projection</p>
                    <p className="text-xl font-mono font-bold text-primary mt-1">$42,500</p>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                    <p className="text-xs text-muted-foreground">End of Campaign</p>
                    <p className="text-xl font-mono font-bold text-success mt-1">$127,000</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Recent Transactions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="glass-card border-white/10">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-mono flex items-center gap-2">
                  <Wallet className="w-5 h-5 text-warning" />
                  Recent Transactions
                </CardTitle>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {recentTransactions.map((tx, index) => (
                  <motion.div
                    key={tx.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.55 + index * 0.03 }}
                    className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${tx.type === "income" ? "bg-success/20" : "bg-destructive/20"}`}>
                        {tx.type === "income" ? (
                          <ArrowUpRight className={`w-4 h-4 text-success`} />
                        ) : (
                          <ArrowDownRight className={`w-4 h-4 text-destructive`} />
                        )}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground">{tx.description}</div>
                        <div className="text-xs text-muted-foreground">{tx.date}</div>
                      </div>
                    </div>
                    <span className={`font-mono font-bold ${tx.type === "income" ? "text-success" : "text-destructive"}`}>
                      {tx.type === "income" ? "+" : ""}${Math.abs(tx.amount).toFixed(2)}
                    </span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </AppLayout>
  );
}

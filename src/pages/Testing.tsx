import { useState } from 'react';
import { motion } from 'framer-motion';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  FlaskConical,
  TrendingUp,
  Target,
  BarChart3,
  Plus,
  Play,
  Pause,
  CheckCircle,
  XCircle,
  Clock,
  Users,
  MousePointer,
  Eye,
  Mail,
  Image,
  FileText,
  Zap,
  Award,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

const experiments = [
  {
    id: 1,
    name: 'Email Subject Line Test',
    type: 'Email',
    status: 'running',
    startDate: 'Dec 1, 2025',
    duration: '7 days',
    participants: 1247,
    variants: 3,
    winner: null,
    icon: Mail,
    color: 'from-cyan-500/20 to-cyan-500/5',
    borderColor: 'border-cyan-500/30',
  },
  {
    id: 2,
    name: 'Social Media Thumbnail Test',
    type: 'Social',
    status: 'running',
    startDate: 'Dec 3, 2025',
    duration: '5 days',
    participants: 2847,
    variants: 4,
    winner: null,
    icon: Image,
    color: 'from-purple-500/20 to-purple-500/5',
    borderColor: 'border-purple-500/30',
  },
  {
    id: 3,
    name: 'Landing Page CTA Test',
    type: 'Website',
    status: 'completed',
    startDate: 'Nov 25, 2025',
    duration: '7 days',
    participants: 4521,
    variants: 2,
    winner: 'Variant B',
    icon: MousePointer,
    color: 'from-green-500/20 to-green-500/5',
    borderColor: 'border-green-500/30',
  },
  {
    id: 4,
    name: 'Ad Copy Variation Test',
    type: 'Ads',
    status: 'completed',
    startDate: 'Nov 28, 2025',
    duration: '5 days',
    participants: 8934,
    variants: 3,
    winner: 'Variant A',
    icon: FileText,
    color: 'from-orange-500/20 to-orange-500/5',
    borderColor: 'border-orange-500/30',
  },
  {
    id: 5,
    name: 'Video Length Test',
    type: 'Content',
    status: 'draft',
    startDate: 'Dec 10, 2025',
    duration: '7 days',
    participants: 0,
    variants: 3,
    winner: null,
    icon: Eye,
    color: 'from-blue-500/20 to-blue-500/5',
    borderColor: 'border-blue-500/30',
  },
];

const emailSubjectTest = {
  name: 'Email Subject Line Test',
  hypothesis: 'Adding urgency and emojis will increase open rates',
  variants: [
    {
      name: 'Control (A)',
      content: 'Bevvy Bullet Launch - Early Bird Special',
      participants: 416,
      opens: 176,
      openRate: 42.3,
      clicks: 52,
      clickRate: 12.5,
      conversions: 8,
      conversionRate: 1.9,
    },
    {
      name: 'Variant B',
      content: '🚀 Only 47 Days Left - Get Your Bevvy Bullet',
      participants: 415,
      opens: 198,
      openRate: 47.7,
      clicks: 67,
      clickRate: 16.1,
      conversions: 12,
      conversionRate: 2.9,
    },
    {
      name: 'Variant C',
      content: 'Last Chance: Early Bird Pricing Ends Soon',
      participants: 416,
      opens: 183,
      openRate: 44.0,
      clicks: 58,
      clickRate: 13.9,
      conversions: 9,
      conversionRate: 2.2,
    },
  ],
};

const thumbnailTest = {
  name: 'Social Media Thumbnail Test',
  hypothesis: 'Product-focused images perform better than lifestyle images',
  variants: [
    {
      name: 'Product Close-up',
      participants: 712,
      impressions: 12847,
      clicks: 537,
      ctr: 4.2,
      engagement: 312,
      engagementRate: 2.4,
    },
    {
      name: 'Lifestyle Shot',
      participants: 698,
      impressions: 12456,
      clicks: 623,
      ctr: 5.0,
      engagement: 389,
      engagementRate: 3.1,
    },
    {
      name: 'Before/After',
      participants: 734,
      impressions: 13234,
      clicks: 701,
      ctr: 5.3,
      engagement: 445,
      engagementRate: 3.4,
    },
    {
      name: 'Action Shot',
      participants: 703,
      impressions: 12678,
      clicks: 589,
      ctr: 4.6,
      engagement: 356,
      engagementRate: 2.8,
    },
  ],
};

const metrics = [
  { label: 'Active Tests', value: '2', icon: FlaskConical, color: 'primary' },
  { label: 'Total Participants', value: '4,094', icon: Users, color: 'accent' },
  {
    label: 'Avg Improvement',
    value: '+12.8%',
    icon: TrendingUp,
    color: 'success',
  },
  {
    label: 'Tests Completed',
    value: '18',
    icon: CheckCircle,
    color: 'secondary',
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'running':
      return 'bg-primary/20 text-primary border-primary/30 animate-pulse';
    case 'completed':
      return 'bg-success/20 text-success border-success/30';
    case 'draft':
      return 'bg-muted text-muted-foreground border-muted';
    default:
      return 'bg-muted text-muted-foreground border-muted';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'running':
      return <Play className='w-3 h-3' />;
    case 'completed':
      return <CheckCircle className='w-3 h-3' />;
    case 'draft':
      return <Clock className='w-3 h-3' />;
    default:
      return <AlertCircle className='w-3 h-3' />;
  }
};

export default function Testing() {
  const [selectedTest, setSelectedTest] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'overview' | 'results'>(
    'overview'
  );

  const currentTest = experiments.find((exp) => exp.id === selectedTest);

  const getVariantColor = (index: number) => {
    const colors = [
      'hsl(var(--primary))',
      'hsl(var(--secondary))',
      'hsl(var(--accent))',
      'hsl(var(--warning))',
    ];
    return colors[index % colors.length];
  };

  const getWinningVariant = (variants: any[], metric: string) => {
    const values = variants.map((v) => v[metric]);
    const maxValue = Math.max(...values);
    return variants.findIndex((v) => v[metric] === maxValue);
  };

  return (
    <AppLayout>
      <div className='space-y-6'>
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className='flex items-center justify-between'
        >
          <div>
            <h1 className='text-3xl font-mono font-bold text-foreground mb-2'>
              A/B Testing <span className='text-primary glow-cyan'>Lab</span>
            </h1>
            <p className='text-muted-foreground'>
              Optimize campaigns with data-driven experiments
            </p>
          </div>
          <Button className='bg-primary hover:bg-primary/90'>
            <Plus className='w-4 h-4 mr-2' />
            New Experiment
          </Button>
        </motion.div>

        {/* Metrics */}
        <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className='glass-card p-5 gradient-border'
            >
              <div className='flex items-center justify-between mb-2'>
                <span className='text-sm text-muted-foreground'>
                  {metric.label}
                </span>
                <metric.icon className='w-5 h-5 text-muted-foreground' />
              </div>
              <p className='text-3xl font-mono font-bold text-foreground'>
                {metric.value}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Experiments List */}
        <Card className='glass-card gradient-border'>
          <CardHeader>
            <CardTitle className='text-sm font-mono'>ALL EXPERIMENTS</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-3'>
              {experiments.map((experiment, index) => (
                <motion.div
                  key={experiment.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    selectedTest === experiment.id
                      ? 'bg-primary/10 border-primary/30'
                      : 'bg-muted/30 border-border hover:border-primary/20'
                  }`}
                  onClick={() => setSelectedTest(experiment.id)}
                >
                  <div className='flex items-center gap-4'>
                    <div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-br ${experiment.color} border ${experiment.borderColor} flex items-center justify-center`}
                    >
                      <experiment.icon className='w-6 h-6 text-foreground' />
                    </div>
                    <div className='flex-1'>
                      <div className='flex items-center gap-2 mb-1'>
                        <h3 className='font-medium text-foreground'>
                          {experiment.name}
                        </h3>
                        <Badge
                          variant='outline'
                          className={getStatusColor(experiment.status)}
                        >
                          {getStatusIcon(experiment.status)}
                          <span className='ml-1'>{experiment.status}</span>
                        </Badge>
                        {experiment.winner && (
                          <Badge
                            variant='outline'
                            className='bg-success/20 text-success border-success/30'
                          >
                            <Award className='w-3 h-3 mr-1' />
                            {experiment.winner}
                          </Badge>
                        )}
                      </div>
                      <div className='flex items-center gap-6 text-sm text-muted-foreground'>
                        <span>Type: {experiment.type}</span>
                        <span>Started: {experiment.startDate}</span>
                        <span>Duration: {experiment.duration}</span>
                        <span>
                          Participants:{' '}
                          {experiment.participants.toLocaleString()}
                        </span>
                        <span>Variants: {experiment.variants}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {selectedTest === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className='space-y-6'
          >
            {/* Test Header */}
            <Card className='glass-card gradient-border border-primary/30'>
              <CardHeader>
                <div className='flex items-start justify-between'>
                  <div>
                    <CardTitle className='text-xl font-mono mb-2'>
                      {emailSubjectTest.name}
                    </CardTitle>
                    <p className='text-muted-foreground'>
                      {emailSubjectTest.hypothesis}
                    </p>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Button variant='outline' size='sm'>
                      <Pause className='w-4 h-4 mr-2' />
                      Pause Test
                    </Button>
                    <Button
                      variant='outline'
                      size='sm'
                      className='text-destructive border-destructive/30'
                    >
                      <XCircle className='w-4 h-4 mr-2' />
                      End Test
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Variants Performance */}
            <div className='grid grid-cols-1 gap-4'>
              {emailSubjectTest.variants.map((variant, index) => {
                const isWinningOpen =
                  index ===
                  getWinningVariant(emailSubjectTest.variants, 'openRate');
                const isWinningClick =
                  index ===
                  getWinningVariant(emailSubjectTest.variants, 'clickRate');
                const isWinningConversion =
                  index ===
                  getWinningVariant(
                    emailSubjectTest.variants,
                    'conversionRate'
                  );

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`glass-card p-5 gradient-border ${
                      isWinningConversion
                        ? 'border-success/30 shadow-[0_0_30px_rgba(0,255,136,0.1)]'
                        : ''
                    }`}
                  >
                    <div className='flex items-start justify-between mb-4'>
                      <div>
                        <div className='flex items-center gap-2 mb-2'>
                          <h3 className='font-mono font-bold text-foreground'>
                            {variant.name}
                          </h3>
                          {isWinningConversion && (
                            <Badge className='bg-success/20 text-success border-success/30'>
                              <Award className='w-3 h-3 mr-1' />
                              Leading
                            </Badge>
                          )}
                        </div>
                        <p className='text-sm text-foreground bg-muted/50 px-3 py-2 rounded'>
                          "{variant.content}"
                        </p>
                      </div>
                      <div className='text-right'>
                        <p className='text-sm text-muted-foreground'>
                          Participants
                        </p>
                        <p className='text-2xl font-mono font-bold text-foreground'>
                          {variant.participants}
                        </p>
                      </div>
                    </div>

                    <div className='grid grid-cols-4 gap-4'>
                      <div
                        className={`p-3 rounded-lg ${
                          isWinningOpen
                            ? 'bg-success/10 border border-success/30'
                            : 'bg-muted/30'
                        }`}
                      >
                        <div className='flex items-center justify-between mb-1'>
                          <p className='text-xs text-muted-foreground'>Opens</p>
                          {isWinningOpen && (
                            <ArrowUpRight className='w-4 h-4 text-success' />
                          )}
                        </div>
                        <p className='text-xl font-mono font-bold text-foreground'>
                          {variant.opens}
                        </p>
                        <p
                          className={`text-sm font-mono ${
                            isWinningOpen
                              ? 'text-success'
                              : 'text-muted-foreground'
                          }`}
                        >
                          {variant.openRate}%
                        </p>
                      </div>

                      <div
                        className={`p-3 rounded-lg ${
                          isWinningClick
                            ? 'bg-success/10 border border-success/30'
                            : 'bg-muted/30'
                        }`}
                      >
                        <div className='flex items-center justify-between mb-1'>
                          <p className='text-xs text-muted-foreground'>
                            Clicks
                          </p>
                          {isWinningClick && (
                            <ArrowUpRight className='w-4 h-4 text-success' />
                          )}
                        </div>
                        <p className='text-xl font-mono font-bold text-foreground'>
                          {variant.clicks}
                        </p>
                        <p
                          className={`text-sm font-mono ${
                            isWinningClick
                              ? 'text-success'
                              : 'text-muted-foreground'
                          }`}
                        >
                          {variant.clickRate}%
                        </p>
                      </div>

                      <div
                        className={`p-3 rounded-lg ${
                          isWinningConversion
                            ? 'bg-success/10 border border-success/30'
                            : 'bg-muted/30'
                        }`}
                      >
                        <div className='flex items-center justify-between mb-1'>
                          <p className='text-xs text-muted-foreground'>
                            Conversions
                          </p>
                          {isWinningConversion && (
                            <ArrowUpRight className='w-4 h-4 text-success' />
                          )}
                        </div>
                        <p className='text-xl font-mono font-bold text-foreground'>
                          {variant.conversions}
                        </p>
                        <p
                          className={`text-sm font-mono ${
                            isWinningConversion
                              ? 'text-success'
                              : 'text-muted-foreground'
                          }`}
                        >
                          {variant.conversionRate}%
                        </p>
                      </div>

                      <div className='p-3 rounded-lg bg-muted/30'>
                        <p className='text-xs text-muted-foreground mb-1'>
                          Revenue
                        </p>
                        <p className='text-xl font-mono font-bold text-primary'>
                          ${variant.conversions * 49}
                        </p>
                        <p className='text-sm text-muted-foreground'>
                          Early Bird
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Statistical Significance */}
            <Card className='glass-card gradient-border'>
              <CardHeader>
                <CardTitle className='text-sm font-mono'>
                  STATISTICAL SIGNIFICANCE
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  <div className='p-4 rounded-lg bg-primary/10 border border-primary/30'>
                    <div className='flex items-center gap-2 mb-2'>
                      <Zap className='w-5 h-5 text-primary' />
                      <p className='font-medium text-foreground'>
                        Variant B is performing 12.8% better
                      </p>
                    </div>
                    <p className='text-sm text-muted-foreground'>
                      With 95% confidence, Variant B shows a statistically
                      significant improvement in conversion rate.
                      Recommendation: Continue running for 2 more days to reach
                      99% confidence.
                    </p>
                  </div>
                  <div className='grid grid-cols-3 gap-4'>
                    <div className='p-3 rounded-lg bg-muted/30'>
                      <p className='text-xs text-muted-foreground mb-1'>
                        Confidence Level
                      </p>
                      <p className='text-2xl font-mono font-bold text-accent'>
                        95%
                      </p>
                    </div>
                    <div className='p-3 rounded-lg bg-muted/30'>
                      <p className='text-xs text-muted-foreground mb-1'>
                        Sample Size
                      </p>
                      <p className='text-2xl font-mono font-bold text-foreground'>
                        1,247
                      </p>
                    </div>
                    <div className='p-3 rounded-lg bg-muted/30'>
                      <p className='text-xs text-muted-foreground mb-1'>
                        Days Running
                      </p>
                      <p className='text-2xl font-mono font-bold text-foreground'>
                        4 / 7
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Thumbnail Test Results */}
        {selectedTest === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className='space-y-6'
          >
            <Card className='glass-card gradient-border border-purple-500/30'>
              <CardHeader>
                <div className='flex items-start justify-between'>
                  <div>
                    <CardTitle className='text-xl font-mono mb-2'>
                      {thumbnailTest.name}
                    </CardTitle>
                    <p className='text-muted-foreground'>
                      {thumbnailTest.hypothesis}
                    </p>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Button variant='outline' size='sm'>
                      <Pause className='w-4 h-4 mr-2' />
                      Pause Test
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Chart Comparison */}
            <Card className='glass-card gradient-border'>
              <CardHeader>
                <CardTitle className='text-sm font-mono'>
                  CLICK-THROUGH RATE COMPARISON
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width='100%' height={300}>
                  <BarChart data={thumbnailTest.variants}>
                    <CartesianGrid
                      strokeDasharray='3 3'
                      stroke='hsl(var(--border))'
                    />
                    <XAxis
                      dataKey='name'
                      stroke='hsl(var(--muted-foreground))'
                    />
                    <YAxis stroke='hsl(var(--muted-foreground))' />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                    />
                    <Bar dataKey='ctr' radius={[8, 8, 0, 0]}>
                      {thumbnailTest.variants.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={getVariantColor(index)}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Variants Grid */}
            <div className='grid grid-cols-2 gap-4'>
              {thumbnailTest.variants.map((variant, index) => {
                const isWinning =
                  index === getWinningVariant(thumbnailTest.variants, 'ctr');
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className={`glass-card p-5 gradient-border ${
                      isWinning
                        ? 'border-success/30 shadow-[0_0_30px_rgba(0,255,136,0.1)]'
                        : ''
                    }`}
                  >
                    <div className='flex items-center justify-between mb-4'>
                      <h3 className='font-mono font-bold text-foreground'>
                        {variant.name}
                      </h3>
                      {isWinning && (
                        <Badge className='bg-success/20 text-success border-success/30'>
                          <Award className='w-3 h-3 mr-1' />
                          Winner
                        </Badge>
                      )}
                    </div>
                    <div className='grid grid-cols-2 gap-3'>
                      <div className='p-3 rounded-lg bg-muted/30'>
                        <p className='text-xs text-muted-foreground mb-1'>
                          Impressions
                        </p>
                        <p className='text-lg font-mono font-bold text-foreground'>
                          {variant.impressions.toLocaleString()}
                        </p>
                      </div>
                      <div className='p-3 rounded-lg bg-muted/30'>
                        <p className='text-xs text-muted-foreground mb-1'>
                          Clicks
                        </p>
                        <p className='text-lg font-mono font-bold text-foreground'>
                          {variant.clicks}
                        </p>
                      </div>
                      <div
                        className={`p-3 rounded-lg ${
                          isWinning
                            ? 'bg-success/10 border border-success/30'
                            : 'bg-muted/30'
                        }`}
                      >
                        <p className='text-xs text-muted-foreground mb-1'>
                          CTR
                        </p>
                        <p
                          className={`text-lg font-mono font-bold ${
                            isWinning ? 'text-success' : 'text-primary'
                          }`}
                        >
                          {variant.ctr}%
                        </p>
                      </div>
                      <div className='p-3 rounded-lg bg-muted/30'>
                        <p className='text-xs text-muted-foreground mb-1'>
                          Engagement
                        </p>
                        <p className='text-lg font-mono font-bold text-accent'>
                          {variant.engagementRate}%
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </AppLayout>
  );
}

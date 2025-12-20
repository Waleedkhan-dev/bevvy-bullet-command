import { AppLayout } from '@/components/layout/AppLayout';
import { motion } from 'framer-motion';
import {
  Users,
  UserCheck,
  Crown,
  FlaskConical,
  MessageSquare,
  Star,
  Quote,
  Check,
  Clock,
  X,
  Send,
  Trophy,
  Target,
  TrendingUp,
  Hash,
  Megaphone,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

const memberMetrics = [
  { label: 'Total Members', value: 287, icon: Users, color: 'primary' },
  { label: 'Active (7 days)', value: 156, icon: UserCheck, color: 'accent' },
  { label: 'VIP Members', value: 34, icon: Crown, color: 'secondary' },
  { label: 'Beta Testers', value: 12, icon: FlaskConical, color: 'primary' },
];

const segmentData = [
  { name: 'Regular', count: 198, percentage: 69, color: 'bg-muted' },
  { name: 'VIP', count: 34, percentage: 12, color: 'bg-secondary' },
  { name: 'Beta Testers', count: 12, percentage: 4, color: 'bg-primary' },
  { name: 'Launch Squad', count: 38, percentage: 13, color: 'bg-accent' },
  { name: 'Ambassadors', count: 5, percentage: 2, color: 'bg-warning' },
];

const channels = [
  { name: '#general', messages: 127, active: true },
  { name: '#announcements', messages: 23, active: true },
  { name: '#feedback', messages: 45, active: true },
  { name: '#vip-lounge', messages: 67, active: true },
  { name: '#beta-testing', messages: 34, active: false },
  { name: '#off-topic', messages: 89, active: true },
];

const testimonials = [
  {
    id: 1,
    quote:
      "Bevvy Bullet has completely changed how I approach my morning routine. Can't wait for launch!",
    author: 'Sarah M.',
    rating: 5,
    status: 'approved',
    source: 'Discord',
  },
  {
    id: 2,
    quote: 'The beta was incredible. This product is going to be huge.',
    author: 'Mike T.',
    rating: 5,
    status: 'approved',
    source: 'Email',
  },
  {
    id: 3,
    quote:
      'Finally, a solution that actually works. The team behind this is amazing.',
    author: 'Jessica L.',
    rating: 5,
    status: 'pending',
    source: 'Survey',
  },
  {
    id: 4,
    quote:
      "I've tried everything and this is by far the best. Worth every penny.",
    author: 'David K.',
    rating: 4,
    status: 'approved',
    source: 'Discord',
  },
];

const launchSquadMembers = [
  { name: 'Alex R.', status: 'trained', modules: 4 },
  { name: 'Maria S.', status: 'training', modules: 2 },
  { name: 'James W.', status: 'trained', modules: 4 },
  { name: 'Emily C.', status: 'pending', modules: 0 },
];

const recentActivity = [
  { type: 'join', user: 'NewUser123', time: '2m ago', channel: '#general' },
  {
    type: 'message',
    user: 'VIPMember',
    time: '5m ago',
    channel: '#vip-lounge',
  },
  {
    type: 'testimonial',
    user: 'Sarah M.',
    time: '12m ago',
    channel: 'Discord',
  },
  { type: 'badge', user: 'Mike T.', time: '1h ago', channel: 'Beta Tester' },
];

export default function Community() {
  return (
    <AppLayout>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className='mb-8'
      >
        <h1 className='text-3xl font-mono font-bold text-foreground mb-2'>
          Community <span className='text-primary glow-cyan'>Hub</span>
        </h1>
        <p className='text-muted-foreground'>
          Monitor and engage with your community members
        </p>
      </motion.div>

      {/* Member Metrics */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6'>
        {memberMetrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className='glass-card border-border/50'>
              <CardContent className='p-4'>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='text-muted-foreground text-sm'>
                      {metric.label}
                    </p>
                    <p className='text-3xl font-mono font-bold text-foreground mt-1'>
                      {metric.value.toLocaleString()}
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg bg-${metric.color}/10`}>
                    <metric.icon className={`w-6 h-6 text-${metric.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6'>
        {/* Member Segmentation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className='glass-card border-border/50 h-full'>
            <CardHeader className='pb-2'>
              <CardTitle className='text-lg font-mono flex items-center gap-2'>
                <Users className='w-5 h-5 text-primary' />
                Member Segmentation
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              {segmentData.map((segment) => (
                <div key={segment.name} className='space-y-2'>
                  <div className='flex justify-between text-sm'>
                    <span className='text-foreground'>{segment.name}</span>
                    <span className='text-muted-foreground'>
                      {segment.count} ({segment.percentage}%)
                    </span>
                  </div>
                  <div className='h-2 bg-muted/30 rounded-full overflow-hidden'>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${segment.percentage}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className={`h-full ${segment.color} rounded-full`}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card className='glass-card border-border/50 h-full'>
            <CardHeader className='pb-2'>
              <CardTitle className='text-lg font-mono flex items-center gap-2'>
                <MessageSquare className='w-5 h-5 text-accent' />
                Engagement Today
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='flex items-center gap-4 mb-4 p-3 bg-muted/20 rounded-lg'>
                <div className='text-center'>
                  <p className='text-3xl font-mono font-bold text-primary'>
                    385
                  </p>
                  <p className='text-xs text-muted-foreground'>
                    Messages Today
                  </p>
                </div>
                <div className='flex-1'>
                  <div className='flex items-center gap-1 text-accent text-sm'>
                    <TrendingUp className='w-4 h-4' />
                    <span>+23% vs yesterday</span>
                  </div>
                </div>
              </div>

              <p className='text-sm text-muted-foreground mb-3'>
                Active Channels
              </p>
              <div className='space-y-2 max-h-[200px] overflow-y-auto'>
                {channels.map((channel) => (
                  <div
                    key={channel.name}
                    className='flex items-center justify-between p-2 rounded-lg hover:bg-muted/20 transition-colors'
                  >
                    <div className='flex items-center gap-2'>
                      <Hash className='w-4 h-4 text-muted-foreground' />
                      <span className='text-sm text-foreground'>
                        {channel.name.replace('#', '')}
                      </span>
                      {channel.active && (
                        <span className='w-2 h-2 rounded-full bg-accent animate-pulse' />
                      )}
                    </div>
                    <span className='text-sm text-muted-foreground'>
                      {channel.messages} msgs
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Card className='glass-card border-border/50 h-full'>
            <CardHeader className='pb-2'>
              <CardTitle className='text-lg font-mono flex items-center gap-2'>
                <Megaphone className='w-5 h-5 text-secondary' />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-3'>
                {recentActivity.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className='flex items-center gap-3 p-2 rounded-lg bg-muted/10'
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        activity.type === 'join'
                          ? 'bg-accent/20'
                          : activity.type === 'message'
                          ? 'bg-primary/20'
                          : activity.type === 'testimonial'
                          ? 'bg-warning/20'
                          : 'bg-secondary/20'
                      }`}
                    >
                      {activity.type === 'join' && (
                        <UserCheck className='w-4 h-4 text-accent' />
                      )}
                      {activity.type === 'message' && (
                        <MessageSquare className='w-4 h-4 text-primary' />
                      )}
                      {activity.type === 'testimonial' && (
                        <Quote className='w-4 h-4 text-warning' />
                      )}
                      {activity.type === 'badge' && (
                        <Trophy className='w-4 h-4 text-secondary' />
                      )}
                    </div>
                    <div className='flex-1 min-w-0'>
                      <p className='text-sm text-foreground truncate'>
                        {activity.user}
                      </p>
                      <p className='text-xs text-muted-foreground'>
                        {activity.channel}
                      </p>
                    </div>
                    <span className='text-xs text-muted-foreground'>
                      {activity.time}
                    </span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6'>
        {/* Testimonial System */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className='glass-card border-border/50'>
            <CardHeader className='pb-2'>
              <div className='flex items-center justify-between'>
                <CardTitle className='text-lg font-mono flex items-center gap-2'>
                  <Quote className='w-5 h-5 text-warning' />
                  Testimonials
                </CardTitle>
                <Button variant='outline' size='sm'>
                  <Send className='w-4 h-4 mr-1' />
                  Request
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Stats */}
              <div className='grid grid-cols-4 gap-2 mb-4 p-3 bg-muted/20 rounded-lg'>
                <div className='text-center'>
                  <p className='text-xl font-mono font-bold text-foreground'>
                    23
                  </p>
                  <p className='text-xs text-muted-foreground'>Collected</p>
                </div>
                <div className='text-center'>
                  <p className='text-xl font-mono font-bold text-warning'>7</p>
                  <p className='text-xs text-muted-foreground'>Pending</p>
                </div>
                <div className='text-center'>
                  <p className='text-xl font-mono font-bold text-accent'>19</p>
                  <p className='text-xs text-muted-foreground'>Approved</p>
                </div>
                <div className='text-center'>
                  <p className='text-xl font-mono font-bold text-primary'>12</p>
                  <p className='text-xs text-muted-foreground'>Used</p>
                </div>
              </div>

              {/* Testimonial Cards */}
              <div className='space-y-3 max-h-[300px] overflow-y-auto'>
                {testimonials.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className='p-3 rounded-lg border border-border/30 bg-muted/10'
                  >
                    <div className='flex items-start justify-between mb-2'>
                      <div className='flex items-center gap-1'>
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < testimonial.rating
                                ? 'text-warning fill-warning'
                                : 'text-muted'
                            }`}
                          />
                        ))}
                      </div>
                      <Badge
                        variant={
                          testimonial.status === 'approved'
                            ? 'default'
                            : 'secondary'
                        }
                        className='text-xs'
                      >
                        {testimonial.status}
                      </Badge>
                    </div>
                    <p className='text-sm text-foreground italic mb-2'>
                      "{testimonial.quote}"
                    </p>
                    <div className='flex items-center justify-between'>
                      <span className='text-xs text-muted-foreground'>
                        — {testimonial.author}
                      </span>
                      <span className='text-xs text-muted-foreground'>
                        {testimonial.source}
                      </span>
                    </div>
                    {testimonial.status === 'pending' && (
                      <div className='flex gap-2 mt-2'>
                        <Button
                          size='sm'
                          variant='ghost'
                          className='h-7 text-xs text-accent'
                        >
                          <Check className='w-3 h-3 mr-1' />
                          Approve
                        </Button>
                        <Button
                          size='sm'
                          variant='ghost'
                          className='h-7 text-xs text-destructive'
                        >
                          <X className='w-3 h-3 mr-1' />
                          Reject
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Launch Squad Management */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className='glass-card border-border/50'>
            <CardHeader className='pb-2'>
              <div className='flex items-center justify-between'>
                <CardTitle className='text-lg font-mono flex items-center gap-2'>
                  <Target className='w-5 h-5 text-accent' />
                  Launch Squad
                </CardTitle>
                <Button variant='outline' size='sm'>
                  Invite Members
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Progress */}
              <div className='mb-4'>
                <div className='flex justify-between text-sm mb-2'>
                  <span className='text-foreground'>Recruited</span>
                  <span className='text-primary font-mono'>38/50</span>
                </div>
                <Progress value={76} className='h-3' />
                <p className='text-xs text-muted-foreground mt-1'>
                  12 spots remaining
                </p>
              </div>

              {/* Training Modules */}
              <div className='p-3 bg-muted/20 rounded-lg mb-4'>
                <p className='text-sm font-medium text-foreground mb-2'>
                  Training Completion
                </p>
                <div className='grid grid-cols-4 gap-2'>
                  {['Module 1', 'Module 2', 'Module 3', 'Module 4'].map(
                    (module, i) => (
                      <div key={module} className='text-center'>
                        <div
                          className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center ${
                            i < 3
                              ? 'bg-accent/20 text-accent'
                              : 'bg-muted/30 text-muted-foreground'
                          }`}
                        >
                          {i < 3 ? (
                            <Check className='w-5 h-5' />
                          ) : (
                            <Clock className='w-5 h-5' />
                          )}
                        </div>
                        <p className='text-xs text-muted-foreground mt-1'>
                          M{i + 1}
                        </p>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Member List */}
              <div className='space-y-2'>
                <p className='text-sm text-muted-foreground'>Recent Members</p>
                {launchSquadMembers.map((member, index) => (
                  <div
                    key={member.name}
                    className='flex items-center justify-between p-2 rounded-lg hover:bg-muted/20 transition-colors'
                  >
                    <div className='flex items-center gap-3'>
                      <div className='w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center'>
                        <span className='text-sm font-medium text-primary'>
                          {member.name.charAt(0)}
                        </span>
                      </div>
                      <span className='text-sm text-foreground'>
                        {member.name}
                      </span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <Badge
                        variant={
                          member.status === 'trained'
                            ? 'default'
                            : member.status === 'training'
                            ? 'secondary'
                            : 'outline'
                        }
                        className='text-xs'
                      >
                        {member.status}
                      </Badge>
                      <span className='text-xs text-muted-foreground'>
                        {member.modules}/4
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className='flex gap-2 mt-4'>
                <Button variant='outline' size='sm' className='flex-1'>
                  View All Members
                </Button>
                <Button variant='outline' size='sm' className='flex-1'>
                  Send Reminder
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </AppLayout>
  );
}

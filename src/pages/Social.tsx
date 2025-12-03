import { AppLayout } from "@/components/layout/AppLayout";
import { motion } from "framer-motion";
import { MiniChart } from "@/components/dashboard/MiniChart";
import { Calendar, Clock, Eye, Heart, MessageCircle, Share2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const platforms = [
  {
    name: "TikTok",
    icon: "🎵",
    views: "2.4K",
    likes: "347",
    comments: "89",
    shares: "23",
    postsToday: 3,
    queue: 5,
    connected: true,
    color: "from-pink-500 to-cyan-500",
    chartData: [120, 145, 167, 189, 234, 256, 289, 312, 367, 398, 423, 456],
  },
  {
    name: "Instagram",
    icon: "📸",
    views: "1.8K",
    likes: "234",
    comments: "67",
    shares: "12",
    postsToday: 2,
    queue: 4,
    connected: true,
    color: "from-purple-500 to-orange-500",
    chartData: [89, 102, 115, 134, 156, 178, 189, 201, 223, 245, 267, 289],
  },
  {
    name: "Facebook",
    icon: "👍",
    views: "956",
    likes: "89",
    comments: "23",
    shares: "8",
    postsToday: 2,
    queue: 3,
    connected: true,
    color: "from-blue-500 to-blue-700",
    chartData: [45, 52, 58, 67, 78, 89, 95, 102, 112, 123, 134, 145],
  },
  {
    name: "X",
    icon: "𝕏",
    views: "1.2K",
    likes: "156",
    comments: "45",
    shares: "34",
    postsToday: 4,
    queue: 6,
    connected: true,
    color: "from-gray-700 to-gray-900",
    chartData: [67, 78, 89, 102, 115, 128, 145, 167, 189, 212, 234, 256],
  },
  {
    name: "LinkedIn",
    icon: "💼",
    views: "678",
    likes: "67",
    comments: "12",
    shares: "5",
    postsToday: 1,
    queue: 2,
    connected: true,
    color: "from-blue-600 to-blue-800",
    chartData: [34, 38, 42, 48, 52, 58, 62, 68, 74, 82, 89, 96],
  },
  {
    name: "YouTube",
    icon: "▶️",
    views: "3.2K",
    likes: "198",
    comments: "34",
    shares: "18",
    postsToday: 1,
    queue: 3,
    connected: true,
    color: "from-red-500 to-red-700",
    chartData: [156, 178, 201, 234, 267, 298, 334, 367, 401, 434, 467, 501],
  },
];

const scheduledPosts = [
  { platform: "TikTok", title: "Product Demo - Morning Routine", time: "10:00 AM", status: "scheduled" },
  { platform: "Instagram", title: "Behind the Scenes Story", time: "12:30 PM", status: "scheduled" },
  { platform: "X", title: "Launch countdown tweet", time: "2:00 PM", status: "scheduled" },
  { platform: "LinkedIn", title: "Team introduction post", time: "4:00 PM", status: "pending" },
];

export default function Social() {
  return (
    <AppLayout>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-mono font-bold text-foreground mb-2">
          Social Media <span className="text-secondary glow-orange">Command</span>
        </h1>
        <p className="text-muted-foreground">
          Monitor and manage content across all 6 platforms
        </p>
      </motion.div>

      {/* Platform Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {platforms.map((platform, index) => (
          <motion.div
            key={platform.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card p-5 gradient-border"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "w-10 h-10 rounded-lg bg-gradient-to-br flex items-center justify-center text-xl",
                    platform.color
                  )}
                >
                  {platform.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{platform.name}</h3>
                  <div className="flex items-center gap-1">
                    <span className="status-dot-operational" />
                    <span className="text-xs text-muted-foreground">Connected</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2 mb-4">
              <div className="text-center">
                <Eye className="w-4 h-4 text-muted-foreground mx-auto mb-1" />
                <p className="text-sm font-mono text-foreground">{platform.views}</p>
              </div>
              <div className="text-center">
                <Heart className="w-4 h-4 text-muted-foreground mx-auto mb-1" />
                <p className="text-sm font-mono text-foreground">{platform.likes}</p>
              </div>
              <div className="text-center">
                <MessageCircle className="w-4 h-4 text-muted-foreground mx-auto mb-1" />
                <p className="text-sm font-mono text-foreground">{platform.comments}</p>
              </div>
              <div className="text-center">
                <Share2 className="w-4 h-4 text-muted-foreground mx-auto mb-1" />
                <p className="text-sm font-mono text-foreground">{platform.shares}</p>
              </div>
            </div>

            <MiniChart data={platform.chartData} color="primary" height={40} className="mb-4" />

            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Posts: {platform.postsToday}</span>
              <span>Queue: {platform.queue}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Content Queue */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glass-card p-5"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            <h3 className="font-mono font-semibold text-foreground">TODAY'S QUEUE</h3>
          </div>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Schedule Post
          </Button>
        </div>

        <div className="space-y-3">
          {scheduledPosts.map((post, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-lg">
                  {platforms.find((p) => p.name === post.platform)?.icon}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{post.title}</p>
                  <p className="text-xs text-muted-foreground">{post.platform}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{post.time}</span>
                </div>
                <span
                  className={cn(
                    "px-2 py-1 rounded-full text-xs font-medium",
                    post.status === "scheduled"
                      ? "bg-accent/10 text-accent"
                      : "bg-warning/10 text-warning"
                  )}
                >
                  {post.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </AppLayout>
  );
}

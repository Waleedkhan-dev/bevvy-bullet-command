import { motion } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FileText,
  Image,
  Video,
  Sparkles,
  Check,
  X,
  Eye,
  Clock,
  Play,
  Upload,
  Wand2,
  Shuffle,
  ArrowRight,
  CheckCircle2,
  Circle,
  Filter,
  Search,
  LayoutGrid,
} from "lucide-react";
import { useState } from "react";

const aiStats = [
  { type: "Text Content", icon: FileText, count: 127, approved: 98, color: "from-cyan-500/20 to-cyan-500/5", borderColor: "border-cyan-500/30", iconColor: "text-cyan-400" },
  { type: "Image Content", icon: Image, count: 89, approved: 87, color: "from-purple-500/20 to-purple-500/5", borderColor: "border-purple-500/30", iconColor: "text-purple-400" },
  { type: "Video Content", icon: Video, count: 34, approved: 91, color: "from-orange-500/20 to-orange-500/5", borderColor: "border-orange-500/30", iconColor: "text-orange-400" },
];

const platforms = [
  { id: "tiktok", label: "TikTok" },
  { id: "instagram", label: "Instagram" },
  { id: "facebook", label: "Facebook" },
  { id: "x", label: "X" },
  { id: "linkedin", label: "LinkedIn" },
  { id: "youtube", label: "YouTube" },
];

const approvalQueue = [
  { id: 1, title: "Morning motivation post", type: "text", platform: "Instagram", generated: "2 hours ago", preview: "Start your day with energy! 🚀 Our new product..." },
  { id: 2, title: "Product showcase reel", type: "video", platform: "TikTok", generated: "3 hours ago", preview: "15s vertical video showing product features" },
  { id: 3, title: "Behind the scenes", type: "image", platform: "Instagram", generated: "4 hours ago", preview: "Team working on product development" },
  { id: 4, title: "Launch countdown", type: "text", platform: "X", generated: "5 hours ago", preview: "47 days until launch! Are you ready?" },
  { id: 5, title: "Testimonial highlight", type: "video", platform: "YouTube", generated: "6 hours ago", preview: "30s testimonial from beta tester" },
];

const videoPipeline = [
  { id: 1, name: "Product Demo v3", stage: "AI Edit", progress: 65, eta: "~12 min" },
  { id: 2, name: "Testimonial Comp", stage: "Review", progress: 85, eta: "Pending" },
  { id: 3, name: "Launch Teaser", stage: "Approved", progress: 100, eta: "Done" },
  { id: 4, name: "Feature Highlight", stage: "Upload", progress: 15, eta: "~25 min" },
  { id: 5, name: "BTS Montage", stage: "Scheduled", progress: 100, eta: "Dec 8, 2PM" },
];

const contentLibrary = [
  { id: 1, title: "Product Hero Shot", type: "image", platform: "All", status: "Used", date: "Nov 28" },
  { id: 2, title: "Unboxing Experience", type: "video", platform: "TikTok", status: "Scheduled", date: "Dec 5" },
  { id: 3, title: "Feature Breakdown", type: "text", platform: "LinkedIn", status: "Draft", date: "Dec 3" },
  { id: 4, title: "Customer Review #12", type: "video", platform: "Instagram", status: "Used", date: "Nov 30" },
  { id: 5, title: "Comparison Chart", type: "image", platform: "X", status: "Approved", date: "Dec 1" },
  { id: 6, title: "Team Introduction", type: "video", platform: "YouTube", status: "Draft", date: "Dec 4" },
];

const pipelineStages = ["Upload", "AI Edit", "Review", "Approved", "Scheduled", "Posted"];

const getTypeIcon = (type: string) => {
  switch (type) {
    case "text": return <FileText className="w-4 h-4" />;
    case "image": return <Image className="w-4 h-4" />;
    case "video": return <Video className="w-4 h-4" />;
    default: return <FileText className="w-4 h-4" />;
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case "text": return "bg-cyan-500/20 text-cyan-400";
    case "image": return "bg-purple-500/20 text-purple-400";
    case "video": return "bg-orange-500/20 text-orange-400";
    default: return "bg-muted text-muted-foreground";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "Used": return "bg-success/20 text-success";
    case "Scheduled": return "bg-primary/20 text-primary";
    case "Approved": return "bg-blue-500/20 text-blue-400";
    case "Draft": return "bg-muted text-muted-foreground";
    default: return "bg-muted text-muted-foreground";
  }
};

const getStageColor = (stage: string) => {
  switch (stage) {
    case "Posted": return "text-success";
    case "Scheduled": return "text-primary";
    case "Approved": return "text-blue-400";
    case "Review": return "text-warning";
    case "AI Edit": return "text-purple-400";
    case "Upload": return "text-muted-foreground";
    default: return "text-muted-foreground";
  }
};

export default function Content() {
  const [selectedType, setSelectedType] = useState("text");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["tiktok", "instagram"]);
  const [theme, setTheme] = useState("");

  const togglePlatform = (platformId: string) => {
    setSelectedPlatforms(prev =>
      prev.includes(platformId)
        ? prev.filter(p => p !== platformId)
        : [...prev, platformId]
    );
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
            <h1 className="text-3xl font-mono font-bold text-foreground">Content Studio</h1>
            <p className="text-muted-foreground mt-1">AI-powered content generation and management</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <LayoutGrid className="w-4 h-4 mr-2" />
              Library
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              <Sparkles className="w-4 h-4 mr-2" />
              Quick Generate
            </Button>
          </div>
        </motion.div>

        {/* AI Generation Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {aiStats.map((stat, index) => (
            <motion.div
              key={stat.type}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + index * 0.05 }}
            >
              <Card className={`glass-card border ${stat.borderColor} bg-gradient-to-b ${stat.color}`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.type}</p>
                      <p className="text-3xl font-mono font-bold text-foreground mt-1">{stat.count}</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        Generated • <span className="text-success">{stat.approved}% Approved</span>
                      </p>
                    </div>
                    <div className={`p-3 rounded-xl bg-white/5 ${stat.iconColor}`}>
                      <stat.icon className="w-8 h-8" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Content Generator & Approval Queue */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Content Generator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="glass-card border-white/10 h-full">
              <CardHeader>
                <CardTitle className="text-lg font-mono flex items-center gap-2">
                  <Wand2 className="w-5 h-5 text-primary" />
                  Content Generator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                {/* Content Type */}
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Content Type</label>
                  <div className="flex gap-2">
                    {[
                      { id: "text", icon: FileText, label: "Text" },
                      { id: "image", icon: Image, label: "Image" },
                      { id: "video", icon: Video, label: "Video" },
                    ].map((type) => (
                      <Button
                        key={type.id}
                        variant={selectedType === type.id ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedType(type.id)}
                        className={selectedType === type.id ? "bg-primary" : ""}
                      >
                        <type.icon className="w-4 h-4 mr-2" />
                        {type.label}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Platform Targets */}
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Platform Targets</label>
                  <div className="grid grid-cols-3 gap-2">
                    {platforms.map((platform) => (
                      <div
                        key={platform.id}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={platform.id}
                          checked={selectedPlatforms.includes(platform.id)}
                          onCheckedChange={() => togglePlatform(platform.id)}
                        />
                        <label
                          htmlFor={platform.id}
                          className="text-sm text-foreground cursor-pointer"
                        >
                          {platform.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Theme */}
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Theme / Topic</label>
                  <Textarea
                    placeholder="Describe the content theme or topic..."
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    className="bg-background/50 resize-none"
                    rows={3}
                  />
                </div>

                {/* Options */}
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Tone</label>
                    <Select defaultValue="engaging">
                      <SelectTrigger className="bg-background/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="engaging">Engaging</SelectItem>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="casual">Casual</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Style</label>
                    <Select defaultValue="modern">
                      <SelectTrigger className="bg-background/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="modern">Modern</SelectItem>
                        <SelectItem value="minimal">Minimal</SelectItem>
                        <SelectItem value="bold">Bold</SelectItem>
                        <SelectItem value="playful">Playful</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Length</label>
                    <Select defaultValue="medium">
                      <SelectTrigger className="bg-background/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="short">Short</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="long">Long</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-2">
                  <Button variant="outline" className="flex-1">
                    <Shuffle className="w-4 h-4 mr-2" />
                    Random
                  </Button>
                  <Button className="flex-1 bg-primary hover:bg-primary/90">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Approval Queue */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="glass-card border-white/10 h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-mono flex items-center gap-2">
                    <Clock className="w-5 h-5 text-warning" />
                    Approval Queue
                  </CardTitle>
                  <Badge variant="outline" className="border-warning/30 text-warning">
                    {approvalQueue.length} pending
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {approvalQueue.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                    className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10 hover:border-primary/30 transition-colors"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className={`p-2 rounded-lg ${getTypeColor(item.type)}`}>
                        {getTypeIcon(item.type)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-medium text-foreground truncate">{item.title}</div>
                        <div className="text-xs text-muted-foreground truncate">
                          {item.platform} • {item.generated}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 ml-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/10">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-success/20 text-success">
                        <Check className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-destructive/20 text-destructive">
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Video Pipeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="glass-card border-white/10">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-mono flex items-center gap-2">
                  <Video className="w-5 h-5 text-secondary" />
                  Video Pipeline
                </CardTitle>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  {pipelineStages.map((stage, index) => (
                    <div key={stage} className="flex items-center gap-1">
                      <span className={getStageColor(stage)}>{stage}</span>
                      {index < pipelineStages.length - 1 && <ArrowRight className="w-3 h-3" />}
                    </div>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {videoPipeline.map((video, index) => (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.05 }}
                    className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-orange-500/20">
                        <Play className="w-4 h-4 text-orange-400" />
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{video.name}</div>
                        <div className="text-xs text-muted-foreground">ETA: {video.eta}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant="outline" className={`border-transparent ${getStageColor(video.stage)}`}>
                        {video.stage}
                      </Badge>
                      <div className="w-32 flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-secondary to-primary rounded-full transition-all"
                            style={{ width: `${video.progress}%` }}
                          />
                        </div>
                        <span className="text-xs font-mono text-muted-foreground w-8">{video.progress}%</span>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Content Library */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="glass-card border-white/10">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-mono flex items-center gap-2">
                  <LayoutGrid className="w-5 h-5 text-primary" />
                  Content Library
                </CardTitle>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search content..."
                      className="pl-9 w-48 bg-background/50"
                    />
                  </div>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-28 bg-background/50">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="text">Text</SelectItem>
                      <SelectItem value="image">Image</SelectItem>
                      <SelectItem value="video">Video</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-28 bg-background/50">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                      <SelectItem value="used">Used</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {contentLibrary.map((content, index) => (
                  <motion.div
                    key={content.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + index * 0.03 }}
                    className="p-3 rounded-lg bg-white/5 border border-white/10 hover:border-primary/30 transition-colors cursor-pointer group"
                  >
                    <div className={`aspect-square rounded-lg mb-2 flex items-center justify-center ${getTypeColor(content.type)}`}>
                      {getTypeIcon(content.type)}
                    </div>
                    <div className="text-sm font-medium text-foreground truncate">{content.title}</div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-muted-foreground">{content.platform}</span>
                      <Badge className={`text-[10px] px-1.5 py-0 ${getStatusColor(content.status)}`}>
                        {content.status}
                      </Badge>
                    </div>
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

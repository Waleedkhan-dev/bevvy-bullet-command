import { motion } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import Swal from "sweetalert2";
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
import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteImageContent, getImageContent } from "@/api/imageContent";
import FacebookPostPreview from "@/components/FacebookPostPreview";
import InstagramPostPreview from "@/components/InstagramPostPreview";
import TikTokPostPreview from "@/components/TikTokPostPreview";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { set } from "date-fns";

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
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<string>("facebook");
  const [editedCaptions, setEditedCaptions] = useState<any>({});
  const [postStatus, setPostStatus] = useState<any>({});
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [selectedPlatformsToPost, setSelectedPlatformsToPost] = useState<string[]>([]);
const queryClient = useQueryClient();
  const { data = [], isLoading } = useQuery({
    queryKey: ["image_content"],
    queryFn: getImageContent,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteImageContent,
    onSuccess: (deletedId) => {
      queryClient.setQueryData(["image_content"], (oldData: any) => {
        if (!oldData) return [];
        return oldData.filter((item: any) => item.id !== deletedId);
        setSelectedItem(null);
      });
    },
      onError: (error) => {
    console.error(error);
    alert("Failed to delete post");
  },
  })

  const togglePlatform = (platformId: string) => {
    setSelectedPlatforms(prev =>
      prev.includes(platformId)
        ? prev.filter(p => p !== platformId)
        : [...prev, platformId]
    );
  };

const handleDeletePost = async (item: any) => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "This post will be permanently deleted!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#6b7280",
    confirmButtonText: "Yes, delete it",
  });

  if (result.isConfirmed) {
    deleteMutation.mutate(item.id, {
      onSuccess: () => {
        Swal.fire({
          title: "Deleted!",
          text: "Post has been deleted.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      },
    });
  }
};
const PostToPlateform = (item: any) => {
  setSelectedItem(item);
  setEditedCaptions({
    facebook: item.facebook_caption || "",
    instagram: item.instagram_caption || "",
    tiktok: item.tiktok_caption || "",
  });
  setShowPublishModal(true);
}

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
                    {isLoading ? "..." : data.length} pending
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-gradient bg-muted/30">
                     
                    
                     
                      </tr>
                    </thead>
                    <tbody>
                      {isLoading ? (
                        <tr>
                          <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                            Loading content...
                          </td>
                        </tr>
                      ) : data && data.length > 0 ? (
                        data.map((item: any) => (
                          <tr
                            key={item.id}
                            className="border-b flex justify-between border-gray-700/50 hover:bg-accent/5 transition-colors duration-200"
                          >
                            <td className="px-4 py-4">
                              {item.image_url ? (
                                <img
                                  src={item.image_url}
                                  alt="content"
                                  className="w-8 h-8 rounded-lg object-cover shadow-lg border border-gray-600/30 hover:scale-105 transition-transform"
                                />
                              ) : (
                                <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground text-xs">
                                  No image
                                </div>
                              )}
                            </td>
                            <td className="px-4 py-4 text-sm text-foreground max-w-[450px]">
                              <p>{item.title  }</p>
                              <p className="line-clamp-1 cursor-help text-white w-full" title={item.facebook_caption || "No caption"}>
                                {item.facebook_caption ? (
                                  <span className="text-white">{item.facebook_caption}</span>
                                ) : (
                                  <span className="text-muted-foreground">—</span>
                                )}
                              </p>
                            </td>
                            {/* <td className="px-4 py-4 text-sm text-foreground max-w-[150px]">
                              <p className="line-clamp-2 cursor-help" title={item.instagram_caption || "No caption"}>
                                {item.instagram_caption ? (
                                  <span className="text-purple-400/80">{item.instagram_caption}</span>
                                ) : (
                                  <span className="text-muted-foreground">—</span>
                                )}
                              </p>
                            </td>
                            <td className="px-4 py-4 text-sm text-foreground max-w-[150px]">
                              <p className="line-clamp-2 cursor-help" title={item.tiktok_caption || "No caption"}>
                                {item.tiktok_caption ? (
                                  <span className="text-pink-400/80">{item.tiktok_caption}</span>
                                ) : (
                                  <span className="text-muted-foreground">—</span>
                                )}
                              </p>
                            </td> */}
                            {/* <td className="px-4 py-4 text-sm text-muted-foreground whitespace-nowrap">
                              {new Date(item.created_at).toLocaleDateString()} <br />
                              <span className="text-xs">{new Date(item.created_at).toLocaleTimeString()}</span>
                            </td> */}
                            <td className="px-4 py-4">
                              <div>
                             
                                <div className="flex items-center gap-1 ml-2">
                        <div
                                  
                               
                                  onClick={() => {
                                    setSelectedItem(item);
                                    setSelectedPlatform("facebook");
                                    setEditedCaptions({
                                      facebook: item.facebook_caption || "",
                                      instagram: item.instagram_caption || "",
                                      tiktok: item.tiktok_caption || "",
                                    });
                                  }}
                                  className="gap-1 cursor-pointer inline-flex items-center px-2 py-1 border border-gray-600 rounded-lg text-xs text-foreground hover:bg-accent/10 transition-colors"
                                >
                                  <Eye className="w-4 h-4" />
                            
                                </div>
                      <Button
                      
              onClick={() => PostToPlateform(item)}
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:bg-success/20 text-success"
                      >
                        <Check className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={() => handleDeletePost(item)}
  variant="ghost"
  size="icon"
              
                      
                        className="h-8 w-8 hover:bg-destructive/20 text-destructive"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                                {/* <select
                                  value={postStatus[item.id] || "pending"}
                                  onChange={(e) => setPostStatus({ ...postStatus, [item.id]: e.target.value })}
                                  className="border border-gray-600 rounded-lg px-2 py-1 bg-background text-foreground text-xs font-medium hover:border-accent transition-colors cursor-pointer"
                                >
                                  <option value="pending">Pending</option>
                                  <option value="approved">Approved</option>
                                  <option value="rejected">Rejected</option>
                                </select> */}
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                            No content pending. All caught up!
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
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

      {/* Preview Modal */}
      {selectedItem && !showPublishModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-background border border-accent/30 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-background/80 backdrop-blur border-b border-gray-700 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-mono font-bold text-foreground">Post Preview & Editor</h2>
              <button
                onClick={() => setSelectedItem(null)}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              {/* Platform Selector */}
              <div className="flex gap-2 mb-6">
                {[
                  { id: "facebook", icon: <FaFacebook />, label: "Facebook", color: "from-blue-600 to-blue-800" },
                  { id: "instagram", icon: <FaInstagram />, label: "Instagram", color: "from-purple-500 to-orange-500" },
                  { id: "tiktok", icon: <FaTiktok />, label: "TikTok", color: "from-pink-500 to-cyan-500" },
                ].map((platform) => (
                  <button
                    key={platform.id}
                    onClick={() => setSelectedPlatform(platform.id)}
                    className={cn(
                      "px-4 py-2 rounded-lg flex items-center gap-2 font-semibold transition-all",
                      selectedPlatform === platform.id
                        ? `bg-gradient-to-r ${platform.color} text-white shadow-lg`
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    )}
                  >
                    {platform.icon}
                    {platform.label}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Preview */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground mb-4">Preview</h3>

                  {selectedPlatform === "facebook" && (
                    <FacebookPostPreview
                      caption={editedCaptions.facebook || ""}
                      imageUrl={selectedItem.image_url}
                    />
                  )}

                  {selectedPlatform === "instagram" && (
                    <InstagramPostPreview
                      caption={editedCaptions.instagram || ""}
                      imageUrl={selectedItem.image_url}
                    />
                  )}

                  {selectedPlatform === "tiktok" && (
                    <TikTokPostPreview
                      caption={editedCaptions.tiktok || ""}
                      imageUrl={selectedItem.image_url}
                    />
                  )}
                </div>

                {/* Editor */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground mb-4">Edit Caption</h3>
                  <Textarea
                    value={editedCaptions[selectedPlatform] || ""}
                    onChange={(e) =>
                      setEditedCaptions({
                        ...editedCaptions,
                        [selectedPlatform]: e.target.value,
                      })
                    }
                    placeholder={`Enter ${selectedPlatform} caption...`}
                    className="w-full h-64 bg-muted border border-gray-600 rounded-lg p-4 text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent resize-none"
                  />
                  <div className="text-sm text-muted-foreground">
                    {editedCaptions[selectedPlatform]?.length || 0} characters
                  </div>
                  <div className="flex gap-3">
                    <Button
                      onClick={() => setShowPublishModal(true)}
                      className="flex-1 bg-primary hover:bg-primary/80"
                    >
                      Post to Platforms
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setSelectedItem(null)}
                    >
                      Close
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Publish Modal - Choose Platforms */}
      {showPublishModal && selectedItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-background border border-accent/30 rounded-xl max-w-2xl w-full"
          >
            {/* Header */}
            <div className="bg-background/80 backdrop-blur border-b border-gray-700 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-mono font-bold text-foreground">Choose Platforms to Post</h2>
              <button
                onClick={() => {
                  setShowPublishModal(false);
                  setSelectedPlatformsToPost([]);
                }}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-8">
              <p className="text-muted-foreground mb-6">Select which platforms you want to post this content to:</p>

              {/* Platform Selection Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                {[
                  { id: "facebook", label: "Facebook", icon: <FaFacebook className="w-5 h-5" />, color: "from-blue-600 to-blue-800" },
                  { id: "instagram", label: "Instagram", icon: <FaInstagram className="w-5 h-5" />, color: "from-purple-500 to-orange-500" },
                  { id: "tiktok", label: "TikTok", icon: <FaTiktok className="w-5 h-5" />, color: "from-pink-500 to-cyan-500" },
                ].map((platform) => (
                  <button
                    key={platform.id}
                    onClick={() => {
                      if (selectedPlatformsToPost.includes(platform.id)) {
                        setSelectedPlatformsToPost(selectedPlatformsToPost.filter(p => p !== platform.id));
                      } else {
                        setSelectedPlatformsToPost([...selectedPlatformsToPost, platform.id]);
                      }
                    }}
                    className={cn(
                      "p-4 rounded-lg border-2 transition-all font-semibold flex items-center justify-center gap-2",
                      selectedPlatformsToPost.includes(platform.id)
                        ? `bg-gradient-to-r ${platform.color} text-white border-accent`
                        : "bg-muted text-muted-foreground border-gray-700 hover:border-accent"
                    )}
                  >
                    {platform.icon}
                    {platform.label}
                  </button>
                ))}
              </div>

              {/* Quick Select Buttons */}
              <div className="flex gap-3 mb-8">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setSelectedPlatformsToPost(["facebook", "instagram", "tiktok"])}
                >
                  Select All
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setSelectedPlatformsToPost([])}
                >
                  Clear All
                </Button>
              </div>

              {/* Selected Count */}
              <div className="bg-muted p-4 rounded-lg mb-8">
                <p className="text-foreground font-semibold">
                  Posting to {selectedPlatformsToPost.length} platform{selectedPlatformsToPost.length !== 1 ? "s" : ""}
                </p>
                {selectedPlatformsToPost.length > 0 && (
                  <p className="text-sm text-muted-foreground mt-2">
                    {selectedPlatformsToPost.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(", ")}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  onClick={() => {
                    console.log("Posting to platforms:", selectedPlatformsToPost);
                    console.log("Content:", selectedItem);
                    console.log("Captions:", editedCaptions);
                    // Here you would call the API to post to selected platforms
                    setShowPublishModal(false);
                    setSelectedItem(null);
                    setSelectedPlatformsToPost([]);
                  }}
                  disabled={selectedPlatformsToPost.length === 0}
                  className="flex-1 bg-primary hover:bg-primary/80 disabled:opacity-50"
                >
                  Post Now
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setShowPublishModal(false);
                    setSelectedPlatformsToPost([]);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AppLayout>
  );
}

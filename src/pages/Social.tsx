import { AppLayout } from "@/components/layout/AppLayout";
import { motion } from "framer-motion";
import { MiniChart } from "@/components/dashboard/MiniChart";
import { Calendar, Clock, Eye, Heart, MessageCircle, Share2, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { getImageContent } from "@/api/imageContent";
import { useState } from "react";
import FacebookPostPreview from "@/components/FacebookPostPreview";
import InstagramPostPreview from "@/components/InstagramPostPreview";
import TikTokPostPreview from "@/components/TikTokPostPreview";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";

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
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<string>("facebook");
  const [editedCaptions, setEditedCaptions] = useState<any>({});
  const [postStatus, setPostStatus] = useState<any>({});
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [selectedPlatformsToPost, setSelectedPlatformsToPost] = useState<string[]>([]);

  const { data = [], isLoading, isError, error } = useQuery({
    queryKey: ["image_content"],
    queryFn: getImageContent,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return (
    <AppLayout>
      <div className="glass-card p-5 border border-red-500">
        <p className="text-red-400 font-semibold mb-2">Error loading image content:</p>
        <p className="text-sm text-muted-foreground">{(error as Error)?.message}</p>
      </div>
    </AppLayout>
  );
const dataSave = ()=>
{
  console.log("data",data);
}
 console.log("data",data);
 
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

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="glass-card p-6 mb-8"
    >
      <h3 className="font-mono font-semibold text-lg text-foreground mb-5">📋 PENDING CONTENT</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-gradient bg-muted/30">
              <th className="text-left px-4 py-3 font-semibold text-foreground">Image</th>
              <th className="text-left px-4 py-3 font-semibold text-foreground">Facebook</th>
              <th className="text-left px-4 py-3 font-semibold text-foreground">Instagram</th>
              <th className="text-left px-4 py-3 font-semibold text-foreground">TikTok</th>
              <th className="text-left px-4 py-3 font-semibold text-foreground">Created</th>
              <th className="text-center px-4 py-3 font-semibold text-foreground">Status</th>
              <th>Preview</th>
            </tr>
          </thead>

          <tbody>
            {data && data.length > 0 ? (
              data.map((item: any) => (
                <tr 
                  key={item.id} 
                  className="border-b border-gray-700/50 hover:bg-accent/5 transition-colors duration-200"
                >
                  <td className="px-4 py-4">
                    {item.image_url ? (
                      <img 
                        src={item.image_url} 
                        alt="content" 
                        className="w-20 h-20 rounded-lg object-cover shadow-lg border border-gray-600/30 hover:scale-105 transition-transform"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
                        No image
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-4 text-sm text-foreground max-w-xs">
                    <p className="line-clamp-2  cursor-help" title={item.facebook_caption || "No caption"}>
                      {item.facebook_caption ? (
                        <span className="text-blue-400/80">{item.facebook_caption}</span>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </p>
                  </td>
                  <td className="px-4 py-4 text-sm text-foreground max-w-xs">
                    <p className="line-clamp-2  cursor-help" title={item.instagram_caption || "No caption"}>
                      {item.instagram_caption ? (
                        <span className="text-purple-400/80">{item.instagram_caption}</span>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </p>
                  </td>
                  <td className="px-4 py-4 text-sm text-foreground max-w-xs">
                    <p className="line-clamp-2  cursor-help" title={item.tiktok_caption || "No caption"}>
                      {item.tiktok_caption ? (
                        <span className="text-pink-400/80">{item.tiktok_caption}</span>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </p>
                  </td>
                  <td className="px-4 py-4 text-sm text-muted-foreground whitespace-nowrap">
                    {new Date(item.created_at).toLocaleDateString()} <br />
                    <span className="text-xs">{new Date(item.created_at).toLocaleTimeString()}</span>
                  </td>
                  <td className="px-4 py-4 text-center flex gap-2 justify-center">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setSelectedItem(item);
                        setSelectedPlatform("facebook");
                        setEditedCaptions({
                          facebook: item.facebook_caption || "",
                          instagram: item.instagram_caption || "",
                          tiktok: item.tiktok_caption || "",
                        });
                      }}
                      className="gap-1"
                    >
                      <Eye className="w-4 h-4" />
                      Preview
                    </Button>
                    <select 
                      value={postStatus[item.id] || "pending"}
                      onChange={(e) => setPostStatus({ ...postStatus, [item.id]: e.target.value })}
                      className="border border-gray-600 rounded-lg px-3 py-2 bg-background text-foreground text-sm font-medium hover:border-accent transition-colors cursor-pointer"
                    >
                      <option value="pending">🔵 Pending</option>
                      <option value="approved">✅ Approved</option>
                      <option value="rejected">❌ Rejected</option>
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                  <p>No content pending. All caught up! 🎉</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
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

      {/* Preview Modal */}
      {selectedItem && (
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
                  { id: "facebook", icon:<FaFacebook />, label: " Facebook", color: "from-blue-600 to-blue-800" },
                  { id: "instagram", icon:<FaInstagram />, label: " Instagram", color: "from-purple-500 to-orange-500" },
                  { id: "tiktok", icon:<FaTiktok />, label: " TikTok", color: "from-pink-500 to-cyan-500" },
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
                    <p>{platform.icon}</p>
                   <p> {platform.label}</p>
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
                  <textarea
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
                      onClick={() => {
                        // Check if status is approved
                        if (postStatus[selectedItem.id] === "approved") {
                          setShowPublishModal(true);
                        } else {
                          // Just save changes
                          setSelectedItem(null);
                        }
                      }}
                      className="flex-1 bg-accent hover:bg-accent/80"
                    >
                      {postStatus[selectedItem.id] === "approved" ? "Approve & Post" : "Save Changes"}
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
                  { id: "facebook", label: "👍 Facebook", color: "from-blue-600 to-blue-800" },
                  { id: "instagram", label: "📸 Instagram", color: "from-purple-500 to-orange-500" },
                  { id: "tiktok", label: "🎵 TikTok", color: "from-pink-500 to-cyan-500" },
                  { id: "x", label: "𝕏 X", color: "from-gray-700 to-gray-900" },
                  { id: "linkedin", label: "💼 LinkedIn", color: "from-blue-600 to-blue-800" },
                  { id: "youtube", label: "▶️ YouTube", color: "from-red-500 to-red-700" },
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
                      "p-4 rounded-lg border-2 transition-all font-semibold",
                      selectedPlatformsToPost.includes(platform.id)
                        ? `bg-gradient-to-r ${platform.color} text-white border-accent`
                        : "bg-muted text-muted-foreground border-gray-700 hover:border-accent"
                    )}
                  >
                    {platform.label}
                  </button>
                ))}
              </div>

              {/* Quick Select Buttons */}
              <div className="flex gap-3 mb-8">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() =>
                    setSelectedPlatformsToPost(["facebook", "instagram", "tiktok", "x", "linkedin", "youtube"])
                  }
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
                  📤 Posting to {selectedPlatformsToPost.length} platform{selectedPlatformsToPost.length !== 1 ? "s" : ""}
                </p>
                {selectedPlatformsToPost.length > 0 && (
                  <p className="text-sm text-muted-foreground mt-2">
                    {selectedPlatformsToPost.map(p => {
                      const platform = ["facebook", "instagram", "tiktok", "x", "linkedin", "youtube"].find(
                        plat => plat === p
                      );
                      return platform?.charAt(0).toUpperCase() + platform?.slice(1);
                    }).join(", ")}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  onClick={() => {
                    console.log("Posting to platforms:", selectedPlatformsToPost);
                    // Here you would call the API to post to selected platforms
                    setShowPublishModal(false);
                    setSelectedItem(null);
                    setSelectedPlatformsToPost([]);
                  }}
                  disabled={selectedPlatformsToPost.length === 0}
                  className="flex-1 bg-accent hover:bg-accent/80 disabled:opacity-50"
                >
                  🚀 Post Now
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

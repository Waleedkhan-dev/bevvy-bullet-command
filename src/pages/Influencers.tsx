import { motion } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Filter,
  Download,
  Send,
  Upload,
  Users,
  MessageSquare,
  UserCheck,
  Share2,
  ExternalLink,
  Mail,
  Package,
  Eye,
  MoreHorizontal,
  Star,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";

const pipelineStages = [
  { name: "Discovered", count: 147, color: "from-cyan-500/20 to-cyan-500/5", borderColor: "border-cyan-500/30" },
  { name: "Outreach", count: 89, color: "from-blue-500/20 to-blue-500/5", borderColor: "border-blue-500/30" },
  { name: "Responded", count: 34, color: "from-purple-500/20 to-purple-500/5", borderColor: "border-purple-500/30" },
  { name: "Partner", count: 18, color: "from-orange-500/20 to-orange-500/5", borderColor: "border-orange-500/30" },
  { name: "Posted", count: 12, color: "from-green-500/20 to-green-500/5", borderColor: "border-green-500/30" },
];

const influencers = [
  { id: 1, name: "Alex Tech", handle: "@alextech", platform: "TikTok", followers: "245K", tier: "Macro", status: "Partner", score: 92, engagement: "4.2%" },
  { id: 2, name: "Sarah Gadgets", handle: "@sarahgadgets", platform: "Instagram", followers: "89K", tier: "Mid", status: "Responded", score: 87, engagement: "5.1%" },
  { id: 3, name: "Mike Reviews", handle: "@mikereviews", platform: "YouTube", followers: "512K", tier: "Macro", status: "Posted", score: 95, engagement: "3.8%" },
  { id: 4, name: "Emma Daily", handle: "@emmadaily", platform: "TikTok", followers: "156K", tier: "Mid", status: "Outreach", score: 78, engagement: "6.2%" },
  { id: 5, name: "Tech Tommy", handle: "@techtommy", platform: "X", followers: "67K", tier: "Micro", status: "Discovered", score: 72, engagement: "7.4%" },
  { id: 6, name: "Lisa Lifestyle", handle: "@lisalifestyle", platform: "Instagram", followers: "198K", tier: "Mid", status: "Partner", score: 88, engagement: "4.8%" },
  { id: 7, name: "Dan Drinks", handle: "@dandrinks", platform: "TikTok", followers: "324K", tier: "Macro", status: "Responded", score: 91, engagement: "5.5%" },
  { id: 8, name: "Wellness Wendy", handle: "@wellnesswendy", platform: "Instagram", followers: "78K", tier: "Micro", status: "Posted", score: 85, engagement: "8.1%" },
];

const outreachTemplates = [
  { id: 1, name: "Initial DM", type: "DM", uses: 89, response: "38%" },
  { id: 2, name: "Follow-up DM", type: "DM", uses: 54, response: "24%" },
  { id: 3, name: "Partnership Email", type: "Email", uses: 67, response: "31%" },
  { id: 4, name: "Sample Offer", type: "Email", uses: 34, response: "45%" },
];

const sampleShipments = [
  { id: 1, influencer: "Alex Tech", address: "Los Angeles, CA", status: "Delivered", tracking: "1Z999AA10123456784", date: "Nov 28" },
  { id: 2, influencer: "Sarah Gadgets", address: "New York, NY", status: "In Transit", tracking: "1Z999AA10123456785", date: "Dec 1" },
  { id: 3, influencer: "Lisa Lifestyle", address: "Miami, FL", status: "Shipped", tracking: "1Z999AA10123456786", date: "Dec 3" },
  { id: 4, influencer: "Dan Drinks", address: "Chicago, IL", status: "Pending", tracking: "-", date: "Dec 5" },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Posted": return "bg-success/20 text-success border-success/30";
    case "Partner": return "bg-primary/20 text-primary border-primary/30";
    case "Responded": return "bg-purple-500/20 text-purple-400 border-purple-500/30";
    case "Outreach": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    case "Discovered": return "bg-muted text-muted-foreground border-muted";
    default: return "bg-muted text-muted-foreground border-muted";
  }
};

const getTierColor = (tier: string) => {
  switch (tier) {
    case "Macro": return "bg-warning/20 text-warning border-warning/30";
    case "Mid": return "bg-secondary/20 text-secondary border-secondary/30";
    case "Micro": return "bg-cyan-500/20 text-cyan-400 border-cyan-500/30";
    default: return "bg-muted text-muted-foreground border-muted";
  }
};

const getShipmentStatusColor = (status: string) => {
  switch (status) {
    case "Delivered": return "bg-success/20 text-success";
    case "In Transit": return "bg-primary/20 text-primary";
    case "Shipped": return "bg-blue-500/20 text-blue-400";
    case "Pending": return "bg-warning/20 text-warning";
    default: return "bg-muted text-muted-foreground";
  }
};

export default function Influencers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [platformFilter, setPlatformFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const conversionRate = ((12 / 147) * 100).toFixed(1);

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
            <h1 className="text-3xl font-mono font-bold text-foreground">Influencer Hub</h1>
            <p className="text-muted-foreground mt-1">Manage partnerships and outreach campaigns</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Upload className="w-4 h-4 mr-2" />
              Import
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              <Send className="w-4 h-4 mr-2" />
              Bulk Outreach
            </Button>
          </div>
        </motion.div>

        {/* Pipeline Funnel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="glass-card border-white/10">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-mono">Partnership Pipeline</CardTitle>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-muted-foreground">Conversion Rate:</span>
                  <span className="text-primary font-mono font-bold">{conversionRate}%</span>
                  <span className="text-muted-foreground">|</span>
                  <span className="text-muted-foreground">Target: 15 partnerships</span>
                  <Badge variant="outline" className="border-success/30 text-success">
                    12/15
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                {pipelineStages.map((stage, index) => (
                  <div key={stage.name} className="flex items-center flex-1">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                      className={`flex-1 p-4 rounded-lg border ${stage.borderColor} bg-gradient-to-b ${stage.color} text-center`}
                    >
                      <div className="text-2xl font-mono font-bold text-foreground">{stage.count}</div>
                      <div className="text-xs text-muted-foreground mt-1">{stage.name}</div>
                    </motion.div>
                    {index < pipelineStages.length - 1 && (
                      <div className="text-muted-foreground/50 px-1">→</div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Influencer Database */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="glass-card border-white/10">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-mono flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Influencer Database
                </CardTitle>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search influencers..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 w-64 bg-background/50"
                    />
                  </div>
                  <Select value={platformFilter} onValueChange={setPlatformFilter}>
                    <SelectTrigger className="w-32 bg-background/50">
                      <SelectValue placeholder="Platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Platforms</SelectItem>
                      <SelectItem value="tiktok">TikTok</SelectItem>
                      <SelectItem value="instagram">Instagram</SelectItem>
                      <SelectItem value="youtube">YouTube</SelectItem>
                      <SelectItem value="x">X</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-32 bg-background/50">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="discovered">Discovered</SelectItem>
                      <SelectItem value="outreach">Outreach</SelectItem>
                      <SelectItem value="responded">Responded</SelectItem>
                      <SelectItem value="partner">Partner</SelectItem>
                      <SelectItem value="posted">Posted</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-white/10 hover:bg-transparent">
                    <TableHead className="text-muted-foreground">Name</TableHead>
                    <TableHead className="text-muted-foreground">Platform</TableHead>
                    <TableHead className="text-muted-foreground">Followers</TableHead>
                    <TableHead className="text-muted-foreground">Tier</TableHead>
                    <TableHead className="text-muted-foreground">Status</TableHead>
                    <TableHead className="text-muted-foreground">Engagement</TableHead>
                    <TableHead className="text-muted-foreground">Score</TableHead>
                    <TableHead className="text-muted-foreground text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {influencers.map((influencer, index) => (
                    <motion.tr
                      key={influencer.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.03 }}
                      className="border-white/5 hover:bg-white/5"
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center text-xs font-mono">
                            {influencer.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-medium text-foreground">{influencer.name}</div>
                            <div className="text-xs text-muted-foreground">{influencer.handle}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-white/10">
                          {influencer.platform}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-mono text-foreground">{influencer.followers}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getTierColor(influencer.tier)}>
                          {influencer.tier}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getStatusColor(influencer.status)}>
                          {influencer.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-mono text-success">{influencer.engagement}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-12 h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                              style={{ width: `${influencer.score}%` }}
                            />
                          </div>
                          <span className="text-xs font-mono text-foreground">{influencer.score}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/10">
                            <MessageSquare className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/10">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/10">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>

        {/* Bottom Grid: Templates & Shipments */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Outreach Templates */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="glass-card border-white/10 h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-mono flex items-center gap-2">
                    <Mail className="w-5 h-5 text-primary" />
                    Outreach Templates
                  </CardTitle>
                  <Button variant="outline" size="sm">
                    + New Template
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {outreachTemplates.map((template, index) => (
                  <motion.div
                    key={template.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                    className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10 hover:border-primary/30 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${template.type === 'DM' ? 'bg-purple-500/20' : 'bg-blue-500/20'}`}>
                        {template.type === 'DM' ? (
                          <MessageSquare className="w-4 h-4 text-purple-400" />
                        ) : (
                          <Mail className="w-4 h-4 text-blue-400" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{template.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {template.uses} uses • {template.response} response rate
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="border-white/10">
                        {template.type}
                      </Badge>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Sample Shipments */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="glass-card border-white/10 h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-mono flex items-center gap-2">
                    <Package className="w-5 h-5 text-secondary" />
                    Sample Shipments
                  </CardTitle>
                  <Button variant="outline" size="sm">
                    + New Shipment
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {sampleShipments.map((shipment, index) => (
                  <motion.div
                    key={shipment.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.05 }}
                    className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-secondary/30 to-warning/30 flex items-center justify-center text-xs font-mono">
                        {shipment.influencer.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{shipment.influencer}</div>
                        <div className="text-xs text-muted-foreground">{shipment.address}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <Badge className={getShipmentStatusColor(shipment.status)}>
                          {shipment.status}
                        </Badge>
                        <div className="text-xs text-muted-foreground mt-1">{shipment.date}</div>
                      </div>
                      {shipment.tracking !== "-" && (
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Performance Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { label: "Total Reach", value: "2.4M", icon: TrendingUp, color: "text-primary" },
            { label: "Avg. Engagement", value: "5.6%", icon: Star, color: "text-warning" },
            { label: "Content Posted", value: "12", icon: Share2, color: "text-success" },
            { label: "Partnerships", value: "18", icon: UserCheck, color: "text-secondary" },
          ].map((stat, index) => (
            <Card key={stat.label} className="glass-card border-white/10">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-mono font-bold text-foreground mt-1">{stat.value}</p>
                  </div>
                  <stat.icon className={`w-8 h-8 ${stat.color} opacity-50`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </div>
    </AppLayout>
  );
}

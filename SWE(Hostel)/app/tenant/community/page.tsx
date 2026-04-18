"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  MessageSquare, 
  ThumbsUp, 
  Plus,
  AlertTriangle,
  Clock,
  CheckCircle2,
  XCircle,
  Send,
  MessageCircle,
  Users,
  Megaphone
} from "lucide-react"
import { mockUsers, mockComplaints, mockDiscussionPosts } from "@/lib/mock-data"
import { formatDate } from "@/lib/utils"
import { ComplaintStatus } from "@/lib/types"

// Current tenant (mock - would come from auth)
const currentUser = mockUsers.find(u => u.id === "user-1")!
const userComplaints = mockComplaints.filter(c => c.userId === currentUser.id)

const complaintCategories = [
  "Maintenance",
  "Cleanliness",
  "Noise",
  "Security",
  "Food Quality",
  "Staff Behavior",
  "Facilities",
  "Other"
]

export default function CommunityPage() {
  const [selectedTab, setSelectedTab] = useState("discussions")
  const [newPostContent, setNewPostContent] = useState("")
  const [complaintDialogOpen, setComplaintDialogOpen] = useState(false)

  const getStatusBadge = (status: ComplaintStatus) => {
    switch (status) {
      case ComplaintStatus.RESOLVED:
        return (
          <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Resolved
          </Badge>
        )
      case ComplaintStatus.PENDING:
        return (
          <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        )
      case ComplaintStatus.IN_PROGRESS:
        return (
          <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/20">
            <MessageCircle className="h-3 w-3 mr-1" />
            In Progress
          </Badge>
        )
      case ComplaintStatus.REJECTED:
        return (
          <Badge variant="destructive">
            <XCircle className="h-3 w-3 mr-1" />
            Rejected
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getUserById = (userId: string) => mockUsers.find(u => u.id === userId)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Community</h1>
          <p className="text-muted-foreground">Connect with fellow residents and raise concerns</p>
        </div>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="discussions" className="gap-2">
            <MessageSquare className="h-4 w-4" />
            Discussions
          </TabsTrigger>
          <TabsTrigger value="complaints" className="gap-2">
            <AlertTriangle className="h-4 w-4" />
            My Complaints
          </TabsTrigger>
        </TabsList>

        <TabsContent value="discussions" className="space-y-6 mt-6">
          {/* New Post */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Share with the community</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Textarea 
                placeholder="What's on your mind? Share updates, ask questions, or start a discussion..."
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                className="min-h-[80px]"
              />
              <div className="flex justify-end">
                <Button className="gap-2" disabled={!newPostContent.trim()}>
                  <Send className="h-4 w-4" />
                  Post
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Discussion Posts */}
          <div className="space-y-4">
            {mockDiscussionPosts.map((post) => {
              const author = getUserById(post.authorId)
              return (
                <Card key={post.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={author?.avatarUrl} />
                        <AvatarFallback>{author?.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold">{author?.name}</p>
                          {post.isPinned && (
                            <Badge variant="secondary" className="text-xs">
                              <Megaphone className="h-3 w-3 mr-1" />
                              Pinned
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">{formatDate(post.createdAt)}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm whitespace-pre-wrap">{post.content}</p>
                  </CardContent>
                  <CardFooter className="border-t pt-3">
                    <div className="flex items-center gap-4">
                      <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
                        <ThumbsUp className="h-4 w-4" />
                        {post.likes}
                      </Button>
                      <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
                        <MessageCircle className="h-4 w-4" />
                        {post.comments.length} Comments
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="complaints" className="space-y-6 mt-6">
          <div className="flex justify-end">
            <Dialog open={complaintDialogOpen} onOpenChange={setComplaintDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  New Complaint
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Submit a Complaint</DialogTitle>
                  <DialogDescription>
                    Describe your issue and we&apos;ll look into it promptly
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {complaintCategories.map((cat) => (
                          <SelectItem key={cat} value={cat.toLowerCase()}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" placeholder="Brief summary of the issue" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea 
                      id="description" 
                      placeholder="Provide details about your complaint..."
                      className="min-h-[100px]"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setComplaintDialogOpen(false)}>Cancel</Button>
                  <Button className="gap-2" onClick={() => setComplaintDialogOpen(false)}>
                    <Send className="h-4 w-4" />
                    Submit
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Complaints Summary */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                    <AlertTriangle className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total</p>
                    <p className="text-xl font-bold">{userComplaints.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10">
                    <Clock className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Pending</p>
                    <p className="text-xl font-bold">
                      {userComplaints.filter(c => c.status === ComplaintStatus.PENDING).length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                    <MessageCircle className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">In Progress</p>
                    <p className="text-xl font-bold">
                      {userComplaints.filter(c => c.status === ComplaintStatus.IN_PROGRESS).length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Resolved</p>
                    <p className="text-xl font-bold">
                      {userComplaints.filter(c => c.status === ComplaintStatus.RESOLVED).length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Complaints List */}
          <div className="space-y-4">
            {userComplaints.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <CheckCircle2 className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="font-semibold">No Complaints</h3>
                  <p className="text-sm text-muted-foreground">You haven&apos;t submitted any complaints yet</p>
                </CardContent>
              </Card>
            ) : (
              userComplaints.map((complaint) => (
                <Card key={complaint.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-base">{complaint.title}</CardTitle>
                        <CardDescription className="mt-1">
                          {complaint.category} - Submitted {formatDate(complaint.createdAt)}
                        </CardDescription>
                      </div>
                      {getStatusBadge(complaint.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{complaint.description}</p>
                    {complaint.adminResponse && (
                      <div className="mt-4 p-3 rounded-lg bg-muted">
                        <p className="text-xs font-medium text-muted-foreground mb-1">Admin Response:</p>
                        <p className="text-sm">{complaint.adminResponse}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

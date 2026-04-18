"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  AlertTriangle, 
  Search, 
  Clock,
  CheckCircle2,
  XCircle,
  MessageCircle,
  Eye,
  Send,
  Filter
} from "lucide-react"
import { mockComplaints, mockUsers } from "@/lib/mock-data"
import { formatDate } from "@/lib/utils"
import { ComplaintStatus } from "@/lib/types"

export default function ComplaintsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [selectedComplaint, setSelectedComplaint] = useState<typeof mockComplaints[0] | null>(null)
  const [responseDialogOpen, setResponseDialogOpen] = useState(false)

  const categories = [...new Set(mockComplaints.map(c => c.category))]

  const filteredComplaints = mockComplaints.filter(complaint => {
    const user = mockUsers.find(u => u.id === complaint.userId)
    const matchesSearch = 
      complaint.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user?.name.toLowerCase().includes(searchQuery.toLowerCase()) || false
    const matchesStatus = statusFilter === "all" || complaint.status === statusFilter
    const matchesCategory = categoryFilter === "all" || complaint.category === categoryFilter
    return matchesSearch && matchesStatus && matchesCategory
  })

  const stats = {
    total: mockComplaints.length,
    pending: mockComplaints.filter(c => c.status === ComplaintStatus.PENDING).length,
    inProgress: mockComplaints.filter(c => c.status === ComplaintStatus.IN_PROGRESS).length,
    resolved: mockComplaints.filter(c => c.status === ComplaintStatus.RESOLVED).length,
  }

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

  const handleRespond = (complaint: typeof mockComplaints[0]) => {
    setSelectedComplaint(complaint)
    setResponseDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Complaints</h1>
        <p className="text-muted-foreground">Manage and resolve tenant complaints</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <AlertTriangle className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-xl font-bold">{stats.total}</p>
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
                <p className="text-xl font-bold">{stats.pending}</p>
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
                <p className="text-xl font-bold">{stats.inProgress}</p>
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
                <p className="text-xl font-bold">{stats.resolved}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by title or tenant name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="PENDING">Pending</SelectItem>
                <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                <SelectItem value="RESOLVED">Resolved</SelectItem>
                <SelectItem value="REJECTED">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Complaints Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Complaints</CardTitle>
          <CardDescription>View and manage tenant complaints</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Tenant</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredComplaints.map((complaint) => {
                const user = getUserById(complaint.userId)
                return (
                  <TableRow key={complaint.id}>
                    <TableCell>{formatDate(complaint.createdAt)}</TableCell>
                    <TableCell className="font-medium">{user?.name}</TableCell>
                    <TableCell>
                      <div className="max-w-[200px]">
                        <p className="font-medium truncate">{complaint.title}</p>
                        <p className="text-xs text-muted-foreground truncate">{complaint.description}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{complaint.category}</Badge>
                    </TableCell>
                    <TableCell>{getStatusBadge(complaint.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="h-8 gap-1"
                          onClick={() => handleRespond(complaint)}
                        >
                          <Eye className="h-3.5 w-3.5" />
                          View
                        </Button>
                        {complaint.status !== ComplaintStatus.RESOLVED && (
                          <Button 
                            size="sm" 
                            className="h-8 gap-1"
                            onClick={() => handleRespond(complaint)}
                          >
                            <Send className="h-3.5 w-3.5" />
                            Respond
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Response Dialog */}
      <Dialog open={responseDialogOpen} onOpenChange={setResponseDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Complaint Details</DialogTitle>
            <DialogDescription>
              Review and respond to this complaint
            </DialogDescription>
          </DialogHeader>
          {selectedComplaint && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-muted-foreground">Submitted by</Label>
                  <span className="font-medium">{getUserById(selectedComplaint.userId)?.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-muted-foreground">Date</Label>
                  <span>{formatDate(selectedComplaint.createdAt)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-muted-foreground">Category</Label>
                  <Badge variant="outline">{selectedComplaint.category}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-muted-foreground">Status</Label>
                  {getStatusBadge(selectedComplaint.status)}
                </div>
              </div>

              <div className="space-y-2 border-t pt-4">
                <Label>Title</Label>
                <p className="font-medium">{selectedComplaint.title}</p>
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <p className="text-sm text-muted-foreground">{selectedComplaint.description}</p>
              </div>

              {selectedComplaint.adminResponse && (
                <div className="space-y-2 border-t pt-4">
                  <Label>Previous Response</Label>
                  <p className="text-sm bg-muted p-3 rounded-lg">{selectedComplaint.adminResponse}</p>
                </div>
              )}

              <div className="space-y-2 border-t pt-4">
                <Label htmlFor="response">Your Response</Label>
                <Textarea 
                  id="response" 
                  placeholder="Type your response to the tenant..."
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Update Status</Label>
                <Select defaultValue={selectedComplaint.status}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PENDING">Pending</SelectItem>
                    <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                    <SelectItem value="RESOLVED">Resolved</SelectItem>
                    <SelectItem value="REJECTED">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setResponseDialogOpen(false)}>Cancel</Button>
            <Button onClick={() => setResponseDialogOpen(false)} className="gap-2">
              <Send className="h-4 w-4" />
              Send Response
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

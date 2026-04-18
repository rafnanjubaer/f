"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { 
  Building2, 
  Plus, 
  Search, 
  MoreHorizontal,
  Bed,
  Users,
  DollarSign,
  Edit,
  Trash2,
  Eye,
  UserPlus,
  CheckCircle2,
  XCircle,
  Wrench
} from "lucide-react"
import { mockRooms, mockRoomAllocations, mockUsers } from "@/lib/mock-data"
import { formatCurrency } from "@/lib/utils"
import { RoomStatus, RoomType, UserRole } from "@/lib/types"

export default function RoomsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [floorFilter, setFloorFilter] = useState<string>("all")
  const [addRoomDialogOpen, setAddRoomDialogOpen] = useState(false)

  const filteredRooms = mockRooms.filter(room => {
    const matchesSearch = room.roomNumber.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || room.status === statusFilter
    const matchesFloor = floorFilter === "all" || room.floor.toString() === floorFilter
    return matchesSearch && matchesStatus && matchesFloor
  })

  const totalCapacity = mockRooms.reduce((sum, r) => sum + r.capacity, 0)
  const totalOccupied = mockRooms.reduce((sum, r) => sum + r.currentOccupancy, 0)
  const occupancyRate = (totalOccupied / totalCapacity) * 100

  const availableRooms = mockRooms.filter(r => r.status === RoomStatus.AVAILABLE).length
  const occupiedRooms = mockRooms.filter(r => r.status === RoomStatus.OCCUPIED).length
  const maintenanceRooms = mockRooms.filter(r => r.status === RoomStatus.MAINTENANCE).length

  const floors = [...new Set(mockRooms.map(r => r.floor))].sort()

  const getRoomOccupants = (roomId: string) => {
    const allocations = mockRoomAllocations.filter(a => a.roomId === roomId && a.isActive)
    return allocations.map(a => mockUsers.find(u => u.id === a.userId)).filter(Boolean)
  }

  const getStatusBadge = (status: RoomStatus) => {
    switch (status) {
      case RoomStatus.AVAILABLE:
        return <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">Available</Badge>
      case RoomStatus.OCCUPIED:
        return <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/20">Occupied</Badge>
      case RoomStatus.MAINTENANCE:
        return <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20">Maintenance</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Room Management</h1>
          <p className="text-muted-foreground">Manage rooms and allocations</p>
        </div>
        <Dialog open={addRoomDialogOpen} onOpenChange={setAddRoomDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Room
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Room</DialogTitle>
              <DialogDescription>
                Create a new room in the hostel
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="roomNumber">Room Number</Label>
                  <Input id="roomNumber" placeholder="101" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="floor">Floor</Label>
                  <Input id="floor" type="number" placeholder="1" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Room Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SINGLE">Single</SelectItem>
                    <SelectItem value="DOUBLE">Double</SelectItem>
                    <SelectItem value="TRIPLE">Triple</SelectItem>
                    <SelectItem value="DORMITORY">Dormitory</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="capacity">Capacity</Label>
                  <Input id="capacity" type="number" placeholder="2" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rent">Monthly Rent</Label>
                  <Input id="rent" type="number" placeholder="8000" />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setAddRoomDialogOpen(false)}>Cancel</Button>
              <Button onClick={() => setAddRoomDialogOpen(false)}>Create Room</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Building2 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Rooms</p>
                <p className="text-xl font-bold">{mockRooms.length}</p>
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
                <p className="text-sm text-muted-foreground">Available</p>
                <p className="text-xl font-bold">{availableRooms}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Occupied</p>
                <p className="text-xl font-bold">{occupiedRooms}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10">
                <Wrench className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Maintenance</p>
                <p className="text-xl font-bold">{maintenanceRooms}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Occupancy</p>
                <p className="text-sm font-medium">{Math.round(occupancyRate)}%</p>
              </div>
              <Progress value={occupancyRate} className="h-2" />
              <p className="text-xs text-muted-foreground">{totalOccupied}/{totalCapacity} beds</p>
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
                placeholder="Search by room number..."
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
                <SelectItem value="AVAILABLE">Available</SelectItem>
                <SelectItem value="OCCUPIED">Occupied</SelectItem>
                <SelectItem value="MAINTENANCE">Maintenance</SelectItem>
              </SelectContent>
            </Select>
            <Select value={floorFilter} onValueChange={setFloorFilter}>
              <SelectTrigger className="w-full sm:w-32">
                <SelectValue placeholder="Floor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Floors</SelectItem>
                {floors.map((floor) => (
                  <SelectItem key={floor} value={floor.toString()}>Floor {floor}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Rooms Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Rooms</CardTitle>
          <CardDescription>A list of all rooms in the hostel</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Room</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Occupancy</TableHead>
                <TableHead>Rent</TableHead>
                <TableHead>Occupants</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRooms.map((room) => {
                const occupants = getRoomOccupants(room.id)
                const occupancyPercent = (room.currentOccupancy / room.capacity) * 100
                return (
                  <TableRow key={room.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                          <Building2 className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium">Room {room.roomNumber}</p>
                          <p className="text-xs text-muted-foreground">Floor {room.floor}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="capitalize">{room.type.toLowerCase()}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <Bed className="h-3.5 w-3.5 text-muted-foreground" />
                          <span className="text-sm">{room.currentOccupancy}/{room.capacity}</span>
                        </div>
                        <Progress value={occupancyPercent} className="h-1.5 w-16" />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{formatCurrency(room.rentAmount)}</TableCell>
                    <TableCell>
                      {occupants.length > 0 ? (
                        <div className="flex -space-x-2">
                          {occupants.slice(0, 3).map((user, i) => (
                            <div
                              key={i}
                              className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-background bg-muted text-xs font-medium"
                              title={user?.name}
                            >
                              {user?.name.split(" ").map(n => n[0]).join("")}
                            </div>
                          ))}
                          {occupants.length > 3 && (
                            <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-background bg-muted text-xs font-medium">
                              +{occupants.length - 3}
                            </div>
                          )}
                        </div>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>{getStatusBadge(room.status)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Room
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <UserPlus className="h-4 w-4 mr-2" />
                            Assign Tenant
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Wrench className="h-4 w-4 mr-2" />
                            Set Maintenance
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete Room
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

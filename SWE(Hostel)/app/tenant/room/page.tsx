"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { 
  Building2, 
  Bed, 
  Users, 
  Calendar, 
  Wifi, 
  Fan,
  Lightbulb,
  Droplets,
  CreditCard,
  Clock,
  CheckCircle2,
  AlertCircle,
  Download,
  Receipt
} from "lucide-react"
import { mockUsers, mockRooms, mockRoomAllocations, mockRentHistory } from "@/lib/mock-data"
import { formatCurrency, formatDate } from "@/lib/utils"
import { RentStatus } from "@/lib/types"

// Current tenant (mock - would come from auth)
const currentUser = mockUsers.find(u => u.id === "user-1")!
const currentAllocation = mockRoomAllocations.find(a => a.userId === currentUser.id && a.isActive)
const currentRoom = currentAllocation ? mockRooms.find(r => r.id === currentAllocation.roomId) : null
const userRentHistory = mockRentHistory.filter(r => r.userId === currentUser.id)

const amenities = [
  { name: "WiFi", icon: Wifi, available: true },
  { name: "AC", icon: Fan, available: true },
  { name: "Lighting", icon: Lightbulb, available: true },
  { name: "Water", icon: Droplets, available: true },
]

export default function RoomPage() {
  const [selectedTab, setSelectedTab] = useState("details")

  const getStatusBadge = (status: RentStatus) => {
    switch (status) {
      case RentStatus.PAID:
        return <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">Paid</Badge>
      case RentStatus.PENDING:
        return <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20">Pending</Badge>
      case RentStatus.OVERDUE:
        return <Badge variant="destructive">Overdue</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  if (!currentRoom || !currentAllocation) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Building2 className="h-16 w-16 text-muted-foreground" />
        <h2 className="text-xl font-semibold">No Room Assigned</h2>
        <p className="text-muted-foreground">You haven&apos;t been assigned a room yet. Please contact the admin.</p>
      </div>
    )
  }

  const occupancyPercentage = (currentRoom.currentOccupancy / currentRoom.capacity) * 100

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">My Room</h1>
        <p className="text-muted-foreground">View your room details and rent history</p>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="details">Room Details</TabsTrigger>
          <TabsTrigger value="rent">Rent History</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-6 mt-6">
          {/* Room Overview */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Room {currentRoom.roomNumber}
                </CardTitle>
                <CardDescription>Floor {currentRoom.floor} - {currentRoom.type} Room</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Room Type</p>
                    <p className="font-medium capitalize">{currentRoom.type.toLowerCase()}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Monthly Rent</p>
                    <p className="font-medium">{formatCurrency(currentRoom.rentAmount)}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Check-in Date</p>
                    <p className="font-medium">{formatDate(currentAllocation.startDate)}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Status</p>
                    <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
                      Active
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Occupancy
                </CardTitle>
                <CardDescription>Current room occupancy status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bed className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      {currentRoom.currentOccupancy} of {currentRoom.capacity} beds occupied
                    </span>
                  </div>
                  <span className="text-sm font-medium">{Math.round(occupancyPercentage)}%</span>
                </div>
                <Progress value={occupancyPercentage} className="h-2" />
                <div className="flex gap-2 flex-wrap">
                  {Array.from({ length: currentRoom.capacity }).map((_, i) => (
                    <div
                      key={i}
                      className={`flex items-center justify-center w-10 h-10 rounded-lg border ${
                        i < currentRoom.currentOccupancy
                          ? "bg-primary/10 border-primary text-primary"
                          : "bg-muted border-muted-foreground/20 text-muted-foreground"
                      }`}
                    >
                      <Bed className="h-4 w-4" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Amenities */}
          <Card>
            <CardHeader>
              <CardTitle>Room Amenities</CardTitle>
              <CardDescription>Facilities available in your room</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {amenities.map((amenity) => (
                  <div
                    key={amenity.name}
                    className={`flex items-center gap-3 p-4 rounded-lg border ${
                      amenity.available
                        ? "bg-emerald-500/5 border-emerald-500/20"
                        : "bg-muted border-muted-foreground/20 opacity-50"
                    }`}
                  >
                    <amenity.icon className={`h-5 w-5 ${amenity.available ? "text-emerald-600" : "text-muted-foreground"}`} />
                    <div>
                      <p className="font-medium text-sm">{amenity.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {amenity.available ? "Available" : "Not Available"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Next Payment Due */}
          <Card className="border-amber-500/20 bg-amber-500/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-amber-600">
                <Clock className="h-5 w-5" />
                Next Payment Due
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <p className="text-2xl font-bold">{formatCurrency(currentRoom.rentAmount)}</p>
                  <p className="text-sm text-muted-foreground">
                    Due by May 5, 2025
                  </p>
                </div>
                <Button className="gap-2">
                  <CreditCard className="h-4 w-4" />
                  Pay Now
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rent" className="space-y-6 mt-6">
          {/* Rent Summary */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Paid</p>
                    <p className="text-xl font-bold">
                      {formatCurrency(
                        userRentHistory
                          .filter(r => r.status === RentStatus.PAID)
                          .reduce((sum, r) => sum + r.amount, 0)
                      )}
                    </p>
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
                      {formatCurrency(
                        userRentHistory
                          .filter(r => r.status === RentStatus.PENDING)
                          .reduce((sum, r) => sum + r.amount, 0)
                      )}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-rose-500/10">
                    <AlertCircle className="h-5 w-5 text-rose-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Overdue</p>
                    <p className="text-xl font-bold">
                      {formatCurrency(
                        userRentHistory
                          .filter(r => r.status === RentStatus.OVERDUE)
                          .reduce((sum, r) => sum + r.amount, 0)
                      )}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Rent History Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Payment History
              </CardTitle>
              <CardDescription>Your rent payment records</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Month</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Paid Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userRentHistory.map((rent) => (
                    <TableRow key={rent.id}>
                      <TableCell className="font-medium">{rent.month}</TableCell>
                      <TableCell>{formatCurrency(rent.amount)}</TableCell>
                      <TableCell>{formatDate(rent.dueDate)}</TableCell>
                      <TableCell>
                        {rent.paidDate ? formatDate(rent.paidDate) : "-"}
                      </TableCell>
                      <TableCell>{getStatusBadge(rent.status)}</TableCell>
                      <TableCell className="text-right">
                        {rent.status === RentStatus.PAID ? (
                          <Button variant="ghost" size="sm" className="gap-1">
                            <Download className="h-3 w-3" />
                            Receipt
                          </Button>
                        ) : (
                          <Button variant="outline" size="sm" className="gap-1">
                            <Receipt className="h-3 w-3" />
                            Pay Now
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

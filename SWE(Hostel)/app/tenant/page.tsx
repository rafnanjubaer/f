"use client";

import { 
  BedDouble, 
  Wallet, 
  UtensilsCrossed, 
  AlertCircle,
  Calendar,
  Clock,
  ChevronRight
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  currentUser, 
  getUserRoom, 
  getRentDue, 
  getTodayMenu,
  mockComplaints,
  mockMealTimings
} from "@/lib/mock-data";
import { ComplaintStatus, MealType } from "@/lib/types";

export default function TenantDashboard() {
  const room = getUserRoom(currentUser.id);
  const rentDue = getRentDue(currentUser.id);
  const todayMenus = getTodayMenu();
  const userComplaints = mockComplaints.filter(c => c.userId === currentUser.id);
  const pendingComplaints = userComplaints.filter(c => 
    c.status === ComplaintStatus.PENDING || c.status === ComplaintStatus.IN_PROGRESS
  ).length;

  // Get current meal based on time
  const getCurrentMeal = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const currentTime = hours * 60 + minutes;

    for (const timing of mockMealTimings) {
      const [startH, startM] = timing.startTime.split(":").map(Number);
      const [endH, endM] = timing.endTime.split(":").map(Number);
      const start = startH * 60 + startM;
      const end = endH * 60 + endM;
      
      if (currentTime >= start && currentTime <= end) {
        return timing.mealType;
      }
    }
    return null;
  };

  const currentMealType = getCurrentMeal();
  const currentMealMenu = todayMenus.find(m => m.mealType === currentMealType);

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":");
    const h = parseInt(hours);
    const ampm = h >= 12 ? "PM" : "AM";
    const hour12 = h % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-2xl font-bold md:text-3xl">
          Welcome back, {currentUser.name.split(" ")[0]}!
        </h1>
        <p className="text-muted-foreground">
          Here&apos;s an overview of your hostel account
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Room Info Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Your Room</CardTitle>
            <BedDouble className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Room {room?.roomNumber || "N/A"}</div>
            <p className="text-xs text-muted-foreground">
              {room?.floorName} • {room?.roomType}
            </p>
          </CardContent>
        </Card>

        {/* Rent Due Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Rent Due</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {rentDue ? `৳${rentDue.amount.toLocaleString()}` : "Paid"}
            </div>
            <p className="text-xs text-muted-foreground">
              {rentDue ? `${rentDue.month} ${rentDue.year}` : "All dues cleared"}
            </p>
          </CardContent>
        </Card>

        {/* Meal Tokens Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Meal Tokens</CardTitle>
            <UtensilsCrossed className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5 Active</div>
            <p className="text-xs text-muted-foreground">3 used this week</p>
          </CardContent>
        </Card>

        {/* Complaints Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Open Issues</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingComplaints}</div>
            <p className="text-xs text-muted-foreground">
              {pendingComplaints > 0 ? "Pending resolution" : "No open issues"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Today's Menu */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Today&apos;s Menu
                </CardTitle>
                <CardDescription>
                  {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
                </CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/tenant/meals">View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {todayMenus.length > 0 ? (
              todayMenus.map((menu) => {
                const timing = mockMealTimings.find(t => t.mealType === menu.mealType);
                const isCurrentMeal = menu.mealType === currentMealType;
                
                return (
                  <div
                    key={menu.id}
                    className={`rounded-lg border p-4 ${isCurrentMeal ? "border-primary bg-primary/5" : ""}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold capitalize">{menu.mealType.toLowerCase()}</span>
                        {isCurrentMeal && (
                          <Badge variant="default" className="text-xs">Now Serving</Badge>
                        )}
                      </div>
                      {timing && (
                        <span className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {formatTime(timing.startTime)} - {formatTime(timing.endTime)}
                        </span>
                      )}
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {menu.items.map((item) => (
                        <Badge key={item.id} variant="secondary">
                          {item.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-center text-muted-foreground py-4">
                No menu available for today
              </p>
            )}
          </CardContent>
        </Card>

        {/* Room & Rent Summary */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Room & Rent Details</CardTitle>
                <CardDescription>Your current accommodation info</CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/tenant/room">Details</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {room ? (
              <>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Room Number</span>
                    <span className="font-medium">{room.roomNumber}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Floor</span>
                    <span className="font-medium">{room.floorName}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Room Type</span>
                    <Badge variant="outline">{room.roomType}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Monthly Rent</span>
                    <span className="font-bold text-lg">৳{room.rentAmount.toLocaleString()}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Amenities</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {room.amenities.map((amenity) => (
                      <Badge key={amenity} variant="secondary">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>

                {rentDue && (
                  <div className="rounded-lg border border-destructive/20 bg-destructive/10 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-destructive">Payment Due</p>
                        <p className="text-sm text-muted-foreground">
                          {rentDue.month} {rentDue.year}
                        </p>
                      </div>
                      <Button asChild>
                        <Link href="/tenant/payments">Pay Now</Link>
                      </Button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <p className="text-center text-muted-foreground py-4">
                No room assigned yet
              </p>
            )}
          </CardContent>
        </Card>

        {/* Recent Complaints */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Complaints</CardTitle>
                <CardDescription>Track the status of your submitted issues</CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/tenant/community">View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {userComplaints.length > 0 ? (
              <div className="space-y-4">
                {userComplaints.slice(0, 3).map((complaint) => (
                  <div
                    key={complaint.id}
                    className="flex items-center justify-between rounded-lg border p-4"
                  >
                    <div className="space-y-1">
                      <p className="font-medium">{complaint.title}</p>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {complaint.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge
                        variant={
                          complaint.status === ComplaintStatus.RESOLVED
                            ? "default"
                            : complaint.status === ComplaintStatus.IN_PROGRESS
                            ? "secondary"
                            : complaint.status === ComplaintStatus.REJECTED
                            ? "destructive"
                            : "outline"
                        }
                      >
                        {complaint.status.replace("_", " ")}
                      </Badge>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">
                No complaints submitted yet
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

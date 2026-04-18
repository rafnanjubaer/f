"use client";

import {
  Users,
  BedDouble,
  Wallet,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  CheckCircle2,
  XCircle,
  Clock,
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  adminDashboardStats,
  mockUsers,
  mockTransactions,
  mockComplaints,
  mockRooms,
} from "@/lib/mock-data";
import { ComplaintStatus, TransactionType, UserRole, RoomStatus } from "@/lib/types";

export default function AdminDashboard() {
  const recentTransactions = mockTransactions.slice(0, 5);
  const pendingComplaints = mockComplaints.filter(
    (c) => c.status === ComplaintStatus.PENDING
  );
  const unverifiedUsers = mockUsers.filter(
    (u) => u.role === UserRole.TENANT && !u.isVerified
  );

  const occupancyRate = Math.round(
    (adminDashboardStats.occupiedRooms / adminDashboardStats.totalRooms) * 100
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold md:text-3xl">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of hostel operations and management
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Users */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Tenants</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{adminDashboardStats.totalUsers}</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <span className="flex items-center text-green-600">
                <ArrowUpRight className="h-3 w-3" />
                {adminDashboardStats.verifiedUsers} verified
              </span>
              <span>•</span>
              <span className="text-amber-600">
                {adminDashboardStats.totalUsers - adminDashboardStats.verifiedUsers} pending
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Room Occupancy */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Room Occupancy</CardTitle>
            <BedDouble className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {adminDashboardStats.occupiedRooms}/{adminDashboardStats.totalRooms}
            </div>
            <Progress value={occupancyRate} className="mt-2 h-2" />
            <p className="mt-1 text-xs text-muted-foreground">{occupancyRate}% occupied</p>
          </CardContent>
        </Card>

        {/* Total Revenue */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ৳{adminDashboardStats.totalRevenue.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="flex items-center gap-1 text-green-600">
                <ArrowUpRight className="h-3 w-3" />
                +12.5% from last month
              </span>
            </p>
          </CardContent>
        </Card>

        {/* Pending Complaints */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Issues</CardTitle>
            <AlertCircle className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {adminDashboardStats.pendingComplaints}
            </div>
            <p className="text-xs text-muted-foreground">
              Requires immediate attention
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Latest financial activities</CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/admin/financials">View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.map((txn) => (
                <div key={txn.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full ${
                        txn.type === TransactionType.CREDIT
                          ? "bg-green-100 text-green-600 dark:bg-green-900/30"
                          : "bg-red-100 text-red-600 dark:bg-red-900/30"
                      }`}
                    >
                      {txn.type === TransactionType.CREDIT ? (
                        <TrendingUp className="h-5 w-5" />
                      ) : (
                        <TrendingDown className="h-5 w-5" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{txn.userName}</p>
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {txn.description}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-semibold ${
                        txn.type === TransactionType.CREDIT
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {txn.type === TransactionType.CREDIT ? "+" : "-"}৳
                      {txn.amount.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(txn.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pending Complaints */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Pending Complaints</CardTitle>
                <CardDescription>Issues awaiting resolution</CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/admin/complaints">Manage All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {pendingComplaints.length > 0 ? (
              <div className="space-y-4">
                {pendingComplaints.map((complaint) => (
                  <div
                    key={complaint.id}
                    className="flex items-start justify-between rounded-lg border p-3"
                  >
                    <div className="space-y-1">
                      <p className="font-medium">{complaint.title}</p>
                      <p className="text-sm text-muted-foreground">
                        By {complaint.userName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(complaint.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge variant="outline" className="shrink-0">
                      <Clock className="mr-1 h-3 w-3" />
                      Pending
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <CheckCircle2 className="h-12 w-12 text-green-500" />
                <p className="mt-2 font-medium">All Caught Up!</p>
                <p className="text-sm text-muted-foreground">
                  No pending complaints to review
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Room Status Overview */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Room Status</CardTitle>
                <CardDescription>Current availability overview</CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/admin/rooms">Manage Rooms</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.values(RoomStatus).map((status) => {
                const count = mockRooms.filter((r) => r.status === status).length;
                const percentage = Math.round((count / mockRooms.length) * 100);
                const colorClass =
                  status === RoomStatus.AVAILABLE
                    ? "bg-green-500"
                    : status === RoomStatus.OCCUPIED
                    ? "bg-blue-500"
                    : "bg-amber-500";

                return (
                  <div key={status} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="capitalize">{status.toLowerCase()}</span>
                      <span className="font-medium">
                        {count} rooms ({percentage}%)
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div
                        className={`h-2 rounded-full ${colorClass}`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Users Pending Verification */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Pending Verifications</CardTitle>
                <CardDescription>Users awaiting approval</CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/admin/users">View All Users</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {unverifiedUsers.length > 0 ? (
              <div className="space-y-4">
                {unverifiedUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={user.avatarUrl} />
                        <AvatarFallback>
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <XCircle className="mr-1 h-4 w-4" />
                        Reject
                      </Button>
                      <Button size="sm">
                        <CheckCircle2 className="mr-1 h-4 w-4" />
                        Verify
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <CheckCircle2 className="h-12 w-12 text-green-500" />
                <p className="mt-2 font-medium">All Users Verified!</p>
                <p className="text-sm text-muted-foreground">
                  No pending verification requests
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

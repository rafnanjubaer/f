"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Search,
  Download,
  CheckCircle2,
  Clock,
  XCircle,
  ArrowUpRight,
  ArrowDownLeft,
  CreditCard,
  Wallet,
  Receipt,
  Calendar
} from "lucide-react"
import { mockUsers, mockTransactions, mockPaymentRequests, mockRentHistory, mockDashboardStats } from "@/lib/mock-data"
import { formatCurrency, formatDate } from "@/lib/utils"
import { TransactionType, PaymentRequestStatus, RentStatus } from "@/lib/types"

export default function FinancialsPage() {
  const [selectedTab, setSelectedTab] = useState("overview")
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const stats = mockDashboardStats

  const totalRevenue = mockTransactions
    .filter(t => t.type === TransactionType.CREDIT)
    .reduce((sum, t) => sum + t.amount, 0)

  const pendingPayments = mockPaymentRequests
    .filter(p => p.status === PaymentRequestStatus.PENDING)

  const filteredPaymentRequests = mockPaymentRequests.filter(request => {
    const user = mockUsers.find(u => u.id === request.requesterId)
    const matchesSearch = user?.name.toLowerCase().includes(searchQuery.toLowerCase()) || false
    const matchesStatus = statusFilter === "all" || request.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: PaymentRequestStatus) => {
    switch (status) {
      case PaymentRequestStatus.APPROVED:
        return <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">Approved</Badge>
      case PaymentRequestStatus.PENDING:
        return <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20">Pending</Badge>
      case PaymentRequestStatus.REJECTED:
        return <Badge variant="destructive">Rejected</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getRentStatusBadge = (status: RentStatus) => {
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

  const getUserById = (userId: string) => mockUsers.find(u => u.id === userId)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Financials</h1>
          <p className="text-muted-foreground">Manage payments, transactions, and revenue</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-background border-emerald-500/20">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
                <TrendingUp className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-xl font-bold">{formatCurrency(stats.totalRevenue)}</p>
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
                <p className="text-sm text-muted-foreground">Pending Rent</p>
                <p className="text-xl font-bold">{formatCurrency(stats.pendingRent)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-rose-500/10">
                <TrendingDown className="h-5 w-5 text-rose-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Overdue</p>
                <p className="text-xl font-bold">{formatCurrency(stats.overdueAmount)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                <Receipt className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending Requests</p>
                <p className="text-xl font-bold">{pendingPayments.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="overview">Transactions</TabsTrigger>
          <TabsTrigger value="requests">Payment Requests</TabsTrigger>
          <TabsTrigger value="rent">Rent Collection</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="h-5 w-5" />
                Recent Transactions
              </CardTitle>
              <CardDescription>All wallet transactions across tenants</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockTransactions.map((transaction) => {
                    const user = getUserById(transaction.userId)
                    return (
                      <TableRow key={transaction.id}>
                        <TableCell>{formatDate(transaction.createdAt)}</TableCell>
                        <TableCell className="font-medium">{user?.name}</TableCell>
                        <TableCell>{transaction.description}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {transaction.type === TransactionType.CREDIT ? (
                              <ArrowDownLeft className="h-4 w-4 text-emerald-600" />
                            ) : (
                              <ArrowUpRight className="h-4 w-4 text-rose-600" />
                            )}
                            <span className="capitalize">{transaction.type.toLowerCase()}</span>
                          </div>
                        </TableCell>
                        <TableCell className={`text-right font-medium ${
                          transaction.type === TransactionType.CREDIT ? "text-emerald-600" : "text-rose-600"
                        }`}>
                          {transaction.type === TransactionType.CREDIT ? "+" : "-"}
                          {formatCurrency(transaction.amount)}
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="requests" className="space-y-6 mt-6">
          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search by user name..."
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
                    <SelectItem value="APPROVED">Approved</SelectItem>
                    <SelectItem value="REJECTED">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Requests
              </CardTitle>
              <CardDescription>Verify and approve tenant payment requests</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Reference</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPaymentRequests.map((request) => {
                    const user = getUserById(request.requesterId)
                    return (
                      <TableRow key={request.id}>
                        <TableCell>{formatDate(request.createdAt)}</TableCell>
                        <TableCell className="font-medium">{user?.name}</TableCell>
                        <TableCell className="font-medium">{formatCurrency(request.amount)}</TableCell>
                        <TableCell className="capitalize">{request.paymentMethod.toLowerCase().replace("_", " ")}</TableCell>
                        <TableCell className="font-mono text-sm">{request.transactionReference || "-"}</TableCell>
                        <TableCell>{getStatusBadge(request.status)}</TableCell>
                        <TableCell className="text-right">
                          {request.status === PaymentRequestStatus.PENDING ? (
                            <div className="flex items-center justify-end gap-2">
                              <Button size="sm" variant="outline" className="h-8 gap-1 text-emerald-600 hover:text-emerald-600 hover:bg-emerald-500/10">
                                <CheckCircle2 className="h-3.5 w-3.5" />
                                Approve
                              </Button>
                              <Button size="sm" variant="outline" className="h-8 gap-1 text-destructive hover:text-destructive hover:bg-destructive/10">
                                <XCircle className="h-3.5 w-3.5" />
                                Reject
                              </Button>
                            </div>
                          ) : (
                            <span className="text-sm text-muted-foreground">-</span>
                          )}
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rent" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Rent Collection
              </CardTitle>
              <CardDescription>Monthly rent payment status for all tenants</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tenant</TableHead>
                    <TableHead>Month</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Paid Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockRentHistory.map((rent) => {
                    const user = getUserById(rent.userId)
                    return (
                      <TableRow key={rent.id}>
                        <TableCell className="font-medium">{user?.name}</TableCell>
                        <TableCell>{rent.month}</TableCell>
                        <TableCell>{formatCurrency(rent.amount)}</TableCell>
                        <TableCell>{formatDate(rent.dueDate)}</TableCell>
                        <TableCell>{rent.paidDate ? formatDate(rent.paidDate) : "-"}</TableCell>
                        <TableCell>{getRentStatusBadge(rent.status)}</TableCell>
                        <TableCell className="text-right">
                          {rent.status !== RentStatus.PAID && (
                            <Button size="sm" variant="outline" className="h-8">
                              Mark Paid
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { 
  CreditCard, 
  Wallet, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Plus,
  Clock,
  CheckCircle2,
  XCircle,
  Building,
  Smartphone,
  Banknote,
  Receipt,
  Send,
  TrendingUp
} from "lucide-react"
import { mockUsers, mockTransactions, mockPaymentRequests } from "@/lib/mock-data"
import { formatCurrency, formatDate } from "@/lib/utils"
import { TransactionType, PaymentMethod, PaymentRequestStatus } from "@/lib/types"

// Current tenant (mock - would come from auth)
const currentUser = mockUsers.find(u => u.id === "user-1")!
const userTransactions = mockTransactions.filter(t => t.userId === currentUser.id)
const userPaymentRequests = mockPaymentRequests.filter(p => p.requesterId === currentUser.id)

const paymentMethods = [
  { id: PaymentMethod.UPI, name: "UPI", icon: Smartphone, description: "Pay via UPI apps" },
  { id: PaymentMethod.BANK_TRANSFER, name: "Bank Transfer", icon: Building, description: "NEFT/IMPS transfer" },
  { id: PaymentMethod.CASH, name: "Cash", icon: Banknote, description: "Pay at office" },
]

export default function PaymentsPage() {
  const [selectedTab, setSelectedTab] = useState("overview")
  const [requestDialogOpen, setRequestDialogOpen] = useState(false)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod>(PaymentMethod.UPI)

  const walletBalance = currentUser.walletBalance
  const totalCredits = userTransactions
    .filter(t => t.type === TransactionType.CREDIT)
    .reduce((sum, t) => sum + t.amount, 0)
  const totalDebits = userTransactions
    .filter(t => t.type === TransactionType.DEBIT)
    .reduce((sum, t) => sum + t.amount, 0)

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

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Payments</h1>
          <p className="text-muted-foreground">Manage your wallet and transactions</p>
        </div>
        <Dialog open={requestDialogOpen} onOpenChange={setRequestDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Request Payment
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Request Payment Verification</DialogTitle>
              <DialogDescription>
                Submit a payment for admin verification to add funds to your wallet
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <Input id="amount" type="number" placeholder="Enter amount" />
              </div>
              <div className="space-y-2">
                <Label>Payment Method</Label>
                <RadioGroup value={selectedPaymentMethod} onValueChange={(v) => setSelectedPaymentMethod(v as PaymentMethod)}>
                  {paymentMethods.map((method) => (
                    <div key={method.id} className="flex items-center space-x-3 space-y-0">
                      <RadioGroupItem value={method.id} id={method.id} />
                      <Label htmlFor={method.id} className="flex items-center gap-2 font-normal cursor-pointer">
                        <method.icon className="h-4 w-4 text-muted-foreground" />
                        <span>{method.name}</span>
                        <span className="text-xs text-muted-foreground">- {method.description}</span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              <div className="space-y-2">
                <Label htmlFor="reference">Transaction Reference</Label>
                <Input id="reference" placeholder="UPI Ref / Transaction ID" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Textarea id="notes" placeholder="Any additional details..." />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setRequestDialogOpen(false)}>Cancel</Button>
              <Button className="gap-2" onClick={() => setRequestDialogOpen(false)}>
                <Send className="h-4 w-4" />
                Submit Request
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Wallet Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-1 bg-gradient-to-br from-primary/10 via-primary/5 to-background border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Wallet className="h-5 w-5" />
              Wallet Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{formatCurrency(walletBalance)}</p>
            <p className="text-sm text-muted-foreground mt-1">Available for payments</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg text-emerald-600">
              <ArrowDownLeft className="h-5 w-5" />
              Total Credits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{formatCurrency(totalCredits)}</p>
            <p className="text-sm text-muted-foreground mt-1">Money added to wallet</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg text-rose-600">
              <ArrowUpRight className="h-5 w-5" />
              Total Debits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{formatCurrency(totalDebits)}</p>
            <p className="text-sm text-muted-foreground mt-1">Money spent from wallet</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="overview">Transactions</TabsTrigger>
          <TabsTrigger value="requests">Payment Requests</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Recent Transactions
              </CardTitle>
              <CardDescription>Your wallet transaction history</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>{formatDate(transaction.createdAt)}</TableCell>
                      <TableCell className="font-medium">{transaction.description}</TableCell>
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
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="requests" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Receipt className="h-5 w-5" />
                Payment Requests
              </CardTitle>
              <CardDescription>Your pending and processed payment verification requests</CardDescription>
            </CardHeader>
            <CardContent>
              {userPaymentRequests.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <CreditCard className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="font-semibold">No Payment Requests</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Submit a payment request to add funds to your wallet
                  </p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead>Reference</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Admin Notes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {userPaymentRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell>{formatDate(request.createdAt)}</TableCell>
                        <TableCell className="font-medium">{formatCurrency(request.amount)}</TableCell>
                        <TableCell className="capitalize">{request.paymentMethod.toLowerCase().replace("_", " ")}</TableCell>
                        <TableCell className="font-mono text-sm">{request.transactionReference || "-"}</TableCell>
                        <TableCell>{getStatusBadge(request.status)}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {request.adminNotes || "-"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>

          {/* Payment Instructions */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Instructions</CardTitle>
              <CardDescription>How to add funds to your wallet</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                {paymentMethods.map((method, index) => (
                  <div key={method.id} className="flex items-start gap-3 p-4 rounded-lg border bg-muted/50">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-sm">
                      {index + 1}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <method.icon className="h-4 w-4" />
                        <p className="font-medium">{method.name}</p>
                      </div>
                      <p className="text-sm text-muted-foreground">{method.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="rounded-lg border bg-amber-500/5 border-amber-500/20 p-4">
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-amber-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-amber-600">Processing Time</p>
                    <p className="text-sm text-muted-foreground">
                      Payment requests are typically verified within 24 hours. You&apos;ll receive a notification once your request is processed.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

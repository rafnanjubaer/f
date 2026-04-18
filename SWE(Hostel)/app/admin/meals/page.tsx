"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { 
  UtensilsCrossed, 
  Plus, 
  Coffee, 
  Sun, 
  Moon,
  Calendar,
  Ticket,
  CheckCircle2,
  Clock,
  Edit,
  Trash2,
  Users
} from "lucide-react"
import { mockDailyMenus, mockMealTokens, mockUsers } from "@/lib/mock-data"
import { formatDate } from "@/lib/utils"
import { MealType, DayOfWeek } from "@/lib/types"

const getMealIcon = (type: MealType) => {
  switch (type) {
    case MealType.BREAKFAST:
      return Coffee
    case MealType.LUNCH:
      return Sun
    case MealType.DINNER:
      return Moon
    default:
      return UtensilsCrossed
  }
}

const dayOrder = [
  DayOfWeek.MONDAY,
  DayOfWeek.TUESDAY,
  DayOfWeek.WEDNESDAY,
  DayOfWeek.THURSDAY,
  DayOfWeek.FRIDAY,
  DayOfWeek.SATURDAY,
  DayOfWeek.SUNDAY,
]

export default function MealsPage() {
  const [selectedTab, setSelectedTab] = useState("menu")
  const [addMenuDialogOpen, setAddMenuDialogOpen] = useState(false)
  const [selectedDay, setSelectedDay] = useState<DayOfWeek>(DayOfWeek.MONDAY)

  const sortedMenus = [...mockDailyMenus].sort((a, b) => 
    dayOrder.indexOf(a.dayOfWeek) - dayOrder.indexOf(b.dayOfWeek)
  )

  const tokenStats = {
    total: mockMealTokens.length,
    used: mockMealTokens.filter(t => t.isUsed).length,
    unused: mockMealTokens.filter(t => !t.isUsed).length,
    breakfast: mockMealTokens.filter(t => t.mealType === MealType.BREAKFAST).length,
    lunch: mockMealTokens.filter(t => t.mealType === MealType.LUNCH).length,
    dinner: mockMealTokens.filter(t => t.mealType === MealType.DINNER).length,
  }

  const getUserById = (userId: string) => mockUsers.find(u => u.id === userId)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Meal Management</h1>
          <p className="text-muted-foreground">Manage menus and meal tokens</p>
        </div>
        <Dialog open={addMenuDialogOpen} onOpenChange={setAddMenuDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Menu
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Add/Edit Daily Menu</DialogTitle>
              <DialogDescription>
                Set the menu for a specific day
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="day">Day of Week</Label>
                <Select value={selectedDay} onValueChange={(v) => setSelectedDay(v as DayOfWeek)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select day" />
                  </SelectTrigger>
                  <SelectContent>
                    {dayOrder.map((day) => (
                      <SelectItem key={day} value={day} className="capitalize">
                        {day.toLowerCase()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-4 border-t pt-4">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Coffee className="h-4 w-4" />
                  Breakfast
                </div>
                <div className="grid gap-3 pl-6">
                  <div className="space-y-1">
                    <Label htmlFor="breakfast-main" className="text-xs">Main Course</Label>
                    <Input id="breakfast-main" placeholder="e.g., Idli Sambar" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="breakfast-side" className="text-xs">Side Dish</Label>
                    <Input id="breakfast-side" placeholder="e.g., Chutney" />
                  </div>
                </div>
              </div>
              <div className="space-y-4 border-t pt-4">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Sun className="h-4 w-4" />
                  Lunch
                </div>
                <div className="grid gap-3 pl-6">
                  <div className="space-y-1">
                    <Label htmlFor="lunch-main" className="text-xs">Main Course</Label>
                    <Input id="lunch-main" placeholder="e.g., Rice & Dal" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="lunch-side" className="text-xs">Side Dish</Label>
                    <Input id="lunch-side" placeholder="e.g., Vegetable Curry" />
                  </div>
                </div>
              </div>
              <div className="space-y-4 border-t pt-4">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Moon className="h-4 w-4" />
                  Dinner
                </div>
                <div className="grid gap-3 pl-6">
                  <div className="space-y-1">
                    <Label htmlFor="dinner-main" className="text-xs">Main Course</Label>
                    <Input id="dinner-main" placeholder="e.g., Chapati & Paneer" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="dinner-side" className="text-xs">Side Dish</Label>
                    <Input id="dinner-side" placeholder="e.g., Raita" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="dinner-dessert" className="text-xs">Dessert (Optional)</Label>
                    <Input id="dinner-dessert" placeholder="e.g., Kheer" />
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setAddMenuDialogOpen(false)}>Cancel</Button>
              <Button onClick={() => setAddMenuDialogOpen(false)}>Save Menu</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Ticket className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Tokens</p>
                <p className="text-xl font-bold">{tokenStats.total}</p>
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
                <p className="text-sm text-muted-foreground">Used Tokens</p>
                <p className="text-xl font-bold">{tokenStats.used}</p>
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
                <p className="text-sm text-muted-foreground">Available</p>
                <p className="text-xl font-bold">{tokenStats.unused}</p>
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
                <p className="text-sm text-muted-foreground">Active Subscribers</p>
                <p className="text-xl font-bold">{mockUsers.filter(u => u.role === "TENANT").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="menu">Weekly Menu</TabsTrigger>
          <TabsTrigger value="tokens">Meal Tokens</TabsTrigger>
        </TabsList>

        <TabsContent value="menu" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Weekly Menu Schedule
              </CardTitle>
              <CardDescription>Manage the weekly meal schedule</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-32">Day</TableHead>
                    <TableHead>Breakfast</TableHead>
                    <TableHead>Lunch</TableHead>
                    <TableHead>Dinner</TableHead>
                    <TableHead className="text-right w-24">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedMenus.map((menu) => (
                    <TableRow key={menu.id}>
                      <TableCell className="font-medium capitalize">
                        {menu.dayOfWeek.toLowerCase()}
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="text-sm">{menu.meals.find(m => m.type === MealType.BREAKFAST)?.mainCourse || "-"}</p>
                          {menu.meals.find(m => m.type === MealType.BREAKFAST)?.sideDish && (
                            <p className="text-xs text-muted-foreground">
                              + {menu.meals.find(m => m.type === MealType.BREAKFAST)?.sideDish}
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="text-sm">{menu.meals.find(m => m.type === MealType.LUNCH)?.mainCourse || "-"}</p>
                          {menu.meals.find(m => m.type === MealType.LUNCH)?.sideDish && (
                            <p className="text-xs text-muted-foreground">
                              + {menu.meals.find(m => m.type === MealType.LUNCH)?.sideDish}
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="text-sm">{menu.meals.find(m => m.type === MealType.DINNER)?.mainCourse || "-"}</p>
                          {menu.meals.find(m => m.type === MealType.DINNER)?.sideDish && (
                            <p className="text-xs text-muted-foreground">
                              + {menu.meals.find(m => m.type === MealType.DINNER)?.sideDish}
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Meal Distribution */}
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { type: MealType.BREAKFAST, label: "Breakfast", time: "7:00 AM - 9:00 AM", icon: Coffee, count: tokenStats.breakfast },
              { type: MealType.LUNCH, label: "Lunch", time: "12:00 PM - 2:00 PM", icon: Sun, count: tokenStats.lunch },
              { type: MealType.DINNER, label: "Dinner", time: "7:00 PM - 9:00 PM", icon: Moon, count: tokenStats.dinner },
            ].map((meal) => (
              <Card key={meal.type}>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <meal.icon className="h-4 w-4" />
                    {meal.label}
                  </CardTitle>
                  <CardDescription>{meal.time}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{meal.count}</div>
                  <p className="text-xs text-muted-foreground">tokens issued this month</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tokens" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Ticket className="h-5 w-5" />
                Meal Token Usage
              </CardTitle>
              <CardDescription>Track meal token usage by tenants</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tenant</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Meal Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Used At</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockMealTokens.map((token) => {
                    const user = getUserById(token.userId)
                    return (
                      <TableRow key={token.id}>
                        <TableCell className="font-medium">{user?.name}</TableCell>
                        <TableCell>{formatDate(token.date)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2 capitalize">
                            {(() => {
                              const Icon = getMealIcon(token.mealType)
                              return <Icon className="h-4 w-4 text-muted-foreground" />
                            })()}
                            {token.mealType.toLowerCase()}
                          </div>
                        </TableCell>
                        <TableCell>
                          {token.isUsed ? (
                            <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              Used
                            </Badge>
                          ) : (
                            <Badge variant="outline">
                              <Clock className="h-3 w-3 mr-1" />
                              Available
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          {token.usedAt ? formatDate(token.usedAt) : "-"}
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

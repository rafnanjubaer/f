"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { 
  UtensilsCrossed, 
  Coffee, 
  Sun, 
  Moon,
  Calendar,
  Ticket,
  CheckCircle2,
  XCircle,
  Clock,
  Soup,
  Salad
} from "lucide-react"
import { mockUsers, mockDailyMenus, mockMealTokens } from "@/lib/mock-data"
import { formatDate } from "@/lib/utils"
import { MealType, DayOfWeek } from "@/lib/types"

// Current tenant (mock - would come from auth)
const currentUser = mockUsers.find(u => u.id === "user-1")!
const userMealTokens = mockMealTokens.filter(t => t.userId === currentUser.id)

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

const getMealTime = (type: MealType) => {
  switch (type) {
    case MealType.BREAKFAST:
      return "7:00 AM - 9:00 AM"
    case MealType.LUNCH:
      return "12:00 PM - 2:00 PM"
    case MealType.DINNER:
      return "7:00 PM - 9:00 PM"
    default:
      return ""
  }
}

const today = new Date()
const dayNames = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"]
const todayDay = dayNames[today.getDay()] as DayOfWeek

export default function MealsPage() {
  const [selectedTab, setSelectedTab] = useState("today")
  const [mealPreferences, setMealPreferences] = useState({
    breakfast: true,
    lunch: true,
    dinner: true,
  })

  const todayMenu = mockDailyMenus.find(m => m.dayOfWeek === todayDay)
  const weeklyMenus = mockDailyMenus

  const tokenStats = {
    total: userMealTokens.length,
    used: userMealTokens.filter(t => t.isUsed).length,
    unused: userMealTokens.filter(t => !t.isUsed).length,
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Meals</h1>
        <p className="text-muted-foreground">View menu, manage preferences, and track meal tokens</p>
      </div>

      {/* Quick Stats */}
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
                <p className="text-sm text-muted-foreground">Used</p>
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
                <p className="text-sm text-muted-foreground">Remaining</p>
                <p className="text-xl font-bold">{tokenStats.unused}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">This Month</p>
                <p className="text-xl font-bold">April 2025</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="today">Today&apos;s Menu</TabsTrigger>
          <TabsTrigger value="weekly">Weekly Menu</TabsTrigger>
          <TabsTrigger value="tokens">My Tokens</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="space-y-6 mt-6">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{today.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}</span>
          </div>

          {todayMenu ? (
            <div className="grid gap-4 md:grid-cols-3">
              {[MealType.BREAKFAST, MealType.LUNCH, MealType.DINNER].map((mealType) => {
                const meal = todayMenu.meals.find(m => m.type === mealType)
                const MealIcon = getMealIcon(mealType)
                
                return (
                  <Card key={mealType} className="overflow-hidden">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2 text-lg capitalize">
                          <MealIcon className="h-5 w-5" />
                          {mealType.toLowerCase()}
                        </CardTitle>
                        <Badge variant="outline" className="text-xs">
                          {getMealTime(mealType)}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {meal ? (
                        <>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Soup className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm font-medium">Main Course</span>
                            </div>
                            <p className="text-sm text-muted-foreground pl-6">{meal.mainCourse}</p>
                          </div>
                          {meal.sideDish && (
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <Salad className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm font-medium">Side Dish</span>
                              </div>
                              <p className="text-sm text-muted-foreground pl-6">{meal.sideDish}</p>
                            </div>
                          )}
                          {meal.dessert && (
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <UtensilsCrossed className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm font-medium">Dessert</span>
                              </div>
                              <p className="text-sm text-muted-foreground pl-6">{meal.dessert}</p>
                            </div>
                          )}
                        </>
                      ) : (
                        <p className="text-sm text-muted-foreground">No menu available</p>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <UtensilsCrossed className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="font-semibold">No Menu Available</h3>
                <p className="text-sm text-muted-foreground">Today&apos;s menu hasn&apos;t been posted yet</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="weekly" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Menu</CardTitle>
              <CardDescription>Meal schedule for the week</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Day</TableHead>
                    <TableHead>Breakfast</TableHead>
                    <TableHead>Lunch</TableHead>
                    <TableHead>Dinner</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {weeklyMenus.map((menu) => (
                    <TableRow key={menu.id} className={menu.dayOfWeek === todayDay ? "bg-primary/5" : ""}>
                      <TableCell className="font-medium capitalize">
                        <div className="flex items-center gap-2">
                          {menu.dayOfWeek.toLowerCase()}
                          {menu.dayOfWeek === todayDay && (
                            <Badge variant="secondary" className="text-xs">Today</Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">
                        {menu.meals.find(m => m.type === MealType.BREAKFAST)?.mainCourse || "-"}
                      </TableCell>
                      <TableCell className="text-sm">
                        {menu.meals.find(m => m.type === MealType.LUNCH)?.mainCourse || "-"}
                      </TableCell>
                      <TableCell className="text-sm">
                        {menu.meals.find(m => m.type === MealType.DINNER)?.mainCourse || "-"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tokens" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Ticket className="h-5 w-5" />
                Meal Token History
              </CardTitle>
              <CardDescription>Track your meal token usage</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Meal Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Used At</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userMealTokens.map((token) => (
                    <TableRow key={token.id}>
                      <TableCell>{formatDate(token.date)}</TableCell>
                      <TableCell className="capitalize">{token.mealType.toLowerCase()}</TableCell>
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
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Meal Preferences</CardTitle>
              <CardDescription>Configure your daily meal selections</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {[
                  { id: "breakfast", label: "Breakfast", time: "7:00 AM - 9:00 AM", icon: Coffee },
                  { id: "lunch", label: "Lunch", time: "12:00 PM - 2:00 PM", icon: Sun },
                  { id: "dinner", label: "Dinner", time: "7:00 PM - 9:00 PM", icon: Moon },
                ].map((meal) => (
                  <div key={meal.id} className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                        <meal.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <Label htmlFor={meal.id} className="font-medium">{meal.label}</Label>
                        <p className="text-sm text-muted-foreground">{meal.time}</p>
                      </div>
                    </div>
                    <Switch
                      id={meal.id}
                      checked={mealPreferences[meal.id as keyof typeof mealPreferences]}
                      onCheckedChange={(checked) => 
                        setMealPreferences(prev => ({ ...prev, [meal.id]: checked }))
                      }
                    />
                  </div>
                ))}
              </div>

              <div className="rounded-lg border bg-muted/50 p-4">
                <p className="text-sm text-muted-foreground">
                  <strong>Note:</strong> Changes to meal preferences will take effect from the next billing cycle. 
                  Disabling a meal will reduce your monthly meal charge accordingly.
                </p>
              </div>

              <Button>Save Preferences</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

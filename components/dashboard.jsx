"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CircularProgress, MultiColorCircularProgress, DottedCircularProgress } from "@/components/circular-progress"
import { CalorieWidget } from "@/components/widgets/calorie-widget"
import { WaterIntakeWidget } from "@/components/widgets/water-intake-widget"
import { WorkoutWidget } from "@/components/widgets/workout-widget"
import { StepCounterWidget } from "@/components/widgets/step-counter-widget"
import { WeightWidget } from "@/components/widgets/weight-widget"
import { ActivityFeed } from "@/components/widgets/activity-feed"
import { useAuth } from "@/components/auth-provider"
import { UserStats } from "@/components/user-stats"

export function Dashboard() {
  const { user } = useAuth()

  return (
    <div className="flex flex-col gap-4 p-4 md:p-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {user?.name || "User"}! Here's an overview of your fitness journey.
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <UserStats />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Daily Goal Progress</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center py-4">
                <CircularProgress value={78} size={120} color="#10b981" label="Daily Goal" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Calories Burned</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center py-4">
                <MultiColorCircularProgress
                  value={45}
                  size={120}
                  colors={["#06b6d4", "#8b5cf6", "#ec4899"]}
                  label="Target: 1000 kcal"
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Workout Streak</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center py-4">
                <CircularProgress value={100} size={120} color="#8b5cf6" label="7 days" showValue={false} />
                <div className="absolute text-2xl font-bold">7</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Water Intake</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center py-4">
                <DottedCircularProgress value={48} size={120} color="#06b6d4" label="1.2 / 2.5 L" />
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Daily Activity</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <ActivityFeed />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Today's Widgets</CardTitle>
                <CardDescription>Track your daily progress with these widgets</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <CalorieWidget />
                  <WaterIntakeWidget />
                  <WorkoutWidget />
                  <StepCounterWidget />
                  <WeightWidget />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
              <CardDescription>View detailed analytics of your fitness journey</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border rounded-md">
                <p className="text-muted-foreground">Analytics charts will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Reports</CardTitle>
              <CardDescription>View and download your fitness reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border rounded-md">
                <p className="text-muted-foreground">Reports will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

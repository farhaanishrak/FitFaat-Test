"use client"

import { Check, Dumbbell, Utensils, Droplets, Footprints } from "lucide-react"

const activities = [
  {
    id: 1,
    type: "workout",
    title: "Completed chest workout",
    time: "2 hours ago",
    icon: Dumbbell,
    iconColor: "text-orange-500",
  },
  {
    id: 2,
    type: "meal",
    title: "Logged breakfast",
    description: "Oatmeal with fruits - 320 kcal",
    time: "5 hours ago",
    icon: Utensils,
    iconColor: "text-green-500",
  },
  {
    id: 3,
    type: "water",
    title: "Drank water",
    description: "250ml",
    time: "6 hours ago",
    icon: Droplets,
    iconColor: "text-blue-500",
  },
  {
    id: 4,
    type: "steps",
    title: "Reached 5,000 steps",
    time: "Yesterday",
    icon: Footprints,
    iconColor: "text-purple-500",
  },
  {
    id: 5,
    type: "goal",
    title: "Completed daily goal",
    time: "Yesterday",
    icon: Check,
    iconColor: "text-primary",
  },
]

export function ActivityFeed() {
  return (
    <div className="space-y-8">
      {activities.map((activity) => (
        <div key={activity.id} className="flex">
          <div className="flex-none mr-4">
            <div className={`rounded-full p-2 ${activity.iconColor} bg-muted`}>
              <activity.icon className="h-4 w-4" />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">{activity.title}</p>
            {activity.description && <p className="text-sm text-muted-foreground">{activity.description}</p>}
            <p className="text-xs text-muted-foreground">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

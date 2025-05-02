"use client"

import { Dumbbell } from "lucide-react"
import { MultiColorCircularProgress } from "@/components/circular-progress"

export function WorkoutWidget() {
  return (
    <div className="flex items-center space-x-4 rounded-md border p-4">
      <MultiColorCircularProgress
        value={66}
        size={60}
        strokeWidth={6}
        colors={["#8b5cf6", "#ec4899"]}
        showValue={false}
      />
      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium leading-none flex items-center">
          <Dumbbell className="h-4 w-4 text-purple-500 mr-1" />
          Workout
        </p>
        <div className="flex items-center text-sm text-muted-foreground">
          <span className="font-medium text-foreground">2</span>
          <span className="mx-1">/</span>
          <span>3 exercises</span>
        </div>
      </div>
    </div>
  )
}

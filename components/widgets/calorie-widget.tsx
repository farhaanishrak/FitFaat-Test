"use client"

import { PieChart } from "lucide-react"
import { CircularProgress } from "@/components/circular-progress"

export function CalorieWidget() {
  return (
    <div className="flex items-center space-x-4 rounded-md border p-4">
      <CircularProgress value={60} size={60} strokeWidth={6} color="#f97316" showValue={false} />
      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium leading-none flex items-center">
          <PieChart className="h-4 w-4 text-orange-500 mr-1" />
          Calories
        </p>
        <div className="flex items-center text-sm text-muted-foreground">
          <span className="font-medium text-foreground">1,200</span>
          <span className="mx-1">/</span>
          <span>2,000 kcal</span>
        </div>
      </div>
    </div>
  )
}

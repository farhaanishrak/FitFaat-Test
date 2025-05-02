"use client"

import { Footprints } from "lucide-react"
import { CircularProgress } from "@/components/circular-progress"

export function StepCounterWidget() {
  return (
    <div className="flex items-center space-x-4 rounded-md border p-4">
      <CircularProgress value={65} size={60} strokeWidth={6} color="#10b981" showValue={false} />
      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium leading-none flex items-center">
          <Footprints className="h-4 w-4 text-green-500 mr-1" />
          Steps
        </p>
        <div className="flex items-center text-sm text-muted-foreground">
          <span className="font-medium text-foreground">6,540</span>
          <span className="mx-1">/</span>
          <span>10,000 steps</span>
        </div>
      </div>
    </div>
  )
}

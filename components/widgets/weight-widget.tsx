"use client"

import { Scale } from "lucide-react"
import { MultiColorCircularProgress } from "@/components/circular-progress"

export function WeightWidget() {
  return (
    <div className="flex items-center space-x-4 rounded-md border p-4">
      <MultiColorCircularProgress
        value={85}
        size={60}
        strokeWidth={6}
        colors={["#ec4899", "#8b5cf6", "#06b6d4"]}
        showValue={false}
      />
      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium leading-none flex items-center">
          <Scale className="h-4 w-4 text-purple-500 mr-1" />
          Weight
        </p>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span className="font-medium text-foreground">75.5 kg</span>
          <span className="text-green-500 text-xs">-0.5 kg</span>
        </div>
      </div>
    </div>
  )
}

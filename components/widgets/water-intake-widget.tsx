"use client"

import { Droplets } from "lucide-react"
import { DottedCircularProgress } from "@/components/circular-progress"

export function WaterIntakeWidget() {
  return (
    <div className="flex items-center space-x-4 rounded-md border p-4">
      <DottedCircularProgress value={48} size={60} dotSize={3} dotCount={20} color="#06b6d4" showValue={false} />
      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium leading-none flex items-center">
          <Droplets className="h-4 w-4 text-blue-500 mr-1" />
          Water Intake
        </p>
        <div className="flex items-center text-sm text-muted-foreground">
          <span className="font-medium text-foreground">1.2</span>
          <span className="mx-1">/</span>
          <span>2.5 L</span>
        </div>
      </div>
    </div>
  )
}

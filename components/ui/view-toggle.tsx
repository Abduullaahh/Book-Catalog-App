"use client"

import { Button } from "@/components/ui/button"
import { Grid3X3, List } from "lucide-react"

interface ViewToggleProps {
  viewMode: "grid" | "table"
  onViewModeChange: (mode: "grid" | "table") => void
  className?: string
}

export function ViewToggle({ viewMode, onViewModeChange, className = "" }: ViewToggleProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Button
        variant={viewMode === "grid" ? "default" : "outline"}
        size="sm"
        onClick={() => onViewModeChange("grid")}
      >
        <Grid3X3 className="h-4 w-4" />
      </Button>
      <Button
        variant={viewMode === "table" ? "default" : "outline"}
        size="sm"
        onClick={() => onViewModeChange("table")}
      >
        <List className="h-4 w-4" />
      </Button>
    </div>
  )
}

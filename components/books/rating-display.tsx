import { Star } from "lucide-react"

interface RatingDisplayProps {
  rating?: number | null
  showLabel?: boolean
  className?: string
}

export function RatingDisplay({ rating, showLabel = true, className = "" }: RatingDisplayProps) {
  if (!rating || rating === 0) {
    return (
      <div className={`flex items-center gap-1 text-muted-foreground ${className}`}>
        <Star className="h-3 w-3" />
        {showLabel && <span className="text-sm">Not rated</span>}
      </div>
    )
  }

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
      {showLabel && <span className="text-sm">{rating}/5</span>}
    </div>
  )
}

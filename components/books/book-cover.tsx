"use client"

import { useState } from "react"
import Image from "next/image"
import { BookOpen } from "lucide-react"

interface BookCoverProps {
  src?: string | null
  alt: string
  width?: number
  height?: number
  className?: string
  useFill?: boolean
}

export function BookCover({ 
  src, 
  alt, 
  width = 64, 
  height = 88, 
  className = "", 
  useFill = false 
}: BookCoverProps) {
  const [imageError, setImageError] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)

  const imageProps = useFill 
    ? { fill: true as const }
    : { width, height }

  return (
    <div className={`bg-muted rounded-lg overflow-hidden shadow-sm relative ${className}`}>
      {!imageError ? (
        <>
          {imageLoading && (
            <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
              <BookOpen className="h-5 w-5 text-muted-foreground/50" />
            </div>
          )}
          <Image
            src={src || "/placeholder.svg"}
            alt={alt}
            {...imageProps}
            className={`object-cover transition-opacity duration-300 ${
              imageLoading ? "opacity-0" : "opacity-100"
            } ${useFill ? "w-full h-full" : ""}`}
            onLoad={() => setImageLoading(false)}
            onError={() => {
              setImageError(true)
              setImageLoading(false)
            }}
          />
        </>
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
          <BookOpen className="h-5 w-5 text-muted-foreground/70" />
        </div>
      )}
    </div>
  )
}

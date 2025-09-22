"use client"

import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Star, Crown, BookOpen, Trophy } from "lucide-react"

interface LevelProgressBarProps {
  currentLevel: "Apprentice" | "Adept" | "Philosopher" | "Master"
  currentPoints: number
  nextLevelPoints: number
  progress: number
  nextLevel: string
  compact?: boolean
}

export function LevelProgressBar({
  currentLevel,
  currentPoints,
  nextLevelPoints,
  progress,
  nextLevel,
  compact = false,
}: LevelProgressBarProps) {
  const getLevelIcon = (level: string) => {
    switch (level) {
      case "Apprentice":
        return <BookOpen className="w-4 h-4" />
      case "Adept":
        return <Star className="w-4 h-4" />
      case "Philosopher":
        return <Crown className="w-4 h-4" />
      case "Master":
        return <Trophy className="w-4 h-4" />
      default:
        return <BookOpen className="w-4 h-4" />
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Apprentice":
        return "bg-green-100 text-green-800 border-green-200"
      case "Adept":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Philosopher":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "Master":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  if (compact) {
    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Badge className={`border ${getLevelColor(currentLevel)}`}>
            {getLevelIcon(currentLevel)}
            <span className="ml-1">{currentLevel}</span>
          </Badge>
          <span className="text-sm text-muted-foreground">
            {currentPoints}/{nextLevelPoints}
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Badge className={`border ${getLevelColor(currentLevel)}`}>
            {getLevelIcon(currentLevel)}
            <span className="ml-1">{currentLevel}</span>
          </Badge>
        </div>
        <div className="text-right">
          <div className="text-sm font-medium">
            {currentPoints}/{nextLevelPoints}
          </div>
          <div className="text-xs text-muted-foreground">Essence of Knowledge</div>
        </div>
      </div>

      <div>
        <div className="flex justify-between text-sm mb-1">
          <span>Progress ke {nextLevel}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-3" />
        <p className="text-xs text-muted-foreground mt-1">
          {nextLevelPoints - currentPoints} poin lagi untuk naik level
        </p>
      </div>
    </div>
  )
}

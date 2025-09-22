"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, Star, Crown, Feather } from "lucide-react"
import { useEffect, useState } from "react"

interface AchievementToastProps {
  achievement: {
    title: string
    description: string
    type: "badge" | "level" | "points"
    rarity?: "common" | "rare" | "epic" | "legendary"
  }
  isVisible: boolean
  onClose: () => void
}

export function AchievementToast({ achievement, isVisible, onClose }: AchievementToastProps) {
  const [shouldShow, setShouldShow] = useState(false)

  useEffect(() => {
    if (isVisible) {
      setShouldShow(true)
      const timer = setTimeout(() => {
        setShouldShow(false)
        setTimeout(onClose, 300) // Wait for animation to complete
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [isVisible, onClose])

  const getIcon = () => {
    switch (achievement.type) {
      case "badge":
        return <Award className="w-6 h-6" />
      case "level":
        return <Crown className="w-6 h-6" />
      case "points":
        return <Star className="w-6 h-6" />
      default:
        return <Feather className="w-6 h-6" />
    }
  }

  const getRarityColor = (rarity?: string) => {
    switch (rarity) {
      case "rare":
        return "border-blue-300 bg-blue-50"
      case "epic":
        return "border-purple-300 bg-purple-50"
      case "legendary":
        return "border-yellow-300 bg-yellow-50"
      default:
        return "border-accent bg-accent/10"
    }
  }

  if (!isVisible) return null

  return (
    <div
      className={`fixed top-4 right-4 z-50 transition-all duration-300 ${
        shouldShow ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      }`}
    >
      <Card className={`border-2 shadow-lg ${getRarityColor(achievement.rarity)}`}>
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-accent-foreground">
              {getIcon()}
            </div>
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <h4 className="font-serif font-semibold">{achievement.title}</h4>
                {achievement.rarity && (
                  <Badge variant="outline" className="text-xs">
                    {achievement.rarity}
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{achievement.description}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

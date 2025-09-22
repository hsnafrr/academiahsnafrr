"use client"

import type React from "react"

import { AuthGuard } from "@/components/auth-guard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  BookOpen,
  Scroll,
  Star,
  Award,
  Trophy,
  Target,
  TrendingUp,
  Calendar,
  ArrowLeft,
  LogOut,
  Settings,
  Bell,
  Zap,
  Crown,
  Compass,
  Feather,
} from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface Achievement {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  isUnlocked: boolean
  unlockedDate?: string
  category: "course" | "streak" | "mastery" | "special"
  rarity: "common" | "rare" | "epic" | "legendary"
}

interface LevelInfo {
  current: "Apprentice" | "Adept" | "Philosopher" | "Master"
  currentPoints: number
  nextLevelPoints: number
  progress: number
  nextLevel: string
}

interface StudyStreak {
  current: number
  longest: number
  lastStudyDate: string
}

export default function ProgressPage() {
  const [userStats, setUserStats] = useState<any>(null)
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [levelInfo, setLevelInfo] = useState<LevelInfo | null>(null)
  const [studyStreak, setStudyStreak] = useState<StudyStreak | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Load user progress data
    const userName = localStorage.getItem("userName") || "Scholar"
    const userEmail = localStorage.getItem("userEmail") || "scholar@academia-antiqua.com"

    // Mock comprehensive user stats
    const stats = {
      name: userName,
      email: userEmail,
      totalPoints: 350,
      coursesCompleted: 2,
      modulesCompleted: 8,
      totalStudyTime: "24 jam",
      joinDate: "November 2024",
      lastActive: "Hari ini",
    }

    setUserStats(stats)

    // Calculate level info
    const points = stats.totalPoints
    let level: LevelInfo

    if (points < 100) {
      level = {
        current: "Apprentice",
        currentPoints: points,
        nextLevelPoints: 100,
        progress: (points / 100) * 100,
        nextLevel: "Adept",
      }
    } else if (points < 250) {
      level = {
        current: "Adept",
        currentPoints: points - 100,
        nextLevelPoints: 150,
        progress: ((points - 100) / 150) * 100,
        nextLevel: "Philosopher",
      }
    } else if (points < 500) {
      level = {
        current: "Philosopher",
        currentPoints: points - 250,
        nextLevelPoints: 250,
        progress: ((points - 250) / 250) * 100,
        nextLevel: "Master",
      }
    } else {
      level = {
        current: "Master",
        currentPoints: points,
        nextLevelPoints: 500,
        progress: 100,
        nextLevel: "Grandmaster",
      }
    }

    setLevelInfo(level)

    // Mock study streak
    setStudyStreak({
      current: 7,
      longest: 12,
      lastStudyDate: "2024-11-20",
    })

    // Mock achievements
    const mockAchievements: Achievement[] = [
      {
        id: "first-steps",
        title: "Langkah Pertama",
        description: "Menyelesaikan modul pertama",
        icon: <Feather className="w-6 h-6" />,
        isUnlocked: true,
        unlockedDate: "15 Nov 2024",
        category: "course",
        rarity: "common",
      },
      {
        id: "quill-wisdom",
        title: "Quill of Wisdom",
        description: "Menyelesaikan kursus pertama",
        icon: <Feather className="w-6 h-6" />,
        isUnlocked: true,
        unlockedDate: "18 Nov 2024",
        category: "course",
        rarity: "rare",
      },
      {
        id: "knowledge-seeker",
        title: "Knowledge Seeker",
        description: "Mengumpulkan 100 Essence of Knowledge",
        icon: <Star className="w-6 h-6" />,
        isUnlocked: true,
        unlockedDate: "19 Nov 2024",
        category: "mastery",
        rarity: "rare",
      },
      {
        id: "astrolabe-mastery",
        title: "Astrolabe of Mastery",
        description: "Menyelesaikan semua kursus yang tersedia",
        icon: <Compass className="w-6 h-6" />,
        isUnlocked: false,
        category: "course",
        rarity: "legendary",
      },
      {
        id: "dedicated-scholar",
        title: "Dedicated Scholar",
        description: "Belajar selama 7 hari berturut-turut",
        icon: <Calendar className="w-6 h-6" />,
        isUnlocked: true,
        unlockedDate: "20 Nov 2024",
        category: "streak",
        rarity: "epic",
      },
      {
        id: "philosopher-mind",
        title: "Philosopher's Mind",
        description: "Mencapai level Philosopher",
        icon: <Crown className="w-6 h-6" />,
        isUnlocked: true,
        unlockedDate: "20 Nov 2024",
        category: "mastery",
        rarity: "epic",
      },
      {
        id: "reflection-master",
        title: "Master of Reflection",
        description: "Menulis 10 catatan refleksi",
        icon: <BookOpen className="w-6 h-6" />,
        isUnlocked: false,
        category: "special",
        rarity: "rare",
      },
      {
        id: "quiz-champion",
        title: "Quiz Champion",
        description: "Menjawab 50 kuis dengan benar",
        icon: <Trophy className="w-6 h-6" />,
        isUnlocked: false,
        category: "mastery",
        rarity: "epic",
      },
    ]

    setAchievements(mockAchievements)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("userEmail")
    localStorage.removeItem("userName")
    router.push("/")
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "border-gray-300 bg-gray-50 text-gray-700"
      case "rare":
        return "border-blue-300 bg-blue-50 text-blue-700"
      case "epic":
        return "border-purple-300 bg-purple-50 text-purple-700"
      case "legendary":
        return "border-yellow-300 bg-yellow-50 text-yellow-700"
      default:
        return "border-gray-300 bg-gray-50 text-gray-700"
    }
  }

  const getLevelIcon = (level: string) => {
    switch (level) {
      case "Apprentice":
        return <BookOpen className="w-8 h-8 text-green-600" />
      case "Adept":
        return <Star className="w-8 h-8 text-blue-600" />
      case "Philosopher":
        return <Crown className="w-8 h-8 text-purple-600" />
      case "Master":
        return <Trophy className="w-8 h-8 text-yellow-600" />
      default:
        return <BookOpen className="w-8 h-8 text-gray-600" />
    }
  }

  if (!userStats || !levelInfo || !studyStreak) {
    return (
      <AuthGuard>
        <div className="min-h-screen bg-background parchment-texture flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <TrendingUp className="w-8 h-8 text-primary-foreground" />
            </div>
            <p className="text-muted-foreground">Memuat progress Scholar...</p>
          </div>
        </div>
      </AuthGuard>
    )
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-background parchment-texture">
        {/* Header */}
        <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Link href="/" className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <Scroll className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h1 className="font-serif text-xl font-bold text-foreground">Academia Antiqua</h1>
                  </div>
                </Link>
                <div className="hidden md:flex items-center space-x-1 ml-8">
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/dashboard">Dashboard</Link>
                  </Button>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/courses">Kursus</Link>
                  </Button>
                  <Button variant="ghost" size="sm" className="bg-primary/10">
                    <Link href="/progress">Progress</Link>
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Button variant="ghost" size="sm">
                  <Bell className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Settings className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8 max-w-7xl">
          {/* Page Header */}
          <div className="mb-8">
            <Button variant="ghost" size="sm" asChild className="mb-4">
              <Link href="/dashboard">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kembali ke Dashboard
              </Link>
            </Button>
            <h1 className="font-serif text-4xl font-bold text-foreground mb-2">Progress & Pencapaian</h1>
            <p className="text-xl text-muted-foreground">
              Lacak perjalanan pembelajaran dan raih prestasi sebagai Scholar
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Progress Section */}
            <div className="lg:col-span-2 space-y-8">
              {/* Level Progress */}
              <Card className="scroll-shadow border-2 border-border">
                <CardHeader>
                  <CardTitle className="font-serif text-2xl flex items-center">
                    {getLevelIcon(levelInfo.current)}
                    <span className="ml-3">Level Scholar</span>
                  </CardTitle>
                  <CardDescription>Tingkatkan level Anda dengan mengumpulkan Essence of Knowledge</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-serif text-xl font-semibold">{levelInfo.current}</h3>
                      <p className="text-sm text-muted-foreground">Level saat ini</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">{userStats.totalPoints}</div>
                      <p className="text-sm text-muted-foreground">Essence of Knowledge</p>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progress ke {levelInfo.nextLevel}</span>
                      <span>
                        {levelInfo.currentPoints}/{levelInfo.nextLevelPoints}
                      </span>
                    </div>
                    <Progress value={levelInfo.progress} className="h-4" />
                    <p className="text-xs text-muted-foreground mt-1">
                      {levelInfo.nextLevelPoints - levelInfo.currentPoints} poin lagi untuk naik level
                    </p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-border">
                    <div className="text-center">
                      <div className="text-lg font-bold text-accent-foreground">{userStats.coursesCompleted}</div>
                      <div className="text-xs text-muted-foreground">Kursus Selesai</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-accent-foreground">{userStats.modulesCompleted}</div>
                      <div className="text-xs text-muted-foreground">Modul Selesai</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-accent-foreground">{studyStreak.current}</div>
                      <div className="text-xs text-muted-foreground">Hari Berturut</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-accent-foreground">{userStats.totalStudyTime}</div>
                      <div className="text-xs text-muted-foreground">Total Belajar</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Achievements Grid */}
              <Card className="scroll-shadow border-2 border-border">
                <CardHeader>
                  <CardTitle className="font-serif text-2xl flex items-center">
                    <Award className="w-6 h-6 mr-3 text-accent-foreground" />
                    Lencana Prestasi
                  </CardTitle>
                  <CardDescription>Koleksi lencana yang telah Anda raih dalam perjalanan pembelajaran</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {achievements.map((achievement) => (
                      <Card
                        key={achievement.id}
                        className={`border-2 transition-all duration-200 ${
                          achievement.isUnlocked
                            ? `${getRarityColor(achievement.rarity)} shadow-md`
                            : "border-muted bg-muted/20 opacity-60"
                        }`}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start space-x-3">
                            <div
                              className={`w-12 h-12 rounded-full flex items-center justify-center ${
                                achievement.isUnlocked
                                  ? "bg-accent text-accent-foreground"
                                  : "bg-muted text-muted-foreground"
                              }`}
                            >
                              {achievement.icon}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <h4 className="font-semibold text-sm">{achievement.title}</h4>
                                <Badge variant="outline" className={`text-xs ${getRarityColor(achievement.rarity)}`}>
                                  {achievement.rarity}
                                </Badge>
                              </div>
                              <p className="text-xs text-muted-foreground mb-2">{achievement.description}</p>
                              {achievement.isUnlocked && achievement.unlockedDate && (
                                <p className="text-xs text-accent-foreground font-medium">
                                  Diraih: {achievement.unlockedDate}
                                </p>
                              )}
                              {!achievement.isUnlocked && (
                                <p className="text-xs text-muted-foreground">Belum terbuka</p>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar Stats */}
            <div className="space-y-6">
              {/* Study Streak */}
              <Card className="scroll-shadow border-2 border-border">
                <CardHeader>
                  <CardTitle className="font-serif text-lg flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-orange-500" />
                    Study Streak
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-500 mb-1">{studyStreak.current}</div>
                    <p className="text-sm text-muted-foreground">Hari berturut-turut</p>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span>Streak terpanjang</span>
                    <span className="font-semibold">{studyStreak.longest} hari</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span>Terakhir belajar</span>
                    <span className="font-semibold">Hari ini</span>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <p className="text-xs text-muted-foreground text-center">
                      Pertahankan streak untuk mendapatkan bonus poin!
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className="scroll-shadow border-2 border-border">
                <CardHeader>
                  <CardTitle className="font-serif text-lg">Statistik Cepat</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Bergabung sejak</span>
                      <span className="text-sm font-semibold">{userStats.joinDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Terakhir aktif</span>
                      <span className="text-sm font-semibold">{userStats.lastActive}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Total waktu belajar</span>
                      <span className="text-sm font-semibold">{userStats.totalStudyTime}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <h4 className="font-medium mb-2 text-sm">Pencapaian Berikutnya</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-xs">
                        <Target className="w-3 h-3 text-muted-foreground" />
                        <span className="text-muted-foreground">Selesaikan 1 kursus lagi</span>
                      </div>
                      <div className="flex items-center space-x-2 text-xs">
                        <Target className="w-3 h-3 text-muted-foreground" />
                        <span className="text-muted-foreground">Capai 500 Essence of Knowledge</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Achievement Categories */}
              <Card className="scroll-shadow border-2 border-border">
                <CardHeader>
                  <CardTitle className="font-serif text-lg">Kategori Lencana</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <BookOpen className="w-4 h-4 text-blue-500" />
                      <span className="text-sm">Kursus</span>
                    </div>
                    <Badge variant="secondary">
                      {achievements.filter((a) => a.category === "course" && a.isUnlocked).length}/
                      {achievements.filter((a) => a.category === "course").length}
                    </Badge>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <Zap className="w-4 h-4 text-orange-500" />
                      <span className="text-sm">Streak</span>
                    </div>
                    <Badge variant="secondary">
                      {achievements.filter((a) => a.category === "streak" && a.isUnlocked).length}/
                      {achievements.filter((a) => a.category === "streak").length}
                    </Badge>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <Crown className="w-4 h-4 text-purple-500" />
                      <span className="text-sm">Mastery</span>
                    </div>
                    <Badge variant="secondary">
                      {achievements.filter((a) => a.category === "mastery" && a.isUnlocked).length}/
                      {achievements.filter((a) => a.category === "mastery").length}
                    </Badge>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm">Spesial</span>
                    </div>
                    <Badge variant="secondary">
                      {achievements.filter((a) => a.category === "special" && a.isUnlocked).length}/
                      {achievements.filter((a) => a.category === "special").length}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}

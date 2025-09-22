"use client"

import { useEffect, useState } from "react"
import { AuthGuard } from "@/components/auth-guard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  BookOpen,
  Scroll,
  Star,
  Award,
  Users,
  Clock,
  TrendingUp,
  LogOut,
  Settings,
  Bell,
  Search,
  Lightbulb,
  Bookmark,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

interface Course {
  id: string
  title: string
  description: string
  progress: number
  totalModules: number
  completedModules: number
  category: string
  difficulty: "Pemula" | "Menengah" | "Lanjutan"
  estimatedTime: string
}

interface UserStats {
  name: string
  email: string
  level: "Apprentice" | "Adept" | "Philosopher" | "Grand Sage" | "Archmage"
  points: number
  totalCourses: number
  completedCourses: number
  badges: string[]
  joinDate: string
  avatar: string
  studyStreak: number
  favoriteSubject: string
  totalStudyTime: string
}

interface DailyTrivia {
  question: string
  answer: string
  scholar: string
  category: string
  isRevealed: boolean
}

export default function DashboardPage() {
  const [userStats, setUserStats] = useState<UserStats | null>(null)
  const [activeCourses, setActiveCourses] = useState<Course[]>([])
  const [completedCourses, setCompletedCourses] = useState<Course[]>([])
  const [dailyTrivia, setDailyTrivia] = useState<DailyTrivia | null>(null)
  const [bookmarkedModules, setBookmarkedModules] = useState<any[]>([])
  const router = useRouter()

  useEffect(() => {
    const userName = localStorage.getItem("userName") || "Scholar"
    const userEmail = localStorage.getItem("userEmail") || "scholar@academia-antiqua.com"

    setUserStats({
      name: userName,
      email: userEmail,
      level: "Philosopher",
      points: 420,
      totalCourses: 3,
      completedCourses: 1,
      badges: ["🪶 Quill of Wisdom", "🌙 Observer of Stars"],
      joinDate: "November 2024",
      avatar: "/wise-philosopher-avatar.jpg",
      studyStreak: 7,
      favoriteSubject: "Filsafat",
      totalStudyTime: "24 jam",
    })

    setDailyTrivia({
      question: "Siapa yang pertama kali menggunakan kata 'Eureka!' dalam sejarah?",
      answer: "Archimedes dari Syracuse, ketika ia menemukan prinsip daya apung saat mandi.",
      scholar: "Archimedes",
      category: "Matematika Kuno",
      isRevealed: false,
    })

    setBookmarkedModules([
      {
        id: "math-1-2",
        title: "Teorema Pythagoras dalam Praktik",
        course: "Dasar Matematika Kuno",
        progress: 75,
      },
      {
        id: "phil-3-1",
        title: "Etika Aristoteles",
        course: "Filsafat Pengetahuan",
        progress: 100,
      },
    ])
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("userEmail")
    localStorage.removeItem("userName")
    router.push("/")
  }

  const getLevelProgress = (points: number) => {
    if (points < 100)
      return { current: "Apprentice", progress: points, next: "Adept", nextThreshold: 100, color: "bg-gray-500" }
    if (points < 250)
      return {
        current: "Adept",
        progress: points - 100,
        next: "Philosopher",
        nextThreshold: 150,
        color: "bg-green-600",
      }
    if (points < 500)
      return {
        current: "Philosopher",
        progress: points - 250,
        next: "Grand Sage",
        nextThreshold: 250,
        color: "bg-blue-600",
      }
    if (points < 1000)
      return {
        current: "Grand Sage",
        progress: points - 500,
        next: "Archmage",
        nextThreshold: 500,
        color: "bg-yellow-500",
      }
    return { current: "Archmage", progress: 100, next: "Master", nextThreshold: 100, color: "bg-purple-600" }
  }

  const revealTrivia = () => {
    setDailyTrivia((prev) => (prev ? { ...prev, isRevealed: true } : null))
  }

  if (!userStats) {
    return (
      <AuthGuard>
        <div className="min-h-screen bg-background parchment-texture flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <Scroll className="w-8 h-8 text-primary-foreground" />
            </div>
            <p className="text-muted-foreground">Memuat ruang kerja Scholar...</p>
          </div>
        </div>
      </AuthGuard>
    )
  }

  const levelInfo = getLevelProgress(userStats.points)

  return (
    <AuthGuard>
      <div className="min-h-screen bg-background parchment-texture">
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
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/progress">Progress</Link>
                  </Button>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/forum">Forum</Link>
                  </Button>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/hall">Hall of Scholars</Link>
                  </Button>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/codex">Codex</Link>
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Button variant="ghost" size="sm">
                  <Search className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Bell className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/profile">
                    <Settings className="w-4 h-4" />
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="font-serif text-4xl font-bold text-foreground mb-2">
              Selamat datang kembali, {userStats.name}
            </h1>
            <p className="text-xl text-muted-foreground">Lanjutkan perjalanan ilmu Anda di ruang kerja Scholar</p>
          </motion.div>

          {dailyTrivia && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
            >
              <Card className="scroll-shadow border-2 border-primary/30 bg-primary/5">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                      <Lightbulb className="w-5 h-5 text-primary" />
                    </div>
                    <CardTitle className="font-serif text-xl">Trivia Hari Ini</CardTitle>
                    <Badge variant="secondary">{dailyTrivia.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-lg font-medium">{dailyTrivia.question}</p>
                    {dailyTrivia.isRevealed ? (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-card rounded-lg border-l-4 border-primary"
                      >
                        <p className="text-muted-foreground mb-2">
                          <strong>Jawaban:</strong> {dailyTrivia.answer}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Tokoh: <span className="font-medium">{dailyTrivia.scholar}</span>
                        </p>
                      </motion.div>
                    ) : (
                      <Button onClick={revealTrivia} variant="outline">
                        Lihat Jawaban
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {bookmarkedModules.length > 0 && (
                <motion.section
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center">
                      <Bookmark className="w-5 h-5 text-accent-foreground" />
                    </div>
                    <h2 className="font-serif text-2xl font-bold text-foreground">Bookmark Terakhir</h2>
                    <Badge variant="secondary">{bookmarkedModules.length} Tersimpan</Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {bookmarkedModules.map((module) => (
                      <Card key={module.id} className="scroll-shadow hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-medium text-sm">{module.title}</h3>
                            <Bookmark className="w-4 h-4 text-primary fill-current" />
                          </div>
                          <p className="text-xs text-muted-foreground mb-3">{module.course}</p>
                          <div className="flex items-center justify-between">
                            <Progress value={module.progress} className="h-1 flex-1 mr-3" />
                            <span className="text-xs text-muted-foreground">{module.progress}%</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </motion.section>
              )}

              <motion.section
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-foreground">Meja Ilmuwan</h2>
                  <Badge variant="secondary">{activeCourses.length} Aktif</Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {activeCourses.map((course) => (
                    <Card
                      key={course.id}
                      className="scroll-shadow hover:shadow-lg transition-shadow duration-300 border-2 border-border"
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <Badge variant="outline" className="mb-2">
                            {course.category}
                          </Badge>
                          <Badge
                            variant={
                              course.difficulty === "Pemula"
                                ? "secondary"
                                : course.difficulty === "Menengah"
                                  ? "default"
                                  : course.difficulty === "Lanjutan"
                                    ? "destructive"
                                    : "default"
                            }
                          >
                            {course.difficulty}
                          </Badge>
                        </div>
                        <CardTitle className="font-serif text-lg">{course.title}</CardTitle>
                        <CardDescription className="text-sm">{course.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between text-sm mb-2">
                              <span>Progress</span>
                              <span>{course.progress}%</span>
                            </div>
                            <Progress value={course.progress} className="h-2" />
                          </div>

                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {course.estimatedTime}
                            </div>
                            <span>
                              {course.completedModules}/{course.totalModules} modul
                            </span>
                          </div>

                          <Button className="w-full" asChild>
                            <Link href={`/courses/${course.id}`}>Lanjutkan Belajar</Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {activeCourses.length === 0 && (
                  <Card className="border-2 border-dashed border-border">
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <BookOpen className="w-12 h-12 text-muted-foreground mb-4" />
                      <h3 className="font-serif text-lg font-semibold mb-2">Belum ada kursus aktif</h3>
                      <p className="text-muted-foreground text-center mb-4">
                        Mulai perjalanan ilmu Anda dengan memilih kursus yang menarik
                      </p>
                      <Button asChild>
                        <Link href="/courses">Jelajahi Kursus</Link>
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </motion.section>

              <motion.section
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center">
                    <Scroll className="w-5 h-5 text-accent-foreground" />
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-foreground">Rak Manuskrip</h2>
                  <Badge variant="secondary">{completedCourses.length} Selesai</Badge>
                </div>

                {completedCourses.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {completedCourses.map((course) => (
                      <Card key={course.id} className="scroll-shadow border-2 border-accent/30 bg-accent/5">
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <Badge variant="outline" className="mb-2">
                              {course.category}
                            </Badge>
                            <Badge className="bg-accent text-accent-foreground">Selesai</Badge>
                          </div>
                          <CardTitle className="font-serif text-lg">{course.title}</CardTitle>
                          <CardDescription className="text-sm">{course.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                            <div className="flex items-center">
                              <Award className="w-4 h-4 mr-1" />
                              Sertifikat diperoleh
                            </div>
                            <span>
                              {course.completedModules}/{course.totalModules} modul
                            </span>
                          </div>
                          <Button variant="outline" className="w-full bg-transparent" asChild>
                            <Link href={`/courses/${course.id}/certificate`}>Lihat Sertifikat</Link>
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card className="border-2 border-dashed border-border">
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <Scroll className="w-12 h-12 text-muted-foreground mb-4" />
                      <h3 className="font-serif text-lg font-semibold mb-2">Belum ada kursus selesai</h3>
                      <p className="text-muted-foreground text-center">
                        Selesaikan kursus pertama Anda untuk melihat koleksi manuskrip
                      </p>
                    </CardContent>
                  </Card>
                )}
              </motion.section>
            </div>

            <div className="space-y-6">
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Card className="scroll-shadow border-2 border-border">
                  <CardHeader className="text-center pb-4">
                    <Avatar className="w-20 h-20 mx-auto mb-4">
                      <AvatarImage src={userStats.avatar || "/placeholder.svg"} alt={userStats.name} />
                      <AvatarFallback className="text-2xl font-bold bg-primary text-primary-foreground">
                        {userStats.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <CardTitle className="font-serif text-xl">{userStats.name}</CardTitle>
                    <CardDescription>{userStats.email}</CardDescription>
                    <Badge className={`mx-auto mt-2 ${levelInfo.color} text-white`}>{levelInfo.current}</Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="p-2 bg-primary/5 rounded-lg">
                        <div className="text-lg font-bold text-primary">{userStats.studyStreak}</div>
                        <div className="text-xs text-muted-foreground">Hari Berturut</div>
                      </div>
                      <div className="p-2 bg-accent/5 rounded-lg">
                        <div className="text-lg font-bold text-accent-foreground">{userStats.totalStudyTime}</div>
                        <div className="text-xs text-muted-foreground">Total Belajar</div>
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-card/50 rounded-lg">
                      <div className="flex items-center justify-between text-sm">
                        <span>Subjek Favorit:</span>
                        <span className="font-medium text-primary">{userStats.favoriteSubject}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <Card className="scroll-shadow border-2 border-border">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center">
                        <Star className="w-5 h-5 text-accent-foreground" />
                      </div>
                      <CardTitle className="font-serif text-xl">Artefak Ilmu</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Level Progress</span>
                        <span className="text-sm text-muted-foreground">
                          {levelInfo.progress}/{levelInfo.nextThreshold}
                        </span>
                      </div>
                      <Progress value={(levelInfo.progress / levelInfo.nextThreshold) * 100} className="h-3" />
                      <p className="text-xs text-muted-foreground mt-1">
                        {levelInfo.nextThreshold - levelInfo.progress} poin lagi ke {levelInfo.next}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-primary/5 rounded-lg">
                        <div className="text-2xl font-bold text-primary">{userStats.points}</div>
                        <div className="text-xs text-muted-foreground">Essence of Knowledge</div>
                      </div>
                      <div className="text-center p-3 bg-accent/5 rounded-lg">
                        <div className="text-2xl font-bold text-accent-foreground">{userStats.completedCourses}</div>
                        <div className="text-xs text-muted-foreground">Kursus Selesai</div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-3 flex items-center">
                        <Award className="w-4 h-4 mr-2" />
                        Lencana Prestasi
                      </h4>
                      {userStats.badges.length > 0 ? (
                        <div className="space-y-2">
                          {userStats.badges.map((badge, index) => (
                            <motion.div
                              key={index}
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ duration: 0.3, delay: index * 0.1 }}
                              className="flex items-center space-x-2 p-2 bg-accent/10 rounded-lg"
                            >
                              <span className="text-lg">{badge.split(" ")[0]}</span>
                              <span className="text-sm font-medium">{badge.split(" ").slice(1).join(" ")}</span>
                            </motion.div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground">Belum ada lencana</p>
                      )}
                    </div>

                    <div className="pt-4 border-t border-border">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span>Bergabung sejak</span>
                        <span className="text-muted-foreground">{userStats.joinDate}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Total kursus</span>
                        <span className="text-muted-foreground">{userStats.totalCourses}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <Card className="scroll-shadow border-2 border-border">
                  <CardHeader>
                    <CardTitle className="font-serif text-lg">Aksi Cepat</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full justify-start bg-transparent" variant="outline" asChild>
                      <Link href="/courses">
                        <BookOpen className="w-4 h-4 mr-2" />
                        Jelajahi Kursus Baru
                      </Link>
                    </Button>
                    <Button className="w-full justify-start bg-transparent" variant="outline" asChild>
                      <Link href="/progress">
                        <TrendingUp className="w-4 h-4 mr-2" />
                        Lihat Progress Detail
                      </Link>
                    </Button>
                    <Button className="w-full justify-start bg-transparent" variant="outline" asChild>
                      <Link href="/forum">
                        <Users className="w-4 h-4 mr-2" />
                        Forum Diskusi
                      </Link>
                    </Button>
                    <Button className="w-full justify-start bg-transparent" variant="outline" asChild>
                      <Link href="/hall">
                        <Award className="w-4 h-4 mr-2" />
                        Hall of Scholars
                      </Link>
                    </Button>
                    <Button className="w-full justify-start bg-transparent" variant="outline" asChild>
                      <Link href="/codex">
                        <Scroll className="w-4 h-4 mr-2" />
                        Codex of Knowledge
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}

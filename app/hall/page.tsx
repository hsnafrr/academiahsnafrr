"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Crown, Trophy, Medal, Star, Sparkles, Users, Filter } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

// Mock leaderboard data
const mockLeaderboard = [
  {
    id: 1,
    username: "Aristoteles_Modern",
    level: "Archmage",
    points: 1250,
    badges: ["🪶", "🔭", "🌙", "⚡", "🏛️"],
    completedCourses: 3,
    avatar: "/ancient-scholar-avatar.jpg",
  },
  {
    id: 2,
    username: "Pythagoras_Seeker",
    level: "Grand Sage",
    points: 890,
    badges: ["🪶", "🔭", "🌙"],
    completedCourses: 3,
    avatar: "/wise-philosopher-avatar.jpg",
  },
  {
    id: 3,
    username: "Archimedes_Mind",
    level: "Grand Sage",
    points: 750,
    badges: ["🪶", "🔭"],
    completedCourses: 2,
    avatar: "/mathematician-avatar.jpg",
  },
  {
    id: 4,
    username: "Plato_Wisdom",
    level: "Philosopher",
    points: 480,
    badges: ["🪶"],
    completedCourses: 1,
    avatar: "/ancient-teacher-avatar.jpg",
  },
  {
    id: 5,
    username: "Galileo_Observer",
    level: "Philosopher",
    points: 420,
    badges: ["🪶", "🌙"],
    completedCourses: 1,
    avatar: "/astronomer-avatar.jpg",
  },
  {
    id: 6,
    username: "Ibn_Sina_Scholar",
    level: "Adept",
    points: 320,
    badges: ["🪶"],
    completedCourses: 1,
    avatar: "/medieval-scholar-avatar.jpg",
  },
  {
    id: 7,
    username: "Confucius_Learner",
    level: "Adept",
    points: 280,
    badges: [],
    completedCourses: 0,
    avatar: "/eastern-philosopher-avatar.jpg",
  },
  {
    id: 8,
    username: "Copernicus_Student",
    level: "Apprentice",
    points: 150,
    badges: [],
    completedCourses: 0,
    avatar: "/young-scholar-avatar.jpg",
  },
]

const levelColors = {
  Archmage: "bg-gradient-to-r from-purple-600 to-pink-600 text-white",
  "Grand Sage": "bg-gradient-to-r from-yellow-500 to-orange-500 text-white",
  Philosopher: "bg-gradient-to-r from-blue-600 to-indigo-600 text-white",
  Adept: "bg-gradient-to-r from-green-600 to-teal-600 text-white",
  Apprentice: "bg-gradient-to-r from-gray-500 to-gray-600 text-white",
}

export default function HallOfScholars() {
  const [filter, setFilter] = useState("all")
  const [courseFilter, setCourseFilter] = useState("all")

  const filteredLeaderboard = mockLeaderboard.filter((scholar) => {
    if (filter !== "all" && scholar.level !== filter) return false
    if (courseFilter !== "all") {
      // In a real app, you'd filter by specific course completion
      return true
    }
    return true
  })

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />
      case 2:
        return <Trophy className="w-6 h-6 text-gray-400" />
      case 3:
        return <Medal className="w-6 h-6 text-amber-600" />
      default:
        return (
          <span className="w-6 h-6 flex items-center justify-center text-lg font-bold text-muted-foreground">
            #{rank}
          </span>
        )
    }
  }

  return (
    <div className="min-h-screen bg-background parchment-texture">
      {/* Floating Ancient Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-primary/10"
            initial={{
              x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1200),
              y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 800),
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 360],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 3,
            }}
          >
            <Star className="w-6 h-6" />
          </motion.div>
        ))}
      </div>

      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 border-b border-border bg-card/50 backdrop-blur-sm"
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild>
                <Link href="/">← Kembali ke Beranda</Link>
              </Button>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild>
                <Link href="/login">Masuk</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Bergabung</Link>
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative z-10 py-16 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mr-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground mb-2">Hall of Scholars</h1>
                <p className="text-xl text-muted-foreground">Aula Kehormatan Para Pencari Ilmu</p>
              </div>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Saksikan perjalanan para scholar terbaik Academia Antiqua dalam menguasai kearifan kuno. Bergabunglah
              dengan mereka dalam pencarian pengetahuan yang tak pernah berakhir.
            </p>
          </motion.div>

          {/* Stats Overview */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto mb-12"
          >
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">{mockLeaderboard.length}</div>
                <div className="text-muted-foreground">Total Scholars</div>
              </CardContent>
            </Card>
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">
                  {mockLeaderboard.reduce((sum, scholar) => sum + scholar.completedCourses, 0)}
                </div>
                <div className="text-muted-foreground">Kursus Diselesaikan</div>
              </CardContent>
            </Card>
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">
                  {Math.max(...mockLeaderboard.map((s) => s.points))}
                </div>
                <div className="text-muted-foreground">Poin Tertinggi</div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="relative z-10 py-8 px-4 bg-card/30">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col md:flex-row gap-4 items-center justify-between"
          >
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-muted-foreground" />
              <span className="font-semibold">Filter Scholars:</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Level</SelectItem>
                  <SelectItem value="Archmage">Archmage</SelectItem>
                  <SelectItem value="Grand Sage">Grand Sage</SelectItem>
                  <SelectItem value="Philosopher">Philosopher</SelectItem>
                  <SelectItem value="Adept">Adept</SelectItem>
                  <SelectItem value="Apprentice">Apprentice</SelectItem>
                </SelectContent>
              </Select>
              <Select value={courseFilter} onValueChange={setCourseFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by Course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Kursus</SelectItem>
                  <SelectItem value="math">Matematika Kuno</SelectItem>
                  <SelectItem value="science">Ilmu Alam</SelectItem>
                  <SelectItem value="philosophy">Filsafat</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Leaderboard */}
      <section className="relative z-10 py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="space-y-4">
            {filteredLeaderboard.map((scholar, index) => {
              const rank = index + 1
              const isTopThree = rank <= 3

              return (
                <motion.div
                  key={scholar.id}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                >
                  <Card
                    className={`relative overflow-hidden ${isTopThree ? "border-2 border-primary/50 shadow-lg" : ""}`}
                  >
                    {isTopThree && (
                      <div className="absolute inset-0 pointer-events-none">
                        {[...Array(3)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute text-primary/20"
                            initial={{ opacity: 0 }}
                            animate={{
                              opacity: [0, 1, 0],
                              scale: [0.8, 1.2, 0.8],
                              x: Math.random() * 300,
                              y: Math.random() * 100,
                            }}
                            transition={{
                              duration: 2,
                              repeat: Number.POSITIVE_INFINITY,
                              delay: i * 0.7,
                            }}
                          >
                            <Sparkles className="w-4 h-4" />
                          </motion.div>
                        ))}
                      </div>
                    )}

                    <CardContent className="p-6">
                      <div className="flex items-center space-x-6">
                        {/* Rank */}
                        <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
                          {getRankIcon(rank)}
                        </div>

                        {/* Avatar */}
                        <div className="flex-shrink-0">
                          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-border">
                            <img
                              src={scholar.avatar || "/placeholder.svg"}
                              alt={scholar.username}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>

                        {/* Scholar Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-serif text-xl font-bold text-foreground truncate">
                              {scholar.username}
                            </h3>
                            <Badge className={levelColors[scholar.level as keyof typeof levelColors]}>
                              {scholar.level}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span>{scholar.points} Essence Points</span>
                            <span>{scholar.completedCourses} Kursus Selesai</span>
                          </div>
                        </div>

                        {/* Badges */}
                        <div className="flex-shrink-0">
                          <div className="flex items-center space-x-1">
                            {scholar.badges.length > 0 ? (
                              scholar.badges.map((badge, badgeIndex) => (
                                <motion.span
                                  key={badgeIndex}
                                  className="text-2xl"
                                  whileHover={{ scale: 1.2, rotate: 10 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  {badge}
                                </motion.span>
                              ))
                            ) : (
                              <span className="text-muted-foreground text-sm">Belum ada lencana</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center mt-12 p-8 bg-card/50 rounded-lg backdrop-blur-sm"
          >
            <h3 className="font-serif text-2xl font-bold text-foreground mb-4">Bergabunglah dengan Hall of Scholars</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Mulai perjalanan pembelajaran Anda dan raih tempat di antara para scholar terbaik Academia Antiqua. Setiap
              modul yang diselesaikan membawa Anda lebih dekat dengan kearifan kuno.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/register">Mulai Perjalanan Ilmu</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/courses">Jelajahi Kursus</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

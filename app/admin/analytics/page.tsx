"use client"

import { useState, useEffect } from "react"
import { AuthGuard } from "@/components/auth-guard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Users,
  BookOpen,
  Award,
  BarChart3,
  Activity,
  Star,
  Clock,
} from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

interface AnalyticsData {
  userGrowth: Array<{ month: string; users: number; growth: number }>
  courseStats: Array<{ course: string; completions: number; avgScore: number; rating: number }>
  engagementMetrics: {
    dailyActiveUsers: number
    avgSessionTime: string
    bounceRate: number
    retentionRate: number
  }
  topPerformers: Array<{ name: string; points: number; level: string }>
}

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [timeRange, setTimeRange] = useState("30d")

  useEffect(() => {
    // Mock analytics data
    setAnalytics({
      userGrowth: [
        { month: "Jan", users: 120, growth: 15 },
        { month: "Feb", users: 180, growth: 50 },
        { month: "Mar", users: 240, growth: 33 },
        { month: "Apr", users: 320, growth: 33 },
        { month: "May", users: 450, growth: 41 },
        { month: "Jun", users: 580, growth: 29 },
      ],
      courseStats: [
        { course: "Dasar Matematika Kuno", completions: 245, avgScore: 87, rating: 4.8 },
        { course: "Ilmu Alam", completions: 189, avgScore: 82, rating: 4.6 },
        { course: "Filsafat Pengetahuan", completions: 312, avgScore: 91, rating: 4.9 },
      ],
      engagementMetrics: {
        dailyActiveUsers: 892,
        avgSessionTime: "24 menit",
        bounceRate: 23,
        retentionRate: 78,
      },
      topPerformers: [
        { name: "Aristoteles Modern", points: 1250, level: "Archmage" },
        { name: "Pythagoras Seeker", points: 890, level: "Grand Sage" },
        { name: "Galileo Observer", points: 750, level: "Philosopher" },
      ],
    })
  }, [timeRange])

  if (!analytics) {
    return (
      <AuthGuard>
        <div className="min-h-screen bg-background parchment-texture flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="w-16 h-16 text-primary mx-auto mb-4 animate-pulse" />
            <p className="text-muted-foreground">Memuat data analitik...</p>
          </div>
        </div>
      </AuthGuard>
    )
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-background parchment-texture">
        {/* Header */}
        <header className="border-b border-border bg-card/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <Button variant="ghost" asChild>
                <Link href="/admin">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Kembali ke Admin Dashboard
                </Link>
              </Button>
              <div className="flex items-center space-x-4">
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7d">7 Hari</SelectItem>
                    <SelectItem value="30d">30 Hari</SelectItem>
                    <SelectItem value="90d">90 Hari</SelectItem>
                    <SelectItem value="1y">1 Tahun</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8 max-w-7xl">
          {/* Page Header */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="font-serif text-4xl font-bold text-foreground mb-2">Analitik & Insights</h1>
            <p className="text-xl text-muted-foreground">Pantau performa dan engagement Academia Antiqua</p>
          </motion.div>

          {/* Key Metrics */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            <Card className="scroll-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Daily Active Users</p>
                    <p className="text-2xl font-bold">{analytics.engagementMetrics.dailyActiveUsers}</p>
                    <div className="flex items-center space-x-1 mt-1">
                      <TrendingUp className="w-3 h-3 text-green-600" />
                      <span className="text-xs text-green-600">+12% dari kemarin</span>
                    </div>
                  </div>
                  <Activity className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card className="scroll-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Avg Session Time</p>
                    <p className="text-2xl font-bold">{analytics.engagementMetrics.avgSessionTime}</p>
                    <div className="flex items-center space-x-1 mt-1">
                      <TrendingUp className="w-3 h-3 text-green-600" />
                      <span className="text-xs text-green-600">+8% dari minggu lalu</span>
                    </div>
                  </div>
                  <Clock className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="scroll-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Retention Rate</p>
                    <p className="text-2xl font-bold">{analytics.engagementMetrics.retentionRate}%</p>
                    <div className="flex items-center space-x-1 mt-1">
                      <TrendingUp className="w-3 h-3 text-green-600" />
                      <span className="text-xs text-green-600">+3% dari bulan lalu</span>
                    </div>
                  </div>
                  <Users className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="scroll-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Bounce Rate</p>
                    <p className="text-2xl font-bold">{analytics.engagementMetrics.bounceRate}%</p>
                    <div className="flex items-center space-x-1 mt-1">
                      <TrendingDown className="w-3 h-3 text-green-600" />
                      <span className="text-xs text-green-600">-5% dari bulan lalu</span>
                    </div>
                  </div>
                  <BarChart3 className="w-8 h-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Course Performance */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="scroll-shadow">
                <CardHeader>
                  <CardTitle className="font-serif text-xl flex items-center">
                    <BookOpen className="w-5 h-5 mr-2" />
                    Performa Kursus
                  </CardTitle>
                  <CardDescription>Statistik penyelesaian dan rating kursus</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {analytics.courseStats.map((course, index) => (
                      <div key={index} className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-sm">{course.course}</h3>
                          <div className="flex items-center space-x-2">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="text-sm font-medium">{course.rating}</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Penyelesaian</p>
                            <p className="font-semibold">{course.completions} scholar</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Skor Rata-rata</p>
                            <p className="font-semibold">{course.avgScore}%</p>
                          </div>
                        </div>

                        <Progress value={course.avgScore} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Top Performers */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Card className="scroll-shadow">
                <CardHeader>
                  <CardTitle className="font-serif text-xl flex items-center">
                    <Award className="w-5 h-5 mr-2" />
                    Top Performers
                  </CardTitle>
                  <CardDescription>Scholar dengan performa terbaik bulan ini</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analytics.topPerformers.map((performer, index) => (
                      <div key={index} className="flex items-center space-x-4 p-3 bg-muted/20 rounded-lg">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-sm font-bold text-primary-foreground">
                          #{index + 1}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{performer.name}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge className="text-xs">{performer.level}</Badge>
                            <span className="text-sm text-muted-foreground">{performer.points} poin</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-primary">{performer.points}</div>
                          <div className="text-xs text-muted-foreground">Essence Points</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* User Growth Chart */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-8"
          >
            <Card className="scroll-shadow">
              <CardHeader>
                <CardTitle className="font-serif text-xl flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Pertumbuhan Pengguna
                </CardTitle>
                <CardDescription>Tren registrasi scholar dalam 6 bulan terakhir</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics.userGrowth.map((data, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="w-12 text-sm font-medium">{data.month}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm">{data.users} scholar</span>
                          <div className="flex items-center space-x-1">
                            <TrendingUp className="w-3 h-3 text-green-600" />
                            <span className="text-xs text-green-600">+{data.growth}%</span>
                          </div>
                        </div>
                        <Progress value={(data.users / 600) * 100} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </AuthGuard>
  )
}

"use client"

import { AuthGuard } from "@/components/auth-guard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  BookOpen,
  Scroll,
  Users,
  Award,
  TrendingUp,
  Plus,
  Settings,
  BarChart3,
  Shield,
  LogOut,
  Bell,
  Crown,
  Star,
  Calendar,
} from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface AdminStats {
  totalUsers: number
  totalCourses: number
  totalModules: number
  activeUsers: number
  completedCourses: number
  totalPoints: number
  newUsersThisWeek: number
  coursesCompletedThisWeek: number
}

interface RecentActivity {
  id: string
  type: "user_joined" | "course_completed" | "module_completed"
  user: string
  description: string
  timestamp: string
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([])
  const [isAdmin, setIsAdmin] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check admin access (simple demo - in real app would verify JWT/role)
    const userEmail = localStorage.getItem("userEmail")
    if (userEmail === "admin@academia-antiqua.com") {
      setIsAdmin(true)
    } else {
      // Redirect non-admin users
      router.push("/dashboard")
      return
    }

    // Mock admin stats
    setStats({
      totalUsers: 1247,
      totalCourses: 6,
      totalModules: 18,
      activeUsers: 892,
      completedCourses: 3421,
      totalPoints: 125670,
      newUsersThisWeek: 23,
      coursesCompletedThisWeek: 67,
    })

    // Mock recent activity
    setRecentActivity([
      {
        id: "1",
        type: "user_joined",
        user: "Scholar Aristotle",
        description: "Bergabung dengan Academia Antiqua",
        timestamp: "2 menit yang lalu",
      },
      {
        id: "2",
        type: "course_completed",
        user: "Scholar Plato",
        description: "Menyelesaikan kursus Filsafat Pengetahuan",
        timestamp: "15 menit yang lalu",
      },
      {
        id: "3",
        type: "module_completed",
        user: "Scholar Pythagoras",
        description: "Menyelesaikan modul Teorema Pythagoras",
        timestamp: "1 jam yang lalu",
      },
      {
        id: "4",
        type: "user_joined",
        user: "Scholar Archimedes",
        description: "Bergabung dengan Academia Antiqua",
        timestamp: "2 jam yang lalu",
      },
      {
        id: "5",
        type: "course_completed",
        user: "Scholar Euclid",
        description: "Menyelesaikan kursus Dasar Matematika Kuno",
        timestamp: "3 jam yang lalu",
      },
    ])
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("userEmail")
    localStorage.removeItem("userName")
    router.push("/")
  }

  if (!isAdmin) {
    return (
      <AuthGuard>
        <div className="min-h-screen bg-background parchment-texture flex items-center justify-center">
          <div className="text-center">
            <Shield className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-serif text-xl font-semibold mb-2">Akses Terbatas</h3>
            <p className="text-muted-foreground mb-4">Anda tidak memiliki akses ke panel administrasi</p>
            <Button asChild>
              <Link href="/dashboard">Kembali ke Dashboard</Link>
            </Button>
          </div>
        </div>
      </AuthGuard>
    )
  }

  if (!stats) {
    return (
      <AuthGuard>
        <div className="min-h-screen bg-background parchment-texture flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <Crown className="w-8 h-8 text-primary-foreground" />
            </div>
            <p className="text-muted-foreground">Memuat panel administrasi...</p>
          </div>
        </div>
      </AuthGuard>
    )
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "user_joined":
        return <Users className="w-4 h-4 text-green-600" />
      case "course_completed":
        return <Award className="w-4 h-4 text-blue-600" />
      case "module_completed":
        return <BookOpen className="w-4 h-4 text-purple-600" />
      default:
        return <Star className="w-4 h-4 text-gray-600" />
    }
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
                    <Crown className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h1 className="font-serif text-xl font-bold text-foreground">Academia Antiqua</h1>
                    <p className="text-xs text-muted-foreground">Panel Administrasi</p>
                  </div>
                </Link>
                <div className="hidden md:flex items-center space-x-1 ml-8">
                  <Button variant="ghost" size="sm" className="bg-primary/10">
                    <Link href="/admin">Dashboard</Link>
                  </Button>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/admin/courses">Kursus</Link>
                  </Button>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/admin/users">Pengguna</Link>
                  </Button>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/admin/analytics">Analitik</Link>
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
            <h1 className="font-serif text-4xl font-bold text-foreground mb-2">Panel Master Scholar</h1>
            <p className="text-xl text-muted-foreground">
              Kelola Academia Antiqua dan pantau perjalanan pembelajaran para Scholar
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="scroll-shadow border-2 border-border">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Scholar</CardTitle>
                  <Users className="w-4 h-4 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stats.totalUsers.toLocaleString()}</div>
                <div className="flex items-center space-x-1 mt-1">
                  <TrendingUp className="w-3 h-3 text-green-600" />
                  <span className="text-xs text-green-600">+{stats.newUsersThisWeek} minggu ini</span>
                </div>
              </CardContent>
            </Card>

            <Card className="scroll-shadow border-2 border-border">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Kursus</CardTitle>
                  <BookOpen className="w-4 h-4 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stats.totalCourses}</div>
                <div className="text-xs text-muted-foreground mt-1">{stats.totalModules} modul total</div>
              </CardContent>
            </Card>

            <Card className="scroll-shadow border-2 border-border">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Scholar Aktif</CardTitle>
                  <Star className="w-4 h-4 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stats.activeUsers.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {Math.round((stats.activeUsers / stats.totalUsers) * 100)}% dari total
                </div>
              </CardContent>
            </Card>

            <Card className="scroll-shadow border-2 border-border">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Essence Terkumpul</CardTitle>
                  <Award className="w-4 h-4 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stats.totalPoints.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground mt-1">Total poin pembelajaran</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Quick Actions */}
              <Card className="scroll-shadow border-2 border-border">
                <CardHeader>
                  <CardTitle className="font-serif text-2xl flex items-center">
                    <Settings className="w-6 h-6 mr-3 text-primary" />
                    Aksi Cepat
                  </CardTitle>
                  <CardDescription>Kelola konten dan pengguna Academia Antiqua</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button className="h-20 flex-col space-y-2" asChild>
                      <Link href="/admin/courses/new">
                        <Plus className="w-6 h-6" />
                        <span>Buat Kursus Baru</span>
                      </Link>
                    </Button>
                    <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent" asChild>
                      <Link href="/admin/courses">
                        <BookOpen className="w-6 h-6" />
                        <span>Kelola Kursus</span>
                      </Link>
                    </Button>
                    <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent" asChild>
                      <Link href="/admin/users">
                        <Users className="w-6 h-6" />
                        <span>Kelola Pengguna</span>
                      </Link>
                    </Button>
                    <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent" asChild>
                      <Link href="/admin/analytics">
                        <BarChart3 className="w-6 h-6" />
                        <span>Lihat Analitik</span>
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="scroll-shadow border-2 border-border">
                <CardHeader>
                  <CardTitle className="font-serif text-2xl flex items-center">
                    <Calendar className="w-6 h-6 mr-3 text-primary" />
                    Aktivitas Terkini
                  </CardTitle>
                  <CardDescription>Pantau aktivitas terbaru para Scholar</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-center space-x-3 p-3 bg-muted/20 rounded-lg">
                        <div className="w-8 h-8 bg-background rounded-full flex items-center justify-center">
                          {getActivityIcon(activity.type)}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{activity.user}</p>
                          <p className="text-xs text-muted-foreground">{activity.description}</p>
                        </div>
                        <div className="text-xs text-muted-foreground">{activity.timestamp}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* System Status */}
              <Card className="scroll-shadow border-2 border-border">
                <CardHeader>
                  <CardTitle className="font-serif text-lg">Status Sistem</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Server Status</span>
                    <Badge className="bg-green-100 text-green-800 border-green-200">Online</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Database</span>
                    <Badge className="bg-green-100 text-green-800 border-green-200">Healthy</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Cache</span>
                    <Badge className="bg-green-100 text-green-800 border-green-200">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Backup</span>
                    <Badge className="bg-blue-100 text-blue-800 border-blue-200">2 jam lalu</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Weekly Summary */}
              <Card className="scroll-shadow border-2 border-border">
                <CardHeader>
                  <CardTitle className="font-serif text-lg">Ringkasan Minggu Ini</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm">Scholar Baru</span>
                    <span className="font-semibold">{stats.newUsersThisWeek}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Kursus Selesai</span>
                    <span className="font-semibold">{stats.coursesCompletedThisWeek}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Tingkat Engagement</span>
                    <span className="font-semibold">87%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Rating Rata-rata</span>
                    <span className="font-semibold">4.8/5</span>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Links */}
              <Card className="scroll-shadow border-2 border-border">
                <CardHeader>
                  <CardTitle className="font-serif text-lg">Tautan Cepat</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="ghost" className="w-full justify-start bg-transparent" asChild>
                    <Link href="/admin/settings">
                      <Settings className="w-4 h-4 mr-2" />
                      Pengaturan Sistem
                    </Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start bg-transparent" asChild>
                    <Link href="/admin/backup">
                      <Shield className="w-4 h-4 mr-2" />
                      Backup & Restore
                    </Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start bg-transparent" asChild>
                    <Link href="/admin/logs">
                      <Scroll className="w-4 h-4 mr-2" />
                      Log Sistem
                    </Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start bg-transparent" asChild>
                    <Link href="/dashboard">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Lihat sebagai Scholar
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}

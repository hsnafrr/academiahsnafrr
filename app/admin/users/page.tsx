"use client"

import { useState, useEffect } from "react"
import { AuthGuard } from "@/components/auth-guard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Search, Filter, Ban, RotateCcw, Award, Mail, TrendingUp, Users, Crown } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

interface User {
  id: string
  name: string
  email: string
  avatar: string
  level: string
  points: number
  joinDate: string
  lastActive: string
  status: "active" | "banned" | "inactive"
  coursesCompleted: number
  forumPosts: number
  badges: string[]
}

export default function UsersManagement() {
  const [users, setUsers] = useState<User[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [levelFilter, setLevelFilter] = useState("all")

  useEffect(() => {
    // Mock users data
    setUsers([
      {
        id: "1",
        name: "Aristoteles Modern",
        email: "aristoteles@academia.com",
        avatar: "/wise-philosopher-avatar.jpg",
        level: "Archmage",
        points: 1250,
        joinDate: "2024-01-15",
        lastActive: "2 jam yang lalu",
        status: "active",
        coursesCompleted: 3,
        forumPosts: 45,
        badges: ["🪶", "🔭", "🌙", "⚡", "🏛️"],
      },
      {
        id: "2",
        name: "Pythagoras Seeker",
        email: "pythagoras@academia.com",
        avatar: "/mathematician-avatar.jpg",
        level: "Grand Sage",
        points: 890,
        joinDate: "2024-02-20",
        lastActive: "1 hari yang lalu",
        status: "active",
        coursesCompleted: 2,
        forumPosts: 28,
        badges: ["🪶", "🔭", "🌙"],
      },
      {
        id: "3",
        name: "Spam User",
        email: "spam@example.com",
        avatar: "/placeholder.svg",
        level: "Apprentice",
        points: 50,
        joinDate: "2024-11-01",
        lastActive: "1 minggu yang lalu",
        status: "banned",
        coursesCompleted: 0,
        forumPosts: 0,
        badges: [],
      },
      {
        id: "4",
        name: "Galileo Observer",
        email: "galileo@academia.com",
        avatar: "/astronomer-avatar.jpg",
        level: "Philosopher",
        points: 420,
        joinDate: "2024-03-10",
        lastActive: "3 hari yang lalu",
        status: "inactive",
        coursesCompleted: 1,
        forumPosts: 12,
        badges: ["🪶", "🌙"],
      },
    ])
  }, [])

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || user.status === statusFilter
    const matchesLevel = levelFilter === "all" || user.level === levelFilter

    return matchesSearch && matchesStatus && matchesLevel
  })

  const handleBanUser = (userId: string) => {
    setUsers((prev) => prev.map((user) => (user.id === userId ? { ...user, status: "banned" as const } : user)))
  }

  const handleUnbanUser = (userId: string) => {
    setUsers((prev) => prev.map((user) => (user.id === userId ? { ...user, status: "active" as const } : user)))
  }

  const handleResetPassword = (userId: string) => {
    // In real app, would send password reset email
    alert(`Password reset email sent to user ${userId}`)
  }

  const handleAddBadge = (userId: string, badge: string) => {
    setUsers((prev) => prev.map((user) => (user.id === userId ? { ...user, badges: [...user.badges, badge] } : user)))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "banned":
        return "bg-red-100 text-red-800"
      case "inactive":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Archmage":
        return "bg-purple-600 text-white"
      case "Grand Sage":
        return "bg-yellow-500 text-white"
      case "Philosopher":
        return "bg-blue-600 text-white"
      case "Adept":
        return "bg-green-600 text-white"
      case "Apprentice":
        return "bg-gray-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
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
                <Button asChild>
                  <Link href="/admin/users/invite">
                    <Mail className="w-4 h-4 mr-2" />
                    Undang Scholar Baru
                  </Link>
                </Button>
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
            <h1 className="font-serif text-4xl font-bold text-foreground mb-2">Manajemen Scholar</h1>
            <p className="text-xl text-muted-foreground">
              Kelola pengguna, status, dan prestasi para Scholar Academia Antiqua
            </p>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          >
            <Card className="scroll-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Scholar</p>
                    <p className="text-2xl font-bold">{users.length}</p>
                  </div>
                  <Users className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card className="scroll-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Scholar Aktif</p>
                    <p className="text-2xl font-bold">{users.filter((u) => u.status === "active").length}</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="scroll-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Scholar Banned</p>
                    <p className="text-2xl font-bold">{users.filter((u) => u.status === "banned").length}</p>
                  </div>
                  <Ban className="w-8 h-8 text-red-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="scroll-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Archmage</p>
                    <p className="text-2xl font-bold">{users.filter((u) => u.level === "Archmage").length}</p>
                  </div>
                  <Crown className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8"
          >
            <div className="flex items-center space-x-4 w-full md:w-auto">
              <div className="relative flex-1 md:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Cari scholar atau email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Filter:</span>
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status</SelectItem>
                  <SelectItem value="active">Aktif</SelectItem>
                  <SelectItem value="banned">Banned</SelectItem>
                  <SelectItem value="inactive">Tidak Aktif</SelectItem>
                </SelectContent>
              </Select>

              <Select value={levelFilter} onValueChange={setLevelFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue />
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
            </div>
          </motion.div>

          {/* Users Table */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card className="scroll-shadow">
              <CardHeader>
                <CardTitle className="font-serif text-xl">Daftar Scholar</CardTitle>
                <CardDescription>
                  Menampilkan {filteredUsers.length} dari {users.length} scholar
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredUsers.map((user, index) => (
                    <motion.div
                      key={user.id}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="flex items-center space-x-4 p-4 bg-card/50 rounded-lg border"
                    >
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-3 mb-1">
                          <h3 className="font-medium text-foreground truncate">{user.name}</h3>
                          <Badge className={getLevelColor(user.level)}>{user.level}</Badge>
                          <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                        </div>

                        <p className="text-sm text-muted-foreground mb-2">{user.email}</p>

                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span>{user.points} poin</span>
                          <span>•</span>
                          <span>{user.coursesCompleted} kursus selesai</span>
                          <span>•</span>
                          <span>{user.forumPosts} forum posts</span>
                          <span>•</span>
                          <span>Bergabung: {new Date(user.joinDate).toLocaleDateString("id-ID")}</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        {user.badges.slice(0, 3).map((badge, i) => (
                          <span key={i} className="text-lg">
                            {badge}
                          </span>
                        ))}
                        {user.badges.length > 3 && (
                          <span className="text-xs text-muted-foreground">+{user.badges.length - 3}</span>
                        )}
                      </div>

                      <div className="flex items-center space-x-2">
                        {user.status === "banned" ? (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleUnbanUser(user.id)}
                            className="bg-transparent"
                          >
                            <RotateCcw className="w-4 h-4 mr-1" />
                            Unban
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleBanUser(user.id)}
                            className="bg-transparent text-red-600 hover:text-red-700"
                          >
                            <Ban className="w-4 h-4 mr-1" />
                            Ban
                          </Button>
                        )}

                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleResetPassword(user.id)}
                          className="bg-transparent"
                        >
                          <RotateCcw className="w-4 h-4 mr-1" />
                          Reset PW
                        </Button>

                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleAddBadge(user.id, "🎖️")}
                          className="bg-transparent"
                        >
                          <Award className="w-4 h-4 mr-1" />
                          Badge
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {filteredUsers.length === 0 && (
                  <div className="text-center py-12">
                    <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-serif text-xl font-semibold mb-2">Tidak ada scholar ditemukan</h3>
                    <p className="text-muted-foreground">Coba ubah filter atau kata kunci pencarian Anda.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </AuthGuard>
  )
}

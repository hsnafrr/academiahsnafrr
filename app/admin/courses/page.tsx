"use client"

import { AuthGuard } from "@/components/auth-guard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  BookOpen,
  Crown,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  Users,
  Star,
  ArrowLeft,
  LogOut,
  Settings,
  Bell,
  Eye,
} from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface Course {
  id: string
  title: string
  description: string
  category: string
  difficulty: "Pemula" | "Menengah" | "Lanjutan"
  modules: number
  students: number
  rating: number
  status: "published" | "draft" | "archived"
  createdAt: string
  updatedAt: string
}

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [isAdmin, setIsAdmin] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check admin access
    const userEmail = localStorage.getItem("userEmail")
    if (userEmail !== "admin@academia-antiqua.com") {
      router.push("/dashboard")
      return
    }
    setIsAdmin(true)

    // Mock courses data
    setCourses([
      {
        id: "1",
        title: "Dasar Matematika Kuno",
        description: "Pelajari sistem numerik dan geometri yang digunakan oleh peradaban kuno",
        category: "Matematika",
        difficulty: "Pemula",
        modules: 3,
        students: 245,
        rating: 4.8,
        status: "published",
        createdAt: "2024-10-15",
        updatedAt: "2024-11-18",
      },
      {
        id: "2",
        title: "Ilmu Alam",
        description: "Jelajahi pemahaman para ilmuwan kuno tentang alam semesta",
        category: "Sains",
        difficulty: "Menengah",
        modules: 3,
        students: 189,
        rating: 4.7,
        status: "published",
        createdAt: "2024-10-20",
        updatedAt: "2024-11-19",
      },
      {
        id: "3",
        title: "Filsafat Pengetahuan",
        description: "Dalami pemikiran para filsuf besar tentang hakikat pengetahuan",
        category: "Filsafat",
        difficulty: "Lanjutan",
        modules: 3,
        students: 312,
        rating: 4.9,
        status: "published",
        createdAt: "2024-11-01",
        updatedAt: "2024-11-20",
      },
      {
        id: "4",
        title: "Sejarah Peradaban Kuno",
        description: "Telusuri jejak peradaban besar dunia kuno",
        category: "Sejarah",
        difficulty: "Pemula",
        modules: 4,
        students: 156,
        rating: 4.6,
        status: "draft",
        createdAt: "2024-11-15",
        updatedAt: "2024-11-20",
      },
      {
        id: "5",
        title: "Astronomi Kuno",
        description: "Pelajari bagaimana peradaban kuno memahami langit",
        category: "Sains",
        difficulty: "Menengah",
        modules: 3,
        students: 98,
        rating: 4.8,
        status: "published",
        createdAt: "2024-11-10",
        updatedAt: "2024-11-19",
      },
      {
        id: "6",
        title: "Seni dan Arsitektur Klasik",
        description: "Apresiasi keindahan seni dan arsitektur peradaban kuno",
        category: "Seni",
        difficulty: "Pemula",
        modules: 3,
        students: 203,
        rating: 4.5,
        status: "archived",
        createdAt: "2024-09-20",
        updatedAt: "2024-10-15",
      },
    ])
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("userEmail")
    localStorage.removeItem("userName")
    router.push("/")
  }

  const handleDeleteCourse = (courseId: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus kursus ini?")) {
      setCourses(courses.filter((course) => course.id !== courseId))
    }
  }

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || course.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800 border-green-200"
      case "draft":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "archived":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Pemula":
        return "bg-green-100 text-green-800 border-green-200"
      case "Menengah":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Lanjutan":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  if (!isAdmin) {
    return null
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
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/admin">Dashboard</Link>
                  </Button>
                  <Button variant="ghost" size="sm" className="bg-primary/10">
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
            <Button variant="ghost" size="sm" asChild className="mb-4">
              <Link href="/admin">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kembali ke Dashboard
              </Link>
            </Button>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-serif text-4xl font-bold text-foreground mb-2">Kelola Kursus</h1>
                <p className="text-xl text-muted-foreground">Buat, edit, dan kelola gulungan ilmu pengetahuan</p>
              </div>
              <Button asChild>
                <Link href="/admin/courses/new">
                  <Plus className="w-4 h-4 mr-2" />
                  Buat Kursus Baru
                </Link>
              </Button>
            </div>
          </div>

          {/* Search and Filter */}
          <Card className="scroll-shadow border-2 border-border mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Cari kursus..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-background border-border focus:border-accent"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-muted-foreground" />
                  <div className="flex gap-2">
                    {["all", "published", "draft", "archived"].map((status) => (
                      <Button
                        key={status}
                        variant={selectedStatus === status ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedStatus(status)}
                        className="text-xs"
                      >
                        {status === "all"
                          ? "Semua"
                          : status === "published"
                            ? "Terbit"
                            : status === "draft"
                              ? "Draft"
                              : "Arsip"}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Courses Table */}
          <Card className="scroll-shadow border-2 border-border">
            <CardHeader>
              <CardTitle className="font-serif text-2xl flex items-center">
                <BookOpen className="w-6 h-6 mr-3 text-primary" />
                Daftar Kursus ({filteredCourses.length})
              </CardTitle>
              <CardDescription>Kelola semua kursus yang tersedia di Academia Antiqua</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredCourses.map((course) => (
                  <Card key={course.id} className="border transition-all duration-200 hover:shadow-md">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-serif text-lg font-semibold">{course.title}</h3>
                            <Badge className={`border text-xs ${getStatusColor(course.status)}`}>
                              {course.status === "published" ? "Terbit" : course.status === "draft" ? "Draft" : "Arsip"}
                            </Badge>
                            <Badge className={`border text-xs ${getDifficultyColor(course.difficulty)}`}>
                              {course.difficulty}
                            </Badge>
                          </div>

                          <p className="text-muted-foreground mb-3 line-clamp-2">{course.description}</p>

                          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <BookOpen className="w-4 h-4" />
                              <span>{course.modules} modul</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Users className="w-4 h-4" />
                              <span>{course.students} pelajar</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 fill-current text-yellow-400" />
                              <span>{course.rating}</span>
                            </div>
                            <div>
                              <span>Kategori: {course.category}</span>
                            </div>
                          </div>

                          <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-2">
                            <span>Dibuat: {course.createdAt}</span>
                            <span>Diperbarui: {course.updatedAt}</span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 ml-4">
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/courses/${course.id}`}>
                              <Eye className="w-4 h-4" />
                            </Link>
                          </Button>
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/admin/courses/${course.id}/edit`}>
                              <Edit className="w-4 h-4" />
                            </Link>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteCourse(course.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredCourses.length === 0 && (
                <div className="text-center py-12">
                  <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-serif text-xl font-semibold mb-2">Tidak ada kursus ditemukan</h3>
                  <p className="text-muted-foreground mb-4">
                    {searchTerm || selectedStatus !== "all"
                      ? "Coba ubah filter atau kata kunci pencarian"
                      : "Belum ada kursus yang dibuat"}
                  </p>
                  <Button asChild>
                    <Link href="/admin/courses/new">
                      <Plus className="w-4 h-4 mr-2" />
                      Buat Kursus Pertama
                    </Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AuthGuard>
  )
}

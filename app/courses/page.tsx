"use client"

import { AuthGuard } from "@/components/auth-guard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { BookOpen, Scroll, Star, Users, Clock, Search, Filter, LogOut, Settings, Bell } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"

interface Course {
  id: string
  title: string
  description: string
  longDescription: string
  category: string
  difficulty: "Pemula" | "Menengah" | "Lanjutan"
  duration: string
  modules: number
  students: number
  rating: number
  instructor: string
  isEnrolled: boolean
  progress?: number
}

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Semua")
  const router = useRouter()

  const courses: Course[] = [
    {
      id: "1",
      title: "Dasar Matematika Kuno",
      description: "Pelajari sistem numerik dan geometri yang digunakan oleh peradaban kuno",
      longDescription:
        "Jelajahi sistem matematika yang dikembangkan oleh peradaban Mesir, Yunani, dan Babilonia. Pelajari bagaimana mereka memecahkan masalah geometri kompleks dan mengembangkan konsep-konsep yang masih digunakan hingga hari ini.",
      category: "Matematika",
      difficulty: "Pemula",
      duration: "6 jam",
      modules: 3,
      students: 245,
      rating: 4.8,
      instructor: "Prof. Archimedes",
      isEnrolled: true,
      progress: 65,
    },
    {
      id: "2",
      title: "Ilmu Alam",
      description: "Jelajahi pemahaman para ilmuwan kuno tentang alam semesta",
      longDescription:
        "Dari astronomi Babilonia hingga alkimia Alexandria, temukan bagaimana para ilmuwan kuno memahami dunia di sekitar mereka. Pelajari metode observasi dan eksperimen yang menjadi dasar sains modern.",
      category: "Sains",
      difficulty: "Menengah",
      duration: "8 jam",
      modules: 3,
      students: 189,
      rating: 4.7,
      instructor: "Dr. Ptolemy",
      isEnrolled: true,
      progress: 30,
    },
    {
      id: "3",
      title: "Filsafat Pengetahuan",
      description: "Dalami pemikiran para filsuf besar tentang hakikat pengetahuan",
      longDescription:
        "Eksplorasi mendalam tentang epistemologi klasik. Pelajari bagaimana Plato, Aristoteles, dan filsuf lainnya memahami sifat pengetahuan, kebenaran, dan kebijaksanaan.",
      category: "Filsafat",
      difficulty: "Lanjutan",
      duration: "10 jam",
      modules: 3,
      students: 312,
      rating: 4.9,
      instructor: "Sage Socrates",
      isEnrolled: false,
    },
    {
      id: "4",
      title: "Sejarah Peradaban Kuno",
      description: "Telusuri jejak peradaban besar dunia kuno",
      longDescription:
        "Perjalanan melalui waktu untuk memahami bagaimana peradaban Mesir, Mesopotamia, Yunani, dan Roma berkembang dan saling mempengaruhi.",
      category: "Sejarah",
      difficulty: "Pemula",
      duration: "7 jam",
      modules: 4,
      students: 156,
      rating: 4.6,
      instructor: "Dr. Herodotus",
      isEnrolled: false,
    },
    {
      id: "5",
      title: "Astronomi Kuno",
      description: "Pelajari bagaimana peradaban kuno memahami langit",
      longDescription:
        "Dari kalender Maya hingga astrolabe Arab, jelajahi bagaimana peradaban kuno mengamati dan memahami pergerakan benda langit.",
      category: "Sains",
      difficulty: "Menengah",
      duration: "9 jam",
      modules: 3,
      students: 98,
      rating: 4.8,
      instructor: "Master Hipparchus",
      isEnrolled: false,
    },
    {
      id: "6",
      title: "Seni dan Arsitektur Klasik",
      description: "Apresiasi keindahan seni dan arsitektur peradaban kuno",
      longDescription:
        "Analisis mendalam tentang prinsip-prinsip estetika dan teknik konstruksi yang digunakan dalam menciptakan karya seni dan bangunan monumental kuno.",
      category: "Seni",
      difficulty: "Pemula",
      duration: "5 jam",
      modules: 3,
      students: 203,
      rating: 4.5,
      instructor: "Artisan Phidias",
      isEnrolled: false,
    },
  ]

  const categories = ["Semua", "Matematika", "Sains", "Filsafat", "Sejarah", "Seni"]

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "Semua" || course.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("userEmail")
    localStorage.removeItem("userName")
    router.push("/")
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
                  <Button variant="ghost" size="sm" className="bg-primary/10">
                    <Link href="/courses">Kursus</Link>
                  </Button>
                  <Button variant="ghost" size="sm" asChild>
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
            <h1 className="font-serif text-4xl font-bold text-foreground mb-2">Gulungan Ilmu Pengetahuan</h1>
            <p className="text-xl text-muted-foreground">
              Jelajahi koleksi kursus kearifan kuno yang telah dikurasi khusus untuk Scholar modern
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mb-8 space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Cari kursus atau topik..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-background border-border focus:border-accent"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className="text-xs"
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <Card
                key={course.id}
                className="scroll-shadow hover:shadow-lg transition-all duration-300 border-2 border-border group"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-3">
                    <Badge variant="outline" className="text-xs">
                      {course.category}
                    </Badge>
                    <Badge className={`text-xs border ${getDifficultyColor(course.difficulty)}`}>
                      {course.difficulty}
                    </Badge>
                  </div>

                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-4 h-4 text-primary" />
                    </div>
                    {course.isEnrolled && (
                      <Badge variant="secondary" className="text-xs">
                        Terdaftar
                      </Badge>
                    )}
                  </div>

                  <CardTitle className="font-serif text-lg group-hover:text-primary transition-colors">
                    {course.title}
                  </CardTitle>
                  <CardDescription className="text-sm line-clamp-2">{course.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="text-sm text-muted-foreground">
                    <p className="mb-2">
                      Instruktur: <span className="font-medium">{course.instructor}</span>
                    </p>
                  </div>

                  {course.isEnrolled && course.progress !== undefined && (
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {course.duration}
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {course.students}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 mr-1 fill-current text-yellow-400" />
                      {course.rating}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <span>{course.modules} modul</span>
                  </div>

                  <Button className="w-full" variant={course.isEnrolled ? "default" : "outline"} asChild>
                    <Link href={`/courses/${course.id}`}>
                      {course.isEnrolled ? "Lanjutkan Belajar" : "Mulai Kursus"}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-serif text-xl font-semibold mb-2">Tidak ada kursus ditemukan</h3>
              <p className="text-muted-foreground">Coba ubah kata kunci pencarian atau filter kategori</p>
            </div>
          )}
        </div>
      </div>
    </AuthGuard>
  )
}

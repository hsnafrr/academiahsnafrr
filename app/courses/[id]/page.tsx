"use client"

import { useParams, useRouter } from "next/navigation"
import { AuthGuard } from "@/components/auth-guard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  BookOpen,
  Scroll,
  Star,
  Users,
  Clock,
  Play,
  CheckCircle,
  Lock,
  ArrowLeft,
  LogOut,
  Settings,
  Bell,
} from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

interface Module {
  id: string
  title: string
  description: string
  duration: string
  isCompleted: boolean
  isLocked: boolean
  type: "lesson" | "quiz" | "reflection"
}

interface Course {
  id: string
  title: string
  description: string
  longDescription: string
  category: string
  difficulty: "Pemula" | "Menengah" | "Lanjutan"
  duration: string
  instructor: string
  rating: number
  students: number
  progress: number
  modules: Module[]
}

export default function CoursePage() {
  const params = useParams()
  const router = useRouter()
  const [course, setCourse] = useState<Course | null>(null)

  useEffect(() => {
    // Mock course data based on ID
    const courseId = params.id as string

    const courseData: Record<string, Course> = {
      "1": {
        id: "1",
        title: "Dasar Matematika Kuno",
        description: "Pelajari sistem numerik dan geometri yang digunakan oleh peradaban kuno",
        longDescription:
          "Jelajahi sistem matematika yang dikembangkan oleh peradaban Mesir, Yunani, dan Babilonia. Pelajari bagaimana mereka memecahkan masalah geometri kompleks dan mengembangkan konsep-konsep yang masih digunakan hingga hari ini. Kursus ini akan membawa Anda dalam perjalanan melalui sejarah matematika, dari sistem bilangan hieroglif Mesir hingga teorema Pythagoras.",
        category: "Matematika",
        difficulty: "Pemula",
        duration: "6 jam",
        instructor: "Prof. Archimedes",
        rating: 4.8,
        students: 245,
        progress: 65,
        modules: [
          {
            id: "1-1",
            title: "Sistem Bilangan Mesir Kuno",
            description: "Pelajari bagaimana orang Mesir menggunakan hieroglif untuk matematika",
            duration: "2 jam",
            isCompleted: true,
            isLocked: false,
            type: "lesson",
          },
          {
            id: "1-2",
            title: "Geometri Babilonia",
            description: "Eksplorasi sistem geometri dan teorema Babilonia",
            duration: "2 jam",
            isCompleted: true,
            isLocked: false,
            type: "lesson",
          },
          {
            id: "1-3",
            title: "Teorema Pythagoras dan Aplikasinya",
            description: "Memahami salah satu teorema paling terkenal dalam sejarah",
            duration: "2 jam",
            isCompleted: false,
            isLocked: false,
            type: "lesson",
          },
        ],
      },
      "2": {
        id: "2",
        title: "Ilmu Alam",
        description: "Jelajahi pemahaman para ilmuwan kuno tentang alam semesta",
        longDescription:
          "Dari astronomi Babilonia hingga alkimia Alexandria, temukan bagaimana para ilmuwan kuno memahami dunia di sekitar mereka. Pelajari metode observasi dan eksperimen yang menjadi dasar sains modern.",
        category: "Sains",
        difficulty: "Menengah",
        duration: "8 jam",
        instructor: "Dr. Ptolemy",
        rating: 4.7,
        students: 189,
        progress: 30,
        modules: [
          {
            id: "2-1",
            title: "Astronomi Babilonia",
            description: "Sistem kalender dan prediksi astronomi kuno",
            duration: "3 jam",
            isCompleted: true,
            isLocked: false,
            type: "lesson",
          },
          {
            id: "2-2",
            title: "Alkimia Alexandria",
            description: "Asal-usul kimia modern dari praktik alkimia",
            duration: "3 jam",
            isCompleted: false,
            isLocked: false,
            type: "lesson",
          },
          {
            id: "2-3",
            title: "Fisika Aristoteles",
            description: "Pemahaman kuno tentang gerakan dan materi",
            duration: "2 jam",
            isCompleted: false,
            isLocked: true,
            type: "lesson",
          },
        ],
      },
      "3": {
        id: "3",
        title: "Filsafat Pengetahuan",
        description: "Dalami pemikiran para filsuf besar tentang hakikat pengetahuan",
        longDescription:
          "Eksplorasi mendalam tentang epistemologi klasik. Pelajari bagaimana Plato, Aristoteles, dan filsuf lainnya memahami sifat pengetahuan, kebenaran, dan kebijaksanaan.",
        category: "Filsafat",
        difficulty: "Lanjutan",
        duration: "10 jam",
        instructor: "Sage Socrates",
        rating: 4.9,
        students: 312,
        progress: 0,
        modules: [
          {
            id: "3-1",
            title: "Alegori Gua Plato",
            description: "Memahami konsep realitas dan pengetahuan menurut Plato",
            duration: "3 jam",
            isCompleted: false,
            isLocked: false,
            type: "lesson",
          },
          {
            id: "3-2",
            title: "Logika Aristoteles",
            description: "Dasar-dasar penalaran logis dan silogisme",
            duration: "4 jam",
            isCompleted: false,
            isLocked: true,
            type: "lesson",
          },
          {
            id: "3-3",
            title: "Metode Sokrates",
            description: "Seni bertanya dan mencari kebenaran",
            duration: "3 jam",
            isCompleted: false,
            isLocked: true,
            type: "lesson",
          },
        ],
      },
    }

    setCourse(courseData[courseId] || null)
  }, [params.id])

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

  if (!course) {
    return (
      <AuthGuard>
        <div className="min-h-screen bg-background parchment-texture flex items-center justify-center">
          <div className="text-center">
            <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-serif text-xl font-semibold mb-2">Kursus tidak ditemukan</h3>
            <p className="text-muted-foreground mb-4">Gulungan ilmu yang Anda cari tidak tersedia</p>
            <Button asChild>
              <Link href="/courses">Kembali ke Kursus</Link>
            </Button>
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

        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Button variant="ghost" size="sm" asChild className="mb-4">
              <Link href="/courses">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kembali ke Kursus
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Course Header */}
              <Card className="scroll-shadow border-2 border-border mb-8">
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <Badge variant="outline">{course.category}</Badge>
                    <Badge className={`border ${getDifficultyColor(course.difficulty)}`}>{course.difficulty}</Badge>
                  </div>

                  <CardTitle className="font-serif text-3xl mb-2">{course.title}</CardTitle>
                  <CardDescription className="text-base mb-4">{course.description}</CardDescription>

                  <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {course.duration}
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {course.students} pelajar
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 mr-1 fill-current text-yellow-400" />
                      {course.rating}
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="mb-6">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progress Kursus</span>
                      <span>{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-3" />
                  </div>

                  <p className="text-muted-foreground leading-relaxed">{course.longDescription}</p>
                </CardContent>
              </Card>

              {/* Modules */}
              <Card className="scroll-shadow border-2 border-border">
                <CardHeader>
                  <CardTitle className="font-serif text-2xl flex items-center">
                    <Scroll className="w-6 h-6 mr-3 text-primary" />
                    Gulungan Pembelajaran
                  </CardTitle>
                  <CardDescription>{course.modules.length} modul pembelajaran tersedia</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {course.modules.map((module, index) => (
                    <Card
                      key={module.id}
                      className={`border transition-all duration-200 ${
                        module.isLocked
                          ? "border-muted bg-muted/20"
                          : module.isCompleted
                            ? "border-accent bg-accent/5"
                            : "border-border hover:border-primary/50 hover:shadow-md"
                      }`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 flex-1">
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                module.isLocked
                                  ? "bg-muted text-muted-foreground"
                                  : module.isCompleted
                                    ? "bg-accent text-accent-foreground"
                                    : "bg-primary text-primary-foreground"
                              }`}
                            >
                              {module.isLocked ? (
                                <Lock className="w-5 h-5" />
                              ) : module.isCompleted ? (
                                <CheckCircle className="w-5 h-5" />
                              ) : (
                                <span className="font-bold">{index + 1}</span>
                              )}
                            </div>

                            <div className="flex-1">
                              <h4
                                className={`font-semibold ${module.isLocked ? "text-muted-foreground" : "text-foreground"}`}
                              >
                                {module.title}
                              </h4>
                              <p
                                className={`text-sm ${module.isLocked ? "text-muted-foreground" : "text-muted-foreground"}`}
                              >
                                {module.description}
                              </p>
                              <div className="flex items-center space-x-4 mt-2">
                                <span className="text-xs text-muted-foreground flex items-center">
                                  <Clock className="w-3 h-3 mr-1" />
                                  {module.duration}
                                </span>
                                {module.isCompleted && (
                                  <Badge variant="secondary" className="text-xs">
                                    Selesai
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="ml-4">
                            {module.isLocked ? (
                              <Button variant="ghost" size="sm" disabled>
                                Terkunci
                              </Button>
                            ) : (
                              <Button size="sm" variant={module.isCompleted ? "outline" : "default"} asChild>
                                <Link href={`/courses/${course.id}/modules/${module.id}`}>
                                  {module.isCompleted ? (
                                    <>
                                      <CheckCircle className="w-4 h-4 mr-2" />
                                      Tinjau
                                    </>
                                  ) : (
                                    <>
                                      <Play className="w-4 h-4 mr-2" />
                                      Mulai
                                    </>
                                  )}
                                </Link>
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Instructor */}
              <Card className="scroll-shadow border-2 border-border">
                <CardHeader>
                  <CardTitle className="font-serif text-lg">Instruktur</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-lg font-bold text-primary-foreground">{course.instructor.charAt(0)}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">{course.instructor}</h4>
                      <p className="text-sm text-muted-foreground">Master Scholar</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Ahli dalam bidang {course.category.toLowerCase()} dengan pengalaman mengajar lebih dari 20 tahun di
                    Academia Antiqua.
                  </p>
                </CardContent>
              </Card>

              {/* Course Stats */}
              <Card className="scroll-shadow border-2 border-border">
                <CardHeader>
                  <CardTitle className="font-serif text-lg">Statistik Kursus</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm">Total Pelajar</span>
                    <span className="font-semibold">{course.students}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Rating</span>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 fill-current text-yellow-400 mr-1" />
                      <span className="font-semibold">{course.rating}</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Durasi</span>
                    <span className="font-semibold">{course.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Modul</span>
                    <span className="font-semibold">{course.modules.length}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="scroll-shadow border-2 border-border">
                <CardHeader>
                  <CardTitle className="font-serif text-lg">Aksi Cepat</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start bg-transparent" variant="outline" asChild>
                    <Link href="/dashboard">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Kembali ke Dashboard
                    </Link>
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline" asChild>
                    <Link href="/progress">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Lihat Progress
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

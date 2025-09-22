"use client"

import { AuthGuard } from "@/components/auth-guard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Crown, ArrowLeft, Save, Plus, Trash2, LogOut, Settings, Bell } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface Module {
  id: string
  title: string
  description: string
  content: string
  type: "lesson" | "quiz" | "reflection"
}

interface CourseForm {
  title: string
  description: string
  longDescription: string
  category: string
  difficulty: "Pemula" | "Menengah" | "Lanjutan" | ""
  instructor: string
  duration: string
  modules: Module[]
}

export default function NewCoursePage() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [courseForm, setCourseForm] = useState<CourseForm>({
    title: "",
    description: "",
    longDescription: "",
    category: "",
    difficulty: "",
    instructor: "",
    duration: "",
    modules: [],
  })
  const router = useRouter()

  useEffect(() => {
    // Check admin access
    const userEmail = localStorage.getItem("userEmail")
    if (userEmail !== "admin@academia-antiqua.com") {
      router.push("/dashboard")
      return
    }
    setIsAdmin(true)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("userEmail")
    localStorage.removeItem("userName")
    router.push("/")
  }

  const handleInputChange = (field: keyof CourseForm, value: string) => {
    setCourseForm((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const addModule = () => {
    const newModule: Module = {
      id: `module-${Date.now()}`,
      title: "",
      description: "",
      content: "",
      type: "lesson",
    }
    setCourseForm((prev) => ({
      ...prev,
      modules: [...prev.modules, newModule],
    }))
  }

  const updateModule = (moduleId: string, field: keyof Module, value: string) => {
    setCourseForm((prev) => ({
      ...prev,
      modules: prev.modules.map((module) => (module.id === moduleId ? { ...module, [field]: value } : module)),
    }))
  }

  const removeModule = (moduleId: string) => {
    setCourseForm((prev) => ({
      ...prev,
      modules: prev.modules.filter((module) => module.id !== moduleId),
    }))
  }

  const handleSaveCourse = (status: "draft" | "published") => {
    // Validate form
    if (!courseForm.title || !courseForm.description || !courseForm.category || !courseForm.difficulty) {
      alert("Mohon lengkapi semua field yang wajib diisi")
      return
    }

    // In a real app, this would save to backend
    console.log("Saving course:", { ...courseForm, status })
    alert(`Kursus berhasil disimpan sebagai ${status === "draft" ? "draft" : "kursus terbit"}!`)
    router.push("/admin/courses")
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

        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Page Header */}
          <div className="mb-8">
            <Button variant="ghost" size="sm" asChild className="mb-4">
              <Link href="/admin/courses">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kembali ke Daftar Kursus
              </Link>
            </Button>
            <h1 className="font-serif text-4xl font-bold text-foreground mb-2">Buat Kursus Baru</h1>
            <p className="text-xl text-muted-foreground">Rancang gulungan ilmu pengetahuan baru untuk para Scholar</p>
          </div>

          <div className="space-y-8">
            {/* Basic Information */}
            <Card className="scroll-shadow border-2 border-border">
              <CardHeader>
                <CardTitle className="font-serif text-2xl">Informasi Dasar</CardTitle>
                <CardDescription>Detail utama tentang kursus yang akan dibuat</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Judul Kursus *</Label>
                    <Input
                      id="title"
                      placeholder="Masukkan judul kursus"
                      value={courseForm.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      className="bg-background border-border focus:border-accent"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Kategori *</Label>
                    <Select value={courseForm.category} onValueChange={(value) => handleInputChange("category", value)}>
                      <SelectTrigger className="bg-background border-border focus:border-accent">
                        <SelectValue placeholder="Pilih kategori" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Matematika">Matematika</SelectItem>
                        <SelectItem value="Sains">Sains</SelectItem>
                        <SelectItem value="Filsafat">Filsafat</SelectItem>
                        <SelectItem value="Sejarah">Sejarah</SelectItem>
                        <SelectItem value="Seni">Seni</SelectItem>
                        <SelectItem value="Bahasa">Bahasa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="difficulty">Tingkat Kesulitan *</Label>
                    <Select
                      value={courseForm.difficulty}
                      onValueChange={(value) => handleInputChange("difficulty", value as any)}
                    >
                      <SelectTrigger className="bg-background border-border focus:border-accent">
                        <SelectValue placeholder="Pilih tingkat kesulitan" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pemula">Pemula</SelectItem>
                        <SelectItem value="Menengah">Menengah</SelectItem>
                        <SelectItem value="Lanjutan">Lanjutan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="instructor">Instruktur</Label>
                    <Input
                      id="instructor"
                      placeholder="Nama instruktur"
                      value={courseForm.instructor}
                      onChange={(e) => handleInputChange("instructor", e.target.value)}
                      className="bg-background border-border focus:border-accent"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="duration">Estimasi Durasi</Label>
                    <Input
                      id="duration"
                      placeholder="contoh: 6 jam"
                      value={courseForm.duration}
                      onChange={(e) => handleInputChange("duration", e.target.value)}
                      className="bg-background border-border focus:border-accent"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Deskripsi Singkat *</Label>
                  <Textarea
                    id="description"
                    placeholder="Deskripsi singkat tentang kursus (1-2 kalimat)"
                    value={courseForm.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    className="bg-background border-border focus:border-accent"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="longDescription">Deskripsi Lengkap</Label>
                  <Textarea
                    id="longDescription"
                    placeholder="Deskripsi detail tentang kursus, tujuan pembelajaran, dan manfaat"
                    value={courseForm.longDescription}
                    onChange={(e) => handleInputChange("longDescription", e.target.value)}
                    className="bg-background border-border focus:border-accent"
                    rows={6}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Modules */}
            <Card className="scroll-shadow border-2 border-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="font-serif text-2xl">Modul Pembelajaran</CardTitle>
                    <CardDescription>Rancang konten pembelajaran dalam bentuk modul-modul</CardDescription>
                  </div>
                  <Button onClick={addModule}>
                    <Plus className="w-4 h-4 mr-2" />
                    Tambah Modul
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {courseForm.modules.length === 0 ? (
                  <div className="text-center py-12 border-2 border-dashed border-border rounded-lg">
                    <Plus className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-serif text-lg font-semibold mb-2">Belum ada modul</h3>
                    <p className="text-muted-foreground mb-4">Tambahkan modul pertama untuk memulai</p>
                    <Button onClick={addModule}>
                      <Plus className="w-4 h-4 mr-2" />
                      Tambah Modul Pertama
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {courseForm.modules.map((module, index) => (
                      <Card key={module.id} className="border">
                        <CardHeader className="pb-4">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">Modul {index + 1}</CardTitle>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeModule(module.id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Judul Modul</Label>
                              <Input
                                placeholder="Judul modul"
                                value={module.title}
                                onChange={(e) => updateModule(module.id, "title", e.target.value)}
                                className="bg-background border-border focus:border-accent"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Tipe Modul</Label>
                              <Select
                                value={module.type}
                                onValueChange={(value) => updateModule(module.id, "type", value as any)}
                              >
                                <SelectTrigger className="bg-background border-border focus:border-accent">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="lesson">Pembelajaran</SelectItem>
                                  <SelectItem value="quiz">Kuis</SelectItem>
                                  <SelectItem value="reflection">Refleksi</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label>Deskripsi Modul</Label>
                            <Textarea
                              placeholder="Deskripsi singkat tentang modul ini"
                              value={module.description}
                              onChange={(e) => updateModule(module.id, "description", e.target.value)}
                              className="bg-background border-border focus:border-accent"
                              rows={2}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label>Konten Modul</Label>
                            <Textarea
                              placeholder="Konten pembelajaran (gunakan Markdown untuk formatting)"
                              value={module.content}
                              onChange={(e) => updateModule(module.id, "content", e.target.value)}
                              className="bg-background border-border focus:border-accent"
                              rows={8}
                            />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Save Actions */}
            <Card className="scroll-shadow border-2 border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold mb-1">Simpan Kursus</h4>
                    <p className="text-sm text-muted-foreground">
                      Pilih untuk menyimpan sebagai draft atau langsung menerbitkan
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Button variant="outline" onClick={() => handleSaveCourse("draft")} className="bg-transparent">
                      <Save className="w-4 h-4 mr-2" />
                      Simpan Draft
                    </Button>
                    <Button onClick={() => handleSaveCourse("published")}>
                      <Save className="w-4 h-4 mr-2" />
                      Terbitkan Kursus
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}

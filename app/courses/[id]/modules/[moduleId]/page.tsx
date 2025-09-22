"use client"

import { useParams, useRouter } from "next/navigation"
import { AuthGuard } from "@/components/auth-guard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Star } from "lucide-react"
import {
  BookOpen,
  Scroll,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  PenTool,
  Brain,
  LogOut,
  Settings,
  Bell,
} from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

interface Quiz {
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

interface ModuleContent {
  id: string
  title: string
  courseId: string
  courseTitle: string
  content: string
  quiz?: Quiz
  reflectionPrompt?: string
  type: "lesson" | "quiz" | "reflection"
}

export default function ModulePage() {
  const params = useParams()
  const router = useRouter()
  const [moduleContent, setModuleContent] = useState<ModuleContent | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<string>("")
  const [showQuizResult, setShowQuizResult] = useState(false)
  const [reflectionText, setReflectionText] = useState("")
  const [isCompleted, setIsCompleted] = useState(false)

  useEffect(() => {
    const courseId = params.id as string
    const moduleId = params.moduleId as string

    // Mock module content
    const moduleData: Record<string, ModuleContent> = {
      "1-1": {
        id: "1-1",
        title: "Sistem Bilangan Mesir Kuno",
        courseId: "1",
        courseTitle: "Dasar Matematika Kuno",
        type: "lesson",
        content: `
# Sistem Bilangan Mesir Kuno

Peradaban Mesir kuno mengembangkan salah satu sistem bilangan tertua yang diketahui manusia. Sistem ini menggunakan hieroglif untuk merepresentasikan angka dan telah digunakan selama ribuan tahun.

## Hieroglif Numerik

Orang Mesir menggunakan simbol-simbol khusus untuk angka:

- **Garis vertikal (|)** = 1
- **Tumit (∩)** = 10  
- **Gulungan tali (𓍢)** = 100
- **Bunga teratai (𓆼)** = 1,000
- **Jari telunjuk (𓂭)** = 10,000
- **Ikan (𓆛)** = 100,000
- **Dewa (𓁨)** = 1,000,000

## Prinsip Aditif

Sistem Mesir menggunakan prinsip aditif, di mana nilai total diperoleh dengan menjumlahkan semua simbol. Misalnya, untuk menulis angka 23, mereka akan menggunakan dua simbol tumit (∩∩) dan tiga garis vertikal (|||).

## Operasi Matematika

Orang Mesir melakukan operasi matematika dengan cara yang unik:

### Penjumlahan
Mereka menggabungkan simbol-simbol dan mengelompokkannya. Jika ada 10 simbol yang sama, mereka menggantinya dengan satu simbol dari tingkat yang lebih tinggi.

### Perkalian
Mereka menggunakan metode penggandaan berulang. Untuk mengalikan dengan 8, mereka akan menggandakan angka tiga kali (2×2×2).

## Aplikasi Praktis

Sistem ini digunakan dalam:
- **Perdagangan**: Mencatat transaksi dan inventori
- **Konstruksi**: Menghitung material untuk piramida dan kuil
- **Astronomi**: Mencatat siklus kalender dan peristiwa langit
- **Administrasi**: Mengelola pajak dan sumber daya kerajaan

## Warisan Modern

Meskipun kita sekarang menggunakan sistem desimal Arab, prinsip-prinsip matematika Mesir masih mempengaruhi cara kita berpikir tentang angka dan operasi matematika.
        `,
        quiz: {
          question: "Simbol hieroglif apa yang digunakan orang Mesir untuk merepresentasikan angka 100?",
          options: ["Garis vertikal (|)", "Tumit (∩)", "Gulungan tali (𓍢)", "Bunga teratai (𓆼)"],
          correctAnswer: 2,
          explanation:
            "Gulungan tali (𓍢) adalah simbol hieroglif yang digunakan untuk merepresentasikan angka 100 dalam sistem bilangan Mesir kuno.",
        },
      },
      "1-2": {
        id: "1-2",
        title: "Geometri Babilonia",
        courseId: "1",
        courseTitle: "Dasar Matematika Kuno",
        type: "lesson",
        content: `
# Geometri Babilonia

Peradaban Babilonia mengembangkan sistem geometri yang sangat maju, dengan kontribusi penting dalam bidang matematika yang masih digunakan hingga hari ini.

## Sistem Bilangan Seksagesimal

Babilonia menggunakan sistem bilangan berbasis 60 (seksagesimal), yang masih kita gunakan untuk:
- **Waktu**: 60 detik = 1 menit, 60 menit = 1 jam
- **Sudut**: 360 derajat dalam lingkaran (6 × 60)

## Teorema Pythagoras Sebelum Pythagoras

Tablet tanah liat Babilonia menunjukkan bahwa mereka sudah mengetahui hubungan a² + b² = c² lebih dari 1000 tahun sebelum Pythagoras lahir!

### Tablet Plimpton 322
Tablet terkenal ini berisi daftar tripel Pythagoras, menunjukkan pemahaman mendalam tentang segitiga siku-siku.

## Perhitungan Luas dan Volume

Babilonia mengembangkan rumus untuk:

### Luas Lingkaran
Mereka menggunakan π ≈ 3, yang cukup akurat untuk keperluan praktis mereka.

### Volume Kerucut Terpotong
Rumus kompleks untuk menghitung volume struktur seperti ziggurat.

## Aplikasi dalam Arsitektur

Pengetahuan geometri ini digunakan untuk:
- **Ziggurat**: Struktur bertingkat dengan perhitungan presisi
- **Sistem Irigasi**: Kanal dengan gradien yang tepat
- **Astronomi**: Observatorium untuk mengamati benda langit

## Metode Pemecahan Masalah

Babilonia menggunakan pendekatan sistematis:
1. **Analisis masalah** dalam konteks praktis
2. **Penerapan rumus** yang sudah diketahui
3. **Verifikasi hasil** melalui perhitungan balik

## Pengaruh pada Matematika Modern

Kontribusi Babilonia meliputi:
- Konsep nol sebagai placeholder
- Sistem posisional dalam bilangan
- Metode aproksimasi untuk akar kuadrat
- Dasar-dasar aljabar geometris
        `,
        quiz: {
          question: "Sistem bilangan apa yang digunakan oleh peradaban Babilonia?",
          options: ["Desimal (basis 10)", "Biner (basis 2)", "Seksagesimal (basis 60)", "Oktal (basis 8)"],
          correctAnswer: 2,
          explanation:
            "Babilonia menggunakan sistem seksagesimal (basis 60), yang masih kita gunakan untuk mengukur waktu dan sudut.",
        },
      },
      "1-3": {
        id: "1-3",
        title: "Teorema Pythagoras dan Aplikasinya",
        courseId: "1",
        courseTitle: "Dasar Matematika Kuno",
        type: "lesson",
        content: `
# Teorema Pythagoras dan Aplikasinya

Teorema Pythagoras adalah salah satu konsep matematika paling fundamental dan berguna yang pernah ditemukan. Meskipun dinamai menurut Pythagoras, konsep ini sudah dikenal oleh berbagai peradaban kuno.

## Pernyataan Teorema

Dalam segitiga siku-siku, kuadrat panjang sisi miring (hipotenusa) sama dengan jumlah kuadrat panjang kedua sisi lainnya.

**a² + b² = c²**

Di mana:
- a dan b adalah panjang kedua sisi yang membentuk sudut siku-siku
- c adalah panjang sisi miring (hipotenusa)

## Sejarah dan Penemuan

### Sebelum Pythagoras
- **Babilonia** (2000-1600 SM): Tablet Plimpton 322 menunjukkan pemahaman tentang tripel Pythagoras
- **Mesir** (2000 SM): Menggunakan tali dengan simpul untuk membuat sudut siku-siku
- **India** (800 SM): Sulba Sutras berisi aturan geometris serupa
- **Tiongkok** (1000 SM): Teorema Gougu dalam teks matematika kuno

### Kontribusi Pythagoras (570-495 SM)
Pythagoras dan pengikutnya memberikan **bukti matematis** pertama yang sistematis untuk teorema ini.

## Bukti Geometris Klasik

### Bukti dengan Persegi
Jika kita membuat persegi pada setiap sisi segitiga siku-siku:
- Luas persegi pada sisi a = a²
- Luas persegi pada sisi b = b²  
- Luas persegi pada sisi c = c²

Teorema menyatakan: Luas persegi c = Luas persegi a + Luas persegi b

## Aplikasi Praktis dalam Peradaban Kuno

### Konstruksi Bangunan
- **Piramida Mesir**: Memastikan sudut-sudut yang tepat
- **Kuil Yunani**: Menciptakan kolom yang tegak lurus
- **Ziggurat Babilonia**: Menghitung tinggi dan kemiringan

### Navigasi dan Pemetaan
- **Pelayaran**: Menghitung jarak tempuh
- **Survei tanah**: Mengukur luas lahan
- **Astronomi**: Menghitung jarak benda langit

### Kerajinan dan Seni
- **Arsitektur**: Proporsi emas dalam desain
- **Seni**: Komposisi yang harmonis
- **Musik**: Hubungan matematis dalam harmoni

## Tripel Pythagoras Terkenal

Beberapa kombinasi bilangan bulat yang memenuhi teorema:
- **(3, 4, 5)**: 3² + 4² = 9 + 16 = 25 = 5²
- **(5, 12, 13)**: 5² + 12² = 25 + 144 = 169 = 13²
- **(8, 15, 17)**: 8² + 15² = 64 + 225 = 289 = 17²
- **(7, 24, 25)**: 7² + 24² = 49 + 576 = 625 = 25²

## Penerapan Modern

Teorema Pythagoras masih digunakan dalam:
- **Teknik**: Perhitungan struktural
- **Fisika**: Vektor dan gaya
- **Komputer**: Grafik dan game
- **GPS**: Triangulasi posisi
- **Arsitektur**: Desain dan konstruksi

## Generalisasi dan Pengembangan

### Hukum Kosinus
Generalisasi untuk segitiga sembarang: c² = a² + b² - 2ab cos(C)

### Teorema Pythagoras 3D
Untuk ruang tiga dimensi: d² = x² + y² + z²

## Makna Filosofis

Bagi Pythagoras dan pengikutnya, teorema ini menunjukkan:
- **Harmoni matematika** dalam alam semesta
- **Kesempurnaan geometris** sebagai dasar realitas
- **Hubungan numerik** yang mengatur kosmos
        `,
        reflectionPrompt:
          "Bagaimana teorema Pythagoras mempengaruhi pemahaman Anda tentang hubungan antara matematika dan dunia nyata? Berikan contoh aplikasi yang paling menarik menurut Anda.",
      },
    }

    setModuleContent(moduleData[moduleId] || null)
  }, [params.id, params.moduleId])

  const handleQuizSubmit = () => {
    setShowQuizResult(true)
  }

  const handleComplete = () => {
    // Award points for completing module
    const currentPoints = Number.parseInt(localStorage.getItem("userPoints") || "150")
    const newPoints = currentPoints + 25 // 25 points per module
    localStorage.setItem("userPoints", newPoints.toString())

    // Check for level up
    const previousLevel = getCurrentLevel(currentPoints)
    const newLevel = getCurrentLevel(newPoints)

    // Check for new badges
    checkForNewBadges(newPoints)

    setIsCompleted(true)

    // Show achievement notification if level up occurred
    if (previousLevel !== newLevel) {
      // You could show a toast notification here
      console.log(`Level up! You are now a ${newLevel}!`)
    }

    // Here you would typically save progress to backend
    setTimeout(() => {
      router.push(`/courses/${params.id}`)
    }, 2000)
  }

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("userEmail")
    localStorage.removeItem("userName")
    router.push("/")
  }

  // Helper functions for gamification
  const getCurrentLevel = (points: number) => {
    if (points < 100) return "Apprentice"
    if (points < 250) return "Adept"
    if (points < 500) return "Philosopher"
    return "Master"
  }

  const checkForNewBadges = (points: number) => {
    const badges = JSON.parse(localStorage.getItem("userBadges") || "[]")

    // Check for Knowledge Seeker badge (100 points)
    if (points >= 100 && !badges.includes("knowledge-seeker")) {
      badges.push("knowledge-seeker")
      localStorage.setItem("userBadges", JSON.stringify(badges))
    }

    // Check for Philosopher Mind badge (250 points)
    if (points >= 250 && !badges.includes("philosopher-mind")) {
      badges.push("philosopher-mind")
      localStorage.setItem("userBadges", JSON.stringify(badges))
    }
  }

  if (!moduleContent) {
    return (
      <AuthGuard>
        <div className="min-h-screen bg-background parchment-texture flex items-center justify-center">
          <div className="text-center">
            <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-serif text-xl font-semibold mb-2">Modul tidak ditemukan</h3>
            <p className="text-muted-foreground mb-4">Gulungan pembelajaran yang Anda cari tidak tersedia</p>
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
          {/* Breadcrumb */}
          <div className="mb-6">
            <Button variant="ghost" size="sm" asChild className="mb-2">
              <Link href={`/courses/${moduleContent.courseId}`}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                {moduleContent.courseTitle}
              </Link>
            </Button>
          </div>

          {/* Module Header */}
          <Card className="scroll-shadow border-2 border-border mb-8">
            <CardHeader>
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                  {moduleContent.type === "lesson" ? (
                    <BookOpen className="w-5 h-5 text-primary" />
                  ) : moduleContent.type === "quiz" ? (
                    <Brain className="w-5 h-5 text-primary" />
                  ) : (
                    <PenTool className="w-5 h-5 text-primary" />
                  )}
                </div>
                <Badge variant="secondary">
                  {moduleContent.type === "lesson"
                    ? "Pembelajaran"
                    : moduleContent.type === "quiz"
                      ? "Kuis"
                      : "Refleksi"}
                </Badge>
              </div>
              <CardTitle className="font-serif text-3xl">{moduleContent.title}</CardTitle>
            </CardHeader>
          </Card>

          {/* Content */}
          <Card className="scroll-shadow border-2 border-border mb-8">
            <CardContent className="p-8">
              {moduleContent.type === "lesson" && (
                <div className="prose prose-lg max-w-none">
                  <div
                    className="text-foreground leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: moduleContent.content
                        .replace(/\n/g, "<br/>")
                        .replace(/#{1,6}\s/g, '<h3 class="font-serif text-xl font-bold mt-6 mb-4 text-primary">')
                        .replace(/<h3[^>]*>/g, '<h3 class="font-serif text-xl font-bold mt-6 mb-4 text-primary">'),
                    }}
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quiz Section */}
          {moduleContent.quiz && (
            <Card className="scroll-shadow border-2 border-accent/30 bg-accent/5 mb-8">
              <CardHeader>
                <CardTitle className="font-serif text-xl flex items-center">
                  <Brain className="w-6 h-6 mr-3 text-accent-foreground" />
                  Uji Pemahaman
                </CardTitle>
                <CardDescription>Jawab pertanyaan berikut untuk menguji pemahaman Anda</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <h4 className="font-semibold text-lg">{moduleContent.quiz.question}</h4>

                  <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
                    {moduleContent.quiz.options.map((option, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                        <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>

                  {!showQuizResult ? (
                    <Button onClick={handleQuizSubmit} disabled={!selectedAnswer} className="w-full">
                      Kirim Jawaban
                    </Button>
                  ) : (
                    <Card
                      className={`border-2 ${
                        Number.parseInt(selectedAnswer) === moduleContent.quiz.correctAnswer
                          ? "border-green-200 bg-green-50"
                          : "border-red-200 bg-red-50"
                      }`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <CheckCircle
                            className={`w-5 h-5 ${
                              Number.parseInt(selectedAnswer) === moduleContent.quiz.correctAnswer
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          />
                          <span className="font-semibold">
                            {Number.parseInt(selectedAnswer) === moduleContent.quiz.correctAnswer
                              ? "Jawaban Benar!"
                              : "Jawaban Salah"}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{moduleContent.quiz.explanation}</p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Reflection Section */}
          {moduleContent.reflectionPrompt && (
            <Card className="scroll-shadow border-2 border-secondary/30 bg-secondary/5 mb-8">
              <CardHeader>
                <CardTitle className="font-serif text-xl flex items-center">
                  <PenTool className="w-6 h-6 mr-3 text-secondary-foreground" />
                  Scroll Diary - Catatan Refleksi
                </CardTitle>
                <CardDescription>Tulis refleksi Anda tentang pembelajaran ini</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="font-medium">{moduleContent.reflectionPrompt}</p>
                  <Textarea
                    placeholder="Tulis refleksi Anda di sini..."
                    value={reflectionText}
                    onChange={(e) => setReflectionText(e.target.value)}
                    className="min-h-32 bg-background border-border focus:border-secondary"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Completion Section */}
          <Card className="scroll-shadow border-2 border-border">
            <CardContent className="p-6">
              {!isCompleted ? (
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold mb-1">Selesaikan Modul</h4>
                    <p className="text-sm text-muted-foreground">
                      Tandai modul ini sebagai selesai untuk melanjutkan pembelajaran
                    </p>
                    <div className="flex items-center space-x-2 mt-2">
                      <Star className="w-4 h-4 text-accent-foreground" />
                      <span className="text-sm font-medium text-accent-foreground">+25 Essence of Knowledge</span>
                    </div>
                  </div>
                  <Button onClick={handleComplete} className="ml-4">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Selesai
                  </Button>
                </div>
              ) : (
                <div className="text-center py-4">
                  <CheckCircle className="w-12 h-12 text-accent-foreground mx-auto mb-4" />
                  <h4 className="font-serif text-xl font-semibold mb-2">Modul Selesai!</h4>
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <Star className="w-5 h-5 text-accent-foreground" />
                    <span className="font-medium text-accent-foreground">+25 Essence of Knowledge diperoleh!</span>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Anda telah menyelesaikan modul ini. Kembali ke kursus untuk melanjutkan pembelajaran.
                  </p>
                  <Button asChild>
                    <Link href={`/courses/${moduleContent.courseId}`}>
                      <ArrowRight className="w-4 h-4 mr-2" />
                      Lanjutkan ke Modul Berikutnya
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

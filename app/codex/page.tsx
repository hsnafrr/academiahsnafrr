"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookOpen, Search, Calendar, MapPin, Star, Scroll } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

// Mock scholars data
const scholars = [
  {
    id: "pythagoras",
    name: "Pythagoras",
    title: "Bapak Matematika dan Filsafat",
    era: "570-495 SM",
    region: "Yunani Kuno",
    field: "Matematika",
    description: "Filsuf dan matematikawan yang terkenal dengan teorema Pythagoras dan konsep harmoni musik.",
    image: "/pythagoras-portrait.jpg",
    readTime: "8 menit",
    difficulty: "Pemula",
  },
  {
    id: "archimedes",
    name: "Archimedes",
    title: "Jenius Mekanika Kuno",
    era: "287-212 SM",
    region: "Yunani Kuno",
    field: "Matematika",
    description: "Matematikawan dan penemu yang menemukan prinsip daya apung dan berbagai mesin perang.",
    image: "/archimedes-portrait.jpg",
    readTime: "10 menit",
    difficulty: "Menengah",
  },
  {
    id: "aristoteles",
    name: "Aristoteles",
    title: "Guru Besar Filsafat",
    era: "384-322 SM",
    region: "Yunani Kuno",
    field: "Filsafat",
    description: "Filsuf yang meletakkan dasar logika, etika, dan sistem klasifikasi ilmiah.",
    image: "/aristoteles-portrait.jpg",
    readTime: "12 menit",
    difficulty: "Lanjutan",
  },
  {
    id: "ibn-sina",
    name: "Ibn Sina (Avicenna)",
    title: "Pangeran Para Dokter",
    era: "980-1037 M",
    region: "Persia",
    field: "Kedokteran",
    description: "Dokter dan filsuf yang menulis 'Canon of Medicine', buku kedokteran paling berpengaruh.",
    image: "/ibn-sina-portrait.jpg",
    readTime: "9 menit",
    difficulty: "Menengah",
  },
  {
    id: "galileo",
    name: "Galileo Galilei",
    title: "Bapak Astronomi Modern",
    era: "1564-1642 M",
    region: "Italia",
    field: "Astronomi",
    description: "Astronom yang memperjuangkan teori heliosentris dan mengembangkan teleskop.",
    image: "/galileo-portrait.jpg",
    readTime: "11 menit",
    difficulty: "Menengah",
  },
  {
    id: "copernicus",
    name: "Nicolaus Copernicus",
    title: "Revolusioner Tata Surya",
    era: "1473-1543 M",
    region: "Polandia",
    field: "Astronomi",
    description: "Astronom yang mengusulkan model heliosentris, mengubah pemahaman tentang alam semesta.",
    image: "/copernicus-portrait.jpg",
    readTime: "10 menit",
    difficulty: "Menengah",
  },
  {
    id: "confucius",
    name: "Confucius (Kong Qiu)",
    title: "Guru Kebijaksanaan Timur",
    era: "551-479 SM",
    region: "Tiongkok",
    field: "Filsafat",
    description: "Filsuf yang mengajarkan etika, moralitas, dan tata kelola yang baik.",
    image: "/confucius-portrait.jpg",
    readTime: "9 menit",
    difficulty: "Pemula",
  },
  {
    id: "al-khwarizmi",
    name: "Al-Khwarizmi",
    title: "Bapak Aljabar",
    era: "780-850 M",
    region: "Persia",
    field: "Matematika",
    description: "Matematikawan yang mengembangkan aljabar dan sistem angka Hindu-Arab.",
    image: "/al-khwarizmi-portrait.jpg",
    readTime: "8 menit",
    difficulty: "Menengah",
  },
]

const fieldColors = {
  Matematika: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  Filsafat: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  Astronomi: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
  Kedokteran: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
}

const difficultyColors = {
  Pemula: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  Menengah: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  Lanjutan: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
}

export default function CodexOfKnowledge() {
  const [searchTerm, setSearchTerm] = useState("")
  const [fieldFilter, setFieldFilter] = useState("all")
  const [difficultyFilter, setDifficultyFilter] = useState("all")

  const filteredScholars = scholars.filter((scholar) => {
    const matchesSearch =
      scholar.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scholar.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesField = fieldFilter === "all" || scholar.field === fieldFilter
    const matchesDifficulty = difficultyFilter === "all" || scholar.difficulty === difficultyFilter

    return matchesSearch && matchesField && matchesDifficulty
  })

  return (
    <div className="min-h-screen bg-background parchment-texture">
      {/* Floating Ancient Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-primary/10"
            initial={{
              x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1200),
              y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 800),
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 180, 360],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 4,
            }}
          >
            <Scroll className="w-8 h-8" />
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
                <Link href="/hall">Hall of Scholars</Link>
              </Button>
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
                <BookOpen className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground mb-2">Codex of Knowledge</h1>
                <p className="text-xl text-muted-foreground">Perpustakaan Kearifan Para Ilmuwan Kuno</p>
              </div>
            </div>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
              Jelajahi kehidupan dan karya para genius yang telah membentuk peradaban manusia. Dari matematikawan Yunani
              hingga filsuf Timur, temukan inspirasi dari para pencari kebenaran sepanjang sejarah.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto mb-12"
          >
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">{scholars.length}</div>
                <div className="text-muted-foreground">Tokoh Bersejarah</div>
              </CardContent>
            </Card>
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">4</div>
                <div className="text-muted-foreground">Bidang Ilmu</div>
              </CardContent>
            </Card>
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">2500+</div>
                <div className="text-muted-foreground">Tahun Sejarah</div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="relative z-10 py-8 px-4 bg-card/30">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col lg:flex-row gap-4 items-center justify-between"
          >
            <div className="flex items-center space-x-4 w-full lg:w-auto">
              <div className="relative flex-1 lg:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Cari tokoh atau topik..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <Select value={fieldFilter} onValueChange={setFieldFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filter by Field" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Bidang</SelectItem>
                  <SelectItem value="Matematika">Matematika</SelectItem>
                  <SelectItem value="Filsafat">Filsafat</SelectItem>
                  <SelectItem value="Astronomi">Astronomi</SelectItem>
                  <SelectItem value="Kedokteran">Kedokteran</SelectItem>
                </SelectContent>
              </Select>
              <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filter by Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Level</SelectItem>
                  <SelectItem value="Pemula">Pemula</SelectItem>
                  <SelectItem value="Menengah">Menengah</SelectItem>
                  <SelectItem value="Lanjutan">Lanjutan</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Scholars Grid */}
      <section className="relative z-10 py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredScholars.map((scholar, index) => (
              <motion.div
                key={scholar.id}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <Card className="h-full overflow-hidden scroll-shadow hover:shadow-lg transition-all duration-300 group">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={scholar.image || "/placeholder.svg?height=200&width=300"}
                      alt={scholar.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <Badge className={fieldColors[scholar.field as keyof typeof fieldColors]}>{scholar.field}</Badge>
                    </div>
                  </div>

                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <CardTitle className="font-serif text-xl mb-1">{scholar.name}</CardTitle>
                        <p className="text-sm font-medium text-primary">{scholar.title}</p>
                      </div>
                      <Badge
                        variant="outline"
                        className={difficultyColors[scholar.difficulty as keyof typeof difficultyColors]}
                      >
                        {scholar.difficulty}
                      </Badge>
                    </div>

                    <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{scholar.era}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{scholar.region}</span>
                      </div>
                    </div>

                    <CardDescription className="text-sm leading-relaxed">{scholar.description}</CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>{scholar.readTime} baca</span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 fill-current text-yellow-500" />
                          <span>4.8</span>
                        </div>
                      </div>
                    </div>

                    <Button
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors bg-transparent"
                      variant="outline"
                      asChild
                    >
                      <Link href={`/codex/${scholar.id}`}>
                        Baca Artikel
                        <BookOpen className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredScholars.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
              <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-serif text-2xl font-bold text-foreground mb-2">Tidak Ada Hasil</h3>
              <p className="text-muted-foreground">
                Coba ubah kata kunci pencarian atau filter untuk menemukan tokoh yang Anda cari.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative z-10 py-16 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center max-w-4xl">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <h2 className="font-serif text-4xl font-bold mb-4">Terinspirasi oleh Para Genius?</h2>
            <p className="text-xl mb-8 opacity-90">
              Mulai perjalanan pembelajaran Anda dan ikuti jejak para ilmuwan besar dalam Academia Antiqua.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/register">Mulai Belajar Sekarang</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                asChild
              >
                <Link href="/courses">Jelajahi Kursus</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

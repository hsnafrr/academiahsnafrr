"use client"

import { notFound } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, MapPin, BookOpen, Star, Quote, Lightbulb, Scroll } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

// Mock detailed scholar data
const scholarDetails: Record<string, any> = {
  pythagoras: {
    name: "Pythagoras",
    title: "Bapak Matematika dan Filsafat",
    era: "570-495 SM",
    region: "Samos, Yunani Kuno",
    field: "Matematika",
    image: "/pythagoras-portrait.jpg",
    readTime: "8 menit",
    difficulty: "Pemula",
    biography: `Pythagoras lahir di pulau Samos sekitar tahun 570 SM. Ia dikenal sebagai salah satu filsuf dan matematikawan paling berpengaruh dalam sejarah peradaban manusia. Meskipun banyak detail kehidupannya yang masih misterius, kontribusinya terhadap matematika dan filsafat tidak dapat disangkal.

Pythagoras mendirikan sekolah filosofis di Croton, Italia Selatan, yang dikenal sebagai Pythagorean Brotherhood. Sekolah ini tidak hanya mengajarkan matematika, tetapi juga musik, astronomi, dan filsafat moral. Para pengikutnya, yang disebut Pythagorean, hidup dalam komunitas yang sangat disiplin dengan aturan-aturan ketat.`,

    contributions: [
      {
        title: "Teorema Pythagoras",
        description:
          "Dalam segitiga siku-siku, kuadrat sisi miring sama dengan jumlah kuadrat kedua sisi lainnya (a² + b² = c²).",
      },
      {
        title: "Harmoni Musik",
        description:
          "Menemukan hubungan matematis dalam musik, bahwa interval musik yang harmonis berdasarkan rasio bilangan sederhana.",
      },
      {
        title: "Bilangan Pythagoras",
        description:
          "Mengembangkan konsep bilangan sebagai dasar realitas, dengan keyakinan bahwa 'segala sesuatu adalah bilangan'.",
      },
    ],

    quotes: [
      "Segala sesuatu adalah bilangan.",
      "Jangan berbicara tanpa cahaya.",
      "Pilih yang terbaik; kebiasaan akan membuatnya menyenangkan dan mudah.",
    ],

    legacy: `Warisan Pythagoras melampaui matematika. Filosofinya tentang harmoni, keseimbangan, dan pencarian kebenaran melalui rasio dan proporsi mempengaruhi Plato, Aristoteles, dan banyak pemikir setelahnya. Konsepnya tentang 'musik spheres' - ide bahwa planet-planet bergerak dalam harmoni matematis - menginspirasi astronomi dan musik selama berabad-abad.

Sekolah Pythagorean juga menekankan pentingnya etika, vegetarianisme, dan kehidupan yang seimbang. Mereka percaya bahwa jiwa dapat dimurnikan melalui studi matematika dan musik, sebuah ide yang kemudian mempengaruhi tradisi mistik dan filosofis.`,

    modernRelevance: `Di era modern, prinsip-prinsip Pythagoras tetap relevan. Teorema Pythagoras adalah fondasi geometri dan trigonometri yang digunakan dalam arsitektur, teknik, dan teknologi. Konsepnya tentang harmoni matematis dalam musik masih dipelajari dalam teori musik kontemporer.

Lebih dari itu, pendekatan Pythagoras yang holistik - menggabungkan matematika, musik, filosofi, dan etika - menginspirasi pendidikan modern yang mengintegrasikan STEM dengan humaniora.`,
  },

  archimedes: {
    name: "Archimedes",
    title: "Jenius Mekanika Kuno",
    era: "287-212 SM",
    region: "Syracuse, Sisilia",
    field: "Matematika",
    image: "/archimedes-portrait.jpg",
    readTime: "10 menit",
    difficulty: "Menengah",
    biography: `Archimedes dari Syracuse adalah salah satu matematikawan dan penemu terbesar dalam sejarah. Lahir sekitar 287 SM di Syracuse, Sisilia, ia hidup pada masa kejayaan Hellenistik ketika matematika dan sains berkembang pesat di Alexandria dan kota-kota Yunani lainnya.

Dikenal karena kecerdasannya yang luar biasa, Archimedes tidak hanya seorang teoretikus tetapi juga praktisi yang menciptakan berbagai mesin dan alat yang revolusioner untuk zamannya. Ia menghabiskan sebagian besar hidupnya di Syracuse, melayani Raja Hieron II dengan berbagai penemuannya.`,

    contributions: [
      {
        title: "Prinsip Archimedes",
        description:
          "Hukum daya apung: benda yang dicelupkan dalam fluida akan mengalami gaya apung yang sama dengan berat fluida yang dipindahkan.",
      },
      {
        title: "Mesin Perang",
        description:
          "Menciptakan berbagai mesin perang untuk mempertahankan Syracuse, termasuk katapult raksasa dan 'cakar Archimedes'.",
      },
      {
        title: "Sekrup Archimedes",
        description: "Mesin untuk memindahkan air dari tempat rendah ke tempat tinggi, masih digunakan hingga kini.",
      },
    ],

    quotes: [
      "Berikan saya tempat untuk berdiri, dan saya akan menggerakkan bumi.",
      "Eureka! (Saya menemukannya!)",
      "Jangan ganggu lingkaran-lingkaranku!",
    ],

    legacy: `Archimedes meninggalkan warisan yang luar biasa dalam matematika dan teknik. Metodenya untuk menghitung luas dan volume mengantisipasi kalkulus integral yang baru dikembangkan 2000 tahun kemudian. Penemuannya dalam hidrostatika menjadi dasar teknik kelautan modern.

Kisah kematiannya saat Syracuse jatuh ke tangan Romawi menjadi legenda - konon ia terbunuh saat sedang asyik mengerjakan masalah geometri, menolak untuk diganggu oleh tentara Romawi.`,

    modernRelevance: `Prinsip-prinsip Archimedes masih fundamental dalam teknik modern. Prinsip daya apung digunakan dalam desain kapal, kapal selam, dan balon udara. Sekrup Archimedes masih digunakan dalam pompa air dan conveyor modern.

Pendekatannya yang menggabungkan teori matematika dengan aplikasi praktis menjadi model bagi insinyur dan ilmuwan hingga kini.`,
  },
}

interface PageProps {
  params: {
    id: string
  }
}

export default function ScholarDetailPage({ params }: PageProps) {
  const scholar = scholarDetails[params.id]

  if (!scholar) {
    notFound()
  }

  const fieldColors = {
    Matematika: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    Filsafat: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    Astronomi: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
    Kedokteran: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  }

  return (
    <div className="min-h-screen bg-background parchment-texture">
      {/* Floating Scrolls */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-primary/5"
            initial={{
              x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1200),
              y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 800),
            }}
            animate={{
              y: [0, -40, 0],
              rotate: [0, 10, -10, 0],
              opacity: [0.05, 0.15, 0.05],
            }}
            transition={{
              duration: 12 + Math.random() * 6,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 5,
            }}
          >
            <Scroll className="w-16 h-16" />
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
            <Button variant="ghost" asChild>
              <Link href="/codex">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kembali ke Codex
              </Link>
            </Button>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild>
                <Link href="/courses">Kursus</Link>
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
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-12"
          >
            <div className="relative w-48 h-48 mx-auto mb-8 rounded-full overflow-hidden border-4 border-primary/20">
              <img
                src={scholar.image || "/placeholder.svg?height=200&width=200"}
                alt={scholar.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex items-center justify-center space-x-4 mb-4">
              <Badge className={fieldColors[scholar.field as keyof typeof fieldColors]}>{scholar.field}</Badge>
              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>{scholar.era}</span>
              </div>
              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{scholar.region}</span>
              </div>
            </div>

            <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground mb-4">{scholar.name}</h1>
            <p className="text-2xl text-primary font-medium mb-6">{scholar.title}</p>

            <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <BookOpen className="w-4 h-4" />
                <span>{scholar.readTime} baca</span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 fill-current text-yellow-500" />
                <span>4.9 rating</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="relative z-10 py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="space-y-12">
            {/* Biography */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="scroll-shadow">
                <CardContent className="p-8">
                  <h2 className="font-serif text-3xl font-bold text-foreground mb-6 flex items-center">
                    <BookOpen className="w-8 h-8 mr-3 text-primary" />
                    Biografi
                  </h2>
                  <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed">
                    {scholar.biography.split("\n\n").map((paragraph: string, index: number) => (
                      <p key={index} className="mb-4 text-justify">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contributions */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Card className="scroll-shadow">
                <CardContent className="p-8">
                  <h2 className="font-serif text-3xl font-bold text-foreground mb-6 flex items-center">
                    <Lightbulb className="w-8 h-8 mr-3 text-primary" />
                    Kontribusi Utama
                  </h2>
                  <div className="space-y-6">
                    {scholar.contributions.map((contribution: any, index: number) => (
                      <div key={index} className="border-l-4 border-primary/30 pl-6">
                        <h3 className="font-serif text-xl font-semibold text-foreground mb-2">{contribution.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{contribution.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quotes */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Card className="scroll-shadow bg-primary/5">
                <CardContent className="p-8">
                  <h2 className="font-serif text-3xl font-bold text-foreground mb-6 flex items-center">
                    <Quote className="w-8 h-8 mr-3 text-primary" />
                    Kata-kata Bijak
                  </h2>
                  <div className="space-y-4">
                    {scholar.quotes.map((quote: string, index: number) => (
                      <blockquote key={index} className="text-lg italic text-foreground border-l-4 border-primary pl-6">
                        "{quote}"
                      </blockquote>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Legacy */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <Card className="scroll-shadow">
                <CardContent className="p-8">
                  <h2 className="font-serif text-3xl font-bold text-foreground mb-6">Warisan dan Pengaruh</h2>
                  <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed">
                    {scholar.legacy.split("\n\n").map((paragraph: string, index: number) => (
                      <p key={index} className="mb-4 text-justify">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Modern Relevance */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <Card className="scroll-shadow">
                <CardContent className="p-8">
                  <h2 className="font-serif text-3xl font-bold text-foreground mb-6">Relevansi Modern</h2>
                  <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed">
                    {scholar.modernRelevance.split("\n\n").map((paragraph: string, index: number) => (
                      <p key={index} className="mb-4 text-justify">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="mt-12 text-center p-8 bg-card/50 rounded-lg backdrop-blur-sm"
          >
            <h3 className="font-serif text-2xl font-bold text-foreground mb-4">Terinspirasi oleh {scholar.name}?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Pelajari lebih dalam tentang {scholar.field.toLowerCase()} dan bidang ilmu lainnya dalam kursus interaktif
              Academia Antiqua.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/courses">Jelajahi Kursus</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/codex">Baca Tokoh Lain</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

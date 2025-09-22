"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Scroll, Star, Users, Award, ChevronRight } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { EnhancedFooter } from "@/components/enhanced-footer"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background parchment-texture">
      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <Scroll className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-serif text-2xl font-bold text-foreground">Academia Antiqua</h1>
                <p className="text-sm text-muted-foreground">Ancient Wisdom, Modern Learning</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild>
                <Link href="/login">Masuk</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Daftar</Link>
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Badge variant="secondary" className="mb-4">
                <Star className="w-4 h-4 mr-2" />
                Platform Pembelajaran Interaktif
              </Badge>
            </motion.div>
            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="font-serif text-5xl md:text-6xl font-bold text-foreground mb-6 text-balance"
            >
              Temukan Rahasia Pengetahuan Kuno dalam Era Digital
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto"
            >
              Bergabunglah dengan Academia Antiqua dan jelajahi wisdom para filsuf, matematikawan, dan ilmuwan zaman
              dahulu melalui pengalaman belajar yang interaktif dan gamifikasi yang menarik.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Button size="lg" className="text-lg px-8 group" asChild>
              <Link href="/register">
                Mulai Perjalanan Ilmu
                <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 bg-transparent hover:bg-card/50 transition-colors"
              asChild
            >
              <Link href="/courses">Jelajahi Kursus</Link>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto"
          >
            {[
              { number: "1,000+", label: "Pelajar Aktif" },
              { number: "50+", label: "Gulungan Ilmu" },
              { number: "95%", label: "Tingkat Kepuasan" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.4 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16 px-4 bg-card/30">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-4xl font-bold text-foreground mb-4">Gulungan Ilmu Unggulan</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Mulai perjalanan pembelajaran Anda dengan kursus-kursus pilihan yang telah dirancang khusus untuk
              mengungkap misteri pengetahuan kuno.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: BookOpen,
                title: "Dasar Matematika Kuno",
                description:
                  "Pelajari sistem numerik dan geometri yang digunakan oleh peradaban kuno seperti Mesir, Yunani, dan Babilonia.",
                students: 245,
              },
              {
                icon: Star,
                title: "Ilmu Alam",
                description:
                  "Jelajahi pemahaman para ilmuwan kuno tentang alam semesta, dari astronomi hingga alkimia.",
                students: 189,
              },
              {
                icon: Award,
                title: "Filsafat Pengetahuan",
                description:
                  "Dalami pemikiran para filsuf besar tentang hakikat pengetahuan, kebenaran, dan kebijaksanaan.",
                students: 312,
              },
            ].map((course, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <Card className="scroll-shadow hover:shadow-lg transition-all duration-300 border-2 border-border h-full group">
                  <CardHeader>
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.2 }}
                      className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors"
                    >
                      <course.icon className="w-6 h-6 text-primary" />
                    </motion.div>
                    <CardTitle className="font-serif text-xl">{course.title}</CardTitle>
                    <CardDescription>{course.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="secondary">3 Modul</Badge>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Users className="w-4 h-4 mr-1" />
                        {course.students} pelajar
                      </div>
                    </div>
                    <Button
                      className="w-full bg-transparent group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                      variant="outline"
                    >
                      Mulai Belajar
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-4xl font-bold text-foreground mb-4">Mengapa Memilih Academia Antiqua?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Platform pembelajaran yang menggabungkan kearifan kuno dengan teknologi modern untuk pengalaman belajar
              yang tak terlupakan.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Scroll,
                title: "Gulungan Interaktif",
                description:
                  "Setiap kursus disajikan dalam format gulungan yang dapat dibuka secara interaktif, memberikan pengalaman belajar yang unik.",
              },
              {
                icon: Award,
                title: "Sistem Gamifikasi",
                description:
                  'Kumpulkan "Essence of Knowledge", naik level dari Apprentice ke Philosopher, dan raih lencana prestasi.',
              },
              {
                icon: BookOpen,
                title: "Catatan Refleksi",
                description:
                  "Tulis refleksi pembelajaran Anda dalam scroll diary pribadi dan lacak perkembangan pemahaman Anda.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                  className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/30 transition-colors"
                >
                  <feature.icon className="w-8 h-8 text-accent-foreground" />
                </motion.div>
                <h3 className="font-serif text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-16 px-4 bg-primary text-primary-foreground"
      >
        <div className="container mx-auto text-center max-w-4xl">
          <motion.h2
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="font-serif text-4xl font-bold mb-4"
          >
            Siap Memulai Perjalanan Ilmu Anda?
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-xl mb-8 opacity-90"
          >
            Bergabunglah dengan ribuan pelajar lainnya dan temukan kearifan yang telah tersembunyi selama berabad-abad.
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <Button size="lg" variant="secondary" className="text-lg px-8 group" asChild>
              <Link href="/register">
                Daftar Sekarang - Gratis
                <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <EnhancedFooter />
    </div>
  )
}

"use client"

import { notFound } from "next/navigation"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, MessageCircle, Users, Clock, Pin, TrendingUp, Plus, Filter } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

// Mock category data
const categoryData: Record<string, any> = {
  "matematika-kuno": {
    name: "Matematika Kuno",
    description: "Diskusi tentang sistem numerik, geometri, dan teorema dari peradaban kuno",
    topics: 24,
    posts: 156,
    members: 89,
  },
  "ilmu-alam": {
    name: "Ilmu Alam",
    description: "Pembahasan astronomi, fisika, dan pemahaman alam semesta kuno",
    topics: 18,
    posts: 89,
    members: 67,
  },
  "filsafat-pengetahuan": {
    name: "Filsafat Pengetahuan",
    description: "Refleksi mendalam tentang hakikat kebenaran dan kebijaksanaan",
    topics: 31,
    posts: 203,
    members: 112,
  },
}

// Mock topics for category
const categoryTopics = [
  {
    id: 1,
    title: "Bagaimana cara memahami Teorema Pythagoras dengan mudah?",
    author: "NewLearner_123",
    avatar: "/young-scholar-avatar.jpg",
    replies: 12,
    views: 89,
    lastReply: "30 menit yang lalu",
    lastUser: "MathExpert_42",
    isPinned: false,
    isHot: true,
    createdAt: "2 hari yang lalu",
  },
  {
    id: 2,
    title: "Sejarah perkembangan sistem bilangan dari Babilonia hingga Arab",
    author: "HistoryBuff",
    avatar: "/ancient-scholar-avatar.jpg",
    replies: 28,
    views: 156,
    lastReply: "1 jam yang lalu",
    lastUser: "ArabicNumerals",
    isPinned: true,
    isHot: true,
    createdAt: "1 minggu yang lalu",
  },
  {
    id: 3,
    title: "Mengapa Archimedes berteriak 'Eureka'? Analisis historis",
    author: "CuriousStudent",
    avatar: "/mathematician-avatar.jpg",
    replies: 8,
    views: 45,
    lastReply: "3 jam yang lalu",
    lastUser: "ArchimedesFan",
    isPinned: false,
    isHot: false,
    createdAt: "3 hari yang lalu",
  },
  {
    id: 4,
    title: "Perbandingan geometri Euclid vs geometri non-Euclid",
    author: "GeometryLover",
    avatar: "/wise-philosopher-avatar.jpg",
    replies: 15,
    views: 78,
    lastReply: "5 jam yang lalu",
    lastUser: "NonEuclidean",
    isPinned: false,
    isHot: false,
    createdAt: "4 hari yang lalu",
  },
  {
    id: 5,
    title: "Aplikasi matematika kuno dalam arsitektur modern",
    author: "ModernArchitect",
    avatar: "/eastern-philosopher-avatar.jpg",
    replies: 22,
    views: 134,
    lastReply: "6 jam yang lalu",
    lastUser: "BuildingMath",
    isPinned: false,
    isHot: true,
    createdAt: "5 hari yang lalu",
  },
]

interface PageProps {
  params: {
    category: string
  }
}

export default function CategoryPage({ params }: PageProps) {
  const [sortBy, setSortBy] = useState("recent")
  const category = categoryData[params.category]

  if (!category) {
    notFound()
  }

  const sortedTopics = [...categoryTopics].sort((a, b) => {
    switch (sortBy) {
      case "popular":
        return b.views - a.views
      case "replies":
        return b.replies - a.replies
      case "recent":
      default:
        return 0 // Keep original order for demo
    }
  })

  return (
    <div className="min-h-screen bg-background parchment-texture">
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
              <Link href="/forum">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kembali ke Forum
              </Link>
            </Button>
            <Button asChild>
              <Link href={`/forum/${params.category}/new`}>
                <Plus className="w-4 h-4 mr-2" />
                Buat Topik Baru
              </Link>
            </Button>
          </div>
        </div>
      </motion.header>

      {/* Category Header */}
      <section className="relative z-10 py-12 px-4 bg-card/30">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center"
          >
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">{category.name}</h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">{category.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">{category.topics}</div>
                  <div className="text-muted-foreground">Topik</div>
                </CardContent>
              </Card>
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">{category.posts}</div>
                  <div className="text-muted-foreground">Diskusi</div>
                </CardContent>
              </Card>
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">{category.members}</div>
                  <div className="text-muted-foreground">Anggota</div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Topics List */}
      <section className="relative z-10 py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Filters */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center justify-between mb-8"
          >
            <h2 className="font-serif text-2xl font-bold text-foreground">Topik Diskusi</h2>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Urutkan:</span>
              </div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Terbaru</SelectItem>
                  <SelectItem value="popular">Terpopuler</SelectItem>
                  <SelectItem value="replies">Paling Banyak Balasan</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </motion.div>

          {/* Topics */}
          <div className="space-y-4">
            {sortedTopics.map((topic, index) => (
              <motion.div
                key={topic.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
              >
                <Card className="scroll-shadow hover:shadow-md transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Avatar className="w-12 h-12 flex-shrink-0">
                        <AvatarImage src={topic.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{topic.author[0]}</AvatarFallback>
                      </Avatar>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                          {topic.isPinned && <Pin className="w-4 h-4 text-primary" />}
                          {topic.isHot && (
                            <Badge variant="secondary" className="bg-red-100 text-red-800">
                              <TrendingUp className="w-3 h-3 mr-1" />
                              Hot
                            </Badge>
                          )}
                        </div>

                        <h3 className="font-serif text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors cursor-pointer">
                          <Link href={`/forum/topic/${topic.id}`}>{topic.title}</Link>
                        </h3>

                        <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                          <span>
                            oleh <span className="font-medium">{topic.author}</span>
                          </span>
                          <span>•</span>
                          <span>{topic.createdAt}</span>
                        </div>

                        <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <MessageCircle className="w-4 h-4" />
                            <span>{topic.replies} balasan</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="w-4 h-4" />
                            <span>{topic.views} views</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>Terakhir oleh {topic.lastUser}</span>
                          </div>
                          <span>{topic.lastReply}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Pagination placeholder */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="flex justify-center mt-8"
          >
            <div className="flex items-center space-x-2">
              <Button variant="outline" disabled>
                Previous
              </Button>
              <Button variant="default">1</Button>
              <Button variant="outline">2</Button>
              <Button variant="outline">3</Button>
              <Button variant="outline">Next</Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

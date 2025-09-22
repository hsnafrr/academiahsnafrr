"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageCircle, Users, Clock, Pin, TrendingUp, BookOpen, Star, Award, Scroll } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

// Mock forum data
const forumCategories = [
  {
    id: "matematika-kuno",
    name: "Matematika Kuno",
    description: "Diskusi tentang sistem numerik, geometri, dan teorema dari peradaban kuno",
    icon: BookOpen,
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    topics: 24,
    posts: 156,
    lastActivity: "2 jam yang lalu",
    lastUser: "Pythagoras_Seeker",
    featured: true,
  },
  {
    id: "ilmu-alam",
    name: "Ilmu Alam",
    description: "Pembahasan astronomi, fisika, dan pemahaman alam semesta kuno",
    icon: Star,
    color: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
    topics: 18,
    posts: 89,
    lastActivity: "4 jam yang lalu",
    lastUser: "Galileo_Observer",
    featured: false,
  },
  {
    id: "filsafat-pengetahuan",
    name: "Filsafat Pengetahuan",
    description: "Refleksi mendalam tentang hakikat kebenaran dan kebijaksanaan",
    icon: Award,
    color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    topics: 31,
    posts: 203,
    lastActivity: "1 jam yang lalu",
    lastUser: "Aristoteles_Modern",
    featured: true,
  },
]

const recentTopics = [
  {
    id: 1,
    title: "Bagaimana cara memahami Teorema Pythagoras dengan mudah?",
    category: "Matematika Kuno",
    author: "NewLearner_123",
    avatar: "/young-scholar-avatar.jpg",
    replies: 12,
    views: 89,
    lastReply: "30 menit yang lalu",
    isPinned: false,
    isHot: true,
  },
  {
    id: 2,
    title: "Diskusi: Apakah matematika adalah bahasa universal?",
    category: "Filsafat Pengetahuan",
    author: "DeepThinker",
    avatar: "/wise-philosopher-avatar.jpg",
    replies: 28,
    views: 156,
    lastReply: "1 jam yang lalu",
    isPinned: true,
    isHot: true,
  },
  {
    id: 3,
    title: "Perbandingan sistem astronomi Ptolemy vs Copernicus",
    category: "Ilmu Alam",
    author: "StarGazer_Ancient",
    avatar: "/astronomer-avatar.jpg",
    replies: 15,
    views: 67,
    lastReply: "2 jam yang lalu",
    isPinned: false,
    isHot: false,
  },
  {
    id: 4,
    title: "Mengapa Archimedes berteriak 'Eureka'?",
    category: "Matematika Kuno",
    author: "CuriousStudent",
    avatar: "/ancient-scholar-avatar.jpg",
    replies: 8,
    views: 45,
    lastReply: "3 jam yang lalu",
    isPinned: false,
    isHot: false,
  },
  {
    id: 5,
    title: "Penerapan etika Aristoteles dalam kehidupan modern",
    category: "Filsafat Pengetahuan",
    author: "ModernStoic",
    avatar: "/eastern-philosopher-avatar.jpg",
    replies: 22,
    views: 134,
    lastReply: "4 jam yang lalu",
    isPinned: false,
    isHot: true,
  },
]

const topContributors = [
  {
    username: "Aristoteles_Modern",
    posts: 89,
    reputation: 1250,
    avatar: "/wise-philosopher-avatar.jpg",
    badge: "Grand Sage",
  },
  {
    username: "Pythagoras_Seeker",
    posts: 67,
    reputation: 890,
    avatar: "/mathematician-avatar.jpg",
    badge: "Philosopher",
  },
  {
    username: "Galileo_Observer",
    posts: 45,
    reputation: 650,
    avatar: "/astronomer-avatar.jpg",
    badge: "Adept",
  },
]

export default function ForumPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredTopics =
    selectedCategory === "all"
      ? recentTopics
      : recentTopics.filter((topic) => topic.category.toLowerCase().replace(/\s+/g, "-") === selectedCategory)

  return (
    <div className="min-h-screen bg-background parchment-texture">
      {/* Floating Ancient Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-primary/8"
            initial={{
              x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1200),
              y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 800),
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 360],
              opacity: [0.08, 0.15, 0.08],
            }}
            transition={{
              duration: 10 + Math.random() * 5,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 3,
            }}
          >
            <Scroll className="w-12 h-12" />
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
                <Link href="/">← Beranda</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild>
                <Link href="/codex">Codex</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/hall">Hall of Scholars</Link>
              </Button>
              <Button asChild>
                <Link href="/forum/new">Buat Topik Baru</Link>
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
                <MessageCircle className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground mb-2">Symposium Forum</h1>
                <p className="text-xl text-muted-foreground">Agora Digital Para Pencari Ilmu</p>
              </div>
            </div>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
              Bergabunglah dalam diskusi mendalam layaknya para filsuf di Akademi Plato. Berbagi pemikiran, ajukan
              pertanyaan, dan temukan wawasan baru bersama komunitas scholar Academia Antiqua.
            </p>
          </motion.div>

          {/* Forum Stats */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12"
          >
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">73</div>
                <div className="text-muted-foreground">Total Topik</div>
              </CardContent>
            </Card>
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">448</div>
                <div className="text-muted-foreground">Total Diskusi</div>
              </CardContent>
            </Card>
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">156</div>
                <div className="text-muted-foreground">Anggota Aktif</div>
              </CardContent>
            </Card>
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">24</div>
                <div className="text-muted-foreground">Diskusi Hari Ini</div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative z-10 py-8 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Forum Content */}
            <div className="lg:col-span-3 space-y-8">
              {/* Categories */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <h2 className="font-serif text-3xl font-bold text-foreground mb-6">Kategori Diskusi</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {forumCategories.map((category, index) => (
                    <motion.div
                      key={category.id}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    >
                      <Card
                        className="h-full scroll-shadow hover:shadow-lg transition-all duration-300 group cursor-pointer"
                        asChild
                      >
                        <Link href={`/forum/${category.id}`}>
                          <CardHeader>
                            <div className="flex items-center justify-between mb-4">
                              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                <category.icon className="w-6 h-6 text-primary" />
                              </div>
                              {category.featured && (
                                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                                  <TrendingUp className="w-3 h-3 mr-1" />
                                  Populer
                                </Badge>
                              )}
                            </div>
                            <CardTitle className="font-serif text-xl">{category.name}</CardTitle>
                            <CardDescription>{category.description}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">{category.topics} topik</span>
                                <span className="text-muted-foreground">{category.posts} diskusi</span>
                              </div>
                              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                <Clock className="w-4 h-4" />
                                <span>Terakhir: {category.lastActivity}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Avatar className="w-6 h-6">
                                  <AvatarImage src="/placeholder.svg" />
                                  <AvatarFallback className="text-xs">{category.lastUser[0]}</AvatarFallback>
                                </Avatar>
                                <span className="text-sm text-muted-foreground">oleh {category.lastUser}</span>
                              </div>
                            </div>
                          </CardContent>
                        </Link>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Recent Topics */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.0 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-serif text-3xl font-bold text-foreground">Diskusi Terbaru</h2>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant={selectedCategory === "all" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory("all")}
                    >
                      Semua
                    </Button>
                    {forumCategories.map((category) => (
                      <Button
                        key={category.id}
                        variant={selectedCategory === category.id ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCategory(category.id)}
                      >
                        {category.name}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  {filteredTopics.map((topic, index) => (
                    <motion.div
                      key={topic.id}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.4, delay: 1.2 + index * 0.1 }}
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
                                <Badge className="text-xs">{topic.category}</Badge>
                              </div>

                              <h3 className="font-serif text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors cursor-pointer">
                                <Link href={`/forum/topic/${topic.id}`}>{topic.title}</Link>
                              </h3>

                              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                <span>
                                  oleh <span className="font-medium">{topic.author}</span>
                                </span>
                                <div className="flex items-center space-x-1">
                                  <MessageCircle className="w-4 h-4" />
                                  <span>{topic.replies} balasan</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Users className="w-4 h-4" />
                                  <span>{topic.views} views</span>
                                </div>
                                <span>Terakhir: {topic.lastReply}</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Top Contributors */}
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.4 }}
              >
                <Card className="scroll-shadow">
                  <CardHeader>
                    <CardTitle className="font-serif text-xl flex items-center">
                      <Award className="w-5 h-5 mr-2 text-primary" />
                      Top Contributors
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {topContributors.map((contributor, index) => (
                        <div key={contributor.username} className="flex items-center space-x-3">
                          <div className="flex-shrink-0">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                              #{index + 1}
                            </div>
                          </div>
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={contributor.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{contributor.username[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-foreground truncate">{contributor.username}</p>
                            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                              <span>{contributor.posts} posts</span>
                              <span>•</span>
                              <span>{contributor.reputation} rep</span>
                            </div>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {contributor.badge}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Forum Guidelines */}
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.6 }}
              >
                <Card className="scroll-shadow">
                  <CardHeader>
                    <CardTitle className="font-serif text-xl">Etika Symposium</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-sm text-muted-foreground">
                      <div className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <p>Hormati sesama scholar dengan bahasa yang sopan dan konstruktif</p>
                      </div>
                      <div className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <p>Berikan sumber yang kredibel untuk klaim atau argumen Anda</p>
                      </div>
                      <div className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <p>Fokus pada diskusi ilmiah dan pembelajaran bersama</p>
                      </div>
                      <div className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <p>Gunakan fitur pencarian sebelum membuat topik baru</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

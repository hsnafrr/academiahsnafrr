"use client"

import { useState, useEffect } from "react"
import { AuthGuard } from "@/components/auth-guard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Camera, Award, Clock, BookOpen, Users, Edit, Save, X } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

interface UserProfile {
  name: string
  email: string
  bio: string
  avatar: string
  level: string
  points: number
  studyStreak: number
  totalStudyTime: string
  favoriteSubject: string
  joinDate: string
  badges: string[]
  achievements: Array<{
    title: string
    description: string
    date: string
    icon: string
  }>
  stats: {
    coursesCompleted: number
    totalCourses: number
    forumPosts: number
    helpfulVotes: number
  }
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({
    name: "",
    bio: "",
    favoriteSubject: "",
  })

  useEffect(() => {
    // Load profile data
    const userName = localStorage.getItem("userName") || "Scholar"
    const userEmail = localStorage.getItem("userEmail") || "scholar@academia-antiqua.com"

    const mockProfile: UserProfile = {
      name: userName,
      email: userEmail,
      bio: "Seorang pencinta ilmu pengetahuan kuno yang selalu haus akan kebijaksanaan para filsuf dan matematikawan masa lalu. Bergabung dengan Academia Antiqua untuk mendalami warisan intelektual peradaban kuno.",
      avatar: "/wise-philosopher-avatar.jpg",
      level: "Philosopher",
      points: 420,
      studyStreak: 7,
      totalStudyTime: "24 jam",
      favoriteSubject: "Filsafat",
      joinDate: "November 2024",
      badges: ["🪶 Quill of Wisdom", "🌙 Observer of Stars", "🔥 Study Streak Champion"],
      achievements: [
        {
          title: "First Course Completed",
          description: "Menyelesaikan kursus pertama: Filsafat Pengetahuan",
          date: "2 minggu yang lalu",
          icon: "🎓",
        },
        {
          title: "Night Owl Scholar",
          description: "Belajar selama 5 malam berturut-turut",
          date: "1 minggu yang lalu",
          icon: "🌙",
        },
        {
          title: "Discussion Leader",
          description: "Memulai 3 diskusi populer di forum",
          date: "3 hari yang lalu",
          icon: "💬",
        },
      ],
      stats: {
        coursesCompleted: 1,
        totalCourses: 3,
        forumPosts: 12,
        helpfulVotes: 28,
      },
    }

    setProfile(mockProfile)
    setEditForm({
      name: mockProfile.name,
      bio: mockProfile.bio,
      favoriteSubject: mockProfile.favoriteSubject,
    })
  }, [])

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    if (profile) {
      setProfile({
        ...profile,
        name: editForm.name,
        bio: editForm.bio,
        favoriteSubject: editForm.favoriteSubject,
      })
      localStorage.setItem("userName", editForm.name)
    }
    setIsEditing(false)
  }

  const handleCancel = () => {
    if (profile) {
      setEditForm({
        name: profile.name,
        bio: profile.bio,
        favoriteSubject: profile.favoriteSubject,
      })
    }
    setIsEditing(false)
  }

  if (!profile) {
    return (
      <AuthGuard>
        <div className="min-h-screen bg-background parchment-texture flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <Users className="w-8 h-8 text-primary-foreground" />
            </div>
            <p className="text-muted-foreground">Memuat profil Scholar...</p>
          </div>
        </div>
      </AuthGuard>
    )
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-background parchment-texture">
        {/* Header */}
        <header className="border-b border-border bg-card/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <Button variant="ghost" asChild>
                <Link href="/dashboard">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Kembali ke Dashboard
                </Link>
              </Button>
              <div className="flex items-center space-x-2">
                {isEditing ? (
                  <>
                    <Button onClick={handleSave} size="sm">
                      <Save className="w-4 h-4 mr-2" />
                      Simpan
                    </Button>
                    <Button onClick={handleCancel} variant="outline" size="sm">
                      <X className="w-4 h-4 mr-2" />
                      Batal
                    </Button>
                  </>
                ) : (
                  <Button onClick={handleEdit} size="sm">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profil
                  </Button>
                )}
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Info */}
            <div className="lg:col-span-1 space-y-6">
              {/* Avatar & Basic Info */}
              <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
                <Card className="scroll-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="relative inline-block mb-4">
                      <Avatar className="w-32 h-32">
                        <AvatarImage src={profile.avatar || "/placeholder.svg"} alt={profile.name} />
                        <AvatarFallback className="text-4xl font-bold bg-primary text-primary-foreground">
                          {profile.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <Button size="sm" className="absolute bottom-0 right-0 rounded-full w-8 h-8 p-0">
                        <Camera className="w-4 h-4" />
                      </Button>
                    </div>

                    {isEditing ? (
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="name">Nama</Label>
                          <Input
                            id="name"
                            value={editForm.name}
                            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                          />
                        </div>
                      </div>
                    ) : (
                      <>
                        <h1 className="font-serif text-2xl font-bold text-foreground mb-2">{profile.name}</h1>
                        <p className="text-muted-foreground mb-4">{profile.email}</p>
                      </>
                    )}

                    <Badge className="bg-blue-600 text-white mb-4">{profile.level}</Badge>

                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div className="text-center p-3 bg-primary/5 rounded-lg">
                        <div className="text-2xl font-bold text-primary">{profile.points}</div>
                        <div className="text-xs text-muted-foreground">Essence Points</div>
                      </div>
                      <div className="text-center p-3 bg-accent/5 rounded-lg">
                        <div className="text-2xl font-bold text-accent-foreground">{profile.studyStreak}</div>
                        <div className="text-xs text-muted-foreground">Hari Berturut</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Bio */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="scroll-shadow">
                  <CardHeader>
                    <CardTitle className="font-serif text-lg">Tentang Saya</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isEditing ? (
                      <Textarea
                        value={editForm.bio}
                        onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                        rows={4}
                        placeholder="Ceritakan tentang diri Anda..."
                      />
                    ) : (
                      <p className="text-muted-foreground leading-relaxed">{profile.bio}</p>
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Quick Stats */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Card className="scroll-shadow">
                  <CardHeader>
                    <CardTitle className="font-serif text-lg">Statistik</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Total Waktu Belajar</span>
                      <span className="font-medium">{profile.totalStudyTime}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Subjek Favorit</span>
                      {isEditing ? (
                        <Input
                          value={editForm.favoriteSubject}
                          onChange={(e) => setEditForm({ ...editForm, favoriteSubject: e.target.value })}
                          className="w-24 h-6 text-xs"
                        />
                      ) : (
                        <span className="font-medium text-primary">{profile.favoriteSubject}</span>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Bergabung</span>
                      <span className="font-medium">{profile.joinDate}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Forum Posts</span>
                      <span className="font-medium">{profile.stats.forumPosts}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Helpful Votes</span>
                      <span className="font-medium">{profile.stats.helpfulVotes}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Learning Progress */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="scroll-shadow">
                  <CardHeader>
                    <CardTitle className="font-serif text-xl flex items-center">
                      <BookOpen className="w-5 h-5 mr-2" />
                      Progress Pembelajaran
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      <div className="text-center p-4 bg-primary/5 rounded-lg">
                        <div className="text-3xl font-bold text-primary mb-2">{profile.stats.coursesCompleted}</div>
                        <div className="text-sm text-muted-foreground">Kursus Selesai</div>
                      </div>
                      <div className="text-center p-4 bg-accent/5 rounded-lg">
                        <div className="text-3xl font-bold text-accent-foreground">{profile.stats.totalCourses}</div>
                        <div className="text-sm text-muted-foreground">Total Kursus</div>
                      </div>
                      <div className="text-center p-4 bg-secondary/5 rounded-lg">
                        <div className="text-3xl font-bold text-secondary-foreground">
                          {Math.round((profile.stats.coursesCompleted / profile.stats.totalCourses) * 100)}%
                        </div>
                        <div className="text-sm text-muted-foreground">Completion Rate</div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Overall Progress</span>
                          <span>
                            {Math.round((profile.stats.coursesCompleted / profile.stats.totalCourses) * 100)}%
                          </span>
                        </div>
                        <Progress
                          value={(profile.stats.coursesCompleted / profile.stats.totalCourses) * 100}
                          className="h-3"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Badges & Achievements */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Card className="scroll-shadow">
                  <CardHeader>
                    <CardTitle className="font-serif text-xl flex items-center">
                      <Award className="w-5 h-5 mr-2" />
                      Lencana & Prestasi
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Badges */}
                      <div>
                        <h3 className="font-medium mb-4">Lencana Terkumpul</h3>
                        <div className="space-y-3">
                          {profile.badges.map((badge, index) => (
                            <motion.div
                              key={index}
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ duration: 0.3, delay: index * 0.1 }}
                              className="flex items-center space-x-3 p-3 bg-accent/10 rounded-lg"
                            >
                              <span className="text-2xl">{badge.split(" ")[0]}</span>
                              <span className="font-medium">{badge.split(" ").slice(1).join(" ")}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Recent Achievements */}
                      <div>
                        <h3 className="font-medium mb-4">Prestasi Terbaru</h3>
                        <div className="space-y-3">
                          {profile.achievements.map((achievement, index) => (
                            <motion.div
                              key={index}
                              initial={{ x: 20, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ duration: 0.3, delay: index * 0.1 }}
                              className="p-3 bg-card/50 rounded-lg border-l-4 border-primary"
                            >
                              <div className="flex items-start space-x-3">
                                <span className="text-xl">{achievement.icon}</span>
                                <div className="flex-1">
                                  <h4 className="font-medium text-sm">{achievement.title}</h4>
                                  <p className="text-xs text-muted-foreground mb-1">{achievement.description}</p>
                                  <p className="text-xs text-muted-foreground">{achievement.date}</p>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Activity Timeline */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <Card className="scroll-shadow">
                  <CardHeader>
                    <CardTitle className="font-serif text-xl flex items-center">
                      <Clock className="w-5 h-5 mr-2" />
                      Aktivitas Terbaru
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-4 p-3 bg-primary/5 rounded-lg">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                        <div>
                          <p className="text-sm font-medium">Menyelesaikan modul "Etika Aristoteles"</p>
                          <p className="text-xs text-muted-foreground">2 jam yang lalu</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4 p-3 bg-accent/5 rounded-lg">
                        <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                        <div>
                          <p className="text-sm font-medium">Memposting diskusi di forum Filsafat</p>
                          <p className="text-xs text-muted-foreground">1 hari yang lalu</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4 p-3 bg-secondary/5 rounded-lg">
                        <div className="w-2 h-2 bg-secondary rounded-full mt-2"></div>
                        <div>
                          <p className="text-sm font-medium">Mendapat lencana "Observer of Stars"</p>
                          <p className="text-xs text-muted-foreground">3 hari yang lalu</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}

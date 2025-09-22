"use client"

import { useState } from "react"
import { AuthGuard } from "@/components/auth-guard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save, Shield, Globe, Users, BookOpen } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    siteName: "Academia Antiqua",
    siteDescription: "Menemukan rahasia pengetahuan kuno dalam era digital",
    adminEmail: "admin@academia-antiqua.com",
    supportEmail: "support@academia-antiqua.com",
    allowRegistration: true,
    requireEmailVerification: true,
    enableForumModeration: true,
    enableNotifications: true,
    defaultUserLevel: "Apprentice",
    pointsPerModule: 25,
    maxFileUploadSize: "10MB",
    sessionTimeout: "24 hours",
    backupFrequency: "daily",
    maintenanceMode: false,
  })

  const handleSave = () => {
    // In real app, would save to backend
    alert("Pengaturan berhasil disimpan!")
  }

  const handleInputChange = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-background parchment-texture">
        {/* Header */}
        <header className="border-b border-border bg-card/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <Button variant="ghost" asChild>
                <Link href="/admin">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Kembali ke Admin Dashboard
                </Link>
              </Button>
              <Button onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Simpan Pengaturan
              </Button>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Page Header */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="font-serif text-4xl font-bold text-foreground mb-2">Pengaturan Sistem</h1>
            <p className="text-xl text-muted-foreground">Konfigurasi dan kelola pengaturan Academia Antiqua</p>
          </motion.div>

          <div className="space-y-8">
            {/* General Settings */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="scroll-shadow">
                <CardHeader>
                  <CardTitle className="font-serif text-xl flex items-center">
                    <Globe className="w-5 h-5 mr-2" />
                    Pengaturan Umum
                  </CardTitle>
                  <CardDescription>Konfigurasi dasar platform</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="siteName">Nama Situs</Label>
                      <Input
                        id="siteName"
                        value={settings.siteName}
                        onChange={(e) => handleInputChange("siteName", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="adminEmail">Email Admin</Label>
                      <Input
                        id="adminEmail"
                        type="email"
                        value={settings.adminEmail}
                        onChange={(e) => handleInputChange("adminEmail", e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="siteDescription">Deskripsi Situs</Label>
                    <Textarea
                      id="siteDescription"
                      value={settings.siteDescription}
                      onChange={(e) => handleInputChange("siteDescription", e.target.value)}
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="supportEmail">Email Support</Label>
                    <Input
                      id="supportEmail"
                      type="email"
                      value={settings.supportEmail}
                      onChange={(e) => handleInputChange("supportEmail", e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* User Management */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="scroll-shadow">
                <CardHeader>
                  <CardTitle className="font-serif text-xl flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    Manajemen Pengguna
                  </CardTitle>
                  <CardDescription>Pengaturan registrasi dan akun pengguna</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="allowRegistration">Izinkan Registrasi Baru</Label>
                      <p className="text-sm text-muted-foreground">Pengguna baru dapat mendaftar akun</p>
                    </div>
                    <Switch
                      id="allowRegistration"
                      checked={settings.allowRegistration}
                      onCheckedChange={(checked) => handleInputChange("allowRegistration", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="requireEmailVerification">Verifikasi Email Wajib</Label>
                      <p className="text-sm text-muted-foreground">
                        Pengguna harus verifikasi email sebelum akses penuh
                      </p>
                    </div>
                    <Switch
                      id="requireEmailVerification"
                      checked={settings.requireEmailVerification}
                      onCheckedChange={(checked) => handleInputChange("requireEmailVerification", checked)}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="defaultUserLevel">Level Default Pengguna Baru</Label>
                      <Select
                        value={settings.defaultUserLevel}
                        onValueChange={(value) => handleInputChange("defaultUserLevel", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Apprentice">Apprentice</SelectItem>
                          <SelectItem value="Adept">Adept</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="sessionTimeout">Timeout Sesi</Label>
                      <Select
                        value={settings.sessionTimeout}
                        onValueChange={(value) => handleInputChange("sessionTimeout", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1 hour">1 Jam</SelectItem>
                          <SelectItem value="8 hours">8 Jam</SelectItem>
                          <SelectItem value="24 hours">24 Jam</SelectItem>
                          <SelectItem value="7 days">7 Hari</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Learning System */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Card className="scroll-shadow">
                <CardHeader>
                  <CardTitle className="font-serif text-xl flex items-center">
                    <BookOpen className="w-5 h-5 mr-2" />
                    Sistem Pembelajaran
                  </CardTitle>
                  <CardDescription>Konfigurasi gamifikasi dan pembelajaran</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="pointsPerModule">Poin per Modul Selesai</Label>
                      <Input
                        id="pointsPerModule"
                        type="number"
                        value={settings.pointsPerModule}
                        onChange={(e) => handleInputChange("pointsPerModule", Number.parseInt(e.target.value))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="maxFileUploadSize">Maksimal Upload File</Label>
                      <Select
                        value={settings.maxFileUploadSize}
                        onValueChange={(value) => handleInputChange("maxFileUploadSize", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5MB">5MB</SelectItem>
                          <SelectItem value="10MB">10MB</SelectItem>
                          <SelectItem value="25MB">25MB</SelectItem>
                          <SelectItem value="50MB">50MB</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="enableForumModeration">Moderasi Forum Otomatis</Label>
                      <p className="text-sm text-muted-foreground">Aktifkan filter konten dan moderasi otomatis</p>
                    </div>
                    <Switch
                      id="enableForumModeration"
                      checked={settings.enableForumModeration}
                      onCheckedChange={(checked) => handleInputChange("enableForumModeration", checked)}
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* System & Security */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Card className="scroll-shadow">
                <CardHeader>
                  <CardTitle className="font-serif text-xl flex items-center">
                    <Shield className="w-5 h-5 mr-2" />
                    Sistem & Keamanan
                  </CardTitle>
                  <CardDescription>Pengaturan backup, notifikasi, dan maintenance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="backupFrequency">Frekuensi Backup</Label>
                      <Select
                        value={settings.backupFrequency}
                        onValueChange={(value) => handleInputChange("backupFrequency", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hourly">Setiap Jam</SelectItem>
                          <SelectItem value="daily">Harian</SelectItem>
                          <SelectItem value="weekly">Mingguan</SelectItem>
                          <SelectItem value="monthly">Bulanan</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="enableNotifications">Notifikasi Sistem</Label>
                      <p className="text-sm text-muted-foreground">Kirim notifikasi email untuk aktivitas penting</p>
                    </div>
                    <Switch
                      id="enableNotifications"
                      checked={settings.enableNotifications}
                      onCheckedChange={(checked) => handleInputChange("enableNotifications", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="maintenanceMode">Mode Maintenance</Label>
                      <p className="text-sm text-muted-foreground">Aktifkan untuk maintenance sistem</p>
                    </div>
                    <Switch
                      id="maintenanceMode"
                      checked={settings.maintenanceMode}
                      onCheckedChange={(checked) => handleInputChange("maintenanceMode", checked)}
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}

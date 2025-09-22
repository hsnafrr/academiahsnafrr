"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Scroll, UserPlus, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      alert("Kata sandi tidak cocok!")
      return
    }
    if (!acceptTerms) {
      alert("Anda harus menyetujui syarat dan ketentuan!")
      return
    }

    setIsLoading(true)

    // Simulate registration
    setTimeout(() => {
      localStorage.setItem("isAuthenticated", "true")
      localStorage.setItem("userEmail", formData.email)
      localStorage.setItem("userName", formData.name)
      router.push("/dashboard")
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-background parchment-texture flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <Scroll className="w-7 h-7 text-primary-foreground" />
            </div>
            <div className="text-left">
              <h1 className="font-serif text-2xl font-bold text-foreground">Academia Antiqua</h1>
              <p className="text-sm text-muted-foreground">Ancient Wisdom, Modern Learning</p>
            </div>
          </Link>
        </div>

        {/* Register Card */}
        <Card className="scroll-shadow border-2 border-border bg-card/95 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserPlus className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="font-serif text-2xl">Bergabung dengan Akademi</CardTitle>
            <CardDescription className="text-base">
              Mulai perjalanan ilmu Anda dan temukan kearifan yang telah tersembunyi selama berabad-abad.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegister} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Nama Lengkap
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Masukkan nama lengkap Anda"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="bg-background border-border focus:border-accent"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Alamat Surat Elektronik
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="scholar@academia-antiqua.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="bg-background border-border focus:border-accent"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Kata Sandi
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Buat kata sandi yang kuat"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="bg-background border-border focus:border-accent pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium">
                  Konfirmasi Kata Sandi
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Ulangi kata sandi Anda"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    className="bg-background border-border focus:border-accent pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={acceptTerms}
                  onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                />
                <Label htmlFor="terms" className="text-sm leading-relaxed">
                  Saya menyetujui{" "}
                  <Link href="/terms" className="text-primary hover:text-primary/80 transition-colors">
                    syarat dan ketentuan
                  </Link>{" "}
                  serta{" "}
                  <Link href="/privacy" className="text-primary hover:text-primary/80 transition-colors">
                    kebijakan privasi
                  </Link>
                </Label>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading || !acceptTerms}>
                {isLoading ? "Mendaftarkan..." : "Bergabung dengan Akademi"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Sudah memiliki akun?{" "}
                <Link href="/login" className="text-primary hover:text-primary/80 font-medium transition-colors">
                  Masuk ke Akademi
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Demo Note */}
        <Card className="mt-4 border border-accent/20 bg-accent/5">
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground text-center">
              <strong>Demo:</strong> Isi form dengan data apapun untuk mendaftar
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

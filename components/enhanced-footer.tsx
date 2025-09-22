"use client"
import { Scroll, Mail, Phone, MapPin } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export function EnhancedFooter() {
  return (
    <footer className="py-16 px-4 border-t border-border bg-card/30 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 text-primary">
          <Scroll className="w-24 h-24" />
        </div>
        <div className="absolute top-20 right-20 text-primary">
          <Scroll className="w-16 h-16 rotate-45" />
        </div>
        <div className="absolute bottom-10 left-1/3 text-primary">
          <Scroll className="w-20 h-20 -rotate-12" />
        </div>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <Scroll className="w-7 h-7 text-primary-foreground" />
              </div>
              <div>
                <h2 className="font-serif text-2xl font-bold text-foreground">Academia Antiqua</h2>
                <p className="text-sm text-primary font-medium">Ancient Wisdom, Modern Learning</p>
              </div>
            </div>

            <p className="text-muted-foreground mb-6 leading-relaxed max-w-md">
              <strong className="text-foreground">"Menemukan rahasia pengetahuan kuno dalam era digital"</strong>
              <br />
              <br />
              Platform pembelajaran interaktif yang menghubungkan kearifan para filsuf, matematikawan, dan ilmuwan zaman
              dahulu dengan teknologi modern untuk menciptakan pengalaman belajar yang transformatif.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm">
                <Phone className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">089620928296</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Mail className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">info@academia-antiqua.com</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">Jakarta, Indonesia</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="font-serif text-lg font-semibold text-foreground mb-6">Pembelajaran</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/courses" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Kursus & Gulungan Ilmu
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Dashboard Scholar
                </Link>
              </li>
              <li>
                <Link href="/hall" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Hall of Scholars
                </Link>
              </li>
              <li>
                <Link href="/codex" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Codex of Knowledge
                </Link>
              </li>
              <li>
                <Link href="/progress" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Progress & Achievements
                </Link>
              </li>
              <li>
                <Link href="/help" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Bantuan & FAQ
                </Link>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="border-t border-border mt-12 pt-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-sm text-muted-foreground">&copy; 2024 Academia Antiqua. Semua hak dilindungi.</p>
              <p className="text-xs text-muted-foreground mt-1">
                Dibuat dengan ❤️ untuk para pencinta ilmu pengetahuan kuno
              </p>
            </div>

            <div className="flex items-center space-x-6 text-xs text-muted-foreground">
              <span>Versi 1.0.0</span>
              <span>•</span>
              <span>Dibangun dengan Next.js & Tailwind CSS</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

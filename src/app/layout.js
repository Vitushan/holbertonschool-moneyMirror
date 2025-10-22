'use client'
import './globals.css'
import { Inter } from 'next/font/google'
import { SessionProvider } from 'next-auth/react'
import Navbar from '@/components/Navbar'
import MotivationalMessage from '@/components/MotivationalMessage'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <SessionProvider>
          <Navbar />
          <div className="flex flex-col min-h-screen">
            <main className="flex-1">
              {children}
            </main>

            {/* Message motivationnel juste avant le footer */}
            <div className="bg-gray-50 border-t border-gray-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <MotivationalMessage />
              </div>
            </div>

            {/* Footer global */}
            <Footer />
          </div>
        </SessionProvider>
      </body>
    </html>
  )
}
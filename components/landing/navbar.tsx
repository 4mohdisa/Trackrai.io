'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { SIGN_IN_URL, SIGN_UP_URL } from '@/constants/site'
import { trackSignupClick, trackSigninClick } from '@/lib/analytics'

export function LandingNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-gray-200/50 bg-white/70 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#635BFF] to-[#0A2540]">
              TrackrAI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-1">
            <Link href="/#features" className="text-sm text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors">
              Features
            </Link>
            <Link href="/blog" className="text-sm text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors">
              Blog
            </Link>
            <Link href="/help" className="text-sm text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors">
              Help
            </Link>
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex lg:items-center lg:space-x-3">
            <a href={SIGN_IN_URL} onClick={() => trackSigninClick('navbar')}>
              <Button variant="ghost" className="text-[15px] text-gray-600 hover:text-gray-900 hover:bg-gray-50">
                Sign in
              </Button>
            </a>
            <a href={SIGN_UP_URL} onClick={() => trackSignupClick('navbar')}>
              <Button className="bg-gray-900 hover:bg-gray-800 text-white text-[15px] shadow-sm">
                Get started
              </Button>
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden rounded-md p-2 text-gray-600 hover:bg-gray-100"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white">
          <div className="space-y-1 px-4 pb-4 pt-2">
            <div className="flex flex-col space-y-1 mb-3">
              <Link href="/#features" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 rounded-md hover:bg-gray-50">
                Features
              </Link>
              <Link href="/blog" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 rounded-md hover:bg-gray-50">
                Blog
              </Link>
              <Link href="/help" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 rounded-md hover:bg-gray-50">
                Help
              </Link>
            </div>
            <div className="flex flex-col space-y-2">
              <a href={SIGN_IN_URL} onClick={() => { setMobileMenuOpen(false); trackSigninClick('navbar_mobile') }}>
                <Button variant="outline" className="w-full text-[15px]">
                  Sign in
                </Button>
              </a>
              <a href={SIGN_UP_URL} onClick={() => { setMobileMenuOpen(false); trackSignupClick('navbar_mobile') }}>
                <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white text-[15px]">
                  Get started
                </Button>
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { SIGN_IN_URL, SIGN_UP_URL } from '@/constants/site'
import { trackSignupClick, trackSigninClick } from '@/lib/analytics'

const NAV_LINKS = [
  { href: '/#features', label: 'Features', matchPath: '/' },
  { href: '/blog',       label: 'Blog',     matchPath: '/blog' },
  { href: '/help',       label: 'Help',     matchPath: '/help' },
]

export function LandingNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (matchPath: string) => {
    if (matchPath === '/') return pathname === '/'
    return pathname === matchPath || pathname.startsWith(matchPath + '/')
  }

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-gray-200/50 bg-white/70 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo-light-theme.svg"
              alt="TrackrAI"
              width={140}
              height={36}
              className="h-9 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-1">
            {NAV_LINKS.map(({ href, label, matchPath }) => (
              <Link
                key={href}
                href={href}
                className={`text-sm px-3 py-2 rounded-md transition-colors ${
                  isActive(matchPath)
                    ? 'text-brand-primary font-medium bg-brand-primary/5'
                    : 'text-brand-body hover:text-brand-heading hover:bg-gray-50'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex lg:items-center lg:space-x-3">
            <a href={SIGN_IN_URL} onClick={() => trackSigninClick('navbar')}>
              <Button variant="ghost" className="text-[15px] text-brand-body hover:text-brand-heading hover:bg-gray-50">
                Sign in
              </Button>
            </a>
            <a href={SIGN_UP_URL} onClick={() => trackSignupClick('navbar')}>
              <Button className="bg-brand-heading hover:opacity-90 text-white text-[15px] shadow-sm">
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

      {/* Mobile menu — smooth slide-down */}
      <div
        className="lg:hidden overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: mobileMenuOpen ? 400 : 0, opacity: mobileMenuOpen ? 1 : 0 }}
      >
        <div className="border-t border-gray-200 bg-white">
          <div className="space-y-1 px-4 pb-4 pt-2">
            <div className="flex flex-col space-y-0.5 mb-3">
              {NAV_LINKS.map(({ href, label, matchPath }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2.5 text-sm rounded-md transition-colors ${
                    isActive(matchPath)
                      ? 'text-brand-primary font-medium bg-brand-primary/5'
                      : 'text-brand-body hover:text-brand-heading hover:bg-gray-50'
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>
            <div className="flex flex-col space-y-2 pt-2 border-t border-gray-100">
              <a href={SIGN_IN_URL} onClick={() => { setMobileMenuOpen(false); trackSigninClick('navbar_mobile') }}>
                <Button variant="outline" className="w-full text-[15px] border-brand-border text-brand-body hover:text-brand-heading">
                  Sign in
                </Button>
              </a>
              <a href={SIGN_UP_URL} onClick={() => { setMobileMenuOpen(false); trackSignupClick('navbar_mobile') }}>
                <Button className="w-full bg-brand-heading hover:opacity-90 text-white text-[15px]">
                  Get started
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

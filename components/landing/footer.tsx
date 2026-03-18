import Link from 'next/link'
import Image from 'next/image'
import { Twitter, Github, Mail } from 'lucide-react'
import { SIGN_IN_URL, SIGN_UP_URL } from '@/constants/site'

const PRODUCT_LINKS = [
  { href: '/#features',   label: 'Features' },
  { href: '/#how-it-works', label: 'How It Works' },
  { href: '/security',    label: 'Security' },
  { href: '/blog',        label: 'Blog' },
  { href: '/help',        label: 'Help Centre' },
]

const COMPANY_LINKS = [
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms',   label: 'Terms of Service' },
]

const GET_STARTED_LINKS = [
  { href: SIGN_UP_URL, label: 'Sign up free',         external: true },
  { href: SIGN_IN_URL, label: 'Sign in',              external: true },
  { href: '#',         label: 'Download iOS app',     external: false },
  { href: '#',         label: 'Download Android app', external: false },
]

export function LandingFooter() {
  return (
    <footer className="bg-gray-900">
      {/* Top section */}
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">

          {/* Brand column */}
          <div className="md:col-span-1 space-y-5">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-bold text-white">
                TrackrAI
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              AI-Powered Personal Finance Tracker. TrackrAI tracks your expenses, categories, merchants, and recurring payments in one place.
            </p>

            {/* App Store badges */}
            <div className="flex flex-col gap-2">
              <a href="#" aria-label="Download on the App Store">
                <Image
                  src="/images/app-store-badge.svg"
                  alt="Download on the App Store"
                  width={130}
                  height={40}
                  className="h-10 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
                />
              </a>
              <a href="#" aria-label="Get it on Google Play">
                <Image
                  src="/playstore.svg"
                  alt="Get it on Google Play"
                  width={130}
                  height={40}
                  className="h-10 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
                />
              </a>
            </div>

            {/* Social links */}
            <div className="flex gap-2">
              <a
                href="#"
                aria-label="TrackrAI on Twitter / X"
                className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-white/10 text-gray-400 hover:bg-white/20 hover:text-white transition-all"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="TrackrAI on GitHub"
                className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-white/10 text-gray-400 hover:bg-white/20 hover:text-white transition-all"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="mailto:support@trackrai.io"
                aria-label="Email support"
                className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-white/10 text-gray-400 hover:bg-white/20 hover:text-white transition-all"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Product links */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-5 uppercase tracking-wide">Product</h3>
            <ul className="space-y-3">
              {PRODUCT_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-5 uppercase tracking-wide">Company</h3>
            <ul className="space-y-3">
              {COMPANY_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get started links */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-5 uppercase tracking-wide">Get Started</h3>
            <ul className="space-y-3">
              {GET_STARTED_LINKS.map(({ href, label, external }) => (
                <li key={label}>
                  {external ? (
                    <a
                      href={href}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {label}
                    </a>
                  ) : (
                    <a
                      href={href}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-gray-500">
            <span>© {new Date().getFullYear()} TrackrAI. All rights reserved.</span>
            <span className="hidden md:block">Made with care for your financial clarity</span>
            <div className="flex gap-5">
              <Link href="/privacy" className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
              <Link href="/terms"   className="hover:text-gray-300 transition-colors">Terms</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

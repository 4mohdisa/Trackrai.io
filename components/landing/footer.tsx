import Link from 'next/link'
import { Mail } from 'lucide-react'

export function LandingFooter() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#635BFF] to-[#0A2540]">
                TrackrAI
              </span>
            </Link>
            <p className="text-sm text-gray-600 max-w-xs leading-relaxed">
              AI-Powered Personal Finance Tracker. Track expenses, manage recurring payments, and generate financial reports.
            </p>
            <a
              href="mailto:support@trackrai.io"
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#635BFF] transition-colors"
              aria-label="Email support"
            >
              <Mail className="h-4 w-4" />
              support@trackrai.io
            </a>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/help" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/privacy" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/security" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Security
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200">
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} TrackrAI. All rights reserved. trackrai.io
          </p>
        </div>
      </div>
    </footer>
  )
}

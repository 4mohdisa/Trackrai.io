import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import { Toaster } from 'sonner'
import { LandingNavbar } from '@/components/landing/navbar'
import { LandingFooter } from '@/components/landing/footer'
import { MarketingPixels } from '@/components/analytics/MarketingPixels'
import { StructuredData } from '@/components/seo/StructuredData'
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from '@/constants/site'
import './globals.css'

const geist = Geist({ subsets: ['latin'], variable: '--font-sans', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'TrackrAI — AI-Powered Personal Finance Tracker',
    template: '%s | TrackrAI',
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'personal finance app',
    'AI expense tracker',
    'subscription tracker',
    'recurring transaction tracking',
    'merchant tracking',
    'financial reports',
    'AI categorisation',
    'transaction tracker',
    'spending analytics',
    'finance tracking',
    'CSV import finance',
    'TrackrAI',
    'mobile finance app',
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: 'TrackrAI — AI-Powered Personal Finance Tracker',
    description: SITE_DESCRIPTION,
    type: 'website',
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TrackrAI — AI-Powered Personal Finance Tracker',
    description: SITE_DESCRIPTION,
    site: '@trackrai',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={geist.variable}>
      <body className="min-h-screen bg-white antialiased">
        <StructuredData />
        <LandingNavbar />
        <main>{children}</main>
        <LandingFooter />
        <Toaster position="top-right" richColors />
        <MarketingPixels />
      </body>
    </html>
  )
}

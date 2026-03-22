import type { Metadata } from 'next'
import { Geist, Inter, DM_Serif_Display } from 'next/font/google'
import { Toaster } from 'sonner'
import { LandingNavbar } from '@/components/landing/navbar'
import { LandingFooter } from '@/components/landing/footer'
import { MarketingPixels } from '@/components/analytics/MarketingPixels'
import { StructuredData } from '@/components/seo/StructuredData'
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from '@/constants/site'
import './globals.css'

const geist = Geist({ subsets: ['latin'], variable: '--font-sans', display: 'swap' })

// Body font — Inter Medium and Regular
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['400', '500', '600'],
})

// TODO: Replace with Ronzino font files when available.
// Ronzino is not available on Google Fonts. Using DM Serif Display as the
// closest available serif substitute until official Ronzino files are sourced.
const dmSerifDisplay = DM_Serif_Display({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
  weight: ['400'],
})

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
  icons: {
    icon: '/Favicon.svg',
    shortcut: '/Favicon.svg',
    apple: '/Favicon.svg',
  },
  openGraph: {
    title: 'TrackrAI — AI-Powered Personal Finance Tracker',
    description: SITE_DESCRIPTION,
    type: 'website',
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: 'en_US',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'TrackrAI — AI-Powered Personal Finance Tracker' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TrackrAI — AI-Powered Personal Finance Tracker',
    description: SITE_DESCRIPTION,
    site: '@trackrai',
    images: ['/og.png'],
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
    <html lang="en" className={`${geist.variable} ${inter.variable} ${dmSerifDisplay.variable}`}>
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

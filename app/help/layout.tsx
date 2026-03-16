import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Help Center',
  description:
    'Find answers to common questions about TrackrAI. Get help with transactions, subscriptions, recurring payments, merchants, reports, categories, and account settings.',
  alternates: {
    canonical: 'https://trackrai.io/help',
  },
  openGraph: {
    title: 'Help Center | TrackrAI',
    description:
      'Find answers to common questions about TrackrAI. Get help with transactions, subscriptions, recurring payments, merchants, reports, categories, and account settings.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Help Center | TrackrAI',
    description:
      'Find answers to common questions about TrackrAI. Get help with transactions, subscriptions, recurring payments, merchants, reports, categories, and account settings.',
  },
}

export default function HelpLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

import type { Metadata } from 'next'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { testimonials } from '@/constants/testimonials'
import { SITE_URL, SITE_NAME } from '@/constants/site'
import { SignupCTA } from '@/components/landing/signup-cta'
import { AppStoreBadges } from '@/components/landing/app-store-badges'
import { ScrollTracker } from '@/components/landing/scroll-tracker'
import {
  BarChart3,
  TrendingUp,
  Shield,
  Zap,
  PieChart,
  Calendar,
  Repeat,
  DollarSign,
  LineChart,
  Sparkles,
  CreditCard,
  CheckCircle2,
  Store,
  FileBarChart2,
  Smartphone,
  RefreshCw,
  ArrowRightLeft,
} from 'lucide-react'

export const metadata: Metadata = {
  title: {
    absolute: 'TrackrAI — AI-Powered Personal Finance Tracker',
  },
  description:
    'Track your expenses, subscriptions, and recurring payments. TrackrAI uses AI to categorise transactions, track merchants, and generate clear financial reports.',
  alternates: {
    canonical: 'https://trackrai.io',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: SITE_NAME,
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web, iOS, Android',
  url: SITE_URL,
  description:
    'AI-powered personal finance tracker. Import bank CSV statements, auto-categorise transactions with AI, manage recurring payments, track merchants, and generate period-based financial reports.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    description: 'Free to use.',
  },
}

export default function Home() {
  return (
    <>
      <ScrollTracker />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <section id="hero" data-track-section="hero" className="relative overflow-hidden bg-gradient-to-b from-white via-blue-50/30 to-white pt-32 pb-24">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full mix-blend-multiply blur-3xl opacity-70" />
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-400/20 rounded-full mix-blend-multiply blur-3xl opacity-70" />
          <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-indigo-400/20 rounded-full mix-blend-multiply blur-3xl opacity-70" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center rounded-full border border-gray-200 bg-white/80 px-4 py-1.5 text-sm text-gray-700 shadow-sm backdrop-blur-sm mb-8">
              <Sparkles className="mr-2 h-4 w-4 text-[#635BFF]" />
              AI-Powered Personal Finance Tracker
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-gray-900 mb-8">
              Track your money{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#635BFF] to-[#00D4FF]">
                with AI
              </span>
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-gray-500 mb-8 max-w-3xl mx-auto leading-relaxed">
              TrackrAI categorises your transactions automatically when you import them from your bank. Review your spending by category, merchant, and time period in one dashboard. Set up a recurring payment once and TrackrAI generates entries for it on schedule.
            </p>

            <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 mb-10 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span>256-bit encryption</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span>No bank connection required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span>Setup in under 2 minutes</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-4">
              <SignupCTA source="hero">
                <Button size="lg" className="bg-gray-900 hover:bg-gray-800 text-white text-base px-10 py-7 rounded-full shadow-lg hover:shadow-xl transition-all font-semibold">
                  Start for Free
                </Button>
              </SignupCTA>
              <a href="#features">
                <Button size="lg" variant="outline" className="text-gray-700 border-2 border-gray-300 text-base px-10 py-7 rounded-full hover:bg-gray-50 transition-all font-semibold">
                  See How It Works
                </Button>
              </a>
            </div>

            <p className="text-sm text-gray-500 mb-16">
              No credit card required. Free to get started.
            </p>

            {/* Dashboard Preview */}
            <div className="relative mx-auto max-w-5xl">
              <div className="absolute -inset-4 bg-gradient-to-r from-[#635BFF]/20 to-[#00D4FF]/20 rounded-3xl blur-3xl" />
              <div className="relative rounded-2xl border border-gray-200 bg-white shadow-2xl overflow-hidden">
                <div className="flex items-center gap-2 border-b border-gray-200 px-4 py-3 bg-gray-50">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="bg-white border border-gray-200 rounded-md px-3 py-1.5 text-xs text-gray-500">
                      app.trackrai.io/dashboard
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-gray-50 to-white p-4 sm:p-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <Card className="p-6 border-gray-200 bg-white">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Total Balance</span>
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      </div>
                      <p className="text-3xl font-bold text-gray-900">$24,532</p>
                      <p className="text-xs text-green-600 mt-1">+12.5% this month</p>
                    </Card>
                    <Card className="p-6 border-gray-200 bg-white">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Income</span>
                        <DollarSign className="h-4 w-4 text-blue-500" />
                      </div>
                      <p className="text-3xl font-bold text-gray-900">$8,420</p>
                      <p className="text-xs text-gray-500 mt-1">Last 30 days</p>
                    </Card>
                    <Card className="p-6 border-gray-200 bg-white">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Expenses</span>
                        <CreditCard className="h-4 w-4 text-orange-500" />
                      </div>
                      <p className="text-3xl font-bold text-gray-900">$3,280</p>
                      <p className="text-xs text-gray-500 mt-1">Last 30 days</p>
                    </Card>
                  </div>

                  <Card className="p-6 border-gray-200 bg-white">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-900">Spending Overview</h3>
                      <LineChart className="h-4 w-4 text-gray-400" />
                    </div>
                    <div className="h-48 bg-gradient-to-t from-blue-50 to-transparent rounded-lg flex items-end justify-around px-4 pb-4">
                      {[60, 80, 45, 90, 70, 55].map((h, i) => (
                        <div key={i} className="w-8 sm:w-12 bg-gradient-to-t from-[#635BFF] to-[#635BFF]/50 rounded-t" style={{ height: `${h}%` }} />
                      ))}
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-16 bg-white border-y border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
            {[
              { value: '7+', label: 'Core Features' },
              { value: '<2 min', label: 'Setup Time' },
              { value: '256-bit', label: 'Encryption' },
              { value: '99.9%', label: 'Uptime Goal' },
            ].map((stat) => (
              <div key={stat.label} className="text-center px-4 py-2">
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-1.5 tracking-tight">{stat.value}</div>
                <div className="text-xs md:text-sm text-gray-500 font-medium uppercase tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Banner */}
      <section className="py-12 bg-gradient-to-r from-[#635BFF] to-indigo-600">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <p className="text-white text-lg font-semibold">Ready in under 2 minutes. Free to use.</p>
              <p className="text-white/75 text-sm mt-1">No bank connection needed. Import your CSV and TrackrAI handles the rest.</p>
            </div>
            <SignupCTA source="social_proof_banner">
              <Button size="lg" className="bg-white text-[#635BFF] hover:bg-gray-50 px-8 py-6 rounded-full shadow-lg font-semibold transition-all whitespace-nowrap">
                Get Started Free
              </Button>
            </SignupCTA>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" data-track-section="features" className="py-32 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-block px-4 py-2 bg-[#635BFF]/10 text-[#635BFF] rounded-full text-sm font-semibold mb-6">
              FEATURES
            </div>
            <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6">
              Know where your money goes
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              TrackrAI gives you six tools to stay on top of your spending. Import your transactions and your finances become clear right away.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Sparkles className="h-6 w-6" />,
                color: 'from-[#635BFF] to-indigo-600',
                border: 'hover:border-[#635BFF]/40',
                title: 'AI Categorisation',
                description:
                  'Add a transaction or import a CSV and TrackrAI assigns a category automatically. The AI reads the transaction name and matches it to one of your categories. You adjust any assignment at any time.',
              },
              {
                icon: <Repeat className="h-6 w-6" />,
                color: 'from-green-500 to-emerald-600',
                border: 'hover:border-green-300',
                title: 'Recurring Transactions',
                description:
                  'Set up a recurring payment once and TrackrAI generates a new transaction entry each day the schedule runs. You see all upcoming payments in one list. No more missed subscriptions or forgotten bills.',
              },
              {
                icon: <Store className="h-6 w-6" />,
                color: 'from-indigo-500 to-violet-600',
                border: 'hover:border-indigo-300',
                title: 'Merchant Tracking',
                description:
                  'Every transaction links to a merchant. You see each merchant\'s full transaction history and total spending in one place. Assign merchants to transactions and your spending data becomes easier to read.',
              },
              {
                icon: <FileBarChart2 className="h-6 w-6" />,
                color: 'from-teal-500 to-cyan-600',
                border: 'hover:border-teal-300',
                title: 'Spending Reports',
                description:
                  'Generate a financial report for any time period and TrackrAI saves it as a fixed snapshot. Reports include your income, expenses, net total, category breakdown, and top merchants. Each report stays unchanged so you compare periods accurately.',
              },
              {
                icon: <PieChart className="h-6 w-6" />,
                color: 'from-orange-500 to-red-500',
                border: 'hover:border-orange-300',
                title: 'Category Breakdown',
                description:
                  'TrackrAI groups all your transactions by category and shows spending totals with visual charts. You see how much you spent on food, transport, utilities, and other areas each month. Adjust your categories at any time.',
              },
              {
                icon: <Zap className="h-6 w-6" />,
                color: 'from-blue-500 to-cyan-500',
                border: 'hover:border-blue-300',
                title: 'CSV Import',
                description:
                  'Export your bank statement as a CSV file and import it directly into TrackrAI. The AI categorises each transaction automatically during the import process. Review and edit the results before saving.',
              },
            ].map((feature, i) => (
              <div
                key={feature.title}
                className={`group relative rounded-2xl border border-gray-200 bg-white p-8 hover:shadow-lg ${feature.border} transition-all duration-300 animate-fade-up`}
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} text-white mb-6 group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile App Section 1 */}
      <section id="mobile_app_1" data-track-section="mobile_app_1" className="py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text */}
            <div>
              <div className="inline-flex items-center rounded-full border border-[#635BFF]/20 bg-[#635BFF]/5 px-4 py-1.5 text-sm text-[#635BFF] font-semibold mb-6">
                <Smartphone className="mr-2 h-4 w-4" />
                Mobile App
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
                Your finances in your pocket
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                TrackrAI has a mobile app. Add transactions, view your spending, and check your balance from anywhere. The app shares the same data as your web dashboard in real time.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  'Add transactions from your phone in seconds',
                  'View your spending by category and merchant anywhere',
                  'Check your account balance on the go',
                  'See upcoming recurring payments before they hit',
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-[#635BFF] shrink-0 mt-0.5" />
                    <span className="text-gray-700">{point}</span>
                  </li>
                ))}
              </ul>
              <AppStoreBadges />
              <p className="text-xs text-gray-400 mt-3">Mobile apps coming soon. Web app available now.</p>
            </div>
            {/* Phone Mockup */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute -inset-6 bg-gradient-to-r from-[#635BFF]/15 to-indigo-400/15 rounded-full blur-3xl" />
                <div className="relative w-60 bg-gray-900 rounded-[2.5rem] p-2.5 shadow-2xl">
                  <div className="bg-gray-800 rounded-[2rem] overflow-hidden">
                    {/* notch */}
                    <div className="bg-gray-900 h-7 flex items-center justify-center">
                      <div className="w-20 h-4 bg-gray-800 rounded-full" />
                    </div>
                    {/* screen */}
                    <div className="bg-white min-h-[460px] p-3">
                      {/* status bar mockup */}
                      <div className="flex justify-between items-center mb-4 px-1">
                        <span className="text-xs font-semibold text-gray-900">9:41</span>
                        <div className="flex gap-1 items-center">
                          <div className="w-3 h-2 rounded-sm bg-gray-900 opacity-80" />
                        </div>
                      </div>
                      {/* header */}
                      <div className="mb-4">
                        <p className="text-xs text-gray-500">Good morning</p>
                        <p className="text-base font-bold text-gray-900">Your Balance</p>
                        <p className="text-3xl font-extrabold text-gray-900 mt-1">$24,532</p>
                        <p className="text-xs text-green-600 mt-0.5">+$340 this week</p>
                      </div>
                      {/* quick stats */}
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        <div className="bg-green-50 rounded-xl p-2.5">
                          <p className="text-xs text-gray-500">Income</p>
                          <p className="text-sm font-bold text-gray-900">$8,420</p>
                        </div>
                        <div className="bg-red-50 rounded-xl p-2.5">
                          <p className="text-xs text-gray-500">Expenses</p>
                          <p className="text-sm font-bold text-gray-900">$3,280</p>
                        </div>
                      </div>
                      {/* recent transactions */}
                      <p className="text-xs font-semibold text-gray-700 mb-2">Recent</p>
                      <div className="space-y-2">
                        {[
                          { name: 'Netflix', amount: '-$15.99', color: 'bg-red-100 text-red-600' },
                          { name: 'Salary', amount: '+$4,200', color: 'bg-green-100 text-green-600' },
                          { name: 'Groceries', amount: '-$84.30', color: 'bg-orange-100 text-orange-600' },
                        ].map((tx) => (
                          <div key={tx.name} className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                            <span className="text-xs text-gray-700 font-medium">{tx.name}</span>
                            <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${tx.color}`}>{tx.amount}</span>
                          </div>
                        ))}
                      </div>
                      {/* bottom nav */}
                      <div className="flex justify-around mt-5 pt-3 border-t border-gray-100">
                        <div className="flex flex-col items-center gap-0.5">
                          <div className="w-4 h-4 rounded bg-[#635BFF]" />
                          <span className="text-[9px] text-[#635BFF] font-medium">Home</span>
                        </div>
                        <div className="flex flex-col items-center gap-0.5">
                          <div className="w-4 h-4 rounded bg-gray-300" />
                          <span className="text-[9px] text-gray-400">Txns</span>
                        </div>
                        <div className="flex flex-col items-center gap-0.5">
                          <div className="w-4 h-4 rounded bg-gray-300" />
                          <span className="text-[9px] text-gray-400">Reports</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Individual Feature Sections */}

      {/* Feature 1: Smart Analytics */}
      <section id="analytics" data-track-section="analytics" className="py-28 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm text-blue-700 mb-6">
                <BarChart3 className="mr-2 h-4 w-4" />
                Analytics
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
                Visualize your spending with powerful analytics
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Get deep insights into your financial habits with interactive charts and graphs. Track income vs expenses, analyze spending by category, and monitor your net balance over time.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Interactive charts with daily, weekly, and monthly views</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Category breakdown with pie charts and bar graphs</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Net balance tracking to monitor financial health</span>
                </li>
              </ul>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl blur-2xl" />
              <Card className="relative p-8 border-gray-200 bg-white shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                <div className="h-64 bg-gradient-to-t from-blue-50 to-transparent rounded-lg flex items-end justify-around px-6 pb-6">
                  {[65, 85, 55, 95, 75, 60, 90, 70].map((height, i) => (
                    <div 
                      key={i} 
                      className="w-8 bg-gradient-to-t from-[#635BFF] to-[#635BFF]/60 rounded-t-lg transition-all hover:opacity-75"
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Feature 2: Recurring Transactions */}
      <section id="recurring" data-track-section="recurring" className="py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-3xl blur-2xl" />
              <Card className="relative p-8 border-gray-200 bg-white shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                        <Repeat className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Netflix</p>
                        <p className="text-sm text-gray-600">Monthly</p>
                      </div>
                    </div>
                    <p className="font-bold text-gray-900">$15.99</p>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                        <Calendar className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Rent</p>
                        <p className="text-sm text-gray-600">Monthly</p>
                      </div>
                    </div>
                    <p className="font-bold text-gray-900">$1,200</p>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-purple-50 border border-purple-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center">
                        <Zap className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Gym Membership</p>
                        <p className="text-sm text-gray-600">Monthly</p>
                      </div>
                    </div>
                    <p className="font-bold text-gray-900">$49.99</p>
                  </div>
                </div>
              </Card>
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center rounded-full border border-green-200 bg-green-50 px-4 py-1.5 text-sm text-green-700 mb-6">
                <Repeat className="mr-2 h-4 w-4" />
                Automation
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
                Never miss a recurring transaction
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Set up a recurring bill, subscription, or income entry once and TrackrAI tracks it from that point. Review all upcoming payments in a single list and stop missing charges.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Automatic tracking of subscriptions and bills</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Predict upcoming transactions with smart forecasting</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Set custom frequencies: daily, weekly, monthly, yearly</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Feature 3: Category Management */}
      <section id="categories" data-track-section="categories" className="py-28 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5 text-sm text-orange-700 mb-6">
                <PieChart className="mr-2 h-4 w-4" />
                Organization
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
                Organize expenses by category
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                See exactly where your money goes with detailed category breakdowns. Create custom categories or use our predefined ones.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-green-500 mr-3 shrink-0" />
                  <span className="text-gray-700">Detailed category breakdown with charts and graphs</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-green-500 mr-3 shrink-0" />
                  <span className="text-gray-700">Custom categories tailored to your spending habits</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-green-500 mr-3 shrink-0" />
                  <span className="text-gray-700">Spot overruns and stay within your own limits</span>
                </li>
              </ul>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-3xl blur-2xl" />
              <Card className="relative p-8 border-gray-200 bg-white shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                    <PieChart className="h-8 w-8 text-blue-600 mb-2" />
                    <p className="text-sm font-medium text-gray-900">Food & Dining</p>
                    <p className="text-2xl font-bold text-gray-900">$680</p>
                  </div>
                  <div className="p-4 bg-purple-50 border border-purple-200 rounded-xl">
                    <PieChart className="h-8 w-8 text-purple-600 mb-2" />
                    <p className="text-sm font-medium text-gray-900">Transportation</p>
                    <p className="text-2xl font-bold text-gray-900">$340</p>
                  </div>
                  <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                    <PieChart className="h-8 w-8 text-green-600 mb-2" />
                    <p className="text-sm font-medium text-gray-900">Entertainment</p>
                    <p className="text-2xl font-bold text-gray-900">$220</p>
                  </div>
                  <div className="p-4 bg-orange-50 border border-orange-200 rounded-xl">
                    <PieChart className="h-8 w-8 text-orange-600 mb-2" />
                    <p className="text-sm font-medium text-gray-900">Shopping</p>
                    <p className="text-2xl font-bold text-gray-900">$450</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Feature 4: Merchant Management */}
      <section id="merchants" data-track-section="merchants" className="py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/10 to-violet-500/10 rounded-3xl blur-2xl" />
              <Card className="relative p-8 border-gray-200 bg-white shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                {/* Header */}
                <div className="flex items-center justify-between pb-4 mb-5 border-b border-gray-100">
                  <p className="font-semibold text-gray-900">Merchant Manager</p>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#635BFF]/10 text-[#635BFF] text-xs font-semibold">
                    8 merchants
                  </span>
                </div>
                {/* Assigned transactions */}
                <div className="space-y-3 mb-4">
                  {[
                    { name: 'Amazon', category: 'Shopping', amount: '$127.50', color: 'bg-blue-100 text-blue-600' },
                    { name: 'Spotify', category: 'Entertainment', amount: '$9.99', color: 'bg-green-100 text-green-600' },
                    { name: 'Whole Foods', category: 'Groceries', amount: '$84.30', color: 'bg-orange-100 text-orange-600' },
                  ].map((row) => (
                    <div key={row.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${row.color}`}>
                          <Store className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{row.name}</p>
                          <p className="text-xs text-gray-500">{row.category}</p>
                        </div>
                      </div>
                      <p className="text-sm font-bold text-gray-900">{row.amount}</p>
                    </div>
                  ))}
                </div>
                {/* Unassigned row */}
                <div className="flex items-center justify-between p-3 rounded-xl border border-dashed border-gray-300 bg-amber-50/50">
                  <div>
                    <p className="text-sm font-medium text-gray-600">SQ*COFFEE SHOP 34B</p>
                    <p className="text-xs text-gray-400">No merchant assigned</p>
                  </div>
                  <span className="text-xs bg-amber-100 text-amber-700 px-2.5 py-1 rounded-lg font-medium whitespace-nowrap">
                    Assign →
                  </span>
                </div>
              </Card>
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-sm text-indigo-700 mb-6">
                <Store className="mr-2 h-4 w-4" />
                Merchants
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
                See exactly who you&apos;re spending with
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Bank transaction labels are often cryptic or incomplete. TrackrAI lets you create and manage merchants, then assign them to transactions. The result is a cleaner, more accurate picture of your spending.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-green-500 mr-3 shrink-0" />
                  <span className="text-gray-700">Create and organize your own merchant list</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-green-500 mr-3 shrink-0" />
                  <span className="text-gray-700">Assign merchants to transactions for instant clarity</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-green-500 mr-3 shrink-0" />
                  <span className="text-gray-700">View spending grouped by merchant, not just category</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-green-500 mr-3 shrink-0" />
                  <span className="text-gray-700">Make your data cleaner and more useful over time</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Feature 5: Reporting */}
      <section id="reports" data-track-section="reports" className="py-28 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center rounded-full border border-teal-200 bg-teal-50 px-4 py-1.5 text-sm text-teal-700 mb-6">
                <FileBarChart2 className="mr-2 h-4 w-4" />
                Reports
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
                Your finances summarized, clearly
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Generate structured financial summaries for any period you choose. Review income, expenses, top categories, and merchants in one clean overview. Works well for monthly check-ins or year-end planning.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-green-500 mr-3 shrink-0" />
                  <span className="text-gray-700">Period-based reports: weekly, monthly, or custom range</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-green-500 mr-3 shrink-0" />
                  <span className="text-gray-700">Breakdown by category, merchant, and transaction type</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-green-500 mr-3 shrink-0" />
                  <span className="text-gray-700">Income vs expense overview with net balance</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-green-500 mr-3 shrink-0" />
                  <span className="text-gray-700">Export-ready summaries for your own records</span>
                </li>
              </ul>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-teal-500/10 to-cyan-500/10 rounded-3xl blur-2xl" />
              <Card className="relative p-8 border-gray-200 bg-white shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                {/* Report header */}
                <div className="flex items-center justify-between pb-4 mb-5 border-b border-gray-100">
                  <div>
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-0.5">Monthly Summary</p>
                    <p className="text-lg font-bold text-gray-900">November 2025</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                    <TrendingUp className="h-3 w-3" />
                    Saved $2,360
                  </span>
                </div>
                {/* KPI row */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-4 bg-green-50 border border-green-100 rounded-xl">
                    <p className="text-xs text-gray-500 mb-1">Income</p>
                    <p className="text-2xl font-bold text-gray-900">$6,200</p>
                    <p className="text-xs text-green-600 mt-0.5">+3.2% vs Oct</p>
                  </div>
                  <div className="p-4 bg-red-50 border border-red-100 rounded-xl">
                    <p className="text-xs text-gray-500 mb-1">Expenses</p>
                    <p className="text-2xl font-bold text-gray-900">$3,840</p>
                    <p className="text-xs text-red-500 mt-0.5">−8.1% vs Oct</p>
                  </div>
                </div>
                {/* Top spending */}
                <div>
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-3">Top Spending</p>
                  <div className="space-y-3">
                    {[
                      { label: 'Food & Dining', amount: '$680', pct: 68 },
                      { label: 'Transport', amount: '$340', pct: 34 },
                      { label: 'Shopping', amount: '$320', pct: 32 },
                    ].map(({ label, amount, pct }) => (
                      <div key={label}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">{label}</span>
                          <span className="font-semibold text-gray-900">{amount}</span>
                        </div>
                        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-[#635BFF] rounded-full transition-all" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" data-track-section="testimonials" className="py-28 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-purple-100 text-[#635BFF] rounded-full text-sm font-semibold mb-6">
              WHAT PEOPLE ARE SAYING
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              Loved by people who take their finances seriously
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real feedback from people using TrackrAI to stay on top of their money
            </p>
          </div>

          {/* Testimonials - Infinite Scroll */}
          <div className="relative overflow-x-hidden py-4">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />

            <div className="flex gap-5 animate-scroll">
              {/* First set */}
              {testimonials.map((testimonial) => (
                <Card key={testimonial.id} className="flex-shrink-0 w-80 p-6 bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <p className="text-[#635BFF] text-3xl font-serif leading-none mb-3 select-none">&ldquo;</p>
                  <p className="text-gray-700 text-sm leading-relaxed mb-5">
                    {testimonial.quote}
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                    <div className="relative w-9 h-9 rounded-full overflow-hidden ring-2 ring-[#635BFF]/20 flex-shrink-0">
                      <Image
                        src={testimonial.photoUrl}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <p className="font-semibold text-gray-900 text-sm">{testimonial.name}</p>
                  </div>
                </Card>
              ))}

              {/* Duplicate set for seamless loop */}
              {testimonials.map((testimonial) => (
                <Card key={`duplicate-${testimonial.id}`} className="flex-shrink-0 w-80 p-6 bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <p className="text-[#635BFF] text-3xl font-serif leading-none mb-3 select-none">&ldquo;</p>
                  <p className="text-gray-700 text-sm leading-relaxed mb-5">
                    {testimonial.quote}
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                    <div className="relative w-9 h-9 rounded-full overflow-hidden ring-2 ring-[#635BFF]/20 flex-shrink-0">
                      <Image
                        src={testimonial.photoUrl}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <p className="font-semibold text-gray-900 text-sm">{testimonial.name}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mobile App Section 2 — Web and Mobile in Sync */}
      <section id="mobile_app_2" data-track-section="mobile_app_2" className="py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center rounded-full border border-[#635BFF]/20 bg-[#635BFF]/5 px-4 py-1.5 text-sm text-[#635BFF] font-semibold mb-6">
              <RefreshCw className="mr-2 h-4 w-4" />
              Cross-Platform Sync
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
              Your data, always in sync
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Add a transaction on your phone and see the update on your web dashboard right away. Supabase keeps your data in sync across all devices. Your reports, categories, and merchants stay current everywhere.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center max-w-4xl mx-auto">
            {/* Web Dashboard */}
            <div className="text-center">
              <div className="relative rounded-2xl border border-gray-200 bg-gray-50 p-4 shadow-lg mb-4">
                <div className="flex items-center gap-1.5 mb-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                  <div className="flex-1 bg-white border border-gray-200 rounded px-2 py-0.5 text-xs text-gray-400 ml-2">
                    app.trackrai.io
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-[#635BFF]/20 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-full" />
                  <div className="h-3 bg-gray-200 rounded w-5/6" />
                  <div className="h-16 bg-gradient-to-t from-[#635BFF]/10 to-transparent rounded-lg flex items-end justify-around px-2 pb-1">
                    {[50, 80, 60, 90, 70].map((h, i) => (
                      <div key={i} className="w-3 bg-[#635BFF]/40 rounded-t" style={{ height: `${h}%` }} />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-sm font-semibold text-gray-800">Web Dashboard</p>
              <p className="text-xs text-gray-500 mt-1">Full analytics, reports, and CSV import</p>
            </div>

            {/* Sync Arrow */}
            <div className="flex flex-col items-center justify-center py-4">
              <div className="w-12 h-12 rounded-full bg-[#635BFF]/10 flex items-center justify-center mb-3">
                <ArrowRightLeft className="h-6 w-6 text-[#635BFF]" />
              </div>
              <p className="text-xs text-gray-500 text-center font-medium">Real-time sync<br />via Supabase</p>
            </div>

            {/* Mobile App */}
            <div className="text-center">
              <div className="relative inline-block mb-4">
                <div className="w-28 bg-gray-900 rounded-2xl p-1.5 shadow-lg mx-auto">
                  <div className="bg-gray-800 rounded-xl overflow-hidden">
                    <div className="bg-gray-900 h-4 flex items-center justify-center">
                      <div className="w-10 h-2 bg-gray-800 rounded-full" />
                    </div>
                    <div className="bg-white p-2 min-h-[100px]">
                      <p className="text-[8px] text-gray-400">Balance</p>
                      <p className="text-sm font-bold text-gray-900">$24,532</p>
                      <div className="space-y-1 mt-2">
                        <div className="h-1.5 bg-[#635BFF]/20 rounded w-full" />
                        <div className="h-1.5 bg-gray-200 rounded w-4/5" />
                        <div className="h-1.5 bg-gray-200 rounded w-2/3" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-sm font-semibold text-gray-800">Mobile App</p>
              <p className="text-xs text-gray-500 mt-1">Quick transactions, on-the-go overview</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <AppStoreBadges />
            <p className="text-xs text-gray-400 mt-3">Mobile apps coming soon. Web app available now.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="final_cta" data-track-section="final_cta" className="py-28 bg-gradient-to-br from-gray-900 via-gray-900 to-[#635BFF] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6">
            Take control of your finances
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-4 max-w-3xl mx-auto font-medium">
            Stop guessing where your money goes. <span className="text-[#00D4FF]">Start tracking today.</span>
          </p>
          <p className="text-base sm:text-lg text-white/70 mb-12 max-w-2xl mx-auto">
            TrackrAI helps you spot forgotten subscriptions, track merchant spending, review clear monthly summaries, and make better financial decisions. All in one clean app.
          </p>
          <div className="flex justify-center mb-8">
            <SignupCTA source="cta_section">
              <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 text-base sm:text-lg px-12 py-8 rounded-full shadow-2xl font-bold hover:scale-105 transition-all">
                Get Started Free
              </Button>
            </SignupCTA>
          </div>

          <p className="text-sm text-white/80 font-medium">
            Free to use · No credit card required · No bank connection needed
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" data-track-section="faq" className="py-28 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-semibold mb-6">
              FAQ
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              Common questions
            </h2>
            <p className="text-lg text-gray-500">
              Everything you need to know before getting started
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: 'What does TrackrAI do?',
                a: 'TrackrAI tracks your expenses, subscriptions, and recurring payments in one place. You import transactions from your bank via CSV or add them manually, and the AI categorises each one. See your spending by category, merchant, and time period in one dashboard.',
              },
              {
                q: 'How does the AI categorisation work?',
                a: 'When you import transactions, the AI reads each transaction name and assigns a category from your 16 default categories. The assignment happens automatically during import. You review the results and edit any category before saving.',
              },
              {
                q: 'Is my financial data secure?',
                a: 'Supabase stores your data with Row Level Security policies that isolate each user\'s records from every other account. Only your account accesses your transactions, reports, and settings. TrackrAI never requests or stores your bank credentials.',
              },
              {
                q: 'Do I need to connect my bank account?',
                a: 'TrackrAI does not connect to your bank. You export a CSV from your bank and import it directly. Your bank credentials never leave your computer.',
              },
              {
                q: 'Is there a mobile app?',
                a: 'Yes, TrackrAI has a mobile app. It shares the same Supabase database as the web dashboard, so your data stays in sync across both. Add transactions from your phone and see them on the web right away.',
              },
              {
                q: 'How much does TrackrAI cost?',
                a: 'TrackrAI is free right now. You do not need a credit card to sign up. We will announce any pricing changes before they happen.',
              },
              {
                q: 'What file formats does the CSV import support?',
                a: 'TrackrAI accepts standard CSV files, the export format most banks use for account statements. Download your statement from your bank and import the CSV directly. The AI assigns categories to each transaction row during the import.',
              },
              {
                q: 'Is TrackrAI built for personal or business use?',
                a: 'TrackrAI focuses on personal finance. The features cover individual expense tracking, subscriptions, and spending habits. Freelancers also use it to separate personal and business expenses.',
              },
            ].map((faq) => (
              <div key={faq.q} className="group rounded-2xl border border-gray-200 bg-white hover:border-[#635BFF]/30 hover:shadow-sm transition-all p-6 pl-7 relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#635BFF] to-[#635BFF]/30 opacity-0 group-hover:opacity-100 transition-opacity rounded-l-2xl" />
                <h3 className="text-base font-semibold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-500 mb-5 text-sm">Still have questions?</p>
            <a href="/help">
              <Button variant="outline" size="lg" className="rounded-full border-2 border-gray-300 hover:border-[#635BFF] hover:text-[#635BFF] transition-all">
                Visit Help Center
              </Button>
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

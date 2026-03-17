'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
  Search,
  HelpCircle,
  CreditCard,
  Repeat,
  PieChart,
  Settings,
  Shield,
  ChevronDown,
  ChevronUp,
  Mail,
  BookOpen,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Store,
  FileBarChart2,
} from 'lucide-react'
import { toast } from 'sonner'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface FAQItem {
  question: string
  answer: string
}

interface FAQCategory {
  title: string
  icon: React.ReactNode
  items: FAQItem[]
}

// ---------------------------------------------------------------------------
// FAQ data
// ---------------------------------------------------------------------------

const faqCategories: FAQCategory[] = [
  {
    title: 'Getting Started',
    icon: <BookOpen className="h-5 w-5" />,
    items: [
      {
        question: 'How do I create an account?',
        answer:
          'Click the "Get Started" button on the homepage and fill in your email, name, and password. You can also sign up using Google authentication for a faster setup.',
      },
      {
        question: 'Is TrackrAI free to use?',
        answer:
          'Yes. TrackrAI is free to get started — no credit card required. Create an account and begin tracking your finances right away.',
      },
      {
        question: 'What devices can I use TrackrAI on?',
        answer:
          'TrackrAI is a web application that works on any device with a modern browser, including desktop computers, tablets, and smartphones.',
      },
    ],
  },
  {
    title: 'Transactions',
    icon: <CreditCard className="h-5 w-5" />,
    items: [
      {
        question: 'How do I add a transaction?',
        answer:
          'Navigate to the Transactions page and click the "Add Transaction" button. Fill in the details including amount, category, date, and type (income or expense).',
      },
      {
        question: 'Can I edit or delete transactions?',
        answer:
          'Yes, you can edit or delete any transaction by clicking on the action buttons in the transactions table. Changes are saved immediately.',
      },
      {
        question: 'What account types are supported?',
        answer:
          'TrackrAI supports Cash, Bank, and Credit Card account types. You can categorize each transaction by the account it belongs to.',
      },
    ],
  },
  {
    title: 'Recurring Transactions',
    icon: <Repeat className="h-5 w-5" />,
    items: [
      {
        question: 'What are recurring transactions?',
        answer:
          'Recurring transactions are regular payments or income that happen on a schedule, like rent, subscriptions, or salary. TrackrAI automatically predicts upcoming occurrences.',
      },
      {
        question: 'What frequencies are available?',
        answer:
          'We support Daily, Weekly, Bi-Weekly, Tri-Weekly, Monthly, Bi-Monthly, Quarterly, Semi-Annually, and Annually frequencies.',
      },
      {
        question: 'How do I set an end date for recurring transactions?',
        answer:
          'When creating or editing a recurring transaction, you can optionally set an end date. The transaction will stop generating predictions after this date.',
      },
    ],
  },
  {
    title: 'Categories',
    icon: <PieChart className="h-5 w-5" />,
    items: [
      {
        question: 'Can I create custom categories?',
        answer:
          'Yes, you can create, edit, and delete custom categories from the Categories page. Each category can have a custom name and color.',
      },
      {
        question: 'How do categories help with tracking?',
        answer:
          'Categories help you organize transactions and see spending patterns. The dashboard shows breakdowns by category so you can identify where your money goes.',
      },
    ],
  },
  {
    title: 'Merchants',
    icon: <Store className="h-5 w-5" />,
    items: [
      {
        question: 'What is a merchant in TrackrAI?',
        answer:
          'A merchant is a named entity you create in TrackrAI — like Amazon, Spotify, or your local grocery store. Once created, you can assign merchants to transactions to replace messy bank labels with clean, recognizable names.',
      },
      {
        question: 'How do I create and assign a merchant?',
        answer:
          'Navigate to the Merchants section in your dashboard and click "Add Merchant". Give it a name and save it. You can then assign it to any transaction from the transaction editor.',
      },
      {
        question: 'Can I see spending grouped by merchant?',
        answer:
          'Yes. Once merchants are assigned, your analytics and reports show spending grouped by merchant alongside category breakdowns — giving you a much clearer picture of where your money actually goes.',
      },
    ],
  },
  {
    title: 'Reports',
    icon: <FileBarChart2 className="h-5 w-5" />,
    items: [
      {
        question: 'What do TrackrAI reports include?',
        answer:
          'Reports provide a structured financial summary for a selected time period. They include total income, total expenses, net balance, a breakdown by category, top merchants, and recurring transaction summaries.',
      },
      {
        question: 'How do I generate a report?',
        answer:
          'Go to the Reports section in your dashboard, choose the time period you want (weekly, monthly, or a custom range), and TrackrAI will generate a clear summary for that period.',
      },
      {
        question: 'Can I export my reports?',
        answer:
          'Yes. Reports are designed to be export-ready. You can download a summary of your financial data for your own records or for use in external tools.',
      },
    ],
  },
  {
    title: 'Account & Settings',
    icon: <Settings className="h-5 w-5" />,
    items: [
      {
        question: 'How do I change my password?',
        answer:
          'Go to Settings and look for the password change option. You can also use the "Forgot Password" link on the sign-in page to reset your password via email.',
      },
      {
        question: 'Can I delete my account?',
        answer:
          'Yes, you can delete your account from the Settings page. This will permanently remove all your data. This action cannot be undone.',
      },
      {
        question: 'How do I export my data?',
        answer:
          'You can export your transactions data in CSV format from the Transactions page using the export functionality.',
      },
    ],
  },
  {
    title: 'Security & Privacy',
    icon: <Shield className="h-5 w-5" />,
    items: [
      {
        question: 'Is my financial data secure?',
        answer:
          'Yes, we use industry-standard encryption for all data transmission and storage. Your data is stored securely with row-level security ensuring only you can access it.',
      },
      {
        question: 'Do you have access to my bank accounts?',
        answer:
          'No, TrackrAI never requests or stores your bank login credentials. All financial data is manually entered by you.',
      },
      {
        question: 'Who can see my data?',
        answer:
          'Only you can see your financial data. We do not share your personal information with third parties except as described in our Privacy Policy.',
      },
    ],
  },
]

// ---------------------------------------------------------------------------
// FAQ Accordion component
// ---------------------------------------------------------------------------

function FAQAccordion({ category }: { category: FAQCategory }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <Card className="p-6 bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-6">
        <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-[#635BFF]/10 text-[#635BFF]">
          {category.icon}
        </div>
        <h3 className="text-lg font-semibold text-gray-900">{category.title}</h3>
      </div>
      <div className="space-y-3">
        {category.items.map((item, index) => (
          <div key={index} className="border-b border-gray-100 last:border-0 pb-3 last:pb-0">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="flex items-center justify-between w-full text-left py-2 group"
            >
              <span className="text-gray-700 font-medium pr-4 group-hover:text-gray-900">
                {item.question}
              </span>
              {openIndex === index ? (
                <ChevronUp className="h-4 w-4 text-[#635BFF] shrink-0" />
              ) : (
                <ChevronDown className="h-4 w-4 text-gray-400 group-hover:text-gray-600 shrink-0" />
              )}
            </button>
            {openIndex === index && (
              <p className="text-gray-600 text-sm pb-2 pr-8 mt-2">{item.answer}</p>
            )}
          </div>
        ))}
      </div>
    </Card>
  )
}


// ---------------------------------------------------------------------------
// Main Help page
// ---------------------------------------------------------------------------

const CONTACT_FORM_EMPTY = {
  name: '',
  email: '',
  subject: '',
  supportType: '',
  message: '',
}

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('')

  // Support form state
  const [contactForm, setContactForm] = useState(CONTACT_FORM_EMPTY)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [submitError, setSubmitError] = useState('')

  const filteredCategories = faqCategories
    .map((category) => ({
      ...category,
      items: category.items.filter(
        (item) =>
          item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.answer.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((category) => category.items.length > 0)

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitStatus('loading')
    setSubmitError('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'support',
          name: contactForm.name.trim(),
          email: contactForm.email.trim(),
          supportType: contactForm.supportType,
          subject: contactForm.subject.trim(),
          message: contactForm.message.trim(),
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setSubmitError(data.error ?? 'Something went wrong. Please try again.')
        setSubmitStatus('error')
        return
      }

      setSubmitStatus('success')
      setContactForm(CONTACT_FORM_EMPTY)
      toast.success('Message sent!', {
        description: "We'll get back to you within 24 hours.",
      })
    } catch {
      setSubmitError('Network error. Please check your connection and try again.')
      setSubmitStatus('error')
    }
  }

  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#635BFF] shadow-lg">
              <HelpCircle className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">TrackrAI Help Centre</h1>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Find answers to common questions about using TrackrAI.
          </p>

          {/* Search */}
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search for help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-6 text-lg border-gray-300 bg-white focus:border-[#635BFF] focus:ring-[#635BFF] shadow-sm"
            />
          </div>
        </div>
      </section>

      {/* FAQ Grid */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {searchQuery && filteredCategories.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                No results found for &ldquo;{searchQuery}&rdquo;
              </p>
              <p className="text-gray-500 mt-2">
                Try a different search term or browse the categories below.
              </p>
              <Button
                variant="outline"
                className="mt-4 border-gray-300 hover:bg-gray-100"
                onClick={() => setSearchQuery('')}
              >
                Clear search
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(searchQuery ? filteredCategories : faqCategories).map((category, index) => (
                <FAQAccordion key={index} category={category} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Still need help?</h2>
            <p className="text-lg text-gray-600">
              Send us a message and we&apos;ll get back to you within 24 hours.
            </p>
          </div>

          <Card className="p-8 border-gray-200 bg-white shadow-lg">
            {submitStatus === 'success' ? (
              <div className="flex flex-col items-center justify-center py-10 gap-4 text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-green-100">
                  <CheckCircle2 className="h-7 w-7 text-green-600" />
                </div>
                <div>
                  <p className="text-xl font-semibold text-gray-900 mb-1">Message sent!</p>
                  <p className="text-gray-500">
                    We&apos;ll get back to you within 24 hours.
                  </p>
                </div>
                <button
                  onClick={() => setSubmitStatus('idle')}
                  className="text-sm text-[#635BFF] hover:text-[#5851EA] font-medium mt-2 transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-gray-900">
                      Name
                    </label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Your name"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      required
                      maxLength={100}
                      disabled={submitStatus === 'loading'}
                      className="border-gray-300 bg-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-900">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      required
                      disabled={submitStatus === 'loading'}
                      className="border-gray-300 bg-white"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="supportType" className="text-sm font-medium text-gray-900">
                    Support Type
                  </label>
                  <select
                    id="supportType"
                    value={contactForm.supportType}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, supportType: e.target.value })
                    }
                    required
                    disabled={submitStatus === 'loading'}
                    className="flex h-9 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 transition-colors focus:border-ring focus:ring-3 focus:ring-ring/50 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="" disabled>
                      Select a support type
                    </option>
                    <option value="general">General Inquiry</option>
                    <option value="technical">Technical Issue</option>
                    <option value="account">Account &amp; Billing</option>
                    <option value="feature">Feature Request</option>
                    <option value="bug">Bug Report</option>
                    <option value="security">Security Concern</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium text-gray-900">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    type="text"
                    placeholder="Brief description of your issue"
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                    required
                    maxLength={200}
                    disabled={submitStatus === 'loading'}
                    className="border-gray-300 bg-white"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-gray-900">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Please describe your issue or question in detail..."
                    value={contactForm.message}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, message: e.target.value })
                    }
                    required
                    rows={6}
                    maxLength={5000}
                    disabled={submitStatus === 'loading'}
                    className="border-gray-300 bg-white resize-none"
                  />
                  <p className="text-xs text-gray-400 text-right">
                    {contactForm.message.length}/5000
                  </p>
                </div>

                {(submitError || submitStatus === 'error') && (
                  <div className="flex items-start gap-2 rounded-lg bg-red-50 border border-red-200 px-4 py-3">
                    <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
                    <p className="text-sm text-red-700">
                      {submitError || 'Something went wrong. Please try again.'}
                    </p>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={submitStatus === 'loading'}
                  className="w-full bg-[#635BFF] hover:bg-[#5851EA] text-white shadow-lg disabled:opacity-60"
                >
                  {submitStatus === 'loading' ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            )}
          </Card>
        </div>
      </section>

      {/* Direct contact section */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Prefer email?
          </h2>
          <div className="max-w-md mx-auto">
            <Card className="p-8 bg-white border-gray-200 hover:shadow-lg transition-shadow text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#635BFF]/10 text-[#635BFF] mb-5">
                <Mail className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Email Support</h3>
              <p className="text-gray-600 text-sm mb-6">
                Send us an email and we&apos;ll get back to you within 24 hours.
              </p>
              <a
                href="mailto:support@trackrai.io"
                className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#635BFF] hover:bg-[#5851EA] text-white text-sm font-semibold transition-colors shadow-sm"
              >
                <Mail className="h-4 w-4" />
                support@trackrai.io
              </a>
            </Card>
          </div>
        </div>
      </section>
    </>
  )
}

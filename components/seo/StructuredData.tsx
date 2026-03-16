const faqItems = [
  {
    question: 'What does TrackrAI do?',
    answer:
      'TrackrAI helps you track your expenses, subscriptions, and recurring payments. Import your bank statement as a CSV and the AI categorises each transaction. You get a clear view of where your money goes each month.',
  },
  {
    question: 'How does the AI categorisation work?',
    answer:
      'TrackrAI reads each transaction name and assigns a category from your 16 default categories. The AI matches the merchant name to the most relevant category. You review the assignments and adjust any at any time.',
  },
  {
    question: 'Is my financial data secure?',
    answer:
      'TrackrAI uses Supabase with Row Level Security policies. Your data is completely isolated from other user accounts. No one else has access to your transactions or reports.',
  },
  {
    question: 'Do I need to connect my bank account?',
    answer:
      'No bank connection is needed. You export a CSV from your bank and import the file into TrackrAI. This approach keeps your banking credentials private and offline.',
  },
  {
    question: 'Is there a mobile app?',
    answer:
      'Yes. TrackrAI has a mobile app for iOS and Android. The app shares the same Supabase database as your web dashboard, so your data stays in sync across all devices.',
  },
  {
    question: 'How much does TrackrAI cost?',
    answer:
      'TrackrAI is free to use. You create an account and start importing transactions at no cost. Premium features are available for users who need advanced reporting and analytics.',
  },
  {
    question: 'What file formats does the CSV import support?',
    answer:
      'TrackrAI supports the standard CSV format exported from any bank. The AI categorises each transaction automatically during the import. You do not need to format or clean the file before importing.',
  },
  {
    question: 'Is TrackrAI built for personal or business use?',
    answer:
      'TrackrAI is designed for personal finance management. The tools focus on personal spending categories, subscriptions, and monthly expense tracking. Business accounting is outside the current scope.',
  },
]

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'TrackrAI',
  url: 'https://trackrai.io',
  description:
    'AI-Powered Personal Finance Tracker. Track expenses, manage recurring payments, and generate financial reports.',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web, iOS, Android',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
}

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'TrackrAI',
  url: 'https://trackrai.io',
  logo: 'https://trackrai.io/logo.png',
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'support@trackrai.io',
    contactType: 'customer support',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
}

const mobileAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'MobileApplication',
  name: 'TrackrAI',
  description:
    'Track your expenses and manage your finances on the go with TrackrAI.',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'iOS, Android',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
}

export function StructuredData() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(mobileAppSchema) }}
      />
    </>
  )
}

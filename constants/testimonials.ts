export interface Testimonial {
  id: number
  name: string
  role: string
  quote: string
  photoUrl: string
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'Product Manager',
    quote:
      'TrackrAI found $340/month in subscriptions I forgot about. The AI insights are useful, not vanity metrics.',
    photoUrl: 'https://api.dicebear.com/9.x/notionists/svg?seed=Sarah',
  },
  {
    id: 2,
    name: 'Marcus Johnson',
    role: 'Software Engineer',
    quote:
      'I switched from spreadsheets to TrackrAI and save hours every week. The recurring transaction tracking changed how I manage money.',
    photoUrl: 'https://api.dicebear.com/9.x/notionists/svg?seed=Marcus',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Freelance Designer',
    quote:
      'As a freelancer with irregular income, TrackrAI shows me exactly where every dollar goes. The category breakdowns are clear and actionable.',
    photoUrl: 'https://api.dicebear.com/9.x/notionists/svg?seed=Emily',
  },
  {
    id: 4,
    name: 'David Park',
    role: 'Startup Founder',
    quote:
      'Clean, fast, and private. I tried Mint, YNAB, and Copilot. TrackrAI is the only one that stuck. The UI is beautiful.',
    photoUrl: 'https://api.dicebear.com/9.x/notionists/svg?seed=David',
  },
  {
    id: 5,
    name: 'Priya Sharma',
    role: 'Data Analyst',
    quote:
      'The analytics dashboard is exactly what I needed. I cut my dining expenses by 30% in the first month from the insights alone.',
    photoUrl: 'https://api.dicebear.com/9.x/notionists/svg?seed=Priya',
  },
  {
    id: 6,
    name: 'James Wilson',
    role: 'Marketing Director',
    quote:
      'Finally, a finance app that respects my data. No bank connections required, 256-bit encryption, and a clean interface.',
    photoUrl: 'https://api.dicebear.com/9.x/notionists/svg?seed=James',
  },
]

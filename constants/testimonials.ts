export interface Testimonial {
  id: number
  name: string
  role: string
  location: string
  initials: string
  avatar: string
  quote: string
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah M.',
    role: 'Freelance Designer',
    location: 'Melbourne, AU',
    initials: 'SM',
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=SarahM',
    quote:
      'I imported three months of bank statements in under a minute. The category breakdown showed me I was spending twice what I thought on takeaway. One look at the food category changed how I approach my budget.',
  },
  {
    id: 2,
    name: 'James K.',
    role: 'Software Engineer',
    location: 'London, UK',
    initials: 'JK',
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=JamesK',
    quote:
      'Setting up my subscriptions in TrackrAI took about ten minutes. Now I see every upcoming payment before each one lands, so there are no surprises at the end of the month.',
  },
  {
    id: 3,
    name: 'Priya R.',
    role: 'Product Manager',
    location: 'Singapore',
    initials: 'PR',
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=PriyaR',
    quote:
      'I had about 200 transactions after importing my CSV. TrackrAI assigned categories to nearly all of them automatically. I made a few adjustments and was done in five minutes.',
  },
  {
    id: 4,
    name: 'Tom B.',
    role: 'Small Business Owner',
    location: 'Sydney, AU',
    initials: 'TB',
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=TomB',
    quote:
      'I assigned all my regular vendors in TrackrAI. Now I see exactly how much I spend with each one across every month. My Amazon spending turned out far higher than I expected.',
  },
  {
    id: 5,
    name: 'Aisha N.',
    role: 'Marketing Coordinator',
    location: 'Dubai, UAE',
    initials: 'AN',
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=AishaN',
    quote:
      'I generate a monthly report every time my pay cycle ends. Comparing November to October showed my food spending dropped 18 percent after I started meal planning. The data keeps me accountable.',
  },
  {
    id: 6,
    name: 'Daniel W.',
    role: 'Graduate Student',
    location: 'Toronto, CA',
    initials: 'DW',
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=DanielW',
    quote:
      'I add transactions from my phone right after a purchase. When I check the web dashboard later, everything is already synced. I never lose track of spending across both devices.',
  },
]

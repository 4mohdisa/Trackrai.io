import { Shield, KeyRound, UserX, Lock } from 'lucide-react'

const TRUST_POINTS = [
  {
    Icon: Shield,
    title: 'Row Level Security',
    description:
      'Supabase RLS policies ensure only your account accesses your data rows. No other user reads your transactions or reports.',
  },
  {
    Icon: UserX,
    title: 'No bank credentials stored',
    description:
      'TrackrAI never asks for bank login details. You import CSV files from your bank instead.',
  },
  {
    Icon: KeyRound,
    title: 'Data isolated per account',
    description:
      'Your data sits in a separate database space from every other user. No cross-account access is possible.',
  },
  {
    Icon: Lock,
    title: 'HTTPS everywhere',
    description:
      'All data travels between your browser and TrackrAI over HTTPS. Your connection is always encrypted.',
  },
]

export function SecurityTrustSection() {
  return (
    <section id="security-trust" className="py-24 md:py-32 bg-gray-900 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-brand-primary/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-brand-secondary/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header — strictly centred vertical stack */}
        <div className="flex flex-col items-center gap-5 text-center mb-16">
          {/* Shield icon */}
          <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-primary/20 border border-brand-primary/30">
            <Shield className="h-8 w-8 text-brand-primary" />
          </div>

          {/* Pill label */}
          <div className="section-label-dark">
            Security
          </div>

          {/* Headline */}
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            Your data stays private
          </h2>

          {/* Subheadline */}
          <p className="text-xl text-white/60 max-w-2xl">
            TrackrAI runs on Supabase with Row Level Security enabled. Only your account accesses your data.
          </p>
        </div>

        {/* Trust points grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12">
          {TRUST_POINTS.map(({ Icon, title, description }) => (
            <div
              key={title}
              className="flex gap-5 rounded-xl border border-white/10 bg-white/5 p-6 hover:bg-white/8 transition-colors"
            >
              <div className="shrink-0 inline-flex items-center justify-center w-11 h-11 rounded-xl bg-brand-primary/20">
                <Icon className="h-5 w-5 text-brand-primary" />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1.5">{title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom reassurance */}
        <p className="text-center text-gray-500 text-sm">
          Your financial data stays on Supabase infrastructure. TrackrAI never sells or shares your data.
        </p>
      </div>
    </section>
  )
}

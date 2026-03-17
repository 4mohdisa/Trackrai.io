'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useInView } from '@/hooks/useInView'
import { Database, TrendingUp, DollarSign, CreditCard, Smartphone, Monitor, Globe } from 'lucide-react'
import { trackAppStoreClick } from '@/lib/analytics'
import { PhoneMockup } from '@/components/ui/phone-mockup'

const KPI_CYCLES = [
  { balance: '$24,532', income: '$8,420', expenses: '$3,280' },
  { balance: '$24,976', income: '$8,420', expenses: '$3,724' },
  { balance: '$25,340', income: '$9,060', expenses: '$3,280' },
  { balance: '$24,532', income: '$8,420', expenses: '$3,280' },
]

const FEATURES = [
  { Icon: Globe,      label: 'Real-time sync',      desc: 'Changes appear on all devices instantly' },
  { Icon: Database,   label: 'All your data',        desc: 'Transactions, reports, categories, merchants' },
  { Icon: Smartphone, label: 'Any device',           desc: 'Web browser, iPhone, Android' },
]

export function SyncSection() {
  const { ref, inView } = useInView(0.2)
  const [kpiIndex, setKpiIndex] = useState(0)
  const [flashField, setFlashField] = useState<'balance' | 'income' | 'expenses' | null>(null)
  const [phoneFlash, setPhoneFlash] = useState(false)
  const [enterDone, setEnterDone] = useState(false)

  // Mark entrance complete after 1s
  useEffect(() => {
    if (!inView) return
    const t = window.setTimeout(() => setEnterDone(true), 1000)
    return () => window.clearTimeout(t)
  }, [inView])

  // Cycle KPI values every 3s to simulate live sync
  useEffect(() => {
    if (!enterDone) return
    const fields: Array<'balance' | 'income' | 'expenses'> = ['balance', 'income', 'expenses']
    let cycle = 1
    const interval = setInterval(() => {
      const field = fields[cycle % 3]
      setFlashField(field)
      setKpiIndex(cycle % KPI_CYCLES.length)
      // Phone shows update 600ms later
      setTimeout(() => {
        setPhoneFlash(true)
        setTimeout(() => { setPhoneFlash(false); setFlashField(null) }, 1200)
      }, 600)
      cycle++
    }, 3000)
    return () => clearInterval(interval)
  }, [enterDone])

  const kpi = KPI_CYCLES[kpiIndex]

  return (
    <section
      id="mobile_app_2"
      data-track-section="mobile_app_2"
      className="py-28 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E1B4B 55%, #0F172A 100%)' }}
    >
      {/* Ambient glow blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#635BFF]/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-indigo-600/15 rounded-full blur-[100px] pointer-events-none" />

      <div ref={ref} className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center rounded-full border border-[#635BFF]/40 bg-[#635BFF]/15 px-4 py-1.5 text-sm text-[#635BFF] font-semibold mb-6">
            Cross-Platform Sync
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            Your data, always in sync
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Add a transaction on your phone and see the update on your web dashboard right away. Supabase keeps your data in sync across all devices.
          </p>
        </div>

        {/* Three-panel layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center mb-16">

          {/* LEFT — Web browser mockup */}
          <div
            className="flex justify-center md:justify-end"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateX(0)' : 'translateX(-40px)',
              transition: 'opacity 0.6s ease 0.1s, transform 0.6s cubic-bezier(0.34,1.1,0.64,1) 0.1s',
            }}
          >
            <div className="w-full max-w-[280px]">
              {/* Browser chrome */}
              <div className="bg-gray-800/80 rounded-t-xl border border-white/10 px-3 py-2 flex items-center gap-2 backdrop-blur-sm">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                </div>
                <div className="flex-1 bg-gray-900/60 rounded-md px-2 py-0.5 text-[10px] text-gray-400 truncate">
                  app.trackrai.io/dashboard
                </div>
              </div>
              {/* Browser content */}
              <div className="bg-white/5 border-x border-b border-white/10 rounded-b-xl p-4 backdrop-blur-sm">
                <p className="text-[10px] text-gray-400 font-medium mb-2 uppercase tracking-wide">Dashboard</p>
                {/* KPI cards */}
                <div className="grid grid-cols-1 gap-2">
                  {[
                    { label: 'Balance', value: kpi.balance, Icon: TrendingUp, flash: flashField === 'balance', cls: 'text-green-400' },
                    { label: 'Income',  value: kpi.income,  Icon: DollarSign,  flash: flashField === 'income',  cls: 'text-blue-400' },
                    { label: 'Expenses',value: kpi.expenses,Icon: CreditCard,  flash: flashField === 'expenses',cls: 'text-orange-400' },
                  ].map(({ label, value, Icon, flash, cls }) => (
                    <div
                      key={label}
                      className="flex items-center justify-between p-2 rounded-lg border transition-all duration-300"
                      style={{
                        background: flash ? 'rgba(99,91,255,0.25)' : 'rgba(255,255,255,0.05)',
                        borderColor: flash ? 'rgba(99,91,255,0.5)' : 'rgba(255,255,255,0.08)',
                      }}
                    >
                      <span className="text-[10px] text-gray-400">{label}</span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-white tabular-nums">{value}</span>
                        <Icon className={`h-3 w-3 ${cls}`} />
                      </div>
                    </div>
                  ))}
                </div>
                {/* Mini bar chart */}
                <div className="mt-3 flex items-end gap-1 h-10">
                  {[55, 80, 40, 90, 65, 75, 60].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t"
                      style={{
                        backgroundColor: 'rgba(99,91,255,0.6)',
                        height: `${h}%`,
                        transform: inView ? 'scaleY(1)' : 'scaleY(0)',
                        transformOrigin: 'bottom',
                        transition: `transform 0.5s ease ${i * 60 + 300}ms`,
                      }}
                    />
                  ))}
                </div>
              </div>
              <p className="text-center text-[10px] text-gray-500 mt-2 flex items-center justify-center gap-1">
                <Monitor className="h-3 w-3" />
                Web Dashboard
              </p>
            </div>
          </div>

          {/* MIDDLE — Sync animation */}
          <div
            className="flex flex-col items-center justify-center gap-4"
            style={{
              opacity: inView ? 1 : 0,
              transition: 'opacity 0.6s ease 0.4s',
            }}
          >
            {/* Particle track right */}
            <div className="relative w-full h-8 flex items-center">
              <div className="absolute inset-y-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#635BFF]/40 to-transparent" />
              {enterDone && [0, 0.8, 1.6].map((delay, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-[#635BFF] particle-right"
                  style={{ animationDelay: `${delay}s`, top: '50%', transform: 'translateY(-50%)' }}
                />
              ))}
              <span className="ml-auto text-[9px] text-[#635BFF]/80 font-medium pr-1">→</span>
            </div>

            {/* Center database icon */}
            <div className="relative flex flex-col items-center">
              <div className="w-14 h-14 rounded-2xl bg-[#635BFF]/20 border border-[#635BFF]/40 flex items-center justify-center backdrop-blur-sm shadow-lg shadow-[#635BFF]/20">
                <Database className="h-7 w-7 text-[#635BFF]" />
              </div>
              <p className="text-[10px] text-[#635BFF]/80 font-semibold mt-1.5 text-center leading-tight">
                Supabase<br />Real-time
              </p>
            </div>

            {/* Particle track left */}
            <div className="relative w-full h-8 flex items-center">
              <div className="absolute inset-y-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#635BFF]/40 to-transparent" />
              {enterDone && [0.4, 1.2, 2.0].map((delay, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-indigo-400 particle-left"
                  style={{ animationDelay: `${delay}s`, top: '50%', transform: 'translateY(-50%)' }}
                />
              ))}
              <span className="text-[9px] text-[#635BFF]/80 font-medium pl-1">←</span>
            </div>
          </div>

          {/* RIGHT — Phone mockup — taller, Dynamic Island, slightly rotated */}
          <div
            className="flex justify-center md:justify-start"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateX(0)' : 'translateX(40px)',
              transition: 'opacity 0.6s ease 0.2s, transform 0.6s cubic-bezier(0.34,1.1,0.64,1) 0.2s',
            }}
          >
            <div>
              <PhoneMockup width={200} tilt className="shadow-2xl">
                {/* Screen content — pt clears Dynamic Island */}
                <div className="bg-white pt-14 px-3 pb-4">
                  {/* Balance */}
                  <p className="text-[9px] text-gray-500 mb-0.5">Your Balance</p>
                  <p
                    className="text-xl font-extrabold text-gray-900 tabular-nums transition-all duration-300"
                    style={{
                      color: phoneFlash ? '#635BFF' : '#111827',
                      transform: phoneFlash ? 'scale(1.03)' : 'scale(1)',
                    }}
                  >
                    {kpi.balance}
                  </p>
                  {phoneFlash && (
                    <p className="text-[8px] text-[#635BFF] font-semibold mt-0.5 animate-fade-in">Synced ✓</p>
                  )}
                  {/* Income/Expenses */}
                  <div className="grid grid-cols-2 gap-1.5 mt-3">
                    <div className="bg-green-50 border border-green-100 rounded-xl p-2">
                      <p className="text-[8px] text-gray-500">Income</p>
                      <p className="text-xs font-bold text-gray-900">{kpi.income}</p>
                    </div>
                    <div className="bg-red-50 border border-red-100 rounded-xl p-2">
                      <p className="text-[8px] text-gray-500">Expenses</p>
                      <p className="text-xs font-bold text-gray-900">{kpi.expenses}</p>
                    </div>
                  </div>
                  {/* Recent transactions */}
                  <p className="text-[9px] font-semibold text-gray-700 mt-3 mb-1.5">Recent</p>
                  <div className="space-y-1.5">
                    {[
                      { name: 'Netflix',  amount: '-$15.99', cls: 'bg-red-100 text-red-600' },
                      { name: 'Salary',   amount: '+$4,200', cls: 'bg-green-100 text-green-600' },
                      { name: 'Groceries',amount: '-$84.30', cls: 'bg-orange-100 text-orange-600' },
                    ].map((tx) => (
                      <div key={tx.name} className="flex justify-between items-center px-2 py-1.5 bg-gray-50 rounded-lg">
                        <span className="text-[9px] text-gray-700 font-medium">{tx.name}</span>
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${tx.cls}`}>{tx.amount}</span>
                      </div>
                    ))}
                  </div>
                  {/* Mini bar chart */}
                  <div className="mt-3 flex items-end gap-0.5 h-10">
                    {[55, 80, 40, 90, 65, 75, 60].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-t"
                        style={{
                          backgroundColor: 'rgba(99,91,255,0.6)',
                          height: `${h}%`,
                          transform: inView ? 'scaleY(1)' : 'scaleY(0)',
                          transformOrigin: 'bottom',
                          transition: `transform 0.5s ease ${i * 60 + 300}ms`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </PhoneMockup>
              <p className="text-center text-[10px] text-gray-500 mt-2 flex items-center justify-center gap-1">
                <Smartphone className="h-3 w-3" />
                Mobile App
              </p>
            </div>
          </div>
        </div>

        {/* Feature highlights */}
        <div
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.6s ease 0.7s, transform 0.6s ease 0.7s',
          }}
        >
          {FEATURES.map(({ Icon, label, desc }, i) => (
            <div
              key={label}
              className="flex items-center gap-3 px-5 py-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm"
              style={{
                opacity: inView ? 1 : 0,
                transition: `opacity 0.5s ease ${i * 120 + 700}ms`,
              }}
            >
              <div className="w-9 h-9 rounded-xl bg-[#635BFF]/20 flex items-center justify-center shrink-0">
                <Icon className="h-4 w-4 text-[#635BFF]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{label}</p>
                <p className="text-[11px] text-white/50">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Badges row */}
        <div
          className="flex flex-wrap justify-center items-center gap-4"
          style={{
            opacity: inView ? 1 : 0,
            transition: 'opacity 0.6s ease 1s',
          }}
        >
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); trackAppStoreClick('app_store') }}
            aria-label="Download on the App Store"
            className="opacity-90 hover:opacity-100 transition-opacity"
          >
            <Image src="/images/app-store-badge.svg" alt="Download on the App Store" width={140} height={44} />
          </a>
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); trackAppStoreClick('google_play') }}
            aria-label="Get it on Google Play"
            className="opacity-90 hover:opacity-100 transition-opacity"
          >
            <Image src="/images/google-play-badge.svg" alt="Get it on Google Play" width={140} height={44} />
          </a>
          <Link
            href="https://app.trackrai.io"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-sm font-semibold text-white hover:bg-white/15 transition-colors"
          >
            <Monitor className="h-4 w-4" />
            Web App Available Now
          </Link>
        </div>
        <p className="text-center text-xs text-gray-500 mt-3">Mobile apps coming soon. Web app available now.</p>

      </div>
    </section>
  )
}

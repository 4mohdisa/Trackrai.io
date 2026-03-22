'use client'

import { useState, useEffect, useRef } from 'react'
import { useInView } from '@/hooks/useInView'
import { CheckCircle2, Repeat } from 'lucide-react'
import { PhoneMockup } from '@/components/ui/phone-mockup'

// 5 screens, 2.5s each = 12.5s loop
const SCREENS = ['home', 'add', 'chart', 'categories', 'recurring'] as const
type Screen = typeof SCREENS[number]

const SCREEN_DURATION = 2500

const TRANSACTIONS = [
  { name: 'Netflix',   amount: '-$15.99', cls: 'bg-red-100 text-red-600' },
  { name: 'Salary',    amount: '+$4,200', cls: 'bg-green-100 text-green-600' },
  { name: 'Groceries', amount: '-$84.30', cls: 'bg-orange-100 text-orange-600' },
]

const CHART_CATEGORIES = [
  { label: 'Food & Dining', pct: 34, color: '#295EFF' },
  { label: 'Shopping',      pct: 23, color: '#f97316' },
  { label: 'Transport',     pct: 19, color: '#3b82f6' },
  { label: 'Utilities',     pct: 14, color: '#22c55e' },
  { label: 'Other',         pct: 10, color: '#9ca3af' },
]

const CATEGORIES_BAR = [
  { label: 'Food & Dining', amount: '$680', pct: 45, color: '#295EFF' },
  { label: 'Transport',     amount: '$340', pct: 22, color: '#3b82f6' },
  { label: 'Shopping',      amount: '$450', pct: 30, color: '#f97316' },
  { label: 'Entertainment', amount: '$220', pct: 15, color: '#22c55e' },
]

const RECURRING_ITEMS = [
  { name: 'Netflix',    amount: '$15.99',  period: 'Monthly' },
  { name: 'Rent',       amount: '$1,200',  period: 'Monthly' },
  { name: 'Gym',        amount: '$49.99',  period: 'Monthly' },
]

function TypewriterText({ text, active }: { text: string; active: boolean }) {
  const [displayed, setDisplayed] = useState('')

  useEffect(() => {
    if (!active) { setDisplayed(''); return }
    let i = 0
    const interval = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))
      if (i >= text.length) clearInterval(interval)
    }, 80)
    return () => clearInterval(interval)
  }, [active, text])

  return (
    <span className="tabular-nums">
      {displayed}
      <span className="inline-block w-0.5 h-4 bg-brand-primary ml-0.5 animate-pulse" />
    </span>
  )
}

function BottomNav({ active }: { active: number }) {
  const tabs = ['Home', 'Txns', 'Charts', 'Reports']
  return (
    <div className="absolute bottom-4 left-4 right-4 flex justify-around pt-3 border-t border-gray-100">
      {tabs.map((tab, i) => (
        <div key={tab} className="flex flex-col items-center gap-0.5">
          <div className={`w-5 h-5 rounded-lg ${i === active ? 'bg-brand-primary' : 'bg-gray-200'}`} />
          <span className={`text-[9px] font-medium ${i === active ? 'text-brand-primary' : 'text-gray-400'}`}>{tab}</span>
        </div>
      ))}
    </div>
  )
}

export function AnimatedPhone() {
  const [screenIdx, setScreenIdx] = useState(0)
  const [saved, setSaved] = useState(false)
  const { ref, inView } = useInView(0.3)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const timerRef = useRef<any>(null)

  const screen = SCREENS[screenIdx]

  // Cycle screens every 2.5s
  useEffect(() => {
    if (!inView) return
    timerRef.current = window.setTimeout(() => {
      setScreenIdx(prev => {
        const next = (prev + 1) % SCREENS.length
        if (next === 0) setSaved(false)
        return next
      })
    }, SCREEN_DURATION)
    return () => { if (timerRef.current) window.clearTimeout(timerRef.current) }
  }, [screenIdx, inView])

  // Save checkmark 1.8s into the "add" screen
  useEffect(() => {
    if (screen !== 'add') { setSaved(false); return }
    const t = window.setTimeout(() => setSaved(true), 1800)
    return () => window.clearTimeout(t)
  }, [screen])

  const slideStyle = (s: Screen) => {
    const cur = SCREENS.indexOf(screen)
    const tgt = SCREENS.indexOf(s)
    return {
      transform: cur === tgt ? 'translateX(0)' : cur > tgt ? 'translateX(-100%)' : 'translateX(100%)',
      opacity: cur === tgt ? 1 : 0,
      transition: 'transform 0.45s cubic-bezier(0.4,0,0.2,1), opacity 0.45s ease',
      pointerEvents: cur === tgt ? 'auto' as const : 'none' as const,
    }
  }

  return (
    <div ref={ref} className="flex justify-center lg:justify-end">
      <div className="relative scale-[0.82] md:scale-100 origin-top">
        <div className="absolute -inset-6 bg-gradient-to-r from-brand-primary/15 to-brand-secondary/15 rounded-full blur-3xl" />
        <div className="relative">
          <PhoneMockup width={288} className="animate-float">
            {/* Screen height: 540px keeps a tall phone without being too imposing on mobile */}
            <div className="overflow-hidden relative" style={{ height: 540 }}>

              {/* ── HOME ── */}
              <div className="absolute inset-0 bg-white px-4 pb-4 pt-14" style={slideStyle('home')}>
                <div className="mb-4">
                  <p className="text-xs text-gray-500">Good morning</p>
                  <p className="text-sm font-bold text-gray-900">Your Balance</p>
                  <p className="text-4xl font-extrabold text-gray-900 mt-1">$24,532</p>
                  <p className="text-xs text-green-600 font-medium mt-1">+$340 this week</p>
                </div>
                <div className="grid grid-cols-2 gap-2.5 mb-4">
                  <div className="bg-green-50 border border-green-100 rounded-2xl p-3">
                    <p className="text-xs text-gray-500 mb-1">Income</p>
                    <p className="text-base font-bold text-gray-900">$8,420</p>
                  </div>
                  <div className="bg-red-50 border border-red-100 rounded-2xl p-3">
                    <p className="text-xs text-gray-500 mb-1">Expenses</p>
                    <p className="text-base font-bold text-gray-900">$3,280</p>
                  </div>
                </div>
                <p className="text-xs font-semibold text-gray-700 mb-2">Recent</p>
                <div className="space-y-2">
                  {TRANSACTIONS.map((tx, i) => (
                    <div
                      key={tx.name}
                      className="flex justify-between items-center p-2.5 bg-gray-50 rounded-xl"
                      style={{
                        opacity: screen === 'home' && inView ? 1 : 0,
                        transform: screen === 'home' && inView ? 'translateX(0)' : 'translateX(-10px)',
                        transition: `opacity 0.4s ease ${i * 80 + 200}ms, transform 0.4s ease ${i * 80 + 200}ms`,
                      }}
                    >
                      <span className="text-xs text-gray-700 font-medium">{tx.name}</span>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${tx.cls}`}>{tx.amount}</span>
                    </div>
                  ))}
                </div>
                <BottomNav active={0} />
              </div>

              {/* ── ADD TRANSACTION ── */}
              <div className="absolute inset-0 bg-white px-4 pb-4 pt-14" style={slideStyle('add')}>
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                    <span className="text-xs text-gray-500">←</span>
                  </div>
                  <p className="text-sm font-bold text-gray-900">Add Transaction</p>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1.5">Amount</p>
                    <div className="bg-gray-50 border border-brand-primary/30 rounded-xl p-3 text-lg font-bold text-gray-900">
                      {screen === 'add' ? <TypewriterText text="$84.30" active={screen === 'add'} /> : '$84.30'}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1.5">Description</p>
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm text-gray-700">Grocery Store</div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1.5">Category</p>
                    <div className="bg-brand-primary/10 border border-brand-primary/30 rounded-xl p-3 flex items-center justify-between">
                      <span className="text-sm font-semibold text-brand-primary">Food &amp; Dining</span>
                      <span className="text-xs bg-brand-primary text-white px-2 py-0.5 rounded-full">AI</span>
                    </div>
                  </div>
                  {saved ? (
                    <div className="flex items-center justify-center gap-2 p-4 bg-green-50 border border-green-200 rounded-xl">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <span className="text-sm font-semibold text-green-700">Transaction saved</span>
                    </div>
                  ) : (
                    <button className="w-full bg-brand-primary text-white text-sm font-semibold py-3 rounded-xl">
                      Save Transaction
                    </button>
                  )}
                </div>
              </div>

              {/* ── SPENDING CHART ── */}
              <div className="absolute inset-0 bg-white px-4 pb-4 pt-14" style={slideStyle('chart')}>
                <p className="text-sm font-bold text-gray-900 mb-1">This Month</p>
                <p className="text-xs text-gray-500 mb-4">Spending by category</p>
                <div className="space-y-3">
                  {CHART_CATEGORIES.map(({ label, pct, color }, i) => (
                    <div
                      key={label}
                      style={{
                        opacity: screen === 'chart' ? 1 : 0,
                        transform: screen === 'chart' ? 'translateX(0)' : 'translateX(12px)',
                        transition: `opacity 0.4s ease ${i * 80 + 100}ms, transform 0.4s ease ${i * 80 + 100}ms`,
                      }}
                    >
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-600">{label}</span>
                        <span className="font-semibold text-gray-900">{pct}%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            backgroundColor: color,
                            width: `${pct * 2.8}%`,
                            transform: screen === 'chart' ? 'scaleX(1)' : 'scaleX(0)',
                            transformOrigin: 'left',
                            transition: `transform 0.7s ease-out ${i * 80 + 300}ms`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div
                  className="mt-4 p-3 bg-gray-50 rounded-xl"
                  style={{ opacity: screen === 'chart' ? 1 : 0, transition: 'opacity 0.5s ease 600ms' }}
                >
                  <p className="text-xs text-gray-500">Total tracked</p>
                  <p className="text-xl font-bold text-gray-900">$1,990</p>
                </div>
                <BottomNav active={2} />
              </div>

              {/* ── CATEGORIES BAR VIEW ── */}
              <div className="absolute inset-0 bg-white px-4 pb-4 pt-14" style={slideStyle('categories')}>
                <p className="text-sm font-bold text-gray-900 mb-1">Spending by Category</p>
                <p className="text-xs text-gray-500 mb-5">March 2026</p>
                <div className="space-y-5">
                  {CATEGORIES_BAR.map(({ label, amount, pct, color }, i) => (
                    <div
                      key={label}
                      style={{
                        opacity: screen === 'categories' ? 1 : 0,
                        transform: screen === 'categories' ? 'translateY(0)' : 'translateY(8px)',
                        transition: `opacity 0.4s ease ${i * 90 + 150}ms, transform 0.4s ease ${i * 90 + 150}ms`,
                      }}
                    >
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-gray-700 font-medium">{label}</span>
                        <span className="font-bold text-gray-900">{amount}</span>
                      </div>
                      <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            backgroundColor: color,
                            width: `${pct * 2.1}%`,
                            transform: screen === 'categories' ? 'scaleX(1)' : 'scaleX(0)',
                            transformOrigin: 'left',
                            transition: `transform 0.7s ease-out ${i * 90 + 350}ms`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <BottomNav active={2} />
              </div>

              {/* ── RECURRING PAYMENTS ── */}
              <div className="absolute inset-0 bg-white px-4 pb-4 pt-14" style={slideStyle('recurring')}>
                <p className="text-sm font-bold text-gray-900 mb-1">Recurring Payments</p>
                <p className="text-xs text-gray-500 mb-4">Active subscriptions</p>
                <div className="space-y-3">
                  {RECURRING_ITEMS.map((item, i) => (
                    <div
                      key={item.name}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
                      style={{
                        opacity: screen === 'recurring' ? 1 : 0,
                        transform: screen === 'recurring' ? 'translateX(0)' : 'translateX(-12px)',
                        transition: `opacity 0.4s ease ${i * 100 + 150}ms, transform 0.4s ease ${i * 100 + 150}ms`,
                      }}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-brand-primary/10 flex items-center justify-center">
                          <Repeat className="h-4 w-4 text-brand-primary" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-gray-900">{item.name}</p>
                          <p className="text-[9px] text-gray-500">{item.period}</p>
                        </div>
                      </div>
                      <span className="text-sm font-bold text-gray-900">{item.amount}</span>
                    </div>
                  ))}
                </div>
                <div
                  className="mt-4 p-3 bg-brand-primary/5 border border-brand-primary/15 rounded-xl"
                  style={{
                    opacity: screen === 'recurring' ? 1 : 0,
                    transition: 'opacity 0.5s ease 550ms',
                  }}
                >
                  <p className="text-xs text-gray-500">Total this month</p>
                  <p className="text-xl font-bold text-brand-primary">$1,265.98</p>
                </div>
                <BottomNav active={1} />
              </div>

            </div>
          </PhoneMockup>
        </div>
      </div>
    </div>
  )
}

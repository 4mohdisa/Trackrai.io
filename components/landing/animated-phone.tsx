'use client'

import { useState, useEffect, useRef } from 'react'
import { useInView } from '@/hooks/useInView'
import { CheckCircle2 } from 'lucide-react'
import { PhoneMockup } from '@/components/ui/phone-mockup'

const SCREENS = ['home', 'add', 'chart'] as const
type Screen = typeof SCREENS[number]

const SCREEN_DURATIONS: Record<Screen, number> = {
  home:  4000,
  add:   3500,
  chart: 3000,
}

const TRANSACTIONS = [
  { name: 'Netflix',        amount: '-$15.99', cls: 'bg-red-100 text-red-600' },
  { name: 'Salary',         amount: '+$4,200', cls: 'bg-green-100 text-green-600' },
  { name: 'Groceries',      amount: '-$84.30', cls: 'bg-orange-100 text-orange-600' },
]

const CHART_CATEGORIES = [
  { label: 'Food & Dining', pct: 34, color: '#635BFF' },
  { label: 'Shopping',      pct: 23, color: '#f97316' },
  { label: 'Transport',     pct: 19, color: '#3b82f6' },
  { label: 'Utilities',     pct: 14, color: '#22c55e' },
  { label: 'Other',         pct: 10, color: '#9ca3af' },
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

  return <span className="tabular-nums">{displayed}<span className="inline-block w-0.5 h-4 bg-[#635BFF] ml-0.5 animate-pulse" /></span>
}

export function AnimatedPhone() {
  const [screen, setScreen] = useState<Screen>('home')
  const [saved, setSaved] = useState(false)
  const { ref, inView } = useInView(0.3)

  useEffect(() => {
    if (!inView) return
    const t = window.setTimeout(() => {
      setScreen(prev => {
        if (prev === 'home') return 'add'
        if (prev === 'add')  { setSaved(false); return 'chart' }
        setSaved(false)
        return 'home'
      })
    }, SCREEN_DURATIONS[screen])
    return () => window.clearTimeout(t)
  }, [screen, inView])

  // Show save checkmark 2s into the "add" screen
  useEffect(() => {
    if (screen !== 'add') return
    const t = window.setTimeout(() => setSaved(true), 2200)
    return () => window.clearTimeout(t)
  }, [screen])

  const slideStyle = (s: Screen) => ({
    transform: screen === s ? 'translateX(0)' : screen > s ? 'translateX(-100%)' : 'translateX(100%)',
    opacity: screen === s ? 1 : 0,
    transition: 'transform 0.45s cubic-bezier(0.4,0,0.2,1), opacity 0.45s ease',
    pointerEvents: screen === s ? 'auto' as const : 'none' as const,
  })

  return (
    <div ref={ref} className="flex justify-center lg:justify-end">
      <div className="relative">
        <div className="absolute -inset-6 bg-gradient-to-r from-[#635BFF]/15 to-indigo-400/15 rounded-full blur-3xl" />
        <div className="relative">
          <PhoneMockup width={288} className="animate-float">
            <div className="overflow-hidden relative" style={{ height: 520 }}>

              {/* ── SCREEN: Home ── */}
              <div className="absolute inset-0 bg-white px-4 pb-4 pt-14" style={slideStyle('home')}>
                {/* Balance header */}
                <div className="mb-5">
                  <p className="text-xs text-gray-500">Good morning</p>
                  <p className="text-sm font-bold text-gray-900">Your Balance</p>
                  <p className="text-4xl font-extrabold text-gray-900 mt-1">$24,532</p>
                  <p className="text-xs text-green-600 font-medium mt-1">+$340 this week</p>
                </div>
                {/* Quick stats */}
                <div className="grid grid-cols-2 gap-2.5 mb-5">
                  <div className="bg-green-50 border border-green-100 rounded-2xl p-3">
                    <p className="text-xs text-gray-500 mb-1">Income</p>
                    <p className="text-base font-bold text-gray-900">$8,420</p>
                  </div>
                  <div className="bg-red-50 border border-red-100 rounded-2xl p-3">
                    <p className="text-xs text-gray-500 mb-1">Expenses</p>
                    <p className="text-base font-bold text-gray-900">$3,280</p>
                  </div>
                </div>
                {/* Recent transactions */}
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
                {/* Bottom nav */}
                <div className="absolute bottom-4 left-4 right-4 flex justify-around pt-3 border-t border-gray-100">
                  {['Home', 'Txns', 'Charts', 'Reports'].map((tab, i) => (
                    <div key={tab} className="flex flex-col items-center gap-0.5">
                      <div className={`w-5 h-5 rounded-lg ${i === 0 ? 'bg-[#635BFF]' : 'bg-gray-200'}`} />
                      <span className={`text-[9px] font-medium ${i === 0 ? 'text-[#635BFF]' : 'text-gray-400'}`}>{tab}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── SCREEN: Add Transaction ── */}
              <div className="absolute inset-0 bg-white px-4 pb-4 pt-14" style={slideStyle('add')}>
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                    <span className="text-xs text-gray-500">←</span>
                  </div>
                  <p className="text-sm font-bold text-gray-900">Add Transaction</p>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1.5">Amount</p>
                    <div className="bg-gray-50 border border-[#635BFF]/30 rounded-xl p-3 text-lg font-bold text-gray-900">
                      {screen === 'add'
                        ? <TypewriterText text="$84.30" active={screen === 'add'} />
                        : '$84.30'}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1.5">Description</p>
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm text-gray-700">Grocery Store</div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1.5">Category</p>
                    <div className="bg-[#635BFF]/10 border border-[#635BFF]/30 rounded-xl p-3 flex items-center justify-between">
                      <span className="text-sm font-semibold text-[#635BFF]">Food &amp; Dining</span>
                      <span className="text-xs bg-[#635BFF] text-white px-2 py-0.5 rounded-full">AI</span>
                    </div>
                  </div>
                  {saved ? (
                    <div className="flex items-center justify-center gap-2 p-4 bg-green-50 border border-green-200 rounded-xl animate-scale-in">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <span className="text-sm font-semibold text-green-700">Transaction saved</span>
                    </div>
                  ) : (
                    <button className="w-full bg-[#635BFF] text-white text-sm font-semibold py-3 rounded-xl">
                      Save Transaction
                    </button>
                  )}
                </div>
              </div>

              {/* ── SCREEN: Spending Chart ── */}
              <div className="absolute inset-0 bg-white px-4 pb-4 pt-14" style={slideStyle('chart')}>
                <p className="text-sm font-bold text-gray-900 mb-1">This Month</p>
                <p className="text-xs text-gray-500 mb-4">Spending by category</p>
                {/* Simple bar chart */}
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
                {/* Total */}
                <div
                  className="mt-5 p-3 bg-gray-50 rounded-xl"
                  style={{
                    opacity: screen === 'chart' ? 1 : 0,
                    transition: 'opacity 0.5s ease 600ms',
                  }}
                >
                  <p className="text-xs text-gray-500">Total tracked</p>
                  <p className="text-xl font-bold text-gray-900">$1,990</p>
                </div>
                {/* Bottom nav */}
                <div className="absolute bottom-4 left-4 right-4 flex justify-around pt-3 border-t border-gray-100">
                  {['Home', 'Txns', 'Charts', 'Reports'].map((tab, i) => (
                    <div key={tab} className="flex flex-col items-center gap-0.5">
                      <div className={`w-5 h-5 rounded-lg ${i === 2 ? 'bg-[#635BFF]' : 'bg-gray-200'}`} />
                      <span className={`text-[9px] font-medium ${i === 2 ? 'text-[#635BFF]' : 'text-gray-400'}`}>{tab}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </PhoneMockup>
        </div>
      </div>
    </div>
  )
}

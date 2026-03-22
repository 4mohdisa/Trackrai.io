'use client'

import { useState, useEffect, useRef } from 'react'
import { TrendingUp, DollarSign, CreditCard, LineChart } from 'lucide-react'

function useCountUp(target: number, duration: number, active: boolean, resetKey: number) {
  const [value, setValue] = useState(0)
  const rafRef = useRef(0)

  useEffect(() => {
    if (!active) { setValue(0); return }
    let start: number | null = null
    const step = (ts: number) => {
      if (!start) start = ts
      const p = Math.min((ts - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setValue(Math.round(eased * target))
      if (p < 1) rafRef.current = requestAnimationFrame(step)
    }
    rafRef.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafRef.current)
  }, [active, target, duration, resetKey])

  return value
}

const BARS = [
  { h: 55, label: 'Jan' },
  { h: 78, label: 'Feb' },
  { h: 42, label: 'Mar' },
  { h: 92, label: 'Apr' },
  { h: 67, label: 'May' },
  { h: 83, label: 'Jun' },
  { h: 71, label: 'Jul' },
]

const CATEGORIES = [
  { label: 'Food & Dining', pct: 34, amount: '$680', color: '#295EFF' },
  { label: 'Shopping',      pct: 23, amount: '$459', color: '#f97316' },
  { label: 'Transport',     pct: 19, amount: '$380', color: '#3b82f6' },
  { label: 'Other',         pct: 24, amount: '$473', color: '#9ca3af' },
]

export function HeroDashboard() {
  const [step, setStep] = useState(0)
  const [started, setStarted] = useState(false)
  const [cycleKey, setCycleKey] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  // Trigger on scroll into view
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const ob = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setStarted(true); ob.disconnect() } },
      { threshold: 0.2 }
    )
    ob.observe(el)
    return () => ob.disconnect()
  }, [])

  // Step cycling: 0=dashboard(4s), 1=new tx(2.5s), 2=categories(3s)
  useEffect(() => {
    if (!started) return
    const durations = [4000, 2500, 3000]
    const t = window.setTimeout(() => {
      setStep(prev => {
        const next = (prev + 1) % 3
        if (next === 0) setCycleKey(k => k + 1)
        return next
      })
    }, durations[step])
    return () => window.clearTimeout(t)
  }, [step, started])

  const bal = useCountUp(24532, 1400, started && step === 0, cycleKey)
  const inc = useCountUp(8420, 1100, started && step === 0, cycleKey)
  const exp = useCountUp(3280, 1000, started && step === 0, cycleKey)

  const fmt = (n: number) => n.toLocaleString()

  return (
    <div ref={containerRef} className="relative mx-auto max-w-5xl">
      <div className="absolute -inset-4 bg-gradient-to-r from-brand-primary/20 to-brand-secondary/20 rounded-3xl blur-3xl" />
      <div className="relative rounded-2xl border border-gray-200 bg-white shadow-2xl overflow-hidden">

        {/* Browser chrome */}
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
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-green-600 font-medium">
            <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
            Live
          </div>
        </div>

        {/* Content area — fixed height, steps overlap */}
        <div className="bg-gradient-to-br from-gray-50 to-white relative overflow-hidden" style={{ minHeight: 360 }}>

          {/* ── STEP 0: Dashboard ── */}
          <div
            className="p-4 sm:p-6 transition-opacity duration-500"
            style={{ opacity: step === 0 ? 1 : 0, pointerEvents: step === 0 ? 'auto' : 'none' }}
          >
            {/* KPI cards */}
            <div className="grid grid-cols-3 gap-3 mb-5">
              {[
                { label: 'Total Balance', val: `$${fmt(bal)}`, sub: '+12.5% this month', subCls: 'text-green-600', Icon: TrendingUp, iconCls: 'text-green-500' },
                { label: 'Income',        val: `$${fmt(inc)}`, sub: 'Last 30 days',      subCls: 'text-gray-400',  Icon: DollarSign, iconCls: 'text-blue-500' },
                { label: 'Expenses',      val: `$${fmt(exp)}`, sub: 'Last 30 days',      subCls: 'text-gray-400',  Icon: CreditCard,  iconCls: 'text-orange-500' },
              ].map((kpi) => (
                <div key={kpi.label} className="bg-white rounded-xl border border-gray-100 p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] sm:text-xs text-gray-500 truncate">{kpi.label}</span>
                    <kpi.Icon className={`h-3.5 w-3.5 shrink-0 ${kpi.iconCls}`} />
                  </div>
                  <p className="text-sm sm:text-lg font-bold text-gray-900 tabular-nums">{kpi.val}</p>
                  <p className={`text-[10px] mt-0.5 ${kpi.subCls}`}>{kpi.sub}</p>
                </div>
              ))}
            </div>

            {/* Bar chart — uses absolute positioning so h% has a definite reference */}
            <div className="bg-white rounded-xl border border-gray-100 p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-gray-700">Monthly Spending</span>
                <LineChart className="h-3.5 w-3.5 text-gray-400" />
              </div>
              <div className="relative" style={{ height: 100 }}>
                {/* Bars container — explicit height so h% resolves correctly */}
                <div
                  className="absolute inset-x-0 top-0 flex items-end justify-around gap-1"
                  style={{ bottom: 18 }}
                >
                  {BARS.map(({ h }, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t"
                      style={{
                        height: `${h}%`,
                        background: 'linear-gradient(to top, #295EFF, rgba(41,94,255,0.5))',
                        transform: started ? 'scaleY(1)' : 'scaleY(0)',
                        transformOrigin: 'bottom',
                        transition: `transform 0.65s cubic-bezier(0.34,1.3,0.64,1) ${i * 75}ms`,
                      }}
                    />
                  ))}
                </div>
                {/* Labels row */}
                <div className="absolute bottom-0 inset-x-0 flex justify-around" style={{ height: 18 }}>
                  {BARS.map(({ label }) => (
                    <span key={label} className="text-[9px] text-gray-400 flex-1 text-center leading-none pt-1">{label}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── STEP 1: New transaction ── */}
          <div
            className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-center transition-opacity duration-500"
            style={{ opacity: step === 1 ? 1 : 0, pointerEvents: step === 1 ? 'auto' : 'none' }}
          >
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">Recent Activity</p>
            {[
              { name: 'Netflix',       amount: '-$15.99', cls: 'bg-red-100 text-red-600',    time: '2 hours ago', delay: 0 },
              { name: 'Grocery Store', amount: '-$84.30', cls: 'bg-orange-100 text-orange-600', time: '5 hours ago', delay: 80 },
            ].map((tx) => (
              <div
                key={tx.name}
                className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-100 mb-2 shadow-sm"
                style={{
                  opacity: step === 1 ? 1 : 0,
                  transform: step === 1 ? 'translateX(0)' : 'translateX(-12px)',
                  transition: `opacity 0.4s ease-out ${tx.delay}ms, transform 0.4s ease-out ${tx.delay}ms`,
                }}
              >
                <div>
                  <p className="text-sm font-semibold text-gray-900">{tx.name}</p>
                  <p className="text-xs text-gray-400">{tx.time}</p>
                </div>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${tx.cls}`}>{tx.amount}</span>
              </div>
            ))}
            {/* New income sliding up */}
            <div
              className="flex items-center justify-between p-3 bg-green-50 rounded-xl border border-green-200 shadow-sm"
              style={{
                opacity: step === 1 ? 1 : 0,
                transform: step === 1 ? 'translateY(0)' : 'translateY(16px)',
                transition: 'opacity 0.5s ease-out 200ms, transform 0.5s cubic-bezier(0.34,1.4,0.64,1) 200ms',
                boxShadow: '0 0 0 3px rgba(34,197,94,0.12)',
              }}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-green-500 flex items-center justify-center shrink-0">
                  <DollarSign className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Salary Received</p>
                  <p className="text-xs text-green-600 font-medium">Just now · Confirmed ✓</p>
                </div>
              </div>
              <span className="text-base font-bold text-green-600">+$4,200</span>
            </div>
          </div>

          {/* ── STEP 2: Category breakdown ── */}
          <div
            className="absolute inset-0 p-4 sm:p-6 transition-opacity duration-500"
            style={{ opacity: step === 2 ? 1 : 0, pointerEvents: step === 2 ? 'auto' : 'none' }}
          >
            <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-4">Spending by Category</p>
            <div className="space-y-4">
              {CATEGORIES.map(({ label, pct, amount, color }, i) => (
                <div
                  key={label}
                  style={{
                    opacity: step === 2 ? 1 : 0,
                    transform: step === 2 ? 'translateX(0)' : 'translateX(14px)',
                    transition: `opacity 0.4s ease-out ${i * 90}ms, transform 0.4s ease-out ${i * 90}ms`,
                  }}
                >
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-gray-600 font-medium">{label}</span>
                    <span className="text-gray-900 font-semibold">{amount} <span className="text-gray-400">({pct}%)</span></span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        backgroundColor: color,
                        width: `${pct * 2.5}%`,
                        transform: step === 2 ? 'scaleX(1)' : 'scaleX(0)',
                        transformOrigin: 'left',
                        transition: `transform 0.7s ease-out ${i * 90 + 250}ms`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}

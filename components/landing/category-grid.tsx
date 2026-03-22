'use client'

import { useState, useEffect, useRef } from 'react'
import { useInView } from '@/hooks/useInView'
import { Utensils, Car, Tv, ShoppingBag, HeartPulse, Zap } from 'lucide-react'

const CATEGORIES = [
  { label: 'Food & Dining',  amount: 680,  pct: 34, color: '#295EFF', bg: 'bg-brand-primary/10', icon: Utensils,  borderCls: 'border-l-brand-primary' },
  { label: 'Transportation', amount: 340,  pct: 17, color: '#3b82f6', bg: 'bg-blue-50',       icon: Car,       borderCls: 'border-l-blue-500' },
  { label: 'Entertainment',  amount: 220,  pct: 11, color: '#22c55e', bg: 'bg-green-50',      icon: Tv,        borderCls: 'border-l-green-500' },
  { label: 'Shopping',       amount: 450,  pct: 23, color: '#f97316', bg: 'bg-orange-50',     icon: ShoppingBag, borderCls: 'border-l-orange-500' },
  { label: 'Healthcare',     amount: 120,  pct: 6,  color: '#ec4899', bg: 'bg-pink-50',       icon: HeartPulse, borderCls: 'border-l-pink-500' },
  { label: 'Utilities',      amount: 180,  pct: 9,  color: '#f59e0b', bg: 'bg-amber-50',      icon: Zap,       borderCls: 'border-l-amber-500' },
]

function useCountUp(target: number, active: boolean, duration = 1000) {
  const [val, setVal] = useState(0)
  const rafRef = useRef(0)
  useEffect(() => {
    if (!active) { setVal(0); return }
    let start: number | null = null
    const step = (ts: number) => {
      if (!start) start = ts
      const p = Math.min((ts - start) / duration, 1)
      setVal(Math.round((1 - Math.pow(1 - p, 3)) * target))
      if (p < 1) rafRef.current = requestAnimationFrame(step)
    }
    rafRef.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafRef.current)
  }, [active, target, duration])
  return val
}

export function CategoryGrid() {
  const { ref, inView } = useInView(0.25)
  const [progressReady, setProgressReady] = useState(false)
  const [highlightIndex, setHighlightIndex] = useState(-1)
  const totalCount = useCountUp(1990, inView, 1200)

  // Trigger progress bars after tiles appear
  useEffect(() => {
    if (!inView) return
    const t = window.setTimeout(() => setProgressReady(true), 600)
    return () => window.clearTimeout(t)
  }, [inView])

  // Highlight sweep every 3s
  useEffect(() => {
    if (!inView) return
    let i = 0
    const interval = setInterval(() => {
      setHighlightIndex(i % CATEGORIES.length)
      i++
    }, 3000)
    return () => clearInterval(interval)
  }, [inView])

  return (
    <div ref={ref} className="relative">
      <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-3xl blur-2xl" />
      <div className="relative bg-white rounded-2xl border border-gray-200 shadow-xl p-6">

        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-gray-900">Categories</h3>
          <span className="text-xs text-gray-400">This month</span>
        </div>

        {/* 3×2 grid */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          {CATEGORIES.map(({ label, amount, pct, color, bg, icon: Icon, borderCls }, i) => {
            const isHighlighted = highlightIndex === i
            return (
              <div
                key={label}
                className={`${bg} border-l-2 ${borderCls} rounded-xl p-3 transition-all duration-300`}
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'scale(1)' : 'scale(0.85)',
                  transition: `opacity 0.45s ease ${i * 70}ms, transform 0.45s ease ${i * 70}ms`,
                  boxShadow: isHighlighted ? `0 0 0 2px ${color}40` : 'none',
                }}
              >
                <Icon className="h-4 w-4 mb-1.5" style={{ color }} />
                <p className="text-[10px] text-gray-500 truncate leading-tight">{label}</p>
                <p className="text-sm font-bold text-gray-900 mt-0.5">${amount.toLocaleString()}</p>
                {/* Mini progress bar */}
                <div className="mt-1.5 h-1 bg-white/60 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      backgroundColor: color,
                      width: `${pct * 2.8}%`,
                      transform: progressReady ? 'scaleX(1)' : 'scaleX(0)',
                      transformOrigin: 'left',
                      transition: `transform 0.65s ease ${i * 70 + 200}ms`,
                    }}
                  />
                </div>
              </div>
            )
          })}
        </div>

        {/* Total row */}
        <div
          className="flex items-center justify-between pt-3 border-t border-gray-100"
          style={{
            opacity: inView ? 1 : 0,
            transition: 'opacity 0.5s ease 800ms',
          }}
        >
          <span className="text-xs text-gray-500 font-medium">Total tracked this month</span>
          <span className="text-base font-bold text-gray-900 tabular-nums">
            ${totalCount.toLocaleString()}
          </span>
        </div>

      </div>
    </div>
  )
}

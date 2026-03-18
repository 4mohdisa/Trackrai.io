'use client'

import { useEffect, useRef, useState } from 'react'

const STATS = [
  { value: 500,  suffix: '+',  label: 'Users in early access' },
  { value: 42,   suffix: '',   label: 'Avg transactions tracked' },
  { value: 16,   suffix: '',   label: 'Spending categories' },
  { value: 100,  suffix: '%',  label: 'Private. No bank login.' },
]

function useCountUp(target: number, active: boolean) {
  const [count, setCount] = useState(0)
  const raf = useRef(0)

  useEffect(() => {
    if (!active) return
    const duration = 1200
    let start: number | null = null

    const step = (ts: number) => {
      if (!start) start = ts
      const p = Math.min((ts - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setCount(Math.round(eased * target))
      if (p < 1) raf.current = requestAnimationFrame(step)
    }

    raf.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf.current)
  }, [active, target])

  return count
}

function StatItem({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)
  const count = useCountUp(value, active)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ob = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setActive(true); ob.disconnect() } },
      { threshold: 0.5 }
    )
    ob.observe(el)
    return () => ob.disconnect()
  }, [])

  return (
    <div ref={ref} className="text-center px-6 py-4">
      <div className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-2 tabular-nums">
        {count}{suffix}
      </div>
      <div className="text-sm md:text-base text-gray-500 font-medium">{label}</div>
    </div>
  )
}

export function StatsSection() {
  return (
    <section className="py-16 bg-white border-y border-gray-100">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-100">
          {STATS.map((stat) => (
            <StatItem key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  )
}

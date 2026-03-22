'use client'

import { useState, useEffect } from 'react'
import { useInView } from '@/hooks/useInView'
import { Repeat, Calendar, Zap, Clock } from 'lucide-react'

const RECURRING_ITEMS = [
  { name: 'Netflix',        amount: '$15.99',  period: 'Monthly',  icon: Zap,      bg: 'bg-red-100',    iconCls: 'text-red-600',    itemBg: 'bg-red-50 border-red-200' },
  { name: 'Rent',           amount: '$1,200',  period: 'Monthly',  icon: Calendar, bg: 'bg-blue-100',   iconCls: 'text-blue-600',   itemBg: 'bg-blue-50 border-blue-200' },
  { name: 'Gym Membership', amount: '$49.99',  period: 'Monthly',  icon: Repeat,   bg: 'bg-purple-100', iconCls: 'text-purple-600', itemBg: 'bg-purple-50 border-purple-200' },
  { name: 'Spotify',        amount: '$9.99',   period: 'Monthly',  icon: Zap,      bg: 'bg-green-100',  iconCls: 'text-green-600',  itemBg: 'bg-green-50 border-green-200' },
]

const UPCOMING = [
  { date: 'Mar 18', name: 'Netflix',        amount: '$15.99' },
  { date: 'Mar 22', name: 'Gym Membership', amount: '$49.99' },
  { date: 'Mar 25', name: 'Rent',           amount: '$1,200' },
]

type View = 'list' | 'calendar'

export function RecurringCard() {
  const [view, setView] = useState<View>('list')
  const [showSpotify, setShowSpotify] = useState(false)
  const { ref, inView } = useInView(0.3)

  // Show Spotify row 2s after inView
  useEffect(() => {
    if (!inView) return
    const t = window.setTimeout(() => setShowSpotify(true), 2000)
    return () => window.clearTimeout(t)
  }, [inView])

  // Toggle view every 5s
  useEffect(() => {
    if (!inView) return
    const t = window.setTimeout(() => {
      setView(v => v === 'list' ? 'calendar' : 'list')
    }, 5000)
    return () => window.clearTimeout(t)
  }, [view, inView])

  return (
    <div ref={ref} className="relative">
      <div className="absolute -inset-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-3xl blur-2xl" />
      <div className="relative bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden" style={{ minHeight: 300 }}>

        {/* ── LIST VIEW ── */}
        <div
          className="p-6 transition-opacity duration-500"
          style={{ opacity: view === 'list' ? 1 : 0, pointerEvents: view === 'list' ? 'auto' : 'none' }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-gray-900">Recurring Payments</h3>
            <span className="text-xs bg-brand-primary/10 text-brand-primary font-semibold px-2.5 py-1 rounded-full">4 active</span>
          </div>
          <div className="space-y-3">
            {RECURRING_ITEMS.map(({ name, amount, period, icon: Icon, bg, iconCls, itemBg }, i) => {
              const visible = name === 'Spotify' ? showSpotify : inView
              return (
                <div
                  key={name}
                  className={`flex items-center justify-between p-3.5 border rounded-xl ${itemBg}`}
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'translateX(0)' : 'translateX(-14px)',
                    transition: `opacity 0.45s ease ${i * 90}ms, transform 0.45s ease ${i * 90}ms`,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full ${bg} flex items-center justify-center shrink-0`}>
                      <Icon className={`h-4 w-4 ${iconCls}`} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{name}</p>
                      <p className="text-xs text-gray-500">{period}</p>
                    </div>
                  </div>
                  <p className="text-sm font-bold text-gray-900">{amount}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* ── CALENDAR VIEW ── */}
        <div
          className="absolute inset-0 p-6 transition-opacity duration-500"
          style={{ opacity: view === 'calendar' ? 1 : 0, pointerEvents: view === 'calendar' ? 'auto' : 'none' }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Clock className="h-4 w-4 text-brand-primary" />
            <h3 className="text-sm font-bold text-gray-900">Upcoming this week</h3>
          </div>
          {/* Mini calendar grid */}
          <div className="grid grid-cols-7 gap-1 mb-4 text-center">
            {['M','T','W','T','F','S','S'].map((d, i) => (
              <div key={i} className="text-[10px] text-gray-400 font-medium">{d}</div>
            ))}
            {Array.from({ length: 31 }, (_, i) => {
              const day = i + 1
              const hasDot = [18, 22, 25].includes(day)
              const isToday = day === 17
              return (
                <div
                  key={day}
                  className={`text-[10px] rounded-full w-6 h-6 mx-auto flex items-center justify-center relative
                    ${isToday ? 'bg-brand-primary text-white font-bold' : 'text-gray-600'}
                    ${hasDot ? 'font-semibold' : ''}`}
                >
                  {day <= 31 ? day : ''}
                  {hasDot && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-orange-400" />}
                </div>
              )
            })}
          </div>
          {/* Upcoming list */}
          <div className="space-y-2">
            {UPCOMING.map(({ date, name, amount }, i) => (
              <div
                key={name}
                className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg"
                style={{
                  opacity: view === 'calendar' ? 1 : 0,
                  transform: view === 'calendar' ? 'translateY(0)' : 'translateY(8px)',
                  transition: `opacity 0.4s ease ${i * 80 + 200}ms, transform 0.4s ease ${i * 80 + 200}ms`,
                }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-semibold text-brand-primary bg-brand-primary/10 px-1.5 py-0.5 rounded">{date}</span>
                  <span className="text-xs text-gray-700">{name}</span>
                </div>
                <span className="text-xs font-bold text-gray-900">{amount}</span>
              </div>
            ))}
          </div>
          {/* Total */}
          <div
            className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center"
            style={{
              opacity: view === 'calendar' ? 1 : 0,
              transition: 'opacity 0.5s ease 600ms',
            }}
          >
            <span className="text-xs text-gray-500">Total this month</span>
            <span className="text-sm font-bold text-gray-900">$1,265.98</span>
          </div>
        </div>


      </div>
    </div>
  )
}

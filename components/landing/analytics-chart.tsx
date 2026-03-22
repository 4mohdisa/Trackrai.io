'use client'

import { useState, useEffect } from 'react'
import { useInView } from '@/hooks/useInView'
import { TrendingDown } from 'lucide-react'

const MONTHS = [
  { month: 'Jan', income: 68, expense: 52, incomeVal: '$1,360', expenseVal: '$1,040' },
  { month: 'Feb', income: 82, expense: 65, incomeVal: '$1,640', expenseVal: '$1,300' },
  { month: 'Mar', income: 55, expense: 48, incomeVal: '$1,100', expenseVal: '$960'  },
  { month: 'Apr', income: 90, expense: 70, incomeVal: '$1,800', expenseVal: '$1,400' },
  { month: 'May', income: 75, expense: 58, incomeVal: '$1,500', expenseVal: '$1,160' },
  { month: 'Jun', income: 85, expense: 62, incomeVal: '$1,700', expenseVal: '$1,240' },
  { month: 'Jul', income: 72, expense: 54, incomeVal: '$1,440', expenseVal: '$1,080' },
]

const Y_LABELS = ['$2k', '$1.5k', '$1k', '$500', '$0']

export function AnalyticsChart() {
  const { ref, inView } = useInView(0.3)
  const [highlightIndex, setHighlightIndex] = useState(-1)
  const [showSummary, setShowSummary] = useState(false)

  // After bars animate in, show summary card
  useEffect(() => {
    if (!inView) return
    const t = window.setTimeout(() => setShowSummary(true), 1400)
    return () => window.clearTimeout(t)
  }, [inView])

  // Tooltip sweep every 2.5s
  useEffect(() => {
    if (!inView) return
    let i = 0
    const interval = setInterval(() => {
      setHighlightIndex(i % MONTHS.length)
      i++
    }, 2500)
    return () => clearInterval(interval)
  }, [inView])

  return (
    <div ref={ref} className="relative">
      <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl blur-2xl" />
      <div className="relative bg-white rounded-2xl border border-gray-200 shadow-xl p-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-gray-900">Income vs Expenses</h3>
            <p className="text-xs text-gray-400 mt-0.5">Last 7 months</p>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-1.5 rounded-full bg-green-400 inline-block" /> Income
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-1.5 rounded-full bg-brand-primary inline-block" /> Expenses
            </span>
          </div>
        </div>

        {/* Chart area */}
        <div className="flex gap-2">
          {/* Y-axis */}
          <div className="flex flex-col justify-between text-[10px] text-gray-400 py-1 pr-2 w-9 text-right shrink-0" style={{ height: 160 }}>
            {Y_LABELS.map(l => <span key={l}>{l}</span>)}
          </div>

          {/* Bars */}
          <div className="flex-1 relative">
            <div className="flex items-end justify-between gap-1" style={{ height: 160, paddingBottom: 20 }}>
              {MONTHS.map(({ month, income, expense, incomeVal, expenseVal }, i) => (
                <div key={month} className="flex-1 flex flex-col items-center gap-0.5 relative h-full justify-end">
                  {/* Highlight tooltip */}
                  {highlightIndex === i && (
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 z-10 bg-gray-900 text-white text-[9px] rounded px-1.5 py-1 whitespace-nowrap shadow-lg animate-fade-in">
                      <div>{incomeVal}</div>
                      <div className="text-gray-300">{expenseVal}</div>
                    </div>
                  )}
                  {/* Income bar */}
                  <div
                    className={`w-full rounded-t transition-all duration-300 ${highlightIndex === i ? 'opacity-100' : 'opacity-75'}`}
                    style={{
                      backgroundColor: '#4ade80',
                      height: `${income * 0.85}%`,
                      transform: inView ? 'scaleY(1)' : 'scaleY(0)',
                      transformOrigin: 'bottom',
                      transition: `transform 0.65s cubic-bezier(0.34,1.2,0.64,1) ${i * 70}ms`,
                    }}
                  />
                  {/* Expense bar */}
                  <div
                    className={`w-full rounded-t transition-all duration-300 ${highlightIndex === i ? 'opacity-100' : 'opacity-75'}`}
                    style={{
                      backgroundColor: '#295EFF',
                      height: `${expense * 0.85}%`,
                      transform: inView ? 'scaleY(1)' : 'scaleY(0)',
                      transformOrigin: 'bottom',
                      transition: `transform 0.65s cubic-bezier(0.34,1.2,0.64,1) ${i * 70 + 35}ms`,
                    }}
                  />
                  {/* Month label */}
                  <span className="absolute bottom-0 text-[10px] text-gray-400">{month}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Summary card slides in */}
        <div
          className="mt-4 p-3 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-between"
          style={{
            opacity: showSummary ? 1 : 0,
            transform: showSummary ? 'translateX(0)' : 'translateX(16px)',
            transition: 'opacity 0.5s ease, transform 0.5s cubic-bezier(0.34,1.2,0.64,1)',
          }}
        >
          <div>
            <p className="text-xs text-gray-500">Total spent this month</p>
            <p className="text-lg font-bold text-gray-900">$1,080</p>
          </div>
          <div className="flex items-center gap-1.5 bg-green-100 text-green-700 text-xs font-semibold px-2.5 py-1.5 rounded-full">
            <TrendingDown className="h-3 w-3" />
            Down 23%
          </div>
        </div>

      </div>
    </div>
  )
}

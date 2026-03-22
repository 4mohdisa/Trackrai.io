'use client'

import { useState, useEffect } from 'react'
import { useInView } from '@/hooks/useInView'
import { TrendingUp, TrendingDown, FileBarChart2, Download, ChevronRight } from 'lucide-react'

type ReportView = 'list' | 'detail'

const SAVED_REPORTS = [
  { month: 'November 2025', income: '$6,200', expenses: '$3,840', net: '+$2,360', trend: '+2.3%' },
  { month: 'October 2025',  income: '$6,010', expenses: '$4,180', net: '+$1,830', trend: '-4.1%' },
  { month: 'September 2025',income: '$5,980', expenses: '$3,650', net: '+$2,330', trend: '+6.8%' },
]

const TOP_SPENDING = [
  { label: 'Food & Dining', amount: '$680', pct: 68 },
  { label: 'Transport',     amount: '$340', pct: 34 },
  { label: 'Shopping',      amount: '$320', pct: 32 },
]

export function ReportsCard() {
  const [view, setView] = useState<ReportView>('list')
  const [progressReady, setProgressReady] = useState(false)
  const [showExport, setShowExport] = useState(false)
  const [exporting, setExporting] = useState(false)
  const { ref, inView } = useInView(0.3)

  // Cycle views
  useEffect(() => {
    if (!inView) return
    const timings: Record<ReportView, number> = { list: 4000, detail: 5500 }
    const t = window.setTimeout(() => {
      setView(prev => prev === 'list' ? 'detail' : 'list')
      setProgressReady(false)
      setShowExport(false)
      setExporting(false)
    }, timings[view])
    return () => window.clearTimeout(t)
  }, [view, inView])

  // Trigger progress bars and export button in detail view
  useEffect(() => {
    if (view !== 'detail' || !inView) return
    const t1 = window.setTimeout(() => setProgressReady(true), 600)
    const t2 = window.setTimeout(() => setShowExport(true), 1800)
    const t3 = window.setTimeout(() => setExporting(true), 3500)
    return () => { window.clearTimeout(t1); window.clearTimeout(t2); window.clearTimeout(t3) }
  }, [view, inView])

  return (
    <div ref={ref} className="relative">
      <div className="absolute -inset-4 bg-gradient-to-r from-teal-500/10 to-cyan-500/10 rounded-3xl blur-2xl" />
      <div className="relative bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden" style={{ minHeight: 340 }}>

        {/* ── LIST VIEW ── */}
        <div
          className="p-6 transition-opacity duration-500"
          style={{ opacity: view === 'list' ? 1 : 0, pointerEvents: view === 'list' ? 'auto' : 'none' }}
        >
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-bold text-gray-900">Saved Reports</p>
            <button className="text-[10px] bg-brand-primary text-white px-2.5 py-1.5 rounded-lg font-semibold animate-bounce-light">
              + Generate
            </button>
          </div>
          <div className="space-y-2.5">
            {SAVED_REPORTS.map(({ month, income, expenses, net, trend }, i) => (
              <div
                key={month}
                className="flex items-center justify-between p-3.5 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors border border-gray-100"
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'scale(1)' : 'scale(0.92)',
                  transition: `opacity 0.45s ease ${i * 100}ms, transform 0.45s ease ${i * 100}ms`,
                }}
                onClick={() => setView('detail')}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center shrink-0">
                    <FileBarChart2 className="h-4 w-4 text-teal-600" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-900">{month}</p>
                    <p className="text-[10px] text-gray-500">{income} in · {expenses} out</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-green-600">{net}</span>
                  <ChevronRight className="h-3.5 w-3.5 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── DETAIL VIEW ── */}
        <div
          className="absolute inset-0 p-6 transition-opacity duration-500"
          style={{ opacity: view === 'detail' ? 1 : 0, pointerEvents: view === 'detail' ? 'auto' : 'none' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100">
            <div>
              <p className="text-[10px] text-gray-500 uppercase tracking-wide mb-0.5">Monthly Summary</p>
              <p className="text-sm font-bold text-gray-900">November 2025</p>
            </div>
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-100 text-green-700 text-[10px] font-semibold">
              <TrendingUp className="h-3 w-3" />
              Saved $2,360
            </span>
          </div>
          {/* KPI row */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            {[
              { label: 'Income',   value: '$6,200', sub: '+3.2% vs Oct', bg: 'bg-green-50 border-green-100', subCls: 'text-green-600', Icon: TrendingUp, iconCls: 'text-green-500' },
              { label: 'Expenses', value: '$3,840', sub: '−8.1% vs Oct', bg: 'bg-red-50 border-red-100',   subCls: 'text-red-500',   Icon: TrendingDown, iconCls: 'text-red-400' },
            ].map(({ label, value, sub, bg, subCls, Icon, iconCls }, i) => (
              <div
                key={label}
                className={`p-3 border rounded-xl ${bg}`}
                style={{
                  opacity: view === 'detail' ? 1 : 0,
                  transform: view === 'detail' ? 'translateY(0)' : 'translateY(8px)',
                  transition: `opacity 0.4s ease ${i * 100}ms, transform 0.4s ease ${i * 100}ms`,
                }}
              >
                <div className="flex items-center justify-between mb-1">
                  <p className="text-[10px] text-gray-500">{label}</p>
                  <Icon className={`h-3 w-3 ${iconCls}`} />
                </div>
                <p className="text-lg font-bold text-gray-900">{value}</p>
                <p className={`text-[10px] mt-0.5 ${subCls}`}>{sub}</p>
              </div>
            ))}
          </div>
          {/* Top spending */}
          <div className="space-y-2.5 mb-3">
            {TOP_SPENDING.map(({ label, amount, pct }, i) => (
              <div
                key={label}
                style={{
                  opacity: view === 'detail' ? 1 : 0,
                  transition: `opacity 0.4s ease ${i * 80 + 200}ms`,
                }}
              >
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-600">{label}</span>
                  <span className="font-semibold text-gray-900">{amount}</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-brand-primary rounded-full"
                    style={{
                      width: `${pct}%`,
                      transform: progressReady ? 'scaleX(1)' : 'scaleX(0)',
                      transformOrigin: 'left',
                      transition: `transform 0.7s ease ${i * 80 + 400}ms`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          {/* Net balance */}
          <div
            className="text-center py-2"
            style={{ opacity: progressReady ? 1 : 0, transition: 'opacity 0.5s ease 800ms' }}
          >
            <p className="text-xs text-gray-500">Net balance</p>
            <p className="text-xl font-extrabold text-green-600">+$2,360</p>
          </div>
          {/* Export button */}
          {showExport && (
            <button
              className={`w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-semibold mt-1 transition-all duration-300 animate-fade-in ${
                exporting
                  ? 'bg-green-50 border border-green-200 text-green-600'
                  : 'bg-gray-50 border border-gray-200 text-gray-600 hover:border-brand-primary/40'
              }`}
            >
              <Download className={`h-3.5 w-3.5 ${exporting ? 'text-green-500 animate-bounce-light' : ''}`} />
              {exporting ? 'Downloading PDF…' : 'Export PDF'}
            </button>
          )}
        </div>


      </div>
    </div>
  )
}

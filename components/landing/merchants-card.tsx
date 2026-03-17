'use client'

import { useState, useEffect } from 'react'
import { useInView } from '@/hooks/useInView'
import { Store, ChevronRight, Check, BarChart3 } from 'lucide-react'

type MerchantView = 'list' | 'detail' | 'assign'

const MERCHANTS = [
  { name: 'Amazon',      category: 'Shopping',     amount: '$127.50', bg: 'bg-blue-100',   iconCls: 'text-blue-600' },
  { name: 'Spotify',     category: 'Entertainment', amount: '$9.99',   bg: 'bg-green-100',  iconCls: 'text-green-600' },
  { name: 'Whole Foods', category: 'Groceries',     amount: '$84.30',  bg: 'bg-orange-100', iconCls: 'text-orange-600' },
  { name: 'Netflix',     category: 'Entertainment', amount: '$47.97',  bg: 'bg-red-100',    iconCls: 'text-red-600' },
]

const AMAZON_TXS = [
  { name: 'Amazon Prime',  amount: '$14.99', date: 'Mar 1' },
  { name: 'Amazon Order',  amount: '$67.51', date: 'Mar 8' },
  { name: 'Amazon Order',  amount: '$45.00', date: 'Mar 12' },
]

const ASSIGN_SUGGESTIONS = ['Starbucks', 'Coffee Shop', 'Other']

export function MerchantsCard() {
  const [view, setView] = useState<MerchantView>('list')
  const [assigned, setAssigned] = useState(false)
  const [selectedSuggestion, setSelectedSuggestion] = useState(-1)
  const { ref, inView } = useInView(0.3)

  // Cycle views
  useEffect(() => {
    if (!inView) return
    const timings: Record<MerchantView, number> = { list: 4000, detail: 4000, assign: 3500 }
    const t = window.setTimeout(() => {
      setView(prev => {
        if (prev === 'list') return 'detail'
        if (prev === 'detail') return 'assign'
        setAssigned(false)
        setSelectedSuggestion(-1)
        return 'list'
      })
    }, timings[view])
    return () => window.clearTimeout(t)
  }, [view, inView])

  // In assign view: animate selection
  useEffect(() => {
    if (view !== 'assign') return
    const t1 = window.setTimeout(() => setSelectedSuggestion(0), 1500)
    const t2 = window.setTimeout(() => setAssigned(true), 2200)
    return () => { window.clearTimeout(t1); window.clearTimeout(t2) }
  }, [view])

  return (
    <div ref={ref} className="relative">
      <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/10 to-violet-500/10 rounded-3xl blur-2xl" />
      <div className="relative bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden" style={{ minHeight: 340 }}>

        {/* ── LIST VIEW ── */}
        <div
          className="p-6 transition-opacity duration-500"
          style={{ opacity: view === 'list' ? 1 : 0, pointerEvents: view === 'list' ? 'auto' : 'none' }}
        >
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100">
            <p className="text-sm font-bold text-gray-900">Merchant Manager</p>
            <span className="text-xs bg-[#635BFF]/10 text-[#635BFF] font-semibold px-2.5 py-1 rounded-full">8 merchants</span>
          </div>
          <div className="space-y-2.5 mb-3">
            {MERCHANTS.map(({ name, category, amount, bg, iconCls }, i) => (
              <div
                key={name}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors"
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'translateX(0)' : 'translateX(-12px)',
                  transition: `opacity 0.45s ease ${i * 80}ms, transform 0.45s ease ${i * 80}ms`,
                }}
                onClick={() => setView('detail')}
              >
                <div className="flex items-center gap-2.5">
                  <div className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center shrink-0`}>
                    <Store className={`h-4 w-4 ${iconCls}`} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-900">{name}</p>
                    <p className="text-[10px] text-gray-500">{category}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <p className="text-xs font-bold text-gray-900">{amount}</p>
                  <ChevronRight className="h-3 w-3 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
          {/* Unassigned row */}
          <div
            className="flex items-center justify-between p-3 rounded-xl border border-dashed border-orange-300 bg-amber-50/50 animate-pulse-glow"
            style={{
              opacity: inView ? 1 : 0,
              transition: 'opacity 0.45s ease 400ms',
            }}
          >
            <div>
              <p className="text-xs font-medium text-gray-600">SQ*COFFEE SHOP 34B</p>
              <p className="text-[10px] text-gray-400">No merchant assigned</p>
            </div>
            <button
              className="text-[10px] bg-amber-100 text-amber-700 px-2 py-1 rounded-lg font-semibold animate-bounce-light"
              onClick={() => setView('assign')}
            >
              Assign →
            </button>
          </div>
        </div>

        {/* ── DETAIL VIEW ── */}
        <div
          className="absolute inset-0 p-6 transition-opacity duration-500"
          style={{ opacity: view === 'detail' ? 1 : 0, pointerEvents: view === 'detail' ? 'auto' : 'none' }}
        >
          <div className="flex items-center gap-2 mb-5">
            <button
              className="text-xs text-gray-400 hover:text-gray-600"
              onClick={() => setView('list')}
            >
              ← Back
            </button>
            <p className="text-sm font-bold text-gray-900">Amazon</p>
          </div>
          {/* Stats */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-3">
              <p className="text-[10px] text-gray-500">Total spent</p>
              <p className="text-lg font-bold text-gray-900">$127.50</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-[10px] text-gray-500">Transactions</p>
              <p className="text-lg font-bold text-gray-900">3 this month</p>
            </div>
          </div>
          {/* Transaction list */}
          <div className="space-y-2 mb-4">
            {AMAZON_TXS.map(({ name, amount, date }, i) => (
              <div
                key={name + amount}
                className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg"
                style={{
                  opacity: view === 'detail' ? 1 : 0,
                  transform: view === 'detail' ? 'translateY(0)' : 'translateY(8px)',
                  transition: `opacity 0.4s ease ${i * 80 + 100}ms, transform 0.4s ease ${i * 80 + 100}ms`,
                }}
              >
                <div>
                  <p className="text-xs font-semibold text-gray-800">{name}</p>
                  <p className="text-[10px] text-gray-400">{date}</p>
                </div>
                <p className="text-xs font-bold text-gray-900">{amount}</p>
              </div>
            ))}
          </div>
          {/* Mini chart */}
          <div
            className="bg-gray-50 rounded-xl p-3"
            style={{
              opacity: view === 'detail' ? 1 : 0,
              transition: 'opacity 0.5s ease 400ms',
            }}
          >
            <div className="flex items-center gap-1.5 mb-2">
              <BarChart3 className="h-3 w-3 text-blue-500" />
              <span className="text-[10px] text-gray-500">Weekly spend</span>
            </div>
            <div className="flex items-end gap-1 h-10">
              {[30, 50, 20, 65].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t bg-blue-400"
                  style={{
                    height: `${h}%`,
                    transform: view === 'detail' ? 'scaleY(1)' : 'scaleY(0)',
                    transformOrigin: 'bottom',
                    transition: `transform 0.5s ease ${i * 60 + 500}ms`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ── ASSIGN VIEW ── */}
        <div
          className="absolute inset-0 p-6 transition-opacity duration-500"
          style={{ opacity: view === 'assign' ? 1 : 0, pointerEvents: view === 'assign' ? 'auto' : 'none' }}
        >
          <p className="text-sm font-bold text-gray-900 mb-2">Assign Merchant</p>
          <div
            className={`p-3 rounded-xl border mb-4 transition-all duration-300 ${
              assigned ? 'bg-green-50 border-green-200' : 'bg-amber-50/50 border-dashed border-orange-300'
            }`}
          >
            <p className="text-xs font-medium text-gray-700">SQ*COFFEE SHOP 34B</p>
            <p className="text-[10px] text-gray-400">$6.40 · Mar 15</p>
            {assigned && (
              <div className="flex items-center gap-1.5 mt-1.5 animate-fade-in">
                <Check className="h-3.5 w-3.5 text-green-500" />
                <span className="text-xs font-semibold text-green-600">Assigned to Starbucks</span>
              </div>
            )}
          </div>
          {!assigned && (
            <>
              <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wide mb-2">Suggestions</p>
              <div className="space-y-2">
                {ASSIGN_SUGGESTIONS.map((s, i) => (
                  <div
                    key={s}
                    className={`p-2.5 rounded-xl border cursor-pointer transition-all duration-200 flex items-center justify-between ${
                      selectedSuggestion === i
                        ? 'bg-[#635BFF] border-[#635BFF] text-white'
                        : 'bg-gray-50 border-gray-200 hover:border-[#635BFF]/40'
                    }`}
                    style={{
                      opacity: view === 'assign' ? 1 : 0,
                      transition: `opacity 0.4s ease ${i * 60 + 100}ms`,
                    }}
                    onClick={() => setSelectedSuggestion(i)}
                  >
                    <span className={`text-xs font-semibold ${selectedSuggestion === i ? 'text-white' : 'text-gray-700'}`}>{s}</span>
                    {selectedSuggestion === i && <Check className="h-3.5 w-3.5 text-white" />}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>


      </div>
    </div>
  )
}

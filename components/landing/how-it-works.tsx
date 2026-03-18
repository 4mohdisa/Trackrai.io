'use client'

import { useEffect, useRef, useState } from 'react'
import { Upload, Sparkles, BarChart3 } from 'lucide-react'

const STEPS = [
  {
    number: '01',
    displayNum: 1,
    Icon: Upload,
    title: 'Connect your bank data',
    description:
      'Export a CSV from your bank and import the file into TrackrAI. No bank connection or credentials needed.',
  },
  {
    number: '02',
    displayNum: 2,
    Icon: Sparkles,
    title: 'AI categorises your transactions',
    description:
      'TrackrAI reads each transaction name and assigns a category automatically. Review and adjust any assignment in seconds.',
  },
  {
    number: '03',
    displayNum: 3,
    Icon: BarChart3,
    title: 'See where your money goes',
    description:
      'Your dashboard shows spending by category, merchant, and time period instantly. Generate a report for any date range you choose.',
  },
]

function useStepsInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect() } },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, inView }
}

export function HowItWorksSection() {
  const { ref, inView } = useStepsInView(0.2)

  return (
    <section id="how-it-works" className="py-24 md:py-32 bg-[#F8F9FF]">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center rounded-full bg-[#635BFF]/10 px-4 py-1.5 text-sm font-medium text-[#635BFF] mb-5">
            How It Works
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-5">
            Up and running in three steps
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            No complicated setup. Import your bank data and TrackrAI does the rest.
          </p>
        </div>

        <div ref={ref} className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Connecting dashed line (desktop only) — draws in after cards enter */}
          <div
            className="hidden md:block absolute top-10 left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-px pointer-events-none overflow-hidden"
            aria-hidden="true"
          >
            <div
              className="h-full border-t-2 border-dashed border-[#635BFF]/30 transition-all duration-700 ease-out"
              style={{
                width: inView ? '100%' : '0%',
                transitionDelay: '600ms',
              }}
            />
          </div>

          {STEPS.map(({ number, displayNum, Icon, title, description }, i) => {
            const slideClass =
              i === 0 ? 'hiw-slide-left'
              : i === 1 ? 'hiw-slide-up'
              : 'hiw-slide-right'

            return (
              <div
                key={number}
                className={`relative bg-white rounded-2xl border border-gray-100 shadow-sm p-8 flex flex-col items-start
                  hover:-translate-y-1 hover:shadow-lg transition-all duration-200 ${slideClass} ${inView ? 'hiw-visible' : ''}`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                {/* Icon with bounce on entry */}
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#635BFF]/10 text-[#635BFF] mb-5
                    ${inView ? 'hiw-icon-bounce' : ''}`}
                  style={{ animationDelay: `${i * 150 + 450}ms` }}
                >
                  <Icon className="h-6 w-6" />
                </div>

                {/* Step number */}
                <span className="text-4xl font-extrabold text-[#635BFF]/20 mb-3 leading-none tabular-nums">
                  {inView ? (
                    <CountUp target={displayNum} delay={i * 150} />
                  ) : '00'}
                </span>

                <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
                <p className="text-gray-600 leading-relaxed">{description}</p>

                {/* Arrow indicator */}
                {i < 2 && (
                  <div className="hidden md:flex absolute -right-5 top-10 z-10 w-10 h-10 rounded-full bg-white border border-gray-100 shadow-sm items-center justify-center">
                    <span className="text-[#635BFF] font-bold text-lg leading-none">›</span>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function CountUp({ target, delay }: { target: number; delay: number }) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    const t = setTimeout(() => {
      let current = 0
      const step = () => {
        current += 1
        setValue(current)
        if (current < target) setTimeout(step, 120)
      }
      step()
    }, delay + 150)
    return () => clearTimeout(t)
  }, [target, delay])

  return <>{String(value).padStart(2, '0')}</>
}

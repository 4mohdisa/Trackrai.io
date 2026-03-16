'use client'

import { useEffect } from 'react'
import { trackScrollDepth } from '@/lib/analytics'

const TRACKED_SECTIONS = [
  'hero',
  'features',
  'mobile_app_1',
  'analytics',
  'recurring',
  'categories',
  'merchants',
  'reports',
  'mobile_app_2',
  'testimonials',
  'pricing',
  'faq',
  'final_cta',
]

export function useScrollTracking() {
  useEffect(() => {
    const fired = new Set<string>()

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const sectionId = entry.target.getAttribute('data-track-section')
          if (!sectionId) continue

          const ratio = entry.intersectionRatio

          const key50 = `${sectionId}:50`
          const key100 = `${sectionId}:100`

          if (ratio >= 0.5 && !fired.has(key50)) {
            fired.add(key50)
            trackScrollDepth(sectionId, 50)
          }
          if (ratio >= 0.95 && !fired.has(key100)) {
            fired.add(key100)
            trackScrollDepth(sectionId, 100)
          }
        }
      },
      { threshold: [0, 0.25, 0.5, 0.75, 0.95, 1.0] }
    )

    const sections = TRACKED_SECTIONS
      .map((id) => document.querySelector(`[data-track-section="${id}"]`))
      .filter(Boolean) as Element[]

    for (const el of sections) {
      observer.observe(el)
    }

    return () => observer.disconnect()
  }, [])
}

type WindowWithTracking = typeof window & {
  gtag?: (...args: unknown[]) => void
  fbq?: (...args: unknown[]) => void
  ttq?: {
    track: (event: string, params?: Record<string, unknown>) => void
  }
}

export function trackSignupClick(source: string) {
  if (typeof window === 'undefined') return
  const w = window as WindowWithTracking
  w.gtag?.('event', 'sign_up_click', { event_category: 'cta', source })
  w.fbq?.('track', 'Lead')
  w.ttq?.track('ClickButton')
}

export function trackSigninClick(source: string) {
  if (typeof window === 'undefined') return
  const w = window as WindowWithTracking
  w.gtag?.('event', 'sign_in_click', { event_category: 'cta', source })
}

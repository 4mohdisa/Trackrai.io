type WindowWithTracking = typeof window & {
  gtag?: (...args: unknown[]) => void
  fbq?: (...args: unknown[]) => void
  ttq?: {
    track: (event: string, params?: Record<string, unknown>) => void
    page?: () => void
  }
  posthog?: {
    capture: (event: string, properties?: Record<string, unknown>) => void
  }
  twq?: (...args: unknown[]) => void
}

function getW(): WindowWithTracking | null {
  if (typeof window === 'undefined') return null
  return window as WindowWithTracking
}

export function trackPageView(url: string, title: string) {
  try {
    const w = getW()
    if (!w) return
    if (process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) {
      w.gtag?.('event', 'page_view', { page_location: url, page_title: title })
    }
    if (process.env.NEXT_PUBLIC_POSTHOG_KEY) {
      w.posthog?.capture('$pageview', { $current_url: url, title })
    }
  } catch {
    // analytics must never crash the app
  }
}

export function trackEvent(eventName: string, properties?: Record<string, unknown>) {
  try {
    const w = getW()
    if (!w) return
    if (process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) {
      w.gtag?.('event', eventName, properties)
    }
    if (process.env.NEXT_PUBLIC_POSTHOG_KEY) {
      w.posthog?.capture(eventName, properties)
    }
  } catch {
    // analytics must never crash the app
  }
}

export function trackCTAClick(ctaName: string, location: string) {
  trackEvent('cta_click', { cta_name: ctaName, location, timestamp: Date.now() })
  try {
    const w = getW()
    if (!w) return
    if (process.env.NEXT_PUBLIC_META_PIXEL_ID) {
      w.fbq?.('track', 'Lead')
    }
    if (process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID) {
      w.ttq?.track('ClickButton')
    }
    if (process.env.NEXT_PUBLIC_TWITTER_PIXEL_ID) {
      w.twq?.('event', 'tw-conversion', { value: null, currency: null })
    }
  } catch {
    // analytics must never crash the app
  }
}

export function trackFormSubmit(formName: string, success: boolean) {
  trackEvent('form_submit', { form_name: formName, success, timestamp: Date.now() })
  if (success) {
    try {
      const w = getW()
      if (!w) return
      if (process.env.NEXT_PUBLIC_META_PIXEL_ID) {
        w.fbq?.('track', 'CompleteRegistration')
      }
    } catch {
      // analytics must never crash the app
    }
  }
}

export function trackScrollDepth(section: string, percentage: number) {
  trackEvent('scroll_depth', { section, depth_percent: percentage })
}

export function trackAppStoreClick(store: 'app_store' | 'google_play') {
  trackEvent('app_store_click', { store, timestamp: Date.now() })
  try {
    const w = getW()
    if (!w) return
    if (process.env.NEXT_PUBLIC_META_PIXEL_ID) {
      w.fbq?.('track', 'Lead')
    }
    if (process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID) {
      w.ttq?.track('ClickButton')
    }
  } catch {
    // analytics must never crash the app
  }
}

// Legacy compatibility — used by existing components
export function trackSignupClick(source: string) {
  trackCTAClick('start_free', source)
}

export function trackSigninClick(source: string) {
  trackEvent('cta_click', { cta_name: 'sign_in', location: source, timestamp: Date.now() })
}

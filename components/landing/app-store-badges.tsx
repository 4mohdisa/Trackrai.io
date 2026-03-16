'use client'

import Image from 'next/image'
import { trackAppStoreClick } from '@/lib/analytics'

export function AppStoreBadges() {
  return (
    <div className="flex flex-wrap gap-3">
      {/* TODO: update href to real App Store link when available */}
      <a
        href="#"
        onClick={(e) => { e.preventDefault(); trackAppStoreClick('app_store') }}
        aria-label="Download on the App Store"
        className="opacity-90 hover:opacity-100 transition-opacity"
      >
        <Image
          src="/images/app-store-badge.svg"
          alt="Download on the App Store"
          width={140}
          height={42}
          priority={false}
        />
      </a>
      {/* TODO: update href to real Google Play link when available */}
      <a
        href="#"
        onClick={(e) => { e.preventDefault(); trackAppStoreClick('google_play') }}
        aria-label="Get it on Google Play"
        className="opacity-90 hover:opacity-100 transition-opacity"
      >
        <Image
          src="/images/google-play-badge.svg"
          alt="Get it on Google Play"
          width={140}
          height={42}
          priority={false}
        />
      </a>
    </div>
  )
}

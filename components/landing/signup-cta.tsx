'use client'

import { trackSignupClick } from '@/lib/analytics'
import { SIGN_UP_URL } from '@/constants/site'

interface SignupCTAProps {
  children: React.ReactNode
  source?: string
  className?: string
}

export function SignupCTA({ children, source = 'homepage', className }: SignupCTAProps) {
  return (
    <a
      href={SIGN_UP_URL}
      onClick={() => trackSignupClick(source)}
      className={className}
    >
      {children}
    </a>
  )
}

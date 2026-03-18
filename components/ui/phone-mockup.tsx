import React from 'react'

interface PhoneMockupProps {
  children: React.ReactNode
  className?: string
  /** Slight clockwise rotation (3°) for dynamic visual angle */
  tilt?: boolean
  /** Outer width in pixels — everything scales proportionally */
  width?: number
}

/**
 * Reusable iPhone-style phone mockup with Dynamic Island.
 * The Dynamic Island pill is absolutely positioned over the screen content.
 * Children render as the screen content, starting from the top of the screen.
 */
export function PhoneMockup({ children, className = '', tilt = false, width = 288 }: PhoneMockupProps) {
  const outerRadius = Math.round(width * 0.14)   // 40px at w=288
  const innerRadius = Math.round(width * 0.105)  // 30px at w=288
  const padding     = Math.round(width * 0.042)  // 12px at w=288
  // Thinner Dynamic Island — more accurate to real iPhone 14/15 Pro
  const diWidth     = Math.round(width * 0.347)  // ~100px at w=288 (was 121px)
  const diHeight    = Math.round(width * 0.090)  // ~26px at w=288 (was 34px)
  const diTop       = Math.round(width * 0.038)  // ~11px at w=288

  return (
    <div
      className={`relative ${className}`}
      style={{
        width,
        transform: tilt ? 'rotate(3deg)' : undefined,
      }}
    >
      {/* Outer bezel */}
      <div
        className="bg-gray-900 shadow-2xl"
        style={{ borderRadius: outerRadius, padding }}
      >
        {/* Inner shell */}
        <div
          className="bg-gray-800 overflow-hidden"
          style={{ borderRadius: innerRadius }}
        >
          {/* Screen area */}
          <div className="bg-white relative">
            {/* Dynamic Island pill */}
            <div
              className="absolute z-20 bg-black"
              style={{
                width: diWidth,
                height: diHeight,
                borderRadius: 999,
                top: diTop,
                left: '50%',
                transform: 'translateX(-50%)',
              }}
            />
            {/* Screen content — caller is responsible for top padding to clear DI */}
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'TrackrAI — AI-Powered Personal Finance Tracker'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0B0F1A',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Purple ambient glow — top left */}
        <div
          style={{
            position: 'absolute',
            top: -160,
            left: -160,
            width: 560,
            height: 560,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(99,91,255,0.28) 0%, rgba(99,91,255,0.08) 50%, transparent 70%)',
          }}
        />
        {/* Cyan ambient glow — bottom right */}
        <div
          style={{
            position: 'absolute',
            bottom: -120,
            right: -120,
            width: 480,
            height: 480,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(0,212,255,0.18) 0%, rgba(0,212,255,0.05) 50%, transparent 70%)',
          }}
        />
        {/* Subtle grid lines overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(99,91,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(99,91,255,0.04) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
            gap: 0,
          }}
        >
          {/* T icon badge */}
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 18,
              background: 'linear-gradient(135deg, #295EFF 0%, #658BFF 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 28,
              boxShadow: '0 0 40px rgba(41,94,255,0.45)',
            }}
          >
            <span style={{ color: '#fff', fontSize: 32, fontWeight: 800 }}>T</span>
          </div>

          {/* Wordmark */}
          <div
            style={{
              fontSize: 88,
              fontWeight: 800,
              color: '#ffffff',
              letterSpacing: '-3px',
              lineHeight: 1,
              marginBottom: 24,
            }}
          >
            TrackrAI
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: 34,
              fontWeight: 500,
              color: 'rgba(255,255,255,0.80)',
              textAlign: 'center',
              maxWidth: 680,
              letterSpacing: '-0.5px',
              lineHeight: 1.3,
              marginBottom: 18,
            }}
          >
            Track your money with AI.
          </div>

          {/* Sub-tagline */}
          <div
            style={{
              fontSize: 20,
              color: 'rgba(255,255,255,0.40)',
              textAlign: 'center',
              maxWidth: 540,
              marginBottom: 44,
              lineHeight: 1.5,
            }}
          >
            AI-powered personal finance tracking
          </div>

          {/* Domain pill */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '10px 26px',
              background: 'rgba(99,91,255,0.15)',
              borderRadius: 100,
              border: '1px solid rgba(99,91,255,0.35)',
              color: 'rgba(255,255,255,0.50)',
              fontSize: 17,
              letterSpacing: '0.2px',
            }}
          >
            trackrai.io
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  )
}

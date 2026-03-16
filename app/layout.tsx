import type { Metadata } from 'next'
import Script from 'next/script'
import { Geist } from 'next/font/google'
import { Toaster } from 'sonner'
import { LandingNavbar } from '@/components/landing/navbar'
import { LandingFooter } from '@/components/landing/footer'
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from '@/constants/site'
import './globals.css'

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'TrackrAI — AI-Powered Personal Finance Tracker',
    template: '%s | TrackrAI',
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'personal finance app',
    'AI expense tracker',
    'subscription tracker',
    'recurring transaction tracking',
    'merchant tracking',
    'financial reports',
    'AI categorisation',
    'transaction tracker',
    'spending analytics',
    'finance tracking',
    'CSV import finance',
    'TrackrAI',
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: 'TrackrAI — AI-Powered Personal Finance Tracker',
    description: SITE_DESCRIPTION,
    type: 'website',
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TrackrAI — AI-Powered Personal Finance Tracker',
    description: SITE_DESCRIPTION,
    site: '@trackrai',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID
  const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID
  const tiktokPixelId = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID

  return (
    <html lang="en" className={geist.variable}>
      <body className="min-h-screen bg-white antialiased">
        <LandingNavbar />
        <main>{children}</main>
        <LandingFooter />
        <Toaster position="top-right" richColors />

        {/* Google Analytics 4 */}
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}

        {/* Microsoft Clarity */}
        {clarityId && (
          <Script id="microsoft-clarity" strategy="afterInteractive">
            {`
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${clarityId}");
            `}
          </Script>
        )}

        {/* Meta Pixel */}
        {metaPixelId && (
          <>
            <Script id="meta-pixel" strategy="afterInteractive">
              {`
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${metaPixelId}');
                fbq('track', 'PageView');
              `}
            </Script>
            <noscript>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                height="1"
                width="1"
                style={{ display: 'none' }}
                src={`https://www.facebook.com/tr?id=${metaPixelId}&ev=PageView&noscript=1`}
                alt=""
              />
            </noscript>
          </>
        )}

        {/* TikTok Pixel */}
        {tiktokPixelId && (
          <Script id="tiktok-pixel" strategy="afterInteractive">
            {`
              !function (w, d, t) {
                w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];
                ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],
                ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};
                for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);
                ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},
                ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;
                ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._r=ttq._r||{},ttq._r[e]=n||{};
                if(!o){var a=document.createElement("script");a.async=!0,a.src=i+"?sdkid="+e+"&lib="+t;
                var s=document.getElementsByTagName("script")[0];s.parentNode.insertBefore(a,s)}};
                ttq.load('${tiktokPixelId}');
                ttq.page();
              }(window, document, 'ttq');
            `}
          </Script>
        )}
      </body>
    </html>
  )
}

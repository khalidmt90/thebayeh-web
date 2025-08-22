"use client"
import Script from 'next/script'

// Lightweight analytics loader placeholder (Phase 7 performance friendly)
export default function AnalyticsScript() {
  return (
    <>
      <Script
        id="perf-stub"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: 'window.__perfStubLoaded=Date.now();' }}
      />
    </>
  )
}

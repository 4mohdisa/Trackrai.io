import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type SupportPayload = {
  type: 'support'
  name: string
  email: string
  supportType: string
  subject: string
  message: string
}

type FeaturePayload = {
  type: 'feature'
  name?: string
  email?: string
  message: string
}

type ContactPayload = SupportPayload | FeaturePayload

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const SUPPORT_TYPES = [
  'general',
  'technical',
  'account',
  'feature',
  'bug',
  'security',
  'other',
] as const

const SUPPORT_TYPE_LABELS: Record<string, string> = {
  general: 'General Inquiry',
  technical: 'Technical Issue',
  account: 'Account & Billing',
  feature: 'Feature Request',
  bug: 'Bug Report',
  security: 'Security Concern',
  other: 'Other',
}

// ---------------------------------------------------------------------------
// Validation helpers
// ---------------------------------------------------------------------------

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function isValidEmail(v: string): boolean {
  return EMAIL_RE.test(v)
}

function trimStr(v: unknown): string {
  return typeof v === 'string' ? v.trim() : ''
}

function validateSupport(body: Record<string, unknown>): SupportPayload | string {
  const name = trimStr(body.name)
  const email = trimStr(body.email)
  const supportType = trimStr(body.supportType)
  const subject = trimStr(body.subject)
  const message = trimStr(body.message)

  if (!name || name.length > 100) return 'Name is required (max 100 characters).'
  if (!email || !isValidEmail(email)) return 'A valid email address is required.'
  if (!SUPPORT_TYPES.includes(supportType as (typeof SUPPORT_TYPES)[number]))
    return 'A valid support type is required.'
  if (!subject || subject.length < 3 || subject.length > 200)
    return 'Subject is required (3–200 characters).'
  if (!message || message.length < 10 || message.length > 5000)
    return 'Message is required (10–5000 characters).'

  return { type: 'support', name, email, supportType, subject, message }
}

function validateFeature(body: Record<string, unknown>): FeaturePayload | string {
  const message = trimStr(body.message)
  const name = trimStr(body.name) || undefined
  const email = trimStr(body.email) || undefined

  if (!message || message.length < 10 || message.length > 3000)
    return 'Please describe your feature request (10–3000 characters).'
  if (name && name.length > 100) return 'Name must be 100 characters or fewer.'
  if (email && !isValidEmail(email)) return 'If provided, email must be a valid address.'

  return { type: 'feature', name, email, message }
}

// ---------------------------------------------------------------------------
// Email HTML builders
// ---------------------------------------------------------------------------

function supportEmailHtml(d: SupportPayload): string {
  const supportLabel = SUPPORT_TYPE_LABELS[d.supportType] ?? d.supportType
  const safeMessage = d.message.replace(/</g, '&lt;').replace(/>/g, '&gt;')

  return `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8" /></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <div style="max-width:600px;margin:32px auto;">
    <div style="background:linear-gradient(135deg,#295EFF,#658BFF);padding:28px 32px;border-radius:12px 12px 0 0;">
      <p style="margin:0 0 4px 0;color:rgba(255,255,255,0.7);font-size:13px;letter-spacing:0.05em;text-transform:uppercase;">TrackrAI Support</p>
      <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;">New Support Request</h1>
    </div>
    <div style="background:#ffffff;padding:28px 32px;border:1px solid #e5e7eb;border-top:none;">
      <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
        <tr>
          <td style="padding:8px 0;color:#6b7280;font-size:13px;font-weight:600;width:130px;vertical-align:top;">FROM</td>
          <td style="padding:8px 0;color:#111827;font-size:14px;">${d.name} &lt;${d.email}&gt;</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#6b7280;font-size:13px;font-weight:600;vertical-align:top;">SUPPORT TYPE</td>
          <td style="padding:8px 0;">
            <span style="background:#dbeafe;color:#295EFF;padding:3px 10px;border-radius:100px;font-size:12px;font-weight:600;">${supportLabel}</span>
          </td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#6b7280;font-size:13px;font-weight:600;vertical-align:top;">SUBJECT</td>
          <td style="padding:8px 0;color:#111827;font-size:14px;">${d.subject}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#6b7280;font-size:13px;font-weight:600;vertical-align:top;">SOURCE</td>
          <td style="padding:8px 0;color:#6b7280;font-size:13px;">trackrai.io/help</td>
        </tr>
      </table>
      <div style="border-top:1px solid #e5e7eb;padding-top:24px;">
        <p style="margin:0 0 12px 0;color:#6b7280;font-size:13px;font-weight:600;letter-spacing:0.05em;text-transform:uppercase;">Message</p>
        <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:16px 20px;color:#374151;font-size:15px;line-height:1.7;white-space:pre-wrap;">${safeMessage}</div>
      </div>
    </div>
    <div style="background:#f9fafb;padding:16px 32px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px;">
      <p style="margin:0;color:#9ca3af;font-size:12px;text-align:center;">Reply directly to this email to respond to ${d.name}.</p>
    </div>
  </div>
</body>
</html>`
}

function featureEmailHtml(d: FeaturePayload): string {
  const safeMessage = d.message.replace(/</g, '&lt;').replace(/>/g, '&gt;')
  const fromLine = d.name || d.email
    ? `${d.name ?? 'Anonymous'}${d.email ? ` &lt;${d.email}&gt;` : ''}`
    : 'Anonymous'

  return `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8" /></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <div style="max-width:600px;margin:32px auto;">
    <div style="background:linear-gradient(135deg,#059669,#047857);padding:28px 32px;border-radius:12px 12px 0 0;">
      <p style="margin:0 0 4px 0;color:rgba(255,255,255,0.7);font-size:13px;letter-spacing:0.05em;text-transform:uppercase;">TrackrAI Product</p>
      <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;">New Feature Request</h1>
    </div>
    <div style="background:#ffffff;padding:28px 32px;border:1px solid #e5e7eb;border-top:none;">
      <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
        <tr>
          <td style="padding:8px 0;color:#6b7280;font-size:13px;font-weight:600;width:130px;vertical-align:top;">FROM</td>
          <td style="padding:8px 0;color:#111827;font-size:14px;">${fromLine}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#6b7280;font-size:13px;font-weight:600;vertical-align:top;">SOURCE</td>
          <td style="padding:8px 0;color:#6b7280;font-size:13px;">trackrai.io/help</td>
        </tr>
      </table>
      <div style="border-top:1px solid #e5e7eb;padding-top:24px;">
        <p style="margin:0 0 12px 0;color:#6b7280;font-size:13px;font-weight:600;letter-spacing:0.05em;text-transform:uppercase;">Suggestion</p>
        <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:16px 20px;color:#374151;font-size:15px;line-height:1.7;white-space:pre-wrap;">${safeMessage}</div>
      </div>
    </div>
    <div style="background:#f9fafb;padding:16px 32px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px;">
      <p style="margin:0;color:#9ca3af;font-size:12px;text-align:center;">Sent from trackrai.io/help</p>
    </div>
  </div>
</body>
</html>`
}

// ---------------------------------------------------------------------------
// Route handler
// ---------------------------------------------------------------------------

export async function POST(req: NextRequest) {
  // Rate-limiting hint via header (actual rate limiting should be done at infra level)
  const contentLength = req.headers.get('content-length')
  if (contentLength && parseInt(contentLength) > 20_000) {
    return NextResponse.json({ error: 'Request too large.' }, { status: 413 })
  }

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 })
  }

  const msgType = trimStr(body.type)
  if (msgType !== 'support' && msgType !== 'feature') {
    return NextResponse.json({ error: 'Invalid message type.' }, { status: 400 })
  }

  // Validate
  const validated =
    msgType === 'support' ? validateSupport(body) : validateFeature(body)

  if (typeof validated === 'string') {
    return NextResponse.json({ error: validated }, { status: 422 })
  }

  const payload = validated as ContactPayload

  // Check env vars
  const apiKey = process.env.RESEND_API_KEY
  const supportTo = process.env.SUPPORT_EMAIL_TO
  const featureTo = process.env.FEATURE_REQUEST_EMAIL_TO
  const emailFrom = process.env.EMAIL_FROM

  if (!apiKey || !supportTo || !featureTo || !emailFrom) {
    console.error('[contact] Missing required env vars for Resend')
    return NextResponse.json(
      { error: 'Email service is not configured. Please try again later.' },
      { status: 503 }
    )
  }

  const resend = new Resend(apiKey)

  try {
    if (payload.type === 'support') {
      const supportLabel = SUPPORT_TYPE_LABELS[payload.supportType] ?? payload.supportType
      await resend.emails.send({
        from: emailFrom,
        to: supportTo,
        replyTo: payload.email,
        subject: `[TrackrAI Support] ${supportLabel}: ${payload.subject}`,
        html: supportEmailHtml(payload),
      })
    } else {
      await resend.emails.send({
        from: emailFrom,
        to: featureTo,
        ...(payload.email ? { replyTo: payload.email } : {}),
        subject: `[TrackrAI Feature Request] ${payload.message.slice(0, 60)}${payload.message.length > 60 ? '…' : ''}`,
        html: featureEmailHtml(payload),
      })
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err) {
    console.error('[contact] Resend error:', err)
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    )
  }
}

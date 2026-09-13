'use client'

import { useState, type FormEvent } from 'react'

type FormState = 'idle' | 'sending' | 'success' | 'error'

export function ContactForm() {
  const [state, setState] = useState<FormState>('idle')

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)

    // A small honeypot. Real deployments should also add rate limiting at the edge.
    if (data.get('website')) {
      setState('success')
      return
    }

    setState('sending')

    try {
      const response = await fetch('/api/contact-messages', {
        body: JSON.stringify({
          email: data.get('email'),
          message: data.get('message'),
          name: data.get('name'),
          subject: data.get('subject'),
        }),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
      })

      if (response.ok) {
        form.reset()
        setState('success')
      } else {
        setState('error')
      }
    } catch {
      setState('error')
    }
  }

  return (
    <form className="dispatch-form" onSubmit={submit}>
      <label className="form-field">
        Your name
        <input name="name" placeholder="Clark Kent, Daily Planet…" required />
      </label>
      <label className="form-field">
        Email address
        <input name="email" placeholder="you@example.com" required type="email" />
      </label>
      <label className="form-field">
        Subject
        <input name="subject" placeholder="I need SEO help!" required />
      </label>
      <label aria-hidden="true" className="honeypot">
        Website
        <input autoComplete="off" name="website" tabIndex={-1} />
      </label>
      <label className="form-field">
        Your message
        <textarea
          name="message"
          placeholder="Tell me about your project, goals, and current challenges…"
          required
          rows={5}
        />
      </label>
      <div className="form-action">
        <button className="submit-btn" disabled={state === 'sending'} type="submit">
          {state === 'sending' ? 'Sending…' : 'Send dispatch!'}
        </button>
        <p aria-live="polite">
          {state === 'success' && 'Dispatch received. William will be in touch.'}
          {state === 'error' && 'The dispatch failed. Please email William directly.'}
        </p>
      </div>
    </form>
  )
}

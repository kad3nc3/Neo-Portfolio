import { useState } from 'react'
import { ArrowUpRight, Send, CheckCircle2 } from 'lucide-react'

const initialForm = {
  name: '',
  email: '',
  subject: '',
  message: '',
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function buildMailtoUrl({ name, email, subject, message }) {
  const body = [
    `Name: ${name}`,
    `Email: ${email}`,
    '',
    message,
  ].join('\n')

  return (
    `mailto:Neojedrick@gmail.com` +
    `?subject=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(body)}`
  )
}

export function ContactForm() {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState('idle')
  const [errors, setErrors] = useState({})

  const update = ({ target }) => {
    setForm((current) => ({
      ...current,
      [target.name]: target.value,
    }))

    if (status !== 'idle') {
      setStatus('idle')
    }

    if (errors[target.name]) {
      setErrors((current) => ({
        ...current,
        [target.name]: '',
      }))
    }
  }

  const submit = (event) => {
    event.preventDefault()

    const name = form.name.trim()
    const email = form.email.trim()
    const subject = form.subject.trim()
    const message = form.message.trim()
    const nextErrors = {}

    if (!name) {
      nextErrors.name = 'Please enter your name.'
    }

    if (!email) {
      nextErrors.email = 'Please enter your email address.'
    } else if (!emailPattern.test(email)) {
      nextErrors.email = 'Enter a valid email address, such as you@example.com.'
    }

    if (!subject) {
      nextErrors.subject = 'Please enter a subject.'
    }

    if (message.length < 10) {
      nextErrors.message = 'Message must be at least 10 characters.'
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      setStatus('error')
      return
    }

    setErrors({})

    window.location.href = buildMailtoUrl({
      name,
      email,
      subject,
      message,
    })

    setStatus('ready')
  }

  return (
    <form
      onSubmit={submit}
      className="panel-card p-6 sm:p-8"
      noValidate
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="field-label">
          Name
          <input
            className="field-input"
            name="name"
            type="text"
            placeholder="Your name"
            value={form.name}
            onChange={update}
            autoComplete="name"
            maxLength={80}
            aria-invalid={Boolean(errors.name)}
            required
          />
        </label>

        <label className="field-label">
          Email
          <input
            className="field-input"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={update}
            autoComplete="email"
            maxLength={254}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'contact-email-error' : undefined}
            required
          />
          {errors.email && (
            <span
              id="contact-email-error"
              className="mt-2 block text-xs font-medium text-red-300"
            >
              {errors.email}
            </span>
          )}
        </label>
      </div>

      <label className="field-label mt-5">
        Subject
        <input
          className="field-input"
          name="subject"
          type="text"
          placeholder="What would you like to discuss?"
          value={form.subject}
          onChange={update}
          maxLength={120}
          aria-invalid={Boolean(errors.subject)}
          required
        />
      </label>

      <label className="field-label mt-5">
        Message
        <textarea
          className="field-input min-h-36 resize-y"
          name="message"
          placeholder="Write your message here..."
          value={form.message}
          onChange={update}
          minLength={10}
          maxLength={2000}
          aria-invalid={Boolean(errors.message)}
          required
        />
      </label>

      <div className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          className="button-primary"
          type="submit"
        >
          <Send size={17} />
          Send message
        </button>

        <a
          className="inline-flex items-center gap-1.5 text-sm text-mist transition-colors hover:text-white"
          href="mailto:Neojedrick@gmail.com"
        >
          Or email me directly
          <ArrowUpRight size={15} />
        </a>
      </div>

      {status === 'ready' && (
        <div
          className="mt-5 flex items-start gap-3 rounded-xl border border-teal/30 bg-teal/10 px-4 py-3 text-sm text-teal"
          role="status"
        >
          <CheckCircle2
            size={18}
            className="mt-0.5 shrink-0"
          />

          <div>
            <p className="font-medium">
              Your message awaits!
            </p>

            <p className="mt-1 text-teal/80">
              Your email application should open with the message
              prepared. Press Send to deliver it.
            </p>
          </div>
        </div>
      )}

      {status === 'error' && (
        <p
          className="mt-5 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-300"
          role="alert"
        >
          Please check the highlighted fields before sending your message.
        </p>
      )}
    </form>
  )
}

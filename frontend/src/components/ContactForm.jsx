import { useState } from 'react'
import { ArrowUpRight, Send, CheckCircle2 } from 'lucide-react'

const initialForm = {
  name: '',
  email: '',
  subject: '',
  message: '',
}

export function ContactForm() {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState('idle')

  const update = ({ target }) => {
    setForm((current) => ({
      ...current,
      [target.name]: target.value,
    }))

    // Hide the previous status when the user edits the form again.
    if (status !== 'idle') {
      setStatus('idle')
    }
  }

  const submit = (event) => {
    event.preventDefault()

    const name = form.name.trim()
    const email = form.email.trim()
    const subject = form.subject.trim()
    const message = form.message.trim()

    if (!name || !email || !subject || !message) {
      setStatus('error')
      return
    }

    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      '',
      message,
    ].join('\n')

    const mailtoUrl =
      `mailto:Neojedrick@gmail.com` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`

    // Trigger the user's configured mail application.
    window.location.href = mailtoUrl

    // We can confirm that the mail client was requested,
    // but we cannot know whether the user actually sent the email.
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
            required
          />
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
              Your Email Awaits...
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
          Please complete all fields before sending your message.
        </p>
      )}
    </form>
  )
}
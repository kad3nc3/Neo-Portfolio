import { useState } from 'react'
import { ArrowUpRight, Send } from 'lucide-react'

const initialForm = {
  name: '',
  email: '',
  subject: '',
  message: '',
  website: '',
}

export function ContactForm() {
  const [form, setForm] = useState(initialForm)

  const update = ({ target }) => {
    setForm((current) => ({
      ...current,
      [target.name]: target.value,
    }))
  }

  const submit = (event) => {
    event.preventDefault()

    if (form.website) {
      return
    }

    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      '',
      form.message,
    ].join('\n')

    const gmailUrl =
      `https://mail.google.com/mail/?view=cm&fs=1` +
      `&to=${encodeURIComponent('Neojedrick@gmail.com')}` +
      `&su=${encodeURIComponent(form.subject)}` +
      `&body=${encodeURIComponent(body)}`

    window.open(gmailUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <form onSubmit={submit} className="panel-card p-6 sm:p-8" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="field-label">
          Name
          <input
            className="field-input"
            name="name"
            value={form.name}
            onChange={update}
            autoComplete="name"
            maxLength="80"
            required
          />
        </label>

        <label className="field-label">
          Email
          <input
            className="field-input"
            name="email"
            type="email"
            value={form.email}
            onChange={update}
            autoComplete="email"
            maxLength="254"
            required
          />
        </label>
      </div>

      <label className="field-label mt-5">
        Subject
        <input
          className="field-input"
          name="subject"
          value={form.subject}
          onChange={update}
          maxLength="120"
          required
        />
      </label>

      <label className="field-label mt-5">
        Message
        <textarea
          className="field-input min-h-36 resize-y"
          name="message"
          value={form.message}
          onChange={update}
          minLength="10"
          maxLength="2000"
          required
        />
      </label>

      <label className="absolute -left-[9999px]" aria-hidden="true">
        Website
        <input
          name="website"
          value={form.website}
          onChange={update}
          tabIndex="-1"
          autoComplete="off"
        />
      </label>

      <div className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button className="button-primary" type="submit">
          <Send size={17} />
          Send message
        </button>

        <a
          className="inline-flex items-center gap-1.5 text-sm text-mist hover:text-white"
          href="https://mail.google.com/mail/?view=cm&fs=1&to=Neojedrick@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Or email me directly <ArrowUpRight size={15} />
        </a>
      </div>
    </form>
  )
}
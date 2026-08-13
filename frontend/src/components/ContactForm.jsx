import { useState } from 'react'
import { ArrowUpRight, LoaderCircle, Send } from 'lucide-react'

const initialForm = {
  name: '',
  email: '',
  subject: '',
  message: '',
  website: '',
}

export function ContactForm() {
  const [form, setForm] = useState(initialForm)
  const [state, setState] = useState({ status: 'idle', message: '' })

  const update = ({ target }) => {
    setForm((current) => ({ ...current, [target.name]: target.value }))
  }

  const submit = async (event) => {
    event.preventDefault()
    setState({ status: 'loading', message: '' })
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const result = await response.json()
      if (!response.ok) {
        const fieldMessage = result.errors && Object.values(result.errors)[0]
        throw new Error(fieldMessage || result.message || 'Unable to send your message.')
      }
      setState({ status: 'success', message: result.message })
      setForm(initialForm)
    } catch (error) {
      setState({ status: 'error', message: error.message })
    }
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
        <input name="website" value={form.website} onChange={update} tabIndex="-1" autoComplete="off" />
      </label>

      <div className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button className="button-primary" type="submit" disabled={state.status === 'loading'}>
          {state.status === 'loading' ? <LoaderCircle className="animate-spin" size={17} /> : <Send size={17} />}
          {state.status === 'loading' ? 'Sending…' : 'Send message'}
        </button>
        <a className="inline-flex items-center gap-1.5 text-sm text-mist hover:text-white" href="mailto:Neojedrick@gmail.com">
          Or email me directly <ArrowUpRight size={15} />
        </a>
      </div>

      {state.status === 'success' && (
        <p role="status" className="mt-5 rounded-xl border border-teal/30 bg-teal/10 px-4 py-3 text-sm text-teal">
          {state.message}
        </p>
      )}
      {state.status === 'error' && (
        <p role="alert" className="mt-5 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200">
          {state.message}
        </p>
      )}
    </form>
  )
}


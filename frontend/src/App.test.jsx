import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'

import App from './App'
import { buildMailtoUrl } from './components/ContactForm'


describe('portfolio', () => {
  beforeEach(() => {
    global.fetch = vi.fn()
  })

  afterEach(() => cleanup())

  test('renders recruiter-focused sections and contact links', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: /Neo Jedrick Belolo/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'About me' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Skills' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Featured projects' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Education' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Contact' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /View resume/i })).toHaveAttribute(
      'href',
      '/Neo_Jedrick_Belolo_Resume.pdf',
    )
    expect(screen.getByRole('link', { name: /Call Neo/i })).toHaveAttribute(
      'href',
      'tel:+639206130855',
    )
  })

  test('keeps the selected project immediately after the home section', () => {
    render(<App />)

    const homeSection = document.querySelector('#home')
    const projectsSection = document.querySelector('#projects')
    expect(homeSection?.nextElementSibling).toBe(projectsSection)
    expect(screen.getByText('Two projects, documented clearly')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /R\.M Mendezabal Construction Supplies Trading/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Flexsol Storage Corp\. Website/i })).toBeInTheDocument()
    expect(screen.getByText(/React\.js, Python, HTML, CSS/)).toBeInTheDocument()
    expect(screen.getByText(/VS Code, Git, GitHub, Vercel/)).toBeInTheDocument()
    expect(screen.getAllByTestId('replay-section')).toHaveLength(6)
    expect(screen.getAllByRole('button', { name: /Next .* screenshot/ })).toHaveLength(2)
    expect(screen.getAllByRole('button', { name: /Previous .* screenshot/ })).toHaveLength(2)
  })

  test('builds an encoded mailto URL without exposing raw form values', () => {
    const url = buildMailtoUrl({
      name: 'Hiring Manager',
      email: 'manager@example.com',
      subject: 'Internship & web work',
      message: 'Let us discuss an internship role.\nSecond line.',
    })

    expect(url).toContain('mailto:Neojedrick@gmail.com')
    expect(url).toContain('subject=Internship%20%26%20web%20work')
    expect(url).toContain('manager%40example.com')
    expect(url).not.toContain('Internship & web work')
  })

  test('rejects an invalid email such as hi and keeps the form on the page', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByLabelText('Name'), 'Hiring Manager')
    await user.type(screen.getByLabelText('Email'), 'hi')
    await user.type(screen.getByLabelText('Subject'), 'Internship')
    await user.type(screen.getByLabelText('Message'), 'Let us discuss an internship role.')
    await user.click(screen.getByRole('button', { name: 'Send message' }))

    expect(await screen.findByText(/valid email address/i)).toBeInTheDocument()
    expect(screen.getByRole('alert')).toHaveTextContent(/highlighted fields/i)
    expect(screen.getByDisplayValue('hi')).toHaveAttribute('aria-invalid', 'true')
  })

  test('toggles the profile portrait only after an intentional click or tap', async () => {
    const user = userEvent.setup()
    render(<App />)

    const profile = screen.getByRole('button', { name: /toggle profile portrait/i })
    expect(profile).toHaveAttribute('data-profile-state', 'locked-character')
    expect(profile).toHaveAttribute('aria-pressed', 'false')

    await user.hover(profile)
    expect(profile).toHaveAttribute('data-profile-state', 'locked-character')

    await user.click(profile)
    expect(profile).toHaveAttribute('data-profile-state', 'locked-real')
    expect(profile).toHaveAttribute('aria-pressed', 'true')

    await user.unhover(profile)
    expect(profile).toHaveAttribute('data-profile-state', 'locked-real')
  })

  test('links the social profile icon to LinkedIn', () => {
    render(<App />)

    expect(screen.getByRole('link', { name: 'LinkedIn profile' })).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/neo-jedrick-belolo-5668093b5/',
    )
  })
})

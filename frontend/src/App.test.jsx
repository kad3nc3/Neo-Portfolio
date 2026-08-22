import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'

import App from './App'


describe('portfolio', () => {
  beforeEach(() => {
    global.fetch = vi.fn()
  })

  afterEach(() => cleanup())

  test('renders the recruiter-focused sections and profile links', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: /Neo Jedrick Belolo/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'About me' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Skills' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Featured project' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Education' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Contact' })).toBeInTheDocument()
    const githubLinks = screen.getAllByRole('link', { name: /GitHub profile/i })
    expect(githubLinks.length).toBeGreaterThan(0)
    githubLinks.forEach((link) => {
      expect(link).toHaveAttribute('href', 'https://github.com/kad3nc3')
    })
    expect(screen.getByRole('link', { name: /View resume/i })).toHaveAttribute(
      'href',
      '/Neo_Jedrick_Belolo_Resume.pdf',
    )
    expect(screen.getByRole('link', { name: /Call Neo/i })).toHaveAttribute(
      'href',
      'tel:+639206130855',
    )
  })

  test('renders the glass hero without the old terminal or grid and keeps Projects immediately after Home', () => {
    render(<App />)

    expect(screen.getByTestId('hero-glass-build')).toBeInTheDocument()
    expect(screen.getByText('PROFILE / SYSTEM')).toBeInTheDocument()
    expect(screen.getByText(/Building thoughtful interfaces and practical web experiences/i)).toBeInTheDocument()
    expect(screen.queryByText('developer.js')).toBeNull()
    expect(screen.queryAllByTestId('terminal-code-line')).toHaveLength(0)
    expect(screen.querySelector('.hero-grid')).toBeNull()
    expect(screen.querySelector('.orbit')).toBeNull()
    expect(screen.querySelector('.terminal-scan')).toBeNull()
    expect(screen.queryByTestId('terminal-orbit')).toBeNull()
    expect(screen.queryByTestId('terminal-orbit-node')).toBeNull()
    expect(screen.querySelector('.terminal-orbit')).toBeNull()

    const homeSection = document.querySelector('#home')
    const projectsSection = document.querySelector('#projects')
    expect(homeSection?.nextElementSibling).toBe(projectsSection)

    const navLinks = screen.getAllByRole('link')
    const navLabels = navLinks.map((link) => link.textContent?.trim()).filter(Boolean)
    expect(navLabels.slice(0, 3)).toEqual(['Home', 'Project', 'About'])
    expect(screen.getByAltText('Neo Jedrick Belolo primary profile avatar')).toHaveAttribute('src', '/profile-character.png')
    expect(screen.getByAltText('Neo Jedrick Belolo photo revealed on hover')).toHaveAttribute('src', '/profile.png')
    expect(screen.queryByText('Neo Belolo', { selector: 'span' })).not.toBeInTheDocument()
    expect(screen.getByText('More projects coming soon')).toBeInTheDocument()
    expect(screen.getByText('Vercel')).toBeInTheDocument()
    expect(screen.queryByText('Render')).toBeNull()
    const replaySections = screen.getAllByTestId('replay-section')
    expect(replaySections.length).toBeGreaterThanOrEqual(5)
    replaySections.forEach((section) => expect(section).toHaveAttribute('data-replay-on-scroll', 'true'))
  })

  test('submits the contact form and displays success', async () => {
    const user = userEvent.setup()
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => ({ ok: true, message: 'Message sent successfully.' }),
    })
    render(<App />)

    await user.type(screen.getByLabelText('Name'), 'Hiring Manager')
    await user.type(screen.getByLabelText('Email'), 'manager@example.com')
    await user.type(screen.getByLabelText('Subject'), 'Internship')
    await user.type(screen.getByLabelText('Message'), 'Let us discuss an internship role.')
    await user.click(screen.getByRole('button', { name: 'Send message' }))

    expect(global.fetch).toHaveBeenCalledWith(
      '/api/contact',
      expect.objectContaining({ method: 'POST' }),
    )
    expect(await screen.findByRole('status')).toHaveTextContent('Message sent successfully.')
  })

  test('shows the server error without clearing the form', async () => {
    const user = userEvent.setup()
    global.fetch.mockResolvedValue({
      ok: false,
      json: async () => ({
        ok: false,
        message: 'Message delivery failed. Please email Neo directly.',
      }),
    })
    render(<App />)

    await user.type(screen.getByLabelText('Name'), 'Hiring Manager')
    await user.type(screen.getByLabelText('Email'), 'manager@example.com')
    await user.type(screen.getByLabelText('Subject'), 'Internship')
    await user.type(screen.getByLabelText('Message'), 'Let us discuss an internship role.')
    await user.click(screen.getByRole('button', { name: 'Send message' }))

    expect(await screen.findByRole('alert')).toHaveTextContent('Message delivery failed')
    expect(screen.getByLabelText('Name')).toHaveValue('Hiring Manager')
  })
  test('profile previews the opposite portrait in both directions and clicks toggle the lock', async () => {
    const user = userEvent.setup()
    render(<App />)

    const profile = screen.getByRole('button', { name: /toggle profile portrait/i })

    expect(profile).toHaveAttribute('data-profile-state', 'locked-character')

    await user.hover(profile)
    expect(profile).toHaveAttribute('data-profile-state', 'preview-real')

    await user.click(profile)
    expect(profile).toHaveAttribute('data-profile-state', 'locked-real')

    await user.unhover(profile)
    await user.hover(profile)
    expect(profile).toHaveAttribute('data-profile-state', 'preview-character')

    await user.click(profile)
    expect(profile).toHaveAttribute('data-profile-state', 'locked-character')

    await user.unhover(profile)
    expect(profile).toHaveAttribute('data-profile-state', 'locked-character')
  })

})

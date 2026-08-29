import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'

const navigation = [
  ['Home', 'home'],
  ['Project', 'projects'],
  ['About', 'about'],
  ['Experience', 'experience'],
  ['Skills', 'skills'],
  ['Education', 'education'],
  ['Contact', 'contact'],
]

function ProfileSwitcher() {
  const [showReal, setShowReal] = useState(false)

  const handleToggle = () => {
    setShowReal((current) => !current)
  }

  return (
    <motion.button
      type="button"
      className={`profile-nav-frame profile-nav-swap ${showReal ? 'profile-nav-show-real' : 'profile-nav-show-character'}`}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.16 }}
      title="Click or tap to toggle portrait."
      aria-label="Toggle profile portrait"
      aria-pressed={showReal}
      data-profile-state={showReal ? 'locked-real' : 'locked-character'}
      onClick={handleToggle}
    >
      <span className="profile-nav-glint" aria-hidden="true" />
      <img src="/profile-character.png" alt="Neo Jedrick Belolo primary profile avatar" className="profile-nav-image profile-nav-image-character" />
      <img src="/profile.png" alt="Neo Jedrick Belolo profile photo revealed after toggling" className="profile-nav-image profile-nav-image-real" />
    </motion.button>
  )
}

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = navigation.map(([, id]) => document.getElementById(id)).filter(Boolean)
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id)),
      { rootMargin: '-40% 0px -45% 0px', threshold: 0 },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <header className={`fixed inset-x-0 top-3 z-50 px-3 transition duration-300 sm:top-4 sm:px-6 ${scrolled ? 'nav-scrolled' : ''}`}>
      <nav className="nav-glass-shell mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-7" aria-label="Primary navigation">
        <ProfileSwitcher />

        <div className="hidden items-center gap-7 lg:flex">
          {navigation.map(([label, id]) => (
            <a key={id} href={`#${id}`} className={`nav-link ${active === id ? 'text-white' : ''}`}>
              {label}
              {active === id && <motion.span layoutId="nav-active" className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-white" transition={{ type: 'spring', stiffness: 320, damping: 28 }} />}
            </a>
          ))}
        </div>

        <a href="#contact" className="button-secondary hidden sm:inline-flex lg:ml-4">
          Let&apos;s talk <span className="text-white/35">↗</span>
        </a>

        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-lg border border-white/15 text-white sm:hidden"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-navigation"
            className="nav-mobile-panel border-t border-white/10 bg-black/90 px-5 py-5 backdrop-blur-xl sm:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-1">
              {navigation.map(([label, id], index) => (
                <motion.a
                  key={id}
                  href={`#${id}`}
                  className={`rounded-xl px-4 py-3 text-sm font-medium ${active === id ? 'bg-white/[.06] text-white' : 'text-white/45'}`}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.035 }}
                >
                  {label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

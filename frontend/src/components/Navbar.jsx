import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'

const navigation = [
  ['Home', 'home'],
  ['Project', 'projects'],
  ['About', 'about'],
  ['Skills', 'skills'],
  ['Education', 'education'],
  ['Contact', 'contact'],
]

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
    <header className={`fixed inset-x-0 top-0 z-50 transition duration-500 ${scrolled ? 'nav-scrolled' : ''}`}>
      <nav className="mx-auto flex h-24 max-w-7xl items-center justify-between px-5 sm:px-8" aria-label="Primary navigation">
        <a href="#home" className="group flex items-center" onClick={() => setOpen(false)} aria-label="Return to home">
          <motion.span
            className="profile-nav-frame profile-nav-swap"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 320, damping: 22 }}
            title="Hover to reveal portrait"
          >
            <img src="/profile-character.png" alt="Neo Jedrick Belolo primary profile avatar" className="profile-nav-image profile-nav-image-character" />
            <img src="/profile.png" alt="Neo Jedrick Belolo photo revealed on hover" className="profile-nav-image profile-nav-image-real" />
          </motion.span>
        </a>

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
          className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white sm:hidden"
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
            className="border-t border-white/10 bg-black/90 px-5 py-5 backdrop-blur-xl sm:hidden"
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

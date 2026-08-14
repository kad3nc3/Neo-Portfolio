import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import {
  ArrowDown,
  ArrowUpRight,
  Braces,
  Code2,
  Download,
  Github,
  GraduationCap,
  Layers3,
  Mail,
  MapPin,
  Phone,
  ServerCog,
  Smartphone,
  Sparkles,
} from 'lucide-react'

import { ContactForm } from './components/ContactForm'
import { Navbar } from './components/Navbar'
import { Section } from './components/Section'

const skillGroups = [
  { icon: Code2, title: 'Frontend', skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind CSS'] },
  { icon: ServerCog, title: 'Backend', skills: ['Python', 'Flask', 'PHP fundamentals', 'REST APIs'] },
  { icon: Braces, title: 'Programming', skills: ['Java', 'C++', 'Object-oriented fundamentals'] },
  { icon: Smartphone, title: 'Mobile', skills: ['Dart', 'Flutter', 'Kotlin basics'] },
  { icon: Layers3, title: 'Data & tools', skills: ['MySQL basics', 'Git', 'GitHub', 'VS Code', 'Android Studio'] },
]

const heroText = {
  hidden: { opacity: 0, y: 26 },
  show: (index = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.14 * index, duration: 0.72, ease: [0.22, 1, 0.36, 1] },
  }),
}

function App() {
  const reduceMotion = useReducedMotion()
  const { scrollYProgress, scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 760], [0, reduceMotion ? 0 : -96])
  const heroScale = useTransform(scrollY, [0, 760], [1, reduceMotion ? 1 : 0.96])
  const heroOpacity = useTransform(scrollY, [0, 500], [1, reduceMotion ? 1 : 0.55])
  const cardX = useMotionValue(0)
  const cardY = useMotionValue(0)
  const springX = useSpring(cardX, { stiffness: 120, damping: 18, mass: 0.4 })
  const springY = useSpring(cardY, { stiffness: 120, damping: 18, mass: 0.4 })

  const handleCardMove = (event) => {
    if (reduceMotion || window.innerWidth < 1024) return
    const rect = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width - 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5
    cardX.set(x * 18)
    cardY.set(y * 18)
  }

  const resetCard = () => {
    cardX.set(0)
    cardY.set(0)
  }

  return (
    <div className="min-h-screen overflow-clip bg-ink text-white">
      <motion.div
        className="fixed left-0 right-0 top-0 z-[70] h-px origin-left bg-white"
        style={{ scaleX: scrollYProgress }}
      />
      <Navbar />

      <main>
        <section
          id="home"
          className="hero-section relative flex min-h-screen scroll-mt-24 items-center overflow-hidden px-5 pb-20 pt-28 sm:px-8"
        >
          <div className="hero-grid absolute inset-0" aria-hidden="true" />
          <div className="noise-overlay absolute inset-0" aria-hidden="true" />
          <div className="hero-vignette absolute inset-0" aria-hidden="true" />

          <motion.div className="ambient-orb ambient-orb-a" style={{ y: heroY }} aria-hidden="true" />
          <motion.div className="ambient-orb ambient-orb-b" style={{ y: useTransform(scrollY, [0, 760], [0, 90]) }} aria-hidden="true" />
          <div className="floating-specks" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>

          <motion.div
            className="relative mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[.95fr_1.05fr]"
            style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
          >
            <motion.div
              className="relative z-10 max-w-3xl"
              initial={reduceMotion ? false : 'hidden'}
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.08 } } }}
            >
              <motion.div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[.04] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/75 shadow-[0_0_30px_rgba(255,255,255,.03)]" custom={0} variants={heroText}>
                <Sparkles size={14} className="animate-pulse" /> Available for opportunities
              </motion.div>

              <motion.p className="mb-3 font-display text-lg font-medium text-white/55 sm:text-xl" custom={1} variants={heroText}>
                Hello, I&apos;m
              </motion.p>

              <motion.h1
                className="hero-name-reflective max-w-4xl font-display text-[4rem] font-semibold leading-[.9] tracking-[-0.065em] sm:text-7xl lg:text-[7.25rem]" data-reflection="Neo Jedrick Belolo"
                custom={2}
                variants={heroText}
              >
                Neo Jedrick
                <span className="block text-white/35">Belolo</span>
              </motion.h1>

              <motion.div className="mt-8 flex items-center gap-3" custom={3} variants={heroText}>
                <span className="h-px w-12 bg-white/40" />
                <span className="text-xs font-semibold uppercase tracking-[0.28em] text-white/60">Full-stack developer</span>
              </motion.div>

              <motion.p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-white/85 sm:text-xl" custom={4} variants={heroText}>
                Aspiring full-stack developer building thoughtful interfaces and practical Python-backed web experiences.
              </motion.p>
              <motion.p className="mt-4 max-w-xl text-sm leading-7 text-white/50 sm:text-base" custom={5} variants={heroText}>
                Third-year BS Information Technology student at FEU Alabang, specializing in Web and Mobile Applications.
              </motion.p>

              <motion.div className="mt-9 flex flex-wrap gap-3" custom={6} variants={heroText}>
                <a href="#projects" className="button-primary">
                  Explore my work <ArrowDown size={17} />
                </a>
                <a
                  href="/Neo_Jedrick_Belolo_Resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="button-secondary"
                  aria-label="View resume in a new tab"
                >
                  View resume <ArrowUpRight size={17} />
                </a>
                <a href="https://github.com/kad3nc3" target="_blank" rel="noreferrer" className="icon-button" aria-label="GitHub profile">
                  <Github size={20} />
                </a>
              </motion.div>

              <motion.div className="mt-12 flex items-center gap-3 text-xs uppercase tracking-[0.24em] text-white/35" custom={7} variants={heroText}>
                <span className="scroll-dot" aria-hidden="true" /> Scroll to explore
              </motion.div>
            </motion.div>

            <motion.aside
              className="relative mx-auto w-full max-w-2xl lg:ml-auto"
              initial={reduceMotion ? false : { opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.3, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              onMouseMove={handleCardMove}
              onMouseLeave={resetCard}
            >
              <motion.div className="code-card hero-terminal lighting-card" style={{ x: springX, y: springY }}>
                <div className="terminal-header" aria-hidden="true">
                  <div className="flex gap-2">
                    <span className="terminal-dot terminal-dot-one" />
                    <span className="terminal-dot terminal-dot-two" />
                    <span className="terminal-dot terminal-dot-three" />
                  </div>
                  <span className="terminal-file">developer.js</span>
                  <span className="terminal-status"><span className="live-dot" /> LIVE</span>
                </div>
                <div className="terminal-border-glow terminal-border-glow-top" aria-hidden="true" />
                <div className="terminal-border-glow terminal-border-glow-bottom" aria-hidden="true" />
                <div className="terminal-ambient-glow" aria-hidden="true" />
                <div className="terminal-code-layer terminal-code-static space-y-5 p-6 font-mono text-sm leading-7 sm:p-9 sm:text-[15px]">
                  <p data-testid="terminal-code-line"><span className="syntax-muted">01</span> <span className="scan-keyword">const</span> <span className="scan-ident">developer</span> <span className="scan-punct">= {'{'}</span></p>
                  <p data-testid="terminal-code-line" className="pl-5"><span className="syntax-muted">02</span> <span className="scan-property">name:</span> <span className="scan-string">&apos;Neo Jedrick Belolo&apos;</span>,</p>
                  <p data-testid="terminal-code-line" className="pl-5"><span className="syntax-muted">03</span> <span className="scan-property">focus:</span> <span className="scan-string">&apos;Full-stack web&apos;</span>,</p>
                  <p data-testid="terminal-code-line" className="pl-5"><span className="syntax-muted">04</span> <span className="scan-property">learning:</span> <span className="scan-punct">[</span><span className="scan-string">&apos;React&apos;</span>, <span className="scan-string">&apos;Flask&apos;</span><span className="scan-punct">]</span>,</p>
                  <p data-testid="terminal-code-line" className="pl-5"><span className="syntax-muted">05</span> <span className="scan-property">mindset:</span> <span className="scan-string">&apos;Build. Test. Improve.&apos;</span></p>
                  <p data-testid="terminal-code-line"><span className="syntax-muted">06</span> <span className="scan-punct">{'}'}</span></p>
                  <p data-testid="terminal-code-line" className="pt-2"><span className="scan-cursor animate-blink">▋</span></p>
                </div>
              </motion.div>

              <motion.div
                className="current-badge"
                initial={reduceMotion ? false : { opacity: 0, y: 14, x: -8 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                transition={{ delay: 0.95, duration: 0.6 }}
              >
                <p>Currently</p>
                <strong>BSIT · Year 3</strong>
              </motion.div>

            </motion.aside>
          </motion.div>
        </section>

        <Section id="projects" eyebrow="01 / Selected work" title="Featured project" intro="A live full-stack build, embedded directly into the portfolio so visitors can explore the experience before they leave the page.">
          <div className="mb-5 flex justify-end">
            <motion.div
              className="projects-coming-soon"
              initial={reduceMotion ? false : { opacity: 0, x: 10 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.6 }}
              transition={{ duration: 0.55 }}
            >
              <span>More projects coming soon</span>
              <ArrowUpRight size={15} aria-hidden="true" />
            </motion.div>
          </div>
          <motion.article
            className="project-showcase motion-lift"
            initial={reduceMotion ? false : { opacity: 0, y: 26, scale: 0.985 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.18 }}
            whileHover={reduceMotion ? undefined : { y: -7 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="project-preview-shell">
              <div className="project-preview-toolbar">
                <div className="flex items-center gap-2" aria-hidden="true">
                  <span className="terminal-dot terminal-dot-one" />
                  <span className="terminal-dot terminal-dot-two" />
                  <span className="terminal-dot terminal-dot-three" />
                </div>
                <div className="project-url-pill">flexsol-storage-corp.vercel.app</div>
                <a href="https://flexsol-storage-corp.vercel.app/" target="_blank" rel="noreferrer" className="project-open-link">Open live <ArrowUpRight size={14} /></a>
              </div>
              <div className="project-preview-frame lighting-card">
                <div className="project-preview-sheen" aria-hidden="true" />
                <iframe
                  title="Flexsol Storage Corp live website preview"
                  src="https://flexsol-storage-corp.vercel.app/"
                  className="project-iframe"
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                />
                <div className="project-preview-fallback">
                  <p>Live preview may be blocked by the deployed site&apos;s framing policy.</p>
                  <a href="https://flexsol-storage-corp.vercel.app/" target="_blank" rel="noreferrer" className="button-secondary">Open the live website <ArrowUpRight size={16} /></a>
                </div>
              </div>
            </div>

            <div className="project-details">
              <div>
                <p className="eyebrow">Flexsol Storage Corp</p>
                <h3 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">A real deployed build, shown in context.</h3>
                <p className="mt-5 leading-7 text-white/55">This featured project is presented as a live product instead of a static screenshot. Visitors can see the deployed site inside the portfolio, then open it in a full browser tab for the complete experience.</p>
              </div>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {[
                  ['Live URL', 'flexsol-storage-corp.vercel.app'],
                  ['Deployment', 'Render'],
                  ['Format', 'Responsive web experience'],
                  ['Presentation', 'Embedded live preview'],
                ].map(([label, value]) => (
                  <div key={label} className="project-meta-card">
                    <span>{label}</span>
                    <strong>{value}</strong>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-2">{['Full-stack web', 'Render', 'Live preview', 'Responsive UI'].map((item) => <span key={item} className="skill-chip">{item}</span>)}</div>
              <a href="https://flexsol-storage-corp.vercel.app/" target="_blank" rel="noreferrer" className="mt-8 inline-flex w-fit items-center gap-2 text-sm font-semibold text-white/75 transition hover:text-white">Explore Flexsol Storage Corp <ArrowUpRight size={16} /></a>
            </div>
          </motion.article>
        </Section>

        <Section id="about" eyebrow="02 / About" title="About me" intro="I care about clear interfaces, dependable code, and learning by building real things.">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_.9fr]">
            <motion.div
              className="panel-card glass-card motion-lift lighting-card space-y-5 p-7 text-base leading-8 text-white/60 sm:p-9"
              initial={reduceMotion ? false : { opacity: 0, x: -24 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.25 }}
              whileHover={reduceMotion ? undefined : { y: -6 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              <p>I&apos;m a third-year BSIT student specializing in Web and Mobile Applications. My academic work has given me a foundation in frontend development, programming, mobile interfaces, and relational data.</p>
              <p>I&apos;m now concentrating that foundation on full-stack web development—combining accessible React interfaces with small, practical Python services.</p>
              <p>I&apos;m looking for an internship where I can contribute carefully, learn from experienced engineers, and turn feedback into better software.</p>
            </motion.div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {[
                ['Based in', 'Biñan City, Laguna', MapPin],
                ['Education', 'FEU Alabang · BSIT', GraduationCap],
                ['Primary focus', 'Full-stack web development', Code2],
              ].map(([label, value, Icon], index) => (
                <motion.div
                  key={label}
                  className="panel-card glass-card motion-lift lighting-card flex items-center gap-4 p-5"
                  initial={reduceMotion ? false : { opacity: 0, x: 18 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.5 }}
                  whileHover={reduceMotion ? undefined : { x: 6, y: -2 }}
                  transition={{ delay: index * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[.04] text-white"><Icon size={20} /></span>
                  <div><p className="text-xs uppercase tracking-[0.14em] text-white/35">{label}</p><p className="mt-1 font-display font-semibold">{value}</p></div>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>

        <Section id="skills" eyebrow="03 / Toolkit" title="Skills" intro="A growing toolkit grounded in coursework, hands-on practice, and this portfolio build.">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {skillGroups.map(({ icon: Icon, title, skills }, index) => (
              <motion.div
                key={title}
                className="skill-card group motion-lift lighting-card"
                initial={reduceMotion ? false : { opacity: 0, y: 22, scale: 0.98 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.25 }}
                whileHover={reduceMotion ? undefined : { y: -9, rotateX: 1 }}
                transition={{ duration: 0.55, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex items-center gap-3"><span className="skill-icon"><Icon size={20} /></span><h3 className="font-display text-lg font-semibold">{title}</h3></div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {skills.map((skill) => <span key={skill} className="skill-chip">{skill}</span>)}
                </div>
              </motion.div>
            ))}
          </div>
        </Section>



        <Section id="education" eyebrow="04 / Education" title="Education" intro="Building a broad computing foundation, then applying it to the web.">
          <div className="relative border-l border-line pl-7 sm:pl-10">
            <motion.span className="absolute -left-2 top-1 h-4 w-4 rounded-full border-4 border-ink bg-white" animate={reduceMotion ? undefined : { boxShadow: ['0 0 0 0 rgba(255,255,255,.02)', '0 0 0 10px rgba(255,255,255,0)', '0 0 0 0 rgba(255,255,255,.02)'] }} transition={{ duration: 2.4, repeat: Infinity }} />
            <motion.div
              className="panel-card glass-card motion-lift lighting-card p-7 sm:p-9"
              initial={reduceMotion ? false : { opacity: 0, y: 22 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.28 }}
              whileHover={reduceMotion ? undefined : { y: -5 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div><p className="eyebrow">FEU Alabang</p><h3 className="mt-3 font-display text-2xl font-bold">Bachelor of Science in Information Technology</h3><p className="mt-2 text-white/50">Specialization in Web and Mobile Applications</p></div>
                <span className="w-fit rounded-full border border-white/10 px-4 py-2 text-sm text-white/40">2023 — Present</span>
              </div>
              <div className="mt-7 flex flex-wrap gap-2">{['Web development', 'Mobile applications', 'Programming fundamentals', 'Database fundamentals', 'Networking concepts'].map((item, index) => <motion.span key={item} className="skill-chip motion-chip" initial={reduceMotion ? false : { opacity: 0, y: 8 }} whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.6 }} transition={{ delay: index * 0.05 }}>{item}</motion.span>)}</div>
            </motion.div>
          </div>
        </Section>

        <Section id="contact" eyebrow="05 / Contact" title="Contact" intro="Have an internship, project, or learning opportunity in mind? I’d be glad to hear about it.">
          <div className="grid gap-7 lg:grid-cols-[.7fr_1.3fr]">
            <motion.div className="panel-card glass-card flex flex-col justify-between p-7 sm:p-8" whileHover={reduceMotion ? undefined : { y: -5 }} transition={{ duration: 0.3 }}>
              <div><h3 className="font-display text-2xl font-bold">Let&apos;s build something useful.</h3><p className="mt-4 leading-7 text-white/50">The best way to reach me is by email. I usually respond as soon as I can.</p></div>
              <div className="mt-10 space-y-5">
                <a className="contact-link" href="mailto:Neojedrick@gmail.com"><Mail size={19} /> Neojedrick@gmail.com</a>
                <a className="contact-link" href="tel:+639206130855" aria-label="Call Neo at +63 920 613 0855"><Phone size={19} /> +63 920 613 0855</a>
                <a className="contact-link" href="https://github.com/kad3nc3" target="_blank" rel="noreferrer"><Github size={19} /> github.com/kad3nc3</a>
                <p className="contact-link"><MapPin size={19} /> Biñan City, Laguna</p>
              </div>
            </motion.div>
            <ContactForm />
          </div>
        </Section>
      </main>

      <footer className="border-t border-line px-5 py-8 text-sm text-white/35 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Neo Jedrick Belolo. Built with care and curiosity.</p>
          <a href="/Neo_Jedrick_Belolo_Resume.pdf" download className="inline-flex items-center gap-2 transition hover:text-white"><Download size={16} /> Download résumé</a>
        </div>
      </footer>
    </div>
  )
}

export default App

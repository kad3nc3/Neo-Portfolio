import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import {
  ArrowDown,
  ArrowUpRight,
  Briefcase,
  Braces,
  Code2,
  Download,
  Linkedin,
  GraduationCap,
  Layers3,
  Mail,
  MapPin,
  Phone,
  ServerCog,
  ShieldCheck,
  Smartphone,
  Sparkles,
  TestTube2,
  Gauge,
} from 'lucide-react'

import { ContactForm } from './components/ContactForm'
import { Navbar } from './components/Navbar'
import { Section } from './components/Section'
import { portfolioProjects, ProjectSlideshow } from './components/ProjectSlideshow'

const skillGroups = [
  {
    icon: Code2,
    title: 'Frontend',
    skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind CSS'],
  },
  {
    icon: ServerCog,
    title: 'Backend',
    skills: ['Python', 'Flask', 'PHP fundamentals', 'REST APIs'],
  },
  {
    icon: Braces,
    title: 'Programming',
    skills: ['Java', 'C++', 'Object-oriented fundamentals'],
  },
  {
    icon: Smartphone,
    title: 'Mobile',
    skills: ['Dart', 'Flutter', 'Kotlin basics'],
  },
  {
    icon: Layers3,
    title: 'Data & tools',
    skills: ['MySQL basics', 'Git', 'GitHub', 'VS Code', 'npm', 'Vite , AI Coding Assistants'],
  },
  {
    icon: TestTube2,
    title: 'Testing & QA',
    skills: ['Vitest', 'Pytest', 'Responsive QA', 'Accessibility checks', 'Keyboard testing'],
  },
  {
    icon: ShieldCheck,
    title: 'Deployment & security',
    skills: ['Vercel', 'Flask deployment', 'CSP', 'HSTS', 'Security headers', 'Environment configuration'],
  },
  {
    icon: Gauge,
    title: 'Performance',
    skills: ['WebP optimization', 'Mobile-first layout'],
  },
]

const heroText = {
  hidden: {
    opacity: 0,
    y: 26,
  },

  show: (index = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.14 * index,
      duration: 0.72,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

function App() {
  const reduceMotion = useReducedMotion()
  const { scrollYProgress, scrollY } = useScroll()

  const heroY = useTransform(
    scrollY,
    [0, 760],
    [0, reduceMotion ? 0 : -96],
  )

  const heroScale = useTransform(
    scrollY,
    [0, 760],
    [1, reduceMotion ? 1 : 0.96],
  )

  const heroOpacity = useTransform(
    scrollY,
    [0, 500],
    [1, reduceMotion ? 1 : 0.55],
  )

  return (
    <div className="min-h-screen overflow-clip bg-ink text-white">
      <style>{`
        html,
        body {
          background: #050505 !important;
          color: #f5f5f5;
        }

        .bg-ink {
          background: #050505 !important;
        }

        .hero-section {
          background:
            radial-gradient(
              circle at 76% 24%,
              rgba(255,255,255,.05),
              transparent 24%
            ),
            radial-gradient(
              circle at 20% 78%,
              rgba(255,255,255,.028),
              transparent 31%
            ),
            radial-gradient(
              circle at 52% 48%,
              rgba(255,255,255,.016),
              transparent 40%
            ),
            linear-gradient(
              135deg,
              #020202 0%,
              #0a0a0a 48%,
              #030303 100%
            ) !important;
        }

        .hero-flow-field {
          opacity: .8 !important;
        }

        .hero-flow-line {
          border-color: rgba(255,255,255,.13) !important;
          filter: blur(.15px);
        }

        .hero-flow-line::after {
          border-top-color: rgba(255,255,255,.16) !important;
        }

        .hero-flow-line-a,
        .hero-flow-line-b,
        .hero-flow-line-c {
          opacity: .9 !important;
        }

        .hero-flow-glow {
          background: rgba(255,255,255,.1) !important;
          opacity: .055 !important;
          filter: grayscale(1);
        }

        .ambient-orb {
          background:
            radial-gradient(
              circle,
              rgba(255,255,255,.11) 0%,
              rgba(255,255,255,.03) 34%,
              transparent 70%
            ) !important;
          filter: grayscale(1) blur(3px);
          opacity: .34 !important;
        }

        .floating-specks span {
          background: rgba(255,255,255,.48) !important;
          box-shadow:
            0 0 10px rgba(255,255,255,.16),
            0 0 18px rgba(255,255,255,.06) !important;
        }

        .hero-name-reflective,
        .hero-name-ps3 {
          position: relative;
          font-weight: 650 !important;
          letter-spacing: -.065em !important;
          background:
            linear-gradient(
              180deg,
              #ffffff 0%,
              #f3f3f3 17%,
              #d8d8d8 39%,
              #b8b8b8 58%,
              #8e8e8e 78%,
              #646464 100%
            ) !important;
          -webkit-background-clip: text !important;
          background-clip: text !important;
          color: transparent !important;
          filter:
            drop-shadow(0 14px 26px rgba(255,255,255,.04))
            drop-shadow(0 2px 2px rgba(0,0,0,.35)) !important;
          text-shadow: none !important;
          animation: monochromeNameGlow 7s ease-in-out infinite;
        }

        .hero-name-reflective::before {
          content: '';
          position: absolute;
          inset: -8% -5%;
          background:
            linear-gradient(
              104deg,
              transparent 35%,
              rgba(255,255,255,.08) 42%,
              rgba(255,255,255,.86) 49%,
              rgba(255,255,255,.18) 54%,
              transparent 64%
            );
          background-size: 220% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          mix-blend-mode: screen;
          pointer-events: none;
          animation: monochromeNameSweep 7.2s cubic-bezier(.22,1,.36,1) infinite;
        }

        .hero-name-reflective::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          top: 99%;
          height: 18%;
          background:
            linear-gradient(
              180deg,
              rgba(255,255,255,.11),
              transparent 80%
            );
          transform: scaleY(-1);
          transform-origin: top;
          opacity: .08;
          filter: blur(2px);
          pointer-events: none;
        }

        @keyframes monochromeNameGlow {
          0%,
          100% {
            filter:
              drop-shadow(0 14px 26px rgba(255,255,255,.035))
              drop-shadow(0 2px 2px rgba(0,0,0,.32));
          }

          50% {
            filter:
              drop-shadow(0 16px 32px rgba(255,255,255,.085))
              drop-shadow(0 2px 2px rgba(0,0,0,.34));
          }
        }

        @keyframes monochromeNameSweep {
          0%,
          16% {
            background-position: 120% 0;
            opacity: 0;
          }

          30% {
            opacity: .12;
          }

          48% {
            background-position: -20% 0;
            opacity: .68;
          }

          60%,
          100% {
            background-position: -20% 0;
            opacity: 0;
          }
        }

        @media (max-width: 640px) {
          .hero-name-reflective,
          .hero-name-ps3 {
            font-weight: 650 !important;
            letter-spacing: -.058em !important;
          }

          .hero-flow-field {
            opacity: .65 !important;
          }

          .hero-flow-line {
            border-color: rgba(255,255,255,.11) !important;
          }

          .hero-flow-line::after {
            border-top-color: rgba(255,255,255,.13) !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-name-reflective,
          .hero-name-reflective::before,
          .hero-name-reflective::after {
            animation: none !important;
          }
        }
        .hero-flow-field,
        .hero-vignette,
        .noise-overlay,
        .ambient-orb,
        .floating-specks,
        .terminal-border-glow,
        .terminal-ambient-glow {
          display: none !important;
          animation: none !important;
        }

        .hero-name-reflective,
        .hero-name-ps3 {
          background: none !important;
          color: #f5f5f5 !important;
          filter: none !important;
          text-shadow: none !important;
          animation: none !important;
        }

        .hero-name-reflective::before,
        .hero-name-reflective::after,
        .hero-terminal::after {
          display: none !important;
          animation: none !important;
        }

        .terminal-status,
        .live-dot,
        .terminal-dot {
          animation: none !important;
          box-shadow: none !important;
          text-shadow: none !important;
        }

        .terminal-status { color: rgba(255,255,255,.55) !important; }
        .live-dot { background: rgba(255,255,255,.7) !important; }
        .eyebrow { border-radius: .35rem !important; }
      `}</style>

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
          <div
            className="hero-flow-field absolute inset-0"
            aria-hidden="true"
          >
            <span className="hero-flow-line hero-flow-line-a" />
            <span className="hero-flow-line hero-flow-line-b" />
            <span className="hero-flow-line hero-flow-line-c" />
            <span className="hero-flow-glow hero-flow-glow-a" />
            <span className="hero-flow-glow hero-flow-glow-b" />
          </div>

          <div
            className="noise-overlay absolute inset-0"
            aria-hidden="true"
          />

          <div
            className="hero-vignette absolute inset-0"
            aria-hidden="true"
          />

          <motion.div
            className="ambient-orb ambient-orb-a"
            style={{ y: heroY }}
            aria-hidden="true"
          />

          <motion.div
            className="ambient-orb ambient-orb-b"
            style={{
              y: useTransform(scrollY, [0, 760], [0, 90]),
            }}
            aria-hidden="true"
          />

          <div
            className="floating-specks"
            aria-hidden="true"
          >
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>

          <motion.div
            className="relative mx-auto flex w-full max-w-4xl items-center"
            style={{
              y: heroY,
              opacity: heroOpacity,
              scale: heroScale,
            }}
          >
            <motion.div
              className="relative z-10 max-w-3xl"
              initial={reduceMotion ? false : 'hidden'}
              animate="show"
              variants={{
                show: {
                  transition: {
                    staggerChildren: 0.08,
                  },
                },
              }}
            >
              <motion.div
                className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[.04] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/75 shadow-[0_0_30px_rgba(255,255,255,.035)]"
                custom={0}
                variants={heroText}
              >
                <Sparkles
                  size={14}
                  className="animate-pulse"
                />

                Available for opportunities
              </motion.div>

              <motion.p
                className="mb-3 font-display text-lg font-medium text-white/55 sm:text-xl"
                custom={1}
                variants={heroText}
              >
                Hello, I&apos;m
              </motion.p>

              <motion.h1
                className="hero-name-reflective hero-name-ps3 max-w-4xl font-display text-[4rem] font-semibold leading-[.9] sm:text-7xl lg:text-[7.25rem]"
                data-reflection="Neo Jedrick Belolo"
                aria-label="Neo Jedrick Belolo"
                custom={2}
                variants={heroText}
              >
                Neo Jedrick
                <span className="block">
                  Belolo
                </span>
              </motion.h1>

              <motion.div
                className="mt-8 flex items-center gap-3"
                custom={3}
                variants={heroText}
              >
                <span className="h-px w-12 bg-white/40" />

                <span className="text-xs font-semibold uppercase tracking-[0.28em] text-white/60">
                  Full-stack developer
                </span>
              </motion.div>

              <motion.p
                className="mt-6 max-w-2xl text-lg font-medium leading-8 text-white/85 sm:text-xl"
                custom={4}
                variants={heroText}
              >
                Aspiring full-stack developer building thoughtful
                interfaces and practical Python-backed web experiences.
              </motion.p>

              <motion.p
                className="mt-4 max-w-xl text-sm leading-7 text-white/50 sm:text-base"
                custom={5}
                variants={heroText}
              >
                Third-year BS Information Technology student at FEU
                Alabang, specializing in Web and Mobile Applications.
              </motion.p>

              <motion.div
                className="mt-9 flex flex-wrap gap-3"
                custom={6}
                variants={heroText}
              >
                <a
                  href="#projects"
                  className="button-primary"
                >
                  Explore my work
                  <ArrowDown size={17} />
                </a>

                <a
                  href="/Neo_Jedrick_Belolo_Resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="button-secondary"
                  aria-label="View resume in a new tab"
                >
                  View resume
                  <ArrowUpRight size={17} />
                </a>

                <a
                  href="https://www.linkedin.com/in/neo-jedrick-belolo-5668093b5/"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-button"
                  aria-label="LinkedIn profile"
                >
                  <Linkedin size={20} />
                </a>
              </motion.div>

              <motion.div
                className="mt-12 flex items-center gap-3 text-xs uppercase tracking-[0.24em] text-white/35"
                custom={7}
                variants={heroText}
              >
                <span
                  className="scroll-dot"
                  aria-hidden="true"
                />

                Scroll to explore
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        <Section
          id="projects"
          eyebrow="01 / Selected work"
          title="Featured projects"
          intro="Selected freelance projects built for real businesses, presented through screenshots so visitors can understand the experience before opening each live website."
        >
          <div className="mb-5 flex justify-end">
            <motion.div
              className="projects-coming-soon"
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      x: 10,
                    }
              }
              whileInView={
                reduceMotion
                  ? undefined
                  : {
                      opacity: 1,
                      x: 0,
                    }
              }
              viewport={{
                once: false,
                amount: 0.6,
              }}
              transition={{
                duration: 0.55,
              }}
            >
              <span>
                Two projects, documented clearly
              </span>

              <ArrowUpRight
                size={15}
                aria-hidden="true"
              />
            </motion.div>
          </div>
          <div className="project-showcase-list">
            {portfolioProjects.map((project) => (
              <ProjectSlideshow key={project.id} project={project} />
            ))}
          </div>
        </Section>

        <Section
          id="about"
          eyebrow="02 / About"
          title="About me"
          intro="I care about clear interfaces, dependable code, and learning by building real things."
        >
          <div className="grid gap-8 lg:grid-cols-[1.1fr_.9fr]">
            <motion.div
              className="panel-card glass-card motion-lift lighting-card space-y-5 p-7 text-base leading-8 text-white/60 sm:p-9"
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      x: -24,
                    }
              }
              whileInView={
                reduceMotion
                  ? undefined
                  : {
                      opacity: 1,
                      x: 0,
                    }
              }
              viewport={{
                once: false,
                amount: 0.25,
              }}
              whileHover={
                reduceMotion
                  ? undefined
                  : {
                      y: -6,
                    }
              }
              transition={{
                duration: 0.65,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <p>
                I&apos;m a third-year BSIT student specializing in
                Web and Mobile Applications. My academic work has
                given me a foundation in frontend development,
                programming, mobile interfaces, and relational data.
              </p>

              <p>
                I&apos;m now concentrating that foundation on
                full-stack web development, combining accessible React
                interfaces with small, practical Python services.
              </p>

              <p>
                Aspiring Web Developer dedicated to writing clean, maintainable code, 
                building responsive web apps, and growing through team collaboration.
              </p>
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
                  initial={
                    reduceMotion
                      ? false
                      : {
                          opacity: 0,
                          x: 18,
                        }
                  }
                  whileInView={
                    reduceMotion
                      ? undefined
                      : {
                          opacity: 1,
                          x: 0,
                        }
                  }
                  viewport={{
                    once: false,
                    amount: 0.5,
                  }}
                  whileHover={
                    reduceMotion
                      ? undefined
                      : {
                          x: 6,
                          y: -2,
                        }
                  }
                  transition={{
                    delay: index * 0.08,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[.04] text-white">
                    <Icon size={20} />
                  </span>

                  <div>
                    <p className="text-xs uppercase tracking-[0.14em] text-white/35">
                      {label}
                    </p>

                    <p className="mt-1 font-display font-semibold">
                      {value}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>

        <Section
          id="experience"
          eyebrow="03 / Experience"
          title="Freelance web development"
          intro="Building practical websites for real businesses while developing stronger full-stack habits."
        >
          <motion.div
            className="panel-card glass-card motion-lift lighting-card p-7 sm:p-9"
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 22,
                  }
            }
            whileInView={
              reduceMotion
                ? undefined
                : {
                    opacity: 1,
                    y: 0,
                  }
            }
            viewport={{
              once: false,
              amount: 0.28,
            }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-start gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-white/10 bg-white/[.05] text-white">
                  <Briefcase size={21} />
                </span>
                <div>
                  <p className="eyebrow">Selected client projects</p>
                  <h3 className="mt-3 font-display text-2xl font-bold sm:text-3xl">
                    Freelance Web Developer
                  </h3>
                  <p className="mt-2 text-white/50">
                    Independent project work
                  </p>
                </div>
              </div>

              <span className="w-fit rounded-xl border border-white/10 bg-white/[.04] px-4 py-2 text-sm text-white/50">
                Client-focused delivery
              </span>
            </div>

            <p className="mt-7 max-w-3xl text-base leading-7 text-white/60">
              Designed and built responsive business websites from structure and interface implementation through deployment-ready polish. The work combines clear content, practical user flows, responsive layouts, and maintainable code.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {[
                ['RMMendezabal', 'React and Python website with SEO-focused content structure and responsive project presentation.'],
                ['Flexsol', 'Flask website with project information, contact actions, on-demand media, and security headers.'],
                ['Delivery workflow', 'Responsive QA, optimized WebP assets, Git version control, and GitHub-based project delivery.'],
              ].map(([title, description]) => (
                <div key={title} className="rounded-2xl border border-white/10 bg-white/[.035] p-4">
                  <h4 className="text-sm font-semibold text-white">{title}</h4>
                  <p className="mt-2 text-sm leading-6 text-white/50">{description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </Section>

        <Section
          id="skills"
          eyebrow="04 / Toolkit"
          title="Skills"
          intro="A growing toolkit grounded in coursework, hands-on practice, and this portfolio build."
        >
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {skillGroups.map(
              ({ icon: Icon, title, skills }, index) => (
                <motion.div
                  key={title}
                  className="skill-card group motion-lift lighting-card"
                  initial={
                    reduceMotion
                      ? false
                      : {
                          opacity: 0,
                          y: 22,
                          scale: 0.98,
                        }
                  }
                  whileInView={
                    reduceMotion
                      ? undefined
                      : {
                          opacity: 1,
                          y: 0,
                          scale: 1,
                        }
                  }
                  viewport={{
                    once: false,
                    amount: 0.25,
                  }}
                  whileHover={
                    reduceMotion
                      ? undefined
                      : {
                          y: -9,
                          rotateX: 1,
                        }
                  }
                  transition={{
                    duration: 0.55,
                    delay: index * 0.07,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span className="skill-icon">
                      <Icon size={20} />
                    </span>

                    <h3 className="font-display text-lg font-semibold">
                      {title}
                    </h3>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <span
                        key={skill}
                        className="skill-chip"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ),
            )}
          </div>
        </Section>

        <Section
          id="education"
          eyebrow="05 / Education"
          title="Education"
          intro="Building a broad computing foundation, then applying it to the web."
        >
          <div className="relative border-l border-line pl-7 sm:pl-10">
            <motion.span
              className="absolute -left-2 top-1 h-4 w-4 rounded-full border-4 border-ink bg-white"
              animate={
                reduceMotion
                  ? undefined
                  : {
                      boxShadow: [
                        '0 0 0 0 rgba(255,255,255,.02)',
                        '0 0 0 10px rgba(255,255,255,0)',
                        '0 0 0 0 rgba(255,255,255,.02)',
                      ],
                    }
              }
              transition={{
                duration: 2.4,
                repeat: Infinity,
              }}
            />

            <motion.div
              className="panel-card glass-card motion-lift lighting-card p-7 sm:p-9"
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 22,
                    }
              }
              whileInView={
                reduceMotion
                  ? undefined
                  : {
                      opacity: 1,
                      y: 0,
                    }
              }
              viewport={{
                once: false,
                amount: 0.28,
              }}
              whileHover={
                reduceMotion
                  ? undefined
                  : {
                      y: -5,
                    }
              }
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="eyebrow">
                    FEU Alabang
                  </p>

                  <h3 className="mt-3 font-display text-2xl font-bold">
                    Bachelor of Science in Information Technology
                  </h3>

                  <p className="mt-2 text-white/50">
                    Specialization in Web and Mobile Applications
                  </p>
                </div>

                <span className="w-fit rounded-full border border-white/10 px-4 py-2 text-sm text-white/40">
                  2023 to Present
                </span>
              </div>

              <div className="mt-7 flex flex-wrap gap-2">
                {[
                  'Web development',
                  'Mobile applications',
                  'Programming fundamentals',
                  'Database fundamentals',
                  'Networking concepts',
                ].map((item, index) => (
                  <motion.span
                    key={item}
                    className="skill-chip motion-chip"
                    initial={
                      reduceMotion
                        ? false
                        : {
                            opacity: 0,
                            y: 8,
                          }
                    }
                    whileInView={
                      reduceMotion
                        ? undefined
                        : {
                            opacity: 1,
                            y: 0,
                          }
                    }
                    viewport={{
                      once: false,
                      amount: 0.6,
                    }}
                    transition={{
                      delay: index * 0.05,
                    }}
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </Section>

        <Section
          id="contact"
          eyebrow="06 / Contact"
          title="Contact"
          intro="Have an internship, project, or learning opportunity in mind? I’d be glad to hear about it."
        >
          <div className="grid gap-7 lg:grid-cols-[.7fr_1.3fr]">
            <motion.div
              className="panel-card glass-card flex flex-col justify-between p-7 sm:p-8"
              whileHover={
                reduceMotion
                  ? undefined
                  : {
                      y: -5,
                    }
              }
              transition={{
                duration: 0.3,
              }}
            >
              <div>
                <h3 className="font-display text-2xl font-bold">
                  Let&apos;s build something useful.
                </h3>

                <p className="mt-4 leading-7 text-white/50">
                  The best way to reach me is by email. I usually
                  respond as soon as I can.
                </p>
              </div>

              <div className="mt-10 space-y-5">
                <a
                  className="contact-link"
                  href="mailto:Neojedrick@gmail.com"
                >
                  <Mail size={19} />
                  Neojedrick@gmail.com
                </a>

                <a
                  className="contact-link"
                  href="tel:+639206130855"
                  aria-label="Call Neo at +63 920 613 0855"
                >
                  <Phone size={19} />
                  +63 920 613 0855
                </a>

                <a
                  className="contact-link"
                  href="https://www.linkedin.com/in/neo-jedrick-belolo-5668093b5/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Linkedin size={19} />
                  linkedin.com/in/neo-jedrick-belolo
                </a>

                <p className="contact-link">
                  <MapPin size={19} />
                  Biñan City, Laguna
                </p>
              </div>
            </motion.div>

            <ContactForm />
          </div>
        </Section>
      </main>

      <footer className="border-t border-line px-5 py-8 text-sm text-white/35 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © 2026 Neo Jedrick Belolo. Built with care and curiosity.
          </p>

          <a
            href="/Neo_Jedrick_Belolo_Resume.pdf"
            download
            className="inline-flex items-center gap-2 transition hover:text-white"
          >
            <Download size={16} />
            Download my résumé!
          </a>
        </div>
      </footer>
    </div>
  )
}

export default App
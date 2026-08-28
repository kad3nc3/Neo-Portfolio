import { useEffect, useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Maximize2,
  X,
} from 'lucide-react'

const projectSlides = {
  rmmendezabal: [
    {
      src: '/projects/rmmendezabal/home-desktop.webp',
      alt: 'R.M Mendezabal Construction Supplies Trading desktop homepage',
      label: 'Desktop view',
    },
    {
      src: '/projects/rmmendezabal/home-mobile.webp',
      alt: 'R.M Mendezabal Construction Supplies Trading homepage on a mobile viewport',
      label: 'Mobile view',
    },
  ],
  flexsol: [
    {
      src: '/projects/flexsol/home-desktop.webp',
      alt: 'Flexsol Storage Corp. homepage with the solar installation hero section',
      label: 'Desktop view',
    },
    {
      src: '/projects/flexsol/home-mobile.webp',
      alt: 'Flexsol Storage Corp. homepage on a mobile viewport',
      label: 'Mobile view',
    },
  ],
}

export const portfolioProjects = [
  {
    id: 'rmmendezabal',
    name: 'R.M Mendezabal Construction Supplies Trading Website',
    eyebrow: 'Featured project',
    summary:
      'A responsive construction-supplies website that makes materials, delivery, hauling, operations, and contact actions easy to find.',
    role: 'Web developer',
    languages: 'React.js, Python, HTML, CSS',
    framework: 'React.js frontend with Python backend',
    tools: 'VS Code, Git, GitHub',
    features: 'Materials catalog, service pages, operations information, gallery, location details, and quote requests',
    url: 'https://www.rmmendezabal.com/',
    slides: projectSlides.rmmendezabal,
  },
  {
    id: 'flexsol',
    name: 'Flexsol Storage Corp. Website',
    eyebrow: 'Selected project',
    summary:
      'A responsive business website built for a solar and energy-storage company, with project information that is easy to scan on desktop and mobile.',
    role: 'Freelance web developer',
    languages: 'HTML, CSS, JavaScript, Python',
    framework: 'Flask with Jinja templates',
    tools: 'VS Code, Git, GitHub, Vercel',
    features: 'Project gallery, contact actions, on-demand video showcase, security headers',
    url: 'https://flexsolstoragecorp.com/',
    slides: projectSlides.flexsol,
  },
]

export function ProjectSlideshow({ project }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const activeSlide = project.slides[activeIndex]

  const move = (direction) => {
    setActiveIndex((current) => (
      (current + direction + project.slides.length) % project.slides.length
    ))
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft') move(-1)
      if (event.key === 'ArrowRight') move(1)
      if (event.key === 'Escape') setLightboxOpen(false)
    }

    // QA patch: keyboard navigation and Escape close make each slideshow usable
    // without a mouse and prevent a modal from trapping the visitor on screen.
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [project])

  return (
    <article className="project-showcase screenshot-project-showcase">
      <div className="project-screenshot-panel">
        <div className="project-screenshot-toolbar">
          <span className="project-screenshot-label">Project preview</span>
          <span className="project-screenshot-count" aria-live="polite">
            {activeIndex + 1} / {project.slides.length}
          </span>
        </div>

        <div className="project-screenshot-stage">
          <button
            className="project-screenshot-image-button"
            type="button"
            onClick={() => setLightboxOpen(true)}
            aria-label={`Open ${activeSlide.label} screenshot larger for ${project.name}`}
          >
            <img
              src={activeSlide.src}
              alt={activeSlide.alt}
              className="project-screenshot-image"
              loading={activeIndex === 0 ? 'eager' : 'lazy'}
            />
          </button>

          <button
            className="project-screenshot-arrow project-screenshot-arrow-left"
            type="button"
            onClick={() => move(-1)}
            aria-label={`Previous ${project.name} screenshot`}
          >
            <ArrowLeft size={18} />
          </button>
          <button
            className="project-screenshot-arrow project-screenshot-arrow-right"
            type="button"
            onClick={() => move(1)}
            aria-label={`Next ${project.name} screenshot`}
          >
            <ArrowRight size={18} />
          </button>

          <span className="project-screenshot-caption">{activeSlide.label}</span>
          <button
            className="project-screenshot-expand"
            type="button"
            onClick={() => setLightboxOpen(true)}
            aria-label={`Open ${project.name} screenshot viewer`}
          >
            <Maximize2 size={16} />
          </button>
        </div>

        <div className="project-screenshot-dots" aria-label={`Choose ${project.name} screenshot`}>
          {project.slides.map((slide, index) => (
            <button
              key={slide.src}
              className={`project-screenshot-dot ${index === activeIndex ? 'is-active' : ''}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Show ${project.name} screenshot ${index + 1}: ${slide.label}`}
              aria-current={index === activeIndex ? 'true' : undefined}
            />
          ))}
        </div>
      </div>

      <div className="project-details screenshot-project-details">
        <div>
          <p className="eyebrow">{project.eyebrow}</p>
          <h3 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {project.name}
          </h3>
          <p className="mt-5 leading-7 text-white/55">{project.summary}</p>
        </div>

        <dl className="project-case-study-facts">
          <div><dt>My role</dt><dd>{project.role}</dd></div>
          <div><dt>Languages</dt><dd>{project.languages}</dd></div>
          <div><dt>Framework</dt><dd>{project.framework}</dd></div>
          <div><dt>Tools and deployment</dt><dd>{project.tools}</dd></div>
          <div><dt>Key features</dt><dd>{project.features}</dd></div>
        </dl>

        <div className="flex flex-wrap gap-3">
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            className="button-primary"
          >
            View live website
            <ExternalLink size={16} />
          </a>
          <span className="project-preview-note">
            Screenshots load here first, so the case study does not depend on iframe embedding.
          </span>
        </div>
      </div>

      {lightboxOpen && (
        <div
          className="project-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${project.name} screenshot viewer`}
          onClick={() => setLightboxOpen(false)}
        >
          <button
            className="project-lightbox-close"
            type="button"
            onClick={() => setLightboxOpen(false)}
            aria-label="Close screenshot viewer"
          >
            <X size={20} />
          </button>
          <button
            className="project-lightbox-arrow project-lightbox-arrow-left"
            type="button"
            onClick={(event) => { event.stopPropagation(); move(-1) }}
            aria-label={`Previous full-size ${project.name} screenshot`}
          >
            <ArrowLeft size={22} />
          </button>
          <img
            src={activeSlide.src}
            alt={activeSlide.alt}
            className="project-lightbox-image"
            onClick={(event) => event.stopPropagation()}
          />
          <button
            className="project-lightbox-arrow project-lightbox-arrow-right"
            type="button"
            onClick={(event) => { event.stopPropagation(); move(1) }}
            aria-label={`Next full-size ${project.name} screenshot`}
          >
            <ArrowRight size={22} />
          </button>
          <p className="project-lightbox-caption">
            {activeSlide.label} · {activeIndex + 1} / {project.slides.length}
          </p>
        </div>
      )}
    </article>
  )
}

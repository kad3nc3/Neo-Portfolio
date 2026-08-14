import { motion, useReducedMotion } from 'framer-motion'

export function Section({ id, eyebrow, title, intro, children, className = '' }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.section
      id={id}
      data-testid="replay-section" data-replay-on-scroll="true" className={`section-shell scroll-mt-24 section-replay ${className}`}
      initial={reduceMotion ? false : { opacity: 0, y: 36 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.14 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mb-10 max-w-2xl md:mb-14">
        <motion.div
          className="mb-4 flex items-center gap-3"
          initial={reduceMotion ? false : { opacity: 0, x: -14 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.55 }}
        >
          <span className="h-px w-8 bg-white/25" />
          <p className="eyebrow">{eyebrow}</p>
        </motion.div>
        <motion.h2
          className="section-title"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.65, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
        >
          {title}
        </motion.h2>
        {intro && (
          <motion.p
            className="section-intro"
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {intro}
          </motion.p>
        )}
      </div>
      {children}
    </motion.section>
  )
}

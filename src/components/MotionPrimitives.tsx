import { type ElementType, type ReactNode, useRef } from 'react'
import { motion, useInView, useReducedMotion, type Variants } from 'motion/react'

type InViewProps = {
  children: ReactNode
  className?: string
  as?: ElementType
  delay?: number
}

export function InView({ children, className, as = 'div', delay = 0 }: InViewProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-8% 0px' })
  const reducedMotion = useReducedMotion()
  const Component = motion.create(as)

  return (
    <Component
      ref={ref}
      className={className}
      initial={reducedMotion ? false : { opacity: 0, y: 18, filter: 'blur(5px)' }}
      animate={
        reducedMotion || isInView
          ? { opacity: 1, y: 0, filter: 'blur(0px)' }
          : { opacity: 0, y: 18, filter: 'blur(5px)' }
      }
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Component>
  )
}

type TextRevealProps = {
  children: string
  as?: 'h1' | 'h2' | 'p'
  className?: string
  delay?: number
}

export function TextReveal({ children, as = 'p', className, delay = 0 }: TextRevealProps) {
  const reducedMotion = useReducedMotion()
  const MotionTag = motion[as]
  const words = children.split(/(\s+)/)
  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.035, delayChildren: delay },
    },
  }
  const item: Variants = {
    hidden: { opacity: 0, y: 14, filter: 'blur(5px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    },
  }

  if (reducedMotion) return <MotionTag className={className}>{children}</MotionTag>

  return (
    <MotionTag
      className={className}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      <span className="sr-only">{children}</span>
      {words.map((word, index) => (
        <motion.span aria-hidden="true" className="reveal-word" variants={item} key={`${word}-${index}`}>
          {word}
        </motion.span>
      ))}
    </MotionTag>
  )
}

export function TraceLine({ delay = 0 }: { delay?: number }) {
  const reducedMotion = useReducedMotion()
  return (
    <motion.span
      className="trace-line"
      initial={reducedMotion ? false : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    />
  )
}

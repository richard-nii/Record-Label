import { motion, useReducedMotion } from 'framer-motion'
import { ease } from '../utils/motion'

/**
 * Scroll-triggered fade+rise animation.
 * Respects prefers-reduced-motion automatically.
 */
export default function FadeIn({ children, delay = 0, y = 24, className = '' }) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduced ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, delay, ease }}
    >
      {children}
    </motion.div>
  )
}

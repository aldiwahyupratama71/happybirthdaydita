import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ─────────────────────────────────────────────
   Section registry — keep in sync with App.jsx
   ───────────────────────────────────────────── */
export const SECTIONS = [
  { index: 1,  id: 'section-opening',      label: 'OPENING' },
  { index: 2,  id: 'section-birthday',     label: 'BIRTHDAY' },
  { index: 3,  id: 'section-story',        label: 'HOW WE STARTED' },
  { index: 4,  id: 'section-timeline',     label: 'OUR JOURNEY' },
  { index: 5,  id: 'section-memories',     label: 'MEMORIES' },
  { index: 6,  id: 'section-little-things',label: 'THE LITTLE THINGS' },
  { index: 7,  id: 'section-reflection',   label: 'MY REFLECTION' },
  { index: 8,  id: 'section-realization',  label: 'WHAT I REALIZED' },
  { index: 9,  id: 'section-growth',       label: "WHAT I'M CHANGING" },
  { index: 10, id: 'section-feelings',     label: 'WHAT I STILL FEEL' },
  { index: 11, id: 'section-future',       label: 'IF WE EVER TRY AGAIN' },
  { index: 12, id: 'section-choice',       label: 'MY CHOICE' },
  { index: 13, id: 'section-gift',         label: 'ABOUT THIS GIFT' },
  { index: 14, id: 'section-letter',       label: 'LETTER FOR YOU' },
  { index: 15, id: 'section-final',        label: 'FINAL' },
]

const TOTAL = SECTIONS.length

/* ─────────────────────────────────────────────
   Padded number helper  →  "03"
   ───────────────────────────────────────────── */
const pad = (n) => String(n).padStart(2, '0')

/* ─────────────────────────────────────────────
   Animated digit — slides up/down on change
   ───────────────────────────────────────────── */
function AnimatedNumber({ value, direction }) {
  return (
    <div style={{ position: 'relative', overflow: 'hidden', display: 'inline-block' }}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          initial={{ y: direction === 'up' ? '100%' : '-100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: direction === 'up' ? '-100%' : '100%', opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ display: 'inline-block' }}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}

/* ─────────────────────────────────────────────
   Main component
   ───────────────────────────────────────────── */
export default function ProgressIndicator() {
  const [activeIndex, setActiveIndex] = useState(0)   // 0-based into SECTIONS
  const [direction, setDirection] = useState('up')
  const prevIndexRef = useRef(0)

  /* ── Intersection Observer ── */
  useEffect(() => {
    // rootMargin '-50% 0px -50% 0px' fires when section centre crosses viewport centre
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id
            const sectionIdx = SECTIONS.findIndex((s) => s.id === sectionId)
            if (sectionIdx === -1) return

            setDirection(sectionIdx > prevIndexRef.current ? 'up' : 'down')
            prevIndexRef.current = sectionIdx
            setActiveIndex(sectionIdx)
          }
        })
      },
      {
        root: null,
        rootMargin: '-40% 0px -40% 0px',
        threshold: 0,
      }
    )

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const current = SECTIONS[activeIndex]
  const progress = (activeIndex + 1) / TOTAL  // 0..1

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '2.5rem',
        right: '2.5rem',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '0.5rem',
        pointerEvents: 'none',
        userSelect: 'none',
      }}
    >
      {/* ── Chapter label ── */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={current.label}
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -8 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: '0.6rem',
            fontWeight: 500,
            letterSpacing: '0.2em',
            color: 'var(--text-secondary)',
            textTransform: 'uppercase',
          }}
        >
          {pad(current.index)}{'\u00a0\u00a0'}{current.label}
        </motion.span>
      </AnimatePresence>

      {/* ── Counter  "03 / 14" ── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: '0.15rem',
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: '1.75rem',
          fontWeight: 400,
          lineHeight: 1,
          color: 'var(--text-primary)',
        }}
      >
        <AnimatedNumber value={pad(current.index)} direction={direction} />
        <span
          style={{
            fontSize: '1rem',
            color: 'var(--divider)',
            margin: '0 0.25rem',
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 300,
          }}
        >
          /
        </span>
        <span
          style={{
            fontSize: '1rem',
            color: 'var(--divider)',
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 300,
          }}
        >
          {pad(TOTAL)}
        </span>
      </div>

      {/* ── Vertical progress bar ── */}
      <div
        style={{
          width: '1px',
          height: '4rem',
          background: 'var(--divider)',
          borderRadius: '999px',
          position: 'relative',
          overflow: 'hidden',
          alignSelf: 'flex-end',
        }}
      >
        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            background: 'var(--accent)',
            borderRadius: '999px',
            originY: 0,
          }}
          animate={{ height: `${progress * 100}%` }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </div>
    </div>
  )
}

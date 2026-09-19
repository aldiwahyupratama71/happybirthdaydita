import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { getQuotes } from '../data/quotes'

/* ─────────────────────────────────────────────
   Kalimat 1–2 — narasi konteks, Manrope abu-abu
   ───────────────────────────────────────────── */
function ContextSentence({ text, index }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-8% 0px' })

  return (
    <motion.p
      ref={ref}
      initial={{ opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.5, delay: 0.06 * index, ease: [0.25, 0.1, 0.25, 1] }}
      style={{
        fontFamily: "'Manrope', sans-serif",
        fontSize:   'clamp(0.9rem, 2vw, 1.05rem)',
        fontWeight: 400,
        lineHeight: 2.0,
        color:      'var(--text-secondary)',
        margin:     0,
      }}
    >
      {text}
    </motion.p>
  )
}

/* ─────────────────────────────────────────────
   Kalimat 3–4 — realisasi inti, lebih besar &
   lebih terang, terasa seperti momen hening
   ───────────────────────────────────────────── */
function RealizationSentence({ text, index }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-8% 0px' })

  return (
    <motion.p
      ref={ref}
      initial={{ opacity: 0, filter: 'blur(6px)', y: 10 }}
      animate={inView ? { opacity: 1, filter: 'blur(0px)', y: 0 } : {}}
      transition={{ duration: 1.8, delay: 0.15 * index, ease: [0.25, 0.1, 0.25, 1] }}
      style={{
        fontFamily:  "'Playfair Display', Georgia, serif",
        fontStyle:   'italic',
        fontSize:    'clamp(1.05rem, 2.6vw, 1.35rem)',
        fontWeight:  400,
        lineHeight:  1.85,
        color:       'var(--text-primary)',
        margin:      0,
      }}
    >
      {text}
    </motion.p>
  )
}

/* ─────────────────────────────────────────────
   Main component
   ───────────────────────────────────────────── */
export default function Realization({ id }) {
  const sentences  = getQuotes('realization')          /* 4 sentences dari quotes.js */
  const context    = sentences.slice(0, 2)             /* kalimat 1–2: konteks       */
  const realizations = sentences.slice(2, 4)           /* kalimat 3–4: inti realisasi */

  const headerRef = useRef(null)
  const headerIn  = useInView(headerRef, { once: true, margin: '-10% 0px' })

  return (
    <section id={id}
      style={{
        minHeight:      '100vh',
        background:     'linear-gradient(180deg, color-mix(in srgb, var(--bg-primary) 98%, var(--text-primary)) 0%, var(--bg-primary) 100%)',
        padding:        'clamp(5rem, 12vh, 9rem) clamp(1.5rem, 8vw, 8rem)',
        display:        'flex',
        flexDirection:  'column',
        justifyContent: 'center',
        position:       'relative',
        overflow:       'hidden',
      }}
    >
      {/* ── Faint warm glow — tidak terlalu mencolok ── */}
      <div aria-hidden="true" style={{
        position:     'absolute',
        top:          '35%',
        left:         '50%',
        transform:    'translate(-50%, -50%)',
        width:        '50vmax',
        height:       '50vmax',
        borderRadius: '50%',
        background:   'radial-gradient(circle, color-mix(in srgb, var(--accent) 2.5%, transparent) 0%, transparent 60%)',
        pointerEvents:'none',
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '600px' }}>

        {/* ══════════════════
            Header
            ══════════════════ */}
        <div ref={headerRef}>
          

          {/* ── Large headline — dua baris, split di koma ── */}
          {/* Section label */}
        <motion.span
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            display: 'block',
            fontFamily: "'Manrope', sans-serif",
            fontSize: '0.6rem',
            fontWeight: 500,
            letterSpacing: '0.28em',
            color: 'var(--text-secondary)',
            textTransform: 'uppercase',
            marginBottom: '1.75rem',
          }}
        >
          {'08\u00a0\u00a0/\u00a0\u00a0What I Realized'}
        </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            animate={headerIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              fontFamily:    "'Playfair Display', Georgia, serif",
              fontSize:      'clamp(2rem, 5.5vw, 3.6rem)',
              fontWeight:    400,
              lineHeight:    1.2,
              letterSpacing: '-0.025em',
              color:         'var(--text-primary)',
              margin:        '0 0 0.2em',
            }}
          >
            Maybe I Was Tired
            <br />
            Of The Pattern,
          </motion.h2>

          {/* "Not Of You." — tersendiri, italic, beige */}
          <motion.p
            initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
            animate={headerIn ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 1.8, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              fontFamily:    "'Playfair Display', Georgia, serif",
              fontStyle:     'italic',
              fontSize:      'clamp(2rem, 5.5vw, 3.6rem)',
              fontWeight:    400,
              lineHeight:    1.2,
              letterSpacing: '-0.025em',
              color:         'var(--accent)',
              margin:        '0 0 3.5rem',
            }}
          >
            Not Of You.
          </motion.p>

          {/* Thin beige divider */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={headerIn ? { scaleX: 1, opacity: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              width:           '36px',
              height:          '1px',
              background:      'var(--accent)',
              marginBottom:    '3rem',
              transformOrigin: 'left center',
            }}
          />
        </div>

        {/* ══════════════════
            Kalimat 1–2: konteks
            ══════════════════ */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '3rem' }}>
          {context.map((q, i) => (
            <ContextSentence key={q.id} text={q.text} index={i} />
          ))}
        </div>

        {/* ── Pause indicator — hening sejenak sebelum realisasi ── */}
        <PauseBreak />

        {/* ══════════════════
            Kalimat 3–4: realisasi inti
            ══════════════════ */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginTop: '2.5rem' }}>
          {realizations.map((q, i) => (
            <RealizationSentence key={q.id} text={q.text} index={i} />
          ))}
        </div>

      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   Pause break — titik-titik hening sebelum
   kalimat realisasi inti muncul
   ───────────────────────────────────────────── */
function PauseBreak() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-8% 0px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 1.2 }}
      style={{
        display:    'flex',
        alignItems: 'center',
        gap:        '6px',
        padding:    '0.5rem 0',
      }}
    >
      {[0, 0.25, 0.5].map((delay, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: [0, 0.3, 0] } : {}}
          transition={{ duration: 2, delay, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width:        '3px',
            height:       '3px',
            borderRadius: '50%',
            background:   'var(--text-secondary)',
            display:      'inline-block',
            flexShrink:   0,
          }}
        />
      ))}
    </motion.div>
  )
}
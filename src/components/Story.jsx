import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { getQuotes } from '../data/quotes'

/* ─────────────────────────────────────────────
   Tiap paragraf scroll-trigger sendiri
   ───────────────────────────────────────────── */
function AnimatedParagraph({ text, index, isFirst }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-8% 0px' })

  return (
    <motion.p
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 1.5,
        delay:    index * 0.08,
        ease:     [0.25, 0.1, 0.25, 1],
      }}
      style={{
        fontFamily: "'Manrope', sans-serif",
        fontSize:   isFirst
          ? 'clamp(1.05rem, 2.4vw, 1.2rem)'
          : 'clamp(0.9rem, 2vw, 1.05rem)',
        fontWeight: 400,
        lineHeight: isFirst ? 2.05 : 1.95,
        color:      isFirst ? 'color-mix(in srgb, var(--text-secondary) 80%, var(--text-primary))' : 'var(--text-secondary)',
        margin:     0,
      }}
    >
      {text}
    </motion.p>
  )
}

/* ─────────────────────────────────────────────
   Closing em-dash — komponen sendiri
   agar useInView tidak melanggar rules of hooks
   ───────────────────────────────────────────── */
function ClosingMark() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-8% 0px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
      style={{
        marginTop:  '3rem',
        display:    'flex',
        alignItems: 'center',
        gap:        '0.7rem',
      }}
    >
      <div style={{ width: '20px', height: '1px', background: 'var(--divider)' }} />
      <span style={{
        fontFamily:    "'Manrope', sans-serif",
        fontSize:      '0.58rem',
        letterSpacing: '0.22em',
        color:         'var(--text-secondary)',
        textTransform: 'uppercase',
      }}>
        Begitulah awalnya
      </span>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   Main component
   ───────────────────────────────────────────── */
export default function Story({ id }) {
  const paragraphs = getQuotes('story')     /* 4 quote object dari quotes.js */
  const headerRef  = useRef(null)
  const headerIn   = useInView(headerRef, { once: true, margin: '-10% 0px' })

  return (
    <section id={id}
      style={{
        minHeight:      '100vh',
        background:     'linear-gradient(180deg, color-mix(in srgb, var(--bg-primary) 92%, var(--text-primary)) 0%, color-mix(in srgb, var(--bg-primary) 97%, var(--text-primary)) 100%)',
        padding:        'clamp(5rem, 12vh, 9rem) clamp(1.5rem, 8vw, 8rem)',
        display:        'flex',
        flexDirection:  'column',
        alignItems:     'center',
        justifyContent: 'center',
        position:       'relative',
        overflow:       'hidden',
      }}
    >
      {/* ── Ruled-line texture ── */}
      <div aria-hidden="true" style={{
        position:        'absolute',
        inset:           0,
        backgroundImage: 'repeating-linear-gradient(transparent, transparent 79px, rgba(255,255,255,0.012) 79px, rgba(255,255,255,0.012) 80px)',
        pointerEvents:   'none',
      }} />

      {/* ══════════════════════════════
          Content column
          ══════════════════════════════ */}
      <div style={{
        position: 'relative',
        zIndex:   1,
        width:    '100%',
        /* mobile ≈ 448px | desktop ≈ 672px */
        maxWidth: 'clamp(min(100%, 448px), 90vw, 672px)',
      }}>

        {/* ── Header ── */}
        <div ref={headerRef}>

          

          {/* Decorative large open-quote */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={headerIn ? { opacity: 1 } : {}}
            transition={{ duration: 1.8, delay: 0.1 }}
            aria-hidden="true"
            style={{
              display:     'block',
              fontFamily:  "'Playfair Display', Georgia, serif",
              fontSize:    'clamp(4.5rem, 10vw, 7.5rem)',
              lineHeight:  0.65,
              color:       'color-mix(in srgb, var(--accent) 15%, transparent)',
              userSelect:  'none',
              marginBottom:'-0.5rem',
            }}
          >
            &ldquo;
          </motion.span>

          {/* Chapter heading */}
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
          {'03\u00a0\u00a0/\u00a0\u00a0How We Started'}
        </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={headerIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.4, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              fontFamily:    "'Playfair Display', Georgia, serif",
              fontSize:      'clamp(1.8rem, 4vw, 2.6rem)',
              fontWeight:    400,
              lineHeight:    1.3,
              letterSpacing: '-0.015em',
              color:         'var(--text-primary)',
              margin:        '0 0 2rem',
            }}
          >
            Dari awal,{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>
              semuanya terasa sederhana.
            </em>
          </motion.h2>

          {/* Thin accent line */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={headerIn ? { scaleX: 1, opacity: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              width:           '36px',
              height:          '1px',
              background:      'var(--accent)',
              marginBottom:    '2.8rem',
              transformOrigin: 'left center',
            }}
          />
        </div>

        {/* ── Paragraphs — tiap kalimat punya scroll-trigger sendiri ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.6rem' }}>
          {paragraphs.map((q, i) => (
            <AnimatedParagraph
              key={q.id}
              text={q.text}
              index={i}
              isFirst={i === 0}
            />
          ))}
        </div>

        {/* ── Closing mark ── */}
        <ClosingMark />
      </div>
    </section>
  )
}
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MessageCircle, Ear, Heart, Swords, Sprout } from 'lucide-react'
import { getQuotes } from '../data/quotes'

/* ─────────────────────────────────────────────
   Data — 5 komitmen konkret perubahan diri
   Guardrail: ini adalah komitmen, BUKAN keluhan
   ───────────────────────────────────────────── */
const CHANGES = [
  {
    id:    'ch-01',
    title: 'Communication',
    desc:  'Memberi tahu ketika sibuk, bukan menghilang.',
    Icon:  MessageCircle,
  },
  {
    id:    'ch-02',
    title: 'Listening',
    desc:  'Mendengarkan sebelum mencoba memperbaiki.',
    Icon:  Ear,
  },
  {
    id:    'ch-03',
    title: 'Acceptance',
    desc:  'Tidak menjadikan pasangan versi lain dari dirinya.',
    Icon:  Heart,
  },
  {
    id:    'ch-04',
    title: 'Conflict',
    desc:  'Menghadapi masalah, bukan melarikan diri.',
    Icon:  Swords,
  },
  {
    id:    'ch-05',
    title: 'Growth',
    desc:  'Berkembang bersama tanpa memaksa.',
    Icon:  Sprout,
  },
]

/* ─────────────────────────────────────────────
   Satu kartu perubahan — scroll-trigger sendiri
   ───────────────────────────────────────────── */
function ChangeCard({ item, index }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-8% 0px' })
  const num    = String(index + 1).padStart(2, '0')

  /* Card kelima (5 items di 2-col grid) centering — handled by grid auto-fill */

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 1.3,
        delay:    0.1 * index,
        ease:     [0.25, 0.1, 0.25, 1],
      }}
      style={{
        position:     'relative',
        padding:      'clamp(1.5rem, 3.5vw, 2rem)',
        background:   'color-mix(in srgb, var(--text-primary) 3%, transparent)',
        border:       '1px solid color-mix(in srgb, var(--text-primary) 6%, transparent)',
        borderRadius: '10px',
        overflow:     'hidden',
        transition:   'border-color 0.35s',
      }}
      onMouseEnter={e => e.currentTarget.style.borderColor = 'color-mix(in srgb, var(--accent) 18%, transparent)'}
      onMouseLeave={e => e.currentTarget.style.borderColor = 'color-mix(in srgb, var(--text-primary) 6%, transparent)'}
    >
      {/* ── Ghost number background ── */}
      <span
        aria-hidden="true"
        style={{
          position:     'absolute',
          bottom:       '-0.5rem',
          right:        '0.5rem',
          fontFamily:   "'Playfair Display', Georgia, serif",
          fontSize:     'clamp(4.5rem, 12vw, 8rem)',
          lineHeight:   1,
          color:        'color-mix(in srgb, var(--text-primary) 2.5%, transparent)',
          userSelect:   'none',
          pointerEvents:'none',
          letterSpacing:'-0.02em',
        }}
      >
        {num}
      </span>

      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* ── Icon tile ── */}
        <div style={{
          width:          '40px',
          height:         '40px',
          borderRadius:   '10px',
          background:     'color-mix(in srgb, var(--accent) 8%, transparent)',
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
          marginBottom:   '1.25rem',
        }}>
          <item.Icon size={17} strokeWidth={1.4} color="var(--accent)" />
        </div>

        {/* ── Index micro-label ── */}
        <span style={{
          display:       'block',
          fontFamily:    "'Manrope', sans-serif",
          fontSize:      '0.52rem',
          fontWeight:    600,
          letterSpacing: '0.24em',
          color:         'var(--text-secondary)',
          textTransform: 'uppercase',
          marginBottom:  '0.55rem',
        }}>
          {num}
        </span>

        {/* ── Card title — Playfair Display ── */}
        <h3 style={{
          fontFamily:    "'Playfair Display', Georgia, serif",
          fontSize:      'clamp(1.1rem, 2.5vw, 1.35rem)',
          fontWeight:    400,
          lineHeight:    1.3,
          letterSpacing: '-0.01em',
          color:         'var(--text-primary)',
          margin:        '0 0 0.8rem',
        }}>
          {item.title}
        </h3>

        {/* ── Description — Manrope body ── */}
        <p style={{
          fontFamily:  "'Manrope', sans-serif",
          fontSize:    'clamp(0.82rem, 1.8vw, 0.94rem)',
          fontWeight:  400,
          lineHeight:  1.85,
          color:       'var(--text-secondary)',
          margin:      0,
        }}>
          {item.desc}
        </p>
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   Main component
   ───────────────────────────────────────────── */
export default function Growth() {
  const [q1]      = getQuotes('growth')
  const headerRef = useRef(null)
  const headerIn  = useInView(headerRef, { once: true, margin: '-10% 0px' })

  return (
    <section
      style={{
        minHeight:   '100vh',
        background:  'linear-gradient(180deg, var(--bg-primary) 0%, color-mix(in srgb, var(--bg-primary) 96%, var(--text-primary)) 100%)',
        padding:     'clamp(5rem, 12vh, 9rem) clamp(1.5rem, 8vw, 8rem)',
        position:    'relative',
        overflow:    'hidden',
      }}
    >
      {/* ── Hopeful warm glow — sedikit berbeda dari section sebelumnya ── */}
      <div aria-hidden="true" style={{
        position:     'absolute',
        bottom:       '-10%',
        right:        '-5%',
        width:        '50vmax',
        height:       '50vmax',
        borderRadius: '50%',
        background:   'radial-gradient(circle, color-mix(in srgb, var(--accent) 4.5%, transparent) 0%, transparent 60%)',
        pointerEvents:'none',
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '720px' }}>

        {/* ══════════════════
            Header
            ══════════════════ */}
        <div ref={headerRef}>
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            animate={headerIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              display:       'block',
              fontFamily:    "'Manrope', sans-serif",
              fontSize:      '0.6rem',
              fontWeight:    500,
              letterSpacing: '0.28em',
              color:         'var(--text-secondary)',
              textTransform: 'uppercase',
              marginBottom:  '1.75rem',
            }}
          >
            {'10\u00a0\u00a0/\u00a0\u00a0What I\'m Changing'}
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={headerIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.4, delay: 0.12, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              fontFamily:    "'Playfair Display', Georgia, serif",
              fontSize:      'clamp(1.8rem, 4.5vw, 2.8rem)',
              fontWeight:    400,
              lineHeight:    1.25,
              letterSpacing: '-0.02em',
              color:         'var(--text-primary)',
              margin:        '0 0 1rem',
            }}
          >
            Perubahan yang{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>
              dimulai dari diri sendiri.
            </em>
          </motion.h2>

          {q1?.text && (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={headerIn ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.2, delay: 0.24, ease: [0.25, 0.1, 0.25, 1] }}
              style={{
                fontFamily:  "'Manrope', sans-serif",
                fontSize:    'clamp(0.82rem, 1.8vw, 0.95rem)',
                fontStyle:   'italic',
                lineHeight:  1.85,
                color:       'var(--text-secondary)',
                margin:      0,
              }}
            >
              {q1.text}
            </motion.p>
          )}

          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={headerIn ? { scaleX: 1, opacity: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.32, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              width:           '36px',
              height:          '1px',
              background:      'var(--accent)',
              margin:          '2rem 0 3rem',
              transformOrigin: 'left center',
            }}
          />
        </div>

        {/* ══════════════════════════════════════════
            Cards grid
            — 1 kolom mobile, 2 kolom desktop
            — item ke-5 di-center otomatis via grid
            ══════════════════════════════════════════ */}
        <div style={{
          display:             'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
          gap:                 'clamp(1rem, 2.5vw, 1.4rem)',
        }}>
          {CHANGES.map((item, i) => (
            <ChangeCard key={item.id} item={item} index={i} />
          ))}
        </div>

        {/* ── Footer note — grounded, bukan sentimentil ── */}
        <FooterNote />
      </div>
    </section>
  )
}

/* ── Footer note — muncul terakhir ── */
function FooterNote() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-5% 0px' })

  return (
    <motion.p
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 1.5, delay: 0.2 }}
      style={{
        fontFamily:  "'Manrope', sans-serif",
        fontSize:    'clamp(0.75rem, 1.6vw, 0.85rem)',
        lineHeight:  1.85,
        color:       'color-mix(in srgb, var(--text-secondary) 50%, var(--bg-primary))',
        margin:      '3rem 0 0',
        fontStyle:   'italic',
        maxWidth:    '480px',
      }}
    >
      Ini bukan tentang menjadi sempurna. Ini tentang mencoba dengan lebih sadar.
    </motion.p>
  )
}
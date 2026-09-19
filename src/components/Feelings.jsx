import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { getQuotes } from '../data/quotes'

/* ─────────────────────────────────────────────
   PHOTO PLACEHOLDER
   Isi dengan URL foto samar di-background.
   Gunakan foto yang sedikit blur / gelap supaya
   teks tetap terbaca. Biarkan kosong jika tidak
   ingin pakai foto background.

   Contoh: '/src/assets/photos/feelings-bg.jpg'
   ───────────────────────────────────────────── */
const BACKGROUND_PHOTO_URL = ''

/* ─────────────────────────────────────────────
   Kalimat pendek & impactful (S1 & S2)
   — blur-in, Playfair Display besar
   ───────────────────────────────────────────── */
function ShortLine({ text, delay, accentColor }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-8% 0px' })

  return (
    <motion.p
      ref={ref}
      initial={{ opacity: 0, filter: 'blur(10px)', y: 8 }}
      animate={inView ? { opacity: 1, filter: 'blur(0px)', y: 0 } : {}}
      transition={{ duration: 2.0, delay, ease: [0.25, 0.1, 0.25, 1] }}
      style={{
        fontFamily:    "'Playfair Display', Georgia, serif",
        fontStyle:     'italic',
        fontSize:      'clamp(1.6rem, 4.5vw, 2.8rem)',
        fontWeight:    400,
        lineHeight:    1.3,
        letterSpacing: '-0.02em',
        color:         accentColor || 'var(--text-primary)',
        margin:        0,
        textAlign:     'center',
      }}
    >
      {text}
    </motion.p>
  )
}

/* ─────────────────────────────────────────────
   Kalimat panjang (S3, S4, S5)
   — fade+slide, Manrope, lebih kecil & mudah dibaca
   ───────────────────────────────────────────── */
function LongLine({ text, index }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-6% 0px' })

  /* S4 (index 1) = "Tetapi..." → sedikit lebih terang sebagai turning point */
  const isTurn  = index === 1
  /* S5 (index 2) = harapan → accent beige */
  const isHope  = index === 2

  return (
    <motion.p
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.8, delay: 0.08, ease: [0.25, 0.1, 0.25, 1] }}
      style={{
        fontFamily:  "'Manrope', sans-serif",
        fontSize:    'clamp(0.92rem, 2.1vw, 1.08rem)',
        fontWeight:  isHope ? 500 : 400,
        lineHeight:  2.1,
        color:       isHope ? 'var(--accent)' : isTurn ? 'var(--text-primary)' : 'var(--text-secondary)',
        margin:      0,
        textAlign:   'center',
        maxWidth:    '520px',
        alignSelf:   'center',
      }}
    >
      {text}
    </motion.p>
  )
}

/* ─────────────────────────────────────────────
   Main component
   ───────────────────────────────────────────── */
export default function Feelings({ id }) {
  const sentences = getQuotes('feelings')   /* 5 kalimat */
  const [s1, s2]  = sentences.slice(0, 2)  /* impactful  */
  const longLines = sentences.slice(2)      /* context    */

  return (
    <section id={id}
      style={{
        minHeight:      '100vh',
        background:     'var(--bg-primary)',
        padding:        'clamp(6rem, 14vh, 10rem) clamp(1.5rem, 8vw, 8rem)',
        display:        'flex',
        flexDirection:  'column',
        alignItems:     'center',
        justifyContent: 'center',
        position:       'relative',
        overflow:       'hidden',
      }}
    >
      {/* ── Background photo (opsional, opacity rendah) ── */}
      {BACKGROUND_PHOTO_URL && (
        <div
          aria-hidden="true"
          style={{
            position:           'absolute',
            inset:              0,
            backgroundImage:    `url(${BACKGROUND_PHOTO_URL})`,
            backgroundSize:     'cover',
            backgroundPosition: 'center',
            opacity:            0.06,
            filter:             'blur(4px)',
            pointerEvents:      'none',
          }}
        />
      )}

      {/* ── Deep vignette — pastikan teks terbaca ── */}
      <div aria-hidden="true" style={{
        position:     'absolute', inset: 0,
        background:   'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 20%, color-mix(in srgb, var(--bg-primary) 85%, transparent) 100%)',
        pointerEvents:'none',
      }} />

      {/* ── Very soft center warm glow ── */}
      <div aria-hidden="true" style={{
        position:     'absolute', top: '50%', left: '50%',
        transform:    'translate(-50%,-50%)',
        width:        '60vmax', height: '60vmax', borderRadius: '50%',
        background:   'radial-gradient(circle, color-mix(in srgb, var(--accent-2) 4%, transparent) 0%, transparent 55%)',
        pointerEvents:'none',
      }} />

      {/* ════════════════════════════════════
          Main content — centered column
          ════════════════════════════════════ */}
      <div style={{
        position:      'relative',
        zIndex:        1,
        display:       'flex',
        flexDirection: 'column',
        alignItems:    'center',
        gap:           'clamp(2rem, 5vh, 3.5rem)',
        maxWidth:      '640px',
        width:         '100%',
      }}>

        {/* Section label */}
        <SectionLabel />

        {/* ── S1: "Aku tidak akan berbohong." ── */}
        {s1 && <ShortLine text={s1.text} delay={0} />}

        {/* ── Visual pause between S1 & S2 ── */}
        <Ellipsis />

        {/* ── S2: "Aku masih merindukanmu." — muted red ── */}
        {s2 && <ShortLine text={s2.text} delay={0} accentColor="var(--accent-2)" />}

        {/* ── Divider sebelum kalimat panjang ── */}
        <ThinDivider />

        {/* ── S3, S4, S5 ── */}
        {longLines.map((q, i) => (
          <LongLine key={q.id} text={q.text} index={i} />
        ))}

      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   Helper sub-components
   ───────────────────────────────────────────── */

function SectionLabel() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  return (
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
      {'10\u00a0\u00a0/\u00a0\u00a0What I Still Feel'}
    </motion.span>
  )
}

/* Titik-titik jeda visual antar kalimat pendek */
function Ellipsis() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-8% 0px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 1 }}
      style={{ display: 'flex', gap: '8px', alignItems: 'center' }}
    >
      {[0, 0.3, 0.6].map((delay, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: [0, 0.25, 0] } : {}}
          transition={{ duration: 2.5, delay, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width:        '3px',
            height:       '3px',
            borderRadius: '50%',
            background:   'var(--text-secondary)',
            display:      'inline-block',
          }}
        />
      ))}
    </motion.div>
  )
}

/* Garis tipis pemisah antara kalimat pendek & panjang */
function ThinDivider() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-8% 0px' })
  return (
    <motion.div
      ref={ref}
      initial={{ scaleX: 0, opacity: 0 }}
      animate={inView ? { scaleX: 1, opacity: 1 } : {}}
      transition={{ duration: 1.4, ease: [0.25, 0.1, 0.25, 1] }}
      style={{
        width:          '48px',
        height:         '1px',
        background:     'linear-gradient(90deg, transparent, color-mix(in srgb, var(--text-primary) 8%, transparent), transparent)',
        transformOrigin:'center',
      }}
    />
  )
}
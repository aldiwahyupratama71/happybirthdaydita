import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Check } from 'lucide-react'
import { getQuotes } from '../data/quotes'

/* ─────────────────────────────────────────────
   BAGIAN 1 — Komitmen diri sendiri
   Guardrail: ini janji kepada diri sendiri,
   BUKAN syarat atau tuntutan untuk pasangan
   ───────────────────────────────────────────── */
const COMMITMENTS = [
  { id: 'cm-01', text: 'Aku tidak akan menjadikanmu project.' },
  { id: 'cm-02', text: 'Aku akan belajar berkomunikasi meskipun sedang sibuk.' },
  { id: 'cm-03', text: 'Aku tidak akan menghindari masalah hanya karena lelah.' },
  { id: 'cm-04', text: 'Aku akan menghargai perbedaan kita.' },
  { id: 'cm-05', text: 'Aku ingin kita tumbuh bersama, bukan saling membentuk.' },
]

/* ─────────────────────────────────────────────
   Satu baris komitmen — scroll trigger sendiri
   ───────────────────────────────────────────── */
function CommitmentRow({ item, index }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-7% 0px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20, y: 6 }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 1.3, delay: 0.07 * index, ease: [0.25, 0.1, 0.25, 1] }}
      style={{
        display:     'flex',
        alignItems:  'flex-start',
        gap:         '1rem',
        padding:     '1.1rem 0',
        borderBottom:'1px solid color-mix(in srgb, var(--text-primary) 4%, transparent)',
      }}
    >
      {/* Check icon */}
      <div style={{
        flexShrink:     0,
        width:          '28px',
        height:         '28px',
        borderRadius:   '6px',
        border:         '1px solid color-mix(in srgb, var(--accent) 25%, transparent)',
        background:     'color-mix(in srgb, var(--accent) 5%, transparent)',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        marginTop:      '1px',
      }}>
        <Check size={13} strokeWidth={2} color="var(--accent)" />
      </div>

      {/* Commitment text */}
      <p style={{
        fontFamily:  "'Manrope', sans-serif",
        fontSize:    'clamp(0.88rem, 2vw, 1.02rem)',
        fontWeight:  400,
        lineHeight:  1.75,
        color:       'var(--text-secondary)',
        margin:      0,
        flex:        1,
      }}>
        {item.text}
      </p>

      {/* Index */}
      <span style={{
        flexShrink:    0,
        fontFamily:    "'Playfair Display', Georgia, serif",
        fontSize:      '0.6rem',
        color:         'color-mix(in srgb, var(--text-primary) 15%, var(--bg-primary))',
        lineHeight:    1,
        marginTop:     '5px',
        letterSpacing: '0.05em',
      }}>
        {String(index + 1).padStart(2, '0')}
      </span>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   BAGIAN 2 — Narasi "What I Want"
   Guardrail: jujur tentang keraguan, BUKAN
   ajakan/rayuan untuk pasangan kembali
   ───────────────────────────────────────────── */

function WantSentence({ text, index }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-7% 0px' })

  /* Kalimat terakhir ("Yang aku inginkan...") — beige, lebih terang */
  const isFinal = index === 3

  return (
    <motion.p
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.6, delay: 0.06 * index, ease: [0.25, 0.1, 0.25, 1] }}
      style={{
        fontFamily:  isFinal
          ? "'Playfair Display', Georgia, serif"
          : "'Manrope', sans-serif",
        fontStyle:   isFinal ? 'italic' : 'normal',
        fontSize:    isFinal
          ? 'clamp(1rem, 2.4vw, 1.25rem)'
          : 'clamp(0.88rem, 2vw, 1rem)',
        fontWeight:  400,
        lineHeight:  isFinal ? 1.85 : 1.95,
        color:       isFinal ? 'var(--accent)' : 'var(--text-secondary)',
        margin:      0,
      }}
    >
      {text}
    </motion.p>
  )
}

/* ─────────────────────────────────────────────
   Divider antara dua bagian
   ───────────────────────────────────────────── */
function SectionDivider() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-8% 0px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 1.2 }}
      style={{
        margin:     'clamp(4rem, 9vh, 7rem) 0',
        display:    'flex',
        alignItems: 'center',
        gap:        '1.2rem',
      }}
    >
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.2, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
        style={{
          flex:            1,
          height:          '1px',
          background:      'linear-gradient(to right, transparent, color-mix(in srgb, var(--accent) 25%, transparent))',
          transformOrigin: 'left center',
        }}
      />
      <span style={{
        fontFamily:    "'Playfair Display', Georgia, serif",
        fontSize:      '0.65rem',
        color:         'color-mix(in srgb, var(--accent) 35%, transparent)',
        letterSpacing: '0.1em',
        flexShrink:    0,
      }}>
        ✦
      </span>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.2, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
        style={{
          flex:            1,
          height:          '1px',
          background:      'linear-gradient(to left, transparent, color-mix(in srgb, var(--accent) 25%, transparent))',
          transformOrigin: 'right center',
        }}
      />
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   Part 1 header — scroll trigger sendiri
   ───────────────────────────────────────────── */
function Part1Header({ subtext }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <div ref={ref} style={{ marginBottom: 'clamp(2.5rem, 6vh, 4rem)' }}>
      

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
          {'11\u00a0\u00a0/\u00a0\u00a0If We Ever Try Again'}
        </motion.span>
      

      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        animate={headerAnim(inView, 0.12)}
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
        Kalau suatu hari kita{' '}
        <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>
          memilih lagi.
        </em>
      </motion.h2>

      {subtext && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={headerAnim(inView, 0.24)}
          style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize:   'clamp(0.82rem, 1.8vw, 0.95rem)',
            fontStyle:  'italic',
            lineHeight: 1.85,
            color:      'var(--text-secondary)',
            margin:     0,
          }}
        >
          {subtext}
        </motion.p>
      )}

      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={inView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 1.2, delay: 0.32, ease: [0.25, 0.1, 0.25, 1] }}
        style={{
          width: '36px', height: '1px', background: 'var(--accent)',
          margin: '2rem 0 2.5rem', transformOrigin: 'left center',
        }}
      />
    </div>
  )
}

/* ─────────────────────────────────────────────
   Part 2 header — scroll trigger sendiri
   ───────────────────────────────────────────── */
function Part2Header() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <div ref={ref} style={{ marginBottom: 'clamp(2rem, 5vh, 3rem)' }}>
      

      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        animate={headerAnim(inView, 0.12)}
        style={{
          fontFamily:    "'Playfair Display', Georgia, serif",
          fontSize:      'clamp(1.8rem, 4.5vw, 2.8rem)',
          fontWeight:    400,
          lineHeight:    1.25,
          letterSpacing: '-0.02em',
          color:         'var(--text-primary)',
          margin:        '0 0 2.5rem',
        }}
      >
        Dengan jujur,{' '}
        <em style={{ fontStyle: 'italic', color: 'var(--text-secondary)' }}>
          ini yang ingin aku sampaikan.
        </em>
      </motion.h2>
    </div>
  )
}

/* ─────────────────────────────────────────────
   Shared animation helper
   ───────────────────────────────────────────── */
const headerAnim = (inView, delay) =>
  inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }

const labelStyle = {
  display:       'block',
  fontFamily:    "'Manrope', sans-serif",
  fontSize:      '0.6rem',
  fontWeight:    500,
  letterSpacing: '0.28em',
  color:         'var(--text-secondary)',
  textTransform: 'uppercase',
  marginBottom:  '1.75rem',
}

/* ─────────────────────────────────────────────
   Main component
   ───────────────────────────────────────────── */
export default function Future({ id }) {
  const [q1]   = getQuotes('future')
  const wants  = getQuotes('choice')   /* 4 kalimat "What I Want" */

  return (
    <section id={id}
      style={{
        background: 'linear-gradient(180deg, var(--bg-primary) 0%, color-mix(in srgb, var(--bg-primary) 98%, var(--text-primary)) 100%)',
        padding:    'clamp(5rem, 12vh, 9rem) clamp(1.5rem, 8vw, 8rem)',
        position:   'relative',
        overflow:   'hidden',
      }}
    >
      {/* Warm glow — hopeful, tidak terlalu intens */}
      <div aria-hidden="true" style={{
        position:     'absolute', top: '10%', right: '-5%',
        width:        '45vmax', height: '45vmax', borderRadius: '50%',
        background:   'radial-gradient(circle, color-mix(in srgb, var(--accent) 4%, transparent) 0%, transparent 60%)',
        pointerEvents:'none',
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '640px' }}>

        {/* ════════════════════════════════════
            BAGIAN 1 — If We Ever Try Again
            ════════════════════════════════════ */}
        <Part1Header subtext={q1?.text} />

        {/* Checklist commitments */}
        <div>
          {COMMITMENTS.map((item, i) => (
            <CommitmentRow key={item.id} item={item} index={i} />
          ))}
        </div>

        {/* ────────────────────────────────────
            Beige divider antar dua bagian
            ──────────────────────────────────── */}
        <SectionDivider />

        {/* ════════════════════════════════════
            BAGIAN 2 — What I Want
            ════════════════════════════════════ */}
        <Part2Header />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.6rem' }}>
          {wants.map((q, i) => (
            <WantSentence key={q.id} text={q.text} index={i} />
          ))}
        </div>

      </div>
    </section>
  )
}
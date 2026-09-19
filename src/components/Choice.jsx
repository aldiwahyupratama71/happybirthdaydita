import { useRef, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

/* ─────────────────────────────────────────────
   8 kalimat "My Choice" — tiap kalimat punya
   bobot visualnya sendiri via metadata 'role'
   ───────────────────────────────────────────── */
const SENTENCES = [
  {
    id:   'mc-01',
    text: 'Aku sadar satu hal.',
    role: 'intro',        /* kecil, bisik, Manrope dim */
  },
  {
    id:   'mc-02',
    text: 'Aku masih ingin memperjuangkan kita.',
    role: 'declaration',  /* besar, Playfair, putih — inti section */
  },
  {
    id:   'mc-03',
    text: 'Tapi bukan hubungan kita yang dulu.',
    role: 'pivot',        /* Playfair italic, abu-abu — turning point */
  },
  {
    id:   'mc-04',
    text: 'Aku ingin memperjuangkan kemungkinan bahwa kita bisa membangun hubungan yang lebih sehat daripada sebelumnya.',
    role: 'context',      /* Manrope body, grey */
  },
  {
    id:   'mc-05',
    text: 'Aku memilih untuk membuka pintu.',
    role: 'choice',       /* Manrope, terang — aksi konkret */
  },
  {
    id:   'mc-06',
    text: 'Bukan memaksamu masuk.',
    role: 'qualifier',    /* Manrope kecil, indent, dim */
  },
  {
    id:   'mc-07',
    text: 'Bukan memintamu langsung menjawab.',
    role: 'qualifier',    /* idem */
  },
  {
    id:   'mc-08',
    text: 'Hanya memberitahumu bahwa pintu itu masih ada.',
    role: 'resolution',   /* Playfair italic, beige — penutup bagian ini */
  },
]

/* ─────────────────────────────────────────────
   Style map per role
   ───────────────────────────────────────────── */
const ROLE_STYLES = {
  intro: {
    fontFamily:    "'Manrope', sans-serif",
    fontSize:      'clamp(0.72rem, 1.5vw, 0.82rem)',
    fontWeight:    500,
    lineHeight:    1.6,
    color:         'color-mix(in srgb, var(--text-secondary) 50%, var(--bg-primary))',
    textTransform: 'uppercase',
    paddingLeft:   0,
  },
  declaration: {
    fontFamily:    "'Playfair Display', Georgia, serif",
    fontSize:      'clamp(1.6rem, 4vw, 2.6rem)',
    fontWeight:    400,
    letterSpacing: '-0.02em',
    lineHeight:    1.25,
    color:         'var(--text-primary)',
    paddingLeft:   0,
  },
  pivot: {
    fontFamily:  "'Playfair Display', Georgia, serif",
    fontStyle:   'italic',
    fontSize:    'clamp(1.1rem, 2.5vw, 1.5rem)',
    fontWeight:  400,
    lineHeight:  1.4,
    color:       'var(--text-secondary)',
    paddingLeft: 0,
  },
  context: {
    fontFamily:  "'Manrope', sans-serif",
    fontSize:    'clamp(0.88rem, 2vw, 1rem)',
    fontWeight:  400,
    lineHeight:  1.95,
    color:       'var(--text-secondary)',
    paddingLeft: 0,
  },
  choice: {
    fontFamily:    "'Manrope', sans-serif",
    fontSize:      'clamp(0.92rem, 2.1vw, 1.08rem)',
    fontWeight:    500,
    letterSpacing: '0.02em',
    lineHeight:    1.7,
    color:         'var(--text-primary)',
    paddingLeft:   0,
  },
  qualifier: {
    fontFamily:  "'Manrope', sans-serif",
    fontSize:    'clamp(0.82rem, 1.8vw, 0.94rem)',
    fontWeight:  400,
    lineHeight:  1.8,
    color:       'var(--text-secondary)',
    paddingLeft: 'clamp(1rem, 3vw, 1.8rem)',  /* indent — terasa seperti catatan */
  },
  resolution: {
    fontFamily:    "'Playfair Display', Georgia, serif",
    fontStyle:     'italic',
    fontSize:      'clamp(1.05rem, 2.5vw, 1.35rem)',
    fontWeight:    400,
    letterSpacing: '-0.01em',
    lineHeight:    1.85,
    color:         'var(--accent)',
    paddingLeft:   0,
  },
}

/* ─────────────────────────────────────────────
   Framer Motion variants — staggerChildren
   ───────────────────────────────────────────── */
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.42,   /* jeda antar kalimat — cukup lama untuk "landing" */
      delayChildren:   0.2,
    },
  },
}

const sentenceVariants = {
  hidden: { opacity: 0, y: 14, filter: 'blur(4px)' },
  show:   {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 1.5, ease: [0.25, 0.1, 0.25, 1] },
  },
}

/* ─────────────────────────────────────────────
   Satu kalimat
   ───────────────────────────────────────────── */
function Sentence({ item }) {
  return (
    <motion.p
      variants={sentenceVariants}
      style={{ margin: 0, ...ROLE_STYLES[item.role] }}
    >
      {item.text}
    </motion.p>
  )
}

/* ─────────────────────────────────────────────
   Main component
   ───────────────────────────────────────────── */
export default function Choice() {
  const headerRef = useRef(null)
  const headerIn  = useInView(headerRef, { once: true, margin: '-10% 0px' })

  const bodyRef   = useRef(null)
  const bodyIn    = useInView(bodyRef, { once: true, margin: '-8% 0px' })

  return (
    <section
      style={{
        minHeight:   '100vh',
        background:  'linear-gradient(180deg, var(--bg-primary) 0%, color-mix(in srgb, var(--bg-primary) 98%, var(--text-primary)) 100%)',
        padding:     'clamp(5rem, 12vh, 9rem) clamp(1.5rem, 8vw, 8rem)',
        position:    'relative',
        overflow:    'hidden',
      }}
    >
      {/* Subtle center glow — tidak terlalu hangat, ini momen mantap */}
      <div aria-hidden="true" style={{
        position:     'absolute', top: '40%', left: '40%',
        transform:    'translate(-50%,-50%)',
        width:        '50vmax', height: '50vmax', borderRadius: '50%',
        background:   'radial-gradient(circle, color-mix(in srgb, var(--text-primary) 1.2%, transparent) 0%, transparent 60%)',
        pointerEvents:'none',
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '580px' }}>

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
            {'14\u00a0\u00a0/\u00a0\u00a0So, What Do I Choose?'}
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={headerIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.4, delay: 0.14, ease: [0.25, 0.1, 0.25, 1] }}
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
            Ini{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>
              pilihanku.
            </em>
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={headerIn ? { scaleX: 1, opacity: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              width:           '36px',
              height:          '1px',
              background:      'var(--accent)',
              margin:          '1.8rem 0 3.5rem',
              transformOrigin: 'left center',
            }}
          />
        </div>

        {/* ══════════════════════════════════════════
            Kalimat-kalimat — staggerChildren
            ══════════════════════════════════════════ */}
        <motion.div
          ref={bodyRef}
          variants={containerVariants}
          initial="hidden"
          animate={bodyIn ? 'show' : 'hidden'}
          style={{
            display:       'flex',
            flexDirection: 'column',
            gap:           'clamp(1.1rem, 2.8vh, 1.8rem)',
          }}
        >
          {SENTENCES.map((item) => (
            <Sentence key={item.id} item={item} />
          ))}
        </motion.div>

        {/* ══════════════════════════════════════════
            BAGIAN 2 — Your Choice (section 16)
            ══════════════════════════════════════════ */}
        <YourChoice />

      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   SECTION 16 — Your Choice
   Dua tombol interaktif dengan respons masing-masing
   ───────────────────────────────────────────── */
const RESPONSES = {
  try: {
    text:  'Terima kasih sudah memberitahuku. Aku tidak tahu apa yang akan terjadi, tapi aku senang kita masih mau mencoba — dengan versi kita yang baru.',
    color: 'var(--accent)',  /* beige — hopeful */
  },
  time: {
    text:  'Tidak apa-apa. Kamu tidak perlu memutuskan sekarang. Ruang ini tetap ada, tidak kemana-mana.',
    color: 'var(--text-secondary)',  /* abu — gentle, no pressure */
  },
}

function YourChoice() {
  const [chosen, setChosen] = useState(null)  /* 'try' | 'time' | null */
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-8% 0px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
      style={{
        marginTop:   'clamp(5rem, 11vh, 8rem)',
        paddingTop:  'clamp(3.5rem, 8vh, 6rem)',
        borderTop:   '1px solid color-mix(in srgb, var(--text-primary) 5%, transparent)',
      }}
    >
      {/* Section label */}
      <span style={{
        display:       'block',
        fontFamily:    "'Manrope', sans-serif",
        fontSize:      '0.6rem',
        fontWeight:    500,
        letterSpacing: '0.28em',
        color:         'var(--text-secondary)',
        textTransform: 'uppercase',
        marginBottom:  '1.75rem',
      }}>
        {'16\u00a0\u00a0/\u00a0\u00a0Your Choice'}
      </span>

      <h2 style={{
        fontFamily:    "'Playfair Display', Georgia, serif",
        fontSize:      'clamp(1.4rem, 3.5vw, 2.2rem)',
        fontWeight:    400,
        lineHeight:    1.3,
        letterSpacing: '-0.02em',
        color:         'var(--text-primary)',
        margin:        '0 0 0.8rem',
      }}>
        Sekarang,{' '}
        <em style={{ fontStyle: 'italic', color: '#8a8a8a' }}>
          giliran kamu.
        </em>
      </h2>

      <p style={{
        fontFamily:  "'Manrope', sans-serif",
        fontSize:    'clamp(0.82rem, 1.8vw, 0.95rem)',
        lineHeight:  1.85,
        color:       'var(--text-secondary)',
        margin:      '0 0 3rem',
        maxWidth:    '420px',
      }}>
        Tidak ada jawaban yang salah. Tidak ada tekanan. Ini hanya untuk memberitahuku.
      </p>

      {/* Tombol-tombol */}
      <AnimatePresence mode="wait">
        {!chosen ? (
          <motion.div
            key="buttons"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.6 }}
            style={{
              display:  'flex',
              flexWrap: 'wrap',
              gap:      'clamp(0.8rem, 2vw, 1.2rem)',
            }}
          >
            {/* ── I WANT TO TRY ── */}
            <motion.button
              onClick={() => setChosen('try')}
              whileHover={{ scale: 1.02, borderColor: 'color-mix(in srgb, var(--accent) 50%, transparent)' }}
              whileTap={{ scale: 0.98 }}
              style={{
                fontFamily:    "'Manrope', sans-serif",
                fontSize:      'clamp(0.75rem, 1.6vw, 0.85rem)',
                fontWeight:    600,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color:         'var(--accent)',
                background:    'color-mix(in srgb, var(--accent) 6%, transparent)',
                border:        '1px solid color-mix(in srgb, var(--accent) 20%, transparent)',
                borderRadius:  '6px',
                padding:       'clamp(0.9rem, 2.5vw, 1.1rem) clamp(1.5rem, 4vw, 2.2rem)',
                cursor:        'pointer',
                transition:    'background 0.25s, border-color 0.25s',
              }}
            >
              I Want To Try
            </motion.button>

            {/* ── I NEED MORE TIME ── */}
            <motion.button
              onClick={() => setChosen('time')}
              whileHover={{ scale: 1.02, borderColor: 'color-mix(in srgb, var(--text-primary) 14%, transparent)' }}
              whileTap={{ scale: 0.98 }}
              style={{
                fontFamily:    "'Manrope', sans-serif",
                fontSize:      'clamp(0.75rem, 1.6vw, 0.85rem)',
                fontWeight:    600,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color:         'var(--text-secondary)',
                background:    'transparent',
                border:        '1px solid color-mix(in srgb, var(--text-primary) 8%, transparent)',
                borderRadius:  '6px',
                padding:       'clamp(0.9rem, 2.5vw, 1.1rem) clamp(1.5rem, 4vw, 2.2rem)',
                cursor:        'pointer',
                transition:    'background 0.25s, border-color 0.25s, color 0.25s',
              }}
            >
              I Need More Time
            </motion.button>
          </motion.div>
        ) : (
          /* ── Respons setelah tombol dipilih ── */
          <motion.div
            key="response"
            initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ maxWidth: '480px' }}
          >
            <p style={{
              fontFamily:  "'Playfair Display', Georgia, serif",
              fontStyle:   'italic',
              fontSize:    'clamp(1rem, 2.4vw, 1.25rem)',
              lineHeight:  1.9,
              color:       RESPONSES[chosen].color,
              margin:      '0 0 1.4rem',
            }}>
              {RESPONSES[chosen].text}
            </p>

            {/* Reset — biar bisa ganti pilihan */}
            <button
              onClick={() => setChosen(null)}
              style={{
                fontFamily:    "'Manrope', sans-serif",
                fontSize:      '0.6rem',
                fontWeight:    500,
                letterSpacing: '0.18em',
                color:         'color-mix(in srgb, var(--text-secondary) 50%, var(--bg-primary))',
                background:    'transparent',
                border:        'none',
                cursor:        'pointer',
                textTransform: 'uppercase',
                padding:       0,
                transition:    'color 0.3s',
              }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--text-secondary)'}
              onMouseLeave={e => e.currentTarget.style.color = 'color-mix(in srgb, var(--text-secondary) 50%, var(--bg-primary))'}
            >
              ← Kembali
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
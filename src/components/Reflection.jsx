import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { getQuotes } from '../data/quotes'

/* ─────────────────────────────────────────────
   SECTION 07 — Flow diagram data
   Semua step warna netral, tidak menyalahkan siapa pun
   ───────────────────────────────────────────── */
const FLOW_STEPS = [
  { id: 'fs-01', text: 'Aku sibuk', shade: 'n' },
  { id: 'fs-02', text: 'Lupa memberi kabar', shade: 'n' },
  { id: 'fs-03', text: 'Kamu merasa diabaikan', shade: 'n' },
  { id: 'fs-04', text: 'Kamu marah', shade: 'n' },
  { id: 'fs-05', text: 'Aku merasa semakin lelah', shade: 'n' },
  { id: 'fs-06', text: 'Aku menghindari pembicaraan', shade: 'n' },
  { id: 'fs-07', text: 'Kamu merasa semakin tidak dipedulikan', shade: 'n' },
  { id: 'fs-08', text: 'Konflik membesar', shade: 'peak' },
]

/* ─────────────────────────────────────────────
   SECTION 08 — Pengakuan diri
   Guardrail: murni refleksi diri, bukan tuduhan
   ───────────────────────────────────────────── */
const CONFESSIONS = [
  {
    id: 'cf-01',
    // Pengakuan 1 — kecenderungan ingin membentuk pasangan
    text: 'Aku terlalu sering ingin mengubah pasangan menjadi lebih produktif, mandiri, dan aktif. Pasangan bukan project yang harus dibentuk sesuai keinginan.',
  },
  {
    id: 'cf-02',
    // Pengakuan 2 — kebiasaan membandingkan
    text: 'Aku pernah membandingkan pasangan dengan bayangan seseorang dari masa lalu atau kehidupan orang-orang di media sosial.',
  },
  {
    id: 'cf-03',
    // Pengakuan 3 — menghindari konflik
    text: 'Aku punya kecenderungan menghindari konflik karena lelah, padahal masalah yang tidak dibicarakan tidak benar-benar hilang.',
  },
  {
    id: 'cf-04',
    // Pengakuan 4 — Aku sering membawa lelahku ke dalam hubungan
    text: 'Aku sadar, ketika aku sedang lelah karena pekerjaan, kuliah, tugas, atau hal-hal lain, aku sering kehilangan energi untuk menghadapi masalah dalam hubungan. Kadang aku menjadi lebih cuek, mudah kesal, atau memilih diam.',
  },
  {
    id: 'cf-05',
    // Pengakuan 5 — Aku sering menganggap masalah kecil tidak perlu dibicarakan
    text: 'Aku sering berpikir bahwa beberapa masalah akan selesai dengan sendirinya kalau dibiarkan. Sekarang aku sadar, sesuatu yang kecil bisa menjadi besar ketika terus disimpan dan tidak pernah benar-benar dibicarakan.',
  },
  {
    id: 'cf-06',
    // Pengakuan 6 — Aku kadang lebih ingin dimengerti 
    text: 'Ada saat ketika aku ingin kamu mengerti kesibukanku, rasa lelahku, dan keadaanku. Tapi aku lupa bahwa kamu juga ingin dimengerti.',
  },
  {
    id: 'cf-07',
    // Aku terlalu sering melihat hubungan dari sudut pandangku sendiri
    text: 'Aku sering melihat sesuatu berdasarkan apa yang menurutku benar dan baik. Aku lupa bahwa cara seseorang menjalani hidup tidak harus sama denganku untuk menjadi berarti.',
  },
  {
    id: 'cf-08',
    // Aku pernah mengira mencintai berarti membuat seseorang menjadi lebih baik
    text: 'Aku pernah mengira bahwa kalau aku mencintaimu, aku harus membuatmu menjadi versi yang menurutku lebih baik. Sekarang aku mulai memahami bahwa mencintai seseorang juga berarti menghargai siapa dirinya saat ini.',
  },
  {
    id: 'cf-09',
    // Aku tidak selalu tahu bagaimana cara menunjukkan rasa sayang
    text: 'Mungkin aku masih memiliki rasa, tetapi aku tidak selalu tahu bagaimana cara menunjukkannya dengan cara yang bisa kamu rasakan. Kadang aku mengira diam berarti tidak memperbesar masalah, sementara mungkin bagimu diam justru terasa seperti tidak peduli.',
  },
  {
    id: 'cf-10',
    //Aku baru benar-benar memahami beberapa hal setelah kita berjauhan
    text: 'Ada hal-hal yang baru bisa kulihat dengan lebih jelas setelah kita tidak lagi sedekat dulu. Jarak membuatku sadar bahwa selama ini aku terlalu sibuk mempertanyakan apa yang kurang darimu, sampai lupa bertanya apa yang perlu kubenahi dari diriku sendiri.',
  },
]

/* ══════════════════════════════════════════════
   SUB-COMPONENTS
   ══════════════════════════════════════════════ */

/* ── Satu langkah flow diagram ── */
function FlowStep({ step, index, isLast }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-8% 0px' })

  const isPeak = step.shade === 'peak'

  return (
    <div ref={ref} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <motion.div
        initial={{ opacity: 0, y: 14, scale: 0.97 }}
        animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 1.1, delay: 0.05, ease: [0.25, 0.1, 0.25, 1] }}
        style={{
          width: '100%',
          maxWidth: '360px',
          padding: '0.9rem 1.4rem',
          background: isPeak ? 'color-mix(in srgb, var(--text-primary) 5.5%, transparent)' : 'color-mix(in srgb, var(--text-primary) 4%, transparent)',
          border: `1px solid ${isPeak ? 'color-mix(in srgb, var(--accent) 16%, transparent)' : 'color-mix(in srgb, var(--text-primary) 7%, transparent)'}`,
          borderRadius: '6px',
          textAlign: 'center',
          position: 'relative',
        }}
      >
        {/* Index pill */}
        <span style={{
          position: 'absolute',
          top: '-8px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: "'Manrope', sans-serif",
          fontSize: '0.5rem',
          fontWeight: 600,
          letterSpacing: '0.18em',
          color: 'var(--text-secondary)',
          background: 'var(--bg-primary)',
          padding: '2px 8px',
          borderRadius: '999px',
          border: '1px solid var(--divider)',
          whiteSpace: 'nowrap',
        }}>
          {String(index + 1).padStart(2, '0')}
        </span>

        <p style={{
          fontFamily: "'Manrope', sans-serif",
          fontSize: 'clamp(0.8rem, 1.8vw, 0.92rem)',
          fontWeight: 400,
          lineHeight: 1.5,
          color: isPeak ? 'var(--text-primary)' : 'var(--text-secondary)',
          margin: 0,
          letterSpacing: '0.01em',
        }}>
          {step.text}
        </p>
      </motion.div>

      {/* Connector arrow */}
      {!isLast && (
        <motion.div
          initial={{ opacity: 0, scaleY: 0 }}
          animate={inView ? { opacity: 1, scaleY: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', transformOrigin: 'top' }}
        >
          <div style={{ width: '1px', height: '28px', background: 'linear-gradient(180deg, color-mix(in srgb, var(--text-primary) 8%, transparent) 0%, color-mix(in srgb, var(--text-primary) 4%, transparent) 100%)' }} />
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
            <path d="M1 1L5 5L9 1" stroke="color-mix(in srgb, var(--text-primary) 12%, transparent)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      )}
    </div>
  )
}

/* ── Loop label ── */
function LoopLabel() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-8% 0px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 1.2, delay: 0.2 }}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem', marginTop: '1.2rem' }}
    >
      <svg width="48" height="28" viewBox="0 0 48 28" fill="none" style={{ opacity: 0.22 }}>
        <path d="M4 14 C4 6, 44 6, 44 14 C44 22, 4 22, 4 14" stroke="color-mix(in srgb, var(--text-primary) 40%, transparent)" strokeWidth="1" strokeDasharray="3 3" fill="none" />
        <path d="M4 18L4 10L8 14Z" fill="color-mix(in srgb, var(--text-primary) 30%, transparent)" />
      </svg>
      <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.55rem', letterSpacing: '0.22em', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
        dan seterusnya...
      </span>
    </motion.div>
  )
}

/* ── Closing narrative (section 07) ── */
function ClosingNarrative({ lines }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-8% 0px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
      style={{ maxWidth: '560px', paddingTop: '2.5rem', borderTop: '1px solid color-mix(in srgb, var(--text-primary) 5%, transparent)' }}
    >
      {lines.map((line, i) => (
        <motion.p
          key={line.id}
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.3, delay: i * 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            fontFamily: i === 0 ? "'Playfair Display', Georgia, serif" : "'Manrope', sans-serif",
            fontStyle: i === 0 ? 'italic' : 'normal',
            fontSize: i === 0 ? 'clamp(1rem, 2.4vw, 1.25rem)' : 'clamp(0.82rem, 1.8vw, 0.95rem)',
            fontWeight: i === 0 ? 400 : 500,
            lineHeight: 1.9,
            color: i === 0 ? 'var(--text-primary)' : 'var(--accent)',
            letterSpacing: i === 1 ? '0.06em' : 0,
            margin: i === 0 ? '0 0 1rem' : 0,
          }}
        >
          {line.text}
        </motion.p>
      ))}
    </motion.div>
  )
}

/* ── Satu card pengakuan diri (section 08) ── */
function ConfessionCard({ item, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-8% 0px' })
  const num = String(index + 1).padStart(2, '0')

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.4, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      style={{
        position: 'relative',
        padding: 'clamp(1.5rem, 4vw, 2.2rem) clamp(1.4rem, 4vw, 2rem)',
        background: 'color-mix(in srgb, var(--text-primary) 2.5%, transparent)',
        border: '1px solid color-mix(in srgb, var(--text-primary) 5.5%, transparent)',
        borderRadius: '8px',
        overflow: 'hidden',
      }}
    >
      {/* ── Ghost number background ── */}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '-0.3rem',
          right: '0.8rem',
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: 'clamp(5rem, 14vw, 8rem)',
          fontWeight: 400,
          lineHeight: 1,
          color: 'color-mix(in srgb, var(--text-primary) 3%, transparent)',
          userSelect: 'none',
          pointerEvents: 'none',
          letterSpacing: '-0.02em',
        }}
      >
        {num}
      </span>

      {/* ── Card content ── */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Small index label */}
        <span style={{
          display: 'block',
          fontFamily: "'Manrope', sans-serif",
          fontSize: '0.55rem',
          fontWeight: 600,
          letterSpacing: '0.24em',
          color: 'var(--text-secondary)',
          textTransform: 'uppercase',
          marginBottom: '1rem',
        }}>
          {num}
        </span>

        {/* Confession text — Manrope body */}
        <p style={{
          fontFamily: "'Manrope', sans-serif",
          fontSize: 'clamp(0.88rem, 2vw, 1.02rem)',
          fontWeight: 400,
          lineHeight: 1.95,
          color: 'var(--text-secondary)',
          margin: 0,
          maxWidth: '520px',
        }}>
          {item.text}
        </p>
      </div>
    </motion.div>
  )
}

/* ── Section 08 header ── */
function MyReflectionHeader() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <div ref={ref} style={{ maxWidth: '560px', marginBottom: 'clamp(2.5rem, 6vh, 4rem)' }}>
      <motion.span
        initial={{ opacity: 0, y: 14 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
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
        {'08\u00a0\u00a0/\u00a0\u00a0My Reflection'}
      </motion.span>

      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.4, delay: 0.12, ease: [0.25, 0.1, 0.25, 1] }}
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: 'clamp(1.8rem, 4.5vw, 2.8rem)',
          fontWeight: 400,
          lineHeight: 1.25,
          letterSpacing: '-0.02em',
          color: 'var(--text-primary)',
          margin: '0 0 1rem',
        }}
      >
        Hal-hal yang{' '}
        <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>
          aku akui.
        </em>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.2, delay: 0.24, ease: [0.25, 0.1, 0.25, 1] }}
        style={{
          fontFamily: "'Manrope', sans-serif",
          fontSize: 'clamp(0.82rem, 1.8vw, 0.95rem)',
          lineHeight: 1.85,
          color: 'var(--text-secondary)',
          margin: 0,
        }}
      >
        Ini bukan pembelaan, bukan alasan. Hanya pengakuan jujur tentang apa yang
        aku temukan dalam diri sendiri.
      </motion.p>

      {/* Thin divider */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={inView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        style={{
          width: '36px',
          height: '1px',
          background: 'var(--accent)',
          marginTop: '2rem',
          transformOrigin: 'left center',
        }}
      />
    </div>
  )
}

/* ══════════════════════════════════════════════
   MAIN EXPORT
   ══════════════════════════════════════════════ */
export default function Reflection() {
  const reflectionQuotes = getQuotes('reflection')

  /* Section 07 header */
  const s07HeaderRef = useRef(null)
  const s07HeaderIn = useInView(s07HeaderRef, { once: true, margin: '-10% 0px' })

  return (
    <section
      style={{
        background: 'linear-gradient(180deg, var(--bg-primary) 0%, color-mix(in srgb, var(--bg-primary) 98%, var(--text-primary)) 100%)',
        padding: 'clamp(5rem, 12vh, 9rem) clamp(1.5rem, 8vw, 8rem)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Faint center radial */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: '30%', left: '50%',
        transform: 'translate(-50%,-50%)',
        width: '500px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(circle, color-mix(in srgb, var(--text-primary) 1.2%, transparent) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* ════════════════════════════════════
            SECTION 07 — Where We Got Lost
            ════════════════════════════════════ */}

        {/* Header 07 */}
        <div ref={s07HeaderRef} style={{ maxWidth: '560px', marginBottom: 'clamp(3rem, 7vh, 5rem)' }}>
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            animate={s07HeaderIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              display: 'block', fontFamily: "'Manrope', sans-serif",
              fontSize: '0.6rem', fontWeight: 500, letterSpacing: '0.28em',
              color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '1.75rem',
            }}
          >
            {'07\u00a0\u00a0/\u00a0\u00a0Where We Got Lost'}
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={s07HeaderIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.4, delay: 0.12, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(1.8rem, 4.5vw, 2.8rem)', fontWeight: 400,
              lineHeight: 1.25, letterSpacing: '-0.02em', color: 'var(--text-primary)', margin: '0 0 1rem',
            }}
          >
            Ada sebuah{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--text-secondary)' }}>pola yang terus berulang.</em>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={s07HeaderIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.24, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(0.82rem, 1.8vw, 0.95rem)',
              lineHeight: 1.85, color: 'var(--text-secondary)', margin: 0,
            }}
          >
            Bukan tentang siapa yang salah. Ini tentang bagaimana kita saling
            merespons — dan tanpa sadar, terus mengulang siklus yang sama.
          </motion.p>
        </div>

        {/* Flow diagram */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0, width: '100%' }}>
          {FLOW_STEPS.map((step, index) => (
            <FlowStep key={step.id} step={step} index={index} isLast={index === FLOW_STEPS.length - 1} />
          ))}
        </div>

        <LoopLabel />

        {/* Closing narrative 07 */}
        {reflectionQuotes.length > 0 && (
          <div style={{ marginTop: 'clamp(3rem, 7vh, 5rem)' }}>
            <ClosingNarrative lines={reflectionQuotes} />
          </div>
        )}

        {/* ════════════════════════════════════
            SECTION 08 — My Reflection
            ════════════════════════════════════ */}

        {/* Section break */}
        <div style={{
          margin: 'clamp(5rem, 12vh, 9rem) 0 clamp(4rem, 9vh, 7rem)',
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem',
        }}>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, color-mix(in srgb, var(--text-primary) 6%, transparent), transparent)' }} />
          <span style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: '0.52rem',
            letterSpacing: '0.22em',
            color: 'var(--divider)',
            textTransform: 'uppercase',
            flexShrink: 0,
          }}>
            ✦
          </span>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, color-mix(in srgb, var(--text-primary) 6%, transparent), transparent)' }} />
        </div>

        {/* Header 08 */}
        <MyReflectionHeader />

        {/* Confession cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1.2rem, 3vh, 1.8rem)', maxWidth: '640px' }}>
          {CONFESSIONS.map((item, index) => (
            <ConfessionCard key={item.id} item={item} index={index} />
          ))}
        </div>

      </div>
    </section>
  )
}
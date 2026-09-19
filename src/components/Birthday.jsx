import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { getQuotes } from '../data/quotes'

/* ─────────────────────────────────────────────
   Portrait photo — hero element, slow zoom on enter
   ───────────────────────────────────────────── */
function PortraitPhoto({ src }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        width: 'min(420px, 88vw)',
        aspectRatio: '3 / 4',
        borderRadius: '2px',
        boxShadow: '0 0 0 1px color-mix(in srgb, var(--accent) 15%, transparent), 0 40px 80px rgba(0,0,0,0.65)',
        margin: '0 auto',
      }}
    >
      {/* slow-zoom fill — starts zoomed-in, settles to natural */}
      <motion.div
        initial={{ scale: 1.14, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 2.6, ease: [0.25, 0.1, 0.25, 1] }}
        style={{
          position: 'absolute',
          inset: '-4%',
          background: src
            ? `url(${src}) center/cover no-repeat`
            : 'linear-gradient(160deg, var(--bg-primary) 0%, color-mix(in srgb, var(--bg-primary) 95%, var(--text-primary)) 45%, color-mix(in srgb, var(--bg-primary) 90%, var(--text-primary)) 100%)',
        }}
      >
        {/* placeholder icon — hilangkan saat foto asli dipasang */}
        {!src && (
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.6rem',
          }}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <rect x="1.5" y="1.5" width="29" height="29" rx="2" stroke="var(--divider)" strokeWidth="1.2" />
              <circle cx="11" cy="11" r="3" stroke="var(--divider)" strokeWidth="1.2" />
              <path d="M1 23L10 15L16 21L22 14L31 23" stroke="var(--divider)" strokeWidth="1.2" strokeLinejoin="round" />
            </svg>
            <span style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: '0.55rem',
              letterSpacing: '0.22em',
              color: 'var(--divider)',
              textTransform: 'uppercase',
            }}>
              foto terbaik
            </span>
          </div>
        )}
      </motion.div>

      {/* bottom vignette — agar teks di bawah readable */}
      <div aria-hidden="true" style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to top, rgba(8,8,8,0.5) 0%, transparent 50%)',
        pointerEvents: 'none',
      }} />
    </div>
  )
}

/* ─────────────────────────────────────────────
   Main component
   ───────────────────────────────────────────── */
export default function Birthday({ id }) {
  const [sub, closing] = getQuotes('birthday')
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-8% 0px' })

  /* Shared transition factory */
  const anim = (delay) => ({
    initial: { opacity: 0, y: 22 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 1.5, delay, ease: [0.25, 0.1, 0.25, 1] },
  })

  return (
    <section id={id}
      ref={sectionRef}
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, var(--bg-primary) 0%, color-mix(in srgb, var(--bg-primary) 97%, var(--text-primary)) 25%, color-mix(in srgb, var(--bg-primary) 94%, var(--text-primary)) 100%)',
        padding: 'clamp(5rem, 10vh, 7rem) clamp(1.5rem, 6vw, 6rem)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* ── Ambient glow (centered behind photo) ── */}
      <div aria-hidden="true" style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, color-mix(in srgb, var(--accent) 5%, transparent) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      {/* ═══════════════════════════════════════
          Layout — tiga baris vertikal, foto dominan
          ═══════════════════════════════════════ */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 0,
        position: 'relative',
        zIndex: 1,
      }}>

        

        {/* ── 2. Headline ── */}
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
          {'02\u00a0\u00a0/\u00a0\u00a0Birthday'}
        </motion.span>
        <motion.h1 {...anim(0.15)} style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: 'clamp(2.6rem, 6.5vw, 4.5rem)',
          fontWeight: 400,
          lineHeight: 1.15,
          letterSpacing: '-0.02em',
          color: 'var(--text-primary)',
          margin: 0,
          marginBottom: '1.2rem',
          textAlign: 'center',
        }}>
          Happy Birthday,{' '}
          <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>Dita Tiara Putri.</em>
        </motion.h1>

        {/* ── 3. Subheadline ── */}
        <motion.p {...anim(0.3)} style={{
          fontFamily: "'Manrope', sans-serif",
          fontSize: 'clamp(0.82rem, 1.7vw, 0.97rem)',
          fontWeight: 400,
          lineHeight: 1.9,
          color: 'var(--text-secondary)',
          maxWidth: '480px',
          textAlign: 'center',
          margin: 0,
          marginBottom: '3.5rem',
        }}>
          {sub?.text}
        </motion.p>

        {/* ── 4. Portrait Photo — hero ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.4, ease: 'easeOut' }}
        >
          <PortraitPhoto src="/photos/hero/hero.jpg" />
        </motion.div>

        {/* ── 5. Divider ── */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={inView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 1.4, delay: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            width: '44px',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, var(--accent) 40%, transparent)',
            margin: '3rem auto',
            transformOrigin: 'center',
          }}
        />

        {/* ── 6. Closing wish ── */}
        <motion.p {...anim(0.7)} style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontStyle: 'italic',
          fontSize: 'clamp(1rem, 2.3vw, 1.3rem)',
          fontWeight: 300,
          lineHeight: 2,
          color: 'color-mix(in srgb, var(--text-secondary) 80%, var(--text-primary))',
          maxWidth: '560px',
          textAlign: 'center',
          margin: 0,
        }}>
          {closing?.text}
        </motion.p>

        {/* ── 7. Signature dot ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 1.0, ease: [0.34, 1.56, 0.64, 1] }}
          style={{
            width: '5px',
            height: '5px',
            borderRadius: '50%',
            background: 'var(--accent-2)',
            marginTop: '2.5rem',
          }}
        />
      </div>
    </section>
  )
}
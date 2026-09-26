import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { getQuotes } from '../data/quotes'

export default function Final({ id }) {
  const [q1, q2] = getQuotes('final')
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <section id={id}
      style={{
        minHeight: '100vh',
        background: 'var(--bg-primary)',
        padding: 'clamp(5rem, 12vh, 9rem) clamp(1.5rem, 8vw, 8rem)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* ── Grain texture overlay ── */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.035\'/%3E%3C/svg%3E")',
        backgroundSize: '200px 200px',
        pointerEvents: 'none',
      }} />

      {/* ── Deep radial vignette ── */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 65% 55% at 50% 50%, transparent 25%, color-mix(in srgb, var(--bg-primary) 82%, transparent) 100%)',
        pointerEvents: 'none',
      }} />

      {/* ── Very soft warm center glow ── */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)',
        width: '60vmax', height: '60vmax', borderRadius: '50%',
        background: 'radial-gradient(circle, color-mix(in srgb, var(--accent) 3%, transparent) 0%, transparent 55%)',
        pointerEvents: 'none',
      }} />

      {/* ════════════════════════════════════
          Main content
          ════════════════════════════════════ */}
      <div
        ref={ref}
        style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '560px' }}
      >
        

        {/* Top beige line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={inView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 1.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            width: '44px', height: '1px',
            background: 'linear-gradient(90deg, transparent, color-mix(in srgb, var(--accent) 50%, transparent), transparent)',
            margin: '0 auto 3.5rem',
            transformOrigin: 'center',
          }}
        />

        {/* ── Main closing headline ── */}
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
          {'15\u00a0\u00a0/\u00a0\u00a0Final'}
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, filter: 'blur(14px)', y: 8 }}
          animate={inView ? { opacity: 1, filter: 'blur(0px)', y: 0 } : {}}
          transition={{ duration: 2.4, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontStyle: 'italic',
            fontSize: 'clamp(2.2rem, 6vw, 4rem)',
            fontWeight: 400,
            lineHeight: 1.2,
            letterSpacing: '-0.025em',
            color: 'var(--text-primary)',
            margin: '0 0 1.8rem',
          }}
        >
          {q1?.text || 'Selamat ulang tahun, Dita.'}
        </motion.h2>

        {/* ── Photo Collage ── */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 'clamp(8px, 2vw, 16px)',
          margin: '2rem auto 3.5rem',
          maxWidth: '480px',
        }}>
          {[
            { src: '/photos/final/final-01.jpg', rot: -8, mt: '12px' },
            { src: '/photos/final/final-02.jpg', rot: 6, mt: '-8px' },
            { src: '/photos/final/final-03.jpg', rot: -5, mt: '6px' },
            { src: '/photos/final/final-04.jpg', rot: 9, mt: '-4px' },
            { src: '/photos/final/final-05.jpg', rot: -7, mt: '10px' },
            { src: '/photos/final/final-06.jpg', rot: 12, mt: '-12px' },
          ].map((photo, i) => (
            <motion.div
              key={photo.src}
              initial={{ opacity: 0, scale: 0.7, rotate: photo.rot - 10 }}
              animate={inView ? { opacity: 1, scale: 1, rotate: photo.rot } : {}}
              transition={{ duration: 0.8, delay: 1.2 + i * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
              style={{
                width: 'clamp(90px, 26vw, 130px)',
                aspectRatio: '1 / 1',
                border: '5px solid #fff',
                boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
                marginTop: photo.mt,
                backgroundColor: '#eaeaea',
              }}
            >
              <img
                src={photo.src}
                alt=""
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* ── Signature / tanggal ── */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1.8, delay: 2.2 }}
          style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: '0.65rem',
            fontWeight: 500,
            letterSpacing: '0.22em',
            color: 'color-mix(in srgb, var(--text-secondary) 50%, var(--bg-primary))',
            textTransform: 'uppercase',
            margin: '0 0 4rem',
          }}
        >
          {q2?.text || 'September 2026'}
        </motion.p>

        {/* Bottom beige line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={inView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 1.6, delay: 2.6, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            width: '44px', height: '1px',
            background: 'linear-gradient(90deg, transparent, color-mix(in srgb, var(--accent) 50%, transparent), transparent)',
            margin: '0 auto 4rem',
            transformOrigin: 'center',
          }}
        />

        {/* ── Scroll to top ── */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1.2, delay: 3.0 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            fontFamily: "'Manrope', sans-serif",
            fontSize: '0.58rem',
            letterSpacing: '0.2em',
            color: 'color-mix(in srgb, var(--text-secondary) 50%, var(--bg-primary))',
            textTransform: 'uppercase',
            padding: 0,
            transition: 'color 0.3s',
          }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
          onMouseLeave={e => e.currentTarget.style.color = 'color-mix(in srgb, var(--text-secondary) 50%, var(--bg-primary))'}
        >
          ↑ Mulai dari awal
        </motion.button>
      </div>
    </section>
  )
}

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { getQuotes } from '../data/quotes'

/* ─────────────────────────────────────────────
   Animation variants — pelan, sinematik, tenang
   ───────────────────────────────────────────── */
const fadeBlurIn = {
  hidden: {
    opacity: 0,
    filter: 'blur(12px)',
    y: 10,
  },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    y: 0,
    transition: {
      duration: 1.8,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
}

const ctaVariant = {
  hidden: { opacity: 0, y: 6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.4,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
}

/* ─────────────────────────────────────────────
   Component
   ───────────────────────────────────────────── */
export default function Opening({ id }) {
  const [line1, line2] = getQuotes('opening')
  const sectionRef = useRef(null)

  /* scroll ke section Birthday */
  const handleStart = () => {
    const target = document.getElementById('section-birthday')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id={id}
      ref={sectionRef}
      style={{
        minHeight:      '100vh',
        display:        'flex',
        flexDirection:  'column',
        alignItems:     'center',
        justifyContent: 'center',
        background:     '#080808',
        position:       'relative',
        overflow:       'hidden',
        padding:        '0 clamp(1.5rem, 8vw, 8rem)',
      }}
    >
      {/* ── Grain texture overlay ── */}
      <div
        aria-hidden="true"
        style={{
          position:        'absolute',
          inset:           0,
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.035\'/%3E%3C/svg%3E")',
          backgroundSize:  '200px 200px',
          pointerEvents:   'none',
          zIndex:          0,
        }}
      />

      {/* ── Radial vignette ── */}
      <div
        aria-hidden="true"
        style={{
          position:   'absolute',
          inset:      0,
          background: 'radial-gradient(ellipse 70% 60% at 50% 50%, transparent 40%, rgba(0,0,0,0.7) 100%)',
          pointerEvents: 'none',
          zIndex:     1,
        }}
      />

      {/* ── Content ── */}
      <div
        style={{
          position:   'relative',
          zIndex:     2,
          display:    'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap:        '0',
          textAlign:  'center',
          maxWidth:   '680px',
        }}
      >
        {/* Thin decorative line — top */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            width:           '40px',
            height:          '1px',
            background:      '#d8c3a5',
            marginBottom:    '2rem',
            transformOrigin: 'left center',
          }}
        />

        {/* Line 1 */}
        <motion.h1
          variants={fadeBlurIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.8 }}
          style={{
            fontFamily:   "'Playfair Display', Georgia, serif",
            fontSize:     'clamp(1.5rem, 3.5vw, 2.4rem)',
            fontWeight:   400,
            lineHeight:   1.4,
            color:        '#fafafa',
            letterSpacing:'-0.01em',
            margin:       0,
          }}
        >
          {line1?.text}
        </motion.h1>

        {/* Line 2 */}
        <motion.p
          variants={fadeBlurIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 2.4 }}
          style={{
            fontFamily:   "'Playfair Display', Georgia, serif",
            fontStyle:    'italic',
            fontSize:     'clamp(1rem, 2.2vw, 1.35rem)',
            fontWeight:   300,
            lineHeight:   1.7,
            color:        '#8a8a8a',
            marginTop:    '1.25rem',
            marginBottom: 0,
          }}
        >
          {line2?.text}
        </motion.p>

        {/* CTA Button */}
        <motion.div
          variants={ctaVariant}
          initial="hidden"
          animate="visible"
          transition={{ delay: 4.2 }}
          style={{ marginTop: '3.5rem' }}
        >
          <button
            onClick={handleStart}
            style={{
              background:    'transparent',
              border:        'none',
              cursor:        'pointer',
              padding:       '0',
              display:       'flex',
              flexDirection: 'column',
              alignItems:    'center',
              gap:           '0.5rem',
              group:         true,
            }}
          >
            {/* Label */}
            <span
              style={{
                fontFamily:    "'Manrope', sans-serif",
                fontSize:      '0.65rem',
                fontWeight:    500,
                letterSpacing: '0.3em',
                color:         '#8a8a8a',
                textTransform: 'uppercase',
                transition:    'color 0.4s ease',
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#d8c3a5'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#8a8a8a'}
            >
              START OUR STORY
            </span>

            {/* Animated underline */}
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, delay: 5.0, ease: [0.25, 0.1, 0.25, 1] }}
              style={{
                display:         'block',
                width:           '100%',
                height:          '1px',
                background:      'linear-gradient(90deg, transparent, #d8c3a5, transparent)',
                transformOrigin: 'center',
              }}
            />

            {/* Chevron down — bounces gently */}
            <motion.svg
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 5.5 }}
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              style={{ marginTop: '0.5rem' }}
            >
              <path
                d="M2 5L7 10L12 5"
                stroke="#3a3a3a"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          </button>
        </motion.div>
      </div>
    </section>
  )
}
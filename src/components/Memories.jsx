import { useState, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { MEMORY_CATEGORIES, getByCategory } from '../data/memories'

/* ─────────────────────────────────────────────
   Slide variants — horizontal slide + fade
   ───────────────────────────────────────────── */
const slideVariants = {
  enter: (dir) => ({
    x:       dir > 0 ? '60%' : '-60%',
    opacity: 0,
    scale:   0.96,
    filter:  'blur(8px)',
  }),
  center: {
    x:       0,
    opacity: 1,
    scale:   1,
    filter:  'blur(0px)',
    transition: { duration: 0.75, ease: [0.25, 0.1, 0.25, 1] },
  },
  exit: (dir) => ({
    x:       dir > 0 ? '-40%' : '40%',
    opacity: 0,
    scale:   0.97,
    filter:  'blur(6px)',
    transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] },
  }),
}

/* ─────────────────────────────────────────────
   Satu foto slide — foto + caption overlay
   ───────────────────────────────────────────── */
function PhotoSlide({ photo, direction, onDragEnd }) {
  const [error, setError] = useState(false)

  // Reset error state when photoUrl changes (e.g. during HMR or when typing)
  useEffect(() => {
    setError(false)
  }, [photo.photoUrl])

  return (
    <motion.div
      key={photo.id}
      custom={direction}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.15}
      onDragEnd={onDragEnd}
      style={{
        position:   'absolute',
        inset:      0,
        cursor:     'grab',
        userSelect: 'none',
      }}
    >
      {/* ── Photo fill ── */}
      <div style={{
        position:   'absolute',
        inset:      0,
        background: 'var(--bg-primary)',
      }}>
        {photo.photoUrl && !error && (
          <img
            src={photo.photoUrl}
            alt={photo.caption || 'Memory'}
            onError={() => setError(true)}
            style={{
              width:     '100%',
              height:    '100%',
              objectFit: 'cover',
              display:   'block',
            }}
          />
        )}
        
        {/* placeholder icon */}
        {(!photo.photoUrl || error) && (
          <div style={{
            position:       'absolute',
            inset:          0,
            display:        'flex',
            flexDirection:  'column',
            alignItems:     'center',
            justifyContent: 'center',
            gap:            '0.75rem',
            background:     'linear-gradient(135deg, color-mix(in srgb, var(--bg-primary) 96%, var(--text-primary)) 0%, var(--bg-primary) 50%, color-mix(in srgb, var(--bg-primary) 92%, var(--text-primary)) 100%)',
          }}>
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <rect x="1.5" y="1.5" width="33" height="33" rx="3" stroke="var(--divider)" strokeWidth="1.2"/>
              <circle cx="13" cy="13" r="3.5" stroke="var(--divider)" strokeWidth="1.2"/>
              <path d="M2 27L12 18L18 24L25 16L34 27" stroke="var(--divider)" strokeWidth="1.2" strokeLinejoin="round"/>
            </svg>
            <span style={{
              fontFamily:    "'Manrope', sans-serif",
              fontSize:      '0.55rem',
              letterSpacing: '0.2em',
              color:         'var(--divider)',
              textTransform: 'uppercase',
            }}>
              {photo.caption || 'foto coming soon'}
            </span>
          </div>
        )}
      </div>

      {/* ── Bottom gradient + caption ── */}
      {photo.caption && (
        <>
          <div style={{
            position:   'absolute',
            bottom:     0,
            left:       0,
            right:      0,
            height:     '35%',
            background: 'linear-gradient(to top, rgba(5,5,5,0.9) 0%, transparent 100%)',
            pointerEvents: 'none',
          }} />
          <p style={{
            position:      'absolute',
            bottom:        '1.75rem',
            left:          '1.5rem',
            right:         '1.5rem',
            fontFamily:    "'Manrope', sans-serif",
            fontSize:      'clamp(0.72rem, 1.6vw, 0.82rem)',
            fontWeight:    400,
            lineHeight:    1.7,
            color:         'rgba(200,200,200,0.85)',
            letterSpacing: '0.02em',
            margin:        0,
            pointerEvents: 'none',
          }}>
            {photo.caption}
          </p>
        </>
      )}
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   Dot navigation indicator
   ───────────────────────────────────────────── */
function DotNav({ total, current, onSelect }) {
  return (
    <div style={{
      display:        'flex',
      alignItems:     'center',
      justifyContent: 'center',
      gap:            '6px',
      paddingTop:     '1rem',
    }}>
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          style={{
            width:         i === current ? '20px' : '6px',
            height:        '6px',
            borderRadius:  '999px',
            background:    i === current ? 'var(--accent)' : 'var(--divider)',
            border:        'none',
            cursor:        'pointer',
            padding:       0,
            transition:    'all 0.35s ease',
            flexShrink:    0,
          }}
        />
      ))}
    </div>
  )
}

/* ─────────────────────────────────────────────
   Slider untuk satu kategori
   ───────────────────────────────────────────── */
function CategorySlider({ category, photos }) {
  const [current, setCurrent]     = useState(0)
  const [direction, setDirection] = useState(1)
  const ref                       = useRef(null)
  const inView                    = useInView(ref, { once: true, margin: '-10% 0px' })

  const goTo = useCallback((index) => {
    setDirection(index > current ? 1 : -1)
    setCurrent(index)
  }, [current])

  const goPrev = () => goTo(Math.max(current - 1, 0))
  const goNext = () => goTo(Math.min(current + 1, photos.length - 1))

  const handleDragEnd = useCallback((_, { offset, velocity }) => {
    const swipeThreshold = 50
    const velThreshold   = 400
    if (offset.x < -swipeThreshold || velocity.x < -velThreshold) goNext()
    if (offset.x >  swipeThreshold || velocity.x >  velThreshold) goPrev()
  }, [current, photos.length]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.3, ease: [0.25, 0.1, 0.25, 1] }}
      style={{ marginBottom: 'clamp(4rem, 10vh, 7rem)' }}
    >
      {/* ── Category label ── */}
      <div style={{
        display:       'flex',
        alignItems:    'center',
        gap:           '0.75rem',
        marginBottom:  '1.25rem',
        paddingLeft:   '0.25rem',
      }}>
        <div style={{ width: '20px', height: '1px', background: 'var(--accent)', flexShrink: 0 }} />
        <span style={{
          fontFamily:    "'Manrope', sans-serif",
          fontSize:      '0.6rem',
          fontWeight:    500,
          letterSpacing: '0.25em',
          color:         'var(--text-secondary)',
          textTransform: 'uppercase',
        }}>
          {category}
        </span>
        <div style={{
          flex:       1,
          height:     '1px',
          background: 'linear-gradient(to right, var(--divider), transparent)',
        }} />
        <span style={{
          fontFamily:    "'Manrope', sans-serif",
          fontSize:      '0.55rem',
          letterSpacing: '0.15em',
          color:         'var(--text-secondary)',
        }}>
          {String(current + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
        </span>
      </div>

      {/* ── Photo viewport — 80% screen height ── */}
      <div style={{
        position:   'relative',
        width:      '100%',
        height:     '80vh',
        overflow:   'hidden',
        borderRadius:'2px',
        background: 'var(--bg-primary)',
      }}>
        <AnimatePresence mode="popLayout" custom={direction} initial={false}>
          <PhotoSlide
            key={photos[current].id}
            photo={photos[current]}
            direction={direction}
            onDragEnd={handleDragEnd}
          />
        </AnimatePresence>

        {/* ── Desktop arrow buttons ── */}
        {current > 0 && (
          <button
            onClick={goPrev}
            aria-label="Previous photo"
            style={{
              position:    'absolute',
              left:        '1rem',
              top:         '50%',
              transform:   'translateY(-50%)',
              background:  'rgba(0,0,0,0.4)',
              border:      '1px solid rgba(255,255,255,0.06)',
              borderRadius:'50%',
              width:       '40px',
              height:      '40px',
              cursor:      'pointer',
              display:     'flex',
              alignItems:  'center',
              justifyContent:'center',
              zIndex:      10,
              backdropFilter:'blur(8px)',
              transition:  'background 0.25s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(216,195,165,0.15)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0.4)'}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8L10 13" stroke="#c8c8c8" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}
        {current < photos.length - 1 && (
          <button
            onClick={goNext}
            aria-label="Next photo"
            style={{
              position:    'absolute',
              right:       '1rem',
              top:         '50%',
              transform:   'translateY(-50%)',
              background:  'rgba(0,0,0,0.4)',
              border:      '1px solid rgba(255,255,255,0.06)',
              borderRadius:'50%',
              width:       '40px',
              height:      '40px',
              cursor:      'pointer',
              display:     'flex',
              alignItems:  'center',
              justifyContent:'center',
              zIndex:      10,
              backdropFilter:'blur(8px)',
              transition:  'background 0.25s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(216,195,165,0.15)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0.4)'}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 3L11 8L6 13" stroke="#c8c8c8" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}
      </div>

      {/* ── Dot nav ── */}
      {photos.length > 1 && (
        <DotNav total={photos.length} current={current} onSelect={goTo} />
      )}
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   Main component
   ───────────────────────────────────────────── */
export default function Memories({ id }) {
  const headerRef = useRef(null)
  const headerIn  = useInView(headerRef, { once: true, margin: '-10% 0px' })

  return (
    <section id={id}
      style={{
        background:   'linear-gradient(180deg, var(--bg-primary) 0%, color-mix(in srgb, var(--bg-primary) 96%, var(--text-primary)) 100%)',
        padding:      'clamp(5rem, 12vh, 9rem) clamp(1.25rem, 6vw, 5rem)',
        position:     'relative',
        overflow:     'hidden',
      }}
    >
      {/* ══════════════════════
          Header
          ══════════════════════ */}
      <div
        ref={headerRef}
        style={{ maxWidth: '600px', marginBottom: 'clamp(3.5rem, 8vh, 6rem)' }}
      >
        

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
          {'05\u00a0\u00a0/\u00a0\u00a0Memories'}
        </motion.span>
        

        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          animate={headerIn ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.4, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            fontFamily:    "'Playfair Display', Georgia, serif",
            fontSize:      'clamp(1.9rem, 4.5vw, 2.9rem)',
            fontWeight:    400,
            lineHeight:    1.25,
            letterSpacing: '-0.02em',
            color:         'var(--text-primary)',
            margin:        '0 0 1.1rem',
          }}
        >
          Setiap foto menyimpan{' '}
          <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>
            versi kita yang berbeda.
          </em>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={headerIn ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.3, delay: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize:   'clamp(0.82rem, 1.8vw, 0.95rem)',
            lineHeight: 1.85,
            color:      'var(--text-secondary)',
            margin:     0,
          }}
        >
          Geser atau swipe untuk menelusuri setiap kenangan.
        </motion.p>
      </div>

      {/* ══════════════════════
          Gallery per kategori
          ══════════════════════ */}
      {MEMORY_CATEGORIES.map((category) => {
        const photos = getByCategory(category)
        if (!photos.length) return null
        return (
          <CategorySlider
            key={category}
            category={category}
            photos={photos}
          />
        )
      })}
    </section>
  )
}
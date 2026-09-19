import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { timelineData } from '../data/timeline'
import { getQuotes } from '../data/quotes'

/* ─────────────────────────────────────────────
   Foto kecil per chapter — slow zoom on inView
   ───────────────────────────────────────────── */
function ChapterPhoto({ src, title }) {
  const ref      = useRef(null)
  const inView   = useInView(ref, { once: true, margin: '-10% 0px' })
  const [error, setError] = useState(false)

  const showPlaceholder = !src || error

  return (
    <div
      ref={ref}
      style={{
        width:       '100%',
        maxWidth:    '260px',
        aspectRatio: '4 / 3',
        overflow:    'hidden',
        borderRadius:'2px',
        boxShadow:   '0 0 0 1px color-mix(in srgb, var(--accent) 12%, transparent), 0 16px 40px rgba(0,0,0,0.5)',
        flexShrink:  0,
        position:    'relative',
        background:  'var(--bg-primary)',
      }}
    >
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 2.0, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ width: '100%', height: '100%', position: 'relative' }}
      >
        {/* ── Foto asli ── */}
        {!showPlaceholder && (
          <img
            src={src}
            alt={title || 'Timeline photo'}
            onError={() => setError(true)}
            style={{
              width:     '100%',
              height:    '100%',
              objectFit: 'cover',
              display:   'block',
            }}
          />
        )}

        {/* ── Placeholder — tampil saat foto belum ada ── */}
        {showPlaceholder && (
          <div style={{
            width:          '100%',
            height:         '100%',
            background:     'linear-gradient(135deg, #1a1a18 0%, #131311 60%, #1c1a16 100%)',
            display:        'flex',
            flexDirection:  'column',
            alignItems:     'center',
            justifyContent: 'center',
            gap:            '0.5rem',
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect x="1" y="1" width="22" height="22" rx="2" stroke="var(--divider)" strokeWidth="1"/>
              <circle cx="8.5" cy="8.5" r="2" stroke="var(--divider)" strokeWidth="1"/>
              <path d="M1 17L7 11L11 15L16 9L23 17" stroke="var(--divider)" strokeWidth="1" strokeLinejoin="round"/>
            </svg>
            <span style={{
              fontFamily:    "'Manrope', sans-serif",
              fontSize:      '0.5rem',
              letterSpacing: '0.2em',
              color:         'var(--divider)',
              textTransform: 'uppercase',
            }}>
              foto belum ada
            </span>
          </div>
        )}
      </motion.div>
    </div>
  )
}


/* ─────────────────────────────────────────────
   Satu baris timeline — dot + card konten
   ───────────────────────────────────────────── */
function TimelineItem({ item, index }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-12% 0px' })

  return (
    <div
      ref={ref}
      style={{
        display:  'flex',
        position: 'relative',
        /* spacing antar item */
        paddingBottom: index < timelineData.length - 1 ? 'clamp(3rem, 8vh, 5rem)' : 0,
      }}
    >
      {/* ── Dot on the line ── */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.34, 1.56, 0.64, 1] }}
        style={{
          /* center dot pada garis (garis di left: 0, lebar 2px) */
          position:    'absolute',
          left:        '-5px',       /* (dot width 12px / 2) - (line width 2px / 2) = 5px */
          top:         '6px',
          width:       '12px',
          height:      '12px',
          borderRadius:'50%',
          background:  'var(--accent)',
          boxShadow:   '0 0 12px color-mix(in srgb, var(--accent) 35%, transparent)',
          zIndex:      2,
          flexShrink:  0,
        }}
      />

      {/* ── Card (foto + teks) ── */}
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 1.4, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        style={{
          marginLeft:    '2rem',   /* space setelah dot */
          display:       'flex',
          flexDirection: 'column',
          gap:           '1rem',
          width:         '100%',
        }}
      >
        {/* Index label */}
        <span style={{
          fontFamily:    "'Manrope', sans-serif",
          fontSize:      '0.55rem',
          fontWeight:    500,
          letterSpacing: '0.25em',
          color:         'var(--text-secondary)',
          textTransform: 'uppercase',
        }}>
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* Chapter title */}
        <h3 style={{
          fontFamily:    "'Playfair Display', Georgia, serif",
          fontSize:      'clamp(1.3rem, 3vw, 1.8rem)',
          fontWeight:    400,
          lineHeight:    1.25,
          letterSpacing: '-0.01em',
          color:         'var(--text-primary)',
          margin:        0,
        }}>
          {item.chapterTitle}
          {item.date && (
            <span style={{
              display:     'block',
              fontFamily:  "'Manrope', sans-serif",
              fontSize:    '0.7rem',
              fontWeight:  400,
              letterSpacing:'0.15em',
              color:       'var(--accent)',
              marginTop:   '0.35rem',
              fontStyle:   'normal',
            }}>
              {item.date}
            </span>
          )}
        </h3>

        {/* Foto chapter */}
        {/* Selalu render area foto — tampilkan placeholder jika photoUrl kosong */}
        <ChapterPhoto src={item.photoUrl} title={item.chapterTitle} />

        {/* Short story */}
        {item.shortStory && (
          <p style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize:   'clamp(0.82rem, 1.8vw, 0.95rem)',
            fontWeight: 400,
            lineHeight: 1.9,
            color:      'var(--text-secondary)',
            margin:     0,
            maxWidth:   '420px',
          }}>
            {item.shortStory}
          </p>
        )}
      </motion.div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   Main component
   ───────────────────────────────────────────── */
export default function Timeline() {
  const [introQuote] = getQuotes('timeline')
  const sectionRef   = useRef(null)
  const lineRef      = useRef(null)
  const headerRef    = useRef(null)
  const headerIn     = useInView(headerRef, { once: true, margin: '-10% 0px' })

  /* ── Scroll-linked progressive line ── */
  const { scrollYProgress } = useScroll({
    target:  sectionRef,
    /* mulai tumbuh saat atas section menyentuh tengah viewport,
       selesai saat bawah section meninggalkan tengah viewport    */
    offset:  ['start 60%', 'end 60%'],
  })

  /* Map scroll 0→1 ke height string "0%"→"100%" */
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section
      ref={sectionRef}
      style={{
        minHeight:   '100vh',
        background:  'linear-gradient(180deg, color-mix(in srgb, var(--bg-primary) 96%, var(--text-primary)) 0%, var(--bg-primary) 100%)',
        padding:     'clamp(5rem, 12vh, 9rem) clamp(1.5rem, 8vw, 8rem)',
        position:    'relative',
        overflow:    'hidden',
      }}
    >
      {/* ══════════════════════════════
          Header
          ══════════════════════════════ */}
      <div
        ref={headerRef}
        style={{ maxWidth: '640px', marginBottom: 'clamp(3.5rem, 8vh, 5.5rem)' }}
      >
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
          {'04\u00a0\u00a0/\u00a0\u00a0Timeline'}
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
            margin:        '0 0 1.2rem',
          }}
        >
          Setiap chapter{' '}
          <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>
            punya tempatnya sendiri.
          </em>
        </motion.h2>

        {introQuote?.text && (
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={headerIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.3, delay: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize:   'clamp(0.85rem, 1.8vw, 0.97rem)',
              fontWeight: 400,
              lineHeight: 1.85,
              color:      'var(--text-secondary)',
              margin:     0,
              maxWidth:   '480px',
            }}
          >
            {introQuote.text}
          </motion.p>
        )}
      </div>

      {/* ══════════════════════════════
          Timeline track
          ══════════════════════════════ */}
      <div
        style={{
          position:   'relative',
          /* garis berada di kiri — berikan padding kiri agar dot tidak terpotong */
          paddingLeft:'2px',
          maxWidth:   '680px',
        }}
      >
        {/* ── Background rail (track tetap, abu pekat) ── */}
        <div
          ref={lineRef}
          style={{
            position:     'absolute',
            top:          0,
            left:         0,
            width:        '2px',
            height:       '100%',
            background:   'var(--divider)',
            borderRadius: '999px',
          }}
        />

        {/* ── Animated fill (tumbuh seiring scroll) ── */}
        <motion.div
          style={{
            position:     'absolute',
            top:          0,
            left:         0,
            width:        '2px',
            height:       lineHeight,   /* ← scroll-linked */
            background:   'var(--accent)',
            borderRadius: '999px',
            transformOrigin: 'top',
            zIndex:       1,
          }}
        />

        {/* ── Timeline items ── */}
        <div style={{ position: 'relative', zIndex: 2 }}>
          {timelineData.map((item, index) => (
            <TimelineItem key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
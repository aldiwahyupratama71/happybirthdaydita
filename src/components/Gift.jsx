import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Watch, Flower2 } from 'lucide-react'

/* ─────────────────────────────────────────────
   FOTO (opsional)
   Isi path dari public/photos/gift/ saat foto sudah tersedia.
   Biarkan string kosong '' untuk menyembunyikan area foto.
   ───────────────────────────────────────────── */
const WATCH_PHOTO_URL  = ''   /* contoh: '/photos/gift/jam-tangan.jpg' */
const FLOWER_PHOTO_URL = ''   /* contoh: '/photos/gift/bunga.jpg' */

/* ─────────────────────────────────────────────
   Narasi Jam Tangan
   ───────────────────────────────────────────── */
const WATCH_PARAGRAPHS = [
  'Tentang hadiah kecil ini...',
  'Aku memilih memberikanmu sebuah jam tangan bukan karena aku ingin mengatur bagaimana kamu menjalani hari-harimu.',
  'Dulu, mungkin aku sering berpikir bahwa kamu harus lebih produktif, lebih aktif, atau lebih seperti apa yang menurutku baik.',
  'Tapi sekarang aku belajar bahwa hidupmu bukan sesuatu yang harus aku atur.',
  'Jadi, kali ini aku tidak ingin hadiah ini menjadi pengingat tentang apa yang harus kamu lakukan.',
  'Aku hanya ingin ia menjadi sesuatu yang bisa menemani hari-harimu.',
  'Mengingatkanmu untuk bergerak ketika terlalu lama diam, mengingatkanmu untuk beristirahat ketika terlalu lelah, membantumu memperhatikan kesehatanmu, dan mungkin menemani langkah-langkah kecilmu menuju hal-hal yang ingin kamu capai.',
  'Bukan supaya kamu menjadi seseorang yang aku inginkan.',
  'Tapi supaya kamu bisa terus menjadi dirimu sendiri, dalam versi yang lebih sehat dan bahagia.',
  'Dan kalau suatu hari nanti kamu melihat jam ini dan mengingat siapa yang memberikannya, aku harap yang kamu ingat bukan tuntutan untuk berubah.',
  'Tapi seseorang yang pernah begitu peduli denganmu dan ingin melihatmu baik-baik saja.',
]

/* ─────────────────────────────────────────────
   Narasi Bunga
   ───────────────────────────────────────────── */
const FLOWER_PARAGRAPHS = [
  'Aku juga memberikanmu bunga.',
  'Mungkin terlihat sederhana, tapi ada alasan kenapa aku memilihnya.',
  'Bunga selalu mengingatkanku bahwa sesuatu yang indah tidak selalu harus dimiliki untuk bisa dihargai.',
  'Ia tumbuh dengan caranya sendiri, membutuhkan waktu, perhatian, dan ruang untuk berkembang.',
  'Dan semakin aku memikirkan hubungan kita, semakin aku sadar bahwa mungkin manusia juga begitu.',
  'Dulu aku terlalu sering berpikir tentang bagaimana membuatmu tumbuh menjadi seseorang yang menurutku lebih baik.',
  'Sekarang aku belajar bahwa aku tidak harus menentukan seperti apa bunga itu harus tumbuh.',
  'Aku hanya bisa memberikan ruang, perhatian, dan menghargai keindahannya sebagaimana adanya.',
  'Mungkin itu juga yang ingin aku pelajari tentang mencintai seseorang.',
  'Tidak selalu tentang mengubah.',
  'Tidak selalu tentang memiliki.',
  'Tetapi tentang menghargai, menjaga, dan membiarkan seseorang tumbuh menjadi dirinya sendiri.',
  'Jadi bunga ini bukan hanya bunga untuk ulang tahunmu.',
  'Ini adalah pengingat kecil tentang sesuatu yang sedang aku pelajari.',
  'Bahwa sesuatu yang indah tidak harus selalu aku bentuk agar sesuai dengan keinginanku.',
  'Kadang, aku hanya perlu belajar menghargainya.',
]

/* ─────────────────────────────────────────────
   Satu paragraf — fade in saat scroll masuk viewport
   ───────────────────────────────────────────── */
function FadeParagraph({ text, index, isOpening = false }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-4% 0px' })

  return (
    <motion.p
      ref={ref}
      initial={{ opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 1.3,
        delay: 0.04,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      style={{
        fontFamily:  "'Manrope', 'Inter', sans-serif",
        fontSize:    isOpening
          ? 'clamp(0.78rem, 1.6vw, 0.88rem)'
          : 'clamp(0.9rem, 2vw, 1.02rem)',
        fontWeight:  isOpening ? 500 : 400,
        lineHeight:  isOpening ? 1.6 : 2.05,
        color:       isOpening
          ? 'color-mix(in srgb, var(--text-secondary) 70%, transparent)'
          : 'color-mix(in srgb, var(--text-primary) 62%, transparent)',
        fontStyle:   isOpening ? 'italic' : 'normal',
        margin:      0,
      }}
    >
      {text}
    </motion.p>
  )
}

/* ─────────────────────────────────────────────
   Area foto placeholder (ditampilkan hanya jika ada URL)
   ───────────────────────────────────────────── */
function PhotoArea({ src, alt, label }) {
  return (
    <div style={{
      width:        'clamp(80px, 18vw, 120px)',
      height:       'clamp(90px, 20vw, 140px)',
      borderRadius: '8px',
      overflow:     'hidden',
      border:       '1px solid color-mix(in srgb, var(--accent) 18%, transparent)',
      flexShrink:   0,
      background:   'color-mix(in srgb, var(--text-primary) 4%, transparent)',
      display:      'flex',
      alignItems:   'center',
      justifyContent: 'center',
      position:     'relative',
    }}>
      {src ? (
        <img
          src={src}
          alt={alt}
          style={{
            width:      '100%',
            height:     '100%',
            objectFit:  'cover',
            opacity:    0.82,
          }}
        />
      ) : (
        /* Placeholder saat foto belum diisi */
        <span style={{
          fontFamily:    "'Manrope', sans-serif",
          fontSize:      '0.52rem',
          fontWeight:    500,
          letterSpacing: '0.14em',
          color:         'color-mix(in srgb, var(--text-secondary) 35%, transparent)',
          textAlign:     'center',
          textTransform: 'uppercase',
          padding:       '0 0.5rem',
          lineHeight:    1.6,
        }}>
          {label}
        </span>
      )}
    </div>
  )
}

/* ─────────────────────────────────────────────
   Kartu hadiah — jam tangan atau bunga
   ───────────────────────────────────────────── */
function GiftCard({ icon: Icon, iconLabel, photoSrc, photoAlt, photoLabel, paragraphs, cardIndex }) {
  const cardRef = useRef(null)
  const cardIn  = useInView(cardRef, { once: true, margin: '-6% 0px' })

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 36 }}
      animate={cardIn ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.6, delay: cardIndex * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
      style={{
        background:   'color-mix(in srgb, var(--text-primary) 3%, transparent)',
        border:       '1px solid color-mix(in srgb, var(--text-primary) 7%, transparent)',
        borderRadius: '12px',
        padding:      'clamp(2rem, 5vw, 3.5rem)',
        position:     'relative',
        overflow:     'hidden',
      }}
    >
      {/* Subtle inner glow */}
      <div aria-hidden="true" style={{
        position:   'absolute',
        top:        '-30%',
        right:      '-20%',
        width:      '40vmax',
        height:     '40vmax',
        borderRadius: '50%',
        background: 'radial-gradient(circle, color-mix(in srgb, var(--accent) 3%, transparent) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      {/* ── Header kartu: icon + foto (jika ada) ── */}
      <div style={{
        display:        'flex',
        alignItems:     'flex-start',
        justifyContent: 'space-between',
        marginBottom:   'clamp(1.8rem, 4vh, 2.5rem)',
        gap:            '1rem',
      }}>
        {/* Icon Lucide */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={cardIn ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.1, delay: 0.2 + cardIndex * 0.12, ease: [0.34, 1.56, 0.64, 1] }}
          style={{
            color:      'var(--accent)',
            opacity:    0.7,
            lineHeight: 0,
          }}
          aria-label={iconLabel}
        >
          <Icon size={32} strokeWidth={1.25} />
        </motion.div>

        {/* Foto pojok kanan atas (opsional) */}
        {(photoSrc !== undefined) && (
          <PhotoArea src={photoSrc} alt={photoAlt} label={photoLabel} />
        )}
      </div>

      {/* ── Paragraf narasi ── */}
      <div style={{
        display:       'flex',
        flexDirection: 'column',
        gap:           '1.75rem',
        position:      'relative',
        zIndex:        1,
      }}>
        {paragraphs.map((text, i) => (
          <FadeParagraph
            key={i}
            text={text}
            index={i}
            isOpening={i === 0}
          />
        ))}
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   Main component
   ───────────────────────────────────────────── */
export default function Gift({ id }) {
  const headerRef = useRef(null)
  const headerIn  = useInView(headerRef, { once: true, margin: '-10% 0px' })

  return (
    <section
      id={id}
      style={{
        background: 'linear-gradient(180deg, var(--bg-primary) 0%, color-mix(in srgb, var(--bg-primary) 98%, var(--text-primary)) 100%)',
        padding:    'clamp(5rem, 12vh, 9rem) clamp(1.5rem, 8vw, 8rem)',
        position:   'relative',
        overflow:   'hidden',
      }}
    >
      {/* Diffuse warm glow background */}
      <div aria-hidden="true" style={{
        position:      'absolute',
        top:           '30%',
        left:          '50%',
        transform:     'translate(-50%, -50%)',
        width:         '80vmax',
        height:        '80vmax',
        borderRadius:  '50%',
        background:    'radial-gradient(circle, color-mix(in srgb, var(--accent) 3.5%, transparent) 0%, transparent 55%)',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '680px' }}>

        {/* ══════════════════
            Section header
            ══════════════════ */}
        <div ref={headerRef} style={{ marginBottom: 'clamp(3rem, 7vh, 5rem)' }}>

          {/* Section label */}
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
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
            {'13\u00a0\u00a0/\u00a0\u00a0About This Gift'}
          </motion.span>

          {/* Judul utama */}
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
              color:         'color-mix(in srgb, var(--text-primary) 90%, transparent)',
              margin:        '0 0 0.8rem',
            }}
          >
            About This{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>
              Gift
            </em>
          </motion.h2>

          {/* Garis dekoratif pendek di bawah judul */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={headerIn ? { scaleX: 1, opacity: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              width:           '36px',
              height:          '1px',
              background:      'var(--accent)',
              transformOrigin: 'left center',
              marginTop:       '1.5rem',
            }}
          />
        </div>

        {/* ══════════════════════════════════════════
            BAGIAN 1 — Jam Tangan
            ══════════════════════════════════════════ */}
        <GiftCard
          icon={Watch}
          iconLabel="Jam Tangan"
          photoSrc={WATCH_PHOTO_URL || undefined}
          photoAlt="Foto jam tangan"
          photoLabel="foto jam&#10;tangan"
          paragraphs={WATCH_PARAGRAPHS}
          cardIndex={0}
        />

        {/* ══════════════════════════════════════════
            Divider tipis warna accent
            ══════════════════════════════════════════ */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, margin: '-8% 0px' }}
          transition={{ duration: 1.4, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            width:           '100%',
            height:          '1px',
            background:      'linear-gradient(90deg, transparent, color-mix(in srgb, var(--accent) 30%, transparent), transparent)',
            margin:          'clamp(2.5rem, 6vh, 4rem) 0',
            transformOrigin: 'left center',
          }}
          aria-hidden="true"
        />

        {/* ══════════════════════════════════════════
            BAGIAN 2 — Bunga
            ══════════════════════════════════════════ */}
        <GiftCard
          icon={Flower2}
          iconLabel="Bunga"
          photoSrc={FLOWER_PHOTO_URL || undefined}
          photoAlt="Foto bunga"
          photoLabel="foto&#10;bunga"
          paragraphs={FLOWER_PARAGRAPHS}
          cardIndex={1}
        />

      </div>
    </section>
  )
}

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

/* ─────────────────────────────────────────────
   FOTO POJOK SURAT (opsional)
   Isi dengan path foto kamu.
   Misal: '/src/assets/photos/letter-photo.jpg'
   Biarkan kosong untuk tidak menampilkan foto.
   ───────────────────────────────────────────── */
const CORNER_PHOTO_URL = ''

/* ─────────────────────────────────────────────
   PARAGRAF SURAT
   Tiap paragraf punya:
   - theme: label penanda tema (tidak ditampilkan)
   - text: teks draft — GANTI dengan versi final kamu

   GUARDRAIL: draft di sini sengaja dibuat generik
   dan tidak dramatis. Tulis ulang dengan kata-katamu sendiri.
   ───────────────────────────────────────────── */
const LETTER_PARAGRAPHS = [

  /* ══════════════════════════════════
     [UCAPAN ULANG TAHUN]
     Tone: hangat, personal, tulus
     Bukan sekadar basa-basi
     ══════════════════════════════════ */
  {
    id:    'lp-01',
    theme: 'UCAPAN ULANG TAHUN',
    text:  'Selamat ulang tahun. Hari ini aku ingin kamu tahu bahwa keberadaanmu layak untuk dirayakan — bukan hanya karena perjalanan kita bersama, tapi karena kamu sendiri adalah seseorang yang berharga.',
  },

  /* ══════════════════════════════════
     [TERIMA KASIH]
     Tone: genuine, tidak berlebihan
     Tentang hal-hal spesifik yang dihargai
     ══════════════════════════════════ */
  {
    id:    'lp-02',
    theme: 'TERIMA KASIH',
    text:  'Terima kasih sudah pernah memilih untuk hadir. Untuk waktu-waktu yang kamu berikan, untuk kesabaranmu di hari-hari yang tidak mudah — itu semua berarti lebih dari yang bisa aku ungkapkan dengan kata-kata.',
  },

  /* ══════════════════════════════════
     [KENANGAN]
     Tone: nostalgia yang tenang, bukan melankolis
     Ingat hal-hal kecil yang nyata
     ══════════════════════════════════ */
  {
    id:    'lp-03',
    theme: 'KENANGAN',
    text:  'Ada banyak hal yang aku ingat dari kita. Bukan hanya momen-momen besar, tapi justru yang kecil-kecil — yang terasa biasa saat itu terjadi, tapi sekarang jadi yang paling sulit aku lupakan.',
  },

  /* ══════════════════════════════════
     [PERMINTAAN MAAF]
     Tone: tulus, tidak defensif, tanpa alasan
     Fokus pada dampak, bukan niat
     ══════════════════════════════════ */
  {
    id:    'lp-04',
    theme: 'PERMINTAAN MAAF',
    text:  'Ada hal-hal yang aku sesali. Momen di mana aku seharusnya lebih hadir tapi memilih tidak. Untuk itu, aku minta maaf — bukan karena terpaksa, tapi karena aku tahu kamu layak mendapat lebih dari itu.',
  },

  /* ══════════════════════════════════
     [PENGAKUAN KESALAHAN]
     Tone: jujur tentang diri sendiri
     Spesifik tentang pola, bukan pembelaan
     ══════════════════════════════════ */
  {
    id:    'lp-05',
    theme: 'PENGAKUAN KESALAHAN',
    text:  'Aku sadar aku pernah membuat keputusan yang tidak adil untuk kita. Ada saatnya aku menghindari percakapan yang seharusnya kita hadapi bersama, dan itu tidak benar.',
  },

  /* ══════════════════════════════════
     [REFLEKSI]
     Tone: introspektif, tidak menghakimi diri sendiri
     Apa yang dipelajari dari jarak dan waktu
     ══════════════════════════════════ */
  {
    id:    'lp-06',
    theme: 'REFLEKSI',
    text:  'Setelah waktu berlalu, aku mulai melihat banyak hal dengan lebih jelas. Tentang pola yang pernah kita jalani, tentang cara aku mencintai, dan tentang hal-hal yang ingin aku lakukan secara berbeda.',
  },

  /* ══════════════════════════════════
     [PERUBAHAN]
     Tone: hopeful tapi grounded
     Bukan janji besar — perubahan konkret kecil
     ══════════════════════════════════ */
  {
    id:    'lp-07',
    theme: 'PERUBAHAN',
    text:  'Aku sedang berubah — bukan untuk membuktikan sesuatu, tapi karena aku percaya aku bisa menjadi seseorang yang lebih baik dalam mencintai. Pelan-pelan, tapi dengan lebih sadar dari sebelumnya.',
  },

  /* ══════════════════════════════════
     [PERASAAN]
     Tone: jujur, tidak manipulatif
     Apa yang masih dirasakan — tanpa harapan terselubung
     ══════════════════════════════════ */
  {
    id:    'lp-08',
    theme: 'PERASAAN',
    text:  'Aku tidak akan menyembunyikan ini: aku masih peduli. Dengan cara yang mungkin berbeda dari sebelumnya, tapi itu tidak membuatnya kurang nyata. Dan aku merasa kamu layak untuk mengetahuinya.',
  },

  /* ══════════════════════════════════
     [PILIHAN / RUANG TANPA TEKANAN]
     Tone: tenang, tidak memaksa, tidak dramatik
     Beri ruang — ini akhir surat yang open-ended
     ══════════════════════════════════ */
  {
    id:    'lp-09',
    theme: 'PILIHAN / RUANG TANPA TEKANAN',
    text:  'Ini bukan tentang memintamu untuk memilih sekarang. Ini hanya tentang memberitahumu apa yang ada di hatiku — dan memberimu ruang untuk merespons dengan cara apapun yang terasa benar untukmu, tanpa tekanan, tanpa batas waktu.',
  },

]

/* ─────────────────────────────────────────────
   Satu paragraf — fade in saat scroll
   ───────────────────────────────────────────── */
function LetterParagraph({ item, index }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-5% 0px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.4, delay: 0.04, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Theme label — sangat kecil, hanya untuk orientasi di editor */}
      <span style={{
        display:       'block',
        fontFamily:    "'Manrope', sans-serif",
        fontSize:      '0.48rem',
        fontWeight:    600,
        letterSpacing: '0.26em',
        color:         'color-mix(in srgb, var(--accent) 20%, transparent)',
        textTransform: 'uppercase',
        marginBottom:  '0.5rem',
        userSelect:    'none',
      }}>
        {item.theme}
      </span>

      <p style={{
        fontFamily:  "'Manrope', sans-serif",
        fontSize:    'clamp(0.9rem, 2vw, 1.02rem)',
        fontWeight:  400,
        lineHeight:  2.05,
        color:       'color-mix(in srgb, var(--text-primary) 65%, transparent)',
        margin:      0,
      }}>
        {item.text}
      </p>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   Signature "Love, Aldi"
   ───────────────────────────────────────────── */
function Signature() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-5% 0px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.6, ease: [0.25, 0.1, 0.25, 1] }}
      style={{
        marginTop:   '3rem',
        paddingTop:  '2rem',
        borderTop:   '1px solid color-mix(in srgb, var(--accent) 10%, transparent)',
      }}
    >
      <p style={{
        fontFamily:  "'Manrope', sans-serif",
        fontStyle:   'italic',
        fontSize:    'clamp(0.8rem, 1.8vw, 0.9rem)',
        color:       'color-mix(in srgb, var(--text-primary) 30%, transparent)',
        margin:      '0 0 0.5rem',
      }}>
        Dengan segala yang masih ada,
      </p>

      {/* Cursive signature */}
      <p style={{
        fontFamily:    "'Dancing Script', cursive",
        fontSize:      'clamp(1.8rem, 4.5vw, 2.6rem)',
        fontWeight:    600,
        lineHeight:    1.2,
        color:         'color-mix(in srgb, var(--accent) 75%, transparent)',
        margin:        '0 0 0.3rem',
        letterSpacing: '0.02em',
      }}>
        Love, Aldi
      </p>

      {/* Tanggal — isi nanti */}
      <p style={{
        fontFamily:    "'Manrope', sans-serif",
        fontSize:      '0.62rem',
        fontWeight:    500,
        letterSpacing: '0.16em',
        color:         'color-mix(in srgb, var(--text-primary) 15%, transparent)',
        margin:        0,
        textTransform: 'uppercase',
      }}>
        {/* ↓ ganti dengan tanggal spesifik jika ingin */}
        September 2026
      </p>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   Main component
   ───────────────────────────────────────────── */
export default function Letter() {
  const headerRef = useRef(null)
  const headerIn  = useInView(headerRef, { once: true, margin: '-10% 0px' })

  const cardRef   = useRef(null)
  const cardIn    = useInView(cardRef, { once: true, margin: '-6% 0px' })

  return (
    <section
      style={{
        /* Latar section: sangat gelap warm — membedakan dari section lain */
        background:  'linear-gradient(180deg, var(--bg-primary) 0%, color-mix(in srgb, var(--bg-primary) 98%, var(--text-primary)) 100%)',
        padding:     'clamp(5rem, 12vh, 9rem) clamp(1.5rem, 8vw, 8rem)',
        position:    'relative',
        overflow:    'hidden',
      }}
    >
      {/* Warm parchment glow — diffuse */}
      <div aria-hidden="true" style={{
        position:     'absolute', top: '20%', left: '50%',
        transform:    'translate(-50%,-50%)',
        width:        '70vmax', height: '70vmax', borderRadius: '50%',
        background:   'radial-gradient(circle, color-mix(in srgb, var(--accent) 3.5%, transparent) 0%, transparent 55%)',
        pointerEvents:'none',
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '660px' }}>

        {/* ══════════════════
            Section header
            ══════════════════ */}
        <div ref={headerRef} style={{ marginBottom: 'clamp(3rem, 7vh, 5rem)' }}>
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
            {'15\u00a0\u00a0/\u00a0\u00a0Letter For You'}
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
              color:         'color-mix(in srgb, var(--text-primary) 90%, transparent)',
              margin:        0,
            }}
          >
            Sebuah surat{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>
              yang sudah lama ingin aku tulis.
            </em>
          </motion.h2>
        </div>

        {/* ══════════════════════════════════════════
            Letter card — terasa seperti kertas surat
            ══════════════════════════════════════════ */}
        <motion.div
          ref={cardRef}
          initial={{ opacity: 0, y: 32 }}
          animate={cardIn ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.6, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            background:   'color-mix(in srgb, var(--text-primary) 3%, transparent)',
            border:       '1px solid color-mix(in srgb, var(--text-primary) 7%, transparent)',
            borderRadius: '10px',
            padding:      'clamp(2rem, 5vw, 3.5rem)',
            position:     'relative',
          }}
        >
          {/* ── Foto pojok kanan atas (opsional) ── */}
          {CORNER_PHOTO_URL && (
            <div style={{
              position:     'absolute',
              top:          'clamp(1.5rem, 4vw, 2.5rem)',
              right:        'clamp(1.5rem, 4vw, 2.5rem)',
              width:        'clamp(56px, 12vw, 80px)',
              height:       'clamp(70px, 15vw, 100px)',
              borderRadius: '4px',
              overflow:     'hidden',
              border:       '1px solid color-mix(in srgb, var(--accent) 15%, transparent)',
              flexShrink:   0,
            }}>
              <img
                src={CORNER_PHOTO_URL}
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }}
              />
            </div>
          )}

          {/* ── Salutation ── */}
          <p style={{
            fontFamily:    "'Playfair Display', Georgia, serif",
            fontStyle:     'italic',
            fontSize:      'clamp(0.9rem, 2.2vw, 1.1rem)',
            color:         'color-mix(in srgb, var(--text-primary) 40%, transparent)',
            margin:        '0 0 2.5rem',
            /* geser kanan saat ada foto supaya tidak tumpang tindih */
            paddingRight:  CORNER_PHOTO_URL ? 'clamp(72px, 16vw, 104px)' : 0,
          }}>
            Untuk Dita,
          </p>

          {/* ── Paragraf surat ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.2rem' }}>
            {LETTER_PARAGRAPHS.map((item, i) => (
              <LetterParagraph key={item.id} item={item} index={i} />
            ))}
          </div>

          {/* ── Signature ── */}
          <Signature />
        </motion.div>

      </div>
    </section>
  )
}
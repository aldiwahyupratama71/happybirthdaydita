import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Heart,
  MessageSquare,
  Gamepad2,
  Laugh,
  Phone,
  Star,
  Clock,
  MapPin,
  Utensils,
  Users,
} from 'lucide-react'

/* ─────────────────────────────────────────────
   Data — isi placeholder di field "text".
   Tiap item diberi komentar petunjuk.
   ───────────────────────────────────────────── */
const LITTLE_THINGS = [
  {
    id: 'lt-01',
    category: 'Cara Memanggil',
    Icon: Heart,
    // ↓ PLACEHOLDER — cara kamu memanggil dia, atau cara dia memanggil kamu
    text: '“Aku mungkin sudah lupa kapan tepatnya semuanya dimulai, tapi aku masih ingat bagaimana rasanya ketika namaku dipanggil dengan caramu(sayang,mas,).”',
  },
  {
    id: 'lt-02',
    category: 'Kebiasaan Chat',
    Icon: MessageSquare,
    // ↓ PLACEHOLDER — pola atau kebiasaan unik saat chatting (stiker favorit, cara buka obrolan, dsb.)
    text: '“Dulu, membuka chat darimu adalah bagian kecil dari hariku. Sekarang aku sadar, ternyata bagian kecil itu punya arti yang cukup besar.”',
  },
  {
    id: 'lt-03',
    category: 'Bermain Game',
    Icon: Gamepad2,
    // ↓ PLACEHOLDER — momen atau kebiasaan saat main game bersama
    text: '“Lucunya, salah satu awal dari cerita kita hanya karena sering bermain bersama. Dari layar kecil, ternyata lahir cerita yang begitu panjang.”',
  },
  {
    id: 'lt-04',
    category: 'Candaan',
    Icon: Laugh,
    // ↓ PLACEHOLDER — inside joke atau candaan yang hanya kalian berdua yang mengerti
    text: '“Mungkin orang lain tidak akan mengerti kenapa kita bisa tertawa karena hal sesederhana ini. Tapi justru hal-hal seperti itulah yang masih sering aku ingat.”',
  },
  {
    id: 'lt-05',
    category: 'Voice Call',
    Icon: Phone,
    // ↓ PLACEHOLDER — hal yang selalu terjadi atau selalu diingat saat voice call
    text: '“Kadang kita tidak membicarakan sesuatu yang penting. Hanya saling bercerita tentang hari masing-masing. Tapi entah kenapa, aku selalu merasa lebih dekat setelahnya.”',
  },
  {
    id: 'lt-06',
    category: 'Cerita Random',
    Icon: Star,
    // ↓ PLACEHOLDER — topik ngalor-ngidul atau cerita yang sering muncul tiba-tiba
    text: '“Kita sering membahas hal-hal random yang mungkin tidak masuk akal bagi orang lain. Tapi di situlah uniknya kita—saling menerima dan menikmati obrolan tanpa batas.”',
  },
  {
    id: 'lt-07',
    category: 'Menunggu Balasan',
    Icon: Clock,
    // ↓ PLACEHOLDER — perasaan atau kebiasaan saat menunggu dia membalas pesan
    text: '“Dulu aku menunggu balasanmu tanpa terlalu memikirkan kenapa. Sekarang aku mengerti, yang sebenarnya kutunggu bukan hanya sebuah pesan, tapi perasaan bahwa kamu masih ada di sana.”',
  },
  {
    id: 'lt-08',
    category: 'Jalan Bersama',
    Icon: MapPin,
    // ↓ PLACEHOLDER — tempat favorit, rute, atau hal kecil yang diingat saat pergi bersama
    text: '“Tidak semua perjalanan harus jauh untuk menjadi kenangan. Kadang cukup berjalan bersamamu, dan hari biasa pun terasa berbeda.”',
  },
  {
    id: 'lt-09',
    category: 'Makanan',
    Icon: Utensils,
    // ↓ PLACEHOLDER — makanan yang sering jadi momen tersendiri (dipesan bersama, direkomendasikan, dsb.)
    text: '“Sederhana, tapi cukup membuatku bahagia. Momen kecil saat makan bersamamu ternyata punya cerita yang lebih besar di dalamnya.”',
  },
  {
    id: 'lt-10',
    category: 'Keluarga',
    Icon: Users,
    // ↓ PLACEHOLDER — momen kecil yang melibatkan keluarganya atau keluargamu
    text: '“Ada masa ketika keluargamu terasa begitu dekat denganku. Dan mungkin itu salah satu alasan kenapa cerita kita terasa lebih dari sekadar hubungan antara dua orang.”',
  },
]

/* ─────────────────────────────────────────────
   Satu baris list — scroll-trigger sendiri
   ───────────────────────────────────────────── */
function ListItem({ item, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-6% 0px' })
  const isWarm = index % 2 !== 0   /* alternating accent color */

  return (
    <motion.li
      ref={ref}
      initial={{ opacity: 0, x: -18, y: 6 }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{
        duration: 1.2,
        delay: 0.04 * (index % 6),
        ease: [0.25, 0.1, 0.25, 1],
      }}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '1.1rem',
        padding: '1.4rem 0',
        borderBottom: '1px solid color-mix(in srgb, var(--text-primary) 4%, transparent)',
        listStyle: 'none',
      }}
    >
      {/* ── Icon tile ── */}
      <div style={{
        flexShrink: 0,
        width: '36px',
        height: '36px',
        borderRadius: '8px',
        background: isWarm
          ? 'color-mix(in srgb, var(--accent-2) 7%, transparent)'
          : 'color-mix(in srgb, var(--accent) 7%, transparent)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '2px',
      }}>
        <item.Icon
          size={16}
          strokeWidth={1.4}
          color={isWarm ? 'var(--accent-2)' : 'var(--accent)'}
        />
      </div>

      {/* ── Text block ── */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <span style={{
          display: 'block',
          fontFamily: "'Manrope', sans-serif",
          fontSize: '0.56rem',
          fontWeight: 600,
          letterSpacing: '0.24em',
          color: 'var(--text-secondary)',
          textTransform: 'uppercase',
          marginBottom: '0.45rem',
        }}>
          {item.category}
        </span>

        {item.text ? (
          <p style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: 'clamp(0.88rem, 1.9vw, 1rem)',
            fontWeight: 400,
            lineHeight: 1.85,
            color: 'color-mix(in srgb, var(--text-secondary) 30%, var(--text-primary))',
            margin: 0,
          }}>
            {item.text}
          </p>
        ) : (
          /* Placeholder hint — terlihat saat item.text kosong */
          <p style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: '0.75rem',
            fontWeight: 400,
            lineHeight: 1.6,
            color: 'color-mix(in srgb, var(--text-secondary) 50%, var(--bg-primary))',
            margin: 0,
            fontStyle: 'italic',
          }}>
            {/* isi di LITTLE_THINGS[{index}].text */}
            — belum diisi —
          </p>
        )}
      </div>

      {/* ── Index badge ── */}
      <span style={{
        flexShrink: 0,
        fontFamily: "'Playfair Display', Georgia, serif",
        fontSize: '0.62rem',
        color: 'color-mix(in srgb, var(--text-primary) 15%, var(--bg-primary))',
        lineHeight: 1,
        marginTop: '4px',
        letterSpacing: '0.05em',
      }}>
        {String(index + 1).padStart(2, '0')}
      </span>
    </motion.li>
  )
}

/* ─────────────────────────────────────────────
   Footer closing note — komponen sendiri
   ───────────────────────────────────────────── */
function FooterNote() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-5% 0px' })

  return (
    <motion.p
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 1.6, ease: 'easeOut' }}
      style={{
        fontFamily: "'Playfair Display', Georgia, serif",
        fontStyle: 'italic',
        fontSize: 'clamp(0.85rem, 1.9vw, 1rem)',
        lineHeight: 1.9,
        color: 'color-mix(in srgb, var(--text-secondary) 50%, var(--bg-primary))',
        marginTop: '3rem',
        margin: '3rem 0 0',
      }}
    >
      "...dan masih banyak lagi yang tidak cukup ditulis di sini."
    </motion.p>
  )
}

/* ─────────────────────────────────────────────
   Main component
   ───────────────────────────────────────────── */
export default function LittleThings({ id }) {
  const headerRef = useRef(null)
  const headerIn = useInView(headerRef, { once: true, margin: '-10% 0px' })

  return (
    <section id={id}
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, color-mix(in srgb, var(--bg-primary) 96%, var(--text-primary)) 0%, var(--bg-primary) 100%)',
        padding: 'clamp(5rem, 12vh, 9rem) clamp(1.5rem, 8vw, 8rem)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* ── Ambient warm glow ── */}
      <div aria-hidden="true" style={{
        position: 'absolute',
        top: '-8%',
        right: '-4%',
        width: '380px',
        height: '380px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, color-mix(in srgb, var(--accent) 4%, transparent) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '680px', position: 'relative', zIndex: 1 }}>

        {/* ══════════════════
            Header
            ══════════════════ */}
        <div ref={headerRef}>
          

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
          {'06\u00a0\u00a0/\u00a0\u00a0The Little Things'}
        </motion.span>
          

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={headerIn ? { opacity: 1, y: 0 } : {}}
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
            The Little Things{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>
              I Still Remember
            </em>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={headerIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.24, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: 'clamp(0.82rem, 1.8vw, 0.95rem)',
              lineHeight: 1.85,
              color: 'var(--text-secondary)',
              margin: '0 0 2.5rem',
              maxWidth: '460px',
            }}
          >
            Hal-hal kecil yang mungkin tampak sepele,
            tapi justru yang paling sulit dilupakan.
          </motion.p>

          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={headerIn ? { scaleX: 1, opacity: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              width: '36px',
              height: '1px',
              background: 'var(--accent)',
              marginBottom: '2.5rem',
              transformOrigin: 'left center',
            }}
          />
        </div>

        {/* ══════════════════
            List
            ══════════════════ */}
        <ul style={{ margin: 0, padding: 0 }}>
          {LITTLE_THINGS.map((item, index) => (
            <ListItem key={item.id} item={item} index={index} />
          ))}
        </ul>

        <FooterNote />
      </div>
    </section>
  )
}
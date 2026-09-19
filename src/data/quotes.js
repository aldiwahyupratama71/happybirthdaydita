/**
 * quotes.js
 * Kumpulan kutipan / narasi untuk berbagai section.
 *
 * sectionKey harus cocok dengan nama section yang menggunakannya.
 * Satu section bisa punya lebih dari satu quote (mis. Opening punya
 * tagline + subtext). Komponen tinggal filter by sectionKey.
 *
 * text: isi teksnya nanti sesuai kebutuhan — dikosongkan dulu.
 *
 * Contoh pakai di komponen:
 *   import { getQuotes } from '../data/quotes'
 *   const [main] = getQuotes('opening')
 */

export const quotesData = [
  // ── Opening ────────────────────────────────────
  {
    id: 'q-opening-01',
    sectionKey: 'opening',
    text: 'Untuk seseorang yang pernah menjadi rumah.',
  },
  {
    id: 'q-opening-02',
    sectionKey: 'opening',
    text: 'Ada sebuah cerita yang ingin aku ceritakan lagi.',
  },

  // ── Birthday ───────────────────────────────────
  {
    id: 'q-birthday-01',
    sectionKey: 'birthday',
    text: 'Hari ini bukan tentang masa lalu. Hari ini tentang kamu dan perjalanan baru yang sedang kamu mulai.',
  },
  {
    id: 'q-birthday-02',
    sectionKey: 'birthday',
    text: 'Selamat bertambah usia. Semoga tahun ini membawa lebih banyak alasan untuk tersenyum, lebih banyak keberanian untuk memilih, dan lebih banyak hal baik yang datang kepadamu.',
  },

  // ── Story ──────────────────────────────────────
  {
    id: 'q-story-01',
    sectionKey: 'story',
    text: 'Kalau aku mengingat bagaimana semuanya dimulai, sebenarnya ceritanya sederhana.',
  },
  {
    id: 'q-story-02',
    sectionKey: 'story',
    text: 'Awalnya aku tertarik karena melihatmu sebagai seseorang yang cantik.',
  },
  {
    id: 'q-story-03',
    sectionKey: 'story',
    text: 'Ditambah lagi, waktu itu kita sering bermain game bersama.',
  },
  {
    id: 'q-story-04',
    sectionKey: 'story',
    text: 'Tapi ternyata sesuatu yang awalnya sederhana itu perlahan menjadi jauh lebih besar dari yang pernah aku bayangkan.',
  },

  // ── Timeline ───────────────────────────────────
  {
    id: 'q-timeline-01',
    sectionKey: 'timeline',
    text: '',   // intro section timeline
  },

  // ── Memories ───────────────────────────────────
  {
    id: 'q-memories-01',
    sectionKey: 'memories',
    text: '',   // intro galeri kenangan
  },

  // ── LittleThings ───────────────────────────────
  {
    id: 'q-little-things-01',
    sectionKey: 'littleThings',
    text: '',   // hal-hal kecil yang diingat
  },
  {
    id: 'q-little-things-02',
    sectionKey: 'littleThings',
    text: '',
  },

  // ── Reflection ─────────────────────────────────
  {
    id: 'q-reflection-01',
    sectionKey: 'reflection',
    text: 'Sekarang aku mulai sadar bahwa mungkin masalah kita bukan hanya tentang siapa yang salah.',
  },
  {
    id: 'q-reflection-02',
    sectionKey: 'reflection',
    text: 'Kita terjebak dalam sebuah pola.',
  },

  // ── Realization ────────────────────────────────
  {
    id: 'q-realization-01',
    sectionKey: 'realization',
    text: 'Aku tidak tahu apakah yang membuatku lelah adalah keberadaanmu atau cara kita menjalani hubungan.',
  },
  {
    id: 'q-realization-02',
    sectionKey: 'realization',
    text: 'Setelah berjauhan, aku justru merasakan sesuatu yang membingungkan: aku merindukanmu, tetapi di saat yang sama aku merasa lebih tenang.',
  },
  {
    id: 'q-realization-03',
    sectionKey: 'realization',
    text: 'Mungkin yang membuatku lelah bukan hanya keberadaanmu.',
  },
  {
    id: 'q-realization-04',
    sectionKey: 'realization',
    text: 'Mungkin aku lelah dengan cara kita menjalani hubungan.',
  },

  // ── Growth ─────────────────────────────────────
  {
    id: 'q-growth-01',
    sectionKey: 'growth',
    text: 'Bukan janji — ini hal-hal konkret yang ingin aku ubah, dimulai dari sekarang.',
  },

  // ── Feelings ───────────────────────────────────
  {
    id: 'q-feelings-01',
    sectionKey: 'feelings',
    text: 'Aku tidak akan berbohong.',
  },
  {
    id: 'q-feelings-02',
    sectionKey: 'feelings',
    text: 'Aku masih merindukanmu.',
  },
  {
    id: 'q-feelings-03',
    sectionKey: 'feelings',
    text: 'Masih ada bagian dari diriku yang ketika membayangkan masa depan, masih bisa melihatmu di dalamnya.',
  },
  {
    id: 'q-feelings-04',
    sectionKey: 'feelings',
    text: 'Tetapi aku juga tidak ingin menjadikan rasa rindu sebagai alasan untuk mengulang hubungan yang sama.',
  },
  {
    id: 'q-feelings-05',
    sectionKey: 'feelings',
    text: 'Kalau suatu hari kita kembali memilih satu sama lain, aku ingin kita tidak kembali sebagai dua orang yang sama dengan masalah yang sama.',
  },

  // ── Future ─────────────────────────────────────
  {
    id: 'q-future-01',
    sectionKey: 'future',
    text: 'Bukan karena takut kehilangan. Bukan karena dua tahun terasa sayang untuk dilepas.',
  },

  // ── Choice / What I Want ──────────────────────
  {
    id: 'q-choice-01',
    sectionKey: 'choice',
    text: 'Aku tidak ingin kembali hanya karena takut kehilanganmu.',
  },
  {
    id: 'q-choice-02',
    sectionKey: 'choice',
    text: 'Aku tidak ingin kembali hanya karena kita sudah menjalani dua tahun bersama.',
  },
  {
    id: 'q-choice-03',
    sectionKey: 'choice',
    text: 'Aku juga tidak ingin pergi hanya karena hubungan kita pernah menjadi berat.',
  },
  {
    id: 'q-choice-04',
    sectionKey: 'choice',
    text: 'Yang aku inginkan adalah tahu apakah kita masih bisa memilih satu sama lain dengan versi diri kita yang lebih dewasa.',
  },

  // ── Letter ─────────────────────────────────────
  {
    id: 'q-letter-01',
    sectionKey: 'letter',
    text: '',   // pembuka surat
  },
  {
    id: 'q-letter-02',
    sectionKey: 'letter',
    text: '',   // isi / badan surat
  },
  {
    id: 'q-letter-03',
    sectionKey: 'letter',
    text: '',   // penutup surat
  },

  // ── Final ──────────────────────────────────────
  {
    id: 'q-final-01',
    sectionKey: 'final',
    text: 'Selamat ulang tahun, Dita.',
  },
  {
    id: 'q-final-02',
    sectionKey: 'final',
    text: 'September 2026',
  },
]

/**
 * Helper — ambil semua quote untuk satu section.
 * Mengembalikan array (bisa kosong jika belum ada).
 *
 * @param {string} sectionKey
 * @returns {{ id: string, sectionKey: string, text: string }[]}
 */
export function getQuotes(sectionKey) {
  return quotesData.filter((q) => q.sectionKey === sectionKey)
}

/**
 * Helper — ambil quote pertama untuk satu section (shortcut umum).
 *
 * @param {string} sectionKey
 * @returns {{ id: string, sectionKey: string, text: string } | undefined}
 */
export function getFirstQuote(sectionKey) {
  return quotesData.find((q) => q.sectionKey === sectionKey)
}

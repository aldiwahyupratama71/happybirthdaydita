/**
 * memories.js
 * Data untuk section Memories — galeri foto dikelompokkan per kategori.
 *
 * photoUrl: ganti dengan path asset lokal atau URL.
 * caption:  teks singkat yang muncul saat foto di-hover / diklik.
 *
 * Kategori yang tersedia:
 *   "The Beginning" | "Random Days" | "Gaming Together" | "Our Adventures"
 *   "Family" | "Funny Moments" | "The Quiet Moments" | "The Last Chapters"
 */

export const MEMORY_CATEGORIES = [
  'The Beginning',
  'Random Days',
  'Mall Date',
  'Our Adventures',
  'Traveling',
  'Funny Moments',
  'Coffee Time',
  'Sport time',
]

export const memoriesData = [
  // ── The Beginning ──────────────────────────────
  { id: 'm-01', category: 'The Beginning', photoUrl: '/photos/memories/memories-01.jpeg', caption: 'kamu inget gk sih ini foto hari ke 2 kalinya kita ketemu hehehe' },
  { id: 'm-02', category: 'The Beginning', photoUrl: '/photos/memories/memories-07.jpeg', caption: 'dan ini first time kita jalan keluar dan mungkin awal kita saling ngerasa nyaman dan malu wkwk' },
  { id: 'm-03', category: 'The Beginning', photoUrl: '/photos/memories/memories-03.jpeg', caption: 'nah ini udh mulai gk kaku yaaaa udh meluk soalnya' },
  { id: 'm-04', category: 'The Beginning', photoUrl: '/photos/memories/memories-04.jpeg', caption: 'nah untuk ini,ini salah satu bentuk keberanianku buat berani datang kerumah yang kala itu beralasan mau memberi kado dan kebab wkwkw' },
  { id: 'm-05', category: 'The Beginning', photoUrl: '/photos/memories/memories-05.jpeg', caption: 'dan ini foto booth kita pertama kali seru deh liat masa lalu yang asik itu diliat liat mah awakawkooakwoak' },

  // ── Random Days ────────────────────────────────
  { id: 'm-06', category: 'Random Days', photoUrl: '/photos/memories/random1.jpeg', caption: '' },
  { id: 'm-07', category: 'Random Days', photoUrl: '/photos/memories/random4.jpeg', caption: '' },
  { id: 'm-08', category: 'Random Days', photoUrl: '/photos/memories/random5.jpeg', caption: '' },
  { id: 'm-09', category: 'Random Days', photoUrl: '/photos/memories/random2.jpeg', caption: '' },
  { id: 'm-10', category: 'Random Days', photoUrl: '/photos/memories/random3.jpeg', caption: '' },

  // ── Mall Date ──────────────────────────────────
  { id: 'm-11', category: 'Mall Date', photoUrl: '/photos/memories/culture01.jpeg', caption: '' },
  { id: 'm-12', category: 'Mall Date', photoUrl: '/photos/memories/mall01.jpeg', caption: '' },
  { id: 'm-13', category: 'Mall Date', photoUrl: '/photos/memories/mall03.jpeg', caption: '' },
  { id: 'm-14', category: 'Mall Date', photoUrl: '/photos/memories/mall04.jpeg', caption: '' },
  { id: 'm-15', category: 'Mall Date', photoUrl: '/photos/memories/mall05.jpeg', caption: '' },

  // ── Our Adventures ─────────────────────────────
  { id: 'm-16', category: 'Our Adventures', photoUrl: '/photos/memories/adventure1.jpeg', caption: '' },
  { id: 'm-17', category: 'Our Adventures', photoUrl: '/photos/memories/adventure2.jpeg', caption: '' },
  { id: 'm-18', category: 'Our Adventures', photoUrl: '/photos/memories/adventure3.jpeg', caption: '' },
  { id: 'm-19', category: 'Our Adventures', photoUrl: '/photos/memories/adventure4.jpeg', caption: '' },
  { id: 'm-20', category: 'Our Adventures', photoUrl: '/photos/memories/adventure5.jpeg', caption: '' },

  // ── Traveling ──────────────────────────────────
  { id: 'm-21', category: 'Traveling', photoUrl: '/photos/memories/travel01.jpeg', caption: '' },
  { id: 'm-22', category: 'Traveling', photoUrl: '/photos/memories/travel02.jpeg', caption: '' },
  { id: 'm-23', category: 'Traveling', photoUrl: '/photos/memories/travel03.jpeg', caption: '' },
  { id: 'm-24', category: 'Traveling', photoUrl: '/photos/memories/travel04.jpeg', caption: '' },
  { id: 'm-25', category: 'Traveling', photoUrl: '/photos/memories/travel05.jpeg', caption: '' },

  // ── Funny Moments ──────────────────────────────
  { id: 'm-26', category: 'Funny Moments', photoUrl: '/photos/memories/funnymoment01.jpeg', caption: '' },
  { id: 'm-27', category: 'Funny Moments', photoUrl: '/photos/memories/funnymoment02.jpeg', caption: '' },
  { id: 'm-28', category: 'Funny Moments', photoUrl: '/photos/memories/funnymoment03.jpeg', caption: '' },
  { id: 'm-29', category: 'Funny Moments', photoUrl: '/photos/memories/funnymoment04.jpeg', caption: '' },
  { id: 'm-30', category: 'Funny Moments', photoUrl: '/photos/memories/funnymoment05.jpeg', caption: '' },

  // ── Coffee Time ────────────────────────────────
  { id: 'm-31', category: 'Coffee Time', photoUrl: '/photos/memories/coffetime.jpeg', caption: '' },
  { id: 'm-32', category: 'Coffee Time', photoUrl: '/photos/memories/coffetime2.jpeg', caption: '' },
  { id: 'm-33', category: 'Coffee Time', photoUrl: '/photos/memories/coffetime1.jpeg', caption: '' },
  { id: 'm-34', category: 'Coffee Time', photoUrl: '/photos/memories/coffetime3.jpeg', caption: '' },
  { id: 'm-35', category: 'Coffee Time', photoUrl: '/photos/memories/coffetime4.jpeg', caption: '' },

  // ── Sport time ─────────────────────────────────
  { id: 'm-36', category: 'Sport time', photoUrl: '/photos/memories/sport.jpeg', caption: '' },
  { id: 'm-37', category: 'Sport time', photoUrl: '/photos/memories/sport1.jpeg', caption: '' },
  { id: 'm-38', category: 'Sport time', photoUrl: '/photos/memories/sport2.jpeg', caption: '' },
  { id: 'm-39', category: 'Sport time', photoUrl: '/photos/memories/sport3.jpeg', caption: '' },
  { id: 'm-40', category: 'Sport time', photoUrl: '/photos/memories/sport4.jpeg', caption: '' },
]

/**
 * Helper — filter foto berdasarkan kategori.
 * Contoh pakai di komponen:
 *   import { getByCategory } from '../data/memories'
 *   const photos = getByCategory('Gaming Together')
 */
export function getByCategory(category) {
  return memoriesData.filter((item) => item.category === category)
}

/**
 * timeline.js
 * Data untuk section Timeline — urutan kronologis perjalanan hubungan.
 *
 * ── Cara menambah foto ──────────────────────────────────────────────────
 *  1. Taruh file foto di:  public/photos/timeline/
 *  2. Rename file sesuai nama di kolom photoUrl masing-masing chapter,
 *     ATAU ganti nilai photoUrl dengan nama file yang kamu upload.
 *
 *  Contoh:
 *    photoUrl: '/photos/timeline/chapter-01.jpg'
 *    → taruh file di public/photos/timeline/chapter-01.jpg
 *
 *  Format yang didukung: .jpg  .jpeg  .png  .webp
 * ────────────────────────────────────────────────────────────────────────
 */

export const timelineData = [
  {
    id: 't-01',
    chapterTitle: 'First Chapter',
    date: '',                                   // contoh: 'Agustus 2022'
    photoUrl: '/photos/timeline/chapter-01.jpg', // taruh foto di sini
    shortStory: '',                              // narasi singkat 1–3 kalimat
  },
  {
    id: 't-02',
    chapterTitle: 'Getting Closer',
    date: '',
    photoUrl: '/photos/timeline/chapter-02.jpg',
    shortStory: '',
  },
  {
    id: 't-03',
    chapterTitle: 'Becoming Us',
    date: '',
    photoUrl: '/photos/timeline/chapter-03.jpg',
    shortStory: '',
  },
  {
    id: 't-04',
    chapterTitle: 'The Good Days',
    date: '',
    photoUrl: '/photos/timeline/chapter-04.jpg',
    shortStory: '',
  },
  {
    id: 't-05',
    chapterTitle: 'The Hard Days',
    date: '',
    photoUrl: '/photos/timeline/chapter-05.jpg',
    shortStory: '',
  },
  {
    id: 't-06',
    chapterTitle: 'Today',
    date: '',
    photoUrl: '/photos/timeline/chapter-06.jpg',
    shortStory: '',
  },
]

import { useRef, useState, useEffect } from 'react'
import { Play, Pause, Music2 } from 'lucide-react'

// ── Ganti nama file sesuai lagu yang ada di public/music/ ──
const MUSIC_SRC = '/music/our-song.mp3'

export default function MusicPlayer() {
  const audioRef              = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)

  /* Set volume sekali setelah komponen mount */
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = 0.45   // 45% — medium, tidak keras
  }, [])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          // Browser policy block — gracefully ignore
          console.warn('Audio play blocked:', err)
        })
    }
  }

  /* Sinkronkan state jika audio selesai / berhenti dari luar */
  const handleEnded  = () => setIsPlaying(false)
  const handlePause  = () => setIsPlaying(false)
  const handlePlaying= () => setIsPlaying(true)

  return (
    <>
      {/* Hidden audio element — sumber kebenaran tunggal */}
      <audio
        ref={audioRef}
        src={MUSIC_SRC}
        loop
        preload="none"
        onEnded={handleEnded}
        onPause={handlePause}
        onPlaying={handlePlaying}
      />

      {/* Floating button */}
      <div className="music-player-wrapper">
        <button
          id="music-player-btn"
          className={`music-player-btn ${isPlaying ? 'playing' : ''}`}
          onClick={toggle}
          aria-label={isPlaying ? 'Pause musik' : 'Play Our Song'}
          title={isPlaying ? 'Pause' : 'Play Our Song'}
        >
          {/* Ikon dekoratif kecil */}
          <span className="music-note-icon" aria-hidden="true">
            <Music2 size={11} strokeWidth={2.5} />
          </span>

          {/* Ikon Play / Pause */}
          <span className="music-main-icon">
            {isPlaying
              ? <Pause size={18} strokeWidth={2.2} />
              : <Play  size={18} strokeWidth={2.2} />
            }
          </span>

          {/* Label teks */}
          <span className="music-label">
            {isPlaying ? 'Pause' : 'Play Our Song'}
          </span>

          {/* Animasi gelombang suara — hanya saat playing */}
          {isPlaying && (
            <span className="music-waves" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          )}
        </button>
      </div>
    </>
  )
}

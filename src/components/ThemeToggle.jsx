import { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'

export default function ThemeToggle() {
  // Default to dark mode (isLight = false)
  const [isLight, setIsLight] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme-preference')
      return saved === 'light'
    }
    return false
  })

  useEffect(() => {
    if (isLight) {
      document.documentElement.classList.add('light')
      localStorage.setItem('theme-preference', 'light')
    } else {
      document.documentElement.classList.remove('light')
      localStorage.setItem('theme-preference', 'dark')
    }
  }, [isLight])

  return (
    <div style={{
      position: 'fixed',
      bottom: '5.2rem', /* Placed above the MusicPlayer */
      right: '1.75rem',
      zIndex: 9999,
    }}>
      <button
        onClick={() => setIsLight(prev => !prev)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '2.4rem',
          height: '2.4rem',
          border: '1px solid color-mix(in srgb, var(--accent) 20%, transparent)',
          borderRadius: '50%',
          background: 'color-mix(in srgb, var(--bg-primary) 72%, transparent)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          color: 'var(--text-primary)',
          cursor: 'pointer',
          transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          boxShadow: '0 4px 20px color-mix(in srgb, var(--text-primary) 15%, transparent)',
        }}
        aria-label="Toggle Theme"
        title={isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
        onMouseEnter={e => {
          e.currentTarget.style.background = 'color-mix(in srgb, var(--bg-primary) 85%, transparent)'
          e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = 'color-mix(in srgb, var(--bg-primary) 72%, transparent)'
          e.currentTarget.style.transform = 'translateY(0) scale(1)'
        }}
        onMouseDown={e => {
          e.currentTarget.style.transform = 'translateY(0) scale(0.95)'
        }}
        onMouseUp={e => {
          e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)'
        }}
      >
        {isLight ? <Moon size={18} /> : <Sun size={18} />}
      </button>
    </div>
  )
}

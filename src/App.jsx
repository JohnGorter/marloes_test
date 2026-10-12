import { useEffect, useState } from 'react'
import './App.css'

export const LOVE_MESSAGE = 'Ik hou van jou...'

// Moet overeenkomen met de duur van de keyframe-animatie in App.css.
export const SPIN_DURATION_MS = 1000

export default function App() {
  const [isSpinning, setIsSpinning] = useState(false)
  const [showMessage, setShowMessage] = useState(false)

  useEffect(() => {
    if (!isSpinning) return undefined
    // Reset op een timer in plaats van op animationend: bij verminderde beweging
    // (animation: none) vuurt dat event niet en zou het hartje geblokkeerd blijven.
    const timer = setTimeout(() => setIsSpinning(false), SPIN_DURATION_MS)
    return () => clearTimeout(timer)
  }, [isSpinning])

  const handleClick = () => {
    if (isSpinning) return
    setIsSpinning(true)
    setShowMessage(true)
  }

  return (
    <main className="app">
      <button
        type="button"
        className={`heart ${isSpinning ? 'heart--spin' : ''}`}
        onClick={handleClick}
        aria-label="Hartje, klik om te draaien"
        data-testid="heart"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M12 21s-7.5-4.6-9.6-9.1C.9 8.9 2.4 5 6.2 5c2.1 0 3.4 1.2 4.1 2.3C11 6.2 12.4 5 14.5 5c3.8 0 5.3 3.9 3.8 6.9C19.5 16.4 12 21 12 21z" />
        </svg>
      </button>
      <p
        className={`message ${showMessage ? 'message--visible' : ''}`}
        role="status"
        aria-live="polite"
        data-testid="message"
      >
        {showMessage ? LOVE_MESSAGE : ''}
      </p>
    </main>
  )
}

import { useEffect, useState } from 'react'
import './App.css'

export const LOVE_MESSAGE = 'Ik hou van jou...'

// Moet overeenkomen met de duur van de draai-transitie in App.css.
export const FLIP_DURATION_MS = 1000

// Hartvorm: symmetrisch en glad, in een viewBox die het hart precies omvat.
const HEART_PATH =
  'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'

export default function App() {
  const [isFlipped, setIsFlipped] = useState(false)
  const [showMessage, setShowMessage] = useState(false)

  useEffect(() => {
    if (!isFlipped) return undefined
    // De boodschap verschijnt pas nadat het hartje volledig is omgedraaid.
    const timer = setTimeout(() => setShowMessage(true), FLIP_DURATION_MS)
    return () => clearTimeout(timer)
  }, [isFlipped])

  const handleClick = () => {
    if (isFlipped) return
    setIsFlipped(true)
  }

  return (
    <main className="app">
      <div className="heart-scene">
        <button
          type="button"
          className="heart"
          onClick={handleClick}
          aria-label="Hartje, klik om om te draaien"
          data-testid="heart"
        >
          <span className={`heart-card ${isFlipped ? 'heart-card--flipped' : ''}`}>
            <svg
              className="heart-face heart-face--front"
              viewBox="2 2.5 20 19.5"
              aria-hidden="true"
              focusable="false"
            >
              <path d={HEART_PATH} />
            </svg>
            <svg
              className="heart-face heart-face--back"
              viewBox="2 2.5 20 19.5"
              aria-hidden="true"
              focusable="false"
            >
              <path d={HEART_PATH} />
            </svg>
          </span>
        </button>
        <p
          className={`message ${showMessage ? 'message--visible' : ''}`}
          role="status"
          aria-live="polite"
          data-testid="message"
        >
          {showMessage ? LOVE_MESSAGE : ''}
        </p>
      </div>
    </main>
  )
}

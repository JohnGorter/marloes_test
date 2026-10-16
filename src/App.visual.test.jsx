import { describe, it, expect, afterEach, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent, cleanup, act } from '@testing-library/react'
import App, { LOVE_MESSAGE, SPIN_DURATION_MS } from './App.jsx'

beforeEach(() => {
  vi.useFakeTimers()
})

afterEach(() => {
  cleanup()
  vi.useRealTimers()
})

describe('App – zichtbaarheid en toegankelijkheid', () => {
  it('start zonder spin-klasse en zonder zichtbare boodschap-klasse', () => {
    render(<App />)
    expect(screen.getByTestId('heart').className).not.toContain('heart--spin')
    expect(screen.getByTestId('message').className).not.toContain('message--visible')
  })

  it('zet de zichtbaarheidsklasse op de boodschap na klikken', () => {
    render(<App />)
    fireEvent.click(screen.getByTestId('heart'))
    expect(screen.getByTestId('message').className).toContain('message--visible')
  })

  it('behoudt de boodschap nadat de spin-animatie is afgelopen', () => {
    render(<App />)
    fireEvent.click(screen.getByTestId('heart'))
    act(() => {
      vi.advanceTimersByTime(SPIN_DURATION_MS)
    })
    expect(screen.getByTestId('message').textContent).toBe(LOVE_MESSAGE)
    expect(screen.getByTestId('message').className).toContain('message--visible')
  })

  it('is een knop met type button en een toegankelijke naam', () => {
    render(<App />)
    const heart = screen.getByRole('button', { name: 'Hartje, klik om te draaien' })
    expect(heart.getAttribute('type')).toBe('button')
  })
})

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

describe('App', () => {
  it('toont het hartje zonder boodschap', () => {
    render(<App />)
    expect(screen.getByTestId('heart')).toBeTruthy()
    expect(screen.getByTestId('message').textContent).toBe('')
  })

  it('toont de liefdesboodschap na klikken en start de animatie', () => {
    render(<App />)
    const heart = screen.getByTestId('heart')
    fireEvent.click(heart)
    expect(heart.className).toContain('heart--spin')
    expect(screen.getByTestId('message').textContent).toBe(LOVE_MESSAGE)
  })

  it('negeert extra klikken tijdens de animatie', () => {
    render(<App />)
    const heart = screen.getByTestId('heart')
    fireEvent.click(heart)
    fireEvent.click(heart)
    expect(heart.className).toContain('heart--spin')
  })

  it('reset de spin-state na de animatieduur, zodat het hartje opnieuw draait', () => {
    render(<App />)
    const heart = screen.getByTestId('heart')
    fireEvent.click(heart)
    act(() => {
      vi.advanceTimersByTime(SPIN_DURATION_MS)
    })
    expect(heart.className).not.toContain('heart--spin')
    fireEvent.click(heart)
    expect(heart.className).toContain('heart--spin')
  })

  it('blokkeert het hartje niet als de animatie niet draait (reduced motion)', () => {
    // Bij reduced motion is de class-gebaseerde animatie uitgeschakeld; de state
    // moet ook dan na de timer terugkeren zodat het hartje niet vast blijft zitten.
    render(<App />)
    const heart = screen.getByTestId('heart')
    fireEvent.click(heart)
    act(() => {
      vi.advanceTimersByTime(SPIN_DURATION_MS)
    })
    fireEvent.click(heart)
    expect(heart.className).toContain('heart--spin')
    expect(screen.getByTestId('message').textContent).toBe(LOVE_MESSAGE)
  })

  it('kondigt de boodschap aan voor schermlezers', () => {
    render(<App />)
    const message = screen.getByTestId('message')
    expect(message.getAttribute('role')).toBe('status')
    expect(message.getAttribute('aria-live')).toBe('polite')
  })
})

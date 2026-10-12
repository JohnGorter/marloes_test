import { describe, it, expect, afterEach, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent, cleanup, act } from '@testing-library/react'
import App, { LOVE_MESSAGE, FLIP_DURATION_MS } from './App.jsx'

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

  it('draait het hartje om na klikken', () => {
    render(<App />)
    const heart = screen.getByTestId('heart')
    const card = heart.querySelector('.heart-card')
    expect(card.className).not.toContain('heart-card--flipped')
    fireEvent.click(heart)
    expect(card.className).toContain('heart-card--flipped')
  })

  it('toont de liefdesboodschap pas nadat het hartje is omgedraaid', () => {
    render(<App />)
    fireEvent.click(screen.getByTestId('heart'))
    expect(screen.getByTestId('message').textContent).toBe('')
    act(() => {
      vi.advanceTimersByTime(FLIP_DURATION_MS)
    })
    expect(screen.getByTestId('message').textContent).toBe(LOVE_MESSAGE)
    expect(screen.getByTestId('message').className).toContain('message--visible')
  })

  it('negeert extra klikken nadat het hartje is omgedraaid', () => {
    render(<App />)
    const heart = screen.getByTestId('heart')
    fireEvent.click(heart)
    act(() => {
      vi.advanceTimersByTime(FLIP_DURATION_MS)
    })
    fireEvent.click(heart)
    expect(heart.querySelector('.heart-card').className).toContain('heart-card--flipped')
    expect(screen.getByTestId('message').textContent).toBe(LOVE_MESSAGE)
  })

  it('kondigt de boodschap aan voor schermlezers', () => {
    render(<App />)
    const message = screen.getByTestId('message')
    expect(message.getAttribute('role')).toBe('status')
    expect(message.getAttribute('aria-live')).toBe('polite')
  })
})

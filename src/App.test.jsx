import { describe, it, expect, afterEach } from 'vitest'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import App, { LOVE_MESSAGE } from './App.jsx'

afterEach(cleanup)

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
})

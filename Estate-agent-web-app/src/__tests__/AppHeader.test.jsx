import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import App from '../App.jsx'

describe('App header', () => {
  it('shows the main title', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )
    expect(
      screen.getByText(/estate agent property search/i)
    ).toBeInTheDocument()
  })
})